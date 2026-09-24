// One-time cost: a FRESH process per (round, variant): import the bundle, then the first parseCssColor.
import { execFileSync, execSync } from "node:child_process"; import { writeFileSync } from "node:fs"; import path from "node:path";
const here = path.resolve(import.meta.dirname, ".."), out = path.join(here, "out");
const names = ["base", "bbnf", "aot-text"], ROUNDS = Number(process.env.ROUNDS ?? 11);
const probe = (n) => `const t0=performance.now(); const m=await import(${JSON.stringify(path.join(out, n + ".mjs"))}); const t1=performance.now(); m.parseCssColor("red"); const t2=performance.now(); console.log(JSON.stringify([t1-t0,t2-t1]));`;
const up0 = execSync("uptime").toString().trim(); const res = Object.fromEntries(names.map((n) => [n, { import: [], first: [] }]));
for (let r = 0; r < ROUNDS; r++) for (const n of names.map((_, i) => names[(i + r) % names.length])) { const [a, b] = JSON.parse(execFileSync("node", ["--input-type=module", "-e", probe(n)], { encoding: "utf8" })); res[n].import.push(a); res[n].first.push(b); }
const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
const summary = Object.fromEntries(names.map((n) => [n, { importMedMs: +med(res[n].import).toFixed(2), firstParseMedMs: +med(res[n].first).toFixed(2), totalMedMs: +med(res[n].import.map((x, i) => x + res[n].first[i])).toFixed(2) }]));
const doc = { rounds: ROUNDS, uptimeBefore: up0, uptimeAfter: execSync("uptime").toString().trim(), summary, raw: res };
writeFileSync(path.join(here, "runs", "cold.json"), JSON.stringify(doc, null, 1)); console.log(JSON.stringify(summary), doc.uptimeBefore.replace(/.*averages?: /, ""), "->", doc.uptimeAfter.replace(/.*averages?: /, ""));
