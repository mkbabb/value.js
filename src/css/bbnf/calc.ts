// SERVED MODEL: claude-opus-5-5
//
// X.P.W8 `.v` — a math function's arguments, checked as css-values-4 §10 defines them, wherever a
// component value holds one (`value.bbnf` `mathCall`). The grammar reads a math function's body as
// it reads any call's — terms, `+`/`-`/`*` operator tokens, `/` separators, `()` groups — and this
// module answers whether that body IS a calculation, independent of the property it stands in:
//   · structure (§10.1) — each argument is a `<calc-sum>`: operands joined by exactly one operator,
//     never juxtaposed (`max(1deg 2deg)`), never ending on one (`min(1px - )`);
//   · arity and signature (§10.2–§10.7, css-values-5 `progress()`) — `abs(1, 2)`, `atan2(90px)`,
//     `round(nearest, 1px)` (B may be omitted only when A is a <number>);
//   · type (§10.8) — `1px + 0Hz`, `asin(1deg)`, `exp(0Hz)`, a unit no spec defines (`1dag`), a
//     keyword that is no calculation constant (`calc(7px * up)`, `abs(none)`), and an argument whose
//     type is no type a value has (`10px * 10px`).
// What depends on the property — which type the property accepts, which type its percentages resolve
// against — is never decided here: a percentage combines with any base type it could resolve against
// (the percent hint, §10.8.1), never with a <number>, which is no base type.
// A body holding an arbitrary substitution function (`var()`, `env()`, `attr()`, `if()`, `inherit()`,
// `random-item()`, a custom `--fn()`) is valid at parse time whatever it holds (css-variables-1 §3,
// css-values-5 §7–§9): it is not checked.

import type { CssCall, CssValue } from "../../value";

/** A type (§10.8.1): the exponent of each base type; `percent` is a base until a hint resolves it. */
export type Base = "length" | "angle" | "time" | "frequency" | "resolution" | "percent";
type Exps = Readonly<Partial<Record<Base, number>>>;
/** `any`: an operand whose type is known only later (an unknown function, a substitution). */
type MathType = Exps | "any" | null;

const BASES: readonly Base[] = ["length", "angle", "time", "frequency", "resolution", "percent"];
const NUMBER: Exps = Object.freeze({});
const PERCENT: Exps = Object.freeze({ percent: 1 });
const ANGLE: Exps = Object.freeze({ angle: 1 });

/**
 * css-values-4 §6 units, by base type (ASCII case-insensitive). `fr` is absent: a `<flex>` "cannot be
 * represented in or combined with other unit types in calc() expressions" (css-grid-2 §7.2.4), so a math
 * function holding one is no calculation wherever it stands (`min(0fr)`).
 */
const UNITS: ReadonlyMap<string, Base> = new Map<string, Base>([
    ...["px", "cm", "mm", "q", "in", "pt", "pc", "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
        ...["", "s", "l", "d"].flatMap((p) => ["vw", "vh", "vi", "vb", "vmin", "vmax"].map((u) => p + u)),
        "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"].map((u): [string, Base] => [u, "length"]),
    ...["deg", "grad", "rad", "turn"].map((u): [string, Base] => [u, "angle"]),
    ...["s", "ms"].map((u): [string, Base] => [u, "time"]),
    ...["hz", "khz"].map((u): [string, Base] => [u, "frequency"]),
    ...["dpi", "dpcm", "dppx", "x"].map((u): [string, Base] => [u, "resolution"]),
]);

/** §10.7.1's constants. */
const CONSTANT = /^(?:e|pi|infinity|-infinity|nan)$/i;
/**
 * Keywords other specs admit in a calculation in their own context, which an operand cannot see: a
 * relative colour's channel names (css-color-5 §4: `alpha(from red / calc(alpha * 0.5))`) and
 * `calc-size()`'s `size` (css-values-5 §5.1). Their type is the context's.
 */
const CONTEXT_KEYWORD = /^(?:r|g|b|h|s|l|w|a|c|x|y|z|alpha|size)$/i;
const ROUNDING = /^(?:nearest|up|down|to-zero)$/i;
const SUBSTITUTION = /^(?:var|env|attr|if|inherit|random-item|--.*)$/i;
/** Functions whose value is a <number> wherever they stand (css-values-5 §8). */
const NUMERIC_CALL = /^(?:sibling-index|sibling-count)$/i;
export const MATH_FUNCTION = /^(?:calc|min|max|clamp|round|mod|rem|sin|cos|tan|asin|acos|atan2|atan|pow|sqrt|hypot|log|exp|abs|sign|progress)$/i;

