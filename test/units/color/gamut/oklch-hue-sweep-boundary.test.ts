import { describe, expect, it } from "vitest";

import {
    sampleOKLChSliceBoundary,
    sampleOKLChHueSweepBoundary,
    sampleOKLChHueSweepBoundaryInto,
    type OKLChHueSweepBoundary,
} from "@src/units/color/gamut/boundary";
import { findCusp } from "@src/units/color/gamut";

// T-21 · T.W1-src — the hue-swept envelope sampler (the gradient instrument's
// src half). Envelope semantics: per L row, cMin = MIN over the swept hues of the
// max in-gamut chroma, cMax = MAX. A single-hue interval degenerates to the exact
// `sampleOKLChSliceBoundary` slice (cMin ≡ cMax).

/** The swept-hue set the linear sweep visits (matches the sampler's formula). */
function sweptHues(h0: number, h1: number, steps: number): number[] {
    const span = h1 - h0;
    return Array.from({ length: steps }, (_, j) => {
        const t = steps === 1 ? 0 : j / (steps - 1);
        return (((h0 + span * t) % 360) + 360) % 360;
    });
}

describe("sampleOKLChHueSweepBoundary — structure", () => {
    it("sizes points to 3·(columns+1) and count to columns+1", () => {
        const columns = 32;
        const b = sampleOKLChHueSweepBoundary(20, 260, columns, 8);
        expect(b.points.length).toBe(3 * (columns + 1));
        expect(b.count).toBe(columns + 1);
    });

    it("L increases 0→1 in even steps; cMin ≤ cMax and both in [0, 0.5)", () => {
        const columns = 48;
        const b = sampleOKLChHueSweepBoundary(0, 300, columns, 12);
        for (let i = 0; i <= columns; i++) {
            expect(b.points[3 * i]).toBeCloseTo(i / columns, 12);
            const cMin = b.points[3 * i + 1]!;
            const cMax = b.points[3 * i + 2]!;
            expect(cMin).toBeGreaterThanOrEqual(0);
            expect(cMin).toBeLessThanOrEqual(cMax);
            expect(cMax).toBeLessThan(0.5);
        }
    });
});

describe("sampleOKLChHueSweepBoundary — envelope correctness vs the slice sampler", () => {
    it("cMin/cMax equal the min/max of the per-swept-hue slice chromas", () => {
        const columns = 24;
        const steps = 5;
        const [h0, h1] = [10, 250];
        const sweep = sampleOKLChHueSweepBoundary(h0, h1, columns, steps);

        // Reference: the exact slice C at each swept hue, folded to min/max per row.
        const slices = sweptHues(h0, h1, steps).map((h) =>
            sampleOKLChSliceBoundary(h, columns),
        );
        for (let i = 0; i <= columns; i++) {
            const cs = slices.map((s) => s.points[2 * i + 1]!);
            expect(sweep.points[3 * i + 1]!).toBeCloseTo(Math.min(...cs), 12);
            expect(sweep.points[3 * i + 2]!).toBeCloseTo(Math.max(...cs), 12);
        }
    });

    it("a wide sweep leaves a non-empty ambiguous belt (cMin < cMax) somewhere", () => {
        const columns = 64;
        const b = sampleOKLChHueSweepBoundary(20, 300, columns, 16);
        let beltRows = 0;
        for (let i = 0; i <= columns; i++) {
            if (b.points[3 * i + 2]! - b.points[3 * i + 1]! > 1e-6) beltRows++;
        }
        expect(beltRows).toBeGreaterThan(0);
    });
});

describe("sampleOKLChHueSweepBoundary — single-hue degeneracy", () => {
    it("hueStart == hueEnd collapses to the exact slice (cMin ≡ cMax ≡ slice C)", () => {
        const columns = 40;
        const hue = 205;
        const sweep = sampleOKLChHueSweepBoundary(hue, hue, columns, 16);
        const slice = sampleOKLChSliceBoundary(hue, columns);
        for (let i = 0; i <= columns; i++) {
            const c = slice.points[2 * i + 1]!;
            expect(sweep.points[3 * i + 1]!).toBeCloseTo(c, 12);
            expect(sweep.points[3 * i + 2]!).toBeCloseTo(c, 12);
        }
    });

    it("hueSteps == 1 samples only hueStart", () => {
        const columns = 16;
        const sweep = sampleOKLChHueSweepBoundary(120, 300, columns, 1);
        const slice = sampleOKLChSliceBoundary(120, columns);
        for (let i = 0; i <= columns; i++) {
            expect(sweep.points[3 * i + 1]!).toBeCloseTo(slice.points[2 * i + 1]!, 12);
            expect(sweep.points[3 * i + 2]!).toBeCloseTo(slice.points[2 * i + 1]!, 12);
        }
    });
});

