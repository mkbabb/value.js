import { describe, expect, it } from "vitest";
import {
    normalizeColorUnitComponent,
    normalizeColor,
    normalizeColorUnit,
    colorUnit2,
    normalizeColorUnits,
} from "../src/units/color/normalize";
import { parseCSSColor } from "../src/parsing/color";
import { Color, RGBColor, HSLColor } from "../src/units/color";
import { ValueUnit } from "../src/units";

describe("normalizeColorUnitComponent", () => {
    it("should scale RGB value 255 to 1 (normalize)", () => {
        // RGB r component with no unit: range is [0, 255] -> [0, 1]
        const result = normalizeColorUnitComponent(255, "", "rgb", "r", false);
        expect(result.value).toBeCloseTo(1, 6);
    });

    it("should scale RGB value 0 to 0 (normalize)", () => {
        const result = normalizeColorUnitComponent(0, "", "rgb", "r", false);
        expect(result.value).toBeCloseTo(0, 6);
    });

    it("should scale RGB value 127.5 to ~0.5 (normalize)", () => {
        const result = normalizeColorUnitComponent(127.5, "", "rgb", "r", false);
        expect(result.value).toBeCloseTo(0.5, 6);
    });

    it("should inverse scale 1 back to 255 (denormalize)", () => {
        // Inverse: [0, 1] -> denorm unit range for RGB r
        const result = normalizeColorUnitComponent(1, "", "rgb", "r", true);
        expect(result.value).toBeCloseTo(255, 4);
    });

    it("should inverse scale 0 back to 0 (denormalize)", () => {
        const result = normalizeColorUnitComponent(0, "", "rgb", "r", true);
        expect(result.value).toBeCloseTo(0, 6);
    });

    it("should handle percentage units for alpha", () => {
        // alpha with % unit: range [0, 100] -> [0, 1]
        const result = normalizeColorUnitComponent(50, "%", "rgb", "alpha", false);
        expect(result.value).toBeCloseTo(0.5, 6);
    });

    it("should handle hue component in deg", () => {
        // hue with deg unit: range [0, 360] -> [0, 1]
        const result = normalizeColorUnitComponent(180, "deg", "hsl", "h", false);
        expect(result.value).toBeCloseTo(0.5, 6);
    });
});

describe("normalizeColorUnit", () => {
    it("should normalize parsed rgb(255, 0, 0) to [1, 0, 0] components", () => {
        const colorUnit = parseCSSColor("rgb(255, 0, 0)");
        const normalized = normalizeColorUnit(colorUnit);

        const color = normalized.value;
        // After normalization, r should be 1, g should be 0, b should be 0
        expect(color.r.value).toBeCloseTo(1, 6);
        expect(color.g.value).toBeCloseTo(0, 6);
        expect(color.b.value).toBeCloseTo(0, 6);
    });

    it("should normalize parsed rgb(0, 255, 0) correctly", () => {
        const colorUnit = parseCSSColor("rgb(0, 255, 0)");
        const normalized = normalizeColorUnit(colorUnit);

        const color = normalized.value;
        expect(color.r.value).toBeCloseTo(0, 6);
        expect(color.g.value).toBeCloseTo(1, 6);
        expect(color.b.value).toBeCloseTo(0, 6);
    });

    it("should inverse normalize back to original range", () => {
        const colorUnit = parseCSSColor("rgb(255, 0, 0)");
        const normalized = normalizeColorUnit(colorUnit);
        const denormalized = normalizeColorUnit(normalized, true);

        const color = denormalized.value;
        // After inverse, r should be back to 255
        expect(color.r.value).toBeCloseTo(255, 2);
        expect(color.g.value).toBeCloseTo(0, 2);
        expect(color.b.value).toBeCloseTo(0, 2);
    });

    it("should normalize parsed hsl(0, 100%, 50%) to normalized values", () => {
        const colorUnit = parseCSSColor("hsl(0, 100%, 50%)");
        const normalized = normalizeColorUnit(colorUnit);

        const color = normalized.value;
        // h=0 -> 0, s=100% -> 1, l=50% -> 0.5
        expect(color.h.value).toBeCloseTo(0, 6);
        expect(color.s.value).toBeCloseTo(1, 6);
        expect(color.l.value).toBeCloseTo(0.5, 6);
    });

    it("should not modify original when inplace is false", () => {
        const colorUnit = parseCSSColor("rgb(128, 64, 32)");
        const originalR = colorUnit.value.r.value;
        normalizeColorUnit(colorUnit, false, false);

        expect(colorUnit.value.r.value).toBe(originalR);
    });
});

