import { MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import DiscussionQuestions from "@/components/copilot/DiscussionQuestions";
import { buttonClasses } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { localized } from "@/lib/localized";
import { getBookWithLibraries } from "@/lib/queries";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const data = await getBookWithLibraries(slug);
  if (!data) return {};
  return { title: localized(locale, data.book.title_en, data.book.title_ar) };
}

export default async function BookPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const data = await getBookWithLibraries(slug);
  if (!data) notFound();
  const { book, libraries } = data;
  const t = await getTranslations("book");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-start">
        <span
          aria-hidden="true"
          className="flex size-28 shrink-0 items-center justify-center rounded-2xl text-6xl shadow-soft"
          style={{ backgroundColor: `${book.cover_color}22` }}
        >
          {book.cover_emoji}
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {localized(locale, book.title_en, book.title_ar)}
          </h1>
          <p className="mt-1 text-muted">
            {localized(locale, book.author_en, book.author_ar)}
          </p>
          <span className="mt-3 inline-block rounded-full bg-foreground/5 px-3 py-1 text-sm font-medium text-muted">
            {t("ages", { min: book.age_min, max: book.age_max })}
          </span>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed">
            {localized(locale, book.summary_en, book.summary_ar)}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{t("availableAt")}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {libraries.map((library) => (
            <li
              key={library.id}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm"
            >
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              {localized(locale, library.name_en, library.name_ar)}
              <span className="text-muted">
                · {localized(locale, library.city_en, library.city_ar)}
              </span>
            </li>
          ))}
        </ul>
        <Link href="/map" className={buttonClasses("secondary", "sm", "mt-4")}>
          {t("viewOnMap")}
        </Link>
      </section>

      <DiscussionQuestions bookSlug={book.slug} />
    </div>
  );
}
