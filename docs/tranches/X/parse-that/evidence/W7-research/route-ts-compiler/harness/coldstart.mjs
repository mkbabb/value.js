// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — ONE-TIME cost: in a FRESH process per reading, the bundle's import and its first
// parse (the BBNF arms compile their grammar there), arms alternating across rounds, paired to the
// retired parser's same two numbers.   node harness/coldstart.mjs [rounds=11]
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { OUT, median, uptime } from "./common.mjs";
const R = Number(process.argv[2] ?? 11);
const ARMS = ["retired", "stock", "proto-pos", "emit-pos"];
const probe = (a) => `const t0 = performance.now(); const m = await import(${JSON.stringify(path.join(OUT, a + ".mjs"))});
const t1 = performance.now(); const f = ${a === "retired" ? "m.hand" : "m.bbnf"}.parseCssColor; f("rgb(1 2 3)"); const t2 = performance.now();
f("hsl(1 2% 3%)"); const t3 = performance.now();
console.log(JSON.stringify({ importMs: t1 - t0, firstParseMs: t2 - t1, secondParseMs: t3 - t2 }));`;
const t = Object.fromEntries(ARMS.map((a) => [a, []]));
const u0 = uptime();
for (let r = 0; r < R; r++) {
    const order = r % 2 ? [...ARMS].reverse() : ARMS;
    for (const a of order) t[a].push(JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", probe(a)], { encoding: "utf8" })));
}
const u1 = uptime();
const rep = { rounds: R, uptimeBefore: u0, uptimeAfter: u1, arms: {} };
for (const a of ARMS) {
    const f = (k) => +median(t[a].map((x) => x[k])).toFixed(2);
    rep.arms[a] = { importMs: f("importMs"), firstParseMs: f("firstParseMs"), secondParseMs: f("secondParseMs"), raw: t[a] };
    console.log(a.padEnd(10), "import", f("importMs"), "ms | first parse (compile)", f("firstParseMs"), "ms | second parse", f("secondParseMs"), "ms");
}
console.log(u0, "\n", u1);
writeFileSync(path.join(import.meta.dirname, "..", "results", "coldstart.json"), JSON.stringify(rep, null, 1));
