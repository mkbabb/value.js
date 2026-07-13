import { describe, expect, it } from "vitest";
import { deltaE2000, deltaEITP, rawXyz2ictcp, rawIctcp2xyz } from "@src/units/color/difference";

// ── ΔE-2000 — the COMPLETE Sharma, Wu & Dalal (2005) certification table.
//    Each row: [L1,a1,b1, L2,a2,b2, ΔE00]. These are THE canonical vectors used
//    to certify a CIEDE2000 implementation — they exercise the blue-region
//    rotation term, the hue-average wraparound, the achromatic-transition sign
//    flips, the large-ΔE regime, and the L/C/H weightings.
//
//    U-F73 / G-ORACLE-7 — COMPLETED from 14 → all 34 pairs. The prior 14 were the
//    subset {1,2,3,4,7,9,11,25,26,28,29,30,31,34}; a subset is BLIND to the
//    classes the omitted pairs certify. Now present in full: the large-ΔE pairs
//    (#17–20: ΔE 19–32) that drive the rotation term at extremes, and the
//    achromatic-transition / near-neutral hue-wraparound pairs (#7–16, #21–24)
//    that probe the CIEDE2000 discontinuities the round-trip cannot see.
//
//    Source: Sharma, Wu & Dalal, "The CIEDE2000 color-difference formula:
//    implementation notes, supplementary test data, and mathematical
//    observations" (Color Research & Application 30(1), 2005), the 34-pair
//    supplementary test dataset — transcribed EXACTLY (no invented values, no
//    tolerance tuning) from the authors' published data.
//
//    BORN-GREEN (the U.W-ORACLE honesty law): the impl already PASSES all 34
//    (registry §19: "the coverage, not the code, is short"); this lands as
//    coverage completion. A born-RED here would be a FABRICATED red — no defect
//    exists to flip. Measured max error across the 34 pairs: ≈ 5e-5 (< 1e-3).
const SHARMA: Array<[number, number, number, number, number, number, number]> = [
    [50.0, 2.6772, -79.7751, 50.0, 0.0, -82.7485, 2.0425],
    [50.0, 3.1571, -77.2803, 50.0, 0.0, -82.7485, 2.8615],
    [50.0, 2.8361, -74.02, 50.0, 0.0, -82.7485, 3.4412],
    [50.0, -1.3802, -84.2814, 50.0, 0.0, -82.7485, 1.0],
    [50.0, -1.1848, -84.8006, 50.0, 0.0, -82.7485, 1.0],
    [50.0, -0.9009, -85.5211, 50.0, 0.0, -82.7485, 1.0],
    [50.0, 0.0, 0.0, 50.0, -1.0, 2.0, 2.3669],
    [50.0, -1.0, 2.0, 50.0, 0.0, 0.0, 2.3669],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.0009, 7.1792],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.001, 7.1792],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.0011, 7.2195],
    [50.0, 2.49, -0.001, 50.0, -2.49, 0.0012, 7.2195],
    [50.0, -0.001, 2.49, 50.0, 0.0009, -2.49, 4.8045],
    [50.0, -0.001, 2.49, 50.0, 0.001, -2.49, 4.8045],
    [50.0, -0.001, 2.49, 50.0, 0.0011, -2.49, 4.7461],
    [50.0, 2.5, 0.0, 50.0, 0.0, -2.5, 4.3065],
    [50.0, 2.5, 0.0, 73.0, 25.0, -18.0, 27.1492],
    [50.0, 2.5, 0.0, 61.0, -5.0, 29.0, 22.8977],
    [50.0, 2.5, 0.0, 56.0, -27.0, -3.0, 31.903],
    [50.0, 2.5, 0.0, 58.0, 24.0, 15.0, 19.4535],
    [50.0, 2.5, 0.0, 50.0, 3.1736, 0.5854, 1.0],
    [50.0, 2.5, 0.0, 50.0, 3.2972, 0.0, 1.0],
    [50.0, 2.5, 0.0, 50.0, 1.8634, 0.5757, 1.0],
    [50.0, 2.5, 0.0, 50.0, 3.2592, 0.335, 1.0],
    [60.2574, -34.0099, 36.2677, 60.4626, -34.1751, 39.4387, 1.2644],
    [63.0109, -31.0961, -5.8663, 62.8187, -29.7946, -4.0864, 1.263],
    [61.2901, 3.7196, -5.3901, 61.4292, 2.248, -4.962, 1.8731],
    [35.0831, -44.1164, 3.7933, 35.0232, -40.0716, 1.5901, 1.8645],
    [22.7233, 20.0904, -46.694, 23.0331, 14.973, -42.5619, 2.0373],
    [36.4612, 47.858, 18.3852, 36.2715, 50.5065, 21.2231, 1.4146],
    [90.8027, -2.0831, 1.441, 91.1528, -1.6435, 0.0447, 1.4441],
    [90.9257, -0.5406, -0.9208, 88.6381, -0.8985, -0.7239, 1.5381],
    [6.7747, -0.2908, -2.4247, 5.8714, -0.0985, -2.2286, 0.6377],
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
    it("rawXyz2ictcp matches culori's `itp` goldens", () => {
        const [iW, ctW, cpW] = rawXyz2ictcp(...XYZ_WHITE);
        expect(iW).toBeCloseTo(0.5806888810416109, 9);
        expect(ctW).toBeCloseTo(0, 9);
        expect(cpW).toBeCloseTo(0, 9);

        const [iR, ctR, cpR] = rawXyz2ictcp(...XYZ_RED);
        expect(iR).toBeCloseTo(0.4278802843622844, 9);
        expect(ctR).toBeCloseTo(-0.11570435976969046, 9);
        expect(cpR).toBeCloseTo(0.27872894737532694, 9);
    });

    it("achromatic colors have Ct = Cp = 0", () => {
        // Grey at half media-white: chroma channels collapse to zero.
        const [, ct, cp] = rawXyz2ictcp(
            0.5 * XYZ_WHITE[0],
            0.5 * XYZ_WHITE[1],
            0.5 * XYZ_WHITE[2],
        );
        expect(ct).toBeCloseTo(0, 9);
        expect(cp).toBeCloseTo(0, 9);
    });

    it("ΔE-ITP is zero for identical colors and symmetric", () => {
        const red = rawXyz2ictcp(...XYZ_RED);
        const white = rawXyz2ictcp(...XYZ_WHITE);
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

// ── ICtCp inverse (S.W1-6 · Q9) — the ICtCp perceptual round-trip. ───────────
// The inverse math is validated against the independent
// `scratchpad/perceptual_oracle.py` (a from-scratch BT.2100 transcription, NOT
// value.js): ICtCp→XYZ reproduces the forward's input to ~1e-14.
const XYZ_GREEN: [number, number, number] = [
    0.357584339383878, 0.715168678767756, 0.11919477979462598,
];
const XYZ_BLUE: [number, number, number] = [
    0.1804807884018343, 0.07219231536073371, 0.9505321522496607,
];

describe("ICtCp inverse (rawIctcp2xyz) — the perceptual round-trip (S.W1-6)", () => {
    it("rawIctcp2xyz ∘ rawXyz2ictcp is identity for every real color (≤1e-12)", () => {
        for (const xyz of [XYZ_WHITE, XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const back = rawIctcp2xyz(...rawXyz2ictcp(...xyz));
            expect(back[0]).toBeCloseTo(xyz[0], 12);
            expect(back[1]).toBeCloseTo(xyz[1], 12);
            expect(back[2]).toBeCloseTo(xyz[2], 12);
        }
        // Non-primary + a grey ramp.
        for (const Y of [0.05, 0.2, 0.5, 0.9]) {
            const xyz: [number, number, number] = [
                XYZ_WHITE[0] * Y, XYZ_WHITE[1] * Y, XYZ_WHITE[2] * Y,
            ];
            const back = rawIctcp2xyz(...rawXyz2ictcp(...xyz));
            expect(back[0]).toBeCloseTo(xyz[0], 12);
            expect(back[1]).toBeCloseTo(xyz[1], 12);
            expect(back[2]).toBeCloseTo(xyz[2], 12);
        }
    });

    it("inverts culori's published red ICtCp golden back to XYZ_RED", () => {
        // The exact ICtCp culori goldens (see the forward test above) → XYZ_RED.
        const back = rawIctcp2xyz(0.4278802843622844, -0.11570435976969046, 0.27872894737532694);
        expect(back[0]).toBeCloseTo(XYZ_RED[0], 10);
        expect(back[1]).toBeCloseTo(XYZ_RED[1], 10);
        expect(back[2]).toBeCloseTo(XYZ_RED[2], 10);
    });

    it("rawXyz2ictcp ∘ rawIctcp2xyz is identity for in-range ICtCp", () => {
        // Round-trip in the OTHER direction, seeding from valid (real-color) ICtCp.
        for (const seed of [XYZ_RED, XYZ_GREEN, XYZ_BLUE]) {
            const ic = rawXyz2ictcp(...seed);
            const back = rawXyz2ictcp(...rawIctcp2xyz(...ic));
            expect(back[0]).toBeCloseTo(ic[0], 12);
            expect(back[1]).toBeCloseTo(ic[1], 12);
            expect(back[2]).toBeCloseTo(ic[2], 12);
        }
    });
});
