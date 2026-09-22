/**
 * Gradient CSS generation — serializes gradient model state to CSS strings
 * (simple, coalesced, and per-interval ramps) in ONE colour-literal dialect
 * (`formatColorLiteral`) and with the model's ` in <space>` clause.
 *
 * The sampling law these serializers print is NOT here: it lives in
 * `../model/sample` (X-W6 · X.W6.c), the one home of "the colour of this ramp
 * at p". The strict model-or-reject PARSER lives in its own module
 * (`./gradientParse` — the S.W5-11 atomic boundary, lifted at cap-check).
 */

import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { AnyColor, HueInterpolationMethod } from "@mkbabb/value.js/color";
import { linear } from "@mkbabb/value.js/easing";
import { colorToCss, parseColorIn } from "../../../color-session/color-utils";
import { convertPickerColor } from "../../../color-session/picker-color";
import type { PickerSpace } from "../../../color-session/picker-color";
import { sampleCoalescedStops } from "../model/sample";
import type { CoalescedSample } from "../model/sample";
import type {
    GradientInterval,
    GradientModelState,
    GradientSampleSource,
} from "../model/types";

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

// ── ONE colour-literal dialect (X-W6 · X.W6.c — c3) ──
//
// A stop the model MINTS (a bar press, the keyboard caret) and a stop the model
// SEEDS (the default pair, a reset) used to print in two grammars side by side
// in one copyable readout — `oklch(74.32% 0.15204 153.16deg)` beside
// `oklch(0.65 0.18 265)`. Every literal the model authors now prints through
// this one function: the shipped serializer's `oklch()` grammar (L as a
// percentage, hue in degrees), at a fixed per-channel precision. A literal the
// USER typed is still kept verbatim (P2-15) — the dialect governs what the
// model writes, never what it was given.

/** Decimal places per oklch channel: L (a 0–1 fraction → 2 places of %),
 *  C, and hue in degrees. */
const LITERAL_PLACES = [4, 5, 2] as const;
const ALPHA_PLACES = 4;

function roundTo(value: number, places: number): number {
    const k = 10 ** places;
    return Math.round(value * k) / k;
}

/** The one dialect every model-authored stop literal prints in. */
export function formatColorLiteral(color: AnyColor): string {
    const oklch = convertPickerColor(color, "oklch");
    const [l, c, h] = oklch.channels;
    return colorToCss({
        space: "oklch",
        channels: [
            l === "none" ? l : roundTo(l, LITERAL_PLACES[0]),
            c === "none" ? c : roundTo(c, LITERAL_PLACES[1]),
            h === "none" ? h : roundTo(h, LITERAL_PLACES[2]),
        ],
        alpha: oklch.alpha === "none" ? oklch.alpha : roundTo(oklch.alpha, ALPHA_PLACES),
    });
}

/** A seed literal restated in the one dialect (the model's default stops). */
export function seedLiteral(css: string): string {
    return formatColorLiteral(parseColorIn(css, "oklch"));
}

// ── The ` in <space>` clause (X-W6 · X.W6.c — c1 · G4b) ──
//
// Every serializer used to emit a bare `linear-gradient(90deg, …)` while the
// model's interpolation space was in scope, so the browser blended each pair of
// adjacent sub-stops in its own default space and the 32-sample density was
// compensating for a clause the CSS was never given. The clause is the
// css-color-4 §12 <color-interpolation-method>: the model's space under its
// CSS name, plus the hue method when the space is polar and the method is not
// the default `shorter`.

/** The model's space under its CSS <color-space> name. A space css-color-4
 *  cannot name (HSV; the non-CSS SpaceIds) has NO clause: the browser then
 *  blends adjacent sub-stops in its default space, and the coalesced samples —
 *  all taken through the model's own space by `../model/sample` — carry the
 *  path at the coalesce density. */
const CSS_INTERPOLATION_SPACE: Partial<Record<PickerSpace, string>> = {
    rgb: "srgb",
    "srgb-linear": "srgb-linear",
    "display-p3": "display-p3",
    "a98-rgb": "a98-rgb",
    "prophoto-rgb": "prophoto-rgb",
    rec2020: "rec2020",
    lab: "lab",
    oklab: "oklab",
    xyz: "xyz",
    hsl: "hsl",
    hwb: "hwb",
    lch: "lch",
    oklch: "oklch",
};

/** The polar CSS spaces — the only ones a <hue-interpolation-method> may follow. */
const POLAR_CSS_SPACES = new Set(["hsl", "hwb", "lch", "oklch"]);

/** `in oklch`, `in oklch longer hue`, `in srgb` — or `""` when the space has no
 *  CSS name. */
