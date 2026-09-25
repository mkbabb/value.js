// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the semantic actions of `value.bbnf`: component values as `/css`'s `CssValue`
// (`scalar` · `list` · `call`), keyframe selectors as `KeyframeSelector`, and <easing-function>
// as `CssTimingFunction`. A value that cannot be built carries a `Refused` node up to its entry,
// which answers it as the `ParseResult` failure it names. Every node is built frozen: a published
// result is immutable, and nothing walks it again (`../result`).

import type { CssCall, CssScalar, CssValue } from "../../value";
import { NAMED_COLORS } from "../named-colors";
import type { CssLinearStop, CssTimingFunction, JumpPosition, KeyframeSelector, ParseIssue } from "../types";
import type { ColorNode } from "./color";
import { keywordColor } from "./color";
import type { Actions } from "./generated/grammar";
import type { Numeric, Quantity } from "./math";

/**
 * A refusal; `span` (source offsets) narrows its diagnostic to the component refused. It is the
 * value grammar's FAILURE RECORD: internal, carried up to its entry and read there exactly once
 * (`./index` `refusal`) into the published, frozen `failure` — never published itself. So it is a
 * plain record built in one allocation, not frozen: a refusal pays for its diagnostic once, where it
 * is published (X.P.W7 `.l3`, COHESION §0dq; SpiderMonkey spent three freezes and a spread on every
 * refused component before). Results stay built frozen (`test/css/bbnf-frozen.test.ts`).
 */
export type Refused = Readonly<{ kind: "refused"; code: ParseIssue["code"]; expected: string; span?: Readonly<{ start: number; end: number }> }>;
export type ValueNode = CssValue | Refused;

export const refused = (code: ParseIssue["code"], expected: string): Refused => ({ kind: "refused", code, expected });

/** A colour production's node in a value position: its colour as a scalar, or its refusal. */
export function colorScalar(node: ColorNode): ValueNode {
    switch (node.kind) {
        case "color": return scalar({ type: "color", value: node.color });
        case "context": return refused("color_context_required", "context-free color");
        default: return refused("css_syntax", node.expected);
    }
}

/** A scalar node and its payload, both frozen. */
const scalar = (payload: CssScalar["payload"]): CssScalar => Object.freeze({ kind: "scalar", payload: Object.freeze(payload) });

const keyword = (value: string): CssScalar => scalar({ type: "keyword", value });

/** An identifier term: a named colour (or `transparent`) is a colour; any other ident a keyword. */
function identScalar(token: string, color: (token: string) => ColorNode): ValueNode {
    const key = token.toLowerCase();
    return key === "transparent" || typeof NAMED_COLORS[key] === "string" ? colorScalar(color(token)) : keyword(token);
}

/**
 * A number with its unit, spelled as authored (`%` and dimension units alike). The leaf (`value.bbnf`
 * `numeric`) captured the number and the unit as its two groups, so nothing here re-splits the text
 * (X.P.W7 `.l4`, as `.k2` did for `tokenQuantity`).
 */
function numericScalar(digits: string, unit: string): ValueNode {
    const value = Number(digits);
    return Number.isFinite(value)
        ? scalar({ type: "number", value, unit })
        : refused("css_syntax", "scalar");
}

const isRefused = (v: unknown): v is Refused => typeof v === "object" && v !== null && (v as { kind?: unknown }).kind === "refused";

/**
 * `first ( sep item ) *` as the list it separates — or the one item, when there is no separator; the
 * first refused item, in order, when there is one. Every value runs this three times (comma, slash,
 * space) and almost every level holds one item: that level allocates nothing, and a real list is
 * built in one array, in one pass (X.P.W7 `.l4`: no spread copy, no `find` closure per level).
 */
