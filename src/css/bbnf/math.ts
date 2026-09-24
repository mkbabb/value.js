// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the semantic actions of `math.bbnf` and the numeric tokens of `tokens.bbnf`:
// each token becomes a TYPED quantity (css-values-4 §10.8's types — number, percentage, angle,
// length, and any other dimension by its unit), and a math function becomes the quantity it
// computes to. What cannot be known at parse time is carried as UNRESOLVED, with its reason:
//   context  — `var()`/`env()`, or a length relative to the font or viewport (`1em`, `2vw`):
//              known only at computed-value time;
//   keyword  — a bare ident inside a calculation: a relative colour's channel name;
//   invalid  — a type error (§10.8: `1px + 2`, `2% * 3%`, `1 / 2deg`).

import type { Actions } from "./generated/grammar";

/** `math` marks the result of a math function (a top-level calculation, css-values-4 §10.9). */
export type Quantity = Readonly<{ kind: "quantity"; type: string; value: number; math?: true }>;
export type Unresolved = Readonly<{ kind: "unresolved"; reason: "context" | "keyword" | "invalid" }>;
export type Numeric = Quantity | Unresolved;
export type NoneToken = Readonly<{ kind: "none" }>;

export const NONE: NoneToken = Object.freeze({ kind: "none" });
const unresolved = (reason: Unresolved["reason"]): Unresolved => Object.freeze({ kind: "unresolved", reason });
export const CONTEXT = unresolved("context");
export const KEYWORD = unresolved("keyword");
export const INVALID = unresolved("invalid");
export const quantity = (type: string, value: number): Quantity => Object.freeze({ kind: "quantity", type, value });

/** css-values-4 §6.1 (angles, canonical deg) and §6.2 (absolute lengths, canonical px). */
const ANGLE: Readonly<Record<string, (value: number) => number>> = {
    deg: (v) => v, grad: (v) => v * 0.9, rad: (v) => (v * 180) / Math.PI, turn: (v) => v * 360,
};
const ABSOLUTE_LENGTH: Readonly<Record<string, number>> = {
    px: 1, cm: 96 / 2.54, mm: 96 / 25.4, q: 96 / 101.6, in: 96, pt: 4 / 3, pc: 16,
};
/** §6.1.1–§6.1.2: the font- and viewport-relative lengths — unknown at parse time. */
const RELATIVE_LENGTH = /^(?:r?(?:em|ex|cap|ch|ic|lh)|[sld]?v(?:w|h|i|b|min|max)|cq(?:w|h|i|b|min|max))$/;

