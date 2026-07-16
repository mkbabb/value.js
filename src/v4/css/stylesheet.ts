import type { CssList, CssScalar, CssValue } from "../value";
import {
    coerceToSyntax,
    failure,
    isSupportedSyntaxDescriptor,
    parseAnimationRange,
    parseAnimationTimeline,
    parseCssValue,
    parseKeyframeSelector,
    parseTimingFunction,
    serializeCssColor,
    splitTopLevel,
    success,
} from "./grammar";
import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    AnimationTriggerValue,
    CSSAnimationOptions,
    CSSPropertyDescriptor,
    CSSTimelineOptions,
    CollectedRule,
    CssColor,
    CssLinearStop,
    CssTimingFunction,
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    CustomFunctionRule,
    Declaration,
    KeyframeRule,
    KeyframesBlock,
    ParseResult,
    PropertyRule,
    ScrollTimelineDescriptor,
    StyleRule,
    Stylesheet,
    StylesheetItem,
    TimelineAxis,
    TimelineScopeValue,
    TriggerType,
    ViewTimelineDescriptor,
} from "./types";

const TRIGGER_TYPES = new Set<TriggerType>(["once", "repeat", "alternate", "state"]);

function parseTimelineScope(source: string): ParseResult<TimelineScopeValue> {
    const input = source.trim();
    if (input === "none" || input === "all") return success({ kind: input });
    const names = splitTopLevel(input, ",");
    return names.length > 0 && names.every((name) => /^--[-\w]+$/.test(name))
        ? success({ kind: "names", names })
        : failure(source, "timeline_option_invalid", ["timeline scope"]);
}

function parseAnimationTrigger(source: string): ParseResult<AnimationTriggerValue> {
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
            if (!timeline.ok) return timeline as ParseResult<AnimationTriggerValue>;
            result.timeline = timeline.value;
            continue;
        }
        range.push(token);
    }
    if (range.length > 0) {
        const parsed = parseAnimationRange(range.join(" "));
        if (!parsed.ok) return parsed as ParseResult<AnimationTriggerValue>;
        result.range = parsed.value;
    }
    return Object.keys(result).length > 0
        ? success(result)
        : failure(source, "timeline_option_invalid", ["animation trigger"]);
}

export function serializeCssValue(value: CssValue): string {
    if (value.kind === "scalar") {
        if (value.payload.type === "number") return `${value.payload.value}${value.payload.unit}`;
        if (value.payload.type === "keyword") return value.payload.value;
        const serialized = serializeCssColor(value.payload.value as CssColor);
        if (!serialized.ok) throw new TypeError(`Cannot serialize CSS color: ${serialized.error.code}`);
        return serialized.value;
    }
    if (value.kind === "call") return `${value.name}(${value.args.map(serializeCssValue).join(", ")})`;
    const separator = value.separator === "comma" ? ", " : value.separator === "slash" ? " / " : " ";
    const result = value.items.map(serializeCssValue).join(separator);
    return value.separator === "space" ? result.replace(/\s+([:;])/g, "$1") : result;
}

function splitDeclarations(body: string): string[] {
    return splitTopLevel(body, ";");
}

const DIRECTIONS = new Set(["normal", "reverse", "alternate", "alternate-reverse"]);
const FILL_MODES = new Set(["none", "forwards", "backwards", "both"]);
const PLAY_STATES = new Set(["running", "paused"]);
const COMPOSITIONS = new Set(["replace", "add", "accumulate"]);
const TIMING_KEYWORDS = new Set(["linear", "ease", "ease-in", "ease-out", "ease-in-out"]);
const CSS_WIDE = new Set(["initial", "inherit", "unset", "revert", "revert-layer"]);

const optionProperties = new Set([
    "animation-name",
    "animation-duration",
    "animation-delay",
    "animation-iteration-count",
    "animation-direction",
    "animation-fill-mode",
    "animation-play-state",
    "animation-timing-function",
    "animation-composition",
]);
const cascadeProperties = new Set([...optionProperties, "animation-timeline"]);

function commaItems(value: CssValue): readonly CssValue[] {
    return value.kind === "list" && value.separator === "comma" ? value.items : [value];
}

function spaceItems(value: CssValue): readonly CssValue[] {
    return value.kind === "list" && value.separator === "space" ? value.items : [value];
}

function scalarKeyword(value: CssValue | undefined): string | undefined {
    return value?.kind === "scalar" && value.payload.type === "keyword" ? value.payload.value : undefined;
}

function scalarNumberValue(value: CssValue, units: readonly string[] = [""]): number | undefined {
    if (value.kind !== "scalar" || value.payload.type !== "number") return undefined;
    const unit = value.payload.unit.toLowerCase();
    if (!units.includes(unit)) return undefined;
    return unit === "ms" ? value.payload.value / 1000 : value.payload.value;
}

