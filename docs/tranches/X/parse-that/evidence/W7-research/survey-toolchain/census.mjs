// Structural census (COUNTS, not timings) of the BBNF-compiled value.js grammar as bbnf-lang 0.1.4
// builds it on parse-that 0.8.2. Raw grammar (no value.js semantic actions attached).
// Run from the value.js root: node docs/tranches/X/parse-that/evidence/W7-research/survey-toolchain/census.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import { BBNFToParser } from "@mkbabb/bbnf-lang";
import { Parser, ParserState } from "@mkbabb/parse-that";

const root = process.cwd();
const g = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(path.join(root, "src/css/grammar", m + ".bbnf"), "utf8")).join("\n");
const t0 = performance.now();
const [rules, ast] = BBNFToParser(g);
const compileMs = performance.now() - t0;

// ── static graph ──
const seen = new Set(); const byType = {}; let lazies = 0;
// generate.ts:273-274 renames each nonterminal's Parser.lazy node to the rule name; detect by shape.
const isLazy = (p) => { const c = p.context ?? {}; return c.parser === undefined && c.args?.length === 1 && typeof c.args[0] === "function"; };
const kids = (p) => {
  const c = p.context ?? {}; const out = [];
  if (c.parser instanceof Parser) out.push(c.parser);
  for (const a of c.args ?? []) {
    if (a instanceof Parser) out.push(a);
    else if (typeof a === "function" && isLazy(p)) { try { const r = a(); if (r instanceof Parser) out.push(r); } catch {} }
  }
  return out;
};
const stack = Object.values(rules);
while (stack.length) { const p = stack.pop(); if (seen.has(p)) continue; seen.add(p); const n = p.context?.name ?? "?"; byType[n] = (byType[n] ?? 0) + 1; if (isLazy(p)) lazies++; stack.push(...kids(p)); }

// alternation strategy per rule-level alternation (from AST): how many alternations dispatch vs any()
const altStats = { dispatch: 0, any: 0 };
for (const p of seen) { const n = p.context?.name; if (n === "dispatch") altStats.dispatch++; if (n === "any") altStats.any++; }

// ── dynamic counts ──
const calls = {}; const fails = {}; let lazyCalls = 0;
for (const p of seen) {
  const inner = p.parser; const lz = isLazy(p); const n = lz ? "lazy(ref)" : (p.context?.name ?? "?");
  p.parser = (s) => { calls[n] = (calls[n] ?? 0) + 1; const r = inner(s); if (s.isError) fails[n] = (fails[n] ?? 0) + 1; return r; };
}
const corpus = (f) => JSON.parse(readFileSync(path.join(root, "bench/css-equivalence", f), "utf8")).rows.map((r) => (typeof r.s === "string" ? r.s : r.s.src));
const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];
const chars = INPUTS.reduce((a, s) => a + s.length, 0);
const out = { compileMs: +compileMs.toFixed(1), rulesInTable: Object.keys(rules).length, astRules: ast.size, staticNodes: seen.size, byType: Object.fromEntries(Object.entries(byType).filter(([k]) => !(k in rules) )), lazyNonterminalRefNodes: lazies, altStats, inputs: INPUTS.length, chars, entries: {} };
for (const entry of ["colorTop", "valueTop", "scalarTop", "keyframeSelector", "timingFunction"]) {
  for (const k of Object.keys(calls)) delete calls[k]; lazyCalls = 0; for (const k of Object.keys(fails)) delete fails[k];
  const rule = rules[entry]; let ok = 0;
  for (const s of INPUTS) { rule.reset(); const st = rule.call(new ParserState(s)); if (!st.isError && st.offset === s.length) ok++; }
  const total = Object.values(calls).reduce((a, b) => a + b, 0); const tf = Object.values(fails).reduce((a, b) => a + b, 0);
  const top = Object.entries(calls).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => [k, v, fails[k] ?? 0]);
  out.entries[entry] = { lazyRefCalls: calls["lazy(ref)"] ?? 0, accepted: ok, combinatorCalls: total, callsPerChar: +(total / chars).toFixed(2), failedCalls: tf, failRatio: +(tf / total).toFixed(3), topByCalls_name_calls_fails: top };
}
console.log(JSON.stringify(out, null, 1));
