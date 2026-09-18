import { createRequire } from "node:module";
import { byteSort, canonicalBytes, sha256, stableId } from "./shared.mjs";
import { discoverAll } from "./discover.mjs";
import { assembleTables } from "./tables.mjs";

const require = createRequire(import.meta.url);
const Ajv2020 = require("ajv-formats/node_modules/ajv/dist/2020.js").default;
const SEMANTIC_TABLES = Object.freeze(["codes", "strings", "contexts", "carriers", "operations", "references", "lexical_dispositions", "owner_scope"]);

function fail(message) {
    throw new Error(`v8 verification failed: ${message}`);
}

function assert(condition, message) {
    if (!condition) fail(message);
}

function validationError(label, validator) {
    return `${label}: ${JSON.stringify(validator.errors)}`;
}

export function compileSchemas(manifestSchema, shardSchema) {
    const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true, validateFormats: false, discriminator: true });
    return { manifest: ajv.compile(manifestSchema), shard: ajv.compile(shardSchema) };
}

export function validateSchemas(manifest, shardObjects, validators) {
    if (!validators.manifest(manifest)) fail(validationError("manifest schema", validators.manifest));
    for (const [table, object] of Object.entries(shardObjects)) if (!validators.shard(object)) fail(validationError(`shard schema ${table}`, validators.shard));
}

function assertIndex(value, length, label) {
    assert(Number.isInteger(value) && value >= 0 && value < length, `${label}: index ${value} outside 0..${length - 1}`);
}

function assertIndexes(values, length, label, allowEmpty = true) {
    assert(Array.isArray(values) && (allowEmpty || values.length > 0), `${label}: invalid index list`);
    assert(new Set(values).size === values.length, `${label}: duplicate index`);
    for (const value of values) assertIndex(value, length, label);
}

function assertUnique(values, label) {
    assert(new Set(values).size === values.length, `${label}: duplicate value`);
}

function assertCanonicalSorted(values, label) {
    assert(JSON.stringify(values) === JSON.stringify([...values].sort(byteSort)), `${label}: not canonical byte order`);
    assertUnique(values, label);
}

function relationDigest(manifest) {
    const copy = structuredClone(manifest);
    delete copy.content_digest_sha256;
    return sha256(canonicalBytes(copy));
}

function tableNameForFile(name) {
    if (name === "owner-scope.json") return "owner_scope";
    if (name === "lexical-dispositions.json") return "lexical_dispositions";
    return name.replace(/\.json$/, "");
}

