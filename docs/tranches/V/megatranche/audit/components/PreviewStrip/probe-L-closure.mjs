// CHALLENGE-L (PreviewStrip, pass 2) — independent import-closure walk.
// Relative specifiers only; halts at bare specifiers and records them.
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
const ROOT = "/Users/mkbabb/Programming/value.js";
const RE = /(?:from|import)\s*\(?\s*["']([^"']+)["']/g;
function resolve(spec, from) {
    const base = path.resolve(path.dirname(from), spec);
    for (const c of [base, base + ".ts", base + ".vue", base + "/index.ts"])
        if (existsSync(c) && statSync(c).isFile()) return c;
    return null;
}
function walk(entry) {
    const seen = new Set(), bare = new Map(), q = [entry];
    while (q.length) {
        const f = q.pop();
        if (seen.has(f)) continue;
        seen.add(f);
        const src = readFileSync(f, "utf8");
        for (const m of src.matchAll(RE)) {
            const s = m[1];
            if (s.startsWith(".")) { const r = resolve(s, f); if (r) q.push(r); }
            else if (!s.startsWith("/") && !s.endsWith(".css")) {
                if (!bare.has(s)) bare.set(s, new Set());
                bare.get(s).add(path.relative(ROOT, f));
            }
        }
    }
    return { seen, bare };
}
for (const e of process.argv.slice(2)) {
    const entry = path.resolve(ROOT, e);
    const { seen, bare } = walk(entry);
    let bytes = 0;
    console.log(`\n### ${e}`);
    console.log(`  relative modules in closure: ${seen.size}`);
    for (const f of [...seen].sort()) { const n = statSync(f).size; bytes += n; console.log(`    ${path.relative(ROOT, f).padEnd(52)} ${n}B`); }
    console.log(`  total ${bytes}B`);
    console.log(`  bare specifiers reached:`);
    for (const [s, who] of [...bare].sort()) console.log(`    ${s.padEnd(28)} <- ${[...who].join(", ")}`);
}
