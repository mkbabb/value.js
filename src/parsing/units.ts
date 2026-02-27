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

export { CSSColor, parseCSSColor, registerColorNames, clearCustomColorNames, getCustomColorNames };

const lengthUnit = any(...LENGTH_UNITS.map(utils.istring));
const angleUnit = any(...ANGLE_UNITS.map(utils.istring));
const timeUnit = any(...TIME_UNITS.map(utils.istring));
const frequencyUnit = any(...FREQUENCY_UNITS.map(utils.istring));
const resolutionUnit = any(...RESOLUTION_UNITS.map(utils.istring));
const flexUnit = any(...FLEX_UNITS.map(utils.istring));
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

export function parseCSSValueUnit(input: string): ValueUnit {
    return utils.tryParse(Value, input);
}
