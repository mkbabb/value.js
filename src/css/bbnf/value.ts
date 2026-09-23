// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the semantic actions of `value.bbnf`: component values as `/css`'s `CssValue`
// (`scalar` · `list` · `call`), keyframe selectors as `KeyframeSelector`, and <easing-function>
// as `CssTimingFunction`. A value that cannot be built carries a `Refused` node up to its entry,
// which answers it as the `ParseResult` failure it names.

import type { CssCall, CssScalar, CssValue } from "../../value";
import { NAMED_COLORS } from "../named-colors";
import type { CssLinearStop, CssTimingFunction, KeyframeSelector, ParseIssue } from "../types";
import type { ColorNode } from "./color";
import type { Rules } from "./load";
import { ruleOf } from "./load";
import type { Numeric, Quantity } from "./math";

export type Refused = Readonly<{ kind: "refused"; code: ParseIssue["code"]; expected: string }>;
export type ValueNode = CssValue | Refused;

export const refused = (code: ParseIssue["code"], expected: string): Refused => Object.freeze({ kind: "refused", code, expected });

/** A colour production's node in a value position: its colour as a scalar, or its refusal. */
export function colorScalar(node: ColorNode): ValueNode {
    switch (node.kind) {
        case "color": return { kind: "scalar", payload: { type: "color", value: node.color } };
        case "context": return refused("color_context_required", "context-free color");
        default: return refused("css_syntax", node.expected);
    }
}

const keyword = (value: string): CssScalar => ({ kind: "scalar", payload: { type: "keyword", value } });

/** An identifier term: a named colour (or `transparent`) is a colour; any other ident a keyword. */
function identScalar(token: string, color: (token: string) => ColorNode): ValueNode {
    const key = token.toLowerCase();
    return key === "transparent" || typeof NAMED_COLORS[key] === "string" ? colorScalar(color(token)) : keyword(token);
}

const NUMERIC = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)(.*)$/;

/** A number with its unit, spelled as authored (`%` and dimension units alike). */
function numericScalar(token: string): ValueNode {
    const [, digits = "", unit = ""] = NUMERIC.exec(token) ?? [];
    const value = Number(digits);
    return Number.isFinite(value)
        ? { kind: "scalar", payload: { type: "number", value, unit } }
        : refused("css_syntax", "scalar");
}

const isRefused = (v: unknown): v is Refused => typeof v === "object" && v !== null && (v as { kind?: unknown }).kind === "refused";

/** `first ( sep item ) *` as the list it separates — or the one item, when there is no separator. */
function listOf(separator: "comma" | "slash" | "space") {
    return ([first, rest]: [ValueNode, ValueNode[]]): ValueNode => {
        const items = [first, ...rest];
        const refusal = items.find(isRefused);
        if (refusal !== undefined) return refusal;
        return items.length === 1 ? first : { kind: "list", separator, items: items as CssValue[] };
    };
}

/** Functions whose argument list may be empty, and those that must be (css-values-5 §7). */
const ZERO_ARGUMENT = /^(?:sibling-index|sibling-count)$/i;
const MAY_BE_EMPTY = /^(?:--.*|scroll|view)$/i;

function callValue([name, body]: [string, ValueNode?]): ValueNode {
    if (ZERO_ARGUMENT.test(name)) return body === undefined ? { kind: "call", name, args: [] } satisfies CssCall : refused("css_syntax", "zero-argument function");
    if (body === undefined) return MAY_BE_EMPTY.test(name) ? { kind: "call", name, args: [] } satisfies CssCall : refused("css_syntax", "function argument");
    if (isRefused(body)) return body;
    const args = body.kind === "list" && body.separator === "comma" ? body.items : [body];
    return { kind: "call", name, args } satisfies CssCall;
}

export type SelectorNode = KeyframeSelector | Refused;
const selectorRange = refused("keyframe_selector_invalid", "0%..100%");

/** `<keyframe-selector>`: `from` · `to` · a percentage · a timeline range name with an offset. */
export function keyframeSelector(value: unknown): SelectorNode {
    if (typeof value === "object" && value !== null && (value as { kind?: unknown }).kind === "quantity") {
        const q = value as Quantity;
        return q.value >= 0 && q.value <= 100 ? { kind: "percent", value: q.value / 100 } : selectorRange;
    }
    return value as SelectorNode;
}

