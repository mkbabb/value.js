/**
 * Gradient model — reactive state for gradient creation, editing, and
 * bi-directional CSS serialization/parsing.
 *
 * Supports per-interval easing functions that are "baked in" by generating
 * many intermediate color stops (coalesced output), since browsers cannot
 * natively interpolate with arbitrary easing between gradient stops.
 */

import { ref, computed, watch } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { mixColors } from "@src/units/color/utils";
import { parseCSSValue } from "@src/parsing";
import { timingFunctions, linear } from "@src/easing";
import { FunctionValue, ValueUnit } from "@src/units";
import type { Color } from "@src/units/color";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";

// ── Shared interpolation constants (used by Gradient + Mix views) ──

export const INTERPOLATION_SPACES: { value: ColorSpace; label: string; description: string }[] = [
    { value: "oklch", label: "OKLCh", description: "Perceptual, hue-preserving" },
    { value: "oklab", label: "OKLab", description: "Perceptual, smooth" },
    { value: "lab",   label: "Lab",   description: "CIE perceptual" },
    { value: "lch",   label: "LCh",   description: "CIE cylindrical" },
    { value: "hsl",   label: "HSL",   description: "Web-native cylindrical" },
    { value: "hsv",   label: "HSV",   description: "Hue-saturation-value" },
    { value: "hwb",   label: "HWB",   description: "Hue-whiteness-blackness" },
    { value: "rgb",   label: "RGB",   description: "Device linear" },
    { value: "xyz",   label: "XYZ",   description: "CIE absolute" },
];

export const HUE_INTERPOLATION_METHODS: { value: HueInterpolationMethod; label: string; description: string }[] = [
    { value: "shorter",    label: "Shorter",    description: "Nearest arc" },
    { value: "longer",     label: "Longer",     description: "Far arc" },
    { value: "increasing", label: "Increasing", description: "Always clockwise" },
    { value: "decreasing", label: "Decreasing", description: "Counter-clockwise" },
];

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

