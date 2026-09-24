// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — reads a .cpuprofile: self time per function (bundle frames mapped
// back to their TypeScript source through esbuild's source map), then per LAYER:
//   parse-that 0.8.2 core (node_modules/@mkbabb/parse-that/dist) · bbnf-lang compile output
//   (closures ASTToParser generates, node_modules/@mkbabb/bbnf-lang/dist) · value.js actions
//   (src/css/bbnf/*) · value.js stylesheet layer (src/css/*.ts) · value.js colour/value model
//   (src/color, src/value, …) · GC · V8 builtins/regex/runtime ((program) and native frames).
//   node <dir>/analyze-profile.mjs <file.cpuprofile> [top=30]
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { OUT, REPO } from "./common.mjs";
const require = createRequire(path.join(REPO, "package.json"));
const { SourceMapConsumer } = require("source-map-js");

const [file, topN = "30"] = process.argv.slice(2);
const prof = JSON.parse(readFileSync(file, "utf8"));
const consumers = {};
const mapFor = (url) => {
    const f = url.replace("file://", "");
    if (!(f in consumers)) { try { consumers[f] = new SourceMapConsumer(JSON.parse(readFileSync(f + ".map", "utf8"))); } catch { consumers[f] = null; } }
    return consumers[f];
};
function where(cf) {
    const url = cf.url || "";
    if (/@mkbabb\/parse-that\/dist/.test(url)) return { layer: "parse-that core", src: "parse-that/dist/parse.js:" + (cf.lineNumber + 1) };
    if (/@mkbabb\/bbnf-lang\/dist/.test(url)) return { layer: "bbnf-lang output", src: "bbnf-lang/dist/bbnf.js:" + (cf.lineNumber + 1) };
    if (url.includes(OUT)) {
        const c = mapFor(url);
        const p = c?.originalPositionFor({ line: cf.lineNumber + 1, column: cf.columnNumber });
        const raw = p?.source ?? "?";
        // A variant bundle carries parse-that / bbnf-lang inline; their sources map back to them.
        if (/parse-that/.test(raw)) return { layer: "parse-that core", src: "parse-that/" + raw.replace(/^.*parse-that\//, "") + ":" + p.line };
        if (/bbnf-lang/.test(raw)) return { layer: "bbnf-lang output", src: "bbnf-lang/" + raw.replace(/^.*bbnf-lang\//, "") + ":" + p.line };
        const s = raw.replace(/^.*?(src\/)/, "$1");
        const layer = /src\/css\/bbnf\//.test(s) ? "value.js actions (src/css/bbnf)"
            : /src\/css\//.test(s) ? "value.js stylesheet/css layer" : /src\//.test(s) ? "value.js colour/value model" : "bundle other";
        return { layer, src: `${s}:${p?.line ?? "?"}` };
    }
    if (cf.functionName.startsWith("RegExp:")) return { layer: "regex engine (irregexp code)", src: "" };
    if (cf.functionName === "(garbage collector)") return { layer: "GC", src: "" };
    if (cf.functionName === "(idle)") return { layer: "idle", src: "" };
    if (cf.functionName === "(program)") return { layer: "V8 (program: runtime/regex/IC)", src: "" };
    if (!url) return { layer: "V8 native/builtin", src: "" };
    return { layer: "other JS (" + path.basename(url) + ")", src: url };
}
// self time per node from samples × timeDeltas
const selfUs = new Map();
const dt = prof.timeDeltas;
for (let i = 0; i < prof.samples.length; i++) selfUs.set(prof.samples[i], (selfUs.get(prof.samples[i]) ?? 0) + (dt[i + 1] ?? 0));
const byFn = new Map(), byLayer = new Map();
let total = 0;
for (const n of prof.nodes) {
    const us = selfUs.get(n.id) ?? 0;
    if (!us) continue;
    const w = where(n.callFrame);
    if (w.layer === "idle") continue;
    total += us;
    const key = `${n.callFrame.functionName || "(anon)"} · ${w.src}`;
    const cur = byFn.get(key) ?? { us: 0, layer: w.layer };
    cur.us += us; byFn.set(key, cur);
    byLayer.set(w.layer, (byLayer.get(w.layer) ?? 0) + us);
}
const pct = (us) => ((100 * us) / total).toFixed(1).padStart(5) + "%";
console.log(`# ${path.basename(file)} — ${(total / 1000).toFixed(0)} ms sampled (idle excluded)`);
console.log("## by layer");
let otherUs = 0;
for (const [l, us] of [...byLayer].sort((a, b) => b[1] - a[1])) { if (l.startsWith("other JS")) otherUs += us; else console.log(pct(us), l); }
console.log(pct(otherUs), "node/harness JS (loader, script)");
console.log(`## top ${topN} self`);
for (const [k, v] of [...byFn].sort((a, b) => b[1].us - a[1].us).slice(0, Number(topN))) console.log(pct(v.us), k, "  [" + v.layer + "]");
