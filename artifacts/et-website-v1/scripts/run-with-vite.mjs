/**
 * Runs a TS script through Vite's SSR module loader so it gets a real,
 * Vite-populated `import.meta.env` (BASE_URL, VITE_* vars, etc.) — the same
 * environment the app itself sees at build/runtime. Needed because several
 * data files (blogPosts.ts, cincinnatiCommunities.ts, siteUrl.ts, ...)
 * reference `import.meta.env` directly, which is undefined under plain
 * node/tsx execution.
 *
 * Usage: node scripts/run-with-vite.mjs <relative-path-to-script>
 */
import { createServer } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/run-with-vite.mjs <script-path>");
  process.exit(1);
}

const root = resolve(__dirname, "..");

const server = await createServer({
  root,
  configFile: resolve(root, "vite.config.ts"),
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
  logLevel: "warn",
});

try {
  await server.ssrLoadModule(resolve(root, target));
} finally {
  await server.close();
}
