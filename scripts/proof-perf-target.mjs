#!/usr/bin/env node
// proof:perf-target — value.js O.W6 gate (born-RED, MEASURE-FIRST).
//
// THE REAL OBSERVABLE (NOT a proxy): the value-level / stylesheet parser
// throughput in MB/s, measured against the BUILT `dist/value.js` over a real
// byte corpus. Animation-data parsing is on the critical path for editor
// integrations and the keyframes.js frame-compiler; a `dispatch()` table that
// routes to the same slow chain, or a scanner harvest that doesn't cut regex
// overhead, fails C1/C2 on the runtime number. No source-grep, no type
// assertion stands between this gate and the wall-clock MB/s.
//
// ─────────────────────────────────────────────────────────────────────────────
// MEASURE-FIRST baseline (recorded on the PRE-CURE tree — branch o6-perf off
// tranche-o 0.16.0, BEFORE S2/S3 landed; the `src/parsing/{utils,index}.ts`
// changes stashed, `npm run build`, then `bench/css-parse-perf.mjs` × 10, median):
//
//   scenario            baseline (median of 10)
//   value-parser         4.55 MB/s
//   stylesheet-parser    9.40 MB/s
//   mixColors-gamut      3857 ns/call
//
// AFTER-CURE (S2 byte-loop scanners + S3 first-char dispatch table; same harness,
// median of 10–15, reproduced A/B/A to rule out machine drift):
//
//   scenario            after-cure (median)   honest factor
//   value-parser         5.60–5.72 MB/s        ×1.23–1.26
//   stylesheet-parser    11.9–12.2 MB/s        ×1.27–1.30
//   mixColors-gamut      3747–3941 ns/call      ~flat (no regression — S4 NO-OP)
//
// S4 DECISION (documented NO-OP): O.W3 already de-allocated the gamut bisection
// (proof:gamut-alloc 104→≈84 allocs/call). S2/S3 do not touch the color path; the
// bench shows the gamut scenario flat within noise (NOT the bottleneck — the
// parser scenarios at 5–12 MB/s are). Per the wave spec's conditional clause, S4
// is a recorded NO-OP: no inline of `directOklchToRgb`. The C3 guard below only
// protects against an accidental gamut regression.
//
// THRESHOLD DERIVATION (set at gate-authoring time from the baseline above):
//   IMPROVEMENT_FACTOR = 1.15 (a clear-bottleneck-but-conservative floor; the
//     honest achieved gain is +23–27%, so 1.15 is met with comfortable margin
//     while staying robustly ABOVE the baseline — the gate is born-RED on the
//     pre-cure tree, GREEN after the cure).
//   REGRESSION_GUARD   = 1.10 (the gamut ns/call must not regress >10% from the
//     O.W3 post-cure baseline — O.W6 must not undo O.W3's alloc wins).
// ─────────────────────────────────────────────────────────────────────────────

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distValue = resolve(root, "dist/value.js");

console.log("proof:perf-target — CSS-parse throughput on the BUILT dist\n");

if (!existsSync(distValue)) {
    console.log("  FAIL  C0  dist/value.js missing — run `npm run build` first");
    process.exit(1);
}

// ── Recorded baselines (median of 10, pre-cure) ──
const BASELINE_VALUE_PARSER_MBS = 4.55;
const BASELINE_STYLESHEET_PARSER_MBS = 9.4;
const BASELINE_GAMUT_NS = 3857;

const IMPROVEMENT_FACTOR = 1.15;
const REGRESSION_GUARD = 1.1;

const VALUE_PARSER_TARGET = BASELINE_VALUE_PARSER_MBS * IMPROVEMENT_FACTOR; // 5.23
const STYLESHEET_PARSER_TARGET = BASELINE_STYLESHEET_PARSER_MBS * IMPROVEMENT_FACTOR; // 10.81
const GAMUT_NS_TARGET = BASELINE_GAMUT_NS * REGRESSION_GUARD; // 4243

// Run the bench several times and take the MEDIAN — MB/s on a shared CI box is
// noisy; the median is robust to a stray slow sample without inflating the
// reading the way a max would.
const { runBench } = await import(resolve(root, "bench/css-parse-perf.mjs"));

const SAMPLES = 9;
const vs = [];
const ss = [];
const gs = [];
for (let i = 0; i < SAMPLES; i++) {
    const r = runBench();
    vs.push(r.valueMBs);
    ss.push(r.sheetMBs);
    gs.push(r.gamutNs);
}
const median = (a) => {
    const s = [...a].sort((x, y) => x - y);
    return s[Math.floor(s.length / 2)];
};
const valueMBs = median(vs);
const sheetMBs = median(ss);
const gamutNs = median(gs);

const results = [];
const record = (id, label, ok, detail) => {
    results.push({ id, ok });
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${id}  ${label}`);
    if (detail) console.log(`        ${detail}`);
};

record(
    "C1-value-parser",
    `parseCSSValue ${valueMBs.toFixed(2)} MB/s >= ${VALUE_PARSER_TARGET.toFixed(2)} (baseline ${BASELINE_VALUE_PARSER_MBS} × ${IMPROVEMENT_FACTOR})`,
    valueMBs >= VALUE_PARSER_TARGET,
    valueMBs >= VALUE_PARSER_TARGET
        ? `+${(((valueMBs - BASELINE_VALUE_PARSER_MBS) / BASELINE_VALUE_PARSER_MBS) * 100).toFixed(0)}% over baseline`
        : `below target — the dispatch/scanner win did not materialise at runtime`,
);

record(
    "C2-stylesheet-parser",
    `parseCSSStylesheet ${sheetMBs.toFixed(2)} MB/s >= ${STYLESHEET_PARSER_TARGET.toFixed(2)} (baseline ${BASELINE_STYLESHEET_PARSER_MBS} × ${IMPROVEMENT_FACTOR})`,
    sheetMBs >= STYLESHEET_PARSER_TARGET,
    sheetMBs >= STYLESHEET_PARSER_TARGET
        ? `+${(((sheetMBs - BASELINE_STYLESHEET_PARSER_MBS) / BASELINE_STYLESHEET_PARSER_MBS) * 100).toFixed(0)}% over baseline`
        : `below target`,
);

record(
    "C3-gamut-regression",
    `gamutMap ${gamutNs.toFixed(0)} ns/call <= ${GAMUT_NS_TARGET.toFixed(0)} (baseline ${BASELINE_GAMUT_NS} × ${REGRESSION_GUARD} guard)`,
    gamutNs <= GAMUT_NS_TARGET,
    gamutNs <= GAMUT_NS_TARGET
        ? "O.W3 alloc wins intact — no gamut regression (S4 documented NO-OP)"
        : `regressed past the ${REGRESSION_GUARD}× guard — O.W6 undid an O.W3 win`,
);

const failed = results.filter((r) => !r.ok);
console.log(
    `\n${failed.length === 0 ? "PASS" : "FAIL"} — ${results.length - failed.length}/${results.length} clauses green`,
);
process.exit(failed.length === 0 ? 0 : 1);
