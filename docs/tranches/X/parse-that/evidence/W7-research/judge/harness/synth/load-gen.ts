// SERVED MODEL: claude-opus-5-5
// judge synthesis — GENERATION-time stand-in for value.js src/css/bbnf/load.ts: the grammar's rule table
// (declarations) from the five .bbnf modules; value.js's attach code records the actions onto it; then
// emitModule() runs the route-ts-compiler emitter (judge copy) in BUILD-TIME mode. Never parses.
import { BBNFToASTWithImports } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/vendor/bbnf-0.1.4/parse.js";
import type { AST } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/vendor/bbnf-0.1.4/types.js";
import type { Action } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/compile.js";
import { emitGrammar } from "./emit-aot";
import { Rule, ruleOf } from "./rule";
import type { Rules, RunResult } from "./rule";
import tokens from "VALUEJS/src/css/grammar/tokens.bbnf?raw";
import math from "VALUEJS/src/css/grammar/math.bbnf?raw";
import color from "VALUEJS/src/css/grammar/color.bbnf?raw";
import value from "VALUEJS/src/css/grammar/value.bbnf?raw";
import stylesheet from "VALUEJS/src/css/grammar/stylesheet.bbnf?raw";
export { ruleOf };
export type { Rules, RunResult };
export const GRAMMAR_MODULES = Object.freeze({ tokens, math, color, value, stylesheet });
const TABLES = new WeakMap<Rules, AST>();
/** F-b-3 root-cure PROOF (route-ts-compiler shim/load.ts stripCaseWorkaround, verbatim): every `/…/i` literal
 *  loses its first-letter workaround — `[nN]one` → `none` — so case-insensitive routing rests on the flag alone. */
export const OPTS = { stripFb3: false, stripped: 0 };
function stripCaseWorkaround(text: string): string {
    return text.replace(/\/((?:\\.|\[(?:\\.|[^\]])*\]|[^/\\\n[])+)\/i\b/g, (lit: string, body: string) =>
        "/" + body.replace(/\[([a-zA-Z])([a-zA-Z])\]/g, (cls: string, a: string, b: string) =>
            a !== b && a.toLowerCase() === b.toLowerCase() ? (OPTS.stripped++, a.toLowerCase()) : cls) + "/i");
}
export function compileGrammar(): Rules {
    let text = Object.values(GRAMMAR_MODULES).join("\n");
    if (OPTS.stripFb3) { OPTS.stripped = 0; text = stripCaseWorkaround(text); }
    const [, parsed] = BBNFToASTWithImports(text);
    if (!parsed) throw new Error("BBNF grammar failed to parse");
    const rules: Rules = {};
    for (const name of parsed.rules.keys()) rules[name] = new Rule(rules, name);
    TABLES.set(rules, parsed.rules);
    return rules;
}
export function run(): never { throw new Error("generation shim: no parsing"); }
/** The build-time module for this (action-attached) table. positional = stylesheet.bbnf's own rules (proto-pos). */
export function emitModule(rules: Rules, o: { positional: boolean; stockAscii: boolean; header: string }): string {
    const ast = TABLES.get(rules)!;
    const actions = new Map<string, Action>();
    for (const [name, r] of Object.entries(rules)) {
        if (r.name !== name) throw new Error(`rule \`${name}\` bound to \`${r.name}\``);
        if (r.action) actions.set(name, r.action);
    }
    const own = o.positional ? new Set(BBNFToASTWithImports(stylesheet)[1]!.rules.keys()) : new Set<string>();
    return emitGrammar(ast, { actions, positional: (n) => own.has(n), levers: o.stockAscii ? { stockAsciiDispatch: true } : undefined,
        aot: true, header: o.header }).moduleSource!;
}
