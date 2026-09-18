#!/usr/bin/env node
// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · GOLDEN REGENERATION (G-9, FM-12)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * G-9, verbatim: *"`scripts/visual/regenerate-goldens.mjs` requires `--accept`
 * and refuses a dirty tree."*
 *
 * Both clauses are here, and both exist for the same reason. A golden is an
 * ASSERTION — "this is what the product is supposed to look like" — and
 * regeneration overwrites assertions wholesale. Two things make that safe:
 *
 *   --accept        The flag means "I have read the diff and I am ratifying the
 *                   new pixels as correct." Without it this script prints what
 *                   it WOULD do and exits 2. There is no default-yes: a
 *                   regeneration that happens because somebody ran the script
 *                   is indistinguishable from a regression being laundered into
 *                   the baseline.
 *
 *   clean tree      Refused on a dirty tree because the diff between old and new
 *                   goldens is only meaningful if `git diff` afterwards shows
 *                   EXACTLY the pixel change and nothing else. With uncommitted
 *                   source changes in the tree, the reviewer cannot tell whether
 *                   the new goldens record the change they meant to ratify or a
 *                   half-finished edit sitting beside it.
 *
 *                   "DIRTY" IS SCOPED TO WHAT CAN CHANGE A PIXEL, and the scope
 *                   is stated rather than assumed. A golden is a photograph of
 *                   the product taken by this suite, so exactly three things can
 *                   make one differ: the product (`demo/`, `src/`, `plugins/`,
 *                   the build config), the suite (`e2e/`, `scripts/visual/`,
 *                   `playwright.config.ts`), and the goldens themselves. Those
 *                   are the paths checked, and ANY uncommitted change under them
 *                   refuses the run.
 *
 *                   This is stricter where it matters and usable where it does
 *                   not. Tranche X runs FOUR tracks against one git index, so a
 *                   whole-repo check would refuse on a sibling seat's untracked
 *                   note under `docs/` — a file that cannot alter a single pixel.
 *                   A rule that always refuses is a rule someone adds a bypass
 *                   flag to, and a bypass flag is how `--accept` stops meaning
 *                   anything. Nothing is hidden: every dirty path is PRINTED,
 *                   blocking or not, so the operator sees the whole tree state
 *                   and only the pixel-relevant half stops the run.
 *
 *                   ONE path is exempt even inside the scope, and it is named,
 *                   never pattern-matched: `scripts/dev/dev.sh` is unowned and
 *                   dirty by standing arrangement (CC-021 / DR-24, ruled
 *                   RETIRED-BY-ASSIGNMENT with the NEVER-touch posture made
 *                   PERMANENT for tranche X). It is never staged, never
 *                   restored, and it must not make this script unusable for the
 *                   life of the tranche.
 *
 * FM-12 — *"untracked evidence is not evidence"* — is the other half. Goldens
 * are PNGs, and `.gitignore:34` is a repo-wide `*.png` with a single `!demo/**`
 * carve, so a naively-minted golden set is invisible to git and the gate silently
 * asserts nothing. `e2e/visual/.gitignore` re-includes them with a nested
 * negation (git's own mechanism, and this repo's own idiom — cf. `!test/dist/**`
 * and `!demo/**\/*.png`). This script VERIFIES that at every run: if the goldens
 * it just minted are ignored by git, it says so and exits non-zero, because a
 * green regeneration that produced untracked bytes is the FM-12 failure itself.
 *
 * USAGE
 *   node scripts/visual/regenerate-goldens.mjs                 # dry run
 *   node scripts/visual/regenerate-goldens.mjs --accept        # regenerate
 *   node scripts/visual/regenerate-goldens.mjs --accept -g browse
 *   node scripts/visual/regenerate-goldens.mjs --manifest-only # re-derive the manifest
 *
 * EXIT CODES
 *   0  success
 *   1  refused: dirty tree
 *   2  refused: --accept absent
 *   3  the playwright run failed
 *   4  FM-12: the minted goldens are ignored by git
 *   5  the renderer record is missing — goldens with no G-10 provenance
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const REPO_ROOT = resolve(import.meta.dirname, "../..");
const GOLDEN_ROOT = resolve(REPO_ROOT, "e2e/visual/goldens");
const CONFIG = "e2e/visual/visual.config.ts";
const EVIDENCE_DIR = resolve(REPO_ROOT, "docs/tranches/X/evidence/w1/visual");

