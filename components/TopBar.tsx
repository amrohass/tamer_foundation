"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import LanguageToggle from "./LanguageToggle";
import RoleSwitcher from "./RoleSwitcher";

const navLinks = [
  { href: "/map", key: "map" },
  { href: "/passport", key: "passport" },
  { href: "/facilitators", key: "facilitators" },
  { href: "/roadmap", key: "roadmap" },
] as const;

export default function TopBar() {
  const t = useTranslations("topBar");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (href: string, block?: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      block && "block px-4 py-2",
      pathname === href
        ? "bg-primary-soft text-primary-dark"
        : "text-foreground hover:bg-foreground/5",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="rounded text-base font-bold text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg"
        >
          {t("homeLink")}
        </Link>

        <nav aria-label={t("mainNav")} className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={linkClasses(href)}
            >
              {tNav(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <RoleSwitcher />
          </div>
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="rounded-full p-2 text-foreground hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t("mainNav")}
          className="border-t border-line px-4 pb-4 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className={linkClasses(href, true)}
                >
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-line pt-3">
            <RoleSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
