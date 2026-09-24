// SERVED MODEL: claude-opus-5-5
// KFA-3 summary over the audit's capture-log.json: rest offset (ball cx − gate cx) per row,
// max overrun past the rail end across the seek sweep, and backward lurches (cx decreasing while p increases).
import fs from "node:fs";
const L = JSON.parse(fs.readFileSync(process.argv[2] + "/capture-log.json", "utf8"));
const rest = L.seek[0].rows.map((r) => +(r.cx - r.hcx).toFixed(1));
let over = -Infinity, lurch = 0;
for (let i = 0; i < L.seek.length; i++) {
  for (let k = 0; k < L.seek[i].rows.length; k++) {
    const r = L.seek[i].rows[k];
    over = Math.max(over, r.cx - r.tr);
    if (i > 0) { const q = L.seek[i - 1].rows[k]; if (+r.bp > +q.bp && r.cx < q.cx - 0.5) lurch++; }
  }
}
console.log(JSON.stringify({ khead: L.khead0, restOffsetPx: rest, maxOverrunPastRailEndPx: +over.toFixed(1), backwardLurches: lurch }));
