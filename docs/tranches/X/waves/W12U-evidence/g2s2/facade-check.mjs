// SERVED MODEL: claude-opus-5-5
// X.W12U.g2s2 gate: every dist/subpaths/*.js is a re-export FACADE over shared chunks (COHESION §0ft.1),
// and the stylesheet grammar, the colour grammar and the shared action tables each sit in their own chunk.
// A facade = nothing but `import {…} from "../<chunk>.js";` and `export {…};` statements.
// Grammar placement read by markers (minified names survive only as property keys): the stylesheet
// entry/rule keys `valueTop`/`atKeyframes` only in the stylesheet chunk, the colour root `colorTop` only in
// the colour chunk, and a generated parser's `entries:` object in exactly those two chunks.
// Usage: node facade-check.mjs <tree>
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const tree = process.argv[2]; let bad = 0;
for (const f of readdirSync(join(tree, "dist/subpaths")).filter((f) => f.endsWith(".js")).sort()) {
  const s = readFileSync(join(tree, "dist/subpaths", f), "utf8");
  const rest = s.replace(/import\s*\{[^}]*\}\s*from\s*"\.\.\/[\w.-]+\.js";?/g, "").replace(/export\s*\{[^}]*\};?/g, "").replace(/\/\/[^\n]*/g, "").trim();
  const from = [...s.matchAll(/from\s*"\.\.\/([\w.-]+?)-[\w-]{8}\.js"/g)].map((m) => m[1]);
  if (rest.length) bad++;
  console.log("facade", f, rest.length ? "NOT-A-FACADE own=" + rest.length + "B" : "FACADE", "over=[" + from.join(",") + "]");
}
const chunks = readdirSync(join(tree, "dist")).filter((f) => f.endsWith(".js")).sort();
const where = (re) => chunks.filter((f) => re.test(readFileSync(join(tree, "dist", f), "utf8"))).map((f) => f.replace(/-[\w-]{8}\.js$/, ""));
const kf = where(/atKeyframes|valueTop/), ct = where(/colorTop/), cp = where(/entries:/), act = chunks.filter((f) => /^actions-/.test(f)).map((f) => f.replace(/-[\w-]{8}\.js$/, ""));
console.log("chunks", chunks.map((f) => f.replace(/-[\w-]{8}\.js$/, "")).join(","));
console.log("stylesheet-grammar (atKeyframes|valueTop) in", kf.join(","), "| colour root (colorTop) in", ct.join(","), "| parser entries in", cp.join(","), "| action-table chunk", act.join(","));
const sep = kf.length === 1 && kf[0] === "css-grammar" && ct.length === 1 && ct[0] === "color-grammar" && cp.length === 2 && cp.includes("css-grammar") && cp.includes("color-grammar") && act.length === 1;
console.log("FACADES", bad === 0 ? "ALL" : "NOT-ALL", "| SEPARATE-CHUNKS", sep ? "YES" : "NO", "| VERDICT", bad === 0 && sep ? "GREEN" : "RED");
