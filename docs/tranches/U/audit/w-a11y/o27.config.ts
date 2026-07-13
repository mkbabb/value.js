import { defineConfig } from "@playwright/test";

// U.W-A11Y — an ISOLATED oracle config for o27: reuse my already-running dev
// server on :8800 (NEVER :9000), NO managed webServer (so playwright never runs
// the slow gh-pages perf build that rebuilds/wipes the local dist shim the
// cross-lane ADOPT drift requires, nor kills my server on teardown). Single
// worker; the SwiftShader channel matches the smoke project.
export default defineConfig({
    testDir: "/Users/mkbabb/Programming/value.js/e2e/smoke/oracles",
    testMatch: ["o27-focus-affordance.spec.ts"],
    workers: 1,
    timeout: 30000,
    expect: { timeout: 8000 },
    projects: [
        {
            name: "smoke",
            use: {
                baseURL: "http://localhost:8800",
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
