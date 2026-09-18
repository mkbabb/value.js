import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { computed, inject } from "vue";
import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import { INK_AMBIENT_KEY } from "../../../../color-session/keys";
import { certifyAccentInk } from "../../../../color-session/ink";
import { resolveSurfaceLightnessLive } from "../../../../color-session/useContrastSafeColor";

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

        const parsed = parseCssColor(colorStr);
        if (!parsed.ok) {
            throw new Error(`[MarkdownColors] invalid CSS color: ${parsed.diagnostics[0].code}`);
        }
        const converted = convertColor(parsed.value, "oklch");
        if (!converted.ok) {
            throw new Error(`[MarkdownColors] OKLCH conversion failed: ${converted.error.code}`);
        }
        const [L, C, H] = converted.value.channels;
        if (L === "none" || C === "none") {
            throw new Error("[MarkdownColors] OKLCH lightness and chroma are required");
        }

        const bgL = resolveSurfaceLightnessLive(
            "resting",
            ambient.value,
            isDark.value,
        );

        // A powerless color has no hue to intensify; chromatic headings keep
        // a modest floor without inventing a hue for neutral input.
        const headingC = H === "none" ? 0 : Math.max(C, 0.08);
        const headingH = H === "none" ? 0 : H;

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
            `oklch(${L} ${headingC} ${headingH})`,
            bgL,
        );

        return {
            "--md-color-h2": accent,
            "--md-color-h3": `color-mix(in oklab, ${accent} 61.8%, var(--foreground))`,
            "--md-color-accent": accent,
        } as Record<string, string>;
    });

    return { mdColorVars };
}
