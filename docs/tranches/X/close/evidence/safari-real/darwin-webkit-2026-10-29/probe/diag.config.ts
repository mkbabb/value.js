// SERVED MODEL: claude-opus-5-5 — X.W11.wk diagnostic config (not a gate).
import { defineConfig } from "@playwright/test";
const PORT = 8397;
export default defineConfig({
    testDir: "/Users/mkbabb/Programming/value.js/docs/tranches/X/close/evidence/safari-real/darwin-webkit-2026-10-29/probe",
    testMatch: ["**/*.diag.ts"],
    timeout: 60000,
    workers: 1,
    reporter: "line",
    webServer: {
        command: `npx vite --port ${PORT}`,
        cwd: "/Users/mkbabb/Programming/value.js",
        port: PORT,
        reuseExistingServer: true,
        env: { VITE_API_URL: `http://localhost:${PORT}`, VJS_VITE_CACHE_DIR: `/Users/mkbabb/Programming/value.js/node_modules/.vite-e2e-${PORT}` },
    },
    projects: [
        { name: "chromium", use: { baseURL: `http://localhost:${PORT}`, browserName: "chromium", headless: true, viewport: { width: 1280, height: 720 } } },
        { name: "webkit", use: { baseURL: `http://localhost:${PORT}`, browserName: "webkit", headless: true, viewport: { width: 1280, height: 720 } } },
    ],
});
