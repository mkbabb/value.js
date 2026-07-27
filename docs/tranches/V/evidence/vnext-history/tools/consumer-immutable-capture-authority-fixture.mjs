import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { canonicalize, compareCanonicalText } from "./json-contract.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function exactCapture(resolved) {
    const receiptPath = resolved?.receiptPath;
    const immutableCapture = resolved?.immutableCapture;
    const snapshotIndex = resolved?.snapshotIndex;
    if (typeof receiptPath !== "string" || resolve(receiptPath) !== receiptPath
        || !immutableCapture || typeof immutableCapture !== "object"
        || !snapshotIndex || typeof snapshotIndex !== "object") {
        throw new Error("consumer capture authority fixture requires a resolved receipt, immutable capture, and snapshot index");
    }
    return {
        receiptPath,
        immutableCapture: structuredClone(immutableCapture),
        snapshotIndex: structuredClone(snapshotIndex),
    };
}

export function consumerCaptureEvidenceInputs(resolved, purpose = "consumer-universe deletion evidence") {
    const { immutableCapture, snapshotIndex } = exactCapture(resolved);
    return [
        {
            path: snapshotIndex.path,
            sha256: snapshotIndex.file_sha256,
            purpose: `${purpose} root snapshot index`,
            class: "generated",
        },
        {
            path: immutableCapture.path,
            sha256: immutableCapture.file_sha256,
            purpose: `${purpose} immutable capture certificate`,
            class: "generated",
        },
    ];
}

export function createConsumerImmutableCaptureAuthorityFixture({ fixtureRoot, filename = "consumer-immutable-capture-authority.json" }) {
    const root = realpathSync(fixtureRoot);
    const authorityPath = resolve(root, filename);
    const captures = new Map();

    const writeAuthority = () => {
        const authority = {
            schema: "vnext-consumer-universe-immutable-capture-authority/1",
            captures: [...captures.entries()]
                .map(([receipt_path, immutable_capture]) => ({ receipt_path, immutable_capture }))
                .sort((left, right) => compareCanonicalText(left.receipt_path, right.receipt_path)),
            authority_hash: "",
        };
        const preimage = structuredClone(authority);
        delete preimage.authority_hash;
        authority.authority_hash = sha256(canonicalize(preimage));
        mkdirSync(dirname(authorityPath), { recursive: true });
        writeFileSync(authorityPath, `${canonicalize(authority)}\n`);
        const path = realpathSync(authorityPath);
        return {
            authority,
            path,
            file_sha256: sha256(readFileSync(path)),
            authority_hash: authority.authority_hash,
        };
    };

    return {
        registerCapture(receiptPath, immutableCapture) {
            return this.register({ receiptPath, immutableCapture });
        },
        register(resolved) {
            const receiptPath = resolved?.receiptPath;
            const immutableCapture = resolved?.immutableCapture;
            if (typeof receiptPath !== "string" || resolve(receiptPath) !== receiptPath
                || !immutableCapture || typeof immutableCapture !== "object") {
                throw new Error("consumer capture authority fixture registration requires an absolute receipt path and immutable capture");
            }
            const prior = captures.get(receiptPath);
            if (prior && canonicalize(prior) !== canonicalize(immutableCapture)) {
                throw new Error(`consumer capture authority fixture has conflicting captures for ${receiptPath}`);
            }
            captures.set(receiptPath, immutableCapture);
            writeAuthority();
            return resolved;
        },
        captureAuthorityArgs() {
            const binding = writeAuthority();
            return [
                "--consumer-immutable-capture-authority",
                binding.path,
                binding.file_sha256,
                binding.authority_hash,
            ];
        },
        evidenceInputs(resolved, purpose) {
            return consumerCaptureEvidenceInputs(resolved, purpose);
        },
        binding() {
            return writeAuthority();
        },
    };
}
