// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — F-b-1 root-cure witness. (1) The module loader builds for platform=BROWSER with
// no node builtin reachable (esbuild fails the build if one is). (2) value.js's five modules, each
// given the `@import` header its references need (in memory here — the header value.js would add),
// load from a files map through `@import`, and the merged rule table equals the concatenation's.
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
const SEAT = path.resolve(import.meta.dirname, "..");
const REPO = "/Users/mkbabb/Programming/value.js";
const OUT = path.join(tmpdir(), "value-js-w7-route-ts-compiler");
const out = path.join(OUT, "modules-browser.mjs");
await build({
    stdin: { contents: `export { grammarFromModules } from "${SEAT}/src/modules/index.ts";\nexport { BBNFToASTWithImports } from "${SEAT}/vendor/bbnf-0.1.4/parse.ts";`, resolveDir: SEAT, loader: "ts" },
    bundle: true, platform: "browser", format: "esm", outfile: out, logLevel: "error",
    alias: { "@mkbabb/parse-that": `${SEAT}/vendor/parse-that-head/index.ts` },
});
console.log("platform=browser build: OK (no node builtin reachable)");
const m = await import(out);
const text = (n) => readFileSync(`${REPO}/src/css/grammar/${n}.bbnf`, "utf8");
const HEADERS = {
    tokens: "",
    math: `@import "tokens.bbnf" ;\n`,
    color: `@import "tokens.bbnf" ;\n@import "math.bbnf" ;\n`,
    value: `@import "tokens.bbnf" ;\n@import "math.bbnf" ;\n@import "color.bbnf" ;\n`,
    stylesheet: `@import "tokens.bbnf" ;\n`,
};
const files = Object.fromEntries(Object.entries(HEADERS).map(([n, h]) => [`/css/${n}.bbnf`, h + text(n)]));
files["/css/css.bbnf"] = `@import "value" ;\n@import "stylesheet" ;\n`;
const ast = m.grammarFromModules(files, "/css/css.bbnf");
const [, concat] = m.BBNFToASTWithImports(Object.keys(HEADERS).map(text).join("\n"));
const j = (a) => JSON.stringify([...a].map(([k, r]) => [k, r.expression]).sort((x, y) => (x[0] < y[0] ? -1 : 1)), (k, v) => (k === "range" || k === "comment" ? undefined : v instanceof RegExp ? `/${v.source}/${v.flags}` : v));
console.log("rules via @import:", ast.size, "via concatenation:", concat.rules.size, "identical:", j(ast) === j(concat.rules));
