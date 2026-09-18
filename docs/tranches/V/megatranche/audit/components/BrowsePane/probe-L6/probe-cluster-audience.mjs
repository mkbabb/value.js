import { readFileSync } from "fs";
import { execSync } from "child_process";
const files = execSync("find demo -name '*.vue' -o -name '*.ts'", {encoding:"utf8"}).trim().split("\n");
const IMP = /import\s+(?:type\s+)?(?:\{([^}]*)\}|(\w+))\s+from\s+["']([^"']+)["']/g;
const rows = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  let m;
  while ((m = IMP.exec(src))) {
    const syms = m[1] ? m[1].split(",").map(s=>s.trim().split(/\s+as\s+/)[0].replace(/^type\s+/,"").trim()).filter(Boolean) : [m[2]];
    rows.push({file:f, spec:m[3], syms});
  }
}
// Which files import from a browser cluster barrel, and which symbols?
const CLUSTERS = ["card","admin","search","dialog","slug","status"];
console.log("=== imports resolving to a browser/<cluster> barrel ===");
for (const r of rows) {
  const mm = r.spec.match(/browser\/(card|admin|search|dialog|slug|status)$/);
  if (!mm) continue;
  console.log(`${r.file}  ->  ${mm[1]}   [${r.syms.join(", ")}]`);
}
console.log("\n=== imports resolving to the TOP-LEVEL browser seam ===");
for (const r of rows) if (/\/browser["']?$/.test(r.spec) || r.spec.endsWith("/browser")) console.log(`${r.file} -> ${r.spec} [${r.syms.join(", ")}]`);
