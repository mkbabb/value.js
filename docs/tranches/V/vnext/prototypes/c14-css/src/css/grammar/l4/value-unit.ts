import { any } from "@mkbabb/parse-that";
import type { NumericCst } from "../../cst.js";
import { pattern, whole } from "../combinators.js";

const numericSource = String.raw`[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?`;

function numeric(kind: NumericCst["kind"], unit: string | null, source: RegExp) {
  return pattern(source).map<NumericCst>((captured) => ({
    ...captured,
    kind,
    value: Number.parseFloat(captured.raw),
    unit,
  }));
}

export const numberValue = numeric("number", null, new RegExp(numericSource));
export const percentage = numeric("percentage", "%", new RegExp(`${numericSource}%`));
export const angle = pattern(new RegExp(`${numericSource}(?:deg|grad|rad|turn)`)).map<NumericCst>(
  (captured) => ({
    ...captured,
    kind: "angle",
    value: Number.parseFloat(captured.raw),
    unit: captured.raw.match(/[a-z]+$/i)?.[0] ?? null,
  }),
);
export const dimension = pattern(new RegExp(`${numericSource}[a-zA-Z]+`)).map<NumericCst>(
  (captured) => ({
    ...captured,
    kind: "dimension",
    value: Number.parseFloat(captured.raw),
    unit: captured.raw.match(/[a-z]+$/i)?.[0] ?? null,
  }),
);
export const valueUnit = any(percentage, angle, dimension, numberValue);
export const completeValueUnit = whole(valueUnit);
