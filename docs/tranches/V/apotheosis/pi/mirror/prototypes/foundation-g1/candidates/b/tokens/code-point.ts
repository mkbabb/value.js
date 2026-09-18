import { any, eof, regex, string } from "@mkbabb/parse-that/core";

const REPLACEMENT = "\uFFFD";

const rawNameCodePoint = regex(
    /[\0\uD800-\uDFFFA-Za-z0-9_\-\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}]/u,
).map(preprocessRawCodePoint);

const escapeWhitespace = regex(/(?:\r\n|[ \t\n\r\f])/u);
const hexadecimalEscape = regex(/[0-9A-Fa-f]{1,6}/u)
    .skip(escapeWhitespace.opt())
    .map((digits) => escapedScalar(Number.parseInt(digits, 16)));
const ordinaryEscape = regex(/[^\n\r\f]/u).map(preprocessRawCodePoint);
const terminalEscape = eof().map(() => REPLACEMENT);

function escapedScalar(value: number): string {
    return value === 0 || value > 0x10ffff || (value >= 0xd800 && value <= 0xdfff)
        ? REPLACEMENT
        : String.fromCodePoint(value);
}

function preprocessRawCodePoint(value: string): string {
    return value === "\0" || /^[\uD800-\uDFFF]$/u.test(value) ? REPLACEMENT : value;
}

export const cssEscape = string("\\").next(any(
    hexadecimalEscape,
    ordinaryEscape,
    terminalEscape,
));

export const cssNameCodePoint = any(rawNameCodePoint, cssEscape);
