// SERVED MODEL: claude-opus-5-5
// SS-8 B07 cure witness: runs ONLY e2e/smoke/ss8-b07-pane-shell.spec.ts against an
// ALREADY-RUNNING dev server at B07_ORIGIN (no webServer: the suite config's perf
// server would build dist/gh-pages). Same engine/launch args as the `smoke` project.
// Before-arm: B07_ORIGIN=a vite served from a HEAD worktree; after-arm: :8090 (working tree).
import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "../../../../../../../e2e/smoke",
    testMatch: ["ss8-b07-pane-shell.spec.ts"],
    workers: 1,
    retries: 0,
    reporter: "list",
    timeout: 30000,
    expect: { timeout: 8000 },
    use: {
        baseURL: process.env.B07_ORIGIN ?? "http://localhost:8090",
        browserName: "chromium",
        headless: true,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
            args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
        },
    },
});
