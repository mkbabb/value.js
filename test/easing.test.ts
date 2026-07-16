import { describe, expect, it } from "vitest";
import {
    CubicBezier,
    easeInBounce,
    easeInOutCirc,
    easeInOutCubic,
    easeInOutExpo,
    easeInOutQuad,
    easeInOutSine,
    easeOutCubic,
    easeOutExpo,
    easing,
    linear,
    linearEasing,
    smoothStep3,
    steppedEase,
} from "../src/subpaths/easing";
import type { EasingFunction } from "../src/subpaths/easing";

const direct = {
    linear,
    easeOutCubic,
    easeInOutSine,
    easeInOutCubic,
    easeInOutQuad,
    easeInOutExpo,
    easeInOutCirc,
    easeOutExpo,
    smoothStep3,
    easeInBounce,
};

const unwrap = (
    result:
        | ReturnType<typeof CubicBezier>
        | ReturnType<typeof steppedEase>
        | ReturnType<typeof linearEasing>
        | ReturnType<typeof easing>,
): EasingFunction => {
    if (!result.ok) throw new Error(result.error.code);
    return result.value;
};

describe("Value 4 easing functions", () => {
    it("pins both endpoints for every direct easing", () => {
        for (const [name, fn] of Object.entries(direct)) {
            expect(fn(0), `${name}(0)`).toBeCloseTo(0, 10);
            expect(fn(1), `${name}(1)`).toBeCloseTo(1, 10);
        }
    });

    it("keeps symmetric curves centered", () => {
        for (const [name, fn] of Object.entries({
            easeInOutSine,
            easeInOutCubic,
            easeInOutQuad,
            easeInOutExpo,
            easeInOutCirc,
            smoothStep3,
        })) {
            expect(fn(0.5), name).toBeCloseTo(0.5, 10);
        }
    });

    it("constructs cubic, step, and linear functions from explicit numeric input", () => {
        expect(unwrap(CubicBezier(0, 0, 1, 1))(0.5)).toBeCloseTo(0.5, 6);
        expect(unwrap(steppedEase(4, "jump-end"))(0.99)).toBe(0.75);
        expect(unwrap(linearEasing([
            { input: 0, output: 0 },
            { input: 0.5, output: 0.75 },
            { input: 1, output: 1 },
        ]))(0.5)).toBe(0.75);
    });

    it("resolves canonical camel and kebab spellings without identity fallback", () => {
        for (const name of [
            "easeOutExpo",
            "ease-out-expo",
            "smoothStep3",
            "smooth-step-3",
            "easeInBounce",
            "ease-in-bounce",
        ]) {
            expect(Number.isFinite(unwrap(easing(name))(0.4)), name).toBe(true);
        }
        expect(easing("unknown")).toEqual({
            ok: false,
            error: { code: "easing_name_unknown" },
        });
    });

    it("reports invalid constructor inputs", () => {
        expect(CubicBezier(-0.1, 0, 1, 1)).toEqual({
            ok: false,
            error: { code: "bezier_x_out_of_range" },
        });
        expect(steppedEase(1, "jump-none")).toEqual({
            ok: false,
            error: { code: "step_count_invalid" },
        });
        expect(linearEasing([{ input: 0, output: 0 }])).toEqual({
            ok: false,
            error: { code: "linear_stop_invalid" },
        });
    });
});
