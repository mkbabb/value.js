// SERVED MODEL: claude-opus-5-5
// judge — ONE diagnostic variant arm, built beside build.mjs's arms:
//   aot-text-slot  aot-text with the prototype adapter's per-parse WeakMap runner lookup replaced by a
//                  property on the slot (judge/harness/aot-load-slotcache.ts) — separates the ADAPTER's
//                  per-call cost from the GENERATED parser's on the small entries.
import { build } from "esbuild";
import path from "node:path";
import { OUT, REPO } from "./common.mjs";
const AOT = path.join(REPO, "docs/tranches/X/parse-that/evidence/W7-research/route-aot-codegen");
const MINE = path.join(import.meta.dirname, "aot-load-slotcache.ts");
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, async (a) => ({ contents: (await import("node:fs")).readFileSync(a.path, "utf8"), loader: "text" }));
} };
const plugin = { name: "aot-slot", setup(b) {
    const inBbnf = (a) => a.resolveDir === path.join(REPO, "src/css/bbnf");
    b.onResolve({ filter: /^\.\/load$/ }, (a) => (inBbnf(a) ? { path: MINE } : undefined));
    b.onResolve({ filter: /^\.\/stylesheet$/ }, (a) => (inBbnf(a) ? { path: path.join(AOT, "gen/stylesheet-actions.ts") } : undefined));
    b.onResolve({ filter: /^\.\/load-aot$/ }, (a) => (a.resolveDir === path.join(AOT, "gen") ? { path: MINE } : undefined));
    b.onResolve({ filter: /^aot-generated$/ }, () => ({ path: path.join(OUT, "css-grammar.text.generated.js") }));
} };
await build({ bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: "external", minify: false, logLevel: "warning",
    absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], entryPoints: [path.join(OUT, "entry.ts")],
    outfile: path.join(OUT, "aot-text-slot.mjs"), plugins: [rawPlugin, plugin] });
console.log("built aot-text-slot");
