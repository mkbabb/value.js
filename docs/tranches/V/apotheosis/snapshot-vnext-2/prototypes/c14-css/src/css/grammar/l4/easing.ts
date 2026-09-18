import { all } from "@mkbabb/parse-that";
import type { CubicBezierCst } from "../../cst.js";
import { spanned, token, whole } from "../combinators.js";
import { numberValue } from "./value-unit.js";

export const cubicBezier = spanned(
  all(
    token("cubic-bezier(").next(numberValue).skip(token(",")),
    numberValue.skip(token(",")),
    numberValue.skip(token(",")),
    numberValue.skip(token(")")),
  ).map<Omit<CubicBezierCst, "raw" | "span">>((coordinates) => ({
    kind: "cubic-bezier",
    coordinates,
  })),
);

export const completeEasing = whole(cubicBezier);
