import { defineConfig } from "@playwright/test";

// U.W-A11Y AUTHED (U-F56/BR-9 · U-F58) — an ISOLATED config for the driven-live
// authed a11y battery. Reuses my already-running dev server on :8824 (NEVER
// :9000, NEVER :8090 — the lane-local port seam), NO managed webServer (so
// playwright never runs the slow gh-pages perf build that would wipe the local
// dist shim the cross-lane ADOPT drift requires, nor kill my server on
// teardown). Single worker; the SwiftShader channel matches the smoke project.
export default defineConfig({
    testDir: "/Users/mkbabb/Programming/value.js/e2e/smoke/admin",
    testMatch: ["a11y-authed-admin.spec.ts", "a11y-authed-user.spec.ts"],
    workers: 1,
    timeout: 30000,
    expect: { timeout: 8000 },
    projects: [
        {
            name: "smoke-admin",
            use: {
                baseURL: "http://localhost:8824",
                browserName: "chromium",
                channel: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
                launchOptions: {
                    args: [
                        "--use-gl=angle",
                        "--use-angle=swiftshader",
                        "--enable-unsafe-swiftshader",
                    ],
                },
            },
        },
    ],
});
