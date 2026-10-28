// SERVED MODEL: claude-opus-5-5
//
// deploy-age.mjs — G-21, the standing DR-11 check (X-W11 · COHESION §0gc.2, arm (A)).
//
// DR-11 recurred across M → N → R → S → T because every close reported CI green
// ON ITS OWN BRANCH and nothing measured whether production carried it. This
// check reds when production is older than the newest close.
//
// WHERE IT RUNS (§0gc.2). It used to be a job inside `ci.yml`, whose success is
// what `deploy-pages.yml` waits on. A gate inside the workflow it gates locks
// itself: once production is older than any close, the master push that would
// deploy carries that close, the job reds, CI reds, and the deploy is skipped
// (measured, ESC-W11-DEPLOY-AGE-SELF-LOCK r1/r2). It now runs from
// `.github/workflows/deploy-age.yml` — daily, and after every `deploy-pages`
// run — and measures whether the deploy happened, without gating it.
//
// THE CLOSE GRAMMAR (§0gc.2). A close is an ANNOTATED tag named
// `tranche-*-close`, or a release tag `v<digit>…`, reachable from
// `origin/master`. Never a grep of commit messages: `git log --grep` searches
// whole bodies and matched 526 commits in one window, most of them receipts.
// `v[0-9]*` and not a bare `v*`: the repository also carries `v-…-ref-w40`
// visual-reference tags, which are not releases. A lightweight tag is not a
// close (it has no tagger date and no message).
//
// THE BAR (DR-11 / G-21, unchanged): 0 days. Production is "older than the
// close" exactly when the deployed commit does not contain the close's commit
// (`git merge-base --is-ancestor`). There is no grace period, and ancestry —
// not a timestamp — decides, so a close tagged after a deploy that already
// carried its commit is not a false red, and a deploy that ran after a close
// from a tree without it is not a false green.
//
// THE DEPLOYED COMMIT is the `headSha` of the newest successful `deploy-pages`
// run on master. The post-ship step in `deploy-pages.yml`
// (`deploy-age-served.mjs`) fails any run whose built commit differs from its
// run's own sha, so a successful run's `headSha` names what production serves.
//
// FAIL-CLOSED. Every input that comes back empty or unreadable is a red that
// names the broken instrument, never a pass on its absence.
//
// FALSIFIER (local): `VJS_DEPLOY_AGE_DEPLOY_SHA=<close commit>^` must red;
// `VJS_DEPLOY_AGE_DEPLOY_SHA=<close commit>` must pass. The override is read
// from the environment, printed as an override, and not wired into any workflow.
import { execFileSync, spawnSync } from "node:child_process";

const DEPLOY_WORKFLOW = "deploy-pages.yml";
const MASTER = "origin/master";
const CLOSE_PATTERNS = ["refs/tags/tranche-*-close", "refs/tags/v[0-9]*"];

function fail(message) {
    console.log(`FAIL — ${message}`);
    process.exit(1);
}

function run(cmd, args) {
    const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: Infinity });
    if (r.error) fail(`\`${cmd} ${args.join(" ")}\` could not run: ${r.error.message}`);
    return r;
}

function git(...args) {
    const r = run("git", args);
    if (r.status !== 0)
        fail(`\`git ${args.join(" ")}\` exited ${r.status}: ${r.stderr.trim()}`);
    return r.stdout.trim();
}

// ── the deployed commit ─────────────────────────────────────────────────────

let deploy;
if (process.env.VJS_DEPLOY_AGE_DEPLOY_SHA) {
    deploy = {
        sha: process.env.VJS_DEPLOY_AGE_DEPLOY_SHA,
        at: process.env.VJS_DEPLOY_AGE_DEPLOY_AT ?? "",
        src: "override (VJS_DEPLOY_AGE_DEPLOY_SHA)",
    };
} else {
    const raw = execFileSync(
        "gh",
        [
            "run",
            "list",
            "--workflow",
            DEPLOY_WORKFLOW,
            "--branch",
            "master",
            "--status",
            "success",
            "--limit",
            "1",
            "--json",
            "databaseId,createdAt,headSha,event",
        ],
        { encoding: "utf8" },
    );
    const [newest] = JSON.parse(raw);
    if (!newest) fail(`no successful ${DEPLOY_WORKFLOW} run exists on master at all.`);
    deploy = {
        sha: newest.headSha,
        at: newest.createdAt,
        src: `gh run list --workflow ${DEPLOY_WORKFLOW} --branch master --status success (run ${newest.databaseId}, ${newest.event})`,
    };
}
if (!deploy.sha)
    fail("the deployed commit read back empty, so this check measured nothing.");

// ── the newest close ────────────────────────────────────────────────────────

git("rev-parse", "--verify", "--quiet", `${MASTER}^{commit}`);
const closes = git(
    "for-each-ref",
    `--merged=${MASTER}`,
    "--sort=-creatordate",
    "--format=%(objecttype)%09%(refname:strip=2)%09%(creatordate:iso-strict)%09%(*objectname)",
    ...CLOSE_PATTERNS,
)
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t"))
    .filter(([type]) => type === "tag")
    .map(([, name, at, commit]) => ({ name, at, commit }));
// This repository has annotated closes on master since tranche R; an empty set
// means the checkout is shallow or tagless, or the grammar broke — not "no close".
if (closes.length === 0) {
    fail(
        `no annotated tranche-*-close or v<digit>* tag is reachable from ${MASTER}. ` +
            "The checkout is shallow or tagless, or the query broke. Fix the input; do not pass on its absence.",
    );
}
const close = closes[0];

console.log(
    `deployed commit : ${deploy.sha}  at ${deploy.at || "<unknown>"}  [${deploy.src}]`,
);
console.log(
    `newest close    : ${close.name} → ${close.commit}  tagged ${close.at}  [annotated tag reachable from ${MASTER}]`,
);

// ── the verdict: does production contain the close? ─────────────────────────

const known = run("git", ["cat-file", "-e", `${deploy.sha}^{commit}`]);
if (known.status !== 0)
    fail(
        `the deployed commit ${deploy.sha} is not in this clone, so ancestry cannot be measured.`,
    );
deploy.sha = git("rev-parse", `${deploy.sha}^{commit}`);

const anc = run("git", ["merge-base", "--is-ancestor", close.commit, deploy.sha]);
if (anc.status === 0) {
    console.log(
        `OK — production (${deploy.sha.slice(0, 9)}) contains the newest close ${close.name}.`,
    );
    process.exit(0);
}
if (anc.status !== 1)
    fail(`\`git merge-base --is-ancestor\` exited ${anc.status}: ${anc.stderr.trim()}`);

const days =
    deploy.at && close.at
        ? Math.floor((Date.parse(close.at) - Date.parse(deploy.at)) / 86_400_000)
        : NaN;
const age =
    Number.isFinite(days) && days >= 0
        ? `older than the newest close by ${days} day(s)`
        : "built from a tree that does not contain the newest close";
console.log(
    `FAIL — production is ${age}: ${close.name} (${close.commit.slice(0, 9)}) is not an ancestor of ${deploy.sha.slice(0, 9)}.`,
);
console.log(
    "A close that has not shipped is a close that reported green on its own branch. That is DR-11.",
);
process.exit(1);
