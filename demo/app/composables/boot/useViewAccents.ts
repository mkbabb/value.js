/**
 * useViewAccents — the view-accent token WRITER (S.W7 · W7-4; slimmed at
 * T.W6 · W6-4).
 *
 * Consumes the pure resolver (`color-session/view-accent` — rotate → C-floor →
 * gamut-map → L re-guard → WCAG ≥3:1, all library ops) and writes the result
 * onto the document root as STATIC tokens, per accent change:
 *
 *   - `--accent-view` — the CURRENT view's resolved accent (`--primary`
 *     rides it in style.css, exactly as before);
 *   - `--palettes-ramp-0/1/2` — the guarded letterform ramp (T.W6 · W6-4;
 *     Q5 RULED: ONLY Palettes is chromatic in the nav — the dropdown entry
 *     and the Palettes title consume these three stops via the ONE
 *     `.palettes-ramp-text` recipe; resolver: `@composables/color/palettes-ramp`);
 *   (`--seal-ink`, the collapsed seal's icon ink, is written by the Dock on
 *   the seal, its one reader — o1105-r2 perf.)
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
 * a slider drag costs at most one `--accent-view` resolve per frame — the same clock the aurora/blob derives already ride; the
 * off-screen tokens (the ramps, the modal accent pair, the seal's gold) trail
 * the drag (OD19-V3 · o1105 U2).
 */

import { computed, watch } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";

import type { PaneConfig } from "../../../shell/viewSchema";
import {
    resolvePalettesRamp,
    RAMP_TEXT_CONTRAST_FLOOR,
    RAMP_LARGE_TEXT_CONTRAST_FLOOR,
} from "../../../color-session/palettes-ramp";
import {
    bumpProbeEpochOnMount,
    goldIdentityCss,
    resolveSurfaceLightnessLive,
} from "../../../color-session/useContrastSafeColor";
import {
    certifyAccentInk,
    certifyInkOnFill,
    contrastInkFor,
    GRAPHICS_CONTRAST_FLOOR,
} from "../../../color-session/ink";
import { resolveViewAccent } from "../../../color-session/view-accent";
import { useHeldWhileLive, useSettle } from "../../../color-session/useAtmosphereFrameCoalesce";

export interface UseViewAccentsOptions {
    /** The rAF-coalesced live OPAQUE colour — the wax the seal gold certifies on. */
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
    /**
     * X.W11.p4c (COHESION §0go.2(b)): starts the certifying watchers —
     * `useAtmosphereBoot`'s `certifyInks`, which runs them after first paint
     * when the shell is hydrated and at once otherwise. Absent: at once.
     */
    certifyInks?: (start: () => void) => void;
    /** o1105-r2 perf: true while a drag drives the colour (`pipeline.colourLive`). */
    colourLive: Readonly<Ref<boolean>>;
}

