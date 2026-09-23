// SERVED MODEL: claude-fable-5-1
//
// X.W5.t research probe — WHERE the scene-swap frames go (D1's root, per hop).
//
// D1's instrument (`scene-swap-budget.mjs`) reads inter-frame deltas and says
// WHETHER a hop breaches. This probe says WHY, per hop, with two readings the
// gate does not take:
//   (1) a CDP `Tracing` window over the hop (devtools.timeline categories):
//       the per-category wall time on the renderer main thread — Paint,
//       Layout, UpdateLayerTree, UpdateLayoutTree (style), FunctionCall /
//       EvaluateScript (JS), CompositeLayers, RasterTask (raster threads) —
//       so "the swap travel" and "the scene's own cost" are separated by
//       measurement, not by argument;
//   (2) the LAYER GEOMETRY of the travel: each region wrapper's box at the
//       moment the leave/enter classes are on (offsetWidth × offsetHeight ×
//       DPR², the promoted layer's texture area), the count of SVG
//       `<filter>` consumers (`feTurbulence`/`feDisplacementMap` — the
//       WatercolorDot silhouette) and `backdrop-filter` carriers inside the
//       pane, and the number of running animations.
// Two variants per hop: travel ON (HEAD bytes) and travel SUPPRESSED (a
// page-injected `<style>` that zeroes the pane-wrapper transition durations —
// unit d's own control, reproduced here so the two roots read side by side).
//
// Usage: PROBE_BASE=http://127.0.0.1:<port> node swap-root-trace.mjs
//        (the BUILT bundle; a dev-server read charges Vite's transform to the
//        first swap). Output: JSON on stdout.

import { chromium } from "playwright-core";

const BASE = process.env.PROBE_BASE ?? "http://localhost:8091";
const HOPS = ["/gradient", "/extract", "/mix", "/generate"];
const WINDOW_MS = 900;
const SUPPRESS_CSS = `.pane-wrapper > .vj-enter-enter-active, .pane-wrapper > .vj-enter-leave-active { transition-duration: 0s !important; }`;

const CATS = ["disabled-by-default-devtools.timeline", "devtools.timeline", "blink.user_timing", "disabled-by-default-devtools.timeline.frame"];
const BUCKETS = {
    Paint: "paint", PaintImage: "paint", RasterTask: "raster", "Rasterize": "raster", ImageDecodeTask: "raster",
    Layout: "layout", PrePaint: "prepaint", UpdateLayerTree: "layerTree", UpdateLayoutTree: "style", ScheduleStyleRecalculation: "style",
    FunctionCall: "js", EvaluateScript: "js", "v8.compile": "js", RunMicrotasks: "js", TimerFire: "js", EventDispatch: "js", XHRLoad: "js",
    CompositeLayers: "composite", Commit: "composite", "Animation": "animation", HitTest: "hitTest", "GPUTask": "gpu",
};

function geometry() {
    const out = { wrappers: [], animations: document.getAnimations().length, dpr: devicePixelRatio };
    for (const el of document.querySelectorAll(".pane-wrapper")) {
        const role = [...el.classList].map((c) => /^pane-wrapper--(\w+)$/.exec(c)?.[1]).find(Boolean) ?? "?";
        const kids = [...el.children];
        const inner = el.querySelectorAll("*").length;
        const svgFilters = el.querySelectorAll("feTurbulence, feDisplacementMap").length;
        const filterUsers = [...el.querySelectorAll("*")].filter((n) => { const f = getComputedStyle(n).filter; return f && f !== "none"; }).length;
        const backdrops = [...el.querySelectorAll("*")].filter((n) => { const f = getComputedStyle(n).backdropFilter; return f && f !== "none"; }).length;
        const willChange = [...el.querySelectorAll("*")].filter((n) => getComputedStyle(n).willChange !== "auto").length;
        out.wrappers.push({ role, label: el.getAttribute("aria-label"), w: el.offsetWidth, h: el.offsetHeight, layerPx: el.offsetWidth * el.offsetHeight * devicePixelRatio ** 2, children: kids.length, leaving: kids.filter((k) => k.classList.contains("vj-enter-leave-active")).length, entering: kids.filter((k) => k.classList.contains("vj-enter-enter-active")).length, nodes: inner, svgFilterPrimitives: svgFilters, filterUsers, backdropUsers: backdrops, willChange });
    }
    return out;
}

async function traceHop(page, cdp, hash, suppress) {
    if (suppress) await page.addStyleTag({ content: SUPPRESS_CSS });
    await page.evaluate(() => { const w = window; w.__ifd = []; let last = performance.now(); w.__rec = true; const loop = () => { const n = performance.now(); w.__ifd.push(n - last); last = n; if (w.__rec) requestAnimationFrame(loop); }; requestAnimationFrame(loop); });
    const events = [];
    const onData = (m) => events.push(...m.value);
    cdp.on("Tracing.dataCollected", onData);
    await cdp.send("Tracing.start", { categories: CATS.join(","), transferMode: "ReportEvents", options: "sampling-frequency=10000" });
    await page.evaluate((h) => { location.hash = `#${h}`; }, hash);
    await page.waitForTimeout(120);
    const midGeom = await page.evaluate(geometry);
    await page.waitForTimeout(WINDOW_MS - 120);
    const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
    await cdp.send("Tracing.end");
    await done;
    cdp.off("Tracing.dataCollected", onData);
    const ifd = await page.evaluate(() => { const w = window; w.__rec = false; return w.__ifd.slice(2); });
    const endGeom = await page.evaluate(geometry);
    const byBucket = {};
    const byName = {};
    for (const e of events) {
        if (e.ph !== "X" || typeof e.dur !== "number") continue;
        const b = BUCKETS[e.name];
        if (!b) continue;
        byBucket[b] = (byBucket[b] ?? 0) + e.dur / 1000;
        byName[e.name] = (byName[e.name] ?? 0) + e.dur / 1000;
    }
    const round = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Math.round(v)]).sort((a, b) => b[1] - a[1]));
    const sorted = [...ifd].sort((a, b) => a - b);
    return { hop: `→${hash}`, travel: suppress ? "suppressed" : "on", frames: ifd.length, over32: ifd.filter((x) => x > 32).length, over32Ratio: ifd.length ? Number((ifd.filter((x) => x > 32).length / ifd.length).toFixed(3)) : null, median: Math.round(sorted[Math.floor(sorted.length / 2)] ?? 0), max: Math.round(Math.max(0, ...ifd)), msByBucket: round(byBucket), msByName: round(byName), traceEvents: events.length, midGeom, endGeom };
}

async function walk(browser, suppress) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch { /* */ } });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await page.goto(`${BASE}/#/`, { waitUntil: "load" });
    await page.waitForTimeout(2800);
    const home = await page.evaluate(geometry);
    const hops = [];
    for (const h of HOPS) { hops.push(await traceHop(page, cdp, h, suppress)); await page.waitForTimeout(400); }
    await ctx.close();
    return { travel: suppress ? "suppressed" : "on", home, hops };
}

const browser = await chromium.launch({ headless: true });
const on = await walk(browser, false);
const off = await walk(browser, true);
await browser.close();
console.log(JSON.stringify({ probe: "swap-root-trace.mjs", servedModel: "claude-fable-5-1", unit: "X.W5.t", at: new Date().toISOString(), base: BASE, windowMs: WINDOW_MS, walks: [on, off] }, null, 2));
