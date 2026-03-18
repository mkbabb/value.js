import { describe, it, expect } from "vitest";
import { quantizePixels, dominantColor } from "../src/quantize";
import type { QuantizedColor } from "../src/quantize";

/** Create a solid-color RGBA image (Uint8ClampedArray). */
function solidImage(
    r: number, g: number, b: number,
    width = 10, height = 10, a = 255,
): { pixels: Uint8ClampedArray; width: number; height: number } {
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
        pixels[i * 4] = r;
        pixels[i * 4 + 1] = g;
        pixels[i * 4 + 2] = b;
        pixels[i * 4 + 3] = a;
    }
    return { pixels, width, height };
}

/** Create a two-stripe image (top half one color, bottom half another). */
function twoStripeImage(
    r1: number, g1: number, b1: number,
    r2: number, g2: number, b2: number,
    width = 20, height = 20,
): { pixels: Uint8ClampedArray; width: number; height: number } {
    const pixels = new Uint8ClampedArray(width * height * 4);
    const mid = height >> 1;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            if (y < mid) {
                pixels[i] = r1; pixels[i + 1] = g1; pixels[i + 2] = b1;
            } else {
                pixels[i] = r2; pixels[i + 1] = g2; pixels[i + 2] = b2;
            }
            pixels[i + 3] = 255;
        }
    }
    return { pixels, width, height };
}

/** Create a horizontal gradient from black to white. */
function gradientImage(width = 100, height = 10): { pixels: Uint8ClampedArray; width: number; height: number } {
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const v = Math.round((x / (width - 1)) * 255);
            const i = (y * width + x) * 4;
            pixels[i] = v; pixels[i + 1] = v; pixels[i + 2] = v; pixels[i + 3] = 255;
        }
    }
    return { pixels, width, height };
}

