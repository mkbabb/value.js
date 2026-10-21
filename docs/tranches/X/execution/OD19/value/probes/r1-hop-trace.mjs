#!/usr/bin/env node
// OD19 · repair 1 (C1-V-05) — the Home <-> Gradient view switch, rAF trace + LoAF + CPU profile by source.
// usage: node r1-hop-trace.mjs <origin> <width> <scheme light|dark> <reps> [profile=0|1]
// R1_GPU=1 launches the same headless shell on ANGLE-Metal (the GPU witness, kf repair-2 precedent; no branded Chrome).
// Prints one JSON line per hop: frames > 34 ms, worst frame, and (profile=1) the top self-time sources.
import { chromium } from "playwright";
const [ORIGIN, W = "1440", SCHEME = "light", REPS = "3", PROF = "0"] = process.argv.slice(2);
const INIT = () => {
    window.__loaf = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries())
                window.__loaf.push({
                    start: e.startTime, dur: e.duration,
                    scripts: e.scripts.filter((s) => s.duration > 8).map((s) => [Math.round(s.duration), (s.sourceURL || "").split("/").pop().split("?")[0], s.sourceFunctionName, s.invoker]),
                });
        }).observe({ type: "long-animation-frame" });
    } catch {}
};
async function trace(page, hash) {
    return page.evaluate(async (hash) => {
        window.__loaf.length = 0;
        const frames = [];
        let last = performance.now();
        const t0 = last;
        let run = true;
        const tick = (t) => { frames.push(t - last); last = t; if (run) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        location.hash = hash;
        await new Promise((r) => setTimeout(r, 2200));
        run = false;
        const loaf = window.__loaf.filter((f) => f.start >= t0 - 5).map((f) => ({ t: Math.round(f.start - t0), d: Math.round(f.dur), s: f.scripts }));
        return { t0abs: t0, over34: frames.filter((d) => d > 34).length, worst: Math.round(Math.max(...frames)), frames: frames.length, h1: document.querySelector("main h1")?.textContent?.trim(), loaf };
    }, hash);
}
const GPU = process.env.R1_GPU === "1";
const browser = await chromium.launch({ headless: true, args: GPU ? ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] : [] });
try {
    for (let i = 0; i < +REPS; i++) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 }, colorScheme: SCHEME });
        try {
            await ctx.addInitScript(INIT);
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 90000 });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(5000);
            const cdp = PROF === "1" ? await ctx.newCDPSession(page) : null;
            if (cdp) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start"); }
            const renderer = await page.evaluate(() => {
                const gl = document.createElement("canvas").getContext("webgl2");
                const x = gl?.getExtension("WEBGL_debug_renderer_info");
                return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : null;
            });
            if (GPU && (!renderer || /SwiftShader/i.test(renderer))) { console.error("no GPU renderer served (exit 2)"); process.exit(2); }
            // Clock beacon: a named 3 ms busy loop at a known performance.now(), found again in the profile's samples.
            const beacon = cdp ? await page.evaluate(() => { const t = performance.now(); (function r1ClockBeacon() { while (performance.now() - t < 3); })(); return t; }) : 0;
            const go = await trace(page, "#/gradient");
            let top = null;
            if (cdp) {
                const { profile } = await cdp.send("Profiler.stop");
                const dt = new Map();
                const byId = new Map(profile.nodes.map((n) => [n.id, n]));
                for (let k = 0; k < profile.samples.length; k++) {
                    const n = byId.get(profile.samples[k]);
                    const u = n.callFrame.url.split("/").pop().split("?")[0] || n.callFrame.functionName || "(native)";
                    const key = `${u}:${n.callFrame.functionName}`;
                    dt.set(key, (dt.get(key) ?? 0) + profile.timeDeltas[k] / 1000);
                }
                top = [...dt].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => [k, Math.round(v)]);
                // Inclusive time per source file (each sample counts once for every file on its stack).
                const parent = new Map();
                for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
                const inc = new Map();
                for (let k = 0; k < profile.samples.length; k++) {
                    const seen = new Set();
                    for (let id = profile.samples[k]; id !== undefined; id = parent.get(id)) {
                        const u = byId.get(id).callFrame.url.split("/").pop().split("?")[0];
                        if (u && !seen.has(u)) { seen.add(u); inc.set(u, (inc.get(u) ?? 0) + profile.timeDeltas[k] / 1000); }
                    }
                }
                // Per long frame: inclusive time per file for the samples inside that LoAF window (page clock).
                const ts = []; let acc = profile.startTime;
                for (let k = 0; k < profile.samples.length; k++) { acc += profile.timeDeltas[k]; ts.push(acc); }
                const bk = profile.samples.findIndex((id) => byId.get(id).callFrame.functionName === "r1ClockBeacon");
                const off = bk >= 0 ? ts[bk] / 1000 - beacon : null;
                const hop0 = go.t0abs;
                const frames = off === null ? [] : go.loaf.filter((f) => f.d > 50).map((f) => {
                    const a = (hop0 + f.t + off) * 1000, b = a + f.d * 1000, m = new Map();
                    for (let k = 0; k < ts.length; k++) {
                        if (ts[k] < a || ts[k] > b) continue;
                        const seen = new Set();
                        for (let id = profile.samples[k]; id !== undefined; id = parent.get(id)) {
                            const cf = byId.get(id).callFrame; const u = cf.url.split("/").pop().split("?")[0];
                            if (u && !seen.has(u)) { seen.add(u); m.set(u, (m.get(u) ?? 0) + profile.timeDeltas[k] / 1000); }
                        }
                    }
                    return { t: f.t, d: f.d, files: [...m].sort((x, y) => y[1] - x[1]).slice(0, 14).map(([k, v]) => [k, Math.round(v)]) };
                });
                top = { frames, self: top, inclusive: [...inc].sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => [k, Math.round(v)]) };
            }
            await page.waitForTimeout(1500);
            const back = await trace(page, "#/");
            console.log(JSON.stringify({ rep: i, W, SCHEME, renderer, go, back, top }));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
