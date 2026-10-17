// SERVED MODEL: claude-opus-5-5
// X.W12U.g2s2 gate (iii): the exported-name set per subpath is a SUPERSET of the baseline's (no public
// export removed or renamed). Reads each built tree's published surface two ways: the RUNTIME names
// (`Object.keys(await import(dist/subpaths/<s>.js))`) and the DECLARED names (TypeScript's checker over
// dist/subpaths/<s>.d.ts, types included). Usage: node names.mjs <baseline-tree> <new-tree>
import ts from "typescript";
import { join } from "node:path";
const SUBPATHS = ["color", "value", "css", "easing", "math", "transform", "quantize"];
async function surface(tree) {
  const out = {};
  const files = SUBPATHS.map((s) => join(tree, "dist/subpaths", s + ".d.ts"));
  const program = ts.createProgram(files, { noEmit: true, skipLibCheck: true });
  const checker = program.getTypeChecker();
  for (const s of SUBPATHS) {
    const runtime = Object.keys(await import(join(tree, "dist/subpaths", s + ".js"))).sort();
    const sym = checker.getSymbolAtLocation(program.getSourceFile(join(tree, "dist/subpaths", s + ".d.ts")));
    const declared = checker.getExportsOfModule(sym).map((x) => x.name).sort();
    out[s] = { runtime, declared };
  }
  return out;
}
const [a, b] = await Promise.all(process.argv.slice(2, 4).map(surface));
let removed = 0;
for (const s of SUBPATHS) for (const k of ["runtime", "declared"]) {
  const gone = a[s][k].filter((n) => !b[s][k].includes(n)), added = b[s][k].filter((n) => !a[s][k].includes(n));
  removed += gone.length;
  console.log(s.padEnd(9), k.padEnd(8), `base=${a[s][k].length} new=${b[s][k].length}`, "removed=[" + gone.join(",") + "]", "added=[" + added.join(",") + "]");
}
const keep = ["parseCssColor", "serializeCssColor"].every((n) => b.css.runtime.includes(n) && b.css.declared.includes(n));
console.log("REMOVED", removed, "| ./css keeps parseCssColor+serializeCssColor", keep, "| VERDICT", removed === 0 && keep ? "GREEN (superset)" : "RED");
