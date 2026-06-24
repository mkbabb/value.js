import { clamp } from "../../math";
import { ch, OKLCHColor, RGBColor, LinearSRGBColor } from ".";
import type { Color } from ".";
import { color2 } from "./dispatch";
import { normalizeColor } from "./normalize";

// ── WCAG 2.x relative-luminance + contrast-ratio (CSS Color 5 `contrast-color()`) ──
//
// VJ-Q1 (Tranche Q, 1.1.1 — the library-LEADS catch-up). The WCAG metric is
// DISTINCT from the OKLab-lightness-distance `computeSafeAccent`/`safeAccentColor`
// helpers below: those measure a perceptual L delta for decorative-accent
// readability; `contrast-color()` (CSS Color L7, Baseline April 2026) is defined
// against the WCAG 2.x sRGB relative-luminance + contrast-ratio, which picks a
// DIFFERENT black/white near the contrast boundary. Reusing the OKLab helper here
// would pick the wrong endpoint — so this is a clean, dedicated leaf.
//
// DOMAIN CONTRACT: these leaves accept a PUBLIC-domain `Color` — the natural
// construction `new RGBColor(255, 0, 0)` and every `parseCSSColor` result (RGB
// in [0,255], OKLCH L in [0,1], hue in degrees, …). The leaf normalizes the
// input itself (`normalizeColor`) before converting through `color2(...,
// "srgb-linear")` — which performs the cross-space transform AND the sRGB gamma
// decode in one step. So there is no caller-visible [0,255]↔[0,1] domain
// ambiguity and no manual transfer-function call.

/** WCAG relative-luminance coefficients (Rec. 709 / sRGB primaries). */
const WCAG_R_COEFF = 0.2126;
const WCAG_G_COEFF = 0.7152;
const WCAG_B_COEFF = 0.0722;

/**
 * WCAG 2.x relative luminance of a color — the linear-light sRGB luminance
 * `0.2126·R + 0.7152·G + 0.0722·B`, where R/G/B are the gamma-decoded
 * (linear-light) sRGB channels in [0, 1].
 *
 * Accepts a PUBLIC-domain `Color` (RGB in [0,255], as `new RGBColor(255,…)` /
 * `parseCSSColor` produce). The leaf normalizes the input ([0,1] internal
 * domain), then converts to linear-light sRGB via `color2(color, "srgb-linear")`
 * (the cross-space transform AND the gamma decode in one step), then applies the
 * Rec. 709 luminance coefficients. This is the canonical WCAG relative-luminance
 * per the CSS Color 5 `contrast-color()` definition — NOT the OKLab lightness
 * `computeSafeAccent` consumes.
 *
 * @param color any PUBLIC-domain `Color`
 * @returns relative luminance in [0, 1]
 */
export function wcagRelativeLuminance(color: Color): number {
    // Normalize a CLONE to the [0,1] internal domain (never mutate the caller's
    // color), then convert to linear-light sRGB.
    const normalized = normalizeColor(
        color.clone() as Color<number>,
    ) as unknown as Color<number>;

    const lin =
        normalized.colorSpace === "srgb-linear"
            ? (normalized as LinearSRGBColor)
            : (color2(normalized, "srgb-linear") as LinearSRGBColor);

    return (
        WCAG_R_COEFF * (lin.r as number) +
        WCAG_G_COEFF * (lin.g as number) +
        WCAG_B_COEFF * (lin.b as number)
    );
}

/**
 * WCAG 2.x contrast ratio between two colors — `(L1 + 0.05) / (L2 + 0.05)`,
 * where `L1 ≥ L2` are the relative luminances. The result is in [1, 21] (1:1 for
 * identical luminance, 21:1 for black-on-white).
 */
