// Cloudflare Pages Function — ported from the source repo's
// artifacts/et-website-v1/api/forms/contact.js (Vercel serverless, req/res) to Pages Functions'
// onRequestPost({ request, env }) convention. Forwards to the same EquityTeam "Website Forms"
// Google Apps Script the original did, and also creates an Aptly owner-lead card via the shared
// ../_lib/owner-lead.js logic (same module functions/api/owner-lead.js uses).
import { normalizeLead, createOwnerLead } from '../../_lib/owner-lead.js';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwFBeClCmlNhFrlkPHQRJDYJVqV6krC41AHrXMKjvM4XBoH9bcXHAazP9e1_TmI-Ur1/exec';

const REQUIRED = ['firstName', 'lastName', 'phone', 'email', 'department', 'message'];

// Inquiry-reason → destination mailbox. Keys must match the contact form's <option> text exactly.
// Edit here to change routing (git push, no Apps Script redeploy). The Apps Script allowlists
// these domains before sending.
const ROUTING = {
  'Property owner exploring management services': 'sales@equityteam.com',
  'Commercial property inquiry': 'sales@equityteam.com',
  'HOA board inquiry': 'sales@equityteam.com',
  'Current owner with a question': 'owners@equityteam.com',
  'Current tenant': 'tenants@equityteam.com',
  'Repairs, maintenance, or renovation': 'wo@equityteam.com',
  'Vacation rental guest': 'support@deerfieldvacationrentals.com',
  'Vendor / service provider': 'vendors@equityteam.com',
  'Job applicant': 'hr@equityteam.com',
  Other: 'support@equityteam.com'
};
const DEFAULT_TO = 'support@equityteam.com';
const recent = new Map();

function routeTo(department) {
  return ROUTING[department] || DEFAULT_TO;
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function forwardContactEmail(body) {
  const upstream = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: routeTo(body.department),
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      department: body.department,
      location: body.location || '',
      message: body.message
    }),
    redirect: 'follow'
  });

  const text = await upstream.text();
  let ok = false;
  try {
    ok = upstream.ok && JSON.parse(text).success === true;
  } catch {
    ok = false;
  }
  if (!ok) throw new Error('Email service did not confirm delivery');
}

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

  try {
    const raw = await request.text();
    if (raw.length > 16000) return Response.json({ success: false, error: 'Submission too large' }, { status: 413, headers });
    const body = raw ? JSON.parse(raw) : {};

    if (clean(body.website, 200)) return Response.json({ success: true }, { headers });

    const missing = REQUIRED.filter(k => !body[k] || String(body[k]).trim() === '');
    if (missing.length) {
      return Response.json({ success: false, error: 'Missing fields: ' + missing.join(', ') }, { status: 400, headers });
    }

    const normalizedBody = {
      firstName: clean(body.firstName, 80),
      lastName: clean(body.lastName, 80),
      phone: clean(body.phone, 40),
      email: clean(body.email, 254),
      department: clean(body.department, 160),
      location: clean(body.location, 120),
      message: clean(body.message, 2000),
      pageTitle: clean(body.pageTitle, 200),
      pageUrl: clean(body.pageUrl, 500)
    };
    if (!ROUTING[normalizedBody.department] || !/^[+()\d\s.-]{7,40}$/.test(normalizedBody.phone)) {
      return Response.json(
        { success: false, error: 'Please complete every required field with valid information.' },
        { status: 400, headers }
      );
    }

    const lead = normalizeLead({
      ...normalizedBody,
      formSource: 'Contact Us Inquiry',
      summary: `Reason for contact: ${normalizedBody.department}\nProperty market: ${normalizedBody.location || 'Not provided'}`
    });

    const now = Date.now();
    for (const [key, time] of recent) if (now - time > 60000) recent.delete(key);
    const key = lead.email.toLowerCase();
    if (recent.has(key)) {
      return Response.json({ success: false, error: 'Please wait a minute before submitting again.' }, { status: 429, headers });
    }
    recent.set(key, now);

    await Promise.all([forwardContactEmail(normalizedBody), createOwnerLead(lead, { env })]);
    return Response.json({ success: true }, { headers });
  } catch (err) {
    console.error('Contact submission failed:', err instanceof Error ? err.message : 'Unknown error');
    return Response.json(
      { success: false, error: 'We could not confirm your message. Please call EquityTeam or try again later.' },
      { status: 502, headers }
    );
  }
}
