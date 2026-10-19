import type { Result } from "./foundation/result";
import { err, ok } from "./foundation/result";

/**
 * PSL-2, published from the module that RETURNS it (ESC-W9d-DTS-SPELLING —
 * same mechanism as `src/value.ts`'s block). `easing`, `steppedEase` and
 * `linearEasing` all answer in a `Result`, so it must be nameable from
 * `./easing`; declared here it arrives under this module's own spelling
 * instead of as a bare `declare` in `easing.d.ts` (G13).
 */
export type { Result } from "./foundation/result";

export type EasingFunction = (progress: number) => number;
export type EasingIssue = Readonly<{ code:
    | "easing_non_finite"
    | "bezier_x_out_of_range"
    | "step_count_invalid"
    | "jump_position_invalid"
    | "linear_stop_invalid"
    | "easing_name_unknown"
}>;
export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";
export type LinearEasingStop = Readonly<{ output: number; input: number }>;
export type BezierPresetName = keyof typeof bezierPresets;

export function linear(progress: number): number {
    return progress;
}

export const easeOutCubic: EasingFunction = (p) => 1 - (1 - p) ** 3;
export const easeInOutSine: EasingFunction = (p) => -(Math.cos(Math.PI * p) - 1) / 2;
export const easeInOutCubic: EasingFunction = (p) => p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
export const easeInOutQuad: EasingFunction = (p) => p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
export const easeInOutExpo: EasingFunction = (p) => p === 0 || p === 1
    ? p
    : p < 0.5 ? 2 ** (20 * p - 10) / 2 : (2 - 2 ** (-20 * p + 10)) / 2;
export const easeInOutCirc: EasingFunction = (p) => p < 0.5
    ? (1 - Math.sqrt(1 - (2 * p) ** 2)) / 2
    : (Math.sqrt(1 - (-2 * p + 2) ** 2) + 1) / 2;
export const easeOutExpo: EasingFunction = (p) => p === 1 ? 1 : 1 - 2 ** (-10 * p);
export const smoothStep3: EasingFunction = (p) => p * p * (3 - 2 * p);

/**
 * The RESTORED analytic in/out arms (RD-5, X-W9.f).
 *
 * Since 0.13.0 these eight names resolved through the cubic-bezier `PRESETS`
 * table below, so `easing("ease-out-circ")` returned an APPROXIMATION of the
 * curve its own name denotes — measured drift 8 of 22 names, max |Δ| = 0.192
 * on `ease-out-circ` over 1001 samples. RD-5 ruled RESTORE over an
 * `approximated: boolean` discriminant, because a discriminant labels the
 * wrong curve instead of curing it.
 *
 * They are module-private on purpose: they are bound to the catalog names the
 * 40-name fence (G25) already publishes, and exporting eight new flat symbols
 * would grow the catalog keyframes snapshots as `timingFunctionEntries`.
 * `bezierPresets` keeps all 30 of its keys unchanged — only `easing(name)`
 * resolution moves.
 */
const easeInSine: EasingFunction = (p) => 1 - Math.cos((p * Math.PI) / 2);
const easeOutSine: EasingFunction = (p) => Math.sin((p * Math.PI) / 2);
const easeInQuad: EasingFunction = (p) => p * p;
const easeOutQuad: EasingFunction = (p) => 1 - (1 - p) * (1 - p);
const easeInCubic: EasingFunction = (p) => p ** 3;
const easeInExpo: EasingFunction = (p) => p === 0 ? 0 : 2 ** (10 * p - 10);
const easeInCirc: EasingFunction = (p) => 1 - Math.sqrt(1 - p ** 2);
const easeOutCirc: EasingFunction = (p) => Math.sqrt(1 - (p - 1) ** 2);

