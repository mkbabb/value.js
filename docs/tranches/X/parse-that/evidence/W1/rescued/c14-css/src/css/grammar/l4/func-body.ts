import { spanned, token, whole } from "../combinators.js";
import { valueUnit } from "./value-unit.js";

export const functionBody = spanned(
  token("calc(")
    .next(valueUnit)
    .skip(token(")"))
    .map((argument) => ({ kind: "function-body" as const, name: "calc" as const, argument })),
);
export const completeFunctionBody = whole(functionBody);
