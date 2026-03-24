/**
 * Gradient CSS generation and parsing — serializes gradient model state
 * to CSS strings (both simple and coalesced) and parses CSS gradient
 * strings back into model state.
 */

import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { mixColors } from "@src/units/color/utils";
import { parseCSSValue } from "@src/parsing";
import { linear } from "@src/easing";
import { FunctionValue, ValueUnit } from "@src/units";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";
import type {
    GradientModelState,
    GradientType,
    GradientStop,
    GradientInterval,
} from "./useGradientModel";

// ── Helpers ──

function resolveColor(css: string, space: ColorSpace) {
    return cssToRawColor(css, space);
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

/** UID generator for parsed stops. */
let nextParseId = 0;
function uid(): string {
    return `stop-${++nextParseId}-${Date.now().toString(36)}`;
}

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

export interface UseGradientCSSReturn {
    coalescedCSS: ComputedRef<string>;
    simpleCSS: ComputedRef<string>;
}

/**
 * Reactive CSS output from a gradient model state.
 * `coalescedCSS` bakes in per-interval easing; `simpleCSS` is user-editable.
 */
export function useGradientCSS(
    modelState: ComputedRef<GradientModelState>,
): UseGradientCSSReturn {
    const coalescedCSS = computed(() => serializeCoalescedGradient(modelState.value));
    const simpleCSS = computed(() => serializeGradient(modelState.value));

    return {
        coalescedCSS,
        simpleCSS,
    };
}
