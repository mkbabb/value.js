// SERVED MODEL: claude-opus-5-5 · SS-8 B24 — the shared :9000 dev server wedged (page.goto 150 s timeouts, 2026-10-20
// 15:05); this runner serves the SAME tree with the repo's own dev config (the e2e webServer command, own deps
// cache) on :8124, imports each named probe module in turn (each = ONE browser, closed in its own finally), and
// stops vite in finally. Run only under guarded.
import { spawn } from "node:child_process";
import { openSync } from "node:fs";
const REPO = new URL("../../../../../../../", import.meta.url).pathname;
const EVID = new URL("../../evidence/B24-mix-config/", import.meta.url).pathname;
const PORT = 8124;
const log = openSync(`${EVID}own-vite.log`, "w");
const vite = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], { cwd: REPO, stdio: ["ignore", log, log],
    env: { ...process.env, VJS_VITE_CACHE_DIR: `${REPO}node_modules/.vite-ss8-b24` } });
process.env.B24_BASE = `http://localhost:${PORT}`;
try {
    let up = false;
    for (let i = 0; i < 240 && !up; i++) { try { const r = await fetch(process.env.B24_BASE + "/", { signal: AbortSignal.timeout(5000) }); up = r.ok; } catch { await new Promise((r) => setTimeout(r, 1000)); } }
    console.log(`== vite :${PORT} up=${up}`);
    await fetch(process.env.B24_BASE + "/", { signal: AbortSignal.timeout(240000) }).catch(() => {});
    for (const f of process.argv.slice(2)) {
        console.log(`== ${f} ${new Date().toTimeString().slice(0, 8)}`);
        try { await import(new URL(f, import.meta.url)); } catch (e) { console.log(`== ${f} FAILED ${String(e).slice(0, 300)}`); }
    }
} finally { vite.kill("SIGTERM"); }
