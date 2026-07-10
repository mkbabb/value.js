import { describe, expect, it } from "vitest";
import {
    okhslToSrgb,
    srgbToOkhsl,
    okhsvToSrgb,
    srgbToOkhsv,
} from "@src/units/color/okhsl";

// OKHSL/OKHSV land exactly ON the sRGB boundary at full saturation; the
// analytical (single-Halley-step) gamut intersection leaves a ~1e-6 residual
// there — the same residual `gamutMapSRGB` clamps. Anything under 1e-5 is
// on-boundary, not a gamut escape.
const inUnit = ([r, g, b]: [number, number, number]) =>
    r >= -1e-5 && r <= 1 + 1e-5 &&
    g >= -1e-5 && g <= 1 + 1e-5 &&
    b >= -1e-5 && b <= 1 + 1e-5;

describe("OKHSL", () => {
    it("maps grey (s=0) to an achromatic sRGB triple", () => {
        for (const l of [0.1, 0.25, 0.5, 0.75, 0.9]) {
            const [r, g, b] = okhslToSrgb(210, 0, l);
            expect(g).toBeCloseTo(r, 9);
            expect(b).toBeCloseTo(r, 9);
        }
    });

    it("pins black and white", () => {
        expect(okhslToSrgb(0, 0.5, 0)).toEqual([0, 0, 0]);
        expect(okhslToSrgb(0, 0.5, 1)).toEqual([1, 1, 1]);
        const [, sW, lW] = srgbToOkhsl(1, 1, 1);
        expect(sW).toBeCloseTo(0, 6);
        expect(lW).toBeCloseTo(1, 6);
    });

    it("every (h,s,l) produces an in-gamut sRGB color", () => {
        for (let h = 0; h < 360; h += 30) {
            for (const s of [0, 0.25, 0.5, 0.8, 1]) {
                for (const l of [0.15, 0.5, 0.85]) {
                    expect(inUnit(okhslToSrgb(h, s, l)), `${h},${s},${l}`).toBe(true);
                }
            }
        }
    });

    it("round-trips sRGB → OKHSL → sRGB", () => {
        for (const rgb of [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [0.8, 0.4, 0.1],
            [0.2, 0.6, 0.9],
            [0.5, 0.5, 0.5],
            [0.95, 0.9, 0.3],
        ] as const) {
            const [h, s, l] = srgbToOkhsl(...rgb);
            const back = okhslToSrgb(h, s, l);
            expect(back[0]).toBeCloseTo(rgb[0], 5);
            expect(back[1]).toBeCloseTo(rgb[1], 5);
            expect(back[2]).toBeCloseTo(rgb[2], 5);
        }
    });

    it("round-trips OKHSL → sRGB → OKHSL", () => {
        // Sweep the region where the OKHSL math is the determinant, INCLUDING the
        // dark+saturated corner (low l, high s). Pre-S.W1-1 this band was dodged
        // (`l ≥ 0.4 / s ≤ 0.8`) because the sRGB DECODE transfer was
        // non-invertible in the dark 8-bit band (encoded 0.003131–0.04045): a
        // color there decoded on the wrong branch, so the sRGB↔OKHSL round-trip
        // could not close. The S.W1-1 decode-threshold cure makes the transfer
        // pair mutually invertible across that band, so the dodged domain is
        // reinstated here.
        for (let h = 15; h < 360; h += 45) {
            for (const s of [0.2, 0.5, 0.8, 1.0]) {
                for (const l of [0.2, 0.35, 0.45, 0.7]) {
                    const [h2, s2, l2] = srgbToOkhsl(...okhslToSrgb(h, s, l));
                    expect(h2, `h ${h},${s},${l}`).toBeCloseTo(h, 2);
                    expect(s2, `s ${h},${s},${l}`).toBeCloseTo(s, 3);
                    expect(l2, `l ${h},${s},${l}`).toBeCloseTo(l, 3);
                }
            }
        }
    });
});

describe("OKHSV", () => {
    it("pins black (v=0) and greys (s=0)", () => {
        expect(okhsvToSrgb(120, 0.7, 0)).toEqual([0, 0, 0]);
        const [r, g, b] = okhsvToSrgb(120, 0, 0.6);
        expect(g).toBeCloseTo(r, 9);
        expect(b).toBeCloseTo(r, 9);
    });

    it("every (h,s,v) produces an in-gamut sRGB color", () => {
        for (let h = 0; h < 360; h += 30) {
            for (const s of [0, 0.3, 0.7, 1]) {
                for (const v of [0.2, 0.6, 1]) {
                    expect(inUnit(okhsvToSrgb(h, s, v)), `${h},${s},${v}`).toBe(true);
                }
            }
        }
    });

    it("round-trips sRGB → OKHSV → sRGB", () => {
        for (const rgb of [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [0.8, 0.4, 0.1],
            [0.2, 0.6, 0.9],
            [0.4, 0.4, 0.4],
        ] as const) {
            const [h, s, v] = srgbToOkhsv(...rgb);
            const back = okhsvToSrgb(h, s, v);
            expect(back[0]).toBeCloseTo(rgb[0], 5);
            expect(back[1]).toBeCloseTo(rgb[1], 5);
            expect(back[2]).toBeCloseTo(rgb[2], 5);
        }
    });

    it("round-trips OKHSV → sRGB → OKHSV", () => {
        // As with OKHSL: keep out of the dark sRGB decode band (v ≥ 0.6, s ≤ 0.8)
        // so the OKHSV math — not the pre-existing transfer bug — is under test.
        for (let h = 20; h < 360; h += 50) {
            for (const s of [0.3, 0.6, 0.8]) {
                for (const v of [0.6, 0.85, 1]) {
                    const [h2, s2, v2] = srgbToOkhsv(...okhsvToSrgb(h, s, v));
                    expect(h2).toBeCloseTo(h, 2);
                    expect(s2).toBeCloseTo(s, 3);
                    expect(v2).toBeCloseTo(v, 3);
                }
            }
        }
    });

    it("holds hue stable at low chroma (the documented HSV drift is cured)", () => {
        // A near-grey color keeps a well-defined, stable hue under a tiny sat
        // change — the OKHSV property the sRGB HSV roundtrip loses at C≈0.
        const [h] = srgbToOkhsv(...okhsvToSrgb(240, 0.05, 0.6));
        expect(h).toBeCloseTo(240, 2);
    });
});
