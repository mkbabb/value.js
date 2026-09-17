import { ParserState } from "@mkbabb/parse-that/core";

import { percentageLiteral } from "./integration/grammar/css/l4/value-unit/percentage.ts";

const successes = [
    ["0%", 2, null, "integer", 0],
    ["-0%tail", 3, "-", "integer", -0],
    ["+12.5%", 6, "+", "number", 12.5],
    ["1e2%", 4, null, "number", 100],
    [".5%", 3, null, "number", 0.5],
] as const;

for (const [source, offset, sign, type, value] of successes) {
    const state = percentageLiteral.parseState(source);
    if (state.isError || state.offset !== offset
        || state.value.kind !== "percentage"
        || state.value.number.sign !== sign
        || state.value.number.type !== type
        || !Object.is(state.value.number.value, value)) {
        throw new Error(`success mismatch: ${source}`);
    }
}

for (const [source, furthest] of [["12x", 2], ["1e+%", 1], ["1.2.3%", 3], ["%", 0]] as const) {
    const previous = { sentinel: source };
    const state = new ParserState<unknown>(source, previous);
    percentageLiteral.call(state);
    if (!state.isError || state.offset !== 0 || state.furthest !== furthest) {
        throw new Error(`failure-state mismatch: ${source}`);
    }
}

const parent = percentageLiteral.skip(percentageLiteral).parseState("10%20%tail");
if (parent.isError || parent.offset !== 6 || parent.value.number.value !== 10) {
    throw new Error("parent composition mismatch");
}

console.log(JSON.stringify({
    status: "PASS",
    successes: successes.length,
    failures: 4,
    parentCompositions: 1,
}));
