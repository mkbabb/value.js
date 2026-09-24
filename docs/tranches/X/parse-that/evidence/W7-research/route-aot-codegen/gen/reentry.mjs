// Counts, per rule, calls re-entered at an offset already visited in the same run (text variant).
import { writeFileSync } from "node:fs"; import path from "node:path";
import { emit, grammarText } from "./emit.mjs";
import { build, common, rawPlugin, aotPlugin, here } from "./build-lib.mjs";
import { readFileSync } from "node:fs";
const out = path.join(here, "out");
const m = JSON.parse(readFileSync(path.join(out, "manifest-text.json"), "utf8"));
writeFileSync(path.join(out, "css-grammar.count.js"), emit(grammarText(), m, { countReentry: true }));
await build({ ...common, entryPoints: [path.join(here, "harness", "entry-aot.ts")], outfile: path.join(out, "count.mjs"), plugins: [rawPlugin, aotPlugin(path.join(out, "css-grammar.count.js"), true)] });
const { INPUTS, ENTRIES } = await import("../harness/equiv.mjs");
const mod0 = await import(path.join(out, "count.mjs")); mod0.parseCssColor("red"); const g = globalThis.__AOT_COUNT;
const mod = await import(path.join(out, "count.mjs"));
const res = {};
for (const e of ENTRIES) {
    for (const k of Object.keys(g.REENTER)) delete g.REENTER[k]; for (const k of Object.keys(g.CALLS)) delete g.CALLS[k];
    for (const s of INPUTS) { try { mod[e](s); } catch {} }
    res[e] = Object.entries(g.REENTER).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([n, c]) => `${n} ${c}/${g.CALLS[n]}`);
    console.log(e, res[e].slice(0, 8).join(" | "));
}
writeFileSync(path.join(here, "reentry.json"), JSON.stringify(res, null, 1));
