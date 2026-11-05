// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.v10` (W10.md; X-P-W10.md "Units carried from W9 `.vc9`"): `var()` keeps an empty fallback
// (css-variables-1 §2: `var(--x,)` substitutes nothing), and an argument list the component values do not
// read is css-variables-2's free-form `<declaration-value>` name, kept as authored and checked only at
// substitution, with css-values-5's {}-wrapping (WPT var-parsing.html).

import { describe, expect, it } from "vitest";

import { parseCssValue, serializeCssValue } from "../../src/css/index";

const text = (source: string) => {
    const parsed = parseCssValue(source);
    if (!parsed.ok) throw new Error(`refused: ${source}`);
    const out = serializeCssValue(parsed.value);
    if (!out.ok) throw new Error(`unserializable: ${source}`);
    return out.value;
};

describe("var() arguments (css-variables-1 §2, css-variables-2, css-values-5)", () => {
    it("keeps an empty fallback as an empty value", () => {
        const parsed = parseCssValue("var(--x,)");
        expect(parsed.ok && parsed.value).toEqual({
            kind: "call", name: "var",
            args: [{ kind: "scalar", payload: { type: "keyword", value: "--x" } }, { kind: "list", separator: "space", items: [] }],
        });
        expect(text("var(--x, )")).toBe("var(--x, )");
    });

    it.each(["var(--x ())", "var(--x () )", "var(--x (),)", "var({--x})", "var({--x}, 10px)", "var({--x, --y})"])(
        "%j is a pending-substitution value, kept as authored",
        (source) => expect(text(source)).toBe(source),
    );

    it.each(["var(--x {--y})", "var({--x} --y)", "var(--x {--y}, 10px)", "var()", "var({})", "var({}, 10px)", "var(, 10px)"])(
        "%j stays refused",
        (source) => expect(parseCssValue(source).ok).toBe(false),
    );

    it.each([["var(--x)", "var(--x)"], ["var(--a, var(--b, 1px))", "var(--a, var(--b, 1px))"], ["calc(var(--x) + 1px)", "calc(var(--x) + 1px)"]])(
        "a component-value reading is unchanged: %j",
        (source, expected) => expect(text(source)).toBe(expected),
    );
});
