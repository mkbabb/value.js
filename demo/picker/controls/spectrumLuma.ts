/**
 * The spectrum plate's shared luminance model (R.W3 Lane B / B3; hue-aware
 * since X.W8.i2, COHESION §0fx.1).
 *
 * ONE function, ONE decision — instrument coherence. The WatercolorDot's
 * border regime (`useSpectrumPlateStyle` `spectrumDotStyle`) and the
 * slider-thumb needle (`ComponentSliders` `thumbInk`) read the field through
 * this helper, so no two instruments ever disagree about the same colour.
 * Share the function, never copy the decision (`overlay-amendment.md §4.1`).
 *
 * The model: the plate at `(h, s, v)` paints exactly the HSV colour
 * `hsv(h, s, v)`, and the luminance of that colour depends on its hue — a
 * saturated yellow is light where a saturated blue at the same `(s, v)` is
 * dark — so an `(s, v)`-only predicate is the wrong model. The field's
 * relative luminance is read through value.js's own colour maths: the CIE
 * XYZ (D65) `Y` channel of `convertColor(hsv(h, s, v), "xyz")`, which is
 * WCAG 2.x relative luminance by definition (no hand-kept coefficients).
 * The two strokes are the plate's own endpoints, black `hsv(0, 0, 0)` and
 * white `hsv(0, 0, 1)`, read through the same path; the selected stroke is
 * whichever contrasts more with the field. At the crossover both clear
 * ≈ 4.58:1, so the selected stroke clears the 3:1 a non-text boundary owes
 * (WCAG 1.4.11) at every hue.
 */
import { convertColor, hsv } from "@mkbabb/value.js/color";

/** WCAG 2.x contrast-ratio flare term (the published standard's own constant). */
const WCAG_FLARE = 0.05;

/** A channel the plate can paint: a non-finite reading (NaN before layout or
 *  restore) is read as 0, so the predicate is total on the render path. */
function finiteOr0(x: number): number {
    return Number.isFinite(x) ? x : 0;
}

/**
 * Relative luminance (CIE Y, D65) of the HSV colour `(h°, s, v)`, s/v ∈ [0, 1].
 *
 * X-DS value pass 5 (C5-01): TOTAL. Both callers sit on the render path (the
 * dot's border, the needle's ink), and `hsv()` rejects a non-finite channel, so
 * a NaN `s` or `v` (a `dotPos` or `channelNumber` reading before layout or
 * restore; `clamp(NaN)` is still NaN) threw inside a computed and dropped the
 * whole picker pane to its error plate. A non-finite channel now reads as 0
 * here, at the one entry both instruments share. The throws below remain as
 * assertions on the library's own conversion, which finite input cannot fail.
 */
export function spectrumFieldLuminance(h: number, s: number, v: number): number {
    const field = hsv(finiteOr0(h), finiteOr0(s), finiteOr0(v));
    if (!field.ok) throw new Error(`spectrumFieldLuminance: hsv(${h}, ${s}, ${v}) — ${field.error.code}`);
    const xyz = convertColor(field.value, "xyz");
    if (!xyz.ok) throw new Error(`spectrumFieldLuminance: xyz conversion — ${xyz.error.code}`);
    const y = xyz.value.channels[1];
    if (typeof y !== "number") throw new Error("spectrumFieldLuminance: Y channel missing");
    return y;
}

/** The plate's own stroke endpoints, through the same path as the field. */
const INK_LUMINANCE = spectrumFieldLuminance(0, 0, 0);
const PAPER_LUMINANCE = spectrumFieldLuminance(0, 0, 1);

/** WCAG 2.x contrast ratio between two relative luminances. */
export function contrastRatio(a: number, b: number): number {
    return (Math.max(a, b) + WCAG_FLARE) / (Math.min(a, b) + WCAG_FLARE);
}

/**
 * `true` ⇔ the field under `(h, s, v)` reads LIGHT — the dark (ink-voiced)
 * stroke contrasts more there; `false` ⇔ the field reads dark — the light
 * (paper-voiced) stroke contrasts more. The dot's border and the needle's
 * ink flip black/white on exactly this predicate.
 */
export function spectrumFieldIsLight(h: number, s: number, v: number): boolean {
    const field = spectrumFieldLuminance(h, s, v);
    return contrastRatio(field, INK_LUMINANCE) > contrastRatio(field, PAPER_LUMINANCE);
}
