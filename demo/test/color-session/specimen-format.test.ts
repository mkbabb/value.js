/**
 * X-DS pass 8 · V8C-01 — the digit policy holds in the serialized domain.
 *
 * An sRGB colour outside rgb()'s 0..255 range serializes as `color(srgb …)` on
 * the 0..1 scale. The policy used to run on the 0..255 scale before that
 * division, so the picker's default Lab printed
 * `color(srgb 1.510980392157 0.562352941176 0.782745098039 / 82.7%)` — 66
 * characters into a 52-character box, cut before its alpha.
 */
import { describe, expect, it } from "vitest";
import { lab } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    SPECIMEN_CHAR_BUDGET,
    formatSpecimen,
} from "../../color-session/specimen-format";

describe("V8C-01 — an out-of-sRGB rgb specimen keeps the digit policy", () => {
    const made = lab(92, 88.8, 20, 0.827);
    if (!made.ok) throw new Error("fixture colour failed to construct");
    const specimen = formatSpecimen(made.value, "rgb");

    it("fits the caption budget and keeps its alpha", () => {
        expect(specimen.text.length).toBeLessThanOrEqual(SPECIMEN_CHAR_BUDGET);
        expect(specimen.text.startsWith("color(srgb ")).toBe(true);
        expect(specimen.text.endsWith("/ 82.7%)")).toBe(true);
        expect(specimen.outOfGamut).toBe(true);
    });

    it("prints four significant digits per channel and round-trips the parser", () => {
        const numerals = specimen.text.slice("color(srgb ".length).split(" / ")[0]!.split(" ");
        for (const numeral of numerals) {
            expect(numeral.replace(/^-?0?\.?0*/, "").replace(".", "").length).toBeLessThanOrEqual(4);
        }
        expect(parseCssColor(specimen.text).ok).toBe(true);
    });
});
