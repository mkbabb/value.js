import type { QualifiedRuleCst, StylesheetCst } from "../../cst.js";
import { spanned, token, whole } from "../combinators.js";
import { mediaRule } from "./media.js";
import { declaration } from "./properties.js";
import { selector } from "./selectors.js";

export const qualifiedRule = spanned(
  selector
    .skip(token("{"))
    .then(declaration.many())
    .skip(token("}"))
    .map<Omit<QualifiedRuleCst, "raw" | "span">>(([ruleSelector, declarations]) => ({
      kind: "qualified-rule",
      selector: ruleSelector,
      declarations,
    })),
);

// W0 refuses at-rules at the stylesheet boundary; media remains a standalone
// responsibility/import-edge witness until the full P01 mirror is authored.
void mediaRule;

export const stylesheet = whole(
  spanned(
    qualifiedRule.many(1).map<Omit<StylesheetCst, "raw" | "span">>((rules) => ({
      kind: "stylesheet",
      rules,
    })),
  ),
);
