/**
 * CANDIDATE S · SPEC-SHAPED — CSS Syntax Level 3 §4, the token productions.
 *
 * Every export here is ONE token, named as css-syntax-3 names it. That is the
 * line between a regex TERMINAL (idiomatic — parse-that's own `json.ts` does
 * exactly this for `jsonNumber`) and a regex parser wearing combinators as a
 * hat (GROUND-B AP-2/AP-3). No regex below spans a delimiter, carries structure
 * in a capture group, or captures a `.*` remainder.
 *
 * The trailing `(?!…)` assertions are not "structure". They are the tokenizer's
 * own boundary rule — css-syntax-3 decides where a token ENDS by looking at the
 * next code point, and a terminal that ignores that rule under-rejects. It is
 * stated ONCE per token class here, and nowhere else in the candidate.
 */

import { Parser, any, regex, string } from "@mkbabb/parse-that";

/**
 * css-syntax-3 §4.3.12 "Consume a number" — the SPELLING of a numeric literal.
 *
 * > … an optional `+`/`-`, then zero or more digits, then optionally `.`
 * > followed by one or more digits, then optionally `e`/`E`, an optional
 * > `+`/`-`, and one or more digits.
 *
 * Maximal munch with the stop-short cases the spec requires: `1.` stops at `1`,
 * `1e+` stops at `1`, `1.2.3` stops at `1.2`. (The salvaged 49-case
 * maximal-prefix corpus from GROUND-C is run against this terminal in
 * `terminals.test.ts` — it is the same production V·π's one accepted operation
 * implemented, re-derived here rather than adopted, per GROUND-C §2.4.)
 */
export const NUMBER_TOKEN = /[+-]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][+-]?\d+)?/;

/**
 * css-syntax-3 §4.3.3 "Consume a numeric token".
 *
 * > … If the next 3 input code points would start an ident sequence, … create a
 * > `<dimension-token>` … Otherwise, if the next input code point is U+0025
 * > PERCENTAGE SIGN, … create a `<percentage-token>` …
 *
 * So a bare `<number-token>` is a numeric literal NOT followed by either. This
 * single assertion is what makes every alternation in this candidate
 * ORDER-INSENSITIVE: `<number>` cannot swallow the `50` of `50%` or the `120`
 * of `120deg`, so `any(<percentage>, <number>)` and `any(<number>,
 * <percentage>)` accept the same language.
 */
export const IDENT_SEQUENCE_OR_PERCENT_START =
    /%|-[A-Za-z_\x80-\uFFFF\\-]|[A-Za-z_\x80-\uFFFF\\]/;

/**
 * css-syntax-3 §4.3.11 "Consume an ident sequence" — ASCII + non-ASCII, no
 * escapes. Escapes (`re\d` for `red`) are a DECLARED GAP of this candidate; see
 * the report. GROUND-C §3.3 is emphatic that inventing a second boundary regex
 * for escapes is how three prior candidates died, so this candidate does not
 * invent one — it declines the feature and says so.
 */
export const IDENT_TOKEN = /(?:--|-?[A-Za-z_\x80-\uFFFF])[A-Za-z0-9_\x80-\uFFFF-]*/;

/** The ident-continuation set, used as the keyword boundary assertion. */
const IDENT_CONTINUATION = "[A-Za-z0-9_\\x80-\\uFFFF-]";

/** css-syntax-3 §4.3.12 — the numeric literal, before any type is assigned. */
export const numberToken: Parser<string> = regex(NUMBER_TOKEN);

/** css-syntax-3 §4.3.11 `<ident-token>`. */
export const identToken: Parser<string> = regex(IDENT_TOKEN);

/**
 * css-syntax-3 §4.3.4 `<function-token>`.
 *
 * > A function token … consists of an ident followed by a U+0028 LEFT
 * > PARENTHESIS.
 *
 * ONE token: the parenthesis is part of it. That is why `rgb (1 2 3)` is not a
 * function call in CSS, and why this candidate gets that right for free rather
 * than by an extra whitespace rule.
 *
 * ASCII case-insensitive, per css-syntax-3 §3.
 */
export const functionToken = (name: string): Parser<string> =>
    regex(new RegExp(`${name}\\(`, "i")).map(() => name);

/**
 * An ASCII case-insensitive keyword that must be a WHOLE `<ident-token>`.
 * The boundary assertion is what keeps `green` from matching inside
 * `greenyellow` and `srgb` from matching inside `srgb-linear` — which in turn
 * is why the 148-arm `<named-color>` alternation needs no ordering discipline.
 *
 * Every keyword in this candidate goes through this one function. There is no
 * second spelling of "a keyword" anywhere.
 */
export const keyword = (word: string): Parser<string> =>
    regex(new RegExp(`${word}(?!${IDENT_CONTINUATION})`, "i")).map(() => word);

export const openParen: Parser<string> = string("(");
export const closeParen: Parser<string> = string(")");

/** css-syntax-3 §4.2 — the comma separator of the legacy colour forms. */
export const comma: Parser<string> = string(",").trim();

/** css-color-4 §7.1 — the solidus that introduces the modern alpha tail. */
export const solidus: Parser<string> = string("/").trim();

/**
 * css-syntax-3 §5.4.9 `<any-value>` — a balanced token run.
 *
 * Written as ORDINARY RECURSION, which `MODULE-DAG.md` invariant 4 explicitly
 * permits ("recursive parse-that productions for nested functions/blocks are
 * ordinary grammar"). What it must not be is an imperative `depth++/depth--`
 * scanner with a `quote` local (GROUND-B AP-6) — that shape is the subject's
 * `splitTopLevel`, and `splitTopLevel("", "/") === []` is the shipping crash.
 *
 * Exactly ONE `Parser.lazy`, at the one back-edge (`block` names `anyValue`,
 * declared after it). GROUND-B R-9.
 */
const rawRun: Parser<string> = regex(/[^()'"]+/);
const quotedString: Parser<string> = regex(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/);
const block: Parser<string> = Parser.lazy(() => anyValue)
    .map((inner) => `(${inner})`)
    .wrap(openParen, closeParen);

export const anyValue: Parser<string> = any(rawRun, quotedString, block)
    .many()
    .map((parts) => parts.join(""));
