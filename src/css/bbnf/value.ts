// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the semantic actions of `value.bbnf`: component values as `/css`'s `CssValue`
// (`scalar` · `list` · `call`), keyframe selectors as `KeyframeSelector`, and <easing-function>
// as `CssTimingFunction`. A value that cannot be built carries a `Refused` node up to its entry,
// which answers it as the `ParseResult` failure it names. Every node is built frozen: a published
// result is immutable, and nothing walks it again (`../result`).

import { serializeCssValue } from "../serialize";
import { parseCssColor } from "./color-parse";
import type { CssCall, CssEmpty, CssScalar, CssValue } from "../../value";
import { NAMED_COLORS } from "../named-colors";
import type { CssLinearStop, CssTimingFunction, JumpPosition, KeyframeSelector, ParseIssue } from "../types";
import type { ColorNode, MixMethodNode } from "./color";
import { keywordColor } from "./color";
import { baseOf, isCalculation, substitutes } from "./calc";
import { isMixItem, keepsSignature } from "./color5";
import { keepsImageSignature } from "./image";
import { keepsPaletteSignature } from "./palette";
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

/**
 * An identifier term: a named colour (or `transparent`) is a colour; any other ident a keyword. Keywords
 * match ASCII case-insensitively (css-values-4 §4.1): only `A`–`Z` fold, so an identifier holding a
 * non-ASCII code point that Unicode lowercases to ASCII (`K`, U+212A KELVIN SIGN, in `blacK`) is a
 * keyword, never a named colour (X.P.W8 `.g`).
 */
function identScalar(token: string, color: (token: string) => ColorNode): ValueNode {
    const key = token.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
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
    const call = callNode(name, body.kind === "list" && body.separator === "comma" ? body.items : Object.freeze([body]));
    //  `alpha()` and `contrast-color()` keep their css-color-5 signatures (`./color5`; X.P.W8 `.t`).
    //  The css-images-4 image functions keep theirs (`./image`; X.P.W8 `.i`), css-fonts-4 `palette-mix()`
    //  its (`./palette`; X.P.W8 `.f`).
    return keepsSignature(call) && keepsImageSignature(call) && keepsPaletteSignature(call) && keepsLinearSignature(call) && keepsRelativeColor(call) ? call : refused("css_syntax", `<${name.toLowerCase()}()>`);
}

/**
 * css-color-5 §4 — a relative colour (`rgb(from <color> …)`) in a value list keeps its specified form
 * (COHESION §0hv DR-c); it must still be a colour `parseCssColor` reads (resolved, or
 * `color_context_required` for a context origin), else it is refused (X.P.W10 `.r10`).
 */
function keepsRelativeColor(call: CssCall): boolean {
    const first = call.args[0];
    const lead = first?.kind === "list" ? first.items[0]?.kind === "list" ? first.items[0].items[0] : first.items[0] : first;
    if (!/^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)$/i.test(call.name) || lead?.kind !== "scalar" || lead.payload.type !== "keyword" || !/^from$/i.test(lead.payload.value)) return true;
    const text = serializeCssValue(call);
    const read = text.ok ? parseCssColor(text.value) : null;
    return read !== null && (read.ok || read.diagnostics[0]?.code === "color_context_required");
}

/**
 * css-easing-2 §3 `linear( <linear-stop># )` in a value list: at least two stops, each a `<number>` and then
 * at most two `<percentage>`s, a literal or a math function of that type (`./calc` `baseOf`). `linear()` names
 * an easing function wherever it stands; a call holding a substitution function is unchecked (X.P.W10 `.t10`).
 */
function keepsLinearSignature(call: CssCall): boolean {
    if (!/^linear$/i.test(call.name) || substitutes(call)) return true;
    return call.args.length > 1 && call.args.every((stop) => {
        const [output, ...inputs] = stop.kind === "list" && stop.separator === "space" ? stop.items : [stop];
        return output !== undefined && baseOf(output) === "number" && inputs.length < 3 && inputs.every((p) => baseOf(p) === "percent");
    });
}

//  A separator is its text, or `undefined` where `termSep` matched empty (`red:` stands against its `:`).
type IfBranch = readonly [ValueNode, readonly (readonly [string | undefined, ValueNode])[]];
const SEMI = keyword(";");

/** One level of a value list: the item alone, or the frozen list of its items under `separator`. */
const level = (separator: "comma" | "slash" | "space", items: CssValue[]): CssValue => {
    const [only] = items;
    return items.length === 1 && only !== undefined ? only : Object.freeze({ kind: "list", separator, items: Object.freeze(items) as readonly CssValue[] });
};

