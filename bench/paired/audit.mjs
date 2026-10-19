// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l2 — E-2 on the final emitter (G-audit), banked: the routing/guard/scan audit on the EMITTED module.
// Compiles value.js's grammar (src/css/grammar/css.bbnf, its @imports read from disk) through the linked emitter
// with the audit build: every routed choice re-run as the plain ordered choice, every rejecting guard re-run
// unguarded, every sticky scan (bulk-text and negated runs) and unrolled leaf re-run as the grammar spelt it.
// Then the recognize-vs-value differential: every rule, both modes, the same end offset.
// Sources: the 29,944-source corpus (assay ∪ real) at offset 0 on every rule, and the large sheets on every rule.
//   node bench/paired/audit.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import { compile, createAudit, dedupGroups, loadGrammar } from "@mkbabb/bbnf-lang";
import { INPUTS, REPO, largeSheets, uptime } from "./common.mjs";

const [ast, recovers] = loadGrammar(path.join(REPO, "src/css/grammar/css.bbnf"), (p) => readFileSync(p, "utf8"));
dedupGroups(ast);
const audit = createAudit();
const p = compile(ast, { audit, recovers });
const names = Object.keys(p.recognize);
const sheets = largeSheets().map((s) => s.text);
console.log(uptime());
let modeCalls = 0, modeDiffs = 0;
const diffs = [];
const run = (s) => {
    for (const n of names) {
        const v = p.rules[n](s, 0);
        const r = p.recognize[n](s, 0);
        modeCalls++;
        if (v !== r) { modeDiffs++; if (diffs.length < 10) diffs.push(`${n}: value ${v} vs recognize ${r} in ${JSON.stringify(s.slice(0, 60))}`); }
    }
};
for (const s of INPUTS) run(s);
const corpusChecks = audit.checks;
for (const s of sheets) run(s);
console.log(JSON.stringify({ rules: names.length, sources: INPUTS.length, sheets: sheets.length, corpusChecks,
    checks: audit.checks, violations: audit.violations, samples: audit.samples, modeCalls, modeDiffs, diffs }));
console.log(uptime());
