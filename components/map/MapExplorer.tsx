"use client";

import { useMemo, useState } from "react";
import { MapPinOff, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import { localized } from "@/lib/localized";
import type { Library } from "@/lib/types";
import LibraryList from "./LibraryList";
import LibraryMap from "./LibraryMap";

export default function MapExplorer({
  libraries,
  mapboxToken,
}: {
  libraries: Library[];
  mapboxToken: string | null;
}) {
  const locale = useLocale();
  const t = useTranslations("map");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cities = useMemo(() => {
    const seen = new Map<string, string>();
    for (const l of libraries) {
      if (!seen.has(l.city_en)) {
        seen.set(l.city_en, localized(locale, l.city_en, l.city_ar));
      }
    }
    return [...seen.entries()];
  }, [libraries, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return libraries.filter((l) => {
      if (city !== "all" && l.city_en !== city) return false;
      if (!q) return true;
      return [l.name_en, l.name_ar, l.city_en, l.city_ar].some((value) =>
        value.toLowerCase().includes(q),
      );
    });
  }, [libraries, query, city]);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1 block text-sm font-medium">
            {t("searchLabel")}
          </span>
          <span className="relative block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-full border border-line bg-surface py-2 pe-4 ps-9 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </span>
        </label>
        <label className="sm:w-56">
          <span className="mb-1 block text-sm font-medium">{t("cityLabel")}</span>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-full border border-line bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <option value="all">{t("allCities")}</option>
            {cities.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {t("resultsCount", { count: filtered.length })}
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(320px,400px)_1fr] lg:items-start">
        <div className="order-2 lg:order-none lg:max-h-[560px] lg:overflow-y-auto lg:pe-1">
          <LibraryList
            libraries={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="order-1 lg:order-none">
          {mapboxToken ? (
            <LibraryMap
              libraries={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              token={mapboxToken}
            />
          ) : (
            <Card className="flex h-[360px] flex-col items-center justify-center gap-3 text-center lg:h-[560px]">
              <MapPinOff className="size-10 text-muted" aria-hidden="true" />
              <p className="font-medium">{t("noMapTitle")}</p>
              <p className="max-w-sm text-sm text-muted">{t("noMapBody")}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
