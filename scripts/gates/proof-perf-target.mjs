#!/usr/bin/env node
// proof:perf-target — value.js O.W6 gate (PORTABLE perf regression-guard).
//
// THE REAL OBSERVABLE: the value-level / stylesheet parser throughput, measured
// against the BUILT `dist/value.js` over a real byte corpus — but expressed as a
// RATIO against an in-run parse-that combinator normaliser (`jsonParser.parse`),
// NOT native `JSON.parse`, NOT an absolute MB/s threshold.
//
// WHY RELATIVE (the device-dependence lesson). An earlier draft of this gate
// embedded ABSOLUTE MB/s thresholds (5.23 / 10.81) derived from the authoring
// machine's baseline. Those are NON-PORTABLE: a slower machine (or the slow CI
// Linux runner) reads lower absolute MB/s even when the *relative* win is intact,
// so the gate flakes RED through no regression of its own. The cure is a RATIO
// against an in-run reference that co-scales with the parser, so a faster/slower
// box (or a hotter/quieter box) moves numerator and denominator TOGETHER and the
// ratio holds. This gate asserts the ratio clears a floor — portable across
// machines and robust to the ~8-10% run-to-run noise on a shared box.
//
// ─────────────────────────────────────────────────────────────────────────────
// U-F14 — THE CO-SCALING NORMALISER (the PREMISE fix; U.W-PERF, E-3).
//
// The original O.W6 normaliser was native `JSON.parse`. Its premise — "CSS-parse
// throughput and JSON.parse throughput both scale ~linearly with CPU speed, so
// their RATIO is machine-independent" — is FALSE. Native `JSON.parse` is C++
// inside V8 (156-400+ MB/s); the CSS parser is the interpreted/JIT'd parse-that
// combinator chain (1.5-8 MB/s). The two do NOT co-scale:
//   - across ARCH: on a fast box `JSON.parse` runs disproportionately fast, so
//     `parser/json` collapses toward the floor — the designed 25% headroom spends
//     to a MEASURED 0-7% margin on fast archs (registry U-F14 §10), a genuine
//     idle flake (~50% RED on a clean tree).
//   - across NODE VERSION: node-24's V8 optimized native `JSON.parse` relative to
//     the combinator chain, dropping the sheet ratio 0.0278 -> 0.0189 with NO
//     throughput loss (CI run 29230557187). U.W-ORACLE nudged the SHEET floor
//     0.0200 -> 0.0160 to swallow that — a THRESHOLD move on the false premise.
//
// THE CURE (E-3: re-anchor the PREMISE, never lower the threshold to swallow the
// flake): normalise against parse-that's OWN `jsonParser` — the SAME combinator
// machinery (dispatch + allocation + backtracking) as the CSS value/sheet parser,
// over the SAME ~450-byte JSON payload. Because numerator and denominator are now
// the identical performance class, the ratio co-scales across arch AND node
// version. MEASURED (this machine, node-26, under 19-28 load): when concurrent
// load dropped `jsonParser` 92 -> 83 MB/s, the parser dropped in lockstep and the
// ratio HELD (v/pt 0.0586, s/pt 0.1216 unchanged) — native `JSON.parse` would
// have stayed ~400 and collapsed the ratio. `jsonParser` lives in the dependency,
// NOT `src/parsing`: a scanner regression moves the numerator but not this fixed
// reference, so the gate keeps its teeth. This SUPERSEDES the ORACLE node-24
// nudge: native `JSON.parse` is gone as the denominator, so that node-version
// drift cannot recur; the floors below are RE-DERIVED on the parse-that scale
// (~90 MB/s reference), so they are NOT comparable to the old native-scale
// numbers (0.0100 / 0.0160) — this is a premise re-anchor, not a threshold tweak.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE O.W6 WIN (rigorously A/B-measured on the authoring + verifier machines;
// documented here, NOT asserted as a flaky tight threshold):
//   S2 byte-loop scanners (scanIdentFast/scanNumberFast) + S3 parse-that dispatch()
//   first-char table (SpanParser-FREE — that arm was falsified by parse-that A.W3).
//
//   scenario            pre-cure -> cured        honest factor
//   value-parser        4.55 -> 5.6 MB/s         x1.23-1.30 (+23-30%)
//   stylesheet-parser   9.40 -> 12.0 MB/s        x1.27-1.32 (+27-32%)
//   mixColors-gamut     ~flat                     no regression (S4 NO-OP)
//
//   Born-RED PROVEN at authoring: reverting src/parsing to tranche-o and rebuilding
//   drops the throughput below the cured level; byte-identical parse results were
//   proven 3 ways (the 1871-test suite, an 89-case parse-corpus diff, scanner fuzz
//   vs the regexes). The 1871-test suite is the deterministic CORRECTNESS oracle.
//   (The former proof:gamut-alloc alloc-count guard was retired at T.W0 Q13 —
//   ruled overfit; the gamut hot path stands by the type system + review now.)
//
// RATIO FLOORS (re-derived against the parse-that normaliser; PEAK of N=15 samples
// — see the `peak` note below). Cured PEAK ratios MEASURED here (median over 18
// gate invocations, node-26, load 5-27): value/pt ~= 0.0596 ; sheet/pt ~= 0.1250.
// A full slow-chain revert (smallest documented win: value +23%, sheet +27%) drops
// even the peak to ~0.0485 / ~0.0988 — the teeth level (a fuller +30%/+32% revert
// drops it to ~0.0458 / ~0.0947). The floors sit between the revert level and the
// worst observed peak:
//   VALUE 0.0500 — ~16% below cured peak; ~13% over the worst observed peak
//                  (0.0563 over 18 runs); above the full-revert level (teeth).
//   SHEET 0.1000 — ~20% below cured peak; ~9% over the worst observed peak
//                  (0.1091); above the full-revert level (teeth).
// Crucially the margin is now ARCH-INVARIANT (co-scaling) — it does NOT collapse
// to 0-7% on a fast arch as the native-JSON.parse ratio did. Proven: 18/18 GREEN
// under variable load with NO false red (the born-RED idle-flake is cured). The
// gate held 18/18 where the median-of-9 flaked RED under load contention.
// RESIDUAL (honest): the value win (+23%) is close to the run noise, so against
// the SMALLEST documented revert the teeth are thin — this gate is the GROSS-
// regression (full slow-chain revert) tripwire it was authored to be; the
// 1871-test suite carries the fine correctness discrimination.
// Derivation record: docs/tranches/U/audit/w-perf/dist-gate/perf-ratio-reanchor.md.
// ─────────────────────────────────────────────────────────────────────────────

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { jsonParser } from "@mkbabb/parse-that";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");
const distValue = resolve(root, "dist/value.js");

