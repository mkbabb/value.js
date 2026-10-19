import { readFileSync } from "node:fs";
import path from "node:path";
const CORPUS = "/Users/mkbabb/Programming/value.js/bench/css-equivalence";
const rows = (f) => JSON.parse(readFileSync(path.join(CORPUS, f), "utf8")).rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
const INPUTS = [...new Set([...rows("assay-corpus.json"), ...rows("real-corpus.json")])];
const m = await import(process.env.MOD);
const e = process.env.ENTRY ?? "parseCssValue";
for (let i = 0; i < Number(process.env.PASSES ?? 12); i++) for (const s of INPUTS) { try { m[e](s); } catch {} }
