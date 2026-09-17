import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    AnimationTriggerValue,
    CSSAnimationOptions,
    CSSTimelineOptions,
    CollectedRule,
    CustomFunctionRule,
    Declaration,
    KeyframesBlock,
    PropertyRule,
    StyleRule,
    Stylesheet,
    StylesheetItem,
    TimelineScopeValue,
    TriggerType,
} from "../types.js";
import { failure, success } from "../result.js";
import { serializeCssValue } from "../serialize.js";
import { parseAnimationRange, parseAnimationTimeline } from "../timeline.js";
import { splitTopLevel } from "../util.js";
import {
    animationCascade,
    components,
    iterationValue,
    readAnimationName,
    readComposition,
    readDirection,
    readDuration,
    readFill,
    readTiming,
    repeated,
    timelineList,
} from "./analyze.js";

function collect<R extends StylesheetItem>(
    stylesheet: Stylesheet,
    predicate: (item: StylesheetItem) => item is R,
): readonly CollectedRule<R>[] {
    const result: CollectedRule<R>[] = [];
    if (!Array.isArray(stylesheet)) return result;
    const visit = (items: Stylesheet, parent: readonly number[]) => {
        items.forEach((item, index) => {
            const path = [...parent, index];
            if (predicate(item)) result.push({ rule: item, path });
            if ("children" in item && item.children) visit(item.children, path);
        });
    };
    visit(stylesheet, []);
    return result;
}

export const collectKeyframes = (stylesheet: Stylesheet): readonly CollectedRule<KeyframesBlock>[] =>
    collect(stylesheet, (item): item is KeyframesBlock => item.kind === "keyframes");
export const collectPropertyDescriptors = (stylesheet: Stylesheet): readonly CollectedRule<PropertyRule>[] =>
    collect(stylesheet, (item): item is PropertyRule => item.kind === "property");
export const collectCustomFunctions = (stylesheet: Stylesheet): readonly CollectedRule<CustomFunctionRule>[] =>
    collect(stylesheet, (item): item is CustomFunctionRule => item.kind === "function");
export const collectStyleRules = (stylesheet: Stylesheet): readonly CollectedRule<StyleRule>[] =>
    collect(stylesheet, (item): item is StyleRule => item.kind === "style");

export function collectDeclarations(declarations: readonly Declaration[]): ReadonlyMap<string, Declaration> {
    const result = new Map<string, Declaration>();
    if (!Array.isArray(declarations)) return result;
    for (const declaration of declarations) {
        const current = result.get(declaration.name);
        if (!current || declaration.important || !current.important) result.set(declaration.name, declaration);
    }
    return result;
}

export function collectAnimationOptions(declarations: readonly Declaration[]): readonly CSSAnimationOptions[] {
    if (!Array.isArray(declarations)) return [];
    const { selected, hasOptions } = animationCascade(declarations);
    if (!hasOptions) return [];
    const names = components(selected, "animation-name", readAnimationName);
    const durations = components(selected, "animation-duration", readDuration);
    const delays = components(selected, "animation-delay", readDuration);
    const iterations = components(selected, "animation-iteration-count", iterationValue);
    const directions = components(selected, "animation-direction", readDirection);
    const fills = components(selected, "animation-fill-mode", readFill);
    const timings = components(selected, "animation-timing-function", readTiming);
    const compositions = components(selected, "animation-composition", readComposition);
    return Array.from({ length: names?.length ?? 1 }, (_, index) => {
        const name = repeated(names, index);
        const duration = repeated(durations, index);
        const delay = repeated(delays, index);
        const iterationCount = repeated(iterations, index);
        const direction = repeated(directions, index);
        const fillMode = repeated(fills, index);
        const timingFunction = repeated(timings, index);
        const composition = repeated(compositions, index);
        return {
            ...(name === undefined ? {} : { name }),
            ...(duration === undefined ? {} : { duration }),
            ...(delay === undefined ? {} : { delay }),
            ...(iterationCount === undefined ? {} : { iterationCount }),
            ...(direction === undefined ? {} : { direction }),
            ...(fillMode === undefined ? {} : { fillMode }),
            ...(timingFunction === undefined ? {} : { timingFunction }),
            ...(composition === undefined ? {} : { composition }),
        };
    });
}