const lower = (s: string) => s.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));

const exps = (t: Exps): Base[] => BASES.filter((b) => (t[b] ?? 0) !== 0);
const same = (a: Exps, b: Exps) => BASES.every((k) => (a[k] ?? 0) === (b[k] ?? 0));
const isNumber = (t: Exps) => exps(t).length === 0;
const isPurePercent = (t: Exps) => exps(t).length === 1 && t.percent === 1;

/** §10.8.1 "add two types", with the percent hint: a percentage may resolve against the other type. */
function add(a: MathType, b: MathType): MathType {
    if (a === null || b === null) return null;
    if (a === "any" || b === "any") return "any";
    if (same(a, b)) return a;
    for (const [p, q] of [[a, b], [b, a]] as const) {
        if ((p.percent ?? 0) === 0 || (q.percent ?? 0) !== 0) continue;
        // The hint is a base type: a percentage never resolves against a <number> (`min(1%, 0)`).
        for (const hint of exps(q)) {
            const hinted = { ...p, [hint]: (p[hint] ?? 0) + (p.percent ?? 0), percent: 0 };
            if (same(hinted, q)) return q;
        }
    }
    return null;
}

function multiply(a: MathType, b: MathType, sign: 1 | -1): MathType {
    if (a === null || b === null) return null;
    if (a === "any" || b === "any") return "any";
    const out: Partial<Record<Base, number>> = {};
    for (const k of BASES) out[k] = (a[k] ?? 0) + sign * (b[k] ?? 0);
    return out;
}

/** A type a value can have: a <number>, or one base type to the first power (§10.9). */
const valueType = (t: MathType): boolean => {
    if (t === "any") return true;
    if (t === null) return false;
    const [only, ...more] = exps(t);
    return only === undefined || (more.length === 0 && t[only] === 1);
};
/** A <number> (or a type known only later); a percentage is never one (§10.8.1: no <number> hint). */
const numberLike = (t: MathType): boolean => t === "any" || (t !== null && isNumber(t));
/** An <angle>, or a bare percentage that may resolve against one. */
const angleLike = (t: MathType): boolean => t !== null && t !== "any" && (same(t, ANGLE) || isPurePercent(t));

const isOperator = (v: CssValue, ops: RegExp) => v.kind === "scalar" && v.payload.type === "keyword" && ops.test(v.payload.value);

/** One operand's type: a number token, a constant, a group, a nested math function, another call. */
function operand(v: CssValue): MathType {
    if (v.kind === "scalar") {
        const p = v.payload;
        if (p.type === "number") {
            if (p.unit === "") return NUMBER;
            if (p.unit === "%") return PERCENT;
            const base = UNITS.get(lower(p.unit));
            return base === undefined ? null : { [base]: 1 };
        }
        if (p.type !== "keyword") return null;
        return CONSTANT.test(p.value) ? NUMBER : CONTEXT_KEYWORD.test(p.value) ? "any" : null;
    }
    if (v.kind === "list") return null;
    if (v.name === "") return v.args.length === 1 && v.args[0] !== undefined ? sum(v.args[0]) : null;
    if (MATH_FUNCTION.test(v.name)) return mathType(v);
    return NUMERIC_CALL.test(v.name) ? NUMBER : "any";
}

/**
 * A `<calc-sum>` (§10.1) as the grammar built it: a slash list (`/`, the loosest separator the value
 * grammar knows) of space lists of operands and operator tokens. Read back as its token sequence and
 * folded with §10.1's precedence: `*` and `/` before `+` and `-`.
 */
