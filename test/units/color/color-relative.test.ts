import { describe, expect, it } from "vitest";
import { parseCSSColor } from "@src/parsing/color";
import { Color, RGBColor, HSLColor, OKLCHColor } from "@src/units/color";

function getColor(input: string): Color {
    const unit = parseCSSColor(input);
    return unit.value as unknown as Color;
}

describe("Relative Color Syntax", () => {
    describe("identity (pass-through)", () => {
        it("rgb(from green r g b) should be green", () => {
            const color = getColor("rgb(from green r g b)") as RGBColor;
            expect(color.colorSpace).toBe("rgb");
            // U-F30: parser colors are PHYSICAL (matching direct-parse), so the
            // relative-color result carries green's physical channels
            // green = #008000 = rgb(0, 128, 0).
            expect(Number(color.r)).toBeCloseTo(0, 1);
            expect(Number(color.g)).toBeCloseTo(128, 0);
            expect(Number(color.b)).toBeCloseTo(0, 1);
        });

        it("hsl(from red h s l) should be red", () => {
            const color = getColor("hsl(from red h s l)") as HSLColor;
            expect(color.colorSpace).toBe("hsl");
            // U-F30: physical hsl channels — red = hsl(0 100% 50%).
            expect(Number(color.h)).toBeCloseTo(0, 1);
            expect(Number(color.s)).toBeCloseTo(100, 0);
            expect(Number(color.l)).toBeCloseTo(50, 0);
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
            // U-F30: physical channels — the literal 0.5 is the CSS r value, g
            // is green's physical g = 128.
            expect(Number(color.r)).toBeCloseTo(0.5, 3);
            expect(Number(color.g)).toBeCloseTo(128, 0);
            expect(Number(color.b)).toBeCloseTo(0, 1);
        });
    });

    describe("nested relative colors", () => {
        it("rgb(from hsl(from red h s l) r g b) should roundtrip", () => {
            const color = getColor("rgb(from hsl(from red h s l) r g b)") as RGBColor;
            expect(color.colorSpace).toBe("rgb");
            // U-F30: physical channels — the round-trip lands back on red
            // rgb(255, 0, 0). (The nested inner relative color re-normalizes
            // correctly because its physical channels carry their denorm units.)
            expect(Number(color.r)).toBeCloseTo(255, 0);
            expect(Number(color.g)).toBeCloseTo(0, 1);
            expect(Number(color.b)).toBeCloseTo(0, 1);
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
            // U-F30: channels are physical ValueUnits (matching direct-parse's
            // `none` → ValueUnit(NaN)); coerce before the NaN test.
            expect(Number.isNaN(Number(color.h))).toBe(true);
        });
    });
});