/**
 * The ONE path allowed to be dirty. Named, not globbed — a pattern here would
 * grow, and the point of the rule is that exactly one file is exempt and
 * everybody can see which.
 */
const PERMITTED_DIRTY = new Set(["scripts/dev/dev.sh"]);

/**
 * The paths whose state can change a pixel. Everything a golden is a photograph
 * OF, everything that takes the photograph, and the photographs themselves.
 * Anything outside this set is reported but does not block — see the header.
 */
const PIXEL_RELEVANT = [
    "demo/",
    "src/",
    "plugins/",
    "e2e/",
    "scripts/visual/",
    "playwright.config.ts",
    "vite.config.ts",
    "vite.library.ts",
    "index.html",
    "package.json",
    "package-lock.json",
];

const isPixelRelevant = (p) =>
    PIXEL_RELEVANT.some((prefix) =>
        prefix.endsWith("/") ? p.startsWith(prefix) : p === prefix,
    );

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);
const valueOf = (flag) => {
    const i = argv.indexOf(flag);
    return i === -1 ? null : argv[i + 1];
};

function git(...args) {
    const r = spawnSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" });
    if (r.status !== 0 && r.status !== 1) {
        throw new Error(`git ${args.join(" ")} failed: ${r.stderr || r.stdout}`);
    }
    return (r.stdout ?? "").trim();
}

/**
 * `git`, UNTRIMMED — for output whose LEADING whitespace is data.
 *
 * ─── A real hole in this gate, measured and closed ───────────────────────────
 *
 * `git status --porcelain` emits a fixed two-column status field followed by a
 * space, and an unstaged modification's first column is a SPACE:
 *
 *   ⟨`git status --porcelain | od -c`⟩ → `   M   docs/tranches/V/…`
 *
 * `git()` trims, which eats that leading space on the FIRST line only, and
 * `dirtyPaths()` then cuts three characters from a line that has two of
 * status prefix — so the first path came back one character short. Measured
 * live at this clock, before the fix:
 *
 *   REFUSED … reported, not blocking:
 *       ocs/tranches/V/reformation/CARRY-LEDGER.md      ← the leading `d` is gone
 *
 * On this tree the mangled path was harmless (a `docs/` file is not
 * pixel-relevant either way). It is NOT harmless in general: with an unstaged
 * `demo/` or `src/` edit first in the listing, `demo/App.vue` arrives as
 * `emo/App.vue`, matches no `PIXEL_RELEVANT` prefix, and the refusal that is the
 * whole point of this script **does not fire**. A dirty-tree guard defeated by
 * alphabetical order is the decorative-gate disease in miniature.
 *
 * So status is read through this function, which strips only the trailing
 * newline. Nothing else in the script needs it, and the trimming `git()` stays
 * for the outputs where leading whitespace is not data.
 */
function gitRaw(...args) {
    const r = spawnSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" });
    if (r.status !== 0 && r.status !== 1) {
        throw new Error(`git ${args.join(" ")} failed: ${r.stderr || r.stdout}`);
    }
    return (r.stdout ?? "").replace(/\n$/, "");
}

/** Every file under `dir`, repo-relative, sorted — the manifest's own order. */
function walk(dir) {
    if (!existsSync(dir)) return [];
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else out.push(full);
    }
    return out.sort();
}

function sha256(path) {
    return createHash("sha256").update(readFileSync(path)).digest("hex");
}

// ── 1 · the tree must be clean ───────────────────────────────────────────────

