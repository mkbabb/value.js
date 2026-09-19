import type { Result } from "../foundation/result";
import { err, ok } from "../foundation/result";
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
    CssColor,
    CssColorSpace,
    CssLinearStop,
    CssTimingFunction,
    JumpPosition,
    KeyframeSelector,
    ParseIssue,
    ParseResult,
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
        const char = source.charAt(i);
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
        const char = source.charAt(i);
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

/** One channel's reading rule: a percentage scale and whether it takes an angle. */
type ChannelReader = (token: string) => Channel | null;
const chan = (percentScale: number, angle = false): ChannelReader =>
    (token) => channelToken(token, percentScale, angle);

/**
 * Reads exactly three channels under `readers`, or `null` if any component is
 * missing or unreadable. Returning a TUPLE is what retires the `values[0]!`
 * idiom at every colour head: the caller's narrowing is carried in the type
 * instead of asserted away (X-W9.a; `noUncheckedIndexedAccess` is on, and the
 * `!` that silenced it is the shape this wave prevents, W9.md §Archaeology 4).
 */
function channelTriple(
    components: readonly string[],
    readers: readonly [ChannelReader, ChannelReader, ChannelReader],
): readonly [Channel, Channel, Channel] | null {
    const [first, second, third] = components;
    if (first === undefined || second === undefined || third === undefined) return null;
    const a = readers[0](first);
    const b = readers[1](second);
    const c = readers[2](third);
    return a === null || b === null || c === null ? null : [a, b, c];
}

const CONTEXT_COLOR = /^(?:currentcolor|accentcolor|accentcolortext|activetext|buttonborder|buttonface|buttontext|canvas|canvastext|field|fieldtext|graytext|highlight|highlighttext|linktext|mark|marktext|selecteditem|selecteditemtext|visitedtext)$/i;
/** The heads `parseValueInternal` must hand to the colour arm rather than treat
 *  as a generic call. Hoisted: it was re-compiled on every recursion. */
