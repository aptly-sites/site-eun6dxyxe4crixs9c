import { createOwnerLead, normalizeLead } from "../../server/owner-lead.mjs";

// Vercel serverless function for the website contact form.
// Receives the browser POST (same-origin /api/forms/contact) and forwards it,
// server-side, to the EquityTeam "Website Forms" Google Apps Script, which
// emails support@ (or Deerfield for vacation inquiries) using Google natively.
// The Apps Script URL stays server-side and is never exposed to the browser.

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFBeClCmlNhFrlkPHQRJDYJVqV6krC41AHrXMKjvM4XBoH9bcXHAazP9e1_TmI-Ur1/exec";

const REQUIRED = ["firstName", "lastName", "phone", "email", "department", "message"];

// Inquiry-reason → destination mailbox. Keys must match the contact form's
// <option> text exactly. Edit here to change routing (git push, no Apps Script
// redeploy). The Apps Script allowlists these domains before sending.
const ROUTING = {
  "Property owner exploring management services": "sales@equityteam.com",
  "Commercial property inquiry": "sales@equityteam.com",
  "HOA board inquiry": "sales@equityteam.com",
  "Current owner with a question": "owners@equityteam.com",
  "Current tenant": "tenants@equityteam.com",
  "Repairs, maintenance, or renovation": "wo@equityteam.com",
  "Vacation rental guest": "support@deerfieldvacationrentals.com",
  "Vendor / service provider": "vendors@equityteam.com",
  "Job applicant": "hr@equityteam.com",
  "Other": "support@equityteam.com",
};
const DEFAULT_TO = "support@equityteam.com";
const recent = new Map();

function routeTo(department) {
  return ROUTING[department] || DEFAULT_TO;
}

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function forwardContactEmail(body) {
  const upstream = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: routeTo(body.department),
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      department: body.department,
      location: body.location || "",
      message: body.message,
    }),
    redirect: "follow",
  });

  const text = await upstream.text();
  let ok = false;
  try {
    ok = upstream.ok && JSON.parse(text).success === true;
  } catch (_) {
    ok = false;
  }
  if (!ok) throw new Error("Email service did not confirm delivery");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "no-store");
  if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || "")) {
    return res.status(415).json({ success: false, error: "JSON required" });
  }
  if (req.headers.origin) {
    try {
      if (new URL(req.headers.origin).host !== req.headers.host) {
        return res.status(403).json({ success: false, error: "Invalid origin" });
      }
    } catch (_) {
      return res.status(403).json({ success: false, error: "Invalid origin" });
    }
  }

  try {
    // Resolve the JSON body across Vercel's parsing variations.
    let body = req.body;
    if (body === undefined || body === null) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString("utf8");
      body = raw ? JSON.parse(raw) : {};
    } else if (typeof body === "string") {
      body = body ? JSON.parse(body) : {};
    }

    if (JSON.stringify(body || {}).length > 16000) {
      return res.status(413).json({ success: false, error: "Submission too large" });
    }
    if (clean(body.website, 200)) return res.status(200).json({ success: true });

    const missing = REQUIRED.filter(
      (k) => !body[k] || String(body[k]).trim() === "",
    );
    if (missing.length) {
      return res
        .status(400)
        .json({ success: false, error: "Missing fields: " + missing.join(", ") });
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
      pageUrl: clean(body.pageUrl, 500),
    };
    if (!ROUTING[normalizedBody.department] || !/^[+()\d\s.-]{7,40}$/.test(normalizedBody.phone)) {
      return res.status(400).json({ success: false, error: "Please complete every required field with valid information." });
    }

    const lead = normalizeLead({
      ...normalizedBody,
      formSource: "Contact Us Inquiry",
      summary: `Reason for contact: ${normalizedBody.department}\nProperty market: ${normalizedBody.location || "Not provided"}`,
    });

    const now = Date.now();
    for (const [key, time] of recent) if (now - time > 60000) recent.delete(key);
    const key = lead.email.toLowerCase();
    if (recent.has(key)) {
      return res.status(429).json({ success: false, error: "Please wait a minute before submitting again." });
    }
    recent.set(key, now);

    await Promise.all([forwardContactEmail(normalizedBody), createOwnerLead(lead)]);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact submission failed:", err instanceof Error ? err.message : "Unknown error");
    return res.status(502).json({ success: false, error: "We could not confirm your message. Please call EquityTeam or try again later." });
  }
}
