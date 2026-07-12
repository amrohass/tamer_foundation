import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Card from "@/components/ui/Card";

// Interim scaffold for section pages — each is replaced by its real feature
// in build steps 5-9.
export default async function SectionPlaceholder({
  icon: Icon,
  namespace,
}: {
  icon: LucideIcon;
  namespace: "map" | "passport" | "facilitators" | "roadmap";
}) {
  const t = await getTranslations(`sections.${namespace}`);
  const tPlaceholder = await getTranslations("placeholders");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      <Card className="mt-8 flex flex-col items-center gap-4 py-16 text-center">
        <Icon className="size-10 text-primary" aria-hidden="true" />
        <p className="max-w-md text-muted">{tPlaceholder("generic")}</p>
      </Card>
    </div>
  );
}
