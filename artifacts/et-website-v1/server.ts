import fs from "fs";
import { loadEnv } from "vite";
// Server-only secrets; never expose these through VITE_ variables.
// @ts-expect-error JavaScript serverless handler shared with Vercel.
import ownerLeadHandler from "./server/owner-lead.mjs";
// @ts-expect-error JavaScript serverless handler shared with Vercel.
import nearbySchoolsHandler from "./server/nearby-schools.mjs";
// @ts-expect-error JavaScript serverless handler shared with Vercel.
import contactFormHandler from "./api/forms/contact.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createHttpServer } from "node:http";
import type { RentalData } from "./src/features/rentals/lib/data";
import type { ViteDevServer } from "vite";
import {
  buildPreviewSetCookie,
  checkPageAccess,
  pagesConfig,
  parseCookieHeader,
} from "./src/lib/pagesConfig";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localServerEnv = loadEnv("development", __dirname, "");
for (const key of ["APTLY_API_TOKEN", "APTLY_OWNER_LEADS_BOARD_ID", "APTLY_OWNER_LEADS_STAGE", "APTLY_EMAIL_USER_ID", "APTLY_EMAIL_CHANNEL_ID", "GOOGLE_MAPS_API_KEY", "VITE_GOOGLE_MAPS_API_KEY", "GREAT_SCHOOLS", "GREATSCHOOLS_API_KEY", "GREAT_SCHOOLS_PROXY_URL"]) {
  if (!process.env[key] && localServerEnv[key]) process.env[key] = localServerEnv[key];
}
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT);
const basePath = (process.env.BASE_PATH || "/").replace(/\/$/, "");

const app = express();
const httpServer = createHttpServer(app);
let vite: ViteDevServer | undefined;
app.post("/api/owner-lead", express.json({ limit: "16kb" }), ownerLeadHandler);
app.post("/api/forms/contact", express.json({ limit: "16kb" }), contactFormHandler);
app.get("/api/nearby-schools", nearbySchoolsHandler);

if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    configFile: path.resolve(__dirname, "vite.config.ts"),
    server: { middlewareMode: true, hmr: { server: httpServer } },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  const distPublic = path.resolve(__dirname, "dist/public");
  app.use(basePath, express.static(distPublic, { index: false }));
}

// Health-check bypass: the Replit workflow health probe hits the root/base path.
// Only intercept non-browser requests (probes don't send a Mozilla UA).
// Real browser visits fall through to SSR so the homepage renders normally.
app.get([basePath, `${basePath}/`, "/", ""], (req, res, next) => {
  const ua = req.headers["user-agent"] || "";
  if (ua.includes("Mozilla")) return next();
  res
    .status(200)
    .type("text/html")
    .send(
      "<!DOCTYPE html><html><head><meta charset='utf-8'/></head><body>ok</body></html>"
    );
});

app.use(async (req, res, next) => {
  try {
    const reqUrl = req.originalUrl;
    const pagePath = reqUrl.split("?")[0] || "/";

    /* ── Draft/published gate ───────────────────────────────────────
       Strip the basePath prefix (e.g. "/v1") before lookup so the
       config can use canonical paths like "/hoa-management".
       ──────────────────────────────────────────────────────────── */
    const stripped =
      basePath && pagePath.startsWith(basePath)
        ? pagePath.slice(basePath.length) || "/"
        : pagePath;

    const queryStr = reqUrl.includes("?") ? reqUrl.slice(reqUrl.indexOf("?") + 1) : "";
    const previewQuery = new URLSearchParams(queryStr).get("preview");
    const cookies = parseCookieHeader(req.headers.cookie);
    const cookieValue = cookies[pagesConfig.previewCookieName] ?? null;
    const hostHeader = (req.headers["x-forwarded-host"] as string | undefined) || req.headers.host || "";
    const access = checkPageAccess({
      pathname: stripped,
      hostname: hostHeader.split(":")[0],
      cookieValue,
      previewQuery,
    });

    const setCookieValue = buildPreviewSetCookie(access.cookieAction);
    if (setCookieValue) res.setHeader("Set-Cookie", setCookieValue);

    let template: string;
    let render: (path: string, base: string, data?: RentalData) => { html: string; headHtml: string; dataHtml: string };
    let loadRentalData: (path: string) => Promise<RentalData | undefined>;

    if (!isProduction) {
      template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite!.transformIndexHtml(reqUrl, template);
      const mod = await vite!.ssrLoadModule("/src/entry-server.tsx");
      render = mod.render;
      loadRentalData = mod.loadRentalData;
    } else {
      template = fs.readFileSync(
        path.resolve(__dirname, "dist/public/index.html"),
        "utf-8"
      );
      const { render: renderFn, loadRentalData: loadData } = await import(
        path.resolve(__dirname, "dist/server/entry-server.js")
      );
      render = renderFn;
      loadRentalData = loadData;
    }

    const rentalData = await loadRentalData(stripped);
    const { html: appHtml, headHtml, dataHtml } = render(pagePath, basePath, rentalData);

    // React 19's renderToString injects <link rel="preload"> (and other resource
    // hints) directly into the rendered HTML body.  The client React hoists these
    // to <head> and never puts them in the #root virtual tree, so they cause a
    // hydration mismatch on every page.  Strip them from the body output and
    // inject them into <head> instead so the client can hydrate cleanly.
    const bodyLinkRe = /<link\b[^>]*\/?>/g;
    const hoistedLinks: string[] = [];
    const cleanAppHtml = appHtml.replace(bodyLinkRe, (match: string) => {
      hoistedLinks.push(match);
      return "";
    });
    const hoistedHtml =
      hoistedLinks.length > 0 ? "\n    " + hoistedLinks.join("\n    ") : "";

    // The SSR head owns the page title. Remove the shell fallback first so
    // dynamic responses, like prerendered pages, expose exactly one title.
    const templateWithPageTitle = /<title\b[^>]*>/i.test(headHtml)
      ? template.replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/i, "")
      : template;

    const fullHtml = templateWithPageTitle
      .replace("<!--ssr-head-->", headHtml + hoistedHtml + dataHtml)
      .replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);

    const renderedNotFound = /<meta\s+name="robots"\s+content="noindex, follow"/i.test(headHtml);
    const status = access.allowed && !renderedNotFound ? 200 : 404;
    res
      .status(status)
      .set({
        "Content-Type": "text/html",
        "X-Publish-Status": access.allowed ? "ok" : "blocked",
      })
      .end(fullHtml);
  } catch (err) {
    if (vite) vite.ssrFixStacktrace(err as Error);
    console.error(err);
    next(err);
  }
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`SSR server ready at port ${port}`);
});
