import { describe, expect, it } from "vitest";
import {
    parseLinearStops,
    parseSteps,
    resolveEasingFunction,
} from "../src/parsing/easing";
import { cssLinear, steppedEase } from "../src/easing";

describe("parseLinearStops (E1 — CSS Easing L2 linear())", () => {
    it("parses a flat-segment stop into two stops sharing output", () => {
        // `0.5 25% 75%` is a flat segment: hold 0.5 across 25%–75% → two stops.
        expect(parseLinearStops("linear(0, 0.5 25% 75%, 1)")).toEqual([
            { output: 0 },
            { output: 0.5, input: 25 },
            { output: 0.5, input: 75 },
            { output: 1 },
        ]);
    });

    it("parses two evenly-spaced stops (no explicit positions)", () => {
        expect(parseLinearStops("linear(0, 1)")).toEqual([
            { output: 0 },
            { output: 1 },
        ]);
    });

    it("parses a single explicit position", () => {
        expect(parseLinearStops("linear(0, 0.25 75%, 1)")).toEqual([
            { output: 0 },
            { output: 0.25, input: 75 },
            { output: 1 },
        ]);
    });

    it("parses negative / overshoot outputs (output is unbounded)", () => {
        expect(parseLinearStops("linear(0, -0.2, 1.4, 1)")).toEqual([
            { output: 0 },
            { output: -0.2 },
            { output: 1.4 },
            { output: 1 },
        ]);
    });

    it("tolerates extra whitespace between number and percentages", () => {
        expect(parseLinearStops("linear(0,   0.5   25%   75% , 1)")).toEqual([
            { output: 0 },
            { output: 0.5, input: 25 },
            { output: 0.5, input: 75 },
            { output: 1 },
        ]);
    });

    it("does NOT pre-resolve gaps — emits raw stops for cssLinear to resolve", () => {
        // Both interior stops are position-free; the parser leaves them so.
        const stops = parseLinearStops("linear(0, 0.3, 0.6, 1)");
        expect(stops.filter((s) => s.input != null)).toHaveLength(0);
    });

    it("round-trips a kf-emitted spring through cssLinear at the boundaries", () => {
        const stops = parseLinearStops("linear(0, 0.234 4.17%, 0.78 50%, 1)");
        expect(stops).toEqual([
            { output: 0 },
            { output: 0.234, input: 4.17 },
            { output: 0.78, input: 50 },
            { output: 1 },
        ]);
        const f = cssLinear(stops);
        expect(f(0)).toBeCloseTo(0, 5);
        expect(f(1)).toBeCloseTo(1, 5);
        // Anchored sample: at t=0.5 the spring is at its 0.78 anchor.
        expect(f(0.5)).toBeCloseTo(0.78, 5);
    });

    it("is case-insensitive on the function name", () => {
        expect(parseLinearStops("LINEAR(0, 1)")).toEqual([
            { output: 0 },
            { output: 1 },
        ]);
    });

    it("rejects empty linear()", () => {
        expect(() => parseLinearStops("linear()")).toThrow();
    });

    it("rejects a trailing comma", () => {
        expect(() => parseLinearStops("linear(0, 1,)")).toThrow();
    });
});

describe("parseSteps (E2 — CSS Easing L1 steps())", () => {
    it("defaults the step position to jump-end", () => {
        expect(parseSteps("steps(4)")).toEqual({ count: 4, jumpTerm: "jump-end" });
    });

    it("parses an explicit jump-start position", () => {
        expect(parseSteps("steps(3, jump-start)")).toEqual({
            count: 3,
            jumpTerm: "jump-start",
        });
    });

    it("parses every spec step-position keyword", () => {
        const cases: Array<[string, string]> = [
            ["steps(2, jump-start)", "jump-start"],
            ["steps(2, jump-end)", "jump-end"],
            ["steps(2, jump-none)", "jump-none"],
            ["steps(2, jump-both)", "jump-both"],
            ["steps(2, start)", "start"],
            ["steps(2, end)", "end"],
        ];
        for (const [input, term] of cases) {
            expect(parseSteps(input).jumpTerm, input).toBe(term);
        }
    });

    it("is case-insensitive and canonicalises to lowercase", () => {
        expect(parseSteps("STEPS(5, JUMP-NONE)")).toEqual({
            count: 5,
            jumpTerm: "jump-none",
        });
    });

    it("feeds steppedEase to reproduce the staircase", () => {
        const { count, jumpTerm } = parseSteps("steps(4, jump-end)");
        const f = steppedEase(count, jumpTerm)!;
        expect(f(0)).toBe(0);
        expect(f(0.99)).toBeCloseTo(0.75, 10);
        expect(f(1)).toBe(1);
    });

    it("steps(1, jump-none) is the guarded passthrough", () => {
        const { count, jumpTerm } = parseSteps("steps(1, jump-none)");
        const f = steppedEase(count, jumpTerm)!;
        // jumpNone guard: steps <= 1 returns t unchanged.
        expect(f(0.37)).toBeCloseTo(0.37, 10);
    });

    it("rejects a zero count", () => {
        expect(() => parseSteps("steps(0)")).toThrow();
    });

    it("rejects a negative count", () => {
        expect(() => parseSteps("steps(-3)")).toThrow();
    });

    it("rejects a non-integer count", () => {
        expect(() => parseSteps("steps(4.5)")).toThrow();
    });

    it("rejects an empty steps()", () => {
        expect(() => parseSteps("steps()")).toThrow();
    });
});

describe("resolveEasingFunction (W1-6 — the parse-that hook, spring-aware)", () => {
    it("lowers spring(...) to an evaluable rising TimingFunction", () => {
        const f = resolveEasingFunction("spring(1, 100, 10, 0)");
        expect(f(0)).toBeCloseTo(0, 6); // lowered linear() starts at 0
        expect(f(1)).toBeCloseTo(1, 6); // …and settles at 1
    });

    it("delegates every non-spring form to the canonical resolveEasing", () => {
        expect(resolveEasingFunction("ease-in-out")(0)).toBeCloseTo(0, 6);
        expect(resolveEasingFunction("ease-in-out")(1)).toBeCloseTo(1, 6);
        expect(resolveEasingFunction("steps(4)")(1)).toBeCloseTo(1, 12);
        expect(resolveEasingFunction("linear(0, 1)")(0.5)).toBeCloseTo(0.5, 12);
        expect(resolveEasingFunction("cubic-bezier(0, 0, 1, 1)")(0.5)).toBeCloseTo(0.5, 6);
    });

    it("throws on an unrecognised non-spring string (via the delegate)", () => {
        expect(() => resolveEasingFunction("not-an-easing")).toThrow(/unrecognised/);
    });
});
