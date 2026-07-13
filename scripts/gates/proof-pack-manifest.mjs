#!/usr/bin/env node
// proof:pack-manifest — value.js U.W-CANON U-F63 born-RED gate (G-CANON-6).
// The npm tarball ships the LIBRARY, never the demo.
//
// THE DEFECT (U-F63, measured ~4.3 MB): `package.json` `files:["dist"]` + no
// `.npmignore` allow-lists the WHOLE `dist/` dir — and after a `npm run gh-pages`
// build, `dist/gh-pages/` (the entire compiled demo SPA: index.html, hashed JS,
// fonts, CNAME) lives INSIDE it, so `npm pack` folds the demo into the published
// tarball. `.npmignore` does not help: npm ignores it whenever a `files` array is
// present. The cure narrows `files` with negation globs (`!dist/gh-pages`,
// `!dist/gh-pages/**`) — deploy is UNAFFECTED (the gh-pages deploy reads
// `dist/gh-pages/` off disk directly, not through the tarball).
//
// Two clauses:
//   (1) CONFIG (durable): `files` carries the gh-pages negation — the guard that
//       holds regardless of whether a gh-pages build is on disk right now.
//   (2) BEHAVIORAL (armed): plant a sentinel under `dist/gh-pages/`, run
//       `npm pack --dry-run --json`, assert ZERO `dist/gh-pages/**` entries in the
//       manifest, and confirm the library artefacts (value.js, a subpath, a
//       hashed chunk, index.d.ts) DID survive. The sentinel makes the behavioral
//       clause meaningful even when no real gh-pages build exists.
//
// Born-RED evidence: with `files:["dist"]` and a real gh-pages build present, the
// manifest carried 9 `dist/gh-pages/**` entries; the sentinel clause reproduces
// that with or without a real build.

import { execSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..", "..");

console.log("proof:pack-manifest — the tarball ships the library, not the demo (U-F63 / G-CANON-6)\n");

const failures = [];

// ── Clause 1 — CONFIG: the `files` negation is present ──────────────────────
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const files = pkg.files ?? [];
const hasNegation = files.some((f) => /^!.*dist\/gh-pages/.test(f));
if (!hasNegation) {
    failures.push(
        `package.json "files" does not exclude dist/gh-pages — add the negation ` +
            `globs (e.g. "!dist/gh-pages", "!dist/gh-pages/**"). Current: ${JSON.stringify(files)}`,
    );
} else {
    console.log(`  CONFIG  files excludes gh-pages: ${JSON.stringify(files.filter((f) => f.includes("gh-pages")))}`);
}

// ── Clause 2 — BEHAVIORAL: sentinel under dist/gh-pages must NOT pack ────────
const distGhPages = resolve(root, "dist", "gh-pages");
const createdDir = !existsSync(distGhPages);
const sentinel = resolve(distGhPages, "__pack_manifest_probe__.txt");
let manifest;
try {
    mkdirSync(distGhPages, { recursive: true });
    writeFileSync(sentinel, "pack-manifest probe — must be excluded from the npm tarball\n");
    const out = execSync("npm pack --dry-run --json --legacy-peer-deps", {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
    });
    manifest = JSON.parse(out)[0];
} finally {
    rmSync(sentinel, { force: true });
    // Only remove the dir if we created it (do not clobber a real gh-pages build).
    if (createdDir) rmSync(distGhPages, { recursive: true, force: true });
}

const paths = manifest.files.map((f) => f.path);
const ghEntries = paths.filter((p) => p.includes("gh-pages"));
if (ghEntries.length) {
    failures.push(
        `npm pack manifest carries ${ghEntries.length} dist/gh-pages/** entr(y/ies) ` +
            `— the demo is shipping in the tarball:\n` +
            ghEntries.slice(0, 6).map((p) => "      " + p).join("\n"),
    );
} else {
    console.log(`  BEHAVIORAL  manifest has 0 gh-pages entries across ${paths.length} packed files`);
}

// Library artefacts MUST survive the narrowing (guard against over-exclusion).
const mustHave = [
    "dist/value.js",
    "dist/index.d.ts",
    "dist/subpaths/color.js",
    "dist/subpaths/color.d.ts",
];
for (const need of mustHave) {
    if (!paths.includes(need)) {
        failures.push(`library artefact '${need}' is MISSING from the tarball — the "files" narrowing over-excluded.`);
    }
}
const hasHashedChunk = paths.some((p) => /^dist\/[a-z-]+-[A-Za-z0-9_]+\.js$/.test(p));
if (!hasHashedChunk) {
    failures.push(`no hashed runtime chunk (dist/<name>-<hash>.js) in the tarball — value.js imports would 404.`);
}

if (failures.length) {
    console.error(`\nGATE RED: ${failures.length} pack-manifest violation(s):\n`);
    for (const f of failures) console.error("  " + f);
    process.exit(1);
}
console.log(`\nGATE GREEN: the tarball ships the library surface with ZERO demo (dist/gh-pages) payload.`);
