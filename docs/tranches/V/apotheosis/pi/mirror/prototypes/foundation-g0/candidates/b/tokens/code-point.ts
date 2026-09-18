import { regex } from "@mkbabb/parse-that/core";

const hexEscape = String.raw`\\[0-9A-Fa-f]{1,6}(?:\r\n|[ \t\n\r\f])?`;
const simpleEscape = String.raw`\\[^\n\r\f]`;
const eofEscape = String.raw`\\$`;

export const escapeSource = String.raw`(?:${hexEscape}|${simpleEscape}|${eofEscape})`;
const nonAsciiOrReplacementSource = String.raw`[\0\u0080-\u{10FFFF}]`;
export const nameStartSource = String.raw`(?:[A-Za-z_]|${nonAsciiOrReplacementSource}|${escapeSource})`;
export const nameCodePointSource = String.raw`(?:[A-Za-z0-9_-]|${nonAsciiOrReplacementSource}|${escapeSource})`;

const escapeValue = /^\\([0-9A-Fa-f]{1,6})(?:\r\n|[ \t\n\r\f])?$/u;
const loneSurrogate = /[\uD800-\uDFFF]/gu;

function scalar(value: number): string {
    return value === 0 || value > 0x10ffff || (value >= 0xd800 && value <= 0xdfff)
        ? "\uFFFD"
        : String.fromCodePoint(value);
}

export function preprocessCodePoints(value: string): string {
    return value
        .replace(/\r\n|[\r\f]/gu, "\n")
        .replace(/\0/gu, "\uFFFD")
        .replace(loneSurrogate, "\uFFFD");
}

export function decodeEscape(value: string): string {
    const hexadecimal = escapeValue.exec(value);
    if (hexadecimal !== null) {
        return scalar(Number.parseInt(hexadecimal[1]!, 16));
    }

    return value.length === 1 ? "\uFFFD" : preprocessCodePoints(value.slice(1));
}

const escapeOccurrence = new RegExp(escapeSource, "gu");

export function decodeName(value: string): string {
    return preprocessCodePoints(value.replace(escapeOccurrence, decodeEscape));
}

export const cssEscape = regex(new RegExp(escapeSource, "u")).map(decodeEscape);

export const cssNameCodePoint = regex(new RegExp(nameCodePointSource, "u")).map(decodeName);
