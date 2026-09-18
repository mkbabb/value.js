import type { Color, ColorIssue } from "../color/model";
import type { Result } from "../foundation/result";
import type { JumpPosition } from "../easing";
import type { CssList, CssScalar, CssValue } from "../value";

export type CssColorSpace =
    | "rgb" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch"
    | "xyz" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020";
export type CssColor = { [S in CssColorSpace]: Color<S> }[CssColorSpace];
export type ParseIssue = Readonly<{
    code:
        | "css_syntax"
        | "trailing_input"
        | "keyframe_selector_invalid"
        | "color_context_required"
        | "syntax_descriptor_invalid"
        | "syntax_mismatch"
        | "animation_option_invalid"
        | "timeline_option_invalid";
    start: number;
    end: number;
    expected: readonly string[];
    actual: string | null;
}>;
export type ParseResult<T> =
    | { readonly ok: true; readonly value: T; readonly diagnostics: readonly [] }
    | { readonly ok: false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] };
export type CssLinearStop = Readonly<{
    output: number;
    input: readonly [] | readonly [number] | readonly [number, number];
}>;
export type CssTimingFunction =
    | Readonly<{ kind: "keyword"; name: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" }>
    | Readonly<{ kind: "cubic-bezier"; x1: number; y1: number; x2: number; y2: number }>
    | Readonly<{ kind: "steps"; count: number; position: JumpPosition }>
    | Readonly<{ kind: "linear-function"; stops: readonly CssLinearStop[] }>;
export type Declaration = Readonly<{
    name: string;
    value: CssValue;
    important: boolean;
}>;
export type KeyframeSelector =
    | Readonly<{ kind: "percent"; value: number }>
    | Readonly<{ kind: "named"; name: "entry" | "exit" | "cover" | "contain"; offset?: number }>;
export type KeyframeRule = Readonly<{
    selectors: readonly KeyframeSelector[];
    declarations: readonly Declaration[];
    timingFunction?: CssTimingFunction;
    composition?: "replace" | "add" | "accumulate";
}>;
export type CSSPropertyDescriptor = Readonly<{
    syntax?: string;
    inherits?: boolean;
    initialValue?: CssValue;
}>;
export type CustomFunctionParameter = Readonly<{
    name: string;
    syntax?: string;
    default?: CssValue;
}>;
export type CustomFunctionDescriptor = Readonly<{
    parameters?: readonly CustomFunctionParameter[];
    result?: CssValue;
    declarations?: readonly Declaration[];
}>;
export type CSSAnimationOptions = Readonly<{
    name?: string;
    duration?: number;
    delay?: number;
    iterationCount?: number;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    fillMode?: "none" | "forwards" | "backwards" | "both";
    timingFunction?: CssTimingFunction;
    composition?: "replace" | "add" | "accumulate";
}>;
export type ScrollerKeyword = "nearest" | "root" | "self";
export type TimelineAxis = "block" | "inline" | "x" | "y";
export type ViewInset = Readonly<{ start: string; end?: string }>;
export type AnimationTimelineValue =
    | Readonly<{ kind: "auto" }>
    | Readonly<{ kind: "none" }>
    | Readonly<{ kind: "name"; name: string }>
    | Readonly<{ kind: "scroll"; scroller?: ScrollerKeyword; axis?: TimelineAxis }>
    | Readonly<{ kind: "view"; axis?: TimelineAxis; inset?: ViewInset }>;
export type RangePhase =
    | "normal" | "cover" | "contain" | "entry" | "exit"
    | "entry-crossing" | "exit-crossing";
export type RangeBoundary = Readonly<{ phase?: RangePhase; offset?: string }>;
export type AnimationRangeValue = Readonly<{ start: RangeBoundary; end?: RangeBoundary }>;
export type TimelineScopeValue =
    | Readonly<{ kind: "none" }>
    | Readonly<{ kind: "all" }>
    | Readonly<{ kind: "names"; names: readonly string[] }>;
export type TriggerType = "once" | "repeat" | "alternate" | "state";
export type AnimationTriggerValue = Readonly<{
    type?: TriggerType;
    timeline?: AnimationTimelineValue;
    range?: AnimationRangeValue;
}>;
export type CSSTimelineOptions = Readonly<{
    timeline?: AnimationTimelineValue;
    timelines?: readonly AnimationTimelineValue[];
    range?: AnimationRangeValue;
    timelineScope?: TimelineScopeValue;
    trigger?: AnimationTriggerValue;
}>;
export type ScrollTimelineDescriptor = Readonly<{ source?: string; orientation?: TimelineAxis }>;
export type ViewTimelineDescriptor = Readonly<{ subject?: string; axis?: TimelineAxis; inset?: string }>;
export type StyleRule = Readonly<{
    kind: "style";
    selectors: readonly string[];
    declarations: readonly Declaration[];
    children?: readonly StylesheetItem[];
}>;
export type KeyframesBlock = Readonly<{ kind: "keyframes"; name: string; rules: readonly KeyframeRule[] }>;
export type PropertyRule = Readonly<{ kind: "property"; name: string; descriptor: CSSPropertyDescriptor }>;
export type CustomFunctionRule = Readonly<{ kind: "function"; name: string; descriptor: CustomFunctionDescriptor }>;
export type StylesheetItem =
    | KeyframesBlock
    | PropertyRule
    | CustomFunctionRule
    | Readonly<{ kind: "scope"; root?: readonly string[]; limit?: readonly string[]; children: readonly StylesheetItem[] }>
    | Readonly<{ kind: "starting-style"; children: readonly StylesheetItem[] }>
    | Readonly<{ kind: "scroll-timeline"; name: string; descriptor: ScrollTimelineDescriptor }>
    | Readonly<{ kind: "view-timeline"; name: string; descriptor: ViewTimelineDescriptor }>
    | StyleRule
    | Readonly<{ kind: "unknown"; atName: string; prelude: string; body: string | null; children?: readonly StylesheetItem[] }>;
export type Stylesheet = readonly StylesheetItem[];
export type CollectedRule<R extends StylesheetItem = StylesheetItem> = Readonly<{ rule: R; path: readonly number[] }>;

export type { ColorIssue, Result, JumpPosition, CssList, CssScalar, CssValue };
