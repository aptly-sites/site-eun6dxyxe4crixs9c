import { defineConfig } from "@playwright/test";

const TEST_PORT = 3100;

export default defineConfig({
  testDir: "./tests",
  timeout: 90_000,
  retries: 0,
  workers: 4,
  reporter: "list",

  use: {
    baseURL: `http://localhost:${TEST_PORT}`,
    viewport: { width: 375, height: 812 },
    screenshot: "only-on-failure",
  },

  webServer: {
    command: `PORT=${TEST_PORT} BASE_PATH=/v1 node --import tsx/esm server.ts`,
    port: TEST_PORT,
    timeout: 60_000,
    reuseExistingServer: true,
    stdout: "pipe",
    stderr: "pipe",
  },
});
