import {
    any,
    dispatch,
    eof,
    regex,
    string,
    type Parser,
} from "@mkbabb/parse-that/core";

export type CssEscape = {
    value: string;
    error: null | "unexpected-eof";
};

const replacementCharacter = "\uFFFD";

const preprocessReplacements = (value: string): string =>
    value.replace(/[\0\uD800-\uDFFF]/gu, replacementCharacter);

const preprocessWhitespace = (value: string): string =>
    value.replace(/\r\n?|\f/g, "\n");

const rawWhitespaceCodePoint = any(
    string("\r\n"),
    regex(/[ \t\n\r\f]/),
).map(preprocessWhitespace);

const hexDigits = regex(/[0-9A-Fa-f]{1,6}/);
const decodeEscapedHex = (digits: string): CssEscape => {
    const codePoint = Number.parseInt(digits, 16);
    const invalid =
        codePoint === 0 ||
        codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff);

    return {
        value: invalid ? replacementCharacter : String.fromCodePoint(codePoint),
        error: null,
    };
};

const escapedHex = hexDigits
    .skip(rawWhitespaceCodePoint.opt())
    .map<CssEscape>(decodeEscapedHex);

// With the Unicode flag, the surrogate class matches lone surrogate code
// points but not either half of a well-formed supplementary scalar value.
const escapedNonHex = regex(
    /(?:[^0-9A-Fa-f\n\r\f\0\uD800-\uDFFF]|[\0\uD800-\uDFFF])/u,
).map<CssEscape>((value) => ({
    value: preprocessReplacements(value),
    error: null,
}));

const wholeEscapedHex = regex(
    /\\([0-9A-Fa-f]{1,6})(?:\r\n|[ \t\n\r\f])?/,
    (match) => match?.[1] ?? null,
).map<CssEscape>(decodeEscapedHex);

const wholeEscapedNonHex = regex(
    /\\((?:[^0-9A-Fa-f\n\r\f\0\uD800-\uDFFF]|[\0\uD800-\uDFFF]))/u,
    (match) => match?.[1] ?? null,
).map<CssEscape>((value) => ({
    value: preprocessReplacements(value),
    error: null,
}));

const wholeEscapedEof = regex(/\\$/).map<CssEscape>(() => ({
    value: replacementCharacter,
    error: "unexpected-eof",
}));

const wholeCssEscape = dispatch<CssEscape>({
    "\\": any(wholeEscapedHex, wholeEscapedNonHex, wholeEscapedEof),
});

const escapedAfterBackslash = any(
    dispatch<CssEscape>({
        "0-9": escapedHex,
        "A-F": escapedHex,
        "a-f": escapedHex,
    }),
    escapedNonHex,
    eof().map<CssEscape>(() => ({
        value: replacementCharacter,
        error: "unexpected-eof",
    })),
);

// Double negation turns the compositional parse into a zero-width assertion.
// On rejection it restores the predecessor while retaining furthest progress;
// on acceptance the whole-terminal dispatch performs the single real consume.
const escapeProgressAssertion = string("\\")
    .next(escapedAfterBackslash)
    .not()
    .not();

export const cssEscape: Parser<CssEscape> = escapeProgressAssertion.next(
    wholeCssEscape,
);

