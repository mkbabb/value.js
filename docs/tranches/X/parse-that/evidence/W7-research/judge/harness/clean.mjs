// SERVED MODEL: claude-opus-5-5
// judge — CELL HYGIENE over every per-entry bench file: a cell is CLEAN when the retired baseline's own
// passes spread less than SPREAD× (max/min) inside it (a host-load burst inflates both arms' passes
// unevenly and makes the per-round pairing meaningless). Prints, per arm × entry, every clean cell's
// paired median ratio and the count of contaminated cells set aside, plus the load span of the cells.
//   node judge/harness/clean.mjs [SPREAD=1.6] [prefix…]
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const DIR = path.resolve(import.meta.dirname, "..", "results");
const SPREAD = Number(process.argv[2] ?? 1.6);
const PREFIX = process.argv.slice(3);
const table = {};
const la = (u) => Number(u.split("averages:")[1].trim().split(/\s+/)[0]);
for (const f of readdirSync(DIR).filter((f) => /^bench-.*\.json$/.test(f) && (PREFIX.length === 0 || PREFIX.some((p) => f.startsWith(`bench-${p}`))))) {
    const r = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
    for (const [e, o] of Object.entries(r.entries)) {
        const ret = o.raw.retired, spread = Math.max(...ret) / Math.min(...ret);
        const clean = spread < SPREAD;
        for (const [a, x] of Object.entries(o.ratio)) {
            const k = `${e}|${a}`;
            table[k] ??= { clean: [], dirty: 0, loads: [] };
            if (clean) { table[k].clean.push(+x.paired.toFixed(3)); table[k].loads.push(la(o.uptimeBefore), la(o.uptimeAfter)); } else table[k].dirty++;
        }
    }
}
const out = {};
for (const [k, v] of Object.entries(table)) {
    const [e, a] = k.split("|");
    const s = [...v.clean].sort((x, y) => x - y);
    (out[a] ??= {})[e] = { cleanCells: s.length, dirtyCells: v.dirty, max: s.at(-1), median: s.length ? s[s.length >> 1] : null, below1: s.filter((x) => x < 1).length,
        load: v.loads.length ? `${Math.min(...v.loads)}-${Math.max(...v.loads)}` : null, ratios: s };
}
writeFileSync(path.join(DIR, `clean-${PREFIX.join("+") || "all"}-${SPREAD}.json`), JSON.stringify({ spread: SPREAD, prefixes: PREFIX, arms: out }, null, 1));
for (const [a, es] of Object.entries(out)) {
    console.log(a);
    for (const [e, v] of Object.entries(es)) console.log("  ", e.padEnd(22), `clean ${v.cleanCells} (set aside ${v.dirtyCells}) · below 1.0: ${v.below1}/${v.cleanCells} · max ${v.max} · median ${v.median} · load ${v.load}`);
}
