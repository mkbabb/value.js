// A/B/C in ONE process: retired hand parser (BASE) vs BBNF@parse-that 0.8.2 (product) vs BBNF@parse-that HEAD.
// Correctness first (HEAD vs 0.8.2 deep-equality over every source × entry), then interleaved timing rounds.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { isDeepStrictEqual } from "node:util";
import path from "node:path";
const here = import.meta.dirname;
const ROUNDS = Number(process.env.ROUNDS ?? 9);
const CORPUS = "/Users/mkbabb/Programming/value.js/bench/css-equivalence";
const rows = (f) => JSON.parse(readFileSync(path.join(CORPUS, f), "utf8")).rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
const INPUTS = [...new Set([...rows("assay-corpus.json"), ...rows("real-corpus.json")])];
const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction"];
const V = { base: await import("./out/base.mjs"), pt082: await import("./out/bbnf-082.mjs"), head: await import("./out/bbnf-head.mjs") };
if (process.env.NOHEAD) delete V.head;
if (process.env.ABL3) V.abl_head_mapstate = await import("./out/bbnf-abl-headms.mjs");
if (process.env.ABL2) V.abl082_mapstate = await import("./out/bbnf-082-abl-mapstate.mjs");
if (process.env.ABL) for (const v of ["lazy", "err", "both"]) V["abl_" + v] = await import(`./out/bbnf-abl-${v}.mjs`);
const uptime = () => execSync("uptime").toString().trim();
const out = { node: process.version, inputs: INPUTS.length, rounds: ROUNDS, uptimeStart: uptime(), correctness: {}, timing: {} };

const call = (f, s) => { try { return { r: f(s) }; } catch (e) { return { threw: String(e?.message ?? e).slice(0, 120) }; } };
for (const e of ENTRIES) {
  out.correctness[e] = {};
  for (const n of Object.keys(V).filter((n) => n !== "base" && n !== "pt082")) {
    let mismatch = 0, threw = 0; const examples = [];
    for (const s of INPUTS) {
      const a = call(V.pt082[e], s), b = call(V[n][e], s);
      if (b.threw) threw++;
      if (!isDeepStrictEqual(a, b)) { mismatch++; if (examples.length < 4) examples.push({ s: s.slice(0, 80), pt082: JSON.stringify(a).slice(0, 200), [n]: JSON.stringify(b).slice(0, 200) }); }
    }
    out.correctness[e][n] = { mismatchVsPt082: mismatch, threw, examples };
    console.log(e, n, "mismatch vs 0.8.2", mismatch, "/", INPUTS.length, "threw", threw);
  }
}

const pass = (f) => { const t = performance.now(); for (const s of INPUTS) { try { f(s); } catch {} } return performance.now() - t; };
const med = (a) => { const b = [...a].sort((x, y) => x - y); const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
for (const e of ENTRIES) {
  const names = Object.keys(V); const ms = Object.fromEntries(names.map((n) => [n, []]));
  for (const n of names) { pass(V[n][e]); pass(V[n][e]); }            // warmup (JIT) — 2 passes each
  const upBefore = uptime();
  for (let r = 0; r < ROUNDS; r++) {
    const order = names.map((_, i) => names[(i + r) % names.length]); // rotate order each round
    for (const n of order) ms[n].push(pass(V[n][e]));
  }
  const upAfter = uptime();
  const row = { uptimeBefore: upBefore, uptimeAfter: upAfter };
  for (const n of names) row[n] = { medianMs: +med(ms[n]).toFixed(2), minMs: +Math.min(...ms[n]).toFixed(2), rawMs: ms[n].map((x) => +x.toFixed(2)) };
  row.ratio_pt082_over_base_median = +(row.pt082.medianMs / row.base.medianMs).toFixed(3);
  if (row.head) { row.ratio_head_over_base_median = +(row.head.medianMs / row.base.medianMs).toFixed(3); row.ratio_head_over_pt082_median = +(row.head.medianMs / row.pt082.medianMs).toFixed(3); row.ratio_head_over_base_min = +(row.head.minMs / row.base.minMs).toFixed(3); }
  row.ratio_pt082_over_base_min = +(row.pt082.minMs / row.base.minMs).toFixed(3);
  out.timing[e] = row;
  for (const n of names) row[n].ratioOverBaseMedian = +(row[n].medianMs / row.base.medianMs).toFixed(3), row[n].ratioOverPt082Median = +(row[n].medianMs / row.pt082.medianMs).toFixed(3);
  console.log(e, names.map((n) => `${n}=${row[n].medianMs}ms(x${row[n].ratioOverBaseMedian} base, x${row[n].ratioOverPt082Median} 082)`).join("  "));
}
out.uptimeEnd = uptime();
const file = process.env.OUT ?? path.join(here, `../run-${Date.now()}.json`);
writeFileSync(file, JSON.stringify(out, null, 1));
console.log("wrote", file);
