import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

import { ParserState } from "@mkbabb/parse-that/core";

import cases from "./public-cases.json" with { type: "json" };

const candidatePath = process.argv[2];

if (candidatePath === undefined) {
    throw new Error("usage: tsx evaluate.mts <candidate-module>");
}

const candidate = await import(pathToFileURL(candidatePath).href);
const parser = candidate.percentageLiteral;

assert.equal(typeof parser?.call, "function");
const parserId = parser.id;

for (const [source, offset, value] of cases.success) {
    const state = parser.parseState(source);
    assert.equal(state.isError, false, source);
    assert.equal(state.offset, offset, source);
    assert.deepEqual(state.value, value, source);
    assert.deepEqual(Object.keys(state.value), ["kind", "number"], source);
    assert.deepEqual(Object.keys(state.value.number), ["sign", "type", "value"], source);
}

for (const source of cases.failure) {
    const predecessor = { sentinel: source };
    const state = new ParserState(source, predecessor);
    assert.doesNotThrow(() => parser.call(state), source);
    assert.equal(state.isError, true, source);
    assert.equal(state.offset, 0, source);
}

for (let index = 0; index < 1_000; index += 1) {
    parser.parseState(`${index}%`);
}

assert.equal(parser.id, parserId);
console.log(JSON.stringify({ candidate: candidatePath, status: "PASS" }));
