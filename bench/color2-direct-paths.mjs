#!/usr/bin/env node
/**
 * E.W1 Lane C microbenchmark — `color2()` DIRECT_PATHS speedup gate.
 *
 * Compares:
 *   Scenario A (pre-state: XYZ-hub path) — the legacy `color2(<from> → rgb)`
 *     shape: <from> → xyz → rgb. Faithfully reconstructed inline so the
 *     bench is hermetic (no dependency on a checked-out pre-Lane-C build).
 *     For each pair, traces the same operations the legacy code path
 *     performed: matrix multiplies, transfer functions, intermediate
 *     XYZColor allocation.
 *   Scenario B (post-state: `color2` with DIRECT_PATHS) — calls the actual
 *     `color2(c, "rgb")` exposed from `dist/value.js`. The DIRECT_PATHS
 *     table dispatches through a direct path; the XYZ-hub fallback is
 *     skipped for the wired pairs. Mathematically equivalent within
 *     floating-point epsilon (verified by `test/parser-snapshot.test.ts`).
 *
 * Three pairs measured:
 *   - HSL→RGB     — direct path is closed-form cylindrical; pre-state
 *                   forces a round-trip through linear-sRGB + XYZ + sRGB.
 *                   Biggest delta (the legacy path was deeply wasteful).
 *   - OKLab→RGB   — direct path skips the XYZ hub via Ottosson's
 *                   LMS→linear-sRGB direct matrix. Saves 1 matrix multiply
 *                   + 1 intermediate XYZColor allocation per call.
 *   - OKLCh→RGB   — same as OKLab→RGB plus the avoided re-normalize/
 *                   denormalize round-trip on (a,b).
 *
 * Gating verdict: HSL→RGB median ≥ 2× (the canonical hot-path proxy —
 * lerping colors in HSL/HSV with sRGB output is the demo's gradient
 * default before opting into OKLab interpolation).
 *
 * Pre-requisite: `npm run build` must have produced `dist/value.js`. The
 * bench imports `color2` + the Color constructors from the dist (`.mjs`
 * cannot use a TS loader without extra plumbing).
 *
 * Source ref:
 *   - docs/tranches/E/waves/E.W1.md Lane C (lines 72-97)
 *   - docs/tranches/E/audit/E-AUDIT-5-library-demo-architecture.md §9 item 4
 *   - bench/color-channel-access.mjs (D.W1 L8 reference shape)
 *   - bench/parser-namelookup.mjs (E.W1 Lane D reference shape)
 *
 * Run with: `node bench/color2-direct-paths.mjs`
 */

import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "..", "dist", "value.js");

if (!existsSync(distPath)) {
    console.error(
        `\nERROR: ${distPath} not found.\n` +
            `Run \`npm run build\` first — this bench imports the built library\n` +
            `to measure the actual color2 dispatch (DIRECT_PATHS table).\n`,
    );
    process.exit(2);
}

const lib = await import(distPath);
const { color2, HSLColor, OKLABColor, OKLCHColor, RGBColor, XYZColor } = lib;
const { OKLAB_TO_LMS_MATRIX, LMS_TO_XYZ_MATRIX, transformMat3, gamutMap } = lib;

// ─── Constants inlined verbatim from src/units/color/conversions/* (G.W1 Lane B) ───
// (a few are not on the public barrel; included here verbatim so the
//  pre-state mirror compiles standalone.)

// CSS Color 4 sRGB inverse — src/units/color/conversions/xyz-extended.ts:49
// (XYZ_RGB_MATRIX is now derived as invertMat3(RGB_XYZ_MATRIX), not a literal).
const XYZ_RGB_MATRIX = [
    3.2409699419045226, -1.5373831775700939, -0.4986107602930034,
    -0.9692436362808796, 1.8759675015077202, 0.04155505740717561,
    0.05563007969699366, -0.20397695888897652, 1.0569715142428786,
];

// CSS Color 4 sRGB matrix — src/units/color/conversions/xyz-extended.ts:43.
const RGB_XYZ_MATRIX = [
    0.41239079926595934, 0.357584339383878, 0.1804807884018343,
    0.21263900587151027, 0.715168678767756, 0.07219231536073371,
    0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
];

// sRGB transfer encode — src/units/color/conversions/transfer.ts:38
// (linearToSrgb; SRGB_GAMMA/OFFSET/SLOPE constants at transfer.ts:14-16).
const SRGB_GAMMA = 2.4;
const SRGB_OFFSET = 0.055;
const SRGB_SLOPE = 12.92;
const SRGB_LINEAR_TRANSITION = 0.04045 / SRGB_SLOPE;
function linearToSrgb(channel) {
    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;
    if (abs <= SRGB_LINEAR_TRANSITION) return channel * SRGB_SLOPE;
    return sign * ((1 + SRGB_OFFSET) * abs ** (1 / SRGB_GAMMA) - SRGB_OFFSET);
}
function srgbToLinear(channel) {
    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;
    if (abs <= SRGB_LINEAR_TRANSITION) return channel / SRGB_SLOPE;
    return sign * ((abs + SRGB_OFFSET) / (1 + SRGB_OFFSET)) ** SRGB_GAMMA;
}