function dirtyPaths() {
    // `gitRaw`, not `git`: the two-column status field's first column is a SPACE
    // for an unstaged modification, and trimming it shifts the first line's path
    // by one character. See `gitRaw` for the measurement and for why that was a
    // hole in the refusal rather than a cosmetic defect.
    const all = gitRaw("status", "--porcelain")
        .split("\n")
        .filter(Boolean)
        .map((line) => line.slice(3).trim())
        // A rename reads "old -> new"; the new path is what matters.
        .map((p) => (p.includes(" -> ") ? p.split(" -> ")[1] : p))
        .filter((p) => !PERMITTED_DIRTY.has(p));
    return {
        blocking: all.filter(isPixelRelevant),
        reportedOnly: all.filter((p) => !isPixelRelevant(p)),
    };
}

// ── 2 · run playwright ───────────────────────────────────────────────────────

function runPlaywright() {
    const args = [
        "playwright",
        "test",
        "-c",
        CONFIG,
        "--project=visual",
        "--update-snapshots",
    ];
    const grep = valueOf("-g") ?? valueOf("--grep");
    if (grep) args.push("--grep", grep);
    process.stderr.write(`\n  npx ${args.join(" ")}\n\n`);
    return spawnSync("npx", args, { cwd: REPO_ROOT, stdio: "inherit" }).status ?? 1;
}

// ── 3 · FM-12: the minted bytes must be visible to git ───────────────────────

function ignoredGoldens(files) {
    if (files.length === 0) return [];
    const rel = files.map((f) => relative(REPO_ROOT, f));
    const r = spawnSync("git", ["check-ignore", "--no-index", ...rel], {
        cwd: REPO_ROOT,
        encoding: "utf8",
    });
    // exit 0 ⇒ at least one path IS ignored; exit 1 ⇒ none are.
    if (r.status !== 0) return [];
    return (r.stdout ?? "").split("\n").filter(Boolean);
}

// ── 4 · the manifest, derived from the settled bytes ─────────────────────────

function writeManifest(files) {
    const byPlatform = {};
    for (const file of files) {
        if (file.endsWith("RENDERER.json")) continue;
        const rel = relative(REPO_ROOT, file);
        const platform = relative(GOLDEN_ROOT, file).split("/")[0];
        (byPlatform[platform] ??= []).push({
            path: rel,
            name: rel.split("/").pop(),
            bytes: statSync(file).size,
            sha256: sha256(file),
        });
    }

    const renderers = {};
    for (const platform of Object.keys(byPlatform)) {
        const record = join(GOLDEN_ROOT, platform, "RENDERER.json");
        if (!existsSync(record)) return { ok: false, missing: platform };
        renderers[platform] = JSON.parse(readFileSync(record, "utf8"));
    }

    const manifest = {
        unit: "X.W1.b",
        gate: ["G-8", "G-9", "G-10"],
        generatedBy: "scripts/visual/regenerate-goldens.mjs",
        note:
            "Every figure below is read from the settled bytes on disk — never from a " +
            "run log, never carried over from a previous manifest. The renderer block is " +
            "the string e2e/visual/renderer.ts read out of the LIVE browser (G-10); it is " +
            "not copied from playwright.config.ts.",
        platforms: Object.fromEntries(
            Object.entries(byPlatform).map(([platform, goldens]) => [
                platform,
                {
                    renderer: renderers[platform],
                    goldenCount: goldens.length,
                    totalBytes: goldens.reduce((n, g) => n + g.bytes, 0),
                    goldens: goldens.sort((a, b) => a.name.localeCompare(b.name)),
                },
            ]),
        ),
    };

    mkdirSync(EVIDENCE_DIR, { recursive: true });
    const out = join(EVIDENCE_DIR, "MANIFEST.json");
    writeFileSync(out, JSON.stringify(manifest, null, 2) + "\n");
    return { ok: true, out, manifest };
}

