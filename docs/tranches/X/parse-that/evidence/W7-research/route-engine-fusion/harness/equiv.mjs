// SERVED MODEL: claude-opus-5-5
// route engine-fusion — CORRECTNESS: every arm's output against the stock BBNF path (value.js HEAD),
// isDeepStrictEqual, over all 29,944 corpus sources × 7 entries. Also the stock path against the
// retired parser, for reference (that disagreement set is the product's, not this route's).
//   node harness/equiv.mjs [arm …]   → out/equiv.json
import { writeFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
import { ENTRIES, INPUTS, armFns, uptime } from "./common.mjs";

const ARMS = process.argv.slice(2).length ? process.argv.slice(2) : ["np-direct", "fx-any", "fx-any-nf", "fx-guard", "fx-guard-nf", "fx-fused", "fx-fused-nf"];
const stock = await armFns("stock");
const res = { uptimeStart: uptime(), sources: INPUTS.length, arms: {} };
for (const arm of ARMS) {
    const fns = await armFns(arm);
    const row = {};
    for (const e of ENTRIES) {
        let n = 0; const samples = [];
        for (const s of INPUTS) {
            let a, b;
            try { a = fns[e](s); } catch (err) { a = { threw: String(err) }; }
            try { b = stock[e](s); } catch (err) { b = { threw: String(err) }; }
            if (!isDeepStrictEqual(a, b)) { n++; if (samples.length < 5) samples.push({ s, got: a, want: b }); }
        }
        row[e] = { mismatches: n, samples };
    }
    res.arms[arm] = row;
    console.log(arm.padEnd(12), ENTRIES.map((e) => `${e.replace("parse", "")}=${row[e].mismatches}`).join(" "));
}
res.uptimeEnd = uptime();
writeFileSync(path.join(import.meta.dirname, "../out", process.env.OUTFILE ?? "equiv.json"), JSON.stringify(res, null, 1));
