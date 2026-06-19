#!/usr/bin/env node
/**
 * O.W3 color-math zero-alloc bench — the MEASURE-FIRST substrate (CAMPAIGN §0
 * born-RED law). Counts REAL Color-object constructor invocations per call on
 * the gamut-map / mixColors / sampleColorRamp hot paths through the BUILT
 * `dist/color.js` subpath (O.W2). No heap profiler dependency: a deterministic
 * in-process constructor counter, suitable for node ≥ 22.
 *
 * The counter exploits the class hierarchy — every concrete `XColor` extends the
 * base `Color`. Swapping each subclass's `[[Prototype]]` (its `__proto__`, the
 * super-constructor target) to a counting subclass of `Color` makes every
 * internal `new XColor(...)` route its `super(...)` call through our counter.
 * This is bundling-agnostic (it does NOT rely on the module-export bindings,
 * which the bundle's internal `new` sites bypass).
 *
 * Baselines recorded on the pre-cure tree (tranche-o 0.14.0, branch o3-zeroalloc
 * BEFORE the cure):
 *   gamutMap display-p3 OOG : 104 allocs/call   (24-step bisection × ~4 each)
 *   gamutMap rec2020   OOG : 105 allocs/call
 *   mixColors oklch pair    :   7 allocs/call
 *   sampleColorRamp 16      :  60 allocs total
 *
 * After the O.W3 cure (scratch OKLCHColor + transformMat3Into + JND early-exit):
 *   gamutMap display-p3 OOG :  84 allocs/call   (24 loop OKLCHColor allocs gone)
 *   gamutMap JND-eligible   :   6 allocs/call   (bisection skipped entirely)
 *
 * Requires a prior `npm run build` (imports dist). The gate `proof:gamut-alloc`
 * (scripts/proof-gamut-alloc.mjs) reuses this same shim against a recorded N.
 */

import { performance } from "node:perf_hooks";
import * as C from "../dist/color.js";

const {
    Color,
    OKLCHColor,
    OKLABColor,
    XYZColor,
    RGBColor,
    DisplayP3Color,
    LABColor,
    LCHColor,
    HSLColor,
    HSVColor,
    HWBColor,
    LinearSRGBColor,
    AdobeRGBColor,
    ProPhotoRGBColor,
    Rec2020Color,
    KelvinColor,
} = C;

// ── The constructor-count shim ──
let allocCount = 0;
class CountingColor extends Color {
    constructor(...args) {
        super(...args);
        allocCount++;
    }
}
const COLOR_CLASSES = [
    OKLCHColor, OKLABColor, XYZColor, RGBColor, DisplayP3Color,
    LABColor, LCHColor, HSLColor, HSVColor, HWBColor,
    LinearSRGBColor, AdobeRGBColor, ProPhotoRGBColor, Rec2020Color, KelvinColor,
].filter(Boolean);
for (const cls of COLOR_CLASSES) Object.setPrototypeOf(cls, CountingColor);

/** Run `fn` n times, return mean Color allocations per call. */
export function allocsPerCall(fn, n = 100) {
    fn(); // warm: trigger any lazy module-scoped scratch allocation first
    allocCount = 0;
    for (let i = 0; i < n; i++) fn();
    return allocCount / n;
}

/** Run `fn` once, return its total Color allocations. */
export function allocsOnce(fn) {
    fn(); // warm
    allocCount = 0;
    fn();
    return allocCount;
}

// Re-export the shim primitives so the gate can reuse the exact same instrument.
export { C, allocCount };

// ── The scenarios ──
const OOG_P3 = new DisplayP3Color(1.2, 0.3, 0.5, 1);
const OOG_REC = new Rec2020Color(1.3, 0.2, 0.4, 1);
const MILD_OOG_P3 = new DisplayP3Color(1.001, 0.999, 0.998, 1);
const MIX_A = new OKLCHColor(0.6, 0.4, 0.2, 1);
const MIX_B = new OKLCHColor(0.4, 0.3, 0.7, 1);

export const SCENARIOS = {
    gamutMapDisplayP3: () => C.gamutMap(OOG_P3, "display-p3"),
    gamutMapRec2020: () => C.gamutMap(OOG_REC, "rec2020"),
    gamutMapJND: () => C.gamutMap(MILD_OOG_P3, "display-p3"),
    mixColorsOklch: () => C.mixColors(MIX_A, MIX_B, 0.5, 0.5, "oklab"),
    sampleColorRamp16: () => C.sampleColorRamp(MIX_A, MIX_B, 16),
};

// When run directly, print the structured baseline/measurement table.
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log("O.W3 color-alloc-hotpath — Color allocations per call (dist/color.js)\n");

    const rows = [
        ["gamutMap display-p3 OOG", allocsPerCall(SCENARIOS.gamutMapDisplayP3)],
        ["gamutMap rec2020 OOG", allocsPerCall(SCENARIOS.gamutMapRec2020)],
        ["gamutMap JND-eligible (mild OOG)", allocsPerCall(SCENARIOS.gamutMapJND)],
        ["mixColors oklch pair", allocsPerCall(SCENARIOS.mixColorsOklch)],
        ["sampleColorRamp(16) total", allocsOnce(SCENARIOS.sampleColorRamp16)],
    ];
    for (const [label, n] of rows) {
        console.log(`  ${label.padEnd(36)} ${n}`);
    }

    // kf-side co-bench: a simulated 60fps rAF loop over mixColors (1000 frames).
    allocCount = 0;
    const t0 = performance.now();
    const FRAMES = 1000;
    for (let f = 0; f < FRAMES; f++) {
        const p = f / FRAMES;
        C.mixColors(MIX_A, MIX_B, 1 - p, p, "oklab");
    }
    const dt = performance.now() - t0;
    console.log(
        `\n  kf rAF co-bench: ${FRAMES} mixColors frames — ${allocCount} allocs, ${dt.toFixed(2)} ms`,
    );
}