export function interpolationClause(
    space: PickerSpace,
    hue: HueInterpolationMethod,
): string {
    const cssSpace = CSS_INTERPOLATION_SPACE[space];
    if (!cssSpace) return "";
    const hueClause = POLAR_CSS_SPACES.has(cssSpace) && hue !== "shorter" ? ` ${hue} hue` : "";
    return `in ${cssSpace}${hueClause}`;
}

/** The gradient's first argument: geometry (angle / `from`) and the space
 *  clause, space-separated in the one argument css-images-4 gives them. */
function preamble(
    model: Pick<GradientModelState, "type" | "direction" | "interpolationSpace" | "hueMethod">,
): string | null {
    const geometry: string[] = [];
    if (model.type === "linear" && model.direction !== 180) {
        geometry.push(`${model.direction}deg`);
    } else if (model.type === "conic") {
        geometry.push(`from ${model.direction}deg`);
    }
    const spaceClause = interpolationClause(model.interpolationSpace, model.hueMethod);
    if (spaceClause) geometry.push(spaceClause);
    return geometry.length ? geometry.join(" ") : null;
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

/** The 90° strip head every normalized ramp shares, space clause included. */
function stripHead(source: GradientSampleSource): string {
    const spaceClause = interpolationClause(source.interpolationSpace, source.hueMethod);
    return spaceClause ? `linear-gradient(90deg ${spaceClause}, ` : "linear-gradient(90deg, ";
}

/** Format eased samples as a normalized horizontal strip (the ONE ramp form). */
function rampGradient(source: GradientSampleSource): string {
    const parts = sampleCoalescedStops(source).map(
        (s) => `${formatColorLiteral(s.color)} ${s.position.toFixed(2)}%`,
    );
    return `${stripHead(source)}${parts.join(", ")})`;
}

/**
 * THE ONE AXIS (X-W6 · X.W6.a — a3/a4/a12). A rail ordinal is expressed ONCE,
 * as a CSS length over the rail's own inset track, and BOTH languages read the
 * same two custom properties:
 *
 * - `--rail-inset` — half a handle seat, so a terminal handle is exactly
 *   contained at every type scale (there is no px literal to drift from the
 *   `rem`-tracking seat);
 * - `--rail-track` — `calc(100% - 2 * var(--rail-inset))`, the span between the
 *   two terminal handle CENTRES.
 *
 * Every handle's `left`, the add ghost's, the keyboard caret's and every
 * colour-stop position in the rail ramp are THIS expression. `100%` resolves
 * against the containing block's padding box for `left` and against the
 * gradient box for a colour stop — the rail carries no border (its hairline is
 * an inset ring), so those two boxes are one box and the two maps cannot
 * compute different pixels for the same ordinal.
 */
export function railPosition(fraction: number): string {
    return `calc(var(--rail-inset) + var(--rail-track) * ${Number(fraction.toFixed(6))})`;
}

/** The rail's ramp: the ONE map applied to every sample's position. */
function railRampGradient(source: GradientSampleSource): string {
    const parts = sampleCoalescedStops(source).map(
        (s: CoalescedSample) => `${formatColorLiteral(s.color)} ${railPosition(s.position / 100)}`,
    );
    return `${stripHead(source)}${parts.join(", ")})`;
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

    // `s0` carries the interval's own curve, so the sub-model is complete by
    // construction — the former index-keyed lookup and its throw are gone.
    const sub: GradientModelState = {
        type: "linear",
        direction: 90,
        stops: [
            { ...s0, position: 0 },
            { ...s1, position: 100 },
        ],
        interpolationSpace: model.interpolationSpace,
        hueMethod: model.hueMethod,
    };
    return rampGradient(sub);
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
    // Rail-ONLY: the samples ride the one axis expression, so the ordinal a
    // handle paints at is the ordinal the ramp paints there. Beyond the first
    // and last stop CSS extends the terminal colour, which is what fills the
    // two inset bands the handle centres never reach.
    return railRampGradient(model);
}

/**
 * Serialize a coalesced gradient — many intermediate stops that bake in
 * per-interval easing. This is the CSS that actually renders the gradient, so
 * it carries the model's ` in <space>` clause: between two sub-stops the
 * browser blends in the space the model mixes in.
 */
export function serializeCoalescedGradient(model: GradientModelState): string {
    const typeName = `${model.type}-gradient`;
    const parts: string[] = [];
    const head = preamble(model);
    if (head) parts.push(head);

    const { stops } = model;

    if (stops.length === 0) {
        return `${typeName}(transparent, transparent)`;
    }
    if (stops.length === 1) {
        return `${typeName}(${stops[0]!.cssColor}, ${stops[0]!.cssColor})`;
    }

    for (const sample of sampleCoalescedStops(model)) {
        parts.push(`${formatColorLiteral(sample.color)} ${sample.position.toFixed(2)}%`);
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
