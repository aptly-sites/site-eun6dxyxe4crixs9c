---
name: GitHub push workflow (ET-Website)
description: How code reaches the EquityTeam production site, and why new files can silently fail to deploy.
---

# Deploy path
Code ships to GitHub `EquityTeam/ET-Website` main via `SKIP_BUILD=1 node scripts/push-to-github.mjs`; Vercel auto-deploys main to `pm.equityteam.com`. The push uses the GitHub API, not `git push`.

# Lesson: a successful push does not guarantee a successful deploy
The pusher only sends files git considers part of the project; a freshly created file that was never staged can be left behind while the files that import it go up — which compiles locally but breaks the Vercel build. Git write operations (add/commit) are blocked in this environment, so you cannot rely on staging to make a new file "real."

**Why:** this actually happened — a new shared module deployed broken because only its importers were pushed.

**How to apply:** after creating any new file that production depends on, verify it is actually present on the remote (e.g. inspect the remote git tree) before considering the deploy done. Do not trust the push summary's file count alone.
