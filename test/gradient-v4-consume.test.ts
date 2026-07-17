import { describe, expect, it } from "vitest";
import { parseCssColor } from "@src/subpaths/css";
import {
    easingFnOf,
    linearInterval,
    sampleCoalescedStops,
    serializeCoalescedGradient,
} from "../demo/@/components/custom/gradient/composables/useGradientCSS";
import { interpolateStopColors } from "../demo/@/components/custom/gradient/composables/useGradientInterpolation";
import type { GradientModelState } from "../demo/@/components/custom/gradient/composables/useGradientModel";
import { SPECIMEN_TILES } from "../demo/@/components/custom/gradient/GradientVisualizer/easing/easingCatalogue";

const model: GradientModelState = {
    type: "linear",
    direction: 90,
    stops: [
        { id: "left", cssColor: "oklch(0.7 0.18 30)", position: 0 },
        { id: "right", cssColor: "color(display-p3 0.1 0.7 1)", position: 100 },
    ],
    intervals: [linearInterval()],
    interpolationSpace: "oklch",
    hueMethod: "shorter",
};

describe("Gradient Value 4 capability consume", () => {
    it("mixes final color objects and emits parseable CSS", () => {
        const css = interpolateStopColors("red", "blue", 0.5, "oklch", "shorter");
        expect(parseCssColor(css).ok).toBe(true);
        expect(
            parseCssColor(interpolateStopColors("red", "blue", 0.5, "hsv", "shorter")).ok,
        ).toBe(true);

        const samples = sampleCoalescedStops(model);
        expect(samples.length).toBeGreaterThan(2);
        expect(samples.every(({ color }) => color.space === "oklch")).toBe(true);
        expect(serializeCoalescedGradient(model)).toMatch(/^linear-gradient\(90deg, oklch\(/);
    });

    it("evaluates each CSS timing AST through the Result-based easing API", () => {
        const cases: [{ css: string }, number][] = [
            [{ css: "ease-in-out" }, 0.5],
            [{ css: "cubic-bezier(0, 0, 1, 1)" }, 0.5],
            [{ css: "steps(4, jump-end)" }, 0.5],
            [{ css: "linear(0, 0.25 50%, 1)" }, 0.25],
        ];
        for (const [interval, progress] of cases) {
            expect(Number.isFinite(easingFnOf(interval)(progress))).toBe(true);
        }
        expect(easingFnOf({ css: "linear(0, 0.25 50%, 1)" })(0.25)).toBeCloseTo(0.125);
        expect(() => easingFnOf({ css: "not-an-easing" })).toThrow(
            /Invalid gradient easing/,
        );
    });

    it("builds every easing specimen from valid Result values", () => {
        expect(SPECIMEN_TILES.length).toBeGreaterThan(20);
        expect(SPECIMEN_TILES.every((tile) => !tile.glyph.includes("NaN"))).toBe(true);
    });
});
