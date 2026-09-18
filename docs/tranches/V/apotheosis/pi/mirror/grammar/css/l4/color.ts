import { Parser, any, regex, string } from "@mkbabb/parse-that";
import {
    a98Rgb, adaptXyzD50ToD65, displayP3, hsl, hwb, lab, lch, linearSrgb,
    oklab, oklch, prophotoRgb, rec2020, rgb, xyz,
    type Alpha, type Channel, type ColorIssue,
} from "../../../deps/color-model.js";
import type { Result } from "../../../deps/foundation.js";
import { NAMED_COLORS } from "../../../named-colors.js";
import type { CssColor } from "../../../types.js";
import { fail, insensitive, succeed, w0, w1, whole } from "./combinators.js";
import { hash, identifier } from "./tokens.js";
import { angle, number, percentage, type NumericValue } from "./value-unit.js";

type ChannelValue = Readonly<NumericValue & { kind: "number" | "percentage" | "angle" }>
    | Readonly<{ kind: "none"; value: "none"; unit: ""; raw: string }>;
type Triple = readonly [ChannelValue, ChannelValue, ChannelValue];
type ColorFactory = (a: Channel, b: Channel, c: Channel, alpha: Alpha) => Result<CssColor, ColorIssue>;

const finite = (parser: Parser<NumericValue>): Parser<NumericValue> => parser.chain((value) =>
    Number.isFinite(value.value) ? succeed(value) : fail());
const numeric = finite(number).map((value): ChannelValue => ({ ...value, kind: "number" }));
const percent = finite(percentage).map((value): ChannelValue => ({ ...value, kind: "percentage" }));
const angular = finite(angle).map((value): ChannelValue => ({ ...value, kind: "angle" }));
const none = insensitive("none").map((raw): ChannelValue => ({ kind: "none", value: "none", unit: "", raw }));

const comma = w0.next(string(",")).skip(w0);
const slash = w0.next(string("/")).skip(w0);

function adjacentAfter(value: ChannelValue): Parser<unknown> {
    return any(
        w1,
        value.kind === "percentage" ? succeed(undefined) : regex(/(?=[+-])/),
    );
}

function triple(parser: Parser<ChannelValue>): Parser<Triple> {
    return parser.chain((a) => adjacentAfter(a).next(parser).chain((b) =>
        adjacentAfter(b).next(parser).map((c) => [a, b, c] as const)));
}

function legacyTriple(parser: Parser<ChannelValue>): Parser<Triple> {
    return parser.skip(comma).then(parser).skip(comma).then(parser)
        .map(([[a, b], c]) => [a, b, c] as const);
}

function alpha(parser: Parser<ChannelValue>): Parser<ChannelValue | undefined> {
    return slash.next(parser).opt();
}

function call<T>(names: readonly string[], body: Parser<T>): Parser<T> {
    const name = any(...[...names].sort((a, b) => b.length - a.length).map(insensitive));
    return name.skip(string("(")).next(w0.next(body).skip(w0)).skip(string(")"));
}

const asAlpha = (value: ChannelValue | undefined, allowNone: boolean): Alpha | undefined => {
    if (value === undefined) return 1;
    if (value.kind === "none") return allowNone ? "none" : undefined;
    if (value.kind !== "number" && value.kind !== "percentage") return undefined;
    const alphaValue = value.kind === "percentage" ? value.value / 100 : value.value;
    return Math.min(1, Math.max(0, alphaValue));
};

const hue = (value: ChannelValue, allowNone: boolean): Channel | undefined => {
    if (value.kind === "none") return allowNone ? "none" : undefined;
    let degrees: number;
    if (value.kind === "number") degrees = value.value;
    else if (value.kind === "angle") {
        switch (value.unit.toLowerCase()) {
            case "deg": degrees = value.value; break;
            case "grad": degrees = value.value * 0.9; break;
            case "rad": degrees = value.value * 180 / Math.PI; break;
            case "turn": degrees = value.value * 360; break;
            default: return undefined;
        }
    } else return undefined;
    return ((degrees % 360) + 360) % 360;
};

