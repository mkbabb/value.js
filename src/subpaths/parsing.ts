/**
 * `@mkbabb/value.js/parsing` — the CSS grammar subpath (O.W2).
 *
 * Deliberately parse-that-COUPLED (gated by `proof:subpath-budget` C5 — this is
 * the ONE chunk that bundles the @keyframes grammar + the parse-that primitives,
 * which are themselves declared `external` so they resolve to the consumer's own
 * install). The whole `src/parsing/` surface lives here: the value/function/
 * stylesheet parsers, extractors, the animation-shorthand + scroll-timeline value
 * grammars, the serializer, and the color parser.
 */

// Easing parsers (CSS Easing Functions Level 1 + Level 2)
export { parseLinearStops, parseSteps } from "../parsing/easing";
export type { JumpTerm, StepsArgs } from "../parsing/easing";

// Parsers and parse functions
export {
    CSS_WIDE_KEYWORDS,
    CSSString,
    CSSFunction,
    CSSJSON,
    CSSValues,
    parseCSSValue,
    parseCSSPercent,
    parseCSSTime,
} from "../parsing";

// Stylesheet AST
export { parseCSSStylesheet } from "../parsing/stylesheet";
export type {
    Stylesheet,
    StylesheetItem,
    KeyframeRule,
    KeyframeSelector,
    Declaration,
    PropertyDescriptor,
} from "../parsing/stylesheet";

// Stylesheet extractors
export {
    extractKeyframes,
    extractProperties,
    extractStyleRules,
    extractAnimationOptions,
} from "../parsing/extract";
export type { CSSAnimationOptions } from "../parsing/extract";

// Animation shorthand parser/serializer
export {
    parseAnimationShorthand,
    reverseAnimationShorthand,
} from "../parsing/animation-shorthand";

// Scroll-driven-animation VALUE grammar (N.W11′)
export {
    parseAnimationTimeline,
    parseAnimationRange,
    parseAnimationRangeBoundary,
    parseTimelineScope,
    parseAnimationTrigger,
    extractTimelineOptions,
    serializeAnimationTimeline,
    serializeAnimationRange,
    serializeTimelineScope,
    serializeAnimationTrigger,
    serializeTimelineOptions,
} from "../parsing/scroll-timeline";
export type {
    CSSTimelineOptions,
    AnimationTimelineValue,
    AnimationRangeValue,
    AnimationTriggerValue,
    RangeBoundary,
    RangePhase,
    ViewInset,
    TimelineScopeValue,
    ScrollerKeyword,
    TimelineAxis,
    TriggerType,
} from "../parsing/scroll-timeline";

// Stylesheet serialiser + Prettier wrapper
export {
    serializeStylesheet,
    serializeStylesheetItem,
    serializeDeclaration,
    serializeKeyframeSelector,
    formatCSS,
    stylesheetToString,
} from "../parsing/serialize";

// CSS value-unit parser
export {
    CSSValueUnit,
    parseCSSValueUnit,
    reverseCSSTime,
    reverseCSSIterationCount,
} from "../parsing/units";

// Math-function evaluation
export { evaluateMathFunction } from "../parsing/math";

// Color parser
export {
    CSSColor,
    parseCSSColor,
    registerColorNames,
    clearCustomColorNames,
    getCustomColorNames,
} from "../parsing/color";
export type { ParsedColorUnit } from "../parsing/color";

// Parsing utilities
export {
    istring,
    identifier,
    none,
    integer,
    number,
    succeed,
    fail,
    tryParse,
    parseResult,
} from "../parsing/utils";
export type { ParseDiagnostic, OnParseError } from "../parsing/utils";
