// U3: dark-scheme strip contrast, both metrics, from the prod-wall dark readout
import fs from "node:fs";
import { EVID, wcag, dE } from "./lib.mjs";
const d = JSON.parse(fs.readFileSync(EVID + "/wall-prod+proddark.json"));
const rgb = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number);
const res = {};
for (const sc of ["prod_light", "prod_dark"]) {
  res[sc] = d[sc].strips.map((s) => {
    const b = s.bands.map(rgb), card = rgb(s.cardBg);
    const adj = b.slice(1).map((c, i) => ({ wcag: wcag(b[i], c), dE: dE(b[i], c) }));
    return { name: s.name, n: b.length, cardBg: s.cardBg, stripSurface: s.stripSurface, minAdjWcag: adj.length ? Math.min(...adj.map((a) => a.wcag)) : null, minAdjDE: adj.length ? Math.min(...adj.map((a) => a.dE)) : null, edgeVsCard: b.length ? { first: { wcag: wcag(b[0], card), dE: dE(b[0], card) }, last: { wcag: wcag(b.at(-1), card), dE: dE(b.at(-1), card) } } : null };
  });
}
fs.writeFileSync(EVID + "/u3-strip-contrast.json", JSON.stringify(res, null, 1));
for (const r of res.prod_dark) console.log(JSON.stringify(r));
