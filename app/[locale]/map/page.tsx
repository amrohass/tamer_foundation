import { getTranslations, setRequestLocale } from "next-intl/server";
import MapExplorer from "@/components/map/MapExplorer";
import { getLibrariesWithBooks } from "@/lib/queries";

// Revalidate periodically so the page serves cached HTML even if the
// database has a hiccup between visits.
export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sections.map" });
  return { title: t("title") };
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sections.map");
  const libraries = await getLibrariesWithBooks();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      <MapExplorer libraries={libraries} mapboxToken={mapboxToken} />
    </div>
  );
}
