/**
 * view-accents — the gamut-guarded per-view accent resolver (S.W7 · W7-4).
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
 * The composable half (`@composables/color/useViewAccents`) writes the result
 * as 9 STATIC root tokens per accent change (`--accent-view-<viewId>`) plus
 * the current view's `--accent-view` — consuming the W3-7 mechanism decision
 * (`docs/tranches/S/audit/w3-7-hue-sweep-retirement.md` §2): the
 * `:root`-inherited `--view-hue-shift` transition tax is retired with it.
 *
 * The 10th token (`--seal-ink`, the SEEDS.md w7 rider): the wax seal's icon
 * ink resolves from the WAX color's own luminance through the library's
 * `contrast-color()` leaf (`contrastColor` — the WCAG black/white endpoint
 * picker), so the flip threshold is library-derived, not a CSS literal.
 *
 * Pure module — no Vue, no DOM. Unit-probed by `test/view-accents.test.ts`
 * (the §Hard-gate 3 contrast probe: 9 views × achromatic + chromatic picks).
 */

import {
    OKLCHColor,
    computeSafeAccent,
    contrastColor,
    wcagContrastRatio,
} from "@src/units/color";
import {
    DELTA_E_OK_JND,
    gamutMapOKLab,
    rawOklabToOklch,
    rawOklchToOklab,
} from "@src/units/color/gamut";
import { getColorSpaceBound } from "@src/units/color/constants";
import { clamp } from "@src/math";
import { cssToRawColor } from "./color-utils";

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
    const [l, a, b] = rawOklchToOklab(L, C, H);
    const [lm, am, bm] = gamutMapOKLab(l, a, b);
    const [Lm, Cm, Hm] = rawOklabToOklch(lm, am, bm);
    // The mapper is hue-exact by construction; keep the INPUT hue so a
    // near-zero-chroma atan2 can never smear the axis (the stableHue lesson).
    return { L: Lm, C: Cm, H: Cm < 1e-6 ? H : Hm };
}

/** Public-domain OKLCH color (L [0,1] · C [0,0.5] · H deg) for the WCAG leaves. */
function publicOklch(L: number, C: number, H: number): OKLCHColor {
    return new OKLCHColor(L, C, H, 1);
}

/** Null-tolerant parse: `parseCSSColor` THROWS on malformed input; the
 *  resolver contract is null-on-failure (the caller keeps the last token). */
function tryParseOklch(css: string): ReturnType<typeof cssToRawColor> {
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

/**
 * Resolve the wax seal's icon ink from the WAX color itself (the SEEDS.md w7
 * rider, absorbed): the library's eager `contrast-color()` — WCAG-maximal
 * black or white against the wax — replaces the seed's interim CSS
 * relative-color flip (threshold L 0.62 literal). The threshold is now the
 * WCAG crossover the library owns, not a stylesheet constant.
 *
 * @param waxCss the live OPAQUE picked color (the WatercolorDot's wax)
 * @returns      `oklch(0 0 0)` | `oklch(1 0 0)`, or null on parse failure
 */
export function resolveSealInk(waxCss: string): string | null {
    const wax = tryParseOklch(waxCss);
    if (!wax) return null;
    const cMax = getColorSpaceBound("oklch", "c", "number").max;
    const hMax = getColorSpaceBound("oklch", "h", "number").max;
    const ink = contrastColor(
        publicOklch(
            wax.l as number,
            (wax.c as number) * cMax,
            (wax.h as number) * hMax,
        ),
    );
    // The leaf returns pure black or pure white (the CSS Color 5 endpoints);
    // re-express in the house oklch voice.
    return (ink.r as number) === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
}

/**
 * Resolve the full static token set for one accent state: every primary
 * view's `--accent-view-<id>` token. Pure — the composable owns the writes.
 *
 * @param liveCss the contrast-guarded live accent
 * @param shifts  viewId → hue-shift map (the caller passes the schema's
 *                primary rows; this module stays Vue-free)
 * @param bgL     scheme background lightness in OKLab [0,1]
 */
export function resolveViewAccentTokens(
    liveCss: string,
    shifts: Readonly<Record<string, number>>,
    bgL: number,
): Record<string, string> {
    const tokens: Record<string, string> = {};
    for (const [id, shift] of Object.entries(shifts)) {
        const resolved = resolveViewAccent(liveCss, shift, bgL);
        if (resolved) tokens[`--accent-view-${id}`] = resolved;
    }
    return tokens;
}
