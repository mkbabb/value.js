#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, parseJsonStrict } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const options = new Map();
for (const argument of process.argv.slice(2)) {
    const match = argument.match(/^--(manifest|return|wave)=(.+)$/);
    if (!match || options.has(match[1])) fail(`unknown or duplicate argument ${argument}`);
    else options.set(match[1], match[2]);
}
const manifestPath = options.has("manifest")
    ? resolve(process.cwd(), options.get("manifest"))
    : resolve(root, "API-RETURN-COVERAGE.json");
const returnPath = options.has("return") ? resolve(process.cwd(), options.get("return")) : null;

function exactKeys(value, expected, label) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`${label}: expected object`);
        return false;
    }
    const actual = Object.keys(value).sort();
    const wanted = [...expected].sort();
    if (canonicalize(actual) !== canonicalize(wanted)) {
        fail(`${label}: keys ${actual.join(",")}; expected ${wanted.join(",")}`);
        return false;
    }
    return true;
}

function exactArray(actual, expected, label) {
    if (!Array.isArray(actual)) {
        fail(`${label}: expected array`);
        return;
    }
    if (actual.some((value) => typeof value !== "string" || !value)) fail(`${label}: every ID must be a nonempty string`);
    if (new Set(actual).size !== actual.length) fail(`${label}: duplicate ID`);
    if (canonicalize(actual) !== canonicalize(expected)) {
        const actualSet = new Set(actual);
        const expectedSet = new Set(expected);
        fail(
            `${label}: exact ordered set differs; missing ${JSON.stringify(expected.filter((id) => !actualSet.has(id)))}; extra ${JSON.stringify(
                actual.filter((id) => !expectedSet.has(id)),
            )}`,
        );
    }
}

function waveIds(markdown, prefix) {
    return [...markdown.matchAll(/^\| ([A-Z]+\d+[A-Z]?) \|/gm)].map((match) => match[1]).filter((id) => id.startsWith(prefix));
}

const sourcePath = resolve(root, "api-contract.source.json");
const kaPath = resolve(root, "waves/K-A.md");
const mcPath = resolve(root, "waves/M-C.md");
const operationsDocPath = resolve(root, "API-OPERATIONS.md");
const sourceText = readFileSync(sourcePath);
const kaText = readFileSync(kaPath, "utf8");
const mcText = readFileSync(mcPath, "utf8");
const operationsDocText = readFileSync(operationsDocPath, "utf8");
const source = parseJsonStrict(sourceText);
const manifest = parseJsonStrict(readFileSync(manifestPath));

exactKeys(manifest, ["schema", "authority", "universe", "waves", "manifest_sha256"], "manifest");
if (manifest.schema !== "vnext-api-return-coverage/1") fail(`manifest.schema: ${manifest.schema}`);
exactKeys(manifest.authority, ["api_contract", "api_contract_sha256", "api_waves", "api_waves_sha256", "closure_waves", "closure_waves_sha256"], "authority");
const expectedAuthority = {
    api_contract: "api-contract.source.json",
    api_contract_sha256: sha256(sourceText),
    api_waves: "waves/K-A.md",
    api_waves_sha256: sha256(kaText),
    closure_waves: "waves/M-C.md",
    closure_waves_sha256: sha256(mcText),
};
for (const [key, value] of Object.entries(expectedAuthority)) {
    if (manifest.authority?.[key] !== value) fail(`authority.${key}: ${manifest.authority?.[key]}; expected ${value}`);
}

const operations = {
    http: source.http.map(({ id, owner, service }) => ({ id, owner, service })),
    headless: source.headless.map(({ id, owner, service }) => ({ id, owner, service })),
};
for (const kind of ["http", "headless"]) {
    const ids = operations[kind].map(({ id }) => id);
    if (new Set(ids).size !== ids.length) fail(`source.${kind}: duplicate operation ID`);
    for (const operation of operations[kind]) {
        if (!operation.owner || typeof operation.owner !== "string") fail(`source.${kind}.${operation.id}: missing owner`);
        if (!["value", "fourier"].includes(operation.service)) fail(`source.${kind}.${operation.id}: invalid service ${operation.service}`);
    }
}
const crossTransportIds = [...operations.http, ...operations.headless].map(({ id }) => id);
if (new Set(crossTransportIds).size !== crossTransportIds.length) fail("source: operation ID appears in both HTTP and headless classes");

const universe = {
    http: operations.http.map(({ id }) => id).sort(),
    headless: operations.headless.map(({ id }) => id).sort(),
};
const valueUniverse = {
    http: operations.http.filter(({ service }) => service === "value").map(({ id }) => id).sort(),
    headless: operations.headless.filter(({ service }) => service === "value").map(({ id }) => id).sort(),
};
const fourierUniverse = {
    http: operations.http.filter(({ service }) => service === "fourier").map(({ id }) => id).sort(),
    headless: operations.headless.filter(({ service }) => service === "fourier").map(({ id }) => id).sort(),
};

