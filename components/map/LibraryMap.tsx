"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Map, {
  Marker,
  NavigationControl,
  type MapRef,
} from "react-map-gl/mapbox";
import { cn } from "@/lib/cn";
import { localized } from "@/lib/localized";
import type { Library } from "@/lib/types";
import "mapbox-gl/dist/mapbox-gl.css";

// Fits the West Bank and Gaza with a little breathing room.
const PALESTINE_BOUNDS: [[number, number], [number, number]] = [
  [34.05, 31.1],
  [35.65, 32.65],
];

export default function LibraryMap({
  libraries,
  selectedId,
  onSelect,
  token,
}: {
  libraries: Library[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  token: string;
}) {
  const locale = useLocale();
  const t = useTranslations("map");
  const mapRef = useRef<MapRef>(null);

  // Correct Arabic text shaping for map labels.
  useEffect(() => {
    try {
      if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
        mapboxgl.setRTLTextPlugin(
          "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js",
          () => undefined,
          true,
        );
      }
    } catch {
      // Non-fatal: labels render unshaped if the plugin cannot load.
    }
  }, []);

  useEffect(() => {
    const selected = libraries.find((l) => l.id === selectedId);
    if (!selected || !mapRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    mapRef.current.flyTo({
      center: [selected.lon, selected.lat],
      zoom: 11,
      duration: reduceMotion ? 0 : 1200,
    });
  }, [selectedId, libraries]);

  return (
    <div
      role="region"
      aria-label={t("mapRegionLabel")}
      className="h-[360px] overflow-hidden rounded-2xl border border-line shadow-soft lg:h-[560px]"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        initialViewState={{
          bounds: PALESTINE_BOUNDS,
          fitBoundsOptions: { padding: 40 },
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position={locale === "ar" ? "top-left" : "top-right"} />
        {libraries.map((library) => (
          <Marker
            key={library.id}
            longitude={library.lon}
            latitude={library.lat}
            anchor="bottom"
          >
            <button
              type="button"
              onClick={() =>
                onSelect(selectedId === library.id ? null : library.id)
              }
              aria-label={localized(locale, library.name_en, library.name_ar)}
              aria-pressed={selectedId === library.id}
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <MapPin
                aria-hidden="true"
                fill="currentColor"
                stroke="white"
                strokeWidth={1.25}
                className={cn(
                  "drop-shadow transition-transform",
                  selectedId === library.id
                    ? "size-9 text-primary-dark"
                    : "size-7 text-primary",
                )}
              />
            </button>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
