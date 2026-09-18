/**
 * Location Registry — single source of truth for every market, region, and
 * neighborhood the EquityTeam site serves.
 *
 * Markets and the services they offer:
 *   - Cincinnati, OH   → residential property management + multi-family + property services
 *   - Dayton, OH       → residential property management + multi-family + property services
 *   - Norris Lake, TN  → short-term/vacation rentals only
 *
 * URL conventions (kept SEO-clean by putting the service in the slug):
 *   - OH residential: `/{slug}-property-management`
 *   - TN vacation:    `/{slug}-vacation-rental-management`
 *
 * To add a new market:
 *   1. Add a RegionMeta entry to REGIONS
 *   2. Add the region's slugs to REGION_SLUGS
 *   3. Add a LOCATION_DATA entry per slug in locationData.ts
 *   4. Run `pnpm --filter @workspace/et-website-v1 sitemap` to regenerate sitemap.xml
 */

export type MarketCode = "OH" | "TN";
export type RegionId = "cincinnati" | "dayton" | "norris-lake";
export type ServiceLine = "ltr" | "multifamily" | "vacation" | "property-services";
export type PrimaryService = "ltr" | "vacation";

export interface RegionMeta {
  id: RegionId;
  name: string;            // "Cincinnati"
  state: MarketCode;       // "OH"
  stateName: string;       // "Ohio"
  services: ServiceLine[];
  primaryService: PrimaryService;
  urlSuffix: string;       // "-property-management" | "-vacation-rental-management"
  hubBlurb: string;
  serviceLabel: string;    // shown on /areas-we-serve card under city name
  cityServiceWord: string; // "rental property" | "vacation rental"
}

export const REGIONS: Record<RegionId, RegionMeta> = {
  "cincinnati": {
    id: "cincinnati",
    name: "Cincinnati",
    state: "OH",
    stateName: "Ohio",
    services: ["ltr", "multifamily", "property-services"],
    primaryService: "ltr",
    urlSuffix: "-property-management",
    hubBlurb: "Residential property management and investment portfolios across the greater Cincinnati metro.",
    serviceLabel: "Residential Property Management",
    cityServiceWord: "rental property",
  },
  "dayton": {
    id: "dayton",
    name: "Dayton",
    state: "OH",
    stateName: "Ohio",
    services: ["ltr", "multifamily", "property-services"],
    primaryService: "ltr",
    urlSuffix: "-property-management",
    hubBlurb: "Residential property management and investment portfolios across the greater Dayton metro.",
    serviceLabel: "Residential Property Management",
    cityServiceWord: "rental property",
  },
  "norris-lake": {
    id: "norris-lake",
    name: "Norris Lake",
    state: "TN",
    stateName: "Tennessee",
    services: ["vacation"],
    primaryService: "vacation",
    urlSuffix: "-vacation-rental-management",
    hubBlurb: "Full-service short-term/vacation rental management for properties along Norris Lake, Tennessee.",
    serviceLabel: "Short-Term/Vacation Rentals",
    cityServiceWord: "vacation rental",
  },
};

/**
 * Slugs grouped by region. Each slug becomes a location page rendered by
 * LocationPage.tsx. The page URL is derived from the region's urlSuffix.
 */
export const REGION_SLUGS: Record<RegionId, string[]> = {
  "cincinnati": [
    "amberley-village", "anderson-township", "blue-ash", "camp-washington",
    "clifton", "college-hill", "columbia-tusculum", "covedale",
    "deer-park", "delhi", "downtown", "east-walnut-hills", "evanston",
    "forest-park", "green-township", "hamilton", "harrison", "hyde-park",
    "indian-hill", "kennedy-heights", "kenwood", "lebanon", "liberty-township",
    "loveland", "madeira", "madisonville", "mariemont", "mason",
    "milford", "monfort-heights", "montgomery", "mount-auburn", "mount-healthy",
    "mount-lookout", "mount-washington", "mt-adams", "northside", "norwood",
    "oakley", "over-the-rhine", "pleasant-ridge", "sayler-park", "sharonville",
    "springdale", "terrace-park", "walnut-hills", "west-chester", "westwood", "white-oak", "winton-place", "wyoming",
  ],
  "dayton": [
    "beavercreek", "centerville", "clayton", "dayton", "eaton", "englewood",
    "fairborn", "franklin", "germantown", "greenville", "harrison-township",
    "huber-heights", "kettering", "miami-township", "miamisburg", "oakwood",
    "piqua", "riverside", "springboro", "sugarcreek-township",
    "tipp-city", "trotwood", "troy", "union", "vandalia", "washington-township",
    "waynesville", "west-carrollton", "xenia", "yellow-springs",
  ],
  "norris-lake": [
    "norris-lake",
  ],
};

