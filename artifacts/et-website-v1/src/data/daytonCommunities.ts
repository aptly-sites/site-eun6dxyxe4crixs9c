/**
 * Dayton-metro community page configs — first batch of 5.
 *
 * Each produces a full CommunityConfig rendered by CommunityPage.tsx at
 * /locations/dayton/{slug}. Routes and legacy redirects are auto-registered
 * in App.tsx via COMMUNITY_PAGES.
 *
 * Market data sources (per card, per city):
 *   Sales price / DOM  — Redfin housing-market pages (May 2026)
 *   Rental price       — Zillow Rental Manager / RentCafe (2025–2026)
 *   Owner/renter split — U.S. Census Bureau QuickFacts (ACS 2023)
 *   Median HHI         — U.S. Census Bureau QuickFacts (ACS 2023)
 *   School ratings     — GreatSchools.org (2026)
 */

// TODO (post-launch): re-point the 5 removed township redirects (bellbrook, bellefontaine, brookville, butler-township, cedarville) in vercel.json from /areas-we-serve to /locations/dayton once the Dayton metro page exists.

import {
  Clock,
  CurrencyDollar,
  Tag,
  House,
  GraduationCap,
  Users,
} from "@phosphor-icons/react";

import type { CommunityConfig, CommunityTestimonial } from "./communityData";
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

// ─── KETTERING ────────────────────────────────────────────────────────────────

