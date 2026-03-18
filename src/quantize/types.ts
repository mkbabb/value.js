import { DELTA_E_OK_JND } from "../units/color/gamut";

export interface QuantizeOptions {
    /** Palette size (default 5, range 1–16) */
    k: number;
    /** K-means max iterations (default 10) */
    maxIterations: number;
    /** Downsample target pixel count (default 20_000) */
    targetPixels: number;
    /** Chroma weight kC for distance (default 0.5) */
    chromaWeight: number;
    /** JND merge threshold in deltaEOK (default 0.02) */
    dedupeThreshold: number;
}

export interface QuantizedColor {
    /** Raw OKLab [L, a, b] (L ∈ [0,1], a,b ∈ [-0.4,0.4]) */
    oklab: [number, number, number];
    /** OKLCH [L, C, H] (L ∈ [0,1], C ≥ 0, H ∈ [0,360)) */
    oklch: [number, number, number];
    /** sRGB [r, g, b] each ∈ [0, 255] */
    rgb: [number, number, number];
    /** CSS oklch() string */
    css: string;
    /** Number of pixels in this cluster */
    population: number;
}

export const DEFAULTS: QuantizeOptions = {
    k: 5,
    maxIterations: 10,
    targetPixels: 20_000,
    chromaWeight: 0.5,
    dedupeThreshold: DELTA_E_OK_JND,
};