/** A keyword token's text, or `undefined` for any other node. */
const word = (v: CssValue): string | undefined => (v.kind === "scalar" && v.payload.type === "keyword" ? v.payload.value : undefined);
/** The identifiers an `<if-condition>` holds besides its calls (css-values-5 §5.1 `else`; §3.1 `<boolean-expr>`). */
const CONDITION_WORD = /^(?:else|not|and|or)$/i;

/**
 * css-values-5 §5.1 `if()` (`value.bbnf` `ifCall`, X.P.W8 `.ifsemi`). Each branch arrives flat, its terms
 * with the separators between them, and must be `<if-condition> : <declaration-value>?`: one or more calls
 * (`supports()`, `media()`, `style()`) and the words `else`/`not`/`and`/`or`, space-separated, then the `:`
 * keyword. The branches fold into the call a generic reader makes of the same text (comma, then slash,
 * then space), the `:` and `;` keyword tokens standing in the space list, as the serializer spells them
 * (`src/css/serialize.ts`). The first refused term wins; a malformed branch refuses the call.
 */
function ifValue([name, first, rest, last]: readonly [string, IfBranch, readonly IfBranch[], string | undefined]): ValueNode {
    //  The comma groups, each a list of slash groups, each a list of space-separated terms; `space` is the open one.
    let space: CssValue[] = [];
    let slashes: CssValue[][] = [space];
    const commas: CssValue[][][] = [slashes];
    for (const [i, [head, tail]] of [first, ...rest].entries()) {
        if (i > 0) space.push(SEMI);
        let conditions = 0;
        for (const [separator, term] of [["", head] as const, ...tail]) {
            if (isRefused(term)) return term;
            const mark = (separator ?? "").replace(/\/\*[\s\S]*?\*\//g, "").trim();
            if (conditions >= 0) {
                //  The condition: space-separated words and calls, ended by the `:` (never a comma or slash).
                const text = word(term);
                if (mark === "," || mark === "/") return refused("css_syntax", "<if()>");
                if (text === ":" && conditions > 0) conditions = -1;
                else if (term.kind === "call" || (text !== undefined && CONDITION_WORD.test(text))) conditions++;
                else return refused("css_syntax", "<if()>");
            } else if (mark === ",") {
                space = [];
                slashes = [space];
                commas.push(slashes);
            } else if (mark === "/") {
                space = [];
                slashes.push(space);
            }
            space.push(term);
        }
        if (conditions >= 0) return refused("css_syntax", "<if()>");
    }
    if (last !== undefined) space.push(SEMI);
    const args = commas.map((group) => level("slash", group.map((spaces) => level("space", spaces))));
    return callValue([name, level("comma", args)]);
}

/**
 * `color-mix()` in a value list (`value.bbnf` `mixCall`, css-color-5 §3): the call as a generic call reads
 * the same text — the method a space list of its keywords as authored, then the items — once each item is one colour
 * with at most one percentage, a literal one in [0, 100]. A call holding an arbitrary substitution function
 * is not checked (css-variables-1 §3). X.P.W8 `.t`.
 */
function mixValue([name, method, body]: readonly [string, MixMethodNode | undefined, ValueNode]): ValueNode {
    if (isRefused(body)) return body;
    const items = body.kind === "list" && body.separator === "comma" ? body.items : Object.freeze([body]);
    const args = method === undefined ? items
        : Object.freeze([Object.freeze({ kind: "list", separator: "space", items: Object.freeze(method.words.map(keyword)) }) as CssValue, ...items]);
    const call = callNode(name, args);
    return substitutes(call) || items.every(isMixItem) ? call : refused("css_syntax", "<color-mix()>");
}

/**
 * An unquoted url (`value.bbnf` `urlCall`, a `<url-token>`): a `url` call whose one argument is the url
 * as authored; the empty `url()` is the call with no arguments, which the serializer spells `url()`.
 */
const urlValue = ([name, url]: readonly [string, string | undefined]): CssCall =>
    callNode(name, url === undefined ? NO_ARGS : Object.freeze([keyword(url)]));

/**
 * A quoted url (`value.bbnf` `urlString`): the `url` call holding its string, or — with modifiers — the
 * space list of the string and its modifiers, as a generic call reads the same text. A modifier named
 * twice (ASCII case-insensitively) is refused (css-values-4 §4.5).
 */
function urlStringValue([name, url, modifiers]: readonly [string, ValueNode, readonly ValueNode[]]): ValueNode {
    if (modifiers.length === 0) return callNode(name, Object.freeze([url as CssValue]));
    const seen = new Set<string>();
    for (const m of modifiers) {
        if (isRefused(m)) return m;
        const key = asciiLower(m.kind === "call" ? m.name : m.kind === "scalar" && m.payload.type === "keyword" ? m.payload.value : "");
        if (seen.has(key) || !requestModifierValid(key, m)) return refused("css_syntax", "url modifier");
        seen.add(key);
    }
    return callNode(name, Object.freeze([listOf("space")([url, modifiers])]) as readonly CssValue[]);
}
/** css-values-5 §4.5.1's request URL modifiers, each with its one argument; any other modifier is free. */
const REQUEST_MODIFIER: ReadonlyMap<string, RegExp> = new Map([
    ["cross-origin", /^(?:anonymous|use-credentials)$/i],
    ["integrity", /^(?:"[\s\S]*"|'[\s\S]*')$/],
    ["referrer-policy", /^(?:no-referrer|no-referrer-when-downgrade|same-origin|origin|strict-origin|origin-when-cross-origin|strict-origin-when-cross-origin|unsafe-url)$/i],
]);
function requestModifierValid(name: string, m: CssValue): boolean {
    const arg = REQUEST_MODIFIER.get(name);
    if (arg === undefined) return true;
    if (m.kind !== "call" || m.args.length !== 1) return false;
    const [a] = m.args;
    return a?.kind === "scalar" && a.payload.type === "keyword" && arg.test(a.payload.value);
}
const asciiLower = (s: string) => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));

