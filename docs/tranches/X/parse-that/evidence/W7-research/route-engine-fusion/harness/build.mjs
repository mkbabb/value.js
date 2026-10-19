// SERVED MODEL: claude-opus-5-5
// route engine-fusion — builds every arm into a plain ESM bundle (value.js src is only READ):
//   retired      src/css/grammar.ts + stylesheet.ts @ 2155142b (git archive, blob-pinned) — THE BASELINE
//   stock        value.js HEAD src/css/bbnf (the product path), @mkbabb/* external = node_modules
//   np-direct    stock with parse-that BUNDLED + the mapState no-prototype patch; the bench rebinds its
//                lazy nonterminals directly (the survey's two levers — the floor this route builds on)
//   fx-<d>[-nf]  the fusion compiler (../src/fusion.ts) replacing ASTToParser, parse-that bundled +
//                no-prototype patch; <d> = any | guard | fused dispatch; -nf = terminal fusion off
// Run: node <seat>/harness/build.mjs
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const REPO = "/Users/mkbabb/Programming/value.js";
const SEAT = path.resolve(import.meta.dirname, "..");
const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";
export const OUT = path.join(tmpdir(), "value-js-w7-route-engine-fusion");
mkdirSync(OUT, { recursive: true });
const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8" }).trim();
if (git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`) !== RETIRED_BLOB) throw new Error("retired blob drift");
const RET = path.join(OUT, "retired-src");
if (!existsSync(path.join(RET, "src/css/grammar.ts"))) {
    mkdirSync(RET, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${RET}"`]);
}
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: path.resolve(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
const NOPROTO = ["      const oldView = Object.create(state);\n      oldView.offset = oldOffset;\n      oldView.value = oldValue;",
                 "      const oldView = new ParserState(state.src, oldValue, oldOffset, false, state.furthest);"];
const noprotoPlugin = { name: "noproto", setup(b) {
    b.onLoad({ filter: /parse-that[\\/]dist[\\/]parse\.js$/ }, (a) => {
        const src = readFileSync(a.path, "utf8");
        if (!src.includes(NOPROTO[0])) throw new Error("noproto anchor");
        return { contents: src.replace(NOPROTO[0], NOPROTO[1]), loader: "js" };
    });
} };
// Redirect value.js's src/css/bbnf/{index,load} to the seat's copies (fusion arms only).
const redirectPlugin = { name: "redirect", setup(b) {
    b.onResolve({ filter: /(index|load)(\.ts)?$/ }, (a) => {
        if (!a.path.startsWith(".") && !a.path.startsWith("/")) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        if (abs === path.join(REPO, "src/css/bbnf/index")) return { path: path.join(SEAT, "src/index.ts") };
        if (abs === path.join(REPO, "src/css/bbnf/load")) return { path: path.join(SEAT, "src/load.ts") };
        return undefined;
    });
    b.onResolve({ filter: /math(\.ts)?$/ }, (a) => {
        if (!globalThis.__MATHQ__) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        if (abs === path.join(REPO, "src/css/bbnf/math")) return { path: path.join(SEAT, "src/math-actions.ts") };
        return undefined;
    });
    b.onResolve({ filter: /stylesheet(\.ts)?$/ }, (a) => {
        if (!a.pluginData?.actions && !globalThis.__ACTIONS__) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        if (abs === path.join(REPO, "src/css/bbnf/stylesheet")) return { path: path.join(SEAT, "src/stylesheet-actions.ts") };
        return undefined;
    });
} };
const candEntry = path.join(OUT, "cand-entry.ts");
writeFileSync(candEntry, `
export * as bbnf from "${REPO}/src/css/bbnf/index.ts";
export { parseStylesheet } from "${REPO}/src/css/index.ts";
`);
const retEntry = path.join(OUT, "retired-entry.ts");
writeFileSync(retEntry, `
export * as hand from "${RET}/src/css/grammar.ts";
export { parseStylesheet } from "${RET}/src/css/stylesheet.ts";
`);
const common = { bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: "external", minify: false,
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] };
await build({ ...common, entryPoints: [retEntry], outfile: path.join(OUT, "retired.mjs"), plugins: [rawPlugin], external: ["@mkbabb/*"] });
await build({ ...common, entryPoints: [candEntry], outfile: path.join(OUT, "stock.mjs"), plugins: [rawPlugin], external: ["@mkbabb/*"] });
await build({ ...common, entryPoints: [candEntry], outfile: path.join(OUT, "np-direct.mjs"), plugins: [rawPlugin, noprotoPlugin] });
// fusion arms: name → [dispatch, fuse, discard, collapse, noReset, memo]
const FX = {
    "fx-any": ["any", true, false, false, false], "fx-any-nf": ["any", false, false, false, false],
    "fx-guard": ["guard", true, false, false, false], "fx-guard-nf": ["guard", false, false, false, false],
    "fx-fused": ["fused", true, false, false, false], "fx-fused-nf": ["fused", false, false, false, false],
    "fx-fused-d": ["fused", true, true, false, false],
    "fx-fused-dc": ["fused", true, true, true, false],
    "fx-guard-dc": ["guard", true, true, true, false],
    "fx-fused-dcr": ["fused", true, true, true, true],
    "fx-guard-dcr": ["guard", true, true, true, true],
    "fx-any-dcr": ["any", true, true, true, true],
    "fx-fused-dcrm": ["fused", true, true, true, true, true],
    "fx-guard-dcrm": ["guard", true, true, true, true, true],
    "fx-fused-dcm": ["fused", true, true, true, false, true],
    "fx-fused-dcr+a": ["fused", true, true, true, true, false, true],
    "fx-guard-dcr+a": ["guard", true, true, true, true, false, true],
    "fx-smart-dcr": ["smart", true, true, true, true, false, false],
    "fx-smart-dc": ["smart", true, true, true, false, false, false],
    "fx-smart-dcr+a": ["smart", true, true, true, true, false, true],
    "fx-table-dcr+a": ["table", true, true, true, true, false, true],
    "fx-table-dcr": ["table", true, true, true, true, false, false],
    "fx-table-dcr+a+l": ["table", true, true, true, true, false, true, true],
    "fx-fused-dcr+a+l": ["fused", true, true, true, true, false, true, true],
    "fx-table-dc+l": ["table", true, true, true, false, false, false, true],
    "fx-table-dcr+l": ["table", true, true, true, true, false, false, true],
    "fx-table-dcr+a+l+s": ["table", true, true, true, true, false, true, true, true],
    "fx-table-dcr+a+l+s+m": ["table", true, true, true, true, true, true, true, true],
    "fx-table-dc+l+s": ["table", true, true, true, false, false, false, true, true],
    "fx-table-dcr+l+s": ["table", true, true, true, true, false, false, true, true],
    "fx-table-dcr+a+l+s+q": ["table", true, true, true, true, false, true, true, true, true],
};
for (const [name, [d, fuse, discard, collapse, noReset, memo = false, actions = false, leafAct = false, loop = false, mathq = false]] of Object.entries(FX)) {
    globalThis.__ACTIONS__ = actions;
    globalThis.__MATHQ__ = mathq;
    await build({ ...common, entryPoints: [candEntry], outfile: path.join(OUT, `${name}.mjs`),
        plugins: [rawPlugin, noprotoPlugin, redirectPlugin],
        define: { __FUSION_DISPATCH__: JSON.stringify(d), __FUSION_FUSE__: String(fuse), __FUSION_DISCARD__: String(discard),
                  __FUSION_COLLAPSE__: String(collapse), __NO_RESET__: String(noReset), __FUSION_MEMO__: String(memo), __FUSION_LEAFACT__: String(leafAct), __FUSION_LOOP__: String(loop) } });
}
const nm = path.join(OUT, "node_modules");
if (!existsSync(nm)) execFileSync("ln", ["-s", path.join(REPO, "node_modules"), nm]);
console.log("built", OUT);
