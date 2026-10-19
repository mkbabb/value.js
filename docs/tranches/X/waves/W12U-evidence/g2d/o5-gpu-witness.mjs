// SERVED MODEL: claude-opus-5-5
// X.W12U.g2d — THE O-5 GPU WITNESS (COHESION §0fr.2; W12U.md ADDENDUM (h) :118).
//
// O-5's gate is read on the real-GPU cell of record: headless real Chrome
// (`channel: "chrome"`), ANGLE on Metal. This file states the renderer and
// ASSERTS it: a sitting whose WebGL UNMASKED_RENDERER does not name ANGLE +
// Metal (or names a software rasteriser) is an INSTRUMENT FAULT, exit 2, never
// a reading. The SwiftShader readings (`r1c7/o5-r{1,2}.txt`) stay INFORMATIONAL.
//
// The measurement is the spec's own, unchanged (`e2e/smoke/perf/o5-boot-pacing
// .spec.ts`): the `frame-budget.ts` collector (rAF deltas from the init script
// on), `page.goto("/")`, the main pane visible, then a 4,000 ms window; the
// three legs are the spec's —
//   frames > 10 · max delta ≤ 3 × median · dropped (> 2 × median) ≤ 10 %.
// Same viewport as the smoke-perf project (1280 × 720). No assertion is
// relaxed; only the renderer differs, which is what §0fr.2 rules.
// ADDS (diagnostic, not gated): the max gap's position, the canvas-mount
// times, and the longtask / long-animation-frame entries inside the gap, so a
// RED names where it sits.
//
// Usage: node o5-gpu-witness.mjs <origin> <label> [sittings=3]
// Prints one line per sitting and a final `VERDICT GREEN|RED n/N`; exit 0 on
// GREEN in every sitting, 1 on any RED leg, 2 on an instrument fault.
import { chromium } from "@playwright/test";

const [origin, label, nArg] = process.argv.slice(2);
const N = Number(nArg ?? 3);
const MAIN = 'main[aria-labelledby="route-title"]:has(> h1#route-title)';
const SPIKE_RATIO = 3;
const DROP_RATIO = 2;
const DROP_FRACTION_MAX = 0.1;
// The asserted cell: ANGLE over Metal, and nothing software.
const GPU_RE = /ANGLE.*Metal/i;
const SOFTWARE_RE = /swiftshader|llvmpipe|software|microsoft basic|no-webgl/i;

const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu-rasterization"],
});
let red = 0;
let fault = 0;
try {
    for (let s = 1; s <= N; s++) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => {
                const w = window;
                w.__frames = [];
                w.__ts = [];
                w.__canvasAt = [];
                w.__lt = [];
                w.__loaf = [];
                try {
                    new PerformanceObserver((l) => {
                        for (const e of l.getEntries()) w.__lt.push([Math.round(e.startTime), Math.round(e.duration)]);
                    }).observe({ type: "longtask", buffered: true });
                } catch {}
                try {
                    new PerformanceObserver((l) => {
                        for (const e of l.getEntries())
                            w.__loaf.push([Math.round(e.startTime), Math.round(e.duration), Math.round(e.blockingDuration), Math.round(e.renderStart - e.startTime), e.scripts.map((x) => `${(x.sourceURL || "").split("/").pop()}:${x.invoker}:${Math.round(x.duration)}`).slice(0, 4)]);
                    }).observe({ type: "long-animation-frame", buffered: true });
                } catch {}
                let last = performance.now();
                const tick = (now) => {
                    w.__frames.push(now - last);
                    w.__ts.push(now);
                    last = now;
                    requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                new MutationObserver((ms) => {
                    for (const m of ms)
                        for (const n of m.addedNodes) {
                            if (n.nodeType !== 1) continue;
                            const c = n.tagName === "CANVAS" ? n : n.querySelector?.("canvas");
                            if (c) w.__canvasAt.push([Math.round(performance.now()), c.className || c.id || "canvas"]);
                        }
                }).observe(document, { childList: true, subtree: true });
            });
            await page.goto(origin + "/");
            await page.locator(MAIN).waitFor({ state: "visible", timeout: 20000 });
            const renderer = await page.evaluate(() => {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") ?? c.getContext("webgl");
                if (!gl) return "no-webgl";
                const ext = gl.getExtension("WEBGL_debug_renderer_info");
                return ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "masked";
            });
            if (!GPU_RE.test(renderer) || SOFTWARE_RE.test(renderer)) {
                console.log(`[o5-gpu ${label} s${s}] INSTRUMENT FAULT renderer=${renderer} (not ANGLE-Metal)`);
                fault++;
                continue;
            }
            const t0 = await page.evaluate(() => performance.now());
            await page.waitForFunction((a) => performance.now() - a >= 4000, t0, { timeout: 9000, polling: 100 });
            const r = await page.evaluate(() => ({ f: window.__frames.slice(), ts: window.__ts.slice(), c: window.__canvasAt.slice(), lt: window.__lt.slice(), loaf: window.__loaf.slice() }));
            const frames = r.f.filter((d) => d > 0);
            const sorted = [...frames].sort((a, b) => a - b);
            const median = sorted[Math.min(sorted.length - 1, Math.floor(0.5 * sorted.length))];
            const maxDelta = Math.max(...frames);
            const iMax = r.f.indexOf(maxDelta);
            const gapEnd = r.ts[iMax];
            const dropped = frames.filter((d) => d > DROP_RATIO * median).length;
            const dropFraction = dropped / frames.length;
            const legs = {
                frames: frames.length > 10,
                spike: maxDelta <= SPIKE_RATIO * median,
                drop: dropFraction <= DROP_FRACTION_MAX,
            };
            const gapStart = gapEnd - maxDelta;
            const ltIn = r.lt.filter(([st, du]) => st < gapEnd && st + du > gapStart);
            const loafIn = r.loaf.filter(([st, du]) => st < gapEnd && st + du > gapStart);
            const ok = legs.frames && legs.spike && legs.drop;
            if (!ok) red++;
            console.log(
                `[o5-gpu ${label} s${s}] renderer=${renderer} mainVisible@${t0.toFixed(0)} frames=${frames.length} median=${median.toFixed(1)}ms max=${maxDelta.toFixed(1)}ms (${(maxDelta / median).toFixed(1)}x) gapEnd@${gapEnd?.toFixed(0)} dropped=${dropped} (${(dropFraction * 100).toFixed(1)}%) canvases=${JSON.stringify(r.c)} legs=${JSON.stringify(legs)} ${ok ? "GREEN" : "RED"}`,
            );
            console.log(
                `    diag: gap=[${gapStart.toFixed(0)},${gapEnd?.toFixed(0)}] longtasksInGap=${JSON.stringify(ltIn)} loafInGap=${JSON.stringify(loafIn)} allLongtasks=${JSON.stringify(r.lt)}`,
            );
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
console.log(`VERDICT ${fault ? "FAULT" : red ? "RED" : "GREEN"} ${N - red - fault}/${N} green, ${fault} fault`);
process.exit(fault ? 2 : red ? 1 : 0);
