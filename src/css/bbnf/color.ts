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
    a98Rgb, displayP3, hsl, hwb, lab, lch, linearSrgb, oklab, oklch, prophotoRgb, rec2020, rgb, xyz,
} from "../../color/index";
import { adaptXyzD50ToD65 } from "../../color/anchors";
import type { Alpha, Channel } from "../../value";
import { NAMED_COLORS } from "../named-colors";
import type { CssColor } from "../types";
import type { Rules } from "./load";
import { ruleOf } from "./load";
import type { NoneToken, Numeric } from "./math";
import { CONTEXT, KEYWORD, NONE, calculated, comparison, constantQuantity, fold, signAbs, tokenQuantity } from "./math";
import type { HueMethod, MixItem } from "./mix";
import { displayP3LinearToXyz, resolveColorMix } from "./mix";

export type ColorNode =
    | Readonly<{ kind: "color"; color: CssColor }>
    | Readonly<{ kind: "context" }>
    | Readonly<{ kind: "invalid"; expected: string }>;

type Component = Numeric | NoneToken;

const CONTEXT_NODE: ColorNode = Object.freeze({ kind: "context" });
const invalid = (expected: string): ColorNode => Object.freeze({ kind: "invalid", expected });
const colorNode = (color: CssColor): ColorNode => Object.freeze({ kind: "color", color });

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
    if (component.type === "percentage" && reading.percent !== undefined) value = (component.value * reading.percent) / 100;
    else if (component.type === "number" && reading.number !== undefined) value = component.value * reading.number;
    else if (component.type === "angle" && reading.angle === true) value = component.value;
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
const UNIT: Reading = { percent: 1, number: 1 / 100, min: 0, max: 1 };
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

/**
 * Three channels and an optional alpha read under their rules, then built by the space's
 * factory. The first refusal wins, in source order; a factory's refusal is a syntax refusal.
 */
