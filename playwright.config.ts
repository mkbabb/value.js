import { defineConfig, devices } from "@playwright/test";

/**
 * D.W5 Lane C — 3-project smoke partition.
 *
 *   smoke         — user-view + walk + WebGL + reactivity-instant
 *                   (excludes admin/ and mobile/ subdirs)
 *   smoke-admin   — 5 admin-view specs + admin-walk, via the
 *                   addInitScript admin-auth fixture
 *   smoke-mobile  — Pixel-7 single-spec mobile boot probe
 *
 * `npx playwright test` (no --project flag) runs all three.
 * CI invokes all three via the workflow at .github/workflows/node.js.yml.
 */

export default defineConfig({
    testDir: "./e2e",
    retries: process.env.CI ? 2 : 0,
    timeout: 30000,
    expect: { timeout: 8000 },
    webServer: {
        command: "npx vite --port 8090",
        port: 8090,
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: "smoke",
            testDir: "./e2e/smoke",
            // Carve out the admin and mobile subtrees — they have their own
            // projects with the right fixtures + viewport.
            testIgnore: ["**/admin/**", "**/mobile/**"],
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: "smoke-admin",
            testDir: "./e2e/smoke/admin",
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: "smoke-mobile",
            testDir: "./e2e/smoke/mobile",
            use: {
                ...devices["Pixel 7"],
                baseURL: "http://localhost:8090",
                headless: true,
            },
        },
    ],
});
