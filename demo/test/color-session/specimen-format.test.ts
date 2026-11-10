/**
 * The specimen line (the space menu's per-row caption) — owner order
 * 2026-11-09 ("too many digits of signif"; restraint: no number a reader
 * cannot use).
 *
 * The seed is the adjudicated out-of-gamut colour `lab(92% 88.8 20 / 82.7%)`:
 * it leaves sRGB, so the rgb, hsl and hwb rows used to print `color(srgb …)`,
 * `hsl · 340 · 103.2 · 71.88` and a negative blackness. Each now prints the
 * colour as its space can hold it, in that space's own CSS, through the one
 * digit policy, and carries the out-of-gamut mark.
 */
import { describe, expect, it } from "vitest";
import { lab } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import {
    SPECIMEN_CHAR_BUDGET,
    formatSpecimen,
} from "../../color-session/specimen-format";
import { PICKER_CHANNELS } from "../../color-session/picker-color";
import type { DisplayColorSpace } from "../../color-session/color-model";

const made = lab(92, 88.8, 20, 0.827);
if (!made.ok) throw new Error("fixture colour failed to construct");
const seed = made.value;

const SPACES = [...Object.keys(PICKER_CHANNELS), "hex"] as DisplayColorSpace[];

describe("the specimen line, every space, the out-of-gamut seed", () => {
    for (const space of SPACES) {
        const specimen = formatSpecimen(seed, space);
        const numerals = specimen.text.match(/-?\d+(?:\.\d+)?/g) ?? [];

        it(`${space}: within the caption budget, no numeral at four or more decimals`, () => {
            expect(specimen.text.length).toBeLessThanOrEqual(SPECIMEN_CHAR_BUDGET);
            for (const numeral of numerals) {
                expect(numeral.split(".")[1]?.length ?? 0, specimen.text).toBeLessThan(4);
            }
            expect(specimen.text).not.toMatch(/outside/i);
        });

        if (specimen.form === "css") {
            it(`${space}: the CSS row round-trips the parser`, () => {
                expect(parseCssColor(specimen.text).ok, specimen.text).toBe(true);
            });
        }
    }

    for (const space of ["rgb", "hsl", "hwb"] as const) {
        it(`${space}: marked, spelled in its own CSS, clipped into its domain`, () => {
            const specimen = formatSpecimen(seed, space);
            expect(specimen.outOfGamut).toBe(true);
            expect(specimen.form).toBe("css");
            expect(specimen.text.startsWith(`${space}(`), specimen.text).toBe(true);
            expect(specimen.text.endsWith("/ 83%)"), specimen.text).toBe(true);
            // no negative channel, no percent past 100
            expect(specimen.text).not.toMatch(/(?:^|\s)-\d/);
            for (const pct of specimen.text.match(/[\d.]+(?=%)/g) ?? []) {
                expect(Number(pct)).toBeLessThanOrEqual(100);
            }
        });
    }

    it("an in-range hsl row stays CSS, unmarked", () => {
        const inRange = lab(50, 10, 10, 1);
        if (!inRange.ok) throw new Error("fixture colour failed to construct");
        const specimen = formatSpecimen(inRange.value, "hsl");
        expect(specimen.form).toBe("css");
        expect(specimen.outOfGamut).toBe(false);
        expect(parseCssColor(specimen.text).ok).toBe(true);
    });
});
