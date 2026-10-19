// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — where the one-time compile goes (fresh process per reading, median of N):
// BBNF text → AST (bbnf-lang 0.1.4 front-end on parse-that HEAD), FIRST analysis, closure build,
// emit (source text + new Function), and the AOT alternative: AST from JSON (a build-time artifact).
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { OUT, REPO, median, uptime } from "./common.mjs";
const SEAT = path.resolve(import.meta.dirname, "..");
const out = path.join(OUT, "phases.mjs");
await build({
    stdin: { contents: `
export { compileGrammar } from "${SEAT}/src/compile.ts";
export { emitGrammar } from "${SEAT}/src/emit.ts";
export { analyzeFirst } from "${SEAT}/src/analysis.ts";
export { BBNFToASTWithImports } from "${SEAT}/vendor/bbnf-0.1.4/parse.ts";`, resolveDir: SEAT, loader: "ts" },
    bundle: true, platform: "node", format: "esm", outfile: out, logLevel: "error",
    alias: { "@mkbabb/parse-that": `${SEAT}/vendor/parse-that-head/index.ts` },
});
const text = ["tokens", "math", "color", "value", "stylesheet"].map((n) => readFileSync(`${REPO}/src/css/grammar/${n}.bbnf`, "utf8")).join("\n");
writeFileSync(path.join(OUT, "grammar.txt"), text);
const probe = `const t0 = performance.now();
const m = await import(${JSON.stringify(out)});
const text = (await import("node:fs")).readFileSync(${JSON.stringify(path.join(OUT, "grammar.txt"))}, "utf8");
const t1 = performance.now(); const [, g] = m.BBNFToASTWithImports(text);
const t2 = performance.now(); m.analyzeFirst(g.rules);
const t3 = performance.now(); const c = m.compileGrammar(g.rules); for (const n of g.rules.keys()) c.rule(n);
const t4 = performance.now(); m.emitGrammar(g.rules);
const t5 = performance.now();
const json = JSON.stringify([...g.rules].map(([k, r]) => [k, r.expression]), (k, v) => (k === "range" || k === "comment" ? undefined : v instanceof RegExp ? { re: v.source, f: v.flags } : v));
const t6 = performance.now(); const back = new Map(JSON.parse(json, (k, v) => (v && typeof v === "object" && "re" in v ? new RegExp(v.re, v.f) : v)).map(([k, e]) => [k, { expression: e }]));
const c2 = m.compileGrammar(back); for (const n of back.keys()) c2.rule(n);
const t7 = performance.now();
console.log(JSON.stringify({ importMs: t1 - t0, bbnfToAstMs: t2 - t1, analysisMs: t3 - t2, closureCompileMs: t4 - t3, emitMs: t5 - t4, aotJsonToClosuresMs: t7 - t6, astJsonBytes: json.length }));`;
const R = 9, rows = [];
const u0 = uptime();
for (let r = 0; r < R; r++) rows.push(JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", probe], { encoding: "utf8" })));
const u1 = uptime();
const rep = Object.fromEntries(Object.keys(rows[0]).map((k) => [k, +median(rows.map((x) => x[k])).toFixed(2)]));
console.log(rep, "\n", u0, "\n", u1);
writeFileSync(path.join(SEAT, "results", "compile-phases.json"), JSON.stringify({ rounds: R, uptimeBefore: u0, uptimeAfter: u1, median: rep, raw: rows }, null, 1));
