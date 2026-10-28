// SS8-0576 mutation-run config: the REAL e2e/smoke/views/gradient.spec.ts, unmodified, against the
// mutation proxy (control MUTATE=0 vs mutant MUTATE=1). Headless default shell, one worker.
import { defineConfig } from "@playwright/test";
const PORT = +process.env.PROXY_PORT;
export default defineConfig({
    testDir: "../../../../../../e2e/smoke/views",
    testMatch: /gradient\.spec\.ts$/,
    workers: 1, retries: 0, timeout: 30000, expect: { timeout: 8000 },
    reporter: [["json", { outputFile: `../../evidence/B20-gradient-visualizer-code/mut-${process.env.MUTATE === "1" ? "mutant" : "control"}.json` }], ["line"]],
    outputDir: `/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/b20/pw-${process.env.MUTATE}`,
    webServer: { command: `node mut-proxy.mjs`, port: PORT, reuseExistingServer: false, env: { PROXY_PORT: String(PORT), MUTATE: process.env.MUTATE ?? "0" }, stdout: "pipe" },
    use: { baseURL: `http://localhost:${PORT}`, browserName: "chromium", headless: true, viewport: { width: 1280, height: 720 } },
});