function timingFunctionValue(value: CssValue): CssTimingFunction | undefined {
    const word = scalarKeyword(value)?.toLowerCase();
    if (word && TIMING_KEYWORDS.has(word)) {
        return Object.freeze({ kind: "keyword", name: word }) as CssTimingFunction;
    }
    if (word === "step-start" || word === "step-end") {
        return Object.freeze({
            kind: "steps",
            count: 1,
            position: word === "step-start" ? "jump-start" : "jump-end",
        });
    }
    if (value.kind !== "call") return undefined;
    const name = value.name.toLowerCase();
    if (name === "cubic-bezier") {
        const values = value.args.map((argument) => scalarNumberValue(argument));
        if (values.length !== 4 || values.some((item) => item === undefined)) return undefined;
        const [x1, y1, x2, y2] = values as [number, number, number, number];
        return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1
            ? Object.freeze({ kind: "cubic-bezier", x1, y1, x2, y2 })
            : undefined;
    }
    if (name === "steps") {
        if (value.args.length < 1 || value.args.length > 2) return undefined;
        const count = scalarNumberValue(value.args[0]!);
        const aliases: Readonly<Record<string, "jump-start" | "jump-end" | "jump-none" | "jump-both">> = {
            start: "jump-start", end: "jump-end",
            "jump-start": "jump-start", "jump-end": "jump-end",
            "jump-none": "jump-none", "jump-both": "jump-both",
        };
        const authoredPosition = scalarKeyword(value.args[1])?.toLowerCase();
        const position = authoredPosition === undefined ? "jump-end" : aliases[authoredPosition];
        if (!position) return undefined;
        return count !== undefined && Number.isInteger(count) && count > 0 && !(position === "jump-none" && count < 2)
            ? Object.freeze({ kind: "steps", count, position })
            : undefined;
    }
    if (name !== "linear" || value.args.length < 2) return undefined;
    const stops: CssLinearStop[] = [];
    for (const argument of value.args) {
        const tokens = spaceItems(argument);
        const output = scalarNumberValue(tokens[0]!);
        if (output === undefined || tokens.length > 3) return undefined;
        const positions = tokens.slice(1).map((token) => scalarNumberValue(token, ["%"]));
        if (positions.some((position) => position === undefined)) return undefined;
        stops.push(Object.freeze({
            output,
            input: Object.freeze(positions.map((position) => position! / 100)) as [] | [number] | [number, number],
        }));
    }
    return Object.freeze({ kind: "linear-function", stops: Object.freeze(stops) });
}

function animationNameValue(value: CssValue): string | undefined {
    const name = scalarKeyword(value);
    if (!name) return undefined;
    const lower = name.toLowerCase();
    return !CSS_WIDE.has(lower) ? name : undefined;
}

function timelineValue(value: CssValue): AnimationTimelineValue | undefined {
    const word = scalarKeyword(value);
    const lower = word?.toLowerCase();
    if (lower === "auto" || lower === "none") return Object.freeze({ kind: lower });
    if (word?.startsWith("--")) return Object.freeze({ kind: "name", name: word });
    if (value.kind !== "call") return undefined;
    const name = value.name.toLowerCase();
    const args = value.args.flatMap((argument) => spaceItems(argument));
    if (name === "scroll") {
        const result: { kind: "scroll"; scroller?: "nearest" | "root" | "self"; axis?: TimelineAxis } = { kind: "scroll" };
        for (const argument of args) {
            const token = scalarKeyword(argument)?.toLowerCase();
            if (["nearest", "root", "self"].includes(token ?? "") && result.scroller === undefined) {
                result.scroller = token as NonNullable<typeof result.scroller>;
            } else if (["block", "inline", "x", "y"].includes(token ?? "") && result.axis === undefined) {
                result.axis = token as TimelineAxis;
            } else return undefined;
        }
        return Object.freeze(result);
    }
    if (name !== "view") return undefined;
    const result: { kind: "view"; axis?: TimelineAxis; inset?: { start: string; end?: string } } = { kind: "view" };
    const inset: string[] = [];
    for (const argument of args) {
        const token = scalarKeyword(argument)?.toLowerCase();
        if (["block", "inline", "x", "y"].includes(token ?? "") && result.axis === undefined) {
            result.axis = token as TimelineAxis;
        } else if (argument.kind === "scalar" && argument.payload.type === "number" && argument.payload.unit) {
            inset.push(`${argument.payload.value}${argument.payload.unit}`);
        } else return undefined;
    }
    if (inset.length > 2) return undefined;
    if (inset[0]) result.inset = inset[1] ? { start: inset[0], end: inset[1] } : { start: inset[0] };
    return Object.freeze(result);
}

