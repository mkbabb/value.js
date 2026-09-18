import { all, any } from "@mkbabb/parse-that";
import type { OklchCst } from "../../cst.js";
import { spanned, token, whole } from "../combinators.js";
import { angle, numberValue, percentage } from "./value-unit.js";

const hue = any(angle, numberValue);
const alpha = token("/").next(any(percentage, numberValue)).opt();

export const oklch = spanned(
  all(
    token("oklch(").next(percentage),
    numberValue,
    hue,
    alpha,
  )
    .skip(token(")"))
    .map<Omit<OklchCst, "raw" | "span">>(([lightness, chroma, hueValue, alphaValue]) => ({
      kind: "oklch",
      lightness,
      chroma,
      hue: hueValue,
      alpha: alphaValue ?? null,
    })),
);

export const completeColor = whole(oklch);
