import { ListingsExplorer } from './components/ListingsExplorer';
import { APTLY_WIDGET_URL } from './lib/aptly';
import { useRentalData } from './RentalData';
import { cityPath, slugify } from './lib/seo';
import './rentals.css';

const LOADER_LOGO = `${import.meta.env.BASE_URL}images/logo/equityteam-loader.png`;

export function RentalStatus({ error = false, label = 'Loading available homes…' }: { error?: boolean; label?: string }) {
  if (!error) return <div className="rental-loader" role="status" aria-live="polite" aria-label={label}>
    <div className="rental-loader-inner">
      <div className="rental-loader-mark" aria-hidden="true">
        <span className="rental-loader-ring" />
        <img src={LOADER_LOGO} width="96" height="92" alt="" decoding="async" fetchPriority="high" />
      </div>
      <p>{label}</p>
      <span className="rental-loader-dots" aria-hidden="true"><i /><i /><i /></span>
    </div>
  </div>;

  return <div className="rental-status" role="alert">
    <p>We couldn’t load the available homes right now.</p>
    <a href={APTLY_WIDGET_URL} target="_blank" rel="noreferrer">Browse homes on the EquityTeam rental portal</a>
  </div>;
}
export function RentalSearch({ state, city }: { state?: string; city?: string }) {
  const { data, loading } = useRentalData('/for-rent');
  const listings = (data?.listings || []).filter(item => !city || (slugify(item.address?.city || '') === city && slugify(item.address?.stateCode || '') === state));
  const cities = [...new Map((data?.listings || []).map(item => [cityPath(item), item.address?.city])).entries()];
  return <div className="et-rentals" id="listings">
    {loading || data?.error ? <RentalStatus error={data?.error} /> : <>
      {listings.length ? <ListingsExplorer listings={listings} asOf={data?.asOf} /> : <div className="rental-status" role="status"><h2>No homes are currently listed{city ? ' in this city' : ''}.</h2><a href={APTLY_WIDGET_URL} target="_blank" rel="noreferrer">Check the EquityTeam rental portal</a></div>}
      {!!cities.length && <section className="market-links"><div className="shell"><h2>Browse rentals by city</h2><div className="market-grid">{cities.map(([path, name]) => <a key={path} href={path}>Homes for rent in <strong>{name}</strong></a>)}</div></div></section>}
    </>}
  </div>;
}
