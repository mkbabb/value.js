// SERVED MODEL: claude-opus-5-5 — SS-8 B05 CURE: run e2e/smoke/oracles/o33-dock-actionbar-b05.spec.ts
// against the already-served dev app (:9000). No webServer (the repo config would cold-build a perf
// bundle), default headless Chromium shell, one worker. RUN env names the evidence report.
import { defineConfig, devices } from "@playwright/test";
const root = new URL("../../../../../../../", import.meta.url).pathname;
const run = process.env.RUN ?? "o33-run";
export default defineConfig({
    testDir: root + "e2e/smoke/oracles",
    testMatch: /o33-dock-actionbar-b05\.spec\.ts/,
    workers: 1,
    retries: 0,
    timeout: 360000,
    expect: { timeout: 8000 },
    reporter: [["list"], ["json", { outputFile: root + `docs/tranches/X/execution/SS8/evidence/B05-dock-actionbar/${run}.json` }]],
    outputDir: root + "docs/tranches/X/execution/SS8/evidence/B05-dock-actionbar/o33-artifacts",
    use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, baseURL: process.env.ORIGIN ?? "http://localhost:9000" },
});