function timelineList(value: CssValue): readonly AnimationTimelineValue[] | undefined {
    const values = commaItems(value).map(timelineValue);
    return values.every((item) => item !== undefined)
        ? Object.freeze(values as AnimationTimelineValue[])
        : undefined;
}

const keywordValue = (value: string): CssScalar => Object.freeze({
    kind: "scalar",
    payload: Object.freeze({ type: "keyword", value }),
});
const numberValue = (value: number, unit: string): CssScalar => Object.freeze({
    kind: "scalar",
    payload: Object.freeze({ type: "number", value, unit }),
});
const listValue = (items: readonly CssValue[]): CssValue => items.length === 1
    ? items[0]!
    : Object.freeze({ kind: "list", separator: "comma", items: Object.freeze([...items]) });

type AnimationArm = Readonly<{
    name: CssValue;
    duration: CssValue;
    delay: CssValue;
    iteration: CssValue;
    direction: CssValue;
    fill: CssValue;
    playState: CssValue;
    timing: CssValue;
}>;

function animationArm(value: CssValue): AnimationArm | undefined {
    const tokens = spaceItems(value);
    if (tokens.length === 0 || value.kind === "list" && value.separator !== "space") return undefined;
    let name: CssValue | undefined;
    let duration: CssValue | undefined;
    let delay: CssValue | undefined;
    let iteration: CssValue | undefined;
    let direction: CssValue | undefined;
    let fill: CssValue | undefined;
    let playState: CssValue | undefined;
    let timing: CssValue | undefined;
    for (const token of tokens) {
        const time = scalarNumberValue(token, ["s", "ms"]);
        if (time !== undefined) {
            if (!duration) {
                if (time < 0) return undefined;
                duration = token;
            } else if (!delay) delay = token;
            else return undefined;
            continue;
        }
        if (!timing && timingFunctionValue(token)) {
            timing = token;
            continue;
        }
        const word = scalarKeyword(token)?.toLowerCase();
        const count = scalarNumberValue(token);
        if (!iteration && (word === "infinite" || count !== undefined && count >= 0)) {
            iteration = token;
            continue;
        }
        if (!direction && DIRECTIONS.has(word ?? "")) {
            direction = token;
            continue;
        }
        if (!fill && FILL_MODES.has(word ?? "")) {
            fill = token;
            continue;
        }
        if (!playState && PLAY_STATES.has(word ?? "")) {
            playState = token;
            continue;
        }
        if (!name && animationNameValue(token)) {
            name = token;
            continue;
        }
        return undefined;
    }
    return Object.freeze({
        name: name ?? keywordValue("none"),
        duration: duration ?? numberValue(0, "s"),
        delay: delay ?? numberValue(0, "s"),
        iteration: iteration ?? numberValue(1, ""),
        direction: direction ?? keywordValue("normal"),
        fill: fill ?? keywordValue("none"),
        playState: playState ?? keywordValue("running"),
        timing: timing ?? keywordValue("ease"),
    });
}

function expandAnimationShorthand(value: CssValue): ReadonlyMap<string, CssValue> | undefined {
    const arms = commaItems(value).map(animationArm);
    if (arms.some((arm) => arm === undefined)) return undefined;
    const values = arms as readonly AnimationArm[];
    return new Map([
        ["animation-name", listValue(values.map((arm) => arm.name))],
        ["animation-duration", listValue(values.map((arm) => arm.duration))],
        ["animation-delay", listValue(values.map((arm) => arm.delay))],
        ["animation-iteration-count", listValue(values.map((arm) => arm.iteration))],
        ["animation-direction", listValue(values.map((arm) => arm.direction))],
        ["animation-fill-mode", listValue(values.map((arm) => arm.fill))],
        ["animation-play-state", listValue(values.map((arm) => arm.playState))],
        ["animation-timing-function", listValue(values.map((arm) => arm.timing))],
        ["animation-composition", keywordValue("replace")],
        ["animation-timeline", keywordValue("auto")],
    ]);
}

