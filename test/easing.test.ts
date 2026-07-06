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
    resolveEasing,
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
        it("jump-start: jumps at start of each interval (ceil)", () => {
            const fn = steppedEase(4, "jump-start")!;
            expect(fn(0)).toBe(0);
            expect(fn(0.1)).toBe(0.25);   // ceil(0.4)/4 = 1/4
            expect(fn(0.25)).toBe(0.25);   // ceil(1)/4 = 1/4
            expect(fn(0.3)).toBe(0.5);    // ceil(1.2)/4 = 2/4
            expect(fn(0.5)).toBe(0.5);    // ceil(2)/4 = 2/4
            expect(fn(0.75)).toBe(0.75);  // ceil(3)/4 = 3/4
            expect(fn(1)).toBe(1);
        });

        it("jump-end: jumps at end of each interval (floor)", () => {
            const fn = steppedEase(4, "jump-end")!;
            expect(fn(0)).toBe(0);
            expect(fn(0.24)).toBe(0);      // floor(0.96)/4 = 0
            expect(fn(0.25)).toBe(0.25);   // floor(1)/4 = 1/4
            expect(fn(0.5)).toBe(0.5);     // floor(2)/4 = 2/4
            expect(fn(0.99)).toBe(0.75);   // floor(3.96)/4 = 3/4
            expect(fn(1)).toBe(1);
        });

        it("jump-none: n-1 steps between 0 and 1", () => {
            const fn = steppedEase(4, "jump-none")!;
            expect(fn(0)).toBe(0);
            // floor(t * 3) / 3, so steps at 0, 1/3, 2/3, 1
            expect(fn(0.5)).toBeCloseTo(1 / 3, 10);
            expect(fn(1)).toBe(1);
        });

        it("jump-both: n+1 intervals", () => {
            const fn = steppedEase(4, "jump-both")!;
            expect(fn(0)).toBe(0);
            // floor(t * (4+1)) / (4+1) = floor(t * 5) / 5
            expect(fn(0.3)).toBe(0.2);     // floor(1.5)/5 = 1/5
            expect(fn(1)).toBe(1);         // floor(5)/5 = 1
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
        it("stepStart is steppedEase(1, 'jump-start') — jumps immediately", () => {
            const fn = stepStart()!;
            expect(fn(0)).toBe(0);
            expect(fn(0.5)).toBe(1);    // ceil(0.5*1)/1 = 1
            expect(fn(1)).toBe(1);
        });

        it("stepEnd is steppedEase(1, 'jump-end') — stays at 0 until end", () => {
            const fn = stepEnd()!;
            expect(fn(0)).toBe(0);
            expect(fn(0.5)).toBe(0);    // floor(0.5*1)/1 = 0
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

        // R.W1.4 — the tightened preset table (easings.net + exact ⅓-handles).
        // The numeric floor the R.W4 EasingPicker migration consumes: worst-case
        // deviation from the analytic curve is sub-JND, and the pure polynomial
        // curves are represented EXACTLY (audit/pass2/easing-disposition.md §1.4).
        const bezOf = (name: keyof typeof bezierPresets): ((x: number) => number) =>
            CSSCubicBezier(...(bezierPresets[name] as [number, number, number, number]));

        const maxDeviation = (
            bez: (x: number) => number,
            fn: (t: number) => number,
        ): number => {
            let max = 0;
            for (let i = 0; i <= 2000; i++) {
                const t = i / 2000;
                max = Math.max(max, Math.abs(bez(t) - fn(t)));
            }
            return max;
        };

        it("R-2 — smooth-step-3 is the exact Hermite ⅓-handle bezier", () => {
            expect(bezierPresets["smooth-step-3"]).toEqual([1 / 3, 0, 2 / 3, 1]);
            expect(maxDeviation(bezOf("smooth-step-3"), smoothStep3)).toBeLessThan(1e-6);
        });

        it("R-3 — the four pure in/out quad and cubic rows are EXACT", () => {
            const exact: [keyof typeof bezierPresets, (t: number) => number][] = [
                ["ease-in-quad", easeInQuad],
                ["ease-out-quad", easeOutQuad],
                ["ease-in-cubic", easeInCubic],
                ["ease-out-cubic", easeOutCubic],
            ];
            for (const [name, fn] of exact) {
                expect(maxDeviation(bezOf(name), fn), name).toBeLessThan(1e-6);
            }
        });

        it("R-3 — the 15 tightened rows track their analytic curves at ≤ 0.0387 (sub-JND)", () => {
            const analytic: [keyof typeof bezierPresets, (t: number) => number][] = [
                ["ease-in-sine", easeInSine],
                ["ease-out-sine", easeOutSine],
                ["ease-in-out-sine", easeInOutSine],
                ["ease-in-quad", easeInQuad],
                ["ease-out-quad", easeOutQuad],
                ["ease-in-out-quad", easeInOutQuad],
                ["ease-in-cubic", easeInCubic],
                ["ease-out-cubic", easeOutCubic],
                ["ease-in-out-cubic", easeInOutCubic],
                ["ease-in-expo", easeInExpo],
                ["ease-out-expo", easeOutExpo],
                ["ease-in-out-expo", easeInOutExpo],
                ["ease-in-circ", easeInCirc],
                ["ease-out-circ", easeOutCirc],
                ["ease-in-out-circ", easeInOutCirc],
            ];
            let globalMax = 0;
            for (const [name, fn] of analytic) {
                globalMax = Math.max(globalMax, maxDeviation(bezOf(name), fn));
            }
            // §1.4: the worst tightened row is ease-in-out-circ at 0.0387.
            expect(globalMax).toBeLessThan(0.0388);
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

describe("resolveEasing (W1-6 — canonical string → TimingFunction)", () => {
    it("resolves hyphenated named catalogue keys", () => {
        expect(resolveEasing("linear")(0.5)).toBeCloseTo(0.5, 12);
        expect(resolveEasing("ease-in-quad")(0.5)).toBeCloseTo(0.25, 12);
        expect(resolveEasing("smooth-step-3")(0.5)).toBeCloseTo(0.5, 12);
    });

    it("resolves camelCase named keys (case-sensitive) + is case-insensitive on hyphenated keys", () => {
        expect(resolveEasing("easeInQuad")(0.5)).toBeCloseTo(0.25, 12);
        expect(resolveEasing("Ease-In-Out")(0)).toBeCloseTo(0, 6);
        expect(resolveEasing("EASE-IN-OUT")(1)).toBeCloseTo(1, 6);
    });

    it("resolves cubic-bezier(...)", () => {
        const f = resolveEasing("cubic-bezier(0.42, 0, 0.58, 1)");
        expect(f(0)).toBeCloseTo(0, 6);
        expect(f(1)).toBeCloseTo(1, 6);
        // Identity handles → x(t)=t: the linear bezier is exactly linear.
        expect(resolveEasing("cubic-bezier(0, 0, 1, 1)")(0.5)).toBeCloseTo(0.5, 6);
    });

    it("resolves steps(...) with and without an explicit jump position", () => {
        expect(resolveEasing("steps(4, jump-end)")(0.5)).toBeCloseTo(0.5, 12);
        expect(resolveEasing("steps(4)")(1)).toBeCloseTo(1, 12);
        expect(resolveEasing("steps(2, jump-start)")(0.01)).toBeCloseTo(0.5, 12);
    });

    it("resolves the step-start / step-end factory keywords", () => {
        expect(resolveEasing("step-start")(0)).toBe(0);
        expect(resolveEasing("step-start")(0.01)).toBe(1);
        expect(resolveEasing("step-end")(0.99)).toBe(0);
        expect(resolveEasing("step-end")(1)).toBe(1);
    });

    it("resolves linear(...) including a two-percentage flat segment", () => {
        expect(resolveEasing("linear(0, 1)")(0.5)).toBeCloseTo(0.5, 12);
        const flat = resolveEasing("linear(0, 0.5 25% 75%, 1)");
        expect(flat(0.5)).toBeCloseTo(0.5, 12); // held flat across 25%–75%
        expect(flat(0)).toBeCloseTo(0, 12);
        expect(flat(1)).toBeCloseTo(1, 12);
    });

    it("agrees with the raw timingFunctions catalogue for a sampled key", () => {
        const ref = timingFunctions["ease-in-out-cubic"];
        const got = resolveEasing("ease-in-out-cubic");
        for (const t of [0, 0.2, 0.5, 0.8, 1]) {
            expect(got(t)).toBeCloseTo(ref(t), 12);
        }
    });

    it("throws on an unrecognised string — never silently degrades to linear", () => {
        expect(() => resolveEasing("not-an-easing")).toThrow(/unrecognised/);
        expect(() => resolveEasing("steps")).toThrow(/requires arguments/);
        expect(() => resolveEasing("cubic-bezier(1, 2, 3)")).toThrow(/4 numbers/);
        expect(() => resolveEasing("steps(0)")).toThrow(/positive integer/);
    });
});
