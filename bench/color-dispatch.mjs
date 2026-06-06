#!/usr/bin/env node
/**
 * Tranche-F Wave A1 microbenchmark — the 14-way color `any(...)` fork →
 * O(1) first-char `dispatch(table)` speedup gate.
 *
 * Compares (both built from the real `@mkbabb/parse-that` combinators, so the
 * bench measures the actual engine, not a hand-rolled approximation):
 *
 *   Scenario A (pre): `any(p0, p1, …, p13)` — 14 speculative trials in order.
 *     A bare `xyz(...)` color (`xyzParser`, position 12 of 14) fails 12
 *     speculative descents first; a named color (last) fails 13.
 *   Scenario B (post): `dispatch({ '#': hex, 'r': rgb, 'o': okl…, … })` —
 *     one charCode index then the single right bucket (the shape now in
 *     src/parsing/color.ts).
 *
 * Each leaf is a `string(prefix).map(...)`-shaped recogniser that consumes its
 * family token — faithfully reproducing the per-arm cost (`mergeErrorState`
 * + offset save/restore) that `any()` pays on every miss. The pool mixes
 * early-bucket and late-bucket inputs so the bench reflects the real branch-
 * position spread (`p-parse-perf-F`: ~3.65× tail, ~6× branch-position spread).
 *
 * Acceptance: median dispatch speedup ≥ 2× over the in-order `any()` on a
 * representative pool. JS-only — runs under plain `node ≥ 20`.
 *
 * Source ref: docs/tranches/F/valuejs-sota-handoff-v2.md Wave A1;
 *   docs/tranches/F/audit/vj-parser-aug.md §2.1; bench/parser-namelookup.mjs.
 */

import { performance } from "node:perf_hooks";
import { any, dispatch, regex } from "@mkbabb/parse-that";

// ─── Leaf recognisers — one per color family, real parse-that leaves ───────
// Each matches its functional-color head token. Faithful to the actual fork
// where each arm tries a distinct prefix and either consumes or fails.
const mk = (re) => regex(re);

const hex = mk(/#[0-9a-fA-F]{3,8}/);
const kelvin = mk(/-?\d+(\.\d+)?k/i);
const colorMix = mk(/color-mix\([^)]*\)/i);
const colorFunction = mk(/color\([^)]*\)/i);
const rgbParser = mk(/rgba?\([^)]*\)/i);
const hslParser = mk(/hsla?\([^)]*\)/i);
const hsvParser = mk(/hsva?\([^)]*\)/i);
const hwbParser = mk(/hwb\([^)]*\)/i);
const labParser = mk(/lab\([^)]*\)/i);
const lchParser = mk(/lch\([^)]*\)/i);
const oklabParser = mk(/oklab\([^)]*\)/i);
const oklchParser = mk(/oklch\([^)]*\)/i);
const xyzParser = mk(/xyz\([^)]*\)/i);
const nameParser = mk(/[a-zA-Z][a-zA-Z0-9-]*/);

// ─── Scenario A: the in-order 14-way any() ─────────────────────────────────
const valueAny = any(
    colorMix, colorFunction, hex, kelvin, rgbParser, hslParser, hsvParser,
    hwbParser, labParser, lchParser, oklabParser, oklchParser, xyzParser,
    nameParser,
);

// ─── Scenario B: O(1) first-char dispatch (the landed shape) ───────────────
const table = {
    "#": hex,
    "0-9": kelvin,
    "+": kelvin,
    "-": kelvin,
    ".": kelvin,
    c: any(colorMix, colorFunction, nameParser),
    r: any(rgbParser, nameParser),
    h: any(hslParser, hsvParser, hwbParser, nameParser),
    l: any(labParser, lchParser, nameParser),
    o: any(oklabParser, oklchParser, nameParser),
    x: any(xyzParser, nameParser),
};
const DISCRIMINATING = new Set(["c", "r", "h", "l", "o", "x"]);
for (let cc = 97; cc <= 122; cc++) {
    const lower = String.fromCharCode(cc);
    const upper = lower.toUpperCase();
    if (DISCRIMINATING.has(lower)) table[upper] = table[lower];
    else { table[lower] = nameParser; table[upper] = nameParser; }
}
const valueDispatch = dispatch(table);

// ─── Workload pool — early + late bucket spread ────────────────────────────
const POOL = [
    "#ff8800", "6500k", "rgb(255 0 0)", "rgba(0 255 0 / .5)",
    "hsl(120 50% 50%)", "hwb(120 10% 20%)", "lab(50 20 -30)",
    "lch(50 30 120)", "oklab(0.5 0.1 -0.1)", "oklch(0.7 0.15 180)",
    "xyz(0.5 0.5 0.5)", "color(display-p3 1 0 0)",
    "color-mix(in oklab, red, blue)", "red", "rebeccapurple", "hotpink",
    "lavender", "orange", "olive", "coral", "cyan", "transparent", "navy",
    "xyz(1 1 1)", "olivedrab", "orchid",
];

const ITERATIONS = 60_000;
const WARMUP = 4_000;
const TARGET = 2;
const fmt = (ms) => ms.toFixed(3).padStart(8) + " ms";

function readAll(parser, pool) {
    let n = 0;
    for (let i = 0; i < pool.length; i++) {
        const st = parser.parseState(pool[i]);
        if (!st.isError) n++;
    }
    return n;
}

function bench(label, parser) {
    let sink = 0;
    for (let i = 0; i < WARMUP; i++) sink += readAll(parser, POOL);
    if (sink === Infinity) console.log("never");
    const t0 = performance.now();
    let total = 0;
    for (let i = 0; i < ITERATIONS; i++) total += readAll(parser, POOL);
    const t1 = performance.now();
    if (total === Infinity) console.log("never");
    const ms = t1 - t0;
    console.log(`  ${label}: ${fmt(ms)}  (ok=${total.toLocaleString()})`);
    return ms;
}

console.log(
    `\nTranche-F A1 — color any() → dispatch() microbenchmark` +
        `\n  pool=${POOL.length} inputs, outer-iter=${ITERATIONS.toLocaleString()},` +
        ` total parses/scenario = ${(POOL.length * ITERATIONS).toLocaleString()}` +
        `\n  14-way any() → 1 charCode index + 1 bucket; target ≥ ${TARGET}×\n`,
);

const runs = [];
for (let run = 1; run <= 3; run++) {
    console.log(`Run ${run}:`);
    const msA = bench("Scenario A (pre: 14-way any())     ", valueAny);
    const msB = bench("Scenario B (post: dispatch table)  ", valueDispatch);
    const speedup = msA / msB;
    console.log(`  speedup: ${speedup.toFixed(2)}×\n`);
    runs.push(speedup);
}

const sorted = runs.sort((a, b) => a - b);
const median = sorted[1];
const pass = median >= TARGET;
console.log(`Summary:`);
console.log(`  speedups (sorted): ${sorted.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  median speedup:    ${median.toFixed(2)}×`);
console.log(`  target:            ≥ ${TARGET}×`);
console.log(`  verdict:           ${pass ? "PASS" : "FAIL"}`);
console.log();
process.exit(pass ? 0 : 1);
