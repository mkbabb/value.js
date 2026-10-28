// SERVED MODEL: claude-opus-5-5 — SS-8 B05 ABT L-2: run the o15 oracle file UNCHANGED against the
// already-served dev app (:9000). No webServer (the repo config would cold-build a perf bundle),
// default headless Chromium shell, one worker. Output lands in the B05 evidence dir.
import { defineConfig, devices } from "@playwright/test";
const root = new URL("../../../../../../../", import.meta.url).pathname;
export default defineConfig({
    testDir: root + "e2e/smoke/oracles",
    testMatch: /o15-dock-register\.spec\.ts/,
    workers: 1,
    retries: 0,
    timeout: 60000,
    expect: { timeout: 8000 },
    reporter: [["list"], ["json", { outputFile: root + "docs/tranches/X/execution/SS8/evidence/B05-dock-actionbar/o15-run.json" }]],
    outputDir: root + "docs/tranches/X/execution/SS8/evidence/B05-dock-actionbar/o15-artifacts",
    use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, baseURL: "http://localhost:9000" },
});
