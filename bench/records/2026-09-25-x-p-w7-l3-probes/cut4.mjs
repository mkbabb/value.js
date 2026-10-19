// SERVED MODEL: claude-opus-5-5
// X.P.W7.l3 bisection probe cut (hand-cut arm of the emitted module into bench/paired/_build/l3/, then bench/paired/arm.mjs). Probe only, never shipped.
import { readFileSync, writeFileSync } from "node:fs";
const g = readFileSync("src/css/bbnf/generated/grammar.js", "utf8");
const must = (t, a, b) => { if (!t.includes(a)) throw new Error("miss: " + a.slice(0, 60)); return t.split(a).join(b); };
// probe only: prelude's and textBody's runs as code-unit loops (what the sticky-regex entry costs on short runs)
const loop = (K, q, t, stops) => [`{ { ${K}.lastIndex = ${q}; if (${K}.test(s)) { ${t} = ${K}.lastIndex; } else ${t} = -1; }`,
  `{ { let z = ${q}; for (; z < s.length; z++) { const c = s.charCodeAt(z); if (${stops.map((x) => `c === ${x}`).join(" || ")}) break; } ${t} = z > ${q} ? z : -1; }`];
const m = g.match(/\{ \{ K131\.lastIndex = (q\d+); if \(K131\.test\(s\)\) \{ (t\d+) = K131\.lastIndex; \} else t\d+ = -1; \}/);
let V = must(g, ...loop("K131", m[1], m[2], [123, 59, 40, 41, 34, 39]));
const m2 = g.match(/\{ \{ K41\.lastIndex = (q\d+); if \(K41\.test\(s\)\) \{ (t\d+) = K41\.lastIndex; \} else t\d+ = -1; \}/);
V = must(V, ...loop("K41", m2[1], m2[2], [40, 41, 34, 39]));
writeFileSync("bench/paired/_build/l3/s-loop.js", V);
console.log(g.match(/const K41 = .*/)[0]);
