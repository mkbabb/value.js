// P-3 COMPARATIVE BENCH — three CSS parse engines over a shared corpus, the
// historical O.W6 / U-F14 gate recipe (MB/s + ns/call + co-scaling ratio vs
// parse-that jsonParser). Run: tsx bench.ts  (from W/bench, tsx + @mkbabb/parse-that
// resolvable at W root). Emits JSON on stdout; a human table on stderr.
//
// Engines:
//   (a) LIVE  — the retiring regex parser, repo src/css (read-only). ONCE-FOR-RECORD.
//   (b) C14   — the assay: @mkbabb/parse-that 1.0.0 combinator prototype (W/c14-css).
//   (c) DEP   — the deposed pre-v4 parse-that parser, esbuild-bundled with Vite's
//               production define (import.meta.env.DEV=false) — the exact built-dist
//               environment the historical bench/gate imported from dist/value.js.
import { performance } from "node:perf_hooks";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { arch, platform, release, cpus } from "node:os";
import { jsonParser } from "@mkbabb/parse-that";
// All three engines are esbuild-bundled with IDENTICAL flags (--bundle --format=esm
// --platform=node --define:import.meta.env.DEV=false), so the execution/build
// condition is uniform across engines — the only variable is the parser code.
import {
    parseCssValue as liveValue,
    parseStylesheet as liveSheet,
} from "../live-bundle.mjs";
import {
    parseStylesheet as c14Sheet,
    parseColor as c14Color,
    parseEasing as c14Easing,
} from "../c14-bundle.mjs";
import {
    CSSValues as depValues,
    parseCSSStylesheet as depSheet,
} from "../deposed-full/deposed-bundle.mjs";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

