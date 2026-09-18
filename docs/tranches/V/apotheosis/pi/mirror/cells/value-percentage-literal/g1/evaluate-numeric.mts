import assert from "node:assert/strict";

import { ParserState } from "@mkbabb/parse-that/core";

import { consumeNumber as accepted } from "../../../apotheosis/grammar/css/l4/value-unit/numeric.ts";
import { consumeNumber as candidate } from "./candidates/h3/value-unit.ts";

const alphabet = ["+", "-", ".", "e", "E", "0", "1", "5", "9", "%", "x"];
const sources = new Set([
    "0", "-0", "+12", ".5", "-.5", "1.25e2", "1e+", "1.2.3", "5e-324", "1e309", "x",
]);

for (const a of alphabet) {
    sources.add(a);
    for (const b of alphabet) {
        sources.add(a + b);
        for (const c of alphabet) sources.add(a + b + c);
    }
}

let transactions = 0;
for (const source of sources) {
    for (const prefix of ["", "xx"]) {
        const input = prefix + source;
        const start = prefix.length;
        const predecessor = { source };
        const left = new ParserState(input, predecessor, start);
        const right = new ParserState(input, predecessor, start);
        accepted.call(left);
        candidate.call(right);
        assert.equal(right.isError, left.isError, input);
        assert.equal(right.offset, left.offset, input);
        if (!left.isError) {
            assert.deepEqual(right.value, left.value, input);
            if (Object.is(left.value.value, -0)) assert.equal(Object.is(right.value.value, -0), true, input);
        }
        transactions += 1;
    }
}

console.log(JSON.stringify({ status: "PASS", sources: sources.size, transactions }));
