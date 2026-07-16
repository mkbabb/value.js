import type { Result } from "./result";
import { err, ok } from "./result";

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
export type BezierPresetName = keyof typeof PRESETS;

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

const PRESETS = {
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

export const bezierPresets: Readonly<Record<BezierPresetName, readonly [number, number, number, number]>> = PRESETS;
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

const DIRECT_EASINGS: Readonly<Record<string, EasingFunction>> = Object.freeze({
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
});

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

export function easing(name: string): Result<EasingFunction, EasingIssue> {
    if (Object.hasOwn(DIRECT_EASINGS, name)) return ok(DIRECT_EASINGS[name]!);
    if (!(name in PRESETS)) return err({ code: "easing_name_unknown" });
    const [x1, y1, x2, y2] = PRESETS[name as BezierPresetName];
    return CubicBezier(x1, y1, x2, y2);
}
