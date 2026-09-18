#!/usr/bin/env node

import assert from "node:assert/strict";

import {
    adjudicatorPrompt,
    cleanActorTaskName,
    cleanAttestationProjection,
    cleanPromptSha256,
    criticPrompt,
} from "./clean-pass-prompts.mjs";

const epoch = "a".repeat(64);
const predecessor = "b".repeat(64);
const reports = [
    { tag: "B", sha256: "d".repeat(64) },
    { tag: "A", sha256: "c".repeat(64) },
];
let positives = 0;
let rejections = 0;

const prompts = [
    { pass: 1, role: "critic_a", prompt: criticPrompt({ pass: 1, role: "critic_a", epoch }) },
    { pass: 1, role: "critic_b", prompt: criticPrompt({ pass: 1, role: "critic_b", epoch }) },
    { pass: 1, role: "adjudicator", prompt: adjudicatorPrompt({ pass: 1, epoch, criticReports: reports }) },
    { pass: 2, role: "critic_a", prompt: criticPrompt({ pass: 2, role: "critic_a", epoch, predecessor }) },
    { pass: 2, role: "critic_b", prompt: criticPrompt({ pass: 2, role: "critic_b", epoch, predecessor }) },
    { pass: 2, role: "adjudicator", prompt: adjudicatorPrompt({ pass: 2, epoch, predecessor, criticReports: reports }) },
];

const digests = new Set();
const taskNames = new Set();
for (const item of prompts) {
    const digest = cleanPromptSha256(item.prompt);
    const taskName = cleanActorTaskName(item);
    assert.match(digest, /^[0-9a-f]{64}$/);
    assert.equal(item.prompt.endsWith(`Prompt body SHA-256: ${digest}`), true);
    assert.equal(taskName, `vnext_clean_p${item.pass}_${item.role}_${digest}`);
    assert.match(taskName, /^[a-z0-9_]+$/);
    digests.add(digest);
    taskNames.add(taskName);
    positives += 1;
}
assert.equal(digests.size, prompts.length);
assert.equal(taskNames.size, prompts.length);
positives += 2;

const criticAttestation = cleanAttestationProjection({
    pass: 1,
    role: "critic_a",
    promptSha256: cleanPromptSha256(prompts[0].prompt),
    epoch,
    domainResults: [],
});
assert.equal(criticAttestation.prompt_sha256, cleanPromptSha256(prompts[0].prompt));
assert.equal(Object.prototype.hasOwnProperty.call(criticAttestation, "input_report_sha256"), false);
const adjudicatorAttestation = cleanAttestationProjection({
    pass: 2,
    role: "adjudicator",
    promptSha256: cleanPromptSha256(prompts.at(-1).prompt),
    epoch,
    domainResults: [],
    inputReportSha256: reports.map(({ sha256 }) => sha256),
});
assert.deepEqual(adjudicatorAttestation.input_report_sha256, ["c".repeat(64), "d".repeat(64)]);
positives += 2;

for (const [name, action] of [
    ["missing seal", () => cleanPromptSha256("plain")],
    ["changed body", () => cleanPromptSha256(prompts[0].prompt.replace("ASSUME", "REJECT"))],
    ["changed digest", () => cleanPromptSha256(`${prompts[0].prompt.slice(0, -1)}0`)],
    ["duplicate seal", () => cleanPromptSha256(`${prompts[0].prompt}\nPrompt body SHA-256: ${"0".repeat(64)}`)],
    ["invalid pass", () => cleanActorTaskName({ ...prompts[0], pass: 3 })],
    ["invalid role", () => cleanActorTaskName({ ...prompts[0], role: "critic_c" })],
    ["unsorted report tag", () => adjudicatorPrompt({ pass: 1, epoch, criticReports: [{ tag: "C", sha256: "c".repeat(64) }, reports[1]] })],
    ["duplicate report tag", () => adjudicatorPrompt({ pass: 1, epoch, criticReports: [{ tag: "A", sha256: "c".repeat(64) }, { tag: "A", sha256: "d".repeat(64) }] })],
    ["missing predecessor", () => criticPrompt({ pass: 2, role: "critic_a", epoch })],
    ["attestation without prompt digest", () => cleanAttestationProjection({ pass: 1, role: "critic_a", epoch, domainResults: [] })],
    ["critic smuggles report inputs", () => cleanAttestationProjection({ pass: 1, role: "critic_a", promptSha256: "e".repeat(64), epoch, domainResults: [], inputReportSha256: reports.map(({ sha256 }) => sha256) })],
    ["adjudicator omits report inputs", () => cleanAttestationProjection({ pass: 1, role: "adjudicator", promptSha256: "e".repeat(64), epoch, domainResults: [] })],
]) {
    assert.throws(action, undefined, name);
    rejections += 1;
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-clean-pass-prompts-selftest/1",
    positives,
    adversarial_rejections: rejections,
})}\n`);
