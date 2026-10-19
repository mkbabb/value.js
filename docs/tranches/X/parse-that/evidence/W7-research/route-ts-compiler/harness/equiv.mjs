// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — EQUIVALENCE: every entry × every corpus source, the candidate arm's output
// against the stock BBNF path's (isDeepStrictEqual on the whole ParseResult; a throw is compared by
// its message). Also records agreement with the retired parser, as context.
//   node harness/equiv.mjs [arm=proto]
import { isDeepStrictEqual } from "node:util";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arm } from "./common.mjs";

const name = process.argv[2] ?? "proto";
const stock = await arm("stock"), cand = await arm(name), ret = await arm("retired");
const call = (fn, s) => { try { return fn(s); } catch (e) { return { threw: String(e?.message ?? e) }; } };
const report = { arm: name, corpus: INPUTS.length, entries: {} };
let total = 0;
for (const e of ENTRIES) {
    let mism = 0, stockRet = 0, candRet = 0, stockThrows = 0;
    const samples = [];
    for (const s of INPUTS) {
        const a = call(stock[e], s), b = call(cand[e], s), r = call(ret[e], s);
        if (a && a.threw) stockThrows++;
        if (!isDeepStrictEqual(a, b)) { mism++; if (samples.length < 5) samples.push({ s, stock: a, cand: b }); }
        if (isDeepStrictEqual(a, r)) stockRet++;
        if (isDeepStrictEqual(b, r)) candRet++;
    }
    total += mism;
    report.entries[e] = { mismatches: mism, stockThrows, agreeRetired: { stock: stockRet, cand: candRet }, samples };
    console.log(`${e.padEnd(22)} mismatches ${mism}  (stock throws ${stockThrows}; agree-with-retired stock ${stockRet} cand ${candRet})`);
    for (const x of samples.slice(0, 2)) console.log("   ", JSON.stringify(x).slice(0, 400));
}
report.totalMismatches = total;
console.log("TOTAL mismatches", total);
writeFileSync(path.join(import.meta.dirname, "..", "results", `equiv-${name}.json`), JSON.stringify(report, null, 1));
