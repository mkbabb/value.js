import { all, any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComments = {
    error: null | "unexpected-eof";
};

const commentBody = regex(/(?:[^*]|\*(?!\/))+/).opt();
const commentEnding: Parser<CssComments> = any(
    string("*/").map((): CssComments => ({ error: null })),
    eof().map((): CssComments => ({ error: "unexpected-eof" })),
);

const comment = string("/*")
    .next(commentBody)
    .next(commentEnding);

export const cssComments: Parser<CssComments> = all(
    comment,
    comment.many(),
).map(([head, tail]) => ({
    error: head.error ??
        (tail.some((item) => item.error !== null) ? "unexpected-eof" : null),
}));

