import type { Result } from "../result";
import { err, ok } from "../result";
import {
    a98Rgb,
    displayP3,
    hsl,
    hwb,
    lab,
    lch,
    linearSrgb,
    oklab,
    oklch,
    prophotoRgb,
    rec2020,
    rgb,
    isAnyColor,
    xyz,
} from "../color/model";
import type { Alpha, Channel, ChannelsBySpace, ColorIssue, SpaceId } from "../color/model";
import type { CssCall, CssList, CssScalar, CssValue } from "../value";
import { adaptXyzD50ToD65 } from "../color/anchors";
import type {
    AnimationRangeValue,
    AnimationTimelineValue,
    CssColor,
    CssColorSpace,
    CssLinearStop,
    CssTimingFunction,
    KeyframeSelector,
    ParseIssue,
    ParseResult,
    RangeBoundary,
    RangePhase,
    TimelineAxis,
} from "./types";
import { NAMED_COLORS } from "./named-colors";

function deepFreeze<T>(value: T): T {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    for (const child of Object.values(value)) deepFreeze(child);
    return Object.freeze(value);
}

const EMPTY_DIAGNOSTICS = Object.freeze([]) as readonly [];
const success = <T>(value: T): ParseResult<T> => Object.freeze({
    ok: true,
    value: deepFreeze(value),
    diagnostics: EMPTY_DIAGNOSTICS,
});
const failure = <T>(
    source: string,
    code: ParseIssue["code"] = "css_syntax",
    expected: readonly string[] = [],
    start = 0,
    end = source.length,
): ParseResult<T> => {
    const issue = Object.freeze({
        code,
        start,
        end,
        expected: Object.freeze([...expected]),
        actual: source.slice(start, end) || null,
    });
    const diagnostics = Object.freeze([issue]) as readonly [ParseIssue];
    return Object.freeze({ ok: false, diagnostics });
};

function splitTopLevel(source: string, separator: string | "space"): string[] {
    const parts: string[] = [];
    let depth = 0;
    let quote = "";
    let start = 0;
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            if (char === quote && source[i - 1] !== "\\") quote = "";
            continue;
        }
        if (char === '"' || char === "'") { quote = char; continue; }
        if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && (separator === "space" ? /\s/.test(char) : char === separator)) {
            const part = source.slice(start, i).trim();
            if (part) parts.push(part);
            if (separator === "space") while (/\s/.test(source[i + 1] ?? "")) i++;
            start = i + 1;
        }
    }
    const tail = source.slice(start).trim();
    if (tail) parts.push(tail);
    return parts;
}

function splitValueTokens(source: string): string[] {
    const parts: string[] = [];
    let token = "";
    let depth = 0;
    let quote = "";
    const flush = () => {
        const part = token.trim();
        if (part) parts.push(part);
        token = "";
    };
    for (let i = 0; i < source.length; i++) {
        const char = source[i]!;
        if (quote) {
            token += char;
            if (char === quote && source[i - 1] !== "\\") quote = "";
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
            token += char;
        } else if (char === "(") {
            depth++;
            token += char;
        } else if (char === ")") {
            depth--;
            token += char;
        } else if (depth === 0 && /\s/.test(char)) {
            flush();
        } else if (depth === 0 && (char === ":" || char === ";")) {
            flush();
            parts.push(char);
        } else {
            token += char;
        }
    }
    flush();
    return parts;
}

function numberToken(token: string): number | null {
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(token)) return null;
    const value = Number(token);
    return Number.isFinite(value) ? value : null;
}

function channelToken(token: string, percentScale: number, angle = false): Channel | null {
    if (token.toLowerCase() === "none") return "none";
    if (token.endsWith("%")) {
        const value = numberToken(token.slice(0, -1));
        return value === null ? null : value * percentScale / 100;
    }
    if (angle) {
        const match = token.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(deg|grad|rad|turn)?$/i);
        if (!match) return null;
        const value = Number(match[1]);
        if (!Number.isFinite(value)) return null;
        switch (match[2]?.toLowerCase()) {
            case "grad": return value * 0.9;
            case "rad": return value * 180 / Math.PI;
            case "turn": return value * 360;
            default: return value;
        }
    }
    return numberToken(token);
}

