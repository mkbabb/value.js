import { regex } from "@mkbabb/parse-that/core";

import { preprocessCodePoints } from "./code-point.js";

const whitespaceSource = String.raw`(?:\r\n|[ \t\n\r\f])+`;
const commentSource = String.raw`\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$)`;
const triviaSource = String.raw`(?:(?:${whitespaceSource})|(?:${commentSource}))+`;

export const cssWhitespace = regex(new RegExp(whitespaceSource, "u")).map(preprocessCodePoints);

export const cssComment = regex(new RegExp(commentSource, "u")).map(preprocessCodePoints);

export const cssTrivia = regex(new RegExp(triviaSource, "u"))
    .map(preprocessCodePoints)
    .opt()
    .map((value) => value ?? "");
