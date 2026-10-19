// Directional probe (NON-CERTIFYING, non-equivalent work):
//  A = bbnf-lang Rust TsEmitter output (checked-in generated_json.mjs, count-only recognizer: object/array -> span)
//  B = @mkbabb/bbnf-lang 0.1.4 runtime interpreter (BBNFToParser on parse-that 0.8.2) -- the path value.js uses
//  B0 = same interpreter, with values (maps) per bbnf-lang's own json_bench.mjs
//  N = JSON.parse (V8 native)
// Interleaved A/B/B0/N per round, rotating order; >=9 rounds; median + min per parse.
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const bbnfPath = require.resolve("@mkbabb/bbnf-lang");
const { BBNFToParser } = await import(bbnfPath);
const gen = await import(new URL("./generated_json.mjs", import.meta.url));
let g = readFileSync(new URL("./json.bbnf", import.meta.url), "utf8").replace(/\s*->\s*[^;|]+?(?=\s*(;|\|))/g, "").replace(/@pretty[^;]*;/g, "");
function build(maps) {
  const [nt] = BBNFToParser(g);
  if (maps) {
    nt.null = nt.null.map(() => null); nt.bool = nt.bool.map((v) => v === "true");
    nt.number = nt.number.map(Number);
    nt.string = nt.string.map((s) => (s.indexOf("\\") === -1 ? s.slice(1, -1) : JSON.parse(s)));
    nt.object = nt.object.map((pairs) => Object.fromEntries(pairs));
  }
  return nt.value.trim();
}
const interpRaw = build(false), interpVal = build(true);
const files = (process.argv[2] || "twitter,citm_catalog,canada").split(",");
const ROUNDS = +(process.argv[3] || 9);
const arms = {
  A_tsEmit: (s) => { const r = gen.parse(TRIM.get(s)); if (r.result === null) throw new Error("A fail"); },
  B_interpRaw: (s) => { const r = interpRaw.parse(s); if (r === undefined || r === null) throw new Error("B fail"); },
  B0_interpVal: (s) => { const r = interpVal.parse(s); if (r === undefined || r === null) throw new Error("B0 fail"); },
  N_jsonParse: (s) => JSON.parse(s),
};
const TRIM = new Map();
const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
const out = { node: process.version, bbnf: bbnfPath, rounds: ROUNDS, rows: {} };
for (const f of files) {
  const s = readFileSync(`/Users/mkbabb/Programming/bbnf-lang/data/json/${f}.json`, "utf8");
  TRIM.set(s, s.trimEnd()); // emitted parser has no trailing-ws rule; trimmed once, outside timing
  for (const k in arms) { for (let i = 0; i < 5; i++) arms[k](s); } // warm
  const names = Object.keys(arms), samples = Object.fromEntries(names.map((n) => [n, []]));
  for (let r = 0; r < ROUNDS; r++) {
    const order = names.map((_, i) => names[(i + r) % names.length]);
    for (const n of order) { const iters = 5; const t0 = performance.now(); for (let i = 0; i < iters; i++) arms[n](s); samples[n].push((performance.now() - t0) / iters); }
  }
  const row = {};
  for (const n of names) row[n] = { median_ms: +med(samples[n]).toFixed(3), min_ms: +Math.min(...samples[n]).toFixed(3) };
  const bm = row.B_interpRaw.median_ms, bn = row.B_interpRaw.min_ms;
  for (const n of names) { row[n].ratio_vs_B_median = +(row[n].median_ms / bm).toFixed(3); row[n].ratio_vs_B_min = +(row[n].min_ms / bn).toFixed(3); }
  out.rows[f] = row;
  console.error(f, JSON.stringify(row));
}
console.log(JSON.stringify(out, null, 1));
