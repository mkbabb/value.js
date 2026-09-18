// Aggregate a V8 .cpuprofile: top self-time frames, per-file rollup, GC/engine share.
// Usage: node analyze.mjs <file.cpuprofile> [topN]
import { readFileSync } from "node:fs";

const [file, topNRaw] = process.argv.slice(2);
const topN = Number(topNRaw ?? 30);
const p = JSON.parse(readFileSync(file, "utf8"));

const totalSamples = p.samples.length;
const totalMicros = p.endTime - p.startTime;
const microsPerSample = totalMicros / totalSamples;

// self hits
const hits = new Map(); // nodeId -> hitCount
for (const n of p.nodes) hits.set(n.id, n.hitCount ?? 0);

// frame key -> {self, url}
const frames = new Map();
const nodeById = new Map(p.nodes.map((n) => [n.id, n]));
for (const n of p.nodes) {
    const cf = n.callFrame;
    const name = cf.functionName || "(anonymous)";
    const url = (cf.url || "").replace(/^file:\/\/.*parser-proof\//, "");
    const key = `${name} @ ${url}:${cf.lineNumber + 1}`;
    const f = frames.get(key) ?? { self: 0, url, name };
    f.self += n.hitCount ?? 0;
    frames.set(key, f);
}

// inclusive time per frame-name (sum of subtree hits for every node bearing the name, dedup by dominator)
const children = new Map();
for (const n of p.nodes) if (n.children) for (const c of n.children) children.set(c, n.id);
// subtree hits via post-order accumulation
const subtree = new Map();
const order = [...p.nodes].sort((a, b) => b.id - a.id); // ids are topological-ish; safe: iterate until fixpoint instead
// robust: compute via recursion from roots
const childList = new Map();
for (const n of p.nodes) childList.set(n.id, n.children ?? []);
const calcSub = (id) => {
    if (subtree.has(id)) return subtree.get(id);
    let s = hits.get(id) ?? 0;
    for (const c of childList.get(id) ?? []) s += calcSub(c);
    subtree.set(id, s);
    return s;
};
const roots = p.nodes.filter((n) => !children.has(n.id));
for (const r of roots) calcSub(r.id);

// inclusive by name: for each name take max subtree at any node with that name (upper bound; avoids double count within same stack line)
const inclusive = new Map();
for (const n of p.nodes) {
    const name = n.callFrame.functionName || "(anonymous)";
    const cur = inclusive.get(name) ?? 0;
    inclusive.set(name, Math.max(cur, subtree.get(n.id) ?? 0));
}

const pct = (h) => ((h / totalSamples) * 100).toFixed(1).padStart(5);
const ms = (h) => ((h * microsPerSample) / 1000).toFixed(0).padStart(6);

console.log(`\n== ${file.split("/").pop()} — ${totalSamples} samples, ${(totalMicros / 1000).toFixed(0)}ms, ${microsPerSample.toFixed(0)}µs/sample ==`);

// engine-level buckets
let gc = 0, prog = 0, idle = 0, other = 0;
for (const [key, f] of frames) {
    if (f.name === "(garbage collector)") gc += f.self;
    else if (f.name === "(program)") prog += f.self;
    else if (f.name === "(idle)") idle += f.self;
}
console.log(`  buckets: GC ${pct(gc)}%  (program) ${pct(prog)}%  (idle) ${pct(idle)}%`);

console.log(`\n  top ${topN} self-time frames:`);
const sorted = [...frames.entries()].sort((a, b) => b[1].self - a[1].self).slice(0, topN);
for (const [key, f] of sorted) {
    if (!f.self) continue;
    console.log(`  ${pct(f.self)}% ${ms(f.self)}ms  ${key}`);
}

// per-file rollup
const byUrl = new Map();
for (const [, f] of frames) {
    const u = f.url || "(engine)";
    byUrl.set(u, (byUrl.get(u) ?? 0) + f.self);
}
console.log(`\n  per-file self-time rollup:`);
for (const [u, s] of [...byUrl.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    if (!s) continue;
    console.log(`  ${pct(s)}%  ${u}`);
}

// inclusive for interesting names
const interesting = [...inclusive.entries()]
    .filter(([n]) => !n.startsWith("(") && n)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
console.log(`\n  top inclusive (max-subtree by function name):`);
for (const [n, s] of interesting) console.log(`  ${pct(s)}%  ${n}`);
