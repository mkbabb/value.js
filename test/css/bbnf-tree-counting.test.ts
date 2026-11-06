// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.k10` (b) (XP-13, COHESION §0hv RECOMMENDED): `sibling-index()` and `sibling-count()` (css-values-5
// §8; WPT css/css-values/tree-counting/calc-sibling-function-parsing.html) are <integer>s only the element
// knows. In a colour's channel, inside a math function, they make the colour context-dependent: `parseCssColor`
// answers `color_context_required`, as for `var()`, where it refused them as syntax.

import { describe, expect, it } from "vitest";

import { parseCssColor, parseCssValue } from "../../src/css/index";

const code = (source: string) => {
    const parsed = parseCssColor(source);
    return parsed.ok ? "ok" : parsed.diagnostics[0]?.code;
};

describe("tree-counting functions in a colour (css-values-5 §8)", () => {
    it.each([
        "color(srgb calc(0.1 * sibling-index()) 0.5 0.5)",
        "color(srgb 0.5 0.5 0.5 / calc(0.1 * sibling-count()))",
        "oklch(0.5 calc(0.05 * sibling-count()) 180)",
        "oklch(0.5 0.2 calc(30deg * sibling-index()))",
        "rgb(calc(10 * sibling-index()) 0 0)",
        "hsl(calc(sibling-index() * 10deg) 50% 50%)",
        "oklch(0.5 0.2 calc(30deg * SIBLING-INDEX( )))",
    ])("%s answers color_context_required", (source) => {
        expect(code(source)).toBe("color_context_required");
    });
    it("a tree-counting function with arguments, or of another name, is still syntax", () => {
        expect(code("oklch(0.5 0.2 calc(30deg * sibling-index(1)))")).toBe("css_syntax");
        expect(code("oklch(0.5 0.2 calc(30deg * sibling-indices()))")).toBe("css_syntax");
    });
    it("in a value list the colour keeps value.js's context contract", () => {
        const parsed = parseCssValue("oklch(0.5 0.2 calc(30deg * sibling-index()))");
        expect(parsed.ok ? "ok" : parsed.diagnostics[0]?.code).toBe("color_context_required");
        expect(parseCssValue("calc(10 * sibling-index())").ok).toBe(true);
    });
});