// ── Corpora ──────────────────────────────────────────────────────────────────
// Historical O.W6 bench corpus (the deposed engine's native tuning corpus).
const VALUE_HISTORICAL = [
    "oklch(0.7 0.15 30)", "linear(0, 0.5 50%, 1)",
    "linear-gradient(to right, red, blue)", "translateX(100px)",
    "calc(100% - 2rem)", "var(--color, red)",
    "cubic-bezier(0.42, 0, 0.58, 1)", "42px", "blue", "spring(1, 100, 10, 0)",
];
const SHEET_HISTORICAL = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@layer base { .box { color: red; } }
@media (min-width: 600px) { .grid { display: grid; } }
.card { padding: 1rem; background: oklch(0.7 0.15 30); }
@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }`;
// C14 assay proof corpus (sha256-locked in c14-css/bench/compare.ts) — the common
// sheet corpus all three engines parse.
const C14_CORPUS = [
    ".a { color: oklch(62.8% .257 29.23 / 85%); }",
    ".b:hover { animation-timing-function: cubic-bezier(.25, .1, .25, 1); }",
    ".c { color: oklch(80% .1 250); animation-timing-function: cubic-bezier(.4, 0, .2, 1); }",
];
// Common value micro-corpus — the value intersection of all three engines.
const VALUE_COMMON = ["oklch(62.8% .257 29.23 / 85%)", "cubic-bezier(0.42, 0, 0.58, 1)"];
// Real-world demo stylesheet (both live + deposed parse it fully; C14 cannot).
const DEMO_PATH = "/Users/mkbabb/Programming/value.js/demo/styles/animations.css";
const DEMO_SHEET = readFileSync(DEMO_PATH, "utf8");

const bytesOf = (a: string[] | string) =>
    Array.isArray(a) ? a.reduce((s, v) => s + v.length, 0) : a.length;

// ── Correctness adapters (verify a parse SUCCEEDS before timing it) ────────────
const okR = (r: unknown) => typeof r === "object" && r !== null && (r as { ok?: unknown }).ok === true;
const okThrow = (fn: () => unknown) => { try { fn(); return true; } catch { return false; } };
const c14Val = (v: string) => (v.startsWith("cubic-bezier") ? okR(c14Easing(v)) : okR(c14Color(v)));

// ── Timing primitive (historical recipe: 50-iter warmup, time N iterations) ────
const N = 1000;
function timeMs(fn: () => void, iters: number): number {
    for (let i = 0; i < 50; i++) fn();
    const t0 = performance.now();
    for (let i = 0; i < iters; i++) fn();
    return performance.now() - t0;
}

// A scenario = one pass over its corpus per iteration.
interface Scenario {
    engine: "live" | "c14" | "deposed";
    name: string;
    kind: "value" | "sheet";
    corpus: string[];      // for bytes + ns/call call-count
    bytes: number;
    pass: () => void;      // one pass over the corpus (parse each item once)
    verify: () => boolean; // all items parse successfully
}

// deposed parseCSSStylesheet is memoised; clear its cache each pass (historical recipe).
const depCache = (depSheet as unknown as { cache?: { clear(): void } }).cache;
const clearDep = () => { if (depCache) depCache.clear(); };

const scenarios: Scenario[] = [
    // ── LIVE (retiring regex) — once-for-record ──
    { engine: "live", name: "value-historical", kind: "value", corpus: VALUE_HISTORICAL, bytes: bytesOf(VALUE_HISTORICAL),
      pass: () => { for (const v of VALUE_HISTORICAL) liveValue(v); },
      verify: () => VALUE_HISTORICAL.every((v) => okR(liveValue(v))) },
    { engine: "live", name: "sheet-historical", kind: "sheet", corpus: [SHEET_HISTORICAL], bytes: bytesOf(SHEET_HISTORICAL),
      pass: () => { liveSheet(SHEET_HISTORICAL); }, verify: () => okR(liveSheet(SHEET_HISTORICAL)) },
    { engine: "live", name: "sheet-demo", kind: "sheet", corpus: [DEMO_SHEET], bytes: bytesOf(DEMO_SHEET),
      pass: () => { liveSheet(DEMO_SHEET); }, verify: () => okR(liveSheet(DEMO_SHEET)) },
    { engine: "live", name: "value-common", kind: "value", corpus: VALUE_COMMON, bytes: bytesOf(VALUE_COMMON),
      pass: () => { for (const v of VALUE_COMMON) liveValue(v); }, verify: () => VALUE_COMMON.every((v) => okR(liveValue(v))) },
    { engine: "live", name: "sheet-common", kind: "sheet", corpus: C14_CORPUS, bytes: bytesOf(C14_CORPUS),
      pass: () => { for (const s of C14_CORPUS) liveSheet(s); }, verify: () => C14_CORPUS.every((s) => okR(liveSheet(s))) },

    // ── DEPOSED (pre-v4 parse-that, built) — historical-gate reproduction ──
    { engine: "deposed", name: "value-historical", kind: "value", corpus: VALUE_HISTORICAL, bytes: bytesOf(VALUE_HISTORICAL),
      pass: () => { for (const v of VALUE_HISTORICAL) depValues.Value.parse(v); },
      verify: () => VALUE_HISTORICAL.every((v) => okThrow(() => depValues.Value.parse(v))) },
    { engine: "deposed", name: "sheet-historical", kind: "sheet", corpus: [SHEET_HISTORICAL], bytes: bytesOf(SHEET_HISTORICAL),
      pass: () => { clearDep(); depSheet(SHEET_HISTORICAL); }, verify: () => okThrow(() => depSheet(SHEET_HISTORICAL)) },
    { engine: "deposed", name: "sheet-demo", kind: "sheet", corpus: [DEMO_SHEET], bytes: bytesOf(DEMO_SHEET),
      pass: () => { clearDep(); depSheet(DEMO_SHEET); }, verify: () => okThrow(() => depSheet(DEMO_SHEET)) },
    { engine: "deposed", name: "value-common", kind: "value", corpus: VALUE_COMMON, bytes: bytesOf(VALUE_COMMON),
      pass: () => { for (const v of VALUE_COMMON) depValues.Value.parse(v); }, verify: () => VALUE_COMMON.every((v) => okThrow(() => depValues.Value.parse(v))) },
    { engine: "deposed", name: "sheet-common", kind: "sheet", corpus: C14_CORPUS, bytes: bytesOf(C14_CORPUS),
      pass: () => { clearDep(); for (const s of C14_CORPUS) depSheet(s); }, verify: () => C14_CORPUS.every((s) => okThrow(() => depSheet(s))) },

    // ── C14 (assay) — its proof corpus + the common value micro ──
    { engine: "c14", name: "value-common", kind: "value", corpus: VALUE_COMMON, bytes: bytesOf(VALUE_COMMON),
      pass: () => { for (const v of VALUE_COMMON) (v.startsWith("cubic-bezier") ? c14Easing(v) : c14Color(v)); },
      verify: () => VALUE_COMMON.every((v) => c14Val(v)) },
    { engine: "c14", name: "sheet-common", kind: "sheet", corpus: C14_CORPUS, bytes: bytesOf(C14_CORPUS),
      pass: () => { for (const s of C14_CORPUS) c14Sheet(s); }, verify: () => C14_CORPUS.every((s) => okR(c14Sheet(s))) },
];

// ── jsonParser co-scaling normaliser (exact U-F14 recipe) ──────────────────────
const jsonPayload = JSON.stringify({
    a: 1, b: [1, 2, 3, 4, 5], c: "hello world",
    d: { x: 1.5, y: 2.5, z: [true, false, null] },
    e: "oklch(0.5 0.1 200)", f: Array.from({ length: 12 }, (_, i) => i * 1.1),
});
const jsonBytes = Buffer.byteLength(jsonPayload);
function jsonMBs(): number {
    const JN = 20000;
    for (let w = 0; w < 100; w++) jsonParser.parse(jsonPayload);
    const t = performance.now();
    for (let i = 0; i < JN; i++) jsonParser.parse(jsonPayload);
    return (JN * jsonBytes / 1e6) / ((performance.now() - t) / 1000);
}

// ── Verify every scenario parses its corpus before timing ──────────────────────
for (const sc of scenarios) {
    if (!sc.verify()) {
        console.error(`FATAL: ${sc.engine}/${sc.name} failed correctness verify — refusing to time a failing parse`);
        process.exit(2);
    }
}

// ── Sample loop (interleaved so numerator + jsonParser share machine state) ────
const SAMPLES = 15;
type Series = Record<string, number[]>;
const mbps: Series = {}, nspc: Series = {};
const jsonSeries: number[] = [];
for (const sc of scenarios) { mbps[`${sc.engine}/${sc.name}`] = []; nspc[`${sc.engine}/${sc.name}`] = []; }

for (let s = 0; s < SAMPLES; s++) {
    for (const sc of scenarios) {
        const ms = timeMs(sc.pass, N);
        const key = `${sc.engine}/${sc.name}`;
        mbps[key]!.push((sc.bytes * N) / 1e6 / (ms / 1000));
        nspc[key]!.push((ms * 1e6) / (N * sc.corpus.length));
    }
    jsonSeries.push(jsonMBs());
}

// ── Statistics ─────────────────────────────────────────────────────────────────
const peak = (a: number[]) => Math.max(...a);
const min = (a: number[]) => Math.min(...a);
const median = (a: number[]) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]!; };
const spreadPct = (a: number[]) => ((peak(a) - min(a)) / median(a)) * 100;
const stat = (a: number[]) => ({ median: median(a), peak: peak(a), min: min(a), spread_pct: spreadPct(a) });

const jsonRefPeak = peak(jsonSeries);
const jsonRefMedian = median(jsonSeries);

const VALUE_RATIO_FLOOR = 0.0500; // U-F14 gate constant (co-scaling normaliser, PEAK statistic)
const SHEET_RATIO_FLOOR = 0.1000; // U-F14 gate constant

interface Row {
    engine: string; scenario: string; kind: string; corpus_items: number; corpus_bytes: number;
    mbps: ReturnType<typeof stat>; ns_per_call: ReturnType<typeof stat>;
    ratio_peak: number; ratio_median: number; floor: number; meets_floor: boolean;
}
const rows: Row[] = [];
for (const sc of scenarios) {
    const key = `${sc.engine}/${sc.name}`;
    const m = stat(mbps[key]!), np = stat(nspc[key]!);
    const floor = sc.kind === "value" ? VALUE_RATIO_FLOOR : SHEET_RATIO_FLOOR;
    const ratio_peak = m.peak / jsonRefPeak;
    rows.push({
        engine: sc.engine, scenario: sc.name, kind: sc.kind,
        corpus_items: sc.corpus.length, corpus_bytes: sc.bytes,
        mbps: m, ns_per_call: np,
        ratio_peak, ratio_median: m.median / jsonRefMedian,
        floor, meets_floor: ratio_peak >= floor,
    });
}

// ── Gate verdict (floors applied to the ASSAY = C14, common corpus) ────────────
const c14ValRow = rows.find((r) => r.engine === "c14" && r.scenario === "value-common")!;
const c14SheetRow = rows.find((r) => r.engine === "c14" && r.scenario === "sheet-common")!;
const depValHist = rows.find((r) => r.engine === "deposed" && r.scenario === "value-historical")!;
const depSheetHist = rows.find((r) => r.engine === "deposed" && r.scenario === "sheet-historical")!;
const gate = {
    bar_source: "scripts/gates/proof-perf-target.mjs @ b3f4f76e (U-F14 re-anchor)",
    VALUE_RATIO_FLOOR, SHEET_RATIO_FLOOR,
    statistic: "peak of 15 samples, ratio vs parse-that jsonParser peak",
    assay_value_ratio: c14ValRow.ratio_peak, assay_value_meets: c14ValRow.ratio_peak >= VALUE_RATIO_FLOOR,
    assay_sheet_ratio: c14SheetRow.ratio_peak, assay_sheet_meets: c14SheetRow.ratio_peak >= SHEET_RATIO_FLOOR,
    verdict: c14ValRow.ratio_peak >= VALUE_RATIO_FLOOR && c14SheetRow.ratio_peak >= SHEET_RATIO_FLOOR ? "GREEN" : "RED",
    calibration_crosscheck: {
        note: "deposed engine on the native historical corpus reproduces the gate's own calibration point (documented cured peaks ~0.0596 value / ~0.1250 sheet)",
        deposed_value_historical_ratio: depValHist.ratio_peak,
        deposed_sheet_historical_ratio: depSheetHist.ratio_peak,
    },
};

const out = {
    schema: "p3-comparative-bench/1",
    generated: new Date().toISOString(),
    machine: {
        node: process.version, v8: process.versions.v8,
        os: platform(), os_release: release(), arch,
        cpu: cpus()[0]?.model, cores: cpus().length,
    },
    method: {
        inner_iterations_N: N, samples: SAMPLES, warmup_per_sample: 50,
        json_normaliser: { payload_bytes: jsonBytes, iterations: 20000, warmup: 100 },
        ratio_statistic: "peak MB/s of engine ÷ peak MB/s of jsonParser (co-scaling; U-F14 recipe)",
        note: "engines interleaved with the jsonParser normaliser within each sample so numerator+denominator share machine/load state",
    },
    corpus: {
        value_historical: { items: VALUE_HISTORICAL.length, bytes: bytesOf(VALUE_HISTORICAL), sha256: sha(JSON.stringify(VALUE_HISTORICAL)) },
        sheet_historical: { bytes: bytesOf(SHEET_HISTORICAL), sha256: sha(SHEET_HISTORICAL) },
        c14_common: { items: C14_CORPUS.length, bytes: bytesOf(C14_CORPUS), sha256: sha(JSON.stringify(C14_CORPUS)) },
        value_common: { items: VALUE_COMMON.length, bytes: bytesOf(VALUE_COMMON), sha256: sha(JSON.stringify(VALUE_COMMON)) },
        demo_sheet: { path: "demo/styles/animations.css", bytes: bytesOf(DEMO_SHEET), sha256: sha(DEMO_SHEET) },
        json_payload: { bytes: jsonBytes, sha256: sha(jsonPayload) },
    },
    subjects: {
        live: { grammar_ts: sha(readFileSync("/Users/mkbabb/Programming/value.js/src/css/grammar.ts", "utf8")),
                stylesheet_ts: sha(readFileSync("/Users/mkbabb/Programming/value.js/src/css/stylesheet.ts", "utf8")),
                bundle: sha(readFileSync("/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/live-bundle.mjs", "utf8")) },
        c14: { api_ts: sha(readFileSync("/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css/src/css/api.ts", "utf8")),
               bundle: sha(readFileSync("/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-bundle.mjs", "utf8")) },
        deposed: { bundle: sha(readFileSync("/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/deposed-full/deposed-bundle.mjs", "utf8")),
                   esbuild_flags: "--bundle --format=esm --platform=node --define:import.meta.env.DEV=false --external:prettier" },
    },
    json_normaliser_MBs: { median: jsonRefMedian, peak: jsonRefPeak, min: min(jsonSeries), spread_pct: spreadPct(jsonSeries) },
    rows,
    gate,
};

console.log(JSON.stringify(out, null, 2));

// Human table on stderr.
const f = (n: number, d = 2) => n.toFixed(d);
console.error(`\n  machine: node ${process.version}, ${cpus()[0]?.model} (${cpus().length} cores), ${arch}`);
console.error(`  jsonParser normaliser: peak ${f(jsonRefPeak, 1)} MB/s (median ${f(jsonRefMedian, 1)}, spread ${f(spreadPct(jsonSeries), 1)}%)\n`);
console.error(`  ${"engine/scenario".padEnd(26)} ${"MB/s(med)".padStart(10)} ${"MB/s(peak)".padStart(10)} ${"ns/call".padStart(10)} ${"ratio".padStart(8)} ${"floor".padStart(7)} meets`);
for (const r of rows) {
    console.error(`  ${(r.engine + "/" + r.scenario).padEnd(26)} ${f(r.mbps.median, 1).padStart(10)} ${f(r.mbps.peak, 1).padStart(10)} ${f(r.ns_per_call.median, 0).padStart(10)} ${f(r.ratio_peak, 4).padStart(8)} ${f(r.floor, 4).padStart(7)}  ${r.meets_floor ? "Y" : "n"}`);
}
console.error(`\n  GATE (assay=C14, common corpus): value ${f(gate.assay_value_ratio, 4)}>=${VALUE_RATIO_FLOOR}? ${gate.assay_value_meets} | sheet ${f(gate.assay_sheet_ratio, 4)}>=${SHEET_RATIO_FLOOR}? ${gate.assay_sheet_meets} => ${gate.verdict}`);
console.error(`  deposed historical-corpus reproduction: value/pt ${f(gate.calibration_crosscheck.deposed_value_historical_ratio, 4)} (doc ~0.0596), sheet/pt ${f(gate.calibration_crosscheck.deposed_sheet_historical_ratio, 4)} (doc ~0.1250)`);