function optionDeclarationValid(name: string, value: CssValue): boolean {
    const items = commaItems(value);
    if (items.length === 0) return false;
    switch (name) {
        case "animation": return expandAnimationShorthand(value) !== undefined;
        case "animation-name": return items.every((item) => animationNameValue(item) !== undefined);
        case "animation-duration": return items.every((item) => (scalarNumberValue(item, ["s", "ms"]) ?? -1) >= 0);
        case "animation-delay": return items.every((item) => scalarNumberValue(item, ["s", "ms"]) !== undefined);
        case "animation-iteration-count": return items.every((item) => {
            const count = scalarNumberValue(item);
            return scalarKeyword(item)?.toLowerCase() === "infinite" || count !== undefined && count >= 0;
        });
        case "animation-direction": return items.every((item) => DIRECTIONS.has(scalarKeyword(item)?.toLowerCase() ?? ""));
        case "animation-fill-mode": return items.every((item) => FILL_MODES.has(scalarKeyword(item)?.toLowerCase() ?? ""));
        case "animation-play-state": return items.every((item) => PLAY_STATES.has(scalarKeyword(item)?.toLowerCase() ?? ""));
        case "animation-composition": return items.every((item) => COMPOSITIONS.has(scalarKeyword(item)?.toLowerCase() ?? ""));
        case "animation-timing-function": return items.every((item) => timingFunctionValue(item) !== undefined);
        case "animation-timeline": return timelineList(value) !== undefined;
        default: return true;
    }
}

function emptyComma(source: string): number | undefined {
    let depth = 0;
    let quote = "";
    let start = 0;
    let comma = -1;
    for (let index = 0; index < source.length; index++) {
        const char = source[index]!;
        if (quote) {
            if (char === quote && source[index - 1] !== "\\") quote = "";
        } else if (char === "\"" || char === "'") quote = char;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (char === "," && depth === 0) {
            if (!source.slice(start, index).trim()) return index;
            start = index + 1;
            comma = index;
        }
    }
    return comma >= 0 && !source.slice(start).trim() ? comma : undefined;
}

function parseDeclarations(body: string): ParseResult<readonly Declaration[]> {
    const declarations: Declaration[] = [];
    for (const row of splitDeclarations(body)) {
        const colon = row.indexOf(":");
        if (colon <= 0) return failure(row, "css_syntax", ["declaration"]);
        const name = row.slice(0, colon).trim().toLowerCase();
        let source = row.slice(colon + 1).trim();
        const important = /!important\s*$/i.test(source);
        if (important) source = source.replace(/!important\s*$/i, "").trim();
        const empty = name === "animation" || name.startsWith("animation-") ? emptyComma(source) : undefined;
        if (empty !== undefined) {
            return failure(source, "animation_option_invalid", ["nonempty animation list item"], empty, empty + 1) as ParseResult<readonly Declaration[]>;
        }
        const value = parseCssValue(source);
        if (!value.ok) return value as ParseResult<readonly Declaration[]>;
        if (!optionDeclarationValid(name, value.value)) {
            const expected = name === "animation-timeline"
                ? [`${value.value.kind === "call" && value.value.name.toLowerCase() === "view" ? "view " : value.value.kind === "call" && value.value.name.toLowerCase() === "scroll" ? "scroll " : ""}timeline`]
                : [name === "animation" ? "animation shorthand" : name];
            return failure(source, name === "animation-timeline" ? "timeline_option_invalid" : "animation_option_invalid", expected) as ParseResult<readonly Declaration[]>;
        }
        if (name === "animation-range") {
            const range = parseAnimationRange(source);
            if (!range.ok) return range as ParseResult<readonly Declaration[]>;
        }
        if (name === "animation-range-start" || name === "animation-range-end") {
            const range = parseAnimationRange(source);
            if (!range.ok || range.value.end !== undefined) {
                return failure(row, "timeline_option_invalid", ["animation range boundary"]) as ParseResult<readonly Declaration[]>;
            }
        }
        if (name === "timeline-scope") {
            const scope = parseTimelineScope(source);
            if (!scope.ok) return scope as ParseResult<readonly Declaration[]>;
        }
        if (name === "animation-trigger") {
            const trigger = parseAnimationTrigger(source);
            if (!trigger.ok) return trigger as ParseResult<readonly Declaration[]>;
        }
        declarations.push({ name, value: value.value, important });
    }
    return success(declarations);
}

