#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { fileSha256, hashWithout, readStrictJson, same, sha256 } from "./keyframes-contract.mjs";
import {
    keyframesAuthorityProjection,
    mergeKeyframesAuthorityNodes,
    validateHistoricalKeyframesReturn,
    validateKeyframesTransposeUniversalInterface,
} from "./keyframes-proof-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validatorPath = resolve(root, "tools/validate-keyframes-public-package.mjs");
const receiptSchemaPath = resolve(root, "keyframes-public-package-validation.schema.json");
let receiptPath;
let snapshotPath;
let returnPath;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--receipt" && process.argv[index + 1]) receiptPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--snapshot" && process.argv[index + 1]) snapshotPath = resolve(process.argv[++index]);
    else if (process.argv[index] === "--return" && process.argv[index + 1]) returnPath = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node validate-keyframes-public-package-proof.mjs (--receipt <path> --snapshot <path> | --return <K23-return>)\n");
        process.exit(2);
    }
}
if ((!returnPath && (!receiptPath || !snapshotPath)) || (returnPath && (receiptPath || snapshotPath))) {
    process.stderr.write("usage: node validate-keyframes-public-package-proof.mjs (--receipt <path> --snapshot <path> | --return <K23-return>)\n");
    process.exit(2);
}

try {
    let packageAuthority;
    let sourceAuthority;
    if (returnPath) {
        const record = readStrictJson(returnPath, "/return");
        packageAuthority = validateHistoricalKeyframesReturn({
            path: returnPath,
            file_sha256: fileSha256(returnPath),
            return_hash: record.return_hash,
        }, "K23", undefined, "historical-certificate");
        if (record.wave_id !== "K23" || record.status !== "COMPLETE"
            || record.return_hash !== hashWithout(record, "return_hash")) {
            throw new Error(`exact COMPLETE self-hashed K23 return required`);
        }
        const annex = record.annexes?.["keyframes-public-package"];
        const manifest = readStrictJson(annex?.manifest?.path, "/return/annexes/keyframes-public-package/manifest");
        if (annex.manifest.file_sha256 !== fileSha256(annex.manifest.path)
            || annex.manifest.manifest_hash !== manifest.manifest_hash
            || manifest.manifest_hash !== hashWithout(manifest, "manifest_hash")) {
            throw new Error(`K23 return must bind the exact self-hashed package manifest`);
        }
        const dependencies = (record.scope?.dependency_returns ?? []).filter(({ wave_id }) => wave_id === "K22T");
        const sourceReturn = manifest.source_transpose_validation?.return;
        const expectedSource = dependencies.length === 1 && {
            path: dependencies[0].path,
            file_sha256: dependencies[0].file_sha256,
            return_hash: dependencies[0].return_hash,
        };
        if (!expectedSource || !same(sourceReturn, expectedSource) || !same(annex.source_transpose_return, expectedSource)) {
            throw new Error(`K23 manifest and annex must equal the unique K22T dependency return`);
        }
        sourceAuthority = validateHistoricalKeyframesReturn(dependencies[0], "K22T", "K23", "historical-certificate");
        receiptPath = annex.validation_receipt?.path;
        const boundReceipt = readStrictJson(receiptPath, "/return/annexes/keyframes-public-package/validation_receipt");
        if (annex.validation_receipt.file_sha256 !== fileSha256(receiptPath)
            || annex.validation_receipt.receipt_hash !== boundReceipt.receipt_hash) {
            throw new Error(`K23 return must bind the exact package replay receipt`);
        }
        snapshotPath = boundReceipt.snapshot?.path;
        const transpose = sourceAuthority.returned.annexes?.["keyframes-target-transpose"];
        validateKeyframesTransposeUniversalInterface(
            sourceAuthority.returned,
            transpose,
            transpose?.validation_receipt?.path,
            sourceReturn.path,
        );
    }
    const persisted = readStrictJson(receiptPath, "/receipt");
    const schema = readStrictJson(receiptSchemaPath, "/receipt-schema");
    const schemaFailures = validateJsonSchema(persisted, schema);
    if (schemaFailures.length) throw new Error(`receipt schema failure:\n${schemaFailures.join("\n")}`);
    const semantic = structuredClone(persisted);
    delete semantic.semantic_hash;
    delete semantic.receipt_hash;
    const semanticHash = sha256(canonicalize(semantic));
    if (persisted.semantic_hash !== semanticHash) throw new Error(`receipt semantic hash ${persisted.semantic_hash}; expected ${semanticHash}`);
    const receiptHash = hashWithout(persisted, "receipt_hash");
    if (persisted.receipt_hash !== receiptHash) throw new Error(`receipt hash ${persisted.receipt_hash}; expected ${receiptHash}`);
    if (persisted.source_transpose_validation.historical_certificate.return_hash
        !== persisted.source_transpose_validation.return_hash) {
        throw new Error(`package receipt historical K22T certificate does not bind its exact source return`);
    }
    const snapshot = readStrictJson(snapshotPath, "/snapshot");
    const expectedSnapshot = { path: snapshotPath, file_sha256: fileSha256(snapshotPath), snapshot_hash: snapshot.snapshot_hash };
    if (!same(persisted.snapshot, expectedSnapshot)) throw new Error(`receipt snapshot binding differs from the exact replay artifact`);
    const replay = spawnSync(process.execPath, [validatorPath, "--snapshot", snapshotPath], {
        encoding: "utf8",
        maxBuffer: 256 * 1024 * 1024,
    });
    if (replay.status !== 0) throw new Error(`immutable package replay failed: ${(replay.stderr || replay.stdout).trim()}`);
    const replayed = parseJsonStrict(replay.stdout.trim());
    if (!same(replayed, persisted)) throw new Error(`persisted package receipt differs from immutable semantic replay`);
    if (!same(persisted.source_transpose_validation.owner_authorization, replayed.source_transpose_validation.owner_authorization)) {
        throw new Error(`package receipt source authorization differs from immutable replay`);
    }
    if (packageAuthority && sourceAuthority) {
        const identities = new Map();
        mergeKeyframesAuthorityNodes(identities, [packageAuthority.node, sourceAuthority.node], "K23 artifact edge");
        mergeKeyframesAuthorityNodes(
            identities,
            persisted.source_transpose_validation.owner_authorization.nodes,
            "K22T source owner authorization",
        );
        const merged = keyframesAuthorityProjection(identities);
        if (!merged.nodes.some(({ wave_id }) => wave_id === "K23")
            || !merged.nodes.some(({ wave_id }) => wave_id === "K22T")) {
            throw new Error(`K23/K22T artifact identities are absent from the merged source authority`);
        }
    }
    process.stdout.write(`${JSON.stringify(persisted)}\n`);
} catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
}
