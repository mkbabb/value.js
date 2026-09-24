// Dumps value.js's concatenated grammar AST (published bbnf-lang 0.1.4 BBNFToAST) as compact S-exprs.
import { readFileSync } from "node:fs";
import { BBNFToAST, dedupGroups } from "/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/bbnf-lang/dist/bbnf.js";
const G = "/Users/mkbabb/Programming/value.js/src/css/grammar/";
const src = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(G + m + ".bbnf", "utf8")).join("\n");
const [, ast] = BBNFToAST(src);
dedupGroups(ast);
const s = (e) => {
  switch (e.type) {
    case "literal": return JSON.stringify(e.value);
    case "regex": return "/" + e.value.source + "/" + e.value.flags;
    case "nonterminal": return e.value;
    case "group": return "(" + s(e.value) + ")";
    case "concatenation": return "[" + e.value.map(s).join(" , ") + "]";
    case "alternation": return "{" + e.value.map(s).join(" | ") + "}";
    case "skip": return "skip(" + s(e.value[0]) + ", " + s(e.value[1]) + ")";
    case "next": return "next(" + s(e.value[0]) + ", " + s(e.value[1]) + ")";
    case "minus": return "minus(" + s(e.value[0]) + ", " + s(e.value[1]) + ")";
    default: return e.type + "(" + (e.value ? s(e.value) : "") + ")";
  }
};
for (const [k, r] of ast) console.log(k, "=", s(r.expression));
