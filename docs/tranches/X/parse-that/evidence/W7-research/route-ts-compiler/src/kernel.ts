// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · kernel.ts — the combinator kernel a compiled BBNF rule runs on.
//
// A kernel parser is `(src, offset) => end`, `end = -1` on failure. Position is a RETURN VALUE, so
// backtracking is free (nothing to restore) and failure is one integer — no error object, no label,
// no furthest bookkeeping (diagnostics are a second, instrumented pass, never a tax on this one).
// A parser's VALUE travels in the single register `V`, written by the leaves and the value-mode
// combinators; the recognize-mode (`…R`) combinators never write it (their value is discarded by
// the grammar: the left of `>>`, the right of `<<`, the excluded side of `-`).
//
// Value semantics are parse-that 0.8.2's exactly (the published path value.js's actions were written
// against): a sequence's value is its parts' values with `undefined` DROPPED; `many` keeps every
// value; `?` answers `undefined` on a miss; `>>` answers its right, `<<` its left; a regex leaf fails
// at end of input and answers `undefined` for an empty match (F-p-EOF, kept for equivalence).

export type K = (s: string, i: number) => number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let V: any = undefined;
/** The value register, read by the façade after a successful top-level parse. */
export const value = (): unknown => V;

/** A first-character guard: 128 ASCII bits + one bit for every non-ASCII code unit. EOF never passes. */
export type Guard = Readonly<{ tbl: Uint8Array; na: boolean }>;

// ── leaves ───────────────────────────────────────────────────────────────────────────────────
export function lit(str: string): K {
    const len = str.length, c0 = str.charCodeAt(0);
    if (len === 1) return (s, i) => (s.charCodeAt(i) === c0 ? ((V = str), i + 1) : -1);
    return (s, i) => (s.charCodeAt(i) === c0 && s.startsWith(str, i) ? ((V = str), i + len) : -1);
}
export function litR(str: string): K {
    const len = str.length, c0 = str.charCodeAt(0);
    if (len === 1) return (s, i) => (s.charCodeAt(i) === c0 ? i + 1 : -1);
    return (s, i) => (s.charCodeAt(i) === c0 && s.startsWith(str, i) ? i + len : -1);
}

const sticky = (re: RegExp) => new RegExp(re.source, re.flags.replace(/[gy]/g, "") + "y");

/** A regex leaf; `g` guards the first code unit when the pattern cannot match empty. */
export function re(r: RegExp, g: Guard | null): K {
    const R = sticky(r);
    if (g === null) {
        return (s, i) => {
            if (i >= s.length) return -1;
            R.lastIndex = i;
            if (!R.test(s)) return -1;
            const e = R.lastIndex;
            if (e > i) { V = s.substring(i, e); return e; }
            V = undefined;
            return i;
        };
    }
    const { tbl, na } = g;
    return (s, i) => {
        const k = s.charCodeAt(i);
        if (k < 128 ? tbl[k] === 0 : !(na && k === k)) return -1;
        R.lastIndex = i;
        if (!R.test(s)) return -1;
        const e = R.lastIndex;
        V = s.substring(i, e);
        return e;
    };
}
export function reR(r: RegExp, g: Guard | null): K {
    const R = sticky(r);
    if (g === null) {
        return (s, i) => {
            if (i >= s.length) return -1;
            R.lastIndex = i;
            return R.test(s) ? R.lastIndex : -1;
        };
    }
    const { tbl, na } = g;
    return (s, i) => {
        const k = s.charCodeAt(i);
        if (k < 128 ? tbl[k] === 0 : !(na && k === k)) return -1;
        R.lastIndex = i;
        return R.test(s) ? R.lastIndex : -1;
    };
}

/**
 * A single-class run (`[…]*`, `[…]+`, `\s*`): a code-unit loop over an EXACT 128-entry table; a
 * non-ASCII unit is decided by the class itself (one sticky single-unit test — exact, and rare).
 */
export function run(tbl: Uint8Array, cls: RegExp, min: 0 | 1, keep: boolean): K {
    const C = sticky(cls);
    const scan = (s: string, i: number): number => {
        const n = s.length;
        let j = i;
        while (j < n) {
            const k = s.charCodeAt(j);
            if (k < 128) { if (tbl[k] === 0) break; }
            else { C.lastIndex = j; if (!C.test(s)) break; }
            j++;
        }
        return j;
    };
    if (!keep) return (s, i) => {
        if (i >= s.length) return -1;
        const j = scan(s, i);
        return j - i < min ? -1 : j;
    };
    return (s, i) => {
        if (i >= s.length) return -1;
        const j = scan(s, i);
        if (j - i < min) return -1;
        V = j > i ? s.substring(i, j) : undefined;
        return j;
    };
}

/** A run of a class that admits EVERY code unit (`[\s\S]*`, `[^]+`): the rest of the input. */
export function runAll(min: 0 | 1, keep: boolean): K {
    return (s, i) => {
        const n = s.length;
        if (i >= n) return -1; // a regex leaf fails at end of input (parse-that 0.8.2)
        if (keep) V = s.substring(i, n);
        return n;
    };
}

