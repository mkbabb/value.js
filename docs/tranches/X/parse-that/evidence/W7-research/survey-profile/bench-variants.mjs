// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — WHAT-IF levers, measured against the retired hand parser in the
// same process, same corpus, interleaved (arm order rotated each round, gc() before each pass).
// Arms: retired · bbnf (stock: external node_modules) · bundled (parse-that+bbnf-lang bundled, no
// patch — the control for every variant) · noerr · noproto · both · both-direct (both, plus every
// bbnf-lang lazy nonterminal rebound to its resolved target after the actions attach).
// Every variant's outputs are compared (isDeepStrictEqual) with the stock BBNF path's on the whole
// corpus; a mismatch count is reported per entry.
//   node --expose-gc <dir>/bench-variants.mjs [rounds=9] [entry…]
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arms, bindDirect, load, median, uptime } from "./common.mjs";

const ROUNDS = Number(process.argv[2] ?? 9);
const ONLY = process.argv.slice(3);
const ALL = [...ENTRIES, "parseStylesheet"].filter((e) => ONLY.length === 0 || ONLY.includes(e));

const mods = {
    retired: await load("retired"), bbnf: await load("candidate"), bundled: await load("variant-bundled"),
    noerr: await load("variant-noerr"), noproto: await load("variant-noproto"), both: await load("variant-both"),
    "both-direct": await load("variant-both-direct"),
};
const A = {};
for (const [k, m] of Object.entries(mods)) A[k] = arms(k === "retired" ? { ret: m } : { cand: m })[k === "retired" ? "retired" : "bbnf"];
for (const k of Object.keys(A)) if (k !== "retired") A[k].parseCssColor("red");
const direct = bindDirect(mods["both-direct"].bbnf.grammar());
direct.rebind();

const names = Object.keys(A);
const gc = globalThis.gc ?? (() => {});
const rep = { script: "bench-variants.mjs", node: process.version, corpus: INPUTS.length, rounds: ROUNDS, graph: { parsers: direct.parsers, lazies: direct.lazies }, uptimeStart: uptime(), entries: {} };
console.log(rep.uptimeStart, JSON.stringify(rep.graph));
for (const entry of ALL) {
    const mismatch = {};
    for (const a of names) if (a !== "retired" && a !== "bbnf") mismatch[a] = 0;
    for (const s of INPUTS) {
        const b = A.bbnf[entry](s);
        for (const a of Object.keys(mismatch)) if (!isDeepStrictEqual(b, A[a][entry](s))) mismatch[a]++;
    }
    const t = Object.fromEntries(names.map((a) => [a, []]));
    const pass = (fn) => { gc(); const t0 = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t0; };
    for (let w = 0; w < 2; w++) for (const a of names) pass(A[a][entry]);
    const u0 = uptime();
    for (let r = 0; r < ROUNDS; r++) {
        const order = names.map((_, i) => names[(i + r) % names.length]);
        if (r % 2) order.reverse();
        for (const a of order) t[a].push(pass(A[a][entry]));
    }
    const u1 = uptime();
    const med = Object.fromEntries(names.map((a) => [a, +median(t[a]).toFixed(2)]));
    const min = Object.fromEntries(names.map((a) => [a, +Math.min(...t[a]).toFixed(2)]));
    const overRetired = Object.fromEntries(names.map((a) => [a, +median(t[a].map((x, i) => x / t.retired[i])).toFixed(2)]));
    const overBundled = Object.fromEntries(names.map((a) => [a, +median(t[a].map((x, i) => x / t.bundled[i])).toFixed(3)]));
    rep.entries[entry] = { uptimeBefore: u0, uptimeAfter: u1, mismatchVsStockBbnf: mismatch, medianMs: med, minMs: min, pairedOverRetired: overRetired, pairedOverBundled: overBundled, raw: t };
    console.log(entry.padEnd(22), "×retired(paired med):", JSON.stringify(overRetired), "| ×bundled:", JSON.stringify(overBundled), "| mism", JSON.stringify(mismatch), "|", u0.split("averages:")[1], "->", u1.split("averages:")[1]);
}
rep.uptimeEnd = uptime();
const out = path.join(import.meta.dirname, `variants-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
writeFileSync(out, JSON.stringify(rep, null, 1));
console.log(rep.uptimeEnd, "→", out);
