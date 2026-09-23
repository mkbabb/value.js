// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.x — THE BENCH OF RECORD (the D-23 perf bar): value.js's BBNF grammar (`src/css/grammar/*.bbnf`
// compiled by `@mkbabb/bbnf-lang` onto `@mkbabb/parse-that`) against the hand parser it retired
// (`src/css/grammar.ts` at `RETIRED_AT`, read back from git by `./retired.ts`), over the six parse
// entries both carry. One iteration parses EVERY distinct source of the differential corpus
// (`css-equivalence/`: the assay union, 27,021 rows, and the real-CSS arms, 3,049 rows) through one
// entry — the same inputs the equivalence harness classifies, so speed and agreement are read over
// one population. Run at a quiesced load: `npx vitest bench --run -c bench/vitest.config.ts`.

import { readFileSync } from "node:fs";
import path from "node:path";
import { bench, describe } from "vitest";

import * as bbnf from "../src/css/bbnf/index";
import { ENTRIES } from "./css-equivalence/differential";
import { RETIRED_AT, retiredHandParser } from "./retired";

const hand = await retiredHandParser();

type Row = { s: string | { src: string } };
const corpus = (file: string): string[] => {
    const data = JSON.parse(readFileSync(path.join(import.meta.dirname, "css-equivalence", file), "utf8")) as { rows: Row[] };
    return data.rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
};
const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];

// The BBNF grammar compiles once, on first use; the first bench iteration must not pay for it.
bbnf.parseCssColor("red");

for (const entry of ENTRIES) {
    describe(`${entry} × ${INPUTS.length} sources`, () => {
        bench("BBNF grammar (src/css/grammar/*.bbnf)", () => {
            for (const source of INPUTS) bbnf[entry](source);
        }, { time: 2_000, warmupTime: 500 });
        bench(`retired hand parser (src/css/grammar.ts @ ${RETIRED_AT.slice(0, 8)})`, () => {
            for (const source of INPUTS) hand[entry](source);
        }, { time: 2_000, warmupTime: 500 });
    });
}
