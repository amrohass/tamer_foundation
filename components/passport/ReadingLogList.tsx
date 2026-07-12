"use client";

import { useLocale, useTranslations } from "next-intl";
import { localized } from "@/lib/localized";
import type { Book } from "@/lib/types";

export default function ReadingLogList({ books }: { books: Book[] }) {
  const locale = useLocale();
  const t = useTranslations("passport");

  return (
    <section>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold">{t("readingLogHeading")}</h2>
        <p className="text-sm text-muted">
          {t("logCount", { count: books.length })}
        </p>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3"
          >
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xl"
              style={{ backgroundColor: `${book.cover_color}22` }}
            >
              {book.cover_emoji}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {localized(locale, book.title_en, book.title_ar)}
              </span>
              <span className="block truncate text-xs text-muted">
                {localized(locale, book.author_en, book.author_ar)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
