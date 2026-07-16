import { describe, expect, it } from "vitest";
import { convertColor, toRgba8 } from "../src/subpaths/color";
import {
    dominantColor,
    quantizePixels,
    type QuantizedColor,
} from "../src/subpaths/quantize";

function pixels(
    colors: readonly (readonly [number, number, number, number?])[],
): Uint8ClampedArray {
    return new Uint8ClampedArray(colors.flatMap(([r, g, b, a = 255]) => [r, g, b, a]));
}

function unwrap(result: ReturnType<typeof quantizePixels>): readonly QuantizedColor[] {
    if (!result.ok) throw new Error(result.error.code);
    return result.value;
}

function rgba(color: QuantizedColor): readonly number[] {
    const rgb = convertColor(color.color, "rgb");
    if (!rgb.ok) throw new Error(rgb.error.code);
    const projected = toRgba8(rgb.value, { gamut: "clip" });
    if (!projected.ok) throw new Error(projected.error.code);
    return projected.value;
}

describe("Value 4 quantize behavior", () => {
    it("returns typed failures for dimensions, byte length, and every option boundary", () => {
        expect(quantizePixels(new Uint8ClampedArray(), 0, 1)).toEqual({
            ok: false,
            error: { code: "quantize_invalid_dimensions" },
        });
        expect(quantizePixels(new Uint8ClampedArray(3), 1, 1)).toEqual({
            ok: false,
            error: { code: "quantize_pixel_length_mismatch" },
        });
        const one = pixels([[0, 0, 0]]);
        for (const options of [
            { k: 0 },
            { k: 65 },
            { maxIterations: 0 },
            { targetPixels: 0 },
            { chromaWeight: -1 },
            { dedupeThreshold: -1 },
        ]) {
            expect(quantizePixels(one, 1, 1, options)).toEqual({
                ok: false,
                error: { code: "quantize_invalid_option" },
            });
        }
    });

    it("returns an empty successful palette when every pixel is transparent", () => {
        expect(quantizePixels(pixels([
            [255, 0, 0, 0],
            [0, 255, 0, 9],
        ]), 2, 1)).toEqual({ ok: true, value: [] });
        expect(dominantColor(pixels([[1, 2, 3, 0]]), 1, 1))
            .toEqual({ ok: true, value: null });
    });

    it("recovers distinct clusters, populations, and dominant color", () => {
        const input = pixels([
            [255, 0, 0],
            [255, 0, 0],
            [255, 0, 0],
            [0, 0, 255],
        ]);
        const palette = unwrap(quantizePixels(input, 4, 1, {
            k: 2,
            dedupeThreshold: 0,
        }));
        expect(palette).toHaveLength(2);
        expect(palette.map(({ population }) => population)).toEqual([3, 1]);
        expect(rgba(palette[0]!)).toEqual([255, 0, 0, 255]);
        expect(rgba(palette[1]!)).toEqual([0, 0, 255, 255]);
        const dominant = dominantColor(input, 4, 1);
        expect(dominant.ok && dominant.value ? rgba(dominant.value) : null)
            .toEqual([255, 0, 0, 255]);
    });

    it("deduplicates a uniform image and preserves the sampled population", () => {
        const input = pixels(Array.from({ length: 64 }, () => [12, 120, 240] as const));
        const palette = unwrap(quantizePixels(input, 8, 8, {
            k: 8,
            dedupeThreshold: 0.02,
        }));
        expect(palette).toHaveLength(1);
        expect(palette[0]!.population).toBe(64);
        expect(rgba(palette[0]!)).toEqual([12, 120, 240, 255]);
    });

    it("merges the population of distinct near-color centroids", () => {
        const input = pixels([
            ...Array.from({ length: 7 }, () => [100, 100, 100] as const),
            ...Array.from({ length: 5 }, () => [101, 101, 101] as const),
        ]);
        const palette = unwrap(quantizePixels(input, 12, 1, {
            k: 2,
            dedupeThreshold: 0.02,
        }));
        expect(palette).toHaveLength(1);
        expect(palette[0]!.population).toBe(12);
    });

    it("downsamples by the declared target without losing cluster accounting", () => {
        const input = new Uint8ClampedArray(100 * 100 * 4);
        for (let y = 0; y < 100; y++) {
            for (let x = 0; x < 100; x++) {
                const offset = (y * 100 + x) * 4;
                input[offset] = x < 50 ? 255 : 0;
                input[offset + 2] = x < 50 ? 0 : 255;
                input[offset + 3] = 255;
            }
        }
        const palette = unwrap(quantizePixels(input, 100, 100, {
            k: 2,
            targetPixels: 100,
            dedupeThreshold: 0,
        }));
        expect(palette).toHaveLength(2);
        expect(palette.reduce((sum, row) => sum + row.population, 0)).toBe(100);
    });

    it("makes chromaWeight a real deterministic clustering control", () => {
        const swatches = [
            [240, 240, 240], [180, 180, 180], [120, 120, 120], [60, 60, 60],
            [230, 40, 40], [230, 140, 40], [40, 200, 40], [40, 180, 200],
            [80, 40, 200], [210, 40, 160], [160, 120, 60], [120, 160, 120],
        ] as const;
        const input = pixels(Array.from({ length: 48 * 48 }, (_, index) =>
            swatches[(index % 48 + Math.floor(index / 48)) % swatches.length]!,
        ));
        const fingerprint = (weight: number) => unwrap(quantizePixels(input, 48, 48, {
            k: 5,
            chromaWeight: weight,
            dedupeThreshold: 0,
        })).map((row) => row.color.channels.map((value) =>
            typeof value === "number" ? value.toFixed(5) : value,
        ).join(",")).join("|");
        expect(fingerprint(0)).not.toBe(fingerprint(5));
    });
});
