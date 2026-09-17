import {
    all,
    any,
    dispatch,
    regex,
    type Parser,
} from "@mkbabb/parse-that/core";

import { cssEscape, type CssEscape } from "./escape.js";

export type CssIdentifier = {
    value: string;
    error: null | "unexpected-eof";
};

const replacementCharacter = "\uFFFD";

const preprocessReplacements = (value: string): string =>
    value.replace(/[\0\uD800-\uDFFF]/gu, replacementCharacter);

const asciiName = regex(/[A-Za-z0-9_-]+/).map<CssEscape>((value) => ({
    value,
    error: null,
}));

const nonAsciiIdent = regex(
    /(?:\0|[\uD800-\uDFFF]|\u00B7|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u037D]|[\u037F-\u1FFF]|[\u200C\u200D\u203F\u2040]|[\u2070-\u218F]|[\u2C00-\u2FEF]|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[\u{10000}-\u{10FFFF}])+/u,
).map<CssEscape>((value) => ({
    value: preprocessReplacements(value),
    error: null,
}));

const namePiece = any(
    dispatch<CssEscape>({
        "A-Z": asciiName,
        "a-z": asciiName,
        "0-9": asciiName,
        "_-": asciiName,
        "\\": cssEscape,
    }),
    nonAsciiIdent,
);

// This whole-terminal prefix leaf qualifies the three-code-point start law
// before consuming the hyphen, so a rejected start preserves predecessor state.
const hyphenStart = regex(
    /-(?=-|[A-Za-z_]|(?:\0|[\uD800-\uDFFF]|\u00B7|[\u00C0-\u00D6]|[\u00D8-\u00F6]|[\u00F8-\u037D]|[\u037F-\u1FFF]|[\u200C\u200D\u203F\u2040]|[\u2070-\u218F]|[\u2C00-\u2FEF]|[\u3001-\uD7FF]|[\uF900-\uFDCF]|[\uFDF0-\uFFFD]|[\u{10000}-\u{10FFFF}])|\\(?:[^\n\r\f]|$))/u,
).map<CssEscape>((value) => ({ value, error: null }));

const identifierStart = any(
    dispatch<CssEscape>({
        "A-Z": asciiName,
        "a-z": asciiName,
        _: asciiName,
        "-": hyphenStart,
        "\\": cssEscape,
    }),
    nonAsciiIdent,
);

export const cssIdentifier: Parser<CssIdentifier> = all(
    identifierStart,
    namePiece.many(),
).map<CssIdentifier>(([start, rest]) => {
    const pieces = [start, ...rest];
    return {
        value: pieces.map((piece) => piece.value).join(""),
        error: pieces.some((piece) => piece.error === "unexpected-eof")
            ? "unexpected-eof"
            : null,
    };
});

