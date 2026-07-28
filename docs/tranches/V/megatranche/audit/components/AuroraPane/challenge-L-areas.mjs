import { readFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const files = execSync(`git ls-files 'demo/**/*.ts' 'demo/**/*.vue'`, {cwd:"/Users/mkbabb/Programming/value.js"})
  .toString().trim().split("\n").filter(f=>!f.startsWith("demo/test/"));
const root = "/Users/mkbabb/Programming/value.js/";
// AREA = first path segment under demo/
const area = f => f.split("/")[1];
const edges = new Map();
const detail = [];
for (const f of files) {
  const src = readFileSync(root+f, "utf8");
  const re = /(?:from|import\()\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src))) {
    const spec = m[1];
    if (!spec.startsWith(".")) continue;
    const abs = path.normalize(path.join(path.dirname(f), spec));
    if (!abs.startsWith("demo/")) continue;
    const a = area(f), b = area(abs);
    if (a === b) continue;
    const k = a+" -> "+b;
    edges.set(k, (edges.get(k)||0)+1);
    detail.push([a,b,f,spec, m.index]);
  }
}
const keys = [...edges.keys()].sort();
console.log("=== cross-area edges (count) ===");
for (const k of keys) console.log("  "+k.padEnd(34), edges.get(k));
console.log("\n=== BIDIRECTIONAL AREA PAIRS (cycles) ===");
const seen = new Set();
for (const k of keys) {
  const [a,b]=k.split(" -> ");
  const rev = b+" -> "+a;
  if (edges.has(rev) && !seen.has(b+"|"+a)) { seen.add(a+"|"+b); console.log(`  ${a} <-> ${b}   (${edges.get(k)} / ${edges.get(rev)})`); }
}
console.log("\n=== scenes<->color-picker detail ===");
for (const [a,b,f,spec] of detail) {
  if ((a==="scenes"&&b==="color-picker")||(a==="color-picker"&&b==="scenes")) console.log(`  ${f}  ->  ${spec}`);
}
