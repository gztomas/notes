import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: devices["Desktop Chrome"] }],
  outputDir: "test-results/",
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
};

export default config;
