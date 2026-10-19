// Correctness gate: every AOT variant vs the product BBNF path (bbnf-lang 0.1.4 + parse-that 0.8.2),
// all 7 bench entries x every distinct source of assay-corpus.json ∪ real-corpus.json; deep equality
// of the whole ParseResult (or of the thrown message).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import path from "node:path";
const here = path.resolve(import.meta.dirname, ".."), out = path.join(here, "out");
const CORPUS = "/Users/mkbabb/Programming/value.js/bench/css-equivalence";
const rows = (f) => JSON.parse(readFileSync(path.join(CORPUS, f), "utf8")).rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
export const INPUTS = [...new Set([...rows("assay-corpus.json"), ...rows("real-corpus.json")])];
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
const call = (f, s) => { try { return { r: f(s) }; } catch (e) { return { threw: String(e?.message ?? e) }; } };
if (import.meta.main ?? process.argv[1] === import.meta.filename) {
    const bbnf = await import(path.join(out, "bbnf.mjs"));
    const variants = (process.env.VARIANTS?.split(",") ?? readdirSync(out).filter((f) => /^aot-.*\.mjs$/.test(f)).map((f) => f.slice(4, -4)));
    const res = { inputs: INPUTS.length, entries: {} };
    for (const v of variants) {
        const aot = await import(path.join(out, `aot-${v}.mjs`));
        for (const e of ENTRIES) {
            let mismatch = 0, threwA = 0, threwB = 0; const examples = [];
            for (const s of INPUTS) {
                const a = call(bbnf[e], s), b = call(aot[e], s);
                if (a.threw) threwA++; if (b.threw) threwB++;
                if (!isDeepStrictEqual(a, b)) { mismatch++; if (examples.length < 5) examples.push({ s: s.slice(0, 100), bbnf: JSON.stringify(a).slice(0, 300), aot: JSON.stringify(b).slice(0, 300) }); }
            }
            (res.entries[e] ??= {})[v] = { mismatch, threwBbnf: threwA, threwAot: threwB, examples };
            console.log(v.padEnd(8), e.padEnd(22), "mismatch", mismatch, "/", INPUTS.length, "threw bbnf", threwA, "aot", threwB);
        }
    }
    writeFileSync(path.join(here, process.env.OUT ?? "equivalence.json"), JSON.stringify(res, null, 1));
}
