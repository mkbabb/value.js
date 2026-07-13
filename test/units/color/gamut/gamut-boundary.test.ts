import { describe, expect, it } from "vitest";
import {
    sampleGamutBoundary,
    sampleGamutBoundaryInto,
    type GamutBoundary,
    type GamutBoundaryMode,
    type GamutBoundaryTarget,
} from "@src/units/color/gamut/boundary";
import * as colorSubpath from "@src/subpaths/color";

// ── White-box field reconstruction (boundary-api §8 items 2/4) ───────────────
// The module's field is private (the packet ships exactly 2 fns + 4 types); the
// property suite reconstructs it from the same package-internal pieces the
// module composes, so root-truth / monotonicity are independently checked.
import { multiplyMat3, transformMat3, type Mat3 } from "@src/units/color/matrix";
import { WHITE_POINT_D50_D65 } from "@src/units/color/constants";
import {
    ADOBE_RGB_XYZ_MATRIX,
    DISPLAY_P3_XYZ_MATRIX,
    PROPHOTO_XYZ_D50_MATRIX,
    REC2020_XYZ_MATRIX,
    XYZ_RGB_MATRIX,
} from "@src/units/color/conversions/xyz-extended";
import {
    adobeRgbToLinear,
    linearToSrgb,
    proPhotoToLinear,
    rec2020ToLinear,
    srgbToLinear,
} from "@src/units/color/conversions/transfer";
import {
    DELTA_E_OK_JND,
    deltaEOK,
    gamutMapOKLab,
    gamutMapOKLabInto,
    srgbToOKLab,
    srgbToOKLabInto,
} from "@src/units/color/gamut";

const TARGET_M: Record<GamutBoundaryTarget, { M: Mat3; decode: (c: number) => number }> = {
    "display-p3": { M: multiplyMat3(XYZ_RGB_MATRIX, DISPLAY_P3_XYZ_MATRIX), decode: srgbToLinear },
    "a98-rgb": { M: multiplyMat3(XYZ_RGB_MATRIX, ADOBE_RGB_XYZ_MATRIX), decode: adobeRgbToLinear },
    "prophoto-rgb": {
        M: multiplyMat3(multiplyMat3(XYZ_RGB_MATRIX, WHITE_POINT_D50_D65), PROPHOTO_XYZ_D50_MATRIX),
        decode: proPhotoToLinear,
    },
    rec2020: { M: multiplyMat3(XYZ_RGB_MATRIX, REC2020_XYZ_MATRIX), decode: rec2020ToLinear },
};

function hsv(h: number, s: number, v: number): [number, number, number] {
    const hp = h / 60;
    const c = v * s;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (hp < 1) { r = c; g = x; }
    else if (hp < 2) { r = x; g = c; }
    else if (hp < 3) { g = c; b = x; }
    else if (hp < 4) { g = x; b = c; }
    else if (hp < 5) { r = x; b = c; }
    else { r = c; b = x; }
    return [r + m, g + m, b + m];
}

function field(h: number, s: number, v: number, target: GamutBoundaryTarget, mode: GamutBoundaryMode): number {
    const { M, decode } = TARGET_M[target];
    const rgb = hsv(h, s, v);
    const lin = transformMat3([decode(rgb[0]), decode(rgb[1]), decode(rgb[2])], M);
    if (mode === "raw") {
        return Math.max(-lin[0], lin[0] - 1, -lin[1], lin[1] - 1, -lin[2], lin[2] - 1) - 1e-6;
    }
    const ok = srgbToOKLab(linearToSrgb(lin[0]), linearToSrgb(lin[1]), linearToSrgb(lin[2]));
    const mp = gamutMapOKLab(ok[0], ok[1], ok[2]);
    return deltaEOK(ok[0], ok[1], ok[2], mp[0], mp[1], mp[2]) - DELTA_E_OK_JND;
}

// ── Golden hues — regenerated POST-α (GAMUT_ALPHA=1.0), locked at 1e-3 ───────
// (Seeded from the α=0.05 proto F3 fractions per boundary-api §8; the α cure
// moved the JND locus, so these are the regenerated-and-locked values. Notable
// α shift: display-p3/240 blue was count=0 at α=0.05; at α=1.0 the deep blue
// crosses JND at s≳0.945, a sub-perceptual thin sliver.)
const GOLDENS: Array<[GamutBoundaryTarget, number, number, number]> = [
    // target, hue, count, oogTopFrac
    ["display-p3", 0, 72, 0.729435],
    ["display-p3", 300, 78, 0.798644],
    ["display-p3", 60, 27, 0.268880],
    ["display-p3", 240, 7, 0.055448],
    ["rec2020", 0, 90, 0.924331],
    ["rec2020", 60, 45, 0.451955],
    ["rec2020", 240, 29, 0.283653],
    ["a98-rgb", 0, 85, 0.870005],
    ["a98-rgb", 120, 53, 0.540407],
    ["a98-rgb", 240, 0, 0],
    ["prophoto-rgb", 0, 93, 0.950089],
    ["prophoto-rgb", 120, 80, 0.816701],
    ["prophoto-rgb", 240, 47, 0.475315],
];

