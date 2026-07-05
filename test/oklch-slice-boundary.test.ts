import { describe, expect, it } from "vitest";
import {
    sampleOKLChSliceBoundary,
    sampleOKLChSliceBoundaryInto,
    type OKLChSliceBoundary,
} from "../src/units/color/boundary";
import * as colorSubpath from "../src/subpaths/color";
// Independent membership oracle — the raw OKLab→linear-sRGB direct path + the
// cube test. The boundary is DEFINED as the sRGB-cube crossing along a fixed-hue
// ray, so verifying `C` in-gamut / `C·(1+δ)` out-of-gamut is the definitional
// check, not a re-run of the sampler's bisection.
import { oklabToLinearSRGB, isInSRGBGamut, findCusp } from "../src/units/color/gamut";
// Cross-path oracle (XYZ hub, independent of the direct path) for a spot check.
import { color2 } from "../src/units/color/dispatch";
import { OKLABColor } from "../src/units/color";
import { scale } from "../src/math";
import { COLOR_SPACE_RANGES } from "../src/units/color/constants";

const HUES = [0, 30, 120, 200, 240, 300];

function inGamutRaw(L: number, C: number, hueDeg: number): boolean {
    const hRad = (hueDeg * Math.PI) / 180;
    const [r, g, b] = oklabToLinearSRGB(L, C * Math.cos(hRad), C * Math.sin(hRad));
    return isInSRGBGamut(r, g, b);
}

