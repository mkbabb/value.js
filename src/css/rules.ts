/**
 * The DECLARATION layer of `./css`: how a rule's declarations are read,
 * validated, expanded and cascaded.
 *
 * `src/css/stylesheet.ts` was 920 lines at X-W9's open — the library's largest
 * module (CC-090 · RD-9 · G16). It carried three layers at once. This file is
 * the lowest of them: text -> `Declaration[]` (`parseDeclarations`), the
 * `CssValue` readers each declaration's grammar needs, the `animation`
 * shorthand expansion, and the two declaration-level cascades
 * (`collectDeclarations`, `collectAnimationOptions`). It reaches NOTHING in
 * `./stylesheet` or `./serialize`; the seam runs one way only.
 */
import { parseCssValue, splitTopLevel } from "./bbnf/index";
import { JUMP_ALIASES } from "./bbnf/value";
import { failure, success } from "./result";
import { parseAnimationRange, parseAnimationTimeline } from "./timeline";
import type { CssScalar, CssValue } from "../value";
import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    AnimationTriggerValue,
    CSSAnimationOptions,
    CssLinearStop,
    CssTimingFunction,
    Declaration,
    ParseResult,
    TimelineAxis,
    TimelineScopeValue,
    TriggerType,
} from "./types";

const TRIGGER_TYPES = new Set<TriggerType>(["once", "repeat", "alternate", "state"]);

export function parseTimelineScope(source: string): ParseResult<TimelineScopeValue> {
    const input = source.trim();
    if (input === "none" || input === "all") return success({ kind: input });
    const names = splitTopLevel(input, ",");
    return names !== null && names.length > 0 && names.every((name) => /^--[-\w]+$/.test(name))
        ? success({ kind: "names", names })
        : failure(source, "timeline_option_invalid", ["timeline scope"]);
}

export function parseAnimationTrigger(source: string): ParseResult<AnimationTriggerValue> {
    const tokens = splitTopLevel(source.trim(), "space");
    if (!tokens) return failure(source, "timeline_option_invalid", ["animation trigger"]);
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
        const [countArgument] = value.args;
        if (countArgument === undefined || value.args.length > 2) return undefined;
        const count = scalarNumberValue(countArgument);
        // The TWIN of the grammar's `steps()` alias site (`./bbnf/value.ts`;
        // the retired `grammar.ts` before X.P.W6.x). It was masked: the
        // stylesheet route threw in the grammar before reaching here, so curing
        // the grammar UNMASKS this literal — which is why the band ruled the two
        // sites land in one commit. Both read the one exported `Map`, so a
        // parse-derived key cannot walk `Object.prototype` at either.
        const authoredPosition = scalarKeyword(value.args[1])?.toLowerCase();
        const position = authoredPosition === undefined
            ? "jump-end"
            : JUMP_ALIASES.get(authoredPosition);
        if (position === undefined) return undefined;
        return count !== undefined && Number.isInteger(count) && count > 0 && !(position === "jump-none" && count < 2)
            ? Object.freeze({ kind: "steps", count, position })
            : undefined;
    }
    if (name !== "linear" || value.args.length < 2) return undefined;
    const stops: CssLinearStop[] = [];
    for (const argument of value.args) {
        const tokens = spaceItems(argument);
        const [outputToken, ...rest] = tokens;
        if (outputToken === undefined || tokens.length > 3) return undefined;
        const output = scalarNumberValue(outputToken);
        if (output === undefined) return undefined;
        const positions: number[] = [];
        for (const token of rest) {
            const position = scalarNumberValue(token, ["%"]);
            if (position === undefined) return undefined;
            positions.push(position / 100);
        }
        stops.push(Object.freeze({
            output,
            input: Object.freeze(positions) as [] | [number] | [number, number],
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

export function timelineList(value: CssValue): readonly AnimationTimelineValue[] | undefined {
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
const listValue = (items: readonly CssValue[]): CssValue => items.length === 1 && items[0] !== undefined
    ? items[0]
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

/** Whether `value` holds a `var()` anywhere (css-variables-1 §3), at any depth of call or list. */
function holdsVar(value: CssValue): boolean {
    switch (value.kind) {
        case "call": return value.name.toLowerCase() === "var" || value.args.some(holdsVar);
        case "list": return value.items.some(holdsVar);
        default: return false;
    }
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
        const char = source.charAt(index);
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

export function parseDeclarations(body: string): ParseResult<readonly Declaration[]> {
    const declarations: Declaration[] = [];
    const rows = splitTopLevel(body, ";");
    if (!rows) return failure(body, "css_syntax", ["declaration"]);
    for (const row of rows) {
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
        // css-variables-1 §3: "If a property contains one or more var() functions, and those
        // functions are syntactically valid, the entire property's grammar must be assumed to be
        // valid at parse time. It is only syntax-checked at computed-value time." (R-b-2, X.P.W6.b)
        if (holdsVar(value.value)) {
            declarations.push({ name, value: value.value, important });
            continue;
        }
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

export function collectDeclarations(declarations: readonly Declaration[]): ReadonlyMap<string, Declaration> {
    const result = new Map<string, Declaration>();
    for (const declaration of declarations) {
        const current = result.get(declaration.name);
        if (!current || declaration.important || !current.important) result.set(declaration.name, declaration);
    }
    return result;
}

type CascadedValue = Readonly<{ value: CssValue; important: boolean }>;

export function animationCascade(declarations: readonly Declaration[]): Readonly<{
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