const channel = (value: ChannelValue, percentScale = 1): Channel | undefined => {
    if (value.kind === "none") return "none";
    if (value.kind === "angle") return undefined;
    return value.kind === "percentage" ? value.value * percentScale / 100 : value.value;
};

function fromFactory(value: Result<CssColor, ColorIssue>): Parser<CssColor> {
    return value.ok ? succeed(value.value) : fail();
}

const modernRgbBody = triple(any(none, percent, numeric)).then(alpha(any(none, percent, numeric)));
const modernRgb = call(["rgba", "rgb"], modernRgbBody).chain(([values, alphaValue]) => {
    const channels = values.map((value) => channel(value, value.kind === "percentage" ? 255 : 1));
    const opacity = asAlpha(alphaValue, true);
    if (channels.some((value) => value === undefined) || opacity === undefined) return fail();
    return fromFactory(rgb(
        channels[0] === "none" ? "none" : Math.min(255, Math.max(0, channels[0]!)),
        channels[1] === "none" ? "none" : Math.min(255, Math.max(0, channels[1]!)),
        channels[2] === "none" ? "none" : Math.min(255, Math.max(0, channels[2]!)),
        opacity,
    ));
});

const legacyRgbChannels = any(
    legacyTriple(numeric),
    legacyTriple(percent),
);
const legacyRgb = call(["rgba", "rgb"], legacyRgbChannels.then(comma.next(any(percent, numeric)).opt()))
    .chain(([values, alphaValue]) => {
        const channels = values.map((value) => channel(value, value.kind === "percentage" ? 255 : 1));
        const opacity = asAlpha(alphaValue, false);
        if (channels.some((value) => value === undefined) || opacity === undefined) return fail();
        return fromFactory(rgb(
            Math.min(255, Math.max(0, channels[0] as number)),
            Math.min(255, Math.max(0, channels[1] as number)),
            Math.min(255, Math.max(0, channels[2] as number)),
            opacity,
        ));
    });

const modernHslBody = triple(any(none, angular, percent, numeric)).then(alpha(any(none, percent, numeric)));
const modernHsl = call(["hsla", "hsl"], modernHslBody).chain(([values, alphaValue]) => {
    const h = hue(values[0], true);
    const s = channel(values[1], 1);
    const l = channel(values[2], 1);
    const opacity = asAlpha(alphaValue, true);
    if (h === undefined || s === undefined || l === undefined || opacity === undefined) return fail();
    return fromFactory(hsl(h, s === "none" ? s : Math.max(0, s / (values[1].kind === "number" ? 100 : 1)),
        l === "none" ? l : l / (values[2].kind === "number" ? 100 : 1), opacity));
});

const legacyHslBody = any(angular, numeric).skip(comma)
    .then(percent).skip(comma).then(percent)
    .map(([[h, s], l]) => [h, s, l] as Triple)
    .then(comma.next(any(percent, numeric)).opt());
const legacyHsl = call(["hsla", "hsl"], legacyHslBody).chain(([values, alphaValue]) => {
    const h = hue(values[0], false);
    const s = channel(values[1]);
    const l = channel(values[2]);
    const opacity = asAlpha(alphaValue, false);
    return h === undefined || typeof s !== "number" || typeof l !== "number" || opacity === undefined
        ? fail() : fromFactory(hsl(h, Math.max(0, s), l, opacity));
});

const hwbFunction = call(["hwb"], triple(any(none, angular, percent, numeric)).then(alpha(any(none, percent, numeric))))
    .chain(([values, alphaValue]) => {
        const h = hue(values[0], true);
        const white = channel(values[1]);
        const black = channel(values[2]);
        const opacity = asAlpha(alphaValue, true);
        if (h === undefined || white === undefined || black === undefined || opacity === undefined) return fail();
        const scale = (value: Channel, source: ChannelValue): Channel =>
            value === "none" ? value : value / (source.kind === "number" ? 100 : 1);
        return fromFactory(hwb(h, scale(white, values[1]), scale(black, values[2]), opacity));
    });