describe("colorUnit2", () => {
    it("should convert parsed rgb color to hsl color space", () => {
        const colorUnit = parseCSSColor("rgb(255, 0, 0)");
        const converted = colorUnit2(colorUnit, "hsl");

        expect(converted.value.colorSpace).toBe("hsl");
        expect(converted.superType[1]).toBe("hsl");
    });

    it("should convert parsed rgb color to lab color space", () => {
        const colorUnit = parseCSSColor("rgb(255, 0, 0)");
        const converted = colorUnit2(colorUnit, "lab");

        expect(converted.value.colorSpace).toBe("lab");
        expect(converted.superType[1]).toBe("lab");
    });

    it("should convert parsed hsl color to rgb color space", () => {
        const colorUnit = parseCSSColor("hsl(120, 100%, 50%)");
        const converted = colorUnit2(colorUnit, "rgb");

        expect(converted.value.colorSpace).toBe("rgb");
        expect(converted.superType[1]).toBe("rgb");
    });

    it("should preserve alpha through conversion", () => {
        const colorUnit = parseCSSColor("rgba(255, 0, 0, 0.5)");
        const converted = colorUnit2(colorUnit, "hsl");

        expect(converted.value.alpha.value).toBeCloseTo(0.5, 4);
    });

    it("should handle conversion with inverse flag", () => {
        const colorUnit = parseCSSColor("rgb(255, 0, 0)");
        const converted = colorUnit2(colorUnit, "lab", false, true);

        // With inverse, the result should have denormalized values
        expect(converted.value.colorSpace).toBe("lab");
    });
});

describe("normalizeColorUnits", () => {
    it("should normalize a pair to the same color space (default lab)", () => {
        const a = parseCSSColor("rgb(255, 0, 0)");
        const b = parseCSSColor("hsl(240, 100%, 50%)");

        const [na, nb] = normalizeColorUnits(a, b, "lab");

        expect(na.value.colorSpace).toBe("lab");
        expect(nb.value.colorSpace).toBe("lab");
        expect(na.superType[1]).toBe("lab");
        expect(nb.superType[1]).toBe("lab");
    });

    it("should normalize a pair to hsl when requested", () => {
        const a = parseCSSColor("rgb(255, 0, 0)");
        const b = parseCSSColor("rgb(0, 0, 255)");

        const [na, nb] = normalizeColorUnits(a, b, "hsl");

        expect(na.value.colorSpace).toBe("hsl");
        expect(nb.value.colorSpace).toBe("hsl");
    });

    it("should normalize a pair to oklab", () => {
        const a = parseCSSColor("rgb(255, 128, 0)");
        const b = parseCSSColor("hsl(120, 100%, 50%)");

        const [na, nb] = normalizeColorUnits(a, b, "oklab");

        expect(na.value.colorSpace).toBe("oklab");
        expect(nb.value.colorSpace).toBe("oklab");
    });

    it("should handle same-space colors", () => {
        const a = parseCSSColor("rgb(255, 0, 0)");
        const b = parseCSSColor("rgb(0, 255, 0)");

        const [na, nb] = normalizeColorUnits(a, b, "rgb");

        expect(na.value.colorSpace).toBe("rgb");
        expect(nb.value.colorSpace).toBe("rgb");
    });
});
