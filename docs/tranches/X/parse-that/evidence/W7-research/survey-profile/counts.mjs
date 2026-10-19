// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — the FAILURE PATH, counted (not timed): on the counting build
// (`variant-count`), every Parser in the compiled graph has its parse function wrapped with a tally
// of calls / failures / code units consumed, by combinator kind; parse-that's own mergeErrorState,
// reset and mapState are tallied by the build patch. Totals are per entry over the whole corpus.
//   node <dir>/counts.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
import { ENTRIES, INPUTS, arms, load } from "./common.mjs";

globalThis.__pt = { mes: 0, expectedAlloc: 0, expectedMerge: 0, protoViews: 0, resets: 0 };
const m = await load("variant-count");
const rules = m.bbnf.grammar();
const isParser = (p) => p && typeof p === "object" && typeof p.parser === "function" && p.context;
const isLazy = (p) => p.context.parser === undefined && p.context.args?.length === 1 && typeof p.context.args[0] === "function";
const LEAF = new Set(["regex", "regexSpan", "string", "stringSpan"]);
const C = {};
const seen = new Set();
const stack = Object.values(rules);
while (stack.length) {
    const p = stack.pop();
    if (!isParser(p) || seen.has(p)) continue;
    seen.add(p);
    const kind = isLazy(p) ? "nonterminal(lazy)" : p.context.name;
    const c = (C[kind] ??= { calls: 0, fails: 0, consumed: 0 });
    const orig = p.parser;
    p.parser = (state) => { const o = state.offset; c.calls++; const r = orig(state); if (state.isError) c.fails++; else c.consumed += state.offset - o; return r; };
    if (isLazy(p)) stack.push(p.context.args[0]());
    if (isParser(p.context.parser)) stack.push(p.context.parser);
    for (const a of p.context.args ?? []) if (isParser(a)) stack.push(a);
}
const A = arms({ cand: m }).bbnf;
const inputChars = INPUTS.reduce((n, s) => n + s.length, 0);
const rep = { script: "counts.mjs", corpus: INPUTS.length, inputChars, graphParsers: seen.size, entries: {} };
const snap = () => ({ C: JSON.parse(JSON.stringify(C)), pt: { ...globalThis.__pt } });
const diff = (a, b) => {
    const kinds = {};
    for (const k of Object.keys(b.C)) {
        const x = b.C[k], y = a.C[k] ?? { calls: 0, fails: 0, consumed: 0 };
        const d = { calls: x.calls - y.calls, fails: x.fails - y.fails, consumed: x.consumed - y.consumed };
        if (d.calls) kinds[k] = d;
    }
    return { kinds, pt: Object.fromEntries(Object.keys(b.pt).map((k) => [k, b.pt[k] - a.pt[k]])) };
};
A.parseCssColor("red");
for (const entry of [...ENTRIES, "parseStylesheet"]) {
    const a = snap();
    let ok = 0;
    for (const s of INPUTS) if (A[entry](s).ok) ok++;
    const d = diff(a, snap());
    let leafCalls = 0, leafFails = 0, leafConsumed = 0, calls = 0, fails = 0;
    for (const [k, v] of Object.entries(d.kinds)) { calls += v.calls; fails += v.fails; if (LEAF.has(k)) { leafCalls += v.calls; leafFails += v.fails; leafConsumed += v.consumed; } }
    const perSource = (x) => +(x / INPUTS.length).toFixed(1);
    rep.entries[entry] = {
        ok, parserCalls: calls, parserFails: fails, failPct: +((100 * fails) / calls).toFixed(1),
        leafCalls, leafFails, leafFailPct: +((100 * leafFails) / leafCalls).toFixed(1),
        leafCallsPerSource: perSource(leafCalls), parserCallsPerSource: perSource(calls),
        leafCharsConsumedOverInputChars: +(leafConsumed / inputChars).toFixed(2),
        mergeErrorState: d.pt.mes, mergeErrorStatePerSource: perSource(d.pt.mes), expectedArrayAllocs: d.pt.expectedAlloc, expectedMerges: d.pt.expectedMerge,
        mapStateProtoViews: d.pt.protoViews, resets: d.pt.resets, byKind: d.kinds,
    };
    const e = rep.entries[entry];
    console.log(entry.padEnd(22), `calls/src ${e.parserCallsPerSource} fail% ${e.failPct} | leaf/src ${e.leafCallsPerSource} leafFail% ${e.leafFailPct} leafChars/inputChars ${e.leafCharsConsumedOverInputChars} | mergeErrorState/src ${e.mergeErrorStatePerSource} expectedAllocs ${e.expectedArrayAllocs} merges ${e.expectedMerges} | protoViews ${e.mapStateProtoViews} resets ${e.resets}`);
}
writeFileSync(path.join(import.meta.dirname, "counts-result.json"), JSON.stringify(rep, null, 1));
