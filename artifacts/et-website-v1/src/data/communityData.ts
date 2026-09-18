/**
 * Community page data — reusable template content for Cincinnati and Dayton
 * neighborhood pages rendered by CommunityPage.tsx.
 *
 * URL convention: /locations/{region}/{slug}
 * To add a new community:
 *   1. Add a CommunityConfig entry to COMMUNITY_PAGES below
 *   2. Add a <Route path={cfg.urlPath} component={CommunityPage} /> in App.tsx
 *      (or rely on a future catch-all /locations/:region/:slug route)
 *   3. Run `pnpm sitemap` to regenerate sitemap.xml
 *
 * Services pattern:
 *   `serviceCopy` maps canonical service IDs (from src/data/services.ts) to
 *   community-specific body copy. Only services with a non-empty entry are
 *   rendered. Future community pages add their own keys here (e.g. montgomeryCopy).
 */

import {
  Clock,
  CurrencyDollar,
  Tag,
  Buildings,
  House,
  GraduationCap,
  Users,
  type Icon,
} from "@phosphor-icons/react";

export interface MapPin {
  lat: number;
  lng: number;
  label: string;
  focal?: boolean;
}

export interface MarketInsight {
  icon: Icon;
  label: string;
  /** A single string renders on one line. An array renders each item on its
   *  own line — use this whenever a card carries two (or more) discrete data
   *  points (e.g. a housing mix, multiple schools) so they stack cleanly
   *  instead of running together on a single wrapping line. */
  value: string | string[];
  mapPins?: MapPin[];
}

export interface CommunityFAQ {
  question: string;
  answer: string;
}

export interface NearbyArea {
  name: string;
  href: string;
  comingSoon?: boolean;
  coords?: { lat: number; lng: number };
}

export interface CommunityTestimonial {
  name: string;
  stars: number;
  text: string;
}

export interface CommunityConfig {
  // identity / routing
  slug: string;
  cityName: string;
  regionName: string;
  stateName: string;
  urlPath: string;

  // SEO
  seoTitle: string;
  seoDescription: string;

  // hero
  heroImage: string;
  heroImageAlt: string;
  heroImagePosition?: string;
  heroImageZoom?: number;
  heroHeadline: string;
  heroSubheadline: string;
  founderQuote: string;
  founderName: string;

  // trust banner
  stats: { label: string; value: string }[];

  // intro
  introCopy: string;

  // services — keyed by canonical service ID from src/data/services.ts
  // Only services with a non-empty string are rendered on the page.
  serviceCopy: Partial<Record<string, string>>;

  // renter section (shown below services grid, separate from owner services)
  forRent: {
    heading: string;
    subhead: string;
    href: string;
    cta: string;
  };

  // area overview
  areaOverview: {
    heading: string;
    paragraphs: string[];
    source?: string;
  };

  // local market insights
  marketInsights: MarketInsight[];
  marketInsightsSources?: { label: string; href: string }[];
  marketInsightsNote?: string;
  dataAccessedDate: string;

  // testimonials
  testimonials: CommunityTestimonial[];

  // FAQ
  faqs: CommunityFAQ[];

  // nearby areas
  nearbyHeading: string;
  nearbyAreas: NearbyArea[];
  allAreasHref: string;
  allAreasLabel: string;

  // CTA
  ctaHeadline: string;
  ctaSubheadline: string;
  phone: string;
  phoneHref: string;

  // LocalBusiness schema
  business: {
    name: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    telephone: string;
    url: string;
    serviceArea: string;
    geo?: { latitude: number; longitude: number };
  };
}

import { buildLocationFaqs, LOCATION_FAQ_STATS, FALLBACK_FAQ_STATS } from "@/data/locationFaqData";

import { SITE_URL } from "@/lib/siteUrl";

const ORIGIN = import.meta.env.BASE_URL.replace(/\/$/, "");

