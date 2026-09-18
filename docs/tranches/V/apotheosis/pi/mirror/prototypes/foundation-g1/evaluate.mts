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

type Unit = { unit: string; family: string };
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
    classifyCssUnit(unit: string): Unit | null;
};

const candidatePath = process.argv[2];
assert(candidatePath, "usage: tsx evaluate.mts <candidate-index.ts>");

const candidate = await import(pathToFileURL(candidatePath).href) as Candidate;
const baseline = JSON.parse(await readFile(new URL("../foundation-g0/fixtures.json", import.meta.url), "utf8"));
const correction = JSON.parse(await readFile(new URL("./fixtures.json", import.meta.url), "utf8"));
const erratum = JSON.parse(await readFile(new URL("./fixtures-erratum-01.json", import.meta.url), "utf8"));
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

for (const name of required) assert(candidate[name], `missing export ${name}`);
assert.equal(typeof candidate.classifyCssUnit, "function");

let successes = 0;
let failures = 0;

function success(parser: ParserLike, input: string, value: unknown, offset: number): void {
    const direct = parser.parseState(input);
    assert.equal(direct.isError, false, `expected success: ${JSON.stringify(input)}`);
    assert.equal(direct.offset, offset, `wrong offset: ${JSON.stringify(input)}`);
    if (value !== undefined) assert.deepEqual(direct.value, value, `wrong value: ${JSON.stringify(input)}`);

    const prefix = "😀@@";
    const state = new ParserState<unknown>(prefix + input, { before: input }, prefix.length, false, prefix.length);
    assert.equal(parser.call(state), state);
    assert.equal(state.isError, false, `nonzero failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, prefix.length + offset, `nonzero offset: ${JSON.stringify(input)}`);
    if (value !== undefined) assert.deepEqual(state.value, value, `nonzero value: ${JSON.stringify(input)}`);
    successes += 2;
}

function failure(parser: ParserLike, input: string, minimumFurthest = 0): void {
    const direct = parser.parseState(input);
    assert.equal(direct.isError, true, `expected failure: ${JSON.stringify(input)}`);
    assert.equal(direct.offset, 0, `failure consumed input: ${JSON.stringify(input)}`);
    assert(direct.furthest >= minimumFurthest, `lost furthest progress: ${JSON.stringify(input)}`);

    const prefix = "😀@@";
    const state = new ParserState<unknown>(prefix + input, { before: input }, prefix.length, false, prefix.length);
    candidate.cssTrivia.parseState("");
    parser.call(state);
    assert.equal(state.isError, true, `expected nonzero failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, prefix.length, `nonzero failure consumed: ${JSON.stringify(input)}`);
    assert(state.furthest >= prefix.length + minimumFurthest, `nonzero furthest lost: ${JSON.stringify(input)}`);
    failures += 2;
}

for (const [input, value, offset] of baseline.escapeSuccess) success(candidate.cssEscape, input, value, offset);
for (const input of baseline.escapeFailure) failure(candidate.cssEscape, input, 1);

for (const [input, value, offset] of [
    ["a", "a", 1], ["9", "9", 1], ["-", "-", 1], ["😀", "😀", 2],
    ["\0", "�", 1], ["\ud800", "�", 1], ["\\61 ", "a", 4],
] as const) success(candidate.cssNameCodePoint, input, value, offset);
for (const input of baseline.escapeFailure) failure(candidate.cssNameCodePoint, input, 1);

for (const [input, value, offset] of baseline.identifierSuccess) success(candidate.cssIdentifier, input, value, offset);
for (const input of baseline.identifierFailure) failure(candidate.cssIdentifier, input, input.startsWith("-") ? 1 : 0);
for (const [input, value, offset] of correction.rawIdentifierAllowed) success(candidate.cssIdentifier, input, value, offset);
for (const [input, value, offset] of erratum.addRawIdentifierAllowed) success(candidate.cssIdentifier, input, value, offset);
for (const input of correction.rawIdentifierExcluded.filter(
    (value: string) => !erratum.removeRawIdentifierExcluded.includes(value),
)) failure(candidate.cssIdentifier, input);
for (const [input, value, offset] of correction.escapedIdentifierAllowed) success(candidate.cssIdentifier, input, value, offset);

for (const [input, offset] of baseline.whitespaceSuccess) success(candidate.cssWhitespace, input, undefined, offset);
for (const [input, offset] of baseline.commentSuccess) success(candidate.cssComment, input, undefined, offset);
for (const [input, offset] of baseline.triviaSuccess) success(candidate.cssTrivia, input, undefined, offset);
failure(candidate.cssWhitespace, "x");
failure(candidate.cssComment, "/ x");