/**
 * `type()` (`value.bbnf` `typeCall`) and `element()` (`elementCall`, X.P.W8 `.i`): the call of one argument,
 * its `<syntax>`, `<string>` or `<id-selector>` kept as authored.
 */
const leafCallValue = (name: string, arg: string): ValueNode =>
    //  The leaf's one alternation reads both: `element()` takes only the `<id-selector>`, `type()` never.
    (asciiLower(name) === "element") === arg.startsWith("#") ? callNode(name, Object.freeze([keyword(arg)])) : refused("css_syntax", `<${asciiLower(name)}()>`);

/**
 * A grid `<line-names>` block (`value.bbnf` `lineNames`): one keyword, spelled canonically — its
 * identifiers as authored, single-spaced, inside `[` `]` — so it serializes to text that reads back equal.
 */
const lineNamesValue = (token: string): CssScalar => {
    const names = token.slice(1, -1).trim();
    return keyword(names === "" ? "[]" : `[${names.split(/\s+/).join(" ")}]`);
};

/**
 * A `<urange>` (css-syntax-3 §7.1; css-fonts-4 §4.5 `unicode-range`), read by `value.bbnf` `identTerm`'s
 * first alternative, its comments dropped (css-syntax-3 §4). Refused unless each side holds one to six
 * digits, a `?` wildcard trails and never stands in a range, and start ≤ end ≤ U+10FFFF (a `?` reads `0`
 * in the start, `F` in the end). Spelled as CSSOM serializes a `<urange>`: `U+`, upper-case hex without
 * leading zeros, and `-end` when the end differs (`u+0a??` → `U+A00-AFF`). X.P.W8 `.f`; X.P.W10 `.s10`.
 */
