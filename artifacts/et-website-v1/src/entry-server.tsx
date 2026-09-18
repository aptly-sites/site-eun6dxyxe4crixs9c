import { RentalDataContext } from "@/features/rentals/RentalData";
import { serializeRentalData, type RentalData } from "@/features/rentals/lib/data";
export { loadRentalData } from "@/features/rentals/lib/data";
export { listingPath, cityPath } from "@/features/rentals/lib/seo";
import { renderToString } from "react-dom/server";
import { useSyncExternalStore } from "react";
import App from "./App";
import { headStore, type HeadData } from "@/lib/head-store";

// Re-exported so scripts/prerender.ts can read the route list from the
// Vite-built SSR bundle (where @/ aliases and import.meta.env resolve).
export { getPrerenderRoutes } from "@/lib/prerenderRoutes";

function createStaticLocationHook(path: string) {
  const snapshot = () => path;
  const noSubscribe = () => () => {};
  const noNavigate = () => {};

  function useStaticLocation(): [string, typeof noNavigate] {
    const loc = useSyncExternalStore(noSubscribe, snapshot, snapshot);
    return [loc, noNavigate];
  }

  useStaticLocation.searchHook = function useStaticSearch() {
    return useSyncExternalStore(noSubscribe, () => "", () => "");
  };

  return useStaticLocation;
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHeadHtml(hd: HeadData): string {
  const p: string[] = [];
  p.push(`<title>${esc(hd.title)}</title>`);
  p.push(`<meta name="description" content="${esc(hd.description)}" />`);
  p.push(`<meta name="robots" content="${esc(hd.robots)}" />`);
  p.push(`<link rel="canonical" href="${esc(hd.canonical)}" />`);
  p.push(`<meta property="og:title" content="${esc(hd.title)}" />`);
  p.push(`<meta property="og:description" content="${esc(hd.description)}" />`);
  p.push(`<meta property="og:url" content="${esc(hd.canonical)}" />`);
  p.push(`<meta property="og:type" content="${hd.ogType}" />`);
  p.push(`<meta property="og:image" content="${esc(hd.ogImage)}" />`);
  p.push(`<meta property="og:image:alt" content="${esc(hd.ogImageAlt)}" />`);
  p.push(`<meta property="og:site_name" content="EquityTeam Property Management" />`);
  p.push(`<meta property="og:locale" content="en_US" />`);
  p.push(`<meta name="twitter:card" content="summary_large_image" />`);
  p.push(`<meta name="twitter:title" content="${esc(hd.title)}" />`);
  p.push(`<meta name="twitter:description" content="${esc(hd.description)}" />`);
  p.push(`<meta name="twitter:image" content="${esc(hd.ogImage)}" />`);
  p.push(`<meta name="twitter:image:alt" content="${esc(hd.ogImageAlt)}" />`);
  p.push(`<meta name="twitter:site" content="@EquityTeamPM" />`);
  if (hd.author) p.push(`<meta name="author" content="${esc(hd.author)}" />`);
  if (hd.publishedTime) p.push(`<meta property="article:published_time" content="${esc(hd.publishedTime)}" />`);
  if (hd.modifiedTime) p.push(`<meta property="article:modified_time" content="${esc(hd.modifiedTime)}" />`);
  if (hd.author) p.push(`<meta property="article:author" content="${esc(hd.author)}" />`);
  if (hd.section) p.push(`<meta property="article:section" content="${esc(hd.section)}" />`);
  for (const tag of hd.tags ?? []) p.push(`<meta property="article:tag" content="${esc(tag)}" />`);
  if (hd.schemas.length > 0) {
    p.push(`<script type="application/ld+json" id="page-schema">${JSON.stringify(hd.schemas).replace(/</g, "\\u003c")}</script>`);
  }
  return p.join("\n    ");
}

export function render(pagePath: string, base: string, rentalData?: RentalData): { html: string; headHtml: string; dataHtml: string } {
  headStore.current = null;

  const hook = createStaticLocationHook(pagePath);

  const html = renderToString(
    <RentalDataContext.Provider value={rentalData}>
      <App base={base} hook={hook} />
    </RentalDataContext.Provider>
  );

  const headHtml = headStore.current ? buildHeadHtml(headStore.current) : "";
  return { html, headHtml, dataHtml: serializeRentalData(rentalData) };
}
