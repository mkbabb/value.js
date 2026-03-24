/**
 * Pleasing color generation using OKLCh-constrained ranges.
 *
 * OKLCh maps Lightness / Chroma / Hue to perceptual qualities, making it
 * ideal for aesthetic control. Each preset constrains L, C, H ranges to
 * produce colors with a consistent visual character.
 *
 * Harmony algorithms distribute hues across the palette:
 * - **golden**: golden-angle spacing (137.508°) — maximum visual separation
 *   (Ankerl 2009, "How to create random colors programmatically")
 * - **analogous**: tight hue cluster (±15–30°)
 * - **complementary**: 180° pairs with L/C jitter
 * - **triadic**: 120° spacing
 * - **split-complementary**: base + 150° + 210°
 * - **random**: independent random hues
 *
 * All generated colors are gamut-mapped to sRGB via Ottosson's analytical
 * method (gamutMapSRGB) to ensure displayability.
 */

import { ref, computed } from "vue";
import type { Ref } from "vue";
import { OKLCHColor, RGBColor } from "@src/units/color";
import { oklch2xyz, xyz2rgb } from "@src/units/color/utils";
import { gamutMapSRGB } from "@src/units/color/gamut";
import { mulberry32 } from "@composables/prng";

// ── Preset definitions ──

export interface PresetRange {
    l: [number, number];
    c: [number, number];
    h: [number, number][];
    description: string;
}

export const GENERATION_PRESETS = {
    vibrant:  { l: [0.55, 0.80], c: [0.12, 0.30], h: [[0, 360]], description: "High chroma, bold tones" },
    pastel:   { l: [0.80, 0.92], c: [0.04, 0.10], h: [[0, 360]], description: "Soft, light, airy" },
    warm:     { l: [0.50, 0.85], c: [0.08, 0.22], h: [[0, 80], [330, 360]], description: "Reds, oranges, golds" },
    cool:     { l: [0.45, 0.80], c: [0.06, 0.18], h: [[180, 300]], description: "Blues, cyans, purples" },
    earth:    { l: [0.35, 0.65], c: [0.04, 0.12], h: [[30, 90]], description: "Muted clay and soil" },
    neon:     { l: [0.65, 0.85], c: [0.20, 0.40], h: [[0, 360]], description: "Maximum saturation glow" },
    muted:    { l: [0.40, 0.70], c: [0.02, 0.08], h: [[0, 360]], description: "Quiet, understated" },
    dark:     { l: [0.15, 0.40], c: [0.06, 0.16], h: [[0, 360]], description: "Deep, moody tones" },
    jewel:    { l: [0.30, 0.55], c: [0.12, 0.25], h: [[0, 360]], description: "Rich sapphire and ruby" },
    random:   { l: [0.20, 0.90], c: [0.02, 0.30], h: [[0, 360]], description: "Unconstrained chaos" },
} as const satisfies Record<string, PresetRange>;

export type PresetName = keyof typeof GENERATION_PRESETS;
export const PRESET_NAMES = Object.keys(GENERATION_PRESETS) as PresetName[];

// ── Harmony algorithms ──

export interface HarmonyDef {
    description: string;
}

export const HARMONY_DEFS: Record<string, HarmonyDef> = {
    golden:               { description: "Golden angle — maximum separation" },
    analogous:            { description: "Tight hue cluster, ±30°" },
    complementary:        { description: "Opposing hue pairs, 180°" },
    triadic:              { description: "Three equidistant hues, 120°" },
    "split-complementary": { description: "Base + two flanking complements" },
    random:               { description: "Independent random hues" },
};

export const HARMONY_NAMES = [
    "golden",
    "analogous",
    "complementary",
    "triadic",
    "split-complementary",
    "random",
] as const;
export type HarmonyName = (typeof HARMONY_NAMES)[number];

/** Golden angle in degrees — produces maximum visual hue separation. */
const GOLDEN_ANGLE = 137.50776405003785;

/**
 * Generate N hues (in degrees, 0–360) using the given harmony algorithm.
 */
