import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { ParserState, type Parser } from "@mkbabb/parse-that/core";

type ErrorKind = null | "unexpected-eof";
type Candidate = {
    cssEscape: Parser<{ value: string; error: ErrorKind }>;
    cssIdentifier: Parser<{ value: string; error: ErrorKind }>;
    cssString: Parser<{
        value: string;
        quote: "\"" | "'";
        error: null | "unexpected-eof" | "newline";
    }>;
    cssWhitespace: Parser<string>;
    cssComment: Parser<{ error: ErrorKind }>;
};

type Fixtures = Record<string, Array<Record<string, unknown>>>;

const seat = process.argv[2];
assert.match(seat ?? "", /^(h|b|s)$/u, "usage: tsx evaluate.mts <h|b|s>");

const candidate = await import(`./candidates/${seat}/index.ts`) as Candidate;
const fixtures = JSON.parse(readFileSync(
    new URL("../foundation-g2/fixtures.json", import.meta.url),
    "utf8",
)) as Fixtures;

let successTransactions = 0;
let failureTransactions = 0;

for (const row of fixtures.escape) {
    const state = candidate.cssEscape.parseState(row.source as string);
    assert.equal(state.isError, false);
    assert.equal(state.offset, row.offset);
    assert.deepEqual(state.value, { value: row.value, error: row.error });
    successTransactions += 1;
}

for (const row of fixtures.identifier) {
    const state = candidate.cssIdentifier.parseState(row.source as string);
    assert.equal(state.isError, false);
    assert.equal(state.offset, row.offset);
    assert.deepEqual(state.value, { value: row.value, error: row.error });
    successTransactions += 1;
}

for (const row of fixtures.string) {
    const state = candidate.cssString.parseState(row.source as string);
    assert.equal(state.isError, false);
    assert.equal(state.offset, row.offset);
    assert.deepEqual(state.value, {
        value: row.value,
        quote: row.quote,
        error: row.error,
    });
    successTransactions += 1;
}

const whitespaceCases = [
    [" ", 1, " "],
    ["\t\r\n\fX", 4, "\t\n\n"],
    ["\rX", 1, "\n"],
] as const;
for (const [source, offset, value] of whitespaceCases) {
    const state = candidate.cssWhitespace.parseState(source);
    assert.equal(state.isError, false);
    assert.equal(state.offset, offset);
    assert.equal(state.value, value);
    successTransactions += 1;
}

const commentCases = [
    ["/**/x", 4, null],
    ["/*a*/b*/", 5, null],
    ["/*a", 3, "unexpected-eof"],
    ["/*", 2, "unexpected-eof"],
] as const;
for (const [source, offset, error] of commentCases) {
    const state = candidate.cssComment.parseState(source);
    assert.equal(state.isError, false);
    assert.equal(state.offset, offset);
    assert.deepEqual(state.value, { error });
    successTransactions += 1;
}

const failures: Array<[Parser<unknown>, string]> = [
    [candidate.cssEscape, "\\\n"],
    [candidate.cssEscape, "\\\r"],
    [candidate.cssEscape, "\\\f"],
    [candidate.cssIdentifier, ""],
    [candidate.cssIdentifier, "1x"],
    [candidate.cssIdentifier, "-"],
    [candidate.cssString, "plain"],
    [candidate.cssWhitespace, "x"],
    [candidate.cssComment, "x"],
];

for (const [parser, source] of failures) {
    const predecessor = { source };
    const state = new ParserState<unknown>(source, predecessor);
    parser.call(state);
    assert.equal(state.isError, true, source);
    assert.equal(state.offset, 0, `failure offset: ${JSON.stringify(source)}`);
    assert.equal(state.value, predecessor);
    failureTransactions += 1;
}

function isRawNameStart(codePoint: number): boolean {
    return codePoint === 0x00
        || codePoint === 0x5c
        || codePoint === 0x5f
        || (codePoint >= 0x41 && codePoint <= 0x5a)
        || (codePoint >= 0x61 && codePoint <= 0x7a)
        || (codePoint >= 0xd800 && codePoint <= 0xdfff)
        || codePoint === 0x00b7
        || (codePoint >= 0x00c0 && codePoint <= 0x00d6)
        || (codePoint >= 0x00d8 && codePoint <= 0x00f6)
        || (codePoint >= 0x00f8 && codePoint <= 0x037d)
        || (codePoint >= 0x037f && codePoint <= 0x1fff)
        || codePoint === 0x200c
        || codePoint === 0x200d
        || codePoint === 0x203f
        || codePoint === 0x2040
        || (codePoint >= 0x2070 && codePoint <= 0x218f)
        || (codePoint >= 0x2c00 && codePoint <= 0x2fef)
        || (codePoint >= 0x3001 && codePoint <= 0xd7ff)
        || (codePoint >= 0xf900 && codePoint <= 0xfdcf)
        || (codePoint >= 0xfdf0 && codePoint <= 0xfffd)
        || codePoint >= 0x10000;
}

let unicodeTransactions = 0;
for (let codePoint = 0; codePoint <= 0x10ffff; codePoint += 1) {
    const source = String.fromCodePoint(codePoint);
    const state = candidate.cssIdentifier.eof().parseState(source);
    assert.equal(!state.isError, isRawNameStart(codePoint), `raw U+${codePoint.toString(16)}`);
    unicodeTransactions += 1;
}

const hostile = [
    "\\", "\\0", "\\D800", "\\110000", "\\\r\n", "--", "-\\", "\0",
    "\ud800", "\udfff", "\ufeff", "/*", "/**", "/***/", "\"", "'", "\"\\", "'\\",
    "\"\n", "'\r", " \t\r\n\f", "/*a*/ /*b*/", "/*a*/ /*b",
];
const hostileParsers = [
    candidate.cssEscape,
    candidate.cssIdentifier,
    candidate.cssString,
    candidate.cssWhitespace,
    candidate.cssComment,
] as const;

let hostileCalls = 0;
for (let iteration = 0; iteration < 2_000; iteration += 1) {
    for (const source of hostile) {
        for (const parser of hostileParsers) {
            assert.doesNotThrow(() => parser.parseState(source));
            hostileCalls += 1;
        }
    }
}

process.stdout.write(`${JSON.stringify({
    seat,
    verdict: "PASS",
    successTransactions,
    failureTransactions,
    unicodeTransactions,
    hostileCalls,
}, null, 2)}\n`);

