import { cubicBezier, interpBezier } from "./math";

export function linear(t: number) {
    return t;
}

export function easeInQuad(t: number) {
    return t * t;
}

export function easeOutQuad(t: number) {
    return -t * (t - 2);
}

export function easeInOutQuad(t: number) {
    if ((t /= 0.5) < 1) return 0.5 * t * t;
    return -0.5 * (--t * (t - 2) - 1);
}

export function easeInCubic(t: number) {
    return t * t * t;
}

export function easeOutCubic(t: number) {
    return (t = t - 1) * t * t + 1;
}

export function easeInOutCubic(t: number) {
    if ((t /= 0.5) < 1) return 0.5 * t * t * t;
    return 0.5 * ((t -= 2) * t * t + 2);
}

export function smoothStep3(t: number) {
    return t * t * (3 - 2 * t);
}

/**
 * Solve X(t) = x for t using Newton-Raphson with bisection fallback.
 * X(t) = 3(1-t)^2*t*x1 + 3(1-t)*t^2*x2 + t^3
 */
function solveCubicBezierX(x: number, x1: number, x2: number, epsilon = 1e-6): number {
    let t = x; // initial guess
    for (let i = 0; i < 8; i++) {
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const xt = 3 * mt2 * t * x1 + 3 * mt * t2 * x2 + t3 - x;
        if (Math.abs(xt) < epsilon) return t;
        const dxt = 3 * mt2 * x1 + 6 * mt * t * (x2 - x1) + 3 * t2 * (1 - x2);
        if (Math.abs(dxt) < 1e-12) break;
        t -= xt / dxt;
    }
    // Bisection fallback
    let lo = 0,
        hi = 1;
    t = x;
    for (let i = 0; i < 64; i++) {
        const mt = 1 - t;
        const xt = 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t;
        if (Math.abs(xt - x) < epsilon) return t;
        if (x > xt) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
    }
    return t;
}

export const CSSCubicBezier =
    (x1: number, y1: number, x2: number, y2: number) => (x: number) => {
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        const t = solveCubicBezierX(x, x1, x2);
        return cubicBezier(t, x1, y1, x2, y2)[1];
    };

export function easeInBounce(t: number) {
    t = CSSCubicBezier(0.09, 0.91, 0.5, 1.5)(t);
    return t;
}

export function bounceInEase(t: number) {
    t = CSSCubicBezier(0.09, 0.91, 0.5, 1.5)(t);
    return t;
}

export function bounceInEaseHalf(t: number) {
    const points = [
        [0, 0],
        [0.026, 1.746],
        [0.633, 1.06],
        [1, 0],
    ];
    t = interpBezier(t, points)[1];
    return t;
}

export function bounceOutEase(t: number) {
    const points = [
        [0, 0],
        [0.367, 0.94],
        [0.974, 0.254],
        [1, 0],
    ];
    t = interpBezier(t, points)[1];
    return t;
}

export function bounceOutEaseHalf(t: number) {
    const points = [
        [0, 0],
        [0.026, 1.746],
        [0.633, 1.06],
        [1, 0],
    ];
    t = interpBezier(t, points)[1];
    return t;
}

export function bounceInOutEase(t: number) {
    const points = [
        [0, 0],
        [0.026, 1.746],
        [0.633, 1.06],
        [1, 0],
    ];
    t = interpBezier(t, points)[1];
    return t;
}

export function easeInSine(t: number) {
    return 1 - Math.cos((t * Math.PI) / 2);
}

export function easeOutSine(t: number) {
    return Math.sin((t * Math.PI) / 2);
}

export function easeInOutSine(t: number) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function easeInCirc(t: number) {
    return 1 - Math.sqrt(1 - t * t);
}

export function easeOutCirc(t: number) {
    return Math.sqrt(1 - --t * t);
}

export function easeInOutCirc(t: number) {
    if ((t /= 0.5) < 1) return -(Math.sqrt(1 - t * t) - 1) / 2;
    return (Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

export function easeInExpo(t: number) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

export function easeOutExpo(t: number) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeInOutExpo(t: number) {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * --t));
}

export const jumpTerms = [
    "jump-start",
    "jump-end",
    "jump-none",
    "jump-both",
    "start",
    "end",
    "both",
] as const;

