// SERVED MODEL: claude-opus-5-5
//
// KF.W3 unit .a — THE ATTRIBUTION HARNESS (spec docs/tranches/X/keyframes/waves/KF-W3.md,
// G-KF3-3's per-RED attribution; record docs/tranches/X/execution/B/KF-W3.md).
//
// Question it answers, per test file: is a RED at the new value.js coordinate
// VALUE-SIDE (the consumed library moved under kf) or KF-SIDE (kf's own bytes
// are red independent of the coordinate)? It answers by EXECUTION, never by
// reading: the SAME kf bytes are copied into a scratch tree twice, the only
// difference between the two copies is node_modules/@mkbabb/value.js (the
// registry tarball of OLD vs NEW, byte-identity checked against
// `npm view <spec> dist.shasum`), and the same vitest invocation runs in both.
//
//   classification (per file, and per test id inside it)
//   ┌───────────────┬───────────────┬──────────────────────────────────────────┐
//   │ at OLD        │ at NEW        │ verdict                                  │
//   ├───────────────┼───────────────┼──────────────────────────────────────────┤
//   │ GREEN         │ RED           │ VALUE-SIDE   (the coordinate moved)      │
//   │ RED           │ RED           │ KF-SIDE      (red regardless of value)   │
//   │ RED           │ GREEN         │ VALUE-SIDE-CURED (the bump cures it)     │
//   │ GREEN         │ GREEN         │ GREEN        (no RED to attribute)       │
//   │ skipped       │ skipped       │ NOT-RUN      (env-gated; not measured)   │
//   │ absent/error  │ any           │ UNATTRIBUTABLE (named, never guessed)    │
//   └───────────────┴───────────────┴──────────────────────────────────────────┘
//   A file whose suite fails to COLLECT (import/type error) at one coordinate
//   and not the other is VALUE-SIDE at the collecting edge — that is exactly the
//   O-117 shape (a retired export: `decomposeMatrix2D/3D`, `Mat4`).
//
// Usage (kf is READ-ONLY to this harness: it only reads files out of it):
//   node attribution-harness.mjs --kf /Users/mkbabb/Programming/keyframes.js \
//        --test test/compile/easing-identity.test.ts [--test <more> ...] \
//        [--old 4.0.0] [--new 4.1.0] [--source HEAD|worktree|<git-ref>] \
//        [--scratch <dir>] [--out <receipt.json>] [--keep]
//   --source HEAD (default) copies `git archive <ref>`; `worktree` copies the
//   live working tree (for a seat whose re-aimed tests are not yet committed),
//   excluding .git and node_modules.
//
// Machine law (~/.claude/CLAUDE.md): every vitest run goes through
// ~/.claude/guard/guarded with --maxWorkers=2; the two coordinates run
// SERIALLY (never two heavy runs from one seat); node_modules is an APFS clone
// (`cp -c`), so a copy costs metadata, not 467 MB. The scratch tree is removed
// on exit unless --keep. Nothing here is durable: the RECEIPT is what a seat
// pastes into its record.

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";

const GUARD = join(homedir(), ".claude/guard/guarded");
const PKG = "@mkbabb/value.js";

const parseArgs = (argv) => {
    const args = { tests: [], old: "4.0.0", next: "4.1.0", source: "HEAD", keep: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        const v = () => {
            const n = argv[++i];
            if (n === undefined) throw new Error(`${a} needs a value`);
            return n;
        };
        if (a === "--kf") args.kf = resolve(v());
        else if (a === "--test") args.tests.push(v());
        else if (a === "--old") args.old = v();
        else if (a === "--new") args.next = v();
        else if (a === "--source") args.source = v();
        else if (a === "--scratch") args.scratch = resolve(v());
        else if (a === "--out") args.out = resolve(v());
        else if (a === "--keep") args.keep = true;
        else throw new Error(`unknown argument ${a}`);
    }
    if (!args.kf || args.tests.length === 0) {
        throw new Error("usage: --kf <keyframes.js repo> --test <file> [--test ...]");
    }
    return args;
};

const sh = (cmd, argv, opts = {}) =>
    execFileSync(cmd, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });

/** Fetch the registry tarball for `version`, verify byte identity against the
 *  registry's own shasum, and unpack it. Returns the unpacked `package/` dir. */
