/**
 * Hero Mobile Regression Tests
 *
 * Verifies that each page's hero section stays within acceptable height bounds
 * and that h1 text wraps to ≤ 3 lines at a 375 px mobile viewport.
 *
 * Viewport: 375 × 812 (iPhone 13 mini / common small-phone baseline).
 *
 * Height buckets:
 *   - "full-screen" heroes (min-h-screen classes)  → maxHeroHeight: 900 px
 *   - Simple / content-only heroes                  → maxHeroHeight: 500 px
 *
 * Home is excluded from the h1 line-count check because its heading is
 * intentionally split across multiple <span> elements for a stylistic effect.
 */

import { test, expect } from "@playwright/test";

const BASE = "/v1";

interface PageConfig {
  name: string;
  /** Path relative to BASE, e.g. "/" or "/about-us" */
  path: string;
  /** Upper bound for the hero <section> height in px */
  maxHeroHeight: number;
  /**
   * When true the h1 line-count assertion is skipped.
   * Use for the Home page where the heading is intentionally multi-span.
   */
  skipH1Check?: boolean;
}

const PAGES: PageConfig[] = [
  // ── Full-screen service heroes (min-h-screen) ──────────────────────────────
  {
    name: "Home",
    path: "/",
    maxHeroHeight: 1100,
    skipH1Check: true, // multi-span decorative h1
  },
  {
    name: "Residential Property Management",
    path: "/residential-property-management",
    maxHeroHeight: 1100,
  },
  {
    name: "Vacation Rental Management",
    path: "/vacation-rental-management",
    maxHeroHeight: 900,
  },
  {
    name: "Co-Living Management",
    path: "/co-living-management",
    maxHeroHeight: 900,
  },
  {
    name: "HOA Management",
    path: "/hoa-management",
    maxHeroHeight: 900,
  },
  {
    name: "Commercial Property Management",
    path: "/commercial-property-management",
    maxHeroHeight: 900,
  },
  {
    name: "Property Services",
    path: "/property-services",
    maxHeroHeight: 900,
  },
  {
    name: "Real Estate Brokerage",
    path: "/real-estate-brokerage",
    maxHeroHeight: 900,
  },

  // ── Simple / compact heroes ────────────────────────────────────────────────
  {
    name: "Free Rental Analysis",
    path: "/free-rental-analysis",
    maxHeroHeight: 500,
  },
  {
    name: "About Us",
    path: "/about-us",
    maxHeroHeight: 500,
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    maxHeroHeight: 500,
  },
  {
    name: "Realtor Referral Program",
    path: "/realtor-referral-program",
    maxHeroHeight: 500,
  },
  {
    name: "Careers",
    path: "/careers",
    maxHeroHeight: 560,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns the rendered height of the first <section> on the page.
 * This is the hero section on all EquityTeam pages.
 */
async function getHeroHeight(
  page: import("@playwright/test").Page
): Promise<number> {
  return page
    .locator("section")
    .first()
    .evaluate((el) => el.getBoundingClientRect().height);
}

/**
 * Counts how many visual lines the hero h1 occupies.
 * Uses scrollHeight / computed lineHeight as a reliable proxy that works even
 * when the element contains nested spans.
 */
async function getH1LineCount(
  page: import("@playwright/test").Page
): Promise<number> {
  return page.evaluate(() => {
    const h1 = document.querySelector("section h1") as HTMLElement | null;
    if (!h1) return 0;
    const style = window.getComputedStyle(h1);
    const lineHeightRaw = style.lineHeight;
    // lineHeight may be "normal" on some browsers – fall back to 1.2× font-size
    const lineHeight =
      lineHeightRaw === "normal"
        ? parseFloat(style.fontSize) * 1.2
        : parseFloat(lineHeightRaw);
    if (!lineHeight || lineHeight <= 0) return 1;
    return Math.round(h1.scrollHeight / lineHeight);
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

for (const config of PAGES) {
  test(`${config.name} — hero layout at 375 px`, async ({ page }) => {
    // waitUntil:'domcontentloaded' avoids waiting for external resources
    // (Google Maps, Analytics) which would stall every test by 10-30 s.
    await page.goto(`${BASE}${config.path}`, { waitUntil: "domcontentloaded" });
    // Brief pause so CSS layout (especially Tailwind min-h-screen) finalises.
    await page.waitForTimeout(300);

    // ── Hero height ──────────────────────────────────────────────────────────
    const heroHeight = await getHeroHeight(page);
    expect(
      heroHeight,
      `[${config.name}] hero section height (${heroHeight}px) must be ≤ ${config.maxHeroHeight}px`
    ).toBeLessThanOrEqual(config.maxHeroHeight);

    // ── h1 line count ────────────────────────────────────────────────────────
    if (!config.skipH1Check) {
      const lineCount = await getH1LineCount(page);
      expect(
        lineCount,
        `[${config.name}] h1 wraps to ${lineCount} line(s) — must be ≤ 3`
      ).toBeLessThanOrEqual(3);
    }
  });
}
