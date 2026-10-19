// Bundles three builds of the six /css parse entries into ./out (evidence-only):
//   bbnf-082.mjs  — value.js src/css/bbnf over @mkbabb/bbnf-lang 0.1.4 + @mkbabb/parse-that 0.8.2 (installed; the product)
//   bbnf-head.mjs — the same, with @mkbabb/parse-that aliased to parse-that HEAD 92d8ea7 source + pt-head-shim.ts
//   base.mjs      — the retired hand parser (value.js 2155142b src/css/grammar.ts, materialized by bench/retired.ts)
import { build } from "/Users/mkbabb/Programming/value.js/node_modules/esbuild/lib/main.js";
import { readFileSync } from "node:fs";
import path from "node:path";
const here = import.meta.dirname;
const rawPlugin = { name: "raw", setup(b) {
  b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
  b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: `export default ${JSON.stringify(readFileSync(a.path, "utf8"))};`, loader: "js" }));
}};
const headAlias = { name: "pt-head", setup(b) {
  b.onResolve({ filter: /^@mkbabb\/parse-that$/ }, () => ({ path: path.join(here, "pt-head-shim.ts") }));
}};
const common = { bundle: true, format: "esm", platform: "node", target: "node22", minify: false, sourcemap: false, logLevel: "warning", nodePaths: ["/Users/mkbabb/Programming/value.js/node_modules"] };
await build({ ...common, entryPoints: [path.join(here, "entry-bbnf.ts")], outfile: path.join(here, "out/bbnf-082.mjs"), plugins: [rawPlugin] });
await build({ ...common, entryPoints: [path.join(here, "entry-bbnf.ts")], outfile: path.join(here, "out/bbnf-head.mjs"), plugins: [rawPlugin, headAlias] });
await build({ ...common, entryPoints: [path.join(here, "entry-base.ts")], outfile: path.join(here, "out/base.mjs"), plugins: [rawPlugin] });
console.log("built");
