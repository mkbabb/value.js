import { describe, expect, it } from "vitest";
import { xyzToJzazbz, jzazbzToXYZ } from "../src/units/color/conversions/jzazbz";

// ─────────────────────────────────────────────────────────────────────────────
// S.W1-11 — Jzazbz (Q9 widening). NET-NEW PQ-variant transfer math (Safdar 2017),
// colorjs `xyz-abs-d65` convention. Every golden below is from the INDEPENDENT
// `scratchpad/perceptual_oracle.py` (a from-scratch numpy transcription, no
// value.js). D65 white → Jz ≈ 0.2220652 also matches colorjs's published value.
// ─────────────────────────────────────────────────────────────────────────────

// Relative XYZ (D65, Y=1 white) of the sRGB primaries + white.
const XYZ_WHITE: [number, number, number] = [0.9504559270516716, 1.0, 1.0890577507598784];
const XYZ_RED: [number, number, number] = [0.41239079926595934, 0.21263900587151027, 0.01933081871559182];
const XYZ_GREEN: [number, number, number] = [0.357584339383878, 0.715168678767756, 0.11919477979462598];
const XYZ_BLUE: [number, number, number] = [0.1804807884018343, 0.07219231536073371, 0.9505321522496607];

// Jzazbz goldens (independent oracle).
const JAB: Record<string, [[number, number, number], [number, number, number]]> = {
    white: [XYZ_WHITE, [0.22206524953574297, -0.0001606249262307291, -0.00011703399768703271]],
    red: [XYZ_RED, [0.13438473104350065, 0.1178852626079724, 0.11187810901317233]],
    green: [XYZ_GREEN, [0.17680712813178287, -0.10904339610399627, 0.11898943576039095]],
    blue: [XYZ_BLUE, [0.09577429215304556, -0.04084549610065474, -0.1858542849470936]],
};

describe("Jzazbz (S.W1-11) — forward goldens vs the independent oracle", () => {
    it("xyzToJzazbz matches the perceptual_oracle.py goldens (≤1e-9)", () => {
        for (const [name, [xyz, want]] of Object.entries(JAB)) {
            const [jz, az, bz] = xyzToJzazbz(...xyz);
            expect(jz, `${name} Jz`).toBeCloseTo(want[0], 9);
            expect(az, `${name} az`).toBeCloseTo(want[1], 9);
            expect(bz, `${name} bz`).toBeCloseTo(want[2], 9);
        }
    });

    it("D65 white lands at Jz ≈ 0.2220652 (the colorjs-consistent value)", () => {
        expect(xyzToJzazbz(...XYZ_WHITE)[0]).toBeCloseTo(0.2220652495, 9);
    });
});

describe("Jzazbz (S.W1-11) — round-trip goldens (self-inverse)", () => {
    it("jzazbzToXYZ ∘ xyzToJzazbz is identity for every real color (≤1e-11)", () => {
        for (const [name, [xyz]] of Object.entries(JAB)) {
            const back = jzazbzToXYZ(...xyzToJzazbz(...xyz));
            expect(back[0], `${name} X`).toBeCloseTo(xyz[0], 11);
            expect(back[1], `${name} Y`).toBeCloseTo(xyz[1], 11);
            expect(back[2], `${name} Z`).toBeCloseTo(xyz[2], 11);
        }
    });

    it("xyzToJzazbz ∘ jzazbzToXYZ is identity for in-range Jzazbz (≤1e-11)", () => {
        for (const [, [xyz]] of Object.entries(JAB)) {
            const jab = xyzToJzazbz(...xyz);
            const back = xyzToJzazbz(...jzazbzToXYZ(...jab));
            expect(back[0]).toBeCloseTo(jab[0], 11);
            expect(back[1]).toBeCloseTo(jab[1], 11);
            expect(back[2]).toBeCloseTo(jab[2], 11);
        }
    });

    it("round-trips a dense mid-gamut sweep (≤1e-10)", () => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                for (let k = 1; k <= 9; k++) {
                    const xyz: [number, number, number] = [i / 10, j / 10, k / 10];
                    const back = jzazbzToXYZ(...xyzToJzazbz(...xyz));
                    expect(back[0]).toBeCloseTo(xyz[0], 10);
                    expect(back[1]).toBeCloseTo(xyz[1], 10);
                    expect(back[2]).toBeCloseTo(xyz[2], 10);
                }
            }
        }
    });
});

describe("Jzazbz (S.W1-11) — space properties", () => {
    it("Jz increases monotonically with luminance along the grey axis", () => {
        let prev = -Infinity;
        for (const Y of [0.02, 0.05, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0]) {
            const jz = xyzToJzazbz(XYZ_WHITE[0] * Y, XYZ_WHITE[1] * Y, XYZ_WHITE[2] * Y)[0];
            expect(jz).toBeGreaterThan(prev);
            prev = jz;
        }
    });

    it("greys are NEAR- (not perfectly) achromatic — the real Jzazbz property", () => {
        // D65 white carries az≈-1.6e-4, bz≈-1.2e-4; greys stay small but non-zero
        // (the b/g cross-mix), so the bound is 5e-4, not 0.
        for (const Y of [0.05, 0.2, 0.5, 0.9]) {
            const [, az, bz] = xyzToJzazbz(XYZ_WHITE[0] * Y, XYZ_WHITE[1] * Y, XYZ_WHITE[2] * Y);
            expect(Math.abs(az)).toBeLessThan(5e-4);
            expect(Math.abs(bz)).toBeLessThan(5e-4);
        }
    });
});
