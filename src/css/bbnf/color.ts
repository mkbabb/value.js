// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the semantic actions of `color.bbnf`: each colour production becomes a `ColorNode`,
// the absolute `CssColor` it names or the reason it names none. Channel SCALES and CLAMPS are
// css-color-4's parsed-value rules (the same posture X.P.W3/W5 ruled for the seam, PB-03/PB-04):
//
//   rgb    r g b   number 0..255 · 100% = 255 · clamped [0, 255]                        §5.1
//   hsl    s l     100% = 1 · a bare number n reads n% · clamped [0, 1]                  §7
//   hwb    w b     as hsl's s l                                                          §8
//   lab    L       100% = 100 · clamped [0, 100] ·  a b  100% = 125                      §9.1
//   lch    L as lab · C 100% = 150, clamped >= 0 · h                                     §9.2
//   oklab  L       100% = 1 · clamped [0, 1]    ·  a b  100% = 0.4                       §9.3
//   oklch  L as oklab · C 100% = 0.4, clamped >= 0 · h                                   §9.4
//   color()        100% = 1 · never clamped (§10.1)
//   alpha          100% = 1 · clamped [0, 1]                                             §4.2
//   hue            a number is degrees; an angle is read in degrees; never clamped        §4.3
//
// A math function's result censors NaN to the lower bound and ±∞ to the range's bounds
// (css-values-4 §10.9 as css-color-4 applies it; a hue's non-finite value is 0). What cannot be
// resolved at parse time — `var()`, a font-relative length, `currentcolor`, `light-dark()`, a
// relative colour — answers `color_context_required`, the contract value.js already carries.

import type { Result } from "../../foundation/result";
import type { ColorIssue } from "../../color/index";
import {
    a98Rgb, displayP3, displayP3Linear, hsl, hwb, lab, lch, linearSrgb, oklab, oklch, prophotoRgb, rec2020, rgb, xyz, xyzD50,
} from "../../color/index";
import type { Alpha, Channel } from "../../value";
import { NAMED_COLORS } from "../named-colors";
import type { CssColor } from "../types";
import type { Actions } from "./generated/grammar";
import type { Env, NoneToken, Numeric, Quantity } from "./math";
import { bindUnder, quantity } from "./math";
import type { AnyColor, SpaceId } from "../../color/index";
import { convertColor } from "../../color/index";
import type { HueMethod, MixItem } from "./mix";
import { resolveColorMix } from "./mix";

export type ColorNode =
    | Readonly<{ kind: "color"; color: CssColor }>
    | Readonly<{ kind: "context" }>
    | Readonly<{ kind: "invalid"; expected: string }>;

type Component = Numeric | NoneToken;

const CONTEXT_NODE: ColorNode = Object.freeze({ kind: "context" });
/** The colour grammar's failure record: internal, read once where it is published (`../index`), so not frozen (see `Refused`). */
const invalid = (expected: string): ColorNode => ({ kind: "invalid", expected });
/**
 * A colour enters the parse here and only here (a space's factory, or `color-mix()`'s resolution), so
 * it is frozen here, with its channels: every node a parse publishes is built frozen (`../result`).
 */
const colorNode = (color: CssColor): ColorNode => {
    Object.freeze(color.channels);
    return Object.freeze({ kind: "color", color: Object.freeze(color) });
};

/** The colour keywords whose value depends on the document (css-color-4 §6.3–§6.4). */
const CONTEXT_KEYWORDS: ReadonlySet<string> = new Set([
    "currentcolor", "accentcolor", "accentcolortext", "activetext", "buttonborder", "buttonface",
    "buttontext", "canvas", "canvastext", "field", "fieldtext", "graytext", "highlight",
    "highlighttext", "linktext", "mark", "marktext", "selecteditem", "selecteditemtext", "visitedtext",
]);

/** A channel's reading rule (the header's table). */
type Reading = Readonly<{
    percent?: number;       // the value 100% reads as; absent → a percentage is refused
    number?: number;        // a bare number's multiplier; absent → a number is refused
    numberIsPercent?: true; // a bare number n reads exactly as n% (hsl/hwb, §7 · §8)
    angle?: boolean;        // an <angle> is admitted (hue)
    min?: number;
    max?: number;
}>;

