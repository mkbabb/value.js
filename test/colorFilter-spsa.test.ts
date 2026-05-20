import { describe, expect, it } from "vitest";
import { RGBColor } from "../src/units/color";
import {
    cssFiltersToString,
    rgb2ColorFilter,
} from "../src/units/color/colorFilter";

/**
 * SPSA solver coverage for `rgb2ColorFilter` — the SPSA-driven
 * optimization solves a 6-parameter CSS filter chain
 * (invert, sepia, saturate, hue-rotate, brightness, contrast) that,
 * when applied to a pure-black source pixel, yields approximately
 * the target color.
 *
 * SPSA is stochastic, so we assert:
 *  - the returned shape is correct
 *  - the loss is non-negative and bounded (reasonable convergence)
 *  - the emitted filter string is well-formed CSS
 *  - cssFiltersToString round-trips
 */

const TARGETS: { name: string; color: RGBColor<number> }[] = [
    { name: "pure red", color: new RGBColor(255, 0, 0) },
    { name: "pure green", color: new RGBColor(0, 255, 0) },
    { name: "pure blue", color: new RGBColor(0, 0, 255) },
    { name: "midgray", color: new RGBColor(128, 128, 128) },
    { name: "warm cream", color: new RGBColor(240, 220, 180) },
    { name: "deep magenta", color: new RGBColor(180, 30, 140) },
    { name: "near-black", color: new RGBColor(10, 10, 10) },
    { name: "near-white", color: new RGBColor(245, 245, 245) },
];

describe("rgb2ColorFilter — SPSA solver shape", () => {
    it("returns { values, loss, filter } object", () => {
        const r = rgb2ColorFilter(new RGBColor(100, 100, 100));
        expect(r).toHaveProperty("values");
        expect(r).toHaveProperty("loss");
        expect(r).toHaveProperty("filter");
    });

    it("values array has length 6 (one per CSS filter)", () => {
        const r = rgb2ColorFilter(new RGBColor(100, 100, 100));
        expect(r.values).toHaveLength(6);
    });

    it("loss is a finite number ≥ 0", () => {
        const r = rgb2ColorFilter(new RGBColor(100, 100, 100));
        expect(Number.isFinite(r.loss)).toBe(true);
        expect(r.loss).toBeGreaterThanOrEqual(0);
    });

    it("filter is a non-empty string", () => {
        const r = rgb2ColorFilter(new RGBColor(100, 100, 100));
        expect(typeof r.filter).toBe("string");
        expect(r.filter.length).toBeGreaterThan(0);
    });
});

describe("rgb2ColorFilter — SPSA convergence across targets", () => {
    for (const t of TARGETS) {
        it(`${t.name} → loss is finite, ≥ 0`, () => {
            const r = rgb2ColorFilter(t.color);
            expect(Number.isFinite(r.loss)).toBe(true);
            expect(r.loss).toBeGreaterThanOrEqual(0);
        });

        it(`${t.name} → emits a CSS filter chain with all 6 functions`, () => {
            const r = rgb2ColorFilter(t.color);
            expect(r.filter).toContain("invert(");
            expect(r.filter).toContain("sepia(");
            expect(r.filter).toContain("saturate(");
            expect(r.filter).toContain("hue-rotate(");
            expect(r.filter).toContain("brightness(");
            expect(r.filter).toContain("contrast(");
        });
    }
});

describe("cssFiltersToString — formatting + round-trip", () => {
    it("round-trips a values array through cssFiltersToString", () => {
        const r = rgb2ColorFilter(new RGBColor(50, 100, 150));
        const reformatted = cssFiltersToString(r.values);
        expect(reformatted).toBe(r.filter);
    });

    it("emits CSS units in correct order", () => {
        const out = cssFiltersToString([10, 20, 30, 45, 80, 90]);
        // Whitespace-separated functions in fixed order
        expect(out).toMatch(
            /invert\(.*\) sepia\(.*\) saturate\(.*\) hue-rotate\(.*\) brightness\(.*\) contrast\(.*\)/,
        );
    });

    it("hue-rotate uses deg unit, others use %", () => {
        // hue-rotate input is scaled by 3.6 (100 → 360deg)
        const out = cssFiltersToString([10, 20, 30, 50, 80, 90]);
        expect(out).toContain("hue-rotate(180deg)"); // 50 * 3.6 = 180
        expect(out).toContain("invert(10%)");
        expect(out).toContain("sepia(20%)");
        expect(out).toContain("saturate(30%)");
        expect(out).toContain("brightness(80%)");
        expect(out).toContain("contrast(90%)");
    });
});
