// SERVED MODEL: claude-opus-5-5
//
// X-W12U `.g2s` — the ACTION TABLE of the `<color>`-rooted parser: `color.bbnf` compiled as a root of its
// own (`scripts/gen-grammar.mjs`, entry `colorTop`, into `./generated/color.js`). It is the SAME grammar
// `css.bbnf` imports and the same actions `./actions` binds — `tokens.bbnf`/`math.bbnf`'s and
// `color.bbnf`'s, nothing copied — restricted to the rules `color.bbnf` reaches, so a page that only
// parses colours never loads the value and stylesheet productions. `bbnf gen` reads the kinds from this
// module, and `createParser` refuses a table with a rule missing or one the grammar does not have.

import { colorActions } from "./color";
import type { Actions } from "./generated/color";
import { mathActions } from "./math";

export const actions = {
    ...mathActions,
    ...colorActions,
} as const satisfies Actions;
