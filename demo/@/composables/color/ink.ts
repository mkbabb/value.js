/**
 * ink — THE INK-ON-TIER CERTIFIED-CONTRAST CONTRACT (D6, T.W3-5).
 *
 * *The referent is a property of the surface the text sits on, never a global
 * constant.* The former `BG_LIGHTNESS_DARK/LIGHT` pair (0.15/0.97) claimed to
 * be "the `--background` CSS variable" — false for everything the app actually
 * paints: `style.css`'s `body` rule makes `--background` a mere fallback
 * behind the atmosphere's live `--saved-bg`, and every glass surface
 * composites that live tint at its own alpha (measured ambient 0.376–0.936 —
 * t-a11y-contrast F-1). This module is the ONE place the demo turns a
 * surface into a contrast referent:
 *
 *   - `resolveSurfaceLightness` — the page ambient (the atmosphere's live
 *     `derivedLightness`) composited through the material ladder's rung
 *     alphas (D1: resting plate · floating chrome/menus · the opaque well).
 *   - `certifyAccentInk` — the live-color ink path: the library's OKLab
 *     distance guard, then a WCAG floor WALK along the hue's GAMUT CUSP — a
 *     pass by construction, never a distance heuristic against an assumed
 *     number (the `resolveSealInk`/`--seal-ink` exemplar, generalized — it
 *     resolves ink from the ACTUAL surface it sits on). T.W6.5 row 7 (T-35,
 *     t33-research §5.1): each walk step rides the MOST CHROMATIC in-gamut
 *     point at its L (the pick's own C where the hue slice permits, the
 *     boundary where it narrows) — the former constant-C-then-clamp walk
 *     collapsed the owner brick to cream (`oklch(0.97 0.014 32.6)`); "the
 *     current contrast friendly color" now stays the CURRENT color.
 *   - `resolveMutedInk` — de-emphasis as a designed RUNG of certified ink: a
 *     φ⁻¹-complement step of the foreground toward the surface, floor-clamped
 *     by `wcagContrastRatio`, so "quieter" and "illegible" can never collapse
 *     into the same number (the guard-then-alpha class dies — F-4).
 *   - `contrastInkFor` — WCAG-maximal ink over an arbitrary live fill (the
 *     F-3 fg/bg double-duty split's second, dependent guard).
 *
 * INTERIM TIER TABLE (BOOKED SWAP — T.W3 §BOOKS "The P3/P5 tier-lightness
 * contract row"): until the producer tiers PUBLISH effective lightness
 * (glass-ui packet P3/P5, consumed at W7), this module threads TODAY'S known
 * composited values — the producer's shipped `--card`/`--foreground` literals
 * (glass-ui `dist/styles/tokens/color-radius.css` + `dark-arm.css`, parsed
 * through the library at module init — never a hand-computed lightness), the
 * shipped rung alphas `--glass-opacity-resting/floating` (`glass.css` +
 * `dark-arm.css`, at `--glass-level: 1`), and the LANE-MEASURED floating
 * chrome tint (F-1's live composites — evidence-cited below).
 *
 * Pure module — no Vue, no DOM. Unit-probed by `test/ink.test.ts`.
 */

import { computeSafeAccent, contrastColor } from "@mkbabb/value.js/color";
import {
    asOklchCss,
    publicOklch,
    ratioAgainst,
    tryParseRawOklch,
    walkToFloor,
    type RawOklch,
} from "./ink-walk";

/** The material-ladder surfaces a demo ink can sit on (D1 rung vocabulary;
 *  `chrome` = the dock band — true floating glass at its own, thinner α;
 *  `veil` = the producer veil card (`veil-surface`, quiet-rung glass) seated
 *  as an IN-PLATE fixture — its backdrop is the resting plate, never the
 *  bare page ambient (T.W6.5-P · T-34, the owner's Q4 material re-cut). */
export type InkSurface = "page" | "resting" | "floating" | "well" | "chrome" | "veil";

/** WCAG 1.4.3 small-text contrast floor — the spec constant. */
export const TEXT_CONTRAST_FLOOR = 4.5;

/** WCAG 1.4.11 non-text (graphics) contrast floor — the spec constant. The
 *  GRAPHICS rung of the same contract (T.W6.5 row 9 / T-44a): slider tracks,
 *  meter rails, and their kin certify at THIS floor against their ground. */
export const GRAPHICS_CONTRAST_FLOOR = 3;

/**
 * Certification headroom: the floor walk lands at `floor + headroom`, so the
 * asserted floor survives the referent instrument's tolerance (the census
 * measures each consumer's REAL composited ground; the runtime referent is
 * the tier recipe's live tint α-composited with the field-mean ambient —
 * close, never byte-identical). Dies with the P3/P5 published tier
 * lightnesses at W7.
 */
export const CERTIFY_HEADROOM = 1.25;

