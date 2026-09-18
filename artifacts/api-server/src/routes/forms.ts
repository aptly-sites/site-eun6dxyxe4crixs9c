import { Router } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, formSubmissionsTable } from "@workspace/db";
import {
  sendMail,
  PRIMARY_RECIPIENT,
  REFERRAL_CC,
  routeContactRecipient,
  contactEmailHtml,
  rentalAnalysisEmailHtml,
  referralEmailHtml,
} from "../lib/mailer";
import { logger } from "../lib/logger";

const router = Router();

function getIp(req: any): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ?? req.ip ?? "";
}

/* ─── Contact Us ─────────────────────────────────────────── */
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  department: z.string().min(1),
  location: z.string().optional().default(""),
  message: z.string().min(10),
});

router.post("/forms/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid form data", details: parsed.error.flatten() });
    return;
  }

  const data = parsed.data;
  const ip = getIp(req);

  const [row] = await db.insert(formSubmissionsTable).values({
    formType: "contact",
    data,
    emailStatus: "pending",
    ipAddress: ip,
  }).returning();

  const emailResult = await sendMail({
    to: routeContactRecipient(data.department),
    replyTo: data.email,
    subject: `Contact Form — ${data.department} — EquityTeam`,
    html: contactEmailHtml(data),
  });

  await db.update(formSubmissionsTable)
    .set({ emailStatus: emailResult.sent ? "sent" : "failed", emailError: emailResult.error ?? null })
    .where(eq(formSubmissionsTable.id, row.id));

  logger.info({ formType: "contact", id: row.id, emailSent: emailResult.sent }, "Contact form submitted");
  res.json({ success: true });
});

/* ─── Free Rental Analysis ───────────────────────────────── */
const rentalSchema = z.object({
  firstName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  consent: z.boolean().refine((v) => v === true),
});

router.post("/forms/rental-analysis", async (req, res) => {
  const parsed = rentalSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid form data", details: parsed.error.flatten() });
    return;
  }

  const data = parsed.data;
  const ip = getIp(req);

  const [row] = await db.insert(formSubmissionsTable).values({
    formType: "rental-analysis",
    data,
    emailStatus: "pending",
    ipAddress: ip,
  }).returning();

  const emailResult = await sendMail({
    to: PRIMARY_RECIPIENT,
    replyTo: data.email,
    subject: "Free Rental Analysis Request — EquityTeam",
    html: rentalAnalysisEmailHtml(data),
  });

  await db.update(formSubmissionsTable)
    .set({ emailStatus: emailResult.sent ? "sent" : "failed", emailError: emailResult.error ?? null })
    .where(eq(formSubmissionsTable.id, row.id));

  logger.info({ formType: "rental-analysis", id: row.id, emailSent: emailResult.sent }, "Rental analysis form submitted");
  res.json({ success: true });
});

/* ─── Realtor Referral ───────────────────────────────────── */
const referralSchema = z.object({
  yourName: z.string().min(2),
  yourEmail: z.string().email(),
  yourPhone: z.string().min(10),
  clientName: z.string().min(2),
  clientPhone: z.string().min(10),
  clientEmail: z.string().email().optional().or(z.literal("")),
  propertyAddress: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

router.post("/forms/referral", async (req, res) => {
  const parsed = referralSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid form data", details: parsed.error.flatten() });
    return;
  }

  const data = parsed.data;
  const ip = getIp(req);

  const [row] = await db.insert(formSubmissionsTable).values({
    formType: "referral",
    data,
    emailStatus: "pending",
    ipAddress: ip,
  }).returning();

  const emailResult = await sendMail({
    to: REFERRAL_CC,
    replyTo: data.yourEmail,
    subject: `Realtor Referral — ${data.clientName} — EquityTeam`,
    html: referralEmailHtml({
      yourName: data.yourName,
      yourEmail: data.yourEmail,
      yourPhone: data.yourPhone,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail ?? "",
      propertyAddress: data.propertyAddress,
      notes: data.notes,
    }),
  });

  await db.update(formSubmissionsTable)
    .set({ emailStatus: emailResult.sent ? "sent" : "failed", emailError: emailResult.error ?? null })
    .where(eq(formSubmissionsTable.id, row.id));

  logger.info({ formType: "referral", id: row.id, emailSent: emailResult.sent }, "Referral form submitted");
  res.json({ success: true });
});

export default router;
