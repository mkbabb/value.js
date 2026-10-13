// SERVED MODEL: claude-opus-5-5
// X.W12U.h (RESUME 2) — self-count over banked result files: node tally.mjs <prefix> (e.g. results/h2-r1)
// Per cell: arm verdicts, region reads, P RED, H RED (with the pair), both L3-5 gates, the /blob cell.
import { readFileSync, existsSync } from "node:fs";
import { l35ok as a } from "./gate-l35.mjs";
import { l35ok as b } from "./gate-l35b.mjs";
const pre = process.argv[2];
let G = 0, R = 0, regions = 0, pRed = 0, hRed = 0;
for (const cell of ["d1440-light", "d1440-dark", "v390-light", "v390-dark"]) {
    const f = `${pre}-${cell}.json`, f8 = `${pre}-${cell}-L3-8.json`;
    if (!existsSync(f)) { console.log(cell, "MISSING"); continue; }
    const r = JSON.parse(readFileSync(f, "utf8")), r8 = existsSync(f8) ? JSON.parse(readFileSync(f8, "utf8")) : { arms: {}, gates: {} };
    const arms = { ...r.arms, ...r8.arms }, gates = { ...r.gates, ...r8.gates };
    const v = Object.entries(arms).map(([k, x]) => { x.pass ? G++ : R++; return `${k}:${x.pass ? "G" : "R"}`; }).join(" ");
    const hr = [];
    for (const [route, g] of Object.entries(gates)) for (const x of g.regions) { regions++; if (!x.P) pRed++; if (!x.H) { hRed++; hr.push(`${route} ${x.hMinText} ${x.hMin} < ${x.cMaxText} ${x.cMax}`); } }
    const c = arms["L3-5"], bl = c?.["/blob"];
    console.log(cell, "|", v, "| l35", c ? (a(c, r.W) ? "GREEN" : "RED") : "n/a", "l35b", c ? (b(c, r.W) ? "GREEN" : "RED") : "n/a", "| blob", bl ? `${bl.stage.wrapH}/${bl.stage.cardH} ${bl.inspector.wrapH}/${bl.inspector.cardH}` : "-", "| H RED:", hr.join(" ; ") || "0");
}
console.log(`TOTAL arms GREEN ${G} RED ${R} · region reads ${regions} · P RED ${pRed} · H RED ${hRed}`);
