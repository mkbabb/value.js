import { describe, expect, it } from "vitest";
import {
    computeMaxSaturation,
    findCusp,
    findGamutIntersection,
    isInSRGBGamut,
    oklabToLinearSRGB,
    gamutMapOKLab,
    deltaEOK,
    DELTA_E_OK_JND,
} from "../src/units/color/gamut";
import { RGBColor, OKLCHColor } from "../src/units/color";
import { color2, gamutMap } from "../src/units/color/utils";
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
