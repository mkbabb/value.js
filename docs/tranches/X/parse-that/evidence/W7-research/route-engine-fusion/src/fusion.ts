// SERVED MODEL: claude-opus-5-5
// W7-research · route engine-fusion — PROTOTYPE of a BBNF → parse-that compiler whose heavy lifting
// is moved into the regex engine and dispatch, the grammar still compiled at RUNTIME from BBNF text.
// It reads the grammar with the PUBLISHED `@mkbabb/bbnf-lang` 0.1.4 `BBNFToAST` (the BBNF language
// itself is unchanged) and replaces only `ASTToParser` — the part a revived TS compiler in bbnf-lang
// would own. Every structural node is the same parse-that 0.8.2 combinator published ASTToParser
// emits (`all`, `.skip`, `.next`, `.wrap`, `.opt`, `.many`, `.minus`); three things differ:
//
//   F1 terminal fusion — an action-free rule that resolves to terminals (a regex, a literal, or an
//      ordered choice of them) is inlined at every reference, and an ordered choice of terminals
//      becomes ONE sticky regex `(?:t1|t2|…)` (only when all flags agree, so the value — the
//      matched text — is exactly the PEG's).
//   F2 head dispatch — every other ordered choice gets a grammar-derived HEAD per alternative: a
//      regex that MUST match where the alternative succeeds (its first mandatory terminal, followed
//      through sequences, `>>`/`<<`, `-`, `+`, nonterminals and choices; `?`/`*` contribute a union
//      with what follows). An alternative whose head fails is skipped without entering it.
//        "guard" — one sticky `test` per alternative (allocation-free);
//        "fused" — ONE sticky classifier regex `(?:h_k()|h_k+1()|…)` per suffix, whose marker group
//                  names the first alternative that can start here (one `exec` replaces a run of
//                  failing alternatives).
//   F3 direct binding — rule references are cells sealed to the rule's FINAL (action-attached)
//      parse function once the actions are attached: no per-call lazy trampoline.
//
// Soundness of F2: a head is a necessary condition, never a sufficient one, so skipping an
// alternative whose head fails is exactly what the PEG would have done (it would fail); failed
// alternatives have no observable effect in value.js (actions are pure; `expected` is never read).
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BBNFToAST, dedupGroups } from "@mkbabb/bbnf-lang";
import { Parser, all, any, createParserContext, eof, mergeErrorState, regex, string } from "@mkbabb/parse-that";
import type { ParserState } from "@mkbabb/parse-that";

type Expr = { type: string; value: any };
export type Dispatch = "any" | "guard" | "fused" | "smart" | "table";
export type FusionOptions = Readonly<{
    /** Rules value.js attaches an action to: never inlined (their value is the action's). */
    opaque: ReadonlySet<string>;
    dispatch: Dispatch;
    /** F1 on/off. */
    fuse: boolean;
    /** F4: value-less leaves in discarded positions. */
    discard: boolean;
    /** F5: text-pure rules collapse to their matched text (recognized without values). */
    collapse: boolean;
    /** F6: one-slot memo on rules the grammar re-enters at the same offset (FIRST-nonterminal overlap). */
    memo: boolean;
    /** The actions the consumer attaches, by rule (known at compile: the API this route proposes). */
    actions?: ReadonlyMap<string, { fn: unknown; kind: string; count: number }>;
    /** F7: an action on a terminal fuses into the leaf (`leaf.map(fn)` is one closure), and adjacent
     *  alternatives that are terminal rules carrying the SAME action fuse into one regex + that action. */
    leafActions?: boolean;
    /** F8: recognizer loops over leading terminals run as one sticky `(?:T)*` per step. */
    loopFusion?: boolean;
}>;
export type Rules = Record<string, Parser<any>>;
export type Compiled = Readonly<{ rules: Rules; seal(): void; stats: Record<string, number>; collapsedRules: readonly string[]; memoRules: readonly string[] }>;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A terminal as flagless regex source + its case-insensitivity (the only flag the grammar uses). */
type Term = Readonly<{ src: string; ci: boolean; lit?: string }>;

/** Rewrites capturing groups to non-capturing ones; `null` when the source uses backreferences. */
function nonCapturing(src: string): string | null {
    let out = "";
    let inClass = false;
    for (let i = 0; i < src.length; i++) {
        const c = src[i];
        if (c === "\\") {
            const n = src[i + 1];
            if (!inClass && n >= "1" && n <= "9") return null;
            if (!inClass && n === "k") return null;
            out += c + n;
            i++;
            continue;
        }
        if (inClass) { if (c === "]") inClass = false; out += c; continue; }
        if (c === "[") { inClass = true; out += c; continue; }
        if (c === "(" && src[i + 1] !== "?") { out += "(?:"; continue; }
        if (c === "(" && src[i + 1] === "?" && src[i + 2] === "<" && src[i + 3] !== "=" && src[i + 3] !== "!") return null;
        out += c;
    }
    return out;
}

function termOfRegex(re: RegExp): Term | null {
    const flags = re.flags.replace(/[gy]/g, "");
    if (flags !== "" && flags !== "i") return null;
    const src = nonCapturing(re.source);
    return src === null ? null : { src, ci: flags === "i" };
}

