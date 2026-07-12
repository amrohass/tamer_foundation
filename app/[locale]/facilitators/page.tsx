import { Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionPlaceholder from "@/components/SectionPlaceholder";

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
  return <SectionPlaceholder icon={Users} namespace="facilitators" />;
}
