/**
 * Gradient model — reactive state for gradient creation, editing, and
 * bi-directional CSS serialization/parsing.
 *
 * Orchestrates sub-composables:
 * - useGradientInterpolation — color space, hue method, resolution
 * - useGradientCSS — CSS serialization, coalescing, and parsing
 */

import { ref, computed, watch } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/mix";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { useGradientInterpolation } from "./useGradientInterpolation";
import { useGradientCSS, parseGradientCSS, linearInterval } from "./useGradientCSS";

// ── Re-exports (preserve public API surface) ──

export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export { serializeGradient, serializeCoalescedGradient, parseGradientCSS, linearInterval } from "./useGradientCSS";

// ── Types ──

export interface GradientStop {
    id: string;
    cssColor: string;
    position: number; // 0–100%
}

/**
 * A gradient interval carries the <EasingPicker> payload (the R.W4 `/easing`
 * consume — easing-disposition.md §2.3): the re-parseable CSS literal + the
 * live value.js callable, plus the raw picker params for re-seeding. The
 * former `{easingName, easingFn}` name-catalogue shape (and its private
 * `GRADIENT_EASING_NAMES`/`resolveEasing` catalogue) died with the
 * EasingSelector fork — the picker's preset menu IS value.js `bezierPresets`.
 */
export type GradientInterval = Pick<EasingPickerValue, "css" | "fn"> &
    Partial<Pick<EasingPickerValue, "mode" | "points" | "steps" | "term">>;

export type GradientType = "linear" | "radial" | "conic";

export interface GradientModelState {
    type: GradientType;
    direction: number; // degrees (for linear); ignored for radial
    stops: GradientStop[];
    intervals: GradientInterval[];
    interpolationSpace: ColorSpace;
    hueMethod: HueInterpolationMethod;
    resolution: number; // sub-stops per interval for coalesced output
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
    const { interpolationSpace, hueMethod, resolution } = useGradientInterpolation();

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
        resolution: resolution.value,
    }));

    // ── CSS sub-composable ──
    const { coalescedCSS, simpleCSS } = useGradientCSS(modelState);

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
     * Parse CSS and update model. Returns true if parse succeeded.
     */
    function applyCSS(css: string): boolean {
        const parsed = parseGradientCSS(css);
        if (!parsed) return false;

        if (parsed.type != null) type.value = parsed.type;
        if (parsed.direction != null) direction.value = parsed.direction;
        if (parsed.stops != null && parsed.stops.length >= 2) stops.value = parsed.stops;
        if (parsed.intervals != null) intervals.value = parsed.intervals;

        return true;
    }

    return {
        // State
        type,
        direction,
        stops,
        intervals,
        interpolationSpace,
        hueMethod,
        resolution,

        // Computed
        modelState,
        coalescedCSS,
        simpleCSS,

        // Actions
        addStop,
        removeStop,
        updateStop,
        updateInterval,
        setStopsFromColors,
        applyCSS,
    };
}
