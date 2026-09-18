import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { openingStateFailure, waveCell, waveCellCount } from "./wave-table-contract.mjs";

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const implementationExecutionOrder = Object.freeze({
    schema: "vnext-implementation-execution-order/1",
    steps: Object.freeze([
        "born_red",
        "partition",
        "implement",
        "freeze",
        "critic_a_and_critic_b",
        "adjudicator",
        "acceptance_gate_and_downstream_crater",
        "acceptance_receipt",
        "return",
    ]),
});

export const d19D25G05DispositionContract = Object.freeze({
    schema: "vnext-d19-d25-g05-disposition-contract/1",
    owner: "D25",
    rows: Object.freeze([
        Object.freeze({ wave: "D19", arm: "effects", effects: Object.freeze(["relocate"]), evidence: "required" }),
        Object.freeze({ wave: "D20", arm: "effects", effects: Object.freeze(["engage", "release"]), evidence: "required" }),
        Object.freeze({ wave: "D21", arm: "effects", effects: Object.freeze(["engage", "release"]), evidence: "required" }),
        Object.freeze({
            wave: "D22",
            arm: "not_applicable",
            effects: Object.freeze([]),
            not_applicable: Object.freeze({ reason: "required", evidence: "required" }),
        }),
        Object.freeze({ wave: "D23", arm: "effects", effects: Object.freeze(["engage", "release"]), evidence: "required" }),
        Object.freeze({ wave: "D24", arm: "effects", effects: Object.freeze(["birth"]), evidence: "required" }),
    ]),
});

const orderStepFragments = Object.freeze([
    "1. Capture its born-RED witness and input digests.",
    "2. Partition the affected DAG cluster at a size justified by its actual edges.",
    "3. Implement only the formation-adjudicated surface.",
    "4. Freeze the exact final implementation state and evidence offered for acceptance.",
    "5. Run the one compact fresh `critic_a`/`critic_b` plus adjudicator triad",
    "6. After ratification, run the one canonical acceptance gate and downstream crater",
    "7. Seal the outer acceptance return without mutating the reviewed and gated state",
]);

const recapOrderFragment = "a finding forces repair, one wholly fresh triad for the new immutable state, then gate/crater replay before acceptance";

const waveFragments = Object.freeze({
    D19: Object.freeze([
        "explicit G05 `relocate` disposition owned only through the sole D03T route-transition path",
        "`relocate` meets G05 interruption/parking/PRM limits without a second transition path",
    ]),
    D20: Object.freeze([
        "explicit G05 `engage`/`release` disposition for session and account commands",
        "`engage`/`release` meets G05 amplitude, interruption, keyboard/touch and PRM laws",
    ]),
    D21: Object.freeze([
        "explicit G05 `engage`/`release` disposition for reviewer commands",
        "`engage`/`release` meets G05 amplitude, interruption, keyboard/touch and PRM laws",
    ]),
    D22: Object.freeze([
        "typed G05 `N/A{reason,evidence}` disposition",
        "typed N/A evidence proves zero D22-owned Breath trigger or clock",
        "does not re-own D19 relocation",
    ]),
    D23: Object.freeze([
        "explicit G05 `engage`/`release` disposition for moderation commands",
        "`engage`/`release` meets G05 amplitude, interruption, keyboard/touch and PRM laws",
    ]),
    D24: Object.freeze([
        "explicit G05 `birth` disposition only for a server-confirmed new tag",
        "`birth` is deterministic, never hover-reseeded",
    ]),
    D25: Object.freeze([
        "exact six-row D19–D24 G05 disposition ledger",
        "each row exclusively `{wave,effects:[<named-G05-effect>],evidence}` or `{wave,effects:[],not_applicable:{reason,evidence}}`",
        "every D19–D24 row has exactly one closed G05 effect/N/A arm",
        "no CSS patch, threshold relaxation, route repair, motion tweak, accessibility workaround, late effect selection or missing-cell skip",
    ]),
});

const proofWaves = new Set(Object.keys(waveFragments));

function count(source, token) {
    if (typeof source !== "string" || token === "") return 0;
    let matches = 0;
    let offset = 0;
    while ((offset = source.indexOf(token, offset)) >= 0) {
        matches += 1;
        offset += token.length;
    }
    return matches;
}

