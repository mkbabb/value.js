// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.g` (W8.md §Scope 1 css-grid-2, §Scope 3 miss 1) — valid grid values the product refused,
// cured in BBNF (`src/css/grammar/value.bbnf`). Each form parses to its value and round-trips:
// serializing the value and parsing that text again gives the same value.
//   1. Line names juxtaposed with no whitespace (`[top]auto[stage]1fr[bottom]auto`, `[a]1fr[b]`):
//      css-syntax-3 §4.3.1 tokenizes `[` and `]` as tokens of their own, so a css-grid-2 §7.2
//      `<line-names>` block needs no whitespace beside the `<track-size>` or `<string>` next to it.
//   2. Identifiers with non-ASCII code points (`-zπ`) and escapes (`\31st`, `\31 st`): css-syntax-3
//      §4.2 (non-ASCII ident code points) and §4.3.7 (escapes; a hex escape consumes one whitespace).
//      The WPT cases are the vendored css-grid-2 `grid-area-valid.html` inputs.

import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/bbnf/index";
import { serializeCssValue } from "../../src/css/serialize";
import { parseStylesheet } from "../../src/css/stylesheet";
import type { CssValue } from "../../src/value";

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

describe("1 · line names juxtaposed with no whitespace (css-syntax-3 §4.3.1; css-grid-2 §7.2 <track-list>)", () => {
    it("reads `[top]auto[stage]1fr[bottom]auto` as its spaced spelling reads", () => {
        const value = roundTrip("[top]auto[stage]1fr[bottom]auto");
        expect(value).toEqual(space(kw("[top]"), kw("auto"), kw("[stage]"), num(1, "fr"), kw("[bottom]"), kw("auto")));
        expect(value).toEqual(roundTrip("[top] auto [stage] 1fr [bottom] auto"));
    });

    it("reads `[a]1fr[b]`, adjacent blocks, a block against a string, and inside repeat()", () => {
        expect(roundTrip("[a]1fr[b]")).toEqual(space(kw("[a]"), num(1, "fr"), kw("[b]")));
        expect(roundTrip("[a][b c]")).toEqual(space(kw("[a]"), kw("[b c]")));
        expect(roundTrip('[a]"x" 10px[b]')).toEqual(space(kw("[a]"), kw('"x"'), num(10, "px"), kw("[b]")));
        expect(roundTrip("repeat(2,[a]1fr)")).toEqual(call("repeat", num(2), space(kw("[a]"), num(1, "fr"))));
        expect(roundTrip("minmax(0,1fr)[end]")).toEqual(space(call("minmax", num(0), num(1, "fr")), kw("[end]")));
    });

    it("keeps a `[]` block that is not identifiers alone refused, juxtaposed or not", () => {
        for (const source of ["a[1px]", "[a](b)", "1fr[a,b]", "[a][[b]]", "[a]/", "[a]1fr[b"]) {
            expect(parseCssValue(source).ok, source).toBe(false);
        }
    });

    it("parses the keyframes-js-index declaration inside a sheet", () => {
        const sheet = parseStylesheet(".a { grid-template-rows:[top]auto[stage]1fr[bottom]auto; }");
        expect(sheet.ok).toBe(true);
    });
});

describe("2 · identifiers with non-ASCII code points and escapes (css-syntax-3 §4.2, §4.3.7)", () => {
    it("reads the WPT grid-area-valid identifiers as keywords, spelled as authored", () => {
        expect(roundTrip("-zπ")).toEqual(kw("-zπ"));
        expect(roundTrip("-zπ/-zπ")).toEqual(slash(kw("-zπ"), kw("-zπ")));
        expect(roundTrip("1 -πA")).toEqual(space(num(1), kw("-πA")));
        expect(roundTrip("π_ +5")).toEqual(space(kw("π_"), num(5)));
        expect(roundTrip("[π] 1fr")).toEqual(space(kw("[π]"), num(1, "fr")));
    });

    it("reads a hex escape with and without the one whitespace it consumes", () => {
        expect(roundTrip("\\31st")).toEqual(kw("\\31st"));
        expect(roundTrip("\\31 st")).toEqual(kw("\\31 st"));
        expect(roundTrip("\\31st / \\31 st")).toEqual(slash(kw("\\31st"), kw("\\31 st")));
        expect(roundTrip("a\\.b")).toEqual(kw("a\\.b"));
    });

    it("matches a named colour ASCII case-insensitively only (css-values-4 §4.1)", () => {
        //  `K` is U+212A KELVIN SIGN, which Unicode lowercases to `k`: the identifier is a keyword, not black.
        expect(roundTrip("blac\u212A")).toEqual(kw("blac\u212A"));
        expect(roundTrip("BLACK")).not.toEqual(kw("BLACK"));
    });

    it("keeps a dangling backslash refused", () => {
        for (const source of ["foo\\", "\\"]) expect(parseCssValue(source).ok, source).toBe(false);
    });
});
