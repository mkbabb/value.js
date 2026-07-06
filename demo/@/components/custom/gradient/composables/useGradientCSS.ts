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
import type { Color } from "@src/units/color";
import { mixColors } from "@src/units/color/mix";
import { linear, resolveEasing } from "@src/easing";
import type { TimingFunction } from "@src/easing";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";
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
    };
}

// ── The easing resolver (W5-9: the W1-6 `resolveEasing` consume) ──
//
// The interval's `css` LITERAL is the persisted truth; the picker's `fn`
// payload is a transient cache. Any interval whose fn is absent resolves
// through the library's canonical string→TimingFunction resolver — the demo
// never re-derives curve math from the literal.

const resolvedEasingCache = new Map<string, TimingFunction>();

/** The interval's live timing function: `fn` cache, else `resolveEasing(css)`. */
export function easingFnOf(interval: GradientInterval | undefined): TimingFunction {
    if (!interval) return linear;
    if (interval.fn) return interval.fn;
    const cached = resolvedEasingCache.get(interval.css);
    if (cached) return cached;
    try {
        const fn = resolveEasing(interval.css);
        resolvedEasingCache.set(interval.css, fn);
        return fn;
    } catch (err) {
        // Interval literals are internally minted (picker / linearInterval),
        // so this is a defect signal, not a user state — say so, loudly.
        console.warn(`easingFnOf: unresolvable easing literal "${interval.css}"`, err);
        return linear;
    }
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
    /** The mixed raw color (normalized [0,1]) in `model.interpolationSpace`. */
    color: Color<number>;
}

/**
 * The ONE sampling law (S.W5-8): eased sub-stops along the ramp, consumed by
 * BOTH the coalesced serializer (below) and the perceived-space plate's
 * trajectory/rungs (`usePerceivedRamp`) — the render and the instrument can
 * never disagree about what the ramp does.
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
        const easing = easingFnOf(intervals[i]);

        const c0 = cssToRawColor(s0.cssColor, interpolationSpace);
        const c1 = cssToRawColor(s1.cssColor, interpolationSpace);

        if (!c0 || !c1) continue;

        const posRange = s1.position - s0.position;

        for (let j = 0; j <= (i < stops.length - 2 ? stepsPerInterval - 1 : stepsPerInterval); j++) {
            const t = j / stepsPerInterval;
            const easedT = easing(t);
            const pos = s0.position + t * posRange;

            const mixed = mixColors(c0, c1, 1 - easedT, easedT, interpolationSpace, hueMethod);
            out.push({ position: pos, color: mixed });
        }
    }

    return out;
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

    const sub: GradientModelState = {
        type: "linear",
        direction: 90,
        stops: [
            { ...s0, position: 0 },
            { ...s1, position: 100 },
        ],
        intervals: [model.intervals[index] ?? linearInterval()],
        interpolationSpace: model.interpolationSpace,
        hueMethod: model.hueMethod,
    };
    const samples = sampleCoalescedStops(sub);
    if (samples.length === 0) return null;

    const parts = samples.map(
        (s) => `${rawColorToCSS(s.color)} ${s.position.toFixed(2)}%`,
    );
    return `linear-gradient(90deg, ${parts.join(", ")})`;
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
        parts.push(`${rawColorToCSS(sample.color)} ${sample.position.toFixed(2)}%`);
    }

    return `${typeName}(${parts.join(", ")})`;
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
