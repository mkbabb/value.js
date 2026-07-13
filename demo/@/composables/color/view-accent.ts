/**
 * view-accent — the gamut-guarded accent resolver, RELOCATED to the shared
 * color layer (U.W-DEMO · U-F45; a byte-preserving architectural transposition
 * of the resolver formerly at `color-picker/composables/boot/view-accents.ts`).
 *
 * WHY IT LIVES HERE (the G-DEMO-1 cure): the resolver is pure library-math
 * (its only deps are `@mkbabb/value.js/color`, `@mkbabb/value.js/math`,
 * `@lib/color-utils` — all shared-layer-safe), and the shared color spine
 * (`palettes-ramp.ts`) CONSUMES it. Its former home in app-root boot forced
 * the spine to reach UP across the layer boundary (a raw-relative
 * `../../../color-picker/...` bypass that closed a near-cycle with
 * `boot/useViewAccents`, which reaches DOWN into `palettes-ramp`). Moving the
 * resolver DOWN to its natural home beside `useContrastSafeColor.ts` / `ink.ts`
 * dissolves the near-cycle: `palettes-ramp` now imports a SIBLING, and boot's
 * `useViewAccents` / `resolveSealInk` import DOWN from here (the correct
 * direction — app-root depends on the lower layer). The pipeline math is
 * UNCHANGED (a pure move, no logic edit).
 *
 * The eat-your-own-dogfood fix (design-dock-shell P1-4/P1-5): the demo used to
 * outsource the per-view hue turn to a CSS relative-color derivation
 * (`oklch(from var(--accent-live) l c calc(h + shift))`) and TRUST the
 * browser's gamut clamp. Measured false: at the default pick (C ≈ 0.27, far
 * outside sRGB at cyan/green hues) the browser's chroma-reduction bends the
 * painted L per hue — mix 2.74:1 and generate 2.77:1 failed even the 3:1
 * WCAG 1.4.11 graphics floor — and at C ≈ 0 all nine rotations collapse to
 * ONE gray (the navigation's chromatic grammar vanishes for achromatic picks).
 *
 * This module derives each view's accent THROUGH THE LIBRARY instead
 * (consume, never re-derive — the §Triumvirate clause):
 *
 *   1. rotate the OKLCH hue by the view's schema-declared shift;
 *   2. apply the low-C floor so achromatic picks keep a legible chromatic
 *      axis (the floor is library-anchored: 4 × the OKLab JND — four
 *      just-noticeable-differences of chromatic distance from gray, an
 *      unmistakably-chromatic read, never a hand-tuned magic color);
 *   3. gamut-map to the cusp with the Ottosson analytical mapper
 *      (`gamutMapOKLab` — hue-exact, adaptive-L0), so the painted sRGB is
 *      OURS, not the browser clamp's;
 *   4. re-guard L against the scheme background (`computeSafeAccent`, the
 *      same leaf the live accent rides) + re-map (the guard preserves hue;
 *      the map keeps the guarded L honest);
 *   5. verify the WCAG 1.4.11 graphics floor (≥ 3:1) with the library's
 *      `wcagContrastRatio` leaf, walking L away from the background (and
 *      re-mapping) until it clears — a deterministic library-driven solve,
 *      never nine hand-tuned literals.
 *
 * The composable half (`boot/useViewAccents`) writes the result as STATIC
 * root tokens per accent change — the current view's `--accent-view` (plus
 * the W6-4 letterform-ramp trio, resolved by `@composables/color/palettes-ramp`)
 * — consuming the W3-7 mechanism decision
 * (`docs/tranches/S/audit/w3-7-hue-sweep-retirement.md` §2): the
 * `:root`-inherited `--view-hue-shift` transition tax is retired with it.
 * (T.W6 · W6-4, the T-10 excise: the NINE per-view static tokens and their
 * `resolveViewAccentTokens` batch resolver are DEAD — the menu speaks ink;
 * `resolveViewAccent` survives as the CURRENT-view resolver, byte-preserved.)
 *
 * The seal-ink helper (`resolveSealInk`) STAYS in boot (it is an app-root
 * seal concern) but shares this module's private-domain helpers — it imports
 * `tryParseOklch` + `publicOklch` DOWN from here (boot → shared, correct).
 *
 * Pure module — no Vue, no DOM. Unit-probed by `test/view-accents.test.ts`.
 */

import {
    OKLCHColor,
    computeSafeAccent,
    wcagContrastRatio,
} from "@mkbabb/value.js/color";
import {
    DELTA_E_OK_JND,
    gamutMapOKLab,
    rawOklab2oklch,
    rawOklch2oklab,
} from "@mkbabb/value.js/color";
import { getColorSpaceBound } from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";
import { cssToRawColor } from "@lib/color-utils";

