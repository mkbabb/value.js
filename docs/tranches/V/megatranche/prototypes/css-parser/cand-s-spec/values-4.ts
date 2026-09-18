/**
 * CANDIDATE S · SPEC-SHAPED — CSS Values and Units Level 4, the numeric types.
 *
 * `<number>`, `<percentage>`, `<angle>`, `<hue>` and `<alpha-value>` are REAL,
 * separately testable productions here — that is the whole bet of this
 * formulation. The subject folds all five into one 20-line `channelToken()`
 * helper with a `percentScale` parameter and an `angle` boolean, which is why
 * `<hue>`'s "no `<percentage>`" rule and `<alpha-value>`'s "no empty tail" rule
 * have nowhere to live there.
 *
 * Each of these is exercised on its own in `terminals.test.ts`, including
 * against GROUND-C's salvaged 49-case maximal-prefix corpus. A production you
 * cannot test alone is a production whose defects you find only through its
 * callers.
 */

import { Parser, any, regex, string } from "@mkbabb/parse-that";

import { IDENT_SEQUENCE_OR_PERCENT_START, numberToken } from "./syntax-3";

/**
 * css-values-4 §5.1 `<number>`.
 *
 * > … a `<number-token>` …
 *
 * A numeric literal that the tokenizer did NOT turn into a `<percentage-token>`
 * or a `<dimension-token>` — see css-syntax-3 §4.3.3. `1e` is therefore NOT a
 * `<number>` (it is `1` + the unit `e`), and `50` inside `50%` is not one either.
 */
export const number: Parser<number> = numberToken
    .not(regex(IDENT_SEQUENCE_OR_PERCENT_START))
    .map(Number);

/**
 * css-values-4 §5.2 `<percentage>`.
 *
 * > … a `<percentage-token>` …
 *
 * One token: the `%` is part of it, so `50 %` is two tokens and not a
 * `<percentage>`. (This is the same adjacency rule as `<function-token>`.)
 */
export const percentage: Parser<number> = numberToken
    .skip(string("%"))
    .map(Number);

/** css-values-4 §7.1 — the four `<angle>` units, with the ident boundary. */
const ANGLE_UNIT = /(?:deg|grad|rad|turn)(?![A-Za-z0-9_\x80-\uFFFF-])/i;

const toDegrees = (value: number, unit: string): number => {
    switch (unit.toLowerCase()) {
        case "grad":
            return value * 0.9;
        case "rad":
            return (value * 180) / Math.PI;
        case "turn":
            return value * 360;
        default:
            return value;
    }
};

/**
 * css-values-4 §7.1 `<angle>`.
 *
 * > … a `<dimension>` with one of the units `deg`, `grad`, `rad`, `turn`.
 *
 * Canonicalised to degrees, which is css-values-4's own canonical unit.
 */
export const angle: Parser<number> = numberToken
    .then(regex(ANGLE_UNIT))
    .map(([literal, unit]) => toDegrees(Number(literal), unit));

/**
 * css-color-4 §7.1 `<hue>`.
 *
 * > `<hue> = <number> | <angle>`
 *
 * Note what is ABSENT: `<percentage>`. The subject accepts `hsl(50% 50% 50%)`
 * by routing hue through the same percent-scaled helper as every other channel;
 * this production cannot, because the alternation names exactly two types.
 */
export const hue: Parser<number> = any(angle, number);

/**
 * css-color-4 §4.1 `<alpha-value>`.
 *
 * > `<alpha-value> = <number> | <percentage>`
 * > … the `<percentage>` … is mapped to the range `[0,1]` …
 *
 * NOT clamped at parse time: css-color-4 clamps alpha at used-value time, and a
 * parser that clamps has destroyed information its caller may want.
 */
export const alphaValue: Parser<number> = any(
    percentage.map((value) => value / 100),
    number,
);

/**
 * css-values-4 §3.2 `<dashed-ident>` — the author-namespaced ident used by
 * `@color-profile` and by `<custom-color-space>`.
 */
export const dashedIdent: Parser<string> = regex(
    /--[A-Za-z0-9_\x80-\uFFFF-]*/,
);
