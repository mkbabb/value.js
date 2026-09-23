// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.b — the BBNF grammar, compiled. The published, idiomatic path is MEASURED, not assumed
// (2026-09-23): `@mkbabb/parse-that@1.0.0` exports no BBNF loader (its only BBNF mention is the
// `split.ts` helper generated code calls), while `@mkbabb/bbnf-lang@0.1.4` exports `BBNFToParser`,
// which compiles BBNF text into `@mkbabb/parse-that` parsers — its own `^0.8.2` dependency, which
// value.js pins to the same `0.8.2` so ONE copy exists and the semantic actions below attach to
// the very `Parser` instances the grammar yields. Two facts of that published build shape this file:
//
//   1. `BBNFToParserFromFile` (the `@import` path) throws `(void 0) is not a function` for ANY
//      reader: its build replaced `node:path` with `undefined` (`loadModuleGraphSync` →
//      `canonicalize((void 0)(entryPath))`). The modules are therefore concatenated in their
//      declared order and compiled as ONE grammar — the same rules, one compile.
//   2. `Parser.parseState` / `parse` write every failed parse to `console.error` (parse-that 0.8.2
//      `parser.js`, `parseState`). A CSS parser answers rejection as data, so `run` drives the
//      public `Parser.reset()` + `Parser.call(new ParserState(src))` pair instead — the same
//      parse, without the logging side effect.
//
// Rules resolve by NAME at parse time (bbnf-lang's nonterminal table is late-bound), so replacing
// `rules[name]` with `rules[name].map(action)` attaches a semantic action wherever that rule is
// referenced — with one measured exception: an ALIAS rule (`a = b ;`) is bound to `b`'s parser at
// compile, so no alias in the grammar names a rule that carries an action. Actions build values;
// they never read source text — the grammar is the only reader.

import { BBNFToParser } from "@mkbabb/bbnf-lang";
import type { Parser } from "@mkbabb/parse-that";
import { ParserState } from "@mkbabb/parse-that";

import tokens from "../grammar/tokens.bbnf?raw";
import math from "../grammar/math.bbnf?raw";
import color from "../grammar/color.bbnf?raw";
import value from "../grammar/value.bbnf?raw";
import stylesheet from "../grammar/stylesheet.bbnf?raw";

/** The declared module order; each module references only rules of itself or an earlier one. */
export const GRAMMAR_MODULES = Object.freeze({ tokens, math, color, value, stylesheet });

export type Rules = Record<string, Parser<any>>;

/** Compiles the grammar modules into a fresh rule table. */
export function compileGrammar(): Rules {
    const [rules] = BBNFToParser(Object.values(GRAMMAR_MODULES).join("\n"));
    return rules as Rules;
}

/** One named rule of a compiled table; a missing name is a grammar/actions mismatch, never input. */
export function ruleOf(rules: Rules, name: string): Parser<any> {
    const rule = rules[name];
    if (rule === undefined) throw new Error(`BBNF grammar has no rule \`${name}\``);
    return rule;
}

export type RunResult<T> =
    | Readonly<{ ok: true; value: T; end: number }>
    | Readonly<{ ok: false; furthest: number }>;

/** One whole-input parse of `rule` over `source`: success only when every code unit is consumed. */
export function run<T>(rule: Parser<T>, source: string): RunResult<T> {
    rule.reset();
    const state = rule.call(new ParserState<T>(source));
    if (state.isError || state.offset !== source.length) {
        return { ok: false, furthest: Math.max(state.offset, state.furthest ?? 0) };
    }
    return { ok: true, value: state.value, end: state.offset };
}
