import { any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComment = {
    error: null | "unexpected-eof";
};

const commentBody = any(regex(/[^*]+/), regex(/\*+(?!\/)/)).many();
const commentEnd = any(
    string("*/").map<CssComment["error"]>(() => null),
    eof().map<CssComment["error"]>(() => "unexpected-eof"),
);

export const cssComment: Parser<CssComment> = string("/*")
    .next(commentBody)
    .next(commentEnd)
    .map((error) => ({ error }));

