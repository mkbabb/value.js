#!/usr/bin/env node
/**
 * Migrates keyframes.js's `lerp(t, a, b)` → `lerp(a, b, t)` call sites
 * (the v0.6.0 silent-breakage finding documented in
 *  value.js docs/tranches/E/coordination/Q.md §5).
 *
 * Authored at value.js tranche E, wave W4, Lane F. Lane F's PRODUCT is the
 * migration scaffolding — value.js does NOT write keyframes.js directly per the
 * precept-bound cross-repo boundary. The keyframes.js maintainer applies this
 * codemod locally; the verification protocol lives in `coordination/Q.md §5.4`.
 *
 * Usage:
 *
 *   node scripts/migrate-keyframes-js-lerp.mjs <path/to/keyframes.js> [--dry-run]
 *
 *   <path/to/keyframes.js>   Absolute or relative path to a keyframes.js checkout
 *                            root (the directory containing `src/animation/`).
 *
 *   --dry-run                Print the diff WITHOUT writing. Exits 0 even when
 *                            rewrites are detected.
 *
 * Strategy (conservative — refuses to rewrite anything it can't recognise):
 *
 *   For each of the two known call sites discovered by E.W4 Lane F's audit,
 *   match the EXACT multi-line shape and rewrite the argument order from
 *   `lerp(t, a, b)` → `lerp(a, b, t)`, preserving:
 *     - the exact indentation of the original block,
 *     - any inline `!` non-null assertions and `as` casts,
 *     - the trailing comma + closing paren style.
 *
 *   Sites covered (verbatim per keyframes.js @ HEAD `0909177`):
 *     1. src/animation/numeric.ts:159 — `lerp(eased, seg.startVals[i]!, seg.stopVals[i]!)`
 *     2. src/animation/group.ts:251   — `lerp(layer.weight, existing.value, incoming.value)`
 *
 *   Each rewrite ASSERTS that the post-rewrite `lerp(` occurrence count equals
 *   the pre-rewrite count — the codemod never adds or removes call sites.
 *
 *   If a site doesn't match its expected shape (e.g. the maintainer has already
 *   re-styled the block, the line has shifted, the args differ), the codemod
 *   REFUSES to rewrite that site and prints a diagnostic. The keyframes.js
 *   maintainer applies the migration manually using the diffs in
 *   `coordination/Q.md §5.2`.
 *
 * Exit codes:
 *
 *   0  All known sites either rewritten successfully or already migrated.
 *   1  Usage error, path not found, or a site failed the conservative match
 *      AND was not already in the post-migration shape — manual intervention
 *      required.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const USAGE = `Usage: node scripts/migrate-keyframes-js-lerp.mjs <path/to/keyframes.js> [--dry-run]

Migrates keyframes.js's two \`lerp(t, a, b)\` call sites to value.js's
v0.6.0 \`lerp(a, b, t)\` canonical order.

Arguments:
  <path/to/keyframes.js>   Path to a keyframes.js checkout root.

Flags:
  --dry-run                Print the diff but do not write.
  -h, --help               Print this message.

See value.js docs/tranches/E/coordination/Q.md §5 for full context.
`;

/**
 * The known call sites. Each entry describes the relative path inside the
 * keyframes.js checkout, the legacy (pre-migration) source snippet, and the
 * canonical (post-migration) snippet. The snippets are matched verbatim.
 *
 * Indentation is significant — these strings reproduce the exact bytes from
 * keyframes.js @ HEAD `0909177`, verified at E.W4 Lane F dispatch.
 */
const SITES = [
    {
        relPath: "src/animation/numeric.ts",
        legacy: `            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
                eased,
                seg.startVals[i]!,
                seg.stopVals[i]!,
            );`,
        canonical: `            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
                seg.startVals[i]!,
                seg.stopVals[i]!,
                eased,
            );`,
        description:
            "numeric.ts:159 — per-segment numeric interpolation in NumericAnimator.update()",
    },
    {
        relPath: "src/animation/group.ts",
        legacy: `                                existing.value = lerp(
                                    layer.weight,
                                    existing.value,
                                    incoming.value,
                                );`,
        canonical: `                                existing.value = lerp(
                                    existing.value,
                                    incoming.value,
                                    layer.weight,
                                );`,
        description:
            "group.ts:251 — weighted-blend lerp in AnimationGroup.tick() weighted branch",
    },
];

/**
 * Print a minimal unified-style diff for a single site. We do not depend on
 * the system `diff(1)` so the codemod is hermetic.
 */
