"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageToggle() {
  const t = useTranslations("languageToggle");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const targetLocale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: targetLocale })}
      aria-label={t("ariaLabel")}
      className="flex items-center gap-2 rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={targetLocale}>{t("label")}</span>
    </button>
  );
}
