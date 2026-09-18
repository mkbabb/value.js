#!/usr/bin/env node

import { createHash } from "node:crypto";

import { compareCanonicalText } from "./json-contract.mjs";
import { canonicalCleanPollSource, canonicalCleanStartSource } from "./clean-exec-contract.mjs";

export const cleanCoverage = [
    "api-closure",
    "architecture-dags",
    "consumer-universe",
    "deletion-truth",
    "design-mobile-desktop",
    "gate-soundness",
    "parser-boundary",
    "prompt-seed-bijection",
    "quarantine-safety",
    "return-dependency-closure",
    "state-routing",
    "wave-formation",
];

const protocol = "/Users/mkbabb/Programming/value.js/docs/tranches/V/vnext/FORMATION-CLEAN-PASS-PROTOCOL.md";
const workspace = "/Users/mkbabb/Programming/value.js";
const launchTemplate = canonicalCleanStartSource("<allowlisted command>", workspace).trimEnd();
const pollTemplate = canonicalCleanPollSource(1).trimEnd();
const promptDigestLabel = "Prompt body SHA-256: ";

const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");

function sealPrompt(body) {
    return `${body}\n${promptDigestLabel}${sha256(body)}`;
}

export function cleanPromptSha256(prompt) {
    if (typeof prompt !== "string") throw new Error("clean prompt must be text");
    const marker = `\n${promptDigestLabel}`;
    const index = prompt.lastIndexOf(marker);
    const digest = index < 0 ? "" : prompt.slice(index + marker.length);
    const body = index < 0 ? "" : prompt.slice(0, index);
    if (!/^[0-9a-f]{64}$/.test(digest) || prompt.indexOf(marker) !== index || sha256(body) !== digest) {
        throw new Error("clean prompt body digest is absent or invalid");
    }
    return digest;
}

export function cleanActorTaskName({ pass, role, prompt }) {
    if (![1, 2].includes(pass) || !["critic_a", "critic_b", "adjudicator"].includes(role)) {
        throw new Error("invalid clean actor identity");
    }
    return `vnext_clean_p${pass}_${role}_${cleanPromptSha256(prompt)}`;
}

export function cleanAttestationProjection({
    pass,
    role,
    promptSha256,
    epoch,
    domainResults,
    inputReportSha256 = null,
}) {
    if (![1, 2].includes(pass) || !["critic_a", "critic_b", "adjudicator"].includes(role)
        || !/^[0-9a-f]{64}$/.test(promptSha256 ?? "") || !/^[0-9a-f]{64}$/.test(epoch ?? "")
        || !Array.isArray(domainResults)) {
        throw new Error("invalid clean attestation inputs");
    }
    if (role === "adjudicator") {
        if (!Array.isArray(inputReportSha256) || inputReportSha256.length !== 2
            || new Set(inputReportSha256).size !== 2
            || inputReportSha256.some((digest) => !/^[0-9a-f]{64}$/.test(digest))) {
            throw new Error("invalid clean adjudicator report inputs");
        }
    } else if (inputReportSha256 !== null) {
        throw new Error("critic attestation cannot bind adjudicator inputs");
    }
    const projection = {
        schema: "vnext-clean-attestation/1",
        pass,
        role,
        prompt_sha256: promptSha256,
        corpus_epoch_sha256: epoch,
        coverage: cleanCoverage,
        domain_results: domainResults,
        finding_families: [],
        new_mechanisms: [],
        orphan_demands: [],
        unsupported_claims: [],
        verdict: "clean",
    };
    if (role === "adjudicator") {
        projection.input_report_sha256 = [...inputReportSha256].sort(compareCanonicalText);
    }
    return projection;
}