/**
 * A one-slot memo (packrat where MEASURED useful): the last (source, offset) this rule was asked,
 * with its answer. Sound because a parse at (source, offset) is a pure function of both.
 */
export function memo1(p: K): K {
    let ls: string | undefined, li = -1, le = -1;
    let lv: unknown;
    return (s, i) => {
        if (i === li && s === ls) { if (le >= 0) V = lv; return le; }
        const e = p(s, i);
        ls = s; li = i; le = e; lv = e >= 0 ? V : undefined;
        return e;
    };
}

/** `ε`: always succeeds, consumes nothing, answers `undefined`. */
export const eps: K = (_s, i) => ((V = undefined), i);

// ── sequences ────────────────────────────────────────────────────────────────────────────────
export function seq(ps: K[]): K {
    const n = ps.length;
    if (n === 2) {
        const [a, b] = ps;
        return (s, i) => {
            let j = a(s, i); if (j < 0) return -1;
            const v1 = V;
            j = b(s, j); if (j < 0) return -1;
            const v2 = V;
            V = v1 !== undefined ? (v2 !== undefined ? [v1, v2] : [v1]) : v2 !== undefined ? [v2] : [];
            return j;
        };
    }
    if (n === 3) {
        const [a, b, c] = ps;
        return (s, i) => {
            let j = a(s, i); if (j < 0) return -1;
            const v1 = V;
            j = b(s, j); if (j < 0) return -1;
            const v2 = V;
            j = c(s, j); if (j < 0) return -1;
            const v3 = V;
            const out: unknown[] = [];
            if (v1 !== undefined) out.push(v1);
            if (v2 !== undefined) out.push(v2);
            if (v3 !== undefined) out.push(v3);
            V = out;
            return j;
        };
    }
    return (s, i) => {
        const out: unknown[] = [];
        let j = i;
        for (let k = 0; k < n; k++) {
            j = ps[k](s, j);
            if (j < 0) return -1;
            if (V !== undefined) out.push(V);
        }
        V = out;
        return j;
    };
}
/** A POSITIONAL sequence (parse-that 2.x `all()`): one slot per part, `undefined` kept. */
export function seqP(ps: K[]): K {
    const n = ps.length;
    if (n === 2) {
        const [a, b] = ps;
        return (s, i) => { let j = a(s, i); if (j < 0) return -1; const v1 = V; j = b(s, j); if (j < 0) return -1; V = [v1, V]; return j; };
    }
    if (n === 3) {
        const [a, b, c] = ps;
        return (s, i) => {
            let j = a(s, i); if (j < 0) return -1; const v1 = V;
            j = b(s, j); if (j < 0) return -1; const v2 = V;
            j = c(s, j); if (j < 0) return -1;
            V = [v1, v2, V];
            return j;
        };
    }
    return (s, i) => {
        const out: unknown[] = new Array(n);
        let j = i;
        for (let k = 0; k < n; k++) { j = ps[k](s, j); if (j < 0) return -1; out[k] = V; }
        V = out;
        return j;
    };
}
export function seqR(ps: K[]): K {
    const n = ps.length;
    if (n === 2) { const [a, b] = ps; return (s, i) => { const j = a(s, i); return j < 0 ? -1 : b(s, j); }; }
    if (n === 3) { const [a, b, c] = ps; return (s, i) => { let j = a(s, i); if (j < 0) return -1; j = b(s, j); return j < 0 ? -1 : c(s, j); }; }
    return (s, i) => { let j = i; for (let k = 0; k < n; k++) { j = ps[k](s, j); if (j < 0) return -1; } return j; };
}
/** `a >> b` (value mode): `a` is a recognizer, the value is `b`'s. Also `a >> b` in recognize mode. */
export const next = (a: K, b: K): K => (s, i) => { const j = a(s, i); return j < 0 ? -1 : b(s, j); };
/** `a << b` (value mode): `b` is a recognizer, the value is `a`'s. */
export const skip = (a: K, b: K): K => (s, i) => {
    let j = a(s, i); if (j < 0) return -1;
    const v = V;
    j = b(s, j); if (j < 0) return -1;
    V = v;
    return j;
};

// ── choice ───────────────────────────────────────────────────────────────────────────────────
/** Ordered choice (PEG `|`): the first alternative that succeeds. */
export function alt(ps: K[]): K {
    const n = ps.length;
    if (n === 1) return ps[0];
    if (n === 2) { const [a, b] = ps; return (s, i) => { const j = a(s, i); return j >= 0 ? j : b(s, i); }; }
    if (n === 3) { const [a, b, c] = ps; return (s, i) => { let j = a(s, i); if (j >= 0) return j; j = b(s, i); return j >= 0 ? j : c(s, i); }; }
    return (s, i) => { for (let k = 0; k < n; k++) { const j = ps[k](s, i); if (j >= 0) return j; } return -1; };
}
/**
 * Ordered choice routed by the first code unit: `groups[tbl[c]]` is the ordered sub-choice of the
 * alternatives that can start with `c` (or match empty) — the same answer as trying them all, by
 * the soundness of the FIRST analysis. `na` / `eof` are the non-ASCII and end-of-input groups.
 */
