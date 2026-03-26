import { clamp } from "../../math";
import { OKLCHColor } from ".";
import type { Color } from ".";
import { color2 } from "./utils";

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

    oklch.l = safe.L;
    oklch.c = safe.C;
    oklch.h = safe.H;

    return oklch;
}
