/**
 * GROUND-B — the idiomatic `@mkbabb/parse-that` reference implementation.
 *
 * The grammar: CSS Values and Units Level 4 §10 math functions —
 * `calc()`, `min()`, `max()`, `clamp()` over `<number> | <percentage> | <dimension>`.
 *
 *   <math-function> = calc( <calc-sum> )
 *                   | min( <calc-sum># ) | max( <calc-sum># )
 *                   | clamp( <calc-sum>#{3} )
 *   <calc-sum>      = <calc-product> [ [ '+' | '-' ] <calc-product> ]*   ‹ws REQUIRED around +/-›
 *   <calc-product>  = <calc-value>   [ [ '*' | '/' ] <calc-value>   ]*   ‹ws OPTIONAL around * and /›
 *   <calc-value>    = <number> | <percentage> | <dimension>
 *                   | ( <calc-sum> ) | <math-function>
 *
 * Chosen because it is SMALL, REAL, and exercises every axis of the idiom in one
 * page: alternation, sequence, optionality, separated lists with exact arity,
 * mutual recursion through `Parser.lazy`, delimiter wrapping, precedence without
 * left recursion, keyword case-folding, and a total (never-throwing) entry point.
 *
 * It is deliberately NOT the colour grammar: this file is the yardstick the
 * colour-parser candidates are measured against, not a head start on their work.
 *
 * NON-NEGOTIABLES DEMONSTRATED HERE
 *   · zero `!` non-null assertions            (the subject has 74)
 *   · zero `as` casts into the AST
 *   · zero hand-rolled cursors / index arithmetic
 *   · no regex spanning more than one terminal
 *   · the entry point reads `state.isError`, NEVER the truthiness of `parse()`
 */

import { Parser, all, any, dispatch, regex, string } from "@mkbabb/parse-that";

// ── AST ─────────────────────────────────────────────────────────────────────

export type SumOp = "+" | "-";
export type ProductOp = "*" | "/";
export type MathFnName = "calc" | "min" | "max" | "clamp";

export type CalcNode =
    | { readonly kind: "number"; readonly value: number }
    | { readonly kind: "percentage"; readonly value: number }
    | { readonly kind: "dimension"; readonly value: number; readonly unit: string }
    | {
          readonly kind: "operation";
          readonly op: SumOp | ProductOp;
          readonly left: CalcNode;
          readonly right: CalcNode;
      }
    | {
          readonly kind: "call";
          readonly name: MathFnName;
          readonly args: readonly CalcNode[];
      };

// ── Terminals ───────────────────────────────────────────────────────────────
//
// A regex here is a TERMINAL — it recognises exactly one token and yields its
// text. It never spans a delimiter, never captures a "remainder", and never
// carries structure in capture groups. That is the line between a regex terminal
// (idiomatic) and a regex parser wearing combinators as decoration (not).

/** `<number>` — CSS Syntax §4.3.12, sign + integer|decimal + optional exponent. */
const NUMBER = /[+-]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][+-]?\d+)?/;

const number = regex(NUMBER).map(Number);

/** `<ident>` restricted to unit names (px, em, deg, vmin, …). */
const unit = regex(/[a-zA-Z]+/);

/** ASCII case-insensitive keyword terminal — CSS function names case-fold. */
const keyword = (word: string) => regex(new RegExp(word, "i"));

const openParen = string("(");
const closeParen = string(")");
const comma = string(",").trim();

/** CSS L4 §10.9: `+` and `-` MUST be surrounded by whitespace; `*` `/` need not. */
const requiredWhitespace = regex(/\s+/);

const sumOp = regex(/[+-]/)
    .wrap(requiredWhitespace, requiredWhitespace)
    .map((op): SumOp => (op === "+" ? "+" : "-"));

const productOp = regex(/[*/]/)
    .trim()
    .map((op): ProductOp => (op === "*" ? "*" : "/"));

// ── Leaf production: <number> | <percentage> | <dimension> ──────────────────
//
// `.then()` is used — NOT `all()` — because the suffix is OPTIONAL. `all()`
// DROPS `undefined` arms at runtime while its TypeScript tuple type keeps them,
// so an `.opt()` inside `all()` silently shifts every later position. `.then()`
// builds its pair unconditionally and is therefore optionality-safe.
// (Proven in `skip-caveat.test.ts` → "adjacent finding A".)

const numericSuffix = any(string("%"), unit).opt();

const numeric: Parser<CalcNode> = number
    .then(numericSuffix)
    .map(([value, suffix]): CalcNode => {
        if (suffix === undefined) return { kind: "number", value };
        if (suffix === "%") return { kind: "percentage", value };
        return { kind: "dimension", value, unit: suffix.toLowerCase() };
    });

// ── Recursion ───────────────────────────────────────────────────────────────
//
// `Parser.lazy` is REQUIRED exactly where a production names a `const` declared
// LATER in the module: the combinator graph is built eagerly at module
// evaluation, so a forward reference without `lazy` reads a TDZ binding and
// throws. It is NOT required for a backward reference — `Parser.lazy(() => number)`
// is noise.
//
// This file therefore carries exactly FOUR `Parser.lazy` calls, one per back-edge
// of the recursion cycle: the three forward references inside `calcValue`'s
// dispatch table, and `parenthesized`'s forward reference to `calcSum`. Every
// other production below reads only already-initialised bindings and is built
// eagerly. `lazy`-everywhere is the cargo-cult; `lazy`-at-the-back-edge is the
// idiom. (parse-that's own `json.ts` does exactly this: `jsonArray`/`jsonObject`
// are lazy because they name `jsonValue`, declared after them; `jsonString` and
// `jsonNumber` are not.)