export function dispatch(tbl: Int16Array, groups: K[], na: K | null, eof: K | null): K {
    return (s, i) => {
        const k = s.charCodeAt(i);
        if (k < 128) { const g = tbl[k]; return g < 0 ? -1 : groups[g](s, i); }
        if (k === k) return na === null ? -1 : na(s, i);
        return eof === null ? -1 : eof(s, i);
    };
}

// ── repetition / option ─────────────────────────────────────────────────────────────────────
export const opt = (p: K): K => (s, i) => { const j = p(s, i); if (j < 0) { V = undefined; return i; } return j; };
export const optR = (p: K): K => (s, i) => { const j = p(s, i); return j < 0 ? i : j; };
/** `p?` whose `p` cannot match empty: a first-unit miss skips the call. */
export function optG(p: K, g: Guard): K {
    const { tbl, na } = g;
    return (s, i) => {
        const k = s.charCodeAt(i);
        if (k < 128 ? tbl[k] === 0 : !(na && k === k)) { V = undefined; return i; }
        const j = p(s, i); if (j < 0) { V = undefined; return i; } return j;
    };
}
export function many(p: K, min: number): K {
    return (s, i) => {
        const out: unknown[] = [];
        let j = i;
        for (;;) {
            const e = p(s, j);
            if (e < 0 || e === j) break;
            out.push(V);
            j = e;
        }
        if (out.length < min) return -1;
        V = out;
        return j;
    };
}
export function manyR(p: K, min: number): K {
    if (min === 0) return (s, i) => { let j = i; for (;;) { const e = p(s, j); if (e < 0 || e === j) return j; j = e; } };
    return (s, i) => { let j = i, n = 0; for (;;) { const e = p(s, j); if (e < 0 || e === j) return n < min ? -1 : j; j = e; n++; } };
}

// ── difference, actions, references ─────────────────────────────────────────────────────────
/** `a - b`: `a`, only where `b` does not match at the same offset. */
export const minus = (a: K, b: K): K => (s, i) => (b(s, i) >= 0 ? -1 : a(s, i));
/** A semantic action over the rule's value. */
export const act = (p: K, fn: (v: unknown) => unknown): K => (s, i) => { const j = p(s, i); if (j >= 0) V = fn(V); return j; };
/** A semantic action that also reads the offsets its rule matched between. */
export const actSpan = (p: K, fn: (v: unknown, start: number, end: number) => unknown): K =>
    (s, i) => { const j = p(s, i); if (j >= 0) V = fn(V, i, j); return j; };
/** A TEXT action: its rule ran as a recognizer; the action reads the text it matched. */
export const actText = (p: K, fn: (text: string) => unknown): K =>
    (s, i) => { const j = p(s, i); if (j >= 0) V = fn(s.substring(i, j)); return j; };
/** A back-edge of a recursive rule (bound once its rule is compiled). */
export type Cell = { f: K };
export const ref = (c: Cell): K => (s, i) => c.f(s, i);

// ── audit (evidence builds only): every routing/guard decision re-checked by the slow path ──────
/** Violations found by the audit builds: a routed choice or a guard whose answer differed. */
export const AUDIT = { checks: 0, violations: 0, samples: [] as string[] };
const violation = (what: string, s: string, i: number) => {
    AUDIT.violations++;
    if (AUDIT.samples.length < 10) AUDIT.samples.push(`${what} @${i} in ${JSON.stringify(s.slice(0, 80))}`);
};
/** The routed choice, re-run as the plain ordered choice: the two ends must agree. */
export function dispatchAudit(routed: K, full: K, label: string): K {
    return (s, i) => {
        const a = routed(s, i), v = V;
        const b = full(s, i);
        AUDIT.checks++;
        if (a !== b) violation(`dispatch ${label}: routed ${a} vs ordered ${b}`, s, i);
        V = v;
        return a;
    };
}
/** A guarded leaf / option, re-run unguarded whenever its guard said "cannot start here". */
export function guardAudit(guarded: K, unguarded: K, g: Guard, label: string): K {
    const { tbl, na } = g;
    return (s, i) => {
        const k = s.charCodeAt(i);
        const rejected = k < 128 ? tbl[k] === 0 : !(na && k === k);
        const a = guarded(s, i), v = V;
        if (rejected) {
            AUDIT.checks++;
            const b = unguarded(s, i);
            if (a !== b) violation(`guard ${label}: guarded ${a} vs unguarded ${b}`, s, i);
        }
        V = v;
        return a;
    };
}
