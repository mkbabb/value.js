import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = "/Users/mkbabb/Programming/value.js";
const AREAS = ["color-picker","shell","color-session","picker","palettes","workbenches","scenes","platform","shared","ui","styles","test"];
const ROLE = {
  "color-picker":"app", shell:"shell", "color-session":"color-session",
  picker:"feature", palettes:"feature", workbenches:"feature", scenes:"feature",
  platform:"platform", shared:"shared", ui:"ui-shim", styles:"styles", test:"test",
};
// ARCHITECTURE.md:50-56
const ALLOWED = {
  app:          new Set(["shell","color-session","feature","platform","shared","ui-shim","styles","app"]),
  shell:        new Set(["color-session","platform","shared","ui-shim","styles","shell"]),
  feature:      new Set(["color-session","platform","shared","ui-shim","styles","feature-self"]),
  "color-session": new Set(["platform","shared","ui-shim","styles","color-session"]),
  platform:     new Set(["shared","platform"]),
  shared:       new Set(["shared"]),
};

const files = execSync(`find ${ROOT}/demo -name '*.ts' -o -name '*.vue'`, {encoding:"utf8"})
  .trim().split("\n").filter(Boolean);

const areaOf = (abs) => {
  const rel = path.relative(path.join(ROOT,"demo"), abs);
  return rel.split(path.sep)[0];
};

const edges = new Map();       // "fromArea->toArea" -> [sites]
const violations = [];

for (const f of files) {
  const fromArea = areaOf(f);
  if (!AREAS.includes(fromArea)) continue;
  const src = readFileSync(f,"utf8");
  const re = /(?:from|import)\s+["'](\.[^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) {
    const spec = m[1];
    if (!spec.startsWith("..")) continue;                 // same-dir = intra-module
    const resolved = path.resolve(path.dirname(f), spec);
    const toArea = areaOf(resolved);
    if (!AREAS.includes(toArea) || toArea === fromArea) continue;
    const key = `${fromArea} -> ${toArea}`;
    if (!edges.has(key)) edges.set(key, []);
    const line = src.slice(0, m.index).split("\n").length;
    edges.get(key).push(`${path.relative(ROOT,f)}:${line}`);

    const fromRole = ROLE[fromArea], toRole = ROLE[toArea];
    const allow = ALLOWED[fromRole];
    if (!allow) continue;                                  // ui-shim/styles/test: not roles in the law
    const ok = allow.has(toRole) || (fromRole==="feature" && toRole==="feature" && false);
    if (!ok) violations.push({ from:fromArea, to:toArea, fromRole, toRole, site:`${path.relative(ROOT,f)}:${line}`, spec });
  }
}

console.log("=== ALL cross-area edges in demo/ ===");
[...edges.entries()].sort((a,b)=>b[1].length-a[1].length).forEach(([k,v])=>console.log(String(v.length).padStart(4), k));
console.log("\n=== VIOLATIONS of ARCHITECTURE.md:50-56 ===");
const byPair = new Map();
for (const v of violations) {
  const k = `${v.fromRole}(${v.from}) -> ${v.toRole}(${v.to})`;
  if (!byPair.has(k)) byPair.set(k, []);
  byPair.get(k).push(v);
}
[...byPair.entries()].sort((a,b)=>b[1].length-a[1].length).forEach(([k,v])=>{
  console.log(`\n${v.length}x  ${k}`);
  v.slice(0,20).forEach(x=>console.log("     ", x.site, " <- ", x.spec));
});
console.log("\nTOTAL VIOLATIONS:", violations.length);