function build(parts: readonly Component[], readings: readonly [Reading, Reading, Reading], alphaReading: Reading, factory: Factory): ColorNode {
    const [a, b, c, alpha] = parts;
    if (a === undefined || b === undefined || c === undefined) return invalid("three components");
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

/** A hex colour's digits (css-color-4 §5.2) as its `rgb` colour. */
function hexColor(token: string): ColorNode {
    const digits = token.slice(1);
    const full = digits.length <= 4 ? [...digits].map((d) => d + d).join("") : digits;
    const byte = (i: number): number => parseInt(full.slice(i, i + 2), 16);
    const made = rgb(byte(0), byte(2), byte(4), full.length === 8 ? byte(6) / 255 : 1);
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
function predefined(space: string, parts: readonly Component[]): ColorNode {
    const R3: readonly [Reading, Reading, Reading] = [COLOR_FN, COLOR_FN, COLOR_FN];
    const scaled = (k: number) => (x: Channel): Channel => (x === "none" ? x : x * k);
    const concrete = (convert: (v: readonly [number, number, number]) => readonly [number, number, number]): Factory =>
        (a, b, c, alpha) => (a === "none" || b === "none" || c === "none"
            ? { ok: false, error: { code: "color_missing_channel" } }
            : xyz(...convert([a, b, c]), alpha));
    switch (space.toLowerCase()) {
        case "srgb": return build(parts, R3, ALPHA, (a, b, c, alpha) => rgb(scaled(255)(a), scaled(255)(b), scaled(255)(c), alpha));
        case "srgb-linear": return build(parts, R3, ALPHA, linearSrgb);
        case "display-p3": return build(parts, R3, ALPHA, displayP3);
        case "a98-rgb": return build(parts, R3, ALPHA, a98Rgb);
        case "prophoto-rgb": return build(parts, R3, ALPHA, prophotoRgb);
        case "rec2020": return build(parts, R3, ALPHA, rec2020);
        case "xyz":
        case "xyz-d65": return build(parts, R3, ALPHA, xyz);
        //  The two spaces `CssColorSpace` has no member for are written as the exact `xyz` they
        //  name; a `none` there has no `xyz` channel to stay missing in, so it is refused
        //  ("concrete xyz-d50", the contract value.js already carries for xyz-d50).
        case "xyz-d50": return build(parts, R3, ALPHA, concrete(adaptXyzD50ToD65));
        default: return build(parts, R3, ALPHA, concrete(([a, b, c]) => displayP3LinearToXyz([a, b, c])));
    }
}

/** Every value of `kind` inside a rule's (possibly nested) result, in source order. */
function collect<T extends { kind: string }>(value: unknown, kinds: readonly string[]): T[] {
    const out: T[] = [];
    const walk = (v: unknown): void => {
        if (Array.isArray(v)) v.forEach(walk);
        else if (v !== null && typeof v === "object" && kinds.includes((v as { kind?: unknown }).kind as string)) out.push(v as T);
    };
    walk(value);
    return out;
}

const COMPONENT_KINDS = ["quantity", "unresolved", "none"] as const;
const components = (value: unknown): Component[] => collect<Component>(value, COMPONENT_KINDS);
const NODE_KINDS = ["color", "context", "invalid", "unresolved"] as const;

/** A colour position's node: a bare `var()` (an unresolved numeric) is a context colour. */
export function asColorNode(value: unknown): ColorNode {
    const [node] = collect<ColorNode | Numeric>(value, NODE_KINDS);
    if (node === undefined) return invalid("<color>");
    if (node.kind === "unresolved") return node.reason === "context" ? CONTEXT_NODE : invalid("<color>");
    if (node.kind === "quantity") return invalid("<color>");
    return node;
}

type MixMethodNode = Readonly<{ kind: "method"; space: string; hue?: HueMethod }>;
type MixItemNode = Readonly<{ kind: "mixItem"; color: ColorNode; percent?: Numeric }>;

/** The first refusing node among `nodes`: a syntax refusal outranks a context one. */
function firstRefusal(nodes: readonly ColorNode[]): ColorNode | null {
    return nodes.find((n) => n.kind === "invalid") ?? nodes.find((n) => n.kind === "context") ?? null;
}

/** css-color-5 §3: a parsed `color-mix()` as the colour it computes to. */
function colorMix(value: unknown): ColorNode {
    const [method] = collect<MixMethodNode>(value, ["method"]);
    const items = collect<MixItemNode>(value, ["mixItem"]);
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

/**
 * Attaches `color.bbnf`'s and `math.bbnf`'s semantic actions to `rules` (each rule's name is its
 * production in the grammar files; a rule not named here yields its raw match).
 */
export function attachColorActions(rules: Rules): void {
    const on = <T>(name: string, action: (value: never) => T): void => {
        rules[name] = ruleOf(rules, name).map(action as (value: unknown) => T);
    };
    type Step = readonly [string, Numeric];
    // ── math.bbnf / tokens.bbnf ─────────────────────────────────────────────────────
    for (const token of ["number", "percentage", "angle", "dimension"]) on(token, tokenQuantity);
    on("none", () => NONE);
    on("calcConstant", constantQuantity);
    on("calcKeyword", () => KEYWORD);
    on("varFn", () => CONTEXT);
    on("calc", calculated);
    on("calcSum", ([first, steps]: [Numeric, Step[]]) => fold(first, steps));
    on("calcProduct", ([first, steps]: [Numeric, Step[]]) => fold(first, steps));
    on("minMax", ([name, first, rest]: [string, Numeric, Numeric[]]) =>
        calculated(comparison(name.toLowerCase() === "min" ? "min" : "max", [first, ...rest])));
    on("clampFn", (args: Numeric[]) => calculated(comparison("clamp", args)));
    on("signAbs", ([name, arg]: [string, Numeric]) => calculated(signAbs(name, arg)));
    // ── color.bbnf ───────────────────────────────────────────────────────────────
    on("rgbModern", (v: unknown) => build(components(v), [RGB, RGB, RGB], ALPHA, rgb));
    on("rgbLegacyPct", (v: unknown) => build(components(v), [RGB_PCT, RGB_PCT, RGB_PCT], LEGACY_ALPHA, rgb));
    on("rgbLegacyNum", (v: unknown) => build(components(v), [RGB_NUM, RGB_NUM, RGB_NUM], LEGACY_ALPHA, rgb));
    on("hslModern", (v: unknown) => build(components(v), [HUE, UNIT, UNIT], ALPHA, hsl));
    on("hslLegacy", (v: unknown) => build(components(v), [HUE, UNIT_PCT, UNIT_PCT], LEGACY_ALPHA, hsl));
    on("hwbFn", (v: unknown) => build(components(v), [HUE, UNIT, UNIT], ALPHA, hwb));
    on("labFn", (v: unknown) => build(components(v), [LAB_L, LAB_AB, LAB_AB], ALPHA, lab));
    on("lchFn", (v: unknown) => build(components(v), [LAB_L, LCH_C, HUE], ALPHA, lch));
    on("oklabFn", (v: unknown) => build(components(v), [OK_L, OK_AB, OK_AB], ALPHA, oklab));
    on("oklchFn", (v: unknown) => build(components(v), [OK_L, OK_C, HUE], ALPHA, oklch));
    on("colorFn", ([space, ...rest]: [string, ...unknown[]]) => predefined(space, components(rest)));
    on("hex", hexColor);
    on("colorKeyword", keywordColor);
    on("relativeColor", (v: unknown) => {
        const origin = collect<ColorNode>(v, ["color", "context", "invalid"]);
        return origin.find((n) => n.kind === "invalid") ?? CONTEXT_NODE;
    });
    on("lightDark", (v: unknown) => {
        const arms = collect<ColorNode | Numeric>(v, NODE_KINDS).map(asColorNode);
        return arms.find((n) => n.kind === "invalid") ?? CONTEXT_NODE;
    });
    on("mixPolar", (v: string | [string, string?]) => {
        const [space, hue] = Array.isArray(v) ? v : [v];
        return Object.freeze({ kind: "method", space, ...(hue === undefined ? {} : { hue: hueMethodOf(hue) }) });
    });
    on("mixRect", (space: string) => Object.freeze({ kind: "method", space }));
    on("mixLead", ([percent, color]: [Numeric, unknown]) => Object.freeze({ kind: "mixItem", color: asColorNode(color), percent }));
    on("mixTrail", (v: unknown) => {
        const percent = Array.isArray(v) && v.length > 1 ? (v[v.length - 1] as Numeric) : undefined;
        const color = asColorNode(Array.isArray(v) ? v[0] : v);
        return Object.freeze({ kind: "mixItem", color, ...(percent === undefined ? {} : { percent }) });
    });
    on("colorMix", colorMix);
}
