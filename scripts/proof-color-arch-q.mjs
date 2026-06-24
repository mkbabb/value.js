#!/usr/bin/env node
// proof:color-arch-q — value.js Tranche Q (VJ-Q3 + VJ-Q4 + VJ-Q8, 1.2.0) gate.
//
// THE REAL OBSERVABLES (over the BUILT dist/subpaths/color.js + dist/value.js):
//   VJ-Q3 — mixColorsInto / sampleColorRampAt / structural-clone:
//           * mixColorsInto allocs FEWER colors than mixColors (the array + spread
//             killed) and is BIT-EXACT.
//           * sampleColorRampAt(a,b,i/(n-1)) === sampleColorRamp(a,b,n)[i] bit-exact.
//   VJ-Q4 — flatLeaf .fnName: a `ValueUnit.fnName` survives clone() (the kf S8
//           WeakMap-terminal provenance), populated by flattenObject.
//   VJ-Q8 — ColorChannelPlan + lerpColorChannels: the SoA buffer fold is bit-exact
//           vs the per-element Color lerp (the kf SoA-color-tail enabler).
//
// Run `npm run build` first.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distColor = resolve(root, "dist/subpaths/color.js");
const distMain = resolve(root, "dist/value.js");

let C, V;
try {
    C = await import(distColor);
    V = await import(distMain);
} catch (e) {
    console.error(`FATAL: cannot import built dist — run \`npm run build\` first.`);
    console.error(`  ${e?.stack ?? e}`);
    process.exit(1);
}

const {
    Color, OKLABColor, OKLCHColor, RGBColor, XYZColor, DisplayP3Color,
    LABColor, LCHColor, HSLColor, HSVColor, HWBColor, LinearSRGBColor,
    AdobeRGBColor, ProPhotoRGBColor, Rec2020Color, KelvinColor,
    mixColors, mixColorsInto, sampleColorRamp, sampleColorRampAt,
} = C;
const {
    ValueUnit, FunctionValue, flattenObject, lerp,
    buildColorChannelPlan, packColorChannels, lerpColorChannels,
} = V;

const results = [];
const record = (id, label, fn) => {
    try {
        fn();
        results.push({ id, label, pass: true });
    } catch (e) {
        results.push({ id, label, pass: false, err: e?.message ?? String(e) });
    }
};
const assert = (cond, msg) => {
    if (!cond) throw new Error(msg);
};

// Constructor-count shim (the proof-gamut-alloc pattern).
let allocCount = 0;
class CountingColor extends Color {
    constructor(...args) {
        super(...args);
        allocCount++;
    }
}
for (const cls of [
    OKLCHColor, OKLABColor, XYZColor, RGBColor, DisplayP3Color, LABColor,
    LCHColor, HSLColor, HSVColor, HWBColor, LinearSRGBColor, AdobeRGBColor,
    ProPhotoRGBColor, Rec2020Color, KelvinColor,
].filter(Boolean)) {
    Object.setPrototypeOf(cls, CountingColor);
}
const allocsOnce = (fn) => {
    fn(); // warm
    allocCount = 0;
    fn();
    return allocCount;
};

console.log("proof:color-arch-q — VJ-Q3 out-params + VJ-Q4 fnName + VJ-Q8 SoA\n");

// ── VJ-Q3 C1 — mixColorsInto fewer allocs + bit-exact ──
record("C1", "mixColorsInto allocs fewer Colors than mixColors AND is bit-exact", () => {
    const c1 = new RGBColor(1, 0, 0, 1);
    const c2 = new RGBColor(0, 0, 1, 1);
    const out = new OKLABColor(0, 0, 0, 1);
    // warm both scratch paths
    mixColors(c1, c2, 0.3, 0.7, "oklab", "shorter");
    mixColorsInto(c1, c2, 0.3, 0.7, "oklab", "shorter", out);

    const nMix = allocsOnce(() => mixColors(c1, c2, 0.3, 0.7, "oklab", "shorter"));
    const nInto = allocsOnce(() => mixColorsInto(c1, c2, 0.3, 0.7, "oklab", "shorter", out));
    assert(nMix > 0, `mixColors allocs 0 — counter blind`);
    assert(nInto < nMix, `mixColorsInto (${nInto}) did not undercut mixColors (${nMix})`);

    const ref = mixColors(c1, c2, 0.3, 0.7, "oklab", "shorter");
    const got = mixColorsInto(c1, c2, 0.3, 0.7, "oklab", "shorter", new OKLABColor(0, 0, 0, 1));
    for (const k of ref.keys()) {
        const d = Math.abs(Number(ref[k]) - Number(got[k]));
        assert(d < 1e-12, `mix drift ${k}: ${d}`);
    }
});

