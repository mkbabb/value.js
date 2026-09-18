import { any, Parser, regex, string } from "@mkbabb/parse-that";
import type { CssScalar } from "../deps/value-types.js";
import { commentChunk, identToken, quotedToken } from "./css-token.js";

const escapedCodePoint = regex(/\\(?:[0-9a-fA-F]{1,6}[ \t\n\f\r]?|[^\n\f\r])/);
const rawChunk = regex(/[^()[\]{}"'\/\\]+/);
const ordinarySlash = regex(/\/(?!\*)/);

function captured(parser: Parser<unknown>): Parser<string> {
    return parser.mapState((state, oldState) =>
        state.ok(state.src.slice(oldState.offset, state.offset)));
}

const rawFunction: Parser<string> = Parser.lazy(() => captured(
    identToken.skip(string("("))
        .then(rawComponent.many())
        .skip(string(")")),
));

function block(open: string, close: string): Parser<string> {
    return Parser.lazy(() => captured(rawComponent.many().wrap(string(open), string(close))));
}

const roundBlock = block("(", ")");
const squareBlock = block("[", "]");
const braceBlock = block("{", "}");

/** Recursive CSS component material used by arbitrary simple blocks. */
export const rawComponent: Parser<string> = Parser.lazy(() => any(
    rawFunction,
    roundBlock,
    squareBlock,
    braceBlock,
    quotedToken,
    commentChunk,
    escapedCodePoint,
    ordinarySlash,
    rawChunk,
));

/**
 * Phase-A's public CssValue union has no block arm. Keep the parsed block
 * losslessly as a keyword scalar while the internal component grammar remains
 * structured and delimiter-safe.
 */
export const simpleBlockValue: Parser<CssScalar> = any(roundBlock, squareBlock, braceBlock)
    .map((raw) => ({ kind: "scalar", payload: { type: "keyword", value: raw } }));
