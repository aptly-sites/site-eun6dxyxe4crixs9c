// Cloudflare Pages Function — ported from the source repo's artifacts/et-website-v1/api/owner-lead.js
// (a Vercel serverless function, Express-style req/res) to the Fetch-API-based
// onRequestPost({ request, env }) convention Pages Functions use. Shared lead-creation logic
// lives in ../_lib/owner-lead.js (imported by this file and functions/api/forms/contact.js).
import { normalizeLead, verifyGoogleAddress, createOwnerLead } from '../_lib/owner-lead.js';

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// Per-isolate, best-effort throttle only — Cloudflare may run multiple isolates for the same
// function concurrently, so this doesn't guarantee a hard global rate limit any more than the
// original Vercel version's identical in-memory Map did there. Real abuse protection should sit
// in front of this at the platform level (e.g. Cloudflare's own rate limiting rules).
const recent = new Map();

export async function onRequestPost({ request, env }) {
  const headers = { 'Cache-Control': 'no-store' };

  const contentType = request.headers.get('content-type') || '';
  if (!/^application\/json(?:;|$)/i.test(contentType)) {
    return Response.json({ success: false, error: 'JSON required' }, { status: 415, headers });
  }

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return Response.json({ success: false, error: 'Invalid origin' }, { status: 403, headers });
      }
    } catch {
      return Response.json({ success: false, error: 'Invalid origin' }, { status: 403, headers });
    }
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ success: false, error: 'Submission too large' }, { status: 413, headers });
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return Response.json({ success: false, error: 'Invalid submission' }, { status: 400, headers });
  }

  if (clean(body?.website, 200)) return Response.json({ success: true }, { headers });

  let lead;
  try {
    lead = await verifyGoogleAddress(normalizeLead(body), { env });
  } catch (error) {
    console.error('Owner lead validation failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json(
      { success: false, error: 'Please complete every required field with valid information.' },
      { status: 400, headers }
    );
  }

  const now = Date.now();
  for (const [key, time] of recent) if (now - time > 60000) recent.delete(key);
  const key = lead.email.toLowerCase();
  if (recent.has(key)) {
    return Response.json({ success: false, error: 'Please wait a minute before submitting again.' }, { status: 429, headers });
  }
  recent.set(key, now);

  try {
    await createOwnerLead(lead, { env });
    return Response.json({ success: true }, { headers });
  } catch (error) {
    console.error('Owner lead submission failed:', error instanceof Error ? error.message : 'Unknown error');
    return Response.json(
      { success: false, error: 'We could not confirm your request. Please contact EquityTeam or try again later.' },
      { status: 502, headers }
    );
  }
}