export function useViewAccents(options: UseViewAccentsOptions) {
    const {
        colourLive,
        cssColorOpaque,
        safeAccentCss,
        currentConfig,
        derivedLightness,
        certifyInks = (start) => start(),
    } = options;
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
    // per-site CERTIFIED OUTPUTS (never two mints). The ramp mint rides a
    // trailing settle off this watch (OD19-V3, below), not every frame.
    //
    // VJ-U-F26 (U.W-A11Y) — THE ONE-REFERENT CURE: `--accent-view` certifies
    // against `surfL` (the live-probed RESTING rung the ramp already uses),
    // NOT the page ambient `derivedLightness`. The ambient referent walked the
    // default-seed dark accent to a mid-relative L that breached its own 3:1
    // floor on the real (composited-away-from-mid) tier — measured 1.72:1
    // dark. Unifying accent + ramp onto ONE surface ground makes certified ≡
    // rendered. `derivedLightness` stays a watch dep only transitively (it
    // feeds `surfaceL`); the accent no longer reads the bare ambient.
    // X-DS pass 16 (V16-01): the MODAL ground — glass's floating plate over
    // its 50 % ink scrim over the ambient, the referent a dialog's text sits
    // on. The view accent `--primary` paints a dialog's text verbs (Cancel),
    // so the modal root gets its own certified accent and the ink that reads
    // on it as a fill.
    const modalL = computed(() =>
        resolveSurfaceLightnessLive("modal", derivedLightness.value, isDark.value),
    );
    // X.W11.p4c: every watcher below certifies (a WCAG walk), so it starts
    // through `certifyInks` — after first paint on a hydrated shell.
    // The current view's accent, live: it tracks every colour frame.
    const viewAccentCss = computed(() =>
        resolveViewAccent(
            safeAccentCss.value,
            currentConfig.value.accentHueShift ?? 0,
            surfaceL.value,
        ),
    );
    certifyInks(() => {
        // OD19-V3 · o1105 U2: `--accent-view` (the trigger/seal's live voice,
        // `--primary`) tracks every colour frame. The ramps, the modal accent pair and the admin seal's gold
        // are NOT on screen during a picker drag (the view menu and any dialog
        // are closed, the Palettes title is another view, the gold is the
        // admin seal's), yet each mint is a WCAG walk: on the drag clock they
        // cost a long frame per step. They mint once the input settles,
        // reading the latest inputs (so the settled tokens are byte-equal to a
        // per-frame mint), and at once on the first run, a view change or a
        // scheme flip, so a menu, title or dialog never opens stale.
        const settle = useSettle();
        const mintOffScreen = () => {
            const root = document.documentElement.style;
            const css = safeAccentCss.value;
            const surfL = surfaceL.value;
            const menuRamp = resolvePalettesRamp(css, surfL, RAMP_TEXT_CONTRAST_FLOOR);
            if (menuRamp) {
                menuRamp.forEach((stop, i) => {
                    root.setProperty(`--palettes-ramp-${i}`, stop);
                });
            }
            const titleRamp = resolvePalettesRamp(css, surfL, RAMP_LARGE_TEXT_CONTRAST_FLOOR);
            if (titleRamp) {
                titleRamp.forEach((stop, i) => {
                    root.setProperty(`--palettes-ramp-title-${i}`, stop);
                });
            }

            const mL = modalL.value;
            const shift = currentConfig.value.accentHueShift ?? 0;
            const accent = certifyAccentInk(resolveViewAccent(css, shift, mL) ?? css, mL);
            root.setProperty("--ink-modal-accent", accent);
            const onAccent = contrastInkFor(accent);
            if (onAccent) root.setProperty("--ink-modal-accent-fg", onAccent);

            // X-DS pass 17 (V17C-01): the admin seal's gold glyph sits on the
            // wax, so its gold is certified on the wax (hue kept, lightness
            // walked; a glyph, so the 3:1 floor). Where no gold clears the wax,
            // the token is removed and the seal falls back to `--seal-ink`.
            const gold = certifyInkOnFill(goldIdentityCss(isDark.value), cssColorOpaque.value, GRAPHICS_CONTRAST_FLOOR);
            if (gold) root.setProperty("--seal-ink-gold", gold);
            else root.removeProperty("--seal-ink-gold");
        };

        watch(
            [
                safeAccentCss,
                surfaceL,
                () => currentConfig.value.accentHueShift,
                isDark,
                modalL,
                cssColorOpaque,
            ],
            ([, , shift, dark], old) => {
                settle(mintOffScreen, !old || old[2] !== shift || old[3] !== dark);
            },
            { immediate: true },
        );
        // o1105-r2 perf: the root holds through a drag; the live value reaches
        // the accent's painted readers where they stand (useAtmosphereBoot).
        watch(
            useHeldWhileLive(viewAccentCss, colourLive),
            (resolved) => {
                if (resolved) {
                    document.documentElement.style.setProperty("--accent-view", resolved);
                }
            },
            { immediate: true },
        );
    });
    return { viewAccentCss };
}
