// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · compile.ts — BBNF AST + semantic actions → one specialized kernel parser per
// rule, compiled ONCE. Every rule is compiled in (up to) two modes:
//   value      — builds exactly the value parse-that 0.8.2 + bbnf-lang 0.1.4 would (the actions'
//                input contract), and runs the rule's action;
//   recognize  — only answers where the match ends: used wherever the grammar DISCARDS a value
//                (`a >> b`'s `a`, `a << b`'s `b`, `a - b`'s `b`). Actions are pure and total, so a
//                discarded subtree never needs to run them — nor to allocate its arrays/substrings.
// Levers (each a compile-time decision, never a runtime test):
//   · references bind DIRECTLY to the referenced rule's compiled parser (no lazy trampoline); only
//     the back-edges of recursive rules go through one cell;
//   · ordered choice is routed by a SOUND, flag-aware first-unit table (the root cure of F-b-3);
//     a routed group is the ordered sub-choice of the alternatives that can start there, so the
//     answer equals trying every alternative;
//   · a non-nullable regex leaf checks its first unit before entering the regex engine;
//   · a single-class run (`[^()"']+`, `\s*`) is a code-unit loop, not a regex call;
//   · `p?` / `p*` skip the call when the next unit cannot start `p`.
// Actions are known at compile time (the API takes them), so nothing is late-bound.

import type { Expression, AST } from "../vendor/bbnf-0.1.4/types.js";
import { singleClassRun } from "./regex.js";
import type { Info } from "./analysis.js";
import { analyzeFirst, routes } from "./analysis.js";
import * as k from "./kernel.js";
import { analyzeGrammar, buildDispatchTable, buildPartialDispatchTable, computeFirstSets } from "../vendor/bbnf-0.1.4/analysis/index.js";
import type { Cell, Guard, K } from "./kernel.js";

export type Action =
    | Readonly<{ kind: "map"; fn: (v: unknown) => unknown }>
    | Readonly<{ kind: "span"; fn: (v: unknown, start: number, end: number) => unknown }>
    /** Reads only the text its rule matched: the rule compiles as a RECOGNIZER (no value built). */
    | Readonly<{ kind: "text"; fn: (text: string) => unknown }>;

export type CompileOptions = Readonly<{
    actions?: ReadonlyMap<string, Action>;
    /** Lever switches (all on by default) — for ablation only. */
    /** When given, every rule counts its calls and its repeats at the same (source, offset). */
    census?: Record<string, { calls: number; repeats: number }>;
    /** Rules memoized one slot deep (packrat where measured useful). */
    memo?: ReadonlySet<string>;
    /** Rules whose sequences are POSITIONAL (parse-that 2.x `all()`: `undefined` kept). */
    positional?: (rule: string) => boolean;
    levers?: Partial<Record<"dispatch" | "guard" | "run" | "recognize" | "stockAsciiDispatch" | "audit", boolean>>;
}>;

const unwrap = (e: Expression): Expression => (e.type === "group" ? unwrap(e.value as Expression) : e);