function alphaToken(token: string | undefined): Alpha | null {
    if (token === undefined) return 1;
    return channelToken(token, 1);
}

const CONTEXT_COLOR = /^(?:currentcolor|accentcolor|accentcolortext|activetext|buttonborder|buttonface|buttontext|canvas|canvastext|field|fieldtext|graytext|highlight|highlighttext|linktext|mark|marktext|selecteditem|selecteditemtext|visitedtext)$/i;
const CSS_COLOR_SPACES = new Set<CssColorSpace>([
    "rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch", "xyz",
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020",
]);

function colorResult<S extends SpaceId>(
    source: string,
    result: Result<{ readonly space: S; readonly channels: ChannelsBySpace[S]; readonly alpha: Alpha }, ColorIssue>,
): ParseResult<CssColor> {
    return result.ok
        ? success(result.value as CssColor)
        : failure(source, "css_syntax", [result.error.code]);
}

function parseFunctionalColor(source: string, name: string, body: string): ParseResult<CssColor> {
    if (/\bfrom\b/i.test(body)) return failure(source, "color_context_required", ["context-free color"]);
    const slash = splitTopLevel(body, "/");
    if (slash.length > 2) return failure(source);
    const alpha = alphaToken(slash[1]?.trim());
    if (alpha === null) return failure(source, "css_syntax", ["alpha"]);
    const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");
    const lower = name.toLowerCase();
    if ((lower === "rgb" || lower === "rgba") && components.length === 3) {
        const values = components.map((part) => channelToken(part, 255));
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, rgb(values[0]!, values[1]!, values[2]!, alpha));
    }
    if ((lower === "hsl" || lower === "hsla") && components.length === 3) {
        const values = [channelToken(components[0]!, 360, true), channelToken(components[1]!, 1), channelToken(components[2]!, 1)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, hsl(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "hwb" && components.length === 3) {
        const values = [channelToken(components[0]!, 360, true), channelToken(components[1]!, 1), channelToken(components[2]!, 1)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, hwb(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "lab" && components.length === 3) {
        const values = [channelToken(components[0]!, 100), channelToken(components[1]!, 125), channelToken(components[2]!, 125)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, lab(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "lch" && components.length === 3) {
        const values = [channelToken(components[0]!, 100), channelToken(components[1]!, 150), channelToken(components[2]!, 360, true)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, lch(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "oklab" && components.length === 3) {
        const values = [channelToken(components[0]!, 1), channelToken(components[1]!, 0.4), channelToken(components[2]!, 0.4)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, oklab(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "oklch" && components.length === 3) {
        const values = [channelToken(components[0]!, 1), channelToken(components[1]!, 0.4), channelToken(components[2]!, 360, true)];
        return values.some((value) => value === null)
            ? failure(source)
            : colorResult(source, oklch(values[0]!, values[1]!, values[2]!, alpha));
    }
    if (lower === "color" && components.length === 4) {
        const rawSpace = components.shift()!.toLowerCase();
        const space = (rawSpace === "xyz-d65" || rawSpace === "xyz-d50" ? "xyz" : rawSpace) as CssColorSpace;
        const values = components.map((part) => channelToken(part, 1));
        if (values.some((value) => value === null)) return failure(source);
        const numeric = values as [Channel, Channel, Channel];
        if (rawSpace === "srgb") {
            return colorResult(source, rgb(
                numeric[0] === "none" ? "none" : numeric[0] * 255,
                numeric[1] === "none" ? "none" : numeric[1] * 255,
                numeric[2] === "none" ? "none" : numeric[2] * 255,
                alpha,
            ));
        }
        if (rawSpace === "xyz-d50") {
            if (numeric.some((value) => value === "none")) return failure(source, "css_syntax", ["concrete xyz-d50"]);
            const [x, y, z] = adaptXyzD50ToD65(numeric as [number, number, number]);
            return colorResult(source, xyz(x, y, z, alpha));
        }
        switch (space) {
            case "xyz": return colorResult(source, xyz(values[0]!, values[1]!, values[2]!, alpha));
            case "srgb-linear": return colorResult(source, linearSrgb(values[0]!, values[1]!, values[2]!, alpha));
            case "display-p3": return colorResult(source, displayP3(values[0]!, values[1]!, values[2]!, alpha));
            case "a98-rgb": return colorResult(source, a98Rgb(values[0]!, values[1]!, values[2]!, alpha));
            case "prophoto-rgb": return colorResult(source, prophotoRgb(values[0]!, values[1]!, values[2]!, alpha));
            case "rec2020": return colorResult(source, rec2020(values[0]!, values[1]!, values[2]!, alpha));
            default: return failure(source, "css_syntax", ["CSS color space"]);
        }
    }
    return failure(source, "css_syntax", ["CSS color"]);
}

export function parseCssColor(source: string): ParseResult<CssColor> {
    const input = source.trim();
    if (!input) return failure(source, "css_syntax", ["color"]);
    if (/^(?:var|env)\(/i.test(input) || CONTEXT_COLOR.test(input)) {
        return failure(source, "color_context_required", ["context-free color"]);
    }
    if (/^(?:hsv|kelvin|ictcp|jzazbz)\(/i.test(input)) return failure(source, "css_syntax", ["CSS-native color"]);
    if (input.toLowerCase() === "transparent") return colorResult(source, rgb(0, 0, 0, 0));
    const named = NAMED_COLORS[input.toLowerCase()];
    if (named) return parseCssColor(named);
    const hex = input.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
    if (hex) {
        const digits = hex[1]!;
        const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;
        const alpha = expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1;
        return colorResult(source, rgb(
            parseInt(expanded.slice(0, 2), 16),
            parseInt(expanded.slice(2, 4), 16),
            parseInt(expanded.slice(4, 6), 16),
            alpha,
        ));
    }
    const call = input.match(/^([a-z][\w-]*)\((.*)\)$/is);
    return call ? parseFunctionalColor(source, call[1]!, call[2]!) : failure(source, "css_syntax", ["color"]);
}

const format = (value: Channel): string => value === "none"
    ? value
    : Number(value.toFixed(12)).toString();
const angle = (value: Channel): string => value === "none" ? value : `${format(value)}deg`;
const alphaSuffix = (alpha: Alpha): string => alpha === 1 ? "" : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;

export function serializeCssColor(color: CssColor): Result<string, ColorIssue> {
    if (!isAnyColor(color) || !CSS_COLOR_SPACES.has(color.space as CssColorSpace)) {
        return err({ code: "color_invalid_input" });
    }
    if (color.channels.some((channel) => channel !== "none" && !Number.isFinite(channel))
        || (color.alpha !== "none" && !Number.isFinite(color.alpha))) {
        return err({ code: "color_non_finite" });
    }
    if (color.alpha !== "none" && (color.alpha < 0 || color.alpha > 1)) {
        return err({ code: "color_out_of_range" });
    }
    const [a, b, c] = color.channels as readonly [Channel, Channel, Channel];
    const alpha = alphaSuffix(color.alpha);
    switch (color.space) {
        case "rgb": return ok(`rgb(${format(a)} ${format(b)} ${format(c)}${alpha})`);
        case "hsl": return ok(`hsl(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
        case "hwb": return ok(`hwb(${angle(a)} ${b === "none" ? b : `${format(b * 100)}%`} ${c === "none" ? c : `${format(c * 100)}%`}${alpha})`);
        case "lab": return ok(`lab(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${format(c)}${alpha})`);
        case "lch": return ok(`lch(${a === "none" ? a : `${format(a)}%`} ${format(b)} ${angle(c)}${alpha})`);
        case "oklab": return ok(`oklab(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${format(c)}${alpha})`);
        case "oklch": return ok(`oklch(${a === "none" ? a : `${format(a * 100)}%`} ${format(b)} ${angle(c)}${alpha})`);
        case "xyz": return ok(`color(xyz ${format(a)} ${format(b)} ${format(c)}${alpha})`);
        default: return ok(`color(${color.space} ${format(a)} ${format(b)} ${format(c)}${alpha})`);
    }
}

function parseScalarInternal(source: string): ParseResult<CssScalar> {
    const color = parseCssColor(source);
    if (color.ok) return success({ kind: "scalar", payload: { type: "color", value: color.value } });
    const numeric = source.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([%a-z-]*)$/i);
    if (numeric) {
        const value = Number(numeric[1]);
        if (!Number.isFinite(value)) return failure(source);
        return success({ kind: "scalar", payload: { type: "number", value, unit: numeric[2] ?? "" } });
    }
    if (/^(["'])(?:\\.|(?!\1)[\s\S])*\1$/.test(source)) {
        return success({ kind: "scalar", payload: { type: "keyword", value: source } });
    }
    if (/^(?:[+*]|-|<=|>=|==|!=|<|>|=|:|;)$/.test(source)) {
        return success({ kind: "scalar", payload: { type: "keyword", value: source } });
    }
    if (/^[-_a-z][-_a-z\d]*$/i.test(source)) return success({ kind: "scalar", payload: { type: "keyword", value: source } });
    return failure(source, "css_syntax", ["scalar"]);
}

export function parseCssScalar(source: string): ParseResult<CssScalar> {
    return parseScalarInternal(source.trim());
}

function parseValueInternal(source: string): ParseResult<CssValue> {
    const input = source.trim();
    const comma = splitTopLevel(input, ",");
    if (comma.length > 1) {
        const items: CssValue[] = [];
        for (const part of comma) {
            const parsed = parseValueInternal(part);
            if (!parsed.ok) return parsed;
            items.push(parsed.value);
        }
        return success({ kind: "list", separator: "comma", items });
    }
    const slash = splitTopLevel(input, "/");
    if (slash.length > 1) {
        const items: CssValue[] = [];
        for (const part of slash) {
            const parsed = parseValueInternal(part);
            if (!parsed.ok) return parsed;
            items.push(parsed.value);
        }
        return success({ kind: "list", separator: "slash", items });
    }
    const spaces = splitValueTokens(input);
    if (spaces.length > 1) {
        const items: CssValue[] = [];
        for (const part of spaces) {
            const parsed = parseValueInternal(part);
            if (!parsed.ok) return parsed;
            items.push(parsed.value);
        }
        return success({ kind: "list", separator: "space", items });
    }
    const call = input.match(/^([a-z_-][\w-]*)\((.*)\)$/is);
    if (call && !/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i.test(call[1]!)) {
        const name = call[1]!;
        const body = call[2]!.trim();
        if (/^(?:sibling-index|sibling-count)$/i.test(name)) {
            return body
                ? failure(source, "css_syntax", ["zero-argument function"])
                : success({ kind: "call", name, args: [] } satisfies CssCall);
        }
        if (!body && (name.startsWith("--") || /^(?:scroll|view)$/i.test(name))) {
            return success({ kind: "call", name, args: [] } satisfies CssCall);
        }
        if (!body) return failure(source, "css_syntax", ["function argument"]);
        const parsedArgs = parseValueInternal(body);
        if (!parsedArgs.ok) return parsedArgs;
        const args = parsedArgs.value.kind === "list" && parsedArgs.value.separator === "comma"
            ? parsedArgs.value.items
            : [parsedArgs.value];
        return success({ kind: "call", name, args } satisfies CssCall);
    }
    return parseScalarInternal(input);
}

export function parseCssValue(source: string): ParseResult<CssValue> {
    return parseValueInternal(source);
}

export function parseCssValues(source: string): ParseResult<CssList> {
    const parsed = parseValueInternal(source);
    if (!parsed.ok) return parsed;
    return parsed.value.kind === "list"
        ? success(parsed.value)
        : success({ kind: "list", separator: "space", items: [parsed.value] });
}

export function parseKeyframeSelector(source: string): ParseResult<KeyframeSelector> {
    const input = source.trim();
    const keyword = input.toLowerCase();
    if (keyword === "from" || keyword === "to") {
        return success({ kind: "percent", value: keyword === "from" ? 0 : 1 });
    }
    const percent = input.match(/^([+-]?(?:\d+\.?\d*|\.\d+))%$/);
    if (percent) {
        const value = Number(percent[1]);
        return Number.isFinite(value) && value >= 0 && value <= 100
            ? success({ kind: "percent", value: value / 100 })
            : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
    }
    const named = input.match(/^(entry|exit|cover|contain)(?:\s+([+-]?(?:\d+\.?\d*|\.\d+))%)?$/i);
    if (!named) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
    const name = named[1]!.toLowerCase() as "entry" | "exit" | "cover" | "contain";
    if (named[2] === undefined) return success({ kind: "named", name });
    const offset = Number(named[2]) / 100;
    return Number.isFinite(offset) && offset >= 0 && offset <= 1
        ? success({ kind: "named", name, offset })
        : failure(source, "keyframe_selector_invalid", ["0%..100%"]);
}

/** Internal canonical spelling used by selector round-trip probes and emitters. */
export function serializeKeyframeSelector(selector: KeyframeSelector): string {
    if (selector.kind === "percent") return `${format(selector.value * 100)}%`;
    return selector.offset === undefined
        ? selector.name
        : `${selector.name} ${format(selector.offset * 100)}%`;
}

export function parseTimingFunction(source: string): ParseResult<CssTimingFunction> {
    const input = source.trim().toLowerCase();
    if (["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(input)) {
        return success({ kind: "keyword", name: input as "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" });
    }
    if (input === "step-start" || input === "step-end") {
        return success({ kind: "steps", count: 1, position: input === "step-start" ? "jump-start" : "jump-end" });
    }
    const bezier = input.match(/^cubic-bezier\((.*)\)$/s);
    if (bezier) {
        const values = splitTopLevel(bezier[1]!, ",").map(numberToken);
        if (values.length !== 4 || values.some((value) => value === null)) return failure(source);
        const [x1, y1, x2, y2] = values as [number, number, number, number];
        return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1
            ? success({ kind: "cubic-bezier", x1, y1, x2, y2 })
            : failure(source);
    }
    const steps = input.match(/^steps\((.*)\)$/s);
    if (steps) {
        const args = splitTopLevel(steps[1]!, ",");
        const count = numberToken(args[0] ?? "");
        const aliases: Record<string, "jump-start" | "jump-end" | "jump-none" | "jump-both"> = {
            start: "jump-start", end: "jump-end", "jump-start": "jump-start", "jump-end": "jump-end",
            "jump-none": "jump-none", "jump-both": "jump-both",
        };
        const position = aliases[args[1]?.toLowerCase() ?? "jump-end"];
        return count !== null && Number.isInteger(count) && count > 0 && position !== undefined && !(position === "jump-none" && count < 2)
            ? success({ kind: "steps", count, position })
            : failure(source);
    }
    const linear = input.match(/^linear\((.*)\)$/s);
    if (linear) {
        const rows = splitTopLevel(linear[1]!, ",");
        const stops: CssLinearStop[] = [];
        for (const row of rows) {
            const parts = splitTopLevel(row, "space");
            const output = numberToken(parts.shift() ?? "");
            if (output === null || parts.length > 2) return failure(source);
            const positions = parts.map((part) => part.endsWith("%") ? numberToken(part.slice(0, -1)) : null);
            if (positions.some((position) => position === null)) return failure(source);
            stops.push({ output, input: positions.map((position) => position! / 100) as [] | [number] | [number, number] });
        }
        return stops.length >= 2 ? success({ kind: "linear-function", stops }) : failure(source);
    }
    return failure(source, "css_syntax", ["timing function"]);
}

const SYNTAX_COMPONENTS = new Set([
    "<angle>",
    "<color>",
    "<custom-ident>",
    "<flex>",
    "<integer>",
    "<length>",
    "<length-percentage>",
    "<number>",
    "<percentage>",
    "<resolution>",
    "<time>",
    "<transform-function>",
    "<transform-list>",
]);
const LENGTH_UNITS = new Set([
    "cap", "ch", "cm", "cqb", "cqh", "cqi", "cqmax", "cqmin", "cqw",
    "dvb", "dvh", "dvi", "dvmax", "dvmin", "dvw", "em", "ex", "ic", "in",
    "lh", "lvb", "lvh", "lvi", "lvmax", "lvmin", "lvw", "mm", "pc", "pt",
    "px", "q", "rcap", "rch", "rem", "rex", "ric", "rlh", "svb", "svh",
    "svi", "svmax", "svmin", "svw", "vb", "vh", "vi", "vmax", "vmin", "vw",
]);
const TRANSFORM_FUNCTIONS = new Set([
    "matrix", "matrix3d", "perspective", "rotate", "rotate3d", "rotatex",
    "rotatey", "rotatez", "scale", "scale3d", "scalex", "scaley", "scalez",
    "skew", "skewx", "skewy", "translate", "translate3d", "translatex",
    "translatey", "translatez",
]);

function syntaxAlternatives(syntax: string): readonly string[] | null {
    const alternatives = syntax.split("|").map((part) => part.trim());
    return alternatives.length > 0
        && alternatives.every((part) => part === "*" || SYNTAX_COMPONENTS.has(part))
        ? alternatives
        : null;
}

export function isSupportedSyntaxDescriptor(syntax: string): boolean {
    return syntaxAlternatives(syntax) !== null;
}

function numeric(value: CssValue): Readonly<{ value: number; unit: string }> | null {
    return value.kind === "scalar" && value.payload.type === "number"
        ? value.payload
        : null;
}

function isTransformCall(value: CssValue): boolean {
    return value.kind === "call" && TRANSFORM_FUNCTIONS.has(value.name.toLowerCase());
}

function matchesSyntax(value: CssValue, component: string): boolean {
    if (component === "*") return true;
    if (component === "<color>") {
        return value.kind === "scalar" && value.payload.type === "color";
    }
    if (component === "<custom-ident>") {
        return value.kind === "scalar"
            && value.payload.type === "keyword"
            && !/^(?:initial|inherit|unset|revert|revert-layer|default)$/i.test(value.payload.value);
    }
    if (component === "<transform-function>") return isTransformCall(value);
    if (component === "<transform-list>") {
        return isTransformCall(value)
            || value.kind === "list"
                && value.separator === "space"
                && value.items.length > 0
                && value.items.every(isTransformCall);
    }
    const token = numeric(value);
    if (!token) return false;
    const unit = token.unit.toLowerCase();
    switch (component) {
        case "<number>": return unit === "";
        case "<integer>": return unit === "" && Number.isInteger(token.value);
        case "<percentage>": return unit === "%";
        case "<length>": return LENGTH_UNITS.has(unit);
        case "<length-percentage>": return unit === "%" || LENGTH_UNITS.has(unit);
        case "<angle>": return ["deg", "grad", "rad", "turn"].includes(unit);
        case "<time>": return unit === "s" || unit === "ms";
        case "<resolution>": return ["dpi", "dpcm", "dppx", "x"].includes(unit);
        case "<flex>": return unit === "fr";
        default: return false;
    }
}

export function coerceToSyntax(source: string, syntax: string): ParseResult<CssValue> {
    const alternatives = syntaxAlternatives(syntax);
    if (!alternatives) {
        return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
    }
    const value = parseCssValue(source);
    if (!value.ok) return value;
    const matches = alternatives.some((alternative) =>
        matchesSyntax(value.value, alternative));
    return matches ? value : failure(source, "syntax_mismatch", alternatives);
}

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

export { success, failure, splitTopLevel };