function urangeValue(token: string): ValueNode {
    const [lo, hi] = token.replace(/\/\*[\s\S]*?\*\//g, "").slice(2).split("-") as [string, string?];
    const start = parseInt(lo.replace(/\?/g, "0"), 16);
    const end = parseInt((hi ?? lo).replace(/\?/g, "F"), 16);
    const hex = (n: number) => n.toString(16).toUpperCase();
    return /^[\da-f]{0,6}$/i.test(lo.replace(/\?+$/, "")) && lo.length <= 6 && (hi === undefined || /^[\da-f]{1,6}$/i.test(hi))
        && !(hi && lo.includes("?")) && start <= end && end <= 0x10ffff
        ? keyword(`U+${hex(start)}${end === start ? "" : `-${hex(end)}`}`)
        : refused("css_syntax", "<urange>");
}

/** A math function (`value.bbnf` `mathCall`): a call whose arguments are a calculation (`./calc`), else refused. */
function mathValue(parts: readonly [string, ValueNode | undefined]): ValueNode {
    const node = callValue(parts);
    return node.kind !== "call" || isCalculation(node) ? node : refused("css_syntax", "calculation");
}

/** A `()` simple block (`value.bbnf` `group`): a call with the empty name, its arguments read as a call's are. */
const groupValue = (body: ValueNode): ValueNode => callValue(["", body]);

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
/**
 * A timing argument of `type` (`tArg`: a literal, or a math function of that type — css-easing-2 §2–§4
 * over css-values-4 §10; X.P.W10 `.t10`), or `null`. A math function's NaN is censored to 0 (§10.9).
 */
const ofType = (q: Numeric | undefined, type: "number" | "percentage"): number | null =>
    q?.kind === "quantity" && q.type === type ? (q.math && Number.isNaN(q.value) ? 0 : q.value) : null;
const numberOf = (q: Numeric | undefined): number | null => ofType(q, "number");
/** A math function's value is range-clamped at computed-value time, never refused at parse (§10.9). */
const clampIf = (q: Numeric | undefined, value: number, lo: number, hi: number): number =>
    q?.kind === "quantity" && q.math ? Math.min(hi, Math.max(lo, value)) : value;

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
    const [a, b, c, d] = args.map(numberOf);
    if (a == null || b == null || c == null || d == null) return timingRefused;
    const x1 = clampIf(args[0], a, 0, 1), y1 = b, x2 = clampIf(args[2], c, 0, 1), y2 = d;
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1 ? Object.freeze({ kind: "cubic-bezier", x1, y1, x2, y2 }) : timingRefused;
}

function stepsFn([countQ, rawPosition]: readonly [Numeric, string | undefined]): TimingNode {
    const authored = numberOf(countQ);
    const position = JUMP_ALIASES.get((rawPosition ?? "jump-end").toLowerCase());
    //  A math function's `<integer>` rounds to the nearest integer, a tie toward +∞, then clamps to the
    //  range `steps()` admits (css-values-4 §10.9): `steps(calc(5 / 2))` is `steps(3)`.
    const count = authored !== null && countQ?.kind === "quantity" && countQ.math
        ? Math.max(position === "jump-none" ? 2 : 1, Math.round(authored)) : authored;
    return count !== null && Number.isInteger(count) && count > 0 && position !== undefined && !(position === "jump-none" && count < 2)
        ? Object.freeze({ kind: "steps", count, position })
        : timingRefused;
}

/** `number , ( ws1 >> percentage ) ? , ( ws1 >> percentage ) ?`: the second input only follows a first. */
function linearStop([outputQ, ...slots]: readonly [Numeric, Numeric | undefined, Numeric | undefined]): CssLinearStop | Refused {
    const output = numberOf(outputQ);
    if (output === null) return timingRefused;
    const positions = slots.filter((q): q is Numeric => q !== undefined).map((q) => ofType(q, "percentage"));
    if (positions.some((p) => p === null)) return timingRefused;
    return Object.freeze({ output, input: Object.freeze((positions as number[]).map((p) => p / 100)) as [] | [number] | [number, number] });
}

function linearFn([first, rest]: readonly [CssLinearStop | Refused, readonly (CssLinearStop | Refused)[]]): TimingNode {
    const stops = [first, ...rest];
    if (stops.some(isRefused)) return timingRefused;
    return stops.length >= 2 ? Object.freeze({ kind: "linear-function", stops: Object.freeze(stops) as CssLinearStop[] }) : timingRefused;
}

/** The value `customTop` answers when a custom property holds only whitespace and comments (css-variables-1 §2). */
const EMPTY: CssEmpty = Object.freeze({ kind: "list", separator: "space", items: Object.freeze([]) as readonly [] });

/**
 * The top-level comma parts of a `varRaw` text (strings and `()`/`{}` blocks read whole), or `null` when
 * the text is no `<declaration-value>`: an unmatched `}`, or a top-level `;` or `!` (css-syntax-3 §5.4.6).
 */
function rawParts(text: string): string[] | null {
    const parts: string[] = [];
    let depth = 0, from = 0, quote = "";
    for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        if (quote) { if (ch === quote) quote = ""; continue; }
        if (ch === "\"" || ch === "'") quote = ch;
        else if (ch === "(" || ch === "{") depth++;
        else if (ch === ")" || ch === "}") { if (--depth < 0) return null; }
        else if (depth === 0 && (ch === ";" || ch === "!")) return null;
        else if (ch === "," && depth === 0) { parts.push(text.slice(from, i)); from = i + 1; }
    }
    return depth === 0 ? [...parts, text.slice(from)] : null;
}

