import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import type { LinearStop, TimingFunction } from "../../easing";
import { cssLinear, jumpTerms, resolveEasing } from "../../easing";
import { FunctionValue, ValueUnit } from "../../units";
import * as utils from "../utils";

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

// ─── spring() — moderate-supersede easing (O.W5 S3 / D6) ───────────────────
//
// `spring(<mass>, <stiffness>, <damping>, <velocity>)` is NOT native CSS as of
// 2026-06; the CSSWG `spring()` proposal is not shipped in any browser. value.js
// MODERATE-SUPERSEDES it: it PARSES + ROUND-TRIPS the author-side `spring(...)`
// syntax, and LOWERS to a standard `linear()` for browser consumption via the
// closed-form spring ODE (`lowerSpringEasing`). No new wrapper type — the parsed
// node is a plain `FunctionValue("spring", [mass, stiffness, damping, velocity])`
// whose `toString()` re-emits `spring(1, 100, 10, 0)` via the generic comma-join.

const springArg: Parser<number> = utils.number.trim(whitespace);

const springFunction: Parser<FunctionValue> = utils.istring("spring").next(
    all(
        springArg,
        comma.next(springArg),
        comma.next(springArg),
        comma.next(springArg),
    )
        .trim(whitespace)
        .wrap(lparen, rparen)
        .map(([mass, stiffness, damping, velocity]: number[]) => {
            return new FunctionValue("spring", [
                new ValueUnit(mass),
                new ValueUnit(stiffness),
                new ValueUnit(damping),
                new ValueUnit(velocity),
            ]);
        }),
);

/**
 * Parse `spring(<mass>, <stiffness>, <damping>, <velocity>)` into a typed
 * `FunctionValue("spring", [...])`. The four args are plain numbers; the node
 * round-trips as author syntax (`toString()` → `"spring(1, 100, 10, 0)"`). To
 * emit browser-consumable CSS, lower it via {@link lowerSpringEasing}.
 *
 * @example
 * parseSpring("spring(1, 100, 10, 0)")
 * // → FunctionValue("spring", [VU(1), VU(100), VU(10), VU(0)])
 */
export function parseSpring(input: string): FunctionValue {
    return utils.tryParse(springFunction, input);
}

/**
 * Closed-form analytic position of a unit-target spring at time `t` (seconds).
 *
 * Solves `m·x'' + c·x' + k·x = 0` for the displacement `x(t)` from rest, where
 * the spring starts at displacement `x0 = -1` (i.e. position 0, target 1) with
 * initial velocity `v0 = velocity`. Returns the POSITION `1 + x(t)` so it rises
 * from 0 toward 1. This is the SAME closed form `SpringProgress.evaluateAt` uses
 * in keyframes.js (underdamped decaying sinusoid / critical / overdamped two-mode),
 * reproduced here to avoid a circular kf → value.js dependency.
 *
 * @param mass `m` — inertia (> 0).
 * @param stiffness `k` — spring constant (> 0).
 * @param damping `c` — damping coefficient (≥ 0).
 * @param velocity `v0` — initial velocity in position-units/second.
 * @param t time in seconds.
 */
function springPositionAt(
    mass: number,
    stiffness: number,
    damping: number,
    velocity: number,
    t: number,
): number {
    const w = Math.sqrt(stiffness / mass); // ω₀ = √(k/m)
    const z = damping / (2 * Math.sqrt(stiffness * mass)); // ζ = c / (2√(km))
    const x0 = -1; // start at position 0, target 1 → displacement -1
    const v0 = velocity;

    let xRel: number;
    if (z < 1) {
        // Underdamped: decaying sinusoid.
        const wd = w * Math.sqrt(1 - z * z);
        const decay = Math.exp(-z * w * t);
        const A = x0;
        const B = (v0 + z * w * x0) / wd;
        xRel = decay * (A * Math.cos(wd * t) + B * Math.sin(wd * t));
    } else if (z === 1) {
        // Critically damped.
        const decay = Math.exp(-w * t);
        const A = x0;
        const B = v0 + w * x0;
        xRel = decay * (A + B * t);
    } else {
        // Overdamped: two real roots of r² + 2ζω r + ω² = 0.
        const disc = w * Math.sqrt(z * z - 1);
        const r1 = -z * w + disc;
        const r2 = -z * w - disc;
        const A = (v0 - r2 * x0) / (r1 - r2);
        const B = x0 - A;
        xRel = A * Math.exp(r1 * t) + B * Math.exp(r2 * t);
    }
    return 1 + xRel; // position = target + displacement
}