const fetchCoordinate = (root, version) => {
    const dir = join(root, `value-${version}`);
    mkdirSync(dir, { recursive: true });
    const tgz = sh("npm", ["pack", `${PKG}@${version}`, "--pack-destination", dir, "--silent"])
        .trim()
        .split("\n")
        .pop();
    const path = join(dir, tgz);
    const local = createHash("sha1").update(readFileSync(path)).digest("hex");
    const registry = sh("npm", ["view", `${PKG}@${version}`, "dist.shasum"]).trim();
    if (local !== registry) {
        throw new Error(`${PKG}@${version}: packed sha1 ${local} != registry ${registry}`);
    }
    sh("tar", ["-xzf", path, "-C", dir]);
    return { version, dir: join(dir, "package"), sha1: local };
};

/** Copy the kf bytes under test into `dest` (never writes the kf repo). */
const copyKf = (kf, source, dest) => {
    mkdirSync(dest, { recursive: true });
    if (source === "worktree") {
        sh("rsync", ["-a", "--exclude", ".git", "--exclude", "node_modules", `${kf}/`, `${dest}/`]);
    } else {
        const tar = spawnSync("git", ["-C", kf, "archive", "--format=tar", source], {
            maxBuffer: 1 << 30,
        });
        if (tar.status !== 0) throw new Error(`git archive ${source}: ${tar.stderr}`);
        const x = spawnSync("tar", ["-x", "-C", dest], { input: tar.stdout });
        if (x.status !== 0) throw new Error(`tar -x: ${x.stderr}`);
    }
    // APFS clone of the installed dependency tree (copy-on-write, metadata cost).
    sh("cp", ["-cR", join(kf, "node_modules"), join(dest, "node_modules")]);
};

/** Replace EVERY installed copy of value.js in `tree` with `coordinate`.
 *  Returns the replaced paths, so the receipt names how many copies moved. */
const installCoordinate = (tree, coordinate) => {
    const found = sh("find", [join(tree, "node_modules"), "-type", "d", "-path", "*/@mkbabb/value.js", "-prune"])
        .trim()
        .split("\n")
        .filter(Boolean);
    if (found.length === 0) throw new Error(`no installed ${PKG} under ${tree}`);
    for (const target of found) {
        rmSync(target, { recursive: true, force: true });
        sh("cp", ["-R", coordinate.dir, target]);
        const v = JSON.parse(readFileSync(join(target, "package.json"), "utf8")).version;
        if (v !== coordinate.version) throw new Error(`${target}: installed ${v}, wanted ${coordinate.version}`);
    }
    return found.map((p) => p.slice(tree.length + 1));
};

/** Run the named test files once, through the guard, and return per-file and
 *  per-test outcomes read off vitest's own JSON reporter (never off stdout). */
const runSuite = (tree, tests, label) => {
    // A cloned cache would carry the OTHER coordinate's transforms.
    for (const cache of [".vite", ".vitest", ".cache"]) {
        rmSync(join(tree, "node_modules", cache), { recursive: true, force: true });
    }
    const report = join(tree, `.attribution-${label}.json`);
    const run = spawnSync(
        GUARD,
        ["--timeout", "20", "--", "npx", "vitest", "run", ...tests,
            "--maxWorkers=2", "--reporter=json", `--outputFile=${report}`],
        { cwd: tree, encoding: "utf8", maxBuffer: 1 << 28, env: { ...process.env, CI: "1" } },
    );
    const files = new Map();
    if (!existsSync(report)) {
        for (const t of tests) {
            files.set(t, { status: "error", tests: new Map(), message: `no report (exit ${run.status}): ${String(run.stderr).slice(-400)}` });
        }
        return { exit: run.status, files };
    }
    const json = JSON.parse(readFileSync(report, "utf8"));
    for (const result of json.testResults ?? []) {
        const rel = tests.find((t) => result.name.endsWith(t)) ?? result.name;
        const cases = new Map();
        for (const a of result.assertionResults ?? []) cases.set(a.fullName, a.status);
        const collected = cases.size > 0;
        files.set(rel, {
            status: !collected && result.status === "failed" ? "collect-failed" : result.status,
            tests: cases,
            message: collected ? undefined : String(result.message ?? "").slice(0, 400),
        });
    }
    for (const t of tests) if (!files.has(t)) files.set(t, { status: "absent", tests: new Map() });
    return { exit: run.status, files };
};

