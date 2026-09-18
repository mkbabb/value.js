import * as liveRuntime from "../../../../../../../src/css/index.js";
import type * as Live from "../../../../../../../src/css/index.js";
import * as mirrorRuntime from "../index.js";
import type * as Mirror from "../index.js";

type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
        ? (<T>() => T extends B ? 1 : 2) extends (<T>() => T extends A ? 1 : 2)
            ? true
            : false
        : false;
type Assert<T extends true> = T;

export type TypeContract = [
    Assert<Equal<Live.AnimationRangeValue, Mirror.AnimationRangeValue>>,
    Assert<Equal<Live.AnimationTimelineValue, Mirror.AnimationTimelineValue>>,
    Assert<Equal<Live.AnimationTriggerValue, Mirror.AnimationTriggerValue>>,
    Assert<Equal<Live.CSSAnimationOptions, Mirror.CSSAnimationOptions>>,
    Assert<Equal<Live.CSSPropertyDescriptor, Mirror.CSSPropertyDescriptor>>,
    Assert<Equal<Live.CSSTimelineOptions, Mirror.CSSTimelineOptions>>,
    Assert<Equal<Live.CollectedRule, Mirror.CollectedRule>>,
    Assert<Equal<Live.CssColor, Mirror.CssColor>>,
    Assert<Equal<Live.CssColorSpace, Mirror.CssColorSpace>>,
    Assert<Equal<Live.CssLinearStop, Mirror.CssLinearStop>>,
    Assert<Equal<Live.CssTimingFunction, Mirror.CssTimingFunction>>,
    Assert<Equal<Live.CustomFunctionDescriptor, Mirror.CustomFunctionDescriptor>>,
    Assert<Equal<Live.CustomFunctionParameter, Mirror.CustomFunctionParameter>>,
    Assert<Equal<Live.CustomFunctionRule, Mirror.CustomFunctionRule>>,
    Assert<Equal<Live.Declaration, Mirror.Declaration>>,
    Assert<Equal<Live.KeyframeRule, Mirror.KeyframeRule>>,
    Assert<Equal<Live.KeyframeSelector, Mirror.KeyframeSelector>>,
    Assert<Equal<Live.KeyframesBlock, Mirror.KeyframesBlock>>,
    Assert<Equal<Live.ParseIssue, Mirror.ParseIssue>>,
    Assert<Equal<Live.ParseResult<unknown>, Mirror.ParseResult<unknown>>>,
    Assert<Equal<Live.PropertyRule, Mirror.PropertyRule>>,
    Assert<Equal<Live.RangeBoundary, Mirror.RangeBoundary>>,
    Assert<Equal<Live.RangePhase, Mirror.RangePhase>>,
    Assert<Equal<Live.ScrollTimelineDescriptor, Mirror.ScrollTimelineDescriptor>>,
    Assert<Equal<Live.ScrollerKeyword, Mirror.ScrollerKeyword>>,
    Assert<Equal<Live.StyleRule, Mirror.StyleRule>>,
    Assert<Equal<Live.Stylesheet, Mirror.Stylesheet>>,
    Assert<Equal<Live.StylesheetItem, Mirror.StylesheetItem>>,
    Assert<Equal<Live.TimelineAxis, Mirror.TimelineAxis>>,
    Assert<Equal<Live.TimelineScopeValue, Mirror.TimelineScopeValue>>,
    Assert<Equal<Live.TriggerType, Mirror.TriggerType>>,
    Assert<Equal<Live.ViewInset, Mirror.ViewInset>>,
    Assert<Equal<Live.ViewTimelineDescriptor, Mirror.ViewTimelineDescriptor>>,
];

export type RuntimeContract = [
    Assert<Equal<typeof liveRuntime.coerceToSyntax, typeof mirrorRuntime.coerceToSyntax>>,
    Assert<Equal<typeof liveRuntime.collectAnimationOptions, typeof mirrorRuntime.collectAnimationOptions>>,
    Assert<Equal<typeof liveRuntime.collectCustomFunctions, typeof mirrorRuntime.collectCustomFunctions>>,
    Assert<Equal<typeof liveRuntime.collectDeclarations, typeof mirrorRuntime.collectDeclarations>>,
    Assert<Equal<typeof liveRuntime.collectKeyframes, typeof mirrorRuntime.collectKeyframes>>,
    Assert<Equal<typeof liveRuntime.collectPropertyDescriptors, typeof mirrorRuntime.collectPropertyDescriptors>>,
    Assert<Equal<typeof liveRuntime.collectStyleRules, typeof mirrorRuntime.collectStyleRules>>,
    Assert<Equal<typeof liveRuntime.collectTimelineOptions, typeof mirrorRuntime.collectTimelineOptions>>,
    Assert<Equal<typeof liveRuntime.parseAnimationRange, typeof mirrorRuntime.parseAnimationRange>>,
    Assert<Equal<typeof liveRuntime.parseAnimationTimeline, typeof mirrorRuntime.parseAnimationTimeline>>,
    Assert<Equal<typeof liveRuntime.parseCssColor, typeof mirrorRuntime.parseCssColor>>,
    Assert<Equal<typeof liveRuntime.parseCssScalar, typeof mirrorRuntime.parseCssScalar>>,
    Assert<Equal<typeof liveRuntime.parseCssValue, typeof mirrorRuntime.parseCssValue>>,
    Assert<Equal<typeof liveRuntime.parseCssValues, typeof mirrorRuntime.parseCssValues>>,
    Assert<Equal<typeof liveRuntime.parseKeyframeSelector, typeof mirrorRuntime.parseKeyframeSelector>>,
    Assert<Equal<typeof liveRuntime.parseStylesheet, typeof mirrorRuntime.parseStylesheet>>,
    Assert<Equal<typeof liveRuntime.parseTimingFunction, typeof mirrorRuntime.parseTimingFunction>>,
    Assert<Equal<typeof liveRuntime.serializeCssColor, typeof mirrorRuntime.serializeCssColor>>,
    Assert<Equal<typeof liveRuntime.serializeTimelineOptions, typeof mirrorRuntime.serializeTimelineOptions>>,
];

