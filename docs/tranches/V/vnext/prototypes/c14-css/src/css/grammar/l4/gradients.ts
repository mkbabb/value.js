import { all } from "@mkbabb/parse-that";
import { spanned, token, whole } from "../combinators.js";
import { oklch } from "./color.js";
import { angle } from "./value-unit.js";

export const linearGradient = spanned(
  all(
    token("linear-gradient(").next(angle).skip(token(",")),
    oklch.skip(token(",")),
    oklch.skip(token(")")),
  ).map(([direction, from, to]) => ({
    kind: "linear-gradient" as const,
    direction,
    stops: [from, to] as const,
  })),
);
export const completeGradient = whole(linearGradient);
