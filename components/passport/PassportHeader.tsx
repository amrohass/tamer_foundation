"use client";

import { useLocale, useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import { localized } from "@/lib/localized";
import type { PassportBadge, Profile } from "@/lib/types";

export default function PassportHeader({
  profile,
  xp,
  nextBadge,
}: {
  profile: Profile;
  xp: number;
  nextBadge: PassportBadge | null;
}) {
  const locale = useLocale();
  const t = useTranslations("passport");
  const target = nextBadge?.xp_required ?? xp;
  const percent = Math.min(100, Math.round((xp / Math.max(target, 1)) * 100));

  return (
    <Card className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <span
        aria-hidden="true"
        className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-primary-soft text-4xl sm:mx-0"
      >
        {profile.avatar_emoji}
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-center text-xl font-semibold sm:text-start">
          {localized(locale, profile.display_name_en, profile.display_name_ar)}
        </h2>
        <p className="text-center text-sm text-muted sm:text-start">
          {t("age", { age: profile.age })}
        </p>
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium">{t("xpLabel")}</span>
            <span className="text-muted">
              {nextBadge
                ? t("xpProgress", { current: xp, next: target })
                : t("xpAllEarned")}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={t("xpLabel")}
            aria-valuemin={0}
            aria-valuemax={target}
            aria-valuenow={Math.min(xp, target)}
            className="mt-2 h-3 overflow-hidden rounded-full bg-foreground/10"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
          {nextBadge && (
            <p className="mt-2 text-sm text-muted">
              {t("nextBadge", {
                name: localized(locale, nextBadge.name_en, nextBadge.name_ar),
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
