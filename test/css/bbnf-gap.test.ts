// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.gap` (W7.md ADDENDUM (h), COHESION §0ee) — three valid forms the product refused, cured in
// BBNF (`src/css/grammar/value.bbnf`). Each form parses to its value and round-trips: serializing the
// value and parsing that text again gives the same value.
//   1. Adjacent functions with no whitespace (`rotate(0)scale(1.3)`): css-syntax-3 §4 tokenizes `)`
//      then a `<function-token>`; css-transforms-1 `<transform-list> = <transform-function>+` juxtaposes
//      them with no whitespace required.
//   2. An unquoted `url(./x.svg)`: css-syntax-3 §4.3.6 `<url-token>`, consumed whole (its body is
//      not a component value list).
//   3. Nested parentheses in math (`calc(50% - (1em / 2))`): css-values-4 §10.1
//      `<calc-value> = … | ( <calc-sum> )`; a `()` simple block (css-syntax-3 §5.4.8) is a call with
//      the empty name, which the serializer spells `( … )`.
// The WPT cases are read from the vendored `wpt/` files (`./wpt-cases`); the corpus holds css-color
// parsing tests only, so its nested-parenthesis calc inputs are the WPT-derived cases here (no
// transform or url() case exists in it).

import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/bbnf/index";
import { serializeCssValue } from "../../src/css/serialize";
import { parseStylesheet } from "../../src/css/stylesheet";
import type { CssValue } from "../../src/value";
import { loadWptCases } from "./wpt-cases";

const num = (value: number, unit = "") => ({ kind: "scalar", payload: { type: "number", value, unit } });
const kw = (value: string) => ({ kind: "scalar", payload: { type: "keyword", value } });
const call = (name: string, ...args: unknown[]) => ({ kind: "call", name, args });
const space = (...items: unknown[]) => ({ kind: "list", separator: "space", items });
const slash = (...items: unknown[]) => ({ kind: "list", separator: "slash", items });

/** The value `source` parses to, asserted accepted and round-tripped through the serializer. */
function roundTrip(source: string): CssValue {
    const first = parseCssValue(source);
    expect(first.ok, `${source} is accepted`).toBe(true);
    if (!first.ok) throw new Error(source);
    const text = serializeCssValue(first.value);
    expect(text.ok).toBe(true);
    if (!text.ok) throw new Error(source);
    const again = parseCssValue(text.value);
    expect(again.ok, `${text.value} (serialized) is accepted`).toBe(true);
    if (again.ok) expect(again.value).toEqual(first.value);
    return first.value;
}

describe("1 · adjacent functions with no whitespace (css-syntax-3 §4; css-transforms-1 <transform-list>)", () => {
    it("reads `rotate(0)scale(1.3)` as the space list `rotate(0) scale(1.3)` reads", () => {
        const value = roundTrip("rotate(0)scale(1.3)");
        expect(value).toEqual(space(call("rotate", num(0)), call("scale", num(1.3))));
        expect(value).toEqual(roundTrip("rotate(0) scale(1.3)"));
    });

    it("reads the monaco and value-js corpus spellings, and a longer juxtaposed run", () => {
        expect(roundTrip("translate(0%)scaleX(1)")).toEqual(space(call("translate", num(0, "%")), call("scaleX", num(1))));
        expect(roundTrip("translateX(1px)rotate(2deg)scale(3)")).toEqual(
            space(call("translateX", num(1, "px")), call("rotate", num(2, "deg")), call("scale", num(3))));
        expect(roundTrip("a, rotate(0)scale(1)")).toMatchObject({ kind: "list", separator: "comma" });
    });

    it("still refuses what follows a `)` when no production reads it", () => {
        expect(parseCssValue("rotate(0)@").ok).toBe(false);
        expect(parseCssValue("rotate(0)scale(").ok).toBe(false);
        //  Only a `<function-token>` stands against the `)`: any other token still needs its whitespace.
        expect(parseCssValue("rgb(1 2 3)x").ok).toBe(false);
        expect(parseCssValue("rotate(0)1px").ok).toBe(false);
    });

    it("parses the corpus declaration inside a sheet", () => {
        const sheet = parseStylesheet(".a { transform: rotate(0)scale(1.3); }");
        expect(sheet.ok).toBe(true);
    });
});

