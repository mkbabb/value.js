/**
 * The CSS area barrel — the ONE place `src/css/`'s public/internal line is
 * drawn (PSL-1). `src/subpaths/css.ts` forwards this file whole, so a name
 * listed here is published on `@mkbabb/value.js/css` and a name left out is
 * not; there is no second list to keep in step.
 *
 * The type block below is the other half of that law (PSL-2): every type a
 * published `./css` signature RETURNS must be nameable from `./css`. The
 * four `CssValue` shapes, the colour vocabulary, `JumpPosition` and `Result`
 * are re-exported here for that reason — a consumer who writes down what
 * `parseCssValue` or `serializeCssColor` hands back no longer needs a second
 * dependency on `./value` or `./color`, and the emitted `css.d.ts` carries no
 * bare `declare` standing in for them.
 */
export type {
    AnimationRangeValue,
    AnimationTimelineValue,
    AnimationTriggerValue,
    CSSAnimationOptions,
    CSSPropertyDescriptor,
    CSSTimelineOptions,
    CollectedRule,
    CssColor,
    CssColorSpace,
    CssLinearStop,
    CssTimingFunction,
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    CustomFunctionRule,
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    KeyframesBlock,
    ParseIssue,
    ParseResult,
    PropertyRule,
    RangeBoundary,
    RangePhase,
    ScrollTimelineDescriptor,
    ScrollerKeyword,
    StyleRule,
    Stylesheet,
    StylesheetItem,
    TimelineAxis,
    TimelineScopeValue,
    TriggerType,
    ViewInset,
    ViewTimelineDescriptor,
} from "./types";
export type { CssCall, CssList, CssScalar, CssValue } from "../value";
/**
 * PSL-2 spelling, one authority (ESC-W9f-CSSD-VOCAB-SPELLING).
 *
 * `./css` returns `CssScalar`, whose colour payload is an `AnyColor` over this
 * vocabulary, so every one of these names must be nameable from `./css`. They
 * are taken from `../value` — the same module `CssScalar` itself comes from —
 * because a second spelling of the same declarations (`../color/index`) makes
 * the dts rollup emit a DUPLICATE, unexported copy per name (`Alpha_2`,
 * `Channel_2`, `ChannelsBySpace_2`, `Color_2`, `SpaceId_2` and a bare
 * `AnyColor`): G13's bare `declare`s and G14's `_2` mangles were that split
 * vocabulary, not a missing export. `ColorIssue` has no `../value` spelling and
 * keeps its own.
 */
export type {
    Alpha,
    AnyColor,
    Channel,
    ChannelsBySpace,
    Color,
    SpaceId,
} from "../value";
export type { ColorIssue } from "../color/index";
export type { JumpPosition } from "../easing";
export type { Result } from "../foundation/result";
export {
    parseCssColor,
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseKeyframeSelector,
    parseTimingFunction,
} from "./bbnf/index";
export { coerceToSyntax } from "./syntax";
export {
    parseAnimationRange,
    parseAnimationTimeline,
    serializeTimelineOptions,
} from "./timeline";
export { collectAnimationOptions, collectDeclarations } from "./rules";
export { serializeCssColor, serializeCssValue } from "./serialize";
export {
    collectCustomFunctions,
    collectKeyframes,
    collectPropertyDescriptors,
    collectStyleRules,
    collectTimelineOptions,
    parseStylesheet,
} from "./stylesheet";
