#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { compareCanonicalText, canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { loadValueTargetOwnerReturn, mergeAuthorizationClosure } from "./value-target-owner-return.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const canonicalFormationTarget = realpathSync(resolve(root, "VALUE-TARGET-PATHS.json"));
let resolutionsPath;
let consumerCaptureAuthorityArgs;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--resolutions" && process.argv[index + 1]) resolutionsPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--consumer-immutable-capture-authority"
        && process.argv[index + 1] && process.argv[index + 2] && process.argv[index + 3]
        && consumerCaptureAuthorityArgs === undefined) {
        consumerCaptureAuthorityArgs = process.argv.slice(index, index + 4);
        index += 3;
    }
    else {
        process.stderr.write("usage: node validate-value-target-resolutions.mjs --resolutions <path> [--consumer-immutable-capture-authority <path> <file-sha256> <authority-hash>]\n");
        process.exit(2);
    }
}
if (!resolutionsPath) {
    process.stderr.write("usage: node validate-value-target-resolutions.mjs --resolutions <path> [--consumer-immutable-capture-authority <path> <file-sha256> <authority-hash>]\n");
    process.exit(2);
}

const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fileHash = (path) => sha256(readFileSync(path));

function checkedCanonicalFile(path, pointer) {
    if (!path || !existsSync(path)) {
        fail(`${pointer}: missing file`);
        return false;
    }
    const metadata = lstatSync(path);
    if (!metadata.isFile() || metadata.isSymbolicLink() || realpathSync(path) !== path) {
        fail(`${pointer}: canonical regular non-symlink file required`);
        return false;
    }
    return true;
}

let manifest;
try {
    if (checkedCanonicalFile(resolutionsPath, "/resolutions")) manifest = parseJsonStrict(readFileSync(resolutionsPath));
    const schema = parseJsonStrict(readFileSync(resolve(root, "value-target-resolutions.schema.json")));
    if (manifest) failures.push(...validateJsonSchema(manifest, schema));
} catch (error) {
    fail(`/resolutions: ${error.message}`);
}

let formation;
const authorizationIdentities = new Map();
if (manifest) {
    const preimage = structuredClone(manifest);
    delete preimage.manifest_hash;
    const computed = sha256(canonicalize(preimage));
    if (manifest.manifest_hash !== computed) fail(`/manifest_hash: computed ${computed}`);
    const binding = manifest.formation_target;
    if (binding?.path !== canonicalFormationTarget) fail(`/formation_target/path: expected canonical ${canonicalFormationTarget}`);
    if (checkedCanonicalFile(binding?.path, "/formation_target/path")) {
        const actualFileHash = fileHash(binding.path);
        if (binding.file_sha256 !== actualFileHash) fail(`/formation_target/file_sha256: computed ${actualFileHash}`);
        try {
            formation = parseJsonStrict(readFileSync(binding.path));
            const targetPreimage = structuredClone(formation);
            delete targetPreimage.manifest_sha256;
            const targetHash = sha256(canonicalize(targetPreimage));
            if (formation.manifest_sha256 !== targetHash || binding.manifest_hash !== targetHash) {
                fail(`/formation_target/manifest_hash: computed ${targetHash}`);
            }
            if (formation.authority?.library?.topology !== "conditional-branch-family") {
                fail(`/formation_target: immutable formation branch-family authority required`);
            }
        } catch (error) {
            fail(`/formation_target: strict JSON parse failed: ${error.message}`);
        }
    }
}

if (manifest && formation) {
    const expected = (formation.library?.conditional_paths ?? [])
        .map(({ source, test, owner }) => ({ source, test, owner }))
        .sort((left, right) => compareCanonicalText(left.source, right.source));
    const rows = manifest.rows ?? [];
    for (const [index, row] of rows.entries()) {
        if (row.owner === "V29T") fail(`/rows/${index}/owner: V29T cannot own semantic target decisions`);
    }
    const projection = rows.map(({ source, test, owner }) => ({ source, test, owner }));
    if (rows.length !== 4 || canonicalize(projection) !== canonicalize(expected)) {
        fail(`/rows: must equal the exact four sorted immutable formation conditional pairs`);
    }
    const keys = rows.map(({ source }) => source);
    if (new Set(keys).size !== keys.length || canonicalize(keys) !== canonicalize([...keys].sort())) {
        fail(`/rows: conditional sources must be unique and canonically ordered`);
    }
    if (failures.length === 0) {
        const ownerCache = new Map();
        for (const [index, row] of rows.entries()) {
            const pointer = `/rows/${index}`;
            const owner = loadValueTargetOwnerReturn(
                { wave_id: row.owner, return: row.return },
                pointer,
                fail,
                ownerCache,
                consumerCaptureAuthorityArgs ? { consumerCaptureAuthorityArgs } : undefined,
            );
            if (!owner) continue;
            if (owner.decision_authorized !== true) fail(`${pointer}/return: typed owner helper did not authorize decisions`);
            mergeAuthorizationClosure(owner, authorizationIdentities, pointer, fail);
            if (owner.returned.status !== row.outcome) fail(`${pointer}/outcome: must equal owner return status ${owner.returned.status}`);
            const decision = owner.decisions.get(row.decision_id);
            if (!decision) {
                fail(`${pointer}/decision_id: owner annex has no such decision`);
                continue;
            }
            if (decision.decision_hash !== row.decision_hash) fail(`${pointer}/decision_hash: does not bind owner annex`);
            const expectedDecision = {
                decision_id: row.decision_id,
                kind: "conditional-pair",
                source: row.source,
                test: row.test,
                outcome: row.outcome,
                decision_hash: row.decision_hash,
            };
            if (canonicalize(decision) !== canonicalize(expectedDecision)) {
                fail(`${pointer}: must exactly project the owner's conditional-pair decision`);
            }
        }
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

const receipt = {
    schema: "vnext-value-target-resolutions-validation/1",
    resolutions_path: resolutionsPath,
    resolutions_file_sha256: fileHash(resolutionsPath),
    manifest_hash: manifest.manifest_hash,
    formation_target_hash: manifest.formation_target.manifest_hash,
    outcomes: Object.fromEntries(manifest.rows.map(({ source, outcome }) => [source, outcome])),
    authorization_identities: [...authorizationIdentities.values()]
        .sort((left, right) => compareCanonicalText(left.wave_id, right.wave_id)),
};
receipt.receipt_hash = sha256(canonicalize(receipt));
process.stdout.write(`${JSON.stringify(receipt)}\n`);
