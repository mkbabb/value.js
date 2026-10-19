// X.W11.w9r — W9.22 (CNL-18): white and every in-gamut 8-bit sRGB point convert to HSL per CSS Color 4.
import { describe, expect, it } from "vitest";
import { convertColor, rgb, type AnyColor } from "../src/subpaths/color";

function source(r: number, g: number, b: number): AnyColor {
    const made = rgb(r, g, b);
    if (!made.ok) throw new Error(`fixture rgb(${r},${g},${b}) failed`);
    return made.value;
}

function toHsl(r: number, g: number, b: number) {
    return convertColor(source(r, g, b), "hsl");
}

const LATTICE = Array.from({ length: 16 }, (_, k) => k * 17);
const NEAR_WHITE = [250, 251, 252, 253, 254, 255];
const NEAR_BLACK = [0, 1, 2, 3, 4, 5];

function cube(steps: readonly number[]): [number, number, number][] {
    const cells: [number, number, number][] = [];
    for (const r of steps) for (const g of steps) for (const b of steps) cells.push([r, g, b]);
    return cells;
}

function outOfDomain(cells: readonly [number, number, number][]): string[] {
    const failures: string[] = [];
    for (const [r, g, b] of cells) {
        const result = toHsl(r, g, b);
        if (!result.ok) {
            failures.push(`rgb(${r},${g},${b}) -> ${result.error.code}`);
            continue;
        }
        const [, s, l] = result.value.channels;
        if (typeof s !== "number" || s < 0 || s > 1 || typeof l !== "number" || l < 0 || l > 1) {
            failures.push(`rgb(${r},${g},${b}) -> s=${String(s)} l=${String(l)}`);
        }
    }
    return failures;
}

describe("rgb -> hsl achromatic law (CSS Color 4)", () => {
    it("white converts: ok, s = 0, hue powerless", () => {
        const result = toHsl(255, 255, 255);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value.channels[0]).toBe("none");
        expect(result.value.channels[1]).toBe(0);
        expect(result.value.channels[2]).toBeCloseTo(1, 12);
    });

    it("black converts: ok, s = 0, hue powerless", () => {
        const result = toHsl(0, 0, 0);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.value.channels[0]).toBe("none");
        expect(result.value.channels[1]).toBe(0);
    });

    it("the 256-grey sweep converts 256/256", () => {
        const failed = Array.from({ length: 256 }, (_, v) => v).filter((v) => !toHsl(v, v, v).ok);
        expect(failed).toEqual([]);
    });

    it("rgb(255,255,254) has s in [0, 1]", () => {
        const result = toHsl(255, 255, 254);
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        const s = result.value.channels[1] as number;
        expect(s).toBeGreaterThanOrEqual(0);
        expect(s).toBeLessThanOrEqual(1);
    });

    it("the 4,096-point 16-step lattice has s, l in [0, 1]", () => {
        const cells = cube(LATTICE);
        expect(cells).toHaveLength(4096);
        expect(outOfDomain(cells)).toEqual([]);
    });

    it("every near-white and near-black edge cell has s, l in [0, 1]", () => {
        expect(outOfDomain(cube(NEAR_WHITE))).toEqual([]);
        expect(outOfDomain(cube(NEAR_BLACK))).toEqual([]);
    });
});
