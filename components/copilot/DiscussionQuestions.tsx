"use client";

import { useState } from "react";
import { BookOpen, LoaderCircle, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type Result = { source: "generated" | "cached"; questions: string[] };

export default function DiscussionQuestions({ bookSlug }: { bookSlug: string }) {
  const t = useTranslations("copilot");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const generate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/discussion-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookSlug, locale }),
      });
      if (response.ok) {
        setResult((await response.json()) as Result);
      } else {
        // The API itself falls back to cached questions; reaching this means
        // the request failed entirely — retry stays available.
        setResult(null);
      }
    } catch {
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        {t("heading")}
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">{t("intro")}</p>

      <div aria-live="polite" className="mt-4">
        {result ? (
          <Card>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-dark">
              {result.source === "generated"
                ? t("sourceGenerated")
                : t("sourceCached")}
            </span>
            <ol className="mt-4 flex list-none flex-col gap-3">
              {result.questions.map((question, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-dark"
                  >
                    {index + 1}
                  </span>
                  <span className="text-sm">{question}</span>
                </li>
              ))}
            </ol>
          </Card>
        ) : (
          <Button onClick={generate} disabled={loading}>
            {loading ? (
              <LoaderCircle
                className="size-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : (
              <BookOpen className="size-4" aria-hidden="true" />
            )}
            {loading ? t("generating") : t("button")}
          </Button>
        )}
      </div>
    </section>
  );
}
