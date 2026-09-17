import { any, type Parser, regex } from "@mkbabb/parse-that";
import { insensitive } from "./combinators.js";
import { identifierRaw } from "./tokens.js";

export type NumericValue = Readonly<{ value: number; unit: string; raw: string }>;

const NUMBER = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?`;

const numeric = (source: RegExp, unit: (raw: string) => string): Parser<NumericValue> =>
    regex(source).map((raw) => ({ value: Number.parseFloat(raw), unit: unit(raw), raw }));

export const number = numeric(new RegExp(NUMBER), () => "");
export const integer = regex(/[+-]?\d+/).map(Number);
export const percentage = numeric(new RegExp(`${NUMBER}%`), () => "%");

const units = (values: readonly string[]): Parser<string> => any(
    ...[...values].sort((a, b) => b.length - a.length).map((value) => insensitive(value)),
);

export const absoluteLengthUnit = units(["px", "cm", "mm", "q", "in", "pc", "pt"]);
export const viewportLengthUnit = units([
    "vmin", "vmax", "svmin", "svmax", "lvmin", "lvmax", "dvmin", "dvmax",
    "svw", "svh", "svb", "svi", "lvw", "lvh", "lvb", "lvi", "dvw", "dvh", "dvb", "dvi",
    "vw", "vh", "vb", "vi",
]);
export const containerLengthUnit = units(["cqmin", "cqmax", "cqw", "cqh", "cqi", "cqb"]);
export const fontLengthUnit = units(["rem", "em", "ex", "ch", "lh", "rlh", "cap", "ic", "rcap", "rex", "rch", "ric"]);
export const lengthUnit = any(absoluteLengthUnit, viewportLengthUnit, containerLengthUnit, fontLengthUnit);
export const angleUnit = units(["deg", "grad", "rad", "turn"]);
export const timeUnit = units(["ms", "s"]);
export const frequencyUnit = units(["khz", "hz"]);
export const resolutionUnit = units(["dpcm", "dppx", "dpi", "x"]);
export const flexUnit = insensitive("fr");

const dimension = (unit: Parser<string>): Parser<NumericValue> => number.then(unit).map(([value, suffix]) => ({
    value: value.value,
    unit: suffix,
    raw: value.raw + suffix,
}));

export const length = dimension(lengthUnit);
export const angle = dimension(angleUnit);
export const time = dimension(timeUnit);
export const frequency = dimension(frequencyUnit);
export const resolution = dimension(resolutionUnit);
export const flex = dimension(flexUnit);
export const genericDimension = number.then(identifierRaw).map(([value, suffix]) => ({
    value: value.value,
    unit: suffix,
    raw: value.raw + suffix,
}));

export const valueUnit = any(length, angle, time, frequency, resolution, flex, percentage, genericDimension, number);
