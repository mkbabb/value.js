// OD19 residue (§0gp) — V3 on the real-GPU cell: the picker channel-slider drag
// traced on headless real Chrome, ANGLE-Metal (named need: the §0gp.2 GPU budget
// read is a frame-production measurement, so it needs the hardware rasteriser).
// Same drag as e2e/smoke/od19-v3-colour-latency.spec.ts. Records the per-input
// latency list and a main-thread breakdown of the drag window from a Chrome trace.
// One browser per run, one context per cell, both closed in finally.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:8471";
const OUT = process.env.OUT ?? "docs/tranches/X/execution/OD19/value/residue/v3-trace";
const CELLS = (process.env.CELLS ?? "light-1440,dark-1440").split(",");
const TAG = process.env.TAG ?? "run";
mkdirSync(OUT, { recursive: true });

function arm() {
    const S = (window.__v3 = { on: false, inputs: [], frames: [] });
    addEventListener("pointermove", (e) => {
        if (!S.on) return;
        const t = e.timeStamp;
        requestAnimationFrame(() => requestAnimationFrame((f2) => S.inputs.push(+(f2 - t).toFixed(1))));
    }, { capture: true });
    const tick = (t) => { if (S.on) S.frames.push(t); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
}

const roWrap = () => { const RO = window.ResizeObserver; const stats = (window.__ro = {}); window.ResizeObserver = class extends RO { constructor(cb) { const site = (new Error().stack || "").split("\n").slice(2, 6).map((s) => s.trim().replace(/https?:\/\/[^/]+\//, "").replace(/\?[^:]*/, "")).join(" < "); super((entries, obs) => { const t = performance.now(); cb(entries, obs); const d = performance.now() - t; if (!window.__v3?.on) return; const tg = entries.map((e) => { const el = e.target; return el.tagName + "." + String(el.className?.baseVal ?? el.className).split(" ").slice(0, 3).join("."); }).slice(0, 3).join(","); const k = site + " :: " + tg; const s = (stats[k] ??= { n: 0, ms: 0, max: 0 }); s.n++; s.ms += d; s.max = Math.max(s.max, d); }); } }; };
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const summary = {};
try {
    for (const cell of CELLS) {
        const [scheme, w] = cell.split("-");
        const width = +w;
        const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme: scheme });
        try {
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            await ctx.addInitScript(arm); await ctx.addInitScript(roWrap);
            const page = await ctx.newPage();
            await page.goto(BASE + "/#/", { timeout: 120000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3000);
            const handle = page.locator(".channel-slider").first();
            await handle.scrollIntoViewIfNeeded();
            const box = await handle.boundingBox();
            const y = box.y + box.height / 2;
            await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.frame", "blink.user_timing", "v8.execute"] });
            await page.evaluate(() => { window.__v3.inputs = []; window.__v3.frames = []; window.__v3.on = true; });
            await page.mouse.move(box.x + box.width * 0.2, y);
            await page.mouse.down();
            for (let i = 0; i <= 40; i++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (i / 40)), y);
            await page.mouse.up();
            await page.waitForTimeout(400);
            const r = await page.evaluate(() => { window.__v3.on = false; return window.__v3; }); const ro = await page.evaluate(() => Object.entries(window.__ro).sort((a, b) => b[1].ms - a[1].ms).slice(0, 8).map(([k, v]) => [k, v.n, +v.ms.toFixed(1), +v.max.toFixed(1)]));
            const buf = await browser.stopTracing();
            const trace = JSON.parse(buf.toString());
            const ev = trace.traceEvents ?? trace;
            const main = ev.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain");
            const tid = main?.tid, pid = main?.pid;
            const byName = {};
            let lo = Infinity, hi = 0;
            for (const e of ev) if (e.pid === pid && e.tid === tid && e.ph === "X" && e.dur) { lo = Math.min(lo, e.ts); hi = Math.max(hi, e.ts + e.dur); }
            for (const e of ev) {
                if (e.pid !== pid || e.tid !== tid || e.ph !== "X" || !e.dur) continue;
                if (!["FunctionCall", "UpdateLayoutTree", "Layout", "Paint", "PrePaint", "Layerize", "Commit", "EventDispatch", "FireAnimationFrame", "RecalculateStyles", "HitTest", "ParseHTML", "TimerFire", "RunMicrotasks", "UpdateLayer", "CompositeLayers", "IntersectionObserverController::computeIntersections"].includes(e.name)) continue;
                byName[e.name] = (byName[e.name] ?? 0) + e.dur / 1000;
            }
            // top FunctionCall sources
            const fns = {};
            for (const e of ev) {
                if (e.pid !== pid || e.tid !== tid || e.name !== "FunctionCall" || !e.dur) continue;
                const d = e.args?.data ?? {};
                const k = `${d.functionName || "?"}@${(d.url || "").split("/").slice(-2).join("/").split("?")[0]}:${d.lineNumber ?? ""}`;
                fns[k] = (fns[k] ?? 0) + e.dur / 1000;
            }
            const sorted = [...r.inputs].sort((a, b) => a - b);
            const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
            const dts = r.frames.slice(1).map((f, i) => +(f - r.frames[i]).toFixed(1));
            summary[cell] = {
                ro, n: sorted.length, p50: q(0.5), p95: q(0.95), inputs: r.inputs,
                frameDtOver17: dts.filter((d) => d > 17.5).length, frames: dts.length,
                traceSpanMs: +((hi - lo) / 1000).toFixed(0),
                mainMs: Object.fromEntries(Object.entries(byName).map(([k, v]) => [k, +v.toFixed(1)]).sort((a, b) => b[1] - a[1])),
                topFns: Object.entries(fns).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => [k, +v.toFixed(1)]),
            };
            if (process.env.TRACE_DIR) writeFileSync(`${process.env.TRACE_DIR}/${TAG}-${cell}.trace.json`, buf);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(`${OUT}/${TAG}-summary.json`, JSON.stringify(summary, null, 1));
for (const [c, s] of Object.entries(summary)) console.log(c, JSON.stringify({ ...s, inputs: undefined }));