type Block = Readonly<{ prelude: string; body: string | null }>;
function blocks(source: string): ParseResult<readonly Block[]> {
    const result: Block[] = [];
    let cursor = 0;
    while (cursor < source.length) {
        while (cursor < source.length) {
            while (/\s|;/.test(source[cursor] ?? "")) cursor++;
            if (!source.startsWith("/*", cursor)) break;
            const end = source.indexOf("*/", cursor + 2);
            if (end < 0) return failure(source, "css_syntax", ["closing comment"], cursor);
            cursor = end + 2;
        }
        if (cursor >= source.length) break;
        let quote = "";
        let parens = 0;
        let boundary = -1;
        for (let i = cursor; i < source.length; i++) {
            const char = source[i]!;
            if (quote) {
                if (char === quote && source[i - 1] !== "\\") quote = "";
                continue;
            }
            if (char === '"' || char === "'") quote = char;
            else if (char === "(") parens++;
            else if (char === ")") parens--;
            else if (parens === 0 && (char === "{" || char === ";")) { boundary = i; break; }
        }
        if (boundary < 0) return failure(source, "css_syntax", ["rule"], cursor);
        const prelude = source.slice(cursor, boundary).trim();
        if (source[boundary] === ";") {
            result.push({ prelude, body: null });
            cursor = boundary + 1;
            continue;
        }
        let depth = 1;
        quote = "";
        let end = boundary + 1;
        for (; end < source.length && depth > 0; end++) {
            const char = source[end]!;
            if (quote) {
                if (char === quote && source[end - 1] !== "\\") quote = "";
                continue;
            }
            if (char === '"' || char === "'") quote = char;
            else if (char === "{") depth++;
            else if (char === "}") depth--;
        }
        if (depth !== 0) return failure(source, "css_syntax", ["closing brace"], boundary);
        result.push({ prelude, body: source.slice(boundary + 1, end - 1) });
        cursor = end;
    }
    return success(result);
}

function parseKeyframes(name: string, body: string): ParseResult<KeyframesBlock> {
    const rows = blocks(body);
    if (!rows.ok) return rows as ParseResult<KeyframesBlock>;
    const rules: KeyframeRule[] = [];
    for (const row of rows.value) {
        if (row.body === null) return failure(body, "css_syntax", ["keyframe block"]);
        const selectors = [];
        for (const token of splitTopLevel(row.prelude, ",")) {
            const selector = parseKeyframeSelector(token);
            if (!selector.ok) return selector as ParseResult<KeyframesBlock>;
            selectors.push(selector.value);
        }
        const declarations = parseDeclarations(row.body);
        if (!declarations.ok) return declarations as ParseResult<KeyframesBlock>;
        const timingDeclaration = collectDeclarations(declarations.value).get("animation-timing-function");
        const compositionDeclaration = collectDeclarations(declarations.value).get("animation-composition");
        const timing = timingDeclaration ? parseTimingFunction(serializeCssValue(timingDeclaration.value)) : null;
        if (timing && !timing.ok) return timing as ParseResult<KeyframesBlock>;
        const compositionText = compositionDeclaration ? serializeCssValue(compositionDeclaration.value) : undefined;
        const composition = compositionText === "replace" || compositionText === "add" || compositionText === "accumulate"
            ? compositionText
            : undefined;
        const rule: {
            selectors: typeof selectors;
            declarations: readonly Declaration[];
            timingFunction?: NonNullable<typeof timing> extends { ok: true; value: infer T } ? T : never;
            composition?: "replace" | "add" | "accumulate";
        } = { selectors, declarations: declarations.value };
        if (timing?.ok) rule.timingFunction = timing.value as never;
        if (composition) rule.composition = composition;
        rules.push(rule);
    }
    return success({ kind: "keyframes", name, rules });
}

function descriptorDeclarations(body: string): ReadonlyMap<string, Declaration> | null {
    const declarations = parseDeclarations(body);
    return declarations.ok ? collectDeclarations(declarations.value) : null;
}

function parseScopePrelude(source: string): Pick<Extract<StylesheetItem, { kind: "scope" }>, "root" | "limit"> | null {
    const input = source.trim();
    if (!input) return {};
    const groups: string[] = [];
    let cursor = 0;
    while (cursor < input.length) {
        while (/\s/.test(input[cursor] ?? "")) cursor++;
        if (groups.length === 1) {
            if (input.slice(cursor, cursor + 2).toLowerCase() !== "to") return null;
            cursor += 2;
            while (/\s/.test(input[cursor] ?? "")) cursor++;
        }
        if (input[cursor] !== "(") return null;
        let depth = 1;
        let quote = "";
        const start = ++cursor;
        for (; cursor < input.length && depth > 0; cursor++) {
            const char = input[cursor]!;
            if (quote) {
                if (char === quote && input[cursor - 1] !== "\\") quote = "";
            } else if (char === '"' || char === "'") quote = char;
            else if (char === "(") depth++;
            else if (char === ")") depth--;
        }
        if (depth !== 0) return null;
        groups.push(input.slice(start, cursor - 1));
        if (groups.length > 2) return null;
    }
    if (groups.length === 0) return null;
    return {
        root: splitTopLevel(groups[0]!, ","),
        ...(groups[1] === undefined ? {} : { limit: splitTopLevel(groups[1], ",") }),
    };
}

