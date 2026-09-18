#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    symlinkSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { consumerFixtureRootIds } from "./consumer-universe-fixture.mjs";
import { createValueTargetResolutionFixture } from "./value-target-resolution-fixture.mjs";
import { valueTargetDecisionHash } from "./value-target-owner-return.mjs";

const validatorPath = realpathSync(new URL("validate-value-target-resolutions.mjs", import.meta.url).pathname);
const formationTargetPath = realpathSync(new URL("../VALUE-TARGET-PATHS.json", import.meta.url).pathname);
const fixtureRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-value-target-resolutions-")));
const ownerWaves = ["V16B", "V18H", "V18V", "V24"];
const failures = [];
let positives = 0;
let projectedCombinations = 0;
let adversarialRejections = 0;
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
let fixture;

function writeJson(path, value) {
    writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function finalize(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    value[member] = sha256(canonicalize(preimage));
    return value;
}

function invoke(path) {
    return spawnSync(process.execPath, [
        validatorPath,
        "--resolutions", path,
        ...(fixture?.captureAuthorityArgs() ?? []),
    ], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
}

function expectPass(name, path) {
    const result = invoke(path);
    if (result.status !== 0) failures.push(`${name} was rejected:\n${result.stderr || result.stdout}`);
    else positives += 1;
}

function expectRejected(name, path, fragment) {
    const result = invoke(path);
    const output = `${result.stderr || ""}${result.stdout || ""}`;
    if (result.status === 0 || !output.includes(fragment)) {
        failures.push(`${name} was not rejected by ${JSON.stringify(fragment)}:\n${output}`);
    } else {
        adversarialRejections += 1;
    }
}

try {
    fixture = createValueTargetResolutionFixture({ tempRoot: fixtureRoot, formationTargetPath });
    const consumerRoots = fixture.consumer.receipt.roots;
    const expectedConsumerIds = consumerFixtureRootIds;
    if (canonicalize(consumerRoots.map(({ id }) => id)) !== canonicalize(expectedConsumerIds)
        || consumerRoots.some(({ status }) => status !== "included")
        || fixture.consumer.receipt.counts.roots !== consumerFixtureRootIds.length
        || fixture.consumer.receipt.counts.edges !== 0
        || fixture.consumer.containmentPreflight !== true) {
        failures.push("resolution fixture did not produce the exact contained fifteen-root real-Git consumer epoch");
    }
    let baseline;
    const liveMasks = new Set([0]);
    for (let mask = 0; mask < 16; mask += 1) {
        const outcomes = Object.fromEntries(ownerWaves.map((waveId, index) => [
            waveId,
            mask & (1 << index) ? "PRUNE" : "KEEP",
        ]));
        const artifact = fixture.writeResolutions(outcomes, `combination-${mask.toString(2).padStart(4, "0")}`);
        if (mask === 0) baseline = artifact.manifest;
        const projected = Object.fromEntries(artifact.manifest.rows.map(({ owner, outcome }) => [owner, outcome]));
        if (canonicalize(projected) !== canonicalize(outcomes)) {
            failures.push(`KEEP/PRUNE combination ${mask} has a wrong pure owner/outcome projection`);
        } else projectedCombinations += 1;
        if (liveMasks.has(mask)) expectPass(`KEEP/PRUNE combination ${mask}`, artifact.path);
    }

    function mutant(name, mutate, { rehash = true } = {}) {
        const value = structuredClone(baseline);
        mutate(value);
        if (rehash) finalize(value, "manifest_hash");
        const path = join(fixtureRoot, `mutant-${name}.json`);
        writeJson(path, value);
        return realpathSync(path);
    }

    expectRejected("missing conditional row", mutant("missing-row", (value) => value.rows.pop()), "/rows: must equal");
    expectRejected("duplicate fifth row", mutant("duplicate-row", (value) => value.rows.push(structuredClone(value.rows[0]))), "/rows: must equal");
    expectRejected("reordered rows", mutant("reordered-rows", (value) => value.rows.reverse()), "/rows: must equal");
    expectRejected("wrong pair owner", mutant("wrong-owner", (value) => { value.rows[0].owner = "V18H"; }), "/rows: must equal");
    expectRejected("transpose self-ownership", mutant("v29t-owner", (value) => { value.rows[0].owner = "V29T"; }), "V29T cannot own semantic target decisions");
    expectRejected("outcome differs from owner return", mutant("outcome-mismatch", (value) => { value.rows[0].outcome = "PRUNE"; }), "/outcome: must equal owner return status");
    expectRejected("unknown owner decision", mutant("decision-id", (value) => { value.rows[0].decision_id = "conditional-missing"; }), "/decision_id: owner annex has no such decision");
    expectRejected("unbound decision hash", mutant("decision-hash", (value) => { value.rows[0].decision_hash = "0".repeat(64); }), "/decision_hash: does not bind owner annex");
    expectRejected("owner return file hash drift", mutant("return-file-hash", (value) => { value.rows[0].return.file_sha256 = "0".repeat(64); }), "/return/file_sha256");
    expectRejected("owner return self-hash drift", mutant("return-hash", (value) => { value.rows[0].return.return_hash = "0".repeat(64); }), "/return/return_hash");
    expectRejected("formation file hash drift", mutant("formation-file-hash", (value) => { value.formation_target.file_sha256 = "0".repeat(64); }), "/formation_target/file_sha256");
    expectRejected("formation contract hash drift", mutant("formation-contract-hash", (value) => { value.formation_target.manifest_hash = "0".repeat(64); }), "/formation_target/manifest_hash");
    expectRejected("resolution self-hash drift", mutant("self-hash", (value) => { value.wave_id = "V24"; }, { rehash: false }), "/manifest_hash");
    expectRejected("unknown manifest member", mutant("unknown-member", (value) => { value.unexpected = true; }), "/unexpected: additional property forbidden");

    const formationCopyPath = join(fixtureRoot, "formation-copy.json");
    writeFileSync(formationCopyPath, readFileSync(formationTargetPath));
    expectRejected("noncanonical formation authority", mutant("formation-copy", (value) => {
        value.formation_target.path = realpathSync(formationCopyPath);
        value.formation_target.file_sha256 = sha256(readFileSync(formationCopyPath));
    }), "/formation_target/path: expected canonical");

    const symlinkPath = join(fixtureRoot, "owner-return-symlink.json");
    symlinkSync(baseline.rows[0].return.path, symlinkPath);
    expectRejected("noncanonical owner return path", mutant("owner-return-symlink", (value) => {
        value.rows[0].return.path = symlinkPath;
    }), "canonical regular non-symlink owner return required");

    const projectedRow = baseline.rows[0];
    const owner = fixture.ownerReturns.get(projectedRow.owner).get(projectedRow.outcome);
    const driftedReturn = structuredClone(owner.record);
    const driftedDecision = driftedReturn.annexes["value-target-disposition"].decisions[0];
    driftedDecision.source = `${driftedDecision.source}.drift`;
    driftedDecision.decision_hash = valueTargetDecisionHash(driftedReturn.wave_id, driftedDecision);
    finalize(driftedReturn, "return_hash");
    const driftedReturnPath = join(fixtureRoot, "owner-return-projection-drift.json");
    writeJson(driftedReturnPath, driftedReturn);
    expectRejected("owner decision projection drift", mutant("owner-projection", (value) => {
        value.rows[0].decision_hash = driftedDecision.decision_hash;
        value.rows[0].return = {
            path: realpathSync(driftedReturnPath),
            file_sha256: sha256(readFileSync(driftedReturnPath)),
            return_hash: driftedReturn.return_hash,
        };
    }), "must exactly project the owner's conditional-pair decision");
} catch (error) {
    failures.push(error.stack ?? error.message);
} finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-value-target-resolutions-selftest/1",
    positives,
    projected_combinations: projectedCombinations,
    adversarial_rejections: adversarialRejections,
})}\n`);
