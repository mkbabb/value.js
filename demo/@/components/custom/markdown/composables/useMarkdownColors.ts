import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { computed, inject } from "vue";
import { parseCSSColor } from "@mkbabb/value.js/parsing";
import { colorUnit2 } from "@mkbabb/value.js/color";
import { INK_AMBIENT_KEY } from "@composables/color/keys";
import { certifyAccentInk } from "@composables/color/ink";
import { resolveSurfaceLightnessLive } from "@composables/color/useContrastSafeColor";

/**
 * Computes CSS custom properties for heading colors derived from the given CSS color.
 * Returns a computed ref of style variables keyed by `--md-color-*`.
 */
export function useMarkdownColors(cssColor: () => string | undefined) {
    // The ONE app dark store (glass-ui useGlobalDark singleton — the same
    // instance App.vue constructs). S.W4-8 retired this composable's private
    // vueuse useDark: parallel stores raced the initial scheme resolution
    // (design-docs-about P2-5's observed wrong-theme paint).
    const { isDark } = useGlobalDark();

    // D6 (T.W3-5 / h-wave-w2-w3 S1): this composable carried a local
    // BG_LIGHTNESS shadow-duplicate of the retired constants — the "every
    // consumer" claim's miss. The markdown body sits on the About card's
    // RESTING plate; its heading-ink referent is THAT tier's composited
    // lightness off the ONE live ambient source, never a page constant.
    const ambient = inject(INK_AMBIENT_KEY)!;

    const mdColorVars = computed(() => {
        const colorStr = cssColor();
        if (!colorStr) return {};

        try {
            const parsed = parseCSSColor(colorStr);
            if (!parsed) return {};

            // Normalize to [0,1] then convert to OKLCH
            const oklch = colorUnit2(parsed, "oklch", false, false, false);
            const L = oklch.value.l.value;
            const C = oklch.value.c.value;
            const H = oklch.value.h.value;

            const bgL = resolveSurfaceLightnessLive(
                "resting",
                ambient.value,
                isDark.value,
            );

            // Denormalize: L [0,1]→[0,1], C [0,1]→[0,0.5], H [0,1]→[0,360];
            // boost chroma slightly for headings.
            const headingC = Math.max(C * 0.5, 0.08);

            // S.W4-8 — the register boundary: letterforms speak ONE ink.
            // The safe accent is minted once (the h2 rung, full strength);
            // the h3/h4 rung derives by mixing toward the body ink at φ⁻¹ —
            // an L/C step down the SAME hue, never a hue spin. (The former
            // +40°/+20° per-level rotation painted sibling headings cyan and
            // green simultaneously — a rainbow sampler, not one accent
            // voice. Hue-variation belongs to color-DATA surfaces, never
            // type — design-docs-about P2-3.) The oklab mix against the
            // scheme's neutral foreground lowers C and moves L toward ink,
            // correctly in BOTH schemes, with no second color minted.
            //
            // T.W3-5: the guard is `certifyAccentInk` — the D6 certified-ink
            // path (distance guard + gamut-map + WCAG floor walk), keyed on
            // the plate referent above; the former bare `computeSafeAccent`
            // stopped at the distance heuristic.
            const accent = certifyAccentInk(
                `oklch(${L} ${headingC} ${H * 360})`,
                bgL,
            );

            return {
                "--md-color-h2": accent,
                "--md-color-h3": `color-mix(in oklab, ${accent} 61.8%, var(--foreground))`,
                "--md-color-accent": accent,
            } as Record<string, string>;
        } catch {
            return {};
        }
    });

    return { mdColorVars };
}
