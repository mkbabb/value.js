/**
 * view-accents — the wax-seal ink resolver (S.W7 · W7-4; slimmed at
 * U.W-DEMO · U-F45).
 *
 * WHAT SLIMMED (the G-DEMO-1 cure): `resolveViewAccent` (the pure rotate →
 * C-floor → gamut-map → L re-guard → WCAG resolver) and its private domain
 * (`mapToGamut`, `RawOklch`, `VIEW_ACCENT_MIN_CHROMA`, `GRAPHICS_CONTRAST_FLOOR`,
 * `tryParseOklch`, `publicOklch`) RELOCATED DOWN to the shared color layer
 * (`@composables/color/view-accent`) — its natural home, since it is pure
 * library-math and the shared color spine (`palettes-ramp`) consumes it. The
 * near-cycle between the shared color layer and this app-root boot module is
 * dissolved: `useViewAccents` and the seal-ink helper below now import DOWN
 * from shared (app-root depends on the lower layer, never the reverse).
 *
 * WHAT SURVIVES here (the app-root seal concern): `resolveSealInk`. The wax
 * seal's icon ink resolves from the WAX color's own luminance through the
 * library's `contrast-color()` leaf (`contrastColor` — the WCAG black/white
 * endpoint picker), so the flip threshold is library-derived, not a CSS
 * literal. It shares the relocated `tryParseOklch` / `publicOklch` helpers,
 * imported DOWN from the shared module.
 *
 * Pure module — no Vue, no DOM. Unit-probed by `test/view-accents.test.ts`
 * (the seal-ink rows; the resolver + ramp rows probe the shared module).
 */

import { contrastInkFor } from "../../../color-session/ink";

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
    return contrastInkFor(waxCss);
}
