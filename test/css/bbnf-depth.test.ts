// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.v` V-8 — nesting beyond the generated parser's depth limit is REFUSED, never thrown: the
// emitted module counts only its recursive back-edges (`@mkbabb/bbnf-lang` 0.2.0, README "Nesting
// depth"), so `calc(` nested 10,000 deep answers a `ParseResult` failure instead of a `RangeError`.

import { describe, expect, it } from "vitest";

import { parseCssColor, parseCssScalar, parseCssValue } from "../../src/css/index";

const nest = (depth: number, open: string, core: string): string => open.repeat(depth) + core + ")".repeat(depth);

describe("the generated parser's nesting depth", () => {
    it("refuses calc( nested 10,000 deep, and never throws", () => {
        const deep = nest(10_000, "calc(", "1");
        for (const parse of [parseCssValue, parseCssScalar, parseCssColor]) {
            expect(() => parse(deep)).not.toThrow();
            expect(parse(deep).ok).toBe(false);
        }
        expect(parseCssColor(`rgb(${deep} 0 0)`).ok).toBe(false);
    });

    it("still reads a shallow nesting", () => {
        expect(parseCssColor(`rgb(${nest(10, "calc(", "1")} 0 0)`).ok).toBe(true);
        expect(parseCssValue(nest(10, "calc(", "1px")).ok).toBe(true);
    });
});
