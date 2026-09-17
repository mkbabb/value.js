import { any, string } from "@mkbabb/parse-that";
import { whole } from "../combinators.js";

export const cssWideKeyword = any(
  string("inherit"),
  string("initial"),
  string("revert-layer"),
  string("revert"),
  string("unset"),
);
export const completeKeyword = whole(cssWideKeyword);
