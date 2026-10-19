// SERVED MODEL: claude-opus-5-5
// judge synthesis — the rule-table DECLARATIONS both synthesis shims share: route-ts-compiler's shim/load.ts
// Rule class verbatim in behaviour (map · text · mapState→span through two reused views).
import type { Action } from "/Users/mkbabb/Programming/value.js/docs/tranches/X/parse-that/evidence/W7-research/route-ts-compiler/src/compile.js";

type View = { value: unknown; offset: number; ok(v: unknown): View };
const NEXT: View = { value: undefined, offset: 0, ok(v) { this.value = v; return this; } };
const PREV = { offset: 0 };

export type Rules = Record<string, Rule>;
export class Rule {
    /** The parse function bound on this rule's first parse. */
    k: ((s: string, i: number) => number) | undefined = undefined;
    constructor(readonly table: Rules, readonly name: string, readonly action?: Action) {}
    map(fn: (v: never) => unknown): Rule { return new Rule(this.table, this.name, { kind: "map", fn: fn as (v: unknown) => unknown }); }
    text(fn: (text: string) => unknown): Rule { return new Rule(this.table, this.name, { kind: "text", fn }); }
    mapState(fn: (next: View, prev: { offset: number }) => View): Rule {
        return new Rule(this.table, this.name, {
            kind: "span",
            fn: (v, start, end) => { NEXT.value = v; NEXT.offset = end; PREV.offset = start; return fn(NEXT, PREV).value; },
        });
    }
}
export function ruleOf(rules: Rules, name: string): Rule {
    const rule = rules[name];
    if (rule === undefined) throw new Error(`BBNF grammar has no rule \`${name}\``);
    return rule;
}
export type RunResult<T> = Readonly<{ ok: true; value: T; end: number }> | Readonly<{ ok: false; furthest: number }>;
