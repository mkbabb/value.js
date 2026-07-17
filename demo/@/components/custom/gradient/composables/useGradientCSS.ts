/**
 * Gradient CSS generation — serializes gradient model state to CSS strings
 * (simple, coalesced, and per-interval ramps) and owns the ONE sampling law
 * (`sampleCoalescedStops`) plus the easing resolver (`easingFnOf`).
 *
 * The strict model-or-reject PARSER lives in its own module
 * (`./gradientParse` — the S.W5-11 atomic boundary, lifted at cap-check).
 */

import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { AnyColor } from "@mkbabb/value.js/color";
import { mixColors } from "@mkbabb/value.js/color";
import {
    CubicBezier,
    easing,
    linear,
    linearEasing,
    steppedEase,
} from "@mkbabb/value.js/easing";
import type {
    EasingFunction,
    LinearEasingStop,
} from "@mkbabb/value.js/easing";
import { parseTimingFunction } from "@mkbabb/value.js/css";
import type {
    CssLinearStop,
    CssTimingFunction,
} from "@mkbabb/value.js/css";
import { colorToCss, parseColorIn } from "../../../../../color-session/color-utils";
import type {
    GradientModelState,
    GradientInterval,
} from "./useGradientModel";

/**
 * Sub-stops across the coalesced ramp. Inlined constant (W5-11 / P2-14): the
 * former `resolution` ref had NO UI — a dead affordance state. 32 across the
 * ramp keeps per-step Δ small enough that the browser's own linear blend
 * between adjacent sub-stops is imperceptible.
 */
export const COALESCE_RESOLUTION = 32;

// ── The linear interval seed ──
//
// The R.W4 `/easing` consume (easing-disposition.md §2.3): an interval carries
// the picker payload `{css, fn}`. The linear seed is byte-identical to what
// glass-ui's <EasingPicker> emits when seeded `:preset="linear"` (value.js
// `bezierPresets.linear = [0, 0, 1, 1]`), so a parsed-then-edited interval and
// a freshly-seeded picker can never disagree about "linear".

/** The `linear` preset seed — the default easing for every interval. */
export function linearInterval(): GradientInterval {
    return {
        mode: "bezier",
        css: "cubic-bezier(0, 0, 1, 1)",
        fn: linear,
        points: [0, 0, 1, 1],
        steps: 4,
        term: "jump-end",
    };
}

// ── CSS timing AST → numeric easing ──
//
// `/css` owns text and `/easing` owns numeric evaluation. The interval's CSS
// literal is persisted truth; the picker callable is only a live cache.

const resolvedEasingCache = new Map<string, EasingFunction>();

function easingValue(
    result: ReturnType<typeof CubicBezier>,
    source: string,
): EasingFunction {
    if (result.ok) return result.value;
    throw new Error(`Invalid gradient easing "${source}": ${result.error.code}`);
}

/** Resolve CSS linear()'s optional/double positions into numeric stops. */
function linearStops(stops: readonly CssLinearStop[]): LinearEasingStop[] {
    const expanded = stops.flatMap(({ output, input }) =>
        input.length === 2
            ? [{ output, input: input[0] }, { output, input: input[1] }]
            : [{ output, input: input[0] ?? Number.NaN }],
    );
    expanded[0]!.input = Number.isNaN(expanded[0]!.input) ? 0 : expanded[0]!.input;
    const last = expanded.length - 1;
    expanded[last]!.input = Number.isNaN(expanded[last]!.input)
        ? 1
        : Math.max(expanded[last]!.input, expanded[0]!.input);

    let anchor = 0;
    for (let i = 1; i <= last; i++) {
        if (Number.isNaN(expanded[i]!.input)) continue;
        expanded[i]!.input = Math.max(expanded[i]!.input, expanded[anchor]!.input);
        const span = i - anchor;
        for (let j = 1; j < span; j++) {
            expanded[anchor + j]!.input = expanded[anchor]!.input
                + (expanded[i]!.input - expanded[anchor]!.input) * j / span;
        }
        anchor = i;
    }
    return expanded;
}

function timingFunctionValue(ast: CssTimingFunction, source: string): EasingFunction {
    switch (ast.kind) {
        case "keyword":
            return easingValue(easing(ast.name), source);
        case "cubic-bezier":
            return easingValue(CubicBezier(ast.x1, ast.y1, ast.x2, ast.y2), source);
        case "steps":
            return easingValue(steppedEase(ast.count, ast.position), source);
        case "linear-function":
            return easingValue(linearEasing(linearStops(ast.stops)), source);
    }
}

/** The interval's live timing function: picker cache, else parsed CSS truth. */
export function easingFnOf(
    interval: Pick<GradientInterval, "css"> & Partial<Pick<GradientInterval, "fn">>,
): EasingFunction {
    if (interval.fn) return interval.fn;
    const cached = resolvedEasingCache.get(interval.css);
    if (cached) return cached;
    const parsed = parseTimingFunction(interval.css);
    if (!parsed.ok) {
        throw new Error(`Invalid gradient easing "${interval.css}": ${parsed.diagnostics[0].code}`);
    }
    const fn = timingFunctionValue(parsed.value, interval.css);
    resolvedEasingCache.set(interval.css, fn);
    return fn;
}

// ── Serialization ──

/** `33.3%`, never `33.300000%` / `0.0%` — the readout trims dead zeros. */
function fmtPos(position: number): string {
    return `${Number(position.toFixed(1))}%`;
}

