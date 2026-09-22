/**
 * THE SAMPLING LAW (X-W6 · X.W6.c, CC-058 · MT-GRADSTOP-3). "The colour of this
 * ramp at p" has exactly ONE implementation, and it lives here.
 *
 * Before this module there were two: the visualizer walked the intervals
 * exactly (`colorAtPosition`) to feed the add ghost and the minted colour,
 * while the CSS serializer sampled the same walk at 32 discrete steps to paint
 * the rail beneath that ghost — so the ghost and the ramp it floated over were
 * painted by different code. Now every reader goes through `sampleInterval`:
 * `sampleAt` locates the interval that holds p, and `sampleCoalescedStops`
 * walks every interval at the coalesce density. At every sub-stop the rail
 * paints, the rail and `sampleAt` are the same number by construction.
 *
 * The easing resolver lives here too, because an interval's colour at t IS its
 * curve applied to t: the resolver is the first half of the law, not a
 * serialization concern.
 */

import type { AnyColor } from "@mkbabb/value.js/color";
import { mixColors } from "@mkbabb/value.js/color";
import {
    CubicBezier,
    easing,
    linearEasing,
    steppedEase,
} from "@mkbabb/value.js/easing";
import type { EasingFunction, LinearEasingStop } from "@mkbabb/value.js/easing";
import { parseTimingFunction } from "@mkbabb/value.js/css";
import { clamp } from "@mkbabb/value.js/math";
import type { CssLinearStop, CssTimingFunction } from "@mkbabb/value.js/css";
import { parseColorIn } from "../../../color-session/color-utils";
import type { GradientInterval, GradientSampleSource, GradientStop } from "./types";

/**
 * Sub-stops across the coalesced ramp. Inlined constant (W5-11 / P2-14): the
 * former `resolution` ref had NO UI. Between two adjacent sub-stops the browser
 * blends in the space the serializer's ` in <space>` clause names, so the
 * density only has to carry the CURVE, never a space the CSS was not told.
 */
export const COALESCE_RESOLUTION = 32;

// ── CSS timing AST → numeric easing ──
//
// `/css` owns text and `/easing` owns numeric evaluation. The interval's CSS
// literal is persisted truth; the picker callable is only a live cache.

/** Keyed by user-typed CSS, so it is CAPPED — the in-repo precedent
 *  (`useContrastSafeColor`'s `tintLCache`) clears past 512, and so does this. */
const RESOLVED_EASING_CAP = 512;
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
            ? [
                  { output, input: input[0] },
                  { output, input: input[1] },
              ]
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
            expanded[anchor + j]!.input =
                expanded[anchor]!.input +
                ((expanded[i]!.input - expanded[anchor]!.input) * j) / span;
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
        throw new Error(
            `Invalid gradient easing "${interval.css}": ${parsed.diagnostics[0].code}`,
        );
    }
    const fn = timingFunctionValue(parsed.value, interval.css);
    if (resolvedEasingCache.size >= RESOLVED_EASING_CAP) resolvedEasingCache.clear();
    resolvedEasingCache.set(interval.css, fn);
    return fn;
}

// ── The law ──

/** One interval's colour as a function of its local parameter t ∈ [0, 1]. */
export type IntervalSampler = (t: number) => AnyColor;

/**
 * THE ONE IMPLEMENTATION: interval `s0 → s1` at local t is the two stop colours
 * mixed in the model's space, at the curve that `s0` OPENS, applied to t. The
 * endpoints are parsed once per interval, so a walk of many samples pays for
 * two parses, not for two per sample.
 *
 * THE CODOMAIN GUARD (fold W6·57, C-01 — the BLOCKER whose lethal predicate is
 * `range(curve) ⊄ [0, 1]`): a colour interval has no overshoot. The back family
 * (`ease-in-back`, `ease-out-back`, …) leaves [0, 1] by design, and the shipped
 * `mixColors` answers a progress outside it with `color_progress_out_of_range`
 * — correctly, the library is blameless — which the ramp used to rethrow and so
 * take the whole pane down on a single tile press. The mix progress is the
 * curve's value clamped to the interval's own codomain: while the curve is
 * outside [0, 1] the colour holds at the endpoint it overshot, and the curve's
 * true shape is still what its glyph and its authoring canvas draw.
 */
export function intervalSampler(
    s0: GradientStop,
    s1: GradientStop,
    source: Pick<GradientSampleSource, "interpolationSpace" | "hueMethod">,
): IntervalSampler {
    const { interpolationSpace, hueMethod } = source;
    const curve = easingFnOf(s0.easing);
    const c0 = parseColorIn(s0.cssColor, interpolationSpace);
    const c1 = parseColorIn(s1.cssColor, interpolationSpace);
    return (t) => {
        const mixed = mixColors(c0, c1, clamp(curve(t), 0, 1), {
            space: interpolationSpace,
            hue: hueMethod,
        });
        if (!mixed.ok) {
            throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
        }
        // A runtime SpaceId keeps the discriminant/channel pair intact;
        // TypeScript cannot distribute Color<SpaceId> back into AnyColor.
        return mixed.value as AnyColor;
    };
}

/**
 * The ramp's colour at a position (0–100). TOTAL over the model's invariants —
 * ≥2 stops, ordinal-sorted (X.W6.a) — so it has no throw of its own and no
 * `null` to return. A position past a terminal is that terminal; a position ON
 * an interior stop belongs to the interval that stop OPENS (t = 0), which is
 * the side the coalesced walk paints there, and a zero-span interval (a CSS
 * hard stop) is stepped over, because the rail's colour just past a hard stop
 * is the stop that opens the next span.
 */
export function sampleAt(source: GradientSampleSource, position: number): AnyColor {
    const { stops } = source;
    const first = stops[0]!;
    const last = stops[stops.length - 1]!;
    const p = Math.min(last.position, Math.max(first.position, position));
    let i = stops.findIndex(
        (s, k) => k < stops.length - 1 && p < stops[k + 1]!.position,
    );
    if (i < 0) i = stops.length - 2;
    const s0 = stops[i]!;
    const s1 = stops[i + 1]!;
    const span = s1.position - s0.position;
    return intervalSampler(s0, s1, source)(span > 0 ? (p - s0.position) / span : 1);
}

/** One eased sub-stop of the coalesced ramp (position 0–100). */
export interface CoalescedSample {
    position: number;
    /** The final color in `model.interpolationSpace`. */
    color: AnyColor;
}

/**
 * The coalesced walk: every interval sampled at the coalesce density, through
 * `intervalSampler` — the same law `sampleAt` applies — so the render tile, the
 * editing rail and each interval specimen are all painted from it.
 */
export function sampleCoalescedStops(source: GradientSampleSource): CoalescedSample[] {
    const { stops } = source;
    if (stops.length < 2) return [];

    const out: CoalescedSample[] = [];
    const stepsPerInterval = Math.max(
        2,
        Math.round(COALESCE_RESOLUTION / (stops.length - 1)),
    );

    for (let i = 0; i < stops.length - 1; i++) {
        const s0 = stops[i]!;
        const s1 = stops[i + 1]!;
        const at = intervalSampler(s0, s1, source);
        const posRange = s1.position - s0.position;
        // Every interval but the last stops short of t = 1: its end is the
        // next interval's t = 0, the same colour, painted once.
        const lastJ = i < stops.length - 2 ? stepsPerInterval - 1 : stepsPerInterval;
        for (let j = 0; j <= lastJ; j++) {
            const t = j / stepsPerInterval;
            out.push({ position: s0.position + t * posRange, color: at(t) });
        }
    }

    return out;
}
