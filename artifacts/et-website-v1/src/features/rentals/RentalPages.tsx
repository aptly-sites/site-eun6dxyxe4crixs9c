import { useParams } from 'wouter';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { SITE_URL } from '@/lib/siteUrl';
import { ListingDetailPage } from './components/ListingDetailPage';
import { RentalSearch, RentalStatus } from './RentalSearch';
import { useRentalData } from './RentalData';
import { listingIdFromSlug, slugify } from './lib/seo';

export function RentalDetailPage() {
  const { state, city, zip, slug } = useParams();
  const path = `/for-rent/${state}/${city}/${zip}/${slug}`;
  const { data, loading } = useRentalData(path);
  const id = listingIdFromSlug(slug || '');
  const listing = data?.listings.find(item => item._id === id);
  const nearby = data?.listings.filter(item => item._id !== id).sort((a, b) => Number(b.address?.city === listing?.address?.city) - Number(a.address?.city === listing?.address?.city)).slice(0, 3) || [];
  return <PageLayout>
    {loading || data?.error ? <div className="et-rentals rental-detail-loading"><RentalStatus error={data?.error} label="Loading home details…" /></div> : listing ? <ListingDetailPage listing={listing} nearbyListings={nearby} tourSettings={data?.tours[id] || { enabled: false }} origin={SITE_URL} /> : <div className="et-rentals"><SEO title="Rental no longer available | EquityTeam" canonical={path} /><div className="rental-status"><h1>This rental is no longer listed.</h1><p>Explore the homes that are currently available.</p><a href="/for-rent">Browse available homes</a></div></div>}
  </PageLayout>;
}
export function RentalCityPage() {
  const { state = '', city = '' } = useParams();
  const { data } = useRentalData('/for-rent');
  const sample = data?.listings.find(item => slugify(item.address?.city || '') === city && slugify(item.address?.stateCode || '') === state);
  const name = sample?.address?.city || city.replaceAll('-', ' ');
  return <PageLayout>
    <SEO title={`Homes for Rent in ${name}, ${state.toUpperCase()} | EquityTeam`} canonical={`/for-rent/${state}/${city}`} description={`Browse available EquityTeam homes in ${name}. Compare properties, view photos, and schedule a tour.`} />
    <section className="bg-primary pt-28 pb-12 md:pt-40 px-5"><div className="max-w-screen-xl mx-auto"><a href="/for-rent" className="text-secondary">← All available homes</a><h1 className="text-white text-4xl md:text-6xl mt-6">Homes for Rent in {name}, {state.toUpperCase()}</h1></div></section>
    <RentalSearch state={state} city={city} />
  </PageLayout>;
}
