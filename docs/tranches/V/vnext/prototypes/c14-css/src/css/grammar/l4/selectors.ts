import { pattern, whole } from "../combinators.js";
import { cssIdentifier } from "./tokens.js";

void cssIdentifier;
export const selector = pattern(/(?!@)[^{}]+?(?=\s*\{)/).map((captured) => ({
  ...captured,
  kind: "selector" as const,
}));
export const completeSelector = whole(selector);
