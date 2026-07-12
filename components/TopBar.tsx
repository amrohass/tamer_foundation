import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

export default function TopBar() {
  const t = useTranslations("topBar");

  return (
    <header className="border-b border-foreground/10 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t("homeLink")}
        </Link>
        <LanguageToggle />
      </nav>
    </header>
  );
}
