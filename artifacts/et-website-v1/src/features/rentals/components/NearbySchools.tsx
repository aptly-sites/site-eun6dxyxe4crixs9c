"use client";

import { useEffect, useRef, useState } from "react";

type School = {
  name: string;
  type: string;
  grades: string;
  address: string;
  lat: number;
  lon: number;
  distance: number;
  ratingBand?: string;
  url?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function NearbySchools({ coordinates, address }: { coordinates?: [number, number]; address: string }) {
  const [schools, setSchools] = useState<School[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(coordinates ? "loading" : "error");
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<import("leaflet").Map | null>(null);
  const markers = useRef<Array<import("leaflet").Marker>>([]);

  useEffect(() => {
    if (!coordinates || coordinates.length < 2) return;
    const [lon, lat] = coordinates;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const controller = new AbortController();
    setStatus("loading");
    fetch(`/api/nearby-schools?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Schools unavailable");
        const next = Array.isArray(data.schools) ? data.schools : [];
        setSchools(next);
        setStatus(next.length ? "ready" : "empty");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [coordinates]);

  useEffect(() => {
    if (status !== "ready" || !coordinates || !mapElement.current) return;
    let cancelled = false;
    const [homeLon, homeLat] = coordinates;
    void import("leaflet").then((leaflet) => {
      const L = leaflet.default;
      if (cancelled || !mapElement.current) return;
      map.current?.remove();
      const nextMap = L.map(mapElement.current, { scrollWheelZoom: false }).setView([homeLat, homeLon], 12);
      map.current = nextMap;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(nextMap);
      const homeIcon = L.divIcon({
        className: "school-home-marker",
        html: '<span aria-hidden="true">★</span>',
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      });
      L.marker([homeLat, homeLon], { icon: homeIcon, zIndexOffset: 1000 })
        .addTo(nextMap)
        .bindPopup(`<strong>${escapeHtml(address)}</strong><span>Rental home</span>`);
      const bounds = L.latLngBounds([[homeLat, homeLon]]);
      markers.current = schools.map((school, index) => {
        const icon = L.divIcon({
          className: "school-number-marker",
          html: `<span>${index + 1}</span>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
        const marker = L.marker([school.lat, school.lon], { icon })
          .addTo(nextMap)
          .bindPopup(`<strong>${escapeHtml(school.name)}</strong><span>${escapeHtml(school.grades || "Grades not listed")} · ${school.distance.toFixed(1)} mi</span>`);
        bounds.extend([school.lat, school.lon]);
        return marker;
      });
      nextMap.fitBounds(bounds, { padding: [38, 38], maxZoom: 13 });
      window.setTimeout(() => nextMap.invalidateSize(), 0);
    }).catch(() => setStatus("error"));
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      markers.current = [];
    };
  }, [address, coordinates, schools, status]);

  const openMarker = (index: number) => {
    const marker = markers.current[index];
    if (!marker || !map.current) return;
    map.current.panTo(marker.getLatLng(), { animate: true });
    marker.openPopup();
  };

  return (
    <section className="schools-section" id="nearby-schools">
      <p className="eyebrow">Explore the neighborhood</p>
      <h2>Nearby schools</h2>
      <p className="section-intro">See public, charter, and private schools near this home. Distances are measured from the listing location.</p>
      <div className={`schools-layout ${status !== "ready" ? "schools-not-ready" : ""}`}>
        <div ref={mapElement} className="school-map" role="application" aria-label={`Map of schools near ${address}`} />
        <div className="school-list" aria-live="polite">
          {status === "loading" && <div className="school-state"><span className="school-spinner" /><p>Finding nearby schools…</p></div>}
          {status === "empty" && <div className="school-state"><p>No nearby schools were returned for this location.</p></div>}
          {status === "error" && <div className="school-state"><p>Nearby school information is temporarily unavailable.</p></div>}
          {status === "ready" && schools.map((school, index) => {
            const content = <>
              <span className="school-number">{index + 1}</span>
              <span className="school-card-copy">
                <strong>{school.name}</strong>
                <span>{[school.type, school.grades, `${school.distance.toFixed(1)} mi`].filter(Boolean).join(" · ")}</span>
                <small>{school.address}</small>
                {school.ratingBand && <em>{school.ratingBand}</em>}
              </span>
            </>;
            return school.url
              ? <a key={`${school.name}-${index}`} className="school-card" href={school.url} target="_blank" rel="noreferrer" onMouseEnter={() => openMarker(index)} onFocus={() => openMarker(index)}>{content}</a>
              : <button key={`${school.name}-${index}`} type="button" className="school-card" onMouseEnter={() => openMarker(index)} onFocus={() => openMarker(index)} onClick={() => openMarker(index)}>{content}</button>;
          })}
        </div>
      </div>
      <p className="school-attribution">School information provided by <a href="https://www.greatschools.org/" target="_blank" rel="noreferrer">GreatSchools</a>. School boundaries and availability should be independently verified.</p>
    </section>
  );
}
