/**
 * Types and defaults for OKLab-native color quantization.
 *
 * The quantizer operates entirely in OKLab for perceptual uniformity,
 * then converts results to OKLCH, sRGB, and CSS on output.
 */

import { DELTA_E_OK_JND } from "../units/color/gamut";

export interface QuantizeOptions {
    /** Number of palette colors to extract (default 5, clamped to [1, 16]). */
    k: number;
    /** Maximum k-means refinement iterations before convergence cutoff (default 10). */
    maxIterations: number;
    /** Downsample target: images are subsampled to approximately this many pixels (default 20,000). */
    targetPixels: number;
    /**
     * Chroma weight (kC) for the distance metric.
     * Scales the chromatic (a, b) axes relative to lightness:
     *   d² = ΔL² + (1 + kC·C)·(Δa² + Δb²)
     * Higher values bias clustering toward hue/chroma distinctions (default 0.5).
     */
    chromaWeight: number;
    /**
     * Minimum deltaE_OK between centroids; pairs below this threshold are
     * merged as perceptually indistinguishable. Defaults to the JND (~0.02).
     */
    dedupeThreshold: number;
}

export interface QuantizedColor {
    /** OKLab triplet [L, a, b]. L ∈ [0, 1]; a, b ∈ approx [-0.4, 0.4]. */
    oklab: [number, number, number];
    /** OKLCH triplet [L, C, H]. L ∈ [0, 1]; C ≥ 0; H ∈ [0, 360). */
    oklch: [number, number, number];
    /** Gamma-encoded sRGB triplet, each channel ∈ [0, 255]. */
    rgb: [number, number, number];
    /** CSS `oklch()` string, ready for stylesheet injection. */
    css: string;
    /** Pixel count assigned to this cluster (after downsampling). */
    population: number;
}

export const DEFAULTS: QuantizeOptions = {
    k: 5,
    maxIterations: 10,
    targetPixels: 20_000,
    chromaWeight: 0.5,
    dedupeThreshold: DELTA_E_OK_JND,
};
