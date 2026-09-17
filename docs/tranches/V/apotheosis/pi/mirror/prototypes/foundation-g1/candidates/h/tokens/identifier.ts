import { all, any, string } from "@mkbabb/parse-that/core";
import {
    cssEscape,
    cssNameCodePoint,
    cssNameStartCodePoint,
} from "./code-point.js";

const initial = any(cssNameStartCodePoint, cssEscape);
const remainder = cssNameCodePoint.many();

const doubleHyphen = all(string("--"), remainder)
    .map(([prefix, rest]) => prefix + rest.join(""));

const leadingHyphen = all(string("-"), initial, remainder)
    .map(([prefix, first, rest]) => prefix + first + rest.join(""));

const ordinary = all(initial, remainder)
    .map(([first, rest]) => first + rest.join(""));

export const cssIdentifier = any(doubleHyphen, leadingHyphen, ordinary);
