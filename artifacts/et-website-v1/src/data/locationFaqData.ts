// Standardized location FAQ system.
// Q1 is data-driven (per-location). Q2 and Q3 are identical across every
// location — only the city name changes.

export interface LocationFaqStats {
  /** Median household income, e.g. "~$72,000" (US Census ACS). */
  medianHHI: string;
  /** Renter-occupied share, e.g. "38%" (US Census ACS). */
  renterPct: string;
  /** Average 1-bedroom rent, e.g. "$1,050" (Zillow / RentCafe). */
  rent1BR: string;
  /** Average 3-bedroom rent, e.g. "$1,750" (Zillow / RentCafe). */
  rent3BR: string;
}

export interface LocationFaqItem {
  question: string;
  answer: string;
}

const RPM_LINK =
  '<a href="/residential-property-management" style="color:inherit;text-decoration:underline;">Residential Property Management page</a>';
const CONTACT_LINK =
  '<a href="/contact-us" style="color:inherit;text-decoration:underline;">Contact our team</a>';
const PHONE_LINK =
  '<a href="tel:+15134444010" style="color:inherit;text-decoration:underline;">(513)&nbsp;444-4010</a>';

function costAnswer(city: string): string {
  return [
    `Property management fees in ${city} usually include:`,
    "",
    "• <strong>Monthly Management Fees:</strong> 8% to 12% of monthly rent.",
    "• <strong>Leasing Fees:</strong> 50&ndash;100% of one month&rsquo;s rent, sometimes a flat fee of around $800&ndash;$1,000.",
    "• <strong>Lease Renewal Fees:</strong> from a flat fee of around $100 per renewal up to 6% of the total lease term&rsquo;s cumulative gross rents.",
    "• <strong>Maintenance:</strong> Some companies charge hourly rates (starting around $60&ndash;$70 per hour and up) for an internal technician, while others outsource all maintenance to local vendors and pass the vendor bill through to the owner with a slight markup. Typically, those with internal maintenance techs respond faster, do better work, and cost the owner less in the long run.",
    "",
    `It can be hard to find these prices online since many management companies are not transparent with their pricing. EquityTeam publishes its pricing online on our ${RPM_LINK}.`,
  ].join("<br/>");
}

function gettingStartedAnswer(city: string): string {
  return `Getting started is straightforward. ${CONTACT_LINK} for a free consultation — we&rsquo;ll review your property, discuss your goals, and outline which services make the most sense for your situation. Most owners are onboarded within a few days. ${CONTACT_LINK.replace("Contact our team", "Reach out")} or call ${PHONE_LINK}.`;
}

/**
 * Build the 3 standardized FAQ items for a location.
 * Q1 uses the per-location stats; Q2 and Q3 are templated.
 */
export function buildLocationFaqs(
  city: string,
  stats: LocationFaqStats,
): LocationFaqItem[] {
  return [
    {
      question: `What's the rental market like in ${city}?`,
      answer: `${city} has a median household income of ${stats.medianHHI}. Approximately ${stats.renterPct} of units are rentals. Average rents currently range from around ${stats.rent1BR} for a one-bedroom to ${stats.rent3BR} for a three-bedroom. EquityTeam has managed properties in ${city} since 2008.`,
    },
    {
      question: `How much does residential (single-family and multi-family) property management cost in ${city}?`,
      answer: costAnswer(city),
    },
    {
      question: `How do I get started with EquityTeam in ${city}?`,
      answer: gettingStartedAnswer(city),
    },
  ];
}

// Metro-level fallback used only if a slug has no researched entry below.
// Any page relying on this is flagged in the delivery report.
export const FALLBACK_FAQ_STATS: LocationFaqStats = {
  medianHHI: "~$65,000",
  renterPct: "35%",
  rent1BR: "$1,050",
  rent3BR: "$1,650",
};

