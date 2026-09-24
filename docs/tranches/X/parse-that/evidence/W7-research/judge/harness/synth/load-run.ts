// SERVED MODEL: claude-opus-5-5
// judge synthesis — RUNTIME stand-in for value.js src/css/bbnf/load.ts over the BUILD-TIME module
// (`synth-generated`, resolved at bundle time): no BBNF front end, no parse-that, no compile at first use.
// value.js's attach code runs unchanged against the declarations; the first parse binds the recorded
// actions into createParser(A) once, refusing a table whose action kinds differ from the module's.
import { ACTION_KINDS, RULE_NAMES, createParser } from "synth-generated";
import { Rule, ruleOf } from "./rule";
import type { Rules, RunResult } from "./rule";
export { ruleOf };
export type { Rules, RunResult };
export const GRAMMAR_MODULES = Object.freeze({});
let made: { rules: Record<string, (s: string, i: number) => number>; value(): unknown } | undefined;
export function compileGrammar(): Rules {
    const rules: Rules = {};
    for (const name of RULE_NAMES as string[]) rules[name] = new Rule(rules, name);
    made = undefined;
    return rules;
}
function bind(table: Rules) {
    const A: Record<string, unknown> = {};
    const kinds = ACTION_KINDS as Record<string, string>;
    for (const [name, r] of Object.entries(table)) {
        if (r.action === undefined) continue;
        if (kinds[name] !== r.action.kind) throw new Error(`generated parser is stale: \`${name}\` is ${r.action.kind}, module says ${kinds[name]}`);
        A[name] = r.action.fn;
    }
    for (const name of Object.keys(kinds)) if (!(name in A)) throw new Error(`generated parser is stale: no action for \`${name}\``);
    return createParser(A);
}
export function run<T>(rule: Rule, source: string): RunResult<T> {
    let p = rule.k;
    if (p === undefined) {
        made ??= bind(rule.table);
        p = made.rules[rule.name];
        rule.k = p;
    }
    const end = p(source, 0);
    if (end < 0 || end !== source.length) return { ok: false, furthest: end < 0 ? 0 : end };
    return { ok: true, value: made!.value() as T, end };
}
