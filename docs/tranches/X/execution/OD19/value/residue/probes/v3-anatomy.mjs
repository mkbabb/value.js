// OD19 residue (§0gp) — V3 anatomy on the real-GPU cell (headless real Chrome,
// channel "chrome", ANGLE-Metal; named need: the §0gp.2 budget is a
// frame-production measurement, so it needs the hardware rasteriser).
// Per cell: (1) the instrument floor — the same double-rAF read over 41 hover
// moves across an inert strip (no drag, no colour change); (2) the picker
// channel-slider drag of e2e/smoke/od19-v3-colour-latency.spec.ts; (3) the same
// drag under a CDP CPU profile (self + inclusive by function@file:line).
// One browser per run, one context per cell, both closed in finally.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:8475";
const OUT = process.env.OUT ?? "docs/tranches/X/execution/OD19/value/residue/anatomy";
const CELLS = (process.env.CELLS ?? "light-1440,dark-1440,light-390").split(",");
const TAG = process.env.TAG ?? "run";
const PROFILE = process.env.PROFILE !== "0";
mkdirSync(OUT, { recursive: true });

function arm() {
    const S = (window.__v3 = { on: false, inputs: [], loaf: [] });
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (S.on) S.loaf.push([Math.round(e.duration), Math.round((e.renderStart || e.startTime) - e.startTime), Math.round((e.styleAndLayoutStart || e.startTime) - e.startTime),
                [...(e.scripts ?? [])].sort((a, b) => b.duration - a.duration).slice(0, 4).map((x) => `${x.invoker}|${(x.sourceURL ?? "").split("/").slice(-2).join("/").split("?")[0]}:${x.sourceFunctionName ?? ""}|${Math.round(x.duration)}|fl${Math.round(x.forcedStyleAndLayoutDuration ?? 0)}`)]);
        }).observe({ type: "long-animation-frame", buffered: false });
    } catch {}
    addEventListener("pointermove", (e) => {
        if (!S.on) return;
        const t = e.timeStamp;
        requestAnimationFrame(() => requestAnimationFrame((f2) => S.inputs.push(+(f2 - t).toFixed(1))));
    }, { capture: true });
}
const stats = (a) => {
    const s = [...a].sort((x, y) => x - y);
    const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
    return { n: s.length, p50: q(0.5), p95: q(0.95), max: s[s.length - 1] };
};

async function sweep(page, x0, x1, y, down) {
    await page.evaluate(() => { window.__v3.inputs = []; window.__v3.loaf = []; window.__v3.on = true; });
    await page.mouse.move(x0, y);
    if (down) await page.mouse.down();
    for (let i = 0; i <= 40; i++) await page.mouse.move(x0 + (x1 - x0) * (i / 40), y);
    if (down) await page.mouse.up();
    await page.waitForTimeout(400);
    return page.evaluate(() => { window.__v3.on = false; const r = window.__v3.inputs.slice(); r.loaf = window.__v3.loaf.slice(); return { inputs: r, loaf: window.__v3.loaf.slice() }; });
}

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const out = {};
try {
    for (const cell of CELLS) {
        const [scheme, w] = cell.split("-");
        const width = +w;
        const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme: scheme });
        try {
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            await ctx.addInitScript(arm);
            const page = await ctx.newPage();
            await page.goto(BASE + "/#/", { timeout: 120000 });
            const sl = page.locator(".channel-slider").first();
            await sl.waitFor({ timeout: 120000 });
            await page.waitForTimeout(3000);
            await sl.scrollIntoViewIfNeeded();
            const box = await sl.boundingBox();
            const y = box.y + box.height / 2;
            const renderer = await page.evaluate(() => {
                const gl = document.createElement("canvas").getContext("webgl");
                const d = gl?.getExtension("WEBGL_debug_renderer_info");
                return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "?";
            });
            // Floor: hover across the page's left gutter (no drag, no colour write).
            const floor = await sweep(page, 2, 10, Math.min(y + 200, (width === 390 ? 844 : 900) - 20), false);
            const drag1 = await sweep(page, box.x + box.width * 0.2, box.x + box.width * 0.8, y, true);
            const drag2 = await sweep(page, box.x + box.width * 0.8, box.x + box.width * 0.2, y, true);
            const rec = { renderer, floor: stats(floor.inputs), drag1: { ...stats(drag1.inputs), loaf: drag1.loaf }, drag2: { ...stats(drag2.inputs), loaf: drag2.loaf } };
            if (PROFILE) {
                const cdp = await ctx.newCDPSession(page);
                await cdp.send("Profiler.enable");
                await cdp.send("Profiler.setSamplingInterval", { interval: 200 });
                await cdp.send("Profiler.start");
                const t0 = Date.now();
                await sweep(page, box.x + box.width * 0.2, box.x + box.width * 0.8, y, true);
                rec.profiledSpanMs = Date.now() - t0;
                const { profile } = await cdp.send("Profiler.stop");
                const byId = new Map(profile.nodes.map((n) => [n.id, n]));
                const parent = new Map();
                for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
                const key = (n) => { const f = n.callFrame; return `${f.functionName || "(anon)"} @ ${f.url.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "").replace(/.*\/(node_modules|deps)\//, "$1/")}:${f.lineNumber + 1}`; };
                const selfT = new Map(), inclT = new Map();
                profile.samples.forEach((id, i) => {
                    const d = (profile.timeDeltas[i] ?? 0) / 1000;
                    const k0 = key(byId.get(id));
                    selfT.set(k0, (selfT.get(k0) ?? 0) + d);
                    const seen = new Set();
                    for (let cur = id; cur !== undefined; cur = parent.get(cur)) { const k = key(byId.get(cur)); if (seen.has(k)) continue; seen.add(k); inclT.set(k, (inclT.get(k) ?? 0) + d); }
                });
                const callers = new Map();
                profile.samples.forEach((id, i) => {
                    const d = (profile.timeDeltas[i] ?? 0) / 1000;
                    const k0 = key(byId.get(id));
                    if (!/^(getPropertyValue|getImageData|getComputedStyle|getBoundingClientRect) /.test(k0)) return;
                    const chain = [];
                    for (let cur = parent.get(id); cur !== undefined && chain.length < 3; cur = parent.get(cur)) chain.push(key(byId.get(cur)));
                    const k = `${k0.split(" ")[0]} <- ${chain.join(" <- ")}`;
                    callers.set(k, (callers.get(k) ?? 0) + d);
                });
                rec.callers = [...callers.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `${v.toFixed(1)} ${k}`);
                const top = (m, f, n = 25) => [...m.entries()].filter(([k]) => f(k)).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${v.toFixed(1)} ${k}`);
                rec.self = top(selfT, (k) => !/^\((idle|program)\)/.test(k));
                rec.inclApp = top(inclT, (k) => /\/(demo|src)\//.test(k) || /\.vue:/.test(k), 40);
                rec.inclGlass = top(inclT, (k) => /glass-ui/.test(k), 15);
                rec.idle = +(selfT.get("(idle) @ :0") ?? 0).toFixed(0);
                rec.program = +(selfT.get("(program) @ :0") ?? 0).toFixed(0);
            }
            out[cell] = rec;
            console.log(cell, JSON.stringify({ renderer: rec.renderer.slice(0, 40), floor: rec.floor, drag1: rec.drag1, drag2: rec.drag2, idle: rec.idle, program: rec.program, span: rec.profiledSpanMs }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(`${OUT}/${TAG}.json`, JSON.stringify(out, null, 1));
