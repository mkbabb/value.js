import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));

function argumentsFrom(argv) {
    const result = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (!flag?.startsWith("--") || value === undefined) {
            throw new Error("usage: source-universe.mjs --git-dir <bare-repo> --seed <manifest> [--commit <sha>]");
        }
        result.set(flag.slice(2), value);
    }
    return result;
}

const args = argumentsFrom(process.argv.slice(2));
const gitDirectory = resolve(args.get("git-dir") ?? "");
const seedFile = resolve(args.get("seed") ?? "");
if (gitDirectory.length === 0 || seedFile.length === 0) {
    throw new Error("--git-dir and --seed are required");
}

const seedBytes = readFileSync(seedFile);
const seed = JSON.parse(seedBytes.toString("utf8"));
const commit = args.get("commit") ?? seed.verified_commit;
if (commit !== seed.verified_commit) {
    throw new Error("requested commit differs from the exact seed commit");
}

const git = (parameters, options = {}) => execFileSync(
    "git",
    [`--git-dir=${gitDirectory}`, ...parameters],
    { maxBuffer: 64 * 1024 * 1024, ...options },
);

const commitType = git(["cat-file", "-t", commit], { encoding: "utf8" }).trim();
if (commitType !== "commit") throw new Error(`not a commit: ${commit}`);
const tree = git(["rev-parse", `${commit}^{tree}`], { encoding: "utf8" }).trim();
if (tree !== seed.verified_commit_tree) throw new Error("commit tree differs from seed identity");

const allPaths = git(["ls-tree", "-r", "--name-only", commit], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
const overviewPattern = /^([^/]+)\/(Overview\.bs|Overview\.src\.html|Overview\.html)$/;
const priority = new Map([
    ["Overview.bs", 0],
    ["Overview.src.html", 1],
    ["Overview.html", 2],
]);
const byDirectory = new Map();
for (const path of allPaths) {
    const match = overviewPattern.exec(path);
    if (match === null) continue;
    const [_, directory, name] = match;
    const existing = byDirectory.get(directory);
    if (existing === undefined || priority.get(name) < priority.get(existing.name)) {
        byDirectory.set(directory, { path, name });
    }
}

const seedPaths = new Set(seed.roots.map((root) => root.exact_path));
const selectedPaths = new Set([...byDirectory.values()].map((item) => item.path));
for (const path of seedPaths) {
    if (!selectedPaths.has(path)) {
        throw new Error(`seed root is not the authoritative Overview source for its directory: ${path}`);
    }
}

const sources = [];
for (const [directory, selection] of [...byDirectory.entries()].sort((left, right) => byteSort(left[0], right[0]))) {
    const bytes = git(["show", `${commit}:${selection.path}`]);
    const lsTree = git(["ls-tree", commit, "--", selection.path], { encoding: "utf8" }).trim();
    const blobMatch = /^\d+ blob ([0-9a-f]{40})\t/.exec(lsTree);
    if (blobMatch === null) throw new Error(`cannot resolve blob for ${selection.path}`);
    sources.push({
        directory,
        exact_path: selection.path,
        source_format: selection.name === "Overview.bs"
            ? "bikeshed_source"
            : selection.name === "Overview.src.html"
                ? "legacy_source_html"
                : "generated_or_legacy_html",
        git_blob_oid_sha1: blobMatch[1],
        sha256_raw_source: sha256(bytes),
        raw_source_bytes: bytes.length,
        root_seed_membership: seedPaths.has(selection.path),
        complement_disposition: seedPaths.has(selection.path)
            ? "ROOT_SEED_MEMBER_PENDING_NORMATIVE_CLOSURE"
            : "UNCLASSIFIED_RED",
    });
}

const payload = {
    schema_version: "value.pi.css-source-universe/v1",
    authority_status: "MECHANICAL_UNIVERSE_ONLY_COMPLEMENT_UNCLASSIFIED_RED",
    official_repository: seed.official_repository,
    verified_commit: commit,
    verified_commit_tree: tree,
    seed_manifest_sha256: sha256(seedBytes),
    seed_manifest_content_digest: seed.manifest_content_digest,
    source_selection: "For every top-level directory at the exact commit, choose Overview.bs, else Overview.src.html, else Overview.html.",
    canonical_order: "directory and path values sort by raw UTF-8 bytes; JSON object key order is the source order in this generator; two-space indentation and one trailing LF",
    counts: {
        universe: sources.length,
        seed_members: sources.filter((source) => source.root_seed_membership).length,
        complement_unclassified: sources.filter((source) => !source.root_seed_membership).length,
    },
    sources,
};
const contentDigest = sha256(Buffer.from(JSON.stringify(payload), "utf8"));
const artifact = {
    ...payload,
    content_digest_sha256: contentDigest,
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before the two digest fields are appended",
};
process.stdout.write(`${JSON.stringify(artifact, null, 2)}\n`);
