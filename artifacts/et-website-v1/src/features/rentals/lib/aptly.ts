export const APTLY_ORG_ID = "Eun6dxYxe4CRiXS9c";
export const APTLY_BASE = "https://app.getaptly.com/api/portal";
export const EQUITYTEAM_CONTACT_FORM = "https://portal.getaptly.com/form/GyNHGS7HYHrxGj8Fb/new/mGZ2W5As7TkqQSsHr";

export type Money = { amount?: number | null; currency?: string };
export type Address = {
  formattedAddress?: string;
  standardAddress?: string;
  address?: string;
  address2?: string | null;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  geopoint?: [number, number];
};

export type Fee = {
  _id: string;
  title: string;
  type?: "monthly" | "moveIn" | string;
  amount?: Money;
};

export type TourDay = { active?: boolean; slots?: Array<{ startTime: number; endTime: number }> };
export type TourCalendar = {
  tourDurationMin?: number;
  maxTours?: number;
  businessHours?: { timezone?: string };
  multiTimeRanges?: Record<string, TourDay>;
};
export type TourSettings = {
  enabled: boolean;
  calendar?: TourCalendar;
  calendarMode?: string;
  tourType?: string;
};

export const APTLY_WIDGET_URL = `https://portal.getaptly.com/search/${APTLY_ORG_ID}/`;

export type Listing = {
  publishedForRent?: boolean;
  _id: string;
  name?: string;
  marketingName?: string;
  marketingDescription?: string;
  address?: Address;
  beds?: number;
  baths?: number;
  totalArea?: number;
  marketRent?: Money;
  deposit?: Money;
  availableDate?: string | null;
  photo?: string[];
  marketingFiles?: string[];
  unitType?: string;
  buildingType?: string;
  parkingType?: string;
  petsAllowed?: boolean | string;
  petRestrictions?: string[] | string;
  animalPolicy?: string;
  buildingAmenities?: string[];
  unitAmenities?: string[];
  laundryType?: string;
  heatingType?: string;
  coolingType?: string;
  leaseTerm?: number;
  leaseTermUnits?: string;
  applicationUrl?: string;
  videoUrl?: string | null;
  virtualTourUrl?: string | null;
  applicationFee?: string;
  applicationFeeValue?: number | null;
  aptlyListings?: {
    showingEnabled?: boolean;
    contactName?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactFormUrl?: string;
    contactImage?: string;
    representativeFees?: Fee[];
    benefits?: string;
    tourType?: string;
  };
};

type LocationRecord = {
  _id: string;
  name?: string;
  address?: Address;
  bedCount?: number;
  bathCount?: number;
  squareFeet?: number;
  applicationConfig?: {
    marketingName?: string;
    marketingBlurb?: string;
    marketRentValue?: number;
    availableDate?: string | null;
    marketingImages?: string[];
    homeType?: string;
    parkingBlurb?: string;
    petsAllowed?: boolean | string;
  };
  aptlyListings?: Listing["aptlyListings"];
};

