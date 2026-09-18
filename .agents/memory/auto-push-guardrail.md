---
name: Auto-push guardrail
description: Why "Sync from Replit" commits appeared on GitHub without user request, and the rule that prevents it.
---

Unrequested "Sync from Replit" commits on ET-Replit came from **task agents** running the repo's push script when finishing tasks — not from cron, mcron, workflows, or a Scheduled Deployment (none exist).

**Why:** replit.md documented the push script as the standard shipping step, so agents ran it autonomously. Every push auto-deploys to production via Vercel.

**How to apply:** replit.md now contains an explicit "NEVER push automatically" guardrail. Only push when the user explicitly asks in chat. If unsolicited sync commits reappear, check whether replit.md's guardrail was removed and whether an active task agent's instructions mention pushing.
