// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 bisection probe cut (hand-cut arm of the emitted module into bench/paired/_build/l3/, then bench/paired/arm.mjs). Probe only, never shipped.
import { readFileSync, writeFileSync } from "node:fs";
const g = readFileSync("src/css/bbnf/generated/grammar.js", "utf8");
const must = (t, a, b) => { if (!t.includes(a)) throw new Error("miss: " + a.slice(0, 60)); return t.replace(a, b); };
const start = g.indexOf("/** @type {Rule} */ function r110_preludeRun_v(s, i) {");
const end = g.indexOf("/** @type {Rule} */ function r111_blockBody_v");
let rfn = g.slice(start, end).replace("r110_preludeRun_v", "r110_preludeRun_r").replace("if (o >= 0) V = A60(s.substring(i, o));\n", "");
let A = must(g, "/** @type {Rule} */ function r111_blockBody_v", rfn + "/** @type {Rule} */ function r111_blockBody_v");
A = must(A, "t829 = r110_preludeRun_v(s, i);\nif (t829 < 0) break L828; const v831 = V;", "t829 = r110_preludeRun_r(s, i);\nif (t829 < 0) break L828;");
A = must(A, "V = [v831, v832];", "const v831 = A60(s.substring(i, t829)); V = [v831, v832];");
A = must(A, "t839 = r110_preludeRun_v(s, i);\nif (t839 < 0) break L838; const v842 = V;", "t839 = r110_preludeRun_r(s, i);\nif (t839 < 0) break L838;");
A = must(A, "V = [v842, v843, v844];", "const v842 = A60(s.substring(i, t839)); V = [v842, v843, v844];");
writeFileSync("bench/paired/_build/l3/defer.js", A);
let C = A.replace("function r110_preludeRun_r(s, i) {\n", "function r110_preludeRun_r(s, i) {\nif (s === PRs && i === PRi) return PRo; PRs = s; PRi = i; PRo = r110_preludeRun_r0(s, i); return PRo; }\nfunction r110_preludeRun_r0(s, i) {\n");
C = must(C, "let D = 0;", "let D = 0; let PRs, PRi = -1, PRo;");
writeFileSync("bench/paired/_build/l3/defer-memo.js", C);
console.log("ok");
