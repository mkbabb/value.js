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
 *
 *   2. THE PER-VIEW ACCENT (R.W4 Lane B / B2) — each view's schema-declared hue
 *      shift lands on the `--view-hue-shift` root token; style.css derives
 *      `--accent-view` from the R.W3 axis via CSS relative colour (zero JS
 *      colour math), and `--primary` rides it — so navigation reads
 *      chromatically everywhere the interactive layer paints.
 *
 *   3. THE ATMOSPHERE (N.W5.B) — delegated to useAtmosphere (atoms, render-mode
 *      tiering, seed guards, blob ramp); seeded by the same rAF-coalesced colour
 *      so the aurora seed + blob palette derives fire once per frame, not 60×/s
 *      under a slider drag. `auroraArrived` keys the W6-1 canvas derive-in.
 */

import { watch, provide } from "vue";
import type { ComputedRef, ShallowRef } from "vue";

import { SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import type { PaneConfig } from "@composables/useViewManager";
import { useContrastSafeColor } from "./useContrastSafeColor";
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
    // 1 — the accent axis: mirror the contrast-guarded live colour onto
    //     `--accent-live`, and provide the same computation via SAFE_ACCENT_KEY.
    const { safeAccentCss } = useContrastSafeColor(atmosphereColor);
    provide(SAFE_ACCENT_KEY, safeAccentCss);
    watch(
        safeAccentCss,
        (css) => {
            document.documentElement.style.setProperty("--accent-live", css);
        },
        { immediate: true },
    );

    // 2 — the per-view accent: the schema hue shift lands on `--view-hue-shift`.
    watch(
        () => currentConfig.value.accentHueShift,
        (deg) => {
            document.documentElement.style.setProperty(
                "--view-hue-shift",
                String(deg ?? 0),
            );
        },
        { immediate: true },
    );

    // 3 — the atmosphere: aurora + hero-blob palette coupling (provides
    //     AURORA_ATOMS_KEY + BLOB_CONFIG_KEY on the caller's scope).
    const { auroraCssGradient, auroraArrived } = useAtmosphere(
        atmosphereCanvas,
        atmosphereColor,
    );

    return { auroraCssGradient, auroraArrived };
}
