// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.f` (W8.md §Scope 1 css-fonts-4, §Scope 3 miss 4) — the css-fonts-4 values a value list reads:
// a css-syntax-3 §7.1 `<urange>` (`unicode-range`) as `value.bbnf` `identTerm`'s first alternative, kept
// as authored, its range checked by its action (`src/css/bbnf/value.ts` `urangeValue`); and
// `palette-mix()` checked against its signature over the call the grammar built
// (`src/css/bbnf/palette.ts`). Each accepted form round-trips: serializing the value and parsing that
// text again gives the same value; each refused form is refused whatever property it stands in. The
// palette-mix() cases are the vendored WPT css-fonts cases (`test/css/wpt-values/cases-2026-10-07.json`).

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { parseCssValue } from "../../src/css/bbnf/index";
import { serializeCssValue } from "../../src/css/serialize";
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
    expect(again.ok && again.value, `${source} → ${text.value} re-parses to the same value`).toEqual(first.value);
    return { value: first.value, text: text.value };
}
const refused = (source: string) => expect(parseCssValue(source).ok, `${source} is refused`).toBe(false);

type Case = { file: string; kind: string; property: string; input: string };
const corpus = (JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")) as { cases: Case[] }).cases;
const palettes = (kind: string) =>
    corpus.filter((c) => /\/palette-mix-/.test(c.file) && c.kind === kind).map((c) => c.input);

describe("X.P.W8 .f — css-syntax-3 §7.1 <urange> (css-fonts-4 unicode-range)", () => {
    it("reads a range, a single code point and a wildcard, kept as authored (named miss 4)", () => {
        expect(roundTrip("U+0025-00FF").text).toBe("U+0025-00FF");
        expect(roundTrip("u+0025-00ff").text).toBe("u+0025-00ff");
        expect(roundTrip("U+26").text).toBe("U+26");
        expect(roundTrip("U+4??").text).toBe("U+4??");
        expect(roundTrip("U+?").text).toBe("U+?");
        expect(roundTrip("U+0-10FFFF").text).toBe("U+0-10FFFF");
        expect(roundTrip("U+10????").text).toBe("U+10????");
        expect(roundTrip("U+0-7F, U+0590-05FF, U+4??").text).toBe("U+0-7F, U+0590-05FF, U+4??");
    });
    it("is a keyword whose text is the token", () => {
        expect(roundTrip("U+0025-00FF").value).toEqual({ kind: "scalar", payload: { type: "keyword", value: "U+0025-00FF" } });
    });
    it("refuses malformed ranges", () => {
        for (const bad of ["U+", "U+1234567", "U+???????", "U+4?5", "U+4?-5", "U+12-", "U+-12", "U+12g", "U+1-1234567", "U+0025-00FF-", "U+0025--00FF"]) refused(bad);
    });
    it("refuses a start above the end and an end above U+10FFFF (css-syntax-3 §7.1)", () => {
        for (const bad of ["U+00FF-0025", "U+110000", "U+0-110000", "U+??????", "U+11????"]) refused(bad);
    });
    it("leaves identifiers that begin with u alone", () => {
        expect(roundTrip("u").text).toBe("u");
        expect(roundTrip("unset").text).toBe("unset");
        expect(roundTrip("\\+a").text).toBe("\\+a");
    });
});

describe("X.P.W8 .f — css-fonts-4 palette-mix()", () => {
    it("accepts and round-trips every valid WPT palette-mix() case", () => {
        const valid = palettes("valid");
        expect(valid.length).toBeGreaterThan(50);
        for (const source of valid) roundTrip(source);
    });
    it("refuses every invalid WPT palette-mix() case", () => {
        const invalid = palettes("invalid");
        expect(invalid.length).toBeGreaterThan(10);
        for (const source of invalid) refused(source);
    });
    it("checks the method, the items and their percentages", () => {
        roundTrip("palette-mix(in oklab, --brand 25%, dark)");
        roundTrip("palette-mix(in lch longer hue, light, 30% dark)");
        roundTrip("palette-mix(light calc(50%), dark)");
        roundTrip("palette-mix(var(--m), light, dark)");
        for (const bad of [
            "palette-mix()",
            "palette-mix(in oklab)",
            "palette-mix(in oklab, red 10%, dark)",
            "palette-mix(in oklab, light 10% 20%, dark)",
            "palette-mix(in oklab, light 10px, dark)",
            "palette-mix(in nowhere, light, dark)",
            "palette-mix(light, in oklab, dark)",
        ]) refused(bad);
    });
});
