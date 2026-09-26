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
// X.P.W7 `.gap2` (W7.md ADDENDUM (i)) — three more valid forms `.gap` surfaced, cured the same way:
//   4. Grid line names (`grid-template-columns: [rail] 1fr [end]`): css-grid-2 §7.2
//      `<line-names> = '[' <custom-ident>* ']'`, one keyword spelled canonically `[a b]`; a general
//      `[]` block stays refused.
//   5. The empty `url()`: css-syntax-3 §4.3.6, a `<url-token>` with empty contents.
//   6. `*` with no whitespace in math (`calc(1px*2)`): css-values-4 §10.1 requires whitespace only
//      around `+` and `-`.
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

describe("4 · grid line names (css-grid-2 §7.2 <line-names> = '[' <custom-ident>* ']')", () => {
    it("reads `[rail] 1fr [end]` with each block one keyword, spelled canonically", () => {
        expect(roundTrip("[rail] 1fr [end]")).toEqual(space(kw("[rail]"), num(1, "fr"), kw("[end]")));
        expect(roundTrip("[  a   b ] auto")).toEqual(space(kw("[a b]"), kw("auto")));
        expect(roundTrip("[--x -y _z] 1fr")).toEqual(space(kw("[--x -y _z]"), num(1, "fr")));
        //  `<custom-ident>*`: the empty block is valid.
        expect(roundTrip("[] 1fr")).toEqual(space(kw("[]"), num(1, "fr")));
    });

    it("reads line names inside repeat(), beside strings (grid-template) and after subgrid", () => {
        expect(roundTrip("repeat(auto-fill, [col-start] minmax(8rem, 1fr) [col-end])")).toEqual(call("repeat",
            kw("auto-fill"), space(kw("[col-start]"), call("minmax", num(8, "rem"), num(1, "fr")), kw("[col-end]"))));
        expect(roundTrip('[header-left] "head head" 30px [header-right] / 1fr')).toEqual(slash(
            space(kw("[header-left]"), kw('"head head"'), num(30, "px"), kw("[header-right]")), num(1, "fr")));
        expect(roundTrip("subgrid [a] [b c]")).toEqual(space(kw("subgrid"), kw("[a]"), kw("[b c]")));
    });

    it("refuses any `[]` block that is not identifiers alone", () => {
        for (const source of ["[1px]", "[a, b]", '["a"]', "[[a]]", "[a/b]", "[a", "a]", "[a]b", "[a](b)", "[a;b]", "[a()]"]) {
            expect(parseCssValue(source).ok, source).toBe(false);
        }
    });

    it("parses the keyframes corpus declaration inside a sheet", () => {
        const sheet = parseStylesheet(".a { grid-template-columns:[rail] var(--rail-track) [stage] minmax(0, 1fr); }");
        expect(sheet.ok).toBe(true);
    });
});

describe("5 · the empty url() (css-syntax-3 §4.3.6 <url-token> with empty contents)", () => {
    it("reads `url()` as the url call with no arguments, spelled `url()`", () => {
        expect(roundTrip("url()")).toEqual(call("url"));
        expect(roundTrip("url(   )")).toEqual(call("url"));
        expect(roundTrip("URL() no-repeat")).toEqual(space(call("URL"), kw("no-repeat")));
    });

    it("keeps a bad url refused, and a function that needs an argument still needs one", () => {
        expect(parseCssValue("url( a b )").ok).toBe(false);
        expect(parseCssValue("url(()").ok).toBe(false);
        expect(parseCssValue("rotate()").ok).toBe(false);
    });

    it("parses the declaration inside a sheet", () => {
        expect(parseStylesheet(".a { background-image: url(); }").ok).toBe(true);
    });
});

describe("6 · `*` with no whitespace in math (css-values-4 §10.1)", () => {
    it("reads `calc(1px*2)` as `calc(1px * 2)` reads", () => {
        const value = roundTrip("calc(1px*2)");
        expect(value).toEqual(call("calc", space(num(1, "px"), kw("*"), num(2))));
        expect(value).toEqual(roundTrip("calc(1px * 2)"));
        expect(roundTrip("calc(1px *2)")).toEqual(value);
        expect(roundTrip("calc(1px* 2)")).toEqual(value);
    });

    it("reads the corpus spellings, groups and functions against `*`, and `/` unspaced", () => {
        expect(roundTrip("calc(2*var(--spacing)*-1)")).toEqual(call("calc", space(
            num(2), kw("*"), call("var", kw("--spacing")), kw("*"), num(-1))));
        expect(roundTrip("calc((1px + 2px)*3)")).toEqual(call("calc", space(
            call("", space(num(1, "px"), kw("+"), num(2, "px"))), kw("*"), num(3))));
        expect(roundTrip("min(10px*2, 3em)")).toMatchObject({ kind: "call", name: "min", args: [space(num(10, "px"), kw("*"), num(2)), num(3, "em")] });
        expect(roundTrip("calc(4px/2)")).toEqual(call("calc", slash(num(4, "px"), num(2))));
    });

    it("still requires whitespace around `+` and `-`, and admits `*` only inside math", () => {
        expect(parseCssValue("calc(1px+2px)").ok).toBe(false);
        expect(parseCssValue("calc(1px+ 2px)").ok).toBe(false);
        expect(parseCssValue("foo(1*2)").ok).toBe(false);
        expect(parseCssValue("1px*2").ok).toBe(false);
    });

    it("parses the corpus declaration inside a sheet", () => {
        expect(parseStylesheet(".a { margin-inline: calc(2*var(--spacing)*-1); }").ok).toBe(true);
    });
});