/** A tier tint resolved LIVE from the painted recipe (the reactive layer's
 *  ink-probe instrument — `useContrastSafeColor.resolveLiveTint`). */
export interface SurfaceTint {
    /** the tint's own OKLab lightness */
    L: number;
    /** the recipe's effective alpha over the backdrop */
    alpha: number;
}

// --- the interim producer table (BOOKED SWAP → P3/P5, W7) -------------------

/** Producer theme literals — glass-ui tokens/{color-radius,dark-arm}.css. */
const PRODUCER_TINTS = {
    card: { light: "hsl(30 85% 96%)", dark: "hsl(26 22% 17%)" },
    foreground: { light: "hsl(24 10% 10%)", dark: "hsl(30 14% 90%)" },
} as const;

/**
 * Producer rung alphas — `--glass-opacity-resting/floating` (glass.css light
 * arm, dark-arm.css dark arm), at the shipped `--glass-level: 1`. The well is
 * OPAQUE by rung definition (the C5/Q4 determinism dividend) — no alpha row.
 */
const RUNG_ALPHA = {
    resting: { light: 0.65, dark: 0.72 },
    floating: { light: 0.8, dark: 0.88 },
    // The QUIET rung — the veil card's material (`--glass-opacity-quiet`,
    // glass.css light arm / dark-arm.css; the `veil-surface` @utility rides
    // it at `--glass-level: 1`). Static model only — the live probe reads
    // the painted `veil-surface` recipe (W55 adaptive tint included).
    quiet: { light: 0.5, dark: 0.58 },
} as const;

/**
 * The FLOATING rung's tint is NOT the bare `--card` literal — the popover/
 * dock chrome recipe layers frost above the card mix, and the lane MEASURED
 * the real composites (t-a11y-contrast F-1: menu content L 0.936 light /
 * 0.379 dark at ambient 0.63, α 0.808/0.894). These are the solved tint
 * lightnesses that reproduce those measurements through the α-composite
 * below — today's known composited values, threaded (the §BOOKS interim);
 * the P3/P5 published tier lightness replaces the whole table at W7.
 */
const FLOATING_TINT_L = { light: 1.0, dark: 0.345 } as const;

/** `--well-bg` mirror: 8% `--foreground` into `--card`, oklab (style.css). */
const WELL_FOREGROUND_FRACTION = 0.08;

/** Module-init parse of the producer literals — library-derived, never a
 *  hand-computed lightness. A producer-literal parse failure is a build-time
 *  defect (the literals are static), surfaced loudly. */
function producerLightness(css: string): number {
    const raw = tryParseRawOklch(css);
    if (!raw) throw new Error(`[ink] producer literal failed to parse: ${css}`);
    return raw.L;
}

const CARD_L = {
    light: producerLightness(PRODUCER_TINTS.card.light),
    dark: producerLightness(PRODUCER_TINTS.card.dark),
} as const;

const FOREGROUND = {
    light: tryParseRawOklch(PRODUCER_TINTS.foreground.light)!,
    dark: tryParseRawOklch(PRODUCER_TINTS.foreground.dark)!,
} as const;

// --- the surface referent ----------------------------------------------------

/**
 * Resolve a ladder surface's effective composited lightness (OKLab L).
 *
 * When the caller supplies a LIVE tint (the reactive layer's ink-probe read
 * of the tier's actual painted recipe — tint + alpha), the composite uses
 * it; otherwise the static producer model above serves (the Vue-free /
 * non-browser degenerate — the O-18 census enforces the live path in the
 * real browser).
 *
 * @param surface   the D1 rung the ink sits on
 * @param ambientL  the atmosphere's LIVE derived lightness (`useAtmosphere`'s
 *                  `derivedLightness` — the M-15 exposed value)
 * @param dark      the active scheme (`useGlobalDark`)
 * @param tint      optional LIVE-resolved tier tint (recipe truth)
 * @param underTint optional LIVE-resolved tint of the UNDERLAY rung — read
 *                  only by the `veil` in-plate composite (its backdrop is the
 *                  resting plate, whose own recipe may be live-probed)
 */
