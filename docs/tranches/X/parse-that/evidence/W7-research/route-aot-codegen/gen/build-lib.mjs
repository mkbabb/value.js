// esbuild helpers shared by the generator and the harness.
import { build } from "/Users/mkbabb/Programming/value.js/node_modules/esbuild/lib/main.js";
import { readFileSync } from "node:fs";
import path from "node:path";
export const here = path.resolve(import.meta.dirname, "..");
export const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: `export default ${JSON.stringify(readFileSync(a.path, "utf8"))};`, loader: "js" }));
}};
// Redirect src/css/bbnf's `./load` to the AOT adapter, and `aot-generated` to one generated module.
export const aotPlugin = (generated, textActions = false) => ({ name: "aot", setup(b) {
    b.onResolve({ filter: /^\.\/load$/ }, (a) => (a.resolveDir.endsWith(path.join("src", "css", "bbnf")) ? { path: path.join(here, "gen", "load-aot.ts") } : undefined));
    if (textActions) b.onResolve({ filter: /^\.\/stylesheet$/ }, (a) => (a.resolveDir.endsWith(path.join("src", "css", "bbnf")) ? { path: path.join(here, "gen", "stylesheet-actions.ts") } : undefined));
    b.onResolve({ filter: /^aot-generated$/ }, () => ({ path: generated }));
}});
export const common = { bundle: true, format: "esm", platform: "node", target: "node22", minify: false, sourcemap: false, logLevel: "warning", nodePaths: ["/Users/mkbabb/Programming/value.js/node_modules"] };
export { build };