function resolveColor(css: string, space: ColorSpace): Color<number> | null {
    return cssToRawColor(css, space);
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

// ── Serialization ──

/**
 * Serialize a gradient model to a simple CSS gradient string (user-editable).
 * Uses the raw stops only — no coalesced intermediate stops.
 */
export function serializeGradient(model: GradientModelState): string {
    const typeName = `${model.type}-gradient`;
    const parts: string[] = [];

    if (model.type === "linear" && model.direction !== 180) {
        parts.push(`${model.direction}deg`);
    } else if (model.type === "conic") {
        parts.push(`from ${model.direction}deg`);
    }

    for (const stop of model.stops) {
        parts.push(`${stop.cssColor} ${stop.position.toFixed(1)}%`);
    }

    return `${typeName}(${parts.join(", ")})`;
}

/**
 * Serialize a coalesced gradient — many intermediate stops that bake in
 * per-interval easing. This is the CSS that actually renders the gradient.
 */
export function serializeCoalescedGradient(model: GradientModelState): string {
    const typeName = `${model.type}-gradient`;
    const parts: string[] = [];

    if (model.type === "linear" && model.direction !== 180) {
        parts.push(`${model.direction}deg`);
    } else if (model.type === "conic") {
        parts.push(`from ${model.direction}deg`);
    }

    const { stops, intervals, interpolationSpace, hueMethod, resolution } = model;

    if (stops.length === 0) {
        return `${typeName}(transparent, transparent)`;
    }
    if (stops.length === 1) {
        return `${typeName}(${stops[0]!.cssColor}, ${stops[0]!.cssColor})`;
    }

    const stepsPerInterval = Math.max(2, Math.round(resolution / (stops.length - 1)));

    for (let i = 0; i < stops.length - 1; i++) {
        const s0 = stops[i]!;
        const s1 = stops[i + 1]!;
        const easing = intervals[i]?.easingFn ?? linear;

        const c0 = resolveColor(s0.cssColor, interpolationSpace);
        const c1 = resolveColor(s1.cssColor, interpolationSpace);

        if (!c0 || !c1) continue;

        const posRange = s1.position - s0.position;

        for (let j = 0; j <= (i < stops.length - 2 ? stepsPerInterval - 1 : stepsPerInterval); j++) {
            const t = j / stepsPerInterval;
            const easedT = easing(t);
            const pos = s0.position + t * posRange;

            const mixed = mixColors(c0, c1, 1 - easedT, easedT, interpolationSpace, hueMethod);
            parts.push(`${rawColorToCSS(mixed)} ${pos.toFixed(2)}%`);
        }
    }

    return `${typeName}(${parts.join(", ")})`;
}

// ── Parsing ──

/**
 * Parse a CSS gradient string into a GradientModelState.
 * Returns null if parsing fails.
 */
export function parseGradientCSS(css: string): Partial<GradientModelState> | null {
    try {
        const parsed = parseCSSValue(css);
        if (!(parsed instanceof FunctionValue)) return null;

        const name = (parsed.name as string).toLowerCase();
        let type: GradientType;

        if (name.includes("linear")) type = "linear";
        else if (name.includes("radial")) type = "radial";
        else if (name.includes("conic")) type = "conic";
        else return null;

        const values = parsed.values;
        let direction = type === "linear" ? 180 : 0;
        let startIdx = 0;

        // First value might be direction
        if (values.length > 0) {
            const first = values[0];
            if (
                first instanceof ValueUnit &&
                typeof first.value === "number" &&
                first.unit === "deg"
            ) {
                direction = first.value;
                startIdx = 1;
            }
        }

        // Remaining values: re-group flat [color, pos?, color, pos?, ...]
        const stops: GradientStop[] = [];
        let i = startIdx;
        while (i < values.length) {
            const val = values[i];

            // Check if this is a color (ValueUnit with color superType or array)
            if (val instanceof ValueUnit && val.superType?.includes("color")) {
                const cssColor = val.toString();
                let position = -1;

                // Check for following position
                if (i + 1 < values.length) {
                    const next = values[i + 1];
                    if (
                        next instanceof ValueUnit &&
                        typeof next.value === "number" &&
                        next.unit === "%"
                    ) {
                        position = next.value;
                        i += 2;
                    } else {
                        i += 1;
                    }
                } else {
                    i += 1;
                }

                stops.push({ id: uid(), cssColor, position });
            } else if (Array.isArray(val)) {
                // Color stop group [color, pos?]
                const color = val[0];
                const cssColor = color?.toString() ?? "transparent";
                let position = -1;

                if (val.length > 1) {
                    const posVal = val[1];
                    if (posVal instanceof ValueUnit && typeof posVal.value === "number") {
                        position = posVal.value;
                    }
                }

                stops.push({ id: uid(), cssColor, position });
                i += 1;
            } else {
                i += 1;
            }
        }

        // Auto-fill positions for stops missing them
        if (stops.length > 0) {
            // First and last default to 0% and 100%
            if (stops[0]!.position < 0) stops[0]!.position = 0;
            if (stops[stops.length - 1]!.position < 0) stops[stops.length - 1]!.position = 100;

            // Fill gaps linearly
            for (let j = 1; j < stops.length - 1; j++) {
                if (stops[j]!.position < 0) {
                    // Find next stop with a position
                    let nextIdx = j + 1;
                    while (nextIdx < stops.length && stops[nextIdx]!.position < 0) nextIdx++;
                    const prevPos = stops[j - 1]!.position;
                    const nextPos = stops[nextIdx]?.position ?? 100;
                    const span = nextIdx - (j - 1);
                    stops[j]!.position = prevPos + ((nextPos - prevPos) * (j - (j - 1))) / span;
                }
            }
        }

        // Create default intervals (linear easing between each pair)
        const intervals: GradientInterval[] = [];
        for (let j = 0; j < Math.max(0, stops.length - 1); j++) {
            intervals.push({ easingName: "linear", easingFn: linear });
        }

        return { type, direction, stops, intervals };
    } catch {
        return null;
    }
}

// ── Composable ──

export function useGradientModel() {
    const type = ref<GradientType>("linear");
    const direction = ref(90);
    const stops = ref<GradientStop[]>([
        { id: uid(), cssColor: "oklch(0.75 0.15 145)", position: 0 },
        { id: uid(), cssColor: "oklch(0.65 0.18 265)", position: 100 },
    ]);
    const intervals = ref<GradientInterval[]>([
        { easingName: "linear", easingFn: linear },
    ]);
    const interpolationSpace = ref<ColorSpace>("oklch");
    const hueMethod = ref<HueInterpolationMethod>("shorter");
    const resolution = ref(32);

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

    // Coalesced CSS for rendering the gradient preview
    const coalescedCSS = computed(() => serializeCoalescedGradient(modelState.value));

    // Simple CSS for the code editor
    const simpleCSS = computed(() => serializeGradient(modelState.value));

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
