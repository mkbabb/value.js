/**
 * The spectrum plate's shared luma model (R.W3 Lane B / B3).
 *
 * ONE function, ONE threshold — instrument coherence. The WatercolorDot's
 * border regime (`SpectrumCanvas.vue` `spectrumDotStyle`), the gamut overlay's
 * contour/hatch ink regime (`useGamutOverlay`), and the slider-thumb needle
 * (Lane C) all read the field through this helper, so no two instruments ever
 * disagree about the same (s, v) region. Share the function, never copy the
 * constant (`overlay-amendment.md §4.1`).
 *
 * The model: approximate perceived luma of the HSL/HSV plate at saturation
 * `s`, value `v` (both [0,1] — v upward from black). The plate is
 * `linear-gradient(to top, #000, transparent)` over
 * `linear-gradient(to right, #fff, hue)`, so luma falls with `v` toward black
 * and with `s` toward the pure hue — `v · (1 − s/2)` is the standing
 * approximation.
 */

/** The single regime threshold. */
export const SPECTRUM_LUMA_FLIP = 0.5;

/** Approximate perceived luma of the spectrum plate at (s, v). */
export function spectrumLuma(s: number, v: number): number {
    return v * (1 - s * 0.5);
}

/**
 * `true` ⇔ the field under (s, v) reads LIGHT — a dark (ink-voiced) stroke
 * contrasts there; `false` ⇔ the field reads dark — a light (paper-voiced)
 * stroke contrasts. The dot's border flips black/white on exactly this
 * predicate; the overlay's contour/hatch ink pair flips with it.
 */
export function spectrumFieldIsLight(s: number, v: number): boolean {
    return spectrumLuma(s, v) > SPECTRUM_LUMA_FLIP;
}
