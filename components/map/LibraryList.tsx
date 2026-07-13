"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, MapPin, SearchX } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Card, { cardClasses } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localized } from "@/lib/localized";
import type { Library } from "@/lib/types";

export default function LibraryList({
  libraries,
  selectedId,
  onSelect,
}: {
  libraries: Library[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const locale = useLocale();
  const t = useTranslations("map");
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the selected card visible when a map pin is clicked.
  useEffect(() => {
    if (!selectedId) return;
    listRef.current
      ?.querySelector(`[data-library-id="${selectedId}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  if (libraries.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <SearchX className="size-8 text-muted" aria-hidden="true" />
        <p className="text-muted">{t("noResults")}</p>
      </Card>
    );
  }

  return (
    <ul ref={listRef} className="flex flex-col gap-3">
      {libraries.map((library) => {
        const open = library.id === selectedId;
        const books = [...library.books].sort((a, b) =>
          localized(locale, a.book.title_en, a.book.title_ar).localeCompare(
            localized(locale, b.book.title_en, b.book.title_ar),
            locale,
          ),
        );
        return (
          <li key={library.id} data-library-id={library.id}>
            <article
              className={cardClasses(
                cn("p-4", open && "border-primary ring-1 ring-primary"),
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(open ? null : library.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 rounded text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="min-w-0">
                  <span className="block font-semibold">
                    {localized(locale, library.name_en, library.name_ar)}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    {localized(locale, library.city_en, library.city_ar)}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-muted transition-transform",
                    open && "rotate-180",
                  )}
                />
              </button>

              {open && (
                <div className="mt-3 border-t border-line pt-3">
                  <p className="text-sm text-muted">
                    {localized(
                      locale,
                      library.description_en,
                      library.description_ar,
                    )}
                  </p>
                  <h3 className="mt-4 text-sm font-semibold">
                    {t("availableBooks")}
                  </h3>
                  <ul className="mt-2 flex flex-col gap-2">
                    {books.map(({ book, copies }) => (
                      <li key={book.id}>
                        <Link
                          href={`/books/${book.slug}`}
                          className="flex items-center gap-3 rounded-xl bg-background p-2 transition-colors hover:bg-primary-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <span
                            aria-hidden="true"
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xl"
                            style={{ backgroundColor: `${book.cover_color}22` }}
                          >
                            {book.cover_emoji}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {localized(locale, book.title_en, book.title_ar)}
                            </span>
                            <span className="block truncate text-xs text-muted">
                              {localized(locale, book.author_en, book.author_ar)}
                              {" · "}
                              {t("ages", { min: book.age_min, max: book.age_max })}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs text-muted">
                            {t("copies", { count: copies })}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
