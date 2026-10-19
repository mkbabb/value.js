// SERVED MODEL: claude-opus-5-5
// X.W12U.q — config for the one instrument spec in this directory (alpha-31).
// The real-GPU cell of e2e/smoke/perf/real-gpu.ts (COHESION §0ei): installed
// Google Chrome, new headless, ANGLE Metal. No retries. One worker.
import { defineConfig } from "@playwright/test";
import { REAL_GPU_ARGS } from "../../../../../../e2e/smoke/perf/real-gpu";

export default defineConfig({
    testDir: ".",
    testMatch: ["alpha-31.spec.ts"],
    workers: 1,
    retries: 0,
    timeout: 30 * 60_000,
    reporter: "list",
    use: {
        baseURL: process.env.Q_ORIGIN ?? "http://localhost:9141",
        browserName: "chromium",
        channel: "chrome",
        headless: true,
        viewport: { width: 1440, height: 900 },
        launchOptions: { args: REAL_GPU_ARGS },
    },
});
