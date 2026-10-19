// SERVED MODEL: claude-opus-5-5
//
// X.P.W7.l — THE PER-RULE PROFILE (W7.md ADDENDUM (b) 1; COHESION §0cx). Builds an INSTRUMENTED variant of the
// emitted parser with `bbnf gen --instrument` (the emitter build flag; the shipped `src/css/bbnf/generated/` is never
// written here) into `_build/instrument/`, and bundles it as the arm `_build/instrumented.mjs`: HEAD's `/css` surface
// with `./generated/grammar` resolved to the instrumented module, plus the parser (`load`) so its `profile()` is read.
// Before building, it proves the flag is compiled out: a plain emission here equals the shipped module byte for byte
// (bar the header's sha line, which names the emitter's own bytes), and the shipped module carries none of the
// instrument's tokens.
//   node bench/paired/instrument.mjs
// It also bundles `_build/probe.mjs`: the SHIPPED module, uninstrumented, with the parser exposed (`bisect.mjs`'s arm).
// Then `profile.mjs` runs the classes on node or in Playwright pages and banks the per-rule tables.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BUILD, REPO } from "./common.mjs";

const OUT = path.join(BUILD, "instrument");
mkdirSync(OUT, { recursive: true });
const SHIPPED = path.join(REPO, "src/css/bbnf/generated/grammar.js");
const TOKENS = ["PC[", "NOW(", "ACT++", "DISC", "instrumented", "profile()", "INSTRUMENTED"];

// The generator's own inputs (scripts/gen-grammar.mjs): the grammar, the action table's kinds, the entries.
const gen = readFileSync(path.join(REPO, "scripts/gen-grammar.mjs"), "utf8");
const ENTRIES = [...gen.slice(gen.indexOf("const ENTRIES = ["), gen.indexOf("];", gen.indexOf("const ENTRIES = ["))).matchAll(/"(\w+)"/g)].map((m) => m[1]);
const table = path.join(OUT, "actions.mjs");
await build({ entryPoints: [path.join(REPO, "src/css/bbnf/actions.ts")], outfile: table, bundle: true, platform: "node",
    format: "esm", logLevel: "warning", absWorkingDir: REPO });
const pkg = path.join(REPO, "node_modules/@mkbabb/bbnf-lang");
const cli = path.join(pkg, JSON.parse(readFileSync(path.join(pkg, "package.json"), "utf8")).bin.bbnf);
const emit = (out, ...flags) => execFileSync(process.execPath, [cli, "gen", "src/css/grammar/css.bbnf", "--actions", table, "--out", out,
    "--entries", ENTRIES.join(","), ...flags], { cwd: REPO, encoding: "utf8" }).trim();

const plain = path.join(OUT, "plain.js"), inst = path.join(OUT, "grammar.js");
console.log(emit(plain));
console.log(emit(inst, "--instrument"));
const shipped = readFileSync(SHIPPED, "utf8");
const barHeader = (t) => t.split("\n").filter((l) => !l.startsWith("// sha256(grammar")).join("\n");
const compiledOut = {
    plainEqualsShipped: readFileSync(plain, "utf8") === shipped,
    plainEqualsShippedBarHeaderSha: barHeader(readFileSync(plain, "utf8")) === barHeader(shipped),
    shippedInstrumentTokens: TOKENS.filter((t) => shipped.includes(t)),
    instrumentedTokens: TOKENS.filter((t) => readFileSync(inst, "utf8").includes(t)).length,
};
console.log(JSON.stringify(compiledOut));
if (compiledOut.shippedInstrumentTokens.length > 0) throw new Error("L-8: the shipped module carries instrument code");

const entry = path.join(OUT, "entry.ts");
writeFileSync(entry, `export * as css from ${JSON.stringify(path.join(REPO, "src/css/index.ts"))};
export { parser } from ${JSON.stringify(path.join(REPO, "src/css/bbnf/load.ts"))};
export * as sheet from ${JSON.stringify(path.join(REPO, "src/css/bbnf/sheet.ts"))};
export { failure, success } from ${JSON.stringify(path.join(REPO, "src/css/result.ts"))};
`);
const redirect = { name: "instrumented-grammar", setup(b) {
    b.onResolve({ filter: /^\.\/generated\/grammar$/ }, (a) => (a.importer === path.join(REPO, "src/css/bbnf/load.ts") ? { path: inst } : undefined));
} };
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
await build({ entryPoints: [entry], outfile: path.join(BUILD, "instrumented.mjs"), bundle: true, platform: "node", format: "esm", target: "node22",
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], plugins: [redirect, rawPlugin] });
// The bisection arm (`bisect.mjs`): the SHIPPED module, uninstrumented, with the parser and the readers exposed.
await build({ entryPoints: [entry], outfile: path.join(BUILD, "probe.mjs"), bundle: true, platform: "node", format: "esm", target: "node22",
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], plugins: [rawPlugin] });
writeFileSync(path.join(OUT, "provenance.json"), JSON.stringify({ ...compiledOut,
    valuejsHead: execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    bbnfLang: execFileSync("git", ["-C", path.dirname(execFileSync("realpath", [pkg], { encoding: "utf8" }).trim()), "rev-parse", "HEAD"], { encoding: "utf8" }).trim() }, null, 1));
console.log(`wrote ${path.relative(REPO, path.join(BUILD, "instrumented.mjs"))}`);
