// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.t10` (W10.md; COHESION §0ht/§0hv): an `<easing-function>`'s arguments take math functions of
// their type (css-easing-2 §2–§4 over css-values-4 §10). A timing argument is always absolute, so
// `parseTimingFunction` resolves it at parse: an `<integer>` rounds and clamps (§10.9), a NaN is censored
// to 0; `linear()`'s stops stay as authored (the 4.x contract). A value list refuses a `linear()` whose
// stops are not `<number> <percentage>{0,2}`.

import { describe, expect, it } from "vitest";

import { parseCssValue, parseTimingFunction } from "../../src/css/index";

const timing = (source: string) => {
    const parsed = parseTimingFunction(source);
    if (!parsed.ok) throw new Error(`refused: ${source}`);
    return parsed.value;
};
const stops = (pairs: readonly (readonly [number, ...number[]])[]) => ({ kind: "linear-function", stops: pairs.map(([output, ...input]) => ({ output, input })) });

describe("math functions in easing arguments (css-easing-2 over css-values-4 §10)", () => {
    it.each([
        ["linear(0 calc(50%), 0 100%)", stops([[0, 0.5], [0, 1]])],
        ["linear(0 calc(min(50%, 60%)), 0 100%)", stops([[0, 0.5], [0, 1]])],
        ["linear(calc(0/0), 1)", stops([[0], [1]])],
        ["steps(calc(5 / 2), start)", { kind: "steps", count: 3, position: "jump-start" }],
        ["steps(calc(-10), start)", { kind: "steps", count: 1, position: "jump-start" }],
        ["steps(calc(1), jump-none)", { kind: "steps", count: 2, position: "jump-none" }],
        ["cubic-bezier(calc(-2), calc(0.7 / 2), calc(1.5), calc(0))", { kind: "cubic-bezier", x1: 0, y1: 0.35, x2: 1, y2: 0 }],
    ])("%j resolves at parse", (source, expected) => {
        expect(timing(source)).toEqual(expected);
    });

    it.each(["linear(0 calc(50px), 1)", "linear(calc(1px) 0%, 1)", "steps(0)", "steps(2.5)", "cubic-bezier(1.5, 0, 0, 0)", "steps(var(--n))", "linear(0)"])(
        "%j stays refused",
        (source) => expect(parseTimingFunction(source).ok).toBe(false),
    );
});

describe("a value list checks linear()'s stops", () => {
    it.each(["linear(0)", "linear(100%)", "linear(0% 1 50%)", "linear(0 0% 100%)", "linear(0% 100% 0)", "linear(0 calc(50px - 50%), 0 calc(50em + 50em))"])(
        "%j is refused",
        (source) => expect(parseCssValue(source).ok).toBe(false),
    );
    it.each(["linear(0, 1)", "linear(0 calc(min(50%, 60%)), 0 100%)", "linear(0 0% 50%, 1 50% 100%)", "linear(var(--stops))", "linear-gradient(red, blue)"])(
        "%j is accepted",
        (source) => expect(parseCssValue(source).ok).toBe(true),
    );
});