/**
 * `var()` / `env()` (css-variables-1 §2/§3; css-variables-2 #funcdef-var). The component-value reading
 * (`varBody`) is the call it always was, and a name followed by a lone comma keeps an EMPTY fallback. A
 * `var()` text it does not read (`varRaw`) is the free-form `<declaration-value>` name, kept as authored:
 * its name part must hold a token, and a `{}` block in it must be the whole part (css-values-5
 * #component-function-commas; `var({--x})`), else it is refused (X.P.W10 `.v10`).
 */
function varValue([name, body]: readonly [string, readonly [ValueNode, string | undefined] | string | undefined]): ValueNode {
    if (body === undefined) return refused("css_syntax", `<${name.toLowerCase()}()>`);
    if (typeof body !== "string") {
        const [list, comma] = body;
        const single = !(list.kind === "list" && list.separator === "comma");
        return callValue([name, comma !== undefined && single && !isRefused(list) ? Object.freeze({ kind: "list", separator: "comma", items: Object.freeze([list, EMPTY]) }) as ValueNode : list]);
    }
    //  Only `var()` takes the free-form name (css-variables-2); `env()`'s is a `<custom-ident>` (css-env-1).
    const first = /^var$/i.test(name) ? rawParts(body)?.[0]?.trim() ?? "" : "";
    const inner = first.slice(1, -1);
    const ok = first !== "" && (first.startsWith("{") ? first.endsWith("}") && inner.trim() !== "" && !/[{}]/.test(inner) : !/[{}]/.test(first));
    return ok ? callNode(name, Object.freeze([keyword(body)])) : refused("css_syntax", `<${name.toLowerCase()}()>`);
}

/**
 * `value.bbnf`'s semantic actions, by production. Each receives its rule's value where the grammar
 * puts it (positional sequences: an unmatched optional keeps its `undefined` slot).
 */
export const valueActions = {
    numeric: { kind: "groups", fn: numericScalar },
    string: { kind: "map", fn: keyword },
    operator: { kind: "map", fn: keyword },
    identTerm: { kind: "map", fn: (token: string) => (/^u(?:\/\*[\s\S]*?\*\/)*\+/i.test(token) ? urangeValue(token) : identScalar(token, keywordColor)) },
    colorCall: { kind: "map", fn: colorScalar },
    //  `color-mix()` / `light-dark()` stand in a scalar position as colours (their node, unwrapped).
    scalarTerm: { kind: "map", fn: (v: ValueNode | ColorNode) =>
        (v.kind === "color" || v.kind === "context" || v.kind === "invalid" ? colorScalar(v) : v) },
    call: { kind: "map", fn: callValue },
    ifCall: { kind: "map", fn: ifValue },
    mixCall: { kind: "map", fn: mixValue },
    varCall: { kind: "map", fn: varValue },
    varRaw: { kind: "text", fn: (text: string): string => text },
    urlCall: { kind: "map", fn: urlValue },
    urlString: { kind: "map", fn: urlStringValue },
    typeCall: { kind: "groups", fn: leafCallValue },
    lineNames: { kind: "map", fn: lineNamesValue },
    mathCall: { kind: "map", fn: mathValue },
    mathSpace: { kind: "map", fn: listOf("space") },
    mathSlash: { kind: "map", fn: listOf("slash") },
    mathComma: { kind: "map", fn: listOf("comma") },
    group: { kind: "map", fn: groupValue },
    badTerm: { kind: "span", fn: (_: string, start: number, end: number): Refused =>
        ({ kind: "refused", code: "css_syntax", expected: "scalar", span: { start, end } }) },
    spaceList: { kind: "map", fn: listOf("space") },
    slashList: { kind: "map", fn: listOf("slash") },
    commaList: { kind: "map", fn: listOf("comma") },
    customTop: { kind: "map", fn: (value: ValueNode | undefined): ValueNode => value ?? EMPTY },
    // A value holding a `;` nested in a block, kept whole as authored (css-variables-1 §2; X.P.W8 `.cust2`).
    customRaw: { kind: "text", fn: keyword },
    // The leaf proved the token is `from` or `to` in some case, so its length names it.
    selectorKeyword: { kind: "map", fn: (token: string): SelectorNode => (token.length === 4 ? FROM : TO) },
    selectorNamed: { kind: "map", fn: namedSelector },
    timingKeyword: { kind: "map", fn: timingKeyword },
    cubicBezier: { kind: "map", fn: cubicBezier },
    stepsFn: { kind: "map", fn: stepsFn },
    linearStop: { kind: "map", fn: linearStop },
    linearFn: { kind: "map", fn: linearFn },
} as const satisfies Partial<Actions>;
