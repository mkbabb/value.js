#!/usr/bin/env node
/**
 * Tranche-F Wave D2 MEASURE-FIRST gate — the SoA `lerpArray` primitive vs the
 * current AoS per-iv `lerpNumericValue` closure dispatch.
 *
 * The charter (re-pointed from r-interpolation-carrier): D1 monomorphization is
 * a measured NON-win (DO NOT ship); the lever is a flat SoA
 * `lerpArray(Float64Array start, Float64Array stop, t, out)` that eliminates the
 * AoS pointer-chase + the per-iv `_lerp` closure call. Measured there at
 * ~2.0× at K≥8, ~2.3× at K=64, ABSENT at K=1. This bench reproduces the gate on
 * THIS machine across representative K, so the land/withhold decision is made on
 * a local number, not an inherited assertion.
 *
 * Scenario AoS (current): K independent ivs, each a {value} cell mutated via a
 *   per-iv closure call `_lerp(t, iv)` — exactly `lerpNumericValue` shape.
 * Scenario SoA (D2): two Float64Arrays + one flat `lerpArray` loop.
 *
 * The land bar (charter): bites (≥ ~1.5×) at a REALISTIC K. K=1 (a 2-frame
 * opacity) is expected to be flat/negative — that is the whole point of
 * measure-first. JS-only — runs under plain `node ≥ 20`.
 *
 * Source ref: docs/tranches/F/valuejs-sota-handoff-v2.md Wave D2;
 *   docs/tranches/F/audit/vj-color-interp-aug.md §3.
 */

import { performance } from "node:perf_hooks";
// The shipped SoA primitive (Wave D2) — measured against the AoS baseline below.
// Requires a prior `npm run build`.
import { lerpArray } from "../dist/value.js";

const lerp = (a, b, t) => a + (b - a) * t;

// ─── AoS: K independent cells, each mutated through its own closure ─────────
function makeAoS(K) {
    const ivs = [];
    for (let i = 0; i < K; i++) {
        const iv = { start: { value: i * 0.01 }, stop: { value: 1 - i * 0.01 }, value: { value: 0 } };
        // Per-iv closure dispatch — the `_lerp` shape on the real iv.
        iv._lerp = (t, v) => { v.value.value = lerp(v.start.value, v.stop.value, t); };
        ivs.push(iv);
    }
    return ivs;
}
function runAoS(ivs, t) {
    for (let i = 0; i < ivs.length; i++) ivs[i]._lerp(t, ivs[i]);
}

// ─── SoA: two Float64Arrays + the shipped `lerpArray` primitive (D2) ────────
function makeSoA(K) {
    const start = new Float64Array(K);
    const stop = new Float64Array(K);
    const out = new Float64Array(K);
    for (let i = 0; i < K; i++) { start[i] = i * 0.01; stop[i] = 1 - i * 0.01; }
    return { start, stop, out };
}

const KS = [1, 2, 4, 8, 16, 32, 64];
const FRAMES = 2_000_000;
const WARMUP = 200_000;
const fmt = (n) => n.toFixed(2).padStart(7);

function bench(fn) {
    let sink = 0;
    for (let i = 0; i < WARMUP; i++) { fn((i % 100) / 100); sink++; }
    if (sink === Infinity) console.log("never");
    const t0 = performance.now();
    for (let i = 0; i < FRAMES; i++) fn((i % 100) / 100);
    const t1 = performance.now();
    return t1 - t0;
}

console.log(
    `\nTranche-F D2 MEASURE-FIRST — SoA lerpArray vs AoS per-iv closure` +
        `\n  ${FRAMES.toLocaleString()} frames/scenario per K\n`,
);
console.log(`     K    AoS(ms)   SoA(ms)   speedup`);
console.log(`  ─────────────────────────────────────`);
const rows = [];
for (const K of KS) {
    const ivs = makeAoS(K);
    const { start, stop, out } = makeSoA(K);
    const aos = bench((t) => runAoS(ivs, t));
    const soa = bench((t) => lerpArray(start, stop, t, out));
    const s = aos / soa;
    rows.push([K, s]);
    console.log(`  ${String(K).padStart(4)}   ${fmt(aos)}   ${fmt(soa)}   ${s.toFixed(2)}×`);
}
console.log();
console.log(`Decision substrate (charter land bar: bites ≥ ~1.5× at realistic K):`);
for (const [K, s] of rows) {
    const verdict = s >= 1.5 ? "BITES" : s >= 1.0 ? "flat" : "SLOWER";
    console.log(`  K=${String(K).padStart(2)}: ${s.toFixed(2)}×  ${verdict}`);
}
console.log();
