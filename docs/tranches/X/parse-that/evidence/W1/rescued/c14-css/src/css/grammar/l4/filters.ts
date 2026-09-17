import { any } from "@mkbabb/parse-that";
import { spanned, token, whole } from "../combinators.js";
import { dimension, numberValue } from "./value-unit.js";

export const filterFunction = spanned(
  token("blur(")
    .next(any(dimension, numberValue))
    .skip(token(")"))
    .map((argument) => ({ kind: "filter" as const, name: "blur" as const, argument })),
);
export const completeFilter = whole(filterFunction);
