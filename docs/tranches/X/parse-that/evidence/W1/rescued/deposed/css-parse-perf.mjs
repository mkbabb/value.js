// O.W6 — CSS-parse throughput bench (MEASURE-FIRST).
//
// Measures REAL parse throughput against the BUILT `dist/value.js`:
//   1. value-parser   — CSSValues.Value.parse over a 10-string value corpus
//                       (covers every Function_ dispatch branch). NOTE: the
//                       public `parseCSSValue` is memoised, so it would measure
//                       a Map lookup, not parse work. We call the underlying
//                       `CSSValues.Value` parser directly — the exact S2/S3
//                       hot path — to measure genuine parse throughput.
//   2. stylesheet     — parseCSSStylesheet over a ~5-rule sheet (also not
//                       memoised at the parser level; we vary nothing and the
//                       function re-parses each call).
//   3. mixColors-gamut — gamutMap over an OOG display-p3 color (the O.W3
//                       gamut-map co-target — the bisection hot path; reported
//                       as ns/call). This is the exact path O.W3 de-allocated
//                       and S4 conditionally unrolls; the gate uses it as the
//                       C3 regression guard.
//
// Output: a structured baseline table (MB/s for parser scenarios, ns/call for
// the gamut scenario). Used both standalone (`node bench/css-parse-perf.mjs`)
// and by the gate (`scripts/proof-perf-target.mjs`, which imports `runBench`).

import {
    CSSValues,
    parseCSSStylesheet,
    gamutMap,
    DisplayP3Color,
} from "../dist/value.js";

const N = 1000;

// ── Scenario 1: value-parser corpus (every Function_ dispatch branch) ──────
const VALUE_CORPUS = [
    "oklch(0.7 0.15 30)",
    "linear(0, 0.5 50%, 1)",
    "linear-gradient(to right, red, blue)",
    "translateX(100px)",
    "calc(100% - 2rem)",
    "var(--color, red)",
    "cubic-bezier(0.42, 0, 0.58, 1)",
    "42px",
    "blue",
    "spring(1, 100, 10, 0)",
];
const VALUE_BYTES = VALUE_CORPUS.reduce((s, v) => s + v.length, 0);

// ── Scenario 2: stylesheet corpus (5 rules) ────────────────────────────────
const STYLESHEET = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@layer base { .box { color: red; } }
@media (min-width: 600px) { .grid { display: grid; } }
.card { padding: 1rem; background: oklch(0.7 0.15 30); }
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }`;
const STYLESHEET_BYTES = STYLESHEET.length;

// ── Scenario 3: gamutMap on an OOG display-p3 color (the bisection path) ────
// A far-OOG component forces the full bisection loop (NOT the JND fast-path) —
// the worst-case path O.W3 de-allocated and S4 conditionally unrolls.
const OOG_P3 = new DisplayP3Color(1.2, 0.3, 0.5, 1);

function bench(fn, iterations) {
    // warm-up — let V8 tier up before timing.
    for (let i = 0; i < 50; i++) fn();
    const t0 = performance.now();
    for (let i = 0; i < iterations; i++) fn();
    const t1 = performance.now();
    return t1 - t0; // ms
}

export function runBench() {
    const ValueParser = CSSValues.Value;

    // value-parser MB/s
    const valueMs = bench(() => {
        for (let i = 0; i < VALUE_CORPUS.length; i++) {
            ValueParser.parse(VALUE_CORPUS[i]);
        }
    }, N);
    const valueMBs =
        (VALUE_BYTES * N) / 1e6 / (valueMs / 1000);

    // stylesheet-parser MB/s — `parseCSSStylesheet` is memoised, so we clear
    // its cache each call to measure REAL parse work (not a Map lookup). The
    // `.cache` Map is exposed by `memoize` (src/utils.ts).
    const sheetCache = parseCSSStylesheet.cache;
    const sheetMs = bench(() => {
        sheetCache.clear();
        parseCSSStylesheet(STYLESHEET);
    }, N);
    const sheetMBs =
        (STYLESHEET_BYTES * N) / 1e6 / (sheetMs / 1000);

    // gamut-map ns/call (the bisection hot path)
    const gamutIters = N * 10;
    const gamutMs = bench(() => {
        gamutMap(OOG_P3, "display-p3");
    }, gamutIters);
    const gamutNs = (gamutMs * 1e6) / gamutIters;

    return {
        valueMBs,
        sheetMBs,
        gamutNs,
    };
}

function printTable(r) {
    const fmt = (n) => n.toFixed(1).padStart(8);
    console.log("scenario            baseline  MB/s");
    console.log(`value-parser        ${fmt(r.valueMBs)}`);
    console.log(`stylesheet-parser   ${fmt(r.sheetMBs)}`);
    console.log(`mixColors-gamut     ${fmt(r.gamutNs)}   (ns/call)`);
}

// Standalone run: print the table. (No exit-1 here — the GATE owns the
// pass/fail decision; this bench is the measurement instrument.)
if (import.meta.url === `file://${process.argv[1]}`) {
    const r = runBench();
    printTable(r);
}
