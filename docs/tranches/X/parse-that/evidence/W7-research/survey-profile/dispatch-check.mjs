// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — how well bbnf-lang 0.1.4's FIRST-set dispatch discriminates
// value.js's alternations: for each alternation in the concatenated grammar, is the dispatch table
// PERFECT, PARTIAL (some alternatives fall back to ordered `any`), or absent (plain `any`)?
//   node <dir>/dispatch-check.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import * as bl from "@mkbabb/bbnf-lang";
import { REPO } from "./common.mjs";
const text = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(path.join(REPO, "src/css/grammar", `${m}.bbnf`), "utf8")).join("\n");
const [, g] = bl.BBNFToASTWithImports(text);
const ast = g.rules; bl.dedupGroups(ast);
const fn = bl.computeFirstSets(ast);
const rows = [];
const visit = (rule, e) => {
    if (!e || typeof e !== "object") return;
    if (e.type === "alternation" && e.value.length >= 2) {
        const perfect = bl.buildDispatchTable(e.value, fn.firstSets, fn.nullable);
        const partial = perfect?.isPerfect ? null : bl.buildPartialDispatchTable(e.value, fn.firstSets, fn.nullable);
        rows.push({ rule, alts: e.value.length, kind: perfect?.isPerfect ? "perfect" : partial ? `partial(fallback ${partial.fallbackIndices.length}, groups ${partial.groups.map((x) => x.length).join("/")})` : "none(any)" });
    }
    const v = e.value;
    if (Array.isArray(v)) v.forEach((x) => visit(rule, x)); else if (v && typeof v === "object") visit(rule, v);
};
for (const [name, r] of ast) visit(name, r.expression);
for (const r of rows) console.log(r.rule.padEnd(16), String(r.alts).padStart(2), r.kind);
// Each alternative's FIRST set for the three widest alternations (why they collapse into one group).
const show = (cs) => { const c = [...cs].map((x) => String.fromCharCode(x)).join(""); return c.length > 40 ? `${c.length} chars` : JSON.stringify(c); };
for (const name of ["color", "colorCall", "valueTerm"]) {
    const alts = ast.get(name).expression.value;
    console.log(`\n${name}:`, alts.map((a) => `${a.value ?? a.type}=${show(bl.exprFirstSet(a, fn.firstSets, fn.nullable, ast))}`).join("  "));
}