function tourUrlFromBlurb(blurb?: string) {
  const urls = blurb?.match(/https?:\/\/[^\s<>"']+/g) || [];
  return urls.find((url) => /matterport|zinspector|showmojo|youtube|youtu\.be|vimeo|tour/i.test(url))?.replace(/[),.;]+$/, "");
}

async function aptlyFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${APTLY_BASE}${path}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Aptly request failed (${response.status})`);
  return response.json() as Promise<T>;
}

async function fetchAllListings(): Promise<Listing[]> {
  const locations = await aptlyFetch<LocationRecord[]>(`/locations/${APTLY_ORG_ID}?available=true`);
  const summaries: Listing[] = locations.map((location) => ({
    _id: location._id,
    name: location.name,
    marketingName: location.applicationConfig?.marketingName,
    marketingDescription: location.applicationConfig?.marketingBlurb,
    address: location.address,
    beds: location.bedCount,
    baths: location.bathCount,
    totalArea: location.squareFeet,
    marketRent: location.applicationConfig?.marketRentValue != null
      ? { amount: location.applicationConfig.marketRentValue, currency: "USD" }
      : undefined,
    availableDate: location.applicationConfig?.availableDate,
    photo: location.applicationConfig?.marketingImages?.slice(0, 1),
    marketingFiles: location.applicationConfig?.marketingImages,
    unitType: location.applicationConfig?.homeType,
    parkingType: location.applicationConfig?.parkingBlurb,
    petsAllowed: location.applicationConfig?.petsAllowed,
    virtualTourUrl: tourUrlFromBlurb(location.applicationConfig?.marketingBlurb),
    aptlyListings: location.aptlyListings,
  }));
  const details: Array<Listing | null> = new Array(summaries.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(6, summaries.length) }, async () => {
    while (next < summaries.length) {
      const index = next++;
      details[index] = await getListing(summaries[index]._id);
    }
  }));
  return summaries.map((summary, index) => {
    const detail = details[index];
    if (!detail) return summary;
    return {
      ...summary,
      publishedForRent: detail.publishedForRent,
      marketingName: detail.marketingName || summary.marketingName,
      marketingDescription: detail.marketingDescription || summary.marketingDescription,
      applicationUrl: detail.applicationUrl,
      address: detail.address || summary.address,
      beds: detail.beds ?? summary.beds,
      baths: detail.baths ?? summary.baths,
      marketRent: detail.marketRent ?? summary.marketRent,
      unitType: detail.unitType || summary.unitType,
      buildingType: detail.buildingType,
      heatingType: detail.heatingType,
      coolingType: detail.coolingType,
      aptlyListings: detail.aptlyListings || summary.aptlyListings,
      availableDate: detail.availableDate ?? summary.availableDate,
      totalArea: (detail.totalArea || summary.totalArea) || undefined,
      marketingFiles: detail.marketingFiles?.length ? detail.marketingFiles : summary.marketingFiles,
      photo: detail.photo?.length ? detail.photo : summary.photo,
      unitAmenities: detail.unitAmenities,
      buildingAmenities: detail.buildingAmenities,
      parkingType: detail.parkingType || summary.parkingType,
      leaseTerm: detail.leaseTerm,
      leaseTermUnits: detail.leaseTermUnits,
      deposit: detail.deposit,
      applicationFee: detail.applicationFee,
      applicationFeeValue: detail.applicationFeeValue,
      laundryType: detail.laundryType,
      petsAllowed: detail.petsAllowed ?? summary.petsAllowed,
      petRestrictions: detail.petRestrictions,
      virtualTourUrl: detail.virtualTourUrl || summary.virtualTourUrl,
      videoUrl: detail.videoUrl,
    };
  }).filter((listing) => listing.publishedForRent !== false);
}

let listingsCache: { expires: number; promise: Promise<Listing[]> } | undefined;
export function getAllListings(): Promise<Listing[]> {
  if (!listingsCache || listingsCache.expires < Date.now()) {
    const promise = fetchAllListings().catch((error) => { listingsCache = undefined; throw error; });
    listingsCache = { expires: Date.now() + 300_000, promise };
  }
  return listingsCache.promise;
}

export async function getListing(id: string): Promise<Listing | null> {
  try {
    return await aptlyFetch<Listing>(`/listing/${encodeURIComponent(id)}`);
  } catch {
    return null;
  }
}

type ShowingContext = {
  aptlyListings?: {
    overrideCalendarEnabled?: boolean;
    overrideCalendar?: TourCalendar;
    defaultCalendar?: TourCalendar;
    overrideTourMode?: boolean;
    tourType?: string;
    overrideCalendarMode?: boolean;
    calendarMode?: string;
  };
  companyInfo?: { aptlyListings?: { tourType?: string; calendarMode?: string } };
};

export async function getTourSettings(id: string): Promise<TourSettings> {
  try {
    const context = await aptlyFetch<ShowingContext>(`/context/${encodeURIComponent(id)}?audience=showing`);
    const listingSettings = context.aptlyListings;
    const companySettings = context.companyInfo?.aptlyListings;
    const calendar = listingSettings?.overrideCalendarEnabled ? listingSettings.overrideCalendar : listingSettings?.defaultCalendar;
    const tourType = listingSettings?.overrideTourMode ? listingSettings.tourType : companySettings?.tourType;
    const calendarMode = listingSettings?.overrideCalendarMode ? listingSettings.calendarMode : companySettings?.calendarMode;
    return { enabled: ["self-tour", "resident"].includes(tourType || "") && calendarMode === "aptly" && !!calendar, calendar, calendarMode, tourType };
  } catch {
    return { enabled: false };
  }
}

export function dollars(value?: number | null) {
  if (value == null) return "Call for pricing";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function isAvailableNow(availableDate?: string | null, asOf = Date.now()) {
  if (!availableDate) return true;
  const match = availableDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const available = match ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2])) : new Date(availableDate);
  if (Number.isNaN(available.valueOf())) return false;
  const today = new Date(asOf);
  today.setHours(0, 0, 0, 0);
  return available <= today;
}

export function applicationUrlFor(listing: Listing) {
  return safeHttpsUrl(listing.applicationUrl) || APTLY_WIDGET_URL;
}

export function leadFormUrlFor(listing: Listing, intent: "tour" | "notify") {
  const base = safeHttpsUrl(listing.aptlyListings?.contactFormUrl) || EQUITYTEAM_CONTACT_FORM;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}listingId=${encodeURIComponent(listing._id)}&intent=${intent}`;
}

export function aptlyListingUrl(listing: Listing) {
  return `https://portal.getaptly.com/search/${APTLY_ORG_ID}/${listing._id}`;
}

export function aptlyShowingUrl(listing: Listing) {
  return `https://portal.getaptly.com/${APTLY_ORG_ID}/showing/app/showing/create/?cId=${encodeURIComponent(listing._id)}`;
}

export function cleanAmenity(value: string) {
  return value.replace(/\s*\([A-Z0-9]+\)\s*$/, "").trim();
}

export function safeHttpsUrl(value?: string | null): string | undefined {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" ? url.href : undefined;
  } catch { return undefined; }
}
