/**
 * OKLab-native color quantization: MMCQ → k-means++ hybrid.
 *
 * Novel contributions:
 * 1. Quantizes natively in OKLab (perceptually uniform), not RGB
 * 2. MMCQ pre-clusters → k-means++ D²-weighted seeding
 * 3. Chroma-weighted distance: d² = ΔL² + (1 + kC·C)·(Δa² + Δb²)
 * 4. JND deduplication: merge centroids within deltaEOK < threshold
 * 5. Nearest-neighbor palette sort in weighted OKLCH space
 */

import { srgbToOKLab } from "../units/color/gamut";
import { DEFAULTS } from "./types";
import type { QuantizeOptions, QuantizedColor } from "./types";
import {
    rawOklabToOklch,
    oklabToRgb255,
    oklchToCss,
    medianCutOKLab,
    kmeansPlusPlusInit,
    kmeansIterate,
    deduplicateCentroids,
} from "./cluster";

export type { QuantizeOptions, QuantizedColor } from "./types";

// ── Palette sorting ──

/** Circular hue distance in [0, 180] */
function hueDist(h1: number, h2: number): number {
    const d = Math.abs(h1 - h2);
    return d > 180 ? 360 - d : d;
}

/**
 * Composite perceptual distance for palette ordering.
 * Weights hue continuity most, then lightness flow, then chroma similarity.
 */
function paletteDistance(a: QuantizedColor, b: QuantizedColor): number {
    const wH = 1.5;
    const wL = 1.0;
    const wC = 0.5;

    const dH = hueDist(a.oklch[2], b.oklch[2]) / 180;
    const dL = Math.abs(a.oklch[0] - b.oklch[0]);
    const dC = Math.abs(a.oklch[1] - b.oklch[1]) / 0.4;

    return wH * dH + wL * dL + wC * dC;
}

/**
 * Sort a palette for visual coherence using nearest-neighbor traversal
 * in weighted OKLCH space. Starts from the darkest color.
 */
function sortPalette(colors: QuantizedColor[]): QuantizedColor[] {
    if (colors.length <= 2) return colors;

    let startIdx = 0;
    for (let i = 1; i < colors.length; i++) {
        if (colors[i]!.oklch[0] < colors[startIdx]!.oklch[0]) {
            startIdx = i;
        }
    }

    const sorted: QuantizedColor[] = [colors[startIdx]!];
    const used = new Set<number>([startIdx]);

    for (let step = 1; step < colors.length; step++) {
        const current = sorted[step - 1]!;
        let bestIdx = -1;
        let bestDist = Infinity;

        for (let i = 0; i < colors.length; i++) {
            if (used.has(i)) continue;
            const d = paletteDistance(current, colors[i]!);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
            }
        }

        sorted.push(colors[bestIdx]!);
        used.add(bestIdx);
    }

    return sorted;
}

// ── Public API ──

/**
 * Quantize image pixels to a palette of K colors in OKLab space.
 *
 * Pipeline: downsample → sRGB→OKLab → MMCQ seed → k-means++ init →
 * k-means refine → dedupe → perceptual sort
 */
export function quantizePixels(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    options?: Partial<QuantizeOptions>,
): QuantizedColor[] {
    const opts = { ...DEFAULTS, ...options };
    const k = Math.max(1, Math.min(16, opts.k));
    const totalPixels = width * height;

    if (totalPixels === 0) return [];

    // Step 1: Downsample
    const step = Math.max(1, Math.floor(Math.sqrt(totalPixels / opts.targetPixels)));
    const sampledCount = Math.ceil(width / step) * Math.ceil(height / step);
    const oklabPixels = new Float64Array(sampledCount * 3);

    let idx = 0;
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const off = (y * width + x) * 4;
            const r = pixels[off]! / 255;
            const g = pixels[off + 1]! / 255;
            const b = pixels[off + 2]! / 255;
            const a = pixels[off + 3]!;

            if (a < 10) continue;

            const [L, oA, oB] = srgbToOKLab(r, g, b);
            oklabPixels[idx * 3] = L;
            oklabPixels[idx * 3 + 1] = oA;
            oklabPixels[idx * 3 + 2] = oB;
            idx++;
        }
    }

    const actualCount = idx;
    if (actualCount === 0) return [];

    // Step 2: MMCQ pre-clustering
    const preClusters = Math.min(actualCount, Math.max(k * 4, 64));
    const mmcqResult = medianCutOKLab(oklabPixels.slice(0, actualCount * 3), actualCount, preClusters);

    // Step 3: K-means++ init
    const seeds = kmeansPlusPlusInit(mmcqResult, k, opts.chromaWeight);

    // Step 4: K-means refine
    const { centroids, populations } = kmeansIterate(
        oklabPixels,
        actualCount,
        seeds,
        opts.maxIterations,
        opts.chromaWeight,
    );

    // Step 5: Deduplicate within JND
    const deduped = deduplicateCentroids(centroids, populations, opts.dedupeThreshold);

    // Step 6: Build output + perceptual sort
    const result: QuantizedColor[] = deduped.centroids.map((c, i) => {
        const [L, a, b] = c;
        const oklch = rawOklabToOklch(L, a, b);
        const rgb = oklabToRgb255(L, a, b);
        return {
            oklab: [L, a, b] as [number, number, number],
            oklch,
            rgb,
            css: oklchToCss(oklch[0], oklch[1], oklch[2]),
            population: deduped.populations[i]!,
        };
    });

    return sortPalette(result);
}

/**
 * Extract the single dominant color from an image.
 * Runs k=5 quantization and returns the centroid with highest OKLCH chroma.
 */
export function dominantColor(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
): QuantizedColor | null {
    const palette = quantizePixels(pixels, width, height, { k: 5 });
    if (palette.length === 0) return null;

    let best = palette[0]!;
    for (let i = 1; i < palette.length; i++) {
        if (palette[i]!.oklch[1] > best.oklch[1]) {
            best = palette[i]!;
        }
    }
    return best;
}
