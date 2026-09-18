import { canonicalBytes, sha256 } from "./shared.mjs";
import { compileSchemas, manifestContentDigest, validateSchemas, verifyBundle } from "./verify.mjs";

function cloneBundle(manifest, shardObjects, rawShardBytesByName, tables = []) {
    return {
        manifest: structuredClone(manifest),
        shardObjects,
        rawShardBytesByName: new Map(rawShardBytesByName),
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
    const expectedSemanticBytesByTable = new Map(["contexts", "carriers", "operations", "references", "owner_scope"].map((table) => [table, canonicalBytes(shardObjects[table])]));
    const records = [];
    const restore = (tables) => {
        for (const table of tables) shardObjects[table] = JSON.parse(rawShardBytesByName.get(fileForTable(table)).toString("utf8"));
    };
    const schemaReject = (name, tables, mutate) => {
        const bundle = cloneBundle(manifest, shardObjects, rawShardBytesByName, tables);
        mutate(bundle);
        let rejected = false;
        try { validateSchemas(bundle.manifest, bundle.shardObjects, validators); } catch { rejected = true; } finally { restore(tables); }
        if (!rejected) throw new Error(`mutation unexpectedly passed schema: ${name}`);
        records.push([name, "SCHEMA_REJECT"]);
    };
    const relationReject = (name, mutate, reboundTables = [], recomputeDigest = true) => {
        const bundle = cloneBundle(manifest, shardObjects, rawShardBytesByName, reboundTables);
        mutate(bundle);
        if (recomputeDigest) rebind(bundle, reboundTables);
        let rejected = false;
        try { verifyBundle({ ...bundle, manifestSchema, shardSchema, evidence, executionAttestation, expectedSemanticBytesByTable, validators }); } catch { rejected = true; } finally { restore(reboundTables); }
        if (!rejected) throw new Error(`mutation unexpectedly passed mechanical verification: ${name}`);
        records.push([name, "RELATION_REJECT"]);
    };

    schemaReject("A-nonzero-authority-credit-fields", [], ({ manifest: row }) => { row.authority.audit_credit = 1; row.authority.compatibility_credit = 1; row.authority.conformance_credit = 1; });
    schemaReject("A-reference-owner-edge-and-extra-cell", ["references"], ({ shardObjects: rows }) => { rows.references.rows[0].push({ owner_edge_emitted: true, red_flags: [] }); });
    schemaReject("B-empty-source-row-objects", ["sources"], ({ shardObjects: rows }) => { rows.sources.rows = Array.from({ length: 168 }, () => ({})); });
    schemaReject("B-fabricated-carrier-row-objects", ["carriers"], ({ shardObjects: rows }) => { rows.carriers.rows = Array.from({ length: 17079 }, (_, index) => ({ id: `fabricated-${index}`, red_flags: ["RED"] })); });
    schemaReject("B-ten-empty-required-join-rows", ["operations"], ({ shardObjects: rows }) => { rows.operations.required_join_rows = Array.from({ length: 10 }, () => ({})); });
    schemaReject("B-fifty-two-empty-compatibility-rows", ["compatibility"], ({ shardObjects: rows }) => { rows.compatibility.rows = Array.from({ length: 52 }, () => ({})); });
    schemaReject("B-false-validation-claims", [], ({ manifest: row }) => { row.validation.manifest_schema = false; row.validation.shard_schema = false; });
    schemaReject("closed-nested-addition", [], ({ manifest: row }) => { row.generator.runtime.unbound_loader = true; });
    schemaReject("zero-credit-contract", [], ({ manifest: row }) => { row.credits.owner = 7; row.credits.compatibility = 9; row.credits.owner_edges.push([1, 2]); });
    relationReject("A-false-content-digest", ({ manifest: row }) => { row.content_digest_sha256 = "0".repeat(64); }, [], false);
    relationReject("A-operation-green-empty-flags", ({ shardObjects: rows }) => { rows.codes.rows.push(["GREEN"]); rows.codes.rows.sort((left, right) => Buffer.from(left[0]).compare(Buffer.from(right[0]))); rows.codes.count += 1; rows.operations.interval_rows[0][9] = rows.codes.rows.findIndex((row) => row[0] === "GREEN"); rows.operations.interval_rows[0][10] = []; }, ["codes", "operations"]);
    relationReject("B-operation-count-with-empty-rows", ({ shardObjects: rows }) => { rows.operations.candidate_count = 999999; rows.operations.count = 999999; rows.operations.candidate_rows = []; }, ["operations"]);
    relationReject("B-reference-count-with-empty-rows", ({ shardObjects: rows }) => { rows.references.count = 999999; rows.references.rows = []; }, ["references"]);
    relationReject("B-unbound-executed-identity", ({ manifest: row }) => { row.generator.executed_modules[0].sha256 = "0".repeat(64); });
    relationReject("C-algorithm-opening-offset-semantic-replay", ({ shardObjects: rows }) => { rows.operations.algorithm_opening_rows[0][2] = 0; }, ["operations"]);
    relationReject("C-algorithm-opening-line-semantic-replay", ({ shardObjects: rows }) => { rows.operations.algorithm_opening_rows[0][1] += 1; }, ["operations"]);
    relationReject("C-non-div-algorithm-opening-inventory", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const index = rows.operations.algorithm_opening_rows.findIndex((row) => !/^<div\b/i.test(strings[row[3]]));
        rows.operations.algorithm_opening_rows.splice(index, 1);
        rows.operations.algorithm_opening_count -= 1;
    }, ["operations"]);
    relationReject("C-reference-parsed-semantics-and-targets", ({ shardObjects: rows }) => {
        rows.references.rows[0][7] = 0;
        rows.references.rows[0][8] = 0;
        rows.references.rows[0][17] = [0];
    }, ["references"]);
    relationReject("C-markup-reference-inventory", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const index = rows.references.rows.findIndex((row) => strings[row[6]] === "markup");
        rows.references.rows.splice(index, 1);
        rows.references.count -= 1;
    }, ["references"]);
    relationReject("C-owner-scope-line-and-hash-provenance", ({ shardObjects: rows }) => {
        rows.owner_scope.rows[0][1][0][0] = 999999;
        rows.owner_scope.rows[0][1][0][2] = "0".repeat(64);
    }, ["owner_scope"]);
    relationReject("D-context-stable-id-derivation", ({ shardObjects: rows }) => { rows.contexts.rows[0][0] = "ctxv6-000000000000000000000000"; }, ["contexts"]);
    relationReject("D-context-title-provenance", ({ shardObjects: rows }) => { rows.contexts.rows[0][1][0][2] = 0; }, ["contexts"]);
    relationReject("D-carrier-stable-id-derivation", ({ shardObjects: rows }) => { rows.carriers.rows[0][0] = "occ-000000000000000000000000"; }, ["carriers"]);
    relationReject("D-carrier-semantic-name-provenance", ({ shardObjects: rows }) => { rows.carriers.rows.find((row) => row[10].length > 0)[10][0] = 0; }, ["carriers"]);
    relationReject("D-carrier-context-edge-provenance", ({ shardObjects: rows }) => { rows.carriers.rows[0][12] = (rows.carriers.rows[0][12] + 1) % rows.contexts.count; }, ["carriers"]);
    relationReject("D-operation-stale-context-foreign-key", ({ shardObjects: rows }) => { rows.operations.interval_rows[0][8] = (rows.operations.interval_rows[0][8] + 1) % rows.contexts.count; }, ["operations"]);
    relationReject("D-reference-stale-carrier-target-foreign-key", ({ shardObjects: rows }) => {
        const row = rows.references.rows.find((candidate) => candidate[17].length > 0);
        row[17][0] = (row[17][0] + 1) % rows.carriers.count;
    }, ["references"]);
    relationReject("D-dated-tr-specification-name", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const row = rows.references.rows.find((candidate) => strings[candidate[6]] === "spec_url" && strings[candidate[14]]?.startsWith("DATED_TR_"));
        row[7] = strings.findIndex((value) => /^\d{4}$/.test(value));
    }, ["references"]);
    relationReject("D-url-terminal-boundary", ({ shardObjects: rows }) => { rows.references.rows.find((row) => row[3] > 0)[4] += 1; }, ["references"]);

    const full = { suite: "occurrence-owner-v6-a-b-c-mutation-counterfixtures", records };
    return { case_count: records.length, rejected: records.length, digest_sha256: sha256(canonicalBytes(full)), records };
}
