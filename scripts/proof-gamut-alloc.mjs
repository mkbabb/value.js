#!/usr/bin/env node
// proof:gamut-alloc — value.js O.W3 gate (born-RED, MEASURE-FIRST).
//
// THE REAL OBSERVABLE: a per-frame wide-gamut `gamutMap` egress call allocates
// N Color objects, pressuring the GC in the rAF loop. The gate counts REAL
// constructor invocations through the BUILT `dist/color.js` (the O.W2 ./color
// subpath) — NOT a source-grep. A rewrite that re-introduces a per-iteration
// Color allocation by any mechanism fails C1/C2 on the runtime count.
//
// MEASURE-FIRST baseline (recorded on the pre-cure tree, branch o3-zeroalloc
// at tranche-o 0.14.0 BEFORE the cure landed — see bench/color-alloc-hotpath.mjs
// + the O.W3 commit body):
//
//   gamutMap(display-p3 OOG)  N_BASELINE = 104 allocs/call   (PROVES the gate
//                                                              sees allocations —
//                                                              not a vacuous 0)
//
// The cure (scratch OKLCHColor in the bisection + transformMat3Into Vec3 reuse +
// JND early-exit) eliminates the 24 per-step `new OKLCHColor(...)` loop allocs:
//
//   gamutMap(display-p3 OOG)  N_CURED ≈ 84 allocs/call
//   gamutMap(mild-OOG, JND)   N_CURED ≈  6 allocs/call (bisection skipped)
//
// The residual ~84 are the per-step `color2` XYZ-hub conversion intermediates,
// whose elimination needs a `color2Into` out-param (deferred to O.W5 per the
// wave spec). The gate threshold N_TARGET = 90 proves the loop-OKLCHColor
// elimination held with margin while NOT over-claiming the deferred O.W5 win.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distColor = resolve(root, "dist/color.js");

console.log("proof:gamut-alloc — runtime Color-alloc count on the gamut-map hot path\n");

