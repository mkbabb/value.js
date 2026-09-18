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
    if (table === "owner_scope") return "owner-scope.json";
    if (table === "lexical_dispositions") return "lexical-dispositions.json";
    return `${table}.json`;
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

export function runMutationSuite({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation, afterCase = () => {} }) {
    const validators = compileSchemas(manifestSchema, shardSchema);
    const expectedSemanticBytesByTable = new Map(["codes", "strings", "contexts", "carriers", "operations", "references", "lexical_dispositions", "owner_scope"].map((table) => [table, rawShardBytesByName.get(fileForTable(table))]));
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
        afterCase(`mutation ${name}`);
    };
    const relationReject = (name, mutate, reboundTables = [], recomputeDigest = true, ignoredSemanticTables = [], restoreTables = reboundTables) => {
        const bundle = cloneBundle(manifest, shardObjects, rawShardBytesByName, reboundTables);
        mutate(bundle);
        if (recomputeDigest) rebind(bundle, reboundTables);
        const expected = new Map(expectedSemanticBytesByTable);
        for (const table of ignoredSemanticTables) expected.set(table, canonicalBytes(bundle.shardObjects[table]));
        let rejected = false;
        try { verifyBundle({ ...bundle, manifestSchema, shardSchema, evidence, executionAttestation, expectedSemanticBytesByTable: expected, validators }); } catch { rejected = true; } finally { restore(restoreTables); }
        if (!rejected) throw new Error(`mutation unexpectedly passed mechanical verification: ${name}`);
        records.push([name, "RELATION_REJECT"]);
        afterCase(`mutation ${name}`);
    };

    schemaReject("A-nonzero-authority-credit-fields", [], ({ manifest: row }) => { row.authority.audit_credit = 1; row.authority.compatibility_credit = 1; row.authority.conformance_credit = 1; });
    schemaReject("A-reference-owner-edge-and-extra-cell", ["references"], ({ shardObjects: rows }) => { rows.references.rows[0].push({ owner_edge_emitted: true, red_flags: [] }); });
    schemaReject("B-empty-source-row-objects", ["sources"], ({ shardObjects: rows }) => { rows.sources.rows = Array.from({ length: 168 }, () => ({})); });
    schemaReject("B-fabricated-carrier-row-objects", ["carriers"], ({ shardObjects: rows }) => { rows.carriers.rows = Array.from({ length: 16457 }, (_, index) => ({ id: `fabricated-${index}`, red_flags: ["RED"] })); });
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
    relationReject("C-reference-family-multiline-and-bikeshed-code-inventory", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const sources = rows.sources.rows.map((row) => strings[row[0]]);
        const indexes = [
            rows.references.rows.findIndex((row) => strings[row[6]] === "markup"),
            rows.references.rows.findIndex((row) => strings[row[6]] === "bibliographic" && /[\r\n]/.test(strings[row[5]])),
            rows.references.rows.findIndex((row) => strings[row[6]] === "definition" && /[\r\n]/.test(strings[row[5]])),
            rows.references.rows.findIndex((row) => sources[row[1]] === "css-borders-4/Overview.bs"
                && strings[row[5]] === "{{DOMPointReadOnly/x}}" && strings[row[15]] === "BIKESHED_CODE" && row[3] === 58301),
        ].sort((a, b) => b - a);
        for (const index of indexes) rows.references.rows.splice(index, 1);
        rows.references.count -= indexes.length;
    }, ["references"]);
    relationReject("C-owner-scope-authenticated-line-text-and-hash-provenance", ({ shardObjects: rows }) => {
        const input = rows.owner_scope.rows[0][1][0];
        rows.strings.rows[input[1]][0] += " CORRUPTED";
        input[2] = sha256(Buffer.from(rows.strings.rows[input[1]][0], "utf8"));
    }, ["strings", "owner_scope"], true, ["strings", "owner_scope"]);
    relationReject("D-context-stable-id-derivation", ({ shardObjects: rows }) => { rows.contexts.rows[0][0] = "ctxv8-000000000000000000000000"; }, ["contexts"]);
    relationReject("D-false-security-multiline-heading-title-provenance", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const carrier = rows.carriers.rows.find((row) => row[0] === "occ-2014a315a54fece6a5af7c1b");
        rows.contexts.rows[carrier[12]][1][1][2] = strings.indexOf("Security Considerations");
    }, ["contexts"]);
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
    relationReject("E-semantic-code-dictionary-status-corruption", ({ shardObjects: rows }) => {
        rows.codes.rows[0][0] += "_CORRUPTED";
        rows.codes.rows.sort((left, right) => Buffer.from(left[0]).compare(Buffer.from(right[0])));
    }, ["codes"]);

    relationReject("F-escaped-reference-exclusion-disposition-removed", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const index = rows.lexical_dispositions.rows.findIndex((row) => strings[row[8]] === "REVIEWED_EXCLUDED_ESCAPED_SHORTHAND");
        rows.lexical_dispositions.rows.splice(index, 1);
        rows.lexical_dispositions.count -= 1;
    }, [], true, [], ["lexical_dispositions"]);
    relationReject("F-active-href-reference-occurrence-removed", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const sourcePaths = rows.sources.rows.map((row) => strings[row[0]]);
        const index = rows.references.rows.findIndex((row) => sourcePaths[row[1]] === "css-color-5/Overview.bs" && row[3] === 147967 && strings[row[15]] === "HTML_HREF");
        rows.references.rows.splice(index, 1);
        rows.references.count -= 1;
    }, ["references"]);
    relationReject("F-excluded-comment-span-promoted-to-included", ({ shardObjects: rows }) => {
        const strings = rows.strings.rows.map((row) => row[0]);
        const included = strings.indexOf("INCLUDED");
        const row = rows.lexical_dispositions.rows.find((candidate) => strings[candidate[8]] === "REVIEWED_EXCLUDED_COMMENT");
        row[7] = included;
    }, [], true, [], ["lexical_dispositions"]);

    const full = { suite: "occurrence-owner-v8-a-b-c-d-e-f-mutation-counterfixtures", records };
    return { case_count: records.length, rejected: records.length, digest_sha256: sha256(canonicalBytes(full)), records };
}
