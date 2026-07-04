import { describe, expect, it } from "vitest";
import {
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    isInSRGBGamut,
    oklabToLinearSRGB,
    gamutMapOKLab,
    rawOklchToOklab,
    deltaEOK,
    DELTA_E_OK_JND,
} from "../src/units/color/gamut";
import { RGBColor, OKLCHColor, OKLABColor, DisplayP3Color, LABColor } from "../src/units/color";
import { color2, gamutMap } from "../src/units/color/dispatch";
import { scale } from "../src/math";
import { COLOR_SPACE_RANGES } from "../src/units/color/constants";

describe("oklabToLinearSRGB", () => {
    it("maps black (L=0) to (0,0,0)", () => {
        const [r, g, b] = oklabToLinearSRGB(0, 0, 0);
        expect(r).toBeCloseTo(0, 5);
        expect(g).toBeCloseTo(0, 5);
        expect(b).toBeCloseTo(0, 5);
    });

    it("maps white (L=1) to approximately (1,1,1)", () => {
        const [r, g, b] = oklabToLinearSRGB(1, 0, 0);
        expect(r).toBeCloseTo(1, 3);
        expect(g).toBeCloseTo(1, 3);
        expect(b).toBeCloseTo(1, 3);
    });

    it("maps mid-gray to ~(0.18, 0.18, 0.18)", () => {
        const [r, g, b] = oklabToLinearSRGB(0.5, 0, 0);
        // All channels should be equal for achromatic
        expect(r).toBeCloseTo(g, 5);
        expect(g).toBeCloseTo(b, 5);
        expect(r).toBeGreaterThan(0);
        expect(r).toBeLessThan(1);
    });
});

describe("isInSRGBGamut", () => {
    it("returns true for valid colors", () => {
        expect(isInSRGBGamut(0, 0, 0)).toBe(true);
        expect(isInSRGBGamut(1, 1, 1)).toBe(true);
        expect(isInSRGBGamut(0.5, 0.5, 0.5)).toBe(true);
    });

    it("returns false for negative values", () => {
        expect(isInSRGBGamut(-0.01, 0.5, 0.5)).toBe(false);
    });

    it("returns false for values > 1", () => {
        expect(isInSRGBGamut(1.01, 0.5, 0.5)).toBe(false);
    });

    it("returns true for exact boundary values", () => {
        expect(isInSRGBGamut(0, 1, 0)).toBe(true);
        expect(isInSRGBGamut(1, 0, 1)).toBe(true);
    });
});

describe("computeMaxSaturation", () => {
    it("returns positive S for known hue directions", () => {
        // Pure red direction in OKLab
        const S_red = computeMaxSaturation(1, 0);
        expect(S_red).toBeGreaterThan(0);

        // Pure blue direction
        const S_blue = computeMaxSaturation(0, -1);
        expect(S_blue).toBeGreaterThan(0);

        // Pure green direction
        const S_green = computeMaxSaturation(-1, 0);
        expect(S_green).toBeGreaterThan(0);
    });

    it("produces finite results across all hue angles", () => {
        for (let deg = 0; deg < 360; deg += 15) {
            const rad = (deg * Math.PI) / 180;
            const a_ = Math.cos(rad);
            const b_ = Math.sin(rad);
            const S = computeMaxSaturation(a_, b_);
            expect(S).toBeGreaterThan(0);
            expect(Number.isFinite(S)).toBe(true);
        }
    });
});

describe("findCusp", () => {
    it("returns L_cusp in (0,1) and C_cusp > 0", () => {
        for (let deg = 0; deg < 360; deg += 30) {
            const rad = (deg * Math.PI) / 180;
            const a_ = Math.cos(rad);
            const b_ = Math.sin(rad);
            const cusp = findCusp(a_, b_);
            expect(cusp.L).toBeGreaterThan(0);
            expect(cusp.L).toBeLessThan(1);
            expect(cusp.C).toBeGreaterThan(0);
        }
    });

    it("red hue cusp has high chroma and mid lightness", () => {
        // Ottosson's red hue ≈ 29°
        const rad = (29 * Math.PI) / 180;
        const cusp = findCusp(Math.cos(rad), Math.sin(rad));
        expect(cusp.L).toBeGreaterThan(0.4);
        expect(cusp.L).toBeLessThan(0.8);
        expect(cusp.C).toBeGreaterThan(0.15);
    });

    it("blue hue cusp has lower lightness", () => {
        // Blue ≈ 264°
        const rad = (264 * Math.PI) / 180;
        const cusp = findCusp(Math.cos(rad), Math.sin(rad));
        expect(cusp.L).toBeGreaterThan(0.2);
        expect(cusp.L).toBeLessThan(0.6);
        expect(cusp.C).toBeGreaterThan(0.1);
    });
});