/**
 * Lower a `spring(mass, stiffness, damping, velocity)` to a CSS `linear()`
 * timing-function string with `steps` evenly-spaced interior stops (plus the
 * exact `0` start and `1` end), suitable for `animation-timing-function`.
 *
 * PURE — no DOM, no rAF, no kf dependency. The time span is sampled up to a
 * settle horizon (≈ where the envelope `exp(-ζωt)` has decayed below 0.1%),
 * capped to keep the string bounded; the resulting curve rises (and, for an
 * underdamped spring, overshoots past 1 then settles) toward `1` at 100%.
 * Overshoot values > 1 are honored by CSS `linear()` natively.
 *
 * The emitted string itself parses + round-trips through `parseCSSValue`
 * (self-idempotent): `parseCSSValue(lowerSpringEasing(...)).toString()` equals
 * the lowered string.
 *
 * @example
 * lowerSpringEasing(1, 100, 10, 0, 16)
 * // → "linear(0, 0.0123 6.25%, …, 1)"
 */
export function lowerSpringEasing(
    mass: number,
    stiffness: number,
    damping: number,
    velocity: number,
    steps: number = 16,
): string {
    if (mass <= 0 || stiffness <= 0) {
        throw new Error(
            `spring() requires mass > 0 and stiffness > 0, got mass=${mass}, stiffness=${stiffness}`,
        );
    }
    const w = Math.sqrt(stiffness / mass);
    const z = damping / (2 * Math.sqrt(stiffness * mass));
    // Settle horizon: the envelope decays as exp(-ζω t) (or exp(-ω t) at ζ≥1).
    // ln(1000) ≈ 6.9 → envelope below ~0.1%. Guard ζ→0 (undamped never settles)
    // with a fixed cap.
    const decayRate = z > 0 ? z * w : w;
    const duration =
        decayRate > 0 ? Math.min(Math.log(1000) / decayRate, 100 / w) : 10;

    const stops: string[] = ["0"];
    for (let i = 1; i <= steps; i++) {
        const frac = i / (steps + 1);
        const t = frac * duration;
        const v = springPositionAt(mass, stiffness, damping, velocity, t);
        const pct = frac * 100;
        // Trim trailing zeros for a compact, stable canonical form.
        const vStr = Number(v.toFixed(5)).toString();
        const pStr = Number(pct.toFixed(3)).toString();
        stops.push(`${vStr} ${pStr}%`);
    }
    stops.push("1");
    return `linear(${stops.join(", ")})`;
}

/**
 * Full-fidelity easing-string resolver — the parse-that HOOK for the canonical
 * dependency-free {@link resolveEasing} (src/easing.ts, W1-6). Extends the core
 * resolver with `spring(mass, stiffness, damping, velocity)`, which value.js
 * MODERATE-SUPERSEDES by LOWERING to a `linear()` staircase
 * ({@link lowerSpringEasing}) — a form the parse-that-free core cannot handle.
 * Every other easing string (named catalogue, `cubic-bezier()`, `steps()`,
 * `linear()`) delegates to the core resolver unchanged.
 *
 * @example
 * resolveEasingFunction("spring(1, 100, 10, 0)")(0) // → 0
 * resolveEasingFunction("ease-in-out")              // delegates to resolveEasing
 */
export function resolveEasingFunction(input: string): TimingFunction {
    const raw = input.trim();
    if (/^spring\s*\(/i.test(raw)) {
        const fn = parseSpring(raw);
        const [mass, stiffness, damping, velocity] = fn.values.map((v) =>
            Number(v.valueOf()),
        );
        return cssLinear(
            parseLinearStops(
                lowerSpringEasing(mass!, stiffness!, damping!, velocity!),
            ),
        );
    }
    return resolveEasing(raw);
}
