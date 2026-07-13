import { NextResponse } from "next/server";
import { getFallbackQuestions } from "@/lib/copilot-fallback";
import { localized } from "@/lib/localized";
import { getBookWithLibraries } from "@/lib/queries";
import { routing } from "@/i18n/routing";

const LLM_TIMEOUT_MS = 8000;

export type CopilotResponse = {
  source: "generated" | "cached";
  questions: string[];
};

/**
 * AI co-pilot: 3-4 age-appropriate discussion questions for a book. One LLM
 * call when LLM_API_KEY is set; otherwise (or on any failure) the hand-written
 * cached question library answers, so the feature never errors (CLAUDE.md §9).
 */
export async function POST(request: Request) {
  let body: { bookSlug?: unknown; locale?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    body = {};
  }
  const { bookSlug, locale } = body;
  if (
    typeof bookSlug !== "string" ||
    typeof locale !== "string" ||
    !(routing.locales as readonly string[]).includes(locale)
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data = await getBookWithLibraries(bookSlug);
  if (!data) {
    return NextResponse.json({ error: "Unknown book" }, { status: 404 });
  }

  const generated = await generateQuestions(data.book, locale);
  if (generated) {
    return NextResponse.json<CopilotResponse>({
      source: "generated",
      questions: generated,
    });
  }

  return NextResponse.json<CopilotResponse>({
    source: "cached",
    questions: getFallbackQuestions(bookSlug, locale),
  });
}

type BookInfo = {
  title_en: string;
  title_ar: string;
  author_en: string;
  summary_en: string;
  summary_ar: string;
  age_min: number;
  age_max: number;
};

async function generateQuestions(
  book: BookInfo,
  locale: string,
): Promise<string[] | null> {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) return null;

  const language = locale === "ar" ? "Arabic" : "English";
  const title = localized(locale, book.title_en, book.title_ar);
  const summary = localized(locale, book.summary_en, book.summary_ar);
  const prompt =
    `You are helping a children's librarian prepare a reading circle. ` +
    `Book: "${title}" by ${book.author_en}. Summary: ${summary} ` +
    `Readers are ${book.age_min}-${book.age_max} years old. ` +
    `Write exactly 4 open-ended, age-appropriate discussion questions in ${language}. ` +
    `Keep each question short, warm and concrete — no violence, no politics, nothing frightening.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
        output_config: {
          format: {
            type: "json_schema",
            schema: {
              type: "object",
              properties: {
                questions: { type: "array", items: { type: "string" } },
              },
              required: ["questions"],
              additionalProperties: false,
            },
          },
        },
      }),
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    const result = (await response.json()) as {
      stop_reason?: string;
      content?: Array<{ type: string; text?: string }>;
    };
    if (result.stop_reason !== "end_turn") return null;
    const text = result.content?.find((b) => b.type === "text")?.text;
    if (!text) return null;
    const parsed = (JSON.parse(text) as { questions?: unknown }).questions;
    if (
      Array.isArray(parsed) &&
      parsed.length >= 3 &&
      parsed.length <= 5 &&
      parsed.every((q) => typeof q === "string" && q.trim().length > 0)
    ) {
      return parsed as string[];
    }
    return null;
  } catch {
    return null;
  }
}
