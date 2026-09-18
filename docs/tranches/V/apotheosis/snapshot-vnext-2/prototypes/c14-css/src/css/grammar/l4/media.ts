import { all } from "@mkbabb/parse-that";
import { pattern, spanned, token, whole } from "../combinators.js";
import { cssIdentifier } from "./tokens.js";

export const mediaRule = spanned(
  all(
    token("@media").next(cssIdentifier),
    pattern(/\{[^{}]*\}/),
  ).map(([query, body]) => ({ kind: "media-rule" as const, query, body })),
);
export const completeMediaRule = whole(mediaRule);
