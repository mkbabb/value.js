import { describe, expect, it } from "vitest";
import {
    linear, easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInOutCubic, smoothStep3,
    CSSCubicBezier,
    easeInBounce, bounceInEase, bounceInEaseHalf, bounceOutEase,
    bounceOutEaseHalf, bounceInOutEase,
    easeInSine, easeOutSine, easeInOutSine,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInExpo, easeOutExpo, easeInOutExpo,
    jumpTerms, steppedEase, stepStart, stepEnd,
    bezierPresets, timingFunctions,
} from "../src/easing";

const namedEasings = {
    linear, easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInOutCubic,
    easeInBounce, bounceInEase,
    easeInSine, easeOutSine, easeInOutSine,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInExpo, easeOutExpo, easeInOutExpo,
    smoothStep3,
};

describe("easing functions", () => {
    describe("boundary invariants", () => {
        it("f(0) === 0 for all named easings", () => {
            for (const [name, fn] of Object.entries(namedEasings)) {
                expect(fn(0), `${name}(0)`).toBeCloseTo(0, 5);
            }
        });

        it("f(1) === 1 for all named easings", () => {
            for (const [name, fn] of Object.entries(namedEasings)) {
                expect(fn(1), `${name}(1)`).toBeCloseTo(1, 5);
            }
        });
    });

    describe("midpoint symmetry for InOut variants + smoothStep3", () => {
        const symmetricFunctions = {
            easeInOutQuad, easeInOutCubic, easeInOutSine,
            easeInOutCirc, easeInOutExpo, smoothStep3,
        };

        it("f(0.5) ≈ 0.5", () => {
            for (const [name, fn] of Object.entries(symmetricFunctions)) {
                expect(fn(0.5), `${name}(0.5)`).toBeCloseTo(0.5, 3);
            }
        });
    });

    describe("monotonicity for standard easings", () => {
        const monotonicFunctions = {
            linear, easeInQuad, easeOutQuad, easeInOutQuad,
            easeInCubic, easeOutCubic, easeInOutCubic,
            easeInSine, easeOutSine, easeInOutSine,
            easeInCirc, easeOutCirc, easeInOutCirc,
            easeInExpo, easeOutExpo, easeInOutExpo,
        };

        it("f(0.25) < f(0.5) < f(0.75)", () => {
            for (const [name, fn] of Object.entries(monotonicFunctions)) {
                const a = fn(0.25);
                const b = fn(0.5);
                const c = fn(0.75);
                expect(a, `${name}(0.25) < ${name}(0.5)`).toBeLessThan(b);
                expect(b, `${name}(0.5) < ${name}(0.75)`).toBeLessThan(c);
            }
        });
    });

    describe("CSSCubicBezier", () => {
        it("returns 0 at t=0 and 1 at t=1", () => {
            const ease = CSSCubicBezier(0.25, 0.1, 0.25, 1);
            expect(ease(0)).toBeCloseTo(0, 5);
            expect(ease(1)).toBeCloseTo(1, 5);
        });

        it("linear diagonal (0,0,1,1) at 0.5 ≈ 0.5", () => {
            const linearBezier = CSSCubicBezier(0, 0, 1, 1);
            expect(linearBezier(0.5)).toBeCloseTo(0.5, 2);
        });
    });

    describe("steppedEase", () => {
        it("jump-start: steps up at start of interval", () => {
            const fn = steppedEase(4, "jump-start")!;
            expect(fn(0)).toBe(0);
            expect(fn(0.3)).toBe(0.25);
            expect(fn(0.5)).toBe(0.5);
            expect(fn(1)).toBe(1);
        });

        it("jump-end: steps up at end of interval", () => {
            const fn = steppedEase(4, "jump-end")!;
            expect(fn(0)).toBe(0);
            expect(fn(0.25)).toBe(0.25);
            expect(fn(0.5)).toBe(0.5);
            expect(fn(1)).toBe(1);
        });

        it("jump-none: rounds to nearest step", () => {
            const fn = steppedEase(4, "jump-none")!;
            expect(fn(0)).toBe(0);
            expect(fn(1)).toBe(1);
        });

        it("jump-both: preserves 0 and 1 boundaries", () => {
            const fn = steppedEase(4, "jump-both")!;
            expect(fn(0)).toBe(0);
            expect(fn(1)).toBe(1);
        });

        it("aliases: start = jump-start, end = jump-end", () => {
            const start = steppedEase(4, "start")!;
            const jumpStart = steppedEase(4, "jump-start")!;
            const end = steppedEase(4, "end")!;
            const jumpEnd = steppedEase(4, "jump-end")!;

            for (const t of [0, 0.1, 0.25, 0.5, 0.75, 1]) {
                expect(start(t)).toBe(jumpStart(t));
                expect(end(t)).toBe(jumpEnd(t));
            }
        });
    });

    describe("stepStart / stepEnd", () => {
        it("stepStart is steppedEase(1, 'jump-start')", () => {
            const fn = stepStart()!;
            expect(fn(0)).toBe(0);
            expect(fn(0.5)).toBe(0);
            expect(fn(1)).toBe(1);
        });

        it("stepEnd is steppedEase(1, 'jump-end')", () => {
            const fn = stepEnd()!;
            expect(fn(0)).toBe(0);
            expect(fn(0.5)).toBe(1);
            expect(fn(1)).toBe(1);
        });
    });

    describe("bezierPresets", () => {
        it("all 7 presets are arrays of 4 numbers", () => {
            const presetNames = [
                "ease", "ease-in", "ease-out", "ease-in-out",
                "ease-in-back", "ease-out-back", "ease-in-out-back",
            ] as const;

            for (const name of presetNames) {
                const preset = bezierPresets[name];
                expect(preset, `${name} exists`).toBeDefined();
                expect(preset.length, `${name} has 4 values`).toBe(4);
                for (const v of preset) {
                    expect(typeof v, `${name} values are numbers`).toBe("number");
                }
            }
        });
    });

    describe("timingFunctions", () => {
        it("hyphenated key lookup matches camelCase reference", () => {
            expect(timingFunctions["ease-in-quad"]).toBe(timingFunctions.easeInQuad);
            expect(timingFunctions["ease-out-quad"]).toBe(timingFunctions.easeOutQuad);
            expect(timingFunctions["ease-in-out-quad"]).toBe(timingFunctions.easeInOutQuad);
            expect(timingFunctions["ease-in-cubic"]).toBe(timingFunctions.easeInCubic);
            expect(timingFunctions["ease-out-cubic"]).toBe(timingFunctions.easeOutCubic);
            expect(timingFunctions["ease-in-out-cubic"]).toBe(timingFunctions.easeInOutCubic);
            expect(timingFunctions["ease-in-sine"]).toBe(timingFunctions.easeInSine);
            expect(timingFunctions["ease-in-circ"]).toBe(timingFunctions.easeInCirc);
            expect(timingFunctions["ease-in-expo"]).toBe(timingFunctions.easeInExpo);
            expect(timingFunctions["smooth-step-3"]).toBe(timingFunctions.smoothStep3);
        });

        it("ease/ease-in/ease-out/ease-in-out are functions", () => {
            expect(typeof timingFunctions.ease).toBe("function");
            expect(typeof timingFunctions["ease-in"]).toBe("function");
            expect(typeof timingFunctions["ease-out"]).toBe("function");
            expect(typeof timingFunctions["ease-in-out"]).toBe("function");
        });

        it("steps/step-start/step-end are present", () => {
            expect(timingFunctions.steps).toBe(steppedEase);
            expect(timingFunctions["step-start"]).toBe(stepStart);
            expect(timingFunctions["step-end"]).toBe(stepEnd);
        });
    });

    describe("jumpTerms", () => {
        it("contains all 7 jump terms", () => {
            expect(jumpTerms).toEqual([
                "jump-start", "jump-end", "jump-none", "jump-both",
                "start", "end", "both",
            ]);
        });
    });
});
