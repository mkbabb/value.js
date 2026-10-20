// Attribute a built chunk's bytes to its sources via the sourcemap (VLQ decode).
import fs from "node:fs";
const [file, top = "25"] = process.argv.slice(2);
const code = fs.readFileSync(file, "utf8");
const map = JSON.parse(fs.readFileSync(file + ".map", "utf8"));
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const lines = code.split("\n");
const bytes = new Map();
let src = 0;
map.mappings.split(";").forEach((line, li) => {
  const segs = []; let col = 0;
  for (const seg of line.split(",")) {
    if (!seg) continue;
    const vals = []; let v = 0, shift = 0;
    for (const ch of seg) { const d = B64.indexOf(ch); v += (d & 31) << shift; if (d & 32) shift += 5; else { vals.push(v & 1 ? -(v >> 1) : v >> 1); v = 0; shift = 0; } }
    col += vals[0]; if (vals.length > 1) src += vals[1];
    segs.push([col, vals.length > 1 ? src : -1]);
  }
  const len = (lines[li] || "").length;
  segs.forEach(([c, s], i) => { const end = i + 1 < segs.length ? segs[i + 1][0] : len; const k = s < 0 ? "(unmapped)" : map.sources[s]; bytes.set(k, (bytes.get(k) || 0) + (end - c)); });
});
const groups = new Map();
for (const [k, n] of bytes) { const m = k.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/); const g = m ? m[1] : k.replace(/^.*\/web\//, ""); groups.set(g, (groups.get(g) || 0) + n); }
console.log(file.split("/").pop(), code.length);
[...groups].sort((a, b) => b[1] - a[1]).slice(0, +top).forEach(([g, n]) => console.log(String(n).padStart(8), g));
