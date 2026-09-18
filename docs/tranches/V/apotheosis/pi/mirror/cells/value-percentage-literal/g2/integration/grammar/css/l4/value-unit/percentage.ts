import { string } from "@mkbabb/parse-that/core";

import { consumeNumber } from "./numeric.js";

export const percentageLiteral = consumeNumber
    .skip(string("%"))
    .map((number) => ({ kind: "percentage" as const, number }));
