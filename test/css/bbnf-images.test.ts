// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.i` (W8.md §Scope 1 css-images-4, §Scope 3 miss 3) — the css-images-4 image functions a value
// list reads: `element( <id-selector> )` as a grammar leaf (`value.bbnf` `typeCall`), the gradients,
// `image()` and `image-set()` checked against their signatures over the call the grammar built
// (`src/css/bbnf/image.ts`). Each accepted form round-trips: serializing the value and parsing that text
// again gives the same value; each refused form is refused whatever property it stands in. The gradient
// and image() cases are the vendored WPT css-images cases (`test/css/wpt-values/cases-2026-10-07.json`).

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
const images = (file: RegExp, kind: string) =>
    corpus.filter((c) => file.test(c.file) && c.kind === kind && c.property === "background-image").map((c) => c.input);

describe("X.P.W8 .i — element( <id-selector> )", () => {
    it("reads an id selector and keeps it as authored (named miss 3)", () => {
        expect(roundTrip("element(#a)").text).toBe("element(#a)");
        expect(roundTrip("element( #rail-1 )").text).toBe("element(#rail-1)");
        expect(roundTrip("ELEMENT(#_x)").text).toBe("ELEMENT(#_x)");
        expect(roundTrip("element(#\\31 a)").text).toBe("element(#\\31 a)");
        expect(roundTrip("element(#π)").text).toBe("element(#π)");
        roundTrip("cross-fade(element(#a) 50%, url(b.png))");
        roundTrip("element(#a), linear-gradient(red, blue)");
    });
    it("refuses an argument that is no id selector, and type() an id selector", () => {
        for (const s of ["element(a)", "element(#1a)", "element(#)", "element()", "element(#a, #b)", "element(#a #b)", "element(\"#a\")", "element(<length>)", "type(#a)"]) refused(s);
    });
});

describe("X.P.W8 .i — gradients", () => {
    it("accepts every valid WPT gradient and round-trips it", () => {
        const valid = images(/gradient/, "valid");
        expect(valid.length).toBeGreaterThan(1400);
        for (const s of valid) roundTrip(s);
    });
    it("refuses every invalid WPT gradient", () => {
        const invalid = images(/gradient/, "invalid");
        expect(invalid.length).toBeGreaterThan(300);
        for (const s of invalid) refused(s);
    });
    it("keeps the authored forms real sheets write", () => {
        for (const s of [
            "linear-gradient(to top right, #fff 0%, rgba(0, 0, 0, 0.5) 50% 75%, transparent)",
            "linear-gradient(180deg, currentcolor, 10px, red)",
            "linear-gradient(0, red, blue)",
            "repeating-linear-gradient(45deg, red 0 10px, blue 10px 20px)",
            "radial-gradient(circle farthest-corner at 50% 0, red, blue)",
            "radial-gradient(50% 40px at left 10px top 20%, red, blue)",
            "radial-gradient(100px circle, red, blue)",
            "radial-gradient(closest-side ellipse in oklch longer hue, red, blue)",
            "conic-gradient(from 0.25turn at 10% 20%, red 0 90deg, blue 25% 50%)",
            "conic-gradient(red 0, calc(25% + 10deg), blue)",
            "linear-gradient(in --brand, red, blue)",
            "linear-gradient(var(--dir), red, blue)",
            "linear-gradient(red)",
        ]) roundTrip(s);
    });
    it("refuses a malformed geometry, method or stop list", () => {
        for (const s of [
            "linear-gradient(top, red, blue)", "linear-gradient(to center, red, blue)", "linear-gradient(to left right, red, blue)",
            "linear-gradient(10px, red, blue)", "linear-gradient(red, 10%)", "linear-gradient(10%, red)", "linear-gradient(red, 10%, 20%, blue)",
            "linear-gradient(red 10deg, blue)", "linear-gradient()", "linear-gradient(red, blue, 10% red 20% 30%)",
            "radial-gradient(circle 10px 20px, red, blue)", "radial-gradient(ellipse 10px, red, blue)", "radial-gradient(circle 10%, red, blue)",
            "radial-gradient(circle circle, red, blue)", "radial-gradient(-10px, red, blue)", "radial-gradient(at, red, blue)",
            "conic-gradient(from 10px, red, blue)", "conic-gradient(red 10px, blue)", "conic-gradient(in lab from 0deg in lab, red, blue)",
        ]) refused(s);
    });
});

describe("X.P.W8 .i — image() and image-set()", () => {
    it("accepts image()'s tag, source and colour (css-images-4 §2.5)", () => {
        for (const s of ["image(red)", "image(\"a.png\")", "image(url(a.png), red)", "image(ltr \"a.png\", red)", "image(rtl red)"]) roundTrip(s);
    });
    it("refuses every invalid WPT image() but the lone <image-src> the spec admits", () => {
        const invalid = images(/image-function/, "invalid").filter((s) => s !== "image(url(foo.png))");
        expect(invalid.length).toBe(4);
        for (const s of invalid) refused(s);
        for (const s of ["image()", "image(red, \"a.png\")", "image(ltr)", "image(\"a.png\" red)"]) refused(s);
    });
    it("accepts image-set() options: an image or string, a resolution and a type() (css-images-4 §2.2)", () => {
        for (const s of [
            "image-set(\"a.png\" 1x, \"a-2x.png\" 2x)", "image-set(url(a.png) 1dppx, url(b.png) 192dpi)",
            "image-set(\"a.avif\" type(\"image/avif\"), \"a.png\" 1x type(\"image/png\"))", "image-set(linear-gradient(red, blue) 1x)",
            "image-set(\"a.png\")",
        ]) roundTrip(s);
    });
    it("refuses an option that is no image, or a second resolution or type()", () => {
        for (const s of ["image-set()", "image-set(red 1x)", "image-set(\"a.png\" 1x 2x)", "image-set(\"a.png\" 10px)",
            "image-set(\"a.png\" type(\"image/png\") type(\"image/avif\"))", "image-set(\"a.png\" -1x)"]) refused(s);
    });
});
