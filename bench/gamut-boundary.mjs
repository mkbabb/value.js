#!/usr/bin/env node
/**
 * R.W1.5 gamut-boundary sampler bench — the number rides to R/FINAL.md.
 *
 * Measures `sampleGamutBoundaryInto` (the 0-alloc rAF twin) at the contract
 * config 96 columns / jnd / display-p3, plus the allocating form and the other
 * wide targets, through the BUILT `dist/subpaths/color.js` subpath (O.W2). No standing
 * threshold script (the retired `proof:*` discipline) — the contract ceiling is
 * 0.5 ms mean; the recorded number goes in R.W1's FINAL.md.
 *
 * Requires a prior `npm run build`.
 */

import { performance } from "node:perf_hooks";
import { sampleGamutBoundary, sampleGamutBoundaryInto } from "../dist/subpaths/color.js";

const ITERS = 20000;
const WARMUP = 4000;

/** Time `fn` over ITERS calls (after WARMUP), returning { mean, p95 } in ms. */
function timeCall(fn) {
    for (let i = 0; i < WARMUP; i++) fn(i);
    const samples = new Float64Array(ITERS);
    for (let i = 0; i < ITERS; i++) {
        const t0 = performance.now();
        fn(i);
        samples[i] = performance.now() - t0;
    }
    let sum = 0;
    for (let i = 0; i < ITERS; i++) sum += samples[i];
    const sorted = Array.from(samples).sort((a, b) => a - b);
    return { mean: sum / ITERS, p95: sorted[Math.floor(ITERS * 0.95)] };
}

const out = { points: new Float64Array(2 * (96 + 2)), count: 0, oogTopFrac: 0 };

// Sweep the hue continuously (1.2°/frame — the prototype's drag rate) so the
// bench exercises the tip-scan + column-bisection across the whole plate.
const intoContract = timeCall((i) =>
    sampleGamutBoundaryInto((i * 1.2) % 360, "display-p3", out),
);
const alloc = timeCall((i) => sampleGamutBoundary((i * 1.2) % 360, "display-p3"));
const rec2020 = timeCall((i) => sampleGamutBoundaryInto((i * 1.2) % 360, "rec2020", out));
const raw = timeCall((i) =>
    sampleGamutBoundaryInto((i * 1.2) % 360, "display-p3", out, { mode: "raw" }),
);

const ms = (x) => x.toFixed(4);
console.log("gamut-boundary sampler — 96 columns, hue-drag sweep\n");
console.log(`  Into  96/jnd/display-p3 : mean ${ms(intoContract.mean)} ms · p95 ${ms(intoContract.p95)} ms   [contract ceiling 0.5 ms]`);
console.log(`  alloc 96/jnd/display-p3 : mean ${ms(alloc.mean)} ms · p95 ${ms(alloc.p95)} ms`);
console.log(`  Into  96/jnd/rec2020    : mean ${ms(rec2020.mean)} ms · p95 ${ms(rec2020.p95)} ms`);
console.log(`  Into  96/raw/display-p3 : mean ${ms(raw.mean)} ms · p95 ${ms(raw.p95)} ms`);

const headline = intoContract.mean;
console.log(
    `\nHEADLINE (Into 96/jnd/display-p3 mean): ${ms(headline)} ms — ${headline < 0.5 ? "UNDER" : "OVER"} the 0.5 ms contract ceiling`,
);
