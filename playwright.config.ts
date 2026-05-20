import { defineConfig, devices } from "@playwright/test";

/**
 * E.W3 Lane A — 4-project smoke partition (extends D.W5 Lane C 3-project
 * partition with a dedicated `smoke-reactivity` project for the
 * wall-clock-measurement spec).
 *
 *   smoke              — user-view + walk + WebGL + flows
 *                        (excludes admin/, mobile/, and reactivity-instant)
 *   smoke-admin        — 5 admin-view specs + admin-walk + 6 admin-flow
 *                        specs, via the addInitScript admin-auth fixture
 *   smoke-mobile       — Pixel-7 single-spec mobile boot probe
 *   smoke-reactivity   — wall-clock reactivity measurement;
 *                        WORKERS:1 ENFORCED at project level so the
 *                        wall-clock medians are isolated from other-spec
 *                        CPU contention (E.W3 Lane A flake fix per
 *                        E-AUDIT-6 §10 top-N #6: "principled fix is its
 *                        own playwright project with workers:1"). The
 *                        2-worker default for the rest of `smoke` was
 *                        inflating the slider-keyboard subtest's median
 *                        from 31.20ms (solo) to 54.30ms (over the 50ms
 *                        threshold) under parallel-worker host-CPU
 *                        contention.
 *
 * `npx playwright test` (no --project flag) runs all four.
 * CI invokes all four via the workflow at .github/workflows/node.js.yml.
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
            // Carve out the admin, mobile, and reactivity subtrees — each
            // has its own project with the right fixtures, viewport, or
            // worker policy.
            testIgnore: [
                "**/admin/**",
                "**/mobile/**",
                "**/reactivity-instant.spec.ts",
            ],
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
        {
            // E.W3 Lane A — dedicated wall-clock-reactivity project.
            // workers:1 is ENFORCED here (vs. the host default of 2+ for
            // smoke); the spec measures absolute wall-clock deltas, so
            // any sibling spec consuming host CPU shifts the measurement
            // floor by 20–30ms. Per the audit's 5-worker matrix:
            // workers=1 → median 7ms+31ms (both subtests).
            // workers=2 → median 7ms+54ms (slider-keyboard over 50ms).
            name: "smoke-reactivity",
            testDir: "./e2e/smoke",
            testMatch: ["**/reactivity-instant.spec.ts"],
            workers: 1,
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
            },
        },
    ],
});
