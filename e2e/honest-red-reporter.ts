// SERVED MODEL: claude-opus-5-5
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import type {
    FullConfig,
    FullResult,
    Reporter,
    Suite,
    TestCase,
    TestError,
    TestResult,
} from "@playwright/test/reporter";

/**
 * X.W11.hld (COHESION §0gx.1) — the verdict over `e2e/producer-held.json`, the
 * form §0ew ruled for fourier.
 *
 * Every held test runs for real and stays red: no `test.fail()`, no skip. The
 * job's verdict is the one thing this changes:
 *
 *   - a red that is not on the manifest FAILS the job, by name;
 *   - a held row red on every attempt, each carrying its `token`, prints red
 *     with its O-id and does not fail the job;
 *   - a held row red WITHOUT its token is a different failure, so it counts as
 *     un-manifested and FAILS;
 *   - a held row that is skipped, or a row naming no test in a spec that ran,
 *     FAILS (a renamed leg cannot fall out of the set unseen);
 *   - a held row reading GREEN does not fail: it prints an adoption notice.
 *
 * That last clause is the one difference from fourier's reporter, which fails
 * the run when a held row passes (§0gx.1, stated at the record's open).
 *
 * A run that was interrupted, timed out, or raised a global error keeps
 * Playwright's own verdict: the manifest speaks only for test reds.
 */
interface HeldRow {
    project: string;
    spec: string;
    title: string;
    leg: string;
    token: string;
    o: string;
    vehicle: string;
    row: string;
    cause: string;
    expiry: string;
}

interface Seen {
    test: TestCase;
    failedAttempts: string[][];
}

const REPO_ROOT = dirname(import.meta.dirname);
const manifest = JSON.parse(
    readFileSync(join(import.meta.dirname, "producer-held.json"), "utf8"),
) as { rows: HeldRow[] };

const projectOf = (test: TestCase) => test.parent.project()?.name ?? "";
const specOf = (test: TestCase) => relative(REPO_ROOT, test.location.file);
// ['', project, file, ...describes, title]
const titleOf = (test: TestCase) => test.titlePath().slice(3).join(" › ");
const legOf = (test: TestCase) =>
    `[${projectOf(test)}] ${specOf(test)}:${test.location.line} › ${titleOf(test)}`;

const rowFor = (test: TestCase) =>
    manifest.rows.find(
        (r) =>
            r.project === projectOf(test) &&
            r.spec === specOf(test) &&
            r.title === titleOf(test),
    );

const messageOf = (e: TestError) => e.message ?? e.value ?? "";

export default class HonestRedReporter implements Reporter {
    private suite: Suite | undefined;
    private globalErrors = 0;
    private readonly seen = new Map<string, Seen>();

    printsToStdio(): boolean {
        return false;
    }

    onBegin(_config: FullConfig, suite: Suite): void {
        this.suite = suite;
    }

    onError(_error: TestError): void {
        this.globalErrors++;
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const seen = this.seen.get(test.id) ?? { test, failedAttempts: [] };
        if (result.status !== "passed" && result.status !== "skipped") {
            seen.failedAttempts.push(result.errors.map(messageOf));
        }
        this.seen.set(test.id, seen);
    }

    async onEnd(result: FullResult): Promise<{ status: FullResult["status"] } | void> {
        const failures: string[] = [];
        const held: string[] = [];
        const adoptions: string[] = [];

        for (const { test, failedAttempts } of this.seen.values()) {
            const row = rowFor(test);
            const outcome = test.outcome();
            if (outcome === "skipped") {
                if (row)
                    failures.push(
                        `SKIPPED, a held row may never be skipped: ${legOf(test)}`,
                    );
            } else if (outcome === "unexpected") {
                if (!row) {
                    failures.push(`RED, not on the manifest: ${legOf(test)}`);
                } else if (
                    failedAttempts.every((a) => a.some((m) => m.includes(row.token)))
                ) {
                    held.push(
                        `RED ${row.o} ${legOf(test)}\n      ${row.row}\n      ${row.vehicle}; ${row.expiry}`,
                    );
                } else {
                    failures.push(
                        `RED without its token "${row.token}", a different failure than ${row.o} holds: ${legOf(test)}`,
                    );
                }
            } else if (row) {
                adoptions.push(
                    `ADOPTION NOTICE ${row.o} (${outcome}): ${legOf(test)} read GREEN. If the repin landed, adopt the cure and delete the row: ${row.row}`,
                );
            }
        }

        // A row is stale only where its project and spec are in this run; a job
        // that runs another project or spec says nothing about it.
        const ran = this.suite?.allTests() ?? [];
        for (const row of manifest.rows) {
            const specRan = ran.some(
                (t) => projectOf(t) === row.project && specOf(t) === row.spec,
            );
            if (specRan && !ran.some((t) => rowFor(t) === row)) {
                failures.push(`row names no test: ${row.o} ${row.leg} (${row.title})`);
            }
        }

        if (held.length) {
            console.log(
                `\nproducer-held, red by a named producer cure (${held.length}):\n  ${held.join("\n  ")}`,
            );
        }
        if (adoptions.length) console.log(`\n${adoptions.join("\n")}`);
        if (failures.length) {
            console.error(
                `\nFAILS THE JOB (${failures.length}):\n  ${failures.join("\n  ")}`,
            );
        }

        if (result.status !== "passed" && result.status !== "failed") return;
        if (this.globalErrors > 0) return;
        const status = failures.length ? "failed" : "passed";
        console.log(
            `\nhonest-red verdict: ${status} · ${held.length} held red · ${adoptions.length} held green · ${failures.length} failing`,
        );
        return { status };
    }
}
