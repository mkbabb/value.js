import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

type ParserLike = {
    parseState(input: string): {
        isError: boolean;
        offset: number;
        value: unknown;
    };
};

const candidatePath = process.argv[2];
assert(candidatePath, "usage: tsx unicode-domain.mts <candidate-index.ts>");

const candidate = await import(pathToFileURL(candidatePath).href) as {
    cssIdentifier: ParserLike;
    cssNameCodePoint: ParserLike;
};

const inRange = (value: number, start: number, end: number): boolean =>
    value >= start && value <= end;

const isRawNonAsciiIdent = (value: number): boolean =>
    value === 0x00b7
    || inRange(value, 0x00c0, 0x00d6)
    || inRange(value, 0x00d8, 0x00f6)
    || inRange(value, 0x00f8, 0x037d)
    || inRange(value, 0x037f, 0x1fff)
    || value === 0x200c
    || value === 0x200d
    || value === 0x203f
    || value === 0x2040
    || inRange(value, 0x2070, 0x218f)
    || inRange(value, 0x2c00, 0x2fef)
    || inRange(value, 0x3001, 0xd7ff)
    || inRange(value, 0xf900, 0xfdcf)
    || inRange(value, 0xfdf0, 0xfffd)
    || value >= 0x10000;

let accepted = 0;
let rejected = 0;
for (let codePoint = 0x80; codePoint <= 0x10ffff; codePoint += 1) {
    const raw = String.fromCodePoint(codePoint);
    const preprocessedSurrogate = inRange(codePoint, 0xd800, 0xdfff);
    const expected = isRawNonAsciiIdent(codePoint) || preprocessedSurrogate;
    const expectedValue = preprocessedSurrogate ? "\uFFFD" : raw;

    for (const [name, parser] of [
        ["name", candidate.cssNameCodePoint],
        ["identifier", candidate.cssIdentifier],
    ] as const) {
        const state = parser.parseState(raw);
        assert.equal(state.isError, !expected, `${name} U+${codePoint.toString(16).toUpperCase()}`);
        assert.equal(state.offset, expected ? raw.length : 0, `${name} offset U+${codePoint.toString(16).toUpperCase()}`);
        if (expected) assert.equal(state.value, expectedValue, `${name} value U+${codePoint.toString(16).toUpperCase()}`);
    }
    if (expected) accepted += 1;
    else rejected += 1;
}

for (const [input, expected] of [
    ["\0", "\uFFFD"],
    ["\\80 ", "\u0080"],
    ["\\a0 ", "\u00A0"],
    ["\\200e ", "\u200E"],
    ["\\feff ", "\uFEFF"],
    ["\\10ffff ", String.fromCodePoint(0x10ffff)],
] as const) {
    for (const [name, parser] of [
        ["name", candidate.cssNameCodePoint],
        ["identifier", candidate.cssIdentifier],
    ] as const) {
        const state = parser.parseState(input);
        assert.equal(state.isError, false, `${name} escaped ${JSON.stringify(input)}`);
        assert.equal(state.offset, input.length, `${name} escaped offset ${JSON.stringify(input)}`);
        assert.equal(state.value, expected, `${name} escaped value ${JSON.stringify(input)}`);
    }
}

process.stdout.write(`${JSON.stringify({
    candidate: candidatePath,
    status: "PASS",
    scalarDomain: 0x110000 - 0x80,
    accepted,
    rejected,
    parserTransactions: (0x110000 - 0x80) * 2 + 12,
})}\n`);
