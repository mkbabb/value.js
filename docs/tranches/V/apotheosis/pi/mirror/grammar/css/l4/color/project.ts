import {
    a98Rgb,
    adaptXyzD50ToD65,
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
    xyz,
    type Alpha,
    type Channel,
    type ColorIssue,
} from "../../../../deps/color-model.js";
import type { Result } from "../../../../deps/foundation.js";
import { NAMED_COLORS } from "../../../../named-colors.js";
import { failure, success } from "../../../../result.js";
import type { CssColor, ParseResult } from "../../../../types.js";
import type { CssComponentValue, CssFunction, CssToken } from "../syntax/types.js";

type TokenPart = Readonly<{ token: CssToken }>;
type ColorFactory = (a: Channel, b: Channel, c: Channel, alpha: Alpha) => Result<CssColor, ColorIssue>;

function componentRaw(component: CssComponentValue): string {
    if (component.kind === "function-block") {
        return component.head.raw + component.value.map(componentRaw).join("") + (component.close?.raw ?? "");
    }
    if (component.kind === "simple-block") {
        return component.open.raw + component.value.map(componentRaw).join("") + (component.close?.raw ?? "");
    }
    return component.raw;
}

const CONTEXT_COLORS = new Set([
    "currentcolor", "accentcolor", "accentcolortext", "activetext", "buttonborder",
    "buttonface", "buttontext", "canvas", "canvastext", "field", "fieldtext",
    "graytext", "highlight", "highlighttext", "linktext", "mark", "marktext",
    "selecteditem", "selecteditemtext", "visitedtext",
]);
const NON_CSS_COLOR_FUNCTIONS = new Set(["hsv", "kelvin", "ictcp", "jzazbz"]);

function raw(components: readonly CssComponentValue[]): string {
    return components.map(componentRaw).join("");
}

function reject(components: readonly CssComponentValue[], expected: readonly string[] = ["color"]): ParseResult<CssColor> {
    const first = components.find(({ kind }) => kind !== "whitespace" && kind !== "comment") ?? components[0];
    const last = [...components].reverse().find(({ kind }) => kind !== "whitespace" && kind !== "comment") ?? components.at(-1);
    const source = " ".repeat(first?.span.start ?? 0) + raw(components);
    return failure(source, "css_syntax", expected, first?.span.start ?? 0, last?.span.end);
}

function contextRequired(components: readonly CssComponentValue[]): ParseResult<CssColor> {
    const start = components[0]?.span.start ?? 0;
    const source = " ".repeat(start) + raw(components);
    return failure(source, "color_context_required", ["context-free color"], start, source.length);
}

function significant(components: readonly CssComponentValue[]): readonly CssComponentValue[] {
    return components.filter(({ kind }) => kind !== "whitespace" && kind !== "comment");
}

function parts(children: readonly CssComponentValue[]): readonly TokenPart[] | undefined {
    const output: TokenPart[] = [];
    for (const child of children) {
        if (child.kind === "whitespace" || child.kind === "comment") continue;
        if (child.kind === "function-block" || child.kind === "simple-block") return undefined;
        output.push({ token: child as CssToken });
    }
    return output;
}

function isPunctuation(part: TokenPart | undefined, rawValue: string): boolean {
    return part?.token.raw === rawValue;
}

function isNone(token: CssToken, allow: boolean): token is CssToken & { value: string } {
    return allow && token.kind === "ident" && String(token.value).toLowerCase() === "none";
}

function number(token: CssToken): number | undefined {
    if (token.kind !== "number" || typeof token.value !== "number" || !Number.isFinite(token.value)) return undefined;
    return token.value;
}

function numberOrPercent(token: CssToken, percentScale: number): number | undefined {
    if (typeof token.value !== "number" || !Number.isFinite(token.value)) return undefined;
    if (token.kind === "number") return token.value;
    if (token.kind === "percentage") return token.value * percentScale / 100;
    return undefined;
}

