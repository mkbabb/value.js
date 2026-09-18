import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

import { any, ParserState, string, type Parser } from "@mkbabb/parse-that/core";

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
    cssSpacing: Parser<{ errors: readonly "unexpected-eof-comment"[] }>;
};

type Fixtures = Record<string, Array<Record<string, unknown>>>;

const seat = process.argv[2];
assert.match(seat ?? "", /^(h|b|s)$/u, "usage: tsx evaluate.mts <h|b|s>");

const entry = seat === "h" ? "./candidates/h/src/index.ts" : `./candidates/${seat}/index.ts`;
const candidate = await import(entry) as Candidate;
const fixtures = JSON.parse(readFileSync(new URL("./fixtures.json", import.meta.url), "utf8")) as Fixtures;

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

for (const row of fixtures.spacing) {
    const state = candidate.cssSpacing.parseState(row.source as string);
    assert.equal(state.isError, false);
    assert.equal(state.offset, row.offset);
    assert.deepEqual(state.value, { errors: row.errors });
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
    [candidate.cssSpacing, ""],
    [candidate.cssSpacing, "x"],
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

const spacingComposition = candidate.cssSpacing.skip(string("x")).eof();
assert.deepEqual(spacingComposition.parse(" /*a*/x"), { errors: [] });
const alternative = any(candidate.cssSpacing, string("x")).parseState("x");
assert.equal(alternative.isError, false);
assert.equal(alternative.offset, 1);
assert.equal(alternative.value, "x");
successTransactions += 2;

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
    candidate.cssSpacing,
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

function timed(parser: Parser<unknown>, source: string): number {
    const start = performance.now();
    const state = parser.parseState(source);
    const elapsed = performance.now() - start;
    assert.equal(state.isError, false);
    assert.equal(state.offset, source.length);
    return elapsed;
}

const scale = {
    identifier100k: timed(candidate.cssIdentifier, "a".repeat(100_000)),
    identifier200k: timed(candidate.cssIdentifier, "a".repeat(200_000)),
    whitespace100k: timed(candidate.cssWhitespace, " ".repeat(100_000)),
    whitespace200k: timed(candidate.cssWhitespace, " ".repeat(200_000)),
    comment100k: timed(candidate.cssComment, `/*${"a".repeat(100_000)}*/`),
    comment200k: timed(candidate.cssComment, `/*${"a".repeat(200_000)}*/`),
    string100k: timed(candidate.cssString, `"${"a".repeat(100_000)}"`),
    string200k: timed(candidate.cssString, `"${"a".repeat(200_000)}"`),
};

for (const prefix of ["identifier", "whitespace", "comment", "string"] as const) {
    const small = scale[`${prefix}100k`];
    const large = scale[`${prefix}200k`];
    assert.ok(large < Math.max(5_000, small * 4 + 25), `${prefix} scaling ${small} -> ${large}`);
}

process.stdout.write(`${JSON.stringify({
    seat,
    verdict: "PASS",
    successTransactions,
    failureTransactions,
    unicodeTransactions,
    hostileCalls,
    scale,
}, null, 2)}\n`);