/** One component under `reading`: its channel value, or the node that refuses the colour. */
function readChannel(component: Component, reading: Reading): Channel | ColorNode {
    if (component.kind === "none") return "none";
    if (component.kind === "unresolved") {
        return component.reason === "context" ? CONTEXT_NODE : invalid(component.reason === "keyword" ? "channel keyword outside a relative colour" : "calculation type");
    }
    let value: number;
    const type = component.type === "number" && reading.numberIsPercent === true ? "percentage" : component.type;
    if (type === "percentage" && reading.percent !== undefined) value = (component.value * reading.percent) / 100;
    else if (type === "number" && reading.number !== undefined) value = component.value * reading.number;
    else if (type === "angle" && reading.angle === true) value = component.value;
    else return invalid(reading.angle === true ? "<hue>" : "<number> or <percentage>");
    if (reading.angle === true) return Number.isFinite(value) ? value : 0;
    const lo = reading.min ?? -Infinity;
    const hi = reading.max ?? Infinity;
    if (Number.isNaN(value)) return Number.isFinite(lo) ? lo : 0;
    return Math.min(hi, Math.max(lo, value));
}

const RGB: Reading = { percent: 255, number: 1, min: 0, max: 255 };
const RGB_PCT: Reading = { percent: 255, min: 0, max: 255 };
const RGB_NUM: Reading = { number: 1, min: 0, max: 255 };
const UNIT: Reading = { percent: 1, numberIsPercent: true, min: 0, max: 1 };
const UNIT_PCT: Reading = { percent: 1, min: 0, max: 1 };
const HUE: Reading = { number: 1, angle: true };
const ALPHA: Reading = { percent: 1, number: 1, min: 0, max: 1 };
const LAB_L: Reading = { percent: 100, number: 1, min: 0, max: 100 };
const LAB_AB: Reading = { percent: 125, number: 1 };
const LCH_C: Reading = { percent: 150, number: 1, min: 0 };
const OK_L: Reading = { percent: 1, number: 1, min: 0, max: 1 };
const OK_AB: Reading = { percent: 0.4, number: 1 };
const OK_C: Reading = { percent: 0.4, number: 1, min: 0 };
const COLOR_FN: Reading = { percent: 1, number: 1 };

type Factory = (a: Channel, b: Channel, c: Channel, alpha: Alpha) => Result<CssColor, ColorIssue>;

/** A colour function's parts, where the grammar puts them: three channels, then the alpha or `undefined`. */
type Channels = readonly [Component, Component, Component, Component | undefined];

/**
 * Three channels and an optional alpha read under their rules, then built by the space's
 * factory. The first refusal wins, in source order; a factory's refusal is a syntax refusal.
 */
function build([a, b, c, alpha]: Channels, readings: readonly [Reading, Reading, Reading], alphaReading: Reading, factory: Factory): ColorNode {
    const values: (Channel | ColorNode)[] = [
        readChannel(a, readings[0]), readChannel(b, readings[1]), readChannel(c, readings[2]),
        alpha === undefined ? 1 : readChannel(alpha, alphaReading),
    ];
    const refused = values.find((v): v is ColorNode => typeof v === "object");
    if (refused !== undefined) return refused;
    const [x, y, z, w] = values as [Channel, Channel, Channel, Channel];
    const made = factory(x, y, z, w);
    return made.ok ? colorNode(made.value) : invalid(made.error.code);
}

const LEGACY_ALPHA: Reading = ALPHA;

/**
 * A hex colour's digits (css-color-4 §5.2) as its `rgb` colour: the digits are read ONCE as one integer and
 * the channels taken from it — a 3/4-digit form's nibble `n` is the byte `n × 17` (`#abc` = `#aabbcc`). The
 * grammar's `hex` admits exactly 3, 4, 6 or 8 hex digits, so the integer is < 2³² and `>>>` reads it exactly.
 */
function hexColor(token: string): ColorNode {
    const n = token.length - 1;
    const v = parseInt(token.slice(1), 16);
    let r: number, g: number, b: number, a = 255;
    if (n === 6) { r = v >>> 16; g = (v >>> 8) & 255; b = v & 255; }
    else if (n === 8) { r = v >>> 24; g = (v >>> 16) & 255; b = (v >>> 8) & 255; a = v & 255; }
    else if (n === 3) { r = (v >>> 8) * 17; g = ((v >>> 4) & 15) * 17; b = (v & 15) * 17; }
    else { r = (v >>> 12) * 17; g = ((v >>> 8) & 15) * 17; b = ((v >>> 4) & 15) * 17; a = (v & 15) * 17; }
    const made = rgb(r, g, b, a / 255);
    return made.ok ? colorNode(made.value) : invalid(made.error.code);
}

