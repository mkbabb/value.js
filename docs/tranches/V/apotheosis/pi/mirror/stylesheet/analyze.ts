import type { CssScalar, CssValue } from "../deps/value-types.js";
import type {
    AnimationTimelineValue,
    CSSAnimationOptions,
    CssLinearStop,
    CssTimingFunction,
    TimelineAxis,
} from "../types.js";

const DIRECTIONS = new Set(["normal", "reverse", "alternate", "alternate-reverse"]);
const FILL_MODES = new Set(["none", "forwards", "backwards", "both"]);
const PLAY_STATES = new Set(["running", "paused"]);
const COMPOSITIONS = new Set(["replace", "add", "accumulate"]);
const TIMING_KEYWORDS = new Set(["linear", "ease", "ease-in", "ease-out", "ease-in-out"]);
const CSS_WIDE = new Set(["initial", "inherit", "unset", "revert", "revert-layer"]);
const MATH_HEADS = new Set([
    "calc", "min", "max", "clamp", "round", "mod", "rem", "sin", "cos",
    "tan", "asin", "acos", "atan", "atan2", "exp", "log", "pow", "sqrt",
    "hypot", "sign", "abs",
]);

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

export function commaItems(value: CssValue): readonly CssValue[] {
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

function callNamed(value: CssValue, names: ReadonlySet<string>): boolean {
    return value.kind === "call" && names.has(value.name.toLowerCase());
}

function containsSubstitution(value: CssValue): boolean {
    if (value.kind === "scalar") return false;
    if (value.kind === "call") {
        const name = value.name.toLowerCase();
        return name === "var" || name === "env" || value.args.some(containsSubstitution);
    }
    return value.items.some(containsSubstitution);
}

function timingFunctionValue(value: CssValue): CssTimingFunction | undefined {
    const word = scalarKeyword(value)?.toLowerCase();
    if (word && TIMING_KEYWORDS.has(word)) return { kind: "keyword", name: word } as CssTimingFunction;
    if (word === "step-start" || word === "step-end") {
        return {
            kind: "steps",
            count: 1,
            position: word === "step-start" ? "jump-start" : "jump-end",
        };
    }
    if (value.kind !== "call") return undefined;
    const name = value.name.toLowerCase();
    if (name === "cubic-bezier") {
        const values = value.args.map((argument) => scalarNumberValue(argument));
        if (values.length !== 4 || values.some((item) => item === undefined)) return undefined;
        const [x1, y1, x2, y2] = values as [number, number, number, number];
        return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1
            ? { kind: "cubic-bezier", x1, y1, x2, y2 }
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
        return count !== undefined && Number.isInteger(count) && count > 0
            && !(position === "jump-none" && count < 2)
            ? { kind: "steps", count, position }
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
        stops.push({
            output,
            input: positions.map((position) => position! / 100) as [] | [number] | [number, number],
        });
    }
    return { kind: "linear-function", stops };
}

function animationNameValue(value: CssValue): string | undefined {
    const name = scalarKeyword(value);
    if (!name) return undefined;
    return !CSS_WIDE.has(name.toLowerCase()) ? name : undefined;
}

function timelineValue(value: CssValue): AnimationTimelineValue | undefined {
    const word = scalarKeyword(value);
    const lower = word?.toLowerCase();
    if (lower === "auto" || lower === "none") return { kind: lower };
    if (word?.startsWith("--")) return { kind: "name", name: word };
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
        return result;
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
    return result;
}

export function timelineList(value: CssValue): readonly AnimationTimelineValue[] | undefined {
    const values = commaItems(value).map(timelineValue);
    return values.every((item) => item !== undefined) ? values as AnimationTimelineValue[] : undefined;
}

const keywordValue = (value: string): CssScalar => ({
    kind: "scalar",
    payload: { type: "keyword", value },
});
const numberValue = (value: number, unit: string): CssScalar => ({
    kind: "scalar",
    payload: { type: "number", value, unit },
});
const listValue = (items: readonly CssValue[]): CssValue => items.length === 1
    ? items[0]!
    : { kind: "list", separator: "comma", items: [...items] };

type AnimationArm = Readonly<{
    name: CssValue;
    duration: CssValue;
    delay: CssValue;
    iteration: CssValue;
    direction: CssValue;
    fill: CssValue;
    playState: CssValue;
    timing: CssValue;
    deferred: boolean;
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
    let deferred = false;
    for (const token of tokens) {
        const substitution = containsSubstitution(token);
        if (substitution && !callNamed(token, MATH_HEADS)) {
            deferred = true;
            continue;
        }
        const time = scalarNumberValue(token, ["s", "ms"]);
        if (time !== undefined) {
            if (!duration) {
                if (time < 0) return undefined;
                duration = token;
            } else if (!delay) delay = token;
            else return undefined;
            continue;
        }
        if (callNamed(token, MATH_HEADS)) {
            if (!duration) duration = token;
            else if (!delay) delay = token;
            else if (!iteration) iteration = token;
            else return undefined;
            if (substitution) deferred = true;
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
    return {
        name: name ?? keywordValue("none"),
        duration: duration ?? numberValue(0, "s"),
        delay: delay ?? numberValue(0, "s"),
        iteration: iteration ?? numberValue(1, ""),
        direction: direction ?? keywordValue("normal"),
        fill: fill ?? keywordValue("none"),
        playState: playState ?? keywordValue("running"),
        timing: timing ?? keywordValue("ease"),
        deferred,
    };
}

export function expandAnimationShorthand(value: CssValue): ReadonlyMap<string, CssValue> | undefined {
    const arms = commaItems(value).map(animationArm);
    if (arms.some((arm) => arm === undefined || arm.deferred)) return undefined;
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

export function optionDeclarationValid(name: string, value: CssValue): boolean {
    const items = commaItems(value);
    if (items.length === 0) return false;
    const validOrDeferred = (item: CssValue, valid: (candidate: CssValue) => boolean): boolean => {
        if (!containsSubstitution(item)) return valid(item);
        return item.kind !== "list" || item.items.every((candidate) =>
            containsSubstitution(candidate) || valid(candidate));
    };
    switch (name) {
        case "animation": return items.every((item) => animationArm(item) !== undefined);
        case "animation-name": return items.every((item) => validOrDeferred(item, (candidate) => animationNameValue(candidate) !== undefined));
        case "animation-duration": return items.every((item) => validOrDeferred(item, (candidate) =>
            callNamed(candidate, MATH_HEADS) || (scalarNumberValue(candidate, ["s", "ms"]) ?? -1) >= 0));
        case "animation-delay": return items.every((item) => validOrDeferred(item, (candidate) =>
            callNamed(candidate, MATH_HEADS) || scalarNumberValue(candidate, ["s", "ms"]) !== undefined));
        case "animation-iteration-count": return items.every((item) => validOrDeferred(item, (candidate) => {
            const count = scalarNumberValue(candidate);
            return callNamed(candidate, MATH_HEADS)
                || scalarKeyword(candidate)?.toLowerCase() === "infinite"
                || count !== undefined && count >= 0;
        }));
        case "animation-direction": return items.every((item) => validOrDeferred(item, (candidate) => DIRECTIONS.has(scalarKeyword(candidate)?.toLowerCase() ?? "")));
        case "animation-fill-mode": return items.every((item) => validOrDeferred(item, (candidate) => FILL_MODES.has(scalarKeyword(candidate)?.toLowerCase() ?? "")));
        case "animation-play-state": return items.every((item) => validOrDeferred(item, (candidate) => PLAY_STATES.has(scalarKeyword(candidate)?.toLowerCase() ?? "")));
        case "animation-composition": return items.every((item) => validOrDeferred(item, (candidate) => COMPOSITIONS.has(scalarKeyword(candidate)?.toLowerCase() ?? "")));
        case "animation-timing-function": return items.every((item) => validOrDeferred(item, (candidate) => timingFunctionValue(candidate) !== undefined));
        case "animation-timeline": return items.every((item) =>
            containsSubstitution(item) || timelineList(item) !== undefined);
        default: return true;
    }
}

type CascadedValue = Readonly<{ value: CssValue; important: boolean }>;

export function animationCascade(declarations: readonly Readonly<{
    name: string;
    value: CssValue;
    important: boolean;
}>[]): Readonly<{
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
    return { selected, hasOptions };
}

export function components<T>(
    selected: ReadonlyMap<string, CascadedValue>,
    name: string,
    read: (value: CssValue) => T | undefined,
): readonly T[] | undefined {
    const source = selected.get(name)?.value;
    if (!source) return undefined;
    const values = commaItems(source).map(read);
    return values.every((value) => value !== undefined) ? values as T[] : undefined;
}

export function repeated<T>(values: readonly T[] | undefined, index: number): T | undefined {
    return values?.[index % values.length];
}

export function iterationValue(value: CssValue): number | undefined {
    return scalarKeyword(value)?.toLowerCase() === "infinite" ? Infinity : scalarNumberValue(value);
}

export function readAnimationName(value: CssValue): string | undefined {
    return animationNameValue(value);
}

export function readDuration(value: CssValue): number | undefined {
    return scalarNumberValue(value, ["s", "ms"]);
}

export function readDirection(value: CssValue): CSSAnimationOptions["direction"] | undefined {
    const direction = scalarKeyword(value)?.toLowerCase();
    return DIRECTIONS.has(direction ?? "") ? direction as NonNullable<CSSAnimationOptions["direction"]> : undefined;
}

export function readFill(value: CssValue): CSSAnimationOptions["fillMode"] | undefined {
    const fill = scalarKeyword(value)?.toLowerCase();
    return FILL_MODES.has(fill ?? "") ? fill as NonNullable<CSSAnimationOptions["fillMode"]> : undefined;
}

export function readTiming(value: CssValue): CssTimingFunction | undefined {
    return timingFunctionValue(value);
}

export function readComposition(value: CssValue): CSSAnimationOptions["composition"] | undefined {
    const composition = scalarKeyword(value)?.toLowerCase();
    return COMPOSITIONS.has(composition ?? "")
        ? composition as NonNullable<CSSAnimationOptions["composition"]>
        : undefined;
}
