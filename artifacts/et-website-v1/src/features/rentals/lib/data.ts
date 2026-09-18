import { getAllListings, getTourSettings, type Listing, type TourSettings } from './aptly';
import { listingIdFromSlug } from './seo';

export type RentalData = { listings: Listing[]; tours: Record<string, TourSettings>; error?: boolean; asOf?: number; path?: string };
export function isRentalPath(path: string) { return /^\/for-rent(?:\/|$)/.test(path.split('?')[0]); }
export async function loadRentalData(path: string): Promise<RentalData | undefined> {
  if (!isRentalPath(path)) return undefined;
  try {
    const listings = await getAllListings();
    const id = listingIdFromSlug(path.split('/').pop() || '');
    const tours: RentalData['tours'] = {};
    if (id && listings.some(listing => listing._id === id)) tours[id] = await getTourSettings(id);
    return { listings, tours, asOf: Date.now(), path };
  } catch { return { listings: [], tours: {}, error: true, path }; }
}
export function serializeRentalData(data?: RentalData) {
  return data ? `<script id="rental-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : '';
}