export function verifyBundle({ manifest, shardObjects, rawShardBytesByName, manifestSchema, shardSchema, evidence, executionAttestation, expectedSemanticBytesByTable, validators: suppliedValidators }) {
    const validators = suppliedValidators ?? compileSchemas(manifestSchema, shardSchema);
    validateSchemas(manifest, shardObjects, validators);
    assert(manifest.content_digest_sha256 === relationDigest(manifest), "manifest content digest relation");
    if (executionAttestation !== undefined) {
        assert(JSON.stringify(manifest.generator.launcher) === JSON.stringify(executionAttestation.launcher), "launcher execution identity");
        assert(JSON.stringify(manifest.generator.executed_modules) === JSON.stringify(executionAttestation.executed_modules), "executed module identities");
        assert(manifest.generator.pre_execution_module_set_sha256 === executionAttestation.module_set_sha256, "pre-execution module set identity");
        assert(manifest.generator.post_import_module_set_sha256 === executionAttestation.module_set_sha256, "post-import module set identity");
        assert(JSON.stringify(manifest.generator.runtime) === JSON.stringify(executionAttestation.runtime), "runtime execution identity");
        assert(JSON.stringify(manifest.generator.validator) === JSON.stringify(executionAttestation.validator), "validator execution identity");
    }
    if (evidence !== undefined) {
        const ordered = (object) => Object.values(object).sort((left, right) => byteSort(left.repo_relative_path, right.repo_relative_path));
        assert(JSON.stringify(manifest.rejected_subjects.pinned) === JSON.stringify(ordered(evidence.identities.pinned)), "pinned rejected-subject identities");
        assert(JSON.stringify(manifest.rejected_subjects.formation_inputs) === JSON.stringify(ordered(evidence.identities.formation_inputs)), "formation input identities");
        let expectedObjects;
        if (expectedSemanticBytesByTable === undefined) expectedObjects = assembleTables(evidence, discoverAll(evidence)).objects;
        for (const table of SEMANTIC_TABLES) {
            const expectedBytes = expectedSemanticBytesByTable?.get(table) ?? canonicalBytes(expectedObjects[table]);
            assert(canonicalBytes(shardObjects[table]).equals(expectedBytes), `${table} independently regenerated authenticated semantic/provenance replay`);
            if (expectedObjects !== undefined) delete expectedObjects[table];
        }
        assert(JSON.stringify(manifest.source_closure) === JSON.stringify({ ...evidence.membership, source_bytes: evidence.sourceBytes }), "authenticated source closure manifest");
        assert(JSON.stringify(manifest.module_dag) === JSON.stringify(evidence.dag), "MODULE-DAG transcription");
        const expectedPrimary = {
            export_sources: evidence.primary.export_sources, runtime_exports: evidence.exports.runtime.length, type_exports: evidence.exports.types.length,
            total_exports: evidence.exports.all.length, consumer_root_label: evidence.primary.consumer_root_label,
            consumer_files: evidence.primary.consumer_files.map((row) => ({ path: row.exact_path, bytes: row.bytes, sha256: row.sha256 })),
            consumer_symbols: evidence.consumers.symbols.size, dag_family_joined: 0, status: "RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG",
        };
        assert(JSON.stringify(manifest.primary_compatibility_inputs) === JSON.stringify(expectedPrimary), "primary 52/37 input binding");
    }

    const requiredTables = ["codes", "strings", "sources", "contexts", "carriers", "operations", "references", "lexical_dispositions", "compatibility", "owner_scope"];
    assert(new Set(Object.keys(shardObjects)).size === requiredTables.length && requiredTables.every((table) => shardObjects[table] !== undefined), "shard table set");
    assert(manifest.shards.length === requiredTables.length, "manifest shard identity count");
    const shardTables = [];
    for (const identity of manifest.shards) {
        const name = identity.logical_path.replace(/^shards\//, "");
        const table = tableNameForFile(name);
        const object = shardObjects[table];
        const bytes = rawShardBytesByName.get(name);
        assert(object !== undefined && object.table === identity.table && table === identity.table, `shard table binding ${name}`);
        assert(Buffer.isBuffer(bytes), `missing raw shard bytes ${name}`);
        assert(bytes.equals(canonicalBytes(object)), `non-canonical or stale shard bytes ${name}`);
        assert(identity.bytes === bytes.length && identity.sha256 === sha256(bytes), `shard identity ${name}`);
        const effectiveCount = table === "operations" ? object.candidate_count : object.count;
        assert(identity.count === effectiveCount, `shard manifest count ${name}`);
        shardTables.push(table);
    }
    assertUnique(shardTables, "manifest shard tables");

    const codes = shardObjects.codes.rows.map((row) => row[0]);
    const strings = shardObjects.strings.rows.map((row) => row[0]);
    assert(shardObjects.codes.count === codes.length, "code count relation");
    assert(shardObjects.strings.count === strings.length, "string count relation");
    assertCanonicalSorted(codes, "codes");
    assertCanonicalSorted(strings, "strings");
    assert(codes.every((code) => code.startsWith("RED_")), "non-RED code present");
    const red = (index, label) => {
        assertIndex(index, codes.length, label);
        assert(codes[index].startsWith("RED_"), `${label}: non-RED status`);
    };
    const redFlags = (indexes, label) => {
        assertIndexes(indexes, codes.length, label, false);
        for (const index of indexes) red(index, label);
    };
    const string = (index, label, nullable = false) => {
        if (nullable && index === null) return null;
        assertIndex(index, strings.length, label);
        return strings[index];
    };

    const sourceRows = shardObjects.sources.rows;
    assert(sourceRows.length === shardObjects.sources.count, "source count relation");
    assertUnique(sourceRows.map((row) => string(row[0], "source path")), "source paths");
    let sourceBytes = 0;
    for (const [index, row] of sourceRows.entries()) {
        string(row[1], `source ${index} format`);
        sourceBytes += row[4];
        red(row[7], `source ${index}`);
    }
    assert(sourceBytes === manifest.source_closure.source_bytes, "source byte total");
    assert(sourceRows.filter((row) => row[6]).length === manifest.source_closure.seed, "seed source count");
    const sourcePaths = sourceRows.map((row) => string(row[0], "source path"));
    assert(sha256(Buffer.from([...sourcePaths].sort(byteSort).join("\n"), "utf8")) === manifest.source_closure.exact_paths_sha256, "source path-set digest");
    if (evidence !== undefined) {
        const expectedSources = [...evidence.sources].sort((left, right) => byteSort(left.exact_path, right.exact_path));
        assert(expectedSources.length === sourceRows.length, "authenticated source row count");
        for (let index = 0; index < sourceRows.length; index += 1) {
            const row = sourceRows[index]; const expected = expectedSources[index];
            assert(string(row[0], `source ${index} path`) === expected.exact_path && string(row[1], `source ${index} format`) === expected.source_format && row[2] === expected.sha256_raw_source && row[3] === expected.git_blob_oid_sha1 && row[4] === expected.raw_source_bytes && row[5] === expected.lines.length && row[6] === expected.root_seed_membership, `authenticated source row ${index}`);
            assert(expected.bytes.length === row[4] && sha256(expected.bytes) === row[2], `authenticated source bytes ${index}`);
        }
    }

    const contextRows = shardObjects.contexts.rows;
    assert(contextRows.length === shardObjects.contexts.count, "context count relation");
    assertUnique(contextRows.map((row) => row[0]), "context IDs");
    for (const [index, row] of contextRows.entries()) {
        const decoded = { sections: [], containers: [], markers: row[3].map((item) => string(item, `context ${index} marker`)), complete: row[4] };
        for (const section of row[1]) {
            string(section[0], `context ${index} section syntax`); string(section[2], `context ${index} section title`); string(section[3], `context ${index} section anchor`, true); assert(section[4] <= section[5], `context ${index} section line interval`); assertIndexes(section[6], strings.length, `context ${index} section markers`);
            decoded.sections.push([string(section[0], "section syntax"), section[1], string(section[2], "section title"), string(section[3], "section anchor", true), section[4], section[5], section[6].map((item) => string(item, "section marker"))]);
        }
        for (const container of row[2]) {
            string(container[0], `context ${index} container tag`); assertIndexes(container[1], strings.length, `context ${index} classes`); string(container[2], `context ${index} container id`, true); assert(container[3] <= container[4], `context ${index} container line interval`); assertIndexes(container[6], strings.length, `context ${index} container markers`);
            decoded.containers.push([string(container[0], "container tag"), container[1].map((item) => string(item, "container class")), string(container[2], "container id", true), container[3], container[4], container[5], container[6].map((item) => string(item, "container marker"))]);
        }
        assertIndexes(row[3], strings.length, `context ${index} markers`);
        assert(row[0] === stableId("ctxv8", [JSON.stringify(decoded)]), `context ${index} stable ID derivation`);
    }

    const sourceByPath = new Map((evidence?.sources ?? []).map((source) => [source.exact_path, source.bytes]));
    const replay = (sourceI, start, end, expectedHash, expectedBytes, label) => {
        assertIndex(sourceI, sourceRows.length, label);
        const path = string(sourceRows[sourceI][0], `${label} source path`);
        const bytes = sourceByPath.get(path);
        if (bytes === undefined) return;
        const slice = bytes.subarray(start, end);
        assert(slice.length === expectedBytes && sha256(slice) === expectedHash, `${label}: source byte replay`);
    };

    const carrierRows = shardObjects.carriers.rows;
    assert(carrierRows.length === shardObjects.carriers.count, "carrier count relation");
    assertUnique(carrierRows.map((row) => row[0]), "carrier IDs");
    for (const [index, row] of carrierRows.entries()) {
        assertIndex(row[1], sourceRows.length, `carrier ${index} source`); string(row[2], `carrier ${index} kind`); string(row[3], `carrier ${index} extraction`); assert(row[4] <= row[5], `carrier ${index} line interval`); assert(row[6] < row[7] && row[7] - row[6] === row[9], `carrier ${index} byte interval`); assertIndexes(row[10], strings.length, `carrier ${index} names`); string(row[11], `carrier ${index} anchor`, true); assertIndex(row[12], contextRows.length, `carrier ${index} context`); red(row[13], `carrier ${index} status`); redFlags(row[14], `carrier ${index} flags`); replay(row[1], row[6], row[7], row[8], row[9], `carrier ${index}`);
        assert(row[0] === stableId("occ", [string(sourceRows[row[1]][0], "carrier source path"), string(row[2], "carrier kind"), row[6], row[7], row[8]]), `carrier ${index} stable ID derivation`);
    }
    const headingCarrier = carrierRows.find((row) => row[0] === "occ-2014a315a54fece6a5af7c1b");
    assert(headingCarrier !== undefined, "authenticated mixed-heading carrier witness");
    const headingContext = contextRows[headingCarrier[12]];
    const headingTitles = headingContext[1].map((row) => [row[1], string(row[2], "authenticated heading title")]);
    const falseSecurityHeadingAncestry = headingTitles.filter(([, title]) => /security/i.test(title)).length;
    assert(JSON.stringify(headingTitles) === JSON.stringify([[2, "Appendix A. Changes"], [3, "Changes since the 18 August 2022 Working Draft"]]) && falseSecurityHeadingAncestry === 0, "authenticated mixed Bikeshed/HTML heading ancestry");

    const operations = shardObjects.operations;
    const intervals = operations.interval_rows;
    const candidates = operations.candidate_rows;
    assert(operations.interval_count === intervals.length, "operation interval count relation");
    assert(operations.candidate_count === candidates.length && operations.count === candidates.length, "operation candidate count relation");
    assertUnique(intervals.map((row) => row[0]), "operation interval IDs");
    assertUnique(candidates.map((row) => row[0]), "operation candidate IDs");
    for (const [index, row] of intervals.entries()) {
        assertIndex(row[1], sourceRows.length, `interval ${index} source`); assert(row[2] <= row[3], `interval ${index} line interval`); assert(row[4] < row[5] && row[5] - row[4] === row[7], `interval ${index} byte interval`); assertIndex(row[8], contextRows.length, `interval ${index} context`); red(row[9], `interval ${index} status`); redFlags(row[10], `interval ${index} flags`); replay(row[1], row[4], row[5], row[6], row[7], `interval ${index}`);
        assert(row[0] === stableId("opv8i", [string(sourceRows[row[1]][0], "interval source path"), row[4], row[5], row[6]]), `interval ${index} stable ID derivation`);
    }
    const groupedCandidates = new Map();
    for (const [index, row] of candidates.entries()) {
        assertIndex(row[1], intervals.length, `candidate ${index} interval`); string(row[2], `candidate ${index} kind`); string(row[3], `candidate ${index} extraction`); red(row[4], `candidate ${index} status`); groupedCandidates.set(row[1], [...(groupedCandidates.get(row[1]) ?? []), index]);
        const interval = intervals[row[1]];
        assert(row[0] === stableId("opv8c", [string(sourceRows[interval[1]][0], "candidate source path"), string(row[2], "candidate kind"), interval[4], interval[5], interval[6]]), `candidate ${index} stable ID derivation`);
    }
    const expectedAliases = [...groupedCandidates.entries()].filter(([, rows]) => rows.length > 1).sort((a, b) => a[0] - b[0]);
    assert(operations.alias_group_count === operations.alias_rows.length, "operation alias count relation");
    assert(JSON.stringify(operations.alias_rows) === JSON.stringify(expectedAliases), "operation alias groups recomputation");
    assert(operations.algorithm_opening_count === operations.algorithm_opening_rows.length, "algorithm opening count relation");
    for (const [index, row] of operations.algorithm_opening_rows.entries()) {
        assertIndex(row[0], sourceRows.length, `algorithm opening ${index} source`); const raw = string(row[3], `algorithm opening ${index} raw`); assert(/^<[A-Za-z][A-Za-z0-9:-]*\b(?:[^"'<>]|"[^"]*"|'[^']*')*>$/.test(raw), `algorithm opening ${index} raw syntax`); assertIndexes(row[4], candidates.length, `algorithm opening ${index} candidates`, false); red(row[5], `algorithm opening ${index} status`);
        for (const candidateI of row[4]) { const interval = intervals[candidates[candidateI][1]]; assert(interval[1] === row[0] && interval[2] <= row[1] && interval[3] >= row[1], `algorithm opening ${index} coverage`); }
    }
    const literalDivAlgorithmCount = operations.algorithm_opening_rows.filter((row) => /^<div\b/i.test(string(row[3], "algorithm raw"))).length;
    assert(literalDivAlgorithmCount === 293, `authenticated literal-div algorithm opening census ${literalDivAlgorithmCount}`);
    assert(operations.required_join_count === operations.required_join_rows.length && operations.required_join_rows.length === 10, "required operation join count");
    assertUnique(operations.required_join_rows.map((row) => string(row[0], "required operation name")), "required operation names");
    for (const [index, row] of operations.required_join_rows.entries()) {
        assertIndex(row[1], carrierRows.length, `required join ${index} carrier`); const relation = string(row[2], `required join ${index} relation`); assert(["EXACT", "ENCLOSING"].includes(relation), `required join ${index} relation value`); assertIndexes(row[3], intervals.length, `required join ${index} intervals`, false); red(row[4], `required join ${index} status`);
        const carrier = carrierRows[row[1]];
        for (const intervalI of row[3]) { const interval = intervals[intervalI]; assert(interval[1] === carrier[1] && interval[2] <= carrier[4] && interval[3] >= carrier[5] && interval[4] <= carrier[6] && interval[5] >= carrier[7], `required join ${index} enclosing relation`); if (relation === "EXACT") assert(interval[2] === carrier[4] && interval[3] === carrier[5] && interval[4] === carrier[6] && interval[5] === carrier[7] && interval[6] === carrier[8], `required join ${index} exact relation`); }
    }

    const referenceRows = shardObjects.references.rows;
    assert(shardObjects.references.count === referenceRows.length, "reference count relation");
    assertUnique(referenceRows.map((row) => row[0]), "reference IDs");
    const referenceTypes = new Set();
    let scopedCss = 0;
    let scopedIdl = 0;
    let typedModifiers = 0;
    let datedTrReferences = 0;
    let bibliographyModifiers = 0;
    let multilineBibliographicReferences = 0;
    let multilineDefinitionReferences = 0;
    let bikeshedCodeReferences = 0;
    let codeLinkPositiveWitnesses = 0;
    let terminalPunctuationUrls = 0;
    for (const [index, row] of referenceRows.entries()) {
        assertIndex(row[1], sourceRows.length, `reference ${index} source`); assert(row[3] < row[4], `reference ${index} byte interval`); const raw = string(row[5], `reference ${index} raw`); const type = string(row[6], `reference ${index} type`); referenceTypes.add(type); string(row[7], `reference ${index} name`); string(row[8], `reference ${index} canonical`); const scope = string(row[9], `reference ${index} scope`, true); string(row[10], `reference ${index} anchor`, true); string(row[11], `reference ${index} link text`, true); string(row[12], `reference ${index} normative`, true); const linkType = string(row[13], `reference ${index} link type`, true); const modifier = string(row[14], `reference ${index} modifier`, true); string(row[15], `reference ${index} processing context`); string(row[16], `reference ${index} target form`); assertIndexes(row[17], carrierRows.length, `reference ${index} targets`); red(row[18], `reference ${index} status`); redFlags(row[19], `reference ${index} flags`);
        const sourcePath = string(sourceRows[row[1]][0], `reference ${index} path`); const sourceBytesValue = sourceByPath.get(sourcePath); if (sourceBytesValue !== undefined) assert(sourceBytesValue.subarray(row[3], row[4]).toString("utf8") === raw, `reference ${index} exact byte replay`);
        assert(row[0] === stableId("refv8", [sourcePath, type, row[3], row[4], raw]), `reference ${index} stable ID derivation`);
        if (type === "css_term_double" && scope !== null) scopedCss += 1;
        if (type === "idl_or_property" && scope !== null) scopedIdl += 1;
        if (["css_shorthand_single", "css_term_double"].includes(type) && linkType !== null) typedModifiers += 1;
        if (type === "spec_url" && modifier?.startsWith("DATED_TR_")) datedTrReferences += 1;
        if (type === "bibliographic" && modifier !== null) bibliographyModifiers += 1;
        if (type === "bibliographic" && /[\r\n]/.test(raw)) multilineBibliographicReferences += 1;
        if (type === "definition" && /[\r\n]/.test(raw)) multilineDefinitionReferences += 1;
        if (string(row[15], `reference ${index} processing context`) === "BIKESHED_CODE") bikeshedCodeReferences += 1;
        if (sourcePath === "css-borders-4/Overview.bs" && raw === "{{DOMPointReadOnly/x}}"
            && string(row[15], `reference ${index} processing context`) === "BIKESHED_CODE" && [58301, 58332].includes(row[3])) codeLinkPositiveWitnesses += 1;
        if (type === "spec_url" && /[.,;:!\]}]$/.test(raw)) terminalPunctuationUrls += 1;
    }
    for (const type of ["bibliographic", "spec_url", "production", "definition", "idl_or_property", "css_term_double", "css_shorthand_single", "element", "markup"]) assert(referenceTypes.has(type), `reference family absent: ${type}`);
    assert(scopedCss > 0 && scopedIdl > 0, "slash-scoped CSS/IDL references absent");
    assert(typedModifiers === 330 && manifest.counts.typed_modifier_references === 330, "authenticated !!type reference census");
    assert(datedTrReferences === 862 && manifest.counts.dated_tr_references === 862, "authenticated dated-TR reference census");
    assert(bibliographyModifiers === 5 && manifest.counts.bibliography_modifier_references === 5, "authenticated bibliography modifier census");
    assert(multilineBibliographicReferences === 6 && manifest.counts.multiline_bibliographic_references === 6, "authenticated multiline bibliography census");
    assert(multilineDefinitionReferences === 22 && manifest.counts.multiline_definition_references === 22, "authenticated multiline definition census");
    assert(bikeshedCodeReferences === 487 && manifest.counts.bikeshed_code_references === 487, "authenticated Bikeshed-code reference census");
    assert(codeLinkPositiveWitnesses === 2 && manifest.counts.code_link_positive_witnesses === 2, "authenticated Bikeshed-code positive witness census");
    assert(terminalPunctuationUrls === 0 && manifest.counts.terminal_punctuation_urls === 0, "URL terminal punctuation exclusion");
    assert(manifest.counts.excluded_raw_literal_leaks === 0 && manifest.counts.inherited_scope_fixture_joins === 1, "authenticated context/scope census");

    const lexical = shardObjects.lexical_dispositions;
    const lexicalRows = lexical.rows;
    assert(lexical.count === lexicalRows.length && lexicalRows.length === 160605, "lexical disposition count relation");
    assertUnique(lexicalRows.map((row) => row[0]), "lexical disposition IDs");
    const includedCarrierIds = new Set();
    const includedReferenceIds = new Set();
    const exclusionReasons = new Map();
    const excludedSpansBySource = new Map();
    let lexicalIncluded = 0;
    let lexicalExcluded = 0;
    let cssColorHrefWitnesses = 0;
    let escapedPromiseExclusions = 0;
    let rawRunningExclusions = 0;
    for (const [index, row] of lexicalRows.entries()) {
        assertIndex(row[1], sourceRows.length, `lexical ${index} source`);
        const sourcePath = string(sourceRows[row[1]][0], `lexical ${index} source path`);
        const candidateKind = string(row[2], `lexical ${index} candidate kind`);
        assert(row[3] < row[4], `lexical ${index} byte interval`);
        const state = string(row[6], `lexical ${index} state`);
        const disposition = string(row[7], `lexical ${index} disposition`);
        const reason = string(row[8], `lexical ${index} reason`);
        const sourceBytesValue = sourceByPath.get(sourcePath);
        if (sourceBytesValue !== undefined) assert(sha256(sourceBytesValue.subarray(row[3], row[4])) === row[5], `lexical ${index} exact slice replay`);
        red(row[10], `lexical ${index} status`); redFlags(row[11], `lexical ${index} flags`);
        assert(row[0] === stableId("lexv8", [sourcePath, candidateKind, row[3], row[4], row[5], state, disposition, reason, row[9] ?? ""]), `lexical ${index} stable ID derivation`);
        assert(["INCLUDED", "REVIEWED_EXCLUDED"].includes(disposition), `lexical ${index} disposition vocabulary`);
        if (disposition === "INCLUDED") lexicalIncluded += 1;
        else {
            lexicalExcluded += 1;
            assert(row[9] === null || candidateKind === "carrier", `lexical ${index} excluded candidate identity vocabulary`);
            exclusionReasons.set(reason, (exclusionReasons.get(reason) ?? 0) + 1);
        }
        if (candidateKind === "carrier" && disposition === "INCLUDED") { assert(typeof row[9] === "string", `lexical ${index} included carrier identity`); includedCarrierIds.add(row[9]); }
        if (candidateKind === "reference" && disposition === "INCLUDED") { assert(typeof row[9] === "string", `lexical ${index} included reference identity`); includedReferenceIds.add(row[9]); }
        if (candidateKind === "excluded_span") {
            assert(disposition === "REVIEWED_EXCLUDED", `lexical ${index} exclusion span disposition`);
            excludedSpansBySource.set(row[1], [...(excludedSpansBySource.get(row[1]) ?? []), [row[3], row[4], reason]]);
        }
        if (sourcePath === "css-color-5/Overview.bs" && row[3] === 147967 && reason === "ACTIVE_HREF_SPECIFICATION_REFERENCE" && disposition === "INCLUDED") cssColorHrefWitnesses += 1;
        if (sourcePath === "web-animations-1/Overview.bs" && row[3] === 79687 && reason === "REVIEWED_EXCLUDED_ESCAPED_SHORTHAND") escapedPromiseExclusions += 1;
        if (sourcePath === "css-animations-2/Overview.bs" && reason === "REVIEWED_EXCLUDED_RAW_PRE_HIGHLIGHTED" && candidateKind === "reference" && sourceBytesValue?.subarray(row[3], row[4]).toString("utf8") === "'running'") rawRunningExclusions += 1;
    }
    assert(includedCarrierIds.size === carrierRows.length && carrierRows.every((row) => includedCarrierIds.has(row[0])), "every emitted carrier has one included lexical disposition");
    assert(includedReferenceIds.size === referenceRows.length && referenceRows.every((row) => includedReferenceIds.has(row[0])), "every emitted reference has one included lexical disposition");
    const allowedExclusionReasons = [
        "REVIEWED_EXCLUDED_CODE_LITERAL", "REVIEWED_EXCLUDED_COMMENT", "REVIEWED_EXCLUDED_ESCAPED_SHORTHAND",
        "REVIEWED_EXCLUDED_NON_SPECIFICATION_HREF", "REVIEWED_EXCLUDED_RAW_PRE_HIGHLIGHTED", "REVIEWED_EXCLUDED_RAW_SCRIPT",
        "REVIEWED_EXCLUDED_RAW_STYLE", "REVIEWED_EXCLUDED_RAW_XMP", "REVIEWED_EXCLUDED_TAG_NON_HREF_TEXT",
    ];
    assert(JSON.stringify([...exclusionReasons.keys()].sort(byteSort)) === JSON.stringify(allowedExclusionReasons.sort(byteSort)), "closed reviewed-exclusion candidate-class coverage");
    assert(allowedExclusionReasons.every((reason) => exclusionReasons.get(reason) > 0), "every skipped lexical candidate class has a disposition");
    for (const interval of intervals) {
        const spans = excludedSpansBySource.get(interval[1]) ?? [];
        assert(!spans.some(([start, end]) => start <= interval[4] && end >= interval[5]), "excluded raw/comment state cannot emit an operation interval");
    }
    for (const carrier of carrierRows) {
        const spans = excludedSpansBySource.get(carrier[1]) ?? [];
        assert(!spans.some(([start, end]) => start <= carrier[6] && end >= carrier[7]), "excluded raw/comment state cannot emit a carrier");
    }
    const corruptBlendHeadingContexts = contextRows.flatMap((row) => row[1]).filter((row) => string(row[2], "blend heading title").startsWith('\">')).length;
    const normalBlendHeadingWitnesses = carrierRows.filter((carrier) => ["compositing-1/Overview.bs", "compositing-2/Overview.bs"].includes(string(sourceRows[carrier[1]][0], "blend carrier source"))
        && contextRows[carrier[12]][1].some((section) => string(section[2], "blend heading title") === "normal blend mode")).length;
    const cssDisplaySourceIndex = sourceRows.findIndex((row) => string(row[0], "source path") === "css-display-3/Overview.bs");
    const cssDisplayCommentOperationLeaks = intervals.filter((row) => row[1] === cssDisplaySourceIndex && row[2] >= 1241 && row[3] <= 1310).length;
    const escapedPromiseLeaks = referenceRows.filter((row) => string(sourceRows[row[1]][0], "escaped source") === "web-animations-1/Overview.bs" && string(row[5], "escaped raw") === "[[PromiseIsHandled]]").length;
    const rawRunningLeaks = referenceRows.filter((row) => string(sourceRows[row[1]][0], "raw running source") === "css-animations-2/Overview.bs" && string(row[5], "raw running") === "'running'").length;
    assert(cssColorHrefWitnesses === 1 && escapedPromiseLeaks === 0 && escapedPromiseExclusions === 1 && rawRunningLeaks === 0 && rawRunningExclusions === 2, "exact V7 reference regression witnesses");
    assert(corruptBlendHeadingContexts === 0 && normalBlendHeadingWitnesses === 2 && cssDisplayCommentOperationLeaks === 0, "exact V7 structure regression witnesses");

    const compatibility = shardObjects.compatibility;
    assert(compatibility.count === compatibility.rows.length && compatibility.rows.length === 52, "compatibility count relation");
    assert(compatibility.primary_runtime_count + compatibility.primary_type_count === compatibility.primary_total_count && compatibility.primary_total_count === compatibility.count, "primary 52 count relation");
    assertUnique(compatibility.rows.map((row) => string(row[0], "compatibility symbol")), "compatibility symbols");
    let consumerCount = 0;
    for (const [index, row] of compatibility.rows.entries()) {
        const surface = string(row[1], `compatibility ${index} surface`); assert(["runtime", "type"].includes(surface), `compatibility ${index} surface value`); if (row[3]) consumerCount += 1; for (const evidence of row[4]) { string(evidence[0], `compatibility ${index} consumer path`); assert(evidence[1] >= 1, `compatibility ${index} consumer line`); } assert(row[5] === null, `compatibility ${index} must remain DAG-unjoined`); red(row[6], `compatibility ${index} status`); assert(codes[row[6]] === "RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG", `compatibility ${index} explicit unjoined status`); redFlags(row[7], `compatibility ${index} flags`);
    }
    assert(consumerCount === compatibility.primary_consumer_count && consumerCount === 37, "primary consumer symbol count relation");
    assert(compatibility.dag_family_joined_count === 0, "DAG family joined count must remain zero");
    if (evidence !== undefined) {
        for (let index = 0; index < compatibility.rows.length; index += 1) {
            const row = compatibility.rows[index]; const symbol = evidence.exports.all[index]; const uses = evidence.consumers.symbols.get(symbol) ?? [];
            assert(string(row[0], `compatibility ${index} symbol`) === symbol, `primary export symbol row ${index}`);
            assert(string(row[1], `compatibility ${index} surface`) === (evidence.exports.runtime.includes(symbol) ? "runtime" : "type"), `primary export surface ${index}`);
            assert(row[2] === evidence.exports.evidence.get(symbol) && row[3] === evidence.consumers.symbols.has(symbol), `primary export evidence ${index}`);
            const actualUses = row[4].map(([pathS, line]) => [string(pathS, `compatibility ${index} consumer path`), line]);
            assert(JSON.stringify(actualUses) === JSON.stringify(uses), `primary consumer evidence ${index}`);
        }
    }

    const ownerScope = shardObjects.owner_scope;
    assert(ownerScope.count === ownerScope.rows.length, "owner scope count relation");
    const ownerSourceLines = evidence?.owner_scope_bytes.toString("utf8").split(/\r?\n/);
    for (const [index, row] of ownerScope.rows.entries()) {
        string(row[0], `owner scope ${index} id`);
        for (const input of row[1]) {
            const inputText = string(input[1], `owner scope ${index} input line`);
            assert(sha256(Buffer.from(inputText, "utf8")) === input[2], `owner scope ${index} input line text/hash relation`);
            if (ownerSourceLines !== undefined) assert(ownerSourceLines[input[0] - 1] === inputText, `owner scope ${index} authenticated source-line text`);
        }
        assertIndexes(row[2], strings.length, `owner scope ${index} terms`); assertIndexes(row[3], carrierRows.length, `owner scope ${index} carriers`); assert(row[4] === null, `owner scope ${index} reviewed normalization`); red(row[5], `owner scope ${index} status`); redFlags(row[6], `owner scope ${index} flags`);
    }

    const recomputedCounts = {
        sources: sourceRows.length, strings: strings.length, contexts: contextRows.length, carriers: carrierRows.length,
        operation_candidate_rows: candidates.length, operation_unique_intervals: intervals.length, operation_alias_groups: operations.alias_rows.length,
        algorithm_openings: operations.algorithm_opening_rows.length, required_operation_joins: operations.required_join_rows.length,
        references: referenceRows.length,
        lexical_candidates: lexicalRows.length, lexical_included: lexicalIncluded, lexical_reviewed_excluded: lexicalExcluded,
        typed_modifier_references: typedModifiers, dated_tr_references: datedTrReferences,
        bibliography_modifier_references: bibliographyModifiers,
        multiline_bibliographic_references: multilineBibliographicReferences,
        multiline_definition_references: multilineDefinitionReferences,
        bikeshed_code_references: bikeshedCodeReferences,
        code_link_positive_witnesses: codeLinkPositiveWitnesses,
        css_color_5_href_witnesses: cssColorHrefWitnesses,
        escaped_promise_leaks: escapedPromiseLeaks,
        escaped_promise_exclusions: escapedPromiseExclusions,
        raw_running_leaks: rawRunningLeaks,
        raw_running_exclusions: rawRunningExclusions,
        corrupt_blend_heading_contexts: corruptBlendHeadingContexts,
        normal_blend_heading_witnesses: normalBlendHeadingWitnesses,
        css_display_comment_operation_leaks: cssDisplayCommentOperationLeaks,
        false_security_heading_ancestry: falseSecurityHeadingAncestry, multiline_heading_context_witnesses: 1,
        terminal_punctuation_urls: terminalPunctuationUrls,
        excluded_raw_literal_leaks: 0, inherited_scope_fixture_joins: 1,
        compatibility: compatibility.rows.length, keyframes_consumers: consumerCount, owner_scope: ownerScope.rows.length,
        reviewed_operations: operations.reviewed_operation_count, reviewed_owners: 0, owner_edges: 0,
    };
    assert(JSON.stringify(manifest.counts) === JSON.stringify(recomputedCounts), "manifest count map recomputation");
    for (const name of ["denominator", "semantic", "owner", "operation", "compatibility", "conformance", "parser", "feature", "cost_lattice", "movement", "integration", "production"]) assert(manifest.credits[name] === 0, `zero-credit contract ${name}`);
    assert(manifest.credits.owner_edges.length === 0 && manifest.credits.costed_owner_formation === false, "zero-credit owner/cost contract");
    return { validators, counts: recomputedCounts, algorithm_openings: operations.algorithm_opening_rows.length, literal_div_algorithm_openings: literalDivAlgorithmCount, scoped_css_references: scopedCss, scoped_idl_references: scopedIdl };
}

export function manifestContentDigest(manifest) {
    return relationDigest(manifest);
}