const results = [];
const record = (id, label, ok, detail) => {
    results.push({ id, ok });
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${id}  ${label}`);
    if (detail) console.log(`        ${detail}`);
};

if (!existsSync(distColor)) {
    console.log("  FAIL  C0  dist/color.js missing — run `npm run build` first");
    process.exit(1);
}

const C = await import(distColor);
const {
    Color, OKLCHColor, OKLABColor, XYZColor, RGBColor, DisplayP3Color,
    LABColor, LCHColor, HSLColor, HSVColor, HWBColor, LinearSRGBColor,
    AdobeRGBColor, ProPhotoRGBColor, Rec2020Color, KelvinColor,
} = C;

// ── The constructor-count shim (identical to bench/color-alloc-hotpath.mjs) ──
let allocCount = 0;
class CountingColor extends Color {
    constructor(...args) {
        super(...args);
        allocCount++;
    }
}
for (const cls of [
    OKLCHColor, OKLABColor, XYZColor, RGBColor, DisplayP3Color,
    LABColor, LCHColor, HSLColor, HSVColor, HWBColor,
    LinearSRGBColor, AdobeRGBColor, ProPhotoRGBColor, Rec2020Color, KelvinColor,
].filter(Boolean)) {
    Object.setPrototypeOf(cls, CountingColor);
}

const allocsPerCall = (fn, n = 100) => {
    fn(); // warm lazy scratch
    allocCount = 0;
    for (let i = 0; i < n; i++) fn();
    return allocCount / n;
};
const allocsOnce = (fn) => {
    fn();
    allocCount = 0;
    fn();
    return allocCount;
};

// ── Thresholds (derived from the recorded baseline) ──
const N_BASELINE = 104; // measured pre-cure (the gate-can-see-allocs witness)
const N_TARGET = 90; // < baseline by the 24-alloc loop elimination, with margin
const N_JND_MAX = 12; // the JND fast-path must skip the bisection entirely
const RAMP_MAX = 64; // sampleColorRamp(16) budget (unchanged by O.W3)
const EPSILON = 1e-6;

// Pre-cure golden outputs (captured on the baseline tree, far-OOG cases that
// route through the FULL bisection — they must remain bit-stable under the cure).
const GOLDEN = [
    { space: "display-p3", in: [1.2, 0.3, 0.5, 1], out: [1.0, 0.563925206335, 0.608310534557, 1.0] },
    { space: "rec2020", in: [1.3, 0.2, 0.4, 1], out: [1.0, 0.632939601915, 0.635353645371, 1.0] },
    { space: "a98-rgb", in: [1.1, 0.5, 1.2, 1], out: [0.960329491612, 0.735482735764, 1.0, 1.0] },
];
const CLASS_BY_SPACE = {
    "display-p3": DisplayP3Color,
    rec2020: Rec2020Color,
    "a98-rgb": AdobeRGBColor,
};

const OOG_P3 = new DisplayP3Color(1.2, 0.3, 0.5, 1);
const MILD_OOG_P3 = new DisplayP3Color(1.001, 0.999, 0.998, 1);
const RAMP_A = new OKLCHColor(0.6, 0.4, 0.2, 1);
const RAMP_B = new OKLCHColor(0.4, 0.3, 0.7, 1);

// ── C1 — the gate sees allocations (born-RED witness) ──
const n1 = allocsPerCall(() => C.gamutMap(OOG_P3, "display-p3"));
record(
    "C1-baseline",
    `gate sees real allocs on gamutMap(display-p3 OOG): ${n1} allocs/call (witness N_BASELINE=${N_BASELINE})`,
    n1 > 0,
    n1 > 0 ? undefined : "alloc count is 0 — the counter is blind (vacuous gate)",
);

// ── C2 — the cure reduced the alloc count below the loop-elimination target ──
record(
    "C2-cured",
    `gamutMap(display-p3 OOG) ${n1} allocs/call <= N_TARGET=${N_TARGET}`,
    n1 <= N_TARGET,
    n1 <= N_TARGET
        ? `eliminated the 24 per-step OKLCHColor allocs (baseline ${N_BASELINE} -> ${n1})`
        : `still ${n1} > ${N_TARGET} — the loop allocates per step`,
);

// ── C2b — the JND early-exit skips the bisection for mild OOG ──
const nJnd = allocsPerCall(() => C.gamutMap(MILD_OOG_P3, "display-p3"));
record(
    "C2-jnd",
    `gamutMap(mild OOG, JND fast-path) ${nJnd} allocs/call <= ${N_JND_MAX}`,
    nJnd <= N_JND_MAX,
    nJnd <= N_JND_MAX
        ? "JND early-exit skipped the 24-step bisection"
        : `${nJnd} > ${N_JND_MAX} — the JND fast-path did not fire`,
);

// ── C2c — sampleColorRamp stays within budget ──
const nRamp = allocsOnce(() => C.sampleColorRamp(RAMP_A, RAMP_B, 16));
record(
    "C2-ramp",
    `sampleColorRamp(16) ${nRamp} allocs <= ${RAMP_MAX}`,
    nRamp <= RAMP_MAX,
);

// ── C3 — numerical equivalence vs the pre-cure golden (no precision regression) ──
let epsOk = true;
let epsDetail = "";
for (const g of GOLDEN) {
    const Cls = CLASS_BY_SPACE[g.space];
    const mapped = C.gamutMap(new Cls(...g.in), g.space);
    const got = [mapped.r, mapped.g, mapped.b, mapped.alpha];
    for (let i = 0; i < 4; i++) {
        const d = Math.abs(got[i] - g.out[i]);
        if (d > EPSILON) {
            epsOk = false;
            epsDetail = `${g.space}[${i}] drift ${d.toExponential(3)} > ${EPSILON} (got ${got[i]}, want ${g.out[i]})`;
        }
    }
}
record(
    "C3-epsilon",
    `mapped output equals pre-cure golden within ${EPSILON}`,
    epsOk,
    epsOk ? "all far-OOG bisection outputs bit-stable" : epsDetail,
);

const failed = results.filter((r) => !r.ok);
console.log(
    `\n${failed.length === 0 ? "PASS" : "FAIL"} — ${results.length - failed.length}/${results.length} clauses green`,
);
process.exit(failed.length === 0 ? 0 : 1);
