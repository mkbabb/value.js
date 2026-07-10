import { computed, type ComputedRef } from "vue";
import { useDark } from "@vueuse/core";
import { safeAccentCssString, needsContrastAdjustment } from "@mkbabb/value.js/color";
import { cssToRawColor } from "@lib/color-utils";

/**
 * Background lightness constants (OKLab L) for the app's light/dark themes.
 *
 * These correspond to the --background CSS variable:
 *   light: hsl(0 0% 100%)   → OKLab L ≈ 1.0
 *   dark:  hsl(224 71% 4%)  → OKLab L ≈ 0.15
 *
 * Exported (S.W7 · W7-4): `useViewAccents` re-guards the per-view accent
 * tokens against the SAME scheme lightness the live accent rides — one
 * source, never a second pair of constants.
 */
export const BG_LIGHTNESS_DARK = 0.15;
export const BG_LIGHTNESS_LIGHT = 0.97;

/**
 * The contrast guard, sourced ENTIRELY from the library (S.W2-2 ⊣ W1-6): the
 * demo carries NO norm/denorm color math. `cssToRawColor` lifts a CSS string to
 * a normalized-domain `Color<number>` (the inv-N-3 single resolution path);
 * `needsContrastAdjustment` decides whether the guard must fire (identical
 * threshold to `safeAccentCssString`, so a no-op is skippable for best
 * fidelity); `safeAccentCssString` owns the guard AND the [0,1]→CSS denorm
 * (the retired `C * 0.5` / `H * 360` magic literals now come from the library's
 * own range table).
 *
 * @param css   an OPAQUE CSS color string (the accent is opaque by design — the
 *              guarded output is `oklch(L C H)` with no alpha clause)
 * @param bgL   background surface lightness in OKLab [0,1]
 * @returns     the original string when contrast suffices, else a guarded
 *              `oklch(…)` string
 */
function guardedAccentCss(css: string, bgL: number): string {
    const color = cssToRawColor(css, "oklch");
    if (!color) return css;
    // No adjustment needed — return the original for best fidelity (the library
    // would otherwise re-express a sufficient-contrast color as oklch).
    if (!needsContrastAdjustment(color, bgL)) return css;
    return safeAccentCssString(color, bgL);
}

/**
 * Computes a contrast-safe accent color CSS string from the live picked color.
 *
 * When the picked color is too close in lightness to the UI background
 * (e.g. near-black in dark mode, near-white in light mode), the returned
 * `safeAccentCss` shifts lightness while preserving hue and chroma.
 *
 * Usage: provide via SAFE_ACCENT_KEY and inject in components that use the
 * accent color for text, icons, or borders (not for background fills).
 */
export function useContrastSafeColor(cssColorOpaque: ComputedRef<string>) {
    const isDark = useDark({ disableTransition: false });

    const safeAccentCss = computed(() => {
        const bgL = isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT;
        return guardedAccentCss(cssColorOpaque.value, bgL);
    });

    const needsAdjustment = computed(() => {
        return safeAccentCss.value !== cssColorOpaque.value;
    });

    return { safeAccentCss, needsAdjustment };
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
        return guardedAccentCss(css, bgL);
    }

    return { safeCss };
}
