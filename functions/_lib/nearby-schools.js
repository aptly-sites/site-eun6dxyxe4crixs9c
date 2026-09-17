// Shared logic behind /api/nearby-schools — ported from the source repo's
// artifacts/et-website-v1/server/nearby-schools.mjs. Falls back to a shared, already-live
// Cloudflare-hosted proxy (another Aptly customer site's own /api/nearby-schools) when no
// GreatSchools API key is configured, so this works with zero setup until a real key is added.
const GREAT_SCHOOLS_URL = 'https://gs-api.greatschools.org/v2/nearby-schools';
const SHARED_PROXY_URL = 'https://site-ydgjrcz9htcv4iav4.pages.dev/api/nearby-schools';

const clean = (value, max = 250) =>
  String(value ?? '')
    .trim()
    .replace(/[\x00-\x1f\x7f]/g, '')
    .slice(0, max);

function normalizeSchools(data) {
  return (Array.isArray(data?.schools) ? data.schools : [])
    .filter(school => Number.isFinite(Number(school.lat)) && Number.isFinite(Number(school.lon)))
    .slice(0, 12)
    .map(school => ({
      name: clean(school.name, 140),
      type: clean(school.type, 30),
      grades: clean(school.level || school.grades || school['level-codes'], 80),
      address: clean(school.address || [school.street, school.city, school.state, school.zip].filter(Boolean).join(', '), 220),
      lat: Number(school.lat),
      lon: Number(school.lon),
      distance: Number(school.distance) || 0,
      ratingBand: clean(school.ratingBand || school.rating_band || school['rating-band'], 40).replace(/^null$/i, ''),
      url: /^https:\/\/www\.greatschools\.org\//.test(String(school.url || school['overview-url'] || ''))
        ? String(school.url || school['overview-url'])
        : ''
    }));
}

export async function getNearbySchools({ lat, lon }, { env, fetchImpl = fetch } = {}) {
  const key = env?.GREAT_SCHOOLS || env?.GREATSCHOOLS_API_KEY;
  const endpoint = new URL(key ? GREAT_SCHOOLS_URL : env?.GREAT_SCHOOLS_PROXY_URL || SHARED_PROXY_URL);
  endpoint.searchParams.set('lat', String(lat));
  endpoint.searchParams.set('lon', String(lon));
  if (key) {
    endpoint.searchParams.set('distance', '10');
    endpoint.searchParams.set('limit', '12');
  }

  const response = await fetchImpl(endpoint, {
    headers: key ? { Accept: 'application/json', 'Content-Type': 'application/json', 'X-API-Key': key } : { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`GreatSchools returned ${response.status}`);
  return normalizeSchools(data);
}