function hue(token: CssToken, allowNone: boolean): Channel | undefined {
    if (isNone(token, allowNone)) return "none";
    if (typeof token.value !== "number" || !Number.isFinite(token.value)) return undefined;
    let degrees: number;
    if (token.kind === "number") degrees = token.value;
    else if (token.kind === "dimension") {
        switch (token.unit?.toLowerCase()) {
            case "deg": degrees = token.value; break;
            case "grad": degrees = token.value * 0.9; break;
            case "rad": degrees = token.value * 180 / Math.PI; break;
            case "turn": degrees = token.value * 360; break;
            default: return undefined;
        }
    } else return undefined;
    return ((degrees % 360) + 360) % 360;
}

function alpha(token: CssToken | undefined, allowNone: boolean): Alpha | undefined {
    if (token === undefined) return 1;
    if (isNone(token, allowNone)) return "none";
    const value = numberOrPercent(token, 1);
    return value === undefined ? undefined : Math.min(1, Math.max(0, value));
}

type ParsedBody = Readonly<{ channels: readonly [CssToken, CssToken, CssToken]; alpha: CssToken | undefined; legacy: boolean }>;

function bodyParts(fn: CssFunction, legacyAllowed: boolean): ParsedBody | undefined {
    const values = parts(fn.value);
    if (values === undefined || values.length === 0) return undefined;
    const hasComma = values.some(({ token }) => token.kind === "comma");

    if (hasComma) {
        if (!legacyAllowed || values.length !== 5 && values.length !== 7) return undefined;
        if (!isPunctuation(values[1], ",") || !isPunctuation(values[3], ",")) return undefined;
        if (values.length === 7 && !isPunctuation(values[5], ",")) return undefined;
        return {
            channels: [values[0]!.token, values[2]!.token, values[4]!.token],
            alpha: values[6]?.token,
            legacy: true,
        };
    }

    if (values.length !== 3 && values.length !== 5) return undefined;
    if (values.length === 5 && !isPunctuation(values[3], "/")) return undefined;
    return {
        channels: [values[0]!.token, values[1]!.token, values[2]!.token],
        alpha: values[4]?.token,
        legacy: false,
    };
}

function fromFactory(
    components: readonly CssComponentValue[],
    value: Result<CssColor, ColorIssue>,
): ParseResult<CssColor> {
    return value.ok ? success(value.value) : reject(components, [value.error.code]);
}

function rgbFunction(fn: CssFunction): ParseResult<CssColor> {
    const body = bodyParts(fn, true);
    if (body === undefined) return reject([fn], ["CSS color"]);
    const allowNone = !body.legacy;
    if (body.legacy) {
        const kinds = body.channels.map(({ kind }) => kind);
        if (!kinds.every((kind) => kind === kinds[0] && (kind === "number" || kind === "percentage"))) {
            return reject([fn], ["homogeneous legacy RGB channels"]);
        }
    }
    const channels = body.channels.map((token): Channel | undefined => {
        if (isNone(token, allowNone)) return "none";
        const value = numberOrPercent(token, token.kind === "percentage" ? 255 : 1);
        return value === undefined ? undefined : Math.min(255, Math.max(0, value));
    });
    const opacity = alpha(body.alpha, allowNone);
    if (channels.some((value) => value === undefined) || opacity === undefined) return reject([fn], ["CSS color"]);
    return fromFactory([fn], rgb(channels[0]!, channels[1]!, channels[2]!, opacity));
}

