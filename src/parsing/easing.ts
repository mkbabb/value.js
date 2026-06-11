import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import type { LinearStop } from "../easing";
import { jumpTerms } from "../easing";
import * as utils from "./utils";

/**
 * CSS Easing parsers (CSS Easing Functions Level 1 + Level 2).
 *
 * These are the *syntax* half of the easing surface; the *evaluators* live in
 * `src/easing.ts` (`cssLinear`, `steppedEase`). The division of labour is
 * deliberate: the parser emits the raw structured stops/args verbatim from the
 * CSS source, and the evaluator resolves gaps, defaults, and the step staircase.
 * Keep it that way — a parser that pre-resolves gaps would double the spec
 * semantics across two modules.
 */

const lparen = string("(");
const rparen = string(")");
const comma = string(",").trim(whitespace);

// `<percentage>` — a bare number suffixed with `%`. The easing stop position is
// the 0–100 percentage value (NOT normalised to 0–1; `cssLinear` divides by 100
// at resolution time). Overshoot and negatives are permitted (CSS Easing L2
// allows positions outside [0,100] — they clamp monotonically at resolution).
const percentage: Parser<number> = all(utils.number, string("%")).map(
    ([value]: [number, string]) => value,
);

// `<linear-stop> = <number> <linear-stop-length>?`
// `<linear-stop-length> = <percentage>{1,2}`
//
// A stop carries an output value and 0, 1, or 2 input positions. Two positions
// describe a flat segment: the SAME output is held across `[pos1, pos2]`, which
// emits as TWO LinearStops sharing `output`. This mirrors `cssLinear`'s
// flat-segment handling (src/easing.ts:56-60).
const linearStop: Parser<LinearStop[]> = all(
    utils.number,
    whitespace.next(percentage).opt(),
    whitespace.next(percentage).opt(),
).map(([output, input1, input2]: [number, number | undefined, number | undefined]) => {
    const stops: LinearStop[] = [];
    if (input1 == null) {
        // `<number>` alone — no explicit position; `cssLinear` distributes it.
        stops.push({ output });
    } else {
        stops.push({ output, input: input1 });
        if (input2 != null) {
            // Flat segment: hold `output` from input1 to input2.
            stops.push({ output, input: input2 });
        }
    }
    return stops;
});

// `linear( <linear-stop-list> )` where `<linear-stop-list> = <linear-stop>#`.
const linearStopList: Parser<LinearStop[]> = linearStop
    .sepBy(comma, 1)
    .map((groups: LinearStop[][]) => groups.flat());

const linearFunction: Parser<LinearStop[]> = utils
    .istring("linear")
    .next(linearStopList.trim(whitespace).wrap(lparen, rparen));

/**
 * Parse a CSS `linear()` easing function (CSS Easing Functions Level 2) into a
 * flat `LinearStop[]`, ready to feed `cssLinear` from `src/easing.ts`.
 *
 * The parser emits the stops *as written* — it does NOT resolve omitted input
 * positions or fill gaps; `cssLinear` performs that resolution (first/last
 * default to 0%/100%, interior gaps distribute linearly). A stop with two
 * percentages (a flat segment, e.g. `0.5 25% 75%`) emits two stops sharing the
 * same `output`.
 *
 * @example
 * parseLinearStops("linear(0, 0.5 25% 75%, 1)")
 * // → [{ output: 0 }, { output: 0.5, input: 25 }, { output: 0.5, input: 75 }, { output: 1 }]
 */
export function parseLinearStops(input: string): LinearStop[] {
    return utils.tryParse(linearFunction, input);
}

/** The canonical `<step-position>` keyword union accepted by `steppedEase`. */
export type JumpTerm = (typeof jumpTerms)[number];

export interface StepsArgs {
    count: number;
    jumpTerm: JumpTerm;
}

// `<step-position> = jump-start | jump-end | jump-none | jump-both | start | end`.
// Match longest-first so `jump-start` is not shadowed by a bare `start` (the
// dispatching `any` is order-sensitive and `start` is a prefix-free distinct
// token, but ordering jump-* before the legacy aliases keeps it byte-stable).
const stepPosition: Parser<JumpTerm> = any(
    utils.istring("jump-start"),
    utils.istring("jump-end"),
    utils.istring("jump-none"),
    utils.istring("jump-both"),
    utils.istring("start"),
    utils.istring("end"),
).map((term: string) => term.toLowerCase() as JumpTerm);

// `steps( <integer> , <step-position>? )`. The position defaults to `jump-end`
// (matching `steppedEase`'s default and the CSS spec).
const stepsFunction: Parser<StepsArgs> = utils.istring("steps").next(
    all(
        utils.integer,
        comma.next(stepPosition).opt(),
    )
        .trim(whitespace)
        .wrap(lparen, rparen)
        .map(([count, jumpTerm]: [number, JumpTerm | undefined]) => ({
            count,
            jumpTerm: jumpTerm ?? "jump-end",
        })),
);

/**
 * Parse a CSS `steps()` easing function (CSS Easing Functions Level 1) into
 * `{ count, jumpTerm }`, ready to feed `steppedEase(count, jumpTerm)` from
 * `src/easing.ts`.
 *
 * `count` must be a positive integer; the step position defaults to `jump-end`
 * when omitted. Per spec, `count` must be ≥ 1 (and ≥ 2 for `jump-none` to be
 * meaningful, though `steppedEase` guards that case). A zero or negative count,
 * or a non-integer, throws.
 *
 * @example
 * parseSteps("steps(4)")               // → { count: 4, jumpTerm: "jump-end" }
 * parseSteps("steps(3, jump-start)")   // → { count: 3, jumpTerm: "jump-start" }
 */
export function parseSteps(input: string): StepsArgs {
    const args = utils.tryParse(stepsFunction, input);
    if (!Number.isInteger(args.count) || args.count < 1) {
        throw new Error(
            `steps() count must be a positive integer, got ${args.count}`,
        );
    }
    return args;
}
