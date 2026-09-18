import { any, regex, type Parser } from "@mkbabb/parse-that/core";

import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.js";

type DimensionFamily =
    | "length"
    | "angle"
    | "time"
    | "frequency"
    | "resolution"
    | "flex";

type KnownUnit = {
    family: DimensionFamily;
    unit: string;
};

type KnownDimension = {
    kind: "dimension";
    family: DimensionFamily;
    number: {
        sign: "+" | "-" | null;
        type: "integer" | "number";
        value: number;
    };
    unit: string;
};

// A known spelling is usable only when the next code point cannot continue a
// CSS identifier. The negative assertion is also successful at end of input.
const identifierContinuation = regex(/[-_a-z0-9\\\u0080-\u{10ffff}]/iu);
const completeIdentifier = identifierContinuation.not();

const inFamily = (
    family: DimensionFamily,
    spelling: RegExp,
): Parser<KnownUnit> => regex(spelling)
    .skip(completeIdentifier)
    .map((unit) => ({ family, unit: unit.toLowerCase() }));

const knownUnit = any(
    inFamily(
        "length",
        /(?:cqmin|cqmax|cq[whib]|[sld]vmin|[sld]vmax|[sld]v[whib]|vmin|vmax|v[whib]|rcap|rch|ric|rlh|rex|rem|cap|ch|ic|lh|ex|em|px|cm|mm|in|pc|pt|q)/i,
    ),
    inFamily("angle", /(?:grad|turn|deg|rad)/i),
    inFamily("time", /(?:ms|s)/i),
    inFamily("frequency", /(?:khz|hz)/i),
    inFamily("resolution", /(?:dppx|dpcm|dpi|x)/i),
    inFamily("flex", /fr/i),
);

export const knownDimension: Parser<KnownDimension> = consumeNumber
    .then(knownUnit)
    .map(([number, { family, unit }]) => ({
        kind: "dimension",
        family,
        number,
        unit,
    }));
