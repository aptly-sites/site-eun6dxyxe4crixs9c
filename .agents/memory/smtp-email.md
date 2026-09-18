---
name: SMTP email delivery
description: Gmail SMTP requirements for the contact/rental/referral form emails.
---

`SMTP_PASS` must be a Gmail **App Password** (16 chars, requires 2FA on the account), not the regular account password — Gmail rejects normal passwords for SMTP (535/534 errors).

**Why:** Contact form emails silently failed until an app password was set (July 27, 2026). Failed sends are still recorded in the DB with `emailStatus: failed`, so leads aren't lost.

**How to apply:** If form emails fail with 535/534 auth errors, have the user regenerate an app password and update the `SMTP_PASS` secret, then restart the API server. Remember production needs the same secrets.
