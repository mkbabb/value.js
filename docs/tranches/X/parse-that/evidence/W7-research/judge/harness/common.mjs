// SERVED MODEL: claude-opus-5-5
// X.P.W7 research · judge — shared loaders: the corpus of record, the arms judge/harness/build.mjs wrote.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

export const REPO = "/Users/mkbabb/Programming/value.js";
export const OUT = path.join(tmpdir(), "value-js-w7-judge");
export const RESULTS = path.resolve(import.meta.dirname, "..", "results");
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
const corpus = (file) => JSON.parse(readFileSync(path.join(REPO, "bench/css-equivalence", file), "utf8")).rows
    .map((r) => (typeof r.s === "string" ? r.s : r.s.src));
/** The bench of record's population: the distinct sources of assay ∪ real. */
export const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];
export const uptime = () => execSync("uptime", { encoding: "utf8" }).trim();
export const load = (u) => u.split("averages:")[1]?.trim();
export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** survey:profile's lazy rebinding (as route-engine-fusion/harness/common.mjs copies it) — np-direct only. */
function bindDirect(rules) {
    const isParser = (p) => p && typeof p === "object" && typeof p.parser === "function" && p.context;
    const isLazy = (p) => p.context.parser === undefined && p.context.args?.length === 1 && typeof p.context.args[0] === "function";
    const seen = new Set(), lazies = [];
    const stack = Object.values(rules);
    while (stack.length) {
        const p = stack.pop();
        if (!isParser(p) || seen.has(p)) continue;
        seen.add(p);
        if (isLazy(p)) { lazies.push(p); stack.push(p.context.args[0]()); continue; }
        if (isParser(p.context.parser)) stack.push(p.context.parser);
        for (const a of p.context.args ?? []) if (isParser(a)) stack.push(a);
    }
    const target = (p) => { let t = p; for (let i = 0; i < 64 && isLazy(t); i++) t = t.context.args[0](); return t; };
    for (const l of lazies) l.parser = target(l).parser;
    return lazies.length;
}

/** arm name → { module, fns: { entry → fn(source) } }; the grammar is compiled (and sealed) outside any timing. */
export async function arm(name) {
    const m = await import(path.join(OUT, `${name}.mjs`));
    if (name === "retired") return { m, fns: Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.hand[e]])) };
    m.bbnf.parseCssColor("red");
    if (name === "np-direct") bindDirect(m.bbnf.grammar());
    return { m, fns: Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? m.parseStylesheet : m.bbnf[e]])) };
}
