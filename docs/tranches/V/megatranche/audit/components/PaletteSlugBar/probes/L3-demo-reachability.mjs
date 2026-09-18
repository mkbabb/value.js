// Read-only import-graph + cycle detector over demo/.
// Value edges only (`import type …` dropped) so a reported cycle is a RUNTIME cycle.
import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/mkbabb/Programming/value.js";
const DEMO = path.join(ROOT, "demo");

function walk(dir, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            if (e.name === "node_modules" || e.name === "public") continue;
            walk(p, out);
        } else if (/\.(ts|vue)$/.test(e.name)) out.push(p);
    }
    return out;
}

const files = walk(DEMO);

function scriptOf(src, file) {
    if (!file.endsWith(".vue")) return src;
    const m = src.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
    return m.join("\n");
}

function resolve(fromFile, spec) {
    if (!spec.startsWith(".")) return null;
    const base = path.resolve(path.dirname(fromFile), spec);
    const cands = [base, base + ".ts", base + ".vue", path.join(base, "index.ts")];
    for (const c of cands) {
        try { if (fs.statSync(c).isFile()) return c; } catch {}
    }
    return null;
}

const edges = new Map();
const importRe = /(?:import|export)\s+([\s\S]*?)\s*from\s*["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']|import\s*["']([^"']+)["']/g;

for (const f of files) {
    const src = scriptOf(fs.readFileSync(f, "utf8"), f);
    const set = new Set();
    let m;
    while ((m = importRe.exec(src))) {
        const clause = m[1] ?? "";
        const spec = m[2] ?? m[3] ?? m[4];
        if (!spec) continue;
        if (/^\s*type\b/.test(clause)) continue; // `import type X from`
        // strip `type X` members; if nothing else remains and no default/ns binding, it is type-only
        const braced = clause.match(/\{([\s\S]*)\}/);
        if (braced) {
            const beforeBrace = clause.slice(0, clause.indexOf("{")).replace(/[,\s]/g, "");
            const rest = braced[1].replace(/type\s+[A-Za-z_$][\w$]*(\s+as\s+[A-Za-z_$][\w$]*)?/g, "").replace(/[,\s]/g, "");
            if (!rest && !beforeBrace) continue;
        }
        const r = resolve(f, spec);
        if (r) set.add(r);
    }
    edges.set(f, set);
}

let idx = 0;
const index = new Map(), low = new Map(), onstack = new Set(), stack = [];
const sccs = [];
function strong(v) {
    index.set(v, idx); low.set(v, idx); idx++;
    stack.push(v); onstack.add(v);
    for (const w of edges.get(v) ?? []) {
        if (!index.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
        else if (onstack.has(w)) low.set(v, Math.min(low.get(v), index.get(w)));
    }
    if (low.get(v) === index.get(v)) {
        const comp = []; let w;
        do { w = stack.pop(); onstack.delete(w); comp.push(w); } while (w !== v);
        if (comp.length > 1) sccs.push(comp);
    }
}
for (const f of files) if (!index.has(f)) strong(f);

const rel = (p) => path.relative(ROOT, p);
console.log("files scanned:", files.length);
console.log("runtime SCCs (size>1):", sccs.length);
for (const c of sccs) {
    console.log("--- SCC size " + c.length);
    for (const f of c) console.log("   " + rel(f));
}

const entryHtml = fs.readFileSync(path.join(DEMO, "color-picker/index.html"), "utf8");
const roots = [];
for (const m of entryHtml.matchAll(/from\s*["'](\.[^"']+)["']/g)) {
    const r = resolve(path.join(DEMO, "color-picker/index.html"), m[1]);
    if (r) roots.push(r);
}
const seen = new Set();
const q = [...roots];
while (q.length) {
    const f = q.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    for (const w of edges.get(f) ?? []) q.push(w);
}
const deadVue = files.filter((f) => f.endsWith(".vue") && !seen.has(f));
console.log("\nentry roots:", roots.map(rel));
console.log("reachable modules:", seen.size, "/", files.length);
console.log("UNREACHABLE .vue (" + deadVue.length + "):");
for (const f of deadVue) console.log("   " + rel(f));

// shell <-> palettes edge census
const cross = [];
for (const [f, set] of edges) {
    const a = rel(f);
    for (const w of set) {
        const b = rel(w);
        if (a.startsWith("demo/shell/") && b.startsWith("demo/palettes/")) cross.push(["shell→palettes", a, b]);
        if (a.startsWith("demo/palettes/") && b.startsWith("demo/shell/")) cross.push(["palettes→shell", a, b]);
    }
}
console.log("\nshell↔palettes runtime edges:", cross.length);
for (const c of cross) console.log("   " + c[0] + "  " + c[1] + "  ->  " + c[2]);

const deadTs = files.filter((f) => f.endsWith(".ts") && !seen.has(f));
console.log("\nUNREACHABLE .ts (" + deadTs.length + "):");
for (const f of deadTs) console.log("   " + rel(f));

// who imports each barrel under demo/palettes/browser
const importersOf = (target) => {
    const t = path.join(ROOT, target);
    const out = [];
    for (const [f, set] of edges) if (set.has(t)) out.push(rel(f));
    return out;
};
for (const b of ["demo/palettes/browser/index.ts", "demo/palettes/browser/slug/index.ts", "demo/palettes/browser/status/index.ts"]) {
    console.log("\nvalue-importers of " + b + ": " + JSON.stringify(importersOf(b)));
}
