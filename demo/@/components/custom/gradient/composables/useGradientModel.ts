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
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { timingFunctions, linear } from "@src/easing";
import { useGradientInterpolation } from "./useGradientInterpolation";
import { useGradientCSS, parseGradientCSS } from "./useGradientCSS";

// ── Re-exports (preserve public API surface) ──

export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export { serializeGradient, serializeCoalescedGradient, parseGradientCSS } from "./useGradientCSS";

// ── Types ──

export interface GradientStop {
    id: string;
    cssColor: string;
    position: number; // 0–100%
}

export interface GradientInterval {
    easingName: string;
    easingFn: (t: number) => number;
}

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

// ── Easing lookup ──

/** Subset of timingFunctions suitable for gradient intervals (no stepped). */
export const GRADIENT_EASING_NAMES = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "ease-in-quad",
    "ease-out-quad",
    "ease-in-out-quad",
    "ease-in-cubic",
    "ease-out-cubic",
    "ease-in-out-cubic",
    "ease-in-sine",
    "ease-out-sine",
    "ease-in-out-sine",
    "ease-in-circ",
    "ease-out-circ",
    "ease-in-out-circ",
    "ease-in-expo",
    "ease-out-expo",
    "ease-in-out-expo",
    "ease-in-back",
    "ease-out-back",
    "ease-in-out-back",
    "smooth-step-3",
] as const;

export function resolveEasing(name: string): (t: number) => number {
    const fn = (timingFunctions as Record<string, any>)[name];
    if (typeof fn === "function") return fn as (t: number) => number;
    return linear;
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
    const intervals = ref<GradientInterval[]>([
        { easingName: "linear", easingFn: linear },
    ]);

    // ── Interpolation sub-composable ──
    const { interpolationSpace, hueMethod, resolution } = useGradientInterpolation();

    // Ensure intervals array stays in sync with stops
    watch(
        () => stops.value.length,
        (len) => {
            const needed = Math.max(0, len - 1);
            while (intervals.value.length < needed) {
                intervals.value.push({ easingName: "linear", easingFn: linear });
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

    function updateInterval(index: number, easingName: string) {
        if (index < 0 || index >= intervals.value.length) return;
        intervals.value = intervals.value.map((iv, i) =>
            i === index
                ? { easingName, easingFn: resolveEasing(easingName) }
                : iv,
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
