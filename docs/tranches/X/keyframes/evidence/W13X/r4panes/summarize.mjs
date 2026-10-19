// SERVED MODEL: claude-opus-5-5 — per-gate tally of an r4panes reading (self-count: ok !== undefined).
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    const by = {};
    for (const r of j.res) for (const [k, v] of Object.entries(r.ok)) { by[k] ??= [0, 0]; by[k][1]++; if (v) by[k][0]++; }
    console.log(f, `${j.pass}/${j.of}`, Object.entries(by).map(([k, [a, b]]) => `${k} ${a}/${b}`).join(" · "));
}