export function wcagContrastRatio(a: Color, b: Color): number {
    const la = wcagRelativeLuminance(a);
    const lb = wcagRelativeLuminance(b);
    const lighter = Math.max(la, lb);
    const darker = Math.min(la, lb);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * The maximally-contrasting of black/white against `color`, per the WCAG 2.x
 * contrast ratio — the eager evaluation of CSS Color 5 `contrast-color(<color>)`.
 *
 * Returns pure black (`rgb(0 0 0)`) or pure white (`rgb(255 255 255)`),
 * whichever yields the higher WCAG contrast ratio against the argument. Ties
 * (luminance exactly at the geometric mean `√0.0525 − 0.05 ≈ 0.179`) resolve to
 * black, matching the CSS spec's "prefer the color that comes first" when both
 * are equally contrasting (black is listed first in the implicit `[black, white]`
 * color list).
 */
export function contrastColor(color: Color): RGBColor {
    const black = new RGBColor(0, 0, 0, 1);
    const white = new RGBColor(255, 255, 255, 1);
    const lum = wcagRelativeLuminance(color);
    // contrast(white) = (1.05) / (lum + 0.05); contrast(black) = (lum + 0.05) / 0.05.
    // white wins iff its ratio strictly exceeds black's. The crossover is at
    // lum = √0.0525 − 0.05 ≈ 0.1791; at the tie we prefer black (spec-first).
    const contrastWhite = 1.05 / (lum + 0.05);
    const contrastBlack = (lum + 0.05) / 0.05;
    return contrastWhite > contrastBlack ? white : black;
}

/**
 * Minimum OKLab lightness distance for readable accent text/icons.
 * 0.35 is more aggressive than WCAG 4.5:1 (~0.25–0.30 in OKLab L)
 * but ensures clear visibility for small decorative UI elements.
 */
const DEFAULT_MIN_CONTRAST = 0.35;

/**
 * Compute a contrast-safe OKLCH tuple by shifting lightness away from
 * the background when the original color is too close.
 *
 * Preserves hue; reduces chroma at extreme lightness to stay in gamut.
 *
 * @param L  OKLab/OKLCH lightness [0, 1]
 * @param C  OKLCH chroma (normalized [0, 1], physical max ~0.5)
 * @param H  OKLCH hue in degrees [0, 360]
 * @param bgLightness  background surface lightness in OKLab [0, 1]
 * @param minContrast  minimum lightness distance (default 0.35)
 * @returns adjusted { L, C, H } tuple
 */
export function computeSafeAccent(
    L: number,
    C: number,
    H: number,
    bgLightness: number,
    minContrast: number = DEFAULT_MIN_CONTRAST,
): { L: number; C: number; H: number } {
    const deltaL = Math.abs(L - bgLightness);

    if (deltaL >= minContrast) {
        return { L, C, H };
    }

    // Push lightness away from the background
    const darkBg = bgLightness < 0.5;
    let targetL = darkBg
        ? bgLightness + minContrast
        : bgLightness - minContrast;

    targetL = clamp(targetL, 0.05, 0.95);

    // If clamping put us back too close, try the opposite direction
    if (Math.abs(targetL - bgLightness) < minContrast * 0.8) {
        targetL = darkBg
            ? clamp(bgLightness - minContrast, 0.05, 0.95)
            : clamp(bgLightness + minContrast, 0.05, 0.95);
    }

    // Reduce chroma at extreme lightness to prevent out-of-gamut results
    const extremity = Math.max(0, Math.abs(targetL - 0.5) - 0.3);
    const adjustedC = C * (1 - 0.5 * extremity);

    return { L: targetL, C: adjustedC, H };
}

/**
 * Extract OKLCH lightness from any Color by converting through OKLab.
 */
export function getOklchLightness(color: Color): number {
    const oklch = color.colorSpace === "oklch"
        ? (color as OKLCHColor)
        : color2(color, "oklch") as OKLCHColor;
    return oklch.l as number;
}

/**
 * Check if a color needs contrast adjustment against a background.
 */
export function needsContrastAdjustment(
    color: Color,
    bgLightness: number,
    minContrast: number = DEFAULT_MIN_CONTRAST,
): boolean {
    const L = getOklchLightness(color);
    return Math.abs(L - bgLightness) < minContrast;
}

/**
 * Convert any Color to a contrast-safe OKLCHColor for use as foreground
 * text/icons against a background of the given lightness.
 *
 * If the color already has sufficient contrast, returns an OKLCH clone
 * of the original (no adjustment).
 */
export function safeAccentColor(
    color: Color,
    bgLightness: number,
    minContrast: number = DEFAULT_MIN_CONTRAST,
): OKLCHColor {
    const oklch = color.colorSpace === "oklch"
        ? (color as OKLCHColor).clone()
        : color2(color, "oklch") as OKLCHColor;

    const L = oklch.l as number;
    const C = oklch.c as number;
    const H = oklch.h as number;

    const safe = computeSafeAccent(L, C, H, bgLightness, minContrast);

    oklch.l = ch(safe.L);
    oklch.c = ch(safe.C);
    oklch.h = ch(safe.H);

    return oklch;
}
