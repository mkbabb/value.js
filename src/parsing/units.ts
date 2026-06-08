import { Parser, any, all, string, whitespace } from "@mkbabb/parse-that";
import { ValueUnit } from "../units";
import {
    ABSOLUTE_LENGTH_UNITS,
    ANGLE_UNITS,
    FLEX_UNITS,
    FREQUENCY_UNITS,
    LENGTH_UNITS,
    PERCENTAGE_UNITS,
    RELATIVE_LENGTH_UNITS,
    RESOLUTION_UNITS,
    TIME_UNITS,
} from "../units/constants";
import { CSSColor, parseCSSColor, registerColorNames, clearCustomColorNames, getCustomColorNames } from "./color";
import * as utils from "./utils";
import { memoize } from "../utils";

export { CSSColor, parseCSSColor, registerColorNames, clearCustomColorNames, getCustomColorNames };

const lengthUnit = utils.unitParser(LENGTH_UNITS);
const angleUnit = utils.unitParser(ANGLE_UNITS);
const timeUnit = utils.unitParser(TIME_UNITS);
const frequencyUnit = utils.unitParser(FREQUENCY_UNITS);
const resolutionUnit = utils.unitParser(RESOLUTION_UNITS);
const flexUnit = utils.unitParser(FLEX_UNITS);
// `%` is a single non-identifier glyph with no prefix/boundary hazard.
const percentageUnit = any(...PERCENTAGE_UNITS.map(utils.istring));

const comma = string(",");
const space = string(" ");
const sep = any(comma, space).trim(whitespace);

const Length = all(utils.number, lengthUnit).map(([value, unit]: [number, string]) => {
    const superType = ["length"];
    if ((RELATIVE_LENGTH_UNITS as readonly string[]).includes(unit)) {
        superType.push("relative");
    } else if ((ABSOLUTE_LENGTH_UNITS as readonly string[]).includes(unit)) {
        superType.push("absolute");
    }
    return new ValueUnit(value, unit, superType);
});

const Angle = all(utils.number, angleUnit).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["angle"]);
});

const Time = all(utils.number, timeUnit).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["time"]);
});

const TimePercentage: Parser<ValueUnit> = Parser.lazy(() => any(Percentage, Time));

const Frequency = all(utils.number, frequencyUnit).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["frequency"]);
});

const Resolution = all(utils.number, resolutionUnit).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["resolution"]);
});

const Flex = all(utils.number, flexUnit).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["flex"]);
});

const Percentage: Parser<ValueUnit> = any(
    all(utils.number, percentageUnit) as Parser<any>,
    utils.istring("from").map(() => [0, "%"]),
    utils.istring("to").map(() => [100, "%"]),
).map(([value, unit]: [number, string]) => {
    return new ValueUnit(value, unit, ["percentage"]);
});

const Color: Parser<ValueUnit> = Parser.lazy(() => CSSColor.Value);

const Slash = string("/")
    .trim(whitespace)
    .map(() => new ValueUnit("/", "string"));

const Value: Parser<ValueUnit> = any(
    Length,
    Angle,
    Time,
    Frequency,
    Resolution,
    Flex,
    Percentage,
    Color,
    Slash,
    utils.number.map((x: number) => new ValueUnit(x)),
    utils.none.map(() => new ValueUnit(NaN)),
).trim(whitespace);

export const CSSValueUnit = {
    Length,
    Angle,
    Time,
    TimePercentage,
    Frequency,
    Resolution,
    Flex,
    Percentage,
    Color,
    Slash,
    Value,
    sep,
};

/**
 * Parse a CSS dimension/value string into a `ValueUnit`. Memoised — the
 * returned `ValueUnit` is shared across callers, so callers MUST NOT mutate it.
 * Mirrors the memo contract of the sibling `parseCSSValue`/`parseCSSColor`.
 */
// keyFn identity override (E.W1 Lane D / E-AUDIT-5 §9 item 9): see comment in
// src/parsing/index.ts.
export const parseCSSValueUnit = memoize(
    (input: string): ValueUnit => {
        // Empty-input contract (the keyframes.js I.W0 B1/B5 seam, paired with
        // the consumer's compile-seam guard). An empty/whitespace input is a
        // LEGITIMATE transient — the read-back of an UNSET `var(--x)`
        // (`getComputedStyle(...).getPropertyValue` of an undefined custom
        // property returns `""`), or a property sampled before it is wired —
        // NOT a malformed value. Resolve it to a typed-empty IDENTITY
        // `ValueUnit` (value 0, no unit: it contributes NO change to an
        // interpolation, leaving that axis unchanged) rather than the cryptic,
        // un-typed `Parse error at offset 0: "......"` that `tryParse` raises on
        // the empty string. Empty in → typed-empty out, never a throw.
        if (input == null || input.trim() === "") {
            return new ValueUnit(0);
        }
        return utils.tryParse(Value, input);
    },
    { keyFn: (input: string) => input },
);

/**
 * Format a millisecond duration as a CSS time string. Emits `<n>s`
 * for durations ≥ 5 s (where seconds become more readable than
 * milliseconds); otherwise `<n>ms`. Threshold matches the historical
 * keyframes.js convention so round-trips don't drift.
 */
export function reverseCSSTime(time: number): string {
    if (time >= 5000) return `${time / 1000}s`;
    return `${time}ms`;
}

/**
 * Format an iteration count for the `animation-iteration-count`
 * property. `Infinity` becomes the keyword `infinite`; finite values
 * render as their decimal representation.
 */
export function reverseCSSIterationCount(count: number): string {
    if (count === Infinity) return "infinite";
    return String(count);
}