// Per-location data. Income + renter % for Cincinnati communities are seeded
// from the existing market-insights data already in the repo; rents are
// researched (Zillow / RentCafe). Dayton figures are researched (Census ACS +
// Zillow / RentCafe). Keyed by slug.
export const LOCATION_FAQ_STATS: Record<string, LocationFaqStats> = {
  // ─── Greater Cincinnati (income + renter % from existing repo market-insights;
  //     rents from RentCafe / Zillow / Apartments.com, 2025) ───
  "hyde-park": { medianHHI: "~$110,000", renterPct: "40%", rent1BR: "$1,150", rent3BR: "$1,800" },
  "oakley": { medianHHI: "~$85,000", renterPct: "45%", rent1BR: "$1,250", rent3BR: "$1,950" },
  "mount-lookout": { medianHHI: "~$105,000", renterPct: "35%", rent1BR: "$1,250", rent3BR: "$1,950" },
  "mt-adams": { medianHHI: "~$95,000", renterPct: "50%", rent1BR: "$1,500", rent3BR: "$1,950" },
  "over-the-rhine": { medianHHI: "~$55,000", renterPct: "70%", rent1BR: "$1,600", rent3BR: "$1,950" },
  "downtown": { medianHHI: "~$70,000", renterPct: "75%", rent1BR: "$1,650", rent3BR: "$1,950" },
  "northside": { medianHHI: "~$50,000", renterPct: "50%", rent1BR: "$1,275", rent3BR: "$1,950" },
  "norwood": { medianHHI: "~$58,000", renterPct: "55%", rent1BR: "$1,600", rent3BR: "$2,650" },
  "mariemont": { medianHHI: "~$120,000", renterPct: "30%", rent1BR: "$1,400", rent3BR: "$1,950" },
  "indian-hill": { medianHHI: "~$250,000", renterPct: "12%", rent1BR: "$1,275", rent3BR: "$1,950" },
  "montgomery": { medianHHI: "~$135,000", renterPct: "25%", rent1BR: "$1,750", rent3BR: "$2,700" },
  "kenwood": { medianHHI: "~$110,000", renterPct: "28%", rent1BR: "$1,550", rent3BR: "$1,950" },
  "terrace-park": { medianHHI: "~$165,000", renterPct: "15%", rent1BR: "$1,275", rent3BR: "$1,950" },
  "westwood": { medianHHI: "~$45,000", renterPct: "50%", rent1BR: "$900", rent3BR: "$1,500" },
  "college-hill": { medianHHI: "~$55,000", renterPct: "45%", rent1BR: "$1,100", rent3BR: "$1,950" },
  "pleasant-ridge": { medianHHI: "~$70,000", renterPct: "40%", rent1BR: "$1,200", rent3BR: "$1,900" },
  "madisonville": { medianHHI: "~$48,000", renterPct: "50%", rent1BR: "$1,450", rent3BR: "$1,950" },
  "east-walnut-hills": { medianHHI: "~$75,000", renterPct: "55%", rent1BR: "$1,450", rent3BR: "$1,950" },
  "walnut-hills": { medianHHI: "~$40,000", renterPct: "65%", rent1BR: "$850", rent3BR: "$1,300" },
  "mount-auburn": { medianHHI: "~$38,000", renterPct: "70%", rent1BR: "$1,500", rent3BR: "$1,950" },
  "evanston": { medianHHI: "~$35,000", renterPct: "60%", rent1BR: "$1,400", rent3BR: "$1,950" },
  "columbia-tusculum": { medianHHI: "~$95,000", renterPct: "35%", rent1BR: "$1,600", rent3BR: "$1,950" },
  "mount-washington": { medianHHI: "~$70,000", renterPct: "35%", rent1BR: "$1,150", rent3BR: "$2,200" },
  "kennedy-heights": { medianHHI: "~$60,000", renterPct: "45%", rent1BR: "$1,150", rent3BR: "$1,800" },
  "winton-place": { medianHHI: "~$38,000", renterPct: "55%", rent1BR: "$850", rent3BR: "$1,950" },
  "camp-washington": { medianHHI: "~$32,000", renterPct: "65%", rent1BR: "$1,100", rent3BR: "$1,925" },
  "sayler-park": { medianHHI: "~$55,000", renterPct: "30%", rent1BR: "$1,150", rent3BR: "$1,925" },
  "deer-park": { medianHHI: "~$75,000", renterPct: "30%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "forest-park": { medianHHI: "~$55,000", renterPct: "40%", rent1BR: "$1,000", rent3BR: "$1,725" },
  "harrison": { medianHHI: "~$78,000", renterPct: "30%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "loveland": { medianHHI: "~$95,000", renterPct: "30%", rent1BR: "$1,550", rent3BR: "$2,175" },
  "hamilton": { medianHHI: "~$48,000", renterPct: "45%", rent1BR: "$975", rent3BR: "$1,600" },
  "green-township": { medianHHI: "~$62,000", renterPct: "38%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "covedale": { medianHHI: "~$57,000", renterPct: "32%", rent1BR: "$750", rent3BR: "$1,925" },
  "monfort-heights": { medianHHI: "~$60,000", renterPct: "35%", rent1BR: "$1,150", rent3BR: "$1,925" },
  "white-oak": { medianHHI: "~$63,000", renterPct: "33%", rent1BR: "$1,150", rent3BR: "$1,925" },
  "mount-healthy": { medianHHI: "~$44,000", renterPct: "48%", rent1BR: "$1,150", rent3BR: "$1,925" },
  "anderson-township": { medianHHI: "~$115,000", renterPct: "18%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "west-chester": { medianHHI: "~$118,000", renterPct: "24%", rent1BR: "$1,450", rent3BR: "$1,925" },
  "mason": { medianHHI: "~$125,000", renterPct: "22%", rent1BR: "$1,425", rent3BR: "$2,250" },
  "liberty-township": { medianHHI: "~$120,000", renterPct: "21%", rent1BR: "$1,675", rent3BR: "$1,925" },
  "wyoming": { medianHHI: "~$145,000", renterPct: "15%", rent1BR: "$1,250", rent3BR: "$1,925" },
  "madeira": { medianHHI: "~$108,000", renterPct: "20%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "amberley-village": { medianHHI: "~$130,000", renterPct: "16%", rent1BR: "$1,100", rent3BR: "$1,925" },
  "sharonville": { medianHHI: "~$65,000", renterPct: "43%", rent1BR: "$1,275", rent3BR: "$1,925" },
  "springdale": { medianHHI: "~$56,000", renterPct: "45%", rent1BR: "$1,325", rent3BR: "$1,925" },
  "milford": { medianHHI: "~$78,000", renterPct: "32%", rent1BR: "$975", rent3BR: "$2,450" },
  "lebanon": { medianHHI: "~$82,000", renterPct: "34%", rent1BR: "$1,025", rent3BR: "$2,400" },
  "blue-ash": { medianHHI: "~$95,000", renterPct: "40%", rent1BR: "$1,475", rent3BR: "$2,025" },
  "delhi": { medianHHI: "~$62,000", renterPct: "35%", rent1BR: "$1,350", rent3BR: "$1,650" },
  "clifton": { medianHHI: "~$48,000", renterPct: "65%", rent1BR: "$950", rent3BR: "$1,925" },
  "middletown": { medianHHI: "~$57,000", renterPct: "45%", rent1BR: "$800", rent3BR: "$1,350" },
  "sycamore": { medianHHI: "~$83,000", renterPct: "30%", rent1BR: "$800", rent3BR: "$1,300" },
  "western-hills": { medianHHI: "~$60,000", renterPct: "47%", rent1BR: "$900", rent3BR: "$1,300" },

  // ─── Greater Dayton (income + renter % from US Census ACS 2023/2024;
  //     rents from RentCafe / Apartments.com, 2025) ───
  "beavercreek": { medianHHI: "~$110,000", renterPct: "28%", rent1BR: "$1,275", rent3BR: "$1,750" },
  "centerville": { medianHHI: "~$85,000", renterPct: "32%", rent1BR: "$1,175", rent3BR: "$1,725" },
  "clayton": { medianHHI: "~$93,000", renterPct: "18%", rent1BR: "$1,075", rent3BR: "$1,750" },
  "dayton": { medianHHI: "~$45,000", renterPct: "52%", rent1BR: "$850", rent3BR: "$1,500" },
  "eaton": { medianHHI: "~$51,000", renterPct: "33%", rent1BR: "$1,000", rent3BR: "$1,150" },
  "englewood": { medianHHI: "~$73,000", renterPct: "29%", rent1BR: "$850", rent3BR: "$1,450" },
  "fairborn": { medianHHI: "~$56,000", renterPct: "50%", rent1BR: "$900", rent3BR: "$1,425" },
  "franklin": { medianHHI: "~$58,000", renterPct: "40%", rent1BR: "$925", rent3BR: "$1,600" },
  "germantown": { medianHHI: "~$84,000", renterPct: "22%", rent1BR: "$1,000", rent3BR: "$1,250" },
  "greenville": { medianHHI: "~$47,000", renterPct: "47%", rent1BR: "$650", rent3BR: "$950" },
  "harrison-township": { medianHHI: "~$45,000", renterPct: "40%", rent1BR: "$850", rent3BR: "$1,500" },
  "huber-heights": { medianHHI: "~$76,000", renterPct: "28%", rent1BR: "$1,200", rent3BR: "$1,875" },
  "kettering": { medianHHI: "~$75,000", renterPct: "35%", rent1BR: "$1,050", rent3BR: "$1,300" },
  "miami-township": { medianHHI: "~$79,000", renterPct: "28%", rent1BR: "$1,250", rent3BR: "$1,500" },
  "miamisburg": { medianHHI: "~$83,000", renterPct: "27%", rent1BR: "$1,250", rent3BR: "$1,500" },
  "oakwood": { medianHHI: "~$159,000", renterPct: "21%", rent1BR: "$975", rent3BR: "$1,450" },
  "piqua": { medianHHI: "~$64,000", renterPct: "36%", rent1BR: "$900", rent3BR: "$1,300" },
  "riverside": { medianHHI: "~$59,000", renterPct: "44%", rent1BR: "$850", rent3BR: "$1,225" },
  "springboro": { medianHHI: "~$120,000", renterPct: "11%", rent1BR: "$1,300", rent3BR: "$1,750" },
  "sugarcreek-township": { medianHHI: "~$175,000", renterPct: "19%", rent1BR: "$1,650", rent3BR: "$2,000" },
  "tipp-city": { medianHHI: "~$85,000", renterPct: "27%", rent1BR: "$1,275", rent3BR: "$2,000" },
  "trotwood": { medianHHI: "~$50,000", renterPct: "42%", rent1BR: "$875", rent3BR: "$1,400" },
  "troy": { medianHHI: "~$69,000", renterPct: "35%", rent1BR: "$1,175", rent3BR: "$1,350" },
  "union": { medianHHI: "~$73,000", renterPct: "19%", rent1BR: "$975", rent3BR: "$1,450" },
  "vandalia": { medianHHI: "~$73,000", renterPct: "36%", rent1BR: "$850", rent3BR: "$1,450" },
  "washington-township": { medianHHI: "~$99,000", renterPct: "33%", rent1BR: "$1,175", rent3BR: "$1,700" },
  "waynesville": { medianHHI: "~$73,000", renterPct: "34%", rent1BR: "$1,350", rent3BR: "$1,850" },
  "west-carrollton": { medianHHI: "~$62,000", renterPct: "44%", rent1BR: "$1,050", rent3BR: "$1,325" },
  "xenia": { medianHHI: "~$56,000", renterPct: "39%", rent1BR: "$900", rent3BR: "$1,200" },
  "yellow-springs": { medianHHI: "~$86,000", renterPct: "36%", rent1BR: "$775", rent3BR: "$975" },
};