function hslFunction(fn: CssFunction): ParseResult<CssColor> {
    const body = bodyParts(fn, true);
    if (body === undefined) return reject([fn], ["CSS color"]);
    const allowNone = !body.legacy;
    const h = hue(body.channels[0], allowNone);
    const sl = body.channels.slice(1).map((token, index): Channel | undefined => {
        if (isNone(token, allowNone)) return "none";
        if (body.legacy && token.kind !== "percentage") return undefined;
        const value = token.kind === "number" && typeof token.value === "number"
            ? token.value / 100
            : numberOrPercent(token, 1);
        return value === undefined ? undefined : index === 0 ? Math.max(0, value) : value;
    });
    const opacity = alpha(body.alpha, allowNone);
    if (h === undefined || sl.some((value) => value === undefined) || opacity === undefined) return reject([fn], ["CSS color"]);
    return fromFactory([fn], hsl(h, sl[0]!, sl[1]!, opacity));
}

function hwbFunction(fn: CssFunction): ParseResult<CssColor> {
    const body = bodyParts(fn, false);
    if (body === undefined) return reject([fn], ["CSS color"]);
    const h = hue(body.channels[0], true);
    const wb = body.channels.slice(1).map((token): Channel | undefined => {
        if (isNone(token, true)) return "none";
        return token.kind === "number" && typeof token.value === "number"
            ? token.value / 100
            : numberOrPercent(token, 1);
    });
    const opacity = alpha(body.alpha, true);
    if (h === undefined || wb.some((value) => value === undefined) || opacity === undefined) return reject([fn], ["CSS color"]);
    return fromFactory([fn], hwb(h, wb[0]!, wb[1]!, opacity));
}

type ModernRow = Readonly<{
    name: "lab" | "lch" | "oklab" | "oklch";
    factory: ColorFactory;
}>;

function modernFunction(fn: CssFunction, row: ModernRow): ParseResult<CssColor> {
    const body = bodyParts(fn, false);
    if (body === undefined) return reject([fn], ["CSS color"]);
    const [first, second, third] = body.channels;
    let a: Channel | undefined;
    let b: Channel | undefined;
    let c: Channel | undefined;

    if (isNone(first, true)) a = "none";
    else {
        const scale = row.name.startsWith("ok") ? 1 : 100;
        const value = numberOrPercent(first, scale);
        a = value === undefined ? undefined : Math.min(scale, Math.max(0, value));
    }

    if (isNone(second, true)) b = "none";
    else {
        const percentScale = row.name === "lab" ? 125 : row.name === "lch" ? 150 : 0.4;
        const value = numberOrPercent(second, percentScale);
        if (value !== undefined) b = row.name.endsWith("lch") ? Math.max(0, value) : value;
    }

    if (row.name.endsWith("lch")) c = hue(third, true);
    else if (isNone(third, true)) c = "none";
    else c = numberOrPercent(third, row.name === "lab" ? 125 : 0.4);

    const opacity = alpha(body.alpha, true);
    if (a === undefined || b === undefined || c === undefined || opacity === undefined) return reject([fn], ["CSS color"]);
    return fromFactory([fn], row.factory(a, b, c, opacity));
}

const COLOR_FACTORIES: Record<string, ColorFactory> = {
    "srgb-linear": linearSrgb,
    "display-p3": displayP3,
    "a98-rgb": a98Rgb,
    "prophoto-rgb": prophotoRgb,
    rec2020,
    xyz,
    "xyz-d65": xyz,
};

