// SERVED MODEL: claude-opus-5-5
//
// X.P.W8.lg1c — per-entry emitted-bytes diff for the L-G1 entries (COHESION §0fc.2 L-G1 clause).
// For each commit, `git archive <commit> src` is extracted to a scratch dir and each L-G1 entry is bundled
// alone (esbuild, minified ESM, tree-shaken from its own export) — the bytes the entry ships. The sha256 of
// each bundle is compared between BASE (.semi/.lg1r's product 2f590daa8) and CUST (.cust's commit).
//   node bench/records/W8lg1c/entry-diff.mjs <scratch-dir> [base] [cust]
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const [scratch, BASE = "2f590daa8", CUST = "fc39e096e"] = process.argv.slice(2);
if (!scratch) throw new Error("usage: entry-diff.mjs <scratch-dir> [base] [cust]");
const ENTRIES = [
    ["parseCssColor", "src/css/bbnf/index.ts"], ["parseCssScalar", "src/css/bbnf/index.ts"],
    ["parseCssValue", "src/css/bbnf/index.ts"], ["parseCssValues", "src/css/bbnf/index.ts"],
    ["parseKeyframeSelector", "src/css/bbnf/index.ts"], ["parseTimingFunction", "src/css/bbnf/index.ts"],
    ["parseStylesheet", "src/css/stylesheet.ts"],
];
const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8" }).trim();
const sha = (s) => createHash("sha256").update(s).digest("hex");
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
async function bundle(root, name, file) {
    const r = await build({ stdin: { contents: `export { ${name} } from ${JSON.stringify(path.join(root, file))};`, resolveDir: root, loader: "ts" },
        bundle: true, minify: true, format: "esm", write: false, logLevel: "silent", plugins: [rawPlugin],
        nodePaths: [path.join(REPO, "node_modules")], external: [] });
    return r.outputFiles[0].contents;
}
const out = {};
for (const c of [BASE, CUST]) {
    const full = git("rev-parse", c), dir = path.join(scratch, full.slice(0, 12));
    rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${full} src | tar -x -C "${dir}"`]);
    out[c] = { commit: full, srcTree: git("rev-parse", `${full}:src`), grammarBlob: git("rev-parse", `${full}:src/css/bbnf/generated/grammar.js`), entries: {} };
    for (const [n, f] of ENTRIES) { const b = await bundle(dir, n, f); out[c].entries[n] = { bytes: b.length, sha256: sha(b) }; }
    rmSync(dir, { recursive: true, force: true });
}
console.log(`BASE ${out[BASE].commit} src ${out[BASE].srcTree} grammar.js ${out[BASE].grammarBlob}`);
console.log(`CUST ${out[CUST].commit} src ${out[CUST].srcTree} grammar.js ${out[CUST].grammarBlob}`);
let changed = 0;
for (const [n] of ENTRIES) {
    const a = out[BASE].entries[n], b = out[CUST].entries[n], same = a.sha256 === b.sha256 && a.bytes === b.bytes;
    if (!same) changed++;
    console.log(`${n.padEnd(22)} ${String(a.bytes).padStart(7)} ${a.sha256.slice(0, 16)}  ${String(b.bytes).padStart(7)} ${b.sha256.slice(0, 16)}  ${same ? "UNCHANGED" : "CHANGED"}`);
}
console.log(`ENTRIES CHANGED ${changed} of ${ENTRIES.length}`);