function jumpStart(t: number, steps: number): number {
    return Math.ceil(t * steps) / steps;
}

function jumpEnd(t: number, steps: number): number {
    return Math.floor(t * steps) / steps;
}

function jumpBoth(t: number, steps: number): number {
    return Math.floor(t * (steps + 1)) / (steps + 1);
}

function jumpNone(t: number, steps: number): number {
    if (steps <= 1) return t;
    return Math.floor(t * (steps - 1)) / (steps - 1);
}

export function steppedEase(
    steps: number,
    jumpTerm: (typeof jumpTerms)[number] = "jump-end",
) {
    switch (jumpTerm) {
        case "jump-none":
            return (t: number) => jumpNone(t, steps);
        case "jump-start":
        case "start":
            return (t: number) => jumpStart(t, steps);
        case "jump-end":
        case "end":
            return (t: number) => jumpEnd(t, steps);
        case "jump-both":
        case "both":
            return (t: number) => jumpBoth(t, steps);
    }
}

export function stepStart() {
    return steppedEase(1, "jump-start");
}

export function stepEnd() {
    return steppedEase(1, "jump-end");
}

export const bezierPresets = {
    ease: [0.25, 0.1, 0.25, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "ease-in-back": [0.6, -0.28, 0.735, 0.045],
    "ease-out-back": [0.175, 0.885, 0.32, 1.275],
    "ease-in-out-back": [0.68, -0.55, 0.265, 1.55],
} as const;

export const timingFunctions = {
    linear,
    easeInQuad,
    "ease-in-quad": easeInQuad, // "easeInQuad",

    easeOutQuad,
    "ease-out-quad": easeOutQuad, // "easeOutQuad",

    easeInOutQuad,
    "ease-in-out-quad": easeInOutQuad, // "easeInOutQuad",

    easeInCubic,
    "ease-in-cubic": easeInCubic,

    easeOutCubic,
    "ease-out-cubic": easeOutCubic,

    easeInOutCubic,
    "ease-in-out-cubic": easeInOutCubic,

    easeInBounce,
    "ease-in-bounce": easeInBounce, // "easeInBounce",

    bounceInEase,
    "bounce-in-ease": bounceInEase,

    bounceInEaseHalf,
    "bounce-in-ease-half": bounceInEaseHalf,

    bounceOutEase,
    "bounce-out-ease": bounceOutEase,

    bounceOutEaseHalf,
    "bounce-out-ease-half": bounceOutEaseHalf,

    bounceInOutEase,
    "bounce-in-out-ease": bounceInOutEase,

    easeInSine,
    "ease-in-sine": easeInSine,

    easeOutSine,
    "ease-out-sine": easeOutSine,

    easeInOutSine,
    "ease-in-out-sine": easeInOutSine,

    easeInCirc,
    "ease-in-circ": easeInCirc,

    easeOutCirc,
    "ease-out-circ": easeOutCirc,

    easeInOutCirc,
    "ease-in-out-circ": easeInOutCirc,

    easeInExpo,
    "ease-in-expo": easeInExpo,

    easeOutExpo,
    "ease-out-expo": easeOutExpo,

    easeInOutExpo,
    "ease-in-out-expo": easeInOutExpo,

    smoothStep3,
    "smooth-step-3": smoothStep3,

    ease: CSSCubicBezier(...(bezierPresets.ease as [number, number, number, number])),
    "ease-in": CSSCubicBezier(...(bezierPresets["ease-in"] as [number, number, number, number])),
    "ease-out": CSSCubicBezier(...(bezierPresets["ease-out"] as [number, number, number, number])),
    "ease-in-out": CSSCubicBezier(...(bezierPresets["ease-in-out"] as [number, number, number, number])),
    "ease-in-back": CSSCubicBezier(...(bezierPresets["ease-in-back"] as [number, number, number, number])),
    "ease-out-back": CSSCubicBezier(...(bezierPresets["ease-out-back"] as [number, number, number, number])),
    "ease-in-out-back": CSSCubicBezier(...(bezierPresets["ease-in-out-back"] as [number, number, number, number])),
    steps: steppedEase,
    "step-start": stepStart,
    "step-end": stepEnd,
} as const;
