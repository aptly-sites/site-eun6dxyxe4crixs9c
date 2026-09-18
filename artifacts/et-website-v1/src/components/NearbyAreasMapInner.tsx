/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { MapArea } from "./NearbyAreasMap";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
const MAP_ID =
  (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string | undefined) || "DEMO_MAP_ID";
const BASE = import.meta.env.BASE_URL;

const GOLD = "#B4975A";
const DARK_NAVY = "#1B2A3A";

// Guard: setOptions must only be called once per page load.
// Without this guard, hot-reloads and the GA script both trigger
// duplicate calls and produce console warnings.
let optionsSet = false;
function ensureOptions() {
  if (optionsSet) return;
  optionsSet = true;
  setOptions({ key: API_KEY!, v: "weekly" });
}

interface InnerProps {
  focalName: string;
  focalCoords: { lat: number; lng: number };
  areas: MapArea[];
}

export default function NearbyAreasMapInner({ focalName, focalCoords, areas }: InnerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current || !API_KEY) return;

    let cancelled = false;
    ensureOptions();

    (async () => {
      try {
        const [
          { Map, InfoWindow },
          { AdvancedMarkerElement, PinElement },
          { LatLngBounds },
        ] = await Promise.all([
          importLibrary("maps") as Promise<google.maps.MapsLibrary>,
          importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
          importLibrary("core") as Promise<google.maps.CoreLibrary>,
        ]);

        if (cancelled || !ref.current) return;

        const map = new Map(ref.current, {
          center: focalCoords,
          zoom: 11,
          mapId: MAP_ID,
          colorScheme: "DARK" as google.maps.ColorScheme,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: "cooperative",
          backgroundColor: DARK_NAVY,
        });

        const bounds = new LatLngBounds();
        bounds.extend(focalCoords);

        const infoWindow = new InfoWindow();

        const focalPin = new PinElement({
          background: "#FFFFFF",
          borderColor: GOLD,
          glyphColor: GOLD,
          scale: 1.3,
        });
        const focalMarker = new AdvancedMarkerElement({
          position: focalCoords,
          map,
          title: focalName,
          content: focalPin,
          zIndex: 999,
          gmpClickable: true,
        });
        focalMarker.addListener("gmp-click", () => {
          infoWindow.setContent(
            `<div style="font-family:'Inter',sans-serif;padding:2px 4px;color:#1B2A3A;"><strong style="font-size:14px;">${focalName}</strong><br/><span style="font-size:11px;color:#666;">You are here</span></div>`
          );
          infoWindow.open({ map, anchor: focalMarker });
        });

        areas.forEach((area, idx) => {
          bounds.extend(area.coords);
          const pin = new PinElement({
            background: GOLD,
            borderColor: "#FFFFFF",
            glyphColor: "#FFFFFF",
            glyphText: String(idx + 1),
            scale: 1.2,
          });
          const marker = new AdvancedMarkerElement({
            position: area.coords,
            map,
            title: area.name,
            content: pin,
            gmpClickable: true,
          });

          marker.addListener("gmp-click", () => {
            const linkHref =
              area.href && area.href !== "#"
                ? `${BASE}${area.href.replace(/^\//, "")}`
                : null;
            const linkHtml = area.comingSoon
              ? `<span style="font-size:11px;color:#888;">Coming soon</span>`
              : linkHref
                ? `<a href="${linkHref}" style="font-size:12px;color:#1B2A3A;font-weight:600;text-decoration:none;border-bottom:1px solid ${GOLD};">View page →</a>`
                : `<span style="font-size:11px;color:#888;">Page coming soon</span>`;
            infoWindow.setContent(
              `<div style="font-family:'Inter',sans-serif;padding:2px 4px;color:#1B2A3A;"><strong style="font-size:14px;">${area.name}</strong><br/>${linkHtml}</div>`
            );
            infoWindow.open({ map, anchor: marker });
          });
        });

        if (areas.length > 0) {
          map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg =
            err instanceof Error ? err.message : String(err);
          // InvalidKey means the key exists but is rejected by Google —
          // typically HTTP referrer restrictions in GCP don't cover this domain.
          const isKeyError =
            msg.includes("InvalidKey") ||
            msg.includes("ApiNotActivatedMapError") ||
            msg.includes("MissingKeyMapError");
          setLoadError(
            isKeyError
              ? "restricted"
              : "error"
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [focalName, focalCoords, areas]);

  if (!API_KEY) {
    return <MapUnavailable reason="no-key" />;
  }

  if (loadError) {
    return <MapUnavailable reason={loadError as "restricted" | "error"} />;
  }

  return (
    <div
      ref={ref}
      className="w-full h-[460px] md:h-[540px] border border-primary/15 overflow-hidden"
      style={{ backgroundColor: DARK_NAVY }}
    />
  );
}

function MapUnavailable({ reason }: { reason: string }) {
  const message =
    reason === "restricted"
      ? "Map is configured for the live site. It will display correctly on www.equityteam.com."
      : reason === "no-key"
        ? "Google Maps API key not configured for this environment."
        : "Map failed to load. Check the browser console for details.";

  return (
    <div className="w-full h-[460px] md:h-[540px] border border-white/10 flex flex-col items-center justify-center gap-3 p-6 text-center bg-primary/60">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B4975A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      <p className="font-sans text-white/60 text-sm max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}