/**
 * The low-C floor for the view axis, in RAW OKLCH chroma: 4 OKLab JNDs of
 * chromatic distance from the neutral axis (`DELTA_E_OK_JND` ≈ 0.02 — the
 * library's own perceptual constant). At or above four JNDs a hue reads
 * unmistakably chromatic, so nine 40°-spaced rotations of an achromatic pick
 * fan out into nine DISTINCT view accents instead of one gray.
 */
export const VIEW_ACCENT_MIN_CHROMA = 4 * DELTA_E_OK_JND;

/** WCAG 1.4.11 non-text (graphics/UI) contrast floor — the spec constant. */
export const GRAPHICS_CONTRAST_FLOOR = 3;

/** L solver step for the WCAG floor walk (≈ one guard nudge per iteration). */
const GUARD_STEP_L = 0.04;
/** Walk bound: 12 × 0.04 = 0.48 of L travel — past any reachable failure. */
const MAX_GUARD_STEPS = 12;

/** Raw-domain OKLCH triple: L ∈ [0,1] · C physical (≈[0,0.4]) · H degrees. */
export interface RawOklch {
    L: number;
    C: number;
    H: number;
}

/** Gamut-map a raw OKLCH triple to the sRGB cusp (hue-exact, library map). */
function mapToGamut(L: number, C: number, H: number): RawOklch {
    const [l, a, b] = rawOklch2oklab(L, C, H);
    const [lm, am, bm] = gamutMapOKLab(l, a, b);
    const [Lm, Cm, Hm] = rawOklab2oklch(lm, am, bm);
    // The mapper is hue-exact by construction; keep the INPUT hue so a
    // near-zero-chroma atan2 can never smear the axis (the stableHue lesson).
    return { L: Lm, C: Cm, H: Cm < 1e-6 ? H : Hm };
}

/** Public-domain OKLCH color (L [0,1] · C [0,0.5] · H deg) for the WCAG leaves. */
export function publicOklch(L: number, C: number, H: number): OKLCHColor {
    return new OKLCHColor(L, C, H, 1);
}

/** Null-tolerant parse: `parseCSSColor` THROWS on malformed input; the
 *  resolver contract is null-on-failure (the caller keeps the last token). */
export function tryParseOklch(css: string): ReturnType<typeof cssToRawColor> {
    try {
        return cssToRawColor(css, "oklch");
    } catch {
        return null;
    }
}

/**
 * Resolve ONE view accent: rotate → C-floor → gamut-map → L re-guard →
 * WCAG ≥3:1 verify (all library ops — see the module doc pipeline).
 *
 * @param liveCss  the contrast-guarded LIVE accent (`--accent-live`'s value)
 * @param shiftDeg the view's schema-declared OKLCH hue rotation (degrees)
 * @param bgL      scheme background lightness in OKLab [0,1]
 * @returns        a resolved `oklch(…)` string, or null on parse failure
 */
export function resolveViewAccent(
    liveCss: string,
    shiftDeg: number,
    bgL: number,
): string | null {
    const live = tryParseOklch(liveCss);
    if (!live) return null;

    // Normalized [0,1] → raw domain through the library's own range table
    // (the safeAccentCssString denorm pattern — never a hardcoded 0.5/360).
    const cMax = getColorSpaceBound("oklch", "c", "number").max;
    const hMax = getColorSpaceBound("oklch", "h", "number").max;
    const L0 = live.l as number;
    const C0 = (live.c as number) * cMax;
    let H = ((live.h as number) * hMax + shiftDeg) % 360;
    if (H < 0) H += 360;

    // 2 — the low-C floor (the achromatic-pick survival clause).
    // 3 — gamut-map to the cusp.
    let { L, C } = mapToGamut(L0, Math.max(C0, VIEW_ACCENT_MIN_CHROMA), H);

    // 4 — re-guard L against the scheme background (the library's own
    // OKLab-distance guard), then re-map: the guard moves L (hue untouched);
    // the guarded point may sit outside the boundary at high C.
    const safe = computeSafeAccent(L, C, H, bgL);
    if (safe.L !== L || safe.C !== C) {
        ({ L, C } = mapToGamut(
            safe.L,
            Math.max(safe.C, VIEW_ACCENT_MIN_CHROMA),
            H,
        ));
    }

    // 5 — the WCAG 1.4.11 graphics floor, verified with the library's
    // contrast-ratio leaf; walk L away from the background until it clears.
    const bg = publicOklch(bgL, 0, 0);
    const away = bgL < 0.5 ? 1 : -1;
    for (
        let i = 0;
        i < MAX_GUARD_STEPS &&
        wcagContrastRatio(publicOklch(L, C, H), bg) < GRAPHICS_CONTRAST_FLOOR;
        i++
    ) {
        ({ L, C } = mapToGamut(
            clamp(L + away * GUARD_STEP_L, 0.02, 0.98),
            C,
            H,
        ));
    }

    return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(1)})`;
}
