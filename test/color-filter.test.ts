import { describe, expect, it } from "vitest";
import { RGBColor } from "../src/units/color";
import { rgb2ColorFilter, cssFiltersToString } from "../src/units/color/colorFilter";

describe("colorFilter", () => {
    describe("rgb2ColorFilter", () => {
        it("returns { values, loss, filter } shape", () => {
            const result = rgb2ColorFilter(new RGBColor(255, 0, 0));
            expect(result).toHaveProperty("values");
            expect(result).toHaveProperty("loss");
            expect(result).toHaveProperty("filter");
            expect(Array.isArray(result.values)).toBe(true);
            expect(result.values.length).toBe(6);
            expect(typeof result.loss).toBe("number");
            expect(typeof result.filter).toBe("string");
        });

        it("produces finite loss for red", () => {
            const result = rgb2ColorFilter(new RGBColor(255, 0, 0));
            expect(result.loss).toBeLessThan(Infinity);
            expect(result.loss).toBeGreaterThanOrEqual(0);
        });

        it("produces finite loss for blue", () => {
            const result = rgb2ColorFilter(new RGBColor(0, 0, 255));
            expect(result.loss).toBeLessThan(Infinity);
            expect(result.loss).toBeGreaterThanOrEqual(0);
        });

        it("produces finite loss for green", () => {
            const result = rgb2ColorFilter(new RGBColor(0, 128, 0));
            expect(result.loss).toBeLessThan(Infinity);
            expect(result.loss).toBeGreaterThanOrEqual(0);
        });

        it("filter string contains all 6 CSS filter functions", () => {
            const result = rgb2ColorFilter(new RGBColor(255, 0, 0));
            expect(result.filter).toContain("invert(");
            expect(result.filter).toContain("sepia(");
            expect(result.filter).toContain("saturate(");
            expect(result.filter).toContain("hue-rotate(");
            expect(result.filter).toContain("brightness(");
            expect(result.filter).toContain("contrast(");
        });
    });

    describe("cssFiltersToString", () => {
        it("produces valid CSS filter string", () => {
            const filter = cssFiltersToString([50, 100, 200, 50, 100, 100]);
            expect(filter).toBe(
                "invert(50%) sepia(100%) saturate(200%) hue-rotate(180deg) brightness(100%) contrast(100%)",
            );
        });

        it("rounds values to integers", () => {
            const filter = cssFiltersToString([50.7, 99.3, 200.1, 50.5, 99.9, 100.4]);
            // Values should be rounded
            expect(filter).toMatch(/invert\(\d+%\)/);
            expect(filter).toMatch(/sepia\(\d+%\)/);
            expect(filter).toMatch(/saturate\(\d+%\)/);
            expect(filter).toMatch(/hue-rotate\(\d+deg\)/);
            expect(filter).toMatch(/brightness\(\d+%\)/);
            expect(filter).toMatch(/contrast\(\d+%\)/);
        });
    });
});
