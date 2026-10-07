// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.x` (W8.md §Scope 3 miss 5) — `coerceToSyntax(source, "<custom-ident>")` matches only a
// css-values-4 §4.2 `<custom-ident>`: one css-syntax-3 §4.3.11 identifier (`value.bbnf` `customIdent`,
// read through `src/css/bbnf/sheet.ts` `isCustomIdent`), never a CSS-wide keyword or `default`. A string,
// a delimiter (`*`, `+`, a lone `-`), a `[]` block and a `<urange>` are not identifiers and are refused
// with `syntax_mismatch`; every identifier spelling css-syntax-3 allows (non-ASCII, escapes, a leading
// `-` or `--`) is accepted, its value as `parseCssValue` reads it.

import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/bbnf/index";
import { coerceToSyntax } from "../../src/css/syntax";

const SYNTAX = "<custom-ident>";

describe("coerceToSyntax <custom-ident> (css-values-4 §4.2)", () => {
    it.each([
        "a", "foo-bar", "_x", "-a", "--x", "--", "-\\31 a", "\\31 a", "é", "-zπ", "a\\+b", " a ", "/**/a", "Foo",
    ])("%j is a <custom-ident>", (source) => {
        const result = coerceToSyntax(source, SYNTAX);
        expect(result.ok).toBe(true);
        expect(result).toEqual(parseCssValue(source));
    });

    it.each([
        "\"a\"", "'a'", "*", "+", "-", "[a]", "[a b]", "[]", "U+26", "U+0025-00FF", "u+4??",
    ])("%j is refused: not an identifier", (source) => {
        expect(parseCssValue(source).ok).toBe(true);
        expect(coerceToSyntax(source, SYNTAX)).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_mismatch", expected: [SYNTAX] }],
        });
    });

    it.each([
        "initial", "inherit", "unset", "revert", "revert-layer", "default", "DEFAULT", "Inherit",
    ])("%j is refused: a CSS-wide keyword or `default`", (source) => {
        expect(coerceToSyntax(source, SYNTAX)).toMatchObject({ ok: false, diagnostics: [{ code: "syntax_mismatch" }] });
    });

    it.each(["1", "1px", "a b", "a, b", "f(a)"])("%j is refused: not one identifier", (source) => {
        expect(coerceToSyntax(source, SYNTAX).ok).toBe(false);
    });

    it("an alternative list still reaches the other alternatives", () => {
        expect(coerceToSyntax("\"a\"", "<custom-ident> | *").ok).toBe(true);
        expect(coerceToSyntax("[a]", "<length> | <custom-ident>").ok).toBe(false);
        expect(coerceToSyntax("12px", "<length> | <custom-ident>").ok).toBe(true);
        expect(coerceToSyntax("auto", "<length> | <custom-ident>").ok).toBe(true);
    });
});
