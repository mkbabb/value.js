import { describe, expect, it } from "vitest";
import { interpolateHue } from "../src/units/color/utils";
import type { HueInterpolationMethod } from "../src/units/color/utils";

describe("Hue Interpolation", () => {
    describe("shorter (default)", () => {
        it("should interpolate within the shorter arc", () => {
            // 0° to 90° (shorter arc is direct)
            expect(interpolateHue(0, 0.25, 0.5)).toBeCloseTo(0.125, 5);
        });

        it("should wrap around for shorter arc crossing 0°/360°", () => {
            // 350° to 10° — shorter arc crosses 0°
            const h1 = 350 / 360;
            const h2 = 10 / 360;
            const result = interpolateHue(h1, h2, 0.5);
            // Midpoint should be 0° (i.e. 0 or 1)
            expect(result).toBeCloseTo(0, 5);
        });

        it("should handle equal hues", () => {
            expect(interpolateHue(0.5, 0.5, 0.5)).toBeCloseTo(0.5, 5);
        });

        it("should return h1 at t=0", () => {
            // shorter: diff=0.6 > 0.5, so h1+=1 → 1.2. t=0: result=1.2 → 0.2
            expect(interpolateHue(0.2, 0.8, 0)).toBeCloseTo(0.2, 5);
        });

        it("should return h2 at t=1", () => {
            // shorter: diff=0.6 > 0.5, so h1+=1 → 1.2. t=1: result=0.8
            expect(interpolateHue(0.2, 0.8, 1)).toBeCloseTo(0.8, 5);
        });
    });

    describe("longer", () => {
        it("should interpolate the longer arc", () => {
            // 0° to 90° — longer arc goes 0° → 270° → 180° → 90°
            const result = interpolateHue(0, 0.25, 0.5, "longer");
            // Midpoint of longer arc (0 → -0.75 → wrap) = 0.625
            expect(result).toBeCloseTo(0.625, 5);
        });

        it("should handle opposite hues", () => {
            // 0° to 180° — both arcs are equal length, longer should not change
            const result = interpolateHue(0, 0.5, 0.5, "longer");
            expect(result).toBeCloseTo(0.25, 5);
        });
    });

    describe("increasing", () => {
        it("should always go in increasing direction", () => {
            // 300° to 60° — increasing wraps through 360°
            const h1 = 300 / 360;
            const h2 = 60 / 360;
            const result = interpolateHue(h1, h2, 0.5, "increasing");
            // Midpoint: 300° + 0.5*(420°-300°) = 300° + 60° = 360° = 0°
            expect(result).toBeCloseTo(0, 5);
        });

        it("should not wrap when already increasing", () => {
            const result = interpolateHue(0.1, 0.4, 0.5, "increasing");
            expect(result).toBeCloseTo(0.25, 5);
        });
    });

    describe("decreasing", () => {
        it("should always go in decreasing direction", () => {
            // 60° to 300° — decreasing wraps through 0°
            const h1 = 60 / 360;
            const h2 = 300 / 360;
            const result = interpolateHue(h1, h2, 0.5, "decreasing");
            // h1 gets +1 since diff > 0: h1=1.1667, h2=0.8333
            // midpoint = 1.1667 + 0.5*(0.8333-1.1667) = 1
            expect(result).toBeCloseTo(0, 5);
        });
    });

    describe("NaN handling", () => {
        it("should use h2 when h1 is NaN", () => {
            expect(interpolateHue(NaN, 0.5, 0.5)).toBeCloseTo(0.5, 5);
        });

        it("should use h1 when h2 is NaN", () => {
            expect(interpolateHue(0.3, NaN, 0.5)).toBeCloseTo(0.3, 5);
        });

        it("should return 0 when both are NaN", () => {
            expect(interpolateHue(NaN, NaN, 0.5)).toBe(0);
        });
    });
});
