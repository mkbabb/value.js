// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.v` (W8.md §Scope 1 css-values-4 math/url/attr, css-variables-1, css-syntax-3; §Scope 3 miss 2)
// — what the product read wrongly in a component value, cured in BBNF (`src/css/grammar/*.bbnf`) with its
// actions (`src/css/bbnf/calc.ts`, `value.ts`). Each accepted form round-trips: serializing the value and
// parsing that text again gives the same value; each refused form is refused whatever property it stands in.
//   1. `attr(data-x type(<length>))` — css-values-5 §7.7 `<attr-type> = type( <syntax> ) | …`.
//   2. A math function is a calculation (css-values-4 §10): structure (§10.1), arity (§10.2–§10.7), type
//      (§10.8; `fr` never, css-grid-2 §7.2.4). The refused inputs are the vendored WPT css-values cases.
//   3. `url( <string> <url-modifier>* )` (css-values-4 §4.5; css-values-5 §4.5.1 request modifiers).
//   4. Comments (css-syntax-3 §4.3.2) stand for nothing between component values.

import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/bbnf/index";
import { serializeCssValue } from "../../src/css/serialize";
import { parseStylesheet } from "../../src/css/stylesheet";
import type { CssValue } from "../../src/value";

/** The value `source` parses to, asserted accepted and round-tripped through the serializer. */
function roundTrip(source: string): { value: CssValue; text: string } {
    const first = parseCssValue(source);
    expect(first.ok, `${source} is accepted`).toBe(true);
    if (!first.ok) throw new Error(source);
    const text = serializeCssValue(first.value);
    expect(text.ok).toBe(true);
    if (!text.ok) throw new Error(source);
    const again = parseCssValue(text.value);
    expect(again.ok && again.value).toEqual(first.value);
    return { value: first.value, text: text.value };
}
const refused = (source: string) => expect(parseCssValue(source).ok, `${source} is refused`).toBe(false);

describe("X.P.W8 .v — attr() type()", () => {
    it("attr(data-x type(<length>)) parses and round-trips (W8.md §Scope 3 miss 2)", () => {
        expect(roundTrip("attr(data-x type(<length>))").text).toBe("attr(data-x type(<length>))");
        expect(roundTrip("attr(data-x type(<length> | auto), 10px)").text).toBe("attr(data-x type(<length> | auto), 10px)");
        roundTrip("attr(data-n type(<number>+))");
        roundTrip("attr(data-n type(*))");
        roundTrip('image-set("a.avif" type("image/avif"), "a.png" type("image/png"))');
    });
    it("a type() whose argument is no <syntax> is refused", () => {
        for (const s of ["attr(data-x type(<length>>))", "attr(data-x type(1px))", "attr(data-x type(<length> |))", "attr(data-x type())"]) refused(s);
    });
});

describe("X.P.W8 .v — a math function is a calculation", () => {
    it("valid calculations stay accepted", () => {
        for (const s of [
            "calc(100% - 2 * var(--x))", "calc(1px * 2 / 4 + 3em)", "min(10px, 5vw, 2em)", "calc(50% - (1em / 2))",
            "clamp(none, 50%, 10px)", "round(up, 10px, 3px)", "round(2.5)", "mod(10deg, 3deg)", "atan2(1px, 50%)",
            "sin(45deg)", "asin(0.5)", "pow(2, 3)", "log(8, 2)", "hypot(3px, 4px)", "abs(-1em)", "sign(-2px)",
            "progress(50px, 0px, 100px)", "calc(sibling-index() - 2)", "calc(infinity * 1px)", "calc(1px * 1px / 1px)",
            "max(1px, env(safe-area-inset-top))", "calc(var(--a) var(--b))", "alpha(from red / calc(alpha * 0.5))",
        ]) roundTrip(s);
    });
    it("structure: juxtaposed operands, a dangling operator, a stray token (§10.1)", () => {
        for (const s of ["max(1deg 2deg)", "min(1px - )", "rotate(atan(1deg - ))", "calc((0.25turn error))", "calc([])", "calc( [])", "abs(1 + )"]) refused(s);
    });
    it("arity and signature (§10.2–§10.7, css-values-5 progress())", () => {
        for (const s of ["abs(1, 2)", "sign(1, 0deg)", "atan2(90px)", "exp(1, 0px)", "round(nearest, 1, nearest)", "round(nearest, 1px)",
            "round(nearest, 1px, 1px, 1px)", "clamp(1px 1px 1px)", "clamp(none, none + 1, none)", "progress(1)", "progress(no-clamp 1, 0 1)"]) refused(s);
    });
    it("type (§10.8): mismatches, number-only arguments, unknown units, keywords, no-value types, fr", () => {
        for (const s of ["min(1px, 0Hz)", "min(1%, 0)", "asin(1deg)", "exp(0Hz)", "log(0deg)",
            "pow(2px, 2)", "hypot(2px, 3)", "max(1dag)", "calc(7px * up)", "abs(none)", "clamp(none + 10, 15, 20)", "mod(1, 1%)",
            "progress(10px * 10px, 10px * 10px, 10px * 10px)", "calc(1px * progress(10deg, 0, 10))", "min(0fr)", "max(1deg, 0fr)"]) refused(s);
    });
});

describe("X.P.W8 .v — url( <string> <url-modifier>* )", () => {
    it("modifiers read and round-trip", () => {
        expect(roundTrip('url("a.png" cross-origin(anonymous) integrity("sha384-x") referrer-policy(no-referrer))').text)
            .toBe('url("a.png" cross-origin(anonymous) integrity("sha384-x") referrer-policy(no-referrer))');
        roundTrip('url("a.png")');
        roundTrip('url("a.png" foo bar(baz))');
    });
    it("a modifier named twice, a bad modifier argument, a number or a string modifier are refused", () => {
        for (const s of ['url("a" cross-origin(anonymous) cross-origin(use-credentials))', 'url("a" foobar foobar)', 'url("a" FooBar foobar)',
            'url("a" foobar(baz) foobar(qux))', 'url("a" cross-origin(anonymous foobar))', 'url("a" integrity(sha384-foobar))',
            'url("a" referrer-policy(no-referrer same-origin))', 'url("a" 42)', 'url("a" "b")']) refused(s);
    });
});

describe("X.P.W8 .v — comments stand for nothing (css-syntax-3 §4.3.2)", () => {
    it("between, around and inside component values", () => {
        expect(roundTrip("auto /**/").text).toBe("auto");
        expect(roundTrip("1px/**/2px").text).toBe("1px 2px");
        expect(roundTrip("a /* x */ , b").text).toBe("a, b");
        expect(roundTrip("calc(/**/1px + 2px/**/)").text).toBe("calc(1px + 2px)");
        expect(roundTrip("rgb(1 2 3 /**/)").text).toBe(roundTrip("rgb(1 2 3)").text);
        expect(roundTrip("1px /**/ / 2px").text).toBe("1px / 2px");
    });
    it("a declaration value holding a comment is read", () => {
        expect(parseStylesheet(".a { color: /* x */ red; width: 100%/* c */ }").ok).toBe(true);
    });
    it("an unclosed comment is refused", () => {
        refused("a /*");
        refused("calc(1px /* )");
    });
});