describe("findGamutIntersection", () => {
    it("returns t in [0,1]", () => {
        for (let deg = 0; deg < 360; deg += 45) {
            const rad = (deg * Math.PI) / 180;
            const a_ = Math.cos(rad);
            const b_ = Math.sin(rad);
            const cusp = findCusp(a_, b_);

            // Test with an out-of-gamut point
            const t = findGamutIntersection(a_, b_, 0.5, cusp.C * 2, 0.5, cusp);
            expect(t).toBeGreaterThanOrEqual(0);
            expect(t).toBeLessThanOrEqual(1);
        }
    });

    it("returns values near 1 for nearly in-gamut points", () => {
        const a_ = 1, b_ = 0;
        const cusp = findCusp(a_, b_);
        // A point just slightly beyond the cusp chroma
        const t = findGamutIntersection(a_, b_, cusp.L, cusp.C * 1.01, cusp.L, cusp);
        expect(t).toBeGreaterThan(0.9);
        expect(t).toBeLessThanOrEqual(1);
    });
});

describe("deltaEOK", () => {
    it("is zero for identical colors", () => {
        expect(deltaEOK(0.5, 0.1, -0.1, 0.5, 0.1, -0.1)).toBeCloseTo(0, 10);
    });

    it("is 1.0 for black → white", () => {
        expect(deltaEOK(0, 0, 0, 1, 0, 0)).toBeCloseTo(1, 5);
    });

    it("is symmetric", () => {
        const d1 = deltaEOK(0.3, 0.1, 0.05, 0.7, -0.1, 0.1);
        const d2 = deltaEOK(0.7, -0.1, 0.1, 0.3, 0.1, 0.05);
        expect(d1).toBeCloseTo(d2, 10);
    });

    it("JND constant is 0.02", () => {
        expect(DELTA_E_OK_JND).toBe(0.02);
    });
});

describe("gamutMapOKLab", () => {
    it("passes through achromatic colors unchanged", () => {
        const [L, a, b] = gamutMapOKLab(0.5, 0, 0);
        expect(L).toBeCloseTo(0.5, 5);
        expect(a).toBeCloseTo(0, 5);
        expect(b).toBeCloseTo(0, 5);
    });

    it("passes through in-gamut colors unchanged", () => {
        // A muted in-gamut color
        const [L, a, b] = gamutMapOKLab(0.6, 0.05, 0.03);
        expect(L).toBeCloseTo(0.6, 3);
        expect(a).toBeCloseTo(0.05, 3);
        expect(b).toBeCloseTo(0.03, 3);
    });

    it("maps out-of-gamut colors to in-gamut", () => {
        // Extreme out-of-gamut
        const [L, a, b] = gamutMapOKLab(0.7, 0.35, 0.0);
        const [r, g, bLin] = oklabToLinearSRGB(L, a, b);
        expect(r).toBeGreaterThanOrEqual(-0.001);
        expect(r).toBeLessThanOrEqual(1.001);
        expect(g).toBeGreaterThanOrEqual(-0.001);
        expect(g).toBeLessThanOrEqual(1.001);
        expect(bLin).toBeGreaterThanOrEqual(-0.001);
        expect(bLin).toBeLessThanOrEqual(1.001);
    });

    it("preserves black", () => {
        const [L, a, b] = gamutMapOKLab(0, 0, 0);
        expect(L).toBeCloseTo(0, 5);
    });

    it("preserves white", () => {
        const [L, a, b] = gamutMapOKLab(1, 0, 0);
        expect(L).toBeCloseTo(1, 3);
    });
});

