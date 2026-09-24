// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — every (arm, entry) cell in its OWN fresh process, paired with the
// retired parser in that same process (11 interleaved rounds, gc() before each pass): no arm shares
// inline caches with another arm. The matrix is run twice with the arm order reversed.
// Arms: candidate (stock) · variant-bundled (control) · variant-noerr · variant-noproto ·
// variant-both · variant-both+direct (lazy nonterminals rebound after the actions attach).
//   [ARMS=a,b,…] [OUTFILE=x.json] node --expose-gc <dir>/isolated.mjs [entry…]
import { execFileSync } from "node:child_process";
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arms, bindDirect, load, median, uptime } from "./common.mjs";

if (process.argv[2] === "child") {
    const [, , , arm, entry] = process.argv;
    const direct = arm.endsWith("+direct");
    const mod = await load(arm.replace("+direct", ""));
    if (direct) bindDirect(mod.bbnf.grammar()).rebind();
    const ref = await load("candidate");
    const B = arms({ cand: mod }).bbnf[entry], R = arms({ ret: await load("retired") }).retired[entry];
    // correctness against the stock BBNF path (a separate module instance, run BEFORE timing only)
    let mismatch = 0;
    if (arm !== "candidate") { const S = arms({ cand: ref }).bbnf[entry]; for (const s of INPUTS) if (!isDeepStrictEqual(B(s), S(s))) mismatch++; }
    const gc = globalThis.gc ?? (() => {});
    const pass = (fn) => { gc(); const t = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t; };
    for (let w = 0; w < 2; w++) { pass(B); pass(R); }
    const b = [], r = [];
    for (let i = 0; i < 11; i++) { if (i % 2) { r.push(pass(R)); b.push(pass(B)); } else { b.push(pass(B)); r.push(pass(R)); } }
    process.stdout.write(JSON.stringify({ mismatch, bbnfMs: +median(b).toFixed(2), bbnfMin: +Math.min(...b).toFixed(2), retiredMs: +median(r).toFixed(2), retiredMin: +Math.min(...r).toFixed(2), paired: +median(b.map((x, i) => x / r[i])).toFixed(3) }));
    process.exit(0);
}
const ARMS = process.env.ARMS ? process.env.ARMS.split(",") : ["candidate", "variant-bundled", "variant-noerr", "variant-noproto", "variant-both", "variant-both+direct"];
const OUTFILE = process.env.OUTFILE ?? "isolated-result.json";
const ONLY = process.argv.slice(2);
const ALL = [...ENTRIES, "parseStylesheet"].filter((e) => ONLY.length === 0 || ONLY.includes(e));
const rep = { script: "isolated.mjs", uptimeStart: uptime(), cells: [] };
console.log(rep.uptimeStart);
for (let rep_i = 0; rep_i < 2; rep_i++) {
    for (const entry of ALL) {
        const order = rep_i ? [...ARMS].reverse() : ARMS;
        const u0 = uptime();
        const row = {};
        for (const arm of order) {
            const res = JSON.parse(execFileSync(process.execPath, ["--expose-gc", import.meta.filename, "child", arm, entry], { encoding: "utf8", maxBuffer: 1 << 20 }));
            rep.cells.push({ rep: rep_i, entry, arm, ...res });
            row[arm] = res.paired + (res.mismatch ? `(!${res.mismatch})` : "");
        }
        console.log(rep_i, entry.padEnd(22), JSON.stringify(row), "|", u0.split("averages:")[1], "->", uptime().split("averages:")[1]);
    }
}
rep.uptimeEnd = uptime();
// summary: median over the two reps of each (entry, arm)'s paired ratio vs retired
rep.summary = {};
for (const entry of ALL) rep.summary[entry] = Object.fromEntries(ARMS.map((a) => [a, +median(rep.cells.filter((c) => c.entry === entry && c.arm === a).map((c) => c.paired)).toFixed(2)]));
console.log(JSON.stringify(rep.summary, null, 1));
writeFileSync(path.join(import.meta.dirname, OUTFILE), JSON.stringify(rep, null, 1));
