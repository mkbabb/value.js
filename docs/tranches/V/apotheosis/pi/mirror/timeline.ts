import type { Parser } from "@mkbabb/parse-that";
import {
    cssComponentDocumentGrammar,
    cssDeclarationValueGrammar,
    cssRecoveringComponentDocumentGrammar,
} from "./grammar/css/l4/syntax/component-value.js";
import { preprocessCss } from "./grammar/css/l4/syntax/source.js";
import type { CssComponentValue, CssFunction, CssToken } from "./grammar/css/l4/syntax/types.js";
import { failure, success } from "./result.js";
import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    AnimationTriggerValue,
    CSSTimelineOptions,
    ParseResult,
    RangeBoundary,
    RangePhase,
    TimelineAxis,
    TimelineScopeValue,
} from "./types.js";

type TimelineOutcome = ParseResult<AnimationTimelineValue>;
type RangeOutcome = ParseResult<AnimationRangeValue>;

function significant(components: readonly CssComponentValue[]): readonly CssComponentValue[] {
    return components.filter(({ kind }) => kind !== "whitespace" && kind !== "comment");
}

function token(component: CssComponentValue | undefined): CssToken | undefined {
    return component !== undefined
        && component.kind !== "function-block"
        && component.kind !== "simple-block"
        && component.kind !== "whitespace"
        && component.kind !== "comment"
        ? component as CssToken
        : undefined;
}

function identValue(component: CssComponentValue | undefined): string | undefined {
    const item = token(component);
    return item?.kind === "ident" ? String(item.value) : undefined;
}

function timelineOffset(component: CssComponentValue | undefined): string | undefined {
    const item = token(component);
    if (item === undefined) return undefined;
    const exponent = /^[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)[eE][+-]?[0-9]+/.test(item.raw);
    if (item.kind === "ident" && String(item.value).toLowerCase() === "auto") return item.raw;
    if (item.kind === "number") return item.value === 0 && !exponent ? item.raw : undefined;
    if (item.kind === "percentage") return exponent ? undefined : item.raw;
    if (item.kind !== "dimension" || exponent) return undefined;
    const unit = String(item.unit ?? "");
    for (let index = 0; index < unit.length; index++) {
        const code = unit.charCodeAt(index);
        if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) return undefined;
    }
    return item.raw;
}

const AXES = new Set<TimelineAxis>(["block", "inline", "x", "y"]);
const SCROLLERS = new Set(["nearest", "root", "self"] as const);

function scrollTimeline(fn: CssFunction): TimelineOutcome {
    const result: { kind: "scroll"; scroller?: "nearest" | "root" | "self"; axis?: TimelineAxis } = { kind: "scroll" };
    for (const component of significant(fn.value)) {
        const word = identValue(component)?.toLowerCase();
        if (word !== undefined && SCROLLERS.has(word as "nearest" | "root" | "self") && result.scroller === undefined) {
            result.scroller = word as "nearest" | "root" | "self";
        } else if (word !== undefined && AXES.has(word as TimelineAxis) && result.axis === undefined) {
            result.axis = word as TimelineAxis;
        } else {
            return failure("", "timeline_option_invalid", ["scroll timeline"]);
        }
    }
    return success(result);
}

function viewTimeline(fn: CssFunction): TimelineOutcome {
    const result: { kind: "view"; axis?: TimelineAxis; inset?: { start: string; end?: string } } = { kind: "view" };
    const inset: string[] = [];
    for (const component of significant(fn.value)) {
        const word = identValue(component)?.toLowerCase();
        const offset = timelineOffset(component);
        if (word !== undefined && AXES.has(word as TimelineAxis) && result.axis === undefined) {
            result.axis = word as TimelineAxis;
        } else if (offset !== undefined && inset.length < 2) {
            inset.push(offset);
        } else {
            return failure("", "timeline_option_invalid", ["view timeline"]);
        }
    }
    if (inset[0] !== undefined) {
        result.inset = inset[1] === undefined ? { start: inset[0] } : { start: inset[0], end: inset[1] };
    }
    return success(result);
}

function projectTimeline(components: readonly CssComponentValue[]): TimelineOutcome {
    const roots = significant(components);
    if (roots.length !== 1) return failure("", "timeline_option_invalid", ["timeline"]);
    const root = roots[0]!;
    const word = identValue(root);
    if (word !== undefined) {
        const lower = word.toLowerCase();
        if (lower === "auto" || lower === "none") return success({ kind: lower });
        if (word.startsWith("--") && word.length > 2) return success({ kind: "name", name: word });
        return failure("", "timeline_option_invalid", ["timeline"]);
    }
    if (root.kind !== "function-block") return failure("", "timeline_option_invalid", ["timeline"]);
    const name = root.name.toLowerCase();
    return name === "scroll" ? scrollTimeline(root)
        : name === "view" ? viewTimeline(root)
            : failure("", "timeline_option_invalid", ["timeline"]);
}

/** Composable timeline grammar over the shared CSS component tree. */
export const animationTimelineGrammar: Parser<TimelineOutcome> = cssDeclarationValueGrammar.map(projectTimeline);
const timelineDocument = cssComponentDocumentGrammar.map(projectTimeline);

