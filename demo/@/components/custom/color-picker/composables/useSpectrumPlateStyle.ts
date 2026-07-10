/**
 * The spectrum plate's presentation computeds (R.W3 Lane E — cohesion lift
 * out of `SpectrumCanvas.vue`, keeping the SFC under the 400-LoC cap after
 * the E1/E2 motion beats landed). Pure style/label derivation; no gesture
 * logic. Behavior is byte-equivalent to the pre-lift computeds.
 */

import { computed, type ComputedRef } from "vue";
import { clamp } from "@mkbabb/value.js/math";
import { spectrumFieldIsLight } from "../spectrumLuma";
import type { useTouchGate } from "@mkbabb/glass-ui";

export function useSpectrumPlateStyle(opts: {
    HSVCurrentColor: ComputedRef<any>;
    cssColorOpaque: ComputedRef<string>;
    dotPos: ComputedRef<{ s: number; v: number }>;
    spectrumGate: ReturnType<typeof useTouchGate>;
}) {
    const { HSVCurrentColor, cssColorOpaque, dotPos, spectrumGate } = opts;

    // W5-a11y: reactive description of the picker's current 2D position.
    // HSV s/v are 0–1 fractions; rendered as rounded percent.
    const spectrumAriaLabel = computed(() => {
        const sPct = Math.round(dotPos.value.s * 100);
        const vPct = Math.round(dotPos.value.v * 100);
        return `Color spectrum, saturation ${sPct}%, lightness ${vPct}%`;
    });

    const spectrumStyle = computed(() => {
        const { h } = HSVCurrentColor.value.value;
        const hClamped = clamp(h.value, 0, 1);

        const shadowStr = cssColorOpaque.value;

        return {
            background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${hClamped * 360}deg, 100%, 50%))
      `,
            "--spectrum-shadow": shadowStr,
            touchAction: spectrumGate.isTouchDevice
                ? (spectrumGate.isActive.value ? "none" : "pan-y")
                : "none",
        };
    });

    const spectrumDotStyle = computed(() => {
        const { s: sClamped, v: vClamped } = dotPos.value;

        // B3: the border regime reads the SHARED plate-luma helper — the same
        // predicate the overlay's contour/hatch ink flips on (one function,
        // one threshold; never a copied constant).
        const light = spectrumFieldIsLight(sClamped, vClamped);
        const borderAlpha = light ? 0.8 : 0.9;
        const borderColor = light
            ? `rgba(0, 0, 0, ${borderAlpha})`
            : `rgba(255, 255, 255, ${borderAlpha})`;

        return {
            left: `${100 * sClamped}%`,
            top: `${100 * (1 - vClamped)}%`,
            backgroundColor: cssColorOpaque.value,
            "--dot-border": borderColor,
        };
    });

    return { spectrumAriaLabel, spectrumStyle, spectrumDotStyle };
}
