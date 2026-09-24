// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — F-b-2 + interop witness: compiled rules as parse-that HEAD `Parser`s — they parse,
// compose with parse-that's own combinators, and a FAILED parse writes nothing to the console.
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
const SEAT = path.resolve(import.meta.dirname, "..");
const REPO = "/Users/mkbabb/Programming/value.js";
const out = path.join(tmpdir(), "value-js-w7-route-ts-compiler", "facade.mjs");
await build({
    stdin: { contents: `
export { toParser } from "${SEAT}/src/facade.ts";
export { compileGrammar } from "${SEAT}/src/compile.ts";
export { value } from "${SEAT}/src/kernel.ts";
export { BBNFToASTWithImports } from "${SEAT}/vendor/bbnf-0.1.4/parse.ts";
export { string } from "${SEAT}/vendor/parse-that-head/index.ts";`, resolveDir: SEAT, loader: "ts" },
    bundle: true, platform: "node", format: "esm", outfile: out, logLevel: "error",
    alias: { "@mkbabb/parse-that": `${SEAT}/vendor/parse-that-head/index.ts` },
});
const m = await import(out);
const text = ["tokens", "math", "color", "value", "stylesheet"].map((n) => readFileSync(`${REPO}/src/css/grammar/${n}.bbnf`, "utf8")).join("\n");
const [, g] = m.BBNFToASTWithImports(text);
const c = m.compileGrammar(g.rules);
const hex = m.toParser(c.rule("hex"), m.value, "hex");
let logged = 0; const orig = console.error; console.error = () => { logged++; };
const list = hex.sepBy(m.string(","));
const a = list.parse("#fff,#000000,#abcd");
const b = hex.parse("not-a-hex");
console.error = orig;
console.log("hex.sepBy(\",\").parse →", JSON.stringify(a), "| failed parse →", b, "| console.error calls:", logged);
