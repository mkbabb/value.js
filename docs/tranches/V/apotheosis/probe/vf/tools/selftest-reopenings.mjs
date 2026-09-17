#!/usr/bin/env node

import { resolveLedger, validateResolvedReceipt } from "./resolve-reopenings.mjs";
import { canonicalize } from "./json-contract.mjs";

const digest = (character) => character.repeat(64);
const ownerHash = digest("a");
const corpusHash = digest("c");

function c08Entry(attempt, status, verdict, reopened, resolved, corpus = digest(String(attempt))) {
    return {
        name: `C08-attempt-${String(attempt).padStart(3, "0")}.return.json`,
        path: `/sealed/c08/C08-attempt-${String(attempt).padStart(3, "0")}.return.json`,
        file_sha256: digest(String(attempt)),
        record: {
            wave_id: "C08",
            status,
            return_hash: digest(attempt === 1 ? "1" : "2"),
            evidence_inputs: [{ path: "/sealed/corpus/epoch.json", sha256: corpus, purpose: "frozen corpus epoch" }],
            annexes: {
                closure: {
                    attempt,
                    verdict,
                    inspected_corpus_sha256: corpus,
                    reopened_owners: reopened,
                    resolved_reopenings: resolved,
                },
            },
        },
    };
}

function ownerEntry(returnHash = ownerHash, status = "COMPLETE", waveId = "A01") {
    return {
        name: `${waveId}.return.json`,
        path: `/sealed/owners/${waveId}.return.json`,
        file_sha256: digest("b"),
        record: { wave_id: waveId, status, return_hash: returnHash },
    };
}

const base = () => ({
    c08Entries: [
        c08Entry(1, "NOT_CLEAN", "not_clean", ["A01"], []),
        c08Entry(2, "COMPLETE", "clean", [], [{ wave_id: "A01", owner_return_hash: ownerHash }], corpusHash),
    ],
    ownerEntries: [ownerEntry()],
    c08Root: "/sealed/c08",
    ownerRoot: "/sealed/owners",
});

const failures = [];
let positives = 0;
let rejections = 0;

function ownerFixture(waveId, status) {
    const fixture = base();
    fixture.c08Entries[0].record.annexes.closure.reopened_owners = [waveId];
    fixture.c08Entries[1].record.annexes.closure.resolved_reopenings = [{ wave_id: waveId, owner_return_hash: ownerHash }];
    fixture.ownerEntries = [ownerEntry(ownerHash, status, waveId)];
    return fixture;
}

function reject(name, mutate, pattern, fixtureFactory = base) {
    const fixture = structuredClone(fixtureFactory());
    mutate(fixture);
    try {
        resolveLedger(fixture);
        failures.push(`${name}: adversarial fixture passed`);
    } catch (error) {
        if (!pattern.test(error.message)) failures.push(`${name}: wrong rejection: ${error.message}`);
        else rejections += 1;
    }
}

try {
    const receipt = resolveLedger(base());
    const receiptFailures = validateResolvedReceipt(receipt);
    if (receiptFailures.length) failures.push(`valid receipt rejected: ${receiptFailures.join("; ")}`);
    else positives += 1;

    const permutedFixture = base();
    permutedFixture.c08Entries.reverse();
    permutedFixture.ownerEntries.reverse();
    const permutedReceipt = resolveLedger(permutedFixture);
    if (canonicalize(permutedReceipt) !== canonicalize(receipt)) failures.push("ledger permutation changed the canonical receipt");
    else positives += 1;

    const refused = resolveLedger(ownerFixture("A01", "REFUSED"));
    const refusedFailures = validateResolvedReceipt(refused);
    if (refusedFailures.length) failures.push(`valid REFUSED supersession rejected: ${refusedFailures.join("; ")}`);
    else positives += 1;

    reject("missing-owner", (fixture) => fixture.ownerEntries = [], /owner return IDs differ/);
    reject("duplicate-owner", (fixture) => fixture.ownerEntries.push(ownerEntry()), /duplicate A01/);
    reject("stale-owner-hash", (fixture) => fixture.ownerEntries[0].record.return_hash = digest("d"), /stale or mismatched/);
    reject("blocked-owner", (fixture) => fixture.ownerEntries[0].record.status = "BLOCKED", /neither advances its canonical outcome nor forms a typed REFUSED/);
    reject("not-clean-owner", (fixture) => fixture.ownerEntries[0].record.status = "NOT_CLEAN", /neither advances its canonical outcome nor forms a typed REFUSED/);
    reject("wrong-fixed-status", () => {}, /status KEEP neither advances/, () => ownerFixture("K14", "KEEP"));
    reject("wrong-conditional-status", () => {}, /status COMPLETE neither advances/, () => ownerFixture("V15P", "COMPLETE"));
    reject("refused-static-edge", (fixture) => fixture.c08Entries[1].record.status = "REFUSED", /must advance C08 -> C09 with COMPLETE/);
    reject("prior-not-clean-as-static-dependency", (fixture) => {
        fixture.c08Entries = [fixture.c08Entries[0]];
        fixture.ownerEntries = [];
    }, /must advance C08 -> C09 with COMPLETE, found NOT_CLEAN/);
    reject("nonlatest-attempt-must-remain-not-clean", (fixture) => fixture.c08Entries[0].record.status = "COMPLETE", /non-latest C08 attempt 1 must be NOT_CLEAN/);
    reject("skipped-c08-attempt", (fixture) => fixture.c08Entries[1].record.annexes.closure.attempt = 3, /expected 2, found 3/);
    reject("current-reopening", (fixture) => fixture.c08Entries[1].record.annexes.closure.reopened_owners = ["A01"], /marks current reopenings resolved/);
    reject("unbound-corpus", (fixture) => fixture.c08Entries[1].record.evidence_inputs[0].sha256 = digest("e"), /exactly one persisted evidence input/);

    const tampered = structuredClone(receipt);
    tampered.resolved_dependencies = ["C08"];
    const tamperFailures = validateResolvedReceipt(tampered);
    if (!tamperFailures.some((message) => message.includes("resolved_dependencies"))) {
        failures.push("tampered receipt dependency set was accepted");
    } else rejections += 1;
} catch (error) {
    failures.push(`valid fixture rejected: ${error.message}`);
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({ schema: "vnext-reopening-selftest/1", valid: positives, adversarial_rejections: rejections })}\n`);
