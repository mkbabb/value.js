#!/usr/bin/env node
// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.v` — compiles value.js's CSS grammar ahead of time with `@mkbabb/bbnf-lang`'s `bbnf gen`
// (a devDependency: value.js carries no parser library at runtime).
//
//   node scripts/gen-grammar.mjs           writes src/css/bbnf/generated/grammar.{js,d.ts}
//   node scripts/gen-grammar.mjs --check   writes nothing; exits 1 when either file is stale (CI)
//
// `bbnf gen` reads the action KINDS from the consumer's action table. value.js's table
// (`src/css/bbnf/actions.ts`) is TypeScript whose imports node cannot resolve on its own, so it is
// bundled first (esbuild, the toolchain's own bundler) into a module node can import; the table's
// kinds, not its functions, are what the generator reads. The entries are the rules value.js calls:
// the `/css` parse entries (`index.ts`) and the stylesheet layer's readers (`sheet.ts`).
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GRAMMAR = "src/css/grammar/css.bbnf";
const ACTIONS = "src/css/bbnf/actions.ts";
const OUT = "src/css/bbnf/generated/grammar.js";
const ENTRIES = [
    // `/css` (index.ts)
    "colorTop", "scalarTop", "valueTop", "keyframeSelector", "timingFunction",
    "commaItems", "semiItems", "spaceItems",
    // the stylesheet layer's readers (sheet.ts)
    "ruleList", "atPrelude", "propertyName", "syntaxText", "syntaxAlts", "scopePrelude",
    "functionHead", "functionParam", "paramHead", "declaration", "commaSpans",
    "scrollFn", "viewFn", "timelineLead", "timelineLength", "dashedIdent",
];

const pkg = path.join(REPO, "node_modules/@mkbabb/bbnf-lang/package.json");
const { bin } = JSON.parse(readFileSync(pkg, "utf8"));
const cli = typeof bin === "object" && bin !== null ? bin.bbnf : undefined;
if (typeof cli !== "string") throw new Error(`gen-grammar: ${pkg} has no \`bbnf\` bin (bbnf gen needs @mkbabb/bbnf-lang >= 0.2.0)`);

const scratch = mkdtempSync(path.join(tmpdir(), "value-js-gen-grammar-"));
try {
    const table = path.join(scratch, "actions.mjs");
    await build({
        entryPoints: [path.join(REPO, ACTIONS)], outfile: table, bundle: true, platform: "node",
        format: "esm", logLevel: "warning", absWorkingDir: REPO,
    });
    const args = [path.join(path.dirname(pkg), cli), "gen", GRAMMAR, "--actions", table, "--out", OUT,
        "--entries", ENTRIES.join(","), ...process.argv.slice(2).filter((a) => a === "--check")];
    const run = spawnSync(process.execPath, args, { cwd: REPO, stdio: "inherit" });
    process.exitCode = run.status ?? 1;
} finally {
    rmSync(scratch, { recursive: true, force: true });
}
