"use client";

import { Lock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { localized } from "@/lib/localized";
import type { PassportBadge } from "@/lib/types";

export default function BadgeGrid({
  badges,
  justEarnedSlug,
}: {
  badges: PassportBadge[];
  justEarnedSlug: string | null;
}) {
  const locale = useLocale();
  const t = useTranslations("passport");

  return (
    <section>
      <h2 className="text-lg font-semibold">{t("badgesHeading")}</h2>
      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((badge) => (
          <li
            key={badge.slug}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center",
              badge.earned
                ? "border-primary/40 bg-primary-soft"
                : "border-line bg-surface opacity-70",
              badge.slug === justEarnedSlug && "badge-pop",
            )}
          >
            <span aria-hidden="true" className={cn("text-3xl", !badge.earned && "grayscale")}>
              {badge.icon}
            </span>
            <span className="text-sm font-semibold">
              {localized(locale, badge.name_en, badge.name_ar)}
            </span>
            <span className="text-xs text-muted">
              {localized(locale, badge.description_en, badge.description_ar)}
            </span>
            {badge.earned ? (
              <span className="mt-auto rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                {t("earnedBadge")}
              </span>
            ) : (
              <span className="mt-auto flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-muted">
                <Lock className="size-3" aria-hidden="true" />
                {t("lockedHint", { xp: badge.xp_required })}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
