// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 — the grammar's ACTION TABLE: one `{ kind, fn }` per rule that builds a value, static and
// typed. `bbnf gen` reads the kinds from this module (`scripts/gen-grammar.mjs`), so the generated
// `Actions` type is this table's own shape; `createParser` binds each `fn` once and refuses a table
// that is missing an action or carries one of the wrong kind. Every action is pure and total, and
// none calls a parse entry (the generated parser's value register is not re-entrant).

import { colorActions } from "./color";
import type { Actions } from "./generated/grammar";
import { mathActions } from "./math";
import { stylesheetActions } from "./stylesheet";
import { valueActions } from "./value";

export const actions = {
    ...mathActions,
    ...colorActions,
    ...valueActions,
    ...stylesheetActions,
} as const satisfies Actions;