describe("quantizePixels", () => {
    it("returns empty array for empty image", () => {
        const result = quantizePixels(new Uint8ClampedArray(0), 0, 0);
        expect(result).toEqual([]);
    });

    it("solid color → k=1 returns approximately that color", () => {
        const { pixels, width, height } = solidImage(255, 0, 0);
        const result = quantizePixels(pixels, width, height, { k: 1 });

        expect(result.length).toBe(1);
        const [r, g, b] = result[0].rgb;
        expect(r).toBeGreaterThan(240);
        expect(g).toBeLessThan(15);
        expect(b).toBeLessThan(15);
    });

    it("solid color → k=5 returns 1 color after deduplication", () => {
        const { pixels, width, height } = solidImage(0, 128, 255);
        const result = quantizePixels(pixels, width, height, { k: 5 });

        // All centroids should merge since input is uniform
        expect(result.length).toBe(1);
    });

    it("two-stripe image → k=2 returns both colors", () => {
        const { pixels, width, height } = twoStripeImage(255, 0, 0, 0, 0, 255);
        const result = quantizePixels(pixels, width, height, { k: 2, dedupeThreshold: 0 });

        expect(result.length).toBe(2);

        // One should be reddish, one bluish
        const reds = result.filter((c) => c.rgb[0] > 200 && c.rgb[2] < 50);
        const blues = result.filter((c) => c.rgb[2] > 200 && c.rgb[0] < 50);
        expect(reds.length).toBe(1);
        expect(blues.length).toBe(1);
    });

    it("gradient → palette spans lightness range, sorted dark-to-light", () => {
        const { pixels, width, height } = gradientImage(200, 10);
        const result = quantizePixels(pixels, width, height, { k: 5, dedupeThreshold: 0 });

        expect(result.length).toBeGreaterThanOrEqual(3);

        // Sorted by OKLab L (dark → light)
        for (let i = 1; i < result.length; i++) {
            expect(result[i].oklab[0]).toBeGreaterThanOrEqual(result[i - 1].oklab[0]);
        }

        // First should be dark, last should be light
        expect(result[0].oklab[0]).toBeLessThan(0.4);
        expect(result[result.length - 1].oklab[0]).toBeGreaterThan(0.6);
    });

    it("output OKLCH components are in valid ranges", () => {
        const { pixels, width, height } = twoStripeImage(255, 128, 0, 0, 128, 255);
        const result = quantizePixels(pixels, width, height, { k: 4 });

        for (const color of result) {
            // OKLab L in [0,1]
            expect(color.oklab[0]).toBeGreaterThanOrEqual(0);
            expect(color.oklab[0]).toBeLessThanOrEqual(1);

            // OKLCH L in [0,1], C >= 0, H in [0, 360)
            expect(color.oklch[0]).toBeGreaterThanOrEqual(0);
            expect(color.oklch[0]).toBeLessThanOrEqual(1);
            expect(color.oklch[1]).toBeGreaterThanOrEqual(0);
            expect(color.oklch[2]).toBeGreaterThanOrEqual(0);
            expect(color.oklch[2]).toBeLessThan(360);

            // RGB in [0, 255]
            for (const channel of color.rgb) {
                expect(channel).toBeGreaterThanOrEqual(0);
                expect(channel).toBeLessThanOrEqual(255);
                expect(Number.isInteger(channel)).toBe(true);
            }

            // CSS string starts with oklch
            expect(color.css).toMatch(/^oklch\(/);
        }
    });

    it("population sum equals total sampled pixels", () => {
        const { pixels, width, height } = twoStripeImage(255, 0, 0, 0, 0, 255);
        const result = quantizePixels(pixels, width, height, { k: 2, targetPixels: 1000, dedupeThreshold: 0 });

        const totalPop = result.reduce((sum, c) => sum + c.population, 0);
        // With downsampling, total should be close to but not exceed total pixels
        expect(totalPop).toBeGreaterThan(0);
        expect(totalPop).toBeLessThanOrEqual(width * height);
    });

    it("deduplication merges near-identical centroids", () => {
        // Solid color with very slight noise — should dedupe to 1
        const { pixels, width, height } = solidImage(100, 100, 100, 50, 50);
        const withDedupe = quantizePixels(pixels, width, height, { k: 8, dedupeThreshold: 0.02 });
        const noDedupe = quantizePixels(pixels, width, height, { k: 8, dedupeThreshold: 0 });

        expect(withDedupe.length).toBeLessThanOrEqual(noDedupe.length);
        expect(withDedupe.length).toBe(1); // solid color → 1 cluster
    });

    it("handles 1×1 image", () => {
        const { pixels, width, height } = solidImage(42, 200, 100, 1, 1);
        const result = quantizePixels(pixels, width, height, { k: 3 });

        expect(result.length).toBe(1);
        expect(result[0].rgb[0]).toBeCloseTo(42, -1);
        expect(result[0].rgb[1]).toBeCloseTo(200, -1);
        expect(result[0].rgb[2]).toBeCloseTo(100, -1);
    });

    it("skips fully transparent pixels", () => {
        const { pixels, width, height } = solidImage(255, 0, 0, 10, 10, 0);
        const result = quantizePixels(pixels, width, height, { k: 3 });

        expect(result.length).toBe(0);
    });

    it("k > unique colors returns fewer clusters", () => {
        const { pixels, width, height } = solidImage(0, 255, 0);
        const result = quantizePixels(pixels, width, height, { k: 16 });

        // Only 1 unique color → should return 1
        expect(result.length).toBe(1);
    });

    it("respects k clamping to [1, 16]", () => {
        const { pixels, width, height } = gradientImage(50, 5);
        const r1 = quantizePixels(pixels, width, height, { k: 0 });
        expect(r1.length).toBeGreaterThanOrEqual(1);

        const r2 = quantizePixels(pixels, width, height, { k: 100 });
        expect(r2.length).toBeLessThanOrEqual(16);
    });
});

describe("dominantColor", () => {
    it("returns the most chromatic color from a palette", () => {
        const { pixels, width, height } = twoStripeImage(255, 0, 0, 128, 128, 128);
        const result = dominantColor(pixels, width, height);

        expect(result).not.toBeNull();
        // Red is more chromatic than gray
        expect(result!.rgb[0]).toBeGreaterThan(200);
        expect(result!.oklch[1]).toBeGreaterThan(0.05); // non-trivial chroma
    });

    it("returns null for empty image", () => {
        const result = dominantColor(new Uint8ClampedArray(0), 0, 0);
        expect(result).toBeNull();
    });

    it("returns the single color for solid image", () => {
        const { pixels, width, height } = solidImage(0, 100, 200);
        const result = dominantColor(pixels, width, height);

        expect(result).not.toBeNull();
        expect(result!.rgb[0]).toBeCloseTo(0, -1);
        expect(result!.rgb[1]).toBeCloseTo(100, -1);
        expect(result!.rgb[2]).toBeCloseTo(200, -1);
    });
});
