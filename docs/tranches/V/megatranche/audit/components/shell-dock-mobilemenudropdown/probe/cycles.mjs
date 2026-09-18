// Runtime-import graph over demo/ (relative specifiers only, `import type` excluded).
import fs from "fs";
import path from "path";

const ROOT = "/Users/mkbabb/Programming/value.js/demo";
const files = [];
(function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) { if (e.name !== "node_modules" && e.name !== "dist") walk(p); }
        else if (/\.(ts|vue)$/.test(e.name)) files.push(p);
    }
})(ROOT);

function resolve(from, spec) {
    if (!spec.startsWith(".")) return null;
    const base = path.resolve(path.dirname(from), spec);
    for (const c of [base, base + ".ts", base + ".vue", path.join(base, "index.ts"), path.join(base, "index.vue")]) {
        if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    }
    return null;
}

const graph = new Map();
for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    const deps = new Set();
    const re = /(?:^|\n)\s*(?:import|export)\s+(type\s+)?([\s\S]*?)from\s+"([^"]+)"/g;
    let m;
    while ((m = re.exec(src))) {
        if (m[1]) continue;
        const clause = m[2];
        const spec = m[3];
        const named = clause.match(/\{([\s\S]*)\}/);
        if (named && named[1].trim() && named[1].split(",").every((s) => /^\s*type\s/.test(s) || !s.trim())) continue;
        const r = resolve(f, spec);
        if (r) deps.add(r);
    }
    graph.set(f, [...deps]);
}

let idx = 0; const stack = []; const on = new Set(); const index = new Map(); const low = new Map(); const sccs = [];
function strong(v) {
    index.set(v, idx); low.set(v, idx); idx++; stack.push(v); on.add(v);
    for (const w of graph.get(v) || []) {
        if (!index.has(w)) { strong(w); low.set(v, Math.min(low.get(v), low.get(w))); }
        else if (on.has(w)) low.set(v, Math.min(low.get(v), index.get(w)));
    }
    if (low.get(v) === index.get(v)) {
        const comp = []; let w;
        do { w = stack.pop(); on.delete(w); comp.push(w); } while (w !== v);
        if (comp.length > 1) sccs.push(comp);
    }
}
for (const f of files) if (!index.has(f)) strong(f);

const rel = (p) => path.relative("/Users/mkbabb/Programming/value.js", p);
console.log("files scanned:", files.length);
console.log("runtime cycles (SCC size > 1):", sccs.length);
for (const c of sccs) { console.log("  --- cycle, " + c.length + " members ---"); c.forEach((f) => console.log("    " + rel(f))); }

const area = (p) => path.relative(ROOT, p).split(path.sep)[0];
const cross = {};
for (const [f, ds] of graph) {
    const a = area(f);
    for (const d of ds) { const b = area(d); if (a !== b) { const k = a + " -> " + b; cross[k] = (cross[k] || 0) + 1; } }
}
console.log("\ncross-area runtime edges:");
Object.entries(cross).sort((x, y) => y[1] - x[1]).forEach(([k, v]) => console.log("  " + String(v).padStart(3) + "  " + k));
