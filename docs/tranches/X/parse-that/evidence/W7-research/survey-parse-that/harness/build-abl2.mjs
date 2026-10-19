import { build } from "/Users/mkbabb/Programming/value.js/node_modules/esbuild/lib/main.js";
import { readFileSync } from "node:fs";
import path from "node:path";
const here = import.meta.dirname;
const rawPlugin = { name: "raw", setup(b) {
  b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
  b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: `export default ${JSON.stringify(readFileSync(a.path, "utf8"))};`, loader: "js" }));
}};
const common = { bundle: true, format: "esm", platform: "node", target: "node22", logLevel: "warning", nodePaths: ["/Users/mkbabb/Programming/value.js/node_modules"] };
for (const v of ["headms"]) {
  const alias = { name: "a", setup(b) { b.onResolve({ filter: /^@mkbabb\/parse-that$/ }, () => ({ path: path.join(here, `shim-abl-${v}.ts`) })); } };
  await build({ ...common, entryPoints: [path.join(here, "entry-bbnf.ts")], outfile: path.join(here, `out/bbnf-abl-${v}.mjs`), plugins: [rawPlugin, alias] });
}
console.log("built");