exactKeys(manifest.universe, ["http", "headless", "counts", "operation_ids_sha256"], "universe");
exactArray(manifest.universe?.http, universe.http, "universe.http");
exactArray(manifest.universe?.headless, universe.headless, "universe.headless");
exactKeys(manifest.universe?.counts, ["http", "headless", "total", "value", "fourier"], "universe.counts");
exactKeys(manifest.universe?.counts?.value, ["http", "headless", "total"], "universe.counts.value");
exactKeys(manifest.universe?.counts?.fourier, ["http", "headless", "total"], "universe.counts.fourier");
const expectedCounts = {
    http: universe.http.length,
    headless: universe.headless.length,
    total: universe.http.length + universe.headless.length,
    value: { http: valueUniverse.http.length, headless: valueUniverse.headless.length, total: valueUniverse.http.length + valueUniverse.headless.length },
    fourier: {
        http: fourierUniverse.http.length,
        headless: fourierUniverse.headless.length,
        total: fourierUniverse.http.length + fourierUniverse.headless.length,
    },
};
if (canonicalize(manifest.universe?.counts) !== canonicalize(expectedCounts)) fail("universe.counts: source-derived counts differ");
const universeHash = sha256(canonicalize({ http: universe.http, headless: universe.headless }));
if (manifest.universe?.operation_ids_sha256 !== universeHash) {
    fail(`universe.operation_ids_sha256: ${manifest.universe?.operation_ids_sha256}; expected ${universeHash}`);
}

const applicable = [...waveIds(kaText, "A"), "C03", "C06", "C10"];
const closureIds = new Set(waveIds(mcText, "C"));
for (const required of ["C03", "C06", "C10"]) if (!closureIds.has(required)) fail(`closure waves: missing ${required}`);
if (!Array.isArray(manifest.waves)) fail("waves: expected array");
const rows = Array.isArray(manifest.waves) ? manifest.waves : [];
const rowIds = rows.map((row) => row?.wave_id);
exactArray(rowIds, applicable, "waves.wave_id");

const allAuditWaves = new Set(["A00", "A01", "A26", "C06", "C10"]);
const valueAuditWaves = new Set(["A03", "A06"]);
const fourierAuditWaves = new Set(["A21R", "C03"]);
const generatedHttpAuditWaves = new Map([
    ["A20", "value"],
    ["A23C", "fourier"],
]);
const expectedBasis = (waveId) => {
    if (allAuditWaves.has(waveId)) return "all-operations";
    if (valueAuditWaves.has(waveId)) return "value-service";
    if (fourierAuditWaves.has(waveId)) return "fourier-service";
    if (generatedHttpAuditWaves.has(waveId)) return `${generatedHttpAuditWaves.get(waveId)}-generated-http-excluding-owned`;
    return "none";
};
const expectedAudit = (waveId, owned) => {
    if (allAuditWaves.has(waveId)) return universe;
    if (valueAuditWaves.has(waveId)) return valueUniverse;
    if (fourierAuditWaves.has(waveId)) return fourierUniverse;
    const generatedService = generatedHttpAuditWaves.get(waveId);
    if (generatedService) {
        const ownedHttp = new Set(owned.http);
        return {
            http: operations.http
                .filter(({ service, id }) => service === generatedService && !ownedHttp.has(id))
                .map(({ id }) => id)
                .sort(),
            headless: [],
        };
    }
    return { http: [], headless: [] };
};

const ownedOccurrences = new Map(crossTransportIds.map((id) => [id, []]));
for (const row of rows) {
    const label = `waves.${row?.wave_id}`;
    exactKeys(row, ["wave_id", "owned", "audited", "audit_basis"], label);
    exactKeys(row?.owned, ["http", "headless"], `${label}.owned`);
    exactKeys(row?.audited, ["http", "headless"], `${label}.audited`);
    const expectedOwned = {
        http: operations.http.filter(({ owner }) => owner === row.wave_id).map(({ id }) => id).sort(),
        headless: operations.headless.filter(({ owner }) => owner === row.wave_id).map(({ id }) => id).sort(),
    };
    exactArray(row?.owned?.http, expectedOwned.http, `${label}.owned.http`);
    exactArray(row?.owned?.headless, expectedOwned.headless, `${label}.owned.headless`);
    const audit = expectedAudit(row.wave_id, expectedOwned);
    exactArray(row?.audited?.http, audit.http, `${label}.audited.http`);
    exactArray(row?.audited?.headless, audit.headless, `${label}.audited.headless`);
    const basis = expectedBasis(row.wave_id);
    if (row.audit_basis !== basis) fail(`${label}.audit_basis: ${row.audit_basis}; expected ${basis}`);

    const ownedSet = new Set([...row.owned.http, ...row.owned.headless]);
    for (const id of [...row.audited.http, ...row.audited.headless]) {
        if (ownedSet.has(id)) fail(`${label}: ${id} is ambiguously both owned and audited`);
    }
    const generatedService = generatedHttpAuditWaves.get(row.wave_id);
    if (generatedService) {
        const effectiveHttp = [...row.owned.http, ...row.audited.http].sort();
        const expectedHttp = operations.http.filter(({ service }) => service === generatedService).map(({ id }) => id).sort();
        exactArray(effectiveHttp, expectedHttp, `${label}.owned-plus-audited-http`);
        if (row.owned.headless.length || row.audited.headless.length) {
            fail(`${label}: generated-client totality may not claim a headless operation`);
        }
    }
    for (const id of row.owned.http) ownedOccurrences.get(id)?.push(`${row.wave_id}:http`);
    for (const id of row.owned.headless) ownedOccurrences.get(id)?.push(`${row.wave_id}:headless`);
}

