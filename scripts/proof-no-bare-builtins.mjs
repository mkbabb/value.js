#!/usr/bin/env node
// Codifies the `node:` prefix requirement for built-in imports across the
// Node-executed surface: api/src/ + plugins/ + scripts/ + bench/.
//
// Ported from speedtest's scripts/check-bare-built-ins.mjs (FOLD-S2). Node 22+
// resolution accepts both `events` and `node:events`, but the bare form
// collides with local directory names — a future `api/src/events/` or
// `plugins/util/` would silently shadow the builtin under bundler resolution.
// The Hono + Node 22+ stack at api/ shares that fragility class; the Vite
// plugin + proof-script + bench surface runs under the same Node ESM loader.
// The disciplined `node:` prefix removes the shadow risk. G.W3 Lane K
// installed the gate at api/src/; H.W3 Lane E extends it to its full
// applicability.
//
// Exit 0 → clean; Exit 1 → one or more bare built-in imports in scope.
//
// Run: node scripts/proof-no-bare-builtins.mjs
// npm:  npm run proof:no-bare-builtins

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCAN_ROOTS = [
    join(ROOT, "api", "src"),
    join(ROOT, "plugins"),
    join(ROOT, "scripts"),
    join(ROOT, "bench"),
];
const SCAN_LABEL = "api/src/ + plugins/ + scripts/ + bench/";

// Built-ins that share names with plausible local dirs/modules. `buffer` is
// included because `globalThis.Buffer` is the idiomatic access path — an
// `import` should always carry the `node:` prefix.
const BUILTINS = [
    "fs", "path", "crypto", "url", "os", "stream", "util",
    "child_process", "http", "https", "events", "querystring", "buffer",
];
const GROUP = `(?:${BUILTINS.join("|")})`;
const SUBPATH = "(?:/[a-zA-Z0-9_-]+)?";
// ESM `from "<builtin>"`, bare side-effect `import "<builtin>"`, and
// CJS/dynamic `require("<builtin>")` / `import("<builtin>")` — all WITHOUT
// the `node:` prefix.
const PATTERNS = [
    new RegExp(`from\\s+["']${GROUP}${SUBPATH}["']`, "g"),
    new RegExp(`(?:^|[\\n;])\\s*import\\s+["']${GROUP}${SUBPATH}["']`, "g"),
    new RegExp(`(?:require|import)\\s*\\(\\s*["']${GROUP}${SUBPATH}["']\\s*\\)`, "g"),
];

const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);
const SOURCE_FILE_RE = /\.(ts|tsx|mts|cts|js|mjs|cjs)$/;

function* walkSource(dir) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return;
    }
    for (const entry of entries) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) {
            if (!SKIP_DIRS.has(entry)) yield* walkSource(full);
        } else if (SOURCE_FILE_RE.test(entry)) {
            yield full;
        }
    }
}

const violations = [];
let scanned = 0;
for (const root of SCAN_ROOTS) {
    for (const file of walkSource(root)) {
        scanned++;
        const text = readFileSync(file, "utf8");
        for (const re of PATTERNS) {
            re.lastIndex = 0;
            let m;
            while ((m = re.exec(text)) !== null) {
                const line = text.slice(0, m.index).split("\n").length;
                violations.push({
                    file: relative(ROOT, file),
                    line,
                    snippet: m[0].trim(),
                });
            }
        }
    }
}

if (violations.length === 0) {
    console.log(
        `[proof:no-bare-builtins] PASS — scanned ${scanned} file(s) in ${SCAN_LABEL}; zero bare built-in imports`,
    );
    process.exit(0);
}

console.error(
    `[proof:no-bare-builtins] FAIL — found ${violations.length} bare built-in import(s) in ${SCAN_LABEL} (must use node:* prefix):`,
);
for (const v of violations) console.error(`  ${v.file}:${v.line}  ${v.snippet}`);
console.error('\nFix: rewrite each as `from "node:<name>"` (e.g. `node:fs`, `node:crypto`).');
process.exit(1);