function renderSiteDiff(relPath, legacy, canonical) {
    const minus = legacy.split("\n").map((l) => `- ${l}`);
    const plus = canonical.split("\n").map((l) => `+ ${l}`);
    return [`--- a/${relPath}`, `+++ b/${relPath}`, ...minus, ...plus].join(
        "\n",
    );
}

/**
 * Count total `lerp(` occurrences in a source string. Used as the parity
 * assertion — a rewrite must never change the total count.
 */
function countLerpCalls(source) {
    const matches = source.match(/\blerp\(/g);
    return matches ? matches.length : 0;
}

function main(argv) {
    const args = argv.slice(2);

    if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
        process.stdout.write(USAGE);
        process.exit(args.length === 0 ? 1 : 0);
    }

    const dryRun = args.includes("--dry-run");
    const positional = args.filter((a) => !a.startsWith("--") && !a.startsWith("-h"));

    if (positional.length !== 1) {
        process.stderr.write(USAGE);
        process.exit(1);
    }

    const root = path.resolve(positional[0]);

    if (!existsSync(root)) {
        process.stderr.write(`error: path does not exist: ${root}\n`);
        process.exit(1);
    }

    const srcAnimation = path.join(root, "src/animation");
    if (!existsSync(srcAnimation)) {
        process.stderr.write(
            `error: ${root} does not appear to be a keyframes.js checkout ` +
                `(missing src/animation/)\n`,
        );
        process.exit(1);
    }

    process.stdout.write(
        `migrate-keyframes-js-lerp: target = ${root}` +
            (dryRun ? " (dry-run)" : "") +
            "\n\n",
    );

    let rewriteCount = 0;
    let alreadyMigratedCount = 0;
    let unmatchedCount = 0;
    const failures = [];

    for (const site of SITES) {
        const filePath = path.join(root, site.relPath);

        if (!existsSync(filePath)) {
            process.stderr.write(
                `[skip] ${site.relPath} — file missing (the keyframes.js layout has changed)\n`,
            );
            failures.push(site.relPath);
            unmatchedCount++;
            continue;
        }

        const before = readFileSync(filePath, "utf8");
        const beforeLerpCount = countLerpCalls(before);

        const hasLegacy = before.includes(site.legacy);
        const hasCanonical = before.includes(site.canonical);

        if (hasLegacy) {
            const after = before.replace(site.legacy, site.canonical);
            const afterLerpCount = countLerpCalls(after);

            if (afterLerpCount !== beforeLerpCount) {
                process.stderr.write(
                    `[abort] ${site.relPath} — parity check failed ` +
                        `(${beforeLerpCount} → ${afterLerpCount} lerp() calls). ` +
                        `Refusing to write.\n`,
                );
                failures.push(site.relPath);
                continue;
            }

            process.stdout.write(`[rewrite] ${site.relPath}\n`);
            process.stdout.write(`           ${site.description}\n`);
            process.stdout.write(
                renderSiteDiff(site.relPath, site.legacy, site.canonical) +
                    "\n\n",
            );

            if (!dryRun) {
                writeFileSync(filePath, after, "utf8");
            }
            rewriteCount++;
        } else if (hasCanonical) {
            process.stdout.write(
                `[already-migrated] ${site.relPath} — canonical (a, b, t) order present; skipping\n\n`,
            );
            alreadyMigratedCount++;
        } else {
            process.stderr.write(
                `[unmatched] ${site.relPath} — neither legacy nor canonical shape found.\n` +
                    `            The block at this site has drifted from the ` +
                    `audit-recorded shape; the codemod cannot rewrite safely.\n` +
                    `            Apply the diff manually per ` +
                    `coordination/Q.md §5.2.\n\n`,
            );
            failures.push(site.relPath);
            unmatchedCount++;
        }
    }

    process.stdout.write("---\n");
    process.stdout.write(
        `summary: rewritten=${rewriteCount}, already-migrated=${alreadyMigratedCount}, unmatched=${unmatchedCount}\n`,
    );

    if (dryRun) {
        process.stdout.write(
            "dry-run: no files were modified. Re-run without --dry-run to apply.\n",
        );
    }

    if (failures.length > 0) {
        process.stderr.write(
            `\nfailed sites:\n${failures.map((f) => `  - ${f}`).join("\n")}\n`,
        );
        process.exit(1);
    }

    process.exit(0);
}

main(process.argv);
