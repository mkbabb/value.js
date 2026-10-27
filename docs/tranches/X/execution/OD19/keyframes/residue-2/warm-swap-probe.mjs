// OD19 residue (COHESION §0gp) — keyframes warm-swap frame reading.
// Usage: node warm-swap-probe.mjs <dist> <cell: gpu|sw> <cpuRate> <out.json> [reps]
// One browser per run; one context per rep. gpu = headless real Chrome
// (channel:'chrome', ANGLE-Metal; the §0fr.2/§0gp.2 real-GPU cell of record),
// sw = the default headless shell (SwiftShader). Each rep boots #/cube, idles
// 3 s, then hash-navigates route to route (the route-load warm order), and per
// swap records the scene-swap measures, rAF frame deltas inside
// [pick, pick + total + 100] and the LoAF entries overlapping that window.
import fs from "node:fs";
import { SCENES, serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";

const [dist, cell, rateArg, out, repsArg] = process.argv.slice(2);
const RATE = Number(rateArg || 1);
const REPS = Number(repsArg || 1);
const GPU = cell === "gpu";
const launch = GPU ? { gpu: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] } : {};

const READY = () => {
    const host = document.querySelector(".scene-host");
    if (!host?.firstElementChild || host.querySelector(".scene-skeleton")) return false;
    if (document.documentElement.matches(":active-view-transition")) return false;
    return host.getBoundingClientRect().height > 0;
};
const INIT = () => {
    window.__frames = [];
    let last = performance.now();
    const tick = () => {
        const n = performance.now();
        window.__frames.push([n, n - last, document.documentElement.matches(":active-view-transition") ? 1 : 0]);
        last = n;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    window.__loaf = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries())
                window.__loaf.push({
                    start: e.startTime,
                    dur: e.duration,
                    block: e.blockingDuration,
                    render: e.renderStart ? e.startTime + e.duration - e.renderStart : 0,
                    style: e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0,
                    scripts: e.scripts.map((s) => ({
                        dur: Math.round(s.duration),
                        layout: Math.round(s.forcedStyleAndLayoutDuration),
                        inv: s.invoker,
                        fn: s.sourceFunctionName,
                        src: (s.sourceURL || "").split("/").pop(),
                        pos: s.sourceCharPosition,
                    })),
                });
        }).observe({ type: "long-animation-frame", buffered: false });
    } catch {}
};

const rows = [];
let renderer = null;
const server = await serveDist(dist);
try {
    const r = await withBrowser(
        async (browser) => {
            for (let rep = 0; rep < REPS; rep++) {
                const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
                try {
                    await ctx.addInitScript(INIT);
                    const page = await ctx.newPage();
                    if (RATE !== 1)
                        await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: RATE });
                    await page.goto(server.url + "/#/cube", { waitUntil: "load" });
                    renderer ??= await page.evaluate(() => {
                        const gl = document.createElement("canvas").getContext("webgl2");
                        const x = gl?.getExtension("WEBGL_debug_renderer_info");
                        return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : null;
                    });
                    await page.waitForFunction(READY, undefined, { timeout: 30_000 });
                    await page.waitForTimeout(3000);
                    let from = "cube";
                    const order = [...SCENES.map((s) => s.key).filter((k) => k !== "cube" && k !== "home"), "cube", "home"];
                    for (const key of order) {
                        const route = SCENES.find((s) => s.key === key).route;
                        const m = await page.evaluate(async (hash) => {
                            performance.clearMeasures();
                            const t0 = performance.now();
                            window.__loaf.length = 0;
                            location.hash = hash;
                            for (let i = 0; i < 400 && !performance.getEntriesByName("scene-swap:total").length; i++)
                                await new Promise((r) => setTimeout(r, 16));
                            await new Promise((r) => setTimeout(r, 150));
                            const ms = Object.fromEntries(
                                performance
                                    .getEntriesByType("measure")
                                    .filter((e) => e.name.startsWith("scene-swap:"))
                                    .map((e) => [e.name.slice(11), Math.round(e.duration)]),
                            );
                            const end = t0 + (ms.total ?? 1000) + 100;
                            const win = window.__frames.filter((x) => x[0] >= t0 && x[0] <= end);
                            const over = win.filter((x) => x[1] > 50).map((x) => [Math.round(x[0] - t0), Math.round(x[1]), x[2]]);
                            const loaf = window.__loaf
                                .filter((l) => l.start <= end && l.start + l.dur >= t0)
                                .map((l) => ({ ...l, start: Math.round(l.start - t0), dur: Math.round(l.dur), block: Math.round(l.block), render: Math.round(l.render), style: Math.round(l.style) }));
                            return { ...ms, frames: win.length, maxFrame: Math.round(Math.max(0, ...win.map((x) => x[1]))), over50: over.length, over, loaf };
                        }, `#/${route}`);
                        rows.push({ rep, swap: `${from}->${key}`, ...m });
                        from = key;
                        await page.waitForTimeout(1200);
                    }
                } finally {
                    await ctx.close();
                }
            }
        },
        { launch, label: "warm-swap-probe" },
    );
    if (r?.skipped) throw new Error("no browser: " + r.reason);
} finally {
    await server.close();
}
fs.writeFileSync(out, JSON.stringify({ dist, cell, rate: RATE, renderer, rows }, null, 1));
console.log(`${cell} x${RATE} · ${renderer}`);
for (const r of rows)
    console.log(`${r.rep} ${r.swap.padEnd(16)} prep ${r.prepare} commit ${r.commit} total ${r.total} max ${r.maxFrame} over50 ${r.over50} [${r.over.map((o) => o[1] + (o[2] ? "v" : "")).join(",")}]`);
