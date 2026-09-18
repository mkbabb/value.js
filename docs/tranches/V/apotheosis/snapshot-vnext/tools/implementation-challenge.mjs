import { createHash } from "node:crypto";

import { compareCanonicalText, canonicalize } from "./json-contract.mjs";

const sha256 = (value) => createHash("sha256").update(canonicalize(value), "utf8").digest("hex");

export function implementationSemanticSubject(record) {
    const typedAnnexes = Object.fromEntries(
        Object.entries(record.annexes ?? {})
            .filter(([name]) => name !== "implementation-challenge")
            .sort(([left], [right]) => compareCanonicalText(left, right)),
    );
    return {
        schema: "vnext-implementation-semantic-subject/1",
        wave_id: record.wave_id,
        status: record.status,
        delivery: record.delivery,
        terminal_disposition: record.terminal_disposition,
        routed_remainder: record.routed_remainder,
        verdict: record.verdict,
        typed_annexes: typedAnnexes,
    };
}

export function implementationSemanticSubjectSha256(record) {
    return sha256(implementationSemanticSubject(record));
}

export function implementationChallengeSha256(challenge) {
    return sha256(challenge);
}

export function implementationGateContract(gates) {
    return gates.map((gate) => ({
        id: gate.id,
        kind: gate.kind,
        command_or_probe: gate.command_or_probe,
        expected: gate.expected,
    }));
}

export function sealGateReceiptChallenge(receipt, challenge) {
    receipt.schema = "vnext-gate-receipt/3";
    receipt.challenge_sha256 = implementationChallengeSha256(challenge);
    delete receipt.receipt_hash;
    receipt.receipt_hash = sha256(receipt);
    return receipt;
}
