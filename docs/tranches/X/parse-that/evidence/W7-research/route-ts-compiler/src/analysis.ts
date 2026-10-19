// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · analysis.ts — the grammar facts both backends (closure kernel, emitted code)
// compile from: each node's SOUND first-unit set, whether it can succeed without consuming
// (`nullable`), and whether it can succeed at end of input (`eofOk`; a regex leaf never does, per
// parse-that 0.8.2) — to a fixpoint over recursive rules. And the ROUTING of an ordered choice: for
// each first unit, the ordered sub-choice of the alternatives that can start there.

import type { Expression, AST } from "../vendor/bbnf-0.1.4/types.js";
import type { CharSet } from "./regex.js";
import { emptySet, regexFirst, unionInto } from "./regex.js";

export type Info = { first: CharSet; nullable: boolean; eofOk: boolean };

export function analyzeFirst(ast: AST) {
    const ruleInfo = new Map<string, Info>();
    for (const name of ast.keys()) ruleInfo.set(name, { first: emptySet(), nullable: false, eofOk: false });
    const nodeInfo = new Map<Expression, Info>();
    let settled = false; // after the fixpoint, a node's facts are final: answer them from the table
    function info(e: Expression): Info {
        if (settled) { const hit = nodeInfo.get(e); if (hit !== undefined) return hit; }
        const out: Info = { first: emptySet(), nullable: false, eofOk: false };
        switch (e.type) {
            case "literal": {
                const s = e.value as string;
                if (s.length === 0) { out.nullable = true; out.eofOk = true; break; }
                const c = s.charCodeAt(0);
                if (c < 128) out.first.add(c); else out.first.nonAscii = true;
                break;
            }
            case "regex": {
                const r = regexFirst(e.value as RegExp);
                unionInto(out.first, r.first);
                out.nullable = r.nullable;
                break; // a regex leaf fails at end of input (parse-that 0.8.2): eofOk = false
            }
            case "nonterminal": {
                const r = ruleInfo.get(e.value as string);
                if (!r) throw new Error(`undefined rule \`${e.value}\``);
                unionInto(out.first, r.first); out.nullable = r.nullable; out.eofOk = r.eofOk;
                break;
            }
            case "group": return info(e.value as Expression);
            case "optional": case "many": {
                const r = info(e.value as Expression);
                unionInto(out.first, r.first); out.nullable = true; out.eofOk = true;
                break;
            }
            case "many1": {
                const r = info(e.value as Expression);
                unionInto(out.first, r.first); // a zero-width match never counts toward `+`
                break;
            }
            case "epsilon": out.nullable = true; out.eofOk = true; break;
            case "minus": return info((e.value as Expression[])[0]);
            case "skip": case "next": case "concatenation": {
                const parts = e.value as Expression[];
                out.nullable = true; out.eofOk = true;
                for (const p of parts) {
                    const r = info(p);
                    if (out.nullable) unionInto(out.first, r.first);
                    out.nullable &&= r.nullable;
                    out.eofOk &&= r.eofOk;
                }
                break;
            }
            case "alternation": {
                for (const a of e.value as Expression[]) {
                    const r = info(a);
                    unionInto(out.first, r.first); out.nullable ||= r.nullable; out.eofOk ||= r.eofOk;
                }
                break;
            }
            default: throw new Error(`unsupported BBNF node \`${e.type}\``);
        }
        nodeInfo.set(e, out);
        return out;
    }
    for (let changed = true; changed;) {
        changed = false;
        for (const [name, rule] of ast) {
            const r = info(rule.expression), cur = ruleInfo.get(name)!;
            if (unionInto(cur.first, r.first)) changed = true;
            if (r.nullable && !cur.nullable) { cur.nullable = true; changed = true; }
            if (r.eofOk && !cur.eofOk) { cur.eofOk = true; changed = true; }
        }
    }
    settled = true;
    return { info, nodeInfo, ruleInfo };
}

export type Routes = Readonly<{ tbl: Int16Array; groups: number[][]; na: number; eof: number }>;

/**
 * The routing of an ordered choice by its first unit; `null` when every route is the whole choice
 * (routing would buy nothing). `stockNa` overrides the non-ASCII route (equivalence proof only).
 */
export function routes(infos: Info[], stockNa: number[] | null = null): Routes | null {
    const groupKey = new Map<string, number>();
    const groups: number[][] = [];
    const groupOf = (members: number[]): number => {
        if (members.length === 0) return -1;
        const key = members.join(",");
        let g = groupKey.get(key);
        if (g === undefined) { g = groups.length; groupKey.set(key, g); groups.push(members); }
        return g;
    };
    const tbl = new Int16Array(128);
    for (let c = 0; c < 128; c++) tbl[c] = groupOf(infos.flatMap((x, m) => (x.nullable || x.first.ascii[c] ? [m] : [])));
    const na = groupOf(stockNa ?? infos.flatMap((x, m) => (x.nullable || x.first.nonAscii ? [m] : [])));
    const eof = groupOf(infos.flatMap((x, m) => (x.eofOk ? [m] : [])));
    if (groups.length === 1 && groups[0].length === infos.length) return null;
    return { tbl, groups, na, eof };
}
