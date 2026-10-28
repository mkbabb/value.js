// Map generated (line, col) positions of a built chunk to source:line via its sourcemap.
import fs from "node:fs";
const [file, ...pos] = process.argv.slice(2);
const map = JSON.parse(fs.readFileSync(file + ".map", "utf8"));
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let src = 0, sl = 0, sc = 0; const lines = [];
for (const line of map.mappings.split(";")) { const segs = []; let col = 0;
  for (const seg of line.split(",")) { if (!seg) continue; const v = []; let x = 0, sh = 0;
    for (const ch of seg) { const d = B64.indexOf(ch); x += (d & 31) << sh; if (d & 32) sh += 5; else { v.push(x & 1 ? -(x >> 1) : x >> 1); x = 0; sh = 0; } }
    col += v[0]; if (v.length > 1) { src += v[1]; sl += v[2]; sc += v[3]; segs.push([col, src, sl, sc]); } }
  lines.push(segs); }
for (const p of pos) { const [l, c] = p.split(":").map(Number); const segs = lines[l] || []; let best = null; for (const s of segs) if (s[0] <= c) best = s; console.log(p, best ? `${map.sources[best[1]]}:${best[2] + 1}:${best[3]}` : "?"); }
