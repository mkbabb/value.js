#!/usr/bin/env node
// bench/color-soa-fold.mjs — VJ-Q8 (1.2.0) MEASURE-FIRST record.
//
// The grounding measurement behind the `ColorChannelPlan` + `lerpColorChannels`
// SoA surface: a Float64 buffer fold over K oklab color leaves vs the boxed
// per-element `Color` lerp. The kf-side Amdahl-slice authorization (the color
// tail is a non-trivial frame slice) is the CONSUMER's gate per
// KF-TO-VALUEJS-Q.md VJ-Q8; this records the value.js-side fold-win signal.
//
// Reads the BUILT dist — run `npm run build` first.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distMain = resolve(__dirname, "..", "dist", "value.js");

const {
    OKLABColor,
    lerp,
    buildColorChannelPlan,
    packColorChannels,
    lerpColorChannels,
} = await import(distMain);

const K = 64; // K color leaves in a compositor frame
const FRAMES = 5000;

const startColors = Array.from({ length: K }, (_, i) => new OKLABColor(0.3 + i * 0.001, 0.1, -0.05, 1));
const stopColors = Array.from({ length: K }, (_, i) => new OKLABColor(0.7 - i * 0.001, -0.1, 0.05, 1));

// Boxed: per-leaf Color objects + a fresh result Color per leaf per frame.
function boxedFrame(t) {
    const out = new Array(K);
    for (let k = 0; k < K; k++) {
        const s = startColors[k];
        const e = stopColors[k];
        out[k] = new OKLABColor(
            lerp(+s.l, +e.l, t),
            lerp(+s.a, +e.a, t),
            lerp(+s.b, +e.b, t),
            lerp(+s.alpha, +e.alpha, t),
        );
    }
    return out;
}

// SoA: contiguous Float64Array via the published plan + fold.
const plan = buildColorChannelPlan(startColors[0]);
const startBuf = new Float64Array(K * plan.stride);
const stopBuf = new Float64Array(K * plan.stride);
const outBuf = new Float64Array(K * plan.stride);
for (let k = 0; k < K; k++) {
    packColorChannels(startColors[k], plan, startBuf, k);
    packColorChannels(stopColors[k], plan, stopBuf, k);
}
function soaFrame(t) {
    lerpColorChannels(t, startBuf, stopBuf, outBuf, plan);
}

// Warm.
for (let f = 0; f < 1000; f++) {
    boxedFrame(f / 1000);
    soaFrame(f / 1000);
}

let tB = performance.now();
for (let f = 0; f < FRAMES; f++) boxedFrame((f % 100) / 100);
tB = performance.now() - tB;

let tS = performance.now();
for (let f = 0; f < FRAMES; f++) soaFrame((f % 100) / 100);
tS = performance.now() - tS;

console.log(`bench:color-soa-fold — K=${K} oklab leaves × ${FRAMES} frames`);
console.log(`  boxed Color lerp: ${tB.toFixed(1)}ms (${((tB / FRAMES) * 1000).toFixed(2)}µs/frame)`);
console.log(`  SoA Float64 fold: ${tS.toFixed(1)}ms (${((tS / FRAMES) * 1000).toFixed(2)}µs/frame)`);
console.log(`  fold speedup:     ${(tB / tS).toFixed(2)}×`);
