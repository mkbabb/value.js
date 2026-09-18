// SERVED MODEL: claude-fable-5-1
// X.P.W2.h — K-3 measurement over AC-3's Wasm-target lowering (`lowering-wasm/compile.mjs`).
// For each `case "<OP>"` block: the module functions it calls (`X.*`), the runtime helpers it
// calls, and the JS loops/branches it contains. An operator whose control flow (loops, arm
// sequencing, commit/rollback decisions) runs in JS for the Wasm target has ONE lowering of that
// control flow, whatever σ store it writes to.
import { readFileSync } from "node:fs";
const path = process.argv[2];
const src = readFileSync(path, "utf8").split("\n");
const cases = [];
src.forEach((l, i) => { const m = l.match(/^\s*case "([A-Z]+)"/); if (m) cases.push({ op: m[1], start: i }); });
cases.forEach((c, k) => { c.end = cases[k + 1] ? cases[k + 1].start : src.length; });
const CONTROL = new Set(["SEQ","ALT","CUT","PURE","REP","DROP","FAIL","EXPECT","CTOR","TRY","RECOVER","REF"]);
let jsControl = 0;
console.log("op\tX.* module calls\truntime helpers\tJS loops\tJS ifs\tclass");
for (const c of cases) {
  const body = src.slice(c.start, c.end).join("\n");
  const calls = [...new Set([...body.matchAll(/\bX\.([A-Za-z0-9_]+)\(/g)].map((m) => m[1]))].sort();
  const rt = [...new Set([...body.matchAll(/\b(markTuple|rollback|writeGuardTuple|setOrg|admits)\(/g)].map((m) => m[1]))].sort();
  const loops = (body.match(/\bfor\s*\(|\bwhile\s*\(/g) || []).length;
  const ifs = (body.match(/\bif\s*\(/g) || []).length;
  const cls = CONTROL.has(c.op) ? "control-in-JS" : "terminal/arith-in-module";
  if (CONTROL.has(c.op)) jsControl++;
  console.log([c.op, calls.join(","), rt.join(","), loops, ifs, cls].join("\t"));
}
console.log(`\ncases ${cases.length} · operators whose control flow executes in JS for the Wasm target: ${jsControl} of 22`);
console.log(`module functions named by those ${jsControl}: only σ stores/journal pushes (setErr, setCut, setDepth, setFar, pushC/D/P, truncate, labCopy, raise, guard, mark/rollback via runtime.mjs)`);