const TRIGGER_TYPES = new Set<TriggerType>(["once", "repeat", "alternate", "state"]);

function parseTimelineScope(source: string) {
    const input = source.trim();
    if (input === "none" || input === "all") return success<TimelineScopeValue>({ kind: input });
    const names = splitTopLevel(input, ",");
    return names.length > 0 && names.every((name) => /^--[-\w]+$/.test(name))
        ? success<TimelineScopeValue>({ kind: "names", names })
        : failure<TimelineScopeValue>(source, "timeline_option_invalid", ["timeline scope"]);
}

function parseAnimationTrigger(source: string) {
    const tokens = splitTopLevel(source.trim(), "space");
    const result: { type?: TriggerType; timeline?: AnimationTimelineValue; range?: AnimationRangeValue } = {};
    const range: string[] = [];
    for (const token of tokens) {
        const lower = token.toLowerCase();
        if (TRIGGER_TYPES.has(lower as TriggerType) && result.type === undefined) {
            result.type = lower as TriggerType;
            continue;
        }
        if (result.timeline === undefined && /^(?:auto|none|--|scroll\(|view\()/i.test(token)) {
            const timeline = parseAnimationTimeline(token);
            if (!timeline.ok) return timeline as ReturnType<typeof failure<AnimationTriggerValue>>;
            result.timeline = timeline.value;
            continue;
        }
        range.push(token);
    }
    if (range.length > 0) {
        const parsed = parseAnimationRange(range.join(" "));
        if (!parsed.ok) return parsed as ReturnType<typeof failure<AnimationTriggerValue>>;
        result.range = parsed.value;
    }
    return Object.keys(result).length > 0
        ? success<AnimationTriggerValue>(result)
        : failure<AnimationTriggerValue>(source, "timeline_option_invalid", ["animation trigger"]);
}

function parseRangeValue(value: Declaration["value"] | undefined): AnimationRangeValue | undefined {
    if (!value) return undefined;
    const parsed = parseAnimationRange(serializeCssValue(value));
    return parsed.ok ? parsed.value : undefined;
}

export function collectTimelineOptions(declarations: readonly Declaration[]): CSSTimelineOptions {
    if (!Array.isArray(declarations)) return {};
    const selected = collectDeclarations(declarations);
    const timelineSource = animationCascade(declarations).selected.get("animation-timeline")?.value;
    const timelines = timelineSource ? timelineList(timelineSource) : undefined;
    const range = parseRangeValue(selected.get("animation-range")?.value);
    const start = parseRangeValue(selected.get("animation-range-start")?.value)?.start;
    const end = parseRangeValue(selected.get("animation-range-end")?.value)?.start;
    const scoped = selected.get("timeline-scope")?.value;
    const scope = scoped ? parseTimelineScope(serializeCssValue(scoped)) : undefined;
    const triggered = selected.get("animation-trigger")?.value;
    const trigger = triggered ? parseAnimationTrigger(serializeCssValue(triggered)) : undefined;
    const resolvedRange = range
        ?? (start || end ? { start: start ?? { phase: "normal" }, ...(end ? { end } : {}) } : undefined);
    return {
        ...(timelines?.[0] ? { timeline: timelines[0] } : {}),
        ...(timelines && timelines.length > 1 ? { timelines } : {}),
        ...(resolvedRange ? { range: resolvedRange } : {}),
        ...(scope?.ok ? { timelineScope: scope.value } : {}),
        ...(trigger?.ok ? { trigger: trigger.value } : {}),
    };
}
