import { describe, expect, it } from "vitest";
import { deltaE2000, deltaEITP, xyzToICtCp } from "../src/units/color/difference";

// ── ΔE-2000 — validated against the Sharma, Wu & Dalal (2005) reference table.
//    Each row: [L1,a1,b1, L2,a2,b2, ΔE00]. These are THE canonical vectors used
//    to certify a CIEDE2000 implementation (they exercise the blue-region
//    rotation term, the hue-average wraparound, and the L/C/H weightings).
const SHARMA: Array<[number, number, number, number, number, number, number]> = [
    [50.0, 2.6772, -79.7751, 50.0, 0.0, -82.7485, 2.0425],
    [50.0, 3.1571, -77.2803, 50.0, 0.0, -82.7485, 2.8615],
    [50.0, 2.8361, -74.02, 50.0, 0.0, -82.7485, 3.4412],
    [50.0, -1.3802, -84.2814, 50.0, 0.0, -82.7485, 1.0],
    [50.0, 0.0, 0.0, 50.0, -1.0, 2.0, 2.3669],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.0009, 7.1792],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.0011, 7.2195],
    [60.2574, -34.0099, 36.2677, 60.4626, -34.1751, 39.4387, 1.2644],
    [63.0109, -31.0961, -5.8663, 62.8187, -29.7946, -4.0864, 1.263],
    [35.0831, -44.1164, 3.7933, 35.0232, -40.0716, 1.5901, 1.8645],
    [22.7233, 20.0904, -46.694, 23.0331, 14.973, -42.5619, 2.0373],
    [36.4612, 47.858, 18.3852, 36.2715, 50.5065, 21.2231, 1.4146],
    [90.8027, -2.0831, 1.441, 91.1528, -1.6435, 0.0447, 1.4441],
    [2.0776, 0.0795, -1.135, 0.9033, -0.0636, -0.5514, 0.9082],
];

describe("ΔE-2000 (CIEDE2000)", () => {
    it("matches the Sharma reference table to 1e-3", () => {
        for (const [L1, a1, b1, L2, a2, b2, expected] of SHARMA) {
            expect(deltaE2000(L1, a1, b1, L2, a2, b2)).toBeCloseTo(expected, 3);
        }
    });

    it("is zero for identical colors", () => {
        expect(deltaE2000(53, 20, -30, 53, 20, -30)).toBe(0);
    });

    it("is symmetric", () => {
        const a = deltaE2000(50, 2.6772, -79.7751, 50, 0, -82.7485);
        const b = deltaE2000(50, 0, -82.7485, 50, 2.6772, -79.7751);
        expect(a).toBeCloseTo(b, 12);
    });

    it("honors the parametric kL weighting (kL=2 halves the pure-lightness term)", () => {
        const full = deltaE2000(40, 0, 0, 60, 0, 0);
        const halved = deltaE2000(40, 0, 0, 60, 0, 0, 2);
        expect(halved).toBeCloseTo(full / 2, 10);
    });
});

// ── ΔE-ITP / ICtCp — validated against culori's `itp` mode (BT.2100 / BT.2124).
//    XYZ (D65, relative Y=1) of the sRGB primaries, fed straight into the same
//    transform culori runs. Reference ICtCp values are culori's published test
//    goldens (test/itp.test.js): white i=0.5806888810416109, red the vector below.
const XYZ_WHITE: [number, number, number] = [
    0.9504559270516716, 1.0, 1.0890577507598784,
];
const XYZ_RED: [number, number, number] = [
    0.41239079926595934, 0.21263900587151027, 0.01933081871559182,
];

describe("ICtCp (BT.2100) + ΔE-ITP (BT.2124)", () => {
    it("xyzToICtCp matches culori's `itp` goldens", () => {
        const [iW, ctW, cpW] = xyzToICtCp(...XYZ_WHITE);
        expect(iW).toBeCloseTo(0.5806888810416109, 9);
        expect(ctW).toBeCloseTo(0, 9);
        expect(cpW).toBeCloseTo(0, 9);

        const [iR, ctR, cpR] = xyzToICtCp(...XYZ_RED);
        expect(iR).toBeCloseTo(0.4278802843622844, 9);
        expect(ctR).toBeCloseTo(-0.11570435976969046, 9);
        expect(cpR).toBeCloseTo(0.27872894737532694, 9);
    });

    it("achromatic colors have Ct = Cp = 0", () => {
        // Grey at half media-white: chroma channels collapse to zero.
        const [, ct, cp] = xyzToICtCp(
            0.5 * XYZ_WHITE[0],
            0.5 * XYZ_WHITE[1],
            0.5 * XYZ_WHITE[2],
        );
        expect(ct).toBeCloseTo(0, 9);
        expect(cp).toBeCloseTo(0, 9);
    });

    it("ΔE-ITP is zero for identical colors and symmetric", () => {
        const red = xyzToICtCp(...XYZ_RED);
        const white = xyzToICtCp(...XYZ_WHITE);
        expect(deltaEITP(...red, ...red)).toBe(0);
        expect(deltaEITP(...red, ...white)).toBeCloseTo(
            deltaEITP(...white, ...red),
            12,
        );
    });

    it("ΔE-ITP applies the 720·√(ΔI² + (½ΔCt)² + ΔCp²) weighting", () => {
        // A pure Ct offset is halved relative to an equal I or P offset.
        const iOnly = deltaEITP(0, 0, 0, 0.1, 0, 0);
        const ctOnly = deltaEITP(0, 0, 0, 0, 0.1, 0);
        const cpOnly = deltaEITP(0, 0, 0, 0, 0, 0.1);
        expect(iOnly).toBeCloseTo(72, 10);
        expect(cpOnly).toBeCloseTo(72, 10);
        expect(ctOnly).toBeCloseTo(36, 10);
    });
});
