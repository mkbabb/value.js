import { string } from "@mkbabb/parse-that/core";

import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.ts";

const marker = string("%");

export const percentageLiteral = consumeNumber
    .lookAhead(marker)
    .then(marker)
    .map(([number]) => ({ kind: "percentage" as const, number }));
