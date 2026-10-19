// SERVED MODEL: claude-opus-5-5
// route engine-fusion — the seat's stand-in for value.js `src/css/bbnf/load.ts` (esbuild redirects
// `./load` here in the fusion bundles only; value.js src is never edited). Same exports, same
// concatenation of the five modules, same `run`; `compileGrammar` takes the ACTION-BEARING rule
// names so the compiler knows which rules it may fuse, and returns the sealable compilation.
import type { Parser } from "@mkbabb/parse-that";
import { ParserState } from "@mkbabb/parse-that";

import tokens from "/Users/mkbabb/Programming/value.js/src/css/grammar/tokens.bbnf?raw";
import math from "/Users/mkbabb/Programming/value.js/src/css/grammar/math.bbnf?raw";
import color from "/Users/mkbabb/Programming/value.js/src/css/grammar/color.bbnf?raw";
import value from "/Users/mkbabb/Programming/value.js/src/css/grammar/value.bbnf?raw";
import stylesheet from "/Users/mkbabb/Programming/value.js/src/css/grammar/stylesheet.bbnf?raw";
import { compileFused } from "./fusion";
import type { Compiled, Dispatch } from "./fusion";

export const GRAMMAR_MODULES = Object.freeze({ tokens, math, color, value, stylesheet });
export type Rules = Record<string, Parser<any>>;

declare const __FUSION_DISPATCH__: Dispatch;
declare const __FUSION_FUSE__: boolean;
declare const __FUSION_DISCARD__: boolean;
declare const __FUSION_COLLAPSE__: boolean;
declare const __NO_RESET__: boolean;
declare const __FUSION_MEMO__: boolean;
declare const __FUSION_LEAFACT__: boolean;
declare const __FUSION_LOOP__: boolean;

export function compileGrammar(actions: ReadonlyMap<string, { fn: unknown; kind: string; count: number }> = new Map()): Compiled {
    return compileFused(Object.values(GRAMMAR_MODULES).join("\n"), { opaque: new Set(actions.keys()), actions, leafActions: __FUSION_LEAFACT__, loopFusion: __FUSION_LOOP__, dispatch: __FUSION_DISPATCH__, fuse: __FUSION_FUSE__, discard: __FUSION_DISCARD__, collapse: __FUSION_COLLAPSE__, memo: __FUSION_MEMO__ });
}

export function ruleOf(rules: Rules, name: string): Parser<any> {
    const rule = rules[name];
    if (rule === undefined) throw new Error(`BBNF grammar has no rule \`${name}\``);
    return rule;
}

export type RunResult<T> =
    | Readonly<{ ok: true; value: T; end: number }>
    | Readonly<{ ok: false; furthest: number }>;

// __NO_RESET__ (the parse-that-side lever, emulated): no per-parse `reset()` — memoization is off
// and value.js never reads the error-state globals, so clearing them per parse is pure tax (parse-that
// 2.0.0 removed it upstream, c9338e4). The fusion levers are measured with and without it.
export function run<T>(rule: Parser<T>, source: string): RunResult<T> {
    if (!__NO_RESET__) rule.reset();
    const state = rule.call(new ParserState<T>(source));
    if (state.isError || state.offset !== source.length) {
        return { ok: false, furthest: Math.max(state.offset, state.furthest ?? 0) };
    }
    return { ok: true, value: state.value, end: state.offset };
}