/** A keyword colour: named (§6.1), `transparent` (§6.2), or one that depends on the document. */
export function keywordColor(token: string): ColorNode {
    const key = token.toLowerCase();
    if (key === "transparent") return hexColor("#00000000");
    if (CONTEXT_KEYWORDS.has(key)) return CONTEXT_NODE;
    const named = NAMED_COLORS[key];
    return typeof named === "string" ? hexColor(named) : invalid("<named-color>");
}

/** `color(<space> …)` (§10): each predefined space onto the `CssColorSpace` member naming it. */
function predefined(space: string, parts: Channels): ColorNode {
    const R3: readonly [Reading, Reading, Reading] = [COLOR_FN, COLOR_FN, COLOR_FN];
    const scaled = (k: number) => (x: Channel): Channel => (x === "none" ? x : x * k);
    switch (space.toLowerCase()) {
        case "srgb": return build(parts, R3, ALPHA, (a, b, c, alpha) => rgb(scaled(255)(a), scaled(255)(b), scaled(255)(c), alpha));
        case "srgb-linear": return build(parts, R3, ALPHA, linearSrgb);
        case "display-p3": return build(parts, R3, ALPHA, displayP3);
        case "a98-rgb": return build(parts, R3, ALPHA, a98Rgb);
        case "prophoto-rgb": return build(parts, R3, ALPHA, prophotoRgb);
        case "rec2020": return build(parts, R3, ALPHA, rec2020);
        case "xyz":
        case "xyz-d65": return build(parts, R3, ALPHA, xyz);
        //  css-color-4 §10.8 / §10.5: each its own model member, so a `none` channel stays missing (X.P.W10 `.m10`).
        case "xyz-d50": return build(parts, R3, ALPHA, xyzD50);
        default: return build(parts, R3, ALPHA, displayP3Linear);
    }
}

/**
 * A relative colour's function (css-color-5 §4.1): the space its origin converts to, its channel keywords
 * with the factor each keyword's value carries (§4.1: hsl/hwb's percentages resolve to <number>s 0..100,
 * sRGB's `color()` channels to 0..1), and the readings and factory its own function would apply.
 */
type RelativeFn = Readonly<{ space: SpaceId; names: readonly [string, string, string]; scale: readonly [number, number, number]; build: (parts: Channels) => ColorNode }>;
const relative = (space: SpaceId, names: string, readings: readonly [Reading, Reading, Reading], factory: Factory, scale: readonly [number, number, number] = [1, 1, 1]): RelativeFn =>
    ({ space, names: names.split(" ") as unknown as [string, string, string], scale, build: (parts) => build(parts, readings, ALPHA, factory) });
//  A relative sRGB-family colour is not clamped to the sRGB gamut: its origin may lie outside it, and it
//  serializes as `color(srgb …)` there (css-color-5 §4.2; WPT color-computed-relative-color.html).
const RGB_OPEN: Reading = { percent: 255, number: 1 };
const UNIT_OPEN: Reading = { percent: 1, numberIsPercent: true };
const RELATIVE: Readonly<Record<string, RelativeFn>> = {
    rgb: relative("rgb", "r g b", [RGB_OPEN, RGB_OPEN, RGB_OPEN], rgb),
    hsl: relative("hsl", "h s l", [HUE, UNIT_OPEN, UNIT_OPEN], hsl, [1, 100, 100]),
    hwb: relative("hwb", "h w b", [HUE, UNIT_OPEN, UNIT_OPEN], hwb, [1, 100, 100]),
    lab: relative("lab", "l a b", [LAB_L, LAB_AB, LAB_AB], lab),
    lch: relative("lch", "l c h", [LAB_L, LCH_C, HUE], lch),
    oklab: relative("oklab", "l a b", [OK_L, OK_AB, OK_AB], oklab),
    oklch: relative("oklch", "l c h", [OK_L, OK_C, HUE], oklch),
};
/** `color(from <color> <space> …)`: the model space each predefined space is held in (`predefined`). */
const PREDEFINED_SPACE: Readonly<Record<string, SpaceId>> = {
    srgb: "rgb", "srgb-linear": "srgb-linear", "display-p3": "display-p3", "display-p3-linear": "display-p3-linear",
    "a98-rgb": "a98-rgb", "prophoto-rgb": "prophoto-rgb", rec2020: "rec2020", xyz: "xyz", "xyz-d65": "xyz", "xyz-d50": "xyz-d50",
};