export const ketteringConfig: CommunityConfig = {
  slug: "kettering",
  cityName: "Kettering",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/kettering",

  seoTitle: "Kettering Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Kettering, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/kettering-hero.jpg`,
  heroImageAlt: "Aerial view of Kettering, Ohio neighborhoods — Greater Dayton metro",
  heroHeadline: "Kettering, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Kettering, Ohio — serving homeowners, rental property owners, and investors across one of the Dayton metro's most established and livable communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Kettering — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Kettering — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Kettering communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Kettering — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Kettering office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Kettering homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Kettering?",
    subhead:
      "Browse current Kettering rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Kettering",
    paragraphs: [
      "Kettering is a city in Montgomery County, Ohio, situated immediately southwest of Dayton with a population of approximately 55,000. The city was incorporated in 1952 through the consolidation of several Dayton-adjacent townships and was named in honor of Charles F. Kettering — the Dayton-born inventor who held more than 180 patents and whose innovations, including the electric automobile starter and leaded gasoline research, shaped 20th-century industry.",
      "Fraze Pavilion, a 4,300-seat outdoor amphitheater, anchors the city's cultural calendar with a full season of national touring acts and community events each year. Kettering's park system encompasses more than 1,000 acres, including Indian Riffle Park and Delco Park, woven through neighborhoods that retain their mid-century character. The commercial corridors along Stroop Road, Dorothy Lane, and Far Hills Avenue provide residents with a full range of local retail, dining, and services. Kettering City Schools operates Kettering Fairmont High School, the district's sole high school, which offers International Baccalaureate, Advanced Placement, and Gifted & Talented programming.",
      "Kettering's housing stock is predominantly solid single-family construction — the kind of well-built, well-maintained mid-century homes that hold value across market cycles and attract stable, long-term tenants. With roughly 65% owner-occupancy and 35% renter-occupancy, the city supports consistent rental demand at accessible price points. Interstate 675 and State Route 35 connect Kettering residents to the broader Dayton metro, the Wright-Patterson Air Force Base employment corridor, and the I-75 commercial spine — a location that keeps both owner-occupant and rental demand steady year over year.",
    ],
    source: "Source: Wikipedia and City of Kettering",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Kettering housing market", href: "https://www.redfin.com/city/10212/OH/Kettering/housing-market" },
    { label: "Zillow Rental Manager — Kettering", href: "https://www.zillow.com/rental-manager/market-trends/kettering-oh/" },
    { label: "U.S. Census Bureau QuickFacts — Kettering", href: "https://www.census.gov/quickfacts/fact/table/ketteringcityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~63 days",
    },
    {
      icon: House,
      label: "Active Inventory",
      value: ["Sales: ~83 listings", "Rentals: ~65 listings"],
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$247,000", "Rentals: ~$1,325/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~65% owner-occupied", "~35% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$72,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Kettering Fairmont High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Kettering", LOCATION_FAQ_STATS["kettering"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Kettering",
  nearbyAreas: [
    { name: "Centerville", href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Oakwood", href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "Miamisburg", href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "West Carrollton", href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Washington Township", href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Springboro", href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Beavercreek", href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Dayton", href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Kettering?",
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
    url: `${SITE_URL}/locations/dayton/kettering`,
    serviceArea: "Kettering, Ohio",
    geo: { latitude: 39.6895, longitude: -84.1688 },
  },
};

// ─── BEAVERCREEK ──────────────────────────────────────────────────────────────

export const beavercreekConfig: CommunityConfig = {
  slug: "beavercreek",
  cityName: "Beavercreek",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/beavercreek",

  seoTitle: "Beavercreek Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Beavercreek, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/beavercreek-hero.jpg`,
  heroImageAlt: "Beavercreek, Ohio suburban community near Wright-Patterson Air Force Base",
  heroHeadline: "Beavercreek, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Beavercreek, Ohio — serving homeowners, rental property owners, and investors in one of the Dayton metro's highest-income and fastest-growing communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Beavercreek — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Beavercreek — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Beavercreek communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Beavercreek — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Beavercreek office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Beavercreek homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Beavercreek?",
    subhead:
      "Browse current Beavercreek rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Beavercreek",
    paragraphs: [
      "Beavercreek is a city in Greene County, Ohio, located east of Dayton along the State Route 35 corridor. With a population of approximately 47,000, it is the largest city in Greene County and one of the Dayton metropolitan area's defining suburban communities. The city takes its name from Beaver Creek, which runs through its boundaries, and grew from a collection of rural townships into an incorporated city in 1980 — a period of development driven substantially by its proximity to Wright-Patterson Air Force Base.",
      "Wright-Patterson Air Force Base anchors Beavercreek's economy in a way few single installations anchor any community in Ohio. One of the largest Air Force installations in the United States, Wright-Patterson employs tens of thousands of military personnel, federal civilian workers, and defense contractors — a workforce that generates consistent, recession-resistant demand for housing throughout the surrounding Greene County communities. The Mall at Fairfield Commons and the retail corridors along Dayton-Xenia and Indian Ripple roads serve the community's commercial needs. Beavercreek City Schools is consistently rated among the Miami Valley's stronger public school systems.",
      "Beavercreek draws engineers, military officers, defense professionals, and federal employees who value a well-maintained suburb with good schools, manageable commutes, and above-average income levels. With roughly 72% owner-occupancy, the rental market is smaller relative to the total housing stock but serves a clearly defined, financially stable tenant profile — the kind associated with longer tenancies and lower vacancy rates. Median household income near $110,000 supports above-average rents compared to the broader Dayton metro, making Beavercreek one of the more compelling investment markets in southwestern Ohio.",
    ],
    source: "Source: Wikipedia and City of Beavercreek",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Beavercreek housing market", href: "https://www.redfin.com/city/1250/OH/Beavercreek/housing-market" },
    { label: "RentCafe — Beavercreek average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/greene-county/beavercreek/" },
    { label: "U.S. Census Bureau QuickFacts — Beavercreek", href: "https://www.census.gov/quickfacts/fact/table/beavercreekcityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~55 days",
    },
    {
      icon: House,
      label: "Active Inventory",
      value: "Sales: ~80 listings",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$300,000", "Rentals: ~$1,425/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~72% owner-occupied", "~28% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$110,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Beavercreek High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Beavercreek", LOCATION_FAQ_STATS["beavercreek"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Beavercreek",
  nearbyAreas: [
    { name: "Fairborn", href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Xenia", href: "#", coords: { lat: 39.6845, lng: -83.9313 } },
    { name: "Sugarcreek Township", href: "#", coords: { lat: 39.6512, lng: -84.0549 } },
    { name: "Centerville", href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Kettering", href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Yellow Springs", href: "#", coords: { lat: 39.8028, lng: -83.8877 } },
    { name: "Springboro", href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Dayton", href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Beavercreek?",
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
    url: `${SITE_URL}/locations/dayton/beavercreek`,
    serviceArea: "Beavercreek, Ohio",
    geo: { latitude: 39.7209, longitude: -84.0633 },
  },
};

// ─── OAKWOOD ──────────────────────────────────────────────────────────────────

export const oakwoodConfig: CommunityConfig = {
  slug: "oakwood",
  cityName: "Oakwood",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/oakwood",

  seoTitle: "Oakwood Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Oakwood, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/oakwood-hero.jpg`,
  heroImageAlt: "Tree-lined residential street in Oakwood, Ohio — one of the Dayton metro's most prestigious communities",
  heroHeadline: "Oakwood, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Oakwood, Ohio — serving homeowners, rental property owners, and investors in one of the Dayton metro's most sought-after and consistently high-performing residential markets. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Oakwood — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Oakwood — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Oakwood communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Oakwood — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Oakwood office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Oakwood homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Oakwood?",
    subhead:
      "Browse current Oakwood rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Oakwood",
    paragraphs: [
      "Oakwood is a small, self-contained city in Montgomery County, Ohio, enclosed entirely within the boundaries of the city of Dayton. With a population of approximately 8,900 and a land area of roughly four square miles, Oakwood is one of Ohio's more compact incorporated cities — and consistently one of its most desirable residential addresses. The city's name reflects the dense canopy of oak trees that define its streets and parks.",
      "Oakwood's civic identity is shaped by two defining assets: its school district and its built environment. Oakwood City Schools holds a reputation for academic excellence that extends well beyond the Dayton region, with Oakwood High School earning a 10 of 10 rating on GreatSchools — a score that reflects strong performance in college readiness, test scores, and educational equity. The community's tree-lined streets, well-maintained Craftsman and Colonial-era homes, and a compact commercial district along Far Hills Avenue give Oakwood a character that draws long-term residents and produces very low housing turnover. The Dayton VA Medical Center sits on the city's southern edge, adding a stable institutional employment anchor.",
      "With approximately 80% owner-occupancy and a median household income approaching $159,000, Oakwood represents a different kind of investment opportunity than higher-renter markets: a scarcity-driven rental market in which available properties attract financially qualified tenants who want the school district and neighborhood quality without an immediate home purchase. Limited housing supply, premium prices, and a resident base with among the highest incomes in the Dayton metro create a fundamentally different risk profile than comparable investments in surrounding communities — one characterized by low vacancy and strong long-term value retention.",
    ],
    source: "Source: Wikipedia and City of Oakwood",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Oakwood housing market", href: "https://www.redfin.com/city/14982/OH/Oakwood/housing-market" },
    { label: "U.S. Census Bureau QuickFacts — Oakwood", href: "https://www.census.gov/quickfacts/fact/table/oakwoodcityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~22 days",
    },
    {
      icon: House,
      label: "Active Inventory",
      value: "Sales: ~23 listings",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$397,000", "Rentals: limited availability"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~80% owner-occupied", "~20% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$159,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Oakwood High School (10/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Oakwood", LOCATION_FAQ_STATS["oakwood"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Oakwood",
  nearbyAreas: [
    { name: "Kettering", href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Centerville", href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Miamisburg", href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "West Carrollton", href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Washington Township", href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Springboro", href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Dayton", href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Beavercreek", href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Oakwood?",
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
    url: `${SITE_URL}/locations/dayton/oakwood`,
    serviceArea: "Oakwood, Ohio",
    geo: { latitude: 39.7264, longitude: -84.1752 },
  },
};

// ─── CENTERVILLE ──────────────────────────────────────────────────────────────

export const centervilleConfig: CommunityConfig = {
  slug: "centerville",
  cityName: "Centerville",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/centerville",

  seoTitle: "Centerville Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Centerville, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/centerville-hero.jpg`,
  heroImageAlt: "Centerville, Ohio residential community in the Greater Dayton metro",
  heroHeadline: "Centerville, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Centerville, Ohio — serving homeowners, rental property owners, and investors across one of the Dayton metro's most established and highly regarded suburban communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Centerville — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Centerville — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Centerville communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Centerville — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Centerville office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Centerville homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Centerville?",
    subhead:
      "Browse current Centerville rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Centerville",
    paragraphs: [
      "Centerville is a city in southern Montgomery County, Ohio, with portions extending into Warren County, located approximately ten miles south of downtown Dayton. Founded in 1802 as a crossroads settlement, it has grown into a community of approximately 24,000 residents that represents one of the Dayton area's most consistently sought-after suburban addresses. The city's historic district along South Main Street preserves Federal- and Greek Revival-era architecture from the 19th century, providing a tangible connection to Centerville's origins as a regional hub.",
      "Far Hills Avenue serves as Centerville's primary commercial and civic corridor, threading through neighborhoods to connect parks, schools, restaurants, and regional retail. Yankee Trace Golf Club, a city-operated 27-hole facility, anchors the recreational amenity portfolio alongside an extensive park system and trail network. Centerville City Schools — led by Centerville High School, which holds an 8 of 10 rating on GreatSchools — is among the Miami Valley's recognized public school systems, drawing families who prioritize academic quality and extracurricular programming. The State Route 48 and I-675 corridors give residents practical access to the broader Dayton metro and to communities southward toward Cincinnati.",
      "Centerville's housing stock spans several decades of suburban construction, from established mid-century single-family neighborhoods through newer development in the city's southern sections. With roughly 67% owner-occupancy and a median household income near $82,000, the community supports a rental market populated by professionals, dual-income households, and military-affiliated families connected to nearby Wright-Patterson Air Force Base. Centerville's reputation for school quality and suburban stability creates consistent demand from prospective renters with the income to support above-average rents — making it a dependable market for long-term residential investment.",
    ],
    source: "Source: Wikipedia and City of Centerville",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Centerville housing market", href: "https://www.redfin.com/city/3439/OH/Centerville/housing-market" },
    { label: "RentCafe — Centerville average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/centerville/" },
    { label: "U.S. Census Bureau QuickFacts — Centerville", href: "https://www.census.gov/quickfacts/fact/table/centervillecityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~48 days",
    },
    {
      icon: House,
      label: "Active Inventory",
      value: "Sales: ~40 listings",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$300,000", "Rentals: ~$1,250/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~67% owner-occupied", "~33% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$82,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Centerville High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Centerville", LOCATION_FAQ_STATS["centerville"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Centerville",
  nearbyAreas: [
    { name: "Springboro", href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Kettering", href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Oakwood", href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "Miamisburg", href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Washington Township", href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Beavercreek", href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "West Carrollton", href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Franklin", href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Centerville?",
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
    url: `${SITE_URL}/locations/dayton/centerville`,
    serviceArea: "Centerville, Ohio",
    geo: { latitude: 39.6284, longitude: -84.1547 },
  },
};

// ─── SPRINGBORO ───────────────────────────────────────────────────────────────

export const springboroConfig: CommunityConfig = {
  slug: "springboro",
  cityName: "Springboro",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/springboro",

  seoTitle: "Springboro Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Springboro, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/springboro-hero.jpg`,
  heroImageAlt: "Springboro, Ohio community along the I-75 corridor between Dayton and Cincinnati",
  heroHeadline: "Springboro, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Springboro, Ohio — serving homeowners, rental property owners, and investors in one of Warren County's most desirable and fastest-growing communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Springboro — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Springboro — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Springboro communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Springboro — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Springboro office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Springboro homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Springboro?",
    subhead:
      "Browse current Springboro rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Springboro",
    paragraphs: [
      "Springboro is a city in Warren County, Ohio, situated along the I-75 corridor midway between Dayton and Cincinnati. With a population of approximately 20,000, Springboro grew from a small Quaker settlement — platted in 1815 — into one of Ohio's more notable examples of late-20th-century suburban expansion, driven by its combination of affordable developable land, excellent schools, and dual-metro highway access. Warren County, which contains Springboro, is among Ohio's highest-growth and highest-income counties.",
      "The city retains a historic downtown district centered on South Main Street, where 19th-century storefronts, a restored opera house, and period residences preserve the community's founding character alongside newer retail and dining. Springboro Community City Schools is one of the Dayton region's top-rated school systems: Springboro High School holds a 9 of 10 on GreatSchools and offers Advanced Placement, Project Lead The Way, and Gifted & Talented programming. Community parks, sports complexes, and active recreational programming serve a population skewed toward families — a reflection of the school district's draw.",
      "At approximately 89% owner-occupancy, Springboro has among the lowest renter shares of any Dayton-area community of comparable size. The rental market, while small, serves a high-income household profile: a median household income near $120,000 means that the tenant pool accessing Springboro rentals has real financial capacity. For property investors, this translates to fewer available rentals competing for well-qualified tenants — a supply-constrained dynamic that supports strong rents, low vacancy, and reduced turnover in a market where the barriers to homeownership are high enough to keep capable tenants renting longer.",
    ],
    source: "Source: Wikipedia and City of Springboro",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Springboro housing market", href: "https://www.redfin.com/city/18827/OH/Springboro/housing-market" },
    { label: "RentCafe — Springboro average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/springboro/" },
    { label: "U.S. Census Bureau QuickFacts — Springboro", href: "https://www.census.gov/quickfacts/fact/table/springborocityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~48 days",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$324,000", "Rentals: ~$1,300/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~89% owner-occupied", "~11% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$120,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Springboro High School (9/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Springboro", LOCATION_FAQ_STATS["springboro"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Springboro",
  nearbyAreas: [
    { name: "Centerville", href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Miamisburg", href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Franklin", href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
    { name: "Kettering", href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Waynesville", href: "#", coords: { lat: 39.5345, lng: -84.0892 } },
    { name: "Germantown", href: "#", coords: { lat: 39.6264, lng: -84.3769 } },
    { name: "Washington Township", href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Lebanon", href: "#", coords: { lat: 39.4342, lng: -84.2025 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Springboro?",
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
    url: `${SITE_URL}/locations/dayton/springboro`,
    serviceArea: "Springboro, Ohio",
    geo: { latitude: 39.5578, longitude: -84.2316 },
  },
};

// ─── HERO_PENDING — placeholder for cities awaiting a local hero image ─────────
//
// Renders as solid #121212 in CommunityHero.tsx — white text reads clearly.
// Layout does not break or collapse.
//
// Tomorrow's swap (one change per city):
//   heroImage: HERO_PENDING  →  heroImage: `${ORIGIN}/images/locations/heroes/{slug}-hero.jpg`
//   heroImageAlt: ""         →  heroImageAlt: "Brief description of the photo"
//
const HERO_PENDING =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23121212'/%3E%3C/svg%3E";

// ─── EATON ────────────────────────────────────────────────────────────────────

export const eatonConfig: CommunityConfig = {
  slug: "eaton",
  cityName: "Eaton",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/eaton",

  seoTitle: "Eaton Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Eaton, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/eaton-hero.webp`,
  heroImageAlt: "Downtown Eaton, Ohio street festival on Main Street — Preble County seat",
  heroHeadline: "Eaton, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Eaton, Ohio — serving homeowners, rental property owners, and investors in the county seat of Preble County. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Eaton — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Eaton — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Eaton communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Eaton — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Eaton office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Eaton homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Eaton?",
    subhead:
      "Browse current Eaton rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Eaton",
    paragraphs: [
      "Eaton is the county seat of Preble County, Ohio, located approximately 28 miles west of Dayton along US Route 35. Home to roughly 8,500 residents, Eaton serves as the commercial, governmental, and civic hub for one of the state's predominantly rural western counties. The city was platted in 1816 and named for General William Eaton, the naval agent known for his role in the First Barbary War, whose career became a touchstone of the early American republic.",
      "The Preble County Courthouse, listed on the National Register of Historic Places, anchors Eaton's historic downtown square — a compact commercial district that has retained local retail, county offices, and community services. Eaton Community Schools operates the district's secondary program through Eaton High School. County government, light manufacturing, agribusiness, and service employment form the economic base, with US-35 and State Route 122 providing commuter access to the Dayton metro for residents who work in the larger regional economy.",
      "Eaton's housing stock reflects its Ohio county-seat origins: predominantly older single-family construction on established residential blocks, priced significantly below the Dayton metro median. With roughly 67% owner-occupancy and acquisition costs well below comparable suburban markets, Eaton attracts buy-and-hold investors who prioritize cash flow and low entry costs. Its role as a county seat anchors consistent public sector and service employment, supporting a steady tenant base of working households within commuting distance of both the local economy and the broader Dayton metro.",
    ],
    source: "Source: Wikipedia and City of Eaton",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Eaton housing market", href: "https://www.redfin.com/city/6234/OH/Eaton/housing-market" },
    { label: "U.S. Census Bureau / DataUSA — Eaton", href: "https://datausa.io/profile/geo/eaton-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~38 days",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$220,000", "Rentals: ?"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~67% owner-occupied", "~33% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$52,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Eaton High School (6/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Eaton", LOCATION_FAQ_STATS["eaton"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Eaton",
  nearbyAreas: [
    { name: "Germantown",     href: "#", coords: { lat: 39.6264, lng: -84.3769 } },
    { name: "Clayton",        href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Trotwood",       href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Miamisburg",     href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Englewood",      href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Miami Township", href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "West Carrollton",href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Franklin",       href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Eaton?",
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
    url: `${SITE_URL}/locations/dayton/eaton`,
    serviceArea: "Eaton, Ohio",
    geo: { latitude: 39.7442, longitude: -84.6355 },
  },
};

// ─── MIAMI TOWNSHIP ───────────────────────────────────────────────────────────

export const miamiTownshipConfig: CommunityConfig = {
  slug: "miami-township",
  cityName: "Miami Township",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/miami-township",

  seoTitle: "Miami Township Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Miami Township, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/miami-township-hero.jpg`,
  heroImageAlt: "Historic Pease Homestead in Miami Township, Ohio",
  heroHeadline: "Miami Township, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Miami Township, Ohio — serving homeowners, rental property owners, and investors in one of the Dayton metro's largest and most accessible southern suburbs. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Miami Township — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Miami Township — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Miami Township communities — financial administration, vendor coordinator, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Miami Township — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Miami Township office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Miami Township homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Miami Township?",
    subhead:
      "Browse current Miami Township rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Miami Township",
    paragraphs: [
      "Miami Township is a township in Montgomery County, Ohio, occupying a broad swath of the southern Dayton metropolitan area along and west of Interstate 75. With a population of approximately 52,000, it is among the most populous townships in Ohio and has developed steadily over the past six decades as residential growth extended south from Dayton through the Great Miami River valley. The township's boundaries touch the city of Miamisburg to the east and reach toward the Montgomery-Warren County line to the west and south.",
      "Miami Township's character is largely residential — a continuous landscape of subdivisions, retail corridors, parks, and community amenities built primarily from the 1960s through the 2000s along the State Route 725 and I-75 corridors. Multiple school districts serve township residents depending on location: Miamisburg City Schools is the most prominent, with Miamisburg High School holding a 7 of 10 GreatSchools rating. The township has also been home to significant industrial and federal history — the Miamisburg Mound area, adjacent to the township's eastern edge, encompasses a Native American earthwork and the former site of the Mound Laboratory, a federal nuclear research facility that has since been remediated and redeveloped.",
      "Miami Township offers investors a combination of accessibility and affordability that is difficult to match in the southern Dayton metro. With approximately 78% owner-occupancy, the rental market is well-defined without being dominant, drawing from working households and families who value the I-75 corridor's connectivity to Dayton, Cincinnati, and the broader southwestern Ohio employment base. Median household income near $79,000 supports solid rental demand and tenant quality at price points that remain accessible for new investors entering the Dayton market.",
    ],
    source: "Source: Wikipedia and Miami Township, Ohio",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Miami Township housing market", href: "https://www.redfin.com/city/35786/OH/Miami-Township/housing-market" },
    { label: "Census Reporter — Miami Township, Montgomery County", href: "https://censusreporter.org/profiles/06000US3911349392-miami-township-montgomery-county-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~49 days",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$225,000", "Rentals: ~$1,250/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~78% owner-occupied", "~22% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$79,000" },
    {
      icon: GraduationCap,
      label: "Notable Schools",
      value: ["Miamisburg High School (7/10)", "Multiple districts serve the township"],
    },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Miami Township", LOCATION_FAQ_STATS["miami-township"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Miami Township",
  nearbyAreas: [
    { name: "Miamisburg",      href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "West Carrollton", href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Springboro",      href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Centerville",     href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Kettering",       href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Franklin",        href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
    { name: "Washington Township", href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Dayton",          href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Miami Township?",
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
    url: `${SITE_URL}/locations/dayton/miami-township`,
    serviceArea: "Miami Township, Ohio",
    geo: { latitude: 39.6087, longitude: -84.2983 },
  },
};

// ─── PIQUA ────────────────────────────────────────────────────────────────────

export const piquaConfig: CommunityConfig = {
  slug: "piqua",
  cityName: "Piqua",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/piqua",

  seoTitle: "Piqua Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Piqua, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/piqua-hero.jpeg`,
  heroImageAlt: "Sunrise over the historic Piqua downtown building — Miami County, Ohio",
  heroHeadline: "Piqua, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Piqua, Ohio — serving homeowners, rental property owners, and investors in the largest city in Miami County. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Piqua — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Piqua — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Piqua communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Piqua — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Piqua office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Piqua homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Piqua?",
    subhead:
      "Browse current Piqua rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Piqua",
    paragraphs: [
      "Piqua is a city in Miami County, Ohio, situated along the Great Miami River approximately 25 miles north of Dayton. With a population of roughly 20,500, Piqua is the largest city in Miami County and functions as a regional commercial, employment, and services hub for the upper Miami Valley. The area's history reaches back to a Shawnee village site, and Piqua grew into a significant Ohio community through its role in the Miami and Erie Canal system — remnants of which are preserved at the Piqua Historical Area, a state-operated historic site.",
      "Downtown Piqua maintains an active commercial core centered on Main Street, where historic commercial buildings of the late 19th and early 20th centuries support local businesses, dining, and civic institutions. Piqua City Schools operates the district's secondary program through Piqua High School. Hartzell Propeller — one of the world's leading aircraft propeller manufacturers — is headquartered in Piqua and anchors an advanced manufacturing base that has historically provided stable, skilled-trades employment. Interstate 75 connects Piqua directly to the Dayton metro to the south and the Sidney, Lima, and Toledo corridor to the north.",
      "Piqua's rental market reflects the fundamentals of an affordable upper-Miami Valley city: approximately 36% renter-occupancy and a median sale price around $183,000 position it as a cash-flow-oriented investment market with accessible entry costs. The city's role as Miami County's largest employment center, combined with I-75 corridor access, generates consistent demand from manufacturing workers, healthcare employees, and service sector households — a tenant profile that has historically supported stable occupancy for well-managed residential properties.",
    ],
    source: "Source: Wikipedia and City of Piqua",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Piqua housing market", href: "https://www.redfin.com/city/16127/OH/Piqua/housing-market" },
    { label: "RentCafe — Piqua average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/piqua/" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Piqua", href: "https://www.ohio-demographics.com/piqua-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Clock,
      label: "Avg Days on Market",
      value: "Sales: ~38 days",
    },
    {
      icon: House,
      label: "Active Inventory",
      value: "Sales: ~25 listings",
    },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$183,000", "Rentals: ~$1,012/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~64% owner-occupied", "~36% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$64,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Piqua High School (5/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Piqua", LOCATION_FAQ_STATS["piqua"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Piqua",
  nearbyAreas: [
    { name: "Troy",         href: "#", coords: { lat: 40.0395, lng: -84.2036 } },
    { name: "Tipp City",    href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Union",        href: "#", coords: { lat: 39.8953, lng: -84.1104 } },
    { name: "Vandalia",     href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Englewood",    href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Huber Heights",href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Dayton",       href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Piqua?",
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
    url: `${SITE_URL}/locations/dayton/piqua`,
    serviceArea: "Piqua, Ohio",
    geo: { latitude: 40.1459, longitude: -84.2441 },
  },
};

// ─── SUGARCREEK TOWNSHIP ──────────────────────────────────────────────────────

export const sugarcreekTownshipConfig: CommunityConfig = {
  slug: "sugarcreek-township",
  cityName: "Sugarcreek Township",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/sugarcreek-township",

  seoTitle: "Sugarcreek Township Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Sugarcreek Township, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/sugarcreek-township-hero.jpg`,
  heroImageAlt: "Christ's Church in Bellbrook, Sugarcreek Township, Ohio",
  heroHeadline: "Sugarcreek Township, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Sugarcreek Township, Ohio — serving homeowners, rental property owners, and investors in one of Greene County's most prestigious and fast-appreciating communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Sugarcreek Township — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Sugarcreek Township — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Sugarcreek Township communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Sugarcreek Township — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Sugarcreek Township office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Sugarcreek Township homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Sugarcreek Township?",
    subhead:
      "Browse current Sugarcreek Township rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Sugarcreek Township",
    paragraphs: [
      "Sugarcreek Township is a township in Greene County, Ohio, occupying the territory between the city of Xenia to the east and the Kettering and Dayton metro to the northwest. The township encompasses the city of Bellbrook — which serves as the area's commercial and civic center — along with unincorporated residential communities that have developed as premium-tier suburbs over the past four decades. The township is served by the Bellbrook-Sugarcreek Local School District, which draws students from both Bellbrook and the surrounding township communities.",
      "Sugarcreek Township's defining character is the combination of upscale residential development with genuine rural buffer — a balance that has driven sustained demand from households seeking space, quality schools, and privacy within commuting range of both Dayton and Wright-Patterson Air Force Base. Bellbrook High School, which serves the district, holds an 8 of 10 GreatSchools rating reflecting strong academic performance in college readiness and state assessments. The township's creek corridors, greenways, and surrounding agricultural land complement a housing stock that trends toward custom and semi-custom single-family homes on larger lots than are typical of comparable Dayton suburbs.",
      "With approximately 81% owner-occupancy and income levels substantially above the Dayton metro average, Sugarcreek Township's rental market is narrow but operates in a premium tier. Investors here typically work with high-quality single-family properties that attract military officers, defense professionals, and senior executives connected to Wright-Patterson and the southern Dayton employment corridor. The scarcity of rental inventory relative to qualified demand creates a supply-constrained dynamic that supports strong per-unit rents and low vacancy for well-located, well-maintained properties.",
    ],
    source: "Source: Wikipedia and Sugarcreek Township",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Rocket Homes — Sugarcreek Township market report", href: "https://rocket.com/homes/market-reports/oh/sugarcreek-township" },
    { label: "RentCafe — Sugarcreek area average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/sugarcreek/" },
    { label: "Census Reporter — Sugarcreek Township, Greene County (GEOID 06000US3905775201)", href: "https://censusreporter.org/profiles/06000US3905775201-sugarcreek-township-greene-county-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$446,000", "Rentals: ~$1,640/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~81% owner-occupied", "~19% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$186,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Bellbrook High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Sugarcreek Township", LOCATION_FAQ_STATS["sugarcreek-township"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Sugarcreek Township",
  nearbyAreas: [
    { name: "Beavercreek",  href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Xenia",        href: "#", coords: { lat: 39.6845, lng: -83.9313 } },
    { name: "Fairborn",     href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Centerville",  href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Kettering",    href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Yellow Springs",href: "#", coords: { lat: 39.8028, lng: -83.8877 } },
    { name: "Miamisburg",   href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Dayton",       href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Sugarcreek Township?",
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
    url: `${SITE_URL}/locations/dayton/sugarcreek-township`,
    serviceArea: "Sugarcreek Township, Ohio",
    geo: { latitude: 39.6400, longitude: -84.0600 },
  },
};

// ─── TIPP CITY ────────────────────────────────────────────────────────────────

export const tippCityConfig: CommunityConfig = {
  slug: "tipp-city",
  cityName: "Tipp City",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/tipp-city",

  seoTitle: "Tipp City Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Tipp City, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/tipp-city-hero.jpg`,
  heroImageAlt: "Historic Main Street in Tipp City, Ohio",
  heroHeadline: "Tipp City, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Tipp City, Ohio — serving homeowners, rental property owners, and investors in one of Miami County's most desirable small communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Tipp City — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Tipp City — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Tipp City communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Tipp City — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Tipp City office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Tipp City homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Tipp City?",
    subhead:
      "Browse current Tipp City rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Tipp City",
    paragraphs: [
      "Tipp City is a city in Miami County, Ohio, situated approximately 12 miles north of Dayton along the I-75 corridor. With a population of roughly 10,500, Tipp City has developed as one of the Miami Valley's more sought-after small communities — a place that combines the convenience of Interstate access to Dayton with the character and pace of a historic small-town downtown. The city was originally known as Tippecanoe City, named after the 1811 Battle of Tippecanoe, and was incorporated in 1840.",
      "Tipp City's historic Main Street is a genuine centerpiece rather than a marketing construct: a well-preserved 19th-century commercial corridor populated with locally owned shops, restaurants, antique dealers, and community institutions that draw residents and visitors from across the Miami Valley. The city is served by Tipp City Exempted Village School District; Tippecanoe High School holds a 7 of 10 GreatSchools rating and has earned six consecutive College Success Awards recognizing its track record in preparing students for post-secondary education. The city's parks system and proximity to the Great Miami River Recreational Trail add a recreational dimension that appeals to active households.",
      "Tipp City attracts families and professionals who value smaller-town character and strong schools within a practical commute of Dayton employers, Wright-Patterson Air Force Base, and the upper Miami Valley manufacturing corridor. With approximately 73% owner-occupancy and median sale prices around $317,000, the community sits at a premium relative to much of the Dayton metro — which reflects consistent demand from quality-conscious buyers and renters who prioritize school district and quality of life over lowest-possible price.",
    ],
    source: "Source: Wikipedia and City of Tipp City",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Tipp City housing market", href: "https://www.redfin.com/city/19431/OH/Tipp-City/housing-market" },
    { label: "Zumper — Tipp City rental market", href: "https://www.zumper.com/rent-research/tipp-city-oh" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Tipp City", href: "https://www.ohio-demographics.com/tipp-city-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~25 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$317,000", "Rentals: ~$1,025/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~73% owner-occupied", "~27% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$85,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Tippecanoe High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Tipp City", LOCATION_FAQ_STATS["tipp-city"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Tipp City",
  nearbyAreas: [
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Troy",              href: "#", coords: { lat: 40.0395, lng: -84.2036 } },
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Piqua",             href: "#", coords: { lat: 40.1459, lng: -84.2441 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Tipp City?",
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
    url: `${SITE_URL}/locations/dayton/tipp-city`,
    serviceArea: "Tipp City, Ohio",
    geo: { latitude: 39.9623, longitude: -84.1704 },
  },
};

// ─── TROY ─────────────────────────────────────────────────────────────────────

export const troyConfig: CommunityConfig = {
  slug: "troy",
  cityName: "Troy",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/troy",

  seoTitle: "Troy Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Troy, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/troy-hero.jpg`,
  heroImageAlt: "Historic church on the main street in Troy, Ohio",
  heroHeadline: "Troy, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Troy, Ohio — serving homeowners, rental property owners, and investors in the Miami County seat and one of the Miami Valley's most admired mid-sized cities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Troy — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Troy — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Troy communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Troy — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Troy office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Troy homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Troy?",
    subhead:
      "Browse current Troy rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Troy",
    paragraphs: [
      "Troy is a city in Miami County, Ohio, and the county seat, located approximately 18 miles north of Dayton along the Great Miami River. With a population of roughly 27,000, Troy is the commercial, governmental, and cultural center of Miami County and consistently recognized as one of the Miami Valley's most livable cities. The city was platted in 1808 by John Vanmeter, and its canal-era growth along the Miami and Erie Canal laid the foundation for the historic urban fabric that distinguishes downtown Troy today.",
      "Troy's Public Square is one of the most intact historic downtown cores in southwestern Ohio: a walkable commercial grid centered on the neoclassical Miami County Courthouse, surrounded by 19th and early 20th century commercial buildings populated with locally owned restaurants, shops, galleries, and civic uses. Troy City School District operates Troy High School, which holds a 9 of 10 GreatSchools rating — one of the highest among public high schools in the region — reflecting strong college preparation outcomes and consistent academic performance. Hobart Service, a global foodservice equipment company that has been headquartered in Troy since 1897, anchors a manufacturing and engineering employment base that stabilizes local household income and demand.",
      "Troy offers an unusually strong combination for investors: affordable entry prices, a top-rated school district, a genuine historic downtown, and a city of sufficient scale to support consistent retail, services, and employment. With approximately 65% owner-occupancy and median sale prices around $232,000, the market is accessible while maintaining the community quality that drives stable tenant demand from Miami County workers, healthcare employees, and families prioritizing school district access.",
    ],
    source: "Source: Wikipedia and City of Troy",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Troy housing market", href: "https://www.redfin.com/city/19585/OH/Troy/housing-market" },
    { label: "Zillow Rental Manager — Troy", href: "https://www.zillow.com/rental-manager/market-trends/troy-oh/" },
    { label: "U.S. Census Bureau / DataUSA — Troy", href: "https://datausa.io/profile/geo/troy-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~36 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$232,000", "Rentals: ~$1,195/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~65% owner-occupied", "~35% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$69,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Troy High School (9/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Troy", LOCATION_FAQ_STATS["troy"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Troy",
  nearbyAreas: [
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Piqua",             href: "#", coords: { lat: 40.1459, lng: -84.2441 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Troy?",
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
    url: `${SITE_URL}/locations/dayton/troy`,
    serviceArea: "Troy, Ohio",
    geo: { latitude: 40.0395, longitude: -84.2036 },
  },
};

// ─── UNION ────────────────────────────────────────────────────────────────────

export const unionConfig: CommunityConfig = {
  slug: "union",
  cityName: "Union",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/union",

  seoTitle: "Union Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Union, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/union-hero.jpg`,
  heroImageAlt: "Great Miami River flowing near Union, Ohio",
  heroHeadline: "Union, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Union, Ohio — serving homeowners, rental property owners, and investors in this established Montgomery County community served by the highly rated Northmont City School District. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Union — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Union — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Union communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Union — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Union office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Union homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Union?",
    subhead:
      "Browse current Union rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Union",
    paragraphs: [
      "Union is a city in Montgomery County, Ohio, located in the western portion of the Dayton metropolitan area adjacent to Englewood. With a population of approximately 6,900, Union is one of Montgomery County's smaller incorporated cities and has developed primarily as a residential community within the Northmont City School District — a district that spans the northwestern Dayton suburbs including Clayton and Englewood. The city sits along the US-40 and I-70 corridors, providing direct highway access to both the Dayton urban core to the east and connections west toward Richmond, Indiana.",
      "Union's character is predominantly residential — single-family neighborhoods that grew in earnest through the post-war suburban expansion of the 1950s through 1980s, with a community identity shaped by its school district affiliation and proximity to Dayton International Airport. Northmont High School serves the district's secondary students and holds an 8 of 10 GreatSchools rating, one of the stronger public high school scores in Montgomery County. The city's proximity to Englewood MetroPark and the broader Montgomery County park system gives residents access to recreational greenspace within a suburban context.",
      "Union's combination of a top-rated school district, very low renter-occupancy (approximately 19%), and below-metro-average housing prices creates a stable, low-turnover investment environment. The tenant pool in Union typically consists of households seeking Northmont school district access who are not yet positioned to purchase — a dynamic that produces financially stable renters with longer intended tenancies and very limited competition from new rental supply in a community where the vast majority of residents own their homes.",
    ],
    source: "Source: Wikipedia and City of Union",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Union housing market", href: "https://www.redfin.com/city/19774/OH/Union/housing-market" },
    { label: "RentCafe — Union, Montgomery County", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/union/" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Union", href: "https://www.ohio-demographics.com/union-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~48 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$190,000", "Rentals: ~$1,200/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~81% owner-occupied", "~19% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$69,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Northmont High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Union", LOCATION_FAQ_STATS["union"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Union",
  nearbyAreas: [
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Trotwood",          href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Union?",
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
    url: `${SITE_URL}/locations/dayton/union`,
    serviceArea: "Union, Ohio",
    geo: { latitude: 39.8953, longitude: -84.2953 },
  },
};

// ─── YELLOW SPRINGS ───────────────────────────────────────────────────────────

export const yellowSpringsConfig: CommunityConfig = {
  slug: "yellow-springs",
  cityName: "Yellow Springs",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/yellow-springs",

  seoTitle: "Yellow Springs Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Yellow Springs, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/yellow-springs-hero.jpg`,
  heroImageAlt: "The springs at Glen Helen Nature Preserve in Yellow Springs, Ohio",
  heroHeadline: "Yellow Springs, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Yellow Springs, Ohio — serving homeowners, rental property owners, and investors in one of the Dayton region's most distinctive and supply-constrained communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Yellow Springs — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Yellow Springs — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Yellow Springs communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Yellow Springs — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Yellow Springs office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Yellow Springs homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Yellow Springs?",
    subhead:
      "Browse current Yellow Springs rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Yellow Springs",
    paragraphs: [
      "Yellow Springs is a village in Greene County, Ohio, located approximately 16 miles east of Dayton along US Route 68. With a population of approximately 3,700, Yellow Springs is one of Ohio's most distinctive small communities — an arts-oriented, intellectually engaged village whose identity is anchored by Antioch College, a private liberal arts institution that has occupied the village's center since 1852, and by Glen Helen Nature Preserve, a 1,000-acre natural area managed by Antioch University that borders the village to the east.",
      "Xenia Avenue serves as Yellow Springs' main commercial corridor: a walkable, locally owned streetscape of galleries, bookshops, restaurants, and studios that draws both residents and day visitors from across the Dayton region. The village is served by Yellow Springs Exempted Village School District; Yellow Springs/McKinney High School holds an 8 of 10 GreatSchools rating, reflecting above-average academic performance for a small-enrollment school. The presence of Antioch College, two natural preserves (Glen Helen and John Bryan State Park), and a longstanding arts community create a culturally active environment that attracts artists, academics, healthcare workers from the surrounding metro, and remote-working professionals.",
      "Yellow Springs is one of the most supply-constrained housing markets in the Dayton region. Very limited inventory, high sale prices relative to village scale, and a distinctive community identity that resists replication produce consistent demand from non-buying households — artists, Antioch-affiliated individuals, and professionals who want the village's quality of life without an immediate purchase. For property investors, that demand profile and the near-impossibility of new rental supply creation supports a premium-rent, low-vacancy dynamic that operates largely independently of broader Dayton metro industrial or employment cycles.",
    ],
    source: "Source: Wikipedia and Village of Yellow Springs",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Yellow Springs housing market", href: "https://www.redfin.com/city/21018/OH/Yellow-Springs/housing-market" },
    { label: "U.S. Census Bureau / DataUSA — Yellow Springs", href: "https://datausa.io/profile/geo/yellow-springs-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Tag, label: "Housing Prices", value: "Sales: ~$360,000" },
    { icon: Users, label: "Owners vs Renters", value: ["~65% owner-occupied", "~36% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$67,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Yellow Springs/McKinney High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Yellow Springs", LOCATION_FAQ_STATS["yellow-springs"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Yellow Springs",
  nearbyAreas: [
    { name: "Fairborn",            href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Xenia",               href: "#", coords: { lat: 39.6845, lng: -83.9313 } },
    { name: "Beavercreek",         href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Huber Heights",       href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Riverside",           href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Sugarcreek Township", href: "#", coords: { lat: 39.6400, lng: -84.0600 } },
    { name: "Oakwood",             href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Yellow Springs?",
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
    url: `${SITE_URL}/locations/dayton/yellow-springs`,
    serviceArea: "Yellow Springs, Ohio",
    geo: { latitude: 39.8028, longitude: -83.8877 },
  },
};

// ─── CLAYTON ──────────────────────────────────────────────────────────────────

export const claytonConfig: CommunityConfig = {
  slug: "clayton",
  cityName: "Clayton",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/clayton",

  seoTitle: "Clayton Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Clayton, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/clayton-hero.jpg`,
  heroImageAlt: "Residential neighborhoods in Clayton, Ohio — northwest Dayton suburb in Montgomery County",
  heroHeadline: "Clayton, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Clayton, Ohio — serving homeowners, rental property owners, and investors in one of Montgomery County's most established and high-income northwestern suburbs. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Clayton — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Clayton — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Clayton communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Clayton — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Clayton office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Clayton homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Clayton?",
    subhead:
      "Browse current Clayton rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Clayton",
    paragraphs: [
      "Clayton is a city in Montgomery County, Ohio, situated in the northwestern Dayton metropolitan area. With a population of approximately 13,000, Clayton was incorporated in 1967 through the consolidation of former Butler Township and takes its name from United States Senator John M. Clayton of Delaware. The city is part of the Northmont City School District service area, which gives it a strong suburban school identity shared with neighboring Englewood and Union.",
      "Clayton's built environment is predominantly residential — well-maintained single-family neighborhoods developed from the 1960s through 2000s, with a modest commercial presence along State Routes 49 and 40. Northmont High School, which serves students from Clayton and surrounding communities, holds an 8 of 10 GreatSchools rating — one of the stronger public high school scores in Montgomery County. Flat Fork Park and the township's green infrastructure give residents accessible recreational space. Proximity to Dayton International Airport in adjacent Vandalia provides employment access for aviation, logistics, and air freight workers.",
      "With approximately 82% owner-occupancy and a median household income near $91,000, Clayton is among the more affluent and ownership-dominated communities in the northwestern Dayton metro. The rental market is small but well-defined: households renting in Clayton typically do so to access Northmont schools and the northwest Dayton location while they position for ownership — producing financially stable, longer-tenancy renters in a market where competing rental supply is very limited.",
    ],
    source: "Source: Wikipedia and City of Clayton",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Clayton housing market", href: "https://www.redfin.com/city/4052/OH/Clayton/housing-market" },
    { label: "RentCafe — Clayton average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/clayton/" },
    { label: "U.S. Census Bureau / DataUSA — Clayton", href: "https://datausa.io/profile/geo/clayton-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~67 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$243,000", "Rentals: ~$1,063/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~82% owner-occupied", "~18% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$91,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Northmont High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Clayton", LOCATION_FAQ_STATS["clayton"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Clayton",
  nearbyAreas: [
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Trotwood",          href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Clayton?",
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
    url: `${SITE_URL}/locations/dayton/clayton`,
    serviceArea: "Clayton, Ohio",
    geo: { latitude: 39.8514, longitude: -84.3380 },
  },
};

// ─── ENGLEWOOD ────────────────────────────────────────────────────────────────

export const englewoodConfig: CommunityConfig = {
  slug: "englewood",
  cityName: "Englewood",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/englewood",

  seoTitle: "Englewood Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Englewood, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/englewood-hero.jpg`,
  heroImageAlt: "EngleWood MetroPark and residential community in Englewood, Ohio — northwest Dayton suburb",
  heroHeadline: "Englewood, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Englewood, Ohio — serving homeowners, rental property owners, and investors in this northwest Dayton suburb with one of the region's most notable natural amenities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Englewood — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Englewood — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Englewood communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Englewood — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Englewood office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Englewood homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Englewood?",
    subhead:
      "Browse current Englewood rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Englewood",
    paragraphs: [
      "Englewood is a city in Montgomery County, Ohio, located in the northwestern Dayton metropolitan area adjacent to Clayton and Vandalia. With a population of approximately 13,000, Englewood developed primarily as a post-World War II residential suburb and is served by Northmont City School District — the same district that serves neighboring Clayton and Union, giving it a consistent school-quality identity across the northwestern Dayton suburbs.",
      "EngleWood MetroPark, a 1,040-acre natural area managed by Five Rivers MetroParks along the Stillwater River, is Englewood's defining civic asset — a greenspace of unusual scale for a community of its size, offering trails, recreation facilities, and river corridor access that draw residents who value outdoor amenity within a suburban context. The city's commercial presence along US-40 (the historic National Road) and SR-48 provides local retail, dining, and services. Northmont High School holds an 8 of 10 GreatSchools rating, placing Englewood in a school district that outperforms most of Montgomery County's public systems.",
      "Englewood's combination of a quality school district, a large regional park, and housing prices below those of neighboring Clayton creates a well-defined rental demand dynamic. With approximately 72% owner-occupancy and median household income near $73,000, the rental market draws from households who want the Northmont district and MetroPark access at accessible price points — typically professionals, dual-income families, and military-affiliated households with access to Dayton International Airport employment nearby.",
    ],
    source: "Source: Wikipedia and City of Englewood",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Englewood housing market", href: "https://www.redfin.com/city/6544/OH/Englewood/housing-market" },
    { label: "Apartments.com — Englewood average rent", href: "https://www.apartments.com/rent-market-trends/englewood-oh/" },
    { label: "U.S. Census Bureau QuickFacts — Englewood", href: "https://www.census.gov/quickfacts/englewoodcityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~59 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$220,000", "Rentals: ~$858/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~72% owner-occupied", "~29% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$73,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Northmont High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Englewood", LOCATION_FAQ_STATS["englewood"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Englewood",
  nearbyAreas: [
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Trotwood",          href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Englewood?",
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
    url: `${SITE_URL}/locations/dayton/englewood`,
    serviceArea: "Englewood, Ohio",
    geo: { latitude: 39.8764, longitude: -84.3012 },
  },
};

// ─── FAIRBORN ─────────────────────────────────────────────────────────────────

export const fairbornConfig: CommunityConfig = {
  slug: "fairborn",
  cityName: "Fairborn",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/fairborn",

  seoTitle: "Fairborn Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Fairborn, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/fairborn-hero.jpg`,
  heroImageAlt: "Fairborn, Ohio community adjacent to Wright-Patterson Air Force Base in Greene County",
  heroHeadline: "Fairborn, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Fairborn, Ohio — serving homeowners, rental property owners, and investors in the Greene County city immediately adjacent to Wright-Patterson Air Force Base. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Fairborn — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Fairborn — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Fairborn communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Fairborn — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Fairborn office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Fairborn homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Fairborn?",
    subhead:
      "Browse current Fairborn rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Fairborn",
    paragraphs: [
      "Fairborn is a city in Greene County, Ohio, situated immediately north and east of Wright-Patterson Air Force Base — one of the largest military installations in the United States. With a population of approximately 34,000, Fairborn is Greene County's largest city and one of the Dayton metro's most distinctive communities. The city was formed in 1950 through the merger of two communities that had grown alongside the base: Osborn and Fairfield, whose names were combined to create Fairborn.",
      "Wright-Patterson Air Force Base is the defining force shaping Fairborn's demographics, economy, and housing market. The base hosts the Air Force Materiel Command, the Air Force Institute of Technology (AFIT), and the National Air and Space Intelligence Center (NASIC) — collectively employing tens of thousands of military personnel, federal civilian workers, graduate students, and defense contractors. This generates a distinctive tenant pool that drives Fairborn's nearly equal owner-renter split. Fairborn City Schools operates Fairborn High School, which serves the district's secondary students. Access to I-675 and US-35 connects Fairborn residents to the broader Dayton metro and Greene County communities.",
      "Fairborn is one of the most rental-oriented markets in the Dayton metro, with approximately 50% renter-occupancy driven by the consistent rotation of base-affiliated personnel. That pipeline of mobile, income-verified tenants — military households, AFIT students, and defense contractors on assignment — creates rental demand that is largely independent of broader regional employment cycles. Median sale prices around $245,000 provide accessible investment entry in a market where base-generated tenancy has historically kept vacancy rates low for well-managed properties.",
    ],
    source: "Source: Wikipedia and City of Fairborn",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Fairborn housing market", href: "https://www.redfin.com/city/6651/OH/Fairborn/housing-market" },
    { label: "RentCafe — Fairborn average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/fairborn/" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Fairborn", href: "https://www.ohio-demographics.com/fairborn-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~45 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$245,000", "Rentals: ~$882/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~50% owner-occupied", "~50% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$56,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Fairborn High School (5/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Fairborn", LOCATION_FAQ_STATS["fairborn"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Fairborn",
  nearbyAreas: [
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Riverside",         href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Beavercreek",       href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Yellow Springs",    href: "#", coords: { lat: 39.8028, lng: -83.8877 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Oakwood",           href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Fairborn?",
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
    url: `${SITE_URL}/locations/dayton/fairborn`,
    serviceArea: "Fairborn, Ohio",
    geo: { latitude: 39.8298, longitude: -84.0327 },
  },
};

// ─── FRANKLIN ─────────────────────────────────────────────────────────────────

export const franklinConfig: CommunityConfig = {
  slug: "franklin",
  cityName: "Franklin",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/franklin",

  seoTitle: "Franklin Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Franklin, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/franklin-hero.jpg`,
  heroImageAlt: "Downtown Franklin, Ohio along the Great Miami River — Warren County",
  heroHeadline: "Franklin, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Franklin, Ohio — serving homeowners, rental property owners, and investors in this Warren County city along the Great Miami River. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Franklin — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Franklin — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Franklin communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Franklin — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Franklin office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Franklin homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Franklin?",
    subhead:
      "Browse current Franklin rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Franklin",
    paragraphs: [
      "Franklin is a city in Warren County, Ohio, situated along the Great Miami River between Dayton and Cincinnati — approximately 20 miles south of Dayton and 30 miles north of Cincinnati along the I-75 corridor. With a population of approximately 12,500, Franklin is one of Warren County's southern gateway communities and has functioned historically as a manufacturing and industrial center within a county that has otherwise developed as one of Ohio's most affluent and fastest-growing suburban regions. The city was named for Benjamin Franklin and incorporated in 1815.",
      "Franklin's downtown retains a recognizable historic commercial core along Main Street, anchored by the Great Miami River corridor and the city's working-class manufacturing heritage. Franklin City School District operates Franklin High School, which serves the district's secondary students. Light manufacturing, automotive supply chain operations, and I-75 corridor logistics employment provide the city's primary economic base. The Great Miami River Recreational Trail gives Franklin residents direct trail access connecting to the broader Miami Valley trail system — a recreational amenity that runs from Piqua south through the Miami Valley.",
      "Franklin offers an investment profile distinct from the surrounding Warren County premium suburbs. While Springboro, Centerville, and the county's northern communities skew upscale, Franklin has lower median incomes, higher renter-occupancy (approximately 40%), and median sale prices around $260,000 that represent accessible entry compared to Warren County's average. For investors, this means reaching working households who want the county's I-75 access and river-corridor lifestyle at price points that support positive cash flow — a different segment of Warren County demand than the higher-end markets to the north.",
    ],
    source: "Source: Wikipedia and City of Franklin",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Franklin housing market", href: "https://www.redfin.com/city/7267/OH/Franklin/housing-market" },
    { label: "RentCafe — Franklin, Warren County rental market", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/warren-county/franklin/" },
    { label: "U.S. Census Bureau / Point2Homes — Franklin", href: "https://www.point2homes.com/US/Neighborhood/OH/Warren-County/Franklin-Demographics.html" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~41 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$260,000", "Rentals: ~$1,050/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~60% owner-occupied", "~40% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$57,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Franklin High School (4/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Franklin", LOCATION_FAQ_STATS["franklin"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Franklin",
  nearbyAreas: [
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "Springboro",         href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Germantown",         href: "#", coords: { lat: 39.6264, lng: -84.3769 } },
    { name: "Miamisburg",         href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Washington Township",href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "West Carrollton",    href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Waynesville",        href: "#", coords: { lat: 39.5345, lng: -84.0892 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Franklin?",
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
    url: `${SITE_URL}/locations/dayton/franklin`,
    serviceArea: "Franklin, Ohio",
    geo: { latitude: 39.5556, longitude: -84.3047 },
  },
};

// ─── GERMANTOWN ───────────────────────────────────────────────────────────────

export const germantownConfig: CommunityConfig = {
  slug: "germantown",
  cityName: "Germantown",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/germantown",

  seoTitle: "Germantown Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Germantown, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/germantown-hero.jpg`,
  heroImageAlt: "Historic Main Street in Germantown, Ohio — Montgomery County Ohio Heritage Village",
  heroHeadline: "Germantown, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Germantown, Ohio — serving homeowners, rental property owners, and investors in this distinctive Montgomery County village with a preserved 19th-century downtown and documented Underground Railroad history. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Germantown — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Germantown — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Germantown communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Germantown — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Germantown office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Germantown homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Germantown?",
    subhead:
      "Browse current Germantown rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Germantown",
    paragraphs: [
      "Germantown is a village in Montgomery County, Ohio, located approximately 16 miles south of Dayton along the Great Miami River. With a population of approximately 5,700, Germantown is one of the Miami Valley's most historically distinctive communities. Founded in 1814 by German-speaking settlers who emigrated from Pennsylvania, the village was designated as an Ohio Heritage Village for its preserved 19th-century architecture and documented history as a stop on the Underground Railroad — a period of its past marked by the prominent role of local citizens in aiding freedom seekers moving north.",
      "Germantown's historic downtown is among the best-preserved in Montgomery County: a compact village center of 19th-century brick commercial buildings centered on Veterans Memorial Park, surrounded by established residential neighborhoods that retain much of their original character. Valley View Local School District serves the village; Valley View High School holds a 7 of 10 GreatSchools rating and has earned five consecutive College Success Awards recognizing its track record in college preparation. Germantown MetroPark, managed by Five Rivers MetroParks, borders the village and provides trail access and river-corridor greenspace along the Great Miami.",
      "Germantown's 78% owner-occupancy and median household income near $84,000 reflect a stable, predominantly ownership-oriented community that attracts households seeking the character and pace of a historic small town with access to the southern Dayton metro. The rental market is small — consistent with a village where most long-term residents own — but serves a well-defined segment of households who want Valley View schools, Germantown's distinctive built environment, and MetroPark access at price points that remain accessible relative to more suburban southern Dayton communities.",
    ],
    source: "Source: Wikipedia and Village of Germantown",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Germantown housing market", href: "https://www.redfin.com/city/7627/OH/Germantown/housing-market" },
    { label: "Zumper — Germantown rental market", href: "https://www.zumper.com/rent-research/germantown-oh" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Germantown", href: "https://www.ohio-demographics.com/germantown-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~61 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$239,000", "Rentals: ~$1,190/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~78% owner-occupied", "~22% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$84,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Valley View High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Germantown", LOCATION_FAQ_STATS["germantown"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Germantown",
  nearbyAreas: [
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "Miamisburg",         href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Franklin",           href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
    { name: "West Carrollton",    href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Springboro",         href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Washington Township",href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Trotwood",           href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Germantown?",
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
    url: `${SITE_URL}/locations/dayton/germantown`,
    serviceArea: "Germantown, Ohio",
    geo: { latitude: 39.6264, longitude: -84.3769 },
  },
};

// ─── GREENVILLE ───────────────────────────────────────────────────────────────

export const greenvilleConfig: CommunityConfig = {
  slug: "greenville",
  cityName: "Greenville",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/greenville",

  seoTitle: "Greenville Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Greenville, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/greenville-hero.jpg`,
  heroImageAlt: "Greenville, Ohio downtown and courthouse — Darke County seat and Annie Oakley hometown",
  heroHeadline: "Greenville, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Greenville, Ohio — serving homeowners, rental property owners, and investors in the Darke County seat and one of the Miami Valley's most historically notable small cities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Greenville — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Greenville — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Greenville communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Greenville — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Greenville office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Greenville homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Greenville?",
    subhead:
      "Browse current Greenville rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Greenville",
    paragraphs: [
      "Greenville is a city in Darke County, Ohio, and the county seat, located approximately 25 miles northwest of Dayton. With a population of approximately 12,000, Greenville serves as the commercial, governmental, and professional hub for one of Ohio's most rural counties. The city is most widely known beyond the region as the hometown of two notable figures: Annie Oakley — the sharpshooter born near North Star in Darke County who is commemorated through the annual Annie Oakley Days festival — and Lowell Thomas, the journalist and broadcaster who helped popularize the story of T. E. Lawrence of Arabia.",
      "Greenville's Broadway Street forms a traditional downtown corridor anchored by the Darke County Courthouse — a Second Empire structure completed in 1872 and one of the more architecturally distinguished 19th-century civic buildings in the Miami Valley. Greenville City Schools operates Greenville Senior High School, which serves the district's secondary students. Agriculture forms the foundation of Darke County's economy, with Greenville functioning as the county's primary service center for the surrounding farm communities. Wayne Hospital and government employment provide stable institutional anchors for local household income.",
      "Greenville represents the most rural and most affordable end of the Dayton market's investment spectrum. A median sale price near $134,000 and approximately 47% renter-occupancy position it as a high-yield, cash-flow-oriented market with very low acquisition costs. County seat employment, healthcare, and agricultural service businesses anchor consistent tenant demand from working households. For investors willing to manage properties in a rural market with different logistics than suburban Dayton, Greenville's price-to-rent dynamics offer gross yields that are difficult to match in the metro core.",
    ],
    source: "Source: Wikipedia and City of Greenville",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Greenville housing market", href: "https://www.redfin.com/city/8262/OH/Greenville/housing-market" },
    { label: "Zillow Rental Manager — Greenville", href: "https://www.zillow.com/rental-manager/market-trends/greenville-oh/" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Greenville", href: "https://www.ohio-demographics.com/greenville-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~57 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$134,000", "Rentals: ~$650/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~53% owner-occupied", "~47% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$47,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Greenville Senior High School (4/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Greenville", LOCATION_FAQ_STATS["greenville"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Greenville",
  nearbyAreas: [
    { name: "Piqua",     href: "#", coords: { lat: 40.1459, lng: -84.2441 } },
    { name: "Union",     href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Troy",      href: "#", coords: { lat: 40.0395, lng: -84.2036 } },
    { name: "Clayton",   href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Englewood", href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Eaton",     href: "#", coords: { lat: 39.7442, lng: -84.6355 } },
    { name: "Tipp City", href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Vandalia",  href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Greenville?",
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
    url: `${SITE_URL}/locations/dayton/greenville`,
    serviceArea: "Greenville, Ohio",
    geo: { latitude: 40.1059, longitude: -84.6269 },
  },
};

// ─── HARRISON TOWNSHIP ────────────────────────────────────────────────────────

export const harrisonTownshipConfig: CommunityConfig = {
  slug: "harrison-township",
  cityName: "Harrison Township",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/harrison-township",

  seoTitle: "Harrison Township Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Harrison Township, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/harrison-township-hero.jpg`,
  heroImageAlt: "Residential neighborhood in Harrison Township, Montgomery County — northwest Dayton metro",
  heroHeadline: "Harrison Township, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Harrison Township, Ohio — serving homeowners, rental property owners, and investors in this unincorporated Montgomery County community in the northwest Dayton metro. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Harrison Township — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Harrison Township — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Harrison Township communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Harrison Township — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Harrison Township office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Harrison Township homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Harrison Township?",
    subhead:
      "Browse current Harrison Township rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Harrison Township",
    paragraphs: [
      "Harrison Township is an unincorporated community in Montgomery County, Ohio, situated in the northwest-central Dayton metropolitan area. With a population of approximately 21,700 and a land area of roughly 17 square miles, Harrison Township is one of the larger unincorporated townships in Montgomery County and functions as a residential and commercial community without incorporated city government — a status that distinguishes it from the surrounding municipalities of Trotwood, Huber Heights, and Vandalia that border its edges.",
      "The township is served by two public school districts depending on location within its boundaries: Northridge Local Schools, which operates Northridge High School, and Dayton Public Schools, which serves portions of the township closer to the Dayton city limits. The Montgomery County Fairgrounds, which has hosted the annual county fair since the 19th century, are located within the township and represent a significant civic anchor. Commercial activity is concentrated along the SR-4 and Union Road corridors, which connect residents to the broader northwest Dayton employment and retail base.",
      "Harrison Township's character as an unincorporated township shapes its investment profile in two meaningful ways: no city income tax applies to residents, and entry-level acquisition costs are among the most accessible in Montgomery County. With approximately 40% renter-occupancy and a median household income near $45,000, the township serves working households at the affordable end of the Dayton metro spectrum — making it a cash-flow-oriented market for investors focused on gross yield rather than appreciation-driven returns.",
    ],
    source: "Source: Wikipedia and Harrison Township, Ohio",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Census Reporter — Harrison Township, Montgomery County", href: "https://censusreporter.org/profiles/06000US3911333922-harrison-township-montgomery-county-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Users, label: "Owners vs Renters", value: ["~60% owner-occupied", "~40% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$45,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Northridge High School (3/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Harrison Township", LOCATION_FAQ_STATS["harrison-township"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Harrison Township",
  nearbyAreas: [
    { name: "Vandalia",      href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Huber Heights", href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Dayton",        href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Riverside",     href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Englewood",     href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Trotwood",      href: "#", coords: { lat: 39.7876, lng: -84.3069 } },
    { name: "Union",         href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Oakwood",       href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Harrison Township?",
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
    url: `${SITE_URL}/locations/dayton/harrison-township`,
    serviceArea: "Harrison Township, Ohio",
    geo: { latitude: 39.8287, longitude: -84.2036 },
  },
};

// ─── HUBER HEIGHTS ────────────────────────────────────────────────────────────

export const huberHeightsConfig: CommunityConfig = {
  slug: "huber-heights",
  cityName: "Huber Heights",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/huber-heights",

  seoTitle: "Huber Heights Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Huber Heights, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/huber-heights-hero.jpg`,
  heroImageAlt: "Aerial view of Huber Heights, Ohio — America's largest community of brick homes",
  heroHeadline: "Huber Heights, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Huber Heights, Ohio — serving homeowners, rental property owners, and investors in the northeast Dayton suburb known as America's largest community of brick homes. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Huber Heights — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Huber Heights — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Huber Heights communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Huber Heights — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Huber Heights office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Huber Heights homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Huber Heights?",
    subhead:
      "Browse current Huber Heights rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Huber Heights",
    paragraphs: [
      "Huber Heights is a city in Montgomery County, Ohio, situated in the northeastern Dayton metropolitan area. With a population of approximately 43,000, Huber Heights was incorporated as a city in 1981 — but its defining character was established decades earlier when developer Don Huber planned and built a large-scale residential community of uniform brick ranch homes throughout the 1950s and 1960s. The result earned Huber Heights the widely recognized designation as America's Largest Community of Brick Homes, a distinction that shaped the city's identity and produced a distinctive visual consistency that remains visible today across thousands of similar brick ranches lining its residential streets.",
      "Huber Heights City School District operates Wayne High School as the city's primary secondary institution. The city's location on the I-70 corridor places residents within minutes of Dayton International Airport and Wright-Patterson Air Force Base — two of the region's largest employers — generating consistent demand from aviation workers, defense professionals, and manufacturing employees who value the northeast Dayton location. State Route 202 serves as the city's main commercial spine, supporting retail, dining, and services scaled to a community of Huber Heights' size.",
      "With approximately 73% owner-occupancy and a median household income near $77,000, Huber Heights is a solidly middle-class community with a well-established rental market that draws from military, aviation, and professional households who want the I-70 and base-adjacent location without committing to home ownership. Median sale prices around $220,000 offer accessible investment entry in a community large enough — at 43,000 residents — to sustain consistent rental demand across market cycles.",
    ],
    source: "Source: Wikipedia and City of Huber Heights",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Huber Heights housing market", href: "https://www.redfin.com/city/9324/OH/Huber-Heights/housing-market" },
    { label: "RentCafe — Huber Heights average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/huber-heights/" },
    { label: "U.S. Census Bureau QuickFacts — Huber Heights", href: "https://www.census.gov/quickfacts/fact/table/huberheightscityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~33 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$220,000", "Rentals: ~$1,212/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~73% owner-occupied", "~27% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$77,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Wayne High School (5/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Huber Heights", LOCATION_FAQ_STATS["huber-heights"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Huber Heights",
  nearbyAreas: [
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Riverside",         href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Fairborn",          href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Oakwood",           href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "Beavercreek",       href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Huber Heights?",
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
    url: `${SITE_URL}/locations/dayton/huber-heights`,
    serviceArea: "Huber Heights, Ohio",
    geo: { latitude: 39.8442, longitude: -84.1240 },
  },
};

// ─── MIAMISBURG ───────────────────────────────────────────────────────────────

export const miamisburgConfig: CommunityConfig = {
  slug: "miamisburg",
  cityName: "Miamisburg",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/miamisburg",

  seoTitle: "Miamisburg Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Miamisburg, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/miamisburg-hero.jpg`,
  heroImageAlt: "Miamisburg Mound and downtown along the Great Miami River — Miamisburg, Ohio",
  heroHeadline: "Miamisburg, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Miamisburg, Ohio — serving homeowners, rental property owners, and investors in this Great Miami River city anchored by one of Ohio's most significant archaeological landmarks and a thriving historic downtown. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Miamisburg — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Miamisburg — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Miamisburg communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Miamisburg — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Miamisburg office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Miamisburg homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Miamisburg?",
    subhead:
      "Browse current Miamisburg rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Miamisburg",
    paragraphs: [
      "Miamisburg is a city in Montgomery County, Ohio, situated at the confluence of the Great Miami River and Bear Creek in the southern Dayton metropolitan area. With a population of approximately 21,000, Miamisburg is shaped by two defining landmarks: the Miamisburg Mound — one of the largest conical earthworks in Ohio, rising 65 feet over the surrounding river plain and designated a National Historic Landmark — and a walkable historic downtown along First Street that has undergone sustained commercial investment since the early 2000s. The city was platted in 1818 and grew as a canal town on the Miami and Erie Canal before transitioning to manufacturing and, eventually, to the suburban residential community it is today.",
      "Miamisburg City Schools serves the city's secondary students through Miamisburg High School, which holds a 7 of 10 GreatSchools rating and has earned four consecutive College Success Awards recognizing its record in college preparation. The city's industrial parks along the Great Miami River corridor draw operations in light manufacturing, defense supply, and distribution. The Great Miami River Recreational Trail passes through Miamisburg, connecting residents to the broader Miami Valley trail network and providing a recreational amenity that distinguishes the city from comparably sized Dayton suburbs.",
      "Miamisburg offers a compelling investment profile for the southern Dayton metro: median sale prices near $273,000, 73% owner-occupancy, and a median household income near $82,000 position it as a quality suburb at accessible entry costs. Its historic downtown, trail access, and above-average school system attract households who value both community character and practical accessibility — supporting consistent rental demand from professionals and families who prioritize the Miamisburg school district and river-corridor lifestyle.",
    ],
    source: "Source: Wikipedia and City of Miamisburg",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Miamisburg housing market", href: "https://www.redfin.com/city/12672/OH/Miamisburg/housing-market" },
    { label: "RentCafe — Miamisburg average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/miamisburg/" },
    { label: "U.S. Census Bureau / DataUSA — Miamisburg", href: "https://datausa.io/profile/geo/miamisburg-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~53 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$273,000", "Rentals: ~$1,335/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~73% owner-occupied", "~27% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$82,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Miamisburg High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Miamisburg", LOCATION_FAQ_STATS["miamisburg"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Miamisburg",
  nearbyAreas: [
    { name: "West Carrollton",    href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "Germantown",         href: "#", coords: { lat: 39.6264, lng: -84.3769 } },
    { name: "Franklin",           href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
    { name: "Washington Township",href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Kettering",          href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Springboro",         href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Miamisburg?",
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
    url: `${SITE_URL}/locations/dayton/miamisburg`,
    serviceArea: "Miamisburg, Ohio",
    geo: { latitude: 39.6484, longitude: -84.2897 },
  },
};

// ─── RIVERSIDE ────────────────────────────────────────────────────────────────

export const riversideConfig: CommunityConfig = {
  slug: "riverside",
  cityName: "Riverside",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/riverside",

  seoTitle: "Riverside Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Riverside, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/riverside-hero.jpg`,
  heroImageAlt: "Residential streets in Riverside, Ohio — northeast Dayton suburb near Wright-Patterson Air Force Base",
  heroHeadline: "Riverside, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Riverside, Ohio — serving homeowners, rental property owners, and investors in this northeast Montgomery County city adjacent to Wright-Patterson Air Force Base. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Riverside — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Riverside — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Riverside communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Riverside — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Riverside office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Riverside homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Riverside?",
    subhead:
      "Browse current Riverside rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Riverside",
    paragraphs: [
      "Riverside is a city in Montgomery County, Ohio, located in the northeastern portion of the Dayton urban area east of downtown Dayton. With a population of approximately 25,000, Riverside was incorporated in 1951 — formed from the former New Burlington area — and developed as a post-war residential community whose growth was directly tied to the expansion of Wright-Patterson Air Force Base and the broader northeast Montgomery County employment base. The city's eastern boundary lies within a few miles of Wright-Patterson's main gate, and the base's employment presence shapes Riverside's household composition and tenant profile in ways similar to neighboring Fairborn.",
      "Riverside is served by Mad River Local School District, which operates Stebbins High School as the primary secondary institution serving the community. The city's residential fabric consists largely of mid-century single-family homes and small multi-family properties built during the post-war suburban expansion of the 1950s and 1960s. Interstate 70 and Springfield Street provide the primary east-west connections, placing Riverside residents within practical commuting range of both downtown Dayton and the broader Greene County employment corridor.",
      "With approximately 55% owner-occupancy and a median household income near $59,000, Riverside occupies a moderate position in the northeast Dayton investment landscape — more affordable than Huber Heights or Beavercreek, but sharing their proximity to the Wright-Patterson employment anchor. The approximately 45% renter share reflects a community where military-affiliated households, working families, and professionals access the eastern Dayton location at price points well below the base-adjacent suburbs to the south. Median sale prices around $187,000 offer low acquisition costs relative to the consistent employment-driven rental demand this location generates.",
    ],
    source: "Source: Wikipedia and City of Riverside",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Riverside housing market", href: "https://www.redfin.com/city/17276/OH/Riverside/housing-market" },
    { label: "RentCafe — Riverside, Montgomery County", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/riverside/" },
    { label: "U.S. Census Bureau / DataUSA — Riverside", href: "https://datausa.io/profile/geo/riverside-oh" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~46 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$187,000", "Rentals: ~$946/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~55% owner-occupied", "~45% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$59,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Stebbins High School / Mad River Local (4/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Riverside", LOCATION_FAQ_STATS["riverside"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Riverside",
  nearbyAreas: [
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Oakwood",           href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Beavercreek",       href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Fairborn",          href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Kettering",         href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Riverside?",
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
    url: `${SITE_URL}/locations/dayton/riverside`,
    serviceArea: "Riverside, Ohio",
    geo: { latitude: 39.7803, longitude: -84.1272 },
  },
};

// ─── TROTWOOD ─────────────────────────────────────────────────────────────────

export const trotwoodConfig: CommunityConfig = {
  slug: "trotwood",
  cityName: "Trotwood",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/trotwood",

  seoTitle: "Trotwood Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Trotwood, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/trotwood-hero.jpg`,
  heroImageAlt: "Residential neighborhood in Trotwood, Ohio — northwest Montgomery County",
  heroHeadline: "Trotwood, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Trotwood, Ohio — serving homeowners, rental property owners, and investors in this northwest Montgomery County city. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Trotwood — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Trotwood — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Trotwood communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Trotwood — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Trotwood office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Trotwood homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Trotwood?",
    subhead:
      "Browse current Trotwood rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Trotwood",
    paragraphs: [
      "Trotwood is a city in Montgomery County, Ohio, situated in the northwestern Dayton metropolitan area along the Wolf Creek and Twin Creek corridors. With a population of approximately 24,000, Trotwood incorporated as a city in 1996 from the former Van Buren Township, though residential development and community identity took shape through the mid-20th century as the area absorbed post-war suburban growth from Dayton. The city takes its name from the local Trotwood area, a naming tradition rooted in the small streams — trotwoods — and the agricultural heritage of northwestern Montgomery County.",
      "Trotwood-Madison City School District serves the city through Trotwood-Madison High School. The city's commercial presence is concentrated along Salem Avenue and Wolf Creek Pike, where retail corridors and service businesses anchor local commerce. Twin Creek MetroPark, managed by Five Rivers MetroParks, provides greenspace and trail access through the southwestern portion of the city — connecting Trotwood residents to the broader Five Rivers network of over 16,000 acres of parkland across the Miami Valley. The city's location between Clayton to the west and Dayton to the east gives residents direct access to employment and amenities in both directions.",
      "With approximately 58% owner-occupancy and a median household income near $49,000, Trotwood is one of the more affordable markets in the Montgomery County portfolio — and accordingly one with meaningful gross yield potential for investors who approach it with careful underwriting. Median sale prices around $145,000 represent some of the lowest acquisition costs available in the Dayton metro for a community of Trotwood's size and location. The investor profile here is typically cash-flow-focused, serving working households at the affordable end of the northwest Dayton rental market.",
    ],
    source: "Source: Wikipedia and City of Trotwood",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Trotwood housing market", href: "https://www.redfin.com/city/19563/OH/Trotwood/housing-market" },
    { label: "RentCafe — Trotwood, Montgomery County", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/trotwood/" },
    { label: "U.S. Census Bureau QuickFacts — Trotwood", href: "https://www.census.gov/quickfacts/fact/table/trotwoodcityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~69 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$145,000", "Rentals: ~$839/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~58% owner-occupied", "~42% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$49,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Trotwood-Madison High School (3/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Trotwood", LOCATION_FAQ_STATS["trotwood"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Trotwood",
  nearbyAreas: [
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Oakwood",           href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "West Carrollton",   href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Vandalia",          href: "#", coords: { lat: 39.8912, lng: -84.1995 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Trotwood?",
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
    url: `${SITE_URL}/locations/dayton/trotwood`,
    serviceArea: "Trotwood, Ohio",
    geo: { latitude: 39.7876, longitude: -84.3069 },
  },
};

// ─── VANDALIA ─────────────────────────────────────────────────────────────────

export const vandaliaConfig: CommunityConfig = {
  slug: "vandalia",
  cityName: "Vandalia",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/vandalia",

  seoTitle: "Vandalia Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Vandalia, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/vandalia-hero.jpg`,
  heroImageAlt: "Vandalia, Ohio — home of Dayton International Airport in north-central Montgomery County",
  heroHeadline: "Vandalia, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Vandalia, Ohio — serving homeowners, rental property owners, and investors in the city that is home to Dayton International Airport. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Vandalia — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Vandalia — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Vandalia communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Vandalia — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Vandalia office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Vandalia homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Vandalia?",
    subhead:
      "Browse current Vandalia rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Vandalia",
    paragraphs: [
      "Vandalia is a city in Montgomery County, Ohio, situated in the north-central portion of the Dayton metropolitan area. With a population of approximately 15,000, Vandalia is defined above all by its relationship with Dayton International Airport — Ohio's second-busiest commercial airport by operations — which occupies a substantial portion of the city's western territory and generates direct employment through commercial aviation, logistics, cargo operations, and the supply chain infrastructure that clusters around major air freight hubs. The city was incorporated in 1961 and takes its name from Vandalia, the proposed 14th colony of British America that was never formally established.",
      "Vandalia-Butler City School District serves the city through Butler High School, which holds a 7 of 10 GreatSchools rating — above average for Montgomery County's public secondary schools and one of the stronger ratings in the north Dayton metro. Interstate 70 and US-40 (the historic National Road) give residents direct access to the broader Dayton metro and eastward connections toward Springfield and Columbus. The airport's presence anchors a cluster of aviation-adjacent employers — airline catering, cargo logistics, aircraft maintenance, and air freight hub operations — that contribute to the employment base supporting Vandalia's residential demand.",
      "With approximately 64% owner-occupancy and a median household income near $73,000, Vandalia is a solidly middle-income community with a well-defined rental market. The approximately 36% renter share draws from aviation workers, logistics employees, and north Dayton professionals who want I-70 access and airport-adjacent employment at accessible price points. Median sale prices around $214,000 provide accessible investment entry in a city whose economy is anchored by one of Ohio's most stable institutional employers — Dayton International Airport — whose operations remain largely independent of the manufacturing cycles that affect surrounding communities.",
    ],
    source: "Source: Wikipedia and City of Vandalia",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Vandalia housing market", href: "https://www.redfin.com/city/19984/OH/Vandalia/housing-market" },
    { label: "Zillow Rental Manager — Vandalia", href: "https://www.zillow.com/rental-manager/market-trends/vandalia-oh/" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Vandalia", href: "https://www.ohio-demographics.com/vandalia-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~78 days" },
    { icon: Tag, label: "Housing Prices", value: ["Sales: ~$214,000", "Rentals: ~$850/mo"] },
    { icon: Users, label: "Owners vs Renters", value: ["~64% owner-occupied", "~36% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$73,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Butler High School (7/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Vandalia", LOCATION_FAQ_STATS["vandalia"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Vandalia",
  nearbyAreas: [
    { name: "Harrison Township", href: "#", coords: { lat: 39.8287, lng: -84.2036 } },
    { name: "Tipp City",         href: "#", coords: { lat: 39.9623, lng: -84.1704 } },
    { name: "Union",             href: "#", coords: { lat: 39.8953, lng: -84.2953 } },
    { name: "Huber Heights",     href: "#", coords: { lat: 39.8442, lng: -84.1240 } },
    { name: "Englewood",         href: "#", coords: { lat: 39.8764, lng: -84.3012 } },
    { name: "Clayton",           href: "#", coords: { lat: 39.8514, lng: -84.3380 } },
    { name: "Riverside",         href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Dayton",            href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Vandalia?",
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
    url: `${SITE_URL}/locations/dayton/vandalia`,
    serviceArea: "Vandalia, Ohio",
    geo: { latitude: 39.8912, longitude: -84.1995 },
  },
};

// ─── WASHINGTON TOWNSHIP ──────────────────────────────────────────────────────

export const washingtonTownshipConfig: CommunityConfig = {
  slug: "washington-township",
  cityName: "Washington Township",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/washington-township",

  seoTitle: "Washington Township Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Washington Township, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/washington-township-hero.jpg`,
  heroImageAlt: "Residential neighborhoods in Washington Township, Montgomery County — southern Dayton suburb home to the City of Centerville",
  heroHeadline: "Washington Township, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Washington Township, Ohio — serving homeowners, rental property owners, and investors in one of Montgomery County's most affluent and highly regarded communities. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Washington Township — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Washington Township — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Washington Township communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Washington Township — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Washington Township office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Washington Township homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Washington Township?",
    subhead:
      "Browse current Washington Township rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Washington Township",
    paragraphs: [
      "Washington Township is an unincorporated community in Montgomery County, Ohio, situated in the southern Dayton metropolitan area. With a population of approximately 62,600 — among the largest of any Ohio township — Washington Township is home to the City of Centerville, which lies entirely within the township's boundaries, along with extensive unincorporated residential communities that have developed into some of the most sought-after addresses in the Dayton metro. The township spans approximately 31 square miles of the southern Montgomery County landscape and serves as the governmental unit providing services to residents outside the Centerville city limits.",
      "The defining asset of Washington Township is its school district: Centerville City Schools is one of the strongest public systems in the Miami Valley, and Centerville High School holds an 8 of 10 GreatSchools rating. Far Hills Avenue serves as the primary commercial and civic corridor, connecting residential neighborhoods to shopping, dining, healthcare services, and regional retail. Yankee Trace Golf Club, operated by the City of Centerville, anchors recreational programming alongside an extensive trail system and community park infrastructure. Miami Valley Hospital's South campus adds significant healthcare employment to the township's economic profile.",
      "With approximately 67% owner-occupancy and a median household income near $99,000, Washington Township is among the most affluent and ownership-oriented communities in the Dayton metro — a profile reflecting decades of selective residential development targeting families and professionals who prioritize school quality and suburban stability. The rental market draws from households who want the Centerville school district and southern Dayton location while they position for ownership — or who are in professional or healthcare roles that bring them to the area for defined periods.",
    ],
    source: "Source: Wikipedia and Washington Township, Ohio",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Rocket Homes — Washington Township market report", href: "https://rocket.com/homes/market-reports/oh/washington-township" },
    { label: "RentCafe — Centerville area average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/centerville/" },
    { label: "Census Reporter — Washington Township, Montgomery County", href: "https://censusreporter.org/profiles/06000US3911381494-washington-township-montgomery-county-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$330,000", "Rentals: ~$1,183/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~67% owner-occupied", "~33% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$99,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Centerville High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Washington Township", LOCATION_FAQ_STATS["washington-township"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Washington Township",
  nearbyAreas: [
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Kettering",          href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Springboro",         href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "West Carrollton",    href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
    { name: "Sugarcreek Township",href: "#", coords: { lat: 39.6400, lng: -84.0600 } },
    { name: "Miamisburg",         href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "Waynesville",        href: "#", coords: { lat: 39.5345, lng: -84.0892 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Washington Township?",
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
    url: `${SITE_URL}/locations/dayton/washington-township`,
    serviceArea: "Washington Township, Ohio",
    geo: { latitude: 39.6159, longitude: -84.1688 },
  },
};

// ─── WAYNESVILLE ──────────────────────────────────────────────────────────────

export const waynesvilleConfig: CommunityConfig = {
  slug: "waynesville",
  cityName: "Waynesville",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/waynesville",

  seoTitle: "Waynesville Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Waynesville, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/waynesville-hero.jpg`,
  heroImageAlt: "Historic Main Street in Waynesville, Ohio — the Antiques Capital of the Midwest in Warren County",
  heroHeadline: "Waynesville, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Waynesville, Ohio — serving homeowners, rental property owners, and investors in the charming Warren County village known as the Antiques Capital of the Midwest. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Waynesville — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Waynesville — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Waynesville communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Waynesville — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Waynesville office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Waynesville homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Waynesville?",
    subhead:
      "Browse current Waynesville rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Waynesville",
    paragraphs: [
      "Waynesville is a village in Warren County, Ohio, located approximately 30 miles south of Dayton along the Little Miami River. With a population of approximately 2,900, Waynesville is one of the more distinctive small communities in the Miami Valley — a historic 19th-century village whose well-preserved downtown along Main and High Streets has evolved into what the community markets as the Antiques Capital of the Midwest, with dozens of antique dealers, specialty shops, and galleries drawing buyers and browsers from across the region year-round.",
      "Waynesville was founded in 1797 by Quaker settlers from the Carolinas and Virginia, and its early role as a Quaker community left a distinctive imprint on the village's architecture and cultural character. Caesar Creek State Park and Caesar Creek Lake — a 2,830-acre reservoir managed by the U.S. Army Corps of Engineers — border the village and provide significant outdoor recreation, drawing boaters, hikers, anglers, and campers. Waynesville High School, operated by Wayne Local School District, holds an 8 of 10 GreatSchools rating. Warren County's position as one of Ohio's highest-income and fastest-growing counties gives Waynesville residents access to a prosperous regional economic context despite the village's small size.",
      "Waynesville's investment profile is defined by scarcity and character: limited housing supply in a distinctive historic village with strong recreational amenity and antique tourism creates consistent demand at premium price points relative to the area's rural context. With approximately 66% owner-occupancy and a median household income near $73,000, the resident base is solidly middle-income — and the rental market, though small, serves households who want the village's character and Caesar Creek access. Investment here typically means small-scale single-family or occasional multi-family in the historic village core.",
    ],
    source: "Source: Wikipedia and Village of Waynesville",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Rocket Homes — Waynesville market report", href: "https://rocket.com/homes/market-reports/oh/waynesville" },
    { label: "U.S. Census Bureau / ohio-demographics.com — Waynesville", href: "https://www.ohio-demographics.com/waynesville-demographics" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    {
      icon: Tag,
      label: "Housing Prices",
      value: "Sales: ~$380,000",
    },
    { icon: Users, label: "Owners vs Renters", value: ["~66% owner-occupied", "~34% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$73,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Waynesville High School (8/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Waynesville", LOCATION_FAQ_STATS["waynesville"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Waynesville",
  nearbyAreas: [
    { name: "Washington Township",href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Sugarcreek Township",href: "#", coords: { lat: 39.6400, lng: -84.0600 } },
    { name: "Springboro",         href: "#", coords: { lat: 39.5578, lng: -84.2316 } },
    { name: "Franklin",           href: "#", coords: { lat: 39.5556, lng: -84.3047 } },
    { name: "Kettering",          href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "West Carrollton",    href: "#", coords: { lat: 39.6720, lng: -84.2486 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Waynesville?",
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
    url: `${SITE_URL}/locations/dayton/waynesville`,
    serviceArea: "Waynesville, Ohio",
    geo: { latitude: 39.5345, longitude: -84.0892 },
  },
};

// ─── WEST CARROLLTON ──────────────────────────────────────────────────────────

export const westCarrolltonConfig: CommunityConfig = {
  slug: "west-carrollton",
  cityName: "West Carrollton",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/west-carrollton",

  seoTitle: "West Carrollton Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in West Carrollton, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/west-carrollton-hero.jpg`,
  heroImageAlt: "Great Miami River and residential neighborhoods in West Carrollton, Ohio — south Dayton suburb",
  heroHeadline: "West Carrollton, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in West Carrollton, Ohio — serving homeowners, rental property owners, and investors in this Great Miami River city immediately south of Miamisburg. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in West Carrollton — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in West Carrollton — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for West Carrollton communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in West Carrollton — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for West Carrollton office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for West Carrollton homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in West Carrollton?",
    subhead:
      "Browse current West Carrollton rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About West Carrollton",
    paragraphs: [
      "West Carrollton is a city in Montgomery County, Ohio, situated along the east bank of the Great Miami River immediately south of Miamisburg. With a population of approximately 13,000, West Carrollton developed through its industrial heritage along the river and the Miami and Erie Canal corridor, and it retains a working-class residential character that distinguishes it from the more affluent southern Dayton suburbs surrounding it. The city is connected to the broader Dayton metro via US-25 and State Route 725, placing it within a short drive of both Miamisburg and downtown Dayton.",
      "The Great Miami River Recreational Trail runs through West Carrollton along the riverbank, connecting residents to the broader Miami Valley trail network that extends from Piqua southward through the Great Miami corridor. West Carrollton City School District operates West Carrollton High School. The city's industrial legacy along the river — which included significant paper manufacturing and related operations — has transitioned toward light manufacturing, commercial services, and warehousing, providing a mix of employment types for the surrounding residential community.",
      "With approximately 55% owner-occupancy and a median household income near $58,000, West Carrollton is an affordable working-class market in the southern Montgomery County corridor. Its approximately 45% renter share reflects a community serving working households who want the Great Miami River location and Dayton metro access at accessible price points. Median sale prices around $208,000 provide lower acquisition costs than comparable locations in neighboring Miamisburg or Centerville, supporting cash flow potential for investors serving the working-family rental market.",
    ],
    source: "Source: Wikipedia and City of West Carrollton",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — West Carrollton housing market", href: "https://www.redfin.com/city/31341/OH/West-Carrollton/housing-market" },
    { label: "RentCafe — West Carrollton average rent", href: "https://www.rentcafe.com/average-rent-market-trends/us/oh/montgomery-county/west-carrollton/" },
    { label: "U.S. Census Bureau QuickFacts — West Carrollton", href: "https://www.census.gov/quickfacts/fact/table/westcarrolltoncityohio" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~43 days" },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$208,000", "Rentals: ~$1,053/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~55% owner-occupied", "~45% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$58,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "West Carrollton High School (6/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("West Carrollton", LOCATION_FAQ_STATS["west-carrollton"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near West Carrollton",
  nearbyAreas: [
    { name: "Miamisburg",         href: "#", coords: { lat: 39.6484, lng: -84.2897 } },
    { name: "Kettering",          href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Miami Township",     href: "#", coords: { lat: 39.6087, lng: -84.2983 } },
    { name: "Oakwood",            href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
    { name: "Washington Township",href: "#", coords: { lat: 39.6159, lng: -84.1688 } },
    { name: "Centerville",        href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Dayton",             href: "#", coords: { lat: 39.7589, lng: -84.1916 } },
    { name: "Germantown",         href: "#", coords: { lat: 39.6264, lng: -84.3769 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in West Carrollton?",
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
    url: `${SITE_URL}/locations/dayton/west-carrollton`,
    serviceArea: "West Carrollton, Ohio",
    geo: { latitude: 39.6720, longitude: -84.2486 },
  },
};

// ─── XENIA ────────────────────────────────────────────────────────────────────

export const xeniaConfig: CommunityConfig = {
  slug: "xenia",
  cityName: "Xenia",
  regionName: "Dayton",
  stateName: "Ohio",
  urlPath: "/locations/dayton/xenia",

  seoTitle: "Xenia Property Management & Property Services | EquityTeam",
  seoDescription:
    "Professional property management in Xenia, Dayton, Ohio by EquityTeam — leasing, rent collection, maintenance, and owner reporting.",

  heroImage: `${ORIGIN}/images/locations/heroes/xenia-hero.jpg`,
  heroImageAlt: "Xenia, Ohio — Greene County seat rebuilt after the 1974 tornado",
  heroHeadline: "Xenia, Ohio.",
  heroSubheadline: "Property Management & Property Services",
  founderQuote: "We'll treat your property like it's our own.",
  founderName: "",

  stats: SHARED_STATS,

  introCopy:
    "EquityTeam provides full-service property management and property services in Xenia, Ohio — serving homeowners, rental property owners, and investors in the Greene County seat with a remarkable history of community resilience. From residential property management to ongoing property care and maintenance, we deliver the same professional standard EquityTeam has brought to the Greater Dayton area since 2008.",

  serviceCopy: {
    "residential-property-management":
      "Full-service residential property management for single-family, multi-family, and investment portfolios in Xenia — tenant screening, leasing, rent collection, maintenance, and transparent owner reporting.",
    "vacation-rental-management":
      "Full-service vacation rental management for short-term rental owners in Xenia — listing optimization, dynamic pricing, guest communication, turnover, and revenue reporting.",
    "hoa-management":
      "Professional homeowner association management for Xenia communities — financial administration, vendor coordination, board support, and resident communication.",
    "shared-living-management":
      "Specialized management for shared living properties in Xenia — room-by-room leasing, tenant coordination, and operations tailored to the shared living model.",
    "commercial-property-management":
      "Commercial property management for Xenia office, retail, and mixed-use buildings — tenant relations, lease administration, maintenance, and reporting.",
    "property-services":
      "Ongoing property care and maintenance for Xenia homeowners — turn-key handyman, seasonal upkeep, project management, and one-call coordination so you never chase contractors yourself.",
  },

  forRent: {
    heading: "Looking to Rent in Xenia?",
    subhead:
      "Browse current Xenia rentals managed by EquityTeam. Updated availability, photos, and online applications for prospective residents.",
    href: "/for-rent",
    cta: "Browse Rentals",
  },

  areaOverview: {
    heading: "About Xenia",
    paragraphs: [
      "Xenia is a city in Greene County, Ohio, and the county seat, located approximately 15 miles east of Dayton along US-35 and Interstate 675. With a population of approximately 27,000, Xenia occupies a significant place in both regional history and American cultural memory. On April 3, 1974, an F5 tornado struck the city with devastating force — killing 34 people, injuring hundreds, and destroying or damaging approximately one-third of all structures in the community. Xenia rebuilt over the following decade and has sustained itself as the governmental and commercial hub of Greene County.",
      "Xenia's downtown is anchored by the Greene County Courthouse and a commercial district serving county government, retail, and professional services. Two historically significant institutions are located just northwest of Xenia in the Wilberforce community: Wilberforce University, founded in 1856 as one of the first American colleges established for African Americans, and Central State University, founded in 1887 as Ohio's only public historically Black university. Xenia Community City Schools operates Xenia High School. Interstate 675 provides direct access to the Dayton metro and to Wright-Patterson Air Force Base to the northwest.",
      "With approximately 59% owner-occupancy and a median household income near $55,000, Xenia offers an accessible investment entry point within Greene County — a county otherwise dominated by higher-priced Beavercreek and Centerville-adjacent markets. The approximately 41% renter share reflects a community serving county government employees, university-affiliated households, healthcare workers, and manufacturing families. Median sale prices around $223,000 provide lower acquisition costs relative to the surrounding Greene County market, supporting cash flow potential at a location with stable county-seat employment anchors.",
    ],
    source: "Source: Wikipedia and City of Xenia",
  },

  dataAccessedDate: "May 2026",

  marketInsightsSources: [
    { label: "Redfin — Xenia housing market", href: "https://www.redfin.com/city/20999/OH/Xenia/housing-market" },
    { label: "Zillow Rental Manager — Xenia", href: "https://www.zillow.com/rental-manager/market-trends/xenia-oh/" },
    { label: "Census Reporter — Xenia city, Greene County", href: "https://censusreporter.org/profiles/06000US3905786772-xenia-city-greene-county-oh/" },
    { label: "GreatSchools.org", href: "https://www.greatschools.org" },
  ],

  marketInsightsNote: "Market data compiled from public sources as of May 2026. Figures are estimates and may not be accurate or current.",

  marketInsights: [
    { icon: Clock, label: "Avg Days on Market", value: "Sales: ~41 days" },
    {
      icon: Tag,
      label: "Housing Prices",
      value: ["Sales: ~$223,000", "Rentals: ~$1,100/mo"],
    },
    { icon: Users, label: "Owners vs Renters", value: ["~59% owner-occupied", "~41% renter-occupied"] },
    { icon: CurrencyDollar, label: "Median Household Income", value: "~$55,000" },
    { icon: GraduationCap, label: "Notable Schools", value: "Xenia High School (3/10)" },
  ],

  testimonials: SHARED_TESTIMONIALS,

  faqs: buildLocationFaqs("Xenia", LOCATION_FAQ_STATS["xenia"] ?? FALLBACK_FAQ_STATS),

  nearbyHeading: "Areas We Serve Near Xenia",
  nearbyAreas: [
    { name: "Beavercreek",         href: "#", coords: { lat: 39.7209, lng: -84.0633 } },
    { name: "Sugarcreek Township", href: "#", coords: { lat: 39.6400, lng: -84.0600 } },
    { name: "Yellow Springs",      href: "#", coords: { lat: 39.8028, lng: -83.8877 } },
    { name: "Fairborn",            href: "#", coords: { lat: 39.8298, lng: -84.0327 } },
    { name: "Riverside",           href: "#", coords: { lat: 39.7803, lng: -84.1272 } },
    { name: "Centerville",         href: "#", coords: { lat: 39.6284, lng: -84.1547 } },
    { name: "Kettering",           href: "#", coords: { lat: 39.6895, lng: -84.1688 } },
    { name: "Oakwood",             href: "#", coords: { lat: 39.7264, lng: -84.1752 } },
  ],
  allAreasHref: "/areas-we-serve",
  allAreasLabel: "See all Dayton areas we serve",

  ctaHeadline: "Need help with a property in Xenia?",
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
    url: `${SITE_URL}/locations/dayton/xenia`,
    serviceArea: "Xenia, Ohio",
    geo: { latitude: 39.6845, longitude: -83.9313 },
  },
};

// ─── DAYTON_COMMUNITY_CONFIGS — must remain AFTER all export const ...Config definitions ──

export const DAYTON_COMMUNITY_CONFIGS: CommunityConfig[] = [
  ketteringConfig,
  beavercreekConfig,
  oakwoodConfig,
  centervilleConfig,
  springboroConfig,
  eatonConfig,
  miamiTownshipConfig,
  piquaConfig,
  sugarcreekTownshipConfig,
  tippCityConfig,
  troyConfig,
  unionConfig,
  yellowSpringsConfig,
  claytonConfig,
  englewoodConfig,
  fairbornConfig,
  franklinConfig,
  germantownConfig,
  greenvilleConfig,
  harrisonTownshipConfig,
  huberHeightsConfig,
  miamisburgConfig,
  riversideConfig,
  trotwoodConfig,
  vandaliaConfig,
  washingtonTownshipConfig,
  waynesvilleConfig,
  westCarrolltonConfig,
  xeniaConfig,
];
