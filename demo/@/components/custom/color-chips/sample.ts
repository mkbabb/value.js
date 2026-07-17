/**
 * color-chips/sample — the LIBRARY-sampling helper for the T-17 preview
 * chips (T.W6 · W6-4; t-nav-dropdowns F6/F7).
 *
 * THE SAMPLING LAW (the W7-4 dogfood clause): ramps are k-sample discrete
 * stops built from THE LIBRARY's `mixColors` interpolation — never CSS
 * `in <space>` gradient
 * interpolation, because the preview must show what THE APP computes, not
 * what the browser's engine would (and HSV/XYZ/kelvin are not
 * CSS-interpolable anyway). One mechanism for all rows, no engine
 * divergence. ZERO new color math: parsing rides `parseColorIn`, sampling
 * rides `mixColors`, serialization rides `colorToCss` — all
 * library/`@lib` leaves.
 *
 * THE TRUTH LAW (O-14): a chip that approximates the library output is
 * FORBIDDEN. Every chip stamps its stop list on `data-stops` (this module's
 * serialization); the vitest oracle (`test/preview-chips.test.ts`) holds
 * this sampler STRICTLY EQUAL to a direct library recompute, and the O-14
 * e2e leg holds the painted gradient to the stamped stops in the live DOM.
 *
 * Stops SAMPLE in the candidate space and SERIALIZE in OKLCh — the sampling
 * space defines the trajectory (the thing previewed); the serialization is
 * only the paint encoding (OKLCh is CSS-paintable for every color the app
 * can produce; a raw `hsv(…)`/`xyz(…)` string is not a CSS color).
 */

import {
    mixColors,
    type AnyColor,
    type HueInterpolationMethod,
} from "@mkbabb/value.js/color";
import { colorToCss, parseColorIn } from "@lib/color-utils";
import type { PickerColorIn, PickerSpace } from "@lib/picker-color";

/** k — the F6 sample count (≈16): smooth to the eye, sub-ms to compute. */
export const RAMP_SAMPLE_COUNT = 16;

/** Serialize one sampled stop as paintable OKLCh (alpha only when < 1). */
export function serializeStop(stop: AnyColor): string {
    return colorToCss(stop, "oklch").replace(/ \/ 1\)$/, ")");
}

/**
 * Sample the CURRENT operands' interpolation through a candidate
 * space × hue-arc — the mix/gradient Space and Hue rows' preview referent.
 *
 * N operands form N−1 segments; the k samples distribute across the chain
 * (each segment sampled inclusively via the library sampler, joints
 * deduped). Returns null when the preview has nothing TRUE to say —
 * fewer than 2 parseable operands (honest absence, never a canned swatch).
 */
export function sampleInterpolationRamp(
    operandsCss: readonly string[],
    space: PickerSpace,
    hueMethod: HueInterpolationMethod,
    k: number = RAMP_SAMPLE_COUNT,
): string[] | null {
    if (operandsCss.length < 2) return null;
    const operands: AnyColor[] = [];
    for (const css of operandsCss) {
        try {
            operands.push(parseColorIn(css, space));
        } catch {
            return null;
        }
    }

    const segments = operands.length - 1;
    const perSegment = Math.max(2, Math.ceil(k / segments) + 1);
    const stops: string[] = [];
    for (let i = 0; i < segments; i++) {
        // Dedupe the shared joint: every segment after the first drops its
        // inclusive start (identical to the previous segment's end).
        for (let j = i === 0 ? 0 : 1; j < perSegment; j++) {
            const result = mixColors(
                operands[i]!,
                operands[i + 1]!,
                j / (perSegment - 1),
                { space, hue: hueMethod },
            );
            if (!result.ok) return null;
            stops.push(serializeStop(result.value as PickerColorIn<typeof space>));
        }
    }
    return stops;
}

/** The `data-stops` stamp — ONE serialization, shared by chip + oracle. */
export function stampStops(stops: readonly string[]): string {
    return stops.join("|");
}
