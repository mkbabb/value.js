import { string } from "@mkbabb/parse-that/core";

import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.ts";

export const percentageLiteral = consumeNumber
    .skip(string("%"))
    .map((number) => ({ kind: "percentage" as const, number }));
