// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.k10` (a) (XP-13, COHESION §0hv RECOMMENDED): `calc-size( <calc-size-basis>, <calc-sum> )`
// (css-values-5 §5.1; WPT css/css-values/calc-size/calc-size-parsing.html). Two arguments; the basis a keyword,
// `any`, a nested `calc-size()` or a length-percentage `<calc-sum>`; the `<calc-sum>` of a length-percentage
// type, naming `size` only when the basis is not `any`; no `calc-size()` inside a math function or another
// `<calc-sum>`; no `size` inside a math function outside a `<calc-sum>`. Which keyword a property admits as the
// basis is that property's grammar (DR-a), so `calc-size(none, size)` parses here.

import { describe, expect, it } from "vitest";

import { parseCssValue, parseCssValues } from "../../src/css/index";

const VALID = [
    "calc-size(auto, size)", "calc-size(min-content, size * 2)", "calc-size(fit-content, 30px + size / 2)",
    "calc-size(any, 50px + 30%)", "calc-size(calc-size(2in, 30px), 25em)", "calc-size(auto, 0px)",
    "calc-size(10px, sign(size) * size)", "calc-size(30px, size)", "calc-size(50%, size)", "calc-size(none, size)",
    "calc-size(var(--b), size)", "size",
];
const INVALID = [
    "calc-size(any, size)", "calc-size(any, fit-content)", "calc-size(auto, auto)", "sign(size)", "calc(50px * sign(size))",
    "calc-size(any, calc-size(10px, sign(size) * size))", "calc-size(any, calc-size(any, 10px))",
    "calc(calc-size(auto, size))", "calc(50px * sign(calc-size(auto, size)))",
    "min(calc-size(auto, 0px), calc-size(auto, size))", "calc(12% + calc-size(any, 31%))",
    "calc-size(30px)", "calc-size(any)", "calc-size(calc-size(any, 30px))", "calc-size(auto, size, 1px)",
    "calc-size(0, 0px)", "calc-size(0px, 0)", "calc-size(0, 0)", "calc-size(size, 10px)", "calc-size(10px + size, 1px)",
    "calc-size(auto, 1s)", "calc-size(1deg, size)",
];

describe("calc-size() (css-values-5 §5.1)", () => {
    it.each(VALID)("%s parses", (source) => {
        expect(parseCssValue(source).ok).toBe(true);
    });
    it.each(INVALID)("%s is refused, css_syntax <calc-size()>", (source) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics[0]).toMatchObject({ code: "css_syntax", expected: ["<calc-size()>"] });
    });
    it("is checked in every item of a list", () => {
        expect(parseCssValues("1px, calc-size(any, size)").ok).toBe(false);
        expect(parseCssValues("1px, calc-size(auto, size)").ok).toBe(true);
    });
});

describe("a custom property's value is any token sequence", () => {
    it("is not held to calc-size()'s grammar", async () => {
        const { parseCustomPropertyValue } = await import("../../src/css/bbnf/index");
        expect(parseCustomPropertyValue("calc-size(any, size)").ok).toBe(true);
    });
});
