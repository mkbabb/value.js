// SERVED MODEL: claude-opus-5-5[1m]
//
// X.W5.d — gate D1: the scene-swap frame budget (DR-27 · CC-054 · fold W5F-44).
//
// The four measured hops of the baseline of record
// (`docs/tranches/T/audit/pi/u-gestalt/probe2-log.txt`, taken by `probe2.mjs`
// §5 at 1440×900 light, DPR 2): `→/gradient`, `→/extract`, `→/mix`,
// `→/generate`, walked IN THAT ORDER from a settled `/#/`, each hop a hash
// navigation followed by a 900 ms window of rAF inter-frame deltas (the first
// two dropped as warm-up) — the same instrument, so BEFORE and AFTER compare to
// the number the spec cites.
//
// Budget per hop (W5.md §6 D1): `over32 / frames ≤ 0.15` AND `median ≤ 20 ms`.
// Any single hop breaching turns the gate RED.
//
// The adversarial arm (W5.md §6 D1 falsifier: "a budget met by DELETING the
// animation is caught by D3/D4"): every hop also records the swap MOTION it
// observed — each element that received `vj-enter-enter-active` /
// `vj-enter-leave-active` as the direct child of a `.pane-wrapper--<role>`,
// with its role, its `data-scene-direction` stamp (absent before X.W5.d) and
// its computed transform duration. A hop with no observed region transition is
// an instant cut, and the gate reports it RED (`animated: false`) whatever the
// frame numbers read — the budget is only meaningful over a swap that moves.
//
// Usage:  node docs/tranches/V/megatranche/workflows/gates/scene-swap-budget.mjs
//         PROBE_BASE=http://localhost:8091 (default — the BUILT bundle, the
//         `smoke-perf` origin: a dev-server read charges Vite's on-demand
//         transform to the first swap, `e2e/smoke/perf/serve-built.mjs`).
//         PROBE_PRM=1 forces `prefers-reduced-motion: reduce` (gate D5's run):
//         the frame arm is still read; the motion arm then asserts every
//         observed region transition computes ≈0 duration instead.
//         PROBE_HEADED=1 launches HEADED Chromium on the host GPU (X.W5.d2 ·
//         COHESION §0ax ESC-W5t-1: the reading OF RECORD for D1; headless
//         Chromium rasterises and runs WebGL on the software path, SwiftShader,
//         a cost class the user never sees). The instrument, the hops, the
//         window and the budget are identical in both modes; the output names
//         the WebGL renderer the page actually got and the host's load
//         averages at launch, so a reading always carries its conditions.
// Output: one JSON document on stdout; exit 0 when every hop holds, 1 otherwise.

import { chromium } from "playwright-core";
import { loadavg } from "node:os";

const BASE = process.env.PROBE_BASE ?? "http://localhost:8091";
const PRM = process.env.PROBE_PRM === "1";
const HEADED = process.env.PROBE_HEADED === "1";
const WINDOW_MS = 900;
const HOPS = ["/gradient", "/extract", "/mix", "/generate"];
const BUDGET = { over32Ratio: 0.15, medianMs: 20 };