// ── regex FIRST characters (flag-aware: `i` adds the other ASCII case) ─────────────────
// A superset of the code units a match can start with: index 0..127 ASCII, 128 = any non-ASCII.
// `null` = unknown or the pattern can match empty (then every position is a candidate).
type CharSet = Uint8Array;
const ALL: null = null;
function firstChars(src: string, ci: boolean): CharSet | null {
    let i = 0;
    const set = (): CharSet => new Uint8Array(129);
    const addCode = (s: CharSet, c: number) => {
        if (c >= 128) { s[128] = 1; return; }
        s[c] = 1;
        if (ci) { if (c >= 65 && c <= 90) s[c + 32] = 1; else if (c >= 97 && c <= 122) s[c - 32] = 1; }
    };
    const addRange = (s: CharSet, lo: number, hi: number) => { for (let c = lo; c <= Math.min(hi, 127); c++) addCode(s, c); if (hi >= 128) s[128] = 1; };
    const classEscape = (s: CharSet, e: string): boolean => {
        switch (e) {
            case "d": addRange(s, 48, 57); return true;
            case "w": addRange(s, 48, 57); addRange(s, 65, 90); addRange(s, 97, 122); addCode(s, 95); return true;
            case "s": for (const c of [9, 10, 11, 12, 13, 32]) addCode(s, c); s[128] = 1; return true;
            case "D": case "W": case "S": { const t = set(); classEscape(t, e.toLowerCase()); for (let c = 0; c < 128; c++) if (!t[c]) s[c] = 1; s[128] = 1; return true; }
            default: return false;
        }
    };
    const escapeCode = (e: string): number => {
        switch (e) {
            case "n": return 10; case "t": return 9; case "r": return 13; case "f": return 12; case "v": return 11; case "0": return 0;
            case "u": { const h = src.slice(i, i + 4); i += 4; return parseInt(h, 16); }
            case "x": { const h = src.slice(i, i + 2); i += 2; return parseInt(h, 16); }
            default: return e.charCodeAt(0);
        }
    };
    const parseClass = (): CharSet => {
        const s = set();
        let neg = false;
        if (src[i] === "^") { neg = true; i++; }
        let first = true;
        while (i < src.length && (src[i] !== "]" || first)) {
            first = false;
            let lo: number;
            if (src[i] === "\\") { const e = src[i + 1]; i += 2; if (classEscape(s, e)) continue; lo = escapeCode(e); }
            else lo = src.charCodeAt(i++);
            if (src[i] === "-" && src[i + 1] !== "]" && i + 1 < src.length) {
                i++;
                let hi: number;
                if (src[i] === "\\") { const e = src[i + 1]; i += 2; hi = escapeCode(e); } else hi = src.charCodeAt(i++);
                addRange(s, lo, hi);
            } else addCode(s, lo);
        }
        i++; // ]
        if (!neg) return s;
        const out = set();
        for (let c = 0; c < 128; c++) if (!s[c]) out[c] = 1;
        out[128] = 1;
        return out;
    };
    // returns [first set, nullable]
    const alt = (): [CharSet, boolean] => {
        const s = set();
        let nullable = false;
        for (;;) {
            const [f, n] = seq();
            for (let c = 0; c < 129; c++) if (f[c]) s[c] = 1;
            if (n) nullable = true;
            if (src[i] === "|") { i++; continue; }
            return [s, nullable];
        }
    };
    const seq = (): [CharSet, boolean] => {
        const s = set();
        let nullable = true;
        while (i < src.length && src[i] !== "|" && src[i] !== ")") {
            const [f, n0] = atom();
            let n = n0;
            // quantifier
            const q = src[i];
            if (q === "*" || q === "?") { n = true; i++; }
            else if (q === "+") i++;
            else if (q === "{") { const m = /^\{(\d+)(?:,\d*)?\}/.exec(src.slice(i)); if (m) { if (+m[1] === 0) n = true; i += m[0].length; } }
            if (src[i] === "?") i++; // lazy
            if (nullable) for (let c = 0; c < 129; c++) if (f[c]) s[c] = 1;
            if (!n) nullable = false;
        }
        return [s, nullable];
    };
    const atom = (): [CharSet, boolean] => {
        const c = src[i];
        if (c === "(") {
            i++;
            let zeroWidth = false;
            if (src[i] === "?") {
                if (src[i + 1] === ":") i += 2;
                else if (src[i + 1] === "=" || src[i + 1] === "!") { i += 2; zeroWidth = true; }
                else if (src[i + 1] === "<" && (src[i + 2] === "=" || src[i + 2] === "!")) { i += 3; zeroWidth = true; }
                else if (src[i + 1] === "<") { i = src.indexOf(">", i) + 1; }
                else throw new Error("modifier group");
            }
            const r = alt();
            i++; // )
            return zeroWidth ? [set(), true] : r;
        }
        if (c === "[") { i++; return [parseClass(), false]; }
        if (c === ".") { i++; const s = set(); s.fill(1); return [s, false]; }
        if (c === "^" || c === "$") { i++; return [set(), true]; }
        if (c === "\\") {
            const e = src[i + 1];
            i += 2;
            if (e === "b" || e === "B") return [set(), true];
            const s = set();
            if (!classEscape(s, e)) addCode(s, escapeCode(e));
            return [s, false];
        }
        i++;
        const s = set();
        addCode(s, c.charCodeAt(0));
        return [s, false];
    };
    try {
        const [f, n] = alt();
        return n ? ALL : f;
    } catch { return ALL; }
}

