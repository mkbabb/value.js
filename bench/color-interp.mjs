#!/usr/bin/env node
/**
 * Tranche-F color-interpolation bench — the measure-first gate substrate the
 * charter names as ABSENT on both repos (the single most expensive per-frame
 * lane, ~40× a numeric prop, was unmeasured). Benches the REAL built code path
 * (dist/value.js): the B3 frozen-channel-plan fast loop vs the unplanned
 * fallback walk (the pre-B3 shape — fresh keys()/forEach-closure/unwrapDeep
 * every frame), over hex / rgb / oklch / hsl endpoints.
 *
 * Both ivs are produced by the real `normalizeValueUnits`; the fast one is
 * `prepareInterpVar`-ed (carries `_colorPlan`), the baseline has its plan
 * deleted so `lerpColorValue` takes the fallback walk — an apples-to-apples
 * comparison of the SAME engine code on the SAME endpoints.
 *
 * Acceptance: median B3 speedup ≥ 2× across the color families. Requires a prior
 * `npm run build` (imports dist). JS-only — runs under plain `node ≥ 20`.
 *
 * Source ref: docs/tranches/F/valuejs-sota-handoff-v2.md Wave B3 / §MEASURE-FIRST;
 *   docs/tranches/F/audit/vj-color-interp-aug.md §2.2, §2.7.
 */

import { performance } from "node:perf_hooks";
import {
    normalizeValueUnits,
    prepareInterpVar,
    lerpColorValue,
    parseCSSColor,
} from "../dist/value.js";

const CASES = [
    ["#ff0000", "#0000ff", "rgb", "hex/rgb"],
    ["rgb(255 128 0)", "rgb(0 200 255)", "rgb", "rgb"],
    ["oklch(0.7 0.15 30)", "oklch(0.4 0.2 280)", "oklch", "oklch (hue)"],
    ["hsl(20 80% 40%)", "hsl(300 50% 70%)", "hsl", "hsl (hue)"],
];

const ITERATIONS = 2_000_000;
const WARMUP = 200_000;
const TARGET = 2;
const fmt = (n) => n.toFixed(1).padStart(7) + " ns";

function makeIvs(a, b, space) {
    const A = parseCSSColor(a);
    const B = parseCSSColor(b);
    const planned = normalizeValueUnits(A, B, { colorSpace: space });
    prepareInterpVar(planned); // builds _colorPlan
    const fallback = normalizeValueUnits(A, B, { colorSpace: space });
    delete fallback._colorPlan; // force the pre-B3 walk
    delete fallback._lerp;
    return { planned, fallback };
}

function run(label, iv) {
    let sink = 0;
    for (let i = 0; i < WARMUP; i++) sink += lerpColorValue((i % 100) / 100, iv).value ? 0 : 1;
    if (sink === Infinity) console.log("never");
    const t0 = performance.now();
    for (let i = 0; i < ITERATIONS; i++) sink += lerpColorValue((i % 100) / 100, iv).value ? 0 : 1;
    const t1 = performance.now();
    if (sink === Infinity) console.log("never");
    const ns = ((t1 - t0) * 1e6) / ITERATIONS;
    console.log(`    ${label}: ${fmt(ns)}/frame`);
    return ns;
}

console.log(
    `\nTranche-F color-interp bench — B3 frozen plan vs fallback walk` +
        `\n  ${ITERATIONS.toLocaleString()} frames/scenario; target ≥ ${TARGET}×\n`,
);

const speedups = [];
for (const [a, b, space, label] of CASES) {
    console.log(`  ${label}  (${a} → ${b}, ${space}):`);
    const { planned, fallback } = makeIvs(a, b, space);
    const fbNs = run("fallback walk (pre-B3)", fallback);
    const planNs = run("frozen plan  (B3)    ", planned);
    const s = fbNs / planNs;
    console.log(`    speedup: ${s.toFixed(2)}×\n`);
    speedups.push(s);
}

const sorted = [...speedups].sort((x, y) => x - y);
const median = sorted[Math.floor(sorted.length / 2)];
const pass = median >= TARGET;
console.log(`Summary:`);
console.log(`  speedups: ${speedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  median:   ${median.toFixed(2)}×   (target ≥ ${TARGET}×)`);
console.log(`  verdict:  ${pass ? "PASS" : "FAIL"}\n`);
process.exit(pass ? 0 : 1);
