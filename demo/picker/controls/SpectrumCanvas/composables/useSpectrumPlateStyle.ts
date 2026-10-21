/**
 * The spectrum plate's presentation computeds (R.W3 Lane E — cohesion lift
 * out of `SpectrumCanvas.vue`, keeping the SFC under the 400-LoC cap after
 * the E1/E2 motion beats landed). Pure style/label derivation; no gesture
 * logic. Behavior is byte-equivalent to the pre-lift computeds.
 */

import { computed, type ComputedRef } from "vue";
import { clamp } from "@mkbabb/value.js/math";
import { channelNumber, type PickerColorIn } from "../../../../color-session/picker-color";
import { spectrumFieldIsLight } from "../../spectrumLuma";

export function useSpectrumPlateStyle(opts: {
    HSVCurrentColor: ComputedRef<PickerColorIn<"hsv">>;
    cssColorOpaque: ComputedRef<string>;
    dotPos: ComputedRef<{ s: number; v: number }>;
}) {
    const { HSVCurrentColor, cssColorOpaque, dotPos } = opts;

    // W5-a11y: reactive description of the picker's current 2D position.
    // HSV s/v are 0–1 fractions; rendered as rounded percent.
    const spectrumAriaLabel = computed(() => {
        const sPct = Math.round(dotPos.value.s * 100);
        const vPct = Math.round(dotPos.value.v * 100);
        return `Color spectrum, saturation ${sPct}%, lightness ${vPct}%`;
    });

    const spectrumStyle = computed(() => {
        const hue = clamp(channelNumber(HSVCurrentColor.value, "h"), 0, 360);

        const shadowStr = cssColorOpaque.value;

        return {
            background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${hue}deg, 100%, 50%))
      `,
            "--spectrum-shadow": shadowStr,
            // X.W11.p3b (COHESION §0gl.12): `touch-action` is NOT computed
            // here. It derives from the visitor's pointer class, which the
            // prerendered first view cannot know, so it lives in CSS
            // (`@media (pointer: coarse)`, SpectrumCanvas.vue) keyed on the
            // gate's `touch-gate-active` class.
        };
    });

    const spectrumDotStyle = computed(() => {
        const { s: sClamped, v: vClamped } = dotPos.value;
        const hue = clamp(channelNumber(HSVCurrentColor.value, "h"), 0, 360);

        // B3: the border regime reads the SHARED hue-aware plate helper — the
        // same predicate the slider needle's ink flips on (one function, one
        // decision; never a copied constant). X.W8.i2: the field's luminance
        // depends on its hue, so the hue rides with (s, v).
        const light = spectrumFieldIsLight(hue, sClamped, vClamped);
        const borderAlpha = light ? 0.8 : 0.9;
        const borderColor = light
            ? `rgba(0, 0, 0, ${borderAlpha})`
            : `rgba(255, 255, 255, ${borderAlpha})`;

        // X-DS pass 3 (V3C-07): the vertical travel is inset by the thumb's
        // radius, so at high V the thumb sits inside the plate instead of
        // riding half over the value readout (SpectrumCanvas maps the pointer
        // over the same inset span). The horizontal travel is unchanged.
        return {
            left: `${100 * sClamped}%`,
            top: `calc(var(--spectrum-dot-size) / 2 + ${1 - vClamped} * (100% - var(--spectrum-dot-size)))`,
            backgroundColor: cssColorOpaque.value,
            "--dot-border": borderColor,
        };
    });

    return { spectrumAriaLabel, spectrumStyle, spectrumDotStyle };
}
