// The CSS-animation timeline-value cluster barrel (T.W1-src §3).
//
// The `<easing-function>` value grammar (`easing.ts`) + the
// `animation-timeline`/`-range`/`-trigger` grammar (`scroll-timeline.ts`) — the
// two CSS-animation VALUE parsers, distinct from the property parsers in the
// flat `parsing/` core. Named re-exports only (never `export *`, PI-6).
export {
    parseLinearStops,
    parseSteps,
    parseSpring,
    lowerSpringEasing,
    resolveEasingFunction,
} from "./easing";
export type { JumpTerm, StepsArgs } from "./easing";
export {
    parseAnimationTimeline,
    parseAnimationTimelineList,
    parseAnimationRangeBoundary,
    parseAnimationRange,
    parseTimelineScope,
    parseAnimationTrigger,
    serializeAnimationTimeline,
    serializeAnimationRange,
    serializeTimelineScope,
    serializeAnimationTrigger,
    serializeTimelineOptions,
    extractTimelineOptions,
    extractNamedTimelines,
} from "./scroll-timeline";
export type {
    ScrollerKeyword,
    TimelineAxis,
    AnimationTimelineValue,
    ViewInset,
    RangePhase,
    RangeBoundary,
    AnimationRangeValue,
    TimelineScopeValue,
    TriggerType,
    AnimationTriggerValue,
    CSSTimelineOptions,
    NamedTimelineRegistry,
} from "./scroll-timeline";