function common({ pass, role, epoch, predecessor }) {
    return [
        `Frozen corpus epoch: ${epoch}`,
        `Pass: ${pass}`,
        `Role: ${role}`,
        `Protocol: ${protocol}`,
        `Workspace: ${workspace}`,
        `Coverage order: ${cleanCoverage.join(",")}`,
        `Predecessor: ${predecessor ?? "first frozen-corpus pass"}`,
        "Audit only. Do not edit or create formation, production, report, session, or repository files; safe temporary fixtures created and removed internally by an allowlisted selftest are permitted. Do not use collaboration, browser, web, apply_patch, direct functions.wait, or any tool except functions.exec with the protocol's exact 60-second/50,000-token pragma launch or owned-session poll cell; those cells are the sole permitted process wrappers.",
        `Canonical launch cell; replace only <allowlisted command> with one literal allowed command:\n${launchTemplate}`,
        `Canonical poll cell; replace only the numeric session_id 1 with the exact positive safe-integer ID returned by the pending launch:\n${pollTemplate}`,
        "Your first and last logical commands must each run exactly `node docs/tranches/V/vnext/tools/corpus-epoch.mjs`; both reconstructed terminal receipts must equal the frozen epoch, and either boundary may complete asynchronously. Run at least one interior audit command. Every interior logical command must be unique, allowlisted by the protocol, and cited by at least one matching domain row; owned poll cells never enter Commands executed or the attestation command union.",
        "In the report's Commands executed: body, emit exactly one `- <single-line command>` row for every logical launch command in transcript order, including both corpus-epoch boundary launches. Never emit a poll cell there. The section must contain no omitted, extra, reordered, or duplicated launch.",
        "If a launch yields a session_id, immediately poll only that owned positive safe-integer ID with the exact empty-write poll cell until it closes with exit_code 0. Keep each launch and all of its polls contiguous: no interleaving, new launch, different ID, report, orphan poll, or post-terminal poll is legal. Reconstruct output by concatenating every launch/poll output field in transcript order; abandon the audit as RED if a run exceeds 120 polls, 3,900,000 milliseconds launch-to-terminal, or 1,048,576 UTF-8 bytes of reconstructed output.",
        "Use read-formation-evidence.mjs for bounded source lines. Never access r1-opus-refuted, another Codex session, another agent, or a clean report except the two content-addressed critic reads explicitly supplied to an adjudicator.",
        "Assume every success claim is wrong. Check all twelve domains, run fail-open selftests, resolve each cited file line, and return CLEAN only when all four finding vectors are empty.",
        "Begin with concise commentary before tool use and provide concise commentary updates while work continues, as required by the runtime. Every preliminary assistant message must have phase commentary, precede the final answer, and contain no clean-report envelope marker, draft report, case-insensitive `findings` token, `#`, angle bracket, or Setext underline-only line; say defects or results instead. Author exactly one final_answer message only after the closing corpus-epoch run reaches terminal closure; it must contain BEGIN VNEXT-CLEAN-REPORT, the exact report bytes and final newline, then END VNEXT-CLEAN-REPORT, with no preface, code fence, repeated envelope, or coda. Report prose likewise reserves its only two `#` bytes for the canonical Findings heading and its only angle brackets for the machine attestation. Follow the protocol's terminal findings/verdict/attestation grammar exactly.",
        "If any finding survives, return the same envelope with a NOT CLEAN report, concrete mechanism/evidence/owner, and no clean attestation; the coordinator will discard the epoch and restart.",
        "For a CLEAN report, copy the terminal Prompt body SHA-256 value into the machine attestation's prompt_sha256 field. This content address and the encrypted provider carrier are both verified; the plaintext itself remains inside the declared authenticated-delivery trust boundary.",
    ].join("\n");
}

export function criticPrompt({ pass, role, epoch, predecessor = null }) {
    if (![1, 2].includes(pass) || !["critic_a", "critic_b"].includes(role) || !/^[0-9a-f]{64}$/.test(epoch)) {
        throw new Error("invalid clean critic prompt inputs");
    }
    if ((pass === 1 && predecessor !== null) || (pass === 2 && !/^[0-9a-f]{64}$/.test(predecessor ?? ""))) {
        throw new Error("invalid clean critic predecessor");
    }
    const directive = pass === 2 ? "ASSUME-FORMATION-WRONG CONSECUTIVE-PASS-2" : "ASSUME-FORMATION-WRONG";
    return sealPrompt(`${directive}\n${common({ pass, role, epoch, predecessor })}\nYou receive no sibling report or sibling work. Form the judgment independently from the frozen corpus.`);
}

export function adjudicatorPrompt({ pass, epoch, criticReports, predecessor = null }) {
    if (![1, 2].includes(pass) || !/^[0-9a-f]{64}$/.test(epoch) || !Array.isArray(criticReports)
        || criticReports.length !== 2 || criticReports.some(({ tag, sha256 }) => !/^[AB]$/.test(tag) || !/^[0-9a-f]{64}$/.test(sha256))) {
        throw new Error("invalid clean adjudicator prompt inputs");
    }
    if (new Set(criticReports.map(({ tag }) => tag)).size !== 2) {
        throw new Error("clean adjudicator requires exact distinct A/B critic reports");
    }
    if ((pass === 1 && predecessor !== null) || (pass === 2 && !/^[0-9a-f]{64}$/.test(predecessor ?? ""))) {
        throw new Error("invalid clean adjudicator predecessor");
    }
    const sorted = [...criticReports].sort((left, right) => compareCanonicalText(left.tag, right.tag));
    const directive = pass === 2 ? "ADJUDICATE-FORMATION CONSECUTIVE-PASS-2" : "ADJUDICATE-FORMATION";
    const reads = sorted.map(({ tag, sha256 }) =>
        `node docs/tranches/V/vnext/tools/read-clean-critic-report.mjs --pass ${pass} --tag ${tag} --sha256 ${sha256}`,
    );
    return sealPrompt(`${directive}\n${common({ pass, role: "adjudicator", epoch, predecessor })}\nCritic inputs (read both with the exact commands shown):\n${reads.join("\n")}\nReproduce every critic claim. Agglomerate only proved results; voting and compromise are forbidden.`);
}