const COLOR_FUNCTION = /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)$/i;
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
    // `splitTopLevel` yields NO parts for an empty or all-whitespace body, so
    // `slash[0]` is `undefined` for every `rgb() hsl() oklch() color() …`. The
    // shipped `slash[0]!` made that a bare `TypeError` on the public entry
    // (R1, `value-inbox-2026-07-27-…-r1-widened-k1-k4.md` §A1: one failure mode,
    // 24 of 26 zero-argument heads through `parseCssScalar`). It is a syntax
    // error, so it returns this module's typed failure like every other one.
    const head = slash[0];
    if (head === undefined) return failure(source, "css_syntax", ["color components"]);
    const components = splitTopLevel(head.replace(/,/g, " "), "space");
    const lower = name.toLowerCase();
    const triple = (a: ChannelReader, b: ChannelReader, c: ChannelReader) =>
        channelTriple(components, [a, b, c]);
    if ((lower === "rgb" || lower === "rgba") && components.length === 3) {
        const values = triple(chan(255), chan(255), chan(255));
        return values === null ? failure(source) : colorResult(source, rgb(...values, alpha));
    }
    if ((lower === "hsl" || lower === "hsla") && components.length === 3) {
        const values = triple(chan(360, true), chan(1), chan(1));
        return values === null ? failure(source) : colorResult(source, hsl(...values, alpha));
    }
    if (lower === "hwb" && components.length === 3) {
        const values = triple(chan(360, true), chan(1), chan(1));
        return values === null ? failure(source) : colorResult(source, hwb(...values, alpha));
    }
    if (lower === "lab" && components.length === 3) {
        const values = triple(chan(100), chan(125), chan(125));
        return values === null ? failure(source) : colorResult(source, lab(...values, alpha));
    }
    if (lower === "lch" && components.length === 3) {
        const values = triple(chan(100), chan(150), chan(360, true));
        return values === null ? failure(source) : colorResult(source, lch(...values, alpha));
    }
    if (lower === "oklab" && components.length === 3) {
        const values = triple(chan(1), chan(0.4), chan(0.4));
        return values === null ? failure(source) : colorResult(source, oklab(...values, alpha));
    }
    if (lower === "oklch" && components.length === 3) {
        const values = triple(chan(1), chan(0.4), chan(360, true));
        return values === null ? failure(source) : colorResult(source, oklch(...values, alpha));
    }
    if (lower === "color" && components.length === 4) {
        const [spaceToken, ...rest] = components;
        if (spaceToken === undefined) return failure(source);
        const rawSpace = spaceToken.toLowerCase();
        const space = (rawSpace === "xyz-d65" || rawSpace === "xyz-d50" ? "xyz" : rawSpace) as CssColorSpace;
        const numeric = channelTriple(rest, [chan(1), chan(1), chan(1)]);
        if (numeric === null) return failure(source);
        const [x, y, z] = numeric;
        if (rawSpace === "srgb") {
            return colorResult(source, rgb(
                x === "none" ? "none" : x * 255,
                y === "none" ? "none" : y * 255,
                z === "none" ? "none" : z * 255,
                alpha,
            ));
        }
        if (rawSpace === "xyz-d50") {
            if (x === "none" || y === "none" || z === "none") {
                return failure(source, "css_syntax", ["concrete xyz-d50"]);
            }
            const adapted = adaptXyzD50ToD65([x, y, z]);
            return colorResult(source, xyz(...adapted, alpha));
        }
        switch (space) {
            case "xyz": return colorResult(source, xyz(...numeric, alpha));
            case "srgb-linear": return colorResult(source, linearSrgb(...numeric, alpha));
            case "display-p3": return colorResult(source, displayP3(...numeric, alpha));
            case "a98-rgb": return colorResult(source, a98Rgb(...numeric, alpha));
            case "prophoto-rgb": return colorResult(source, prophotoRgb(...numeric, alpha));
            case "rec2020": return colorResult(source, rec2020(...numeric, alpha));
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
    // `NAMED_COLORS` is prototype-free (see `./named-colors`), so a parse-derived
    // key can only reach an OWN entry. The `typeof` narrowing is the second half
    // of the same cure: it is what the type system can see, and it keeps the
    // recursion honest if the table is ever re-typed. Together they retire
    // `parseCssColor("constructor") -> TypeError: e.trim is not a function`
    // (R1 §A2 — the class that also reached `parseStylesheet`, an entry
    // MT-F024's sweep certified `ok 0/172`).
    const named = NAMED_COLORS[input.toLowerCase()];
    if (typeof named === "string") return parseCssColor(named);
    const digits = input.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)?.[1];
    if (digits !== undefined) {
        const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;
        const alpha = expanded.length === 8 ? parseInt(expanded.slice(6, 8), 16) / 255 : 1;
        return colorResult(source, rgb(
            parseInt(expanded.slice(0, 2), 16),
            parseInt(expanded.slice(2, 4), 16),
            parseInt(expanded.slice(4, 6), 16),
            alpha,
        ));
    }
    const [, callName, callBody] = input.match(/^([a-z][\w-]*)\((.*)\)$/is) ?? [];
    return callName !== undefined && callBody !== undefined
        ? parseFunctionalColor(source, callName, callBody)
        : failure(source, "css_syntax", ["color"]);
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
    const [, name, rawBody] = input.match(/^([a-z_-][\w-]*)\((.*)\)$/is) ?? [];
    if (name !== undefined && rawBody !== undefined && !COLOR_FUNCTION.test(name)) {
        const body = rawBody.trim();
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
    const [, rawName, rawOffset] = input.match(/^(entry|exit|cover|contain)(?:\s+([+-]?(?:\d+\.?\d*|\.\d+))%)?$/i) ?? [];
    if (rawName === undefined) return failure(source, "keyframe_selector_invalid", ["keyframe selector"]);
    const name = rawName.toLowerCase() as "entry" | "exit" | "cover" | "contain";
    if (rawOffset === undefined) return success({ kind: "named", name });
    const offset = Number(rawOffset) / 100;
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

/**
 * `steps()`' authored position spellings, keyed by the AUTHORED token. A `Map`,
 * not an object literal: the shipped literal resolved `steps(2, constructor)`
 * through `Object.prototype` and returned `{ok:true, position: <Function>}` — a
 * well-formed-looking payload whose `position` is not a `JumpPosition`, i.e. a
 * TYPE LIE that no throw-based gate could see (R1 §A2). `Map.get` reads own
 * entries only. Exported so `./stylesheet`'s twin site shares this one table
 * instead of re-declaring it (the two copies were the reason the defect had two
 * homes).
 */
export const JUMP_ALIASES: ReadonlyMap<string, JumpPosition> = new Map([
    ["start", "jump-start"],
    ["end", "jump-end"],
    ["jump-start", "jump-start"],
    ["jump-end", "jump-end"],
    ["jump-none", "jump-none"],
    ["jump-both", "jump-both"],
] as const);

export function parseTimingFunction(source: string): ParseResult<CssTimingFunction> {
    const input = source.trim().toLowerCase();
    if (["linear", "ease", "ease-in", "ease-out", "ease-in-out"].includes(input)) {
        return success({ kind: "keyword", name: input as "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" });
    }
    if (input === "step-start" || input === "step-end") {
        return success({ kind: "steps", count: 1, position: input === "step-start" ? "jump-start" : "jump-end" });
    }
    const bezierBody = input.match(/^cubic-bezier\((.*)\)$/s)?.[1];
    if (bezierBody !== undefined) {
        const values = splitTopLevel(bezierBody, ",").map(numberToken);
        const [x1, y1, x2, y2] = values;
        if (values.length !== 4 || x1 === null || y1 === null || x2 === null || y2 === null
            || x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined) {
            return failure(source);
        }
        return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1
            ? success({ kind: "cubic-bezier", x1, y1, x2, y2 })
            : failure(source);
    }
    const stepsBody = input.match(/^steps\((.*)\)$/s)?.[1];
    if (stepsBody !== undefined) {
        const args = splitTopLevel(stepsBody, ",");
        const count = numberToken(args[0] ?? "");
        const position = JUMP_ALIASES.get(args[1]?.toLowerCase() ?? "jump-end");
        return count !== null && Number.isInteger(count) && count > 0 && position !== undefined && !(position === "jump-none" && count < 2)
            ? success({ kind: "steps", count, position })
            : failure(source);
    }
    const linearBody = input.match(/^linear\((.*)\)$/s)?.[1];
    if (linearBody !== undefined) {
        const stops: CssLinearStop[] = [];
        for (const row of splitTopLevel(linearBody, ",")) {
            const parts = splitTopLevel(row, "space");
            const output = numberToken(parts.shift() ?? "");
            if (output === null || parts.length > 2) return failure(source);
            const positions: number[] = [];
            for (const part of parts) {
                const position = part.endsWith("%") ? numberToken(part.slice(0, -1)) : null;
                if (position === null) return failure(source);
                positions.push(position / 100);
            }
            stops.push({ output, input: positions as [] | [number] | [number, number] });
        }
        return stops.length >= 2 ? success({ kind: "linear-function", stops }) : failure(source);
    }
    return failure(source, "css_syntax", ["timing function"]);
}

export { success, failure, splitTopLevel };