function generateHues(
    count: number,
    harmony: HarmonyName,
    seedHue: number,
    rng: () => number,
): number[] {
    const hues: number[] = [];

    switch (harmony) {
        case "golden":
            for (let i = 0; i < count; i++) {
                hues.push((seedHue + i * GOLDEN_ANGLE) % 360);
            }
            break;

        case "analogous": {
            const spread = 15 + rng() * 15; // 15–30° total spread
            const step = count > 1 ? (spread * 2) / (count - 1) : 0;
            for (let i = 0; i < count; i++) {
                hues.push(((seedHue - spread + i * step) % 360 + 360) % 360);
            }
            break;
        }

        case "complementary":
            for (let i = 0; i < count; i++) {
                const base = i % 2 === 0 ? seedHue : seedHue + 180;
                // Add small jitter (±5°) for visual variety
                hues.push(((base + (rng() - 0.5) * 10) % 360 + 360) % 360);
            }
            break;

        case "triadic":
            for (let i = 0; i < count; i++) {
                const base = seedHue + (i % 3) * 120;
                hues.push(((base + (rng() - 0.5) * 10) % 360 + 360) % 360);
            }
            break;

        case "split-complementary": {
            const bases = [seedHue, seedHue + 150, seedHue + 210];
            for (let i = 0; i < count; i++) {
                const base = bases[i % 3]!;
                hues.push(((base + (rng() - 0.5) * 10) % 360 + 360) % 360);
            }
            break;
        }

        case "random":
            for (let i = 0; i < count; i++) {
                hues.push(rng() * 360);
            }
            break;
    }

    return hues;
}

/**
 * Clamp a hue to the allowed ranges in a preset.
 * If the hue falls outside all ranges, map it proportionally into the
 * combined range span.
 */
function clampHueToRanges(hue: number, ranges: readonly (readonly [number, number])[]): number {
    // Normalize to [0, 360)
    hue = ((hue % 360) + 360) % 360;

    // Check if hue is already in a valid range
    for (const [lo, hi] of ranges) {
        if (lo <= hi) {
            if (hue >= lo && hue <= hi) return hue;
        } else {
            // Wrapping range (e.g., 330–360 interpreted as 330–360 within a single segment)
            if (hue >= lo || hue <= hi) return hue;
        }
    }

    // Map into combined span
    const totalSpan = ranges.reduce((sum, [lo, hi]) => sum + (hi - lo), 0);
    const fractional = (hue / 360) * totalSpan;
    let accumulated = 0;
    for (const [lo, hi] of ranges) {
        const span = hi - lo;
        if (fractional - accumulated < span) {
            return lo + (fractional - accumulated);
        }
        accumulated += span;
    }

    // Fallback: first range start
    return ranges[0]![0];
}

/**
 * Generate a single random color within a preset's OKLCh constraints.
 * The result is gamut-mapped to sRGB and returned as a CSS string.
 */
export function generateSingleColor(
    preset: PresetName,
    rng: () => number = Math.random,
): string {
    const p = GENERATION_PRESETS[preset];

    const l = p.l[0] + rng() * (p.l[1] - p.l[0]);
    const c = p.c[0] + rng() * (p.c[1] - p.c[0]);
    const rawHue = rng() * 360;
    const h = clampHueToRanges(rawHue, p.h);

    // Convert OKLCh → XYZ → RGB
    const oklch = new OKLCHColor(l, c, h / 360); // h normalized to [0,1]
    const xyz = oklch2xyz(oklch);
    const rgb = xyz2rgb(xyz);

    // Gamut-map to sRGB
    const [r, g, b] = gamutMapSRGB(
        rgb.r as number,
        rgb.g as number,
        rgb.b as number,
    );

    // Return as CSS rgb() string (denormalized to 0–255)
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

/**
 * Generate a palette of N pleasing colors.
 *
 * @param count   Number of colors (1–50).
 * @param preset  Visual character preset.
 * @param harmony Hue distribution algorithm.
 * @param seed    Optional PRNG seed for reproducibility.
 * @returns Array of CSS color strings.
 */
export function generatePalette(
    count: number,
    preset: PresetName,
    harmony: HarmonyName,
    seed?: number,
): string[] {
    const rng = seed != null ? mulberry32(seed) : Math.random;
    const p = GENERATION_PRESETS[preset];

    // Seed hue: random start point
    const seedHue = rng() * 360;
    const hues = generateHues(count, harmony, seedHue, rng);

    return hues.map((hue) => {
        const l = p.l[0] + rng() * (p.l[1] - p.l[0]);
        const c = p.c[0] + rng() * (p.c[1] - p.c[0]);
        const h = clampHueToRanges(hue, p.h);

        const oklch = new OKLCHColor(l, c, h / 360);
        const xyz = oklch2xyz(oklch);
        const rgb = xyz2rgb(xyz);

        const [r, g, b] = gamutMapSRGB(
            rgb.r as number,
            rgb.g as number,
            rgb.b as number,
        );

        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    });
}

// ── Vue composable ──

export function useColorGeneration() {
    const preset = ref<PresetName>("vibrant");
    const harmony = ref<HarmonyName>("golden");
    const count = ref(5);
    const seed = ref(Math.floor(Math.random() * 0xffffffff));

    const palette = computed(() =>
        generatePalette(count.value, preset.value, harmony.value, seed.value),
    );

    function regenerate() {
        seed.value = Math.floor(Math.random() * 0xffffffff);
    }

    return {
        preset,
        harmony,
        count,
        seed,
        palette,
        regenerate,
    };
}