describe("2 · an unquoted url() (css-syntax-3 §4.3.6 <url-token>)", () => {
    it("reads `url(./x.svg)` as a url call whose one argument is the url, spelled as authored", () => {
        expect(roundTrip("url(./x.svg)")).toEqual(call("url", kw("./x.svg")));
        expect(roundTrip("url(  ./x.svg  )")).toEqual(call("url", kw("./x.svg")));
        expect(roundTrip("URL(a.png)")).toEqual(call("URL", kw("a.png")));
    });

    it("reads the keyframes corpus spelling and a data: url whose body holds `,` `;` `/` `:`", () => {
        expect(roundTrip("url(./ppmycota-logo-2-CAWHh5aE.svg)")).toEqual(call("url", kw("./ppmycota-logo-2-CAWHh5aE.svg")));
        expect(roundTrip("url(data:image/svg+xml;base64,PHN2Zz4=)")).toEqual(call("url", kw("data:image/svg+xml;base64,PHN2Zz4=")));
        expect(roundTrip("url(a.png) no-repeat, url(b\\(c\\).png)")).toEqual({
            kind: "list", separator: "comma", items: [space(call("url", kw("a.png")), kw("no-repeat")), call("url", kw("b\\(c\\).png"))],
        });
    });

    it("keeps the quoted form a string argument, and refuses a bad url (css-syntax-3 §4.3.14)", () => {
        expect(roundTrip('url("./x.svg")')).toEqual(call("url", kw('"./x.svg"')));
        expect(parseCssValue("url(a b)").ok).toBe(false);
        expect(parseCssValue("url(a(b)").ok).toBe(false);
        expect(parseCssValue("url(a\"b)").ok).toBe(false);
    });

    it("parses the corpus declaration inside a sheet", () => {
        expect(parseStylesheet(".a { background-image: url(./ppmycota-logo-2-CAWHh5aE.svg); }").ok).toBe(true);
    });
});

describe("3 · nested parentheses in math (css-values-4 §10.1 `( <calc-sum> )`)", () => {
    it("reads `calc(50% - (1em / 2))` with its group as a call of the empty name", () => {
        expect(roundTrip("calc(50% - (1em / 2))")).toEqual(
            call("calc", space(num(50, "%"), kw("-"), call("", slash(num(1, "em"), num(2))))));
    });

    it("reads deeper nesting and groups in every math function", () => {
        expect(roundTrip("calc(((1px)))")).toEqual(call("calc", call("", call("", num(1, "px")))));
        expect(roundTrip("min(100%, (2em + 1px) * 3)")).toMatchObject({ kind: "call", name: "min", args: [num(100, "%"), space(call("", space(num(2, "em"), kw("+"), num(1, "px"))), kw("*"), num(3))] });
        expect(roundTrip("clamp(1rem, calc((100vw - 2rem) / 3), 3rem)")).toMatchObject({ kind: "call", name: "clamp" });
    });

    it("reads the WPT nested-parenthesis calc inputs (vendored css-color parsing tests)", () => {
        const inputs = ["color-valid-hsl.html", "color-computed-color-mix-function.html"]
            .flatMap(loadWptCases)
            .flatMap((c) => [...c.input.matchAll(/calc\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/g)].map((m) => m[0]))
            .filter((expr) => /\(.*\(.*\(/.test(expr.slice(5)) || /[-+*/] \(/.test(expr));
        expect(inputs.length).toBeGreaterThan(0);
        for (const expr of new Set(inputs)) roundTrip(expr);
        expect(roundTrip("calc(50% + (sign(100em - 1px) * 10%))")).toEqual(call("calc", space(
            num(50, "%"), kw("+"), call("", space(call("sign", space(num(100, "em"), kw("-"), num(1, "px"))), kw("*"), num(10, "%"))))));
    });

    it("refuses an empty or unclosed group", () => {
        expect(parseCssValue("calc(50% - ())").ok).toBe(false);
        expect(parseCssValue("calc(50% - (1em)").ok).toBe(false);
    });

    it("admits a group only inside a math function, never as a bare component value", () => {
        expect(parseCssValue("(1px)").ok).toBe(false);
        expect(parseCssValue("var (--a)").ok).toBe(false);
        expect(parseCssValue("foo((1px))").ok).toBe(false);
    });

    it("parses the bulma declaration inside a sheet", () => {
        expect(parseStylesheet(".a { left: calc(50% - (1em / 2)); }").ok).toBe(true);
    });
});
