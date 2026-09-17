import { all, any } from "@mkbabb/parse-that";
import type { DeclarationCst } from "../../cst.js";
import { pattern, spanned, token } from "../combinators.js";
import { oklch } from "./color.js";
import { functionBody } from "./func-body.js";
import { cssWideKeyword } from "./keywords.js";
import { valueUnit } from "./value-unit.js";

export const propertyAtom = any(oklch, functionBody, cssWideKeyword, valueUnit);

const propertyName = pattern(/--[a-zA-Z0-9_-]+|-?[a-zA-Z_][a-zA-Z0-9_-]*/);
const propertyValue = pattern(/(?:[^;{}]|\([^)]*\))+/);

export const declaration = spanned(
  all(
    propertyName.skip(token(":")),
    propertyValue,
    token(";").opt(),
  ).map<Omit<DeclarationCst, "raw" | "span">>(([name, value]) => ({
    kind: "declaration",
    name,
    value,
    important: /!\s*important\s*$/i.test(value.raw),
  })),
);