function sum(arg: CssValue): MathType {
    const tokens: CssValue[] = [];
    const slashes = arg.kind === "list" && arg.separator === "slash" ? arg.items : [arg];
    for (const [i, item] of slashes.entries()) {
        if (i > 0) tokens.push(SLASH);
        if (item.kind === "list" && item.separator === "space") tokens.push(...item.items);
        else if (item.kind === "list") return null;
        else tokens.push(item);
    }
    let total: MathType | undefined;
    let term: MathType = null;
    let mul: "*" | "/" | null = null;
    for (const [i, t] of tokens.entries()) {
        if (i % 2 === 1) {
            if (t === SLASH) mul = "/";
            else if (isOperator(t, /^\*$/)) mul = "*";
            else if (isOperator(t, /^[+-]$/)) total = total === undefined ? term : add(total, term);
            else return null; // juxtaposed operands
            continue;
        }
        if (t === SLASH || isOperator(t, OPERATOR)) return null;
        const o = operand(t);
        term = mul === null ? o : multiply(term, o, mul === "*" ? 1 : -1);
        mul = null;
    }
    if (tokens.length % 2 === 0) return null; // ends on an operator
    return total === undefined ? term : add(total, term);
}
/** The operator tokens the value grammar reads (`value.bbnf` `operator`): never an operand. */
const OPERATOR = /^(?:<=|>=|==|!=|[+*<>=:;-])$/;
const SLASH: CssValue = Object.freeze({ kind: "list", separator: "slash", items: Object.freeze([]) });

const arg = (v: CssValue): MathType => { const t = sum(v); return valueType(t) ? t : null; };
/** Every argument of one consistent type (§10.8.1 "add"): `min()`, `max()`, `hypot()`, `clamp()`, `round()`, … */
const allOf = (args: readonly CssValue[]): MathType => {
    const [head, ...tail] = args.map(arg);
    return head === undefined ? null : tail.reduce<MathType>((a, t) => add(a, t), head);
};
const isNone = (v: CssValue) => v.kind === "scalar" && v.payload.type === "keyword" && /^none$/i.test(v.payload.value);

/** A math function's result type, or `null` when it is no calculation (§10.2–§10.7). */
function mathType(call: CssCall): MathType {
    const args = call.args;
    const [first, second, third] = args;
    if (first === undefined) return null;
    const n = args.length;
    /** The one argument's type, when there is exactly one. */
    const only = n === 1 ? arg(first) : null;
    switch (lower(call.name)) {
        case "calc": case "abs": return only;
        case "min": case "max": case "hypot": return allOf(args);
        case "clamp":
            return n === 3 && second !== undefined && third !== undefined
                ? allOf([second, ...[first, third].filter((v) => !isNone(v))])
                : null;
        case "round": {
            const strategy = first.kind === "scalar" && first.payload.type === "keyword" && ROUNDING.test(first.payload.value);
            const rest = strategy ? args.slice(1) : args;
            if (rest.length === 0 || rest.length > 2) return null;
            const t = allOf(rest);
            return rest.length === 1 && !numberLike(t) ? null : t;
        }
        case "mod": case "rem": return n === 2 ? allOf(args) : null;
        case "atan2": return n === 2 && allOf(args) !== null ? ANGLE : null;
        case "sin": case "cos": case "tan": return n === 1 && (numberLike(only) || angleLike(only)) ? NUMBER : null;
        case "asin": case "acos": case "atan": return n === 1 && numberLike(only) ? ANGLE : null;
        case "sqrt": case "exp": return n === 1 && numberLike(only) ? NUMBER : null;
        case "pow": return n === 2 && args.every((v) => numberLike(arg(v))) ? NUMBER : null;
        case "log": return (n === 1 || n === 2) && args.every((v) => numberLike(arg(v))) ? NUMBER : null;
        case "sign": return only !== null ? NUMBER : null;
        case "progress": return n === 3 && allOf(args) !== null ? NUMBER : null;
        default: return null;
    }
}

/** Whether a value holds an arbitrary substitution function anywhere (css-variables-1 §3): its grammar is checked only later. */
export function substitutes(v: CssValue): boolean {
    if (v.kind === "scalar") return false;
    if (v.kind === "call" && SUBSTITUTION.test(v.name)) return true;
    return (v.kind === "call" ? v.args : v.items).some(substitutes);
}

/** Whether a math function call is a calculation (css-values-4 §10), whatever property it stands in. */
export const isCalculation = (call: CssCall): boolean => substitutes(call) || valueType(mathType(call));

/**
 * The type a number token or a math function holds where an image's grammar wants a typed position
 * (`./image`; X.P.W8 `.i`): its one base type (`percent` for a bare percentage, which resolves against the
 * position's own type), `number` for a <number>, `any` when known only later, `null` for no calculation.
 */
export function baseOf(v: CssValue): Base | "number" | "any" | null {
    const t = operand(v);
    if (t === null) return null;
    if (t === "any") return "any";
    return valueType(t) ? (exps(t)[0] ?? "number") : null;
}
