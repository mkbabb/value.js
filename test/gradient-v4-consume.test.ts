import { describe, expect, it } from "vitest";
import { parseCssColor } from "@src/subpaths/css";
import {
    linearInterval,
    serializeCoalescedGradient,
} from "../demo/workbenches/gradient/composables/useGradientCSS";
import {
    easingFnOf,
    intervalSampler,
    sampleCoalescedStops,
} from "../demo/workbenches/gradient/model/sample";
import { formatColorLiteral } from "../demo/workbenches/gradient/composables/useGradientCSS";
import type { GradientModelState } from "../demo/workbenches/gradient/model/types";
import { SPECIMEN_TILES } from "../demo/workbenches/gradient/GradientVisualizer/easing/easingCatalogue";

const model: GradientModelState = {
    type: "linear",
    direction: 90,
    // X-W6 `.a` deleted `GradientModelState.intervals`: the interval now hangs
    // on the stop that OPENS it (`GradientStop.easing`), which is what makes a
    // re-sort safe. Migration applied verbatim from `.a`'s receipt.
    stops: [
        {
            id: "left",
            cssColor: "oklch(0.7 0.18 30)",
            position: 0,
            easing: linearInterval(),
        },
        {
            id: "right",
            cssColor: "color(display-p3 0.1 0.7 1)",
            position: 100,
            easing: linearInterval(),
        },
    ],
    interpolationSpace: "oklch",
    hueMethod: "shorter",
};

describe("Gradient Value 4 capability consume", () => {
    it("mixes final color objects and emits parseable CSS", () => {
        // X-W6 · X.W6.c: the interval colour is the ONE sampling law
        // (`intervalSampler`), printed in the one literal dialect.
        const [left, right] = model.stops;
        const mid = (space: "oklch" | "hsv") =>
            formatColorLiteral(
                intervalSampler(left!, right!, {
                    interpolationSpace: space,
                    hueMethod: "shorter",
                })(0.5),
            );
        expect(parseCssColor(mid("oklch")).ok).toBe(true);
        expect(parseCssColor(mid("hsv")).ok).toBe(true);

        const samples = sampleCoalescedStops(model);
        expect(samples.length).toBeGreaterThan(2);
        expect(samples.every(({ color }) => color.space === "oklch")).toBe(true);
        // X-W6 · X.W6.c: the render CSS carries the model's space clause.
        expect(serializeCoalescedGradient(model)).toMatch(
            /^linear-gradient\(90deg in oklch, oklch\(/,
        );
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
