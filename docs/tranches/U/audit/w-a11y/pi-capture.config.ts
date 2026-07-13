import { defineConfig } from "@playwright/test";

// U.W-A11Y — the ISOLATED π-frame capture config (NOT wired into CI). Reuses my
// already-running dev server on :8824 (NEVER :9000), NO managed webServer.
// Single worker; SwiftShader channel matches the smoke project so the composited
// surface is byte-identical to the born-RED battery's.
export default defineConfig({
    testDir: "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-a11y",
    testMatch: ["pi-capture.spec.ts"],
    workers: 1,
    timeout: 30000,
    expect: { timeout: 8000 },
    projects: [
        {
            name: "pi-capture",
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
