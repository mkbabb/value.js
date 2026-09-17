import { any, eof, regex, string } from "@mkbabb/parse-that/core";

const whitespaceCodePoint = any(regex(/\r\n/u), regex(/[ \t\n\r\f]/u));
const commentContent = any(regex(/[^*]+/u), regex(/\*(?!\/)/u));
const commentEnd = any(string("*/"), eof().map(() => ""));

function preprocessRawTrivia(value: string): string {
    return value
        .replace(/\r\n|[\r\f]/gu, "\n")
        .replace(/\0|[\uD800-\uDFFF]/gu, "\uFFFD");
}

export const cssWhitespace = whitespaceCodePoint
    .many(1)
    .map((parts) => preprocessRawTrivia(parts.join("")));

export const cssComment = string("/*")
    .then(commentContent.many())
    .then(commentEnd)
    .map(([[open, body], close]) => preprocessRawTrivia(open + body.join("") + close));

export const cssTrivia = any(cssWhitespace, cssComment)
    .many()
    .map((parts) => parts.join(""));
