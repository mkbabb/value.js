// SERVED MODEL: claude-opus-5-5 — X.W7L.v instrument
// The X.W5.c3 / X-W7R.v o12 instrument re-pointed at the product tree on served :9000 (glass 10.1.0):
// headed, real GPU (channel chromium, no swiftshader args), 1280x720, o12 only. The repo's
// playwright.config.ts and the o12 spec are untouched.
import { defineConfig } from "@playwright/test";
const ORIGIN = "http://localhost:9000";
export default defineConfig({
    testDir: "../../../../../e2e/smoke/oracles",
    testMatch: ["**/o12-blob-seat.spec.ts"],
    outputDir: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/o12-out",
    workers: 1,
    retries: 0,
    timeout: 30000,
    expect: { timeout: 8000 },
    webServer: [{ command: "npx vite --port 9000 --strictPort", port: 9000, reuseExistingServer: true }],
    projects: [{
        name: "o12-gpu-headed",
        use: { baseURL: ORIGIN, browserName: "chromium", channel: "chromium", headless: false, viewport: { width: 1280, height: 720 } },
    }],
});