export function compileFused(text: string, opts: FusionOptions): Compiled {
    const [, ast] = BBNFToAST(text) as unknown as [unknown, Map<string, { expression: Expr }>];
    if (!ast) throw new Error("BBNF grammar did not parse");
    dedupGroups(ast as any);
    const exprOf = new Map<string, Expr>();
    for (const [name, rule] of ast) exprOf.set(name, rule.expression);
    const stats: Record<string, number> = { inlined: 0, fusedRuns: 0, headDispatch: 0, headless: 0, anyChoices: 0, discardLeaves: 0, collapsed: 0 };

    const unwrap = (e: Expr): Expr => { while (e.type === "group") e = e.value; return e; };

    // ── F1: terminal resolution ─────────────────────────────────────────────────────────
    // `terminalOf(e)` → the exact terminal `e` is (value = the matched text), or null.
    const ruleTerm = new Map<string, Term | null>();
    const inProgress = new Set<string>();
    function terminalOf(e: Expr): Term | null {
        e = unwrap(e);
        switch (e.type) {
            case "literal": return (e.value as string).length > 0 ? { src: escapeRegex(e.value), ci: false, lit: e.value } : null;
            case "regex": return termOfRegex(e.value);
            case "nonterminal": {
                const name = e.value as string;
                if (!opts.fuse || opts.opaque.has(name)) return null;
                if (ruleTerm.has(name)) return ruleTerm.get(name)!;
                if (inProgress.has(name)) return null;
                inProgress.add(name);
                const t = terminalOf(exprOf.get(name)!);
                inProgress.delete(name);
                ruleTerm.set(name, t);
                return t;
            }
            case "alternation": {
                if (!opts.fuse) return null;
                const ts = (e.value as Expr[]).map(terminalOf);
                if (ts.some((t) => t === null)) return null;
                const ci = ts[0]!.ci;
                if (ts.some((t) => t!.ci !== ci)) return null; // exact fusion needs one flag set
                return { src: `(?:${ts.map((t) => t!.src).join("|")})`, ci };
            }
            default: return null;
        }
    }
    const leafOf = (t: Term) => (opts.leafActions ? valueLeaf(t) : regex(new RegExp(t.src, t.ci ? "i" : "")));
    /** `regex(t)` whose `.map(fn)` is ONE closure (test → substring → fn), not a wrapper frame. */
    function valueLeaf(t: Term): Parser<any> {
        const re = new RegExp(t.src, t.ci ? "iy" : "y");
        const leaf = (state: ParserState<any>) => {
            const src = state.src;
            const o = state.offset;
            if (o >= src.length) { state.isError = true; return state; }
            re.lastIndex = o;
            if (re.test(src)) {
                const end = re.lastIndex;
                if (end > o) { state.offset = end; state.value = src.substring(o, end); } else state.value = undefined;
                state.isError = false;
                return state;
            }
            mergeErrorState(state);
            state.isError = true;
            return state;
        };
        const p = new Parser(leaf, createParserContext("regex", undefined, re));
        (p as any).map = (fn: (v: any) => any, mapError = false) => {
            if (mapError) return Parser.prototype.map.call(p, fn, mapError);
            stats.leafActions = (stats.leafActions ?? 0) + 1;
            return new Parser((state: ParserState<any>) => {
                const src = state.src;
                const o = state.offset;
                if (o >= src.length) { state.isError = true; return state; }
                re.lastIndex = o;
                if (re.test(src)) {
                    const end = re.lastIndex;
                    state.offset = end;
                    state.value = fn(end > o ? src.substring(o, end) : undefined);
                    state.isError = false;
                    return state;
                }
                mergeErrorState(state);
                state.isError = true;
                return state;
            }, createParserContext("map", undefined, re));
        };
        return p;
    }
    /** The terminal an ACTION-BEARING rule's body is (its action applied on top), or null. */
    function actionTerm(e: Expr): { term: Term; fn: (v: any) => any } | null {
        e = unwrap(e);
        if (!opts.leafActions || e.type !== "nonterminal") return null;
        const a = opts.actions?.get(e.value);
        if (!a || a.kind !== "map" || a.count !== 1) return null;
        const body = unwrap(exprOf.get(e.value)!);
        const term = body.type === "regex" ? termOfRegex(body.value) : body.type === "nonterminal" || body.type === "alternation" ? terminalOf(body) : null;
        return term && { term, fn: a.fn as (v: any) => any };
    }

    // ── F2: heads ───────────────────────────────────────────────────────────────────────
    // `headOf(e)` → a Term that must match at the start offset whenever `e` succeeds; null = none known.
    const ruleHead = new Map<string, Term | null>();
    const headBusy = new Set<string>();
    const union = (a: Term | null, b: Term | null): Term | null =>
        a === null || b === null ? null : { src: `(?:${a.src}|${b.src})`, ci: a.ci || b.ci };
    function skippable(e: Expr): Expr | null {
        // `?` / `*` (possibly through a group or an action-free alias): may succeed consuming nothing.
        e = unwrap(e);
        if (e.type === "optional" || e.type === "many") return unwrap(e.value);
        if (e.type === "nonterminal" && !headBusy.has(e.value)) {
            const inner = exprOf.get(e.value);
            if (inner) {
                const u = unwrap(inner);
                if (u.type === "optional" || u.type === "many") return unwrap(u.value);
            }
        }
        return null;
    }
    function headOfSeq(parts: Expr[]): Term | null {
        if (parts.length === 0) return null;
        const [first, ...rest] = parts;
        const h = headOf(first);
        if (h !== null) return h;
        const inner = skippable(first);
        if (inner === null) return null;
        return union(headOf(inner), headOfSeq(rest));
    }
    function headOf(e: Expr): Term | null {
        e = unwrap(e);
        switch (e.type) {
            case "literal":
            case "regex": {
                const t = e.type === "literal" ? ((e.value as string).length ? { src: escapeRegex(e.value), ci: false, lit: e.value as string } : null) : termOfRegex(e.value);
                return t;
            }
            case "nonterminal": {
                const name = e.value as string;
                if (ruleHead.has(name)) return ruleHead.get(name)!;
                if (headBusy.has(name)) return null;
                headBusy.add(name);
                const h = headOf(exprOf.get(name)!);
                headBusy.delete(name);
                ruleHead.set(name, h);
                return h;
            }
            case "alternation": {
                let acc: Term | null = null;
                for (const a of e.value as Expr[]) {
                    const h = headOf(a);
                    if (h === null) return null;
                    acc = acc === null ? h : union(acc, h);
                }
                return acc;
            }
            case "concatenation": return headOfSeq(e.value as Expr[]);
            case "skip":
            case "next": return headOfSeq(e.value as Expr[]);
            case "minus": return headOf((e.value as Expr[])[0]);
            case "many1": return headOf(e.value);
            default: return null; // optional · many · epsilon · optionalWhitespace
        }
    }

    // ── F3: cells ───────────────────────────────────────────────────────────────────────
    const rules: Rules = {};
    const cells = new Map<string, Parser<any>>();
    function cellOf(name: string): Parser<any> {
        let c = cells.get(name);
        if (c === undefined) {
            const cell: Parser<any> = new Parser((state: ParserState<any>) => rules[name].parser(state), createParserContext("cell", undefined));
            (cell.context as any).name = name;
            cells.set(name, cell);
            c = cell;
        }
        return c;
    }

    // ── F4: value-less leaves (discarded positions and recognizers) ─────────────────────
    // `skipLeaf` is `regex(t)`/`string(t)` without the value: the same success/failure (incl. the
    // published leaf's fail-at-end-of-input), no substring. `optSkipLeaf` is `t ?` likewise.
    function stickyOf(t: Term): RegExp { return new RegExp(t.src, t.ci ? "iy" : "y"); }
    function skipLeaf(t: Term): Parser<any> {
        const lit = t.lit;
        if (lit !== undefined && lit.length === 1) {
            const code = lit.charCodeAt(0);
            return new Parser((state: ParserState<any>) => {
                if (state.src.charCodeAt(state.offset) === code) { state.offset++; state.value = undefined; state.isError = false; return state; }
                state.isError = true;
                return state;
            }, createParserContext("skipLeaf", undefined));
        }
        const re = stickyOf(t);
        return new Parser((state: ParserState<any>) => {
            const src = state.src;
            const o = state.offset;
            if (o >= src.length) { state.isError = true; return state; }
            re.lastIndex = o;
            if (re.test(src)) { state.offset = re.lastIndex; state.value = undefined; state.isError = false; return state; }
            state.isError = true;
            return state;
        }, createParserContext("skipLeaf", undefined));
    }
    function optSkipLeaf(t: Term): Parser<any> {
        const re = stickyOf(t);
        return new Parser((state: ParserState<any>) => {
            const src = state.src;
            const o = state.offset;
            if (o < src.length) { re.lastIndex = o; if (re.test(src)) state.offset = re.lastIndex; }
            state.value = undefined;
            state.isError = false;
            return state;
        }, createParserContext("optSkipLeaf", undefined));
    }
    const discardBusy = new Set<string>();
    function discardLeafOf(e: Expr): Parser<any> | null {
        e = unwrap(e);
        if (e.type === "regex" || e.type === "literal") { const t = terminalOf(e); return t && skipLeaf(t); }
        if (e.type === "alternation") { const t = terminalOf(e); return t && skipLeaf(t); }
        if (e.type === "optional") {
            const inner = unwrap(e.value);
            const t = inner.type === "nonterminal" ? terminalOf(inner) : (inner.type === "regex" || inner.type === "literal" || inner.type === "alternation") ? terminalOf(inner) : null;
            return t && optSkipLeaf(t);
        }
        if (e.type === "nonterminal" && !opts.opaque.has(e.value) && !discardBusy.has(e.value)) {
            discardBusy.add(e.value);
            const r = discardLeafOf(exprOf.get(e.value)!);
            discardBusy.delete(e.value);
            return r;
        }
        return null;
    }

    // ── F5: text-pure rules collapse to their matched text, recognized without values ───
    // A rule is TEXT-PURE when nothing in its subgraph carries an action and nothing discards
    // (`>>`, `<<`, `?w`): its value tree then holds every matched code unit in order, so the text
    // an action reads from it (`textOf`) is exactly `src.slice(start, end)`.
    const pure = new Set<string>();
    if (opts.collapse) {
        for (const name of exprOf.keys()) if (!opts.opaque.has(name)) pure.add(name);
        const pureExpr = (e: Expr): boolean => {
            e = unwrap(e);
            switch (e.type) {
                case "literal": case "regex": case "epsilon": return true;
                case "nonterminal": return pure.has(e.value);
                case "alternation": case "concatenation": return (e.value as Expr[]).every(pureExpr);
                case "many": case "many1": case "optional": return pureExpr(e.value);
                case "minus": return pureExpr(e.value[0]);
                default: return false;
            }
        };
        for (let changed = true; changed;) {
            changed = false;
            for (const name of [...pure]) if (!pureExpr(exprOf.get(name)!)) { pure.delete(name); changed = true; }
        }
    }
    const collapsible = (e: Expr): boolean => {
        if (!opts.collapse) return false;
        const u = unwrap(e);
        if (u.type === "regex" || u.type === "literal" || terminalOf(u) !== null) return false;
        const check = (x: Expr): boolean => {
            x = unwrap(x);
            switch (x.type) {
                case "literal": case "regex": case "epsilon": return true;
                case "nonterminal": return pure.has(x.value);
                case "alternation": case "concatenation": return (x.value as Expr[]).every(check);
                case "many": case "many1": case "optional": return check(x.value);
                case "minus": return check(x.value[0]);
                default: return false;
            }
        };
        return check(u);
    };
    const recRules: Rules = {};
    const collapsedRules: string[] = [];
    const recCells = new Map<string, Parser<any>>();
    function recCellOf(name: string): Parser<any> {
        let c = recCells.get(name);
        if (c === undefined) {
            c = new Parser((state: ParserState<any>) => recRules[name].parser(state), createParserContext("recCell", undefined));
            recCells.set(name, c);
        }
        return c;
    }
    function genRec(e: Expr): Parser<any> {
        e = unwrap(e);
        const t = e.type === "nonterminal" ? null : terminalOf(e);
        if (t !== null) return skipLeaf(t);
        switch (e.type) {
            case "nonterminal": {
                const nt = terminalOf(e);
                return nt !== null ? skipLeaf(nt) : recCellOf(e.value);
            }
            case "epsilon": return new Parser((state: ParserState<any>) => { state.isError = false; state.value = undefined; return state; }, createParserContext("eps", undefined));
            case "optional": {
                const p = genRec(e.value);
                return new Parser((state: ParserState<any>) => {
                    const o = state.offset;
                    p.parser(state);
                    if (state.isError) { state.offset = o; state.isError = false; }
                    state.value = undefined;
                    return state;
                }, createParserContext("optRec", undefined, p));
            }
            case "many": case "many1": {
                const loop = opts.loopFusion ? scanLoop(e) : null;
                if (loop !== null) return loop;
                const p = genRec(e.value);
                const min = e.type === "many1" ? 1 : 0;
                return new Parser((state: ParserState<any>) => {
                    let n = 0;
                    for (;;) {
                        const o = state.offset;
                        p.parser(state);
                        if (state.isError) { state.offset = o; state.isError = false; break; }
                        if (state.offset === o) break;
                        n++;
                    }
                    state.value = undefined;
                    if (n < min) state.isError = true;
                    return state;
                }, createParserContext("manyRec", undefined, p));
            }
            case "concatenation": case "skip": case "next": return seqRec((e.value as Expr[]).map(genRec));
            case "minus": {
                const [a, b] = (e.value as Expr[]).map(genRec);
                return new Parser((state: ParserState<any>) => {
                    const o = state.offset;
                    b.parser(state);
                    state.offset = o;
                    if (!state.isError) { state.isError = true; return state; }
                    state.isError = false;
                    return a.parser(state);
                }, createParserContext("minusRec", undefined, a, b));
            }
            case "alternation": return choice(e.value as Expr[], true);
            default: throw new Error(`unhandled recognizer node ${e.type}`);
        }
    }
    // F8 loop fusion (recognizers): `( T1 | … | Tk | A1 | … )*` whose leading alternatives are
    // terminals becomes ONE sticky `(?:T1|…|Tk)*` per step — the regex engine runs the regular part
    // of the loop — and only where that run stops are the structural alternatives tried, in order.
    // Exact: the terminals come first in the ordered choice, `(?:T)*` standing alone takes each
    // T's preferred match and never backtracks, and T cannot match empty (FIRST set known).
    function scanLoop(e: Expr): Parser<any> | null {
        const inner = unwrap(e.value);
        if (inner.type !== "alternation") return null;
        const alts = inner.value as Expr[];
        let k = 0;
        const run: Term[] = [];
        while (k < alts.length) { const t = terminalOf(alts[k]); if (t === null || (run.length && t.ci !== run[0].ci)) break; run.push(t); k++; }
        if (k === 0 || k === alts.length) return null;
        const T: Term = { src: run.length === 1 ? run[0].src : `(?:${run.map((r) => r.src).join("|")})`, ci: run[0].ci };
        if (firstChars(T.src, T.ci) === ALL) return null; // may match empty: not exact
        stats.scanLoops = (stats.scanLoops ?? 0) + 1;
        const star = new RegExp(`(?:${T.src})*`, T.ci ? "iy" : "y");
        const rest = choice(alts.slice(k), true);
        const min = e.type === "many1" ? 1 : 0;
        return new Parser((state: ParserState<any>) => {
            const src = state.src;
            const start = state.offset;
            let o = start;
            for (;;) {
                if (o < src.length) { star.lastIndex = o; star.test(src); o = star.lastIndex; }
                state.offset = o;
                rest.parser(state);
                if (state.isError || state.offset === o) { state.offset = o; state.isError = false; break; }
                o = state.offset;
            }
            state.value = undefined;
            // many1: at least one iteration consumed something (T consumes ≥1 when it matches).
            if (min === 1 && o === start) state.isError = true;
            return state;
        }, createParserContext("scanLoop", undefined, rest));
    }
    function seqRec(ps: Parser<any>[]): Parser<any> {
        if (ps.length === 1) return ps[0];
        const n = ps.length;
        return new Parser((state: ParserState<any>) => {
            const o = state.offset;
            for (let i = 0; i < n; i++) {
                ps[i].parser(state);
                if (state.isError) { state.offset = o; return state; }
            }
            state.value = undefined;
            return state;
        }, createParserContext("seqRec", undefined, ...ps));
    }
    function sliceOf(rec: Parser<any>): Parser<any> {
        return new Parser((state: ParserState<any>) => {
            const o = state.offset;
            rec.parser(state);
            if (!state.isError) state.value = state.src.slice(o, state.offset);
            return state;
        }, createParserContext("slice", undefined, rec));
    }

    // ── generation (published ASTToParser's node semantics) ─────────────────────────────
    function gen(e: Expr, discarded = false): Parser<any> {
        e = e.type === "group" ? unwrap(e) : e;
        if (discarded && opts.discard) { const d = discardLeafOf(e); if (d !== null) { stats.discardLeaves++; return d; } }
        // Published: skip(next(L, M), R) → M.wrap(L, R) (the same value; different bookkeeping only).
        if (e.type === "skip") {
            const [l, r] = e.value as Expr[];
            const ul = unwrap(l);
            if (ul.type === "next") {
                const [a, m] = ul.value as Expr[];
                return gen(m).wrap(gen(a, true), gen(r, true));
            }
        }
        // Published: (item << sep?)* → item.sepBy(sep) — asserted absent from value.js's grammar.
        if ((e.type === "many" || e.type === "many1") && unwrap(e.value).type === "skip" && unwrap(unwrap(e.value).value[1]).type === "optional")
            throw new Error("sepBy shape: not prototyped");
        const t = terminalOf(e);
        if (t !== null && e.type !== "literal" && e.type !== "regex") { stats.inlined++; return leafOf(t); }
        switch (e.type) {
            case "literal": return string(e.value);
            case "regex": { const rt = opts.leafActions ? termOfRegex(e.value) : null; return rt ? valueLeaf(rt) : regex(e.value); }
            case "nonterminal": return cellOf(e.value);
            case "epsilon": return eof().opt();
            case "optional": return gen(e.value).opt();
            case "many": return gen(e.value).many();
            case "many1": return gen(e.value).many(1);
            case "skip": { const [a, b] = e.value as Expr[]; return gen(a).skip(gen(b, true)); }
            case "next": { const [a, b] = e.value as Expr[]; return gen(a, true).next(gen(b)); }
            case "minus": { const [a, b] = e.value as Expr[]; return gen(a).minus(gen(b, true)); }
            case "optionalWhitespace": return gen(e.value).trim();
            case "concatenation": {
                const ps = (e.value as Expr[]).map((x) => gen(x));
                return ps.length === 1 ? ps[0] : all(...ps);
            }
            case "alternation": return choice(e.value as Expr[], false);
            default: throw new Error(`unhandled node ${e.type}`);
        }
    }

    /** An ordered choice: adjacent terminal alternatives fused (F1), the rest head-dispatched (F2). */
    function choice(alts: Expr[], rec: boolean): Parser<any> {
        const ps: Parser<any>[] = [];
        const heads: (Term | null)[] = [];
        const selfGuarded: boolean[] = []; // the alternative IS a terminal leaf: its own test is its guard
        for (let i = 0; i < alts.length;) {
            // F7: a run of terminal rules carrying the same action → one regex + that action.
            const a0 = rec ? null : actionTerm(alts[i]);
            if (a0 !== null) {
                let j = i + 1;
                while (j < alts.length) { const aj = actionTerm(alts[j]); if (aj === null || aj.fn !== a0.fn || aj.term.ci !== a0.term.ci) break; j++; }
                if (j - i >= 2) {
                    const run = alts.slice(i, j).map((a) => actionTerm(a)!.term);
                    const fused: Term = { src: `(?:${run.map((r) => r.src).join("|")})`, ci: a0.term.ci };
                    stats.sameActionRuns = (stats.sameActionRuns ?? 0) + 1;
                    ps.push(valueLeaf(fused).map(a0.fn));
                    heads.push(fused);
                    selfGuarded.push(true);
                    i = j;
                    continue;
                }
            }
            const t0 = opts.fuse ? terminalOf(alts[i]) : null;
            let j = i + 1;
            if (t0 !== null) while (j < alts.length) { const tj = terminalOf(alts[j]); if (tj === null || tj.ci !== t0.ci) break; j++; }
            if (t0 !== null && j - i >= 2) {
                const run = alts.slice(i, j).map((a) => terminalOf(a)!);
                const fused: Term = { src: `(?:${run.map((r) => r.src).join("|")})`, ci: t0.ci };
                stats.fusedRuns++;
                ps.push(rec ? skipLeaf(fused) : leafOf(fused));
                heads.push(fused);
                selfGuarded.push(true);
            } else {
                j = i + 1;
                ps.push(rec ? genRec(alts[i]) : gen(alts[i]));
                heads.push(headOf(alts[i]));
                const u = unwrap(alts[i]);
                selfGuarded.push(u.type === "regex" || u.type === "literal" || (opts.fuse && terminalOf(u) !== null));
            }
            i = j;
        }
        if (ps.length === 1) return ps[0];
        if (opts.dispatch === "any") { stats.anyChoices++; return rec ? anyRec(ps) : any(...ps); }
        if (heads.every((h) => h === null)) { stats.headless++; return rec ? anyRec(ps) : any(...ps); }
        stats.headDispatch++;
        const n = ps.length;
        if (opts.dispatch === "table" && !rec) {
            // table: a 128-entry FIRST-character table (flag-aware, from the grammar-derived heads)
            // narrows the ordered alternatives to those that can start with this code unit; the
            // candidates are then tried in order, directly (their own leading terminal is the test).
            const firsts = heads.map((h) => (h === null ? ALL : firstChars(h.src, h.ci)));
            const cand: number[][] = [];
            for (let c = 0; c < 129; c++) cand.push(firsts.flatMap((f, i) => (f === ALL || f[c] ? [i] : [])));
            const atEnd = firsts.flatMap((f, i) => (f === ALL ? [i] : []));
            stats.tableChoices = (stats.tableChoices ?? 0) + 1;
            const tableChoice = (state: ParserState<any>) => {
                const src = state.src;
                const o = state.offset;
                const ch = src.charCodeAt(o);
                const list = ch < 128 ? cand[ch] : ch === ch ? cand[128] : atEnd;
                for (let k = 0; k < list.length; k++) {
                    ps[list[k]].parser(state);
                    if (!state.isError) return state;
                    state.offset = o;
                    state.isError = false;
                }
                mergeErrorState(state);
                state.isError = true;
                return state;
            };
            return new Parser(tableChoice, createParserContext("any", undefined, ...ps));
        }
        // smart (allocation-free): a terminal alternative guards itself; a head that is one literal
        // character is a char-code compare; any other head is one sticky `test`. Recognizers always
        // use it (a classifier `exec` there allocates per iteration of a scanning loop).
        if (opts.dispatch === "smart" || (rec && opts.dispatch !== "any")) {
            const kind: number[] = [], code: number[] = [], res: (RegExp | null)[] = [];
            for (let i = 0; i < n; i++) {
                const h = heads[i];
                if (selfGuarded[i] || h === null) { kind.push(0); code.push(0); res.push(null); }
                else if (h.lit !== undefined && h.lit.length === 1 && !h.ci) { kind.push(1); code.push(h.lit.charCodeAt(0)); res.push(null); }
                else { kind.push(2); code.push(0); res.push(stickyOf(h)); }
            }
            const smartChoice = (state: ParserState<any>) => {
                const src = state.src;
                const o = state.offset;
                for (let i = 0; i < n; i++) {
                    const k = kind[i];
                    if (k === 1) { if (src.charCodeAt(o) !== code[i]) continue; }
                    else if (k === 2) { const g = res[i]!; g.lastIndex = o; if (!g.test(src)) continue; }
                    ps[i].parser(state);
                    if (!state.isError) return state;
                    state.offset = o;
                    state.isError = false;
                }
                if (!rec) mergeErrorState(state);
                state.isError = true;
                return state;
            };
            return new Parser(smartChoice, createParserContext("any", undefined, ...ps));
        }
        if (opts.dispatch === "guard") {
            const guards = heads.map((h) => (h === null ? null : stickyOf(h)));
            const guardChoice = (state: ParserState<any>) => {
                const src = state.src;
                const o = state.offset;
                for (let i = 0; i < n; i++) {
                    const g = guards[i];
                    if (g !== null) { g.lastIndex = o; if (!g.test(src)) continue; }
                    ps[i].parser(state);
                    if (!state.isError) return state;
                    state.offset = o;
                    state.isError = false;
                }
                if (!rec) mergeErrorState(state);
                state.isError = true;
                return state;
            };
            return new Parser(guardChoice, createParserContext("any", undefined, ...ps));
        }
        // fused: one classifier per suffix; a head-less alternative is `(?:)` (always a candidate).
        const ci = heads.some((h) => h !== null && h.ci);
        const cls: RegExp[] = [];
        for (let k = 0; k < n; k++)
            cls.push(new RegExp(`(?:${heads.slice(k).map((h) => `${h === null ? "" : `(?:${h.src})`}()`).join("|")})`, ci ? "iy" : "y"));
        const fusedChoice = (state: ParserState<any>) => {
            const src = state.src;
            const o = state.offset;
            let k = 0;
            while (k < n) {
                const re = cls[k];
                re.lastIndex = o;
                const m = re.exec(src);
                if (m === null) break;
                let j = k;
                while (m[j - k + 1] === undefined) j++;
                ps[j].parser(state);
                if (!state.isError) return state;
                state.offset = o;
                state.isError = false;
                k = j + 1;
            }
            if (!rec) mergeErrorState(state);
            state.isError = true;
            return state;
        };
        return new Parser(fusedChoice, createParserContext("any", undefined, ...ps));
    }
    function anyRec(ps: Parser<any>[]): Parser<any> {
        const n = ps.length;
        return new Parser((state: ParserState<any>) => {
            const o = state.offset;
            for (let i = 0; i < n; i++) {
                ps[i].parser(state);
                if (!state.isError) return state;
                state.offset = o;
                state.isError = false;
            }
            state.isError = true;
            return state;
        }, createParserContext("anyRec", undefined, ...ps));
    }

    // F5 applies at RULE level only: a text-pure rule's value is its matched text wherever it is
    // referenced; sub-expressions of other rules keep the published value shapes.
    for (const [name, e] of exprOf) {
        if (collapsible(e)) { stats.collapsed++; collapsedRules.push(name); rules[name] = sliceOf(genRec(e)); } else rules[name] = gen(e);
    }
    // ── F6: re-entry analysis ───────────────────────────────────────────────────────────
    // `leads(e)`: the rules invoked at e's START offset. Where two continuations of one choice
    // point can both start at the same offset — the alternatives of `|`, or `X*`/`X?` and what
    // follows it, or `a - b` — a rule in both lead sets is re-entered at the same offset when the
    // first fails: it gets a one-slot memo (the last (source, offset) → result), so the PEG re-reads
    // nothing. Grammar-derived; the left-factoring a hand parser does by reading a run once.
    const memoRules = new Set<string>();
    if (opts.memo) {
        const leadMemo = new Map<string, Set<string>>();
        const nullableE = (e: Expr): boolean => {
            e = unwrap(e);
            return e.type === "optional" || e.type === "many" || e.type === "epsilon";
        };
        const leads = (e: Expr, busy: Set<string> = new Set()): Set<string> => {
            e = unwrap(e);
            switch (e.type) {
                case "nonterminal": {
                    const n = e.value as string;
                    if (leadMemo.has(n)) return leadMemo.get(n)!;
                    if (busy.has(n)) return new Set([n]);
                    busy.add(n);
                    const out = new Set([n, ...leads(exprOf.get(n)!, busy)]);
                    busy.delete(n);
                    leadMemo.set(n, out);
                    return out;
                }
                case "alternation": return new Set((e.value as Expr[]).flatMap((a) => [...leads(a, busy)]));
                case "concatenation": case "skip": case "next": {
                    const out = new Set<string>();
                    for (const x of e.value as Expr[]) { for (const l of leads(x, busy)) out.add(l); if (!nullableE(x)) break; }
                    return out;
                }
                case "minus": return new Set([...leads(e.value[0], busy), ...leads(e.value[1], busy)]);
                case "many": case "many1": case "optional": return leads(e.value, busy);
                default: return new Set();
            }
        };
        const meet = (a: Set<string>, b: Set<string>) => { for (const x of a) if (b.has(x)) memoRules.add(x); };
        const visit = (e: Expr): void => {
            e = unwrap(e);
            switch (e.type) {
                case "alternation": {
                    const ls = (e.value as Expr[]).map((a) => leads(a));
                    for (let i = 0; i < ls.length; i++) for (let j = i + 1; j < ls.length; j++) meet(ls[i], ls[j]);
                    (e.value as Expr[]).forEach(visit);
                    return;
                }
                case "concatenation": case "skip": case "next": {
                    const xs = e.value as Expr[];
                    for (let i = 0; i + 1 < xs.length; i++) if (nullableE(xs[i])) meet(leads(unwrap(xs[i]).value ?? xs[i]), leads({ type: "concatenation", value: xs.slice(i + 1) }));
                    xs.forEach(visit);
                    return;
                }
                case "minus": meet(leads(e.value[0]), leads(e.value[1])); visit(e.value[0]); visit(e.value[1]); return;
                case "many": case "many1": case "optional": case "group": visit(e.value); return;
                default: return;
            }
        };
        for (const e of exprOf.values()) visit(e);
        // A terminal rule is re-read by one regex test: a memo would cost what it saves.
        for (const n of [...memoRules]) if (terminalOf({ type: "nonterminal", value: n }) !== null || unwrap(exprOf.get(n)!).type === "regex") memoRules.delete(n);
    }
    function memoized(inner: (state: ParserState<any>) => ParserState<any>) {
        let src: string | undefined;
        let at = -1, end = 0, value: unknown, isError = false;
        return (state: ParserState<any>) => {
            if (state.offset === at && state.src === src) { state.offset = end; state.value = value; state.isError = isError; return state; }
            const o = state.offset;
            inner(state);
            src = state.src; at = o; end = state.offset; value = state.value; isError = state.isError;
            return state;
        };
    }

    // Recognizer bodies for every rule a recognizer references (generated to a fixpoint).
    for (let added = true; added;) {
        added = false;
        for (const name of recCells.keys()) if (!(name in recRules)) { recRules[name] = genRec(exprOf.get(name)!); added = true; }
    }
    return {
        rules,
        stats,
        collapsedRules,
        memoRules: [...memoRules],
        /** Binds every reference to its rule's final parse function (after the actions attach). */
        seal() {
            for (let pass = 0; pass < 2; pass++) {
                for (const [name, cell] of cells) cell.parser = rules[name].parser;
                for (const [name, cell] of recCells) cell.parser = recRules[name].parser;
            }
            for (const name of memoRules) {
                if (cells.has(name)) cells.get(name)!.parser = memoized(rules[name].parser);
                if (recCells.has(name)) recCells.get(name)!.parser = memoized(recRules[name].parser);
            }
        },
    };
}
