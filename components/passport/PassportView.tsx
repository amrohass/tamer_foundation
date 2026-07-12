"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { localized } from "@/lib/localized";
import type { Book, PassportData } from "@/lib/types";
import BadgeGrid from "./BadgeGrid";
import PassportHeader from "./PassportHeader";
import ReadingLogList from "./ReadingLogList";
import ScanDialog from "./ScanDialog";

// Simulated check-in reward, sized so a live demo unlocks the next badge in
// two scans (320 seed XP + 2 x 90 = 500). State is client-only by design:
// refreshing resets the passport, keeping the demo repeatable.
const XP_PER_SCAN = 90;

export default function PassportView({ initial }: { initial: PassportData }) {
  const locale = useLocale();
  const t = useTranslations("passport");
  const [xp, setXp] = useState(initial.profile.xp);
  const [loggedBooks, setLoggedBooks] = useState(initial.loggedBooks);
  const [pool, setPool] = useState(initial.unloggedBooks);
  const [scanOpen, setScanOpen] = useState(false);
  const [scannedBook, setScannedBook] = useState<Book | null>(null);
  const [justEarnedSlug, setJustEarnedSlug] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const badges = initial.badges.map((badge) => ({
    ...badge,
    earned: badge.earned || xp >= badge.xp_required,
  }));
  const nextBadge =
    [...badges]
      .sort((a, b) => a.xp_required - b.xp_required)
      .find((badge) => !badge.earned) ?? null;

  const startScan = () => {
    if (pool.length === 0) return;
    setScannedBook(pool[Math.floor(Math.random() * pool.length)]);
    setScanOpen(true);
  };

  const confirmScan = () => {
    if (!scannedBook) return;
    const newXp = xp + XP_PER_SCAN;
    const unlocked = badges.find(
      (badge) => !badge.earned && newXp >= badge.xp_required,
    );
    setXp(newXp);
    setLoggedBooks([scannedBook, ...loggedBooks]);
    setPool(pool.filter((book) => book.id !== scannedBook.id));
    setJustEarnedSlug(unlocked?.slug ?? null);
    const title = localized(locale, scannedBook.title_en, scannedBook.title_ar);
    setAnnouncement(
      unlocked
        ? `${t("logged", { title, xp: XP_PER_SCAN })} ${t("badgeEarnedAnnounce", { name: localized(locale, unlocked.name_en, unlocked.name_ar) })}`
        : t("logged", { title, xp: XP_PER_SCAN }),
    );
    setScanOpen(false);
    setScannedBook(null);
  };

  return (
    <div className="mt-6 flex flex-col gap-8">
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <PassportHeader profile={initial.profile} xp={xp} nextBadge={nextBadge} />

      <div className="flex flex-col items-center gap-2">
        <Button onClick={startScan} disabled={pool.length === 0}>
          <ScanLine className="size-4" aria-hidden="true" />
          {t("scanButton")}
        </Button>
        {pool.length === 0 && (
          <p className="text-sm text-muted">{t("noMoreBooks")}</p>
        )}
      </div>

      <BadgeGrid badges={badges} justEarnedSlug={justEarnedSlug} />

      <ReadingLogList books={loggedBooks} />

      <ScanDialog
        open={scanOpen}
        book={scannedBook}
        xpPerScan={XP_PER_SCAN}
        onConfirm={confirmScan}
        onClose={() => {
          setScanOpen(false);
          setScannedBook(null);
        }}
      />
    </div>
  );
}
