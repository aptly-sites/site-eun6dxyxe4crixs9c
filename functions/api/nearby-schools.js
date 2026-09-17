// Cloudflare Pages Function — ported from the source repo's
// artifacts/et-website-v1/api/nearby-schools.js (Vercel serverless, req/res) to Pages Functions'
// onRequestGet({ request, env }) convention.
import { getNearbySchools } from '../_lib/nearby-schools.js';

export async function onRequestGet({ request, env }) {
  const headers = { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' };

  const url = new URL(request.url);
  const lat = Number(url.searchParams.get('lat'));
  const lon = Number(url.searchParams.get('lon'));
  if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) {
    return Response.json({ message: 'Invalid listing coordinates.' }, { status: 400, headers });
  }

  try {
    const schools = await getNearbySchools({ lat, lon }, { env });
    return Response.json({ schools }, { headers });
  } catch (error) {
    console.error('GreatSchools request failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ message: 'Nearby school information is temporarily unavailable.' }, { status: 502, headers });
  }
}
