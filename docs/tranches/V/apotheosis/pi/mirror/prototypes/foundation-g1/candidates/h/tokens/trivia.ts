import { any, eof, regex, string } from "@mkbabb/parse-that/core";

export const cssWhitespace = regex(/(?:[ \t\n\f]|\r\n?)+/).map((raw) =>
    raw.replace(/\r\n|[\r\f]/g, "\n"),
);

const commentText = any(
    regex(/[^*]+/),
    regex(/\*(?!\/)/),
).many().map((parts) => parts.join(""));

export const cssComment = commentText.wrap(
    string("/*"),
    any(string("*/"), eof()),
);

export const cssTrivia = any(cssWhitespace, cssComment)
    .many()
    .map((parts) => parts.join(""));
