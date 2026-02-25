import { describe, expect, it } from "vitest";
import { parseCSSColor } from "../src/parsing/color";
import { Color, RGBColor, OKLABColor } from "../src/units/color";
import { ValueUnit } from "../src/units";
import { mixColors } from "../src/units/color/utils";

/** Extract plain numeric Color from a ValueUnit<Color> */
function getColor(input: string): Color<number> {
    const unit = parseCSSColor(input);
    return unit.value as unknown as Color<number>;
}

function getColorFromUnit(unit: ValueUnit): Color {
    return unit.value as unknown as Color;
}

describe("color-mix()", () => {
    describe("parsing", () => {
        it("should parse basic color-mix with named colors", () => {
            const result = parseCSSColor("color-mix(in oklab, red, blue)");
            expect(result).toBeDefined();
            expect(result.unit).toBe("color");
        });

        it("should parse color-mix with explicit percentages", () => {
            const result = parseCSSColor("color-mix(in oklab, red 25%, blue 75%)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with one percentage", () => {
            const result = parseCSSColor("color-mix(in oklch, red 30%, blue)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with hue method", () => {
            const result = parseCSSColor("color-mix(in oklch longer hue, red, blue)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with srgb space", () => {
            const result = parseCSSColor("color-mix(in srgb, red, blue)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with hsl space", () => {
            const result = parseCSSColor("color-mix(in hsl, red, blue)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with hex colors", () => {
            const result = parseCSSColor("color-mix(in oklab, #ff0000, #0000ff)");
            expect(result).toBeDefined();
        });

        it("should parse color-mix with functional colors", () => {
            const result = parseCSSColor("color-mix(in oklab, rgb(255 0 0), hsl(240 100% 50%))");
            expect(result).toBeDefined();
        });
    });

    describe("midpoint mixing (50/50)", () => {
        it("mixing red and blue in srgb should give purple-ish", () => {
            const result = parseCSSColor("color-mix(in srgb, red, blue)");
            const color = getColorFromUnit(result);
            // In sRGB, mixing red(1,0,0) and blue(0,0,1) at 50% gives (0.5, 0, 0.5)
            expect(color.colorSpace).toBe("rgb");
            const rgb = color as RGBColor;
            expect(rgb.r).toBeCloseTo(0.5, 1);
            expect(rgb.g).toBeCloseTo(0, 1);
            expect(rgb.b).toBeCloseTo(0.5, 1);
        });

        it("mixing identical colors returns the same color", () => {
            const result = parseCSSColor("color-mix(in srgb, red, red)");
            const color = getColorFromUnit(result) as RGBColor;
            expect(color.r).toBeCloseTo(1, 2);
            expect(color.g).toBeCloseTo(0, 2);
            expect(color.b).toBeCloseTo(0, 2);
        });
    });

    describe("asymmetric percentages", () => {
        it("25%/75% should weight toward second color", () => {
            const result = parseCSSColor("color-mix(in srgb, red 25%, blue 75%)");
            const color = getColorFromUnit(result) as RGBColor;
            // 25% red, 75% blue → r≈0.25, b≈0.75
            expect(color.r).toBeCloseTo(0.25, 1);
            expect(color.b).toBeCloseTo(0.75, 1);
        });

        it("one percentage omitted should be complement", () => {
            const result = parseCSSColor("color-mix(in srgb, red 30%, blue)");
            const color = getColorFromUnit(result) as RGBColor;
            // 30% red, 70% blue
            expect(color.r).toBeCloseTo(0.3, 1);
            expect(color.b).toBeCloseTo(0.7, 1);
        });
    });

    describe("alpha handling", () => {
        it("mixing opaque with transparent", () => {
            const result = parseCSSColor(
                "color-mix(in srgb, rgb(255 0 0 / 1), rgb(0 0 255 / 0))",
            );
            const color = getColorFromUnit(result) as RGBColor;
            // Alpha should be 0.5 (midpoint between 1 and 0)
            expect(color.alpha).toBeCloseTo(0.5, 1);
        });
    });

    describe("different interpolation spaces", () => {
        it("oklab space should produce perceptually uniform mix", () => {
            const result = parseCSSColor("color-mix(in oklab, red, blue)");
            expect(result).toBeDefined();
            // Just verify it parses and produces a color
            const color = getColorFromUnit(result);
            expect(color.colorSpace).toBe("oklab");
        });

        it("oklch space with hue interpolation", () => {
            const result = parseCSSColor("color-mix(in oklch, red, blue)");
            expect(result).toBeDefined();
        });
    });
});