const SHARED_STATS = [
  { label: "Since", value: "2008" },
  { label: "Transactions", value: "3,000+" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Assets Managed", value: "$100M+" },
];

const SHARED_TESTIMONIALS: CommunityTestimonial[] = [
  {
    name: "Ida G.",
    stars: 5,
    text: "Very reliable, responsive, transparent, and professional. I simply could not ask for more. Maintenance is great, reports are thorough and on time. I have had previous experience with another management company and the difference is night and day.",
  },
  {
    name: "Mike M.",
    stars: 5,
    text: "I had a property I couldn't sell and 'tried' to be a landlord. I wish I would have turned the property over to the EquityTeam years ago. They are professional, honest, and quick to answer any questions you have. They found me a great tenant in 7 days after listing it.",
  },
  {
    name: "Dave B.",
    stars: 5,
    text: "EquityTeam has managed my property for over a decade. The property has been vacant for less than a month in that time, which is outstanding. They do a great job of managing the tenant relationship while also taking great care of my property.",
  },
];

export const blueAshConfig: CommunityConfig = {
  slug: "blue-ash",
  cityName: "Blue Ash",
  regionName: "Cincinnati",
  stateName: "Ohio",
  urlPath: "/locations/cincinnati/blue-ash",

  seoTitle: "Blue Ash Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Blue Ash, Cincinnati, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/blue-ash-hero.jpg`,
  heroImageAlt: "Summit Park Great Lawn and surrounding neighborhoods in Blue Ash, Ohio — photo by Blue Ash Communications, CC BY-SA 4.0",
  heroHeadline: "Blue Ash, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Blue Ash, Ohio — serving homeowners, rental property owners, and investors across one of Cincinnati's most desirable suburbs. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Cincinnati area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Blue Ash — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Blue Ash — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Blue Ash communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Blue Ash — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Blue Ash office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Blue Ash homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Blue Ash?",
    subhead:
      "Browse current Blue Ash rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Blue Ash",
    paragraphs: [
      "Blue Ash is a city in Hamilton County, Ohio, and one of the most established suburbs in the northeastern Cincinnati metro. Settled in the late 1700s and named for the blue ash trees that once lined the area, the city has grown into a regional business and lifestyle hub with a population of approximately 13,000 residents.",
      "Today Blue Ash is anchored by a thriving commercial corridor along Reed Hartman Highway and Pfeiffer Road, home to corporate campuses, restaurants, and retail. Summit Park — a 130-acre civic green with an outdoor amphitheater, dining, and year-round programming — gives residents a central gathering place that has become a signature feature of the city.",
      "Families and professionals are drawn to Blue Ash for its highly regarded Sycamore Community School District, the award-winning Blue Ash Recreation Center, and a housing stock that ranges from established mid-century single-family neighborhoods to newer townhomes and apartment communities. Direct access to I-71 and I-275 puts downtown Cincinnati and the broader metro within easy reach.",
    ],
    source: "Source: Wikipedia and City of Blue Ash",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin (sales DOM)", href: "https://www.redfin.com/city/1902/OH/Blue-Ash/housing-market" },
    { label: "Zillow Rental Manager — Blue Ash market trends (rental DOM est.)", href: "https://www.zillow.com/rental-manager/market-trends/blue-ash-oh/" },
    { label: "U.S. Census Bureau", href: "https://data.census.gov" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsights: [
    // Row 1 — market velocity
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: ["Sales: ~39 days", "Rentals: ~14 days"],
    },
    {
      icon: House,
      label: "Active Inventory",
      value: ["Sales: ~28 listings", "Rentals: ~14 listings"],
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$330,000", "Rentals: ~$1,895/mo"],
    },
    // Row 2 — place context
    { icon: Users, label: "Owners vs Renters", value: ["~60% owner-occupied", "~40% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$95,000" },
    { icon: GraduationCap, label: "Notable Schools", value: ["Sycamore High School (A)", "Ursuline Academy (A+)"] },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Blue Ash", LOCATION_FAQ_STATS["blue-ash"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Blue Ash",
  nearbyAreas: [
    // Ordered roughly by straight-line distance from Blue Ash (~39.247, -84.378).
    // All entries are within ~4.5 miles; farther suburbs (Mason, Loveland,
    // Indian Hill, Symmes Twp) were dropped per editorial direction.
    { name: "Sycamore Township", href: "#", coords: { lat: 39.2362, lng: -84.3669 } },
    { name: "Montgomery", href: "#", coords: { lat: 39.2284, lng: -84.3539 } },
    { name: "Evendale", href: "#", coords: { lat: 39.2531, lng: -84.4147 } },
    { name: "Sharonville", href: "#", coords: { lat: 39.2681, lng: -84.4133 } },
    { name: "Deer Park", href: "#", coords: { lat: 39.2059, lng: -84.3905 } },
    { name: "Kenwood", href: "#", coords: { lat: 39.2026, lng: -84.3699 } },
    { name: "Reading", href: "#", coords: { lat: 39.2237, lng: -84.4408 } },
    { name: "Silverton", href: "#", coords: { lat: 39.1937, lng: -84.4022 } },
    { name: "Madeira", href: "#", coords: { lat: 39.1903, lng: -84.3633 } },
    { name: "Glendale", href: "#", coords: { lat: 39.2706, lng: -84.4541 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Cincinnati areas we serve",

  ctaHeadline: "Need help with a property in Blue Ash?",
  ctaSubheadline: "",
  phone: "(513) 444-4010",
  phoneHref: "tel:+15134444010",

  business: {
    name: "EquityTeam Property Management",
    streetAddress: "11427 Reed Hartman Hwy",
    addressLocality: "Cincinnati",
    addressRegion: "OH",
    postalCode: "45241",
    telephone: "+15134444010",
    url: `${SITE_URL}/locations/cincinnati/blue-ash`,
    serviceArea: "Blue Ash, Ohio",
    geo: { latitude: 39.2326, longitude: -84.3783 },
  },
};

export const delhiConfig: CommunityConfig = {
  slug: "delhi",
  cityName: "Delhi Township",
  regionName: "Cincinnati",
  stateName: "Ohio",
  urlPath: "/locations/cincinnati/delhi",

  seoTitle: "Delhi Township Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Delhi Township, Cincinnati, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/delhi-hero.jpg`,
  heroImageAlt: "Aerial view of Delhi Township neighborhoods, Cincinnati west side",
  heroHeadline: "Delhi Township, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Delhi Township, Ohio — serving homeowners, rental property owners, and investors across one of Cincinnati's most established west side communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Cincinnati area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Delhi Township — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Delhi Township — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Delhi Township communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Delhi Township — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Delhi Township office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Delhi Township homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Delhi Township?",
    subhead:
      "Browse current Delhi Township rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Delhi Township",
    paragraphs: [
      "Delhi Township is an unincorporated community in Hamilton County, Ohio, situated on Cincinnati's west side along the Ohio River. With a population of approximately 29,000 residents, Delhi is one of the larger townships in the county and has long been a cornerstone of Cincinnati's west side identity.",
      "The township's character is defined by its established residential neighborhoods, tree-lined streets, and strong sense of community. Delhi Avenue and Foley Road serve as the commercial spine, with local shops, restaurants, and services woven throughout the community's walkable core neighborhoods.",
      "Delhi's housing stock is predominantly single-family — the kind of solid, well-built mid-century construction that attracts both owner-occupants and buy-and-hold investors. The west side's affordability relative to the east side suburbs keeps demand consistent, with a healthy mix of long-term residents and renters.",
      "Families are drawn to Delhi for McNicholas High School, strong parish school networks, and easy access to Anderson Ferry, which has connected the community to Northern Kentucky for over 200 years. State Route 50 and the I-74 corridor provide quick access to downtown Cincinnati and beyond.",
      "EquityTeam's Delhi Township operations are part of our broader Greater Cincinnati presence, with additional offices serving Dayton, Ohio and Tennessee (via Deerfield Vacation Rentals).",
    ],
    source: "Source: Hamilton County and U.S. Census Bureau",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin (sales data)", href: "https://www.redfin.com/zipcode/45238/housing-market" },
    { label: "Zillow Rental Manager — Delhi Township market trends", href: "https://www.zillow.com/rental-manager/market-trends/delhi-township-oh/" },
    { label: "U.S. Census Bureau", href: "https://data.census.gov" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsights: [
    // Row 1 — market velocity
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: ["Sales: ~28 days", "Rentals: ~18 days"],
    },
    {
      icon: House,
      label: "Active Inventory",
      value: ["Sales: ~20 listings", "Rentals: ~8 listings"],
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$225,000", "Rentals: ~$1,100/mo"],
    },
    // Row 2 — place context
    { icon: Users, label: "Owners vs Renters", value: ["~65% owner-occupied", "~35% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$62,000" },
    { icon: GraduationCap, label: "Notable Schools", value: ["McNicholas High School (A-)", "St. Antoninus School (K–8)"] },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Delhi Township", LOCATION_FAQ_STATS["delhi"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Delhi Township",
  nearbyAreas: [
    // Ordered roughly by straight-line distance from Delhi Township center (~39.105, -84.609).
    { name: "Bridgetown", href: "#", coords: { lat: 39.1487, lng: -84.6274 } },
    { name: "Green Township", href: "#", coords: { lat: 39.1700, lng: -84.6300 } },
    { name: "Price Hill", href: "#", coords: { lat: 39.1026, lng: -84.5538 } },
    { name: "Westwood", href: "#", coords: { lat: 39.1437, lng: -84.5538 } },
    { name: "Sayler Park", href: "#", coords: { lat: 39.0955, lng: -84.6454 } },
    { name: "Cleves", href: "#", coords: { lat: 39.1648, lng: -84.7469 } },
    { name: "North Bend", href: "#", coords: { lat: 39.1484, lng: -84.7316 } },
    { name: "Harrison", href: "#", coords: { lat: 39.2620, lng: -84.8183 } },
    { name: "Colerain Township", href: "#", coords: { lat: 39.2237, lng: -84.6274 } },
    { name: "College Hill", href: "#", coords: { lat: 39.1820, lng: -84.5382 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Cincinnati areas we serve",

  ctaHeadline: "Need help with a property in Delhi Township?",
  ctaSubheadline: "",
  phone: "(513) 444-4010",
  phoneHref: "tel:+15134444010",

  business: {
    name: "EquityTeam Property Management",
    streetAddress: "11427 Reed Hartman Hwy",
    addressLocality: "Cincinnati",
    addressRegion: "OH",
    postalCode: "45241",
    telephone: "+15134444010",
    url: `${SITE_URL}/locations/cincinnati/delhi`,
    serviceArea: "Delhi Township, Ohio",
    geo: { latitude: 39.1048, longitude: -84.6088 },
  },
};

export const cliftonConfig: CommunityConfig = {
  slug: "clifton",
  cityName: "Clifton",
  regionName: "Cincinnati",
  stateName: "Ohio",
  urlPath: "/locations/cincinnati/clifton",

  seoTitle: "Clifton Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Clifton, Cincinnati, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/clifton-hero.jpg`,
  heroImagePosition: 'object-top',
  heroImageAlt: "Aerial view of Clifton neighborhood, Cincinnati — Victorian homes, tree-lined streets, and the University of Cincinnati campus",
  heroHeadline: "Clifton, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Clifton, Ohio — serving homeowners, rental property owners, and investors in one of Cincinnati's most vibrant and architecturally rich urban neighborhoods. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Cincinnati area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Clifton — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Clifton — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Clifton communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Clifton — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Clifton office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Clifton homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Clifton?",
    subhead:
      "Browse current Clifton rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Clifton",
    paragraphs: [
      "Clifton is one of Cincinnati's most storied urban neighborhoods, situated just north of Downtown and bordering the University of Cincinnati campus. Home to approximately 10,000 residents, Clifton blends grand Victorian and Craftsman architecture with a lively commercial district along Ludlow Avenue — an eclectic mix of locally-owned restaurants, coffee shops, and boutiques that gives the neighborhood its distinctly walkable, community-driven character.",
      "The neighborhood is anchored by two major institutions: the University of Cincinnati to the south and the Cincinnati Zoo & Botanical Garden to the north. Burnet Woods, a 90-acre urban park and National Natural Landmark, runs through the heart of Clifton and serves as a green centerpiece for the community. These assets drive consistent rental demand from students, faculty, hospital workers, and young professionals year-round.",
      "Clifton's housing stock ranges from stately Victorian-era single-family homes to brick apartment buildings and condominiums. The neighborhood skews heavily renter-occupied due to the UC proximity, which creates reliable investment fundamentals for landlords — low vacancy, strong tenant pool, and steady appreciation tied to the broader urban core revival.",
    ],
  },

  marketInsightsSources: [
    { label: "Redfin (sales data)", href: "https://www.redfin.com/neighborhood/18290/OH/Cincinnati/Clifton/housing-market" },
    { label: "Zillow Rental Manager — Clifton market trends", href: "https://www.zillow.com/rental-manager/market-trends/clifton-cincinnati-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],
  marketInsights: [
    {
      icon: Clock,
      label: "Days on Market",
      value: ["Sales: ~30 days", "Rentals: ~12 days"],
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$285,000", "Rentals: ~$1,300/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~35% owner-occupied", "~65% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$48,000" },
    { icon: GraduationCap, label: "Notable Schools", value: ["Walnut Hills High School (A+)", "Fairview-Clifton German Language School (A)"] },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Clifton", LOCATION_FAQ_STATS["clifton"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Clifton",
  nearbyAreas: [
    { name: "Corryville", href: "#", coords: { lat: 39.1334, lng: -84.5120 } },
    { name: "Avondale", href: "#", coords: { lat: 39.1486, lng: -84.4855 } },
    { name: "Northside", href: "#", coords: { lat: 39.1672, lng: -84.5375 } },
    { name: "Camp Washington", href: "#", coords: { lat: 39.1266, lng: -84.5411 } },
    { name: "College Hill", href: "#", coords: { lat: 39.1820, lng: -84.5382 } },
    { name: "Mt. Auburn", href: "#", coords: { lat: 39.1165, lng: -84.5099 } },
    { name: "Over-the-Rhine", href: "#", coords: { lat: 39.1115, lng: -84.5170 } },
    { name: "Westwood", href: "#", coords: { lat: 39.1437, lng: -84.5538 } },
    { name: "Norwood", href: "#", coords: { lat: 39.1598, lng: -84.4585 } },
    { name: "Hyde Park", href: "#", coords: { lat: 39.1565, lng: -84.4318 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Cincinnati areas we serve",

  ctaHeadline: "Need help with a property in Clifton?",
  ctaSubheadline: "",
  phone: "(513) 444-4010",
  phoneHref: "tel:+15134444010",

  dataAccessedDate: "May 2026",

  business: {
    name: "EquityTeam Property Management",
    streetAddress: "11427 Reed Hartman Hwy",
    addressLocality: "Cincinnati",
    addressRegion: "OH",
    postalCode: "45241",
    telephone: "+15134444010",
    url: `${SITE_URL}/locations/cincinnati/clifton`,
    serviceArea: "Clifton, Cincinnati, Ohio",
    geo: { latitude: 39.1452, longitude: -84.5208 },
  },
};

import { CINCINNATI_COMMUNITY_CONFIGS } from "./cincinnatiCommunities";
import { DAYTON_COMMUNITY_CONFIGS } from "./daytonCommunities";

export const COMMUNITY_PAGES: CommunityConfig[] = [
  blueAshConfig,
  delhiConfig,
  cliftonConfig,
  ...CINCINNATI_COMMUNITY_CONFIGS,
  ...DAYTON_COMMUNITY_CONFIGS,
];
