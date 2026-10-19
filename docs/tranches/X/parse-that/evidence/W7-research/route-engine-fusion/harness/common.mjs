// SERVED MODEL: claude-opus-5-5
// route engine-fusion — shared loaders: the corpus of record, the bundles, uptime, the arms.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

export const REPO = "/Users/mkbabb/Programming/value.js";
export const OUT = path.join(tmpdir(), "value-js-w7-route-engine-fusion");
export const ENTRIES = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction", "parseStylesheet"];
const corpus = (file) => JSON.parse(readFileSync(path.join(REPO, "bench/css-equivalence", file), "utf8")).rows
    .map((r) => (typeof r.s === "string" ? r.s : r.s.src));
/** The bench of record's population: the distinct sources of assay ∪ real (29,944). */
export const INPUTS = [...new Set([...corpus("assay-corpus.json"), ...corpus("real-corpus.json")])];
export const uptime = () => execSync("uptime", { encoding: "utf8" }).trim();
export const load1 = (s) => s.split("averages:")[1].trim();
export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/** The survey:profile rebinding (copied): every lazy nonterminal → its target's parse function. */
export function bindDirect(rules) {
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

/** arm name → { entry → fn(source) }. */
export async function armFns(arm) {
    const mod = await import(path.join(OUT, `${arm}.mjs`));
    if (arm === "retired") return Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? mod.parseStylesheet : mod.hand[e]]));
    mod.bbnf.parseCssColor("red"); // compile once (+ seal), outside timing
    if (arm === "np-direct") bindDirect(mod.bbnf.grammar());
    return Object.fromEntries(ENTRIES.map((e) => [e, e === "parseStylesheet" ? mod.parseStylesheet : mod.bbnf[e]]));
}
