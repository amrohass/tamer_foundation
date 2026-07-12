import { getTranslations, setRequestLocale } from "next-intl/server";
import PassportView from "@/components/passport/PassportView";
import { getPassportData } from "@/lib/queries";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sections.passport" });
  return { title: t("title") };
}

export default async function PassportPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sections.passport");
  const passport = await getPassportData();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      <PassportView initial={passport} />
    </div>
  );
}