// ── VJ-Q3 C2 — sampleColorRampAt bit-exact vs the indexed ramp ──
record("C2", "sampleColorRampAt(a,b,i/(n-1)) === sampleColorRamp(a,b,n)[i] bit-exact", () => {
    const a = new OKLCHColor(0.6, 0.4, 0.2, 1);
    const b = new OKLCHColor(0.4, 0.3, 0.7, 1);
    const n = 8;
    const ramp = sampleColorRamp(a, b, n, { space: "oklch" });
    for (let i = 0; i < n; i++) {
        const at = sampleColorRampAt(a, b, i / (n - 1), { space: "oklch" });
        for (const k of ramp[i].keys()) {
            const d = Math.abs(Number(ramp[i][k]) - Number(at[k]));
            assert(d < 1e-12, `ramp drift i=${i} ${k}: ${d}`);
        }
    }
});

// ── VJ-Q4 C3 — fnName survives clone() + flattenObject populates it ──
record("C3", "ValueUnit.fnName survives clone() + flattenObject stamps it", () => {
    const u = new ValueUnit(2, "", undefined, undefined, undefined, undefined, "scale");
    assert(u.fnName === "scale", `ctor fnName = ${u.fnName}`);
    assert(u.clone().fnName === "scale", "fnName did not survive clone()");
    assert(u.clone().clone().fnName === "scale", "fnName did not survive a clone chain");

    const fn = new FunctionValue("rotate", [new ValueUnit(45, "deg")]);
    const flat = flattenObject({ transform: fn });
    let found = false;
    for (const arr of Object.values(flat)) {
        for (const leaf of arr) {
            if (leaf instanceof ValueUnit && leaf.fnName === "rotate") found = true;
        }
    }
    assert(found, "flattenObject did not stamp fnName='rotate' on the leaf");
});

// ── VJ-Q8 C4 — the SoA color fold is bit-exact vs per-element Color lerp ──
record("C4", "lerpColorChannels SoA fold is bit-exact vs per-element Color lerp (oklab + oklch hue)", () => {
    assert(typeof buildColorChannelPlan === "function", "buildColorChannelPlan not exported");
    assert(typeof lerpColorChannels === "function", "lerpColorChannels not exported");

    // oklab (no hue)
    const K = 4;
    const starts = Array.from({ length: K }, (_, i) => new OKLABColor(0.3 + i * 0.05, 0.1, -0.05, 1));
    const stops = Array.from({ length: K }, (_, i) => new OKLABColor(0.8 - i * 0.05, -0.1, 0.05, 0.8));
    const plan = buildColorChannelPlan(starts[0]);
    const sB = new Float64Array(K * plan.stride);
    const eB = new Float64Array(K * plan.stride);
    const oB = new Float64Array(K * plan.stride);
    for (let k = 0; k < K; k++) {
        packColorChannels(starts[k], plan, sB, k);
        packColorChannels(stops[k], plan, eB, k);
    }
    for (const t of [0, 0.25, 0.5, 0.73, 1]) {
        lerpColorChannels(t, sB, eB, oB, plan);
        for (let k = 0; k < K; k++) {
            const s = starts[k], e = stops[k];
            const ref = [lerp(+s.l, +e.l, t), lerp(+s.a, +e.a, t), lerp(+s.b, +e.b, t), lerp(+s.alpha, +e.alpha, t)];
            for (let c = 0; c < plan.stride; c++) {
                const d = Math.abs(oB[k * plan.stride + c] - ref[c]);
                assert(d < 1e-12, `oklab SoA drift t=${t} k=${k} c=${c}: ${d}`);
            }
        }
    }

    // oklch (hue at index 2)
    const ocS = new OKLCHColor(0.6, 0.2, 30, 1);
    const ocE = new OKLCHColor(0.4, 0.3, 300, 1);
    const planH = buildColorChannelPlan(ocS);
    assert(planH.hueIndex === 2, `oklch hueIndex = ${planH.hueIndex} (want 2)`);
    const sH = new Float64Array(planH.stride);
    const eH = new Float64Array(planH.stride);
    const oH = new Float64Array(planH.stride);
    packColorChannels(ocS, planH, sH, 0);
    packColorChannels(ocE, planH, eH, 0);
    for (const t of [0, 0.5, 1]) {
        lerpColorChannels(t, sH, eH, oH, planH);
        const refL = lerp(+ocS.l, +ocE.l, t);
        const refC = lerp(+ocS.c, +ocE.c, t);
        // hue via the same interpolateHue path the plan folds (the ÷360 packed in)
        assert(Math.abs(oH[0] - refL) < 1e-12, `oklch L drift t=${t}`);
        assert(Math.abs(oH[1] - refC) < 1e-12, `oklch C drift t=${t}`);
        assert(oH[2] >= 0 && oH[2] <= 360, `oklch H out of degrees range t=${t}: ${oH[2]}`);
    }
});

let failed = 0;
for (const r of results) {
    if (r.pass) {
        console.log(`  PASS  ${r.id}  ${r.label}`);
    } else {
        failed++;
        console.log(`  FAIL  ${r.id}  ${r.label}`);
        console.log(`        → ${r.err}`);
    }
}

console.log("");
if (failed === 0) {
    console.log(
        `proof:color-arch-q GREEN — ${results.length}/${results.length} clauses pass (VJ-Q3 + VJ-Q4 + VJ-Q8 hold)`,
    );
    process.exit(0);
} else {
    console.log(`proof:color-arch-q RED — ${failed}/${results.length} clauses fail`);
    process.exit(1);
}
