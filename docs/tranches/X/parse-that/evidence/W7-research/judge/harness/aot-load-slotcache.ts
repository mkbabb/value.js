// SERVED MODEL: claude-opus-5-5
// judge COPY of route-aot-codegen/gen/load-aot.ts — one change, marked below (runner cache on the slot).
// route-aot-codegen — the prototype's stand-in for value.js `src/css/bbnf/load.ts` (esbuild redirects
// `./load` here). It keeps value.js's action-attachment code UNCHANGED: `compileGrammar()` answers a
// table of action SLOTS; `.map(f)` / `.mapState(f)` record the action; the first `run` instantiates
// the AOT-generated parser with the recorded actions. (The landing form replaces this shim with a
// static exported action table — see the seat's plan.)
// @ts-nocheck
import { RULE_NAMES, ACTION_MANIFEST, createParser } from "aot-generated";

export const GRAMMAR_MODULES = Object.freeze({});
export type Rules = Record<string, Slot>;

// mapState's (next, prev) views — two reused objects, never allocated per call.
const NEXT = { value: undefined as unknown, offset: 0, ok: (x: unknown) => x };
const PREV = { value: undefined as unknown, offset: 0 };

export class Slot {
    constructor(readonly name: string, readonly fn?: (v: unknown, s: number, e: number) => unknown, readonly kind?: "map" | "span" | "text") {}
    map(f: (v: unknown) => unknown) {
        const prev = this.fn;
        return new Slot(this.name, prev ? (v, s, e) => f(prev(v, s, e)) : f, this.kind ?? "map");
    }
    mapState(f: (next: typeof NEXT, prev: typeof PREV) => unknown) {
        if (this.fn) throw new Error("mapState over an existing action is not modelled");
        return new Slot(this.name, (v, s, e) => { NEXT.value = v; NEXT.offset = e; PREV.offset = s; return f(NEXT, PREV); }, "span");
    }
    /** A TEXT action: `f` receives exactly the source text the rule matched (its span), and the
     *  generated rule builds no value — the landing form of stylesheet.ts's `text`/`trimmed`. */
    text(f: (text: string) => unknown) {
        if (this.fn) throw new Error("text over an existing action is not modelled");
        return new Slot(this.name, (s: number, e: number, src: string) => f(src.slice(s, e)), "text");
    }
    /** A value-free SPAN action: `f` receives only the offsets its rule matched between. */
    range(f: (start: number, end: number) => unknown) {
        if (this.fn) throw new Error("range over an existing action is not modelled");
        return new Slot(this.name, (s: number, e: number) => f(s, e), "text");
    }
    reset() {}
}

export let LAST: Rules | undefined;
// judge variant: the entry runner is cached ON the slot (a property read), not in a WeakMap (a hash lookup per parse).
let entry_: ((name: string) => (source: string) => unknown) | undefined;
const runners = new WeakMap<Slot, (source: string) => unknown>();

export function compileGrammar(): Rules {
    const table: Rules = {};
    for (const n of RULE_NAMES) table[n] = new Slot(n);
    LAST = table;
    entry_ = undefined;
    return table;
}

export function ruleOf(rules: Rules, name: string): Slot {
    const rule = rules[name];
    if (rule === undefined) throw new Error(`BBNF grammar has no rule \`${name}\``);
    return rule;
}

export function actionManifest(rules: Rules) {
    const m: Record<string, string> = {};
    for (const [n, s] of Object.entries(rules)) if (s.fn) m[n] = s.kind!;
    return m;
}

export function run(rule: Slot, source: string) {
    let r = (rule as any).__r as ((source: string) => unknown) | undefined;
    if (r === undefined) {
        if (entry_ === undefined) {
            const table = LAST!;
            const m = actionManifest(table);
            if (JSON.stringify(Object.entries(m).sort()) !== JSON.stringify(Object.entries(ACTION_MANIFEST).sort()))
                throw new Error("generated parser is stale: action manifest differs (regenerate)");
            const A: Record<string, unknown> = {};
            for (const [n, s] of Object.entries(table)) if (s.fn) A[n] = s.fn;
            entry_ = createParser(A);
        }
        r = entry_(rule.name);
        (rule as any).__r = r;
    }
    return r(source);
}
