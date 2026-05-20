import { defineConfig, devices } from "@playwright/test";

/**
 * E.W3 Lane B — 5-project smoke partition (extends E.W3 Lane A 4-project
 * partition with a `smoke-safari` WebKit project for iOS-Safari
 * engine-specific bugs — the D-FINAL-named follow-up for D-03 per
 * E-AUDIT-2 §2 / E-AUDIT-4 §3 / `D/coordination/Q.md §11`).
 *
 *   smoke              — user-view + walk + WebGL + flows
 *                        (excludes admin/, mobile/, safari/, and reactivity-instant)
 *   smoke-admin        — 5 admin-view specs + admin-walk + 6 admin-flow
 *                        specs, via the addInitScript admin-auth fixture
 *   smoke-mobile       — Pixel-7 single-spec mobile boot probe (Chromium engine)
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
 *   smoke-safari       — iPhone 14 (WebKit engine) 30s sustained spec.
 *                        Catches the iOS-Safari engine-specific class
 *                        (recursion-guard frame-294 stack-overflow,
 *                        WebGL-on-WebKit shader-compile divergence)
 *                        that Pixel-7 (Chromium) cannot reach.
 *                        E.W4 Lane B wires CI; E.W3 ships local + spec.
 *
 * `npx playwright test` (no --project flag) runs all five.
 * CI invokes all five via the workflow at .github/workflows/node.js.yml
 * once E.W4 Lane B lands the `npx playwright install webkit` step.
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
            // Carve out the admin, mobile, safari, and reactivity subtrees —
            // each has its own project with the right fixtures, engine,
            // viewport, or worker policy.
            testIgnore: [
                "**/admin/**",
                "**/mobile/**",
                "**/safari/**",
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
        {
            // E.W3 Lane B — iPhone 14 WebKit engine project. Catches
            // iOS-Safari class bugs (e.g. ValueUnit-nesting frame-294
            // stack-overflow, WebGL-on-WebKit shader-compile divergence)
            // that Pixel-7 (Chromium) cannot reach. Per the wave spec
            // (E.W3.md §"Lane B") + D-FINAL named-destination
            // (`D/coordination/Q.md §11`).
            //
            // The Playwright iPhone 14 device descriptor pins
            // `defaultBrowserType: "webkit"` — no separate browserName
            // override needed. WebKit binary install is a CI-side
            // requirement that E.W4 Lane B addresses (npx playwright
            // install webkit).
            name: "smoke-safari",
            testDir: "./e2e/smoke/safari",
            use: {
                ...devices["iPhone 14"],
                baseURL: "http://localhost:8090",
                headless: true,
            },
        },
    ],
});
