import { buildPayload as buildV2Payload, payloadDigest } from "../occurrence-owner-v2/build.mjs";

export function buildPayload(args) {
    const payload = buildV2Payload(args);
    return {
        ...payload,
        schema_version: "value.pi.full-source-occurrence-owner-formation/v3",
        authority: { ...payload.authority, audit_credit: 0 },
        withdrawn_v2_input: {
            authority: "WITHDRAWN_PRE_CHALLENGE_DETERMINISTIC_REPLAY_DEFECT_ONLY",
            rejection_receipt: args.withdrawnV2Identity,
            subject: {
                repo_relative_path: "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v2.json",
                bytes: 69589449,
                sha256: "005a79b0e6d407e50baa15c3b6081499326f237705b4f4c711bcf0dfc10e12d5",
                payload_sha256: "5e00b2c182db7e695392e8ed185e1453ec7de6ccca88d17f3298fc6dda7e2720",
            },
            replay_defect: "v2 serialized the live --output argument inside replay.command; identical inputs at another output path changed artifact bytes",
            semantic_or_owner_statuses_carried_forward: 0,
            denominator_or_parser_credit_carried_forward: 0,
        },
        blockers: payload.blockers.map((blocker) => blocker.replace("this exact v2 artifact hash", "this exact v3 artifact hash")),
    };
}

export { payloadDigest };