const NUMERIC = /^([+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)(.*)$/;

/** A numeric TOKEN (`number` · `percentage` · `angle` · `dimension`) as its typed quantity. */
export function tokenQuantity(token: string): Numeric {
    const [, digits = "", rawUnit = ""] = NUMERIC.exec(token) ?? [];
    const value = Number(digits);
    const unit = rawUnit.toLowerCase();
    if (unit === "") return quantity("number", value);
    if (unit === "%") return quantity("percentage", value);
    const angle = ANGLE[unit];
    if (angle !== undefined) return quantity("angle", angle(value));
    const length = ABSOLUTE_LENGTH[unit];
    if (length !== undefined) return quantity("length", value * length);
    if (RELATIVE_LENGTH.test(unit)) return CONTEXT;
    return quantity(unit, value);
}

/** §10.7.1's constants — `e`, `pi`, `infinity`, `-infinity`, `NaN` (ASCII case-insensitive). */
export function constantQuantity(token: string): Quantity {
    switch (token.toLowerCase()) {
        case "e": return quantity("number", Math.E);
        case "pi": return quantity("number", Math.PI);
        case "infinity": return quantity("number", Infinity);
        case "-infinity": return quantity("number", -Infinity);
        default: return quantity("number", NaN);
    }
}

/** The first unresolved operand decides: a type error outranks context, context outranks a keyword. */
function firstUnresolved(operands: readonly Numeric[]): Unresolved | null {
    const open = operands.filter((o): o is Unresolved => o.kind === "unresolved");
    if (open.length === 0) return null;
    return open.find((o) => o.reason === "invalid") ?? open.find((o) => o.reason === "context") ?? KEYWORD;
}

type Step = readonly [op: string, operand: Numeric];

/** `calcSum` / `calcProduct`: the first operand, then each `[operator, operand]` step (§10.8). */
export function fold(first: Numeric, steps: readonly Step[]): Numeric {
    let acc: Numeric = first;
    for (const [rawOp, operand] of steps) {
        const op = rawOp.trim();
        const open = firstUnresolved([acc, operand]);
        if (open !== null) { acc = open; continue; }
        const a = acc as Quantity;
        const b = operand as Quantity;
        switch (op) {
            case "+":
            case "-":
                acc = a.type === b.type ? quantity(a.type, op === "+" ? a.value + b.value : a.value - b.value) : INVALID;
                break;
            case "*":
                acc = a.type === "number" ? quantity(b.type, a.value * b.value)
                    : b.type === "number" ? quantity(a.type, a.value * b.value)
                        : INVALID;
                break;
            default: //   "/": the divisor is a <number> (§10.8)
                acc = b.type === "number" ? quantity(a.type, a.value / b.value) : INVALID;
        }
    }
    return acc;
}

/** `min()` / `max()` / `clamp()`: every argument of one type (§10.3–§10.4). */
export function comparison(name: "min" | "max" | "clamp", args: readonly Numeric[]): Numeric {
    const open = firstUnresolved(args);
    if (open !== null) return open;
    const qs = args as readonly Quantity[];
    const type = qs[0]?.type;
    if (type === undefined || qs.some((q) => q.type !== type)) return INVALID;
    const values = qs.map((q) => q.value);
    if (values.some(Number.isNaN)) return quantity(type, NaN);
    if (name === "min") return quantity(type, Math.min(...values));
    if (name === "max") return quantity(type, Math.max(...values));
    const [lo = NaN, mid = NaN, hi = NaN] = values;
    return quantity(type, Math.max(lo, Math.min(mid, hi)));
}

/** `sign()` answers a <number>; `abs()` keeps its argument's type (§10.7). */
export function signAbs(name: string, arg: Numeric): Numeric {
    if (arg.kind === "unresolved") return arg;
    return name.toLowerCase() === "sign"
        ? quantity("number", Number.isNaN(arg.value) ? NaN : Math.sign(arg.value))
        : quantity(arg.type, Math.abs(arg.value));
}

/** A math function's result, marked as a top-level calculation. */
export const calculated = (q: Numeric): Numeric => (q.kind === "quantity" ? Object.freeze({ ...q, math: true as const }) : q);

/**
 * `tokens.bbnf`'s numeric tokens and `math.bbnf`'s calculations, as typed quantities. Each action
 * receives its rule's value where the grammar puts it (positional sequences: an unmatched optional
 * keeps its `undefined` slot).
 */
export const mathActions = {
    number: { kind: "map", fn: tokenQuantity },
    percentage: { kind: "map", fn: tokenQuantity },
    angle: { kind: "map", fn: tokenQuantity },
    dimension: { kind: "map", fn: tokenQuantity },
    none: { kind: "map", fn: (): NoneToken => NONE },
    calcConstant: { kind: "map", fn: constantQuantity },
    calcKeyword: { kind: "text", fn: (): Numeric => KEYWORD },
    varFn: { kind: "text", fn: (): Numeric => CONTEXT },
    calc: { kind: "map", fn: calculated },
    calcSum: { kind: "map", fn: ([first, steps]: readonly [Numeric, readonly Step[]]) => fold(first, steps) },
    calcProduct: { kind: "map", fn: ([first, steps]: readonly [Numeric, readonly Step[]]) => fold(first, steps) },
    minMax: { kind: "map", fn: ([name, first, rest]: readonly [string, Numeric, readonly Numeric[]]) =>
        calculated(comparison(name.toLowerCase() === "min" ? "min" : "max", [first, ...rest])) },
    clampFn: { kind: "map", fn: (args: readonly [Numeric, Numeric, Numeric]) => calculated(comparison("clamp", args)) },
    signAbs: { kind: "map", fn: ([name, arg]: readonly [string, Numeric]) => calculated(signAbs(name, arg)) },
} as const satisfies Partial<Actions>;
