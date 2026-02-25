import { describe, expect, it } from "vitest";
import { parseCSSColor } from "../src/parsing/color";
import { Color, RGBColor, HSLColor, OKLCHColor } from "../src/units/color";

function getColor(input: string): Color {
    const unit = parseCSSColor(input);
    return unit.value as unknown as Color;
}

describe("Relative Color Syntax", () => {
    describe("identity (pass-through)", () => {
        it("rgb(from green r g b) should be green", () => {
            const color = getColor("rgb(from green r g b)") as RGBColor;
            expect(color.colorSpace).toBe("rgb");
            // green = #008000 = rgb(0, 128, 0) → normalized ≈ (0, 0.502, 0)
            expect(color.r).toBeCloseTo(0, 1);
            expect(color.g).toBeCloseTo(0.502, 1);
            expect(color.b).toBeCloseTo(0, 1);
        });

        it("hsl(from red h s l) should be red", () => {
            const color = getColor("hsl(from red h s l)") as HSLColor;
            expect(color.colorSpace).toBe("hsl");
            // red = hsl(0, 1, 0.5)
            expect(color.h).toBeCloseTo(0, 1);
            expect(color.s).toBeCloseTo(1, 1);
            expect(color.l).toBeCloseTo(0.5, 1);
        });
    });

    describe("calc expressions", () => {
        it("oklch(from red l calc(c * 0.5) h) should halve chroma", () => {
            const original = getColor("oklch(from red l c h)") as OKLCHColor;
            const modified = getColor("oklch(from red l calc(c * 0.5) h)") as OKLCHColor;

            expect(modified.l).toBeCloseTo(original.l, 3);
            expect(modified.c).toBeCloseTo(original.c * 0.5, 2);
            expect(modified.h).toBeCloseTo(original.h, 3);
        });
    });

    describe("literal values", () => {
        it("rgb(from green 0.5 g b) should override red channel", () => {
            const color = getColor("rgb(from green 0.5 g b)") as RGBColor;
            expect(color.r).toBeCloseTo(0.5, 3);
            // g from green ≈ 0.502
            expect(color.g).toBeCloseTo(0.502, 1);
            expect(color.b).toBeCloseTo(0, 1);
        });
    });

    describe("nested relative colors", () => {
        it("rgb(from hsl(from red h s l) r g b) should roundtrip", () => {
            const color = getColor("rgb(from hsl(from red h s l) r g b)") as RGBColor;
            expect(color.colorSpace).toBe("rgb");
            // Should be close to red: (1, 0, 0)
            expect(color.r).toBeCloseTo(1, 1);
            expect(color.g).toBeCloseTo(0, 1);
            expect(color.b).toBeCloseTo(0, 1);
        });
    });

    describe("alpha handling", () => {
        it("should preserve alpha from origin", () => {
            const color = getColor("rgb(from rgb(255 0 0 / 0.5) r g b)") as RGBColor;
            expect(color.alpha).toBeCloseTo(0.5, 2);
        });

        it("should override alpha with explicit value", () => {
            const color = getColor("rgb(from red r g b / 0.3)") as RGBColor;
            expect(color.alpha).toBeCloseTo(0.3, 2);
        });
    });

    describe("none in relative color", () => {
        it("should support none as a component", () => {
            const color = getColor("hsl(from red none s l)") as HSLColor;
            expect(Number.isNaN(color.h as number)).toBe(true);
        });
    });
});