export function parseAnimationTimeline(source: string): ParseResult<AnimationTimelineValue> {
    const input = typeof source === "string" ? source : "";
    if (typeof source !== "string") return failure(input, "timeline_option_invalid", ["timeline"]);
    try {
        const state = timelineDocument.parseState(preprocessCss(input).source);
        if (state.isError) {
            const recovered = cssRecoveringComponentDocumentGrammar.parseState(preprocessCss(input).source);
            const root = recovered.isError ? undefined : significant(recovered.value.value)[0];
            const name = root?.kind === "function-block" && root.close !== null
                ? root.name.toLowerCase() : undefined;
            const expected = name === "scroll" ? ["scroll timeline"]
                : name === "view" ? ["view timeline"] : ["timeline"];
            return failure(input, "timeline_option_invalid", expected);
        }
        return state.value.ok
            ? state.value
            : failure(input, state.value.diagnostics[0].code, state.value.diagnostics[0].expected);
    } catch {
        return failure(input, "timeline_option_invalid", ["timeline"]);
    }
}

const RANGE_PHASES = new Set<RangePhase>([
    "normal", "cover", "contain", "entry", "exit", "entry-crossing", "exit-crossing",
]);

function rangeBoundary(components: readonly CssComponentValue[]): RangeBoundary | null {
    const tokens = significant(components);
    if (tokens.length === 0 || tokens.length > 2) return null;
    const phase = identValue(tokens[0])?.toLowerCase() as RangePhase | undefined;
    if (phase !== undefined && RANGE_PHASES.has(phase)) {
        if (tokens[1] === undefined) return { phase };
        const offset = timelineOffset(tokens[1]);
        return offset !== undefined ? { phase, offset } : null;
    }
    const offset = tokens.length === 1 ? timelineOffset(tokens[0]) : undefined;
    return offset !== undefined ? { offset } : null;
}

function commaGroups(components: readonly CssComponentValue[]): readonly (readonly CssComponentValue[])[] {
    const groups: CssComponentValue[][] = [[]];
    for (const component of components) {
        if (component.kind === "comma") groups.push([]);
        else groups.at(-1)!.push(component);
    }
    // Phase-A compatibility intentionally ignores empty comma arms; a later
    // owner wave may tighten this independently of the CST migration.
    return groups.filter((group) => significant(group).length > 0);
}

function projectRange(components: readonly CssComponentValue[]): RangeOutcome {
    const comma = commaGroups(components);
    if (comma.length > 2 || comma.length === 0) return failure("", "timeline_option_invalid", ["animation range"]);
    if (comma.length === 2) {
        const start = rangeBoundary(comma[0]!);
        const end = rangeBoundary(comma[1]!);
        return start !== null && end !== null
            ? success({ start, end })
            : failure("", "timeline_option_invalid", ["animation range"]);
    }
    const tokens = significant(comma[0]!);
    const single = rangeBoundary(tokens);
    if (single !== null) return success({ start: single });
    for (const split of [2, 1]) {
        const start = rangeBoundary(tokens.slice(0, split));
        const end = rangeBoundary(tokens.slice(split));
        if (start !== null && end !== null) return success({ start, end });
    }
    return failure("", "timeline_option_invalid", ["animation range"]);
}

/** Composable animation-range grammar over the shared CSS component tree. */
export const animationRangeGrammar: Parser<RangeOutcome> = cssDeclarationValueGrammar.map(projectRange);
const rangeDocument = cssComponentDocumentGrammar.map(projectRange);

export function parseAnimationRange(source: string): ParseResult<AnimationRangeValue> {
    const input = typeof source === "string" ? source : "";
    if (typeof source !== "string") return failure(input, "timeline_option_invalid", ["animation range"]);
    try {
        const state = rangeDocument.parseState(preprocessCss(input).source);
        if (state.isError) return failure(input, "timeline_option_invalid", ["animation range"]);
        return state.value.ok
            ? state.value
            : failure(input, state.value.diagnostics[0].code, state.value.diagnostics[0].expected);
    } catch {
        return failure(input, "timeline_option_invalid", ["animation range"]);
    }
}

function serializeTimeline(value: AnimationTimelineValue): string {
    switch (value.kind) {
        case "auto": case "none": return value.kind;
        case "name": return value.name;
        case "scroll": return `scroll(${[value.scroller, value.axis].filter(Boolean).join(" ")})`;
        case "view": return `view(${[value.axis, value.inset?.start, value.inset?.end].filter(Boolean).join(" ")})`;
    }
}

function serializeRange(value: AnimationRangeValue): string {
    const boundary = (item: AnimationRangeValue["start"]) => [item.phase, item.offset].filter(Boolean).join(" ");
    return [boundary(value.start), value.end ? boundary(value.end) : ""].filter(Boolean).join(" ");
}

function serializeScope(value: TimelineScopeValue): string {
    return value.kind === "names" ? value.names.join(", ") : value.kind;
}

function serializeTrigger(value: AnimationTriggerValue): string {
    return [
        value.type,
        value.timeline ? serializeTimeline(value.timeline) : undefined,
        value.range ? serializeRange(value.range) : undefined,
    ].filter(Boolean).join(" ");
}

export function serializeTimelineOptions(options: CSSTimelineOptions): Readonly<{
    "animation-timeline"?: string;
    "animation-range"?: string;
    "timeline-scope"?: string;
    "animation-trigger"?: string;
}> {
    try {
        return {
            ...(options.timelines?.length
                ? { "animation-timeline": options.timelines.map(serializeTimeline).join(", ") }
                : options.timeline ? { "animation-timeline": serializeTimeline(options.timeline) } : {}),
            ...(options.range ? { "animation-range": serializeRange(options.range) } : {}),
            ...(options.timelineScope ? { "timeline-scope": serializeScope(options.timelineScope) } : {}),
            ...(options.trigger ? { "animation-trigger": serializeTrigger(options.trigger) } : {}),
        };
    } catch {
        return {};
    }
}