describe("gamut-boundary — locked goldens (post-α)", () => {
    for (const [target, hue, count, oog] of GOLDENS) {
        it(`${target} h${hue}: count=${count}, oogTopFrac≈${oog}`, () => {
            const b = sampleGamutBoundary(hue, target);
            expect(b.count).toBe(count);
            expect(b.oogTopFrac).toBeCloseTo(oog, 3);
        });
    }
});

// ── Property suite (boundary-api §8 items 1–8) ───────────────────────────────

const TARGETS: GamutBoundaryTarget[] = ["display-p3", "a98-rgb", "prophoto-rgb", "rec2020"];

describe("gamut-boundary — property suite", () => {
    it("1 · shape: count ≤ columns+2, coords in [0,1], tip on top edge, s strictly increasing, ends at s=1", () => {
        const columns = 64;
        for (let hue = 0; hue < 360; hue += 30) {
            for (const target of TARGETS) {
                const b = sampleGamutBoundary(hue, target, { columns });
                expect(b.count).toBeLessThanOrEqual(columns + 2);
                if (b.count === 0) {
                    expect(b.oogTopFrac).toBe(0);
                    continue;
                }
                // tip on the top edge
                expect(b.points[1]).toBe(1);
                let prevS = -Infinity;
                for (let i = 0; i < b.count; i++) {
                    const s = b.points[2 * i]!;
                    const v = b.points[2 * i + 1]!;
                    expect(s).toBeGreaterThanOrEqual(0);
                    expect(s).toBeLessThanOrEqual(1);
                    expect(v).toBeGreaterThanOrEqual(0);
                    expect(v).toBeLessThanOrEqual(1);
                    expect(s).toBeGreaterThan(prevS); // strictly increasing
                    prevS = s;
                }
                // last root at s=1
                expect(b.points[2 * (b.count - 1)]).toBeCloseTo(1, 12);
            }
        }
    });

    it("2 · root truth: the field changes sign across each column root v ± 2⁻¹³", () => {
        const delta = 2 ** -13;
        for (const [target, hue] of [["display-p3", 0], ["display-p3", 60], ["rec2020", 0], ["prophoto-rgb", 120]] as const) {
            const b = sampleGamutBoundary(hue, target);
            // Column roots are indices 1..count-1 (index 0 is the tip, on v=1).
            for (let i = 1; i < b.count; i++) {
                const s = b.points[2 * i]!;
                const v = b.points[2 * i + 1]!;
                if (v >= 1 - delta) continue; // inert top-edge (no interior crossing)
                const below = field(hue, s, v - delta, target, "jnd");
                const above = field(hue, s, v + delta, target, "jnd");
                expect(below * above).toBeLessThan(0);
            }
        }
    });

    it("3 · consistency: oogTopFrac === 1 − points[0] when count>0, else 0", () => {
        for (let hue = 0; hue < 360; hue += 20) {
            for (const target of TARGETS) {
                const b = sampleGamutBoundary(hue, target);
                if (b.count > 0) {
                    expect(b.oogTopFrac).toBeCloseTo(1 - b.points[0]!, 12);
                } else {
                    expect(b.oogTopFrac).toBe(0);
                }
            }
        }
    });

    it("4 · monotonicity bound: single-column bisection is sufficient (≤10% jnd, ≤2% raw)", () => {
        const grid = 32;
        const checkMode = (target: GamutBoundaryTarget, mode: GamutBoundaryMode, budget: number) => {
            let columns = 0;
            let violations = 0;
            for (let hue = 0; hue < 360; hue += 15) {
                for (let ci = 1; ci <= grid; ci++) {
                    const s = ci / grid;
                    let signChanges = 0;
                    let prev = field(hue, s, 0, target, mode);
                    for (let vi = 1; vi <= grid; vi++) {
                        const cur = field(hue, s, vi / grid, target, mode);
                        if (prev <= 0 !== cur <= 0) signChanges++;
                        prev = cur;
                    }
                    columns++;
                    if (signChanges > 1) violations++;
                }
            }
            expect(violations / columns).toBeLessThanOrEqual(budget);
        };
        checkMode("display-p3", "jnd", 0.10);
        checkMode("a98-rgb", "raw", 0.02);
        checkMode("rec2020", "raw", 0.02);
    });

    it("5 · Into/allocating parity + scratch hygiene", () => {
        for (const [target, hue] of [["display-p3", 0], ["rec2020", 60], ["prophoto-rgb", 120]] as const) {
            const alloc = sampleGamutBoundary(hue, target);
            const out: GamutBoundary = { points: new Float64Array(2 * (96 + 2)), count: 0, oogTopFrac: 0 };
            sampleGamutBoundaryInto(hue, target, out);
            expect(out.count).toBe(alloc.count);
            expect(out.oogTopFrac).toBe(alloc.oogTopFrac);
            for (let i = 0; i < 2 * alloc.count; i++) {
                expect(out.points[i]).toBe(alloc.points[i]); // bit-identical
            }
            // A second Into call with identical args reproduces the first.
            const out2: GamutBoundary = { points: new Float64Array(2 * (96 + 2)), count: 0, oogTopFrac: 0 };
            sampleGamutBoundaryInto(hue, target, out2);
            for (let i = 0; i < 2 * alloc.count; i++) {
                expect(out2.points[i]).toBe(out.points[i]);
            }
        }
    });

    it("6 · gamut.ts companion parity over a 500-sample deep-OOG corpus", () => {
        const ok: [number, number, number] = [0, 0, 0];
        const gRef = [0, 0, 0] as [number, number, number];
        const gInto: [number, number, number] = [0, 0, 0];
        let seed = 0x9e3779b9;
        const rnd = () => {
            seed = (seed * 1664525 + 1013904223) >>> 0;
            return seed / 0xffffffff;
        };
        for (let i = 0; i < 500; i++) {
            // Wide range including deep-OOG sRGB inputs (−0.3 … 1.3).
            const r = rnd() * 1.6 - 0.3;
            const g = rnd() * 1.6 - 0.3;
            const b = rnd() * 1.6 - 0.3;
            const ref = srgbToOKLab(r, g, b);
            srgbToOKLabInto(r, g, b, ok);
            expect(ok[0]).toBe(ref[0]);
            expect(ok[1]).toBe(ref[1]);
            expect(ok[2]).toBe(ref[2]);
            const [gr0, gr1, gr2] = gamutMapOKLab(ref[0], ref[1], ref[2]);
            gRef[0] = gr0; gRef[1] = gr1; gRef[2] = gr2;
            gamutMapOKLabInto(ref[0], ref[1], ref[2], gInto);
            expect(gInto[0]).toBe(gRef[0]);
            expect(gInto[1]).toBe(gRef[1]);
            expect(gInto[2]).toBe(gRef[2]);
        }
    });

    it("7 · edges: non-finite hue empty; wrap mod 360; bad columns / undersized out → RangeError; raw/jnd mode split", () => {
        // Non-finite hue → empty (achromatic).
        for (const h of [NaN, Infinity, -Infinity]) {
            const b = sampleGamutBoundary(h, "display-p3");
            expect(b.count).toBe(0);
            expect(b.oogTopFrac).toBe(0);
        }
        // Finite hues wrap mod 360.
        const wrapped = sampleGamutBoundary(360.5, "display-p3");
        const base = sampleGamutBoundary(0.5, "display-p3");
        expect(wrapped.count).toBe(base.count);
        expect(wrapped.oogTopFrac).toBeCloseTo(base.oogTopFrac, 12);

        // Bad column counts fail fast.
        expect(() => sampleGamutBoundary(0, "display-p3", { columns: 1 })).toThrow(RangeError);
        expect(() => sampleGamutBoundary(0, "display-p3", { columns: 96.5 })).toThrow(RangeError);
        // Undersized out buffer.
        const tiny: GamutBoundary = { points: new Float64Array(4), count: 0, oogTopFrac: 0 };
        expect(() => sampleGamutBoundaryInto(0, "display-p3", tiny)).toThrow(RangeError);

        // The raw/jnd mode split — a98-rgb/240: jnd empty (blue shares sRGB's
        // primary → no perceptible clipping) while raw hugs the top edge (any
        // strictly-wider target has 1e-6 excess). Pins the two modes apart.
        const jnd = sampleGamutBoundary(240, "a98-rgb", { mode: "jnd" });
        const raw = sampleGamutBoundary(240, "a98-rgb", { mode: "raw" });
        expect(jnd.count).toBe(0);
        expect(raw.count).toBeGreaterThan(0);
    });

    it("8 · barrel/subpath: the 2 fns + 4 types resolve; matrices/companions absent from the export set", () => {
        expect(typeof colorSubpath.sampleGamutBoundary).toBe("function");
        expect(typeof colorSubpath.sampleGamutBoundaryInto).toBe("function");
        // Package-internal matrices + Into companions must NOT leak into the subpath.
        const keys = Object.keys(colorSubpath);
        for (const forbidden of [
            "XYZ_RGB_MATRIX",
            "DISPLAY_P3_XYZ_MATRIX",
            "ADOBE_RGB_XYZ_MATRIX",
            "PROPHOTO_XYZ_D50_MATRIX",
            "REC2020_XYZ_MATRIX",
            "srgbToOKLabInto",
            "gamutMapOKLabInto",
        ]) {
            expect(keys).not.toContain(forbidden);
        }
    });
});