/** Arm one hop's instruments in the page: the rAF loop and the motion log. */
function arm() {
    const w = window;
    w.__ifd = [];
    w.__motion = [];
    let last = performance.now();
    const loop = () => {
        const n = performance.now();
        w.__ifd.push(n - last);
        last = n;
        if (w.__rec) requestAnimationFrame(loop);
    };
    w.__rec = true;
    requestAnimationFrame(loop);

    // The TRAVEL's duration: the computed duration paired (per the CSS list
    // cycling rule) with `transform` or `all` in `transition-property`, 0 when
    // transform is not transitioned at all. Reading the duration list alone
    // would report a reduced-motion opacity carve-out as travel.
    const travelMs = (cs) => {
        const props = cs.transitionProperty.split(",").map((t) => t.trim());
        const durs = cs.transitionDuration.split(",").map((t) => {
            const v = parseFloat(t);
            return t.trim().endsWith("ms") ? v : v * 1000;
        });
        let ms = 0;
        props.forEach((prop, i) => {
            if (prop === "transform" || prop === "all")
                ms = Math.max(ms, durs[i % durs.length]);
        });
        return ms;
    };
    w.__mo?.disconnect();
    w.__mo = new MutationObserver((records) => {
        for (const r of records) {
            const el = r.target;
            if (!(el instanceof Element)) continue;
            const phase = el.classList.contains("vj-enter-enter-active")
                ? "enter"
                : el.classList.contains("vj-enter-leave-active")
                  ? "leave"
                  : null;
            if (!phase) continue;
            const parent = el.parentElement;
            const role = [...(parent?.classList ?? [])]
                .map((c) => /^pane-wrapper--(stage|inspector|action)$/.exec(c)?.[1])
                .find(Boolean);
            if (!role) continue;
            if (w.__motion.some((m) => m.el === el && m.phase === phase)) continue;
            const cs = getComputedStyle(el);
            w.__motion.push({
                el,
                phase,
                role,
                direction: el.getAttribute("data-scene-direction"),
                transformMs: travelMs(cs),
                transform: cs.transform,
                // X.W5.d2 — the containment arm (§0ax ESC-W5d2-2): the
                // swap layer's computed `contain` while it travels.
                contain: cs.contain,
            });
        }
    });
    w.__mo.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
    });
}

/** Close one hop's window and read it back. */
function read() {
    const w = window;
    w.__rec = false;
    w.__mo?.disconnect();
    const d = w.__ifd.slice(2); // drop warm-up, as probe2 did
    const sorted = [...d].sort((a, b) => a - b);
    const over32 = d.filter((x) => x > 32).length;
    return {
        frames: d.length,
        max: Math.round(Math.max(0, ...d)),
        median: Math.round(sorted[Math.floor(sorted.length / 2)] || 0),
        over32,
        over50: d.filter((x) => x > 50).length,
        motion: w.__motion.map(({ el: _el, ...m }) => m),
    };
}

const loadAtLaunch = loadavg().map((l) => Number(l.toFixed(2)));
const browser = await chromium.launch({ headless: !HEADED });
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    deviceScaleFactor: 2,
    reducedMotion: PRM ? "reduce" : "no-preference",
});
await ctx.addInitScript(() => {
    try {
        localStorage.setItem("vueuse-color-scheme", "light");
    } catch {
        /* storage unavailable: the scheme falls back to the OS default */
    }
});
const page = await ctx.newPage();
await page.goto(`${BASE}/#/`, { waitUntil: "load" });
await page.waitForTimeout(2800);
const renderer = await page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
});

const hops = [];
for (const hash of HOPS) {
    await page.evaluate(arm);
    await page.goto(`${BASE}/#${hash}`, { waitUntil: "load" });
    await page.waitForTimeout(WINDOW_MS);
    const s = await page.evaluate(read);
    const ratio = s.frames ? s.over32 / s.frames : 1;
    const animated = s.motion.some((m) => m.phase === "enter");
    const motionHonest = PRM
        ? s.motion.every((m) => m.transformMs <= 1)
        : animated && s.motion.every((m) => m.transformMs > 0);
    const budget = ratio <= BUDGET.over32Ratio && s.median <= BUDGET.medianMs;
    hops.push({
        hop: `→${hash}`,
        ...s,
        over32Ratio: Number(ratio.toFixed(3)),
        budget,
        animated,
        motionHonest,
        pass: budget && motionHonest,
    });
    await page.waitForTimeout(400);
}
await browser.close();

const pass = hops.every((h) => h.pass);
console.log(
    JSON.stringify(
        {
            gate: "D1",
            probe: "scene-swap-budget.mjs",
            at: new Date().toISOString(),
            base: BASE,
            prm: PRM,
            headed: HEADED,
            renderer,
            loadAtLaunch,
            budget: BUDGET,
            hops,
            pass,
        },
        null,
        2,
    ),
);
process.exit(pass ? 0 : 1);
