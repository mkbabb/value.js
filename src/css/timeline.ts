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
} from "./types";
import { failure, splitTopLevel, success } from "./grammar";

const AXES = new Set<TimelineAxis>(["block", "inline", "x", "y"]);
const SCROLLERS = new Set(["nearest", "root", "self"] as const);
const LENGTH_PERCENTAGE = /^auto$|^[+-]?(?:\d+\.?\d*|\.\d+)(?:%|[a-z]+)?$/i;
export function parseAnimationTimeline(source: string): ParseResult<AnimationTimelineValue> {
    const input = source.trim();
    const lower = input.toLowerCase();
    if (lower === "auto" || lower === "none") return success({ kind: lower });
    const scroll = input.match(/^scroll\((.*)\)$/i);
    if (scroll) {
        const args = splitTopLevel(scroll[1]!.replace(/,/g, " "), "space");
        const result: { kind: "scroll"; scroller?: "nearest" | "root" | "self"; axis?: TimelineAxis } = { kind: "scroll" };
        for (const arg of args) {
            const token = arg.toLowerCase();
            if (SCROLLERS.has(token as "nearest" | "root" | "self") && result.scroller === undefined) {
                result.scroller = token as "nearest" | "root" | "self";
            } else if (AXES.has(token as TimelineAxis) && result.axis === undefined) {
                result.axis = token as TimelineAxis;
            }
            else return failure(source, "timeline_option_invalid", ["scroll timeline"]);
        }
        return success(result);
    }
    const view = input.match(/^view\((.*)\)$/i);
    if (view) {
        const args = splitTopLevel(view[1]!.replace(/,/g, " "), "space");
        const result: { kind: "view"; axis?: TimelineAxis; inset?: { start: string; end?: string } } = { kind: "view" };
        const inset: string[] = [];
        for (const arg of args) {
            const token = arg.toLowerCase();
            if (AXES.has(token as TimelineAxis) && result.axis === undefined) result.axis = token as TimelineAxis;
            else if (LENGTH_PERCENTAGE.test(arg) && inset.length < 2) inset.push(arg);
            else return failure(source, "timeline_option_invalid", ["view timeline"]);
        }
        if (inset[0]) result.inset = inset[1] ? { start: inset[0], end: inset[1] } : { start: inset[0] };
        return success(result);
    }
    return /^--[-\w]+$/.test(input) ? success({ kind: "name", name: input }) : failure(source, "timeline_option_invalid", ["timeline"]);
}

const RANGE_PHASES = new Set<RangePhase>(["normal", "cover", "contain", "entry", "exit", "entry-crossing", "exit-crossing"]);
function rangeBoundary(tokens: string[]): RangeBoundary | null {
    if (tokens.length === 0 || tokens.length > 2) return null;
    const phase = tokens[0]?.toLowerCase() as RangePhase;
    if (RANGE_PHASES.has(phase)) {
        return tokens[1] === undefined
            ? { phase }
            : LENGTH_PERCENTAGE.test(tokens[1]) ? { phase, offset: tokens[1] } : null;
    }
    return tokens.length === 1 && tokens[0] !== undefined && LENGTH_PERCENTAGE.test(tokens[0])
        ? { offset: tokens[0] }
        : null;
}
export function parseAnimationRange(source: string): ParseResult<AnimationRangeValue> {
    const input = source.trim();
    const comma = splitTopLevel(input, ",");
    if (comma.length > 2) return failure(source, "timeline_option_invalid", ["animation range"]);
    if (comma.length === 2) {
        const start = rangeBoundary(splitTopLevel(comma[0]!, "space"));
        const end = rangeBoundary(splitTopLevel(comma[1]!, "space"));
        return start && end ? success({ start, end }) : failure(source, "timeline_option_invalid", ["animation range"]);
    }
    const tokens = splitTopLevel(input, "space");
    const single = rangeBoundary(tokens);
    if (single) return success({ start: single });
    for (const split of [2, 1]) {
        const start = rangeBoundary(tokens.slice(0, split));
        const end = rangeBoundary(tokens.slice(split));
        if (start && end) return success({ start, end });
    }
    return failure(source, "timeline_option_invalid", ["animation range"]);
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
    return {
        ...(options.timelines?.length
            ? { "animation-timeline": options.timelines.map(serializeTimeline).join(", ") }
            : options.timeline ? { "animation-timeline": serializeTimeline(options.timeline) } : {}),
        ...(options.range ? { "animation-range": serializeRange(options.range) } : {}),
        ...(options.timelineScope ? {
            "timeline-scope": serializeScope(options.timelineScope),
        } : {}),
        ...(options.trigger ? { "animation-trigger": serializeTrigger(options.trigger) } : {}),
    };
}
