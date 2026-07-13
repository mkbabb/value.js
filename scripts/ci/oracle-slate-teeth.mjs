#!/usr/bin/env node
/**
 * oracle-slate-teeth.mjs — G-ORACLE-1, the CI-config assertion.
 *
 * Wave: U.W-ORACLE · Families: U-F1 (`ci-oracle-slate-nonblocking`) +
 * U-F55-CI-teeth-half (`ci-oracle-slate-no-teeth`). Registry §1 / §16 / §20 /
 * §21. See docs/tranches/U/audit/oracle/ci-teeth/FINDINGS.md.
 *
 * THE DEFECT this gate guards (registry §1, source-read + grep CONFIRMED):
 * `page-load.spec.ts` is the SOLE hard e2e CI step (ci.yml, HARD, no
 * continue-on-error). The FULL `smoke` project — which HOSTS the entire
 * visual-oracle slate (o1..o26 under e2e/smoke/oracles/) — runs
 * `continue-on-error: true`; `smoke-safari` is soft too; and `smoke-perf`
 * (the built-bundle frame-budget project that hosts O-5), `smoke-reactivity`,
 * `smoke-mobile`, `smoke-admin` are invoked by NO workflow. Net: a green CI is
 * ZERO evidence any visual oracle or built-bundle perf gate passed — which
 * defeats the tranche-T core deliverable (the oracle slate).
 *
 * WHAT THIS ASSERTION CHECKS (parse the workflow YAML + the playwright config,
 * pure text — no external dep, no package.json touch):
 *
 *   CHECK A — PROJECT COVERAGE (the pure GAP): every playwright project defined
 *     in playwright.config.ts is INVOKED by ≥1 workflow step (`--project=<name>`
 *     in a `run:`). RED today: smoke-perf / smoke-reactivity / smoke-mobile /
 *     smoke-admin are in 0 workflows. Closing this is gap-closure, NOT a
 *     CI-semantics flip.
 *
 *   CHECK B — NO UN-OWNED continue-on-error (the teeth): every workflow step
 *     that runs an oracle/perf-slate playwright project AND carries
 *     `continue-on-error: true` must carry an adjacent, machine-checkable
 *     SOFT-POSTURE cite marker (CITE_TOKEN below) referencing the OWNED
 *     soft-posture record under docs/tranches/U/audit/oracle/. This is the
 *     distinction the wave draws: an OWNED/cited soft posture ("a named-red-or-
 *     GPU-only annex, never unwatched") vs the un-owned `continue-on-error`
 *     drift that is the actual U-F1 defect. A cited step is Pole-B-shaped; the
 *     FINAL owner ruling (promote-to-blocking vs formally-ratify-soft-through-U)
 *     is booked to U.W-CLOSE and is NOT asserted here (this gate checks for the
 *     OWNED cite, never an owner signature).
 *
 *   CHECK C — the page-load HARD guard (regression tripwire): the page-load
 *     step must NEVER acquire `continue-on-error` — the one hard e2e gate stays
 *     hard.
 *
 * FLIPS GREEN when: every project is invoked (A) AND every soft oracle/perf
 * step carries an owned cite (B) AND page-load stays hard (C). That is exactly
 * the gate's disjunction — "NO un-owned continue-on-error, AND every project
 * invoked — OR the soft posture carries a ratified/owned cite" — with the cite
 * marker as the owned-soft form. A future un-cited `continue-on-error` on the
 * slate, a dropped project invocation, or a softened page-load step RE-REDDENS.
 *
 * Exit codes: 0 = the slate has teeth (A+B+C pass); non-zero = an un-owned soft
 * step, an unrun project, or a softened page-load gate (offenders printed).
 */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const WORKFLOW_DIR = join(REPO, ".github", "workflows");
const PW_CONFIG = join(REPO, "playwright.config.ts");

// The soft-posture cite token a continue-on-error oracle/perf step must carry.
// A raw-text marker (YAML comments are stripped by parsers) that binds the soft
// step to its OWNED soft-posture record — turning "un-owned drift" into "cited
// annex". The path it must reference lives under this audit subtree.
const CITE_TOKEN = "G-ORACLE-1 SOFT-POSTURE-CITE:";
const CITE_PATH_ANCHOR = "docs/tranches/U/audit/oracle/";

// The page-load hard-gate spec — CHECK C's referent (must stay hard).
const HARDGATE_SPEC = "page-load.spec.ts";

