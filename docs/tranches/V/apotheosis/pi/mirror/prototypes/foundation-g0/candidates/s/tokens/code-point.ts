import { Parser, any, eof, regex, string } from "@mkbabb/parse-that/core";

const replacement = "\uFFFD";

const decodePreprocessedCodePoint = (value: string): string => {
    const codePoint = value.codePointAt(0);
    return codePoint === undefined
        || codePoint === 0
        || codePoint > 0x10ffff
        || codePoint >= 0xd800 && codePoint <= 0xdfff
        ? replacement
        : String.fromCodePoint(codePoint);
};

const decodeHexEscape = (value: string): string => {
    const digits = /^[0-9a-f]{1,6}/i.exec(value)?.[0] ?? "0";
    const codePoint = Number.parseInt(digits, 16);
    return codePoint === 0
        || codePoint > 0x10ffff
        || codePoint >= 0xd800 && codePoint <= 0xdfff
        ? replacement
        : String.fromCodePoint(codePoint);
};

const hexEscapeBody = regex(/[0-9a-f]{1,6}(?:\r\n|[\t\n\f\r ])?/i).map(decodeHexEscape);
const escapedCodePoint = regex(/[^\n\r\f]/u).map(decodePreprocessedCodePoint);
const escapedEof = eof().map(() => replacement);

export const cssEscape = string("\\").next(
    Parser.lazy(() => any(hexEscapeBody, escapedCodePoint, escapedEof)),
);

const asciiNameCodePoint = regex(/[A-Za-z0-9_-]/);
const preprocessedNonAsciiNameCodePoint = regex(/\0|[^\0-\x7f]/u)
    .map(decodePreprocessedCodePoint);

export const cssNameCodePoint = Parser.lazy(() => any(
    cssEscape,
    asciiNameCodePoint,
    preprocessedNonAsciiNameCodePoint,
));

export const cssNameStartCodePoint = Parser.lazy(() => any(
    cssEscape,
    regex(/[A-Za-z_]/),
    preprocessedNonAsciiNameCodePoint,
));