describe("sampleOKLChHueSweepBoundary — cusp envelope", () => {
    it("cuspCMax is the peak analytical cusp chroma over the swept hues", () => {
        const [h0, h1, steps] = [0, 359, 24];
        const b = sampleOKLChHueSweepBoundary(h0, h1, 8, steps);
        let peak = 0;
        for (const h of sweptHues(h0, h1, steps)) {
            const hRad = (h * Math.PI) / 180;
            const cusp = findCusp(Math.cos(hRad), Math.sin(hRad));
            peak = Math.max(peak, cusp.C);
        }
        expect(b.cuspCMax).toBeCloseTo(peak, 12);
        expect(b.cuspLAtPeak).toBeGreaterThan(0);
        expect(b.cuspLAtPeak).toBeLessThan(1);
    });

    it("single-hue cuspCMax equals that hue's analytical cusp C", () => {
        const hue = 264; // near the blue chroma peak
        const b = sampleOKLChHueSweepBoundary(hue, hue, 8, 4);
        const hRad = (hue * Math.PI) / 180;
        const cusp = findCusp(Math.cos(hRad), Math.sin(hRad));
        expect(b.cuspCMax).toBeCloseTo(cusp.C, 12);
        expect(b.cuspLAtPeak).toBeCloseTo(cusp.L, 12);
    });
});

describe("sampleOKLChHueSweepBoundary — achromatic (CSS none)", () => {
    it("a non-finite endpoint yields the grey axis (zero chroma, no cusp)", () => {
        const columns = 12;
        for (const b of [
            sampleOKLChHueSweepBoundary(NaN, 200, columns, 8),
            sampleOKLChHueSweepBoundary(120, NaN, columns, 8),
        ]) {
            expect(b.count).toBe(columns + 1);
            expect(b.cuspCMax).toBe(0);
            expect(b.cuspLAtPeak).toBe(0);
            for (let i = 0; i <= columns; i++) {
                expect(b.points[3 * i + 1]).toBe(0);
                expect(b.points[3 * i + 2]).toBe(0);
            }
        }
    });
});

describe("sampleOKLChHueSweepBoundaryInto — zero-alloc twin", () => {
    it("writes the same values as the allocating form into a caller buffer", () => {
        const columns = 20;
        const steps = 9;
        const out: OKLChHueSweepBoundary = {
            points: new Float64Array(3 * (columns + 1)),
            count: 0,
            cuspCMax: 0,
            cuspLAtPeak: 0,
        };
        const ret = sampleOKLChHueSweepBoundaryInto(15, 285, out, columns, steps);
        expect(ret).toBe(out); // returns the same buffer, no alloc
        const alloc = sampleOKLChHueSweepBoundary(15, 285, columns, steps);
        expect(out.count).toBe(alloc.count);
        expect(out.cuspCMax).toBeCloseTo(alloc.cuspCMax, 12);
        for (let k = 0; k < 3 * (columns + 1); k++) {
            expect(out.points[k]!).toBeCloseTo(alloc.points[k]!, 12);
        }
    });

    it("throws RangeError when the out buffer is too small", () => {
        const columns = 32;
        const out: OKLChHueSweepBoundary = {
            points: new Float64Array(3 * columns), // one row short
            count: 0,
            cuspCMax: 0,
            cuspLAtPeak: 0,
        };
        expect(() => sampleOKLChHueSweepBoundaryInto(0, 90, out, columns)).toThrow(
            RangeError,
        );
    });
});

describe("sampleOKLChHueSweepBoundary — validation", () => {
    it("rejects hueSteps < 1 and non-integer hueSteps", () => {
        expect(() => sampleOKLChHueSweepBoundary(0, 90, 8, 0)).toThrow(RangeError);
        expect(() => sampleOKLChHueSweepBoundary(0, 90, 8, 2.5)).toThrow(RangeError);
    });

    it("rejects columns < 2", () => {
        expect(() => sampleOKLChHueSweepBoundary(0, 90, 1)).toThrow(RangeError);
    });
});
