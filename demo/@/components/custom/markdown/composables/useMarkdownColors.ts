import { useDark } from "@vueuse/core";
import { computed } from "vue";
import { parseCSSColor } from "@src/parsing/color";
import { computeSafeAccent } from "@src/units/color/contrast";
import { colorUnit2 } from "@src/units/color/normalize";
import type { ValueUnit } from "@src/units";
import type { Color } from "@src/units/color";

const BG_LIGHTNESS_DARK = 0.15;
const BG_LIGHTNESS_LIGHT = 0.97;

/**
 * Computes CSS custom properties for heading colors derived from the given CSS color.
 * Returns a computed ref of style variables keyed by `--md-color-*`.
 */
export function useMarkdownColors(cssColor: () => string | undefined) {
    const isDark = useDark({ disableTransition: false });

    const mdColorVars = computed(() => {
        const colorStr = cssColor();
        if (!colorStr) return {};

        try {
            const parsed = parseCSSColor(colorStr) as ValueUnit<Color<ValueUnit<number>>, "color"> | null;
            if (!parsed) return {};

            // Normalize to [0,1] then convert to OKLCH
            const oklch = colorUnit2(parsed, "oklch", false, false, false);
            const L = oklch.value.l.value;
            const C = oklch.value.c.value;
            const H = oklch.value.h.value;

            const bgL = isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT;
            const safe = computeSafeAccent(L, C, H, bgL, 0.35);

            // Denormalize: L [0,1]→[0,1], C [0,1]→[0,0.5], H [0,1]→[0,360]
            const denormL = safe.L;
            const denormC = safe.C * 0.5;
            const denormH = safe.H * 360;

            // Boost chroma slightly for headings
            const headingC = Math.max(denormC, 0.08);

            return {
                "--md-color-h2": `oklch(${denormL} ${headingC} ${denormH})`,
                "--md-color-h3": `oklch(${denormL} ${headingC} ${(denormH + 40) % 360})`,
                "--md-color-accent": `oklch(${denormL} ${headingC} ${(denormH + 20) % 360})`,
            } as Record<string, string>;
        } catch {
            return {};
        }
    });

    return { mdColorVars };
}
