/**
 * Gradient model — reactive state for gradient creation, editing, and
 * bi-directional CSS serialization/parsing.
 *
 * Orchestrates sub-composables:
 * - useGradientInterpolation — color space, hue method
 * - useGradientCSS — CSS serialization, coalescing, and parsing
 */

import { ref, computed, watch } from "vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import type { PickerSpace } from "@lib/picker-color";
import { useGradientInterpolation } from "./useGradientInterpolation";
import { useGradientCSS, linearInterval } from "./useGradientCSS";
import { parseGradientCSS } from "./gradientParse";
import type { GradientParseResult } from "./gradientParse";

// ── Re-exports (preserve public API surface) ──

export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export {
    serializeGradient,
    serializeCoalescedGradient,
    serializeRailRamp,
    linearInterval,
} from "./useGradientCSS";
export { parseGradientCSS } from "./gradientParse";
export type { GradientParseResult, ParsedGradientModel } from "./gradientParse";

// ── Types ──

export interface GradientStop {
    id: string;
    cssColor: string;
    position: number; // 0–100%
}

/**
 * A gradient interval carries the <EasingPicker> payload (the R.W4 `/easing`
 * consume — easing-disposition.md §2.3): the re-parseable CSS literal (the
 * persisted TRUTH) plus the live value.js callable and authoring parameters.
 * Literal-only reads still parse through `/css` and evaluate through
 * `/easing`; editable model state stays complete for two-way picker binding.
 * The former
 * `{easingName, easingFn}` name-catalogue shape died with the EasingSelector
 * fork — the picker's preset menu IS value.js `bezierPresets`.
 */
export type GradientInterval = EasingPickerValue;

export type GradientType = "linear" | "radial" | "conic";

export interface GradientModelState {
    type: GradientType;
    direction: number; // degrees (for linear); ignored for radial
    stops: GradientStop[];
    intervals: GradientInterval[];
    interpolationSpace: PickerSpace;
    hueMethod: HueInterpolationMethod;
    // NOTE: no `resolution` — the coalesce density is the inlined
    // COALESCE_RESOLUTION constant (W5-11 / P2-14: it never had a UI).
}

// ── Helpers ──

let nextId = 0;
function uid(): string {
    return `stop-${++nextId}-${Date.now().toString(36)}`;
}

// ── Composable ──

export function useGradientModel() {
    // ── Direction / type state ──
    const type = ref<GradientType>("linear");
    const direction = ref(90);

    // ── Stop state ──
    const stops = ref<GradientStop[]>([
        { id: uid(), cssColor: "oklch(0.75 0.15 145)", position: 0 },
        { id: uid(), cssColor: "oklch(0.65 0.18 265)", position: 100 },
    ]);
    const intervals = ref<GradientInterval[]>([linearInterval()]);

    // ── Interpolation sub-composable ──
    const { interpolationSpace, hueMethod } = useGradientInterpolation();

    // Ensure intervals array stays in sync with stops
    watch(
        () => stops.value.length,
        (len) => {
            const needed = Math.max(0, len - 1);
            while (intervals.value.length < needed) {
                intervals.value.push(linearInterval());
            }
            if (intervals.value.length > needed) {
                intervals.value.length = needed;
            }
        },
    );

    const modelState = computed<GradientModelState>(() => ({
        type: type.value,
        direction: direction.value,
        stops: stops.value,
        intervals: intervals.value,
        interpolationSpace: interpolationSpace.value,
        hueMethod: hueMethod.value,
    }));

    // ── CSS sub-composable ──
    const { coalescedCSS, simpleCSS, railRampCSS } = useGradientCSS(modelState);

    // ── Stop manipulation ──

    function addStop(cssColor: string, position: number) {
        const newStop: GradientStop = { id: uid(), cssColor, position };
        const sorted = [...stops.value, newStop].sort((a, b) => a.position - b.position);
        stops.value = sorted;
    }

    function removeStop(id: string) {
        if (stops.value.length <= 2) return; // Minimum 2 stops
        stops.value = stops.value.filter((s) => s.id !== id);
    }

    function updateStop(id: string, patch: Partial<Pick<GradientStop, "cssColor" | "position">>) {
        stops.value = stops.value.map((s) =>
            s.id === id ? { ...s, ...patch } : s,
        );
    }

    /** Store the picker's authored-curve payload on the interval. */
    function updateInterval(index: number, value: EasingPickerValue) {
        if (index < 0 || index >= intervals.value.length) return;
        const { mode, css, fn, points, steps, term } = value;
        intervals.value = intervals.value.map((iv, i) =>
            i === index ? { mode, css, fn, points, steps, term } : iv,
        );
    }

    function setStopsFromColors(colors: string[]) {
        if (colors.length === 0) return;
        stops.value = colors.map((css, i) => ({
            id: uid(),
            cssColor: css,
            position: colors.length === 1 ? 50 : (i / (colors.length - 1)) * 100,
        }));
    }

    /**
     * Parse CSS and apply it ATOMICALLY (W5-11 / P0-1): the whole complete
     * model swaps in, or NOTHING changes and the caller gets the explicit
     * `{ ok: false, reason }` verdict to surface. The former field-by-field
     * partial apply (which could desync `stops` from `intervals` and vanish
     * the Easing section) is dead.
     */
    function applyCSS(css: string): GradientParseResult {
        const result = parseGradientCSS(css);
        if (!result.ok) return result;

        const { model } = result;
        type.value = model.type;
        direction.value = model.direction;
        stops.value = model.stops;
        intervals.value = model.intervals;
        return result;
    }

    return {
        // State
        type,
        direction,
        stops,
        intervals,
        interpolationSpace,
        hueMethod,

        // Computed
        modelState,
        coalescedCSS,
        simpleCSS,
        railRampCSS,

        // Actions
        addStop,
        removeStop,
        updateStop,
        updateInterval,
        setStopsFromColors,
        applyCSS,
    };
}
