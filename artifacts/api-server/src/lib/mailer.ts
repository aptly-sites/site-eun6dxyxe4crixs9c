import nodemailer from "nodemailer";
import { logger } from "./logger";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn("SMTP credentials not configured — emails will be logged only");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/* Sender address. With a transactional provider (Resend/SendGrid) SMTP_USER is
   an API-key handle, not an email — so the From comes from its own MAIL_FROM
   var, set to a domain-verified address. */
export const FROM_ADDRESS = process.env.MAIL_FROM ?? "EquityTeam Website <notifications@equityteam.com>";
export const PRIMARY_RECIPIENT = "support@equityteam.com";
export const DEERFIELD_RECIPIENT = "support@deerfieldvacationrentals.com";
export const REFERRAL_CC = "richard.c@equityteam.com";

/**
 * Contact-form routing: vacation-rental inquiries go to Deerfield Vacation
 * Rentals; residential / commercial / HOA / property services (and anything
 * else) go to EquityTeam support.
 */
export function routeContactRecipient(reason: string): string {
  return /vacation/i.test(reason) ? DEERFIELD_RECIPIENT : PRIMARY_RECIPIENT;
}

export async function sendMail(opts: {
  to: string | string[];
  cc?: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; error?: string }> {
  const transport = getTransport();

  if (!transport) {
    logger.info({ subject: opts.subject, to: opts.to }, "Email would have sent (SMTP not configured)");
    return { sent: false, error: "SMTP not configured" };
  }

  try {
    await transport.sendMail({
      from: FROM_ADDRESS,
      to: opts.to,
      cc: opts.cc,
      replyTo: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    });
    logger.info({ subject: opts.subject, to: opts.to }, "Email sent");
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ error: message, subject: opts.subject }, "Email send failed");
    return { sent: false, error: message };
  }
}

/* ─── Email HTML templates ─────────────────────────────── */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function tableRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;font-weight:bold;color:#555;white-space:nowrap;border-bottom:1px solid #eee;width:180px">${label}</td>
    <td style="padding:8px 12px;color:#111;border-bottom:1px solid #eee">${value || "<em style='color:#999'>not provided</em>"}</td>
  </tr>`;
}

function wrapTable(rows: string, title: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-top:4px solid #B4975A">
    <div style="background:#000;padding:24px 32px">
      <h2 style="margin:0;color:#ffffff;font-size:18px;letter-spacing:0.08em;text-transform:uppercase">${title}</h2>
      <p style="margin:4px 0 0;color:#fff;font-size:12px;opacity:0.6">EquityTeam Website Form Submission</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eee">
      <p style="margin:0;font-size:12px;color:#999">Submitted via pm.equityteam.com · Reply to this email to respond to the sender.</p>
    </div>
  </div>
</body></html>`;
}

export function contactEmailHtml(data: {
  firstName: string; lastName: string; phone: string;
  email: string; department: string; location?: string; message: string;
}) {
  const email = escapeHtml(data.email);
  const rows = [
    tableRow("Name", escapeHtml(`${data.firstName} ${data.lastName}`)),
    tableRow("Email", `<a href="mailto:${email}">${email}</a>`),
    tableRow("Phone", escapeHtml(data.phone)),
    tableRow("Reason", escapeHtml(data.department)),
    tableRow("Market", escapeHtml(data.location ?? "")),
    tableRow("Message", escapeHtml(data.message).replace(/\n/g, "<br>")),
  ].join("");
  return wrapTable(rows, `Contact Form — ${escapeHtml(data.department)}`);
}

export function rentalAnalysisEmailHtml(data: {
  firstName: string; phone: string; email: string; address: string;
}) {
  const email = escapeHtml(data.email);
  const rows = [
    tableRow("Name", escapeHtml(data.firstName)),
    tableRow("Email", `<a href="mailto:${email}">${email}</a>`),
    tableRow("Phone", escapeHtml(data.phone)),
    tableRow("Property Address", escapeHtml(data.address)),
  ].join("");
  return wrapTable(rows, "Free Rental Analysis Request");
}

export function referralEmailHtml(data: {
  yourName: string; yourEmail: string; yourPhone: string;
  clientName: string; clientPhone: string; clientEmail: string;
  propertyAddress: string; notes: string;
}) {
  const yourEmail = escapeHtml(data.yourEmail);
  const clientEmail = escapeHtml(data.clientEmail);
  const rows = [
    tableRow("— Referrer —", ""),
    tableRow("Referrer Name", escapeHtml(data.yourName)),
    tableRow("Referrer Email", `<a href="mailto:${yourEmail}">${yourEmail}</a>`),
    tableRow("Referrer Phone", escapeHtml(data.yourPhone)),
    tableRow("— Client —", ""),
    tableRow("Client Name", escapeHtml(data.clientName)),
    tableRow("Client Phone", escapeHtml(data.clientPhone)),
    tableRow("Client Email", data.clientEmail ? `<a href="mailto:${clientEmail}">${clientEmail}</a>` : ""),
    tableRow("Property Address", escapeHtml(data.propertyAddress)),
    tableRow("Notes", data.notes ? escapeHtml(data.notes).replace(/\n/g, "<br>") : ""),
  ].join("");
  return wrapTable(rows, `Realtor Referral — ${escapeHtml(data.clientName)}`);
}