function colorFunction(fn: CssFunction): ParseResult<CssColor> {
    const values = parts(fn.value);
    if (values === undefined || values.length !== 4 && values.length !== 6) return reject([fn], ["CSS color"]);
    if (values[0]!.token.kind !== "ident") {
        return reject([fn], ["CSS color"]);
    }
    if (values.length === 6 && !isPunctuation(values[4], "/")) return reject([fn], ["CSS color"]);
    const space = String(values[0]!.token.value).toLowerCase();
    const channels = values.slice(1, 4).map(({ token }): Channel | undefined => {
        if (isNone(token, true)) return "none";
        return numberOrPercent(token, 1);
    });
    const opacity = alpha(values[5]?.token, true);
    if (channels.some((value) => value === undefined) || opacity === undefined) return reject([fn], ["CSS color"]);

    const [a, b, c] = channels as [Channel, Channel, Channel];
    if (space === "srgb") {
        return fromFactory([fn], rgb(
            a === "none" ? a : a * 255,
            b === "none" ? b : b * 255,
            c === "none" ? c : c * 255,
            opacity,
        ));
    }
    if (space === "xyz-d50") {
        const adapted = adaptXyzD50ToD65([
            a === "none" ? 0 : a,
            b === "none" ? 0 : b,
            c === "none" ? 0 : c,
        ]);
        return fromFactory([fn], xyz(adapted[0], adapted[1], adapted[2], opacity));
    }
    const factory = COLOR_FACTORIES[space];
    return factory === undefined ? reject([fn], ["CSS color space"]) : fromFactory([fn], factory(a, b, c, opacity));
}

function hexColor(token: CssToken): ParseResult<CssColor> {
    const digits = String(token.value);
    if (!/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(digits)) return reject([token]);
    const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;
    return fromFactory([token], rgb(
        Number.parseInt(expanded.slice(0, 2), 16),
        Number.parseInt(expanded.slice(2, 4), 16),
        Number.parseInt(expanded.slice(4, 6), 16),
        expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
    ));
}

function namedColor(token: CssToken): ParseResult<CssColor> {
    const name = String(token.value).toLowerCase();
    if (CONTEXT_COLORS.has(name)) return contextRequired([token]);
    if (name === "transparent") return fromFactory([token], rgb(0, 0, 0, 0));
    const digits = NAMED_COLORS[name];
    return digits === undefined ? reject([token]) : fromFactory([token], rgb(
        Number.parseInt(digits.slice(1, 3), 16),
        Number.parseInt(digits.slice(3, 5), 16),
        Number.parseInt(digits.slice(5, 7), 16),
        1,
    ));
}

function functionalColor(fn: CssFunction): ParseResult<CssColor> {
    const name = fn.name.toLowerCase();
    const first = significant(fn.value)[0];
    const body = parts(fn.value);
    if (body?.at(-1)?.token.raw === "/") return reject([fn], ["alpha"]);
    if ((name === "var" || name === "env") || (first?.kind === "ident" && String(first.value).toLowerCase() === "from")) {
        return contextRequired([fn]);
    }
    if (NON_CSS_COLOR_FUNCTIONS.has(name)) {
        const source = componentRaw(fn);
        return failure(source, "css_syntax", ["CSS-native color"], fn.span.start, fn.span.end);
    }
    switch (name) {
        case "rgb":
        case "rgba": return rgbFunction(fn);
        case "hsl":
        case "hsla": return hslFunction(fn);
        case "hwb": return hwbFunction(fn);
        case "lab": return modernFunction(fn, { name: "lab", factory: lab });
        case "lch": return modernFunction(fn, { name: "lch", factory: lch });
        case "oklab": return modernFunction(fn, { name: "oklab", factory: oklab });
        case "oklch": return modernFunction(fn, { name: "oklch", factory: oklch });
        case "color": return colorFunction(fn);
        default: return reject([fn]);
    }
}

/** Color semantics over typed component values; no raw-source matching occurs. */
export function projectCssColor(components: readonly CssComponentValue[]): ParseResult<CssColor> {
    const unterminatedComment = components.find((component) =>
        component.kind === "comment" && !component.terminated);
    if (unterminatedComment !== undefined) return reject([unterminatedComment], ["terminated comment"]);
    const roots = significant(components);
    if (roots.length !== 1) return reject(components);
    const root = roots[0]!;
    if (root.kind === "function-block") return functionalColor(root);
    if (root.kind === "simple-block" || root.kind === "whitespace" || root.kind === "comment") return reject(components);
    const token = root as CssToken;
    if (token.kind === "hash") return hexColor(token);
    if (token.kind === "ident") return namedColor(token);
    return reject(components);
}
