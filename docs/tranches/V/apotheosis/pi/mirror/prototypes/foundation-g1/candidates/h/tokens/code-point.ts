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
const preprocessedLoneSurrogate = regex(/[\uD800-\uDFFF]/u).map(() => REPLACEMENT);
const nonAsciiName = regex(/[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}]/u);

export const cssNameStartCodePoint = any(
    regex(/[A-Za-z_]/),
    preprocessedNul,
    preprocessedLoneSurrogate,
    nonAsciiName,
);

export const cssNameCodePoint = any(
    cssEscape,
    asciiName,
    preprocessedNul,
    preprocessedLoneSurrogate,
    nonAsciiName,
);
