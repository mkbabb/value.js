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
import { convertColor, lab } from "@mkbabb/value.js/color";
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

/**
 * X.W11.h9 · O23-225 (DISPOSITION §8 E9) — an hsl/hwb row whose channels its CSS
 * function cannot carry is spelled in the `channels` form, with the mark kept.
 *
 * css-color-4 §7/§8 clamp hsl's s l and hwb's w b to [0, 1] at parsed-value time,
 * so `hsl(346deg -1295% 103.7%)` reads back as `hsl(346deg 0% 100%)`: printed
 * honestly, recovered falsely. The same move V8C-01 made for rgb → color(srgb …).
 */
describe("O23-225 — hsl/hwb beyond the §7 parse clamp print as channels", () => {
    const made = lab(92, 88.8, 20, 0.827);
    if (!made.ok) throw new Error("fixture colour failed to construct");

    for (const space of ["hsl", "hwb"] as const) {
        const specimen = formatSpecimen(made.value, space);

        it(`${space}: channels form, marked, alpha kept, within budget`, () => {
            expect(specimen.form).toBe("channels");
            expect(specimen.outOfGamut).toBe(true);
            expect(specimen.text.startsWith(`${space} · `)).toBe(true);
            expect(specimen.text.endsWith(" / 82.7%")).toBe(true);
            expect(specimen.text.length).toBeLessThanOrEqual(SPECIMEN_CHAR_BUDGET);
        });

        it(`${space}: the printed numbers are the unclamped truth, on the % scale`, () => {
            const truth = convertColor(made.value, space);
            if (!truth.ok) throw new Error(`fixture unconvertible to ${space}`);
            const printed = specimen.text
                .slice(`${space} · `.length)
                .split(" / ")[0]!
                .split(" · ")
                .map(Number);
            truth.value.channels.forEach((channel, index) => {
                if (typeof channel !== "number") return;
                const scaled = index === 0 ? channel : channel * 100;
                const tolerance = Math.max(5e-5, 5e-4 * Math.abs(scaled)) * 1.001;
                expect(Math.abs(printed[index]! - scaled)).toBeLessThanOrEqual(tolerance);
            });
            // …and at least one of them is one the CSS function would have clamped.
            expect(printed.slice(1).some((value) => value < 0 || value > 100)).toBe(true);
        });
    }

    it("an in-range hsl row stays CSS and round-trips the parser", () => {
        const inRange = lab(50, 10, 10, 1);
        if (!inRange.ok) throw new Error("fixture colour failed to construct");
        const specimen = formatSpecimen(inRange.value, "hsl");
        expect(specimen.form).toBe("css");
        expect(specimen.outOfGamut).toBe(false);
        expect(parseCssColor(specimen.text).ok).toBe(true);
    });
});