// ── read the workflow files (raw text) ──────────────────────────────────────
const workflowFiles = readdirSync(WORKFLOW_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .map((f) => ({ name: f, text: readFileSync(join(WORKFLOW_DIR, f), "utf8") }));

// ── enumerate the playwright projects from playwright.config.ts ─────────────
// The only `name: "..."` keys in the config are the project definitions.
const pwText = readFileSync(PW_CONFIG, "utf8");
const projects = [...pwText.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
if (projects.length === 0) {
    console.error("G-ORACLE-1 FATAL: no playwright projects parsed from playwright.config.ts");
    process.exit(2);
}

// ── split each workflow into STEP chunks ────────────────────────────────────
// A step is introduced by a sequence item whose first key is name/uses/run.
// Sub-keys (continue-on-error, timeout-minutes, with, env, run:|) stay in the
// chunk until the next such item. Robust for these three workflow files (no
// nested `- name/uses/run:` sequences appear inside a step body).
function splitSteps(text) {
    const parts = text.split(/(?=^\s*-\s+(?:name|uses|run):)/m);
    return parts.filter((p) => /^\s*-\s+(?:name|uses|run):/.test(p));
}

// Match `--project=<name>` as a whole token (so `--project=smoke` never matches
// `--project=smoke-safari`).
function invokesProject(chunkText, projectName) {
    const re = new RegExp(`--project=${projectName.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}(?![\\w-])`);
    return re.test(chunkText);
}

const invokedProjects = new Set();
const oracleSlateSteps = []; // { file, name, projects[], soft, cited, isHardgate }

for (const wf of workflowFiles) {
    for (const chunk of splitSteps(wf.text)) {
        if (!/playwright\s+test/.test(chunk)) continue;
        const hitProjects = projects.filter((p) => invokesProject(chunk, p));
        if (hitProjects.length === 0) continue;
        hitProjects.forEach((p) => invokedProjects.add(p));
        const soft = /continue-on-error:\s*true/.test(chunk);
        const cited = chunk.includes(CITE_TOKEN) && chunk.includes(CITE_PATH_ANCHOR);
        const isHardgate = chunk.includes(HARDGATE_SPEC);
        const nameMatch = chunk.match(/-\s+name:\s*(.+)/);
        oracleSlateSteps.push({
            file: wf.name,
            name: nameMatch ? nameMatch[1].trim().replace(/^["']|["']$/g, "") : "(unnamed step)",
            projects: hitProjects,
            soft,
            cited,
            isHardgate,
        });
    }
}

// ── CHECK A — project coverage ──────────────────────────────────────────────
const uninvoked = projects.filter((p) => !invokedProjects.has(p));

// ── CHECK B — no un-owned continue-on-error on the slate ────────────────────
const unownedSoft = oracleSlateSteps.filter((s) => s.soft && !s.cited);

// ── CHECK C — page-load stays hard ──────────────────────────────────────────
const softenedHardgate = oracleSlateSteps.filter((s) => s.isHardgate && s.soft);

// ── report ──────────────────────────────────────────────────────────────────
const RED = uninvoked.length > 0 || unownedSoft.length > 0 || softenedHardgate.length > 0;

console.log("G-ORACLE-1 — oracle + built-bundle-perf slate CI-teeth assertion");
console.log("=".repeat(70));
console.log(`playwright projects (${projects.length}): ${projects.join(", ")}`);
console.log(`oracle/perf-slate workflow steps found: ${oracleSlateSteps.length}`);
console.log("");

console.log("CHECK A — every project invoked by a workflow:");
if (uninvoked.length === 0) {
    console.log(`  PASS — all ${projects.length} projects invoked`);
} else {
    console.log(`  FAIL — ${uninvoked.length} project(s) invoked by NO workflow:`);
    for (const p of uninvoked) console.log(`    · ${p}  (--project=${p} found in 0 workflows)`);
}
console.log("");

console.log("CHECK B — no un-owned continue-on-error on the slate:");
if (unownedSoft.length === 0) {
    const softCited = oracleSlateSteps.filter((s) => s.soft && s.cited);
    console.log(`  PASS — ${softCited.length} soft slate step(s), all carry an owned SOFT-POSTURE cite`);
    for (const s of softCited) console.log(`    · [${s.file}] "${s.name}" — soft, CITED`);
} else {
    console.log(`  FAIL — ${unownedSoft.length} soft slate step(s) with NO owned cite (un-owned drift):`);
    for (const s of unownedSoft) {
        console.log(`    · [${s.file}] "${s.name}" — continue-on-error, projects: ${s.projects.join(", ")}`);
    }
}
console.log("");

console.log("CHECK C — the page-load HARD gate stays hard:");
if (softenedHardgate.length === 0) {
    console.log("  PASS — page-load carries no continue-on-error");
} else {
    console.log("  FAIL — the page-load hard gate acquired continue-on-error:");
    for (const s of softenedHardgate) console.log(`    · [${s.file}] "${s.name}"`);
}
console.log("");
console.log("=".repeat(70));

if (RED) {
    console.error(
        "G-ORACLE-1 RED — the oracle/perf slate carries un-owned continue-on-error " +
            "and/or unrun projects. Wire every project + give each soft slate step an " +
            "owned SOFT-POSTURE cite (Pole-A hard subset OR Pole-B ratified-soft). " +
            "The blocking-vs-ratified-soft final ruling is booked to U.W-CLOSE.",
    );
    process.exit(1);
}
console.log("G-ORACLE-1 GREEN — the slate has teeth: every project is invoked and every soft step is owned + cited.");
