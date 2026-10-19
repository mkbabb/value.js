// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.ifsemi` (W8.md ADDENDUM 2026-10-15 (e); COHESION §0fg; ESC-W8close5-1): css-values-5 §5.1
// `if( [ <if-branch> ; ]* <if-branch> ;? )`, `<if-branch> = <if-condition> : <declaration-value>?`. A `;`
// separates `if()` branches and is admitted nowhere else: `.semi`'s refusals for every other `;` in a value
// stand (css-syntax-3 §5.4.6), and a branch that is not a condition, a `:` and an optional value refuses the call.

import { describe, expect, it } from "vitest";

import { parseCssValue, parseStylesheet, serializeCssValue } from "../../src/css/index";

const roundTrip = (source: string) => {
    const parsed = parseCssValue(source);
    if (!parsed.ok) throw new Error(`refused: ${source}`);
    const text = serializeCssValue(parsed.value);
    if (!text.ok) throw new Error(`unserializable: ${source}`);
    return { parsed, text: text.value };
};

describe("a `;` separates if() branches (css-values-5 §5.1)", () => {
    it.each([
        ["if(supports(display: grid): 1px; else: 2px)", "if(supports(display: grid): 1px; else: 2px)"],
        ["if(style(--x: 1): a; media(width > 1px): b; else: c)", "if(style(--x: 1): a; media(width > 1px): b; else: c)"],
        ["if(not media(print) and style(--y: 2) : 1px 2px;)", "if(not media(print) and style(--y: 2): 1px 2px;)"],
        ["if(else: a, b / c; else:)", "if(else: a, b / c; else:)"],
        ["if(else:;)", "if(else:;)"],
        ["IF(else: a)", "IF(else: a)"],
    ])("%j parses and round-trips as %j", (source, expected) => {
        const { parsed, text } = roundTrip(source);
        expect(text).toBe(expected);
        expect(parseCssValue(text)).toEqual(parsed);
    });

    it("reads an if() with branches as the call a generic reader makes, `:` and `;` its keyword tokens", () => {
        const parsed = parseCssValue("if(else: a; else: b)");
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const word = (value: string) => ({ kind: "scalar", payload: { type: "keyword", value } });
        expect(parsed.value).toEqual({
            kind: "call",
            name: "if",
            args: [{ kind: "list", separator: "space", items: ["else", ":", "a", ";", "else", ":", "b"].map(word) }],
        });
    });

    it("parses inside a declaration", () => {
        expect(parseStylesheet("a{width:if(media(print): 1px; else: 2px)}").ok).toBe(true);
    });
});

describe("a `;` anywhere else in an if() is still refused, naming the `;` (`.semi` stands)", () => {
    it.each([
        ["if(;else: a)", 3],
        ["if(else: f(a;b))", 12],
        ["if(else: a;;)", 10],
        ["rotate(0;1deg)", 8],
    ] as const)("parseCssValue(%j) names the `;` at %i", (source, start) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics).toHaveLength(1);
        expect(parsed.diagnostics[0]).toMatchObject({ code: "css_syntax", start, end: start + 1, actual: ";", expected: ["scalar"] });
    });

    it("keeps a{transform:rotate(0;1deg)} a css_syntax refusal", () => {
        const parsed = parseStylesheet("a{transform:rotate(0;1deg)}");
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics.map((row) => row.code)).toContain("css_syntax");
    });
});

describe("a branch that is not `<if-condition> : <declaration-value>?` refuses the call", () => {
    it.each(["if(x: a; foo)", "if(foo)", "if(red: a)", "if(:a)", "if(1px: a)", "if(else, x: a)", "if(else / x: a)"])("%j", (source) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics).toHaveLength(1);
        expect(parsed.diagnostics[0]).toMatchObject({ code: "css_syntax", expected: ["<if()>"] });
    });

    it("leaves if() with no branch to the generic call's refusal", () => {
        expect(parseCssValue("if()").diagnostics[0]).toMatchObject({ code: "css_syntax", expected: ["function argument"] });
    });
});
