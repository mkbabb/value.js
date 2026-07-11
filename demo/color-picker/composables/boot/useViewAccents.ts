/**
 * useViewAccents — the view-accent token WRITER (S.W7 · W7-4; slimmed at
 * T.W6 · W6-4).
 *
 * Consumes the pure resolver (`./view-accents` — rotate → C-floor →
 * gamut-map → L re-guard → WCAG ≥3:1, all library ops) and writes the result
 * onto the document root as STATIC tokens, per accent change:
 *
 *   - `--accent-view` — the CURRENT view's resolved accent (`--primary`
 *     rides it in style.css, exactly as before);
 *   - `--palettes-ramp-0/1/2` — the guarded letterform ramp (T.W6 · W6-4;
 *     Q5 RULED: ONLY Palettes is chromatic in the nav — the dropdown entry
 *     and the Palettes title consume these three stops via the ONE
 *     `.palettes-ramp-text` recipe; resolver: `@composables/color/palettes-ramp`);
 *   - `--seal-ink` — the SEEDS.md w7 rider: the collapsed seal's icon ink,
 *     WCAG-derived from the WAX color via the library's `contrast-color()`
 *     leaf (the Dock writer consumes it).
 *
 * THE T-10 EXCISE (T.W6 · W6-4 — the owner overrule of W7-4's color-wheel
 * legend, R1): the NINE per-view static tokens (`--accent-view-<id>`), their
 * `resolveViewAccentTokens` batch resolver, and the `PRIMARY_VIEW_IDS`/
 * `PRIMARY_VIEW_SHIFTS` machinery are DEAD — the menu speaks ink now; the
 * navigation names its view in hue at exactly ONE point (the trigger/seal,
 * `--accent-view`). Perf dividend on the W3-1 drag clock: the per-accent
 * resolve drops 10 solves → 2 + the 3 ramp stops (each up to a 12-step WCAG
 * walk + gamut maps).
 *
 * This CONSUMES the W3-7 mechanism decision (`audit/w3-7-hue-sweep-retirement.md`
 * §2, form A): the `:root`-inherited `--view-hue-shift` transition tax is
 * retired — the tokens are resolved JS-side and SNAP on the root (one cheap
 * recalc per accent/view change, never a per-frame whole-tree
 * inherited-property invalidation); the view-switch hue SWEEP survives on
 * the BOUNDED accent-painting scope (`DockViewSelect`'s trigger transitions
 * the registered `--accent-view` locally).
 *
 * Recompute cadence: the accent seed is the rAF-COALESCED colour (W3-1), so
 * a slider drag costs at most one resolve set per frame — the same clock the
 * aurora/blob derives already ride.
 */

import { watch } from "vue";
import type { ComputedRef } from "vue";

import type { PaneConfig } from "@composables/viewSchema";
import { resolvePalettesRamp } from "@composables/color/palettes-ramp";
import { resolveSealInk, resolveViewAccent } from "./view-accents";

export interface UseViewAccentsOptions {
    /** The rAF-coalesced live OPAQUE colour — the seal-ink (wax) source. */
    cssColorOpaque: ComputedRef<string>;
    /** The contrast-guarded live accent — the rotation base. */
    safeAccentCss: ComputedRef<string>;
    /** The active view's config — its `accentHueShift` keys `--accent-view`. */
    currentConfig: ComputedRef<PaneConfig>;
    /**
     * M-15 (T.W2-routed; D6): the atmosphere's LIVE derived lightness — the
     * page-ambient the accents actually composite over (exposed by
     * useAtmosphere as the mean OKLab L of the resolved field palette). The
     * former BG_LIGHTNESS_DARK/LIGHT constants (0.15/0.97) were a FALSE
     * referent (A11Y-F1: measured composited ambient 0.376–0.936) — their
     * consumption is RETIRED from this path; W3-5 threads the exposed value
     * to the remaining non-boot consumers.
     */
    derivedLightness: ComputedRef<number>;
}

export function useViewAccents(options: UseViewAccentsOptions): void {
    const { cssColorOpaque, safeAccentCss, currentConfig, derivedLightness } =
        options;

    // The CURRENT view's accent — `--primary` rides it (style.css). Admin
    // views carry shift 0, so admin surfaces keep the live-accent voice.
    // The SAME watch writes the guarded letterform ramp (W6-4): the ramp is
    // a pure function of the same two inputs (accent + ambient), so the one
    // watch stays the one writer — no second clock, no second mint.
    // D6 honesty note: the referent is the SURFACE (the live field), and the
    // field's L band does not move on a scheme flip today (GAP-L2 — the dark
    // lBand rides P1/W7); when it lands, the ambient ref carries the flip
    // automatically.
    watch(
        [safeAccentCss, derivedLightness, () => currentConfig.value.accentHueShift],
        ([css, bgL, shift]) => {
            const root = document.documentElement.style;
            const resolved = resolveViewAccent(css, shift ?? 0, bgL);
            if (resolved) {
                root.setProperty("--accent-view", resolved);
            }
            const ramp = resolvePalettesRamp(css, bgL);
            if (ramp) {
                ramp.forEach((stop, i) => {
                    root.setProperty(`--palettes-ramp-${i}`, stop);
                });
            }
        },
        { immediate: true },
    );

    // The seal ink — keyed by the WAX (the live opaque colour), not the
    // guarded accent: the seal's WatercolorDot paints the raw pick.
    watch(
        cssColorOpaque,
        (css) => {
            const ink = resolveSealInk(css);
            if (ink) {
                document.documentElement.style.setProperty("--seal-ink", ink);
            }
        },
        { immediate: true },
    );
}
