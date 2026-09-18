#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";

const tool = resolve(new URL("deletion-truth.mjs", import.meta.url).pathname);
const directory = realpathSync(mkdtempSync(join(tmpdir(), "vnext-deletion-truth-")));
const repository = join(directory, "repository");
const evidence = join(directory, "evidence");
const failures = [];
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const clone = (value) => structuredClone(value);

function git(args) {
    const result = spawnSync("git", ["-C", repository, ...args], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${result.stderr}`);
    return result.stdout;
}

function run(args) {
    return spawnSync(process.execPath, [tool, ...args], { encoding: "utf8" });
}

function expectRejected(name, args, fragment) {
    const result = run(args);
    if (result.status === 0 || !result.stderr.includes(fragment)) {
        failures.push(`${name} was not rejected with ${JSON.stringify(fragment)}; status=${result.status}; stderr=${result.stderr}`);
    }
}

function read(path) {
    return parseJsonStrict(readFileSync(path));
}

function finalizeSnapshot(value) {
    value.files_sha256 = sha256(canonicalize(value.files));
    const preimage = clone(value);
    delete preimage.snapshot_hash;
    value.snapshot_hash = sha256(canonicalize(preimage));
    return value;
}

function finalizeReceipt(value) {
    const vector = {
        deleted_paths: value.deleted_paths,
        added_paths: value.added_paths,
        modified_paths: value.modified_paths,
        unchanged_paths: value.unchanged_paths,
    };
    value.delta_sha256 = sha256(canonicalize(vector));
    const preimage = clone(value);
    delete preimage.receipt_hash;
    value.receipt_hash = sha256(canonicalize(preimage));
    return value;
}

function writeCanonical(path, value) {
    writeFileSync(path, `${canonicalize(value)}\n`);
}

try {
    mkdirSync(repository);
    mkdirSync(evidence);
    git(["init", "-b", "main"]);
    git(["config", "user.name", "Deletion Selftest"]);
    git(["config", "user.email", "deletion-selftest@example.invalid"]);
    writeFileSync(join(repository, "keep.ts"), "export const keep = true;\n");
    writeFileSync(join(repository, "delete.ts"), "export const remove = true;\n");
    writeFileSync(join(repository, "modify.ts"), "export const version = 1;\n");
    git(["add", "."]);
    git(["commit", "-m", "baseline"]);

    const beforePath = join(evidence, "before.json");
    const beforeRun = run(["snapshot", "--phase", "before", "--repository", repository, "--output", beforePath]);
    if (beforeRun.status !== 0) throw new Error(`valid before snapshot failed: ${beforeRun.stderr}`);

    rmSync(join(repository, "delete.ts"));
    writeFileSync(join(repository, "modify.ts"), "export const version = 2;\n");
    writeFileSync(join(repository, "add.ts"), "export const added = true;\n");
    git(["add", "-A"]);
    git(["commit", "-m", "apply exact tree delta"]);

    const afterPath = join(evidence, "after.json");
    const afterRun = run(["snapshot", "--phase", "after", "--repository", repository, "--output", afterPath]);
    if (afterRun.status !== 0) throw new Error(`valid after snapshot failed: ${afterRun.stderr}`);

    const receiptPath = join(evidence, "receipt.json");
    const deltaRun = run(["delta", "--before", beforePath, "--after", afterPath, "--output", receiptPath]);
    if (deltaRun.status !== 0) {
        failures.push(`valid deletion delta failed: ${deltaRun.stderr}`);
    } else {
        const receipt = read(receiptPath);
        if (canonicalize(receipt.deleted_paths) !== canonicalize(["delete.ts"])) failures.push("valid receipt did not prove the exact deletion");
        if (canonicalize(receipt.added_paths) !== canonicalize(["add.ts"])) failures.push("valid receipt did not prove the exact addition");
        if (canonicalize(receipt.modified_paths) !== canonicalize(["modify.ts"])) failures.push("valid receipt did not prove the exact modification");
        if (canonicalize(receipt.unchanged_paths) !== canonicalize(["keep.ts"])) failures.push("valid receipt did not prove the unchanged complement");
        if (receipt.counts.before !== 3 || receipt.counts.after !== 3) failures.push("valid receipt has incorrect tree cardinality");
    }
    const verifyRun = run(["verify", "--receipt", receiptPath]);
    if (verifyRun.status !== 0) failures.push(`valid receipt verification failed: ${verifyRun.stderr}`);

    const before = read(beforePath);
    const after = read(afterPath);
    const receipt = read(receiptPath);

    const changedBefore = clone(before);
    changedBefore.files.find((item) => item.path === "delete.ts").sha256 = "0".repeat(64);
    const changedBeforePath = join(evidence, "changed-before.json");
    writeCanonical(changedBeforePath, finalizeSnapshot(changedBefore));
    expectRejected(
        "changed before snapshot",
        ["delta", "--before", changedBeforePath, "--after", afterPath, "--output", join(evidence, "changed-before-receipt.json")],
        "before snapshot changed or does not equal its clean Git tree",
    );

    const traversalAfter = clone(after);
    traversalAfter.files.push({ path: "../escape.ts", mode: "100644", bytes: 1, sha256: "0".repeat(64) });
    traversalAfter.files.sort((left, right) => compareCanonicalText(left.path, right.path));
    const traversalAfterPath = join(evidence, "traversal-after.json");
    writeCanonical(traversalAfterPath, finalizeSnapshot(traversalAfter));
    expectRejected(
        "path traversal snapshot",
        ["delta", "--before", beforePath, "--after", traversalAfterPath, "--output", join(evidence, "traversal-receipt.json")],
        "schema failure",
    );

    const duplicateAfter = clone(after);
    duplicateAfter.files.push(clone(duplicateAfter.files[0]));
    duplicateAfter.files.sort((left, right) => compareCanonicalText(left.path, right.path));
    const duplicateAfterPath = join(evidence, "duplicate-after.json");
    writeCanonical(duplicateAfterPath, finalizeSnapshot(duplicateAfter));
    expectRejected(
        "duplicate snapshot path",
        ["delta", "--before", beforePath, "--after", duplicateAfterPath, "--output", join(evidence, "duplicate-receipt.json")],
        "duplicate path",
    );

    const omittedDeletion = clone(receipt);
    omittedDeletion.deleted_paths = [];
    omittedDeletion.counts.deleted = 0;
    const omittedReceiptPath = join(evidence, "omitted-deletion.json");
    writeCanonical(omittedReceiptPath, finalizeReceipt(omittedDeletion));
    expectRejected("omitted deletion", ["verify", "--receipt", omittedReceiptPath], "does not equal the executable Git delta");

    const inventedDeletion = clone(receipt);
    inventedDeletion.deleted_paths = ["delete.ts", "invented.ts"];
    inventedDeletion.counts.deleted = 2;
    const inventedReceiptPath = join(evidence, "invented-deletion.json");
    writeCanonical(inventedReceiptPath, finalizeReceipt(inventedDeletion));
    expectRejected("invented deletion", ["verify", "--receipt", inventedReceiptPath], "does not equal the executable Git delta");

    const forgedTool = clone(after);
    forgedTool.tool_sha256 = "0".repeat(64);
    const forgedToolPath = join(evidence, "forged-tool.json");
    writeCanonical(forgedToolPath, finalizeSnapshot(forgedTool));
    expectRejected(
        "forged tool identity",
        ["delta", "--before", beforePath, "--after", forgedToolPath, "--output", join(evidence, "forged-tool-receipt.json")],
        "tool hash does not match",
    );

    const forgedHead = clone(after);
    forgedHead.repository.head = "0".repeat(40);
    const forgedHeadPath = join(evidence, "forged-head.json");
    writeCanonical(forgedHeadPath, finalizeSnapshot(forgedHead));
    expectRejected(
        "forged after HEAD",
        ["delta", "--before", beforePath, "--after", forgedHeadPath, "--output", join(evidence, "forged-head-receipt.json")],
        "live repository head changed after the after snapshot",
    );

    const snapshotLinkPath = join(evidence, "after-link.json");
    symlinkSync(afterPath, snapshotLinkPath);
    expectRejected(
        "snapshot evidence symlink",
        ["delta", "--before", beforePath, "--after", snapshotLinkPath, "--output", join(evidence, "linked-snapshot-receipt.json")],
        "must not be a symlink",
    );
    rmSync(snapshotLinkPath);

    const badReceiptHash = clone(receipt);
    badReceiptHash.receipt_hash = "0".repeat(64);
    const badReceiptHashPath = join(evidence, "bad-receipt-hash.json");
    writeCanonical(badReceiptHashPath, badReceiptHash);
    expectRejected("bad receipt hash", ["verify", "--receipt", badReceiptHashPath], "receipt self-hash");

    writeFileSync(join(repository, "keep.ts"), "drifted after snapshot\n");
    expectRejected(
        "after-state drift",
        ["delta", "--before", beforePath, "--after", afterPath, "--output", join(evidence, "drift-receipt.json")],
        "drifted",
    );
    writeFileSync(join(repository, "keep.ts"), "export const keep = true;\n");

    const symlink = join(repository, "link.ts");
    symlinkSync(join(repository, "keep.ts"), symlink);
    expectRejected(
        "working-tree symlink",
        ["snapshot", "--phase", "after", "--repository", repository, "--output", join(evidence, "symlink-after.json")],
        "forbidden symlink",
    );
    rmSync(symlink);

    writeFileSync(join(repository, "keep.ts"), "unclean before probe\n");
    expectRejected(
        "unclean before snapshot",
        ["snapshot", "--phase", "before", "--repository", repository, "--output", join(evidence, "unclean-before.json")],
        "requires a clean Git working tree",
    );
    writeFileSync(join(repository, "keep.ts"), "export const keep = true;\n");

    expectRejected(
        "output inside repository",
        ["snapshot", "--phase", "after", "--repository", repository, "--output", join(repository, "inside.json")],
        "output must be outside",
    );

    const repositoryLink = join(directory, "repository-link");
    symlinkSync(repository, repositoryLink);
    expectRejected(
        "repository symlink",
        ["snapshot", "--phase", "after", "--repository", repositoryLink, "--output", join(evidence, "linked-repo.json")],
        "may not be a symlink",
    );

    const duplicateJsonPath = join(evidence, "duplicate-json.json");
    writeFileSync(duplicateJsonPath, '{"schema":"vnext-deletion-delta-receipt/1","schema":"vnext-deletion-delta-receipt/1"}\n');
    expectRejected("duplicate JSON key", ["verify", "--receipt", duplicateJsonPath], "duplicate object key");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-deletion-truth-selftest/1",
    valid_snapshots: 2,
    valid_delta_receipts: 1,
    valid_verifications: 1,
    adversarial_rejections: 15,
})}\n`);
