// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` — CELL HYGIENE over a bench record (promoted from the W7 judge's clean.mjs): re-reads every cell of
// `bench/records/<record>.json` at a chosen spread bound and prints, per arm × class × entry, the clean cells' paired
// median ratios and the count set aside, with the load span. Reading a record at a looser bound never rewrites it.
//   node bench/paired/clean.mjs <record.json> [SPREAD=1.6]
import { readFileSync } from "node:fs";
import { median } from "./common.mjs";

const [FILE, S = "1.6"] = process.argv.slice(2);
const SPREAD = Number(S);
const rec = JSON.parse(readFileSync(FILE, "utf8"));
const table = {};
for (const c of rec.cells) for (const [a, x] of Object.entries(c.ratio)) {
    const t = (table[`${a}|${c.class}|${c.entry}`] ??= { clean: [], setAside: 0, loads: [] });
    if (c.retiredSpread < SPREAD) { t.clean.push(x.paired); t.loads.push(...c.load); } else t.setAside++;
}
for (const [k, v] of Object.entries(table)) {
    const [a, cls, e] = k.split("|");
    console.log(a, cls.padEnd(5), e.padEnd(22), `clean ${v.clean.length} (set aside ${v.setAside}) · below 1.0 ${v.clean.filter((x) => x < 1).length}/${v.clean.length}`,
        `· median ${v.clean.length ? median(v.clean).toFixed(3) : "-"} · max ${v.clean.length ? Math.max(...v.clean) : "-"} · load ${v.loads.length ? `${Math.min(...v.loads)}-${Math.max(...v.loads)}` : "-"}`);
}
