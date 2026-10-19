// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 — the grammar, compiled AHEAD OF TIME. `bbnf gen` (`@mkbabb/bbnf-lang`, a build-time
// devDependency; `scripts/gen-grammar.mjs`) compiles `src/css/grammar/css.bbnf` and the modules it
// `@import`s into `./generated/grammar.js`, a checked-in ES module that imports nothing: value.js
// carries no parser library at runtime. `createParser` binds the static action table (`./actions`)
// once, here, at module load; each entry answers its rule's value over a WHOLE input, or `FAIL`.
// A failed parse is silent data (no console write, no error state), and nesting beyond the
// generated depth limit is refused, never thrown.

import { actions } from "./actions";
import { createParser, FAIL } from "./generated/grammar";

export { FAIL };

/** The parser: `entries[name](source)` → the rule's value, or `FAIL`. One parse at a time. */
export const parser = createParser(actions);
