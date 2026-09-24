// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — does one entry's use of `mapState` slow the OTHER entries (shared
// inline caches over ParserState)? Each cell is a FRESH process holding one BBNF arm + the retired
// parser: optionally "polluted" first by two passes of parseCssValue over the corpus (as an app that
// parses values and colours would be), then 9 interleaved rounds of the entry vs retired.
//   node --expose-gc <dir>/pollution.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { INPUTS, arms, load, median, uptime } from "./common.mjs";

if (process.argv[2] === "child") {
    const [, , , which, entry, pollute] = process.argv;
    const A = { ...arms({ cand: await load(which) }), ...arms({ ret: await load("retired") }) };
    const gc = globalThis.gc ?? (() => {});
    const pass = (fn) => { gc(); const t = performance.now(); for (const s of INPUTS) fn(s); return performance.now() - t; };
    if (pollute === "1") for (let i = 0; i < 2; i++) for (const s of INPUTS) A.bbnf.parseCssValue(s);
    for (let w = 0; w < 2; w++) { pass(A.bbnf[entry]); pass(A.retired[entry]); }
    const b = [], r = [];
    for (let i = 0; i < 9; i++) {
        if (i % 2) { r.push(pass(A.retired[entry])); b.push(pass(A.bbnf[entry])); } else { b.push(pass(A.bbnf[entry])); r.push(pass(A.retired[entry])); }
    }
    process.stdout.write(JSON.stringify({ bbnfMs: +median(b).toFixed(2), retiredMs: +median(r).toFixed(2), paired: +median(b.map((x, i) => x / r[i])).toFixed(2) }));
    process.exit(0);
}
const rep = { script: "pollution.mjs", uptimeStart: uptime(), cells: [] };
console.log(rep.uptimeStart);
for (const entry of ["parseCssColor", "parseCssScalar", "parseKeyframeSelector", "parseTimingFunction"])
    for (const which of ["candidate", "variant-noproto"])
        for (const pollute of ["0", "1"]) {
            const res = JSON.parse(execFileSync(process.execPath, ["--expose-gc", import.meta.filename, "child", which, entry, pollute], { encoding: "utf8" }));
            rep.cells.push({ entry, which, polluted: pollute === "1", ...res });
            console.log(entry.padEnd(22), which.padEnd(16), pollute === "1" ? "polluted" : "clean   ", JSON.stringify(res));
        }
rep.uptimeEnd = uptime();
console.log(rep.uptimeEnd);
writeFileSync(path.join(import.meta.dirname, "pollution-result.json"), JSON.stringify(rep, null, 1));
