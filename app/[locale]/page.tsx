import { getTranslations, setRequestLocale } from "next-intl/server";

// Placeholder home — replaced by the app shell once the design system and
// features land (build steps 3+).
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-primary">{t("title")}</h1>
        <p className="mt-4 text-lg">{t("tagline")}</p>
      </div>
    </main>
  );
}
