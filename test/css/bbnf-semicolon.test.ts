// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.semi` (W8.md ADDENDUM 2026-10-13 (b); COHESION §0fa.5; ESC-W13X-r4lib-1, UIA-KF-277): a `;` is
// never a component value. css-syntax-3 §5.4.6 ends a declaration at a top-level `<semicolon-token>`, so a
// `;` a declaration's value still holds stands inside a block — `rotate(0;1deg)` — where no property grammar
// reads one (css-values-4 §2; css-variables-1 §2 `<declaration-value>` excludes it from a `var()` fallback).
// The value parser refuses it with a `css_syntax` diagnostic (keyframes reports it as `PARSE_ERROR`); it was
// read as an operator keyword, and the sheet accepted it with no diagnostic. A `;` inside a string or an
// unquoted url's token is that token's text, never a component, and stays valid.

import { describe, expect, it } from "vitest";

import { parseCssValue, parseStylesheet } from "../../src/css/index";

describe("a `;` inside a function block is refused (css-syntax-3 §5.4.6)", () => {
    it.each([
        "a{transform:rotate(0;1deg)}",
        "@keyframes k{0%{transform:translate(0;1px)}}",
        "@keyframes k{from{filter:drop-shadow(0 0;1px red)}}",
        "a{transform:translate(0 ; 1px)}",
        "a{transform:rotate(0deg) scale(1;2)}",
        "a{filter:blur(1px;2px)}",
        "a{color:rgb(1;2;3)}",
        "a{width:calc(1px;2px)}",
        "a{width:var(--a,1px;2px)}",
    ])("%j yields ok:false with a css_syntax diagnostic", (source) => {
        const parsed = parseStylesheet(source);
        expect(parsed.ok).toBe(false);
        if (parsed.ok) return;
        expect(parsed.diagnostics.map((row) => row.code)).toContain("css_syntax");
    });

    it.each([
        ["rotate(0;1deg)", 8],
        ["translate(0 ; 1px)", 12],
        ["var(--a,1px;2px)", 11],
        ["calc(1px;2px)", 8],
        ["0;1px", 1],
        [";", 0],
    ] as const)("parseCssValue(%j) names the `;` at %i", (source, start) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics).toHaveLength(1);
        expect(parsed.diagnostics[0]).toMatchObject({ code: "css_syntax", start, end: start + 1, actual: ";", expected: ["scalar"] });
    });
});

describe("a `;` that is a token's own text stays valid", () => {
    it.each([
        "a{transform:rotate(0deg)}",
        "a{transform:rotate(0)scale(1)}",
        'a{content:"a;b"}',
        "a{background:url(a;b.png)}",
        "@keyframes k{0%{transform:translate(0,1px)}}",
    ])("%j parses", (source) => {
        expect(parseStylesheet(source).ok).toBe(true);
    });
});