console.log("proof:perf-target — CSS-parse throughput vs parse-that jsonParser normaliser (portable, co-scaling)\n");

if (!existsSync(distValue)) {
    console.log("  FAIL  C0  dist/value.js missing — run `npm run build` first");
    process.exit(1);
}

const VALUE_RATIO_FLOOR = 0.0500; // co-scaling normaliser, PEAK statistic; cured peak ~0.0596, floor ~16% below, ~13% over the worst observed peak (0.0563/18 runs), above the full-revert level — see the U-F14 derivation above
const SHEET_RATIO_FLOOR = 0.1000; // co-scaling normaliser, PEAK statistic; cured peak ~0.1250, floor ~20% below, ~9% over the worst observed peak (0.1091), above the full-revert level

const { runBench } = await import(resolve(root, "bench/css-parse-perf.mjs"));

// In-run CO-SCALING normaliser: parse-that's `jsonParser` over a ~450-byte
// payload. Same combinator machinery as the CSS parser (so numerator + denominator
// co-scale across arch + node version), independent of `src/parsing` (so a scanner
// regression moves the numerator but not this reference — teeth preserved). This
// REPLACES the O.W6 native `JSON.parse` normaliser (U-F14: native C++ does not
// co-scale with the interpreted parser; see the header note).
const jsonPayload = JSON.stringify({
    a: 1, b: [1, 2, 3, 4, 5], c: "hello world",
    d: { x: 1.5, y: 2.5, z: [true, false, null] },
    e: "oklch(0.5 0.1 200)", f: Array.from({ length: 12 }, (_, i) => i * 1.1),
});
const jsonBytes = Buffer.byteLength(jsonPayload);
function jsonMBs() {
    const N = 20000;
    for (let w = 0; w < 100; w++) jsonParser.parse(jsonPayload); // warm-up: tier up the combinator chain
    const t = performance.now();
    for (let i = 0; i < N; i++) jsonParser.parse(jsonPayload);
    return (N * jsonBytes / 1e6) / ((performance.now() - t) / 1000);
}

