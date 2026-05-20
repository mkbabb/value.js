#!/usr/bin/env node
/**
 * D.W1 L8 microbenchmark — Color<T> channel-read speedup gate.
 *
 * Compares:
 *   Scenario A (pre-L8 baseline)   — Map<string, number> storage; getter does Map.get
 *   Scenario B (post-L8 transposed) — own-property storage (mirror of post-L8 RGBColor)
 *
 * The Scenario B class is a faithful inline mirror of the actual post-L8
 * `RGBColor` shape (own-property `r`/`g`/`b`/`alpha`; abstract `channels` getter;
 * the same constructor write pattern). The bench stays JS-only (no .ts import)
 * so it runs under plain `node ≥ 20` without a TS loader.
 *
 * The workload mirrors the actual `lerpColorValue` hot path: read all three
 * channels (r, g, b) from a sequence of distinct Color instances per
 * iteration. Reading multiple channels per instance + iterating across
 * distinct instances thwarts V8's call-site monomorphic-inlining of a single
 * Map.get path; it also faithfully represents the workload the L8 thesis
 * addresses (hidden-class stability across many Color instances).
 *
 * Acceptance: post-L8 median speedup ≥ 5× over Node ≥ 20.
 *
 * Source ref: docs/tranches/D/audit/D-REACTIVITY-B-instant.md §7(d)
 */

import { performance } from "node:perf_hooks";

// ─── Scenario A: pre-L8 baseline (Map-backed channels) ──────────────────────
class PreL8RGBColor {
    constructor(r, g, b, alpha = 1) {
        this.components = new Map();
        this.components.set("r", r);
        this.components.set("g", g);
        this.components.set("b", b);
        this.alpha = alpha;
    }
    get r() {
        return this.components.get("r");
    }
    get g() {
        return this.components.get("g");
    }
    get b() {
        return this.components.get("b");
    }
}

// ─── Scenario B: post-L8 own-property storage (mirror of src/units/color/index.ts) ──
const _RGB_CHANNELS = ["r", "g", "b"];
class PostL8Color {
    constructor(colorSpace, alpha = 1) {
        this.colorSpace = colorSpace;
        this.alpha = alpha;
    }
}
class PostL8RGBColor extends PostL8Color {
    constructor(r, g, b, alpha) {
        super("rgb", alpha);
        this.r = r;
        this.g = g;
        this.b = b;
    }
    get channels() {
        return _RGB_CHANNELS;
    }
}

// ─── Configuration ──────────────────────────────────────────────────────────
const INSTANCES = 256; // pool of distinct Color instances
const ITERATIONS = 100_000; // outer iteration count
// total reads per channel = INSTANCES * ITERATIONS = 25.6M
const WARMUP_OUTER = 5_000;
const TARGET_SPEEDUP = 5;

const fmt = (ms) => ms.toFixed(3).padStart(8) + " ms";

// Pre-allocate distinct instance pools so V8 can't fold to a single
// monomorphic site that returns the same value.
function makePoolA() {
    const out = new Array(INSTANCES);
    for (let i = 0; i < INSTANCES; i++) {
        out[i] = new PreL8RGBColor(i / INSTANCES, (i * 7) % 256 / 256, (i * 13) % 256 / 256);
    }
    return out;
}
function makePoolB() {
    const out = new Array(INSTANCES);
    for (let i = 0; i < INSTANCES; i++) {
        out[i] = new PostL8RGBColor(i / INSTANCES, (i * 7) % 256 / 256, (i * 13) % 256 / 256, 1);
    }
    return out;
}

// ─── Hot-loop kernels ───────────────────────────────────────────────────────
// Reads all three channels per instance (mirrors lerpColorValue).
function readAllPreL8(pool) {
    let acc = 0;
    for (let i = 0; i < INSTANCES; i++) {
        const c = pool[i];
        acc += c.r + c.g + c.b;
    }
    return acc;
}
function readAllPostL8(pool) {
    let acc = 0;
    for (let i = 0; i < INSTANCES; i++) {
        const c = pool[i];
        acc += c.r + c.g + c.b;
    }
    return acc;
}

// ─── Bench harness ──────────────────────────────────────────────────────────
function bench(label, kernel, pool) {
    // Warmup — let V8 settle hidden classes / inline caches.
    let sink = 0;
    for (let i = 0; i < WARMUP_OUTER; i++) sink += kernel(pool);
    if (sink === Infinity) console.log("never"); // prevent DCE

    const t0 = performance.now();
    let total = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        total += kernel(pool);
    }
    const t1 = performance.now();
    if (total === Infinity) console.log("never");
    const ms = t1 - t0;
    console.log(`  ${label}: ${fmt(ms)}  (sink=${total.toFixed(1)})`);
    return ms;
}

console.log(
    `\nD.W1 L8 — Color channel-access microbenchmark` +
        `\n  instances=${INSTANCES}, outer-iter=${ITERATIONS.toLocaleString()},` +
        ` total channel reads/scenario = ${(INSTANCES * ITERATIONS * 3).toLocaleString()},` +
        `\n  target speedup: ≥ ${TARGET_SPEEDUP}×\n`,
);

const runs = [];
for (let run = 1; run <= 3; run++) {
    console.log(`Run ${run}:`);
    const poolA = makePoolA();
    const poolB = makePoolB();

    const msA = bench("Scenario A (pre-L8: Map.get)    ", readAllPreL8, poolA);
    const msB = bench("Scenario B (post-L8: own-prop)  ", readAllPostL8, poolB);
    const speedup = msA / msB;
    console.log(`  speedup: ${speedup.toFixed(2)}×\n`);
    runs.push({ msA, msB, speedup });
}

const speedups = runs.map((r) => r.speedup).sort((x, y) => x - y);
const median = speedups[1];
const pass = median >= TARGET_SPEEDUP;

console.log(`Summary:`);
console.log(`  speedups (sorted): ${speedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  median speedup:    ${median.toFixed(2)}×`);
console.log(`  target:            ≥ ${TARGET_SPEEDUP}×`);
console.log(`  verdict:           ${pass ? "PASS" : "FAIL"}`);
console.log();

process.exit(pass ? 0 : 1);
