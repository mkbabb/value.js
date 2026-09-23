import { readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const name = process.argv[2]; const every = +(process.argv[3] || 1);
const { tAct, rows } = JSON.parse(readFileSync(OUT + name + "/probe.json"));
let prev = null, drops = 0, maxd = 0;
const ds = [];
rows.forEach((r, i) => {
  const d = prev ? r.t - prev.t : 0; ds.push(d); if (d > 20) drops++; maxd = Math.max(maxd, d);
  const dx = prev ? r.ballX - prev.ballX : 0;
  if (i % every === 0 || (prev && (r.badge !== prev.badge || r.live !== prev.live || r.mkAnim !== prev.mkAnim || r.wc !== prev.wc)))
    console.log(i, (r.t - tAct).toFixed(0), "d" + d.toFixed(1), "ballX", r.ballX, "dx", dx.toFixed(2), "mkX", r.mkX, "samp", typeof r.sampX === "number" ? r.sampX.toFixed(1) : r.sampX, r.badge, r.x, "live", r.live, r.wc, "op", r.op, "mkOp", r.mkOp, r.mkAnim, r.mkFilter !== "none" ? r.mkFilter.slice(0, 40) : "");
  prev = r;
});
const sorted = [...ds].slice(1).sort((a, b) => a - b);
console.log("rows", rows.length, "drops>20ms", drops, "maxDelta", maxd.toFixed(1), "median", sorted[sorted.length >> 1]?.toFixed(2));
