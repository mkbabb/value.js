// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — shared loaders: the corpus of record + the bundles build.mjs writes.
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

export const REPO = "/Users/mkbabb/Programming/value.js";
export const OUT = path.join(tmpdir(), "value-js-w7-route-ts-compiler");
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
const corpus = (file) => JSON.parse(readFileSync(path.join(REPO, "bench/css-equivalence", file), "utf8")).rows
    .map((r) => (typeof r.s === "string" ? r.s : r.s.src));
/** The bench of record's population: the distinct sources of assay ∪ real (29,944). */
export const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];
export const uptime = () => execSync("uptime", { encoding: "utf8" }).trim();
export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** arm name → { entry → fn(source) } */
export async function arm(name) {
    const m = await import(path.join(OUT, `${name}.mjs`));
    const lib = name === "retired" ? m.hand : m.bbnf;
    return Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : lib[e]]));
}