const SAMPLES = 15;
// PEAK statistic (the capability floor — U-F14's stability arm). On a shared box,
// CPU contention can only make the parser SLOWER; a genuine code regression makes
// even the best-scheduled run slower. So the PEAK (least-contended) sample is the
// honest capability the floor tests — contention-immune (this is what kills the
// idle/load flake: the median gets dragged below the floor under load, the peak
// does not) yet teeth-preserving (a full slow-chain revert drops even the peak
// ~23-27% below the cured peak, under the floor). N=15 gives enough samples to
// catch a well-scheduled CPU slice; per-sample timer noise at N=1000 inner
// iterations is <1%, so the peak cannot spuriously EXCEED true capability (no
// false pass). The gamut timing stays a median (informational only, not a gate).
const peak = (a) => Math.max(...a);
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const vs = [], ss = [], js = [], gs = [];
for (let i = 0; i < SAMPLES; i++) {
    const r = runBench();
    vs.push(r.valueMBs); ss.push(r.sheetMBs); gs.push(r.gamutNs);
    js.push(jsonMBs());
}
const valueMBs = peak(vs), sheetMBs = peak(ss), jsonRef = peak(js), gamutNs = median(gs);
const valueRatio = valueMBs / jsonRef, sheetRatio = sheetMBs / jsonRef;

const results = [];
const record = (id, label, ok, detail) => {
    results.push({ id, ok });
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${id}  ${label}`);
    if (detail) console.log(`        ${detail}`);
};

console.log(`  (co-scaling normaliser: parse-that jsonParser ${jsonRef.toFixed(0)} MB/s)\n`);

record(
    "C1-value-parser",
    `parseCSSValue ${valueMBs.toFixed(2)} MB/s · ratio v/pt ${valueRatio.toFixed(4)} >= ${VALUE_RATIO_FLOOR}`,
    valueRatio >= VALUE_RATIO_FLOOR,
    valueRatio >= VALUE_RATIO_FLOOR
        ? "throughput holds (dispatch + byte-scanner win intact; +23-30% A/B documented)"
        : "ratio below floor — the dispatch/scanner win regressed (parser slowed vs the combinator baseline)",
);

record(
    "C2-stylesheet-parser",
    `parseCSSStylesheet ${sheetMBs.toFixed(2)} MB/s · ratio s/pt ${sheetRatio.toFixed(4)} >= ${SHEET_RATIO_FLOOR}`,
    sheetRatio >= SHEET_RATIO_FLOOR,
    sheetRatio >= SHEET_RATIO_FLOOR
        ? "throughput holds (+27-32% A/B documented)"
        : "ratio below floor — stylesheet parse regressed",
);

// C3 gamut: reported here informationally only (a raw ns/call timing, never a
// gate — the former proof:gamut-alloc alloc-count guard was retired at T.W0 Q13).
console.log(
    `  INFO  C3-gamut  gamutMap ${gamutNs.toFixed(0)} ns/call (informational only; not a gate)`,
);

const failed = results.filter((r) => !r.ok);
console.log(
    `\n${failed.length === 0 ? "PASS" : "FAIL"} — ${results.length - failed.length}/${results.length} ratio clauses green`,
);
process.exit(failed.length === 0 ? 0 : 1);