const red = (s) => s === "failed" || s === "collect-failed";
const green = (s) => s === "passed";

const notRun = (s) => s === "skipped" || s === "pending" || s === "todo" || s === "disabled";

const verdict = (atOld, atNew) => {
    if (atOld === undefined || atNew === undefined) return "UNATTRIBUTABLE";
    // Not executed at EITHER coordinate (an env-gated browser oracle, a todo):
    // named, never counted GREEN and never attributed — the harness did not
    // measure it. Not-run at ONE coordinate only is UNATTRIBUTABLE.
    if (notRun(atOld) && notRun(atNew)) return "NOT-RUN";
    if (!red(atOld) && !green(atOld)) return "UNATTRIBUTABLE";
    if (!red(atNew) && !green(atNew)) return "UNATTRIBUTABLE";
    if (green(atOld) && red(atNew)) return "VALUE-SIDE";
    if (red(atOld) && red(atNew)) return "KF-SIDE";
    if (red(atOld) && green(atNew)) return "VALUE-SIDE-CURED";
    return "GREEN";
};

/** Classify every file, and every test id inside it. A file that collects at
 *  one coordinate only is classified at FILE level (its ids do not exist on
 *  both sides, so an id-level verdict would be a guess). */
const classify = (old, next, tests) =>
    tests.map((file) => {
        const o = old.files.get(file);
        const n = next.files.get(file);
        const row = { file, old: o?.status, new: n?.status, verdict: verdict(o?.status, n?.status), tests: [] };
        if (o?.status === "collect-failed" || n?.status === "collect-failed") {
            row.message = { old: o?.message, new: n?.message };
            return row;
        }
        const ids = new Set([...(o?.tests.keys() ?? []), ...(n?.tests.keys() ?? [])]);
        for (const id of ids) {
            const v = verdict(o?.tests.get(id), n?.tests.get(id));
            if (v !== "GREEN") row.tests.push({ id, old: o?.tests.get(id), new: n?.tests.get(id), verdict: v });
        }
        return row;
    });

const main = () => {
    const args = parseArgs(process.argv.slice(2));
    const root = args.scratch ?? mkdtempSync(join(tmpdir(), "kf-attribution-"));
    mkdirSync(root, { recursive: true });
    const head = args.source === "worktree"
        ? sh("git", ["-C", args.kf, "rev-parse", "HEAD"]).trim() + "+worktree"
        : sh("git", ["-C", args.kf, "rev-parse", args.source]).trim();
    try {
        const coords = [fetchCoordinate(root, args.old), fetchCoordinate(root, args.next)];
        const runs = [];
        // SERIAL: one heavy run per seat at a time (machine law).
        for (const c of coords) {
            const tree = join(root, `kf-at-${c.version}`);
            copyKf(args.kf, args.source, tree);
            const replaced = installCoordinate(tree, c);
            const run = runSuite(tree, args.tests, c.version);
            runs.push({ coordinate: c, replaced, run });
        }
        const [old, next] = runs;
        const rows = classify(old.run, next.run, args.tests);
        const receipt = {
            harness: "KF.W3 .a attribution-harness",
            kf: { repo: args.kf, source: args.source, commit: head },
            old: { version: old.coordinate.version, sha1: old.coordinate.sha1, copies: old.replaced, exit: old.run.exit },
            new: { version: next.coordinate.version, sha1: next.coordinate.sha1, copies: next.replaced, exit: next.run.exit },
            rows,
            summary: rows.reduce((acc, r) => ((acc[r.verdict] = (acc[r.verdict] ?? 0) + 1), acc), {}),
        };
        const text = JSON.stringify(receipt, null, 2);
        if (args.out) writeFileSync(args.out, text + "\n");
        process.stdout.write(text + "\n");
        // Exit code is the classification, so a seat can gate on it:
        // 0 = no VALUE-SIDE/KF-SIDE/UNATTRIBUTABLE row; 1 = some RED attributed; 2 = unattributable.
        const verdicts = rows.flatMap((r) => [r.verdict, ...r.tests.map((t) => t.verdict)]);
        process.exitCode = verdicts.includes("UNATTRIBUTABLE")
            ? 2
            : verdicts.some((v) => v === "VALUE-SIDE" || v === "KF-SIDE")
              ? 1
              : 0;
    } finally {
        if (!args.keep) rmSync(root, { recursive: true, force: true });
    }
};

main();
