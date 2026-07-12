"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/Button";

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
      className={buttonClasses("secondary", "sm")}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={targetLocale}>{t("label")}</span>
    </button>
  );
}
