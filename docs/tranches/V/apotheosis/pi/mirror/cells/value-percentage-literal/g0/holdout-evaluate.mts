import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

import { ParserState } from "@mkbabb/parse-that/core";

import cases from "./holdout-reveal.json" with { type: "json" };

const candidatePaths = process.argv.slice(2);

if (candidatePaths.length === 0) {
    throw new Error("usage: tsx holdout-evaluate.mts <candidate-module>...");
}

const results = [];

for (const candidatePath of candidatePaths) {
    const candidate = await import(pathToFileURL(candidatePath).href);
    const parser = candidate.percentageLiteral;

    assert.equal(typeof parser?.call, "function");

    for (const [source, offset, value] of cases.success) {
        const state = parser.parseState(source);
        assert.equal(state.isError, false, `${candidatePath}: ${source}`);
        assert.equal(state.offset, offset, `${candidatePath}: ${source}`);
        if (source === "-0%") {
            assert.deepEqual(
                { ...state.value, number: { ...state.value.number, value: 0 } },
                value,
                `${candidatePath}: ${source}`,
            );
            assert.equal(Object.is(state.value.number.value, -0), true, `${candidatePath}: ${source}`);
        } else {
            assert.deepEqual(state.value, value, `${candidatePath}: ${source}`);
        }
    }

    for (const source of cases.failure) {
        const state = new ParserState(source, { sentinel: source });
        assert.doesNotThrow(() => parser.call(state), `${candidatePath}: ${source}`);
        assert.equal(state.isError, true, `${candidatePath}: ${source}`);
        assert.equal(state.offset, 0, `${candidatePath}: ${source}`);
    }

    results.push({ candidatePath, successes: cases.success.length, failures: cases.failure.length });
}

console.log(JSON.stringify({ status: "PASS", results }, null, 2));
