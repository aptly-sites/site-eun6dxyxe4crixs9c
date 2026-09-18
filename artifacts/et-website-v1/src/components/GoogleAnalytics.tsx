import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    GA_MEASUREMENT_ID?: string;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a GA4 `page_view` event on every wouter route change.
 * The gtag.js loader + `gtag("config", ID, { send_page_view: false })` lives
 * in index.html, so this component only handles SPA navigation tracking.
 * Renders nothing.
 */
export function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = window.GA_MEASUREMENT_ID;
    if (!id || !id.startsWith("G-") || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
      send_to: id,
    });
  }, [location]);

  return null;
}
