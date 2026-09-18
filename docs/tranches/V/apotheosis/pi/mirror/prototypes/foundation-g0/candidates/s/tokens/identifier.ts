import { Parser, any, dispatch, string } from "@mkbabb/parse-that/core";
import { cssNameCodePoint, cssNameStartCodePoint } from "./code-point.js";

const finishIdentifier = (head: string) => cssNameCodePoint
    .many()
    .map((tail) => head + tail.join(""));

const ordinaryIdentifier = cssNameStartCodePoint
    .chain(finishIdentifier);

const hyphenIdentifier = any(
    string("--").next(cssNameCodePoint.many()).map((tail) => "--" + tail.join("")),
    string("-").next(cssNameStartCodePoint).chain((head) => finishIdentifier("-" + head)),
);

const asciiIdentifier = dispatch({
    "-": hyphenIdentifier,
    "A-Z": ordinaryIdentifier,
    "_": ordinaryIdentifier,
    "a-z": ordinaryIdentifier,
    "\\": ordinaryIdentifier,
});

export const cssIdentifier = Parser.lazy(() => any(
    asciiIdentifier,
    ordinaryIdentifier,
));
