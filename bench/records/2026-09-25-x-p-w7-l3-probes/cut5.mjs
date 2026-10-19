// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 bisection probe cut 5 (hand-cut arm into bench/paired/_build/l3/, then bench/paired/arm.mjs). Probe only, never shipped.
// probe: atPrelude's ordered choice answers FAIL at its head when the first code unit is not `@` (every alternative's
// FIRST is {@}); today each of the 8 alternatives re-tests its own leaf guard on every non-at prelude.
import { readFileSync, writeFileSync } from "node:fs";
const g = readFileSync("src/css/bbnf/generated/grammar.js", "utf8");
const a = "function r120_atPrelude_v(s, i) {\nlet o; L870: {";
if (!g.includes(a)) throw new Error("miss");
writeFileSync("bench/paired/_build/l3/s-athead.js", g.replace(a, "function r120_atPrelude_v(s, i) {\nif (s.charCodeAt(i) !== 64) return -1;\nlet o; L870: {"));
