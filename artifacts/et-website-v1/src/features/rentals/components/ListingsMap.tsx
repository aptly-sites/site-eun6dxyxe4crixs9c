"use client";

import { useEffect, useRef, useState } from "react";
import type { Listing } from "../lib/aptly";
import { dollars } from "../lib/aptly";
import { listingPath } from "../lib/seo";

function escapeHtml(value: string | number | undefined) {
  return String(value ?? "—")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function ListingsMap({ listings, selectedId, onActive, onSelect }: {
  listings: Listing[];
  selectedId?: string;
  onActive: (id?: string) => void;
  onSelect: (id: string) => void;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const allBoundsRef = useRef<import("leaflet").LatLngBounds | null>(null);
  const allZoomRef = useRef<number>(0);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const selectedRef = useRef(selectedId);
  const [mapError, setMapError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("leaflet").then(async (leaflet) => {
      const L = leaflet.default;
      (globalThis as typeof globalThis & { L: typeof L }).L = L;
      await import("leaflet.markercluster");
      if (cancelled || !elementRef.current) return;
      if (!mapRef.current) {
        mapRef.current = L.map(elementRef.current, { zoomControl: true, scrollWheelZoom: false });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 20,
        }).addTo(mapRef.current);
        const updateShowAll = () => {
          const map = mapRef.current;
          const bounds = allBoundsRef.current;
          if (!map || !bounds) return;
          setShowAll(map.getZoom() > allZoomRef.current || !map.getBounds().contains(bounds));
        };
        mapRef.current.on("zoomend moveend", updateShowAll);
      }
      layerRef.current?.remove();
      markersRef.current.clear();
      const layer = L.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 58,
        iconCreateFunction: (cluster) => L.divIcon({
          className: "listing-cluster-wrap",
          html: `<span class="listing-cluster"><b>${cluster.getChildCount()}</b><small>homes</small></span>`,
          iconSize: [54, 54],
          iconAnchor: [27, 27],
        }),
      }).addTo(mapRef.current);
      layerRef.current = layer;
      const points: import("leaflet").LatLngExpression[] = [];

      listings.forEach((listing) => {
        const point = listing.address?.geopoint;
        if (!point || point.length < 2 || !point.every(Number.isFinite) || Math.abs(point[0]) > 180 || Math.abs(point[1]) > 90) return;
        const latLng: import("leaflet").LatLngExpression = [point[1], point[0]];
        points.push(latLng);
        const icon = L.divIcon({
          className: "price-marker-wrap",
          html: `<span class="price-marker">${dollars(listing.marketRent?.amount).replace("$", "$ ")}</span>`,
          iconSize: [82, 34],
          iconAnchor: [41, 17],
        });
        const marker = L.marker(latLng, { icon }).addTo(layer);
        markersRef.current.set(listing._id, marker);
        marker.on("mouseover", () => onActive(listing._id));
        marker.on("mouseout", () => onActive(undefined));
        const photo = listing.photo?.[0] || listing.marketingFiles?.[0];
        const address = [listing.address?.address, listing.address?.address2 ? `#${listing.address.address2}` : "", listing.address?.city, listing.address?.stateCode, listing.address?.postalCode].filter(Boolean).join(" ");
        marker.bindPopup(`<a class="map-preview" href="${escapeHtml(listingPath(listing))}">
          ${photo ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(listing.address?.address || "Rental home")}">` : ""}
          <span class="map-preview-body">
            <strong>${escapeHtml(address)}</strong>
            <span class="map-preview-facts"><b>${escapeHtml(listing.beds)}</b> bd <i></i> <b>${escapeHtml(listing.baths)}</b> ba <i></i> <b>${escapeHtml(listing.totalArea?.toLocaleString())}</b> sq ft</span>
            <span class="map-preview-price">${escapeHtml(dollars(listing.marketRent?.amount))}/mo</span>
          </span>
        </a>`, { closeButton: false, offset: [0, -12], className: "property-preview-popup", maxWidth: 285 });
        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => { if (selectedRef.current !== listing._id) marker.closePopup(); });
        marker.on("click", () => {
          selectedRef.current = listing._id;
          onSelect(listing._id);
          marker.openPopup();
        });
      });

      if (points.length === 1) {
        allBoundsRef.current = L.latLngBounds(points);
        mapRef.current.setView(points[0], 14);
        allZoomRef.current = 14;
      }
      else if (points.length) {
        allBoundsRef.current = L.latLngBounds(points);
        mapRef.current.fitBounds(allBoundsRef.current, { padding: [42, 42], maxZoom: 12 });
        allZoomRef.current = mapRef.current.getZoom();
      }
      else mapRef.current.setView([39.5, -84.5], 8);
      setShowAll(false);
      setTimeout(() => {
        mapRef.current?.invalidateSize();
        if (mapRef.current && allBoundsRef.current) {
          allZoomRef.current = mapRef.current.getZoom();
        }
      }, 0);
    }).catch(() => { if (!cancelled) setMapError(true); });
    return () => { cancelled = true; };
  }, [listings, onActive, onSelect]);

  useEffect(() => {
    selectedRef.current = selectedId;
    if (!selectedId) return;
    const marker = markersRef.current.get(selectedId);
    if (!marker || !mapRef.current) return;
    mapRef.current.panTo(marker.getLatLng(), { animate: true });
    marker.openPopup();
  }, [selectedId]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth > 0) mapRef.current?.invalidateSize();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    mapRef.current?.remove();
    mapRef.current = null;
  }, []);

  const showAllListings = () => {
    if (!mapRef.current || !allBoundsRef.current) return;
    mapRef.current.fitBounds(allBoundsRef.current, { padding: [42, 42], maxZoom: 12 });
    setShowAll(false);
  };

  return <div className="listings-map-wrap">
    {mapError && <p className="rental-status" role="status">The map is unavailable. You can still browse all homes in the list.</p>}
    <div ref={elementRef} className="listings-map" aria-label={`Map showing ${listings.length} rental homes`} />
    {showAll && <button className="show-all-map" onClick={showAllListings}>Show all listings</button>}
  </div>;
}