/** `<calc-value>` — O(1) first-character dispatch, exactly as parse-that's own json.ts. */
const calcValue: Parser<CalcNode> = dispatch<CalcNode>({
    "0-9": numeric,
    ".": numeric,
    "+": numeric,
    "-": numeric,
    "(": Parser.lazy(() => parenthesized),
    // Two keywords share a first character, so the bucket resolves with `any`.
    // `dispatch` narrows the fan-out; `any` orders the residual alternation.
    cC: Parser.lazy(() => any(calcCall, clampCall)),
    mM: Parser.lazy(() => any(minCall, maxCall)),
});

const parenthesized: Parser<CalcNode> = Parser.lazy(() =>
    calcSum.trim().wrap(openParen, closeParen),
);

/** Left-associative fold — precedence WITHOUT left recursion, so no packrat. */
const foldLeft = (
    head: CalcNode,
    tail: ReadonlyArray<readonly [SumOp | ProductOp, CalcNode]>,
): CalcNode =>
    tail.reduce<CalcNode>(
        (left, [op, right]) => ({ kind: "operation", op, left, right }),
        head,
    );

// Backward references only (`calcValue` is already initialised) — no `lazy`.
const calcProduct: Parser<CalcNode> = all(
    calcValue,
    all(productOp, calcValue).many(),
).map(([head, tail]) => foldLeft(head, tail));

const calcSum: Parser<CalcNode> = all(
    calcProduct,
    all(sumOp, calcProduct).many(),
).map(([head, tail]) => foldLeft(head, tail));

// ── Math functions ──────────────────────────────────────────────────────────
//
// `.next()` discards the keyword and keeps the argument list; `.wrap()` discards
// the parentheses and keeps the inside — and reports an unclosed-delimiter
// diagnostic for free. Neither needs a positional index, so neither needs a `!`.
//
// `sepBy(sep, min, max)` expresses `#`, `#{3}` and `#{1,}` directly. The arity
// belongs in the combinator, never in a post-hoc `if (parts.length !== 3)`.

const argumentList = (min: number, max: number): Parser<readonly CalcNode[]> =>
    calcSum.trim().sepBy(comma, min, max);

const mathCall = (
    name: MathFnName,
    args: Parser<readonly CalcNode[]>,
): Parser<CalcNode> =>
    keyword(name)
        .next(args.wrap(openParen, closeParen))
        .map((parsed): CalcNode => ({ kind: "call", name, args: parsed }));

const calcCall = mathCall("calc", argumentList(1, 1));
const minCall = mathCall("min", argumentList(1, Infinity));
const maxCall = mathCall("max", argumentList(1, Infinity));
const clampCall = mathCall("clamp", argumentList(3, 3));

const mathFunction: Parser<CalcNode> = any(calcCall, clampCall, minCall, maxCall);

/** The stylesheet-facing root: whitespace-tolerant, trailing-garbage-intolerant. */
export const mathRoot: Parser<CalcNode> = mathFunction.trim().eof();

// ── Entry point ─────────────────────────────────────────────────────────────
//
// THE CONTRACT: a ParserState's `value` is meaningful ONLY when `isError` is
// false. `Parser.parse()` returns `state.value` unconditionally, so on a FAILED
// parse it hands back whatever the last successful sub-parser left behind (see
// `skip-caveat.test.ts`). Every production entry point therefore goes through
// `parseState()` and branches on `isError` — never on the truthiness of the
// returned value. This is the single rule that makes the parser total.

export interface ParseSuccess {
    readonly ok: true;
    readonly node: CalcNode;
}

export interface ParseFailure {
    readonly ok: false;
    /** Furthest offset the parse reached — the useful caret position. */
    readonly offset: number;
    /** Populated only while `enableDiagnostics()` is on; `[]` otherwise. */
    readonly expected: readonly string[];
}

export type ParseOutcome = ParseSuccess | ParseFailure;

export function parseMath(source: string): ParseOutcome {
    const state = mathRoot.parseState(source);

    if (state.isError) {
        return {
            ok: false,
            offset: state.furthest >= 0 ? state.furthest : state.offset,
            expected: state.expected ?? [],
        };
    }

    return { ok: true, node: state.value };
}

// ── Error recovery (list-shaped grammars only) ──────────────────────────────
//
// `recover(sync, sentinel)` is warranted when the caller wants EVERY error in a
// list, not the first: a failed element is snapshotted as a diagnostic, `sync`
// skips the bad span, and `sentinel` stands in so the enclosing `sepBy`/`many`
// keeps going. It is CARGO CULT on a single-value production such as
// `parseCssColor`, where the correct answer to bad input is one failure.
//
// The sync parser must CONSUME (`+`, not `*`): a zero-width sync leaves the
// offset unmoved and `sepBy`'s no-progress guard ends the loop.

export const INVALID_ARGUMENT: CalcNode = { kind: "number", value: Number.NaN };

export const resilientArguments: Parser<readonly CalcNode[]> = calcValue
    .trim()
    .recover(regex(/[^,)]+/), INVALID_ARGUMENT)
    .sepBy(comma)
    .wrap(openParen, closeParen);
