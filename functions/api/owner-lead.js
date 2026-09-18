// Ported from the original Vercel serverless function (artifacts/et-website-v1/api/owner-lead.js
// + server/owner-lead.mjs) as part of converting this site to a static Cloudflare Pages deploy.
// Business logic lives in ../_lib/owner-lead.js, unchanged from the original - only the handler
// shape changes: Vercel's (req, res) -> Cloudflare's onRequestPost({ request, env }). Cloudflare
// Pages Functions route by filename, so the POST-only check the original did manually is implicit
// here (a GET to this path 405s automatically; there is no onRequestGet export).
import { normalizeLead, verifyGoogleAddress, createOwnerLead } from '../_lib/owner-lead.js';

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// Short per-instance throttle, same as the original - deploy behind Cloudflare's own rate
// limiting too. A Pages Function's isolate isn't guaranteed to stay warm across requests, so
// this Map is best-effort, not a hard guarantee, same caveat the original code called out.
const recent = new Map();

export async function onRequestPost({ request, env }) {
  const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json' };

  const contentType = request.headers.get('content-type') || '';
  if (!/^application\/json(?:;|$)/i.test(contentType)) {
    return new Response(JSON.stringify({ success: false, error: 'JSON required' }), { status: 415, headers });
  }
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid origin' }), { status: 403, headers });
      }
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid origin' }), { status: 403, headers });
    }
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 16000) {
      return new Response(JSON.stringify({ success: false, error: 'Submission too large' }), { status: 413, headers });
    }
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid submission' }), { status: 400, headers });
  }
  if (clean(body?.website, 200)) return new Response(JSON.stringify({ success: true }), { status: 200, headers });

  let lead;
  try {
    lead = await verifyGoogleAddress(normalizeLead(body), { env });
  } catch (error) {
    console.error('Owner lead validation failed:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ success: false, error: 'Please complete every required field with valid information.' }),
      { status: 400, headers }
    );
  }

  const now = Date.now();
  for (const [key, time] of recent) if (now - time > 60000) recent.delete(key);
  const key = lead.email.toLowerCase();
  if (recent.has(key)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Please wait a minute before submitting again.' }),
      { status: 429, headers }
    );
  }
  recent.set(key, now);

  try {
    await createOwnerLead(lead, { env });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
  } catch (error) {
    console.error('Owner lead submission failed:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ success: false, error: 'We could not confirm your request. Please contact EquityTeam or try again later.' }),
      { status: 502, headers }
    );
  }
}