/**
 * css-color-5 §4 — a relative colour, resolved at parse when its origin is absolute (COHESION §0hv DR-c):
 * the origin converts to the function's space, a missing channel reads 0, its channels and `alpha` bind
 * the keywords, and each component (a literal, `none`, a keyword or a calculation over them) is read as
 * the function itself reads it. A context origin (`currentcolor`, a system colour, `var()`,
 * `light-dark()`) keeps `color_context_required`; a refused origin refuses (X.P.W10 `.r10`).
 */
function relativeColor([head, origin, [space, ...comps]]: readonly [string, ColorNode | Numeric, readonly [string | undefined, Component, Component, Component, Component | undefined]]): ColorNode {
    const from = asColorNode(origin);
    if (from.kind !== "color") return from;
    const fnName = (/^\w+/.exec(head)?.[0] ?? "").toLowerCase().replace(/a$/, "");
    const predefinedSpace = space === undefined ? undefined : PREDEFINED_SPACE[space.toLowerCase()];
    const fn: RelativeFn | undefined = fnName === "color"
        ? (predefinedSpace === undefined || space === undefined ? undefined : relative(predefinedSpace, predefinedSpace.startsWith("xyz") ? "x y z" : "r g b", [COLOR_FN, COLOR_FN, COLOR_FN],
            (a, b, c, alpha) => { const made = predefined(space, [num(a), num(b), num(c), num(alpha)]); return made.kind === "color" ? { ok: true, value: made.color } : { ok: false, error: { code: "color_invalid_input" } }; },
            predefinedSpace === "rgb" ? [1 / 255, 1 / 255, 1 / 255] : [1, 1, 1]))
        : RELATIVE[fnName];
    if (fn === undefined) return invalid("<color>");
    const zeroed = { ...from.color, channels: from.color.channels.map((v) => (v === "none" ? 0 : v)) } as unknown as AnyColor;
    const converted = convertColor(zeroed, fn.space);
    if (!converted.ok) return invalid("<color>");
    const values = converted.value.channels.map((v, i) => (v === "none" ? 0 : (v as number) * (fn.scale[i] ?? 1)));
    const bound = new Map<string, Quantity>(fn.names.map((n, i) => [n, quantity("number", values[i] ?? 0)]));
    bound.set("alpha", quantity("number", from.color.alpha === "none" ? 0 : from.color.alpha));
    //  A channel the origin is missing reads 0 (css-color-5 §4.1; WPT color-computed-relative-color.html),
    //  and an omitted alpha is the origin's (`/ alpha`).
    const env: Env = (name) => bound.get(name);
    const read = (c: Component): Component => (c.kind === "none" ? c : bindUnder(c, env));
    const alpha = comps[3] ?? bound.get("alpha");
    return fn.build([read(comps[0]), read(comps[1]), read(comps[2]), alpha === undefined ? undefined : read(alpha)]);
}

/** A channel the `color()` factory reads as authored: a number as a `<number>` component. */
const num = (v: Channel | Alpha): Component => (v === "none" ? { kind: "none" } : quantity("number", v));

/** A colour position's node: a bare `var()` (an unresolved numeric) is a context colour. */
export function asColorNode(node: ColorNode | Numeric): ColorNode {
    if (node.kind === "unresolved") return node.reason === "context" ? CONTEXT_NODE : invalid("<color>");
    if (node.kind === "quantity") return invalid("<color>");
    return node;
}

/** A parsed `<color-interpolation-method>`: its space and hue method, and its keywords as authored (`words`). */
export type MixMethodNode = Readonly<{ kind: "method"; space: string; hue?: HueMethod; words: readonly string[] }>;
type MixItemNode = Readonly<{ kind: "mixItem"; color: ColorNode; percent?: Numeric }>;

/** The first refusing node among `nodes`: a syntax refusal outranks a context one. */
function firstRefusal(nodes: readonly ColorNode[]): ColorNode | null {
    return nodes.find((n) => n.kind === "invalid") ?? nodes.find((n) => n.kind === "context") ?? null;
}

/** css-color-5 §3: a parsed `color-mix()` — its method, its first item, the rest — as the colour it computes to. */
function colorMix([method, first, rest]: readonly [MixMethodNode | undefined, MixItemNode, readonly MixItemNode[]]): ColorNode {
    const items = [first, ...rest];
    const refused = firstRefusal(items.map((item) => item.color));
    if (refused !== null) return refused;
    const mixItems: MixItem[] = [];
    for (const item of items) {
        const color = (item.color as Extract<ColorNode, { kind: "color" }>).color;
        if (item.percent === undefined) { mixItems.push({ color }); continue; }
        const q = item.percent;
        if (q.kind === "unresolved") return q.reason === "context" ? CONTEXT_NODE : invalid("<percentage [0,100]>");
        if (q.type !== "percentage") return invalid("<percentage [0,100]>");
        //  A literal outside [0, 100] is not a <percentage [0,100]>; a calculation clamps into it.
        if (q.math !== true && (q.value < 0 || q.value > 100)) return invalid("<percentage [0,100]>");
        const p = Number.isNaN(q.value) ? 0 : Math.min(100, Math.max(0, q.value));
        mixItems.push({ color, percentage: p });
    }
    const resolved = resolveColorMix({
        ...(method === undefined ? {} : { space: method.space.toLowerCase() }),
        ...(method?.hue === undefined ? {} : { hue: method.hue }),
        items: mixItems,
    });
    return resolved === null ? invalid("<finite-number>") : colorNode(resolved);
}

