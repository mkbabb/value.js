/**
 * useAtmosphereBoot — the demo's atmosphere + accent-token boot region, lifted
 * from App.vue at S.W5 (row-8 god-module cap: App.vue had grown past 400 LoC
 * with the W6 atmosphere/entrance work). MUST be called during component setup:
 * it `provide`s SAFE_ACCENT_KEY (and, via useAtmosphere, AURORA_ATOMS_KEY +
 * BLOB_CONFIG_KEY) and installs the root-document token watchers — so App.vue
 * keeps only the canvas mount + the picker's synchronous CSS_COLOR_KEY provide.
 *
 * It owns the three atmosphere/entrance side-effects that write the document
 * root:
 *
 *   1. THE ACCENT AXIS (R.W3 Lane A / A2) — the contrast-guarded live colour is
 *      mirrored onto the `--accent-live` root token (the SAME library
 *      `safeAccentColor` computation SAFE_ACCENT_KEY provides — ONE
 *      color-resolution path, inv-N-3; no bespoke resolver). style.css re-points
 *      `--primary` and the glass frost's `--glass-tint-source` onto it, so the
 *      interactive layer and the plate temperature speak the picked colour.
 *      W3-1 (S.W3): the contrast solve runs off the rAF-coalesced colour (one
 *      solve/frame under a drag); the picker keeps the synchronous
 *      `cssColorOpaque` via CSS_COLOR_KEY, provided by App.
 *      T.W3-5 (D6, the M-15 thread): the solve's referent is the atmosphere's
 *      LIVE `derivedLightness` (provided onward via INK_AMBIENT_KEY), and the
 *      same instance stamps `--ink-muted` — the floor-clamped plate
 *      de-emphasis rung (the BG_LIGHTNESS constants are retired everywhere).
 *
 *   2. THE PER-VIEW ACCENT (S.W7 · W7-4, superseding R.W4 B2's CSS
 *      relative-color derivation) — `useViewAccents` resolves each view's
 *      accent THROUGH THE LIBRARY (rotate hue → low-C floor → gamut-map to
 *      the cusp → L re-guard → WCAG ≥3:1) and writes it as static root
 *      tokens: `--accent-view-<id>` × 9 + the current `--accent-view`
 *      (`--primary` rides it) + `--seal-ink`. The `--view-hue-shift`
 *      relative-color path and its `:root` transition tax are retired
 *      (the W3-7 mechanism decision, consumed here).
 *
 *   3. THE ATMOSPHERE (N.W5.B) — delegated to useAtmosphere (atoms, render-mode
 *      tiering, seed guards, blob ramp); seeded by the same rAF-coalesced colour
 *      so the aurora seed + blob palette derives fire once per frame, not 60×/s
 *      under a slider drag. `auroraArrived` keys the W6-1 canvas derive-in.
 *
 *      W7-3 (luma truth): the atmosphere canvas carries glass-ui's ONE
 *      field-canvas convention stamp `data-glass-field-canvas` (declared in
 *      App's template — attributes are template truth). Every backdrop-
 *      luminance sampler (GlassDock's default-on observer today, any future
 *      glass surface) auto-discovers THIS canvas as its `backgroundCanvas` and
 *      samples the live field; an unreadable/unpainted WebGL readback falls to
 *      the static stack-walk via the producer's L4 alpha-floor cure (glass-ui
 *      `9db65db7`), never a luma-0 lie. One stamp threads the canvas
 *      consistently for every present and future sampling surface.
 */

import { watch, provide } from "vue";
import type { ComputedRef, ShallowRef } from "vue";

import { INK_AMBIENT_KEY, SAFE_ACCENT_KEY } from "../../../color-session/keys";
import type { PaneConfig } from "../../../shell/useViewManager";
import { useContrastSafeColor } from "../../../color-session/useContrastSafeColor";
import { useViewAccents } from "./useViewAccents";
import { useAtmosphere } from "./useAtmosphere";

export function useAtmosphereBoot(
    atmosphereCanvas: Readonly<ShallowRef<HTMLCanvasElement | null>>,
    // W3-1 (S.W3): the rAF-COALESCED opaque colour (`pipeline.cssColorOpaqueFrame`),
    // the seed for BOTH the accent axis and the aurora/blob derives.
    atmosphereColor: ComputedRef<string>,
    // The active view's config — its schema-declared accentHueShift drives the
    // per-view accent token.
    currentConfig: ComputedRef<PaneConfig>,
) {
    // 1 — the atmosphere: aurora + hero-blob palette coupling (provides
    //     AURORA_ATOMS_KEY + BLOB_CONFIG_KEY on the caller's scope). Ordered
    //     FIRST since M-15: the atmosphere exposes the live `derivedLightness`
    //     (the D6 page-ambient referent) BOTH accent resolvers consume.
    const { auroraCssGradient, auroraArrived, derivedLightness } = useAtmosphere(
        atmosphereCanvas,
        atmosphereColor,
    );

    // 2 — the accent axis (W3-5 threads the M-15 exposed value): the live
    //     colour certified against the LIVE ambient — never the retired
    //     BG_LIGHTNESS constants — mirrored onto `--accent-live` and provided
    //     via SAFE_ACCENT_KEY. The ambient referent itself is provided
    //     (INK_AMBIENT_KEY) so tier-seated consumers (`useSafeAccentFn`,
    //     `useMarkdownColors`) key their own rung's composited lightness off
    //     the ONE source. The de-emphasis rung rides the same instance:
    //     `--ink-muted` is the floor-clamped certified plate ink (D6/F-4 —
    //     the plate-caption + parse-echo voice; post-hoc opacity died).
    const { safeAccentCss, mutedInkCss } = useContrastSafeColor(
        atmosphereColor,
        derivedLightness,
    );
    provide(SAFE_ACCENT_KEY, safeAccentCss);
    provide(INK_AMBIENT_KEY, derivedLightness);
    watch(
        safeAccentCss,
        (css) => {
            document.documentElement.style.setProperty("--accent-live", css);
        },
        { immediate: true },
    );
    watch(
        mutedInkCss,
        (css) => {
            document.documentElement.style.setProperty("--ink-muted", css);
        },
        { immediate: true },
    );
    // The PUBLISHED page-ambient referent (the D6 "tiers publish effective
    // lightness" stake, executed demo-side for the page tier): the exact
    // number every certified ink keyed on, stamped so consumers + the O-18
    // census read the SAME referent the guard used — never a re-derivation.
    watch(
        derivedLightness,
        (l) => {
            document.documentElement.style.setProperty(
                "--ink-ambient-l",
                l.toFixed(4),
            );
        },
        { immediate: true },
    );

    // 3 — the per-view accent (W7-4): the library-resolved static tokens —
    //     `--accent-view-<id>` × 9 + `--accent-view` + `--seal-ink` — written
    //     per accent change on the same rAF-coalesced clock. M-15: the WCAG
    //     referent is the atmosphere's live derived lightness, never the
    //     BG_LIGHTNESS constants (retired from this path).
    useViewAccents({
        cssColorOpaque: atmosphereColor,
        safeAccentCss,
        currentConfig,
        derivedLightness,
    });

    return { auroraCssGradient, auroraArrived };
}
