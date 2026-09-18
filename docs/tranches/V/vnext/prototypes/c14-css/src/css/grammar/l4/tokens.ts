import { any } from "@mkbabb/parse-that";
import { pattern, whole } from "../combinators.js";

export const cssIdentifier = pattern(/(?:--|-?)(?:[a-zA-Z_]|[^\0-\x7f])(?:[a-zA-Z0-9_-]|[^\0-\x7f])*/);
export const cssString = pattern(/"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/);
export const cssToken = any(cssIdentifier, cssString, pattern(/#[a-zA-Z0-9_-]+/));
export const completeToken = whole(cssToken);
