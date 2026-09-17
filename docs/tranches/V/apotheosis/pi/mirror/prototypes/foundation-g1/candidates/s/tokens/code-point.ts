import { any, eof, regex, string } from "@mkbabb/parse-that/core";

const replacement = "\uFFFD";

const decodePreprocessedCodePoint = (value: string): string => {
    const codePoint = value.codePointAt(0);
    return codePoint === undefined
        || codePoint === 0
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

const hexEscapeBody = regex(/[0-9a-f]{1,6}(?:\r\n|[\t\n\f\r ])?/i)
    .map(decodeHexEscape);
const escapedCodePoint = regex(/[^\n\r\f]/u)
    .map(decodePreprocessedCodePoint);
const escapedEof = eof().map(() => replacement);

export const cssEscape = string("\\")
    .next(any(hexEscapeBody, escapedCodePoint, escapedEof));

const asciiNameCodePoint = regex(/[A-Za-z0-9_-]/);
const rawNonAsciiNameCodePoint = regex(/\0|[\uD800-\uDFFF]|[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}]/u)
    .map(decodePreprocessedCodePoint);

export const cssNameCodePoint = any(
    cssEscape,
    asciiNameCodePoint,
    rawNonAsciiNameCodePoint,
);

export const cssNameStartCodePoint = any(
    cssEscape,
    regex(/[A-Za-z_]/),
    rawNonAsciiNameCodePoint,
);