function listOf(separator: "comma" | "slash" | "space") {
    return ([first, rest]: readonly [ValueNode, readonly ValueNode[]]): ValueNode => {
        if (rest.length === 0 || isRefused(first)) return first;
        const items: CssValue[] = [first];
        for (const item of rest) {
            if (isRefused(item)) return item;
            items.push(item);
        }
        return Object.freeze({ kind: "list", separator, items: Object.freeze(items) as readonly CssValue[] });
    };
}

/** Functions whose argument list may be empty, and those that must be (css-values-5 §7). */
const ZERO_ARGUMENT = /^(?:sibling-index|sibling-count)$/i;
const MAY_BE_EMPTY = /^(?:--.*|scroll|view)$/i;

const NO_ARGS: readonly CssValue[] = Object.freeze([]);
const callNode = (name: string, args: readonly CssValue[]): CssCall => Object.freeze({ kind: "call", name, args });

function callValue([name, body]: readonly [string, ValueNode | undefined]): ValueNode {
    if (ZERO_ARGUMENT.test(name)) return body === undefined ? callNode(name, NO_ARGS) : refused("css_syntax", "zero-argument function");
    if (body === undefined) return MAY_BE_EMPTY.test(name) ? callNode(name, NO_ARGS) : refused("css_syntax", "function argument");
    if (isRefused(body)) return body;
    //  A comma list's items are already a frozen array (`listOf`), shared as the arguments.
    return callNode(name, body.kind === "list" && body.separator === "comma" ? body.items : Object.freeze([body]));
}

export type SelectorNode = KeyframeSelector | Refused;
const selectorRange = Object.freeze(refused("keyframe_selector_invalid", "0%..100%")); // shared: frozen once
/** `from` and `to` (css-animations-1 §3): one shared frozen node each, since a published result is immutable. */
const FROM: KeyframeSelector = Object.freeze({ kind: "percent", value: 0 });
const TO: KeyframeSelector = Object.freeze({ kind: "percent", value: 1 });

/** `<keyframe-selector>`: `from` · `to` · a percentage · a timeline range name with an offset. */
export function keyframeSelector(value: unknown): SelectorNode {
    if (typeof value === "object" && value !== null && (value as { kind?: unknown }).kind === "quantity") {
        const q = value as Quantity;
        return q.value >= 0 && q.value <= 100 ? Object.freeze({ kind: "percent", value: q.value / 100 }) : selectorRange;
    }
    return value as SelectorNode;
}

function namedSelector([rawName, offset]: readonly [string, Numeric | undefined]): SelectorNode {
    const name = rawName.toLowerCase() as "entry" | "exit" | "cover" | "contain";
    if (offset === undefined) return Object.freeze({ kind: "named", name });
    if (offset.kind !== "quantity") return selectorRange;
    const at = offset.value / 100;
    return at >= 0 && at <= 1 ? Object.freeze({ kind: "named", name, offset: at }) : selectorRange;
}

export type TimingNode = CssTimingFunction | Refused;
const timingRefused = Object.freeze(refused("css_syntax", "timing function")); // shared: frozen once
const numberOf = (q: Numeric | undefined): number | null => (q?.kind === "quantity" && q.type === "number" ? q.value : null);

/**
 * `steps()`' position keywords (css-easing-2 §4), `start`/`end` as their `jump-` spellings, keyed by
 * the AUTHORED token. A `Map`, never an object literal: `Map.get` reads own entries only, so a
 * parse-derived key (`steps(2, constructor)`) cannot walk `Object.prototype` (R1 §A2). Exported so
 * `../rules`' declaration-level twin reads this one table.
 */
export const JUMP_ALIASES: ReadonlyMap<string, JumpPosition> = new Map([
    ["start", "jump-start"], ["end", "jump-end"], ["jump-start", "jump-start"],
    ["jump-end", "jump-end"], ["jump-none", "jump-none"], ["jump-both", "jump-both"],
] as const);

function timingKeyword(token: string): TimingNode {
    const name = token.toLowerCase();
    if (name === "step-start") return Object.freeze({ kind: "steps", count: 1, position: "jump-start" });
    if (name === "step-end") return Object.freeze({ kind: "steps", count: 1, position: "jump-end" });
    return Object.freeze({ kind: "keyword", name: name as "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" });
}

