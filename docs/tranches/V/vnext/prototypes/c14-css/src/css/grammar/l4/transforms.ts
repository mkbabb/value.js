import { spanned, token, whole } from "../combinators.js";
import { valueUnit } from "./value-unit.js";

export const transformFunction = spanned(
  token("translateX(")
    .next(valueUnit)
    .skip(token(")"))
    .map((argument) => ({ kind: "transform" as const, name: "translateX" as const, argument })),
);
export const completeTransform = whole(transformFunction);
