#!/usr/bin/env node
// proof:progress-honesty — value.js VJ-P.W0 born-RED gate.
//
// Asserts that the O tranche PROGRESS.md header is NOT the stale
// "DEVELOPMENT — charter only" string while the published package version
// is >= 1.0.0 (i.e., the tranche is fully shipped and the record must be
// CLOSED-as-built).
//
// Born-RED today: O/PROGRESS.md header reads "DEVELOPMENT — charter only"
// while package.json version = 1.0.2 (>= 1.0.0).
//
// GREEN when: the header reads CLOSED (does NOT match the stale sentinel).
//
// Plant-a-failure test: revert the PROGRESS.md header to the stale string
// while the version remains >= 1.0.0 → gate exits 1 immediately.
//
// This gate does NOT require a build artifact — it operates on the source
// tree only (package.json + docs/tranches/O/PROGRESS.md).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── load package.json version ────────────────────────────────────────────────
let pkgVersion;
try {
    const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
    pkgVersion = pkg.version ?? "0.0.0";
} catch (e) {
    console.error(`FATAL: cannot read package.json: ${e?.message ?? e}`);
    process.exit(1);
}

// ── load PROGRESS.md ─────────────────────────────────────────────────────────
const progressPath = resolve(root, "docs", "tranches", "O", "PROGRESS.md");
let progressContent;
try {
    progressContent = readFileSync(progressPath, "utf8");
} catch (e) {
    console.error(`FATAL: cannot read ${progressPath}: ${e?.message ?? e}`);
    console.error("  Ensure docs/tranches/O/PROGRESS.md is committed.");
    process.exit(1);
}

// ── version check ────────────────────────────────────────────────────────────
// Only fire the header check when version >= 1.0.0 (the O close point).
const [major] = pkgVersion.split(".").map(Number);
if ((major ?? 0) < 1) {
    console.log(`[proof:progress-honesty] SKIP — version ${pkgVersion} < 1.0.0; O not yet shipped.`);
    process.exit(0);
}

// ── the born-RED sentinel ────────────────────────────────────────────────────
const STALE_SENTINEL = /DEVELOPMENT\s*—\s*charter only/i;

const results = [];
let anyFail = false;

const pass = (id, label) => {
    results.push({ id, label, pass: true });
    console.log(`  PASS  ${id}: ${label}`);
};
const fail = (id, label, detail) => {
    results.push({ id, label, pass: false, detail });
    console.error(`  FAIL  ${id}: ${label}`);
    if (detail) console.error(`        ${detail}`);
    anyFail = true;
};

console.log(`\nproof:progress-honesty  (package version ${pkgVersion})\n`);

// C1 — PROGRESS.md must NOT contain the stale "DEVELOPMENT — charter only" sentinel
if (STALE_SENTINEL.test(progressContent)) {
    fail(
        "C1",
        "O/PROGRESS.md header is NOT the stale 'DEVELOPMENT — charter only' string",
        `The PROGRESS.md header still reads "${progressContent.match(STALE_SENTINEL)?.[0]}" ` +
        `while version ${pkgVersion} >= 1.0.0 (tranche is shipped). ` +
        "Rewrite the header to CLOSED-as-built per the VJ-P.W0 spec.",
    );
} else {
    pass("C1", "O/PROGRESS.md header does NOT contain the stale 'DEVELOPMENT — charter only' string");
}

// C2 — PROGRESS.md must contain the word "CLOSED" (the positive assertion)
if (!/\bCLOSED\b/i.test(progressContent)) {
    fail(
        "C2",
        "O/PROGRESS.md header contains the word CLOSED",
        "The PROGRESS header must read CLOSED-as-built (at minimum contain the word CLOSED).",
    );
} else {
    pass("C2", "O/PROGRESS.md contains the word CLOSED");
}

// C3 — docs/tranches/O/ directory must exist and be readable (file present)
// (we already read it above; if we reach here the file exists)
pass("C3", "docs/tranches/O/PROGRESS.md is readable (directory committed)");

// ── summary ──────────────────────────────────────────────────────────────────
const total = results.length;
const passed = results.filter((r) => r.pass).length;
console.log(`\n${passed}/${total} clauses passed`);

if (anyFail) {
    console.error("\nproof:progress-honesty FAIL\n");
    process.exit(1);
} else {
    console.log("\nproof:progress-honesty PASS\n");
    process.exit(0);
}
