import { BookOpenCheck, Map, Milestone, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { cardClasses } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";

const sections = [
  { href: "/map", key: "map", icon: Map },
  { href: "/passport", key: "passport", icon: BookOpenCheck },
  { href: "/facilitators", key: "facilitators", icon: Users },
  { href: "/roadmap", key: "roadmap", icon: Milestone },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tSections = await getTranslations("sections");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <section className="text-center">
        <h1 className="text-3xl font-semibold text-primary sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          {t("tagline")}
        </p>
        <p className="mt-2 text-sm text-muted">{t("demoNote")}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t("exploreHeading")}</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {sections.map(({ href, key, icon: Icon }) => (
            <li key={key}>
              <Link
                href={href}
                className={cardClasses(
                  "flex h-full flex-col gap-2 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                )}
              >
                <Icon className="size-8 text-primary" aria-hidden="true" />
                <span className="text-lg font-semibold">
                  {tSections(`${key}.title`)}
                </span>
                <span className="text-sm text-muted">
                  {tSections(`${key}.intro`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
