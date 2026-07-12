export function localized(locale: string, en: string, ar: string): string {
  return locale === "ar" ? ar : en;
}
