#!/usr/bin/env node
// proof:subpath-budget — value.js O.W2 born-RED gate (the crux of the subpath
// split). The REAL observable: importing `@mkbabb/value.js/color` (and the other
// non-parsing subpaths) pulls ZERO `@mkbabb/parse-that` / @keyframes-grammar
// modules into the graph.
//
// This is NOT a source-grep. The primary clause BUNDLE-TRACES the `./color`
// entry through esbuild (--bundle --format=esm, parse-that EXTERNAL) and reads
// the METAFILE to enumerate every module actually pulled into the graph, then
// asserts no `src/parsing/` module appears. A re-export trick that still drags
// the grammar at runtime is caught here (the parsing module would show up in the
// trace even if the source text looked clean). Secondary clauses grep the BUILT
// dist chunks (the genuine artifact a consumer ships) and verify exports/types
// resolve.
//
// Born-RED on today's tree: no subpaths, `units/index.ts` re-exports from
// `parsing/color`, so the color graph drags the grammar.

import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative } from "node:path";
import { readFileSync, existsSync, readdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const results = [];
const record = (id, label, fn) =>
    Promise.resolve()
        .then(fn)
        .then(() => {
            results.push({ id, label, ok: true });
            console.log(`  PASS  ${id}  ${label}`);
        })
        .catch((e) => {
            results.push({ id, label, ok: false, err: e?.message ?? String(e) });
            console.log(`  FAIL  ${id}  ${label}`);
            console.log(`        ${e?.message ?? e}`);
        });

const assert = (cond, msg) => {
    if (!cond) throw new Error(msg);
};

// Modules that mark a parse-that / @keyframes-grammar leak when found in the
// color/units/math/transform/quantize graphs.
const PARSING_DIR_RE = /[\\/]src[\\/]parsing[\\/]/;
const PARSETHAT_RE = /@mkbabb[\\/]parse-that/;
const GRAMMAR_SYMBOL_RE = /parseCSSValue|parseCSSStylesheet|parseCSSColor|@keyframes/;

/**
 * Walk the BUILT dist chunk import graph from an entry file, returning the
 * concatenated text of the entry + every chunk it transitively imports. This
 * catches a transitive leak that a grep of the thin entry alone would miss (the
 * entry may import a shared hash-named chunk that itself references parse-that).
 */
function distClosureText(entryFile) {
    const distDir = resolve(root, "dist");
    const seen = new Set();
    const queue = [resolve(distDir, entryFile)];
    let text = "";
    const importRe = /from\s*["']([^"']+)["']/g;
    while (queue.length) {
        const f = queue.pop();
        if (seen.has(f) || !existsSync(f)) continue;
        seen.add(f);
        const src = readFileSync(f, "utf8");
        text += src + "\n";
        let m;
        while ((m = importRe.exec(src))) {
            const spec = m[1];
            if (spec.startsWith(".")) {
                queue.push(resolve(dirname(f), spec));
            }
        }
    }
    return text;
}

/**
 * Bundle-trace a subpath entry through esbuild with parse-that EXTERNAL; return
 * the set of source modules pulled into the graph (absolute paths). The metafile
 * inputs are the ground truth — every module the bundler actually visited.
 */
async function traceEntry(entryRel) {
    const entry = resolve(root, entryRel);
    const out = await build({
        entryPoints: [entry],
        bundle: true,
        format: "esm",
        write: false,
        metafile: true,
        platform: "neutral",
        logLevel: "silent",
        external: ["@mkbabb/parse-that", "prettier", "prettier/*"],
    });
    return Object.keys(out.metafile.inputs).map((p) => resolve(root, p));
}

console.log("proof:subpath-budget — the ./color parse-that-free bundle trace\n");

// C0 — the color subpath SOURCE entry exists (precondition for the trace).
await record("C0", "src/subpaths/color.ts exists", () => {
    assert(
        existsSync(resolve(root, "src/subpaths/color.ts")),
        "src/subpaths/color.ts missing — O.W2 S3 not authored",
    );
});

// C1 (THE CRUX) — bundle-trace ./color: ZERO src/parsing modules in the graph.
await record(
    "C1",
    "./color bundle graph contains ZERO src/parsing/ modules (real esbuild trace)",
    async () => {
        const modules = await traceEntry("src/subpaths/color.ts");
        const parsingLeaks = modules.filter((m) => PARSING_DIR_RE.test(m));
        assert(
            parsingLeaks.length === 0,
            `./color drags ${parsingLeaks.length} parsing module(s):\n` +
                parsingLeaks.map((m) => "    " + relative(root, m)).join("\n"),
        );
    },
);

// C2 — built dist/color.js transitive closure has zero "parse-that" refs.
await record("C2", "dist/color.js closure is parse-that-free", () => {
    assert(existsSync(resolve(root, "dist/color.js")), "dist/color.js missing — run `npm run build` first");
    assert(
        !PARSETHAT_RE.test(distClosureText("color.js")),
        "dist/color.js closure references @mkbabb/parse-that — the edge is NOT severed",
    );
});

// C3 — built dist/color.js closure is grammar-free (no parser entry symbols).
await record("C3", "dist/color.js closure is @keyframes-grammar-free", () => {
    assert(
        !GRAMMAR_SYMBOL_RE.test(distClosureText("color.js")),
        "dist/color.js closure references grammar entry symbols (parseCSSValue / parseCSSStylesheet / parseCSSColor / @keyframes)",
    );
});

// C4 — dist/units.js closure is parse-that-free (the O.W1 S1 guarantee).
await record("C4", "dist/units.js closure is parse-that-free", () => {
    assert(existsSync(resolve(root, "dist/units.js")), "dist/units.js missing");
    assert(
        !PARSETHAT_RE.test(distClosureText("units.js")),
        "dist/units.js closure references parse-that",
    );
});

// C5 — ./parsing DOES depend on parse-that (deliberate — the grammar chunk).
// Bundle-trace the entry (parse-that EXTERNAL): a parsing module MUST appear in
// the graph, confirming this is the chunk that owns the grammar. (The built
// `dist/parsing.js` entry imports parse-that transitively through shared chunks,
// so a grep of the thin entry text alone is insufficient — the trace is the
// honest observable.)
await record("C5", "./parsing graph DOES pull src/parsing/ modules (deliberate)", async () => {
    const modules = await traceEntry("src/subpaths/parsing.ts");
    const parsingModules = modules.filter((m) => PARSING_DIR_RE.test(m));
    assert(
        parsingModules.length > 0,
        "./parsing graph contains NO parsing modules — the grammar chunk is broken",
    );
    // And the built dist references parse-that somewhere in its chunk closure
    // (the external grammar dependency survives — `dist/parsing.js` imports it
    // transitively through the shared `easing-*` / `serialize-*` chunks).
    const distRefsParseThat = readdirSync(resolve(root, "dist"))
        .filter((f) => f.endsWith(".js"))
        .some((f) => PARSETHAT_RE.test(readFileSync(resolve(root, "dist", f), "utf8")));
    assert(
        distRefsParseThat,
        "no dist chunk references parse-that — the external grammar dep vanished",
    );
});

// C6 — the root `.` chunk still resolves parseCSSValue (BC regression guard).
await record("C6", "root @mkbabb/value.js still exports parseCSSValue", async () => {
    const mod = await import(resolve(root, "dist/value.js"));
    assert(
        typeof mod.parseCSSValue === "function",
        "dist/value.js lost parseCSSValue — the `.` barrel regressed",
    );
});

// C7 — the ./color types resolve.
await record("C7", "dist/subpaths/color.d.ts exists and declares Color", () => {
    const p = resolve(root, "dist/subpaths/color.d.ts");
    assert(existsSync(p), "dist/subpaths/color.d.ts missing");
    const dts = readFileSync(p, "utf8");
    assert(
        /\bColor\b/.test(dts),
        "dist/subpaths/color.d.ts does not declare/re-export Color",
    );
});

// C8 — math/transform/quantize chunks are parse-that-free too.
for (const chunk of ["math", "transform", "quantize"]) {
    await record(`C8.${chunk}`, `dist/${chunk}.js closure is parse-that-free`, () => {
        assert(existsSync(resolve(root, `dist/${chunk}.js`)), `dist/${chunk}.js missing`);
        assert(
            !PARSETHAT_RE.test(distClosureText(`${chunk}.js`)),
            `dist/${chunk}.js closure references parse-that`,
        );
    });
}

const failed = results.filter((r) => !r.ok);
console.log(
    `\nproof:subpath-budget — ${results.length - failed.length}/${results.length} clauses passed`,
);
if (failed.length) {
    console.error(`\nGATE RED: ${failed.length} clause(s) failed`);
    process.exit(1);
}
console.log("GATE GREEN: ./color is parse-that-free over the real bundle graph");
