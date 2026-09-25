// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 bisection probe cut (hand-cut arm of the emitted module into bench/paired/_build/l3/, then bench/paired/arm.mjs). Probe only, never shipped.
import { readFileSync, writeFileSync } from "node:fs";
const C = readFileSync("bench/paired/_build/l3/defer-memo.js", "utf8");
const must = (t, a, b) => { if (!t.includes(a)) throw new Error("miss: " + a.slice(0, 60)); return t.split(a).join(b); };
// gap: ruleGap's value built as an empty marker (probe only: what the whitespace arrays cost)
let G = must(C, "const a785 = []; ", "");
G = must(G, "a785.push(V); ", "");
G = must(G, "V = a785; o = q782;", "V = undefined; o = q782;");
writeFileSync("bench/paired/_build/l3/gap.js", G);
// rule: openRule without its substring (probe only)
const R = must(C, "V = i < s.length ? s.substring(i) : undefined; o = s.length; }\nif (o >= 0) V = A66", "V = undefined; o = s.length; }\nif (o >= 0) V = A66");
writeFileSync("bench/paired/_build/l3/rule.js", R);
console.log("ok");