for (const [input, value, offset] of baseline.stringSuccess) success(candidate.cssString, input, value, offset);
for (const input of baseline.stringFailure) failure(candidate.cssString, input, 2);
for (const [input, value, offset] of correction.stringDecodedEscapes) success(candidate.cssString, input, value, offset);
for (const [input, value, offset] of [
    ["\"\\\"", "\"", 3],
    ["'\\'", "'", 3],
    ["\"\\\"\"", "\"", 4],
    ["'\\''", "'", 4],
] as const) success(candidate.cssString, input, value, offset);

for (const [input, value, offset] of baseline.percentageSuccess) success(candidate.cssPercentage, input, value, offset);
for (const input of baseline.percentageFailure) failure(candidate.cssPercentage, input, /^\d/.test(input) ? 1 : 0);

for (const [input, value, offset] of baseline.dimensionSuccess) success(candidate.cssDimension, input, value, offset);
for (const input of baseline.dimensionFailure) failure(candidate.cssDimension, input, input.startsWith("1") ? 1 : 0);
for (const [input, unit, family, offset] of correction.dimensionBoundary) {
    const state = candidate.cssDimension.parseState(input);
    assert.equal(state.isError, false, `dimension boundary failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, offset, `dimension boundary offset: ${JSON.stringify(input)}`);
    assert.equal((state.value as any).unit, unit);
    assert.equal((state.value as any).family, family);
    successes += 1;
}
for (const [input, unit, family, offset] of erratum.addDimensionBoundary) {
    const state = candidate.cssDimension.parseState(input);
    assert.equal(state.isError, false, `dimension erratum failure: ${JSON.stringify(input)}`);
    assert.equal(state.offset, offset, `dimension erratum offset: ${JSON.stringify(input)}`);
    assert.equal((state.value as any).unit, unit);
    assert.equal((state.value as any).family, family);
    successes += 1;
}
for (const input of correction.dimensionFailure.filter(
    (value: string) => !erratum.removeDimensionFailure.includes(value),
)) failure(candidate.cssDimension, input, 1);

let unitCount = 0;
for (const [family, units] of Object.entries(baseline.units) as Array<[string, string[]]>) {
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

for (const unit of correction.mutationProbeUnits as string[]) {
    const first = candidate.classifyCssUnit(unit);
    const second = candidate.classifyCssUnit(unit);
    assert(first !== null && second !== null);
    assert.notEqual(first, second, `classification object reused: ${unit}`);
    (first as any).unit = "poison";
    (first as any).family = "poison";
    assert.deepEqual(candidate.classifyCssUnit(unit), second, `classification poisoned: ${unit}`);
}

const dimensionFirst = candidate.cssDimension.parseState("1px");
assert.equal(dimensionFirst.isError, false);
(dimensionFirst.value as any).unit = "poison";
(dimensionFirst.value as any).number.value = 999;
assert.deepEqual(candidate.cssDimension.parseState("1px").value, {
    kind: "dimension",
    number: { sign: null, type: "integer", value: 1 },
    unit: "px",
    family: "length",
});

const parent = candidate.cssDimension.skip(string(",")).skip(candidate.cssPercentage).skip(string("!"));
const parentState = parent.parseState("1px,25%!");
assert.equal(parentState.isError, false);
assert.equal(parentState.offset, 8);

const ids = new Map(required.map((name) => [name, candidate[name].id]));
for (let index = 0; index < 5_000; index += 1) {
    candidate.cssIdentifier.parseState(`--item-${index}`);
    candidate.cssDimension.parseState(`${index}px`);
    candidate.cssString.parseState(`"item-${index}"`);
}
for (const [name, id] of ids) assert.equal(candidate[name].id, id, `${name} parser identity changed`);

let hostileCalls = 0;
let seed = 0x9e3779b9;
const alphabet = ["a", "-", "\\", "\n", "\r", "\f", "\0", "\u0080", "\u00b7", "\u200e", "😀", "1", "%", "\""];
for (let row = 0; row < 20_000; row += 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const length = seed % 25;
    let input = "";
    for (let index = 0; index < length; index += 1) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        input += alphabet[seed % alphabet.length];
    }
    for (const name of required) {
        assert.doesNotThrow(() => candidate[name].parseState(input));
        hostileCalls += 1;
    }
}

for (const [parser, input] of [
    [candidate.cssIdentifier, `a${"x".repeat(1_000_000)}`],
    [candidate.cssComment, `/*${"x".repeat(1_000_000)}`],
    [candidate.cssString, `"${"x".repeat(1_000_000)}`],
    [candidate.cssDimension, `${"9".repeat(1_000_000)}px`],
] as Array<[ParserLike, string]>) assert.doesNotThrow(() => parser.parseState(input));

process.stdout.write(`${JSON.stringify({
    candidate: candidatePath,
    status: "PASS",
    successes,
    failures,
    unitCount,
    hostileCalls,
})}\n`);