export function compileGrammar(ast: AST, opts: CompileOptions = {}) {
    const actions = opts.actions ?? new Map<string, Action>();
    const L = { dispatch: true, guard: true, run: true, recognize: true, stockAsciiDispatch: false, audit: false, ...opts.levers };
    for (const name of actions.keys()) if (!ast.has(name)) throw new Error(`action for unknown rule \`${name}\``);

    const { info, nodeInfo, ruleInfo } = analyzeFirst(ast);
    // stockAsciiDispatch (equivalence PROOF only): bbnf-lang 0.1.4 routes a non-ASCII lead unit of a
    // DISPATCHED alternation to its fallback alternatives alone (nullable / unknown-FIRST), or to none.
    const stock = L.stockAsciiDispatch ? computeFirstSets(ast, analyzeGrammar(ast)) : null;
    function stockNonAscii(alts: Expression[]): number[] | null {
        if (stock === null || alts.length < 2) return null;
        if (buildDispatchTable(alts, stock.firstSets, stock.nullable)?.isPerfect) return [];
        const partial = buildPartialDispatchTable(alts, stock.firstSets, stock.nullable);
        return partial ? partial.fallbackIndices : null;
    }
    const guardOf = (i: Info): Guard | null => (L.guard && !i.nullable ? { tbl: i.first.ascii, na: i.first.nonAscii } : null);

    // ── the rewrites bbnf-lang 0.1.4 applies that CHANGE a value: none may apply silently ───────
    function refuseStockRewrites(e: Expression): void {
        e = unwrap(e);
        const lit = (x: Expression) => unwrap(x).type === "literal";
        if (e.type === "next") {
            const [l, r] = e.value as Expression[];
            if (lit(l) && unwrap(r).type === "skip") {
                const [m, end] = unwrap(r).value as Expression[];
                if (lit(end) && (m.type === "many" || m.type === "many1")) throw new Error("literal-wrapped regex coalesce: unsupported");
            }
        }
        if ((e.type === "many" || e.type === "many1") && unwrap(e.value as Expression).type === "skip") {
            const [, sep] = unwrap(e.value as Expression).value as Expression[];
            if (sep.type === "optional") throw new Error("sepBy detection: unsupported");
        }
    }

    // ── rules, compiled once per mode ──────────────────────────────────────────────────────
    type Mode = "v" | "r";
    const done = { v: new Map<string, K>(), r: new Map<string, K>() };
    const building = { v: new Map<string, Cell>(), r: new Map<string, Cell>() };

    function rule(name: string, mode: Mode): K {
        const hit = done[mode].get(name);
        if (hit) return hit;
        const open = building[mode].get(name);
        if (open) return k.ref(open); // a back-edge: the rule is being compiled on this path
        const cell: Cell = { f: () => { throw new Error(`rule \`${name}\` used before it was bound`); } };
        building[mode].set(name, cell);
        const r = ast.get(name);
        if (!r) throw new Error(`undefined rule \`${name}\``);
        const a = actions.get(name);
        let p = node(r.expression, a?.kind === "text" ? "r" : mode, name);
        if (a !== undefined && mode === "v") p = a.kind === "map" ? k.act(p, a.fn) : a.kind === "span" ? k.actSpan(p, a.fn) : k.actText(p, a.fn);
        if (opts.memo?.has(name)) p = k.memo1(p);
        if (opts.census) { // packrat ADVISOR: how often is this rule re-asked at its last (source, offset)?
            const inner = p, row = (opts.census[`${name}/${mode}`] ??= { calls: 0, repeats: 0 });
            let ls: string | undefined, li = -1;
            p = (s, i) => { row.calls++; if (i === li && s === ls) row.repeats++; ls = s; li = i; return inner(s, i); };
        }
        cell.f = p;
        building[mode].delete(name);
        done[mode].set(name, p);
        return p;
    }

    const positional = opts.positional ?? (() => false);
    function node(e: Expression, mode: Mode, rn: string): K {
        refuseStockRewrites(e);
        const rec = mode === "r" && L.recognize;
        switch (e.type) {
            case "literal": return rec ? k.litR(e.value as string) : k.lit(e.value as string);
            case "regex": {
                const re = e.value as RegExp;
                const runOf = L.run ? singleClassRun(re) : null;
                if (runOf !== null) return runOf.all ? k.runAll(runOf.min, !rec) : k.run(runOf.tbl, runOf.cls, runOf.min, !rec);
                const g = guardOf(nodeInfo.get(e)!);
                const leaf = rec ? k.reR(re, g) : k.re(re, g);
                return L.audit && g !== null ? k.guardAudit(leaf, rec ? k.reR(re, null) : k.re(re, null), g, `/${re.source}/${re.flags}`) : leaf;
            }
            case "nonterminal": return rule(e.value as string, mode);
            case "group": return node(e.value as Expression, mode, rn);
            case "epsilon": return k.eps;
            case "optional": {
                const inner = e.value as Expression;
                const p = node(inner, mode, rn);
                const g = guardOf(info(inner));
                if (rec) return k.optR(p);
                if (g !== null && L.audit) return k.guardAudit(k.optG(p, g), k.opt(p), g, `opt in ${rn}`);
                return g !== null ? k.optG(p, g) : k.opt(p);
            }
            case "many": case "many1": {
                const p = node(e.value as Expression, mode, rn);
                const min = e.type === "many1" ? 1 : 0;
                return rec ? k.manyR(p, min) : k.many(p, min);
            }
            case "next": {
                const [a, b] = e.value as Expression[];
                return k.next(node(a, "r", rn), node(b, mode, rn));
            }
            case "skip": {
                const [a, b] = e.value as Expression[];
                return rec ? k.seqR([node(a, "r", rn), node(b, "r", rn)]) : k.skip(node(a, mode, rn), node(b, "r", rn));
            }
            case "minus": {
                const [a, b] = e.value as Expression[];
                return k.minus(node(a, mode, rn), node(b, "r", rn));
            }
            case "concatenation": {
                const ps = (e.value as Expression[]).map((x) => node(x, mode, rn));
                return rec ? k.seqR(ps) : positional(rn) ? k.seqP(ps) : k.seq(ps);
            }
            case "alternation": return choice(e.value as Expression[], mode, rn);
            default: throw new Error(`unsupported BBNF node \`${e.type}\``);
        }
    }

    function choice(alts: Expression[], mode: Mode, rn: string): K {
        const ps = alts.map((a) => node(a, mode, rn));
        if (!L.dispatch) return k.alt(ps);
        const r = routes(alts.map(info), stockNonAscii(alts));
        if (r === null) return k.alt(ps);
        const groups = r.groups.map((members) => k.alt(members.map((m) => ps[m])));
        const routed = k.dispatch(r.tbl, groups, r.na < 0 ? null : groups[r.na], r.eof < 0 ? null : groups[r.eof]);
        return L.audit ? k.dispatchAudit(routed, k.alt(ps), `in ${rn}`) : routed;
    }

    const compiled = new Map<string, K>();
    return {
        /** The value-mode parser of `name` (compiled on first request, then shared). */
        rule: (name: string): K => {
            let p = compiled.get(name);
            if (p === undefined) { p = rule(name, "v"); compiled.set(name, p); }
            return p;
        },
        info: (name: string) => ruleInfo.get(name),
    };
}

/** One whole-input parse: success only when every code unit is consumed. */
export function runWhole(p: K, source: string): { ok: true; value: unknown; end: number } | { ok: false; furthest: number } {
    const end = p(source, 0);
    if (end < 0 || end !== source.length) return { ok: false, furthest: end < 0 ? 0 : end };
    return { ok: true, value: k.value(), end };
}
