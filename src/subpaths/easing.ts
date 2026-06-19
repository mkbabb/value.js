/**
 * `@mkbabb/value.js/easing` — timing functions + CSS easing parsers (O.W2).
 *
 * Deliberately parse-that-COUPLED (the `parseLinearStops`/`parseSteps` parsers in
 * `src/parsing/easing.ts` ride parse-that). A consumer wanting ONLY the pure
 * timing functions (parse-that-free) can import them from `./math`-adjacent
 * `../easing` — but the canonical easing surface bundles both the functions and
 * their CSS Easing L1/L2 parsers here.
 */

// Timing functions (parse-that-free — over `../math`)
export {
    linear, easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInOutCubic, smoothStep3,
    CSSCubicBezier, solveCubicBezierX,
    easeInBounce, bounceInEase, bounceInEaseHalf, bounceOutEase,
    bounceOutEaseHalf, bounceInOutEase,
    easeInSine, easeOutSine, easeInOutSine,
    easeInCirc, easeOutCirc, easeInOutCirc,
    easeInExpo, easeOutExpo, easeInOutExpo,
    jumpTerms, steppedEase, stepStart, stepEnd,
    cssLinear, bezierPresets, timingFunctions, timingFunctionDescriptions,
} from "../easing";
export type { LinearStop, TimingFunction } from "../easing";

// CSS Easing Functions L1 + L2 parsers (parse-that)
export { parseLinearStops, parseSteps } from "../parsing/easing";
export type { JumpTerm, StepsArgs } from "../parsing/easing";
