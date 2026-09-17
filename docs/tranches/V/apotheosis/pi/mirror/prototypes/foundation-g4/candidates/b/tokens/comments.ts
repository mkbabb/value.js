import { all, any, eof, regex, string, type Parser } from "@mkbabb/parse-that/core";

export type CssComments = {
    error: null | "unexpected-eof";
};

const discardedCommentCodePoint = regex(/[\s\S]/u).minus(string("*/"));
const comment = string("/*")
    .next(discardedCommentCodePoint.many())
    .next(any(
        string("*/").map<CssComments["error"]>(() => null),
        eof().map<CssComments["error"]>(() => "unexpected-eof"),
    ));

export const cssComments: Parser<CssComments> = all(
    comment,
    comment.many(),
).map(([head, tail]) => ({
    error: head ??
        (tail.some((error) => error !== null) ? "unexpected-eof" : null),
}));

