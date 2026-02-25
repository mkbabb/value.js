import { describe, expect, it } from "vitest";
import { parseCSSColor } from "../src/parsing/color";
import {
    Color,
    RGBColor,
    LinearSRGBColor,
    DisplayP3Color,
    AdobeRGBColor,
    ProPhotoRGBColor,
    Rec2020Color,
    XYZColor,
} from "../src/units/color";
import { ValueUnit } from "../src/units";
import { normalizeColorUnit } from "../src/units/color/normalize";
import { color2 } from "../src/units/color/utils";

function getColor(input: string): Color {
    const unit = parseCSSColor(input);
    return unit.value as unknown as Color;
}

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

describe("CSS color() function", () => {
    describe("parsing", () => {
        it("should parse color(srgb 1 0 0)", () => {
            const color = getColor("color(srgb 1 0 0)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("rgb");
        });

        it("should parse color(srgb-linear 0.5 0.5 0.5)", () => {
            const color = getColor("color(srgb-linear 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("srgb-linear");
        });

        it("should parse color(display-p3 1 0 0)", () => {
            const color = getColor("color(display-p3 1 0 0)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("display-p3");
        });

        it("should parse color(a98-rgb 0.5 0.5 0.5)", () => {
            const color = getColor("color(a98-rgb 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("a98-rgb");
        });

        it("should parse color(prophoto-rgb 0.5 0.5 0.5)", () => {
            const color = getColor("color(prophoto-rgb 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("prophoto-rgb");
        });

        it("should parse color(rec2020 0.5 0.5 0.5)", () => {
            const color = getColor("color(rec2020 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("rec2020");
        });

        it("should parse color(xyz 0.5 0.5 0.5)", () => {
            const color = getColor("color(xyz 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("xyz");
        });

        it("should parse color(xyz-d65 0.5 0.5 0.5)", () => {
            const color = getColor("color(xyz-d65 0.5 0.5 0.5)");
            expect(color).toBeDefined();
            expect(color.colorSpace).toBe("xyz");
        });

        it("should parse color with alpha", () => {
            const color = getColor("color(srgb 1 0 0 / 0.5)");
            expect(color).toBeDefined();
        });
    });

    describe("conversion round-trips", () => {
        it("display-p3 → xyz → display-p3 should round-trip", () => {
            const original = getPlainColor("color(display-p3 0.8 0.2 0.3)");
            const xyz = color2(original, "xyz") as XYZColor;
            const back = color2(xyz, "display-p3") as DisplayP3Color;

            expect(back.r).toBeCloseTo((original as DisplayP3Color).r, 4);
            expect(back.g).toBeCloseTo((original as DisplayP3Color).g, 4);
            expect(back.b).toBeCloseTo((original as DisplayP3Color).b, 4);
        });

        it("a98-rgb → xyz → a98-rgb should round-trip", () => {
            const original = getPlainColor("color(a98-rgb 0.5 0.7 0.3)");
            const xyz = color2(original, "xyz") as XYZColor;
            const back = color2(xyz, "a98-rgb") as AdobeRGBColor;

            expect(back.r).toBeCloseTo((original as AdobeRGBColor).r, 4);
            expect(back.g).toBeCloseTo((original as AdobeRGBColor).g, 4);
            expect(back.b).toBeCloseTo((original as AdobeRGBColor).b, 4);
        });

        it("prophoto-rgb → xyz → prophoto-rgb should round-trip", () => {
            const original = getPlainColor("color(prophoto-rgb 0.4 0.6 0.2)");
            const xyz = color2(original, "xyz") as XYZColor;
            const back = color2(xyz, "prophoto-rgb") as ProPhotoRGBColor;

            expect(back.r).toBeCloseTo((original as ProPhotoRGBColor).r, 4);
            expect(back.g).toBeCloseTo((original as ProPhotoRGBColor).g, 4);
            expect(back.b).toBeCloseTo((original as ProPhotoRGBColor).b, 4);
        });

        it("rec2020 → xyz → rec2020 should round-trip", () => {
            const original = getPlainColor("color(rec2020 0.6 0.3 0.5)");
            const xyz = color2(original, "xyz") as XYZColor;
            const back = color2(xyz, "rec2020") as Rec2020Color;

            expect(back.r).toBeCloseTo((original as Rec2020Color).r, 4);
            expect(back.g).toBeCloseTo((original as Rec2020Color).g, 4);
            expect(back.b).toBeCloseTo((original as Rec2020Color).b, 4);
        });

        it("srgb-linear → xyz → srgb-linear should round-trip", () => {
            const original = getPlainColor("color(srgb-linear 0.2 0.4 0.6)");
            const xyz = color2(original, "xyz") as XYZColor;
            const back = color2(xyz, "srgb-linear") as LinearSRGBColor;

            expect(back.r).toBeCloseTo((original as LinearSRGBColor).r, 4);
            expect(back.g).toBeCloseTo((original as LinearSRGBColor).g, 4);
            expect(back.b).toBeCloseTo((original as LinearSRGBColor).b, 4);
        });
    });

    describe("srgb equivalence", () => {
        it("color(srgb 1 0 0) should equal rgb(255 0 0) after normalization", () => {
            const srgbColor = getPlainColor("color(srgb 1 0 0)") as RGBColor;
            const rgbColor = getPlainColor("rgb(255 0 0)") as RGBColor;

            // color(srgb 1 0 0) values are 1, rgb(255 0 0) normalizes to 1
            expect(srgbColor.r).toBeCloseTo(rgbColor.r, 3);
            expect(srgbColor.g).toBeCloseTo(rgbColor.g, 3);
            expect(srgbColor.b).toBeCloseTo(rgbColor.b, 3);
        });
    });

    describe("color-mix with new spaces", () => {
        it("should mix in display-p3 space", () => {
            const result = parseCSSColor(
                "color-mix(in display-p3, color(display-p3 1 0 0), color(display-p3 0 0 1))",
            );
            expect(result).toBeDefined();
        });
    });
});
