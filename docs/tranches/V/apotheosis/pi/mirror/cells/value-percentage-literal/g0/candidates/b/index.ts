import { all, string } from "@mkbabb/parse-that/core";

import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.js";

export const percentageLiteral = all(consumeNumber, string("%")).map(
    ([number]) => ({ kind: "percentage" as const, number }),
);