function namedSelector(v: string | [string, Numeric?]): SelectorNode {
    const [rawName, offset] = Array.isArray(v) ? v : [v];
    const name = rawName.toLowerCase() as "entry" | "exit" | "cover" | "contain";
    if (offset === undefined) return { kind: "named", name };
    if (offset.kind !== "quantity") return selectorRange;
    const at = offset.value / 100;
    return at >= 0 && at <= 1 ? { kind: "named", name, offset: at } : selectorRange;
}

export type TimingNode = CssTimingFunction | Refused;
const timingRefused = refused("css_syntax", "timing function");
const numberOf = (q: Numeric | undefined): number | null => (q?.kind === "quantity" && q.type === "number" ? q.value : null);

/** `steps()`' position keywords (css-easing-2 §4), `start`/`end` as their `jump-` spellings. */
const JUMP = new Map([
    ["start", "jump-start"], ["end", "jump-end"], ["jump-start", "jump-start"],
    ["jump-end", "jump-end"], ["jump-none", "jump-none"], ["jump-both", "jump-both"],
] as const);

function timingKeyword(token: string): TimingNode {
    const name = token.toLowerCase();
    if (name === "step-start") return { kind: "steps", count: 1, position: "jump-start" };
    if (name === "step-end") return { kind: "steps", count: 1, position: "jump-end" };
    return { kind: "keyword", name: name as "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" };
}

function cubicBezier(args: Numeric[]): TimingNode {
    const [x1, y1, x2, y2] = args.map(numberOf);
    if (x1 == null || y1 == null || x2 == null || y2 == null) return timingRefused;
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? { kind: "cubic-bezier", x1, y1, x2, y2 } : timingRefused;
}

function stepsFn(v: Numeric | [Numeric, string?]): TimingNode {
    const [countQ, rawPosition] = Array.isArray(v) ? v : [v];
    const count = numberOf(countQ);
    const position = JUMP.get((rawPosition ?? "jump-end").toLowerCase() as "end");
    return count !== null && Number.isInteger(count) && count > 0 && position !== undefined && !(position === "jump-none" && count < 2)
        ? { kind: "steps", count, position }
        : timingRefused;
}

function linearStop(v: Numeric | Numeric[]): CssLinearStop | Refused {
    const [outputQ, ...inputs] = Array.isArray(v) ? v : [v];
    const output = numberOf(outputQ);
    if (output === null) return timingRefused;
    const positions = inputs.map((q) => (q.kind === "quantity" && q.type === "percentage" ? q.value / 100 : NaN));
    return { output, input: positions as [] | [number] | [number, number] };
}

function linearFn([first, rest]: [CssLinearStop | Refused, (CssLinearStop | Refused)[]]): TimingNode {
    const stops = [first, ...rest];
    if (stops.some(isRefused)) return timingRefused;
    return stops.length >= 2 ? { kind: "linear-function", stops: stops as CssLinearStop[] } : timingRefused;
}

/** Attaches `value.bbnf`'s semantic actions; `color` reads a hex/keyword token as its colour node. */
export function attachValueActions(rules: Rules, color: (token: string) => ColorNode): void {
    const on = <T>(name: string, action: (value: never) => T): void => {
        rules[name] = ruleOf(rules, name).map(action as (value: unknown) => T);
    };
    on("numeric", numericScalar);
    on("string", keyword);
    on("operator", keyword);
    on("identTerm", (token: string) => identScalar(token, color));
    on("colorCall", colorScalar);
    //  `color-mix()` / `light-dark()` stand in a scalar position as colours (their node, unwrapped).
    on("scalarTerm", (v: ValueNode | ColorNode) =>
        v.kind === "color" || v.kind === "context" || v.kind === "invalid" ? colorScalar(v) : v);
    on("call", callValue);
    on("spaceList", listOf("space"));
    on("slashList", listOf("slash"));
    on("commaList", listOf("comma"));
    on("selectorKeyword", (token: string): SelectorNode => ({ kind: "percent", value: token.toLowerCase() === "from" ? 0 : 1 }));
    on("selectorNamed", namedSelector);
    on("timingKeyword", timingKeyword);
    on("cubicBezier", cubicBezier);
    on("stepsFn", stepsFn);
    on("linearStop", linearStop);
    on("linearFn", linearFn);
}