function markerProjection(source, label, expected, failures) {
    const expression = new RegExp(`<!-- ${label} (\\{[^\\n]+\\}) -->`, "g");
    const matches = [...source.matchAll(expression)];
    if (matches.length !== 1) {
        failures.push(`${label}: expected exactly one canonical machine marker; found ${matches.length}`);
        return null;
    }
    try {
        const parsed = parseJsonStrict(matches[0][1]);
        if (matches[0][1] !== canonicalize(parsed) || canonicalize(parsed) !== canonicalize(expected)) {
            failures.push(`${label}: marker is not the exact canonical projection`);
            return null;
        }
        return parsed;
    } catch (error) {
        failures.push(`${label}: marker is invalid strict JSON (${error.message})`);
        return null;
    }
}

function waveRows(source, failures) {
    const rows = new Map();
    for (const [zeroLine, line] of String(source).split("\n").entries()) {
        if (!line.startsWith("|")) continue;
        const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
        const waveId = cells[0] ?? "";
        if (!proofWaves.has(waveId)) continue;
        if (rows.has(waveId)) failures.push(`waves/G-D.md:${zeroLine + 1}: duplicate proof-layer wave ${waveId}`);
        if (cells.length !== waveCellCount) {
            failures.push(`waves/G-D.md:${zeroLine + 1}: ${waveId} must have ${waveCellCount} cells`);
        }
        rows.set(waveId, cells);
    }
    return rows;
}

function clone(value) {
    return structuredClone(value);
}

export function validateWaveFormationProof(waveId, cells) {
    const failures = [];
    if (!proofWaves.has(waveId)) return { failures, proof: null };
    if (!Array.isArray(cells) || cells.length !== waveCellCount || cells[0] !== waveId) {
        return { failures: [`${waveId}: proof-layer projection requires its exact ${waveCellCount}-cell wave row`], proof: null };
    }
    const openingFailure = openingStateFailure(cells[waveCell.bornRed]);
    if (openingFailure) failures.push(`${waveId}: ${openingFailure}`);
    const rowText = cells.join(" | ");
    for (const fragment of waveFragments[waveId]) {
        if (count(rowText, fragment) !== 1) {
            failures.push(`${waveId}: required effect/N/A contract fragment must occur exactly once: ${fragment}`);
        }
    }
    const ledgerRow = d19D25G05DispositionContract.rows.find(({ wave }) => wave === waveId);
    const proof = waveId === "D25"
        ? { g05_disposition_ledger: clone(d19D25G05DispositionContract) }
        : { g05_disposition: clone(ledgerRow) };
    return { failures, proof };
}

export function validateFormationProofSources({ pvSource, gdSource, recapSource }) {
    const failures = [];
    if (![pvSource, gdSource, recapSource].every((source) => typeof source === "string")) {
        return { failures: ["formation proof layer requires P-V, G-D, and PROMPT-RECAP source text"], projection: null, sha256: null };
    }
    markerProjection(pvSource, "VNEXT-IMPLEMENTATION-ORDER", implementationExecutionOrder, failures);
    markerProjection(gdSource, "VNEXT-D19-D25-G05", d19D25G05DispositionContract, failures);

    let prior = -1;
    for (const fragment of orderStepFragments) {
        const position = pvSource.indexOf(fragment);
        if (position < 0 || count(pvSource, fragment) !== 1) {
            failures.push(`waves/P-V.md: execution-order fragment must occur exactly once: ${fragment}`);
        } else if (position <= prior) {
            failures.push(`waves/P-V.md: execution-order fragment is out of canonical physical order: ${fragment}`);
        }
        prior = position;
    }
    if (count(recapSource, recapOrderFragment) !== 1) {
        failures.push("PROMPT-RECAP.md: repair/triad/gate acceptance order is absent or duplicated");
    }

    const rows = waveRows(gdSource, failures);
    for (const waveId of proofWaves) {
        const projection = validateWaveFormationProof(waveId, rows.get(waveId));
        failures.push(...projection.failures.map((failure) => `waves/G-D.md: ${failure}`));
    }
    if (rows.size !== proofWaves.size) {
        failures.push(`waves/G-D.md: expected all ${proofWaves.size} D19-D25 proof-layer rows; found ${rows.size}`);
    }

    const projection = {
        schema: "vnext-formation-proof-layer/1",
        implementation_execution_order: clone(implementationExecutionOrder),
        d19_d25_g05_disposition: clone(d19D25G05DispositionContract),
    };
    return {
        failures,
        projection,
        sha256: createHash("sha256").update(canonicalize(projection), "utf8").digest("hex"),
    };
}

export function loadFormationProofLayer(root = defaultRoot) {
    return validateFormationProofSources({
        pvSource: readFileSync(resolve(root, "waves/P-V.md"), "utf8"),
        gdSource: readFileSync(resolve(root, "waves/G-D.md"), "utf8"),
        recapSource: readFileSync(resolve(root, "PROMPT-RECAP.md"), "utf8"),
    });
}
