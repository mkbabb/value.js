import { describe, expect, it } from "vitest";
import { sampleColorRamp } from "@src/units/color/mix";
import { OKLCHColor, RGBColor } from "@src/units/color";
import { color2 } from "@src/units/color/dispatch";
import { deltaEOK } from "@src/units/color/gamut";
import { scale } from "@src/math";
import { COLOR_SPACE_RANGES } from "@src/units/color/constants";

// ── helpers ───────────────────────────────────────────────────────────────────

const A_MIN = COLOR_SPACE_RANGES.oklab.a.number.min;
const A_MAX = COLOR_SPACE_RANGES.oklab.a.number.max;
const B_MIN = COLOR_SPACE_RANGES.oklab.b.number.min;
const B_MAX = COLOR_SPACE_RANGES.oklab.b.number.max;
const C_MAX = COLOR_SPACE_RANGES.oklch.c.number.max;

/** A Color → its raw OKLab tuple (L ∈ [0,1], a,b ∈ [-0.4,0.4]) — the deltaEOK domain. */
function rawOklab(c: ReturnType<typeof color2>): [number, number, number] {
    const ok = color2(c, "oklab");
    return [
        ok.l as number,
        scale(ok.a as number, 0, 1, A_MIN, A_MAX),
        scale(ok.b as number, 0, 1, B_MIN, B_MAX),
    ];
}

/** deltaE-OK between two Colors. */
function dE(c1: ReturnType<typeof color2>, c2: ReturnType<typeof color2>): number {
    const [L1, a1, b1] = rawOklab(c1);
    const [L2, a2, b2] = rawOklab(c2);
    return deltaEOK(L1, a1, b1, L2, a2, b2);
}

/** Is a Color strictly inside the sRGB [0,1]³ box (±eps)? */
function inSRGB(c: ReturnType<typeof color2>, eps = 1e-3): boolean {
    const rgb = color2(c, "rgb");
    const r = rgb.r as number;
    const g = rgb.g as number;
    const b = rgb.b as number;
    return (
        r >= -eps && r <= 1 + eps &&
        g >= -eps && g <= 1 + eps &&
        b >= -eps && b <= 1 + eps
    );
}

const RED = () => new RGBColor(1, 0, 0, 1);
const BLUE = () => new RGBColor(0, 0, 1, 1);
/** A super-saturated green well outside sRGB (in P3/rec2020 territory). */
const WILD_GREEN = () =>
    new OKLCHColor(0.85, scale(0.35, 0, C_MAX, 0, 1), 140 / 360, 1);

// ── §I.2 clause 1 — existence / arity ─────────────────────────────────────────

describe("sampleColorRamp — existence & arity (clause 1)", () => {
    it("is exported and callable", () => {
        expect(typeof sampleColorRamp).toBe("function");
    });

    it("returns n stops for various n", () => {
        for (const n of [2, 3, 5, 8, 16]) {
            const ramp = sampleColorRamp(RED(), BLUE(), n);
            expect(ramp).toHaveLength(n);
        }
    });

    it("n=2 returns the gamut-mapped endpoints (the two-stop identity case)", () => {
        const ramp = sampleColorRamp(RED(), BLUE(), 2);
        expect(ramp).toHaveLength(2);
        // Both endpoints are in-gamut sRGB primaries — survive identity-exact.
        expect(dE(RED(), ramp[0]!)).toBeLessThan(1e-6);
        expect(dE(BLUE(), ramp[1]!)).toBeLessThan(1e-6);
    });

    it("n < 2 throws (mirrors mixColorsN's empty-input throw)", () => {
        expect(() => sampleColorRamp(RED(), BLUE(), 1)).toThrow(/n ≥ 2/);
        expect(() => sampleColorRamp(RED(), BLUE(), 0)).toThrow(/n ≥ 2/);
    });
});

// ── §I.2 clause 2 — monotone perceptual spacing (the deltaEOK oracle) ──────────

describe("sampleColorRamp — monotone perceptual spacing (clause 2)", () => {
    it("adjacent deltaEOK stays within a band of the mean step (oklch red→blue, n=8)", () => {
        const ramp = sampleColorRamp(RED(), BLUE(), 8, {
            space: "oklch",
            hueMethod: "shorter",
        });
        const steps: number[] = [];
        for (let i = 0; i < ramp.length - 1; i++) {
            steps.push(dE(ramp[i]!, ramp[i + 1]!));
        }
        const mean = steps.reduce((a, b) => a + b, 0) / steps.length;
        // Uniform perceptual spacing — every step within ±20% of the mean
        // (a naive sRGB ramp FAILS this; the perceptual ramp holds it tight).
        for (const s of steps) {
            expect(Math.abs(s - mean) / mean).toBeLessThan(0.2);
        }
    });

    it("the oklab ramp is also evenly spaced (n=10)", () => {
        const ramp = sampleColorRamp(RED(), BLUE(), 10, { space: "oklab" });
        const steps: number[] = [];
        for (let i = 0; i < ramp.length - 1; i++) {
            steps.push(dE(ramp[i]!, ramp[i + 1]!));
        }
        const mean = steps.reduce((a, b) => a + b, 0) / steps.length;
        for (const s of steps) {
            expect(Math.abs(s - mean) / mean).toBeLessThan(0.2);
        }
    });
});

