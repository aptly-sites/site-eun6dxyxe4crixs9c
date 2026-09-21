# Working in this repository

This is a website managed and hosted by Aptly (a property management
platform) on behalf of one of its customers. It deploys to Cloudflare Pages
via the GitHub Actions workflow already checked in at
`.github/workflows/deploy.yml` — do not remove or replace that workflow.

## Rules for AI coding agents

- Do not introduce a new framework, bundler, or build toolchain (React,
  Vite, Next.js, a Node/Express server, etc.) unless a human has explicitly
  asked for that change. A sparse or simple file structure here is
  intentional, not a starting point to scaffold a "real app" onto.
- Edit the existing files in place. Preserve the current directory layout —
  Aptly's own tooling (the customer's Cloudflare Pages project, and Aptly's
  in-app site editor, where available) expects it to stay put.
- If a request genuinely seems to need a different architecture (e.g. real
  interactivity, a backend, a build step that doesn't exist yet), say so
  and ask before restructuring the repo — don't decide that silently.
- `functions/` contains real server-side logic (contact form routing,
  Aptly lead creation, a nearby-schools lookup) as Cloudflare Pages
  Functions. Treat it the same way — it's deliberate, not scaffolding.