// ── main ─────────────────────────────────────────────────────────────────────

const manifestOnly = has("--manifest-only");

if (!manifestOnly) {
    const { blocking, reportedOnly } = dirtyPaths();

    // Printed whether or not they block, so the operator sees the whole tree
    // state and can never mistake "did not block" for "was not there".
    if (reportedOnly.length > 0) {
        process.stderr.write(
            `\n  ${reportedOnly.length} dirty path(s) outside the pixel-relevant scope — reported, not blocking:\n` +
                reportedOnly
                    .slice(0, 10)
                    .map((p) => `    ${p}\n`)
                    .join("") +
                (reportedOnly.length > 10
                    ? `    …and ${reportedOnly.length - 10} more\n`
                    : ""),
        );
    }

    if (blocking.length > 0) {
        process.stderr.write(
            "\nREFUSED — the working tree is dirty where it can change a pixel.\n\n" +
                blocking.map((p) => `    ${p}`).join("\n") +
                "\n\nGoldens are assertions. Regenerating them on a dirty tree makes the\n" +
                "resulting `git diff` unreadable: a reviewer cannot tell the ratified pixel\n" +
                "change from whatever else was in flight. Commit or stash first.\n" +
                `(Exempt, by standing order: ${[...PERMITTED_DIRTY].join(", ")})\n\n`,
        );
        process.exit(1);
    }

    if (!has("--accept")) {
        process.stderr.write(
            "\nDRY RUN — nothing written. Re-run with --accept to regenerate.\n\n" +
                "  --accept means: I have read the visual diff and I ratify these pixels as\n" +
                "  the new baseline. Without it, a regeneration is indistinguishable from a\n" +
                "  regression being laundered into the goldens.\n\n" +
                `  would run: npx playwright test -c ${CONFIG} --project=visual --update-snapshots\n\n`,
        );
        process.exit(2);
    }

    const status = runPlaywright();
    if (status !== 0) {
        process.stderr.write(
            `\nThe playwright run exited ${status}; goldens may be partial.\n\n`,
        );
        process.exit(3);
    }
}

const files = walk(GOLDEN_ROOT);
const pngs = files.filter((f) => f.endsWith(".png"));

const ignored = ignoredGoldens(pngs);
if (ignored.length > 0) {
    process.stderr.write(
        `\nFM-12 FAILURE — ${ignored.length} of ${pngs.length} minted goldens are IGNORED by git.\n\n` +
            ignored
                .slice(0, 5)
                .map((p) => `    ${p}`)
                .join("\n") +
            (ignored.length > 5 ? `\n    …and ${ignored.length - 5} more` : "") +
            "\n\nUntracked evidence is not evidence. The repo-wide `*.png` rule at\n" +
            ".gitignore:34 swallows these unless e2e/visual/.gitignore re-includes them.\n\n",
    );
    process.exit(4);
}

const result = writeManifest(files);
if (!result.ok) {
    process.stderr.write(
        `\nG-10 FAILURE — no RENDERER.json for platform "${result.missing}".\n\n` +
            "Goldens exist with no record of what rendered them. The suite writes this\n" +
            "file from the live browser on its first capture; its absence means the\n" +
            "goldens were produced some other way.\n\n",
    );
    process.exit(5);
}

const total = Object.values(result.manifest.platforms).reduce(
    (n, p) => n + p.goldenCount,
    0,
);
const bytes = Object.values(result.manifest.platforms).reduce(
    (n, p) => n + p.totalBytes,
    0,
);
process.stdout.write(
    `\n  goldens : ${total} (${(bytes / 1024 / 1024).toFixed(1)} MiB) — all tracked by git\n` +
        `  manifest: ${relative(REPO_ROOT, result.out)}\n` +
        Object.entries(result.manifest.platforms)
            .map(
                ([p, v]) =>
                    `  renderer: ${p} — ${v.renderer.identity.unmaskedRenderer}\n`,
            )
            .join("") +
        "\n",
);