function cubicBezier(args: readonly [Numeric, Numeric, Numeric, Numeric]): TimingNode {
    const [x1, y1, x2, y2] = args.map(numberOf);
    if (x1 == null || y1 == null || x2 == null || y2 == null) return timingRefused;
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? Object.freeze({ kind: "cubic-bezier", x1, y1, x2, y2 }) : timingRefused;
}

function stepsFn([countQ, rawPosition]: readonly [Numeric, string | undefined]): TimingNode {
    const count = numberOf(countQ);
    const position = JUMP_ALIASES.get((rawPosition ?? "jump-end").toLowerCase());
    return count !== null && Number.isInteger(count) && count > 0 && position !== undefined && !(position === "jump-none" && count < 2)
        ? Object.freeze({ kind: "steps", count, position })
        : timingRefused;
}

/** `number , ( ws1 >> percentage ) ? , ( ws1 >> percentage ) ?`: the second input only follows a first. */
function linearStop([outputQ, ...slots]: readonly [Numeric, Numeric | undefined, Numeric | undefined]): CssLinearStop | Refused {
    const output = numberOf(outputQ);
    if (output === null) return timingRefused;
    const inputs = slots.filter((q): q is Numeric => q !== undefined);
    const positions = inputs.map((q) => (q.kind === "quantity" && q.type === "percentage" ? q.value / 100 : NaN));
    return Object.freeze({ output, input: Object.freeze(positions) as [] | [number] | [number, number] });
}

function linearFn([first, rest]: readonly [CssLinearStop | Refused, readonly (CssLinearStop | Refused)[]]): TimingNode {
    const stops = [first, ...rest];
    if (stops.some(isRefused)) return timingRefused;
    return stops.length >= 2 ? Object.freeze({ kind: "linear-function", stops: Object.freeze(stops) as CssLinearStop[] }) : timingRefused;
}

/**
 * `value.bbnf`'s semantic actions, by production. Each receives its rule's value where the grammar
 * puts it (positional sequences: an unmatched optional keeps its `undefined` slot).
 */
export const valueActions = {
    numeric: { kind: "groups", fn: numericScalar },
    string: { kind: "map", fn: keyword },
    operator: { kind: "map", fn: keyword },
    identTerm: { kind: "map", fn: (token: string) => identScalar(token, keywordColor) },
    colorCall: { kind: "map", fn: colorScalar },
    //  `color-mix()` / `light-dark()` stand in a scalar position as colours (their node, unwrapped).
    scalarTerm: { kind: "map", fn: (v: ValueNode | ColorNode) =>
        (v.kind === "color" || v.kind === "context" || v.kind === "invalid" ? colorScalar(v) : v) },
    call: { kind: "map", fn: callValue },
    varCall: { kind: "map", fn: callValue },
    badTerm: { kind: "span", fn: (_: string, start: number, end: number): Refused =>
        ({ kind: "refused", code: "css_syntax", expected: "scalar", span: { start, end } }) },
    spaceList: { kind: "map", fn: listOf("space") },
    slashList: { kind: "map", fn: listOf("slash") },
    commaList: { kind: "map", fn: listOf("comma") },
    // The leaf proved the token is `from` or `to` in some case, so its length names it.
    selectorKeyword: { kind: "map", fn: (token: string): SelectorNode => (token.length === 4 ? FROM : TO) },
    selectorNamed: { kind: "map", fn: namedSelector },
    timingKeyword: { kind: "map", fn: timingKeyword },
    cubicBezier: { kind: "map", fn: cubicBezier },
    stepsFn: { kind: "map", fn: stepsFn },
    linearStop: { kind: "map", fn: linearStop },
    linearFn: { kind: "map", fn: linearFn },
} as const satisfies Partial<Actions>;
