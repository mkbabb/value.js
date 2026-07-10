/**
 * useViewAccents — the per-view accent token WRITER (S.W7 · W7-4).
 *
 * Consumes the pure resolver (`@lib/view-accents` — rotate → C-floor →
 * gamut-map → L re-guard → WCAG ≥3:1, all library ops) and writes the result
 * onto the document root as STATIC tokens, per accent change:
 *
 *   - `--accent-view-<id>` × 9 — one gamut-guarded token per primary view
 *     (the dock menu's color-wheel legend reads these);
 *   - `--accent-view` — the CURRENT view's resolved accent (`--primary`
 *     rides it in style.css, exactly as before);
 *   - `--seal-ink` — the 10th token (SEEDS.md w7 rider): the collapsed
 *     seal's icon ink, WCAG-derived from the WAX color via the library's
 *     `contrast-color()` leaf (the Dock writer consumes it).
 *
 * This CONSUMES the W3-7 mechanism decision (`audit/w3-7-hue-sweep-retirement.md`
 * §2, form A): the `:root`-inherited `--view-hue-shift` transition tax is
 * retired in the same change — the tokens are resolved JS-side and SNAP on
 * the root (one cheap recalc per accent/view change, never a per-frame
 * whole-tree inherited-property invalidation); the view-switch hue SWEEP
 * survives on the BOUNDED accent-painting scope (`DockViewSelect`'s trigger
 * transitions the registered `--accent-view` locally).
 *
 * Recompute cadence: the accent seed is the rAF-COALESCED colour (W3-1), so
 * a slider drag costs at most one 10-token resolve per frame — the same
 * clock the aurora/blob derives already ride.
 */

import { watch } from "vue";
import type { ComputedRef } from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";

import { VIEW_MAP } from "@composables/viewSchema";
import type { PaneConfig, ViewId } from "@composables/viewSchema";
import {
    resolveSealInk,
    resolveViewAccent,
    resolveViewAccentTokens,
} from "./view-accents";
import {
    BG_LIGHTNESS_DARK,
    BG_LIGHTNESS_LIGHT,
} from "@composables/color/useContrastSafeColor";

/**
 * The nine primary views — every non-admin `VIEW_MAP` row. Admin views stay
 * at shift 0 by schema (admin identity is the gold accent, not a hue turn)
 * and never mint a token of their own.
 */
export const PRIMARY_VIEW_IDS = (Object.keys(VIEW_MAP) as ViewId[]).filter(
    (id) => !id.startsWith("admin-"),
);

/** viewId → schema hue shift for the primary views (the resolver's input). */
export const PRIMARY_VIEW_SHIFTS: Readonly<Record<string, number>> =
    Object.fromEntries(
        PRIMARY_VIEW_IDS.map((id) => [id, VIEW_MAP[id].accentHueShift]),
    );

export interface UseViewAccentsOptions {
    /** The rAF-coalesced live OPAQUE colour — the seal-ink (wax) source. */
    cssColorOpaque: ComputedRef<string>;
    /** The contrast-guarded live accent — the rotation base. */
    safeAccentCss: ComputedRef<string>;
    /** The active view's config — its `accentHueShift` keys `--accent-view`. */
    currentConfig: ComputedRef<PaneConfig>;
}

export function useViewAccents(options: UseViewAccentsOptions): void {
    const { cssColorOpaque, safeAccentCss, currentConfig } = options;
    const { isDark } = useGlobalDark();
    const bgL = () => (isDark.value ? BG_LIGHTNESS_DARK : BG_LIGHTNESS_LIGHT);

    // The 9 static per-view tokens — recomputed per accent change + scheme flip.
    watch(
        [safeAccentCss, isDark],
        ([css]) => {
            const root = document.documentElement.style;
            const tokens = resolveViewAccentTokens(
                css,
                PRIMARY_VIEW_SHIFTS,
                bgL(),
            );
            for (const [name, value] of Object.entries(tokens)) {
                root.setProperty(name, value);
            }
        },
        { immediate: true },
    );

    // The CURRENT view's accent — `--primary` rides it (style.css). Admin
    // views carry shift 0, so admin surfaces keep the live-accent voice.
    watch(
        [safeAccentCss, isDark, () => currentConfig.value.accentHueShift],
        ([css, , shift]) => {
            const resolved = resolveViewAccent(css, shift ?? 0, bgL());
            if (resolved) {
                document.documentElement.style.setProperty(
                    "--accent-view",
                    resolved,
                );
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
