// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — `value.bbnf`'s entries: component values, scalars, keyframe selectors and
// <easing-function>, each read by the BBNF grammar into `/css`'s shapes. (Equivalence against the
// shipping hand parser over the full corpus is X.P.W6.h's; these pin the grammar's own reading.)

import { describe, expect, it } from "vitest";

import {
    parseCssScalar, parseCssValue, parseCssValues, parseKeyframeSelector, parseTimingFunction,
} from "../../src/css/bbnf/index";

const num = (value: number, unit = "") => ({ kind: "scalar", payload: { type: "number", value, unit } });
const kw = (value: string) => ({ kind: "scalar", payload: { type: "keyword", value } });

describe("component values — comma, then slash, then space lists; calls; scalars", () => {
    it("reads each separator at its precedence, and a single item as itself", () => {
        expect(parseCssValue("1px solid red")).toMatchObject({
            ok: true,
            value: { kind: "list", separator: "space", items: [num(1, "px"), kw("solid"), { payload: { type: "color" } }] },
        });
        expect(parseCssValue("a / b, c")).toMatchObject({
            ok: true,
            value: { kind: "list", separator: "comma", items: [{ kind: "list", separator: "slash", items: [kw("a"), kw("b")] }, kw("c")] },
        });
        expect(parseCssValue("  12.5%  ")).toMatchObject({ ok: true, value: num(12.5, "%") });
        expect(parseCssValues("fade")).toMatchObject({ ok: true, value: { kind: "list", separator: "space", items: [kw("fade")] } });
    });

    it("reads a generic call's comma-separated arguments, and the zero-argument rules", () => {
        expect(parseCssValue("translate(1px, 2px)")).toMatchObject({ ok: true, value: { kind: "call", name: "translate", args: [num(1, "px"), num(2, "px")] } });
        expect(parseCssValue("var(--x, 1px)")).toMatchObject({ ok: true, value: { kind: "call", name: "var", args: [kw("--x"), num(1, "px")] } });
        expect(parseCssValue("sibling-index()")).toMatchObject({ ok: true, value: { kind: "call", name: "sibling-index", args: [] } });
        expect(parseCssValue("--f()")).toMatchObject({ ok: true, value: { kind: "call", name: "--f", args: [] } });
        expect(parseCssValue("sibling-index(1)").ok).toBe(false);
        expect(parseCssValue("foo()").ok).toBe(false);
    });

    it("a colour function is a colour, never a generic call", () => {
        expect(parseCssValue("rgb(1 2 3)")).toMatchObject({ ok: true, value: { payload: { type: "color", value: { space: "rgb", channels: [1, 2, 3] } } } });
        expect(parseCssValue("rgb(1)").ok).toBe(false);
        expect(parseCssValue("#0f0")).toMatchObject({ ok: true, value: { payload: { type: "color" } } });
        expect(parseCssValue("currentcolor")).toMatchObject({ ok: true, value: kw("currentcolor") });
    });

    it("scalars: a colour (color-mix() included), a number with its unit, a string, an operator, a keyword", () => {
        expect(parseCssScalar("color-mix(in srgb, red, blue)")).toMatchObject({ ok: true, value: { payload: { type: "color", value: { space: "rgb" } } } });
        expect(parseCssScalar("-2.5e1deg")).toMatchObject({ ok: true, value: num(-25, "deg") });
        expect(parseCssScalar("'a b'")).toMatchObject({ ok: true, value: kw("'a b'") });
        expect(parseCssScalar("<=")).toMatchObject({ ok: true, value: kw("<=") });
        expect(parseCssScalar("a b").ok).toBe(false);
    });
});

describe("keyframe selectors — css-animations-1 §3.2, scroll-animations-1 §4.2", () => {
    it("reads from/to, a percentage, and a named range with its offset", () => {
        expect(parseKeyframeSelector("FROM")).toEqual({ ok: true, value: { kind: "percent", value: 0 }, diagnostics: [] });
        expect(parseKeyframeSelector(" 50% ")).toMatchObject({ ok: true, value: { kind: "percent", value: 0.5 } });
        expect(parseKeyframeSelector("entry 10%")).toMatchObject({ ok: true, value: { kind: "named", name: "entry", offset: 0.1 } });
        expect(parseKeyframeSelector("150%")).toMatchObject({ ok: false, diagnostics: [{ code: "keyframe_selector_invalid" }] });
        expect(parseKeyframeSelector("middle")).toMatchObject({ ok: false, diagnostics: [{ code: "keyframe_selector_invalid" }] });
    });
});

describe("<easing-function> — css-easing-2", () => {
    it("reads keywords, cubic-bezier(), steps() and linear()", () => {
        expect(parseTimingFunction("Ease-In")).toMatchObject({ ok: true, value: { kind: "keyword", name: "ease-in" } });
        expect(parseTimingFunction("step-start")).toMatchObject({ ok: true, value: { kind: "steps", count: 1, position: "jump-start" } });
        expect(parseTimingFunction("cubic-bezier(0.1, 2, 0.3, 1)")).toMatchObject({ ok: true, value: { kind: "cubic-bezier", x1: 0.1, y1: 2, x2: 0.3, y2: 1 } });
        expect(parseTimingFunction("steps(4, jump-none)")).toMatchObject({ ok: true, value: { kind: "steps", count: 4, position: "jump-none" } });
        expect(parseTimingFunction("linear(0, 0.5 25% 75%, 1)")).toMatchObject({
            ok: true, value: { kind: "linear-function", stops: [{ output: 0, input: [] }, { output: 0.5, input: [0.25, 0.75] }, { output: 1, input: [] }] },
        });
    });

    it("refuses what the specification refuses", () => {
        for (const s of ["cubic-bezier(2, 0, 0, 1)", "steps(0)", "steps(1, jump-none)", "steps(2, constructor)", "linear(0)", "bogus"]) {
            expect(parseTimingFunction(s).ok, s).toBe(false);
        }
    });
});
