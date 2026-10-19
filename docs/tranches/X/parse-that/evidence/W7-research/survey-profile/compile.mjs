// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — ONE-TIME cost vs steady state.
//  (1) COLD, fresh process each, interleaved candidate/retired (>=7 rounds): module import, then
//      the first parse (the candidate compiles its grammar + attaches actions on it), then a 2nd.
//  (2) WARM, in-process, the compile's phases repeated: BBNF text → AST (bbnf-lang's own parse-that
//      grammar), dedup+analysis+FIRST sets, AST → parse-that combinators, value.js action attach.
//   node --expose-gc <dir>/compile.mjs [rounds=9]     (cwd: value.js; after build.mjs)
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { OUT, REPO, load, median, uptime } from "./common.mjs";

if (process.argv[2] === "child") {
    const which = process.argv[3];
    const t0 = performance.now();
    const m = await import(path.join(OUT, `${which}.mjs`));
    const t1 = performance.now();
    const f = which === "retired" ? m.hand.parseCssColor : m.bbnf.parseCssColor;
    f("red");
    const t2 = performance.now();
    f("rgb(1 2 3)");
    const t3 = performance.now();
    process.stdout.write(JSON.stringify({ sinceBootToScript: +t0.toFixed(2), importMs: +(t1 - t0).toFixed(2), firstParseMs: +(t2 - t1).toFixed(2), secondParseMs: +(t3 - t2).toFixed(3) }));
    process.exit(0);
}

const ROUNDS = Number(process.argv[2] ?? 9);
const rep = { script: "compile.mjs", node: process.version, rounds: ROUNDS, uptimeStart: uptime(), cold: { candidate: [], retired: [] } };
console.log(rep.uptimeStart);
for (let r = 0; r < ROUNDS; r++) {
    const order = r % 2 ? ["retired", "candidate"] : ["candidate", "retired"];
    for (const w of order) rep.cold[w].push(JSON.parse(execFileSync(process.execPath, [import.meta.filename, "child", w], { encoding: "utf8" })));
}
rep.uptimeAfterCold = uptime();
const coldSumm = (xs, k) => ({ median: +median(xs.map((x) => x[k])).toFixed(2), min: +Math.min(...xs.map((x) => x[k])).toFixed(2) });
rep.coldSummary = Object.fromEntries(["candidate", "retired"].map((w) => [w, Object.fromEntries(["importMs", "firstParseMs", "secondParseMs"].map((k) => [k, coldSumm(rep.cold[w], k)]))]));

// (2) warm phases
const bl = await import("@mkbabb/bbnf-lang");
const cand = await load("candidate");
const text = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(path.join(REPO, "src/css/grammar", `${m}.bbnf`), "utf8")).join("\n");
const ph = { astMs: [], analysisMs: [], toParserMs: [], attachMs: [], wholeBBNFToParserMs: [] };
for (let r = 0; r < ROUNDS + 3; r++) {
    globalThis.gc?.();
    let t = performance.now();
    const [, g] = bl.BBNFToASTWithImports(text);
    const ast = g.rules;
    let u = performance.now(); const a1 = u - t; t = u;
    bl.dedupGroups(ast); const an = bl.analyzeGrammar(ast); const fn = bl.computeFirstSets(ast);
    u = performance.now(); const a2 = u - t; t = u;
    const rules = bl.ASTToParser(ast, an, fn, g.recovers, false, false);
    u = performance.now(); const a3 = u - t; t = u;
    cand.attachColorActions(rules); cand.attachValueActions(rules, cand.keywordColor); cand.attachStylesheetActions(rules);
    u = performance.now(); const a4 = u - t;
    globalThis.gc?.();
    t = performance.now(); bl.BBNFToParser(text); const w = performance.now() - t;
    if (r >= 3) { ph.astMs.push(a1); ph.analysisMs.push(a2); ph.toParserMs.push(a3); ph.attachMs.push(a4); ph.wholeBBNFToParserMs.push(w); }
}
rep.warmPhases = Object.fromEntries(Object.entries(ph).map(([k, v]) => [k, { median: +median(v).toFixed(2), min: +Math.min(...v).toFixed(2) }]));
rep.grammarChars = text.length;
rep.ruleCount = Object.keys(bl.BBNFToParser(text)[0]).length;
rep.uptimeEnd = uptime();
console.log(JSON.stringify({ coldSummary: rep.coldSummary, warmPhases: rep.warmPhases, grammarChars: rep.grammarChars, ruleCount: rep.ruleCount }, null, 1));
console.log(rep.uptimeEnd);
writeFileSync(path.join(import.meta.dirname, "compile-result.json"), JSON.stringify(rep, null, 1));
