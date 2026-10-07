// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.t` (W8.md §Scope 1 css-color-5) — the css-color-5 colour functions a value list reads as calls,
// checked against their signatures (`value.bbnf` `mixCall`; `src/css/bbnf/color5.ts`), and an sRGB colour
// outside rgb()'s range serialized so it round-trips (`src/css/serialize.ts`). Each accepted form
// round-trips: serializing the value and parsing that text again gives the same value; each refused form is
// refused whatever property it stands in. The refused inputs are the vendored WPT css-color cases.
//   1. `color-mix( <color-interpolation-method>? , [ <color> && <percentage [0,100]>? ]# )` (css-color-5 §3).
//   2. `alpha( from <color> / <alpha-value> | none | alpha )` (css-color-5 #relative-alpha).
//   3. `contrast-color( <color> )` (css-color-5 #contrast-color).
//   4. `color(srgb …)` outside [0, 1] (css-color-4 §10, never clamped) is not spelled as an rgb(), which
//      clamps when parsed (css-color-4 §5.1).

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

describe("X.P.W8 .t — color-mix() in a value list", () => {
    it("reads a method, items with a percentage on either side, and keeps the call", () => {
        expect(roundTrip("color-mix(in srgb, red, blue)").text).toBe("color-mix(in srgb, rgb(255 0 0), rgb(0 0 255))");
        expect(roundTrip("color-mix(in oklch longer hue, red 30%, blue)").text).toBe("color-mix(in oklch longer hue, rgb(255 0 0) 30%, rgb(0 0 255))");
        //  The method's keywords stay as authored, as a generic call keeps them (the L-G2 oracle's case row).
        expect(roundTrip("COLOR-MIX(IN OKLCH LONGER HUE, RED, BLUE)").text).toBe("COLOR-MIX(IN OKLCH LONGER HUE, rgb(255 0 0), rgb(0 0 255))");
        roundTrip("color-mix(in srgb, 30% red, calc(20%) blue)");
        roundTrip("color-mix(in lab, currentcolor 0%, canvastext 100%)");
        roundTrip("color-mix(contrast-color(blue) 100%, purple 0%)");
        roundTrip("color-mix(in srgb, light-dark(red, blue), color-mix(in oklab, red, blue))");
        roundTrip("a color-mix(in hsl, red, blue) b");
    });
    it("is not checked when it holds an arbitrary substitution function (css-variables-1 §3)", () => {
        roundTrip("color-mix(in srgb, var(--a) 20%, currentcolor)");
        roundTrip("color-mix(var(--method), red, blue)");
        roundTrip("color-mix(in srgb, var(--a) var(--b))");
    });
    it("refuses what css-color-5 §3 refuses (the vendored WPT invalid cases)", () => {
        for (const s of [
            "color-mix(in hsl, hsl(120deg 10% 20%) -10%, hsl(30deg 30% 40%))",
            "color-mix(in lch, lch(10% 20 30deg / .4) 150%, lch(50% 60 70deg / .8))",
            "color-mix(in lch, lch(10% 20 30deg) lch(50% 60 70deg))",
            "color-mix(in oklab oklab(10% 20 30), oklab(50% 60 70))",
            "color-mix(hwb(120deg 10% 20%), hwb(30deg 30% 40%), in hwb)",
            "color-mix(in srgb-linear longer hue, color(srgb-linear .1 .2 .3), color(srgb-linear .5 .6 .7))",
            "color-mix(in hwb hue, hwb(120deg 10% 20%), hwb(30deg 30% 40%))",
            "color-mix(in hsl shorter, red, blue)",
            "color-mix(in hsl foo, red, blue)",
            "color-mix(in srgb, red, blue blue)",
            "color-mix(in srgb, red 150%, green 50%, blue)",
            "color-mix(in srgb, foo, blue)",
            "color-mix(in srgb, 5 red, blue)",
        ]) refused(s);
    });
});

describe("X.P.W8 .t — alpha()", () => {
    it("reads from <color> / <alpha-value>, none or alpha", () => {
        for (const s of [
            "alpha(from red / 0.5)", "alpha(from red / 50%)", "alpha(from red / none)", "alpha(from red / -1)",
            "alpha(from currentcolor / alpha)", "alpha(from currentcolor / calc(alpha * 0.5))",
            "alpha(from currentcolor / calc(alpha + 0.1))", "alpha(from alpha(from currentcolor / 0.5) / 1)",
            "alpha(from color-mix(in srgb, red, blue) / 0.5)", "alpha(from ActiveText / 0.5)",
            "alpha(from green / sibling-index())", "alpha(from green / calc(sibling-index() * 0.2))",
            "alpha(from red / var(--alpha))", "alpha(var(--x))",
        ]) roundTrip(s);
        expect(roundTrip("alpha(from red / 0.5)").text).toBe("alpha(from rgb(255 0 0) / 0.5)");
    });
    it("refuses what css-color-5 refuses (the vendored WPT invalid cases)", () => {
        for (const s of [
            "alpha(red / 0.5)", "alpha(from / 0.5)", "alpha(from)", "alpha(from red)", "alpha(from currentcolor)",
            "alpha(from rgba(255, 0, 0, 0.3))", "alpha(from alpha(from currentcolor / 0.5))",
            "alpha(from alpha(from currentcolor) / 0.5)", "alpha(from red / 0.5 0.5)", "alpha(from red 0.5)",
            "alpha(from red r g b / 0.5)", "alpha(from 42 / 0.5)", "alpha(from none / 0.5)",
            "alpha(from red / 0.5 / 0.5)", "alpha(from red / alpha alpha)", "alpha(from red, blue)",
            "alpha(from red / r)", "alpha(from red / l)", "alpha(from red / red)", "alpha(from red / calc(r * 0.5))",
        ]) refused(s);
    });
});

describe("X.P.W8 .t — contrast-color()", () => {
    it("reads one colour", () => {
        expect(roundTrip("contrast-color(white)").text).toBe("contrast-color(rgb(255 255 255))");
        for (const s of ["contrast-color(currentcolor)", "contrast-color(contrast-color(pink))", "contrast-color(buttonface)",
            "contrast-color(color-mix(blue, green))", "contrast-color(var(--c))"]) roundTrip(s);
    });
    it("refuses what css-color-5 refuses (the vendored WPT invalid cases)", () => {
        for (const s of ["contrast-color()", "contrast-color(1)", "contrast-color(max)", "contrast-color(max max)",
            "contrast-color(max white)", "contrast-color(white white)", "contrast-color(white max)",
            "contrast-color(white min)", "contrast-color(white max bar)"]) refused(s);
    });
});

describe("X.P.W8 .t — an sRGB colour outside rgb()'s range round-trips", () => {
    it("spells it color(srgb …), and an in-range one rgb()", () => {
        expect(roundTrip("color(srgb 20% 0 10/0.5)").text).toBe("color(srgb 0.2 0 10 / 50%)");
        expect(roundTrip("color(srgb 50% -200 200)").text).toBe("color(srgb 0.5 -200 200)");
        expect(roundTrip("contrast-color(color(srgb -10 -10 -10))").text).toBe("contrast-color(color(srgb -10 -10 -10))");
        expect(roundTrip("color(srgb 0.2 0 0.5)").text).toBe("rgb(51 0 127.5)");
        expect(roundTrip("rgb(300 0 0)").text).toBe("rgb(255 0 0)");
    });
});
