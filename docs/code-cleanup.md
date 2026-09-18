# Unused-code and WordPress cleanup

Reviewed against commit `41f06c3` in September 2026. Changes remain local until reviewed and committed.

## Removed

- WordPress PHP lint/theme workflows, the disabled Convesio deploy workflow, and the traffic-guard workflow pointing to a missing `agents/traffic-guard.ts`.
- The unregistered Convesio-to-Slack webhook route and the unused Apache `.htaccess` file. Current deployment configuration targets Vercel.
- Old `HomeConcierge`, `Pricing`, `ResidentBenefits`, and `SearchRentals` page implementations. Existing router redirects are preserved.
- Unreferenced UI starter components from the website and prototype gallery, unused `Breadcrumb` and `MultiMarketStrip` components, unused data/helpers, placeholder form hooks, and the superseded `src/main.tsx` entry point.
- React Query, toast, and tooltip providers with no remaining website consumers, plus their unused components. The website's actual contact form still posts to its existing endpoint.
- One-off migration/scraping scripts and their snapshot, hardcoded historical PDF reports, the one-off guarantees push, an obsolete workflow-removal script, and a disabled copy of the old sync script.
- 98 unused direct dependency declarations across the root, website, and prototype gallery manifests. The lockfile was regenerated.
- Linux-only native-package exclusions that prevented normal Mac installation. pnpm is now pinned to 10.34.5, compatible with the workspace's build-script allowlist.
- A checked-in browser test result. Test output directories are now ignored.

139 files were deleted. The README now describes the actual React/Vite project, and Website CI builds/prerenders the application instead of checking nonexistent PHP files. CODEOWNERS retains the existing ownership rules for repository configuration; rules for nonexistent WordPress paths were removed.

## How unused code was identified

Traced static imports, re-exports, literal dynamic imports, and `require()` calls using TypeScript's parser and module resolver. Roots included the actual HTML entry point, client/server entries, server/config/build/test scripts, API entry point, and package exports. Pricing mockups were explicitly treated as dynamically loaded entries. Candidates were also checked against routing, package scripts, CSS imports/plugins, and generation/deployment configuration before deletion.

Independent tools are not assumed unused merely because the website does not import them. The API specification/code generator, generated API library, active backend, prototype gallery, and remaining standalone utilities are retained. Images and content with dynamic references were not bulk-deleted.

Legacy redirects, current pages (including draft pages), publication middleware, migrated blog/location content, Vercel contact endpoint, and current SEO data remain in place. WordPress-related agent reference skills are documentation rather than deployed application code and were left intact.

## Validation

- Fresh frozen-lockfile installation succeeded on Apple Silicon with Node 24 and pinned pnpm, without the preview's earlier temporary native-package workaround.
- Website production build passed and prerendered all 197 routes, both before and after cleanup.
- Compared the same 197 generated pages before/after: visible text, anchor targets, metadata/canonical URLs, image URLs/alt text, and JSON-LD were unchanged.
- API server and prototype gallery builds passed. Their typechecks passed, as did shared library checks.
- Refreshed the live homepage, verified its heading and expandable FAQ, and observed no browser console errors during that check. No contact forms were submitted.
- `git diff --check` passed.

The existing website typecheck still reports the same 36 errors in `src/data/blogPosts.ts`: older `landlord`, `free-analysis`, and `browse-rentals` values do not match the current blog audience/CTA unions. These errors were present before cleanup; the content and types were not altered. The existing hero test suite assumes `/v1` and a Nix-based browser wrapper; it was not run against the `/` local preview.

For these builds, the main client JavaScript decreased from 2,381.75 kB to 2,267.93 kB, and CSS from 174.65 kB to 113.24 kB (uncompressed Vite output). The build still warns about the large client bundle and unset optional analytics configuration.
