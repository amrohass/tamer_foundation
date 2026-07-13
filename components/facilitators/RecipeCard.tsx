import { Clock, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cardClasses } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { localized } from "@/lib/localized";
import type { Recipe } from "@/lib/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const locale = useLocale();
  const t = useTranslations("hub");
  const tThemes = useTranslations("themes");

  return (
    <article className={cardClasses("flex h-full flex-col gap-3 p-5")}>
      <h3 className="font-semibold">
        {localized(locale, recipe.title_en, recipe.title_ar)}
      </h3>
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-primary-dark">
          {tThemes(recipe.theme)}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-muted">
          <Users className="size-3" aria-hidden="true" />
          {t("ages", { min: recipe.age_min, max: recipe.age_max })}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-muted">
          <Clock className="size-3" aria-hidden="true" />
          {t("duration", { minutes: recipe.duration_minutes })}
        </span>
      </div>
      <p className="text-sm text-muted">
        {localized(locale, recipe.summary_en, recipe.summary_ar)}
      </p>
      {recipe.book && (
        <Link
          href={`/books/${recipe.book.slug}`}
          className="flex items-center gap-2 rounded-lg text-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-base"
            style={{ backgroundColor: `${recipe.book.cover_color}22` }}
          >
            {recipe.book.cover_emoji}
          </span>
          <span className="min-w-0 truncate">
            <span className="text-muted">{t("bookLabel")}: </span>
            {localized(locale, recipe.book.title_en, recipe.book.title_ar)}
          </span>
        </Link>
      )}
      <blockquote className="mt-auto border-s-2 border-primary/40 ps-3 text-sm text-muted">
        <span className="mb-0.5 block text-xs font-semibold text-primary-dark">
          {t("lessonLabel")}
        </span>
        {localized(locale, recipe.lesson_en, recipe.lesson_ar)}
      </blockquote>
    </article>
  );
}
