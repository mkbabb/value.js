// SERVED MODEL: claude-opus-5-5
//
// X.P.W10 `.r10` (XP-14; COHESION §0hv DR-c): a relative colour (css-color-5 §4) whose origin is absolute
// resolves at parse in `parseCssColor` — the origin converts to the function's space, its channels and
// `alpha` bind the channel keywords, and each component (a literal, `none`, a keyword or a calculation
// over them) reads as the function reads it. A context origin keeps `color_context_required` (R-c-2).
// `parseCssValue` keeps the specified form, a call, checked as a colour.

import { describe, expect, it } from "vitest";

import { parseCssColor, parseCssValue, serializeCssColor, serializeCssValue } from "../../src/css/index";

const color = (source: string) => {
    const parsed = parseCssColor(source);
    if (!parsed.ok) throw new Error(`refused: ${source} ${parsed.diagnostics[0]?.code}`);
    const text = serializeCssColor(parsed.value);
    if (!text.ok) throw new Error(`unserializable: ${source}`);
    return text.value;
};

describe("relative colour, absolute origin: resolved by parseCssColor (css-color-5 §4)", () => {
    it.each([
        ["rgb(from rebeccapurple r g b)", "rgb(102 51 153)"],
        ["hsl(from rebeccapurple h s l)", "hsl(270deg 50% 40%)"],
        ["rgb(from rebeccapurple calc(r / 2) g b / calc(alpha / 2))", "rgb(51 51 153 / 50%)"],
        ["lab(from lab(50 5 10 / 0.8) calc(l + 1) calc(a + 1) calc(b + 1) / calc(alpha + 0.01))", "lab(51% 6 11 / 81%)"],
        ["color(from color(xyz-d50 7 -20.5 100 / 40%) xyz-d50 x 0 z / alpha)", "color(xyz-d50 7 0 100 / 40%)"],
        ["color(from color(srgb 0.7 0.5 0.3 / 40%) srgb 0.2 g b / alpha)", "rgb(51 127.5 76.5 / 40%)"],
        ["hwb(from rebeccapurple none none none / none)", "hwb(none none none / none)"],
        ["rgb(from rgb(20% 40% 60% / 80%) r g b)", "rgb(51 102 153 / 80%)"],
    ])("%j → %j", (source, expected) => expect(color(source)).toBe(expected));

    it("oklch(from red l c h) is red in oklch", () => {
        const parsed = parseCssColor("oklch(from red l c h)");
        expect(parsed.ok && parsed.value.space).toBe("oklch");
    });

    it.each(["rgb(from currentcolor r g b)", "rgb(from var(--c) r g b)", "rgb(from light-dark(red, blue) r g b)"])(
        "%j keeps color_context_required",
        (source) => expect(parseCssColor(source)).toMatchObject({ ok: false, diagnostics: [{ code: "color_context_required" }] }),
    );

    it.each(["rgb(from rebeccapurple r g b b)", "rgb(from rebeccapurple x g b)", "rgb(from rebeccapurple l c h)", "hsl(from rebeccapurple h s)"])(
        "%j is refused",
        (source) => expect(parseCssColor(source)).toMatchObject({ ok: false, diagnostics: [{ code: "css_syntax" }] }),
    );
});

describe("relative colour in a value list: the specified form", () => {
    it.each([
        ["rgb(from rebeccapurple r g b)", "rgb(from rgb(102 51 153) r g b)"],
        ["rgb(from currentcolor r g b)", "rgb(from currentcolor r g b)"],
        ["oklch(from red calc(l * 0.5) c h / alpha)", "oklch(from rgb(255 0 0) calc(l * 0.5) c h / alpha)"],
    ])("%j → %j", (source, expected) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok && serializeCssValue(parsed.value)).toMatchObject({ ok: true, value: expected });
    });

    it.each(["rgb(from rebeccapurple r g b b)", "rgb(from rebeccapurple x g b)"])("%j is refused", (source) =>
        expect(parseCssValue(source).ok).toBe(false));
});
