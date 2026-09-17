import { any, regex, string } from "@mkbabb/parse-that/core";

const normalizeWhitespace = (value: string): string => value
    .replaceAll("\r\n", "\n")
    .replace(/[\r\f]/g, "\n");

export const cssWhitespace = regex(/(?:\r\n|[\t\n\f\r ])+/)
    .map(normalizeWhitespace);

const commentCodePoint = any(
    regex(/[^*]/u),
    string("*").skip(string("/").not()),
);

export const cssComment = string("/*")
    .next(commentCodePoint.many())
    .skip(string("*/").opt())
    .map((parts) => parts.join(""));

export const cssTrivia = any(cssWhitespace, cssComment)
    .many()
    .map((parts) => parts.join(""));
