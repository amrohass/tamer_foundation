import { getTranslations, setRequestLocale } from "next-intl/server";
import FacilitatorHub from "@/components/facilitators/FacilitatorHub";
import { getRecipes } from "@/lib/queries";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "sections.facilitators",
  });
  return { title: t("title") };
}

export default async function FacilitatorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sections.facilitators");
  const recipes = await getRecipes();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      <FacilitatorHub recipes={recipes} />
    </div>
  );
}
