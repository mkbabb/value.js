// SERVED MODEL: claude-opus-5-5
// X.P.W7 research · ARBITER seat (judge) — rebuilds every route's prototype arm FROM ITS OWN SEAT
// SOURCES into ONE output dir, against ONE retired baseline and ONE shared entry, so all arms can be
// timed side by side in one process and checked against one stock reference.
// Evidence only: nothing in value.js src/, parse-that, bbnf-lang or another seat's dir is written;
// bundles go to $TMPDIR/value-js-w7-judge.
//
// ARMS
//   retired        src/css/grammar.ts + src/css/stylesheet.ts @ 2155142b (git archive, blob-pinned) — THE BASELINE
//   stock          value.js HEAD src/css/bbnf on the PUBLISHED bbnf-lang 0.1.4 + parse-that 0.8.2 (bundled, unpatched)
//   tsc-proto      route-ts-compiler closure backend, value.js actions UNCHANGED
//   tsc-proto-pos  route-ts-compiler closure backend + its stylesheet text/positional actions
//   tsc-emit-pos   route-ts-compiler staged (emit) backend + the same stylesheet actions
//   tsc-stockascii route-ts-compiler emulating bbnf-lang 0.1.4's non-ASCII dispatch (equivalence proof only)
//   aot-full       route-aot-codegen generated parser, value.js actions UNCHANGED (full variant)
//   aot-text       route-aot-codegen generated parser + its stylesheet text/span actions (its candidate)
//   fx-final       route-engine-fusion fx-table-dcr+a+l+s (its final arm)
//   np-direct      stock + the mapState no-prototype patch (lazy rebinding applied by the loader) — the floor
// The aot generated modules are REGENERATED here in memory from the route's emitter and compared
// byte-for-byte with the route's checked-in artifacts (drift check), then bundled from this seat's copy.
//   node judge/harness/build.mjs [arm …]
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const REPO = "/Users/mkbabb/Programming/value.js";
const W7 = path.join(REPO, "docs/tranches/X/parse-that/evidence/W7-research");
const TSC = path.join(W7, "route-ts-compiler"), AOT = path.join(W7, "route-aot-codegen"), FX = path.join(W7, "route-engine-fusion");
export const OUT = path.join(tmpdir(), "value-js-w7-judge");
const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
const RETIRED_BLOB = "320b47af067c9817c253221fd819bd2c84e53f2a";
mkdirSync(OUT, { recursive: true });
const git = (...a) => execFileSync("git", ["-C", REPO, ...a], { encoding: "utf8" }).trim();
if (git("rev-parse", `${RETIRED_AT}:src/css/grammar.ts`) !== RETIRED_BLOB) throw new Error("retired blob drift");
const RET = path.join(OUT, "retired-src");
if (!existsSync(path.join(RET, "src/css/grammar.ts"))) {
    mkdirSync(RET, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${RET}"`]);
}
const provenance = { valuejsHead: git("rev-parse", "HEAD"), srcCssDirty: git("status", "--porcelain", "--", "src/css"), retiredAt: RETIRED_AT, built: new Date().toISOString(), node: process.version };

// One raw loader for every arm: `…bbnf?raw` (relative, absolute, or `VALUEJS/…`) → its text.
const rawPlugin = { name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => {
        const p = a.path.replace(/\?raw$/, "").replace(/^VALUEJS\//, REPO + "/");
        return { path: path.resolve(a.resolveDir, p), namespace: "raw" };
    });
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
} };
const entry = path.join(OUT, "entry.ts");
writeFileSync(entry, `
export * as bbnf from "${REPO}/src/css/bbnf/index.ts";
export { parseStylesheet } from "${REPO}/src/css/index.ts";
export * as sheet from "${REPO}/src/css/bbnf/sheet.ts";
export { splitTopLevel } from "${REPO}/src/css/bbnf/index.ts";
`);
const retEntry = path.join(OUT, "retired-entry.ts");
writeFileSync(retEntry, `
export * as hand from "${RET}/src/css/grammar.ts";
export { parseStylesheet } from "${RET}/src/css/stylesheet.ts";
`);
const common = { bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: "external", minify: false,
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")] };
const arms = process.argv.slice(2);
const want = (n) => arms.length === 0 || arms.includes(n);
const built = [];
const out = (n) => path.join(OUT, `${n}.mjs`);

if (want("retired")) { await build({ ...common, entryPoints: [retEntry], outfile: out("retired"), plugins: [rawPlugin] }); built.push("retired"); }
if (want("stock")) { await build({ ...common, entryPoints: [entry], outfile: out("stock"), plugins: [rawPlugin] }); built.push("stock"); }

// ── route-ts-compiler: replicated from route-ts-compiler/harness/build.mjs (swap + alias + defines) ──
const tscSwap = (text, file) => ({ name: "swap-load", setup(b) {
    const inBbnf = (a) => a.resolveDir === path.join(REPO, "src/css/bbnf");
    b.onResolve({ filter: /^\.\/load$/ }, (a) => (inBbnf(a) ? { path: path.join(TSC, "shim/load.ts") } : undefined));
    b.onResolve({ filter: /src\/css\/bbnf\/load\.ts$/ }, () => ({ path: path.join(TSC, "shim/load.ts") }));
    if (text) b.onResolve({ filter: /^\.\/stylesheet$/ }, (a) => (inBbnf(a) ? { path: path.join(TSC, "shim", file) } : undefined));
    if (text) b.onResolve({ filter: /^\.\/load$/ }, (a) => (a.resolveDir === path.join(TSC, "shim") ? { path: path.join(TSC, "shim/load.ts") } : undefined));
} });
const TSC_ARMS = {
    "tsc-proto": { pos: false, levers: undefined, backend: undefined },
    "tsc-proto-pos": { pos: true, levers: undefined, backend: undefined },
    "tsc-emit-pos": { pos: true, levers: undefined, backend: "emit" },
    "tsc-stockascii": { pos: false, levers: { stockAsciiDispatch: true }, backend: undefined },
};
for (const [name, o] of Object.entries(TSC_ARMS)) {
    if (!want(name)) continue;
    await build({ ...common, entryPoints: [entry], outfile: out(name),
        plugins: [rawPlugin, o.pos ? tscSwap(true, "stylesheet-positional.ts") : tscSwap(false)],
        alias: { "@mkbabb/parse-that": `${TSC}/vendor/parse-that-head/index.ts` },
        define: { ...(o.levers ? { __LEVERS__: JSON.stringify(o.levers) } : {}), ...(o.pos ? { __POSITIONAL__: "true" } : {}),
                  ...(o.backend ? { __BACKEND__: JSON.stringify(o.backend) } : {}) } });
    built.push(name);
}

// ── route-aot-codegen: regenerate (drift check against the route's artifact), then bundle ──
const drift = {};
if (want("aot-text") || want("aot-full")) {
    const { emit, frontEnd, grammarText } = await import(path.join(AOT, "gen/emit.mjs"));
    const { aotPlugin } = await import(path.join(AOT, "gen/build-lib.mjs"));
    const text = grammarText();
    const names = [...frontEnd(text).ast.keys()];
    const stub = path.join(OUT, "aot-names-stub.mjs");
    writeFileSync(stub, `export const RULE_NAMES = ${JSON.stringify(names)}; export const ACTION_MANIFEST = {}; export function createParser() { throw new Error("stub"); }\n`);
    const manifestOf = async (textActions) => {
        const f = path.join(OUT, `aot-manifest-${textActions ? "text" : "orig"}.mjs`);
        await build({ ...common, sourcemap: false, entryPoints: [path.join(AOT, "gen/manifest-entry.ts")], outfile: f, plugins: [rawPlugin, aotPlugin(stub, textActions)] });
        return JSON.parse(execFileSync(process.execPath, [f], { encoding: "utf8" }));
    };
    const variants = { full: [false, { memo: false }], text: [true, {}] };
    for (const [v, [textActions, o]] of Object.entries(variants)) {
        const name = `aot-${v}`;
        if (!want(name)) continue;
        const src = emit(text, await manifestOf(textActions), o);
        const theirs = path.join(AOT, `out/css-grammar.${v}.generated.js`);
        const have = existsSync(theirs) ? readFileSync(theirs, "utf8") : "";
        drift[name] = { identicalToRouteArtifact: have === src, bytes: src.length, header: src.split("\n").slice(0, 3).join(" | ") };
        const mine = path.join(OUT, `css-grammar.${v}.generated.js`);
        writeFileSync(mine, src);
        await build({ ...common, entryPoints: [entry], outfile: out(name), plugins: [rawPlugin, aotPlugin(mine, textActions)] });
        built.push(name);
    }
}

// ── route-engine-fusion: replicated from route-engine-fusion/harness/build.mjs for its final arm ──
const NOPROTO = ["      const oldView = Object.create(state);\n      oldView.offset = oldOffset;\n      oldView.value = oldValue;",
                 "      const oldView = new ParserState(state.src, oldValue, oldOffset, false, state.furthest);"];
const noprotoPlugin = { name: "noproto", setup(b) {
    b.onLoad({ filter: /parse-that[\\/]dist[\\/]parse\.js$/ }, (a) => {
        const src = readFileSync(a.path, "utf8");
        if (!src.includes(NOPROTO[0])) throw new Error("noproto anchor");
        return { contents: src.replace(NOPROTO[0], NOPROTO[1]), loader: "js" };
    });
} };
const fxRedirect = (actions, mathq) => ({ name: "redirect", setup(b) {
    b.onResolve({ filter: /(index|load)(\.ts)?$/ }, (a) => {
        if (!a.path.startsWith(".") && !a.path.startsWith("/")) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        if (abs === path.join(REPO, "src/css/bbnf/index")) return { path: path.join(FX, "src/index.ts") };
        if (abs === path.join(REPO, "src/css/bbnf/load")) return { path: path.join(FX, "src/load.ts") };
        return undefined;
    });
    b.onResolve({ filter: /math(\.ts)?$/ }, (a) => {
        if (!mathq) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        return abs === path.join(REPO, "src/css/bbnf/math") ? { path: path.join(FX, "src/math-actions.ts") } : undefined;
    });
    b.onResolve({ filter: /stylesheet(\.ts)?$/ }, (a) => {
        if (!actions) return undefined;
        const abs = path.resolve(a.resolveDir, a.path).replace(/\.ts$/, "");
        return abs === path.join(REPO, "src/css/bbnf/stylesheet") ? { path: path.join(FX, "src/stylesheet-actions.ts") } : undefined;
    });
} });
if (want("fx-final")) {
    // fx-table-dcr+a+l+s = ["table", fuse, discard, collapse, noReset, memo=false, actions, leafAct, loop]
    await build({ ...common, entryPoints: [entry], outfile: out("fx-final"), plugins: [rawPlugin, noprotoPlugin, fxRedirect(true, false)],
        define: { __FUSION_DISPATCH__: JSON.stringify("table"), __FUSION_FUSE__: "true", __FUSION_DISCARD__: "true", __FUSION_COLLAPSE__: "true",
                  __NO_RESET__: "true", __FUSION_MEMO__: "false", __FUSION_LEAFACT__: "true", __FUSION_LOOP__: "true" } });
    built.push("fx-final");
}
if (want("np-direct")) {
    await build({ ...common, entryPoints: [entry], outfile: out("np-direct"), plugins: [rawPlugin, noprotoPlugin] });
    built.push("np-direct");
}
writeFileSync(path.join(OUT, "provenance.json"), JSON.stringify({ ...provenance, built, drift }, null, 1));
console.log(JSON.stringify({ OUT, built, drift, provenance }, null, 1));
