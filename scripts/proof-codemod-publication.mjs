#!/usr/bin/env node
// Codifies the G-PUB-1 invariant: published codemods reach npm consumers.
//
// F.W2 shipped `scripts/migrate-keyframes-js-lerp.mjs` as a consumer-facing
// codemod, but `scripts/` was never in `package.json files:` — so `npm pack`
// emitted a tarball with zero codemod content (G-PEER-KEYFRAMES-JS §4.1,
// user-ratified 2026-05-21). G.W3 Lane I adds `scripts/migrate-*.mjs` to
// `files:`; this gate asserts the codemods actually land in the tarball so a
// future `files:` regression fails CI rather than silently de-publishing them.
//
// It runs `npm pack --dry-run --json` and inspects the `files[].path` list.
//
// Exit 0 → at least one `scripts/migrate-*.mjs` file is in the tarball.
// Exit 1 → no codemod file present, or `npm pack` produced unparseable output.
//
// Run: node scripts/proof-codemod-publication.mjs
// npm:  npm run proof:codemod-publication

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// Matches the `files:` glob `scripts/migrate-*.mjs` against a tarball path.
const MIGRATE_RE = /^scripts\/migrate-[^/]+\.mjs$/;

let raw;
try {
    raw = execSync("npm pack --dry-run --json --legacy-peer-deps", {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
    });
} catch (e) {
    console.error(`[proof:codemod-publication] FAIL — \`npm pack\` failed: ${e.message}`);
    process.exit(1);
}

let parsed;
try {
    parsed = JSON.parse(raw);
} catch (e) {
    console.error(
        `[proof:codemod-publication] FAIL — could not parse \`npm pack --json\` output: ${e.message}`,
    );
    process.exit(1);
}

// `npm pack --json` emits an array of pack-result objects (one per package).
const entry = Array.isArray(parsed) ? parsed[0] : parsed;
const paths = (entry?.files ?? []).map((f) => f.path);
const codemods = paths.filter((p) => MIGRATE_RE.test(p));

if (codemods.length === 0) {
    console.error(
        "[proof:codemod-publication] FAIL — no scripts/migrate-*.mjs file in the published tarball.",
    );
    console.error(
        `  Tarball carries ${paths.length} file(s); zero match scripts/migrate-*.mjs.`,
    );
    console.error(
        '\nFix: add "scripts/migrate-*.mjs" to the package.json `files:` array (G-PUB-1).',
    );
    process.exit(1);
}

console.log(
    `[proof:codemod-publication] PASS — ${codemods.length} codemod(s) published in the tarball:`,
);
for (const p of codemods) console.log(`  ${p}`);