for (const [id, occurrences] of ownedOccurrences) {
    if (occurrences.length !== 1) fail(`owner bijection: ${id} occurs ${occurrences.length} times (${occurrences.join(",")})`);
}
for (const operation of [...operations.http, ...operations.headless]) {
    if (!applicable.includes(operation.owner)) fail(`source owner ${operation.owner} for ${operation.id} is outside the applicable wave set`);
}

let selected = null;
let returned = null;
if (options.has("wave") || returnPath) {
    let returnRecord = null;
    if (returnPath) {
        try {
            returnRecord = parseJsonStrict(readFileSync(returnPath));
        } catch (error) {
            fail(`return: ${error.message}`);
        }
    }
    const waveId = options.get("wave") ?? returnRecord?.wave_id;
    if (options.has("wave") && returnRecord && returnRecord.wave_id !== waveId) {
        fail(`return.wave_id: ${returnRecord.wave_id}; expected ${waveId}`);
    }
    selected = rows.find((row) => row.wave_id === waveId) ?? null;
    if (!selected) fail(`coverage: no applicable row for ${waveId}`);
    if (selected && returnRecord) {
        if (returnRecord.api_contract?.applicability !== "applicable") {
            fail(`return.api_contract: ${waveId} must be applicable even when both exact vectors are empty`);
        } else {
            exactArray(returnRecord.api_contract.owned_http_operation_ids, selected.owned.http, "return.api_contract.owned_http_operation_ids");
            exactArray(
                returnRecord.api_contract.owned_headless_operation_ids,
                selected.owned.headless,
                "return.api_contract.owned_headless_operation_ids",
            );
            exactArray(returnRecord.api_contract.audited_http_operation_ids, selected.audited.http, "return.api_contract.audited_http_operation_ids");
            exactArray(
                returnRecord.api_contract.audited_headless_operation_ids,
                selected.audited.headless,
                "return.api_contract.audited_headless_operation_ids",
            );
            if (returnRecord.api_contract.api_source_sha256 !== expectedAuthority.api_contract_sha256) {
                fail(
                    `return.api_contract.api_source_sha256: ${returnRecord.api_contract.api_source_sha256}; expected ${expectedAuthority.api_contract_sha256}`,
                );
            }
            if (returnRecord.api_contract.api_return_coverage_sha256 !== manifest.manifest_sha256) {
                fail(
                    `return.api_contract.api_return_coverage_sha256: ${returnRecord.api_contract.api_return_coverage_sha256}; expected ${manifest.manifest_sha256}`,
                );
            }
        }
        returned = {
            path: returnPath,
            wave_id: waveId,
            expected_owned_http: selected.owned.http.length,
            expected_owned_headless: selected.owned.headless.length,
            expected_audited_http: selected.audited.http.length,
            expected_audited_headless: selected.audited.headless.length,
        };
    }
}

const preimage = structuredClone(manifest);
delete preimage.manifest_sha256;
const manifestHash = sha256(canonicalize(preimage));
if (manifest.manifest_sha256 !== manifestHash) {
    fail(`manifest_sha256: ${manifest.manifest_sha256}; expected ${manifestHash}`);
}
const documentedHashes = [...operationsDocText.matchAll(/Its RFC 8785\/JCS self-hash is\s+`([0-9a-f]{64})`\./g)]
    .map((match) => match[1]);
if (canonicalize(documentedHashes) !== canonicalize([manifestHash])) {
    fail(`API-OPERATIONS.md: expected one exact documented manifest hash ${manifestHash}; found ${JSON.stringify(documentedHashes)}`);
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(
    `${JSON.stringify({
        schema: manifest.schema,
        waves: rows.length,
        operations: expectedCounts,
        owned_bijection: true,
        owned_audited_disjoint: true,
        broad_audits: {
            all: [...allAuditWaves],
            value: [...valueAuditWaves],
            fourier: [...fourierAuditWaves],
            generated_http_excluding_owned: Object.fromEntries(generatedHttpAuditWaves),
        },
        operation_ids_sha256: universeHash,
        manifest_sha256: manifestHash,
        selected: selected
            ? {
                  wave_id: selected.wave_id,
                  owned: { http: selected.owned.http.length, headless: selected.owned.headless.length },
                  audited: { http: selected.audited.http.length, headless: selected.audited.headless.length },
              }
            : null,
        returned,
    })}\n`,
);