export const bezierPresets = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "smooth-step-3": [0.65, 0, 0.35, 1],
    "ease-in-sine": [0.47, 0, 0.745, 0.715],
    "ease-out-sine": [0.39, 0.575, 0.565, 1],
    "ease-in-out-sine": [0.445, 0.05, 0.55, 0.95],
    "ease-in-quad": [0.55, 0.085, 0.68, 0.53],
    "ease-out-quad": [0.25, 0.46, 0.45, 0.94],
    "ease-in-out-quad": [0.455, 0.03, 0.515, 0.955],
    "ease-in-cubic": [0.55, 0.055, 0.675, 0.19],
    "ease-out-cubic": [0.215, 0.61, 0.355, 1],
    "ease-in-out-cubic": [0.645, 0.045, 0.355, 1],
    "ease-in-quart": [0.895, 0.03, 0.685, 0.22],
    "ease-out-quart": [0.165, 0.84, 0.44, 1],
    "ease-in-out-quart": [0.77, 0, 0.175, 1],
    "ease-in-quint": [0.755, 0.05, 0.855, 0.06],
    "ease-out-quint": [0.23, 1, 0.32, 1],
    "ease-in-out-quint": [0.86, 0, 0.07, 1],
    "ease-in-expo": [0.95, 0.05, 0.795, 0.035],
    "ease-out-expo": [0.19, 1, 0.22, 1],
    "ease-in-out-expo": [1, 0, 0, 1],
    "ease-in-circ": [0.6, 0.04, 0.98, 0.335],
    "ease-out-circ": [0.075, 0.82, 0.165, 1],
    "ease-in-out-circ": [0.785, 0.135, 0.15, 0.86],
    "ease-in-back": [0.6, -0.28, 0.735, 0.045],
    "ease-out-back": [0.175, 0.885, 0.32, 1.275],
    "ease-in-out-back": [0.68, -0.55, 0.265, 1.55],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/**
 * The bezier catalog as a PROTOTYPE-FREE lookup table.
 *
 * `easing(name)` takes a caller-supplied string. Against the object literal
 * above, `"constructor" in bezierPresets` was TRUE through the prototype chain,
 * and `:169` then destructured the `Object` constructor —
 * `TypeError: function is not iterable` on a public entry, for 5/5
 * `Object.prototype` keys, at MODULE EVALUATION time in keyframes
 * (R1 §A2, `value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md`). With no
 * prototype, an unknown key reads `undefined` and the `in` test is gone. The
 * literal above stays the single authored source of both this table and
 * `BezierPresetName`; the 30-key set is unchanged (G25's fence). X-W9.a.
 */
const PRESETS: Readonly<Record<string, readonly [number, number, number, number]>> = Object.freeze(
    Object.assign(Object.create(null) as Record<string, readonly [number, number, number, number]>, bezierPresets),
);

export const jumpTerms = ["jump-start", "jump-end", "jump-none", "jump-both"] as const;

function bezierCoordinate(t: number, a: number, b: number): number {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t ** 3;
}

function solveBezierX(x: number, x1: number, x2: number): number {
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 24; i++) {
        const value = bezierCoordinate(t, x1, x2);
        if (Math.abs(value - x) < 1e-7) break;
        if (value < x) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
    }
    return t;
}

export const easeInBounce: EasingFunction = (progress) => {
    if (progress === 0 || progress === 1) return progress;
    return bezierCoordinate(solveBezierX(progress, 0.09, 0.5), 0.91, 1.5);
};

/** Prototype-free for the same reason as `PRESETS`: `easing(name)`'s argument is
 *  caller-supplied, and `DIRECT_EASINGS["constructor"]` was the `Object`
 *  constructor on the shipped literal. */
const DIRECT_EASINGS: Readonly<Record<string, EasingFunction>> = Object.freeze(Object.assign(Object.create(null) as Record<string, EasingFunction>, {
    linear,
    easeOutCubic,
    "ease-out-cubic": easeOutCubic,
    easeInOutSine,
    "ease-in-out-sine": easeInOutSine,
    easeInOutCubic,
    "ease-in-out-cubic": easeInOutCubic,
    easeInOutQuad,
    "ease-in-out-quad": easeInOutQuad,
    easeInOutExpo,
    "ease-in-out-expo": easeInOutExpo,
    easeInOutCirc,
    "ease-in-out-circ": easeInOutCirc,
    easeOutExpo,
    "ease-out-expo": easeOutExpo,
    smoothStep3,
    "smooth-step-3": smoothStep3,
    easeInBounce,
    "ease-in-bounce": easeInBounce,
    "ease-in-sine": easeInSine,
    "ease-out-sine": easeOutSine,
    "ease-in-quad": easeInQuad,
    "ease-out-quad": easeOutQuad,
    "ease-in-cubic": easeInCubic,
    "ease-in-expo": easeInExpo,
    "ease-in-circ": easeInCirc,
    "ease-out-circ": easeOutCirc,
}));

