import { any } from "@mkbabb/parse-that";
import { whole } from "../combinators.js";
import { oklch } from "./color.js";
import { cubicBezier } from "./easing.js";
import { filterFunction } from "./filters.js";
import { linearGradient } from "./gradients.js";
import { cssToken } from "./tokens.js";
import { transformFunction } from "./transforms.js";
import { valueUnit } from "./value-unit.js";

export const cssValue = any(
  oklch,
  cubicBezier,
  filterFunction,
  linearGradient,
  transformFunction,
  valueUnit,
  cssToken,
);
export const completeCssValue = whole(cssValue);
