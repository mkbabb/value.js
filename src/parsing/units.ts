import P from "parsimmon";
import { ValueUnit } from "../units";
import {
    ABSOLUTE_LENGTH_UNITS,
    ANGLE_UNITS,
    LENGTH_UNITS,
    PERCENTAGE_UNITS,
    RELATIVE_LENGTH_UNITS,
    RESOLUTION_UNITS,
    TIME_UNITS,
} from "../units/constants";
import { CSSColor, parseCSSColor } from "./color";
import * as utils from "./utils";

export { CSSColor, parseCSSColor };

export const CSSValueUnit: P.Language = P.createLanguage({
    lengthUnit: () => P.alt(...LENGTH_UNITS.map(utils.istring)),
    angleUnit: () => P.alt(...ANGLE_UNITS.map(utils.istring)),
    timeUnit: () => P.alt(...TIME_UNITS.map(utils.istring)),
    resolutionUnit: () => P.alt(...RESOLUTION_UNITS.map(utils.istring)),
    percentageUnit: () => P.alt(...PERCENTAGE_UNITS.map(utils.istring)),

    comma: () => P.string(","),
    space: () => P.string(" "),

    sep: (r) => r.comma.or(r.space).trim(P.optWhitespace),

    Length: (r) =>
        P.seq(utils.number, r.lengthUnit).map(([value, unit]) => {
            let superType = ["length"];
            if (RELATIVE_LENGTH_UNITS.includes(unit)) {
                superType.push("relative");
            } else if (ABSOLUTE_LENGTH_UNITS.includes(unit)) {
                superType.push("absolute");
            }
            return new ValueUnit(value, unit, superType);
        }),

    Angle: (r) =>
        P.seq(utils.number, r.angleUnit).map(([value, unit]) => {
            return new ValueUnit(value, unit, ["angle"]);
        }),

    Time: (r) =>
        P.seq(utils.number, r.timeUnit).map(([value, unit]) => {
            return new ValueUnit(value, unit, ["time"]);
        }),

    TimePercentage: (r) => P.alt(r.Percentage, r.Time),

    Resolution: (r) =>
        P.seq(utils.number, r.resolutionUnit).map(([value, unit]) => {
            return new ValueUnit(value, unit, ["resolution"]);
        }),

    Percentage: (r) =>
        P.alt(
            P.seq(utils.number, r.percentageUnit),
            utils.istring("from").map(() => [0, "%"]),
            utils.istring("to").map(() => [100, "%"]),
        ).map(([value, unit]) => {
            return new ValueUnit(value, unit, ["percentage"]);
        }),

    Color: (r): P.Parser<ValueUnit> => CSSColor.Value,

    Slash: () =>
        P.string("/")
            .trim(P.optWhitespace)
            .map(() => new ValueUnit("/", "string")),

    Value: (r) =>
        P.alt(
            r.Length,
            r.Angle,
            r.Time,
            r.Resolution,
            r.Percentage,
            r.Color,
            r.Slash,
            utils.number.map((x) => new ValueUnit(x)),
            utils.none.map(() => new ValueUnit(NaN)),
        ).trim(P.optWhitespace),
});

export function parseCSSValueUnit(input: string): ValueUnit {
    return CSSValueUnit.Value.tryParse(input);
}