describe("sampleOKLChSliceBoundary — L×C sRGB cusp polyline (S.W1-6)", () => {
    it("shape: count = columns+1, L in even 0→1 steps, C ≥ 0, black/white pin C=0", () => {
        for (const hue of HUES) {
            const columns = 128;
            const b = sampleOKLChSliceBoundary(hue, columns);
            expect(b.count).toBe(columns + 1);
            for (let i = 0; i <= columns; i++) {
                const L = b.points[2 * i]!;
                const C = b.points[2 * i + 1]!;
                expect(L).toBeCloseTo(i / columns, 12); // even L grid
                expect(C).toBeGreaterThanOrEqual(0);
                expect(C).toBeLessThanOrEqual(0.5);
            }
            // Black (L=0) and white (L=1) carry no chroma.
            expect(b.points[1]).toBeCloseTo(0, 6); // C at L=0
            expect(b.points[2 * columns + 1]).toBeCloseTo(0, 6); // C at L=1
        }
    });

    it("root truth: each sample sits ON the sRGB boundary (C in gamut, C+δ out)", () => {
        const delta = 2 ** -12;
        for (const hue of HUES) {
            const b = sampleOKLChSliceBoundary(hue, 96);
            for (let i = 1; i < b.count - 1; i++) {
                const L = b.points[2 * i]!;
                const C = b.points[2 * i + 1]!;
                if (C < 1e-6) continue; // near the black/white tips chroma → 0
                expect(inGamutRaw(L, C, hue), `in @${hue} L${L}`).toBe(true);
                expect(inGamutRaw(L, C + delta, hue), `out @${hue} L${L}`).toBe(false);
            }
        }
    });

    it("cusp: reported cusp is the analytical findCusp and bounds the polyline", () => {
        for (const hue of HUES) {
            const hRad = (hue * Math.PI) / 180;
            const ref = findCusp(Math.cos(hRad), Math.sin(hRad));
            const columns = 512;
            const b = sampleOKLChSliceBoundary(hue, columns);
            expect(b.cuspL).toBe(ref.L);
            expect(b.cuspC).toBe(ref.C);
            // No sampled chroma exceeds the cusp chroma (the hue's global max).
            let maxC = 0;
            let maxL = 0;
            for (let i = 0; i < b.count; i++) {
                const C = b.points[2 * i + 1]!;
                if (C > maxC) { maxC = C; maxL = b.points[2 * i]!; }
            }
            expect(maxC).toBeLessThanOrEqual(b.cuspC + 1e-6);
            // The peak sample lands within one L step of the analytical cusp L,
            // and its chroma approaches the cusp chroma from below — the residual
            // is the L-sampling granularity (the exact cusp L falls between
            // samples), a smooth O((ΔL)²) undershoot at columns=512.
            expect(Math.abs(maxL - b.cuspL)).toBeLessThanOrEqual(1 / columns + 1e-9);
            expect(Math.abs(maxC - b.cuspC)).toBeLessThan(2e-3);
        }
    });

    it("cross-path: a mid-slice sample agrees with the XYZ-hub membership oracle", () => {
        const hue = 30;
        const b = sampleOKLChSliceBoundary(hue, 64);
        const { a: aR, b: bR } = COLOR_SPACE_RANGES.oklab;
        for (let i = 8; i < b.count - 8; i += 8) {
            const L = b.points[2 * i]!;
            const C = b.points[2 * i + 1]!;
            const hRad = (hue * Math.PI) / 180;
            const a = C * Math.cos(hRad);
            const bb = C * Math.sin(hRad);
            // Normalize raw a,b into [0,1] for the OKLABColor constructor, then
            // convert through the XYZ hub — a code path independent of gamut.ts.
            const lin = color2(
                new OKLABColor(
                    L,
                    scale(a, aR.number.min, aR.number.max, 0, 1),
                    scale(bb, bR.number.min, bR.number.max, 0, 1),
                    1,
                ),
                "srgb-linear",
            );
            const eps = 1e-4;
            expect(
                (lin.r as number) >= -eps && (lin.r as number) <= 1 + eps &&
                (lin.g as number) >= -eps && (lin.g as number) <= 1 + eps &&
                (lin.b as number) >= -eps && (lin.b as number) <= 1 + eps,
                `xyz-hub in-gamut @L${L}`,
            ).toBe(true);
        }
    });

    it("Into / allocating parity + reuse", () => {
        for (const hue of HUES) {
            const alloc = sampleOKLChSliceBoundary(hue, 96);
            const out: OKLChSliceBoundary = {
                points: new Float64Array(2 * (96 + 1)),
                count: 0, cuspL: 0, cuspC: 0,
            };
            sampleOKLChSliceBoundaryInto(hue, out, 96);
            expect(out.count).toBe(alloc.count);
            expect(out.cuspL).toBe(alloc.cuspL);
            expect(out.cuspC).toBe(alloc.cuspC);
            for (let i = 0; i < 2 * alloc.count; i++) {
                expect(out.points[i]).toBe(alloc.points[i]); // bit-identical
            }
        }
    });

    it("edges: achromatic (non-finite) hue → zero-chroma slice, no cusp; hue wraps mod 360", () => {
        for (const h of [NaN, Infinity, -Infinity]) {
            const b = sampleOKLChSliceBoundary(h, 32);
            expect(b.count).toBe(33);
            expect(b.cuspC).toBe(0);
            expect(b.cuspL).toBe(0);
            for (let i = 0; i < b.count; i++) expect(b.points[2 * i + 1]).toBe(0);
        }
        const a = sampleOKLChSliceBoundary(30, 48);
        const wrapped = sampleOKLChSliceBoundary(390, 48);
        for (let i = 0; i < 2 * a.count; i++) {
            expect(wrapped.points[i]).toBeCloseTo(a.points[i]!, 12);
        }
    });

    it("bad columns / undersized out → RangeError; subpath surfaces the pair", () => {
        expect(() => sampleOKLChSliceBoundary(0, 1)).toThrow(RangeError);
        expect(() => sampleOKLChSliceBoundary(0, 96.5)).toThrow(RangeError);
        const tiny: OKLChSliceBoundary = {
            points: new Float64Array(4), count: 0, cuspL: 0, cuspC: 0,
        };
        expect(() => sampleOKLChSliceBoundaryInto(0, tiny, 96)).toThrow(RangeError);
        expect(typeof colorSubpath.sampleOKLChSliceBoundary).toBe("function");
        expect(typeof colorSubpath.sampleOKLChSliceBoundaryInto).toBe("function");
    });
});