describe("gamutMap (public API)", () => {
    it("leaves an in-gamut RGB color unchanged", () => {
        const original = new RGBColor(0.5, 0.3, 0.7, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(0.5, 5);
        expect(mapped.g).toBeCloseTo(0.3, 5);
        expect(mapped.b).toBeCloseTo(0.7, 5);
    });

    it("leaves black unchanged", () => {
        const original = new RGBColor(0, 0, 0, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(0, 5);
        expect(mapped.g).toBeCloseTo(0, 5);
        expect(mapped.b).toBeCloseTo(0, 5);
    });

    it("leaves white unchanged", () => {
        const original = new RGBColor(1, 1, 1, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeCloseTo(1, 5);
        expect(mapped.g).toBeCloseTo(1, 5);
        expect(mapped.b).toBeCloseTo(1, 5);
    });

    it("clips out-of-gamut RGB values to [0, 1]", () => {
        const original = new RGBColor(1.5, -0.2, 0.8, 1);
        const mapped = gamutMap(original);
        expect(mapped.r).toBeGreaterThanOrEqual(0);
        expect(mapped.r).toBeLessThanOrEqual(1);
        expect(mapped.g).toBeGreaterThanOrEqual(0);
        expect(mapped.g).toBeLessThanOrEqual(1);
        expect(mapped.b).toBeGreaterThanOrEqual(0);
        expect(mapped.b).toBeLessThanOrEqual(1);
    });

    it("produces in-gamut results for large overshoot", () => {
        const original = new RGBColor(2.0, -0.5, 1.5, 1);
        const mapped = gamutMap(original);
        const rgb = color2(mapped, "rgb") as RGBColor;
        expect(rgb.r).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.r).toBeLessThanOrEqual(1.01);
        expect(rgb.g).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.g).toBeLessThanOrEqual(1.01);
        expect(rgb.b).toBeGreaterThanOrEqual(-0.01);
        expect(rgb.b).toBeLessThanOrEqual(1.01);
    });

    it("preserves alpha through gamut mapping", () => {
        const original = new RGBColor(1.5, 0.5, 0.5, 0.77);
        const mapped = gamutMap(original);
        expect(mapped.alpha).toBeCloseTo(0.77, 2);
    });
});

describe("wide-gamut egress (O.W3 zero-alloc path)", () => {
    it("maps a far-out-of-gamut display-p3 color into the P3 box", () => {
        const original = new DisplayP3Color(1.2, 0.3, 0.5, 1);
        const mapped = gamutMap(original, "display-p3");
        const p3 = color2(mapped, "display-p3") as DisplayP3Color;
        for (const ch of [p3.r, p3.g, p3.b] as number[]) {
            expect(ch).toBeGreaterThanOrEqual(-1e-6);
            expect(ch).toBeLessThanOrEqual(1 + 1e-6);
        }
    });

    it("preserves hue under the OKLCh chroma-reduction bisection", () => {
        const original = new DisplayP3Color(1.2, 0.3, 0.5, 1);
        const beforeH = (color2(original, "oklch") as OKLCHColor).h as number;
        const mapped = gamutMap(original, "display-p3");
        const afterH = (color2(mapped, "oklch") as OKLCHColor).h as number;
        const hueDiff = Math.abs(beforeH - afterH);
        expect(Math.min(hueDiff, 1 - hueDiff) * 360).toBeLessThan(2);
    });

    it("JND early-exit: a mildly-OOG color clamps within DELTA_E_OK_JND of the full map", () => {
        // r=1.001 — out of the P3 box by FP arithmetic, but sub-JND from a clamp.
        const original = new DisplayP3Color(1.001, 0.999, 0.998, 1);
        const mapped = gamutMap(original, "display-p3");

        // The mapped result must be in gamut...
        const p3 = color2(mapped, "display-p3") as DisplayP3Color;
        for (const ch of [p3.r, p3.g, p3.b] as number[]) {
            expect(ch).toBeGreaterThanOrEqual(-1e-6);
            expect(ch).toBeLessThanOrEqual(1 + 1e-6);
        }

        // ...and perceptually indistinguishable (< JND in OKLab) from the source.
        const a = color2(original, "oklab") as OKLABColor;
        const b = color2(mapped, "oklab") as OKLABColor;
        const dE = deltaEOK(
            a.l as number, a.a as number, a.b as number,
            b.l as number, b.a as number, b.b as number,
        );
        expect(dE).toBeLessThan(DELTA_E_OK_JND);
    });

    it("preserves alpha through the wide-gamut egress", () => {
        const original = new DisplayP3Color(0.9, 1.4, 0.1, 0.42);
        const mapped = gamutMap(original, "display-p3");
        expect(mapped.alpha).toBeCloseTo(0.42, 6);
    });
});

describe("hue preservation", () => {
    it("preserves hue for out-of-gamut OKLCh colors", () => {
        // Test several hue angles with high chroma
        const hues = [0, 30, 60, 90, 120, 180, 240, 300];

        for (const hueDeg of hues) {
            const h = hueDeg / 360; // normalized [0,1]
            // Very high chroma (out of gamut)
            const c = scale(0.4, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);

            const original = new OKLCHColor(0.7, c, h, 1);
            const mapped = gamutMap(original);

            // Convert mapped back to OKLCh to check hue
            const mappedLCh = color2(mapped, "oklch") as OKLCHColor;

            // Hue should be preserved within ~2° (accounting for conversion roundtrip)
            const hueDiff = Math.abs(mappedLCh.h - h);
            const wrappedDiff = Math.min(hueDiff, 1 - hueDiff) * 360;
            expect(wrappedDiff).toBeLessThan(2);
        }
    });
});

describe("stability (idempotency)", () => {
    it("mapping an already-mapped color produces no further change", () => {
        const outOfGamut = new RGBColor(1.5, -0.3, 0.8, 1);
        const mapped1 = gamutMap(outOfGamut);
        const mapped2 = gamutMap(mapped1);

        const rgb1 = color2(mapped1, "rgb") as RGBColor;
        const rgb2 = color2(mapped2, "rgb") as RGBColor;

        expect(rgb2.r).toBeCloseTo(rgb1.r, 4);
        expect(rgb2.g).toBeCloseTo(rgb1.g, 4);
        expect(rgb2.b).toBeCloseTo(rgb1.b, 4);
    });
});

describe("quality — hard colors", () => {
    it("handles saturated yellow (high L, high C)", () => {
        // oklch(90% 0.4 110°) — very saturated yellow, way out of gamut
        const h = 110 / 360;
        const c = scale(0.4, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);
        const original = new OKLCHColor(0.9, c, h, 1);
        const mapped = gamutMap(original);
        const rgb = color2(mapped, "rgb") as RGBColor;

        expect(rgb.r).toBeGreaterThanOrEqual(0);
        expect(rgb.r).toBeLessThanOrEqual(1);
        expect(rgb.g).toBeGreaterThanOrEqual(0);
        expect(rgb.g).toBeLessThanOrEqual(1);
        expect(rgb.b).toBeGreaterThanOrEqual(0);
        expect(rgb.b).toBeLessThanOrEqual(1);
    });

    it("handles deep blue (low L, high C)", () => {
        // oklch(30% 0.4 264°) — deep saturated blue
        const h = 264 / 360;
        const c = scale(0.4, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);
        const original = new OKLCHColor(0.3, c, h, 1);
        const mapped = gamutMap(original);
        const rgb = color2(mapped, "rgb") as RGBColor;

        expect(rgb.r).toBeGreaterThanOrEqual(0);
        expect(rgb.r).toBeLessThanOrEqual(1);
        expect(rgb.g).toBeGreaterThanOrEqual(0);
        expect(rgb.g).toBeLessThanOrEqual(1);
        expect(rgb.b).toBeGreaterThanOrEqual(0);
        expect(rgb.b).toBeLessThanOrEqual(1);
    });

    it("handles extreme Display P3 blue", () => {
        // oklch(45% 0.35 264°)
        const h = 264 / 360;
        const c = scale(0.35, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);
        const original = new OKLCHColor(0.45, c, h, 1);
        const mapped = gamutMap(original);
        const rgb = color2(mapped, "rgb") as RGBColor;

        expect(rgb.r).toBeGreaterThanOrEqual(0);
        expect(rgb.r).toBeLessThanOrEqual(1);
        expect(rgb.g).toBeGreaterThanOrEqual(0);
        expect(rgb.g).toBeLessThanOrEqual(1);
        expect(rgb.b).toBeGreaterThanOrEqual(0);
        expect(rgb.b).toBeLessThanOrEqual(1);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// R.W1.1 — the U10 gamut cure (GAMUT_ALPHA = 1.0, Q7 RATIFIED 2026-07-03).
//
// The adaptive-L0 anchor pulls out-of-gamut light-saturated colors along their
// constant-hue ray toward a vivid in-gamut point instead of washing them toward
// mid-lightness. These oracles LOCK the cured behaviour (they would fail under
// the pre-cure α=0.05 wash) and the tiered ΔL safety bound the α=1.0 setting
// ships with (audit/pass2/gamut-bound.md §2.2/§7).
// ─────────────────────────────────────────────────────────────────────────────

/** Round a normalized [0,1] sRGB channel to an 8-bit component. */
const to255 = (ch: number): number => Math.round(ch * 255);

/** The 8-bit sRGB triple of a gamut-mapped color. */
const mappedRgb255 = (c: OKLCHColor | LABColor): [number, number, number] => {
    const rgb = color2(gamutMap(c), "rgb") as RGBColor;
    return [to255(rgb.r as number), to255(rgb.g as number), to255(rgb.b as number)];
};

/** Denormalize an OKLCh raw chroma (0…0.4) into the normalized component. */
const oklchC = (raw: number): number =>
    scale(raw, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);

describe("U10 gamut cure — the α=1.0 oracle (R.W1.1)", () => {
    it("the pink oracle: lab(92% 88.8 20) → rgb(255,167,180) — the vivid 'land between'", () => {
        // The U10 head oracle. Browser MINDE lands this super-gamut pink pale;
        // the α=1.0 anchor lands it VIVID at the ratified reference (39% chroma
        // retention). Exact 8-bit target per gamut-bound.md §2.3/§7.
        const pink = new LABColor(
            0.92, // L: 92% of [0,100]
            (88.8 + 125) / 250, // a: +88.8 in [-125,125]
            (20 + 125) / 250, // b: +20 in [-125,125]
            1,
        );
        expect(mappedRgb255(pink)).toEqual([255, 167, 180]);
    });

    // The far-OOG light regression corpus — the pathology class U10 names. Each
    // input sits well beyond sRGB; the cure must land it in-gamut, hue-EXACT,
    // and vivid. The 8-bit triples are goldens locked post-α (they move if the
    // constant drifts) — the pre-cure wash produced markedly paler values.
    const corpus: {
        name: string;
        L: number;
        cRaw: number;
        hueDeg: number;
        rgb255: [number, number, number];
    }[] = [
        { name: "light-pink", L: 0.92, cRaw: 0.2, hueDeg: 20, rgb255: [255, 173, 172] },
        { name: "saturated-yellow", L: 0.9, cRaw: 0.4, hueDeg: 110, rgb255: [188, 189, 0] },
        { name: "light-cyan", L: 0.85, cRaw: 0.2, hueDeg: 195, rgb255: [0, 218, 219] },
    ];

    for (const { name, L, cRaw, hueDeg, rgb255 } of corpus) {
        it(`far-OOG ${name} lands in-gamut, hue-exact, and vivid`, () => {
            const original = new OKLCHColor(L, oklchC(cRaw), hueDeg / 360, 1);
            const mapped = gamutMap(original);

            // In gamut.
            const rgb = color2(mapped, "rgb") as RGBColor;
            for (const ch of [rgb.r, rgb.g, rgb.b] as number[]) {
                expect(ch).toBeGreaterThanOrEqual(0);
                expect(ch).toBeLessThanOrEqual(1);
            }

            // Hue held exactly (the α-tune moves only along the constant-hue ray).
            const lch = color2(mapped, "oklch") as OKLCHColor;
            const hueDiff = Math.abs((lch.h as number) * 360 - hueDeg);
            expect(Math.min(hueDiff, 360 - hueDiff)).toBeLessThan(0.5);

            // The vivid golden (regression lock).
            expect([to255(rgb.r as number), to255(rgb.g as number), to255(rgb.b as number)]).toEqual(rgb255);
        });
    }
});

describe("U10 tiered-bound guard (R.W1.1)", () => {
    // The mid/dark guard band from gamut-bound.md §2.2: C∈{0.37,0.40} (authored
    // super-gamut chroma — above every real gamut's cusp) × L∈{0.30,0.35,0.50,
    // 0.65} × 12 hues. The α=1.0 self-limiting anchor holds worst-case ΔL under
    // the tiered bound. The lock is < 0.09 (NOT the false "<0.05"): the true
    // worst case is 0.083 at (L0.30, C0.40, H210).
    const GUARD_L = [0.3, 0.35, 0.5, 0.65];

    it("authored super-gamut chroma C∈{0.37,0.40}: worst-case ΔL < 0.09", () => {
        let maxDL = 0;
        for (const cRaw of [0.37, 0.4]) {
            for (const L of GUARD_L) {
                for (let hueDeg = 0; hueDeg < 360; hueDeg += 30) {
                    const [Li, ai, bi] = rawOklchToOklab(L, cRaw, hueDeg);
                    const [Lm] = gamutMapOKLab(Li, ai, bi);
                    maxDL = Math.max(maxDL, Math.abs(Lm - L));
                }
            }
        }
        expect(maxDL).toBeLessThan(0.09);
    });

    it("the self-limiting anchor is exact at L=0.50 (ΔL = 0)", () => {
        for (const cRaw of [0.37, 0.4]) {
            for (let hueDeg = 0; hueDeg < 360; hueDeg += 30) {
                const [Li, ai, bi] = rawOklchToOklab(0.5, cRaw, hueDeg);
                const [Lm] = gamutMapOKLab(Li, ai, bi);
                expect(Lm).toBeCloseTo(0.5, 10);
            }
        }
    });
});
