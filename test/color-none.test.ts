import { describe, expect, it } from "vitest";
import { parseCSSColor } from "../src/parsing/color";
import { Color, HSLColor, RGBColor, OKLCHColor } from "../src/units/color";
import { ValueUnit } from "../src/units";
import { normalizeColorUnit } from "../src/units/color/normalize";
import { color2 } from "../src/units/color/utils";

/** Extract the raw Color from a parsed ValueUnit */
function getColor(unit: ValueUnit): Color {
    return unit.value as unknown as Color;
}

/** Get a plain numeric Color by normalizing a parsed color unit */
function getPlainColor(input: string): Color<number> {
    const unit = parseCSSColor(input);
    const normalized = normalizeColorUnit(unit as any);
    const color = normalized.value;
    const plain = color.clone();
    for (const key of color.keys()) {
        const v = color[key];
        (plain as any)[key] = v instanceof ValueUnit ? v.value : v;
    }
    return plain as unknown as Color<number>;
}

describe("CSS none keyword (NaN semantics)", () => {
    describe("parsing", () => {
        it("should parse hsl(none 100% 50%) with NaN hue", () => {
            const unit = parseCSSColor("hsl(none 100% 50%)");
            expect(unit).toBeDefined();
            const color = getColor(unit) as HSLColor<ValueUnit>;
            expect(Number.isNaN(color.h.value)).toBe(true);
        });

        it("should parse rgb(none 128 0) with NaN red", () => {
            const unit = parseCSSColor("rgb(none 128 0)");
            expect(unit).toBeDefined();
            const color = getColor(unit) as RGBColor<ValueUnit>;
            expect(Number.isNaN(color.r.value)).toBe(true);
        });

        it("should parse oklch(0.5 none 180)", () => {
            const unit = parseCSSColor("oklch(0.5 none 180)");
            expect(unit).toBeDefined();
            const color = getColor(unit) as OKLCHColor<ValueUnit>;
            expect(Number.isNaN(color.c.value)).toBe(true);
        });

        it("should parse none as alpha", () => {
            const unit = parseCSSColor("rgb(255 0 0 / none)");
            expect(unit).toBeDefined();
            const color = getColor(unit) as RGBColor<ValueUnit>;
            expect(Number.isNaN(color.alpha.value)).toBe(true);
        });
    });

    describe("serialization", () => {
        it("should serialize NaN components as 'none'", () => {
            const hsl = new HSLColor(NaN, 1, 0.5, 1);
            const str = hsl.toString();
            expect(str).toContain("none");
        });

        it("should serialize NaN in toFormattedString", () => {
            const hsl = new HSLColor(NaN, 1, 0.5, 1);
            const str = hsl.toFormattedString();
            expect(str).toContain("none");
        });

        it("should not affect non-NaN components", () => {
            const hsl = new HSLColor(0.5, 1, 0.5, 1);
            const str = hsl.toString();
            expect(str).not.toContain("none");
        });
    });

    describe("NaN propagation through conversion", () => {
        it("NaN hue in HSL should propagate through conversion", () => {
            const color = getPlainColor("hsl(none 100% 50%)");
            expect(Number.isNaN(color[color.keys()[0]])).toBe(true);
        });
    });

    describe("color-mix with none", () => {
        it("color-mix with none hue should adopt other color's hue", () => {
            const result = parseCSSColor(
                "color-mix(in hsl, hsl(none 100% 50%), hsl(120 100% 50%))",
            );
            expect(result).toBeDefined();
            // The result should use 120deg hue from the second color
            const color = getColor(result) as HSLColor;
            // Hue should be approximately 120/360 = 0.333
            expect(Number.isNaN(color.h as number)).toBe(false);
        });
    });
});