function parseStyleBody(body: string): ParseResult<Pick<StyleRule, "declarations" | "children">> {
    const plain = parseDeclarations(body);
    if (plain.ok) return success({ declarations: plain.value });
    const rows = blocks(`${body};`);
    if (!rows.ok) return rows as ParseResult<Pick<StyleRule, "declarations" | "children">>;
    const declarations: Declaration[] = [];
    const children: StylesheetItem[] = [];
    for (const row of rows.value) {
        if (row.body === null) {
            const parsed = parseDeclarations(`${row.prelude};`);
            if (!parsed.ok) return parsed as ParseResult<Pick<StyleRule, "declarations" | "children">>;
            declarations.push(...parsed.value);
            continue;
        }
        const parsed = parseItems(`${row.prelude}{${row.body}}`);
        if (!parsed.ok) return parsed as ParseResult<Pick<StyleRule, "declarations" | "children">>;
        children.push(...parsed.value);
    }
    return success({ declarations, ...(children.length === 0 ? {} : { children }) });
}

function topLevelColon(source: string): number {
    let depth = 0;
    let quote = "";
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            if (char === quote && source[i - 1] !== "\\") quote = "";
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && char === ":") return i;
    }
    return -1;
}

function parseFunctionPrelude(source: string): ParseResult<Readonly<{
    name: string;
    parameters: readonly CustomFunctionParameter[];
}>> {
    const match = source.match(/^@function\s+(--[-\w]+)\s*\(([\s\S]*)\)$/i);
    if (!match) return failure(source, "css_syntax", ["custom function signature"]);
    const parameters: CustomFunctionParameter[] = [];
    const body = match[2]!.trim();
    for (const row of body ? splitTopLevel(body, ",") : []) {
        const colon = topLevelColon(row);
        const head = row.slice(0, colon < 0 ? undefined : colon).trim();
        const parameter = head.match(/^(--[-\w]+)(?:\s+(.+))?$/);
        if (!parameter) return failure(row, "css_syntax", ["custom function parameter"]);
        const defaultSource = colon < 0 ? undefined : row.slice(colon + 1).trim();
        if (defaultSource === "") return failure(row, "css_syntax", ["parameter default"]);
        const parsedDefault = defaultSource === undefined ? undefined : parseCssValue(defaultSource);
        if (parsedDefault && !parsedDefault.ok) return parsedDefault as ParseResult<Readonly<{
            name: string;
            parameters: readonly CustomFunctionParameter[];
        }>>;
        parameters.push({
            name: parameter[1]!,
            ...(parameter[2] ? { syntax: parameter[2].trim() } : {}),
            ...(parsedDefault?.ok ? { default: parsedDefault.value } : {}),
        });
    }
    return success({ name: match[1]!, parameters });
}

