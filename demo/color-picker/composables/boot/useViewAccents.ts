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

import { computed, watch } from "vue";
import type { ComputedRef } from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";

import type { PaneConfig } from "../../../shell/viewSchema";
import {
    resolvePalettesRamp,
    RAMP_TEXT_CONTRAST_FLOOR,
    RAMP_LARGE_TEXT_CONTRAST_FLOOR,
} from "../../../color-session/palettes-ramp";
import {
    bumpProbeEpochOnMount,
    resolveSurfaceLightnessLive,
} from "../../../color-session/useContrastSafeColor";
import { resolveViewAccent } from "../../../color-session/view-accent";
import { resolveSealInk } from "./view-accents";

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
    const { isDark } = useGlobalDark();

    // T.W8 · WR-8 — the ramp writer folds the ink.ts LIVE surface probe into
    // its own computeds (the ConsoleRail idiom, `useContrastSafeColor` doc):
    // register the mount-truth signal so the first (pre-connection) probe
    // re-drives once the DOM is attached. Idempotent-ish (increments the
    // shared epoch on THIS composable's mount) — the sibling
    // `useContrastSafeColor` in the same boot bumps it too; either re-drives
    // the surface computeds below through ordinary reactivity.
    bumpProbeEpochOnMount();

    // WR-8 root 1 — THE CARD SURFACE the two ramp sites sit on (D6: the
    // referent is a property of the surface, never the page ambient).
    // Resolved LIVE + SCHEME-TRUE through the ink.ts surface machinery (the
    // probe cache is keyed on the `.dark` class, so a scheme flip self-heals)
    // — the cure for the scheme-blindness the landed page-ambient referent
    // shipped (GAP-L2: the field L band does not flip on scheme — probed
    // `--ink-ambient-l` ≈ 0.77 in BOTH schemes — so the ambient could never
    // carry the flip). BOTH ramp sites sit on RESTING-class plates: the pane
    // title on the pane card; the dock view dropdown's SelectContent glass —
    // MEASURED (T.W8 probe, owner seed, both schemes) — composites like the
    // resting model (dark lum .097 vs resting .084 vs the far-too-dark
    // floating .046; light .753 vs .739 vs .815), so the resting referent is
    // the empirically-true surface for the popover, not the thin floating
    // tint. The per-site SPLIT is therefore the FLOOR (root 3), not the
    // surface. This computed tracks the probe epoch + scheme + ambient,
    // re-firing the watch on any.
    const surfaceL = computed(() =>
        resolveSurfaceLightnessLive(
            "resting",
            derivedLightness.value,
            isDark.value,
        ),
    );

    // The CURRENT view's accent — `--primary` rides it (style.css). Admin
    // views carry shift 0, so admin surfaces keep the live-accent voice.
    // The SAME watch writes the guarded letterform ramp (W6-4): ONE watch,
    // ONE writer — no second clock, no second mint. The ramp now resolves
    // PER SITE (WR-8 root 3): the ~16px menu entry at the 4.5 text floor
    // (`--palettes-ramp-0/1/2`, the DockViewSelect consume, unchanged), the
    // display-scale pane title at the 3:1 large-text floor
    // (`--palettes-ramp-title-0/1/2`, aliased into the `.palettes-ramp-text`
    // recipe by PalettesPane) — each against ITS OWN surface, one resolver,
    // per-site CERTIFIED OUTPUTS (never two mints).
    //
    // VJ-U-F26 (U.W-A11Y) — THE ONE-REFERENT CURE: `--accent-view` certifies
    // against `surfL` (the live-probed RESTING rung the ramp already uses),
    // NOT the page ambient `derivedLightness`. The ambient referent walked the
    // default-seed dark accent to a mid-relative L that breached its own 3:1
    // floor on the real (composited-away-from-mid) tier — measured 1.72:1
    // dark. Unifying accent + ramp onto ONE surface ground makes certified ≡
    // rendered. `derivedLightness` stays a watch dep only transitively (it
    // feeds `surfaceL`); the accent no longer reads the bare ambient.
    watch(
        [
            safeAccentCss,
            surfaceL,
            () => currentConfig.value.accentHueShift,
        ],
        ([css, surfL, shift]) => {
            const root = document.documentElement.style;
            const resolved = resolveViewAccent(css, shift ?? 0, surfL);
            if (resolved) {
                root.setProperty("--accent-view", resolved);
            }
            const menuRamp = resolvePalettesRamp(
                css,
                surfL,
                RAMP_TEXT_CONTRAST_FLOOR,
            );
            if (menuRamp) {
                menuRamp.forEach((stop, i) => {
                    root.setProperty(`--palettes-ramp-${i}`, stop);
                });
            }
            const titleRamp = resolvePalettesRamp(
                css,
                surfL,
                RAMP_LARGE_TEXT_CONTRAST_FLOOR,
            );
            if (titleRamp) {
                titleRamp.forEach((stop, i) => {
                    root.setProperty(`--palettes-ramp-title-${i}`, stop);
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
