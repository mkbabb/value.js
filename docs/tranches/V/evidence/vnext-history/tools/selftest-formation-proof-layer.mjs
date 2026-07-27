#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
    d19D25G05DispositionContract,
    implementationExecutionOrder,
    validateFormationProofSources,
    validateWaveFormationProof,
} from "./formation-proof-layer.mjs";
import { canonicalize } from "./json-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sources = {
    pvSource: readFileSync(resolve(root, "waves/P-V.md"), "utf8"),
    gdSource: readFileSync(resolve(root, "waves/G-D.md"), "utf8"),
    recapSource: readFileSync(resolve(root, "PROMPT-RECAP.md"), "utf8"),
};

let positives = 0;
let rejections = 0;

const projection = validateFormationProofSources(sources);
assert.deepEqual(projection.failures, [], projection.failures.join("\n"));
assert.match(projection.sha256, /^[0-9a-f]{64}$/);
assert.deepEqual(projection.projection.implementation_execution_order, implementationExecutionOrder);
assert.deepEqual(projection.projection.d19_d25_g05_disposition, d19D25G05DispositionContract);
positives += 1;

const contracts = loadWaveContracts(root);
for (const row of d19D25G05DispositionContract.rows) {
    assert.deepEqual(contracts.get(row.wave).contract.formation_proof, {
        g05_disposition: row,
    });
}
assert.deepEqual(contracts.get("D25").contract.formation_proof, {
    g05_disposition_ledger: d19D25G05DispositionContract,
});
assert.equal(Object.hasOwn(contracts.get("D18").contract, "formation_proof"), false);
positives += 1;

function reject(name, field, mutate, expected) {
    const forged = { ...sources, [field]: mutate(sources[field]) };
    assert.notEqual(forged[field], sources[field], `${name}: mutation did not alter source`);
    const result = validateFormationProofSources(forged);
    assert.ok(result.failures.length > 0, `${name}: same-layer forgery was accepted`);
    assert.ok(result.failures.some((failure) => expected.test(failure)),
        `${name}: expected ${expected}; got ${result.failures.join(" | ")}`);
    rejections += 1;
}

reject("gate moved before immutable freeze", "pvSource", (source) => source.replace(
    "4. Freeze the exact final implementation state and evidence offered for acceptance.",
    "4. Run the one canonical acceptance gate before freezing the implementation state.",
), /execution-order fragment/);

reject("critic pair moved after gate in machine order", "pvSource", (source) => source.replace(
    canonicalize(implementationExecutionOrder),
    canonicalize({
        ...implementationExecutionOrder,
        steps: [
            "born_red", "partition", "implement", "freeze",
            "acceptance_gate_and_downstream_crater", "critic_a_and_critic_b",
            "adjudicator", "acceptance_receipt", "return",
        ],
    }),
), /marker is not the exact canonical projection/);

reject("adjudicator-before-critics prose", "pvSource", (source) => source.replace(
    "5. Run the one compact fresh `critic_a`/`critic_b` plus adjudicator triad",
    "5. Run the adjudicator before the compact fresh `critic_a`/`critic_b` pair",
), /execution-order fragment/);

reject("duplicate execution authority marker", "pvSource", (source) => source.replace(
    "<!-- VNEXT-IMPLEMENTATION-ORDER",
    `<!-- VNEXT-IMPLEMENTATION-ORDER ${canonicalize(implementationExecutionOrder)} -->\n<!-- VNEXT-IMPLEMENTATION-ORDER`,
), /expected exactly one canonical machine marker/);

reject("repair replays gate before fresh triad", "recapSource", (source) => source.replace(
    "a finding forces repair, one wholly fresh triad for the new immutable state, then gate/crater replay before acceptance",
    "a finding forces repair, gate/crater replay, then one wholly fresh triad before acceptance",
), /repair\/triad\/gate acceptance order/);

reject("ledger marker swaps D19 effect", "gdSource", (source) => source.replace(
    '"effects":["relocate"],"evidence":"required","wave":"D19"',
    '"effects":["birth"],"evidence":"required","wave":"D19"',
), /marker is not the exact canonical projection/);

reject("D19 claims the wrong owned effect", "gdSource", (source) => source.replaceAll(
    "explicit G05 `relocate` disposition",
    "explicit G05 `birth` disposition",
), /D19: required effect\/N\/A contract fragment/);

reject("D20 drops release", "gdSource", (source) => source.replaceAll(
    "explicit G05 `engage`/`release` disposition for session and account commands",
    "explicit G05 `engage` disposition for session and account commands",
), /D20: required effect\/N\/A contract fragment/);

reject("D22 converts N/A to an effect", "gdSource", (source) => source.replace(
    "typed G05 `N/A{reason,evidence}` disposition",
    "typed G05 `birth` disposition",
), /D22: required effect\/N\/A contract fragment/);

reject("D22 drops zero-clock evidence", "gdSource", (source) => source.replace(
    "typed N/A evidence proves zero D22-owned Breath trigger or clock",
    "typed N/A assertion needs no trigger or clock evidence",
), /D22: required effect\/N\/A contract fragment/);

reject("D24 permits client-confirmed birth", "gdSource", (source) => source.replace(
    "explicit G05 `birth` disposition only for a server-confirmed new tag",
    "explicit G05 `birth` disposition for a client-confirmed tag preview",
), /D24: required effect\/N\/A contract fragment/);

reject("D25 weakens exclusive union", "gdSource", (source) => source.replace(
    "each row exclusively `{wave,effects:[<named-G05-effect>],evidence}` or `{wave,effects:[],not_applicable:{reason,evidence}}`",
    "each row may contain an effect arm, an N/A arm, or both",
), /D25: required effect\/N\/A contract fragment/);

reject("D25 permits late effect selection", "gdSource", (source) => source.replace(
    "late effect selection",
    "late effect selection is allowed",
), /D25: required effect\/N\/A contract fragment/);

const d25Line = sources.gdSource.split("\n").find((line) => line.startsWith("| D25 |"));
const d25Cells = d25Line.split("|").slice(1, -1).map((cell) => cell.trim());
const forgedD25Cells = [...d25Cells];
forgedD25Cells[4] = forgedD25Cells[4].replace("exact six-row", "best-effort five-row");
assert.ok(validateWaveFormationProof("D25", forgedD25Cells).failures.length > 0,
    "direct wave projection accepted a forged D25 ledger cardinality");
rejections += 1;

process.stdout.write(`${JSON.stringify({
    schema: "vnext-formation-proof-layer-selftest/1",
    positives,
    same_layer_forgery_rejections: rejections,
    proof_layer_sha256: projection.sha256,
})}\n`);
