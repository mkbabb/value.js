import { any, dispatch, string } from "@mkbabb/parse-that/core";
import { cssNameCodePoint, cssNameStartCodePoint } from "./code-point.js";

const identifierTail = cssNameCodePoint.many();

const ordinaryIdentifier = cssNameStartCodePoint
    .then(identifierTail)
    .map(([head, tail]) => head + tail.join(""));

const hyphenIdentifier = any(
    string("--")
        .next(identifierTail)
        .map((tail) => "--" + tail.join("")),
    string("-")
        .next(cssNameStartCodePoint)
        .then(identifierTail)
        .map(([head, tail]) => "-" + head + tail.join("")),
);

const asciiIdentifier = dispatch({
    "-": hyphenIdentifier,
    "A-Z": ordinaryIdentifier,
    "_": ordinaryIdentifier,
    "a-z": ordinaryIdentifier,
    "\\": ordinaryIdentifier,
});

export const cssIdentifier = any(
    asciiIdentifier,
    ordinaryIdentifier,
);
