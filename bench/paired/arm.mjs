// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l3 — a BISECTION ARM from an emitted-module variant (W7.md ADDENDUM (e) 1: "bisect with arms under
// `_build/`"). Bundles HEAD's `/css` surface exactly as `build.mjs`'s `product`, with `./generated/grammar` resolved
// to the given module (a `bbnf gen` output of an emitter variant, or a hand-cut probe of one operation), into
// `_build/<name>.mjs`; `browser.mjs` / `isolated.mjs` then time it paired with the retired parser like any arm.
// The shipped `src/css/bbnf/generated/` is never written here.
//   node bench/paired/arm.mjs <name> <path/to/grammar.js>
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import path from "node:path";
import { BUILD, REPO } from "./common.mjs";

const [NAME, GRAMMAR] = process.argv.slice(2);
if (!NAME || !GRAMMAR) throw new Error("usage: arm.mjs <name> <grammar.js>");
const LOAD = path.join(REPO, "src/css/bbnf/load.ts");
const redirect = { name: "variant-grammar", setup(b) {
    b.onResolve({ filter: /^\.\/generated\/grammar$/ }, (a) => (a.importer === LOAD ? { path: path.resolve(GRAMMAR) } : undefined));
} };
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
await build({ entryPoints: [path.join(BUILD, "product-entry.ts")], outfile: path.join(BUILD, `${NAME}.mjs`), bundle: true, platform: "node",
    format: "esm", target: "node22", logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")],
    plugins: [redirect, rawPlugin] });
console.log(`wrote ${path.relative(REPO, path.join(BUILD, `${NAME}.mjs`))} (grammar ${path.relative(REPO, path.resolve(GRAMMAR))})`);
