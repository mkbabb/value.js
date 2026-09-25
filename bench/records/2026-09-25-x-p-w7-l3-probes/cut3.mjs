// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 bisection probe cut (hand-cut arm of the emitted module into bench/paired/_build/l3/, then bench/paired/arm.mjs). Probe only, never shipped.
import { readFileSync, writeFileSync } from "node:fs";
const g = readFileSync("src/css/bbnf/generated/grammar.js", "utf8");
const must = (t, a, b) => { if (!t.includes(a)) throw new Error("miss: " + a.slice(0, 60)); return t.split(a).join(b); };
let G = must(g, "const a785 = []; ", ""); G = must(G, "a785.push(V); ", ""); G = must(G, "V = a785; o = q782;", "V = undefined; o = q782;");
writeFileSync("bench/paired/_build/l3/s-gap.js", G);
let E = must(g, "const a855 = []; ", "let a855 = null; "); E = must(E, "a855.push(V);", "(a855 ??= []).push(V);"); E = must(E, "V = a855;", "V = a855 ?? E0;"); E = must(E, "let D = 0;", "let D = 0; const E0 = Object.freeze([]);");
writeFileSync("bench/paired/_build/l3/s-empty.js", E);
const R = must(g, "V = i < s.length ? s.substring(i) : undefined; o = s.length; }\nif (o >= 0) V = A66", "V = undefined; o = s.length; }\nif (o >= 0) V = A66");
writeFileSync("bench/paired/_build/l3/s-rule.js", R);
let ALL = must(G, "const a855 = []; ", "let a855 = null; "); ALL = must(ALL, "a855.push(V);", "(a855 ??= []).push(V);"); ALL = must(ALL, "V = a855;", "V = a855 ?? E0;"); ALL = must(ALL, "let D = 0;", "let D = 0; const E0 = Object.freeze([]);");
ALL = must(ALL, "V = i < s.length ? s.substring(i) : undefined; o = s.length; }\nif (o >= 0) V = A66", "V = undefined; o = s.length; }\nif (o >= 0) V = A66");
writeFileSync("bench/paired/_build/l3/s-all.js", ALL);
console.log("ok");