const hueMethodOf = (token: string): HueMethod => token.toLowerCase().split(/\s+/)[0] as HueMethod;
const mixItem = (color: ColorNode | Numeric, percent: Numeric | undefined): MixItemNode =>
    Object.freeze({ kind: "mixItem", color: asColorNode(color), ...(percent === undefined ? {} : { percent }) });

/**
 * `color.bbnf`'s semantic actions, by production. Each receives its rule's value where the grammar
 * puts it (positional sequences: an unmatched optional keeps its `undefined` slot).
 */
export const colorActions = {
    rgbModern: { kind: "map", fn: (v: Channels) => build(v, [RGB, RGB, RGB], ALPHA, rgb) },
    rgbLegacyPct: { kind: "map", fn: (v: Channels) => build(v, [RGB_PCT, RGB_PCT, RGB_PCT], LEGACY_ALPHA, rgb) },
    rgbLegacyNum: { kind: "map", fn: (v: Channels) => build(v, [RGB_NUM, RGB_NUM, RGB_NUM], LEGACY_ALPHA, rgb) },
    hslModern: { kind: "map", fn: (v: Channels) => build(v, [HUE, UNIT, UNIT], ALPHA, hsl) },
    hslLegacy: { kind: "map", fn: (v: Channels) => build(v, [HUE, UNIT_PCT, UNIT_PCT], LEGACY_ALPHA, hsl) },
    hwbFn: { kind: "map", fn: (v: Channels) => build(v, [HUE, UNIT, UNIT], ALPHA, hwb) },
    labFn: { kind: "map", fn: (v: Channels) => build(v, [LAB_L, LAB_AB, LAB_AB], ALPHA, lab) },
    lchFn: { kind: "map", fn: (v: Channels) => build(v, [LAB_L, LCH_C, HUE], ALPHA, lch) },
    oklabFn: { kind: "map", fn: (v: Channels) => build(v, [OK_L, OK_AB, OK_AB], ALPHA, oklab) },
    oklchFn: { kind: "map", fn: (v: Channels) => build(v, [OK_L, OK_C, HUE], ALPHA, oklch) },
    colorFn: { kind: "map", fn: ([space, a, b, c, alpha]: readonly [string, ...Channels]) => predefined(space, [a, b, c, alpha]) },
    hex: { kind: "map", fn: hexColor },
    colorKeyword: { kind: "map", fn: keywordColor },
    relativeColor: { kind: "map", fn: relativeColor },
    lightDark: { kind: "map", fn: ([light, dark]: readonly [ColorNode | Numeric, ColorNode | Numeric]): ColorNode =>
        [asColorNode(light), asColorNode(dark)].find((n) => n.kind === "invalid") ?? CONTEXT_NODE },
    mixPolar: { kind: "map", fn: ([space, hue]: readonly [string, string | undefined]): MixMethodNode =>
        Object.freeze({ kind: "method", space, words: hue === undefined ? [space] : [space, ...hue.split(/\s+/)], ...(hue === undefined ? {} : { hue: hueMethodOf(hue) }) }) },
    mixRect: { kind: "map", fn: (space: string): MixMethodNode => Object.freeze({ kind: "method", space, words: [space] }) },
    mixMethod: { kind: "map", fn: ([word, method]: readonly [string, MixMethodNode]): MixMethodNode =>
        Object.freeze({ ...method, words: Object.freeze([word, ...method.words]) }) },
    mixLead: { kind: "map", fn: ([percent, color]: readonly [Numeric, ColorNode | Numeric]) => mixItem(color, percent) },
    mixTrail: { kind: "map", fn: ([color, percent]: readonly [ColorNode | Numeric, Numeric | undefined]) => mixItem(color, percent) },
    colorMix: { kind: "map", fn: colorMix },
} as const satisfies Partial<Actions>;
