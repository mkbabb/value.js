#!/usr/bin/env node
/**
 * Tranche-F Wave C1 MEASURE-FIRST gate — the computed-unit endpoint cache vs
 * the per-frame re-resolve + memo-key-rebuild baseline.
 *
 * The audit (docs/tranches/F/audit/vj-units-compute-aug.md §2) sizes the win:
 * `lerpComputedValue` re-resolves BOTH endpoints every frame, and the
 * `getComputedValue` memo re-SERIALISES its key (`value.toString()`) + reads
 * `Date.now()` on every HIT, to retrieve an O(1)-invariant pair —
 * ~190 ns/leaf/frame (current) → ~1.2 ns (C1, bare lerp of cached endpoints).
 *
 * This bench models the steady-state leaf shape on THIS machine so the
 * land/withhold number is local, not inherited. Pure JS (no DOM): the
 * `getComputedStyle` round-trip is absorbed by the memo after frame 0 in BOTH
 * variants, so the modelled BASELINE per-frame cost is exactly the residual the
 * audit names — the key rebuild + 2× Map probe + Date.now() per leaf per frame;
 * the C1 variant is a bare lerp of two cached numbers. Runs under `node ≥ 20`.
 *
 * Source ref: docs/tranches/F/audit/vj-units-compute-aug.md §2 (C1/C2/C4);
 *   docs/tranches/F/waves/F.W6.md §2.
 */

import { performance } from "node:perf_hooks";

const lerp = (a, b, t) => a + (b - a) * t;

// ─── BASELINE: per-frame re-resolve through the memo (current pre-C1) ───────
//
// The steady-state HIT cost the audit measured: build the key
// (`value.toString()` ×2 — modelled as the `calc(…)` concat), read Date.now(),
// probe the Map twice (has + get) per endpoint, then lerp the retrieved pair.
function makeBaseline() {
    // Two endpoint ValueUnit-likes with a toString that concats (the real
    // `calc(${value})` / `var(${value})` shape).
    const start = { value: "100cqw - 100%", unit: "calc", toString() { return `calc(${this.value})`; } };
    const stop = { value: "0px", unit: "px", toString() { return `${this.value}px`; } };
    const cache = new Map();
    cache.set(`${start.toString()}-0`, { value: 480, timestamp: 0 });
    cache.set(`${stop.toString()}-0`, { value: 0, timestamp: 0 });
    const out = { value: 0, unit: "px" };
    return { start, stop, cache, out };
}
function runBaseline({ start, stop, cache, out }, t) {
    // start endpoint resolve (memo HIT path, pre-C1/C2/C4)
    const kS = `${start.toString()}-0`;
    void Date.now();
    let sN = 0;
    if (cache.has(kS)) sN = cache.get(kS).value;
    // stop endpoint resolve (memo HIT path)
    const kE = `${stop.toString()}-0`;
    void Date.now();
    let eN = 0;
    if (cache.has(kE)) eN = cache.get(kE).value;
    out.value = lerp(sN, eN, t);
}

// ─── C1: bare lerp of the cached endpoints stamped on the iv ────────────────
function makeC1() {
    return { _cache: { startN: 480, stopN: 0, unit: "px", epoch: 0 }, out: { value: 0, unit: "px" } };
}
let GLOBAL_EPOCH = 0;
function runC1({ _cache, out }, t) {
    // The steady-state fast path: epoch check (one int compare) + bare lerp.
    if (_cache.epoch === GLOBAL_EPOCH) {
        out.value = lerp(_cache.startN, _cache.stopN, t);
    }
}

const FRAMES = 5_000_000;
const WARMUP = 500_000;
const fmt = (n) => n.toFixed(3).padStart(9);

function bench(make, run) {
    const ctx = make();
    for (let i = 0; i < WARMUP; i++) run(ctx, (i % 100) / 100);
    const t0 = performance.now();
    for (let i = 0; i < FRAMES; i++) run(ctx, (i % 100) / 100);
    const t1 = performance.now();
    return ((t1 - t0) * 1e6) / FRAMES; // ns/leaf/frame
}

console.log(
    `\nTranche-F C1 MEASURE-FIRST — computed-endpoint cache vs per-frame re-resolve` +
        `\n  ${FRAMES.toLocaleString()} frames/scenario\n`,
);
const base = bench(makeBaseline, runBaseline);
const c1 = bench(makeC1, runC1);
console.log(`  baseline (key rebuild + 2× Map probe + Date.now()/leaf):  ${fmt(base)} ns/leaf/frame`);
console.log(`  C1 (epoch check + bare lerp of cached endpoints):          ${fmt(c1)} ns/leaf/frame`);
console.log();
const cut = (1 - c1 / base) * 100;
console.log(`  reduction: ${cut.toFixed(1)}%  (audit claim: ~99.3%)`);
console.log(`  verdict: ${cut >= 90 ? "BITES (≥90% cut)" : cut >= 50 ? "partial" : "FLAT"}`);
console.log();
