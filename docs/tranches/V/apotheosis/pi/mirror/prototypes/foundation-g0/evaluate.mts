import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import { ParserState, string } from "@mkbabb/parse-that/core";

type ParserLike = {
    id: number;
    call(state: ParserState<unknown>): ParserState<unknown>;
    parseState(input: string): ParserState<unknown>;
    skip(parser: any): ParserLike;
};

type Candidate = {
    cssEscape: ParserLike;
    cssNameCodePoint: ParserLike;
    cssWhitespace: ParserLike;
    cssComment: ParserLike;
    cssTrivia: ParserLike;
    cssIdentifier: ParserLike;
    cssString: ParserLike;
    cssPercentage: ParserLike;
    cssDimension: ParserLike;
    classifyCssUnit(unit: string): { unit: string; family: string } | null;
};

const candidatePath = process.argv[2];
assert(candidatePath, "usage: tsx evaluate.mts <candidate-index.ts>");

const candidate = await import(pathToFileURL(candidatePath).href) as Candidate;
const fixtures = JSON.parse(await readFile(new URL("./fixtures.json", import.meta.url), "utf8"));
const required = [
    "cssEscape",
    "cssNameCodePoint",
    "cssWhitespace",
    "cssComment",
    "cssTrivia",
    "cssIdentifier",
    "cssString",
    "cssPercentage",
    "cssDimension",
] as const;

for (const name of required) {
    assert(candidate[name], `missing export ${name}`);
}
assert.equal(typeof candidate.classifyCssUnit, "function");

let successTransactions = 0;
let failureTransactions = 0;

function success(parser: ParserLike, input: string, value: unknown, offset: number): void {
    const direct = parser.parseState(input);
    assert.equal(direct.isError, false, `expected success: ${JSON.stringify(input)}`);
    assert.equal(direct.offset, offset, `wrong offset: ${JSON.stringify(input)}`);
    if (value !== undefined) assert.deepEqual(direct.value, value, `wrong value: ${JSON.stringify(input)}`);
    successTransactions += 1;

    const prefix = "😀@@";
    const predecessor = { predecessor: input };
    const state = new ParserState<unknown>(prefix + input, predecessor, prefix.length, false, prefix.length);
    const returned = parser.call(state);
    assert.equal(returned, state);
    assert.equal(state.isError, false, `nonzero failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, prefix.length + offset, `nonzero offset: ${JSON.stringify(input)}`);
    if (value !== undefined) assert.deepEqual(state.value, value, `nonzero value: ${JSON.stringify(input)}`);
    successTransactions += 1;
}

function failure(parser: ParserLike, input: string): void {
    const direct = parser.parseState(input);
    assert.equal(direct.isError, true, `expected failure: ${JSON.stringify(input)}`);
    assert.equal(direct.offset, 0, `failure consumed input: ${JSON.stringify(input)}`);
    failureTransactions += 1;

    const prefix = "😀@@";
    const predecessor = { predecessor: input };
    const state = new ParserState<unknown>(prefix + input, predecessor, prefix.length, false, prefix.length);
    candidate.cssTrivia.parseState(""); // exercise another singleton between construction and call
    parser.call(state);
    assert.equal(state.isError, true, `expected nonzero failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, prefix.length, `nonzero failure consumed: ${JSON.stringify(input)}`);
    // parse-that 1.0.0 restores aggregate input offsets but does not promise
    // predecessor-value restoration. Failed values are non-authoritative.
    assert(state.furthest >= prefix.length, `furthest regressed: ${JSON.stringify(input)}`);
    failureTransactions += 1;
}

for (const [input, value, offset] of fixtures.escapeSuccess) success(candidate.cssEscape, input, value, offset);
for (const input of fixtures.escapeFailure) failure(candidate.cssEscape, input);

for (const [input, value, offset] of [
    ["a", "a", 1],
    ["9", "9", 1],
    ["-", "-", 1],
    ["😀", "😀", 2],
    ["\0", "�", 1],
    ["\ud800", "�", 1],
    ["\\61 ", "a", 4],
] as const) success(candidate.cssNameCodePoint, input, value, offset);
for (const input of fixtures.escapeFailure) failure(candidate.cssNameCodePoint, input);

for (const [input, value, offset] of fixtures.identifierSuccess) success(candidate.cssIdentifier, input, value, offset);
for (const input of fixtures.identifierFailure) failure(candidate.cssIdentifier, input);

for (const [input, offset] of fixtures.whitespaceSuccess) success(candidate.cssWhitespace, input, undefined, offset);
for (const [input, offset] of fixtures.commentSuccess) success(candidate.cssComment, input, undefined, offset);
for (const [input, offset] of fixtures.triviaSuccess) success(candidate.cssTrivia, input, undefined, offset);
failure(candidate.cssWhitespace, "x");
failure(candidate.cssComment, "/ x");

for (const [input, value, offset] of fixtures.stringSuccess) success(candidate.cssString, input, value, offset);
for (const input of fixtures.stringFailure) failure(candidate.cssString, input);

for (const [input, value, offset] of fixtures.percentageSuccess) success(candidate.cssPercentage, input, value, offset);
for (const input of fixtures.percentageFailure) failure(candidate.cssPercentage, input);

for (const [input, value, offset] of fixtures.dimensionSuccess) success(candidate.cssDimension, input, value, offset);
for (const input of fixtures.dimensionFailure) failure(candidate.cssDimension, input);

let unitCount = 0;
for (const [family, units] of Object.entries(fixtures.units) as Array<[string, string[]]>) {
    for (const unit of units) {
        assert.deepEqual(candidate.classifyCssUnit(unit.toUpperCase()), { unit, family });
        const parsed = candidate.cssDimension.parseState(`1${unit.toUpperCase()}!`);
        assert.equal(parsed.isError, false);
        assert.equal(parsed.offset, unit.length + 1);
        assert.deepEqual(parsed.value, {
            kind: "dimension",
            number: { sign: null, type: "integer", value: 1 },
            unit,
            family,
        });
        unitCount += 1;
    }
}
assert.equal(unitCount, 62);
assert.equal(candidate.classifyCssUnit("unknown"), null);

const parent = candidate.cssDimension
    .skip(string(","))
    .skip(candidate.cssPercentage)
    .skip(string("!"));
const parentState = parent.parseState("1px,25%!");
assert.equal(parentState.isError, false);
assert.equal(parentState.offset, 8);

const ids = new Map(required.map((name) => [name, candidate[name].id]));
for (let index = 0; index < 2_000; index += 1) {
    candidate.cssIdentifier.parseState(`--item-${index}`);
    candidate.cssDimension.parseState(`${index}px`);
    candidate.cssString.parseState(`"item-${index}"`);
}
for (const [name, id] of ids) assert.equal(candidate[name].id, id, `${name} parser identity changed`);

for (const [parser, input] of [
    [candidate.cssIdentifier, `a${"x".repeat(100_000)}`],
    [candidate.cssComment, `/*${"x".repeat(100_000)}`],
    [candidate.cssString, `"${"x".repeat(100_000)}`],
    [candidate.cssDimension, `${"9".repeat(100_000)}px`],
] as Array<[ParserLike, string]>) {
    assert.doesNotThrow(() => parser.parseState(input));
}

process.stdout.write(`${JSON.stringify({
    candidate: candidatePath,
    status: "PASS",
    successTransactions,
    failureTransactions,
    unitCount,
})}\n`);