// ── §I.2 clause 3 — in-gamut egress (no silent clip) ──────────────────────────

describe("sampleColorRamp — in-gamut egress (clause 3)", () => {
    it("every stop of an in-gamut ramp is in sRGB gamut", () => {
        for (const space of ["oklab", "oklch"] as const) {
            const ramp = sampleColorRamp(RED(), BLUE(), 12, { space });
            for (const stop of ramp) expect(inSRGB(stop)).toBe(true);
        }
    });

    it("an out-of-gamut endpoint is mapped in-gamut at every stop", () => {
        const ramp = sampleColorRamp(WILD_GREEN(), BLUE(), 8, { space: "oklch" });
        for (const stop of ramp) expect(inSRGB(stop)).toBe(true);
    });

    it("gamutMap:false is accepted and still yields a full ramp", () => {
        // The flag plumbs through; the egress-to-rgb path clamps either way, so
        // the in-gamut GUARANTEE is what the gamutMap=true clauses above assert.
        const ramp = sampleColorRamp(WILD_GREEN(), BLUE(), 8, {
            space: "oklch",
            gamutMap: false,
        });
        expect(ramp).toHaveLength(8);
    });
});

// ── §I.2 clause 4 — hue-method fidelity (the thing 2-stop @keyframes can't bake)

describe("sampleColorRamp — hue-method fidelity (clause 4)", () => {
    it('"longer" traverses the long arc (through green/yellow); "shorter" does not', () => {
        const shortRamp = sampleColorRamp(RED(), BLUE(), 8, {
            space: "oklch",
            hueMethod: "shorter",
        });
        const longRamp = sampleColorRamp(RED(), BLUE(), 8, {
            space: "oklch",
            hueMethod: "longer",
        });
        // Mid-ramp hue (degrees): the short arc dips toward magenta/violet
        // (hue ~300°); the long arc climbs through yellow/green (hue ~90–130°).
        const midShortHue = (color2(shortRamp[4]!, "oklch").h as number) * 360;
        const midLongHue = (color2(longRamp[4]!, "oklch").h as number) * 360;
        // The long arc passes through the yellow/green band; the short arc does not.
        expect(midLongHue).toBeGreaterThan(60);
        expect(midLongHue).toBeLessThan(180);
        expect(midShortHue).toBeGreaterThan(250);
    });
});

// ── §I.2 clause 5 — endpoint identity ─────────────────────────────────────────

describe("sampleColorRamp — endpoint identity (clause 5)", () => {
    it('inclusive: stop[0] ≈ from and stop[n-1] ≈ to (ΔE below JND)', () => {
        for (const space of ["oklab", "oklch"] as const) {
            const ramp = sampleColorRamp(RED(), BLUE(), 7, { space });
            expect(dE(RED(), ramp[0]!)).toBeLessThan(0.02);
            expect(dE(BLUE(), ramp[ramp.length - 1]!)).toBeLessThan(0.02);
        }
    });

    it('exclusive: stops sit at bin centers, NOT on the endpoints', () => {
        const ramp = sampleColorRamp(RED(), BLUE(), 4, {
            space: "oklab",
            endpoints: "exclusive",
        });
        expect(ramp).toHaveLength(4);
        // First exclusive stop is at t=0.125 — perceptibly away from `from`.
        expect(dE(RED(), ramp[0]!)).toBeGreaterThan(0.02);
        // Last exclusive stop is at t=0.875 — perceptibly away from `to`.
        expect(dE(BLUE(), ramp[ramp.length - 1]!)).toBeGreaterThan(0.02);
    });
});

// ── MEASURE-FIRST: the hoist is observable (no per-step color2 reconversion) ───

describe("sampleColorRamp — the color2 hoist (MEASURE-FIRST shape)", () => {
    it("a large ramp completes (the hoisted-conversion path holds for big n)", () => {
        const ramp = sampleColorRamp(RED(), BLUE(), 256, { space: "oklch" });
        expect(ramp).toHaveLength(256);
        // Endpoints still exact after 256 hoisted lerps.
        expect(dE(RED(), ramp[0]!)).toBeLessThan(0.02);
        expect(dE(BLUE(), ramp[255]!)).toBeLessThan(0.02);
    });
});