/** Inverse map for O(1) slug → region lookup. Built from REGION_SLUGS at module load. */
export const SLUG_TO_REGION: Record<string, RegionId> = (() => {
  const out: Record<string, RegionId> = {};
  (Object.keys(REGION_SLUGS) as RegionId[]).forEach((rid) => {
    REGION_SLUGS[rid].forEach((slug) => {
      out[slug] = rid;
    });
  });
  return out;
})();

/** Display-name overrides for slugs that don't title-case correctly. */
const DISPLAY_OVERRIDES: Record<string, string> = {
  "mt-adams": "Mt. Adams",
  "over-the-rhine": "Over-the-Rhine",
  "columbia-tusculum": "Columbia-Tusculum",
  "mount-auburn": "Mount Auburn",
  "mount-lookout": "Mount Lookout",
  "mount-washington": "Mount Washington",
  "east-walnut-hills": "East Walnut Hills",
  "forest-park": "Forest Park",
  "indian-hill": "Indian Hill",
  "kennedy-heights": "Kennedy Heights",
  "pleasant-ridge": "Pleasant Ridge",
  "sayler-park": "Sayler Park",
  "terrace-park": "Terrace Park",
  "walnut-hills": "Walnut Hills",
  "winton-place": "Winton Place",
  "blue-ash": "Blue Ash",
  "camp-washington": "Camp Washington",
  "college-hill": "College Hill",
  "deer-park": "Deer Park",
  "hyde-park": "Hyde Park",
  "west-carrollton": "West Carrollton",
  "huber-heights": "Huber Heights",
  "harrison-township": "Harrison Township",
  "miami-township": "Miami Township",
  "washington-township": "Washington Township",
  "norris-lake": "Norris Lake",
};

export function toDisplayName(slug: string): string {
  return (
    DISPLAY_OVERRIDES[slug] ??
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  );
}

export function getRegion(slug: string): RegionMeta | null {
  const rid = SLUG_TO_REGION[slug];
  return rid ? REGIONS[rid] : null;
}

export function buildLocationUrl(slug: string): string {
  const region = getRegion(slug);
  // Community pages live at /locations/{region}/{slug}; the flat
  // /{slug}-property-management paths 308-redirect there, so link straight to
  // the canonical URL to avoid internal links to 3xx responses.
  if (region?.id === "dayton" && slug !== "dayton") return `/locations/dayton/${slug}`;
  if (region?.id === "cincinnati") return `/locations/cincinnati/${slug}`;
  // Default to property-management suffix for unmapped slugs to preserve back-compat.
  const suffix = region?.urlSuffix ?? "-property-management";
  return `/${slug}${suffix}`;
}

export interface LocationLink {
  slug: string;
  displayName: string;
  urlPath: string;
}

export function getRegionLocations(regionId: RegionId): LocationLink[] {
  return REGION_SLUGS[regionId].map((slug) => ({
    slug,
    displayName: toDisplayName(slug),
    urlPath: buildLocationUrl(slug),
  }));
}

export interface ParsedLocation {
  slug: string;
  displayName: string;
  region: RegionMeta;
  urlPath: string;
}

/**
 * Parse a path like `/hyde-park-property-management` or
 * `/norris-lake-vacation-rental-management` into a structured location.
 * Returns null if the path doesn't match a known location pattern.
 */
export function parseLocationFromPath(path: string): ParsedLocation | null {
  const segment = path.split("/").filter(Boolean).pop() || "";

  let slug = "";
  if (segment.endsWith("-vacation-rental-management")) {
    slug = segment.replace(/-vacation-rental-management$/, "");
  } else if (segment.endsWith("-property-management")) {
    slug = segment.replace(/-property-management$/, "");
  } else {
    return null;
  }

  if (!slug) return null;

  // Known slug — return its real region. Unknown slug — fall back to Cincinnati
  // (preserves the historical fallback behavior of LocationPage for now).
  const region = getRegion(slug) ?? REGIONS.cincinnati;
  return {
    slug,
    displayName: toDisplayName(slug),
    region,
    urlPath: buildLocationUrl(slug),
  };
}

/** All registered location URLs across all regions — used by the sitemap generator. */
export function getAllLocationUrls(): { slug: string; urlPath: string; regionId: RegionId }[] {
  return (Object.keys(REGION_SLUGS) as RegionId[]).flatMap((rid) =>
    REGION_SLUGS[rid].map((slug) => ({
      slug,
      urlPath: buildLocationUrl(slug),
      regionId: rid,
    })),
  );
}