const MODERN = {
    lab: lab as ColorFactory,
    lch: lch as ColorFactory,
    oklab: oklab as ColorFactory,
    oklch: oklch as ColorFactory,
} as const;

const modernPerceptual = Object.entries(MODERN).map(([name, factory]) =>
    call([name], triple(any(none, angular, percent, numeric)).then(alpha(any(none, percent, numeric))))
        .chain(([values, alphaValue]) => {
            const ok = name.startsWith("ok");
            const cylindrical = name.endsWith("lch");
            let first = channel(values[0], ok ? 1 : 100);
            let second = channel(values[1], name === "lab" ? 125 : name === "lch" ? 150 : 0.4);
            const third = cylindrical ? hue(values[2], true)
                : channel(values[2], name === "lab" ? 125 : 0.4);
            const opacity = asAlpha(alphaValue, true);
            if (first === undefined || second === undefined || third === undefined || opacity === undefined) return fail();
            if (first !== "none") first = Math.min(ok ? 1 : 100, Math.max(0, first));
            if (cylindrical && second !== "none") second = Math.max(0, second);
            return fromFactory(factory(first, second, third, opacity));
        }));

const COLOR_SPACES = [
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020",
    "xyz-d65", "xyz-d50", "srgb", "xyz",
] as const;
const colorSpace = any(...COLOR_SPACES.map((space) => insensitive(space).map(() => space)));
const colorFunctionBody = colorSpace.skip(w1).then(triple(any(none, percent, numeric)))
    .then(alpha(any(none, percent, numeric)))
    .map(([[space, values], alphaValue]) => ({ space, values, alphaValue }));

export const predefinedColor = call(["color"], colorFunctionBody).chain(({ space, values, alphaValue }) => {
    const channels = values.map((value) => channel(value));
    const opacity = asAlpha(alphaValue, true);
    if (channels.some((value) => value === undefined) || opacity === undefined) return fail();
    const [a, b, c] = channels as [Channel, Channel, Channel];
    if (space === "srgb") {
        if ([a, b, c].some((value) => value !== "none" && (value < 0 || value > 1))) return fail();
        return fromFactory(rgb(
            a === "none" ? a : a * 255,
            b === "none" ? b : b * 255,
            c === "none" ? c : c * 255,
            opacity,
        ));
    }
    if (space === "xyz-d50") {
        if (a === "none" || b === "none" || c === "none") return fail();
        const adapted = adaptXyzD50ToD65([a, b, c]);
        return fromFactory(xyz(adapted[0], adapted[1], adapted[2], opacity));
    }
    const factory: ColorFactory = space === "srgb-linear" ? linearSrgb
        : space === "display-p3" ? displayP3
            : space === "a98-rgb" ? a98Rgb
                : space === "prophoto-rgb" ? prophotoRgb
                    : space === "rec2020" ? rec2020 : xyz;
    return fromFactory(factory(a, b, c, opacity));
});

const hexColor = hash.chain(({ value }) => {
    if (!/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) return fail();
    const expanded = value.length <= 4 ? [...value].map((digit) => digit + digit).join("") : value;
    return fromFactory(rgb(
        Number.parseInt(expanded.slice(0, 2), 16),
        Number.parseInt(expanded.slice(2, 4), 16),
        Number.parseInt(expanded.slice(4, 6), 16),
        expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
    ));
});

const namedColor = identifier.chain((source) => {
    const name = source.toLowerCase();
    if (name === "transparent") return fromFactory(rgb(0, 0, 0, 0));
    const digits = NAMED_COLORS[name];
    return digits === undefined ? fail() : fromFactory(rgb(
        Number.parseInt(digits.slice(1, 3), 16),
        Number.parseInt(digits.slice(3, 5), 16),
        Number.parseInt(digits.slice(5, 7), 16),
        1,
    ));
});

/** CSS Color grammar expressed directly in parse-that productions. */
export const color = any(
    predefinedColor,
    legacyRgb, modernRgb,
    legacyHsl, modernHsl,
    hwbFunction,
    ...modernPerceptual,
    hexColor,
    namedColor,
);

export const completeColor = whole(color);
