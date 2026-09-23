// SERVED MODEL: claude-opus-5-5 — X.W7R.v instrument (run from the scratch iso tree)
// X.W7R.v — the X.W5.c3 instrument re-pointed at the iso tree (glass 10.0.1) (COHESION §0ay): o12 read HEADED on the real GPU,
// exactly as D1 of record launches (headless:false, no swiftshader args). Scratch config:
// the repo's playwright.config.ts and the o12 spec are untouched.
import { defineConfig } from "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/iso/node_modules/@playwright/test/index.mjs";
const PORT = Number(process.env.VJS_E2E_PORT ?? 5297);
const ORIGIN = `http://localhost:${PORT}`;
export default defineConfig({
    testDir: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/iso/e2e/smoke/oracles",
    testMatch: ["**/o12-blob-seat.spec.ts"],
    workers: 1,
    retries: 0,
    timeout: 30000,
    expect: { timeout: 8000 },
    webServer: [{
        command: `npx vite --port ${PORT}`,
        cwd: "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/iso",
        port: PORT,
        reuseExistingServer: false,
        env: { VITE_API_URL: ORIGIN },
    }],
    projects: [{
        name: "o12-gpu-headed",
        use: {
            baseURL: ORIGIN,
            browserName: "chromium",
            channel: "chromium",
            headless: false,
            viewport: { width: 1280, height: 720 },
        },
    }],
});
