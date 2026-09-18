---
name: GitHub pull workflow
description: How to sync workspace content from GitHub without git fetch/merge (sandbox blocks those ops).
---

## The method
1. `git ls-remote https://$GITHUB_PAT@github.com/EquityTeam/ET-Replit.git refs/heads/main` → get current tip SHA.
2. `curl` the GitHub trees API (recursive=1) for that ref → `/tmp/tree.json` with all blob shas.
3. `git --no-optional-locks ls-files -s` → local index blob shas.
4. Python compare → DIFFER / ONLY_GH / ONLY_LOCAL lists.
5. For each differing/only-gh file: fetch raw bytes via `curl -H "Accept: application/vnd.github.raw" https://api.github.com/repos/EquityTeam/ET-Replit/contents/<path>?ref=<SHA>` then `cp` into workspace.
6. Binary files (PDFs, images): same curl -o, no conversion needed.

**Why:** git fetch is blocked/times out in the sandbox. The blob-hash comparison is fast and exact. Never push/commit to GitHub unless the user explicitly asks.

**How to apply:** Run at the start of every session before any edits.

## Notes
- The only persistent non-diff is `attached_assets/weeee\_…jpg` — filename quoting artifact, same file on both sides, ignore it.
- If DIFFER=0, workspace already matches GitHub; nothing to pull.
- The `weeee` jpg is always flagged as ONLY_GH / ONLY_LOCAL due to git ls-files backslash-quoting vs API literal path — not a real diff.

- attached_assets/ is gitignored and untracked (Aug 2026): skip paths under attached_assets/ when pulling via blob diff, or every remote-only asset re-downloads each pull until removed from the GitHub repo.
