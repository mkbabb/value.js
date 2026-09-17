import { string } from "@mkbabb/parse-that/core";

import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.js";

export type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};

export type CssPercentage = {
    kind: "percentage";
    number: CssNumber;
};

export const cssPercentage = consumeNumber
    .skip(string("%"))
    .map((number): CssPercentage => ({ kind: "percentage", number }));
