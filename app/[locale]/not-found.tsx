import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <Compass className="size-12 text-primary" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-md text-muted">{t("body")}</p>
      <Link href="/" className={buttonClasses("primary", "md")}>
        {t("home")}
      </Link>
    </div>
  );
}
