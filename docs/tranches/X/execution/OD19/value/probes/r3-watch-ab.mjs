#!/usr/bin/env node
// OD19 repair 3 (C3-V-01) — does a write burst ELSEWHERE in the repo stall the dev server?
// Starts the demo dev server in-process from the repo's vite.config.ts (own port + deps cache), loads every
// route in one headless browser (so the watcher holds an owner-session module graph), then a child process
// makes BURST writes across 500 files under .worktrees/.r3-probe-<arm>/ (outside the served root, like a sibling seat's
// worktree build). Measures the server's event-loop lag and its own HTTP latency during and after the burst,
// and proves the watcher still sees (a) an add inside the served root and (b) a change to an out-of-root file.
// arm=base serves foundation.css as HEAD had it (`@import "tailwindcss";`, Tailwind's automatic source detection
// rooted at the repo); arm=cure serves the tree as written (`source(none)`). One pre-transform swaps the line.
// usage: node r3-watch-ab.mjs <base|cure> <port> <out.json> [burst=20000]
import { createServer } from "vite";
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync, appendFileSync } from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
const als = new AsyncLocalStorage();
const [ARM, PORT, OUT, BURST = "20000"] = process.argv.slice(2);
const REPO = path.resolve(import.meta.dirname, "../../../../../../..");
const SCRATCH = path.join(REPO, ".worktrees", `.r3-probe-${ARM}`);
const OOR = path.join(path.dirname(OUT), `oor-${ARM}.txt`); // an out-of-root file, watched like ensureWatchedFile
const ADD = path.join(REPO, "demo/app", `.r3-add-${ARM}.txt`);
const res = { arm: ARM };
// the burst's 500 files exist before the server starts (a sibling seat's evidence/worktree tree), so any scan
// rooted at the repo sees them; the burst then rewrites them, as a seat's run rewrites its outputs
mkdirSync(SCRATCH, { recursive: true });
for (let i = 0; i < 500; i++) writeFileSync(path.join(SCRATCH, `f${i}.js`), "x");
const server = await createServer({
    configFile: path.join(REPO, "vite.config.ts"),
    cacheDir: process.env.R3_CACHE,
    logLevel: "warn",
    // R3_TRACE: run vite:css's transform inside an AsyncLocalStorage keyed by the module id, so a stray
    // watcher.add() names the stylesheet whose compile handed it over
    plugins: [{ name: "r3-arm", enforce: "pre", transform(code, id) { if (ARM === "base" && id.endsWith("/demo/styles/foundation.css")) { if (!code.includes('@import "tailwindcss" source(none);')) throw new Error("r3: cure line absent"); return code.replace('@import "tailwindcss" source(none);', '@import "tailwindcss";'); } } }, ...(process.env.R3_TRACE ? [{ name: "r3-blame", configResolved(c) { const p = c.plugins.find((q) => q.name === "vite:css"); const t = p.transform; const h = t.handler ?? t; const w = function (code, id, ...a) { return als.run(id, () => h.call(this, code, id, ...a)); }; if (t.handler) t.handler = w; else p.transform = w; } }] : [])],
    server: { port: Number(PORT), strictPort: true },
});
const seen = [];
// R3_TRACE=1: record every watcher.add() whose path is not a single file the module graph loaded (a dir, a glob, the root)
const adds = [];
if (process.env.R3_TRACE) { const add = server.watcher.add.bind(server.watcher); server.watcher.add = (p, ...a) => { for (const x of [p].flat()) if (!path.relative(REPO, x).startsWith("demo") && !path.relative(REPO, x).startsWith("src")) adds.push([x, als.getStore() ?? "?"]); return add(p, ...a); }; }
server.watcher.on("all", (ev, f) => { if (f.includes(".r3-") || f.includes("oor-")) seen.push([ev, path.basename(f), Date.now()]); });
let lagMax = 0, lags = [];
let last = performance.now();
const tick = setInterval(() => { const now = performance.now(); const lag = now - last - 50; last = now; lags.push(lag); lagMax = Math.max(lagMax, lag); }, 50);
const http = async () => { const t = performance.now(); try { await fetch(`http://localhost:${PORT}/`, { signal: AbortSignal.timeout(30000) }); return Math.round(performance.now() - t); } catch { return -1; } };
try {
    await server.listen();
    const browser = await chromium.launch({ headless: true });
    try {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        for (const r of ["", "palettes", "browse", "extract", "mix", "generate", "gradient", "atmosphere", "blob", "admin/users"]) {
            await page.goto(`http://localhost:${PORT}/#/${r}`, { waitUntil: "load", timeout: 120000 });
            await page.waitForFunction(() => document.querySelectorAll("main .pane-wrapper").length > 0, null, { timeout: 60000 });
        }
        await ctx.close();
    } finally { await browser.close(); }
    { const w = server.watcher.getWatched(); const ks = Object.keys(w); res.watchedDirs = ks.length; res.watchedEntries = ks.reduce((n, k) => n + w[k].length, 0); const top = {}; for (const k of ks) { const t = path.relative(REPO, k).split(path.sep).slice(0, 2).join("/"); top[t] = (top[t] ?? 0) + 1; } res.watchedTop = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 12); }
    if (process.env.R3_TRACE) { const b = {}; for (const [, id] of adds) b[id] = (b[id] ?? 0) + 1; res.addBlame = Object.entries(b).sort((x, y) => y[1] - x[1]).slice(0, 12); res.addsN = adds.length; }
    // liveness: an out-of-root file added to the watcher, as vite's ensureWatchedFile does for module files
    writeFileSync(OOR, "0\n"); server.watcher.add(OOR);
    await new Promise((r) => setTimeout(r, 1500));
    lags = []; lagMax = 0;
    res.httpBefore = await http();
    const t0 = Date.now();
    const writer = spawn(process.execPath, ["-e", `const fs=require("fs");for(let i=0;i<${BURST};i++){fs.writeFileSync(${JSON.stringify(SCRATCH)}+"/f"+(i%500)+".js","x"+i)}`]);
    const httpDuring = [];
    let done = false; writer.on("exit", () => { done = true; res.burstMs = Date.now() - t0; });
    while (!done) { httpDuring.push(await http()); await new Promise((r) => setTimeout(r, 250)); }
    res.httpDuring = httpDuring;
    const httpAfter = [];
    for (let i = 0; i < 20; i++) { httpAfter.push(await http()); await new Promise((r) => setTimeout(r, 500)); }
    res.httpAfter = httpAfter;
    res.lagMaxMs = Math.round(lagMax);
    res.lagP95Ms = Math.round([...lags].sort((a, b) => a - b)[Math.floor(lags.length * 0.95)] ?? 0);
    res.settleMs = Date.now() - t0;
    appendFileSync(OOR, "1\n"); writeFileSync(ADD, "x");
    await new Promise((r) => setTimeout(r, 3000));
    res.liveness = { oorChange: seen.some(([e, f]) => e === "change" && f === path.basename(OOR)), rootAdd: seen.some(([e, f]) => e === "add" && f === path.basename(ADD)) };
} finally {
    clearInterval(tick);
    rmSync(SCRATCH, { recursive: true, force: true }); rmSync(ADD, { force: true }); rmSync(OOR, { force: true });
    await server.close();
}
// the falsifier: the loop never blocks 250 ms, every read of / answers inside 1 s, and the watcher stays live
const reads = [res.httpBefore, ...(res.httpDuring ?? []), ...(res.httpAfter ?? [])];
res.verdict = res.lagMaxMs < 250 && reads.every((ms) => ms >= 0 && ms < 1000) && res.liveness?.oorChange && res.liveness?.rootAdd ? "GREEN" : "RED";
writeFileSync(OUT, JSON.stringify(res, null, 2));
console.log(JSON.stringify({ ...res, httpDuring: `${res.httpDuring?.length} reads, max ${Math.max(...(res.httpDuring ?? [0]))}`, httpAfter: `max ${Math.max(...(res.httpAfter ?? [0]))}` }));
process.exit(0);
