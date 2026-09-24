// SERVED MODEL: claude-opus-5-5
// judge — shipped size of each arm's whole bundle (value.js css layer + its parser), minified + gzip.
import { transform } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { OUT, RESULTS } from "./common.mjs";
const arms = (process.argv[2] ?? "retired,stock,tsc-proto-pos,tsc-emit-pos,aot-text,fx-final").split(",");
const rows = {};
for (const a of arms) {
    const src = readFileSync(path.join(OUT, `${a}.mjs`), "utf8");
    const min = (await transform(src, { minify: true, format: "esm", loader: "js" })).code;
    rows[a] = { bytes: Buffer.byteLength(src), minBytes: Buffer.byteLength(min), gzipMinBytes: gzipSync(min, { level: 9 }).length };
    console.log(a.padEnd(14), JSON.stringify(rows[a]));
}
for (const v of ["text", "full"]) {
    const src = readFileSync(path.join(OUT, `css-grammar.${v}.generated.js`), "utf8");
    const min = (await transform(src, { minify: true, format: "esm", loader: "js" })).code;
    rows[`aot-generated-${v}`] = { bytes: Buffer.byteLength(src), minBytes: Buffer.byteLength(min), gzipMinBytes: gzipSync(min, { level: 9 }).length };
    console.log(`aot-generated-${v}`.padEnd(14), JSON.stringify(rows[`aot-generated-${v}`]));
}
writeFileSync(path.join(RESULTS, "size.json"), JSON.stringify(rows, null, 1));