/**
 * The published catalog — every name `easing()` resolves, in one authored
 * order: the 30 `bezierPresets` keys, then the direct-only names. It is the
 * exact 40-name set keyframes snapshots at
 * `compile/easing/registry.ts:29` (`Object.keys(bezierPresets)` +
 * `"ease-in-bounce"` + its 9 `DIRECT_NAMES`), so the fence G25 holds by
 * derivation rather than by a second hand-kept list.
 */
const CATALOG: readonly string[] = Object.freeze([
    ...Object.keys(bezierPresets),
    ...Object.keys(DIRECT_EASINGS).filter((name) => !Object.hasOwn(bezierPresets, name)),
]);

/**
 * The catalog, as data. fourier keeps a local 22-label list because 4.0.0
 * published no way to ask (I-3); this is the ask. The returned array is
 * frozen and reference-stable, so a consumer may hold it.
 */
export function easingNames(): readonly string[] {
    return CATALOG;
}

export function CubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): Result<EasingFunction, EasingIssue> {
    if (![x1, y1, x2, y2].every(Number.isFinite)) return err({ code: "easing_non_finite" });
    if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) return err({ code: "bezier_x_out_of_range" });
    return ok((progress) => {
        if (!Number.isFinite(progress)) return Number.NaN;
        if (progress === 0 || progress === 1) return progress;
        return bezierCoordinate(solveBezierX(progress, x1, x2), y1, y2);
    });
}

export function steppedEase(
    count: number,
    position: JumpPosition = "jump-end",
): Result<EasingFunction, EasingIssue> {
    if (!Number.isFinite(count)) return err({ code: "easing_non_finite" });
    if (!(jumpTerms as readonly string[]).includes(position)) return err({ code: "jump_position_invalid" });
    if (!Number.isInteger(count) || count <= 0 || (position === "jump-none" && count < 2)) {
        return err({ code: "step_count_invalid" });
    }
    const jumps = count + (position === "jump-both" ? 1 : position === "jump-none" ? -1 : 0);
    const offset = position === "jump-start" || position === "jump-both" ? 1 : 0;
    return ok((progress) => Math.max(0, Math.min(1, (Math.floor(progress * count) + offset) / jumps)));
}

export function linearEasing(stops: readonly LinearEasingStop[]): Result<EasingFunction, EasingIssue> {
    if (stops.length < 2 || stops.some((s) => !Number.isFinite(s.input) || !Number.isFinite(s.output))) {
        return err({ code: "linear_stop_invalid" });
    }
    const resolved = stops.map((s) => ({ ...s }));
    for (let i = 1; i < resolved.length; i++) {
        if (resolved[i]!.input < resolved[i - 1]!.input) return err({ code: "linear_stop_invalid" });
    }
    return ok((progress) => {
        if (progress < resolved[0]!.input) return resolved[0]!.output;
        const last = resolved.at(-1)!;
        if (progress > last.input) return last.output;
        let lo = 0;
        while (lo + 1 < resolved.length && resolved[lo + 1]!.input <= progress) lo++;
        if (resolved[lo]!.input === progress || lo === resolved.length - 1) return resolved[lo]!.output;
        const a = resolved[lo]!;
        const b = resolved[lo + 1]!;
        return a.output + ((progress - a.input) / (b.input - a.input)) * (b.output - a.output);
    });
}

/**
 * The bezier arm's memo. `DIRECT_EASINGS` already handed out one stable
 * reference per name; the preset arm built a fresh closure on every call, so
 * 21 of the 40 catalog names failed `easing(n).value === easing(n).value` and
 * keyframes had to build `timingFunctionEntries` at module evaluation to make
 * identity stable at all (K1). A `Map` is the carrier, not an object literal,
 * for the same reason `PRESETS` is prototype-free: `name` is caller-supplied.
 */
const BEZIER_MEMO = new Map<string, EasingFunction>();

export function easing(name: string): Result<EasingFunction, EasingIssue> {
    const direct = DIRECT_EASINGS[name];
    if (direct !== undefined) return ok(direct);
    const memoised = BEZIER_MEMO.get(name);
    if (memoised !== undefined) return ok(memoised);
    const preset = PRESETS[name];
    if (preset === undefined) return err({ code: "easing_name_unknown" });
    const [x1, y1, x2, y2] = preset;
    const built = CubicBezier(x1, y1, x2, y2);
    if (!built.ok) return built;
    BEZIER_MEMO.set(name, built.value);
    return ok(built.value);
}
