/**
 * ink-walk — THE RAW-OKLCH DOMAIN BRIDGE + THE WCAG GAMUT-CUSP CERTIFICATION
 * WALK (the pure numeric core the three `ink.ts` public rungs consume).
 *
 * Lifted from `ink.ts` at T.W6.5 close (the PP-8 cohesion cure — an
 * architectural transposition per `MANDATE §0.6`: "architectural transpositions
 * in the sake of elegance, simplicity, and performance"): the CSS→raw-OKLCH
 * parse, the hue's gamut-ceiling geometry, and the WCAG floor walk are this
 * module's STATELESS arithmetic. `ink.ts` keeps the surface-referent model
 * (`resolveSurfaceLightness`) + the three certified-ink rungs (`certifyAccentInk`
 * / `resolveMutedInk` / `contrastInkFor`) that COMPOSE over this core. The import
 * is one-directional (`ink.ts` → here); no Vue, no DOM. Unit-probed transitively
 * by `test/ink.test.ts` through the `ink.ts` public API.
 */

import {
    OKLCHColor,
    findCusp,
    findGamutIntersection,
    getColorSpaceBound,
    wcagContrastRatio,
} from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";
import { cssToRawColor } from "@lib/color-utils";

/** L solver step for the floor walk (the view-accents walk idiom). */
const WALK_STEP_L = 0.04;
/** Walk bound: 24 × 0.04 = 0.96 of L travel — past any reachable failure. */
const MAX_WALK_STEPS = 24;

const cMax = getColorSpaceBound("oklch", "c", "number").max;
const hMax = getColorSpaceBound("oklch", "h", "number").max;

/** Raw-domain OKLCH triple: L ∈ [0,1] · C physical · H degrees. */
export interface RawOklch {
    L: number;
    C: number;
    H: number;
}

/** Parse a CSS color to the raw OKLCH domain (null-tolerant, house contract). */
export function tryParseRawOklch(css: string): RawOklch | null {
    let parsed: ReturnType<typeof cssToRawColor>;
    try {
        parsed = cssToRawColor(css, "oklch");
    } catch {
        return null;
    }
    if (!parsed) return null;
    return {
        L: parsed.l as number,
        C: (parsed.c as number) * cMax,
        H: (parsed.h as number) * hMax,
    };
}

/**
 * The hue's gamut geometry, hoisted once per walk: the max in-gamut chroma at
 * lightness L along a FIXED hue is the horizontal ray from (L, 0) through
 * (L, 1) meeting the sRGB boundary — the library's own okhsl idiom
 * (`findGamutIntersection` with L0 = L1 returns t = C_max directly, off the
 * hue's `findCusp` solve). This is the CUSP the certification walk rides
 * (T.W6.5 row 7 · t33-research §5.1b).
 */
function hueGamutCeiling(H: number): (L: number) => number {
    const hr = (H * Math.PI) / 180;
    const a_ = Math.cos(hr);
    const b_ = Math.sin(hr);
    const cusp = findCusp(a_, b_);
    return (L: number) =>
        Math.max(0, findGamutIntersection(a_, b_, L, 1, L, cusp));
}

/** Public-domain OKLCH color for the WCAG leaves. */
export function publicOklch(L: number, C: number, H: number): OKLCHColor {
    return new OKLCHColor(L, C, H, 1);
}

export function ratioAgainst(ink: RawOklch, surfaceL: number): number {
    return wcagContrastRatio(
        publicOklch(ink.L, ink.C, ink.H),
        publicOklch(surfaceL, 0, 0),
    );
}

/**
 * Walk an ink's L away from the surface until it clears `target`, riding the
 * hue's GAMUT CUSP at every step (the view-accents WCAG-walk idiom,
 * generalized to the text floor). Direction is CHOSEN BY REACH — the WCAG
 * metric is asymmetric (from a mid ground, black ink tops out at ~3.5:1 while
 * white clears 6:1), so the walk prefers the ink's current side of the
 * surface but flips when the other side's NEUTRAL endpoint bound is strictly
 * stronger and the current side cannot reach the target.
 *
 * THE CUSP WALK (T.W6.5 row 7 · T-35 · t33-research §5.1): each candidate
 * carries `C = min(inkC, C_max(L))` — the ink's OWN chroma wherever the hue
 * slice permits it, the boundary where the slice narrows — never the former
 * constant-C-then-clamp, whose per-step gamut projection collapsed chroma
 * monotonically (the cream collapse: the owner brick walked to
 * `oklch(0.97 0.014 32.6)`). The certified ink lands at the most chromatic
 * point that clears the floor; chroma concedes further ONLY at the gamut's
 * physical edge (the terminal yield below), because the floor outranks the
 * identity — but nothing else does.
 *
 * When NO side can reach the target (a theoretical mid-ground sliver), the
 * walk lands at the strongest achievable ink — which still clears the 4.5
 * floor at the WCAG worst case.
 */
export function walkToFloor(ink: RawOklch, surfaceL: number, target: number): RawOklch {
    const ceilingAt = hueGamutCeiling(ink.H);
    const candidate = (L: number): RawOklch => ({
        L,
        C: Math.min(ink.C, ceilingAt(L)),
        H: ink.H,
    });

    let cur = candidate(clamp(ink.L, 0.02, 0.98));
    if (ratioAgainst(cur, surfaceL) >= target) return cur;

    // Neutral endpoint bounds (C=0 — the cusp pinches to neutral at the
    // extremes anyway, and the neutral bound is the honest ceiling).
    const upMax = ratioAgainst({ L: 0.98, C: 0, H: ink.H }, surfaceL);
    const dnMax = ratioAgainst({ L: 0.02, C: 0, H: ink.H }, surfaceL);
    let dir: 1 | -1 = cur.L >= surfaceL ? 1 : -1;
    const curMax = dir === 1 ? upMax : dnMax;
    const otherMax = dir === 1 ? dnMax : upMax;
    if (curMax < target && otherMax > curMax) dir = dir === 1 ? -1 : 1;

    for (
        let i = 0;
        i < MAX_WALK_STEPS && ratioAgainst(cur, surfaceL) < target;
        i++
    ) {
        cur = candidate(clamp(cur.L + dir * WALK_STEP_L, 0.02, 0.98));
    }

    // Terminal chroma yield: only when even the L-extreme candidate sits
    // under target does chroma concede toward neutral (halving steps — the
    // old walk's neutral-endpoint guarantee, preserved).
    for (
        let i = 0;
        i < 12 && ratioAgainst(cur, surfaceL) < target && cur.C > 1e-4;
        i++
    ) {
        cur = { L: cur.L, C: cur.C / 2, H: cur.H };
    }
    return cur;
}

/** Serialize a raw-OKLCH triple to a CSS `oklch(…)` literal. */
export const asOklchCss = ({ L, C, H }: RawOklch): string =>
    `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(1)})`;
