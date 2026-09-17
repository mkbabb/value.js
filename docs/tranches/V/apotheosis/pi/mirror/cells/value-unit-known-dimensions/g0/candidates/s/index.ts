import { any, regex, type Parser } from "@mkbabb/parse-that/core";
import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.ts";

type DimensionFamily = "length" | "angle" | "time" | "frequency" | "resolution" | "flex";

type KnownUnit = {
    family: DimensionFamily;
    unit: string;
};

type KnownDimension = {
    kind: "dimension";
    family: DimensionFamily;
    number: { sign: "+" | "-" | null; type: "integer" | "number"; value: number };
    unit: string;
};

const identifierContinuation = regex(/(?:[-_a-z0-9\0]|[^\x00-\x7f]|\\[^\n\r\f])/i);
const completeIdentifier = identifierContinuation.not();

function unitFamily(family: DimensionFamily, units: readonly string[]): Parser<KnownUnit> {
    const longestFirst = [...units].sort((left, right) => right.length - left.length);
    return regex(new RegExp(`(?:${longestFirst.join("|")})`, "i"))
        .skip(completeIdentifier)
        .map((unit) => ({ family, unit: unit.toLowerCase() }));
}

const knownUnit = any(
    unitFamily("length", [
        "px", "cm", "mm", "q", "in", "pc", "pt",
        "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
        "vw", "vh", "vi", "vb", "vmin", "vmax",
        "svw", "svh", "svi", "svb", "svmin", "svmax",
        "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
        "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
        "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
    ]),
    unitFamily("angle", ["deg", "grad", "rad", "turn"]),
    unitFamily("time", ["s", "ms"]),
    unitFamily("frequency", ["hz", "khz"]),
    unitFamily("resolution", ["dpi", "dpcm", "dppx", "x"]),
    unitFamily("flex", ["fr"]),
);

export const knownDimension = consumeNumber.then(knownUnit).map(
    ([number, { family, unit }]): KnownDimension => ({
        kind: "dimension",
        family,
        number,
        unit,
    }),
);
