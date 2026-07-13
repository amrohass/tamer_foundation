import {
  BookOpen,
  BookOpenCheck,
  Check,
  Clock,
  Map,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

type ComponentStatus = "live" | "full" | "preview";

type PlatformComponent = {
  key: string;
  icon: LucideIcon;
  status: ComponentStatus;
  href?: string;
  bullets: Array<{ key: string; status: "live" | "full" }>;
};

const components: PlatformComponent[] = [
  {
    key: "geo",
    icon: Map,
    status: "live",
    href: "/map",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "live" },
      { key: "b3", status: "full" },
    ],
  },
  {
    key: "passport",
    icon: BookOpenCheck,
    status: "live",
    href: "/passport",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "live" },
      { key: "b3", status: "full" },
    ],
  },
  {
    key: "hub",
    icon: Users,
    status: "live",
    href: "/facilitators",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "live" },
      { key: "b3", status: "full" },
    ],
  },
  {
    key: "reading",
    icon: BookOpen,
    status: "full",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "live" },
      { key: "b3", status: "full" },
    ],
  },
  {
    key: "apps",
    icon: Smartphone,
    status: "full",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "full" },
      { key: "b3", status: "full" },
    ],
  },
  {
    key: "admin",
    icon: ShieldCheck,
    status: "preview",
    bullets: [
      { key: "b1", status: "live" },
      { key: "b2", status: "full" },
      { key: "b3", status: "full" },
    ],
  },
];

const statusStyles: Record<ComponentStatus, string> = {
  live: "bg-success/10 text-success",
  preview: "bg-accent/10 text-accent",
  full: "bg-foreground/5 text-muted",
};

const statusLabelKey: Record<ComponentStatus, string> = {
  live: "statusLive",
  preview: "statusPreview",
  full: "statusFull",
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sections.roadmap" });
  return { title: t("title") };
}

export default async function RoadmapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tSection = await getTranslations("sections.roadmap");
  const t = await getTranslations("roadmap");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">{tSection("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{tSection("intro")}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {components.map(({ key, icon: Icon, status, href, bullets }) => (
          <li key={key}>
            <Card className="flex h-full flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <Icon className="size-7 text-primary" aria-hidden="true" />
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusStyles[status],
                  )}
                >
                  {t(statusLabelKey[status])}
                </span>
              </div>
              <h2 className="font-semibold">{t(`components.${key}.title`)}</h2>
              <ul className="flex flex-col gap-2">
                {bullets.map((bullet) => (
                  <li key={bullet.key} className="flex items-start gap-2 text-sm">
                    {bullet.status === "live" ? (
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock
                        className="mt-0.5 size-4 shrink-0 text-muted"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(bullet.status === "full" && "text-muted")}
                    >
                      {t(`components.${key}.${bullet.key}`)}
                    </span>
                  </li>
                ))}
              </ul>
              {href && (
                <Link
                  href={href}
                  className="mt-auto self-start rounded text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("open")}
                </Link>
              )}
            </Card>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-sm text-muted">{t("note")}</p>
    </div>
  );
}
