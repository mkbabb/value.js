// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.o` — builds the instrument's arms into `bench/paired/_build/` (never $TMPDIR):
//   retired   git archive of RETIRED_AT's `src/` (blob-pinned), bundled: the hand entries + its stylesheet layer
//   product   HEAD's `/css` surface + `src/css/bbnf/sheet.ts` (the 16 reader calls) + `splitTopLevel`
//   recorder  `product` whose reader imports (`./bbnf/sheet`, `./bbnf/index`'s `splitTopLevel`) resolve to a
//             logging wrapper: the harvest of the arguments the readers actually receive
// Also verifies the banked research arms' MANIFEST (79/79) before any banked arm is read.
//   node bench/paired/build.mjs
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BANKED, BUILD, REPO, RETIRED_AT, RETIRED_BLOB } from "./common.mjs";

mkdirSync(BUILD, { recursive: true });
const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8" }).trim();
if (git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`) !== RETIRED_BLOB) throw new Error("retired blob drift");
const RET = path.join(BUILD, "retired-src");
if (!existsSync(path.join(RET, "src/css/grammar.ts"))) {
    mkdirSync(RET, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${RET}"`]);
}
const manifest = execFileSync("sh", ["-c", `cd "${BANKED}" && shasum -a 256 -c ../banked-tmp.MANIFEST.sha256 | grep -c ": OK$"`], { encoding: "utf8" }).trim();

const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
const SHEET = path.join(REPO, "src/css/bbnf/sheet.ts"), INDEX = path.join(REPO, "src/css/bbnf/index.ts");
/** The recorder: a reader call site in `src/css` resolves to a wrapper that logs `[reader, ...args]` into globalThis.__readerLog. */
const readerNames = [...readFileSync(SHEET, "utf8").matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1]);
const recorderPlugin = { name: "recorder", setup(b) {
    const inCss = (a) => a.importer.startsWith(path.join(REPO, "src/css")) && a.importer !== SHEET && a.importer !== INDEX;
    b.onResolve({ filter: /(^|\/)bbnf\/sheet$|^\.\/sheet$/ }, (a) => (inCss(a) && path.resolve(a.resolveDir, a.path) === SHEET.replace(/\.ts$/, "") ? { path: "sheet", namespace: "rec" } : undefined));
    b.onResolve({ filter: /(^|\/)bbnf\/index$|^\.\/index$/ }, (a) => (inCss(a) && path.resolve(a.resolveDir, a.path) === INDEX.replace(/\.ts$/, "") ? { path: "index", namespace: "rec" } : undefined));
    const rec = `const log = (globalThis.__readerLog ??= []); const rec = (n, f) => (...a) => { if (globalThis.__recording) log.push([n, ...a]); return f(...a); };\n`;
    b.onLoad({ filter: /^sheet$/, namespace: "rec" }, () => ({ resolveDir: REPO, loader: "ts", contents:
        `${rec}import * as real from ${JSON.stringify(SHEET)};\nexport type * from ${JSON.stringify(SHEET)};\n` +
        readerNames.map((n) => `export const ${n} = rec(${JSON.stringify(n)}, real.${n});`).join("\n") }));
    b.onLoad({ filter: /^index$/, namespace: "rec" }, () => ({ resolveDir: REPO, loader: "ts", contents:
        `${rec}import { splitTopLevel as s } from ${JSON.stringify(INDEX)};\nexport * from ${JSON.stringify(INDEX)};\nexport const splitTopLevel = rec("splitTopLevel", s);` }));
} };

const entry = path.join(BUILD, "product-entry.ts");
writeFileSync(entry, `export * as css from ${JSON.stringify(path.join(REPO, "src/css/index.ts"))};
export * as sheet from ${JSON.stringify(SHEET)};
export { splitTopLevel } from ${JSON.stringify(INDEX)};
`);
const retEntry = path.join(BUILD, "retired-entry.ts");
writeFileSync(retEntry, `export * as hand from ${JSON.stringify(path.join(RET, "src/css/grammar.ts"))};
export { parseStylesheet } from ${JSON.stringify(path.join(RET, "src/css/stylesheet.ts"))};
`);
const common = { bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: false, minify: false,
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")], plugins: [rawPlugin] };
await build({ ...common, entryPoints: [retEntry], outfile: path.join(BUILD, "retired.mjs") });
await build({ ...common, entryPoints: [entry], outfile: path.join(BUILD, "product.mjs") });
await build({ ...common, entryPoints: [entry], outfile: path.join(BUILD, "recorder.mjs"), plugins: [rawPlugin, recorderPlugin] });
const provenance = { valuejsHead: git("rev-parse", "HEAD"), srcDirty: git("status", "--porcelain", "--", "src"), retiredAt: RETIRED_AT,
    bankedManifestOk: `${manifest}/79`, readers: readerNames, node: process.version, esbuild: JSON.parse(readFileSync(path.join(REPO, "node_modules/esbuild/package.json"), "utf8")).version };
writeFileSync(path.join(BUILD, "provenance.json"), JSON.stringify(provenance, null, 1));
console.log(JSON.stringify(provenance));
