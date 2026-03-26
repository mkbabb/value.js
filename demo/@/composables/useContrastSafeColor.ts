import { computed, type ComputedRef, type Ref, type ShallowRef } from "vue";
import { useDark } from "@vueuse/core";
import { colorUnit2 } from "@src/units/color/normalize";
import { computeSafeAccent } from "@src/units/color/contrast";
import { parseCSSColor } from "@src/parsing/color";
import type { ColorModel } from "@components/custom/color-picker";
import type { ValueUnit } from "@src/units";
import type { Color } from "@src/units/color";

/**
 * Background lightness constants (OKLab L) for the app's light/dark themes.
 *
 * These correspond to the --background CSS variable:
 *   light: hsl(0 0% 100%)   → OKLab L ≈ 1.0
 *   dark:  hsl(224 71% 4%)  → OKLab L ≈ 0.15
 */
const BG_LIGHTNESS_DARK = 0.15;
const BG_LIGHTNESS_LIGHT = 0.97;

/**
 * Computes a contrast-safe accent color CSS string from the current color model.
 *
 * When the picked color is too close in lightness to the UI background
 * (e.g. near-black in dark mode, near-white in light mode), the returned
 * `safeAccentCss` shifts lightness while preserving hue and chroma.
 *
 * Usage: provide via SAFE_ACCENT_KEY and inject in components that use the
 * accent color for text, icons, or borders (not for background fills).
 */
export function useContrastSafeColor(
    model: ShallowRef<ColorModel>,
    cssColorOpaque: ComputedRef<string>,
) {
    const isDark = useDark({ disableTransition: false });

    const safeAccentCss = computed(() => {
        const bgL = isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT;

        // Convert the current color to OKLCH (normalized [0,1])
        try {
            const oklch = colorUnit2(model.value.color, "oklch", true, false, false);
            const L = oklch.value.l.value;
            const C = oklch.value.c.value;
            const H = oklch.value.h.value;

            const safe = computeSafeAccent(L, C, H, bgL);

            // No adjustment needed — return original for best fidelity
            if (safe.L === L && safe.C === C && safe.H === H) {
                return cssColorOpaque.value;
            }

            // Denormalize OKLCH from [0,1] to physical ranges:
            //   L: [0,1] → [0,1] (identity)
            //   C: [0,1] → [0,0.5] (×0.5)
            //   H: [0,1] → [0,360] (×360)
            const denormL = safe.L;
            const denormC = safe.C * 0.5;
            const denormH = safe.H * 360;

            return `oklch(${denormL.toFixed(3)} ${denormC.toFixed(4)} ${denormH.toFixed(1)})`;
        } catch {
            return cssColorOpaque.value;
        }
    });

    const needsAdjustment = computed(() => {
        return safeAccentCss.value !== cssColorOpaque.value;
    });

    return { safeAccentCss, needsAdjustment };
}

/**
 * Convert any CSS color string to a contrast-safe variant for the current theme.
 * Returns the original string if contrast is sufficient, otherwise an adjusted oklch() string.
 */
function safeAccentFromCss(css: string, bgL: number): string {
    try {
        const parsed = parseCSSColor(css) as ValueUnit<Color<ValueUnit<number>>, "color"> | null;
        if (!parsed) return css;

        // parsed has physical values — normalize first, then convert
        const oklch = colorUnit2(parsed, "oklch", false, false, false);
        const L = oklch.value.l.value;
        const C = oklch.value.c.value;
        const H = oklch.value.h.value;

        const safe = computeSafeAccent(L, C, H, bgL);
        if (safe.L === L && safe.C === C && safe.H === H) return css;

        const denormL = safe.L;
        const denormC = safe.C * 0.5;
        const denormH = safe.H * 360;
        return `oklch(${denormL.toFixed(3)} ${denormC.toFixed(4)} ${denormH.toFixed(1)})`;
    } catch {
        return css;
    }
}

/**
 * Reactive composable that provides a `safeCss(color)` function
 * for converting any CSS color string to a contrast-safe variant.
 *
 * Use this in components that display arbitrary palette colors as text/borders.
 */
export function useSafeAccentFn() {
    const isDark = useDark({ disableTransition: false });

    function safeCss(css: string): string {
        const bgL = isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT;
        return safeAccentFromCss(css, bgL);
    }

    return { safeCss };
}