const OKLAB_RANGE_MIN = -0.4;
const OKLAB_RANGE_MAX = 0.4;
const OKLCH_C_MIN = 0;
const OKLCH_C_MAX = 0.5;

function scale(v, fromMin, fromMax, toMin = 0, toMax = 1) {
    return ((v - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

// HSL → RGB closed-form (verbatim from src/units/color/conversions/cylindrical.ts:131).
function hsl2rgbInline(h, s, l, alpha) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 1 / 6) [r, g, b] = [c, x, 0];
    else if (h < 2 / 6) [r, g, b] = [x, c, 0];
    else if (h < 3 / 6) [r, g, b] = [0, c, x];
    else if (h < 4 / 6) [r, g, b] = [0, x, c];
    else if (h < 5 / 6) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return new RGBColor(r + m, g + m, b + m, alpha);
}

// ─── Pre-state inline mirrors (legacy XYZ-hub path) ────────────────────────

// Pre-state HSL → RGB: hsl → xyz → rgb. Forces a full round-trip through
// linear-sRGB + XYZ even though hsl2rgb is itself closed-form (the legacy
// dispatch had no shortcut). Big delta against the direct path.
function preStateHslToRgb(hsl) {
    // hsl → rgb (closed-form, then forced through xyz).
    const rgb = hsl2rgbInline(hsl.h, hsl.s, hsl.l, hsl.alpha);

    // rgb → xyz.
    const linearRGB = [
        srgbToLinear(rgb.r),
        srgbToLinear(rgb.g),
        srgbToLinear(rgb.b),
    ];
    const [x, y, z] = transformMat3(linearRGB, RGB_XYZ_MATRIX);
    const xyz = new XYZColor(x, y, z, rgb.alpha);

    // xyz → rgb.
    const linearRGB2 = transformMat3([xyz.x, xyz.y, xyz.z], XYZ_RGB_MATRIX);
    const r = linearToSrgb(linearRGB2[0]);
    const g = linearToSrgb(linearRGB2[1]);
    const bCh = linearToSrgb(linearRGB2[2]);
    const mapped = gamutMap(new RGBColor(r, g, bCh, xyz.alpha));
    return new RGBColor(mapped.r, mapped.g, mapped.b, xyz.alpha);
}

// Pre-state OKLab → RGB: oklab → xyz → rgb.
function preStateOklabToRgb(oklab) {
    const a = scale(oklab.a, 0, 1, OKLAB_RANGE_MIN, OKLAB_RANGE_MAX);
    const b = scale(oklab.b, 0, 1, OKLAB_RANGE_MIN, OKLAB_RANGE_MAX);
    const lms = transformMat3([oklab.l, a, b], OKLAB_TO_LMS_MATRIX);
    const lmsLin = [
        lms[0] * lms[0] * lms[0],
        lms[1] * lms[1] * lms[1],
        lms[2] * lms[2] * lms[2],
    ];
    const [x, y, z] = transformMat3(lmsLin, LMS_TO_XYZ_MATRIX);
    const xyz = new XYZColor(x, y, z, oklab.alpha);

    const linearRGB = transformMat3([xyz.x, xyz.y, xyz.z], XYZ_RGB_MATRIX);
    const r = linearToSrgb(linearRGB[0]);
    const g = linearToSrgb(linearRGB[1]);
    const bCh = linearToSrgb(linearRGB[2]);
    const mapped = gamutMap(new RGBColor(r, g, bCh, xyz.alpha));
    return new RGBColor(mapped.r, mapped.g, mapped.b, xyz.alpha);
}

// Pre-state OKLCh → RGB: oklch → oklab → xyz → rgb.
function preStateOklchToRgb(oklch) {
    const c = scale(oklch.c, 0, 1, OKLCH_C_MIN, OKLCH_C_MAX);
    const hRad = oklch.h * 2 * Math.PI;
    const aRaw = Math.cos(hRad) * c;
    const bRaw = Math.sin(hRad) * c;
    const oklabA = scale(aRaw, OKLAB_RANGE_MIN, OKLAB_RANGE_MAX, 0, 1);
    const oklabB = scale(bRaw, OKLAB_RANGE_MIN, OKLAB_RANGE_MAX, 0, 1);
    return preStateOklabToRgb(new OKLABColor(oklch.l, oklabA, oklabB, oklch.alpha));
}

// ─── Configuration ─────────────────────────────────────────────────────────
const INSTANCES = 256;
const ITERATIONS = 50_000;
const WARMUP_OUTER = 3_000;
const TARGET_SPEEDUP = 2;

const fmt = (ms) => ms.toFixed(3).padStart(8) + " ms";

function makeHslPool() {
    const out = new Array(INSTANCES);
    for (let i = 0; i < INSTANCES; i++) {
        out[i] = new HSLColor(i / INSTANCES, 0.5 + ((i * 7) % 128) / 256, 0.5, 1);
    }
    return out;
}
function makeOklabPool() {
    const out = new Array(INSTANCES);
    for (let i = 0; i < INSTANCES; i++) {
        out[i] = new OKLABColor(
            i / INSTANCES,
            0.2 + ((i * 7) % 256) / 426,
            0.2 + ((i * 13) % 256) / 426,
            1,
        );
    }
    return out;
}
function makeOklchPool() {
    const out = new Array(INSTANCES);
    for (let i = 0; i < INSTANCES; i++) {
        out[i] = new OKLCHColor(
            i / INSTANCES,
            0.3 + ((i * 7) % 256) / 768,
            ((i * 13) % 256) / 256,
            1,
        );
    }
    return out;
}

// ─── Hot-loop kernel ───────────────────────────────────────────────────────
function runPre(pool, fn) {
    let acc = 0;
    for (let i = 0; i < INSTANCES; i++) {
        const rgb = fn(pool[i]);
        acc += rgb.r + rgb.g + rgb.b;
    }
    return acc;
}
function runPost(pool) {
    let acc = 0;
    for (let i = 0; i < INSTANCES; i++) {
        const rgb = color2(pool[i], "rgb");
        acc += rgb.r + rgb.g + rgb.b;
    }
    return acc;
}

// ─── Bench harness ─────────────────────────────────────────────────────────
function bench(label, runFn) {
    let sink = 0;
    for (let i = 0; i < WARMUP_OUTER; i++) sink += runFn();
    if (sink === Infinity) console.log("never");

    const t0 = performance.now();
    let total = 0;
    for (let i = 0; i < ITERATIONS; i++) total += runFn();
    const t1 = performance.now();
    if (total === Infinity) console.log("never");
    const ms = t1 - t0;
    console.log(`  ${label}: ${fmt(ms)}  (sink=${total.toFixed(2)})`);
    return ms;
}

console.log(
    `\nE.W1 Lane C — color2() DIRECT_PATHS microbenchmark` +
        `\n  instances=${INSTANCES}, outer-iter=${ITERATIONS.toLocaleString()},` +
        ` total conversions/scenario = ${(INSTANCES * ITERATIONS).toLocaleString()},` +
        `\n  gating: HSL→RGB median ≥ ${TARGET_SPEEDUP}×` +
        `\n  imports actual color2 dispatch from dist/value.js\n`,
);

const runs = [];
for (let run = 1; run <= 3; run++) {
    console.log(`Run ${run}:`);
    const hslPool = makeHslPool();
    const oklabPool = makeOklabPool();
    const oklchPool = makeOklchPool();

    const msAhsl = bench(
        "Scenario A (pre: hsl→xyz→rgb inline)  ",
        () => runPre(hslPool, preStateHslToRgb),
    );
    const msBhsl = bench(
        "Scenario B (post: color2 DIRECT_PATHS) ",
        () => runPost(hslPool),
    );
    const speedupHsl = msAhsl / msBhsl;
    console.log(`  hsl→rgb   speedup: ${speedupHsl.toFixed(2)}×`);

    const msAlab = bench(
        "Scenario A (pre: oklab→xyz→rgb inline)",
        () => runPre(oklabPool, preStateOklabToRgb),
    );
    const msBlab = bench(
        "Scenario B (post: color2 DIRECT_PATHS) ",
        () => runPost(oklabPool),
    );
    const speedupLab = msAlab / msBlab;
    console.log(`  oklab→rgb speedup: ${speedupLab.toFixed(2)}×`);

    const msAlch = bench(
        "Scenario A (pre: oklch→xyz→rgb inline)",
        () => runPre(oklchPool, preStateOklchToRgb),
    );
    const msBlch = bench(
        "Scenario B (post: color2 DIRECT_PATHS) ",
        () => runPost(oklchPool),
    );
    const speedupLch = msAlch / msBlch;
    console.log(`  oklch→rgb speedup: ${speedupLch.toFixed(2)}×\n`);

    runs.push({ speedupHsl, speedupLab, speedupLch });
}

const hslSpeedups = runs.map((r) => r.speedupHsl).sort((x, y) => x - y);
const labSpeedups = runs.map((r) => r.speedupLab).sort((x, y) => x - y);
const lchSpeedups = runs.map((r) => r.speedupLch).sort((x, y) => x - y);
const hslMedian = hslSpeedups[1];
const labMedian = labSpeedups[1];
const lchMedian = lchSpeedups[1];
const pass = hslMedian >= TARGET_SPEEDUP;

console.log(`Summary:`);
console.log(`  hsl→rgb   speedups (sorted): ${hslSpeedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  hsl→rgb   median:            ${hslMedian.toFixed(2)}×    [GATING]`);
console.log(`  oklab→rgb speedups (sorted): ${labSpeedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  oklab→rgb median:            ${labMedian.toFixed(2)}×`);
console.log(`  oklch→rgb speedups (sorted): ${lchSpeedups.map((s) => s.toFixed(2) + "×").join(", ")}`);
console.log(`  oklch→rgb median:            ${lchMedian.toFixed(2)}×`);
console.log(`  target:                      ≥ ${TARGET_SPEEDUP}× (HSL→RGB hot path)`);
console.log(`  verdict:                     ${pass ? "PASS" : "FAIL"}`);
console.log();

process.exit(pass ? 0 : 1);