export function resolveSurfaceLightness(
    surface: InkSurface,
    ambientL: number,
    dark: boolean,
    tint?: SurfaceTint,
    underTint?: SurfaceTint,
): number {
    if (surface === "page") return ambientL;

    // T.W6.5-P (T-34) — the VEIL rung: the quiet-glass in-plate fixture (the
    // sliders console's seat after the owner's Q4 material re-cut). Its
    // backdrop is the RESTING plate, never the bare page ambient.
    if (surface === "veil") {
        // Live path: `tint` arrives as the EFFECTIVE two-layer recipe — the
        // veil composited over the resting plate in sRGB by the live
        // instrument (`useContrastSafeColor.resolveLiveTint`), the SAME
        // alpha-composite model the O-18 census measures with — so it mixes
        // over the bare ambient exactly like every other rung's tint.
        if (tint) return tint.alpha * tint.L + (1 - tint.alpha) * ambientL;
        // Static degenerate (jsdom / non-browser): the quiet-α model over
        // the static resting composite (its own live tint when available).
        const underL = resolveSurfaceLightness(
            "resting",
            ambientL,
            dark,
            underTint,
        );
        const a = RUNG_ALPHA.quiet[dark ? "dark" : "light"];
        return a * CARD_L[dark ? "dark" : "light"] + (1 - a) * underL;
    }

    if (tint) return tint.alpha * tint.L + (1 - tint.alpha) * ambientL;

    const scheme = dark ? "dark" : "light";
    const cardL = CARD_L[scheme];
    switch (surface) {
        case "resting": {
            const a = RUNG_ALPHA.resting[scheme];
            return a * cardL + (1 - a) * ambientL;
        }
        case "floating":
        case "chrome": {
            // The static model has no dock-specific row; chrome models at
            // the floating rung (its live probe carries the real, thinner α).
            const a = RUNG_ALPHA.floating[scheme];
            return a * FLOATING_TINT_L[scheme] + (1 - a) * ambientL;
        }
        case "well":
            // Opaque tone-step of the plate — closed-form, ambient-free.
            return (
                (1 - WELL_FOREGROUND_FRACTION) * cardL +
                WELL_FOREGROUND_FRACTION * FOREGROUND[scheme].L
            );
    }
}

// --- the three certified-ink rungs -------------------------------------------

/**
 * Certify a live-color INK against the surface it actually sits on: the
 * library's OKLab-distance guard (hue-preserving), then the WCAG floor walk
 * along the hue's gamut cusp. Returns the ORIGINAL string when it already
 * clears the floor (fidelity — no needless re-expression), else a certified
 * `oklch(…)`.
 *
 * @param css      any CSS color (the live pick, a palette color)
 * @param surfaceL the resolved surface lightness (`resolveSurfaceLightness`)
 * @param floor    WCAG floor (default 4.5 — text; pass
 *                 `GRAPHICS_CONTRAST_FLOOR` (3) for graphics ink)
 */
export function certifyAccentInk(
    css: string,
    surfaceL: number,
    floor: number = TEXT_CONTRAST_FLOOR,
): string {
    const raw = tryParseRawOklch(css);
    if (!raw) return css;
    if (ratioAgainst(raw, surfaceL) >= floor + CERTIFY_HEADROOM) return css;

    // 1 — the library's own guard (moves L away from the surface, hue kept).
    const safe = computeSafeAccent(raw.L, raw.C, raw.H, surfaceL);
    // 2 — the cusp floor-walk to the certified target. The walk carries the
    //     PICK's chroma (raw.C), not the guard's extremity-tapered safe.C —
    //     the cusp ceiling owns the gamut honesty per step, so the taper's
    //     pre-emptive desaturation would only re-open the §5.1 collapse.
    const certified = walkToFloor(
        { L: safe.L, C: raw.C, H: raw.H },
        surfaceL,
        floor + CERTIFY_HEADROOM,
    );
    return asOklchCss(certified);
}

/**
 * The de-emphasis RUNG (F-4's cure): the scheme foreground stepped toward the
 * surface by the φ⁻¹ complement (0.382 — the house golden step, the same
 * ratio the markdown h3 rung mixes at), then floor-clamped at the 4.5:1
 * small-text floor. Quieter by design, legible by construction — never a
 * post-hoc opacity multiply.
 */
export function resolveMutedInk(surfaceL: number, dark: boolean): string {
    const fg = FOREGROUND[dark ? "dark" : "light"];
    const stepped: RawOklch = {
        L: fg.L + (surfaceL - fg.L) * 0.382,
        C: fg.C,
        H: fg.H,
    };
    return asOklchCss(walkToFloor(stepped, surfaceL, TEXT_CONTRAST_FLOOR + CERTIFY_HEADROOM));
}

/**
 * WCAG-maximal ink over an arbitrary live FILL — `resolveSealInk` (the
 * `--seal-ink` exemplar, boot/view-accents.ts) generalized per the D6 spec:
 * the ink resolves from the fill's OWN luminance through the library's
 * `contrast-color()` leaf, a pass by construction. The F-3 split's second,
 * dependent guard: the moment a tile's fill goes live-colored, its ink stops
 * being the fixed `--foreground` and derives from the fill.
 *
 * @returns `oklch(0 0 0)` | `oklch(1 0 0)`, or null on parse failure (the
 *          caller keeps its resting ink — the house null-tolerant contract).
 */
export function contrastInkFor(fillCss: string): string | null {
    const raw = tryParseRawOklch(fillCss);
    if (!raw) return null;
    const ink = contrastColor(publicOklch(raw.L, raw.C, raw.H));
    return (ink.r as number) === 0 ? "oklch(0 0 0)" : "oklch(1 0 0)";
}
