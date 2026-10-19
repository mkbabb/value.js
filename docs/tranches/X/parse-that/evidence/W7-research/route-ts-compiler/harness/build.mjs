// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — builds the arms under test as self-contained ESM bundles (one node process
// times them side by side):
//   stock    value.js HEAD src/css/bbnf/* on the PUBLISHED @mkbabb/bbnf-lang 0.1.4 + parse-that 0.8.2
//            (node_modules, bundled, unpatched) — the bench of record's candidate, and the
//            equivalence reference;
//   retired  src/css/grammar.ts + src/css/stylesheet.ts @ 2155142b (git archive) — THE BASELINE;
//   proto    value.js HEAD src/css/bbnf/* UNCHANGED, with `./load` swapped at bundle time for
//            shim/load.ts: the seat's compiler (src/) over bbnf-lang 0.1.4's front-end on parse-that
//            HEAD 92d8ea7 (vendor/);
//   proto-<ablation>  the proto with one lever switched off (define __LEVERS__).
//   node harness/build.mjs
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";

const SEAT = path.resolve(import.meta.dirname, "..");
const REPO = "/Users/mkbabb/Programming/value.js";
const OUT = path.join(tmpdir(), "value-js-w7-route-ts-compiler");
const RETIRED_AT = "2155142bad8b7ac8292ad2263f232a47a656f36e";
mkdirSync(OUT, { recursive: true });
const RET = path.join(OUT, "retired-src");
if (!existsSync(path.join(RET, "src/css/grammar.ts"))) {
    mkdirSync(RET, { recursive: true });
    execFileSync("sh", ["-c", `git -C "${REPO}" archive ${RETIRED_AT} src | tar -x -C "${RET}"`]);
}
const rawPlugin = {
    name: "raw",
    setup(b) {
        b.onResolve({ filter: /\?raw$/ }, (a) => {
            const p = a.path.replace(/\?raw$/, "").replace(/^VALUEJS\//, REPO + "/");
            return { path: path.resolve(a.resolveDir, p), namespace: "raw" };
        });
        b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
    },
};
const swap = (text, file = "stylesheet-text.ts") => ({
    name: "swap-load",
    setup(b) {
        const inBbnf = (a) => a.resolveDir === path.join(REPO, "src/css/bbnf");
        b.onResolve({ filter: /^\.\/load$/ }, (a) => (inBbnf(a) ? { path: path.join(SEAT, "shim/load.ts") } : undefined));
        b.onResolve({ filter: /src\/css\/bbnf\/load\.ts$/ }, () => ({ path: path.join(SEAT, "shim/load.ts") }));
        if (text) b.onResolve({ filter: /^\.\/stylesheet$/ }, (a) => (inBbnf(a) ? { path: path.join(SEAT, "shim", file) } : undefined));
        if (text) b.onResolve({ filter: /^\.\/load$/ }, (a) => (a.resolveDir === path.join(SEAT, "shim") ? { path: path.join(SEAT, "shim/load.ts") } : undefined));
    },
});
const entry = path.join(OUT, "entry.ts");
writeFileSync(entry, `
export * as bbnf from "${REPO}/src/css/bbnf/index.ts";
export { parseStylesheet } from "${REPO}/src/css/index.ts";
export * as sheet from "${REPO}/src/css/bbnf/sheet.ts";
export { splitTopLevel } from "${REPO}/src/css/bbnf/index.ts";
export * as __load from "${REPO}/src/css/bbnf/load.ts";
export { AUDIT } from "${SEAT}/src/kernel.ts";
`);
const retEntry = path.join(OUT, "retired-entry.ts");
writeFileSync(retEntry, `
export * as hand from "${RET}/src/css/grammar.ts";
export { parseStylesheet } from "${RET}/src/css/stylesheet.ts";
`);
const common = {
    bundle: true, platform: "node", format: "esm", target: "node22", sourcemap: "external", minify: false,
    logLevel: "warning", absWorkingDir: REPO, nodePaths: [path.join(REPO, "node_modules")],
    alias: {}, define: {},
};
const arms = process.argv.slice(2);
const want = (n) => arms.length === 0 || arms.includes(n);
if (want("stock")) await build({ ...common, entryPoints: [entry], outfile: path.join(OUT, "stock.mjs"), plugins: [rawPlugin] });
if (want("retired")) await build({ ...common, entryPoints: [retEntry], outfile: path.join(OUT, "retired.mjs"), plugins: [rawPlugin] });
// The one-slot memo set, chosen by the packrat advisor (harness/census.mjs), never by guess.
const MEMO = (process.env.MEMO ?? "preludeRun").split(",").filter(Boolean);
const PROTO = {
    proto: undefined,
    "proto-nodispatch": { dispatch: false },
    "proto-noguard": { guard: false },
    "proto-norun": { run: false },
    "proto-norecognize": { recognize: false },
    "proto-stockascii": { stockAsciiDispatch: true },
    "proto-text": undefined,
    "proto-audit": { audit: true },
    "proto-fb3": undefined,
    "proto-pos": undefined,
    "proto-pos-census": undefined,
    "proto-pos-memo": undefined,
    "proto-pos-norun": { run: false },
    "proto-lean": { run: false, guard: false },
    "proto-lean-memo": { run: false, guard: false },
    "proto-pos-noguard": { guard: false },
    "proto-pos-nodispatch": { dispatch: false },
    "proto-pos-norecognize": { recognize: false },
    "emit": undefined,
    "emit-pos": undefined,
};
for (const [name, levers] of Object.entries(PROTO)) {
    if (!want(name)) continue;
    await build({
        ...common, entryPoints: [entry], outfile: path.join(OUT, `${name}.mjs`), plugins: [rawPlugin, (name.startsWith("proto-pos") || name.startsWith("proto-lean") || name === "emit-pos") ? swap(true, "stylesheet-positional.ts") : swap(name === "proto-text")],
        alias: { "@mkbabb/parse-that": `${SEAT}/vendor/parse-that-head/index.ts` },
        define: { ...(levers === undefined ? {} : { __LEVERS__: JSON.stringify(levers) }), ...((name.startsWith("proto-pos") || name.startsWith("proto-lean") || name === "emit-pos") ? { __POSITIONAL__: "true" } : {}),
            ...(name === "proto-fb3" ? { __STRIP_F_B_3__: "true" } : {}),
            ...(name.startsWith("emit") ? { __BACKEND__: JSON.stringify("emit") } : {}),
            ...(name === "proto-pos-census" ? { __CENSUS__: "true" } : {}),
            ...((name === "proto-pos-memo" || name === "proto-lean-memo") ? { __MEMO__: JSON.stringify(MEMO) } : {}) },
    });
}
console.log("built", OUT);
