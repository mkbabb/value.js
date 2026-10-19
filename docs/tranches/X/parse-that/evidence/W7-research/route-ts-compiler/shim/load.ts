// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · shim/load.ts — the prototype's stand-in for value.js `src/css/bbnf/load.ts`
// (same exports, same contract), swapped in at BUNDLE time only (value.js src/ is never edited).
// value.js's action files (`color.ts` · `value.ts` · `stylesheet.ts`) run UNCHANGED: they write
// `rules[name] = ruleOf(rules, name).map(fn)` / `.mapState(fn)`, and here a rule is a DECLARATION
// (a name + its action) until the first parse compiles the whole table once, actions included.

import { BBNFToASTWithImports } from "../vendor/bbnf-0.1.4/parse.js";
import type { AST } from "../vendor/bbnf-0.1.4/types.js";
import type { Action, CompileOptions } from "../src/compile.js";
import { compileGrammar as compileKernel } from "../src/compile.js";
import { emitGrammar } from "../src/emit.js";
import { value as kernelValue } from "../src/kernel.js";
import type { K } from "../src/kernel.js";

import tokens from "VALUEJS/src/css/grammar/tokens.bbnf?raw";
import math from "VALUEJS/src/css/grammar/math.bbnf?raw";
import color from "VALUEJS/src/css/grammar/color.bbnf?raw";
import value from "VALUEJS/src/css/grammar/value.bbnf?raw";
import stylesheet from "VALUEJS/src/css/grammar/stylesheet.bbnf?raw";

export const GRAMMAR_MODULES = Object.freeze({ tokens, math, color, value, stylesheet });

// The mapState adapter's two views: one reused object each (never a prototype of anything).
type View = { value: unknown; offset: number; ok(v: unknown): View };
const NEXT: View = { value: undefined, offset: 0, ok(v) { this.value = v; return this; } };
const PREV = { offset: 0 };

class Rule {
    /** The compiled parser, bound on this rule's first parse. */
    k: K | undefined = undefined;
    constructor(readonly table: Rules, readonly name: string, readonly action?: Action) {}
    map(fn: (v: never) => unknown): Rule { return new Rule(this.table, this.name, { kind: "map", fn: fn as (v: unknown) => unknown }); }
    /** The rule's action reads only its matched text (the idiom this route proposes to value.js). */
    text(fn: (text: string) => unknown): Rule { return new Rule(this.table, this.name, { kind: "text", fn }); }
    mapState(fn: (next: View, prev: { offset: number }) => View): Rule {
        return new Rule(this.table, this.name, {
            kind: "span",
            fn: (v, start, end) => { NEXT.value = v; NEXT.offset = end; PREV.offset = start; return fn(NEXT, PREV).value; },
        });
    }
}

export type Rules = Record<string, Rule>;
type Backend = { rule(name: string): K; value(): unknown };
const TABLES = new WeakMap<Rules, { ast: AST; compiled?: Backend }>();
declare const __BACKEND__: "emit" | undefined;
let VALUE: () => unknown = kernelValue;
declare const __LEVERS__: CompileOptions["levers"] | undefined;
declare const __POSITIONAL__: boolean | undefined;
declare const __MEMO__: string[] | undefined;
declare const __CENSUS__: boolean | undefined;
/** The packrat advisor's tallies (census arms only). */
export const CENSUS: Record<string, { calls: number; repeats: number }> = {};
/** proto-pos: stylesheet.bbnf's own rules take positional sequences (parse-that 2.x `all()`). */
function positionalRules(): ((rule: string) => boolean) | undefined {
    if (typeof __POSITIONAL__ === "undefined" || !__POSITIONAL__) return undefined;
    const [, own] = BBNFToASTWithImports(stylesheet);
    const names = new Set(own!.rules.keys());
    return (rule) => names.has(rule);
}

declare const __STRIP_F_B_3__: boolean | undefined;
/**
 * proto-fb3 (the F-b-3 root-cure PROOF): every `/…/i` literal loses its first-letter workaround —
 * `[nN]one` → `none` — so the case-insensitive dispatch rests on the flag alone.
 */
export const STRIPPED = { count: 0 };
function stripCaseWorkaround(text: string): string {
    return text.replace(/\/((?:\\.|\[(?:\\.|[^\]])*\]|[^/\\\n[])+)\/i\b/g, (lit: string, body: string) =>
        "/" + body.replace(/\[([a-zA-Z])([a-zA-Z])\]/g, (cls: string, a: string, b: string) =>
            a !== b && a.toLowerCase() === b.toLowerCase() ? (STRIPPED.count++, a.toLowerCase()) : cls) + "/i");
}

/** The grammar's rule table (declarations); compiled on the first parse. */
export function compileGrammar(): Rules {
    let text = Object.values(GRAMMAR_MODULES).join("\n");
    if (typeof __STRIP_F_B_3__ !== "undefined" && __STRIP_F_B_3__) text = stripCaseWorkaround(text);
    const [, parsed] = BBNFToASTWithImports(text);
    if (!parsed) throw new Error("BBNF grammar failed to parse");
    const rules: Rules = {};
    for (const name of parsed.rules.keys()) rules[name] = new Rule(rules, name);
    TABLES.set(rules, { ast: parsed.rules });
    return rules;
}

export function ruleOf(rules: Rules, name: string): Rule {
    const rule = rules[name];
    if (rule === undefined) throw new Error(`BBNF grammar has no rule \`${name}\``);
    return rule;
}

export type RunResult<T> =
    | Readonly<{ ok: true; value: T; end: number }>
    | Readonly<{ ok: false; furthest: number }>;

export function run<T>(rule: Rule, source: string): RunResult<T> {
    let p = rule.k;
    if (p === undefined) {
        const table = rule.table;
        const t = TABLES.get(table)!;
        if (t.compiled === undefined) {
            const actions = new Map<string, Action>();
            for (const [name, r] of Object.entries(table)) {
                if (r.name !== name) throw new Error(`rule \`${name}\` bound to \`${r.name}\``);
                if (r.action) actions.set(name, r.action);
            }
            const opts = {
                actions, positional: positionalRules(),
                memo: typeof __MEMO__ === "undefined" ? undefined : new Set(__MEMO__),
                census: typeof __CENSUS__ === "undefined" ? undefined : CENSUS,
                levers: typeof __LEVERS__ === "undefined" ? undefined : __LEVERS__ };
            if (typeof __BACKEND__ !== "undefined" && __BACKEND__ === "emit") {
                const e = emitGrammar(t.ast, opts);
                t.compiled = e;
                VALUE = e.value;
            } else t.compiled = { rule: compileKernel(t.ast, opts).rule, value: kernelValue };
        }
        p = t.compiled.rule(rule.name);
        rule.k = p;
    }
    const end = p(source, 0);
    if (end < 0 || end !== source.length) return { ok: false, furthest: end < 0 ? 0 : end };
    return { ok: true, value: VALUE() as T, end };
}
