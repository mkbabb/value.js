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

/**
 * N.W2 (W1.D-closure) — software-WebGL channel + launch args for the Chromium
 * projects. Two coupled findings, both established by live boot probes:
 *
 * 1 · RENDERER STABILITY. The demo mounts two live WebGL2 surfaces (the
 *     goo-blob hero canvas + the aurora atmosphere). Under headless Chromium's
 *     *default* GPU path these crash the renderer a few hundred ms after mount:
 *     the page emits a silent `close` (no console error, no pageerror — a
 *     renderer-process death, not a JS throw), which detaches every locator and
 *     times out every spec downstream of the first assertion. This is why the
 *     prior W1.D run saw "white-screen-shaped" failures everywhere once boot was
 *     otherwise green. `--use-gl=angle --use-angle=swiftshader` routes WebGL2
 *     through ANGLE's SwiftShader software rasteriser — real, conformant WebGL2
 *     (so the context-loss probes still exercise the true code path) but stable
 *     headless. `--enable-unsafe-swiftshader` clears the Chromium 137+
 *     deprecation gate that otherwise refuses swiftshader-for-WebGL.
 *
 * 2 · CLEAN TEARDOWN. Playwright's default `chrome-headless-shell` binary, when
 *     swiftshader is forced, hangs on `browserContext.close()` — the software
 *     GPU process never exits, so teardown eats the full 30s test budget and
 *     fails every test even when the BODY passed (probed: body green + alive 3s,
 *     yet "Tearing down context exceeded the test timeout"). The full Chromium
 *     build (`channel: "chromium"`, new-headless mode) tears the GPU process
 *     down cleanly. So the Chromium projects pin BOTH `channel: "chromium"` and
 *     the swiftshader args (probed: stable AND teardown-clean → pass).
 *
 * The WebKit `smoke-safari` project takes neither (WebKit has its own GL stack
 * and ignores Chromium channel/flags).
 */
const WEBGL_CHANNEL = "chromium" as const;
const SWIFTSHADER_LAUNCH = {
    args: [
        "--use-gl=angle",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
    ],
};

export default defineConfig({
    testDir: "./e2e",
    // R.W2 — DETERMINISM: one worker for the whole suite (was: host default of
    // 2+). The demo mounts live software-GL WebGL2 surfaces (the goo-blob hero
    // + the aurora atmosphere) on EVERY page, all served by a SINGLE vite dev
    // server. Under 2+ parallel workers those concurrent swiftshader contexts
    // plus the dev-server's on-navigation transform bursts thrash the sandboxed
    // CPU, so first-paint / render assertions time out nondeterministically —
    // a DIFFERENT set of specs reddens each run (observed: color-space-switching,
    // admin-walk, palette-feature, color-approve/reject). Serialising removes a
    // harness-induced contention that a real single-browser user never
    // experiences; it masks NO product defect — a genuine defect fails
    // identically at any worker count (cf. the color-space dead-control bug,
    // which reproduced deterministically at workers:1 and was root-fixed, not
    // hidden). This generalises the E.W3 `smoke-reactivity` workers:1 rationale
    // (parallel host-CPU contention corrupts the run) from the one wall-clock
    // project to the whole WebGL-heavy suite. The dev server stays the substrate
    // (the runtime product is byte-identical to what a user drives); the
    // production bundle is separately proven by the hard-gate `gh-pages ✓ built`.
    workers: 1,
    retries: process.env.CI ? 2 : 0,
    timeout: 30000,
    expect: { timeout: 8000 },
    webServer: {
        command: "npx vite --port 8090",
        port: 8090,
        reuseExistingServer: !process.env.CI,
        // inv-K-5 (K.W2b): point the demo's palette-API base at the SAME-ORIGIN
        // dev server so no production `api.color.babb.dev` fetch fires under e2e
        // (that cross-origin request is CORS-refused for localhost and the
        // preflight error trips the `zero console errors` assertion). Same-origin
        // optional reads (`/colors/approved`) fall back to the SPA 200; other
        // reads 404 same-origin (already absorbed by setupEnvNoise). The demo's
        // production default (`api.color.babb.dev`) is unchanged for real builds.
        env: { VITE_API_URL: "http://localhost:8090" },
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
                channel: WEBGL_CHANNEL,
                headless: true,
                viewport: { width: 1280, height: 720 },
                launchOptions: SWIFTSHADER_LAUNCH,
            },
        },
        {
            name: "smoke-admin",
            testDir: "./e2e/smoke/admin",
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                channel: WEBGL_CHANNEL,
                headless: true,
                viewport: { width: 1280, height: 720 },
                launchOptions: SWIFTSHADER_LAUNCH,
            },
        },
        {
            name: "smoke-mobile",
            testDir: "./e2e/smoke/mobile",
            use: {
                ...devices["Pixel 7"],
                baseURL: "http://localhost:8090",
                channel: WEBGL_CHANNEL,
                headless: true,
                launchOptions: SWIFTSHADER_LAUNCH,
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
                channel: WEBGL_CHANNEL,
                headless: true,
                viewport: { width: 1280, height: 720 },
                launchOptions: SWIFTSHADER_LAUNCH,
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
