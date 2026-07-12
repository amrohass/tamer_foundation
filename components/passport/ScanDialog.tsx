"use client";

import { useEffect, useRef, useState } from "react";
import { QrCode } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { localized } from "@/lib/localized";
import type { Book } from "@/lib/types";

const SCAN_DURATION_MS = 1600;

export default function ScanDialog({
  open,
  book,
  xpPerScan,
  onConfirm,
  onClose,
}: {
  open: boolean;
  book: Book | null;
  xpPerScan: number;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("passport");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setScanning(true);
      dialog.showModal();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const timer = setTimeout(
        () => setScanning(false),
        reduceMotion ? 0 : SCAN_DURATION_MS,
      );
      return () => clearTimeout(timer);
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={t("dialogLabel")}
      className="m-auto w-full max-w-sm rounded-2xl border border-line bg-surface p-6 text-foreground shadow-soft backdrop:bg-foreground/50"
    >
      {scanning ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <p aria-live="polite" className="font-semibold">
            {t("scanningTitle")}
          </p>
          <div
            aria-hidden="true"
            className="relative h-36 w-36 overflow-hidden rounded-xl border-2 border-dashed border-primary/60 bg-primary-soft/50"
          >
            <QrCode className="absolute inset-0 m-auto size-16 text-primary/40" />
            <div className="scan-line absolute inset-x-2 top-2 h-1 rounded-full bg-primary/70" />
          </div>
          <p className="text-sm text-muted">{t("scanHint")}</p>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {t("cancel")}
          </Button>
        </div>
      ) : book ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <p aria-live="polite" className="font-semibold text-success">
            {t("foundTitle")}
          </p>
          <span
            aria-hidden="true"
            className="flex size-16 items-center justify-center rounded-xl text-3xl"
            style={{ backgroundColor: `${book.cover_color}22` }}
          >
            {book.cover_emoji}
          </span>
          <div>
            <p className="font-medium">
              {localized(locale, book.title_en, book.title_ar)}
            </p>
            <p className="text-sm text-muted">
              {localized(locale, book.author_en, book.author_ar)}
            </p>
          </div>
          <p className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary-dark">
            {t("xpGain", { xp: xpPerScan })}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={onConfirm}>{t("addButton")}</Button>
            <Button variant="ghost" onClick={onClose}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
