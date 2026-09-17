import { canonicalBytes, sha256 } from "./shared.mjs";
import { compileSchemas, manifestContentDigest, validateSchemas, verifyBundle } from "./verify.mjs";

function cloneBundle(manifest, shardObjects, rawShardBytesByName) {
    return {
        manifest: structuredClone(manifest),
        shardObjects: structuredClone(shardObjects),
        rawShardBytesByName: new Map([...rawShardBytesByName].map(([name, bytes]) => [name, Buffer.from(bytes)])),
    };
}

function fileForTable(table) {
    return table === "owner_scope" ? "owner-scope.json" : `${table}.json`;
}

function rebind(bundle, tables) {
    for (const table of tables) {
        const name = fileForTable(table);
        const bytes = canonicalBytes(bundle.shardObjects[table]);
        bundle.rawShardBytesByName.set(name, bytes);
        const identity = bundle.manifest.shards.find((row) => row.table === table);
        identity.bytes = bytes.length;
        identity.sha256 = sha256(bytes);
        identity.count = table === "operations" ? bundle.shardObjects[table].candidate_count : bundle.shardObjects[table].count;
    }
    bundle.manifest.content_digest_sha256 = manifestContentDigest(bundle.manifest);
}

export function runMutationSuite({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation }) {
    const validators = compileSchemas(manifestSchema, shardSchema);
    const records = [];
    const schemaReject = (name, mutate) => {
        const bundle = cloneBundle(manifest, shardObjects, rawShardBytesByName);
        mutate(bundle);
        let rejected = false;
        try { validateSchemas(bundle.manifest, bundle.shardObjects, validators); } catch { rejected = true; }
        if (!rejected) throw new Error(`mutation unexpectedly passed schema: ${name}`);
        records.push([name, "SCHEMA_REJECT"]);
    };
    const relationReject = (name, mutate, reboundTables = [], recomputeDigest = true) => {
        const bundle = cloneBundle(manifest, shardObjects, rawShardBytesByName);
        mutate(bundle);
        if (recomputeDigest) rebind(bundle, reboundTables);
        let rejected = false;
        try { verifyBundle({ ...bundle, manifestSchema, shardSchema, evidence, executionAttestation, validators }); } catch { rejected = true; }
        if (!rejected) throw new Error(`mutation unexpectedly passed mechanical verification: ${name}`);
        records.push([name, "RELATION_REJECT"]);
    };

    schemaReject("A-nonzero-authority-credit-fields", ({ manifest: row }) => { row.authority.audit_credit = 1; row.authority.compatibility_credit = 1; row.authority.conformance_credit = 1; });
    schemaReject("A-reference-owner-edge-and-extra-cell", ({ shardObjects: rows }) => { rows.references.rows[0].push({ owner_edge_emitted: true, red_flags: [] }); });
    schemaReject("B-empty-source-row-objects", ({ shardObjects: rows }) => { rows.sources.rows = Array.from({ length: 168 }, () => ({})); });
    schemaReject("B-fabricated-carrier-row-objects", ({ shardObjects: rows }) => { rows.carriers.rows = Array.from({ length: 17079 }, (_, index) => ({ id: `fabricated-${index}`, red_flags: ["RED"] })); });
    schemaReject("B-ten-empty-required-join-rows", ({ shardObjects: rows }) => { rows.operations.required_join_rows = Array.from({ length: 10 }, () => ({})); });
    schemaReject("B-fifty-two-empty-compatibility-rows", ({ shardObjects: rows }) => { rows.compatibility.rows = Array.from({ length: 52 }, () => ({})); });
    schemaReject("B-false-validation-claims", ({ manifest: row }) => { row.validation.manifest_schema = false; row.validation.shard_schema = false; });
    schemaReject("closed-nested-addition", ({ manifest: row }) => { row.generator.runtime.unbound_loader = true; });
    schemaReject("zero-credit-contract", ({ manifest: row }) => { row.credits.owner = 7; row.credits.compatibility = 9; row.credits.owner_edges.push([1, 2]); });
    relationReject("A-false-content-digest", ({ manifest: row }) => { row.content_digest_sha256 = "0".repeat(64); }, [], false);
    relationReject("A-operation-green-empty-flags", ({ shardObjects: rows }) => { rows.codes.rows.push(["GREEN"]); rows.codes.rows.sort((left, right) => Buffer.from(left[0]).compare(Buffer.from(right[0]))); rows.codes.count += 1; rows.operations.interval_rows[0][9] = rows.codes.rows.findIndex((row) => row[0] === "GREEN"); rows.operations.interval_rows[0][10] = []; }, ["codes", "operations"]);
    relationReject("B-operation-count-with-empty-rows", ({ shardObjects: rows }) => { rows.operations.candidate_count = 999999; rows.operations.count = 999999; rows.operations.candidate_rows = []; }, ["operations"]);
    relationReject("B-reference-count-with-empty-rows", ({ shardObjects: rows }) => { rows.references.count = 999999; rows.references.rows = []; }, ["references"]);
    relationReject("B-unbound-executed-identity", ({ manifest: row }) => { row.generator.executed_modules[0].sha256 = "0".repeat(64); });

    const full = { suite: "occurrence-owner-v4-a-b-mutation-counterfixtures", records };
    return { case_count: records.length, rejected: records.length, digest_sha256: sha256(canonicalBytes(full)), records };
}
