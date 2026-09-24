// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — does bbnf-lang 0.1.4's grammar front-end (grammar.ts/parse.ts), built onto
// parse-that HEAD (92d8ea7, all() keeps positional undefined), yield the SAME AST for value.js's
// five modules as the published 0.1.4-on-0.8.2 dist?  node harness/front-check.mjs
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
const SEAT = path.resolve(import.meta.dirname, "..");
const REPO = "/Users/mkbabb/Programming/value.js";
const OUT = path.join(tmpdir(), "value-js-w7-route-ts-compiler");
await build({
    stdin: { contents: `export { BBNFToASTWithImports, BBNFToAST } from "${SEAT}/vendor/bbnf-0.1.4/parse.ts";`, resolveDir: SEAT, loader: "ts" },
    bundle: true, platform: "node", format: "esm", outfile: path.join(OUT, "front-head.mjs"), logLevel: "warning",
    alias: { "@mkbabb/parse-that": `${SEAT}/vendor/parse-that-head/index.ts` },
});
const head = await import(path.join(OUT, "front-head.mjs"));
const stock = await import(path.join(REPO, "node_modules/@mkbabb/bbnf-lang/dist/bbnf.js"));
const text = ["tokens", "math", "color", "value", "stylesheet"].map((m) => readFileSync(`${REPO}/src/css/grammar/${m}.bbnf`, "utf8")).join("\n");
const strip = (ast) => JSON.stringify([...ast].map(([k, r]) => [k, r.expression]), (k, v) => (k === "range" || k === "comment" ? undefined : v instanceof RegExp ? `/${v.source}/${v.flags}` : v));
const [, s] = stock.BBNFToASTWithImports(text);
const [, h] = head.BBNFToASTWithImports(text);
const a = strip(s.rules), b = strip(h.rules);
console.log("rules stock", s.rules.size, "head", h?.rules?.size, "identical AST:", a === b);
if (a !== b) { let i = 0; while (a[i] === b[i]) i++; console.log(a.slice(i - 200, i + 200)); console.log("---"); console.log(b.slice(i - 200, i + 200)); }