/**
 * Serialize a gradient model to a simple CSS gradient string (user-editable).
 * Uses the raw stops only — no coalesced intermediate stops. Stop colors are
 * the model's `cssColor` strings verbatim (authored literals survive).
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
        parts.push(`${stop.cssColor} ${fmtPos(stop.position)}`);
    }

    return `${typeName}(${parts.join(", ")})`;
}

/** One eased sub-stop of the coalesced ramp (position 0–100). */
export interface CoalescedSample {
    position: number;
    /** The final color in `model.interpolationSpace`. */
    color: AnyColor;
}

/**
 * The ONE sampling law: eased sub-stops consumed by the coalesced renderer,
 * the normalized editing rail, and each interval specimen.
 */
export function sampleCoalescedStops(model: GradientModelState): CoalescedSample[] {
    const { stops, intervals, interpolationSpace, hueMethod } = model;
    if (stops.length < 2) return [];

    const out: CoalescedSample[] = [];
    const stepsPerInterval = Math.max(
        2,
        Math.round(COALESCE_RESOLUTION / (stops.length - 1)),
    );

    for (let i = 0; i < stops.length - 1; i++) {
        const s0 = stops[i]!;
        const s1 = stops[i + 1]!;
        const interval = intervals[i];
        if (!interval) throw new Error(`Gradient interval ${i} is missing`);
        const easing = easingFnOf(interval);

        const c0 = parseColorIn(s0.cssColor, interpolationSpace);
        const c1 = parseColorIn(s1.cssColor, interpolationSpace);

        const posRange = s1.position - s0.position;

        for (let j = 0; j <= (i < stops.length - 2 ? stepsPerInterval - 1 : stepsPerInterval); j++) {
            const t = j / stepsPerInterval;
            const easedT = easing(t);
            const pos = s0.position + t * posRange;

            const mixed = mixColors(c0, c1, easedT, {
                space: interpolationSpace,
                hue: hueMethod,
            });
            if (!mixed.ok) {
                throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
            }
            // A runtime SpaceId keeps the discriminant/channel pair intact;
            // TypeScript cannot distribute Color<SpaceId> back into AnyColor.
            out.push({ position: pos, color: mixed.value as AnyColor });
        }
    }

    return out;
}

/** Format eased samples as a normalized horizontal strip (the ONE ramp form). */
function rampGradient(samples: CoalescedSample[]): string {
    const parts = samples.map(
        (s) => `${colorToCss(s.color)} ${s.position.toFixed(2)}%`,
    );
    return `linear-gradient(90deg, ${parts.join(", ")})`;
}

/**
 * ONE interval's eased ramp, normalized to a full-width strip (W5-9 / P1-5:
 * the easing row's "ball" — what `steps(4, end)` does to green→blue, visible
 * in-row). Rides the SAME sampling law as the rendered gradient, so the
 * strip shows the interval exactly as the gradient will render it.
 */
export function serializeIntervalRamp(
    model: GradientModelState,
    index: number,
): string | null {
    const s0 = model.stops[index];
    const s1 = model.stops[index + 1];
    if (!s0 || !s1) return null;
    const interval = model.intervals[index];
    if (!interval) throw new Error(`Gradient interval ${index} is missing`);

    const sub: GradientModelState = {
        type: "linear",
        direction: 90,
        stops: [
            { ...s0, position: 0 },
            { ...s1, position: 100 },
        ],
        intervals: [interval],
        interpolationSpace: model.interpolationSpace,
        hueMethod: model.hueMethod,
    };
    return rampGradient(sampleCoalescedStops(sub));
}

/**
 * The rail-normalized projection (T.W6-2 / T-21b): the WHOLE model's eased
 * ramp as a horizontal `linear-gradient(90deg, …)` strip. The editing rail
 * ALWAYS paints this — at every type/direction — so handles, add-ghost,
 * rungs, and ramp share one axis by construction (the former raw-render-
 * string paint compressed/rotated/reversed/garbled the rail under any
 * non-default direction or type). The TRUE render (type + direction
 * applied) is the render tile's job (`serializeCoalescedGradient` — the
 * CSS-output truth). One sampling law feeds both.
 */
export function serializeRailRamp(model: GradientModelState): string {
    const { stops } = model;
    if (stops.length === 0) {
        return "linear-gradient(90deg, transparent, transparent)";
    }
    if (stops.length === 1) {
        return `linear-gradient(90deg, ${stops[0]!.cssColor}, ${stops[0]!.cssColor})`;
    }
    return rampGradient(sampleCoalescedStops(model));
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

    const { stops } = model;

    if (stops.length === 0) {
        return `${typeName}(transparent, transparent)`;
    }
    if (stops.length === 1) {
        return `${typeName}(${stops[0]!.cssColor}, ${stops[0]!.cssColor})`;
    }

    for (const sample of sampleCoalescedStops(model)) {
        parts.push(`${colorToCss(sample.color)} ${sample.position.toFixed(2)}%`);
    }

    return `${typeName}(${parts.join(", ")})`;
}


// ── Composable ──

export interface UseGradientCSSReturn {
    coalescedCSS: ComputedRef<string>;
    simpleCSS: ComputedRef<string>;
    /** The rail-normalized 90° projection (T.W6-2 — the editing rail's paint). */
    railRampCSS: ComputedRef<string>;
}

/**
 * Reactive CSS output from a gradient model state.
 * `coalescedCSS` bakes in per-interval easing (the render truth);
 * `simpleCSS` is user-editable; `railRampCSS` is the rail's normalized axis.
 */
export function useGradientCSS(
    modelState: ComputedRef<GradientModelState>,
): UseGradientCSSReturn {
    const coalescedCSS = computed(() => serializeCoalescedGradient(modelState.value));
    const simpleCSS = computed(() => serializeGradient(modelState.value));
    const railRampCSS = computed(() => serializeRailRamp(modelState.value));

    return {
        coalescedCSS,
        simpleCSS,
        railRampCSS,
    };
}
