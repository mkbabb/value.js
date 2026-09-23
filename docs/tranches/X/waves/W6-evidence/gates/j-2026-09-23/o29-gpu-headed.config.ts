// SERVED MODEL: claude-opus-5-5[1m]
// X-W6 · X.W6.j — the REAL-GPU cell for o29's j3 (the atmosphere's WebGL2
// substrate). The repo's `smoke`/`oracles-*` projects launch with
// `--use-angle=swiftshader`, under which the atmosphere takes glass's `"css"`
// substrate and no WebGL context exists to lose; this cell is D1-of-record's
// launch shape (X-W5 `scene-swap-budget.mjs:140`: headed, no swiftshader args).
// It serves nothing itself: point it at a running `npx vite --port <p>` with
// `VITE_API_URL` set to the same origin.
//   VJS_E2E_PORT=<p> npx playwright test -c docs/tranches/X/waves/W6-evidence/gates/j-2026-09-23/o29-gpu-headed.config.ts --reporter=line
import { defineConfig } from "@playwright/test";

const PORT = Number(process.env.VJS_E2E_PORT ?? 8090);

export default defineConfig({
    testDir: "../../../../../../../e2e/smoke/oracles",
    testMatch: ["o29-scene-contracts.spec.ts"],
    grep: /preview survives/,
    workers: 1,
    retries: 0,
    timeout: 90_000,
    expect: { timeout: 8000 },
    outputDir: "../../../../../../../test-results/o29-gpu-headed",
    use: {
        baseURL: `http://localhost:${PORT}`,
        browserName: "chromium",
        channel: "chromium",
        headless: false,
        viewport: { width: 1440, height: 900 },
    },
});
