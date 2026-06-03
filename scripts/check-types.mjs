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
// A foreign diagnostic is one whose FILE PATH is glass-ui or node_modules —
// `../glass-ui/...`, `/Users/.../glass-ui/...`, etc.
const FOREIGN_RE = /glass-ui[/\\]|node_modules[/\\]/;

// Extract the FILE PATH from a vue-tsc diagnostic line and decide ownership from
// the path ALONE — never the message. A vue-tsc error reads
// `path(line,col): error TSxxxx: message`. Matching FOREIGN_RE against the whole
// line would wrongly drop a real value.js error whose MESSAGE quotes a glass-ui
// subpath (e.g. `demo/…(3,27): error TS2305: Module '@mkbabb/glass-ui/dock' has
// no exported member 'X'`) — the dominant demo import form. (Caught by the K.W2
// adversarial review.)
function isForeign(line) {
    const m = line.match(/^(.+?)\(\d+,\d+\):\s+error TS/);
    const file = m ? m[1] : line; // unparseable → treat the whole line as the path
    return FOREIGN_RE.test(file);
}

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
        .filter((l) => (countForeign ? true : !isForeign(l)));
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
