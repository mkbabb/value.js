#!/usr/bin/env node
/**
 * value.js typecheck gate (K.W2 — inv-K-1 / inv-K-4).
 *
 * Runs the two split programs and asserts ZERO value.js-OWNED type errors:
 *
 *   - tsconfig.lib.json   — the PUBLISHED library graph (`src/` only). It is
 *     glass-ui-free by construction (inv-K-1), so EVERY error counts; it must be
 *     0 even with glass-ui's `dist/` deleted (it never touches glass-ui).
 *   - tsconfig.demo.json  — the demo graph, which resolves `@mkbabb/glass-ui`
 *     from SOURCE (inv-K-4, build-state independent). Source-resolution pulls
 *     glass-ui's `src/` into the program, so vue-tsc also reports glass-ui's OWN
 *     internal diagnostics. Those are glass-ui's CI's responsibility (a `.ts`
 *     dependency has no `.d.ts` trust boundary to skip-check, and they are not
 *     per-file maskable). This gate counts only value.js-OWNED errors and
 *     excludes `../glass-ui/` (and any non-repo) paths.
 *
 * Exit 0 iff both programs report 0 value.js-owned errors.
 */
import { spawnSync } from "node:child_process";

const ERROR_RE = /error TS\d+/;
// A value.js-owned diagnostic line starts with a repo-relative path
// (`src/...`, `demo/...`) — NOT an absolute/sibling path like
// `../glass-ui/...` or `/Users/.../glass-ui/...`.
const FOREIGN_RE = /glass-ui[/\\]|node_modules[/\\]/;

function runProgram(project, { countForeign }) {
    const res = spawnSync(
        "npx",
        ["vue-tsc", "-p", project, "--noEmit"],
        { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 },
    );
    const out = `${res.stdout ?? ""}${res.stderr ?? ""}`;
    const errorLines = out
        .split("\n")
        .filter((l) => ERROR_RE.test(l))
        .filter((l) => (countForeign ? true : !FOREIGN_RE.test(l)));
    return errorLines;
}

console.log("→ tsconfig.lib.json (published library — glass-ui-free, inv-K-1)");
const libErrors = runProgram("tsconfig.lib.json", { countForeign: true });
console.log(`  value.js errors: ${libErrors.length}`);

console.log("→ tsconfig.demo.json (demo — glass-ui from source, inv-K-4)");
const demoErrors = runProgram("tsconfig.demo.json", { countForeign: false });
console.log(`  value.js errors: ${demoErrors.length} (glass-ui-internal diagnostics excluded — glass-ui's CI owns those)`);

const all = [...libErrors, ...demoErrors];
if (all.length > 0) {
    console.error("\n✗ value.js type errors:");
    for (const l of all) console.error(`  ${l.trim()}`);
    console.error(`\nvalue.js typecheck FAILED: ${all.length} error(s).`);
    process.exit(1);
}
console.log("\n✓ value.js typecheck: 0 errors (lib + demo).");