function parseItems(source: string): ParseResult<Stylesheet> {
    const sourceBlocks = blocks(source);
    if (!sourceBlocks.ok) return sourceBlocks as ParseResult<Stylesheet>;
    const result: StylesheetItem[] = [];
    for (const row of sourceBlocks.value) {
        const prelude = row.prelude.trim();
        const lower = prelude.toLowerCase();
        if (lower.startsWith("@keyframes ")) {
            if (row.body === null) return failure(source, "css_syntax", ["keyframes body"]);
            const parsed = parseKeyframes(prelude.slice(11).trim(), row.body);
            if (!parsed.ok) return parsed as ParseResult<Stylesheet>;
            result.push(parsed.value);
            continue;
        }
        if (lower.startsWith("@property ")) {
            if (row.body === null) return failure(source, "css_syntax", ["property body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            const name = prelude.slice(10).trim();
            if (!/^--[-_a-z][-_a-z\d]*$/i.test(name)) {
                return failure(source, "css_syntax", ["custom property name"]);
            }
            const syntaxDeclaration = declarations.get("syntax");
            const inheritsDeclaration = declarations.get("inherits");
            const initial = declarations.get("initial-value");
            if (!syntaxDeclaration || !inheritsDeclaration) {
                return failure(source, "css_syntax", ["syntax and inherits descriptors"]);
            }
            const syntax = serializeCssValue(syntaxDeclaration.value)
                .replace(/^['"]|['"]$/g, "");
            if (!isSupportedSyntaxDescriptor(syntax)) {
                return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
            }
            const inheritsText = serializeCssValue(inheritsDeclaration.value).toLowerCase();
            if (inheritsText !== "true" && inheritsText !== "false") {
                return failure(source, "css_syntax", ["true or false"]);
            }
            if (!initial && syntax !== "*") {
                return failure(source, "css_syntax", ["initial-value descriptor"]);
            }
            if (initial) {
                const coerced = coerceToSyntax(serializeCssValue(initial.value), syntax);
                if (!coerced.ok) return coerced as ParseResult<Stylesheet>;
            }
            const descriptor: CSSPropertyDescriptor = {
                syntax,
                inherits: inheritsText === "true",
                ...(initial ? { initialValue: initial.value } : {}),
            };
            result.push({ kind: "property", name, descriptor });
            continue;
        }
        if (lower.startsWith("@function ")) {
            if (row.body === null) return failure(source, "css_syntax", ["function body"]);
            const signature = parseFunctionPrelude(prelude);
            if (!signature.ok) return signature as ParseResult<Stylesheet>;
            const declarations = parseDeclarations(row.body);
            if (!declarations.ok) return declarations as ParseResult<Stylesheet>;
            const resultDeclaration = collectDeclarations(declarations.value).get("result");
            const descriptor: CustomFunctionDescriptor = {
                ...(signature.value.parameters.length > 0 ? { parameters: signature.value.parameters } : {}),
                ...(resultDeclaration ? { result: resultDeclaration.value } : {}),
                declarations: declarations.value,
            };
            result.push({ kind: "function", name: signature.value.name, descriptor });
            continue;
        }
        if (lower.startsWith("@scope") || lower === "@starting-style") {
            if (row.body === null) return failure(source, "css_syntax", ["nested body"]);
            const children = parseItems(row.body);
            if (!children.ok) return children;
            if (lower === "@starting-style") result.push({ kind: "starting-style", children: children.value });
            else {
                const parsedPrelude = parseScopePrelude(prelude.slice(6));
                if (!parsedPrelude) return failure(source, "css_syntax", ["scope prelude"]);
                result.push({ kind: "scope", ...parsedPrelude, children: children.value });
            }
            continue;
        }
        if (lower.startsWith("@scroll-timeline ") || lower.startsWith("@view-timeline ")) {
            if (row.body === null) return failure(source, "css_syntax", ["timeline body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            if (lower.startsWith("@scroll")) {
                const descriptor: ScrollTimelineDescriptor = {
                    ...(declarations.get("source") ? { source: serializeCssValue(declarations.get("source")!.value) } : {}),
                    ...(declarations.get("orientation") ? { orientation: serializeCssValue(declarations.get("orientation")!.value) as TimelineAxis } : {}),
                };
                result.push({ kind: "scroll-timeline", name: prelude.slice(17).trim(), descriptor });
            } else {
                const descriptor: ViewTimelineDescriptor = {
                    ...(declarations.get("subject") ? { subject: serializeCssValue(declarations.get("subject")!.value) } : {}),
                    ...(declarations.get("axis") ? { axis: serializeCssValue(declarations.get("axis")!.value) as TimelineAxis } : {}),
                    ...(declarations.get("inset") ? { inset: serializeCssValue(declarations.get("inset")!.value) } : {}),
                };
                result.push({ kind: "view-timeline", name: prelude.slice(15).trim(), descriptor });
            }
            continue;
        }
        if (prelude.startsWith("@")) {
            const firstSpace = prelude.indexOf(" ");
            const parsedChildren = row.body === null ? null : parseItems(row.body);
            result.push({
                kind: "unknown",
                atName: prelude.slice(1, firstSpace < 0 ? undefined : firstSpace),
                prelude: firstSpace < 0 ? "" : prelude.slice(firstSpace + 1),
                body: row.body,
                ...(parsedChildren?.ok ? { children: parsedChildren.value } : {}),
            });
            continue;
        }
        if (row.body === null) return failure(source, "css_syntax", ["style body"]);
        const body = parseStyleBody(row.body);
        if (!body.ok) return body as ParseResult<Stylesheet>;
        result.push({ kind: "style", selectors: splitTopLevel(prelude, ","), ...body.value });
    }
    return success(result);
}

export function parseStylesheet(source: string): ParseResult<Stylesheet> {
    return parseItems(source);
}

function collect<R extends StylesheetItem>(
    stylesheet: Stylesheet,
    predicate: (item: StylesheetItem) => item is R,
): readonly CollectedRule<R>[] {
    const result: CollectedRule<R>[] = [];
    const visit = (items: Stylesheet, parent: readonly number[]) => {
        items.forEach((item, index) => {
            const path = Object.freeze([...parent, index]);
            if (predicate(item)) result.push(Object.freeze({ rule: item, path }));
            if ("children" in item && item.children) visit(item.children, path);
        });
    };
    visit(stylesheet, []);
    return Object.freeze(result);
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
    for (const declaration of declarations) {
        const current = result.get(declaration.name);
        if (!current || declaration.important || !current.important) result.set(declaration.name, declaration);
    }
    return result;
}

type CascadedValue = Readonly<{ value: CssValue; important: boolean }>;

function animationCascade(declarations: readonly Declaration[]): Readonly<{
    selected: ReadonlyMap<string, CascadedValue>;
    hasOptions: boolean;
}> {
    const selected = new Map<string, CascadedValue>();
    let hasOptions = false;
    const offer = (name: string, value: CssValue, important: boolean) => {
        const current = selected.get(name);
        if (!current || important || !current.important) selected.set(name, { value, important });
    };
    for (const declaration of declarations) {
        if (declaration.name === "animation") {
            hasOptions = true;
            const expanded = expandAnimationShorthand(declaration.value);
            if (expanded) {
                for (const [name, value] of expanded) offer(name, value, declaration.important);
            }
        } else if (cascadeProperties.has(declaration.name)) {
            if (optionProperties.has(declaration.name)) hasOptions = true;
            offer(declaration.name, declaration.value, declaration.important);
        }
    }
    return Object.freeze({ selected, hasOptions });
}

function components<T>(
    selected: ReadonlyMap<string, CascadedValue>,
    name: string,
    read: (value: CssValue) => T | undefined,
): readonly T[] | undefined {
    const source = selected.get(name)?.value;
    if (!source) return undefined;
    const values = commaItems(source).map(read);
    return values.every((value) => value !== undefined) ? values as T[] : undefined;
}

function repeated<T>(values: readonly T[] | undefined, index: number): T | undefined {
    return values?.[index % values.length];
}

function iterationValue(value: CssValue): number | undefined {
    return scalarKeyword(value)?.toLowerCase() === "infinite" ? Infinity : scalarNumberValue(value);
}

export function collectAnimationOptions(declarations: readonly Declaration[]): readonly CSSAnimationOptions[] {
    const { selected, hasOptions } = animationCascade(declarations);
    if (!hasOptions) return Object.freeze([]);
    const names = components(selected, "animation-name", animationNameValue);
    const durations = components(selected, "animation-duration", (value) => scalarNumberValue(value, ["s", "ms"]));
    const delays = components(selected, "animation-delay", (value) => scalarNumberValue(value, ["s", "ms"]));
    const iterations = components(selected, "animation-iteration-count", iterationValue);
    const directions = components(selected, "animation-direction", (value) => {
        const direction = scalarKeyword(value)?.toLowerCase();
        return DIRECTIONS.has(direction ?? "")
            ? direction as NonNullable<CSSAnimationOptions["direction"]>
            : undefined;
    });
    const fills = components(selected, "animation-fill-mode", (value) => {
        const fill = scalarKeyword(value)?.toLowerCase();
        return FILL_MODES.has(fill ?? "") ? fill as NonNullable<CSSAnimationOptions["fillMode"]> : undefined;
    });
    const timings = components(selected, "animation-timing-function", timingFunctionValue);
    const compositions = components(selected, "animation-composition", (value) => {
        const composition = scalarKeyword(value)?.toLowerCase();
        return COMPOSITIONS.has(composition ?? "")
            ? composition as NonNullable<CSSAnimationOptions["composition"]>
            : undefined;
    });
    const rows = Array.from({ length: names?.length ?? 1 }, (_, index) => {
        const name = repeated(names, index);
        const duration = repeated(durations, index);
        const delay = repeated(delays, index);
        const iterationCount = repeated(iterations, index);
        const direction = repeated(directions, index);
        const fillMode = repeated(fills, index);
        const timingFunction = repeated(timings, index);
        const composition = repeated(compositions, index);
        return Object.freeze({
            ...(name === undefined ? {} : { name }),
            ...(duration === undefined ? {} : { duration }),
            ...(delay === undefined ? {} : { delay }),
            ...(iterationCount === undefined ? {} : { iterationCount }),
            ...(direction === undefined ? {} : { direction }),
            ...(fillMode === undefined ? {} : { fillMode }),
            ...(timingFunction === undefined ? {} : { timingFunction }),
            ...(composition === undefined ? {} : { composition }),
        });
    });
    return Object.freeze(rows);
}

function parseRangeValue(value: CssValue | undefined): AnimationRangeValue | undefined {
    if (!value) return undefined;
    const parsed = parseAnimationRange(serializeCssValue(value));
    return parsed.ok ? parsed.value : undefined;
}
export function collectTimelineOptions(declarations: readonly Declaration[]): CSSTimelineOptions {
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
    const resolvedRange = range ?? (start || end ? { start: start ?? { phase: "normal" }, ...(end ? { end } : {}) } : undefined);
    return {
        ...(timelines?.[0] ? { timeline: timelines[0] } : {}),
        ...(timelines && timelines.length > 1 ? { timelines } : {}),
        ...(resolvedRange ? { range: resolvedRange } : {}),
        ...(scope?.ok ? { timelineScope: scope.value } : {}),
        ...(trigger?.ok ? { trigger: trigger.value } : {}),
    };
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
