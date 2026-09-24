// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — builds the two parsers under test into plain ESM bundles so ONE
// node process can time them side by side and `node --cpu-prof` sees real function names.
//   candidate  = value.js HEAD src/css/bbnf/index.ts (+ src/css/index.ts parseStylesheet), with
//                @mkbabb/bbnf-lang 0.1.4 and @mkbabb/parse-that 0.8.2 left EXTERNAL (node_modules),
//                so profile frames attribute to their dist files.
//   retired    = src/css/grammar.ts + src/css/stylesheet.ts @ 2155142b (git archive, blob-pinned,
//                the same incumbent bench/retired.ts reads).
//   variant-*  = the candidate with parse-that + bbnf-lang BUNDLED and what-if patches applied to the
//                build copy (see PATCHES; parse-that is never edited). `variant-both-direct` is the
//                same text as `variant-both`, a separate module instance the bench rebinds lazily.
// Run from /Users/mkbabb/Programming/value.js:  node <this dir>/build.mjs
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const REPO = "/Users/mkbabb/Programming/value.js";
const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";
export const OUT = path.join(tmpdir(), "value-js-w7-survey-profile");
mkdirSync(OUT, { recursive: true });

const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8" }).trim();
if (git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`) !== RETIRED_BLOB) throw new Error("retired blob drift");
const RET = path.join(OUT, "retired-src");
if (!existsSync(path.join(RET, "src/css/grammar.ts"))) {
    mkdirSync(RET, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${RET}"`]);
}

const rawPlugin = {
    name: "raw",
    setup(b) {
        b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
        b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
    },
};
// What-if patches applied to a BUILD COPY of parse-that 0.8.2 (never to the repo): each is the
// smallest text substitution that removes one suspected cost while keeping value.js-visible behaviour.
const PATCHES = {
    // mergeErrorState → no-op: value.js never reads `state.expected` / the last-error globals.
    noerr: [["function mergeErrorState(state, label) {", "function mergeErrorState(state, label) {\n  return lastState;"]],
    // mapState's `Object.create(state)` (which makes the live ParserState a PROTOTYPE) → a plain
    // same-shape snapshot; value.js's `spanned` actions read only `prev.offset`.
    noproto: [["      const oldView = Object.create(state);\n      oldView.offset = oldOffset;\n      oldView.value = oldValue;",
               "      const oldView = new ParserState(state.src, oldValue, oldOffset, false, state.furthest);"]],
    // COUNTING build (never timed): tallies mergeErrorState calls, the ones that allocate a fresh
    // `expected` array (a new furthest offset with a label), and mapState's Object.create views.
    count: [
        ["function mergeErrorState(state, label) {", "function mergeErrorState(state, label) {\n  globalThis.__pt.mes++; if (label && state.offset > lastFurthestOffset) globalThis.__pt.expectedAlloc++; else if (label && state.offset === lastFurthestOffset) globalThis.__pt.expectedMerge++;"],
        ["      const oldView = Object.create(state);", "      globalThis.__pt.protoViews++;\n      const oldView = Object.create(state);"],
        ["  reset() {\n    resetErrorState();", "  reset() {\n    globalThis.__pt.resets++;\n    resetErrorState();"],
    ],
};
const patchPlugin = (names) => ({
    name: "patch-" + names.join("+"),
    setup(b) {
        b.onLoad({ filter: /parse-that[\\/]dist[\\/]parse\.js$/ }, (a) => {
            let src = readFileSync(a.path, "utf8");
            for (const n of names) for (const [from, to] of PATCHES[n]) {
                if (!src.includes(from)) throw new Error(`patch ${n}: anchor not found`);
                src = src.replace(from, to);
            }
            return { contents: src, loader: "js" };
        });
    },
});

const candEntry = path.join(OUT, "cand-entry.ts");
writeFileSync(candEntry, `
export * as bbnf from "${REPO}/src/css/bbnf/index.ts";
export { parseStylesheet } from "${REPO}/src/css/index.ts";
export { compileGrammar } from "${REPO}/src/css/bbnf/load.ts";
export { attachColorActions, keywordColor } from "${REPO}/src/css/bbnf/color.ts";
export { attachValueActions } from "${REPO}/src/css/bbnf/value.ts";
export { attachStylesheetActions } from "${REPO}/src/css/bbnf/stylesheet.ts";
export { BBNFToParser } from "@mkbabb/bbnf-lang";
export { ParserState } from "@mkbabb/parse-that";
`);
const retEntry = path.join(OUT, "retired-entry.ts");
writeFileSync(retEntry, `
export * as hand from "${RET}/src/css/grammar.ts";
export { parseStylesheet } from "${RET}/src/css/stylesheet.ts";
`);

const common = {
    bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: "external",
    minify: false, keepNames: false, logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")],
};
await build({ ...common, entryPoints: [candEntry], outfile: path.join(OUT, "candidate.mjs"), plugins: [rawPlugin], external: ["@mkbabb/*"] });
await build({ ...common, entryPoints: [retEntry], outfile: path.join(OUT, "retired.mjs"), plugins: [rawPlugin], external: ["@mkbabb/*"] });
// Variants bundle parse-that + bbnf-lang (one copy); `bundled` is the unpatched control for them.
const VARIANTS = { "variant-bundled": [], "variant-noerr": ["noerr"], "variant-noproto": ["noproto"], "variant-both": ["noerr", "noproto"], "variant-both-direct": ["noerr", "noproto"], "variant-count": ["count"] };
for (const [out, names] of Object.entries(VARIANTS))
    await build({ ...common, entryPoints: [candEntry], outfile: path.join(OUT, `${out}.mjs`), plugins: [rawPlugin, patchPlugin(names)] });
// The external bundles resolve @mkbabb/* from value.js node_modules: symlink it next to them.
const nm = path.join(OUT, "node_modules");
if (!existsSync(nm)) execFileSync("ln", ["-s", path.join(REPO, "node_modules"), nm]);
console.log("built", OUT);
