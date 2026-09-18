import { any, eof, regex, string } from "@mkbabb/parse-that/core";

const REPLACEMENT = "\uFFFD";

export const cssNewline = regex(/\r\n|[\n\r\f]/).map(() => "\n");

export const decodePreprocessedCodePoint = (raw: string): string => {
    const codeUnit = raw.charCodeAt(0);
    return raw === "\0" || (raw.length === 1 && codeUnit >= 0xd800 && codeUnit <= 0xdfff)
        ? REPLACEMENT
        : raw;
};

const optionalEscapeWhitespace = regex(/\r\n|[ \t\n\r\f]/).opt();

const escapedHex = string("\\")
    .next(regex(/[0-9A-Fa-f]{1,6}/))
    .skip(optionalEscapeWhitespace)
    .map((digits) => {
        const value = Number.parseInt(digits, 16);
        return value === 0 || value > 0x10ffff || (value >= 0xd800 && value <= 0xdfff)
            ? REPLACEMENT
            : String.fromCodePoint(value);
    });

const escapedCodePoint = string("\\")
    .next(regex(/[^0-9A-Fa-f\n\r\f]/u))
    .map(decodePreprocessedCodePoint);

const escapedEof = string("\\").skip(eof()).map(() => REPLACEMENT);

export const cssEscape = any(escapedHex, escapedCodePoint, escapedEof);

const asciiName = regex(/[A-Za-z0-9_-]/);
const preprocessedNul = regex(/\0/).map(() => REPLACEMENT);
const nonAsciiName = regex(/[\u0080-\u{10ffff}]/u).map(decodePreprocessedCodePoint);

export const cssNameStartCodePoint = any(
    regex(/[A-Za-z_]/),
    preprocessedNul,
    nonAsciiName,
);

export const cssNameCodePoint = any(cssEscape, asciiName, preprocessedNul, nonAsciiName);
