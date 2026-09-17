import { byteSort, canonicalBytes, sha256, stableId, StringInterner, uniqueSorted } from "./shared.mjs";
import { RED } from "./discover.mjs";

const SHARD_SCHEMA_VERSION = "value.pi.occurrence-owner-shard/v7";

function contextKey(context) {
    return JSON.stringify(context);
}

function addContextStrings(interner, context) {
    for (const section of context.sections) {
        interner.add(section[0]);
        interner.add(section[2]);
        interner.add(section[3]);
        for (const marker of section[6]) interner.add(marker);
    }
    for (const container of context.containers) {
        interner.add(container[0]);
        for (const name of container[1]) interner.add(name);
        interner.add(container[2]);
        for (const marker of container[6]) interner.add(marker);
    }
    for (const marker of context.markers) interner.add(marker);
}

function encodeContext(interner, id, context) {
    return [
        id,
        context.sections.map((row) => [interner.index(row[0]), row[1], interner.index(row[2]), interner.index(row[3]), row[4], row[5], row[6].map((item) => interner.index(item))]),
        context.containers.map((row) => [interner.index(row[0]), row[1].map((item) => interner.index(item)), interner.index(row[2]), row[3], row[4], row[5], row[6].map((item) => interner.index(item))]),
        context.markers.map((item) => interner.index(item)),
        context.complete,
    ];
}

function makeTable(table, columns, rows) {
    return { schema_version: SHARD_SCHEMA_VERSION, table, columns, count: rows.length, rows };
}

function shard(name, object) {
    const bytes = canonicalBytes(object);
    return { name, object, bytes, identity: { logical_path: `shards/${name}`, table: object.table, bytes: bytes.length, sha256: sha256(bytes), count: object.count } };
}

export function assembleTables(evidence, discovery) {
    const interner = new StringInterner();
    const codeValues = new Set(Object.values(RED));
    const sources = [...evidence.sources].sort((a, b) => byteSort(a.exact_path, b.exact_path));
    const sourceIndex = new Map(sources.map((source, index) => [source.exact_path, index]));
    const carriers = [...discovery.carriers].sort((a, b) => byteSort(a.id, b.id));
    const carrierIndex = new Map(carriers.map((carrier, index) => [carrier.id, index]));

    const contextsByKey = new Map();
    for (const carrier of carriers) contextsByKey.set(contextKey(carrier.context), carrier.context);
    for (const candidate of discovery.operations.candidates) contextsByKey.set(contextKey(candidate.context), candidate.context);
    const contextKeys = [...contextsByKey.keys()].sort(byteSort);
    const contextIndex = new Map(contextKeys.map((key, index) => [key, index]));

    for (const source of sources) {
        interner.add(source.exact_path);
        interner.add(source.source_format);
    }
    for (const key of contextKeys) addContextStrings(interner, contextsByKey.get(key));
    for (const carrier of carriers) {
        interner.add(carrier.kind);
        interner.add(carrier.extraction);
        interner.add(carrier.anchor);
        for (const name of carrier.names) interner.add(name);
        for (const flag of carrier.red_flags_v7) codeValues.add(flag);
    }
    for (const candidate of discovery.operations.candidates) {
        interner.add(candidate.kind);
        interner.add(candidate.extraction);
        for (const flag of candidate.red_flags) codeValues.add(flag);
    }
    for (const opening of discovery.operations.algorithmOpenings) interner.add(opening.raw_opening);
    for (const reference of discovery.references) {
        interner.add(reference.raw);
        interner.add(reference.type);
        interner.add(reference.name);
        interner.add(reference.canonical);
        interner.add(reference.scope);
        interner.add(reference.anchor);
        interner.add(reference.link_text);
        interner.add(reference.normative);
        interner.add(reference.link_type);
        interner.add(reference.modifier);
        interner.add(reference.processing_context);
        interner.add(reference.target_form);
        codeValues.add(reference.status);
        for (const flag of reference.red_flags) codeValues.add(flag);
    }
    for (const requirement of evidence.v1.required_algorithmic_counterexamples) interner.add(requirement.requirement);
    for (const symbol of evidence.exports.all) {
        interner.add(symbol);
        interner.add(evidence.exports.runtime.includes(symbol) ? "runtime" : "type");
    }
    interner.add("EXACT");
    interner.add("ENCLOSING");
    interner.add("UNJOINED");
    interner.add("src/css/index.ts");
    for (const file of evidence.consumers.files) interner.add(file.exact_path);
    const ownerLines = evidence.owner_scope_bytes.toString("utf8").split(/\r?\n/);
    for (const row of evidence.owner_scope_rows) {
        interner.add(row.id);
        for (const term of row.search_terms) interner.add(term);
        for (const line of row.input_lines) interner.add(ownerLines[line - 1]);
    }
    codeValues.add(RED.COMPATIBILITY);
    codeValues.add(RED.OWNER_SCOPE);

    const stringValues = interner.freeze();
    const codes = [...codeValues].sort(byteSort);
    const codeIndex = new Map(codes.map((code, index) => [code, index]));
    const code = (value) => {
        if (!codeIndex.has(value)) throw new Error(`unknown code: ${value}`);
        return codeIndex.get(value);
    };

    const codeTable = makeTable("codes", ["code"], codes.map((value) => [value]));
    const stringTable = makeTable("strings", ["value"], stringValues.map((value) => [value]));
    const sourceRows = sources.map((source) => [interner.index(source.exact_path), interner.index(source.source_format), source.sha256_raw_source, source.git_blob_oid_sha1, source.raw_source_bytes, source.lines.length, source.root_seed_membership, code(RED.UNREVIEWED)]);
    const sourceTable = makeTable("sources", ["path_s", "format_s", "sha256", "git_blob_sha1", "bytes", "lines", "seed", "status_c"], sourceRows);
    const contextRows = contextKeys.map((key, index) => encodeContext(interner, stableId("ctxv7", [key]), contextsByKey.get(key)));
    const contextTable = makeTable("contexts", ["id", "sections", "containers", "markers_s", "complete"], contextRows);

    const carrierRows = carriers.map((carrier) => [
        carrier.id,
        sourceIndex.get(carrier.source_path),
        interner.index(carrier.kind),
        interner.index(carrier.extraction),
        carrier.start_line,
        carrier.end_line,
        carrier.start_offset,
        carrier.end_offset_exclusive,
        carrier.raw_slice_sha256,
        carrier.raw_slice_bytes,
        carrier.names.map((name) => interner.index(name)),
        interner.index(carrier.anchor),
        contextIndex.get(contextKey(carrier.context)),
        code(RED.UNREVIEWED),
        carrier.red_flags_v7.map(code).sort((a, b) => a - b),
    ]);
    const carrierTable = makeTable("carriers", ["id", "source_i", "kind_s", "extraction_s", "start_line", "end_line", "start_offset", "end_offset", "slice_sha256", "slice_bytes", "names_s", "anchor_s", "context_i", "status_c", "flags_c"], carrierRows);

    const intervalMap = new Map();
    for (const candidate of discovery.operations.candidates) {
        const key = `${candidate.source_path}\0${candidate.start_offset}\0${candidate.end_offset_exclusive}\0${candidate.raw_slice_sha256}`;
        const entry = intervalMap.get(key) ?? { key, source_path: candidate.source_path, start_line: candidate.start_line, end_line: candidate.end_line, start_offset: candidate.start_offset, end_offset: candidate.end_offset_exclusive, sha256: candidate.raw_slice_sha256, bytes: candidate.raw_slice_bytes, context: candidate.context, candidates: [], flags: new Set() };
        entry.candidates.push(candidate);
        for (const flag of candidate.red_flags) entry.flags.add(flag);
        intervalMap.set(key, entry);
    }
    const intervals = [...intervalMap.values()].sort((a, b) => byteSort(a.key, b.key));
    const intervalIndex = new Map(intervals.map((interval, index) => [interval.key, index]));
    const candidateRows = [];
    const candidateIndex = new Map();
    for (const candidate of discovery.operations.candidates) {
        const key = `${candidate.source_path}\0${candidate.start_offset}\0${candidate.end_offset_exclusive}\0${candidate.raw_slice_sha256}`;
        candidateIndex.set(candidate.id, candidateRows.length);
        candidateRows.push([candidate.id, intervalIndex.get(key), interner.index(candidate.kind), interner.index(candidate.extraction), code(RED.OPERATION)]);
    }
    const intervalRows = intervals.map((interval) => [stableId("opv7i", [interval.source_path, interval.start_offset, interval.end_offset, interval.sha256]), sourceIndex.get(interval.source_path), interval.start_line, interval.end_line, interval.start_offset, interval.end_offset, interval.sha256, interval.bytes, contextIndex.get(contextKey(interval.context)), code(RED.OPERATION), [...interval.flags].map(code).sort((a, b) => a - b)]);
    const aliasRows = intervals.map((interval, index) => [index, interval.candidates.map((candidate) => candidateIndex.get(candidate.id)).sort((a, b) => a - b)]).filter((row) => row[1].length > 1);
    const openingRows = discovery.operations.algorithmOpenings.map((opening) => [sourceIndex.get(opening.source_path), opening.line, opening.offset, interner.index(opening.raw_opening), opening.candidate_ids.map((id) => candidateIndex.get(id)).filter((index) => index !== undefined).sort((a, b) => a - b), code(RED.OPERATION)]);
    const requiredRows = evidence.v1.required_algorithmic_counterexamples.map((requirement) => {
        const carrierI = carrierIndex.get(requirement.carrier_id);
        const carrier = carriers[carrierI];
        const exactIntervals = intervals.map((interval, index) => ({ interval, index })).filter(({ interval }) => interval.source_path === requirement.source_path && interval.start_line === requirement.start_line && interval.end_line === requirement.end_line).map(({ index }) => index);
        const enclosing = exactIntervals.length > 0 ? exactIntervals : intervals.map((interval, index) => ({ interval, index })).filter(({ interval }) => interval.source_path === requirement.source_path && interval.start_line <= requirement.start_line && interval.end_line >= requirement.end_line).map(({ index }) => index);
        if (carrier === undefined || enclosing.length === 0) throw new Error(`required slice lacks operation join: ${requirement.requirement}`);
        return [interner.index(requirement.requirement), carrierI, interner.index(exactIntervals.length > 0 ? "EXACT" : "ENCLOSING"), enclosing.sort((a, b) => a - b), code(RED.OPERATION)];
    });
    const operationTable = {
        schema_version: SHARD_SCHEMA_VERSION,
        table: "operations",
        interval_columns: ["id", "source_i", "start_line", "end_line", "start_offset", "end_offset", "slice_sha256", "slice_bytes", "context_i", "status_c", "flags_c"],
        interval_count: intervalRows.length,
        interval_rows: intervalRows,
        candidate_columns: ["id", "interval_i", "kind_s", "extraction_s", "status_c"],
        candidate_count: candidateRows.length,
        candidate_rows: candidateRows,
        alias_columns: ["interval_i", "candidate_rows_i"],
        alias_group_count: aliasRows.length,
        alias_rows: aliasRows,
        algorithm_opening_columns: ["source_i", "line", "offset", "raw_opening_s", "candidate_rows_i", "status_c"],
        algorithm_opening_count: openingRows.length,
        algorithm_opening_rows: openingRows,
        required_join_columns: ["requirement_s", "carrier_i", "relation_s", "intervals_i", "status_c"],
        required_join_count: requiredRows.length,
        required_join_rows: requiredRows,
        reviewed_operation_count: 0,
        count: candidateRows.length,
    };

    const referenceRows = discovery.references.map((reference) => [
        reference.id,
        sourceIndex.get(reference.source_path),
        reference.start_line,
        reference.start_offset,
        reference.end_offset_exclusive,
        interner.index(reference.raw),
        interner.index(reference.type),
        interner.index(reference.name),
        interner.index(reference.canonical),
        interner.index(reference.scope),
        interner.index(reference.anchor),
        interner.index(reference.link_text),
        interner.index(reference.normative),
        interner.index(reference.link_type),
        interner.index(reference.modifier),
        interner.index(reference.processing_context),
        interner.index(reference.target_form),
        reference.target_carrier_ids.map((id) => carrierIndex.get(id)).filter((index) => index !== undefined).sort((a, b) => a - b),
        code(reference.status),
        reference.red_flags.map(code).sort((a, b) => a - b),
    ]);
    const referenceTable = makeTable("references", ["id", "source_i", "start_line", "start_offset", "end_offset", "raw_s", "type_s", "name_s", "canonical_s", "scope_s", "anchor_s", "link_text_s", "normative_s", "link_type_s", "modifier_s", "processing_context_s", "target_form_s", "targets_carrier_i", "status_c", "flags_c"], referenceRows);
    const typedModifierReferences = discovery.references.filter((row) => ["css_shorthand_single", "css_term_double"].includes(row.type) && row.link_type !== null).length;
    const datedTrReferences = discovery.references.filter((row) => row.type === "spec_url" && row.modifier?.startsWith("DATED_TR_")).length;
    const bibliographyModifierReferences = discovery.references.filter((row) => row.type === "bibliographic" && row.modifier !== null).length;
    const multilineBibliographicReferences = discovery.references.filter((row) => row.type === "bibliographic" && /[\r\n]/.test(row.raw)).length;
    const multilineDefinitionReferences = discovery.references.filter((row) => row.type === "definition" && /[\r\n]/.test(row.raw)).length;
    const bikeshedCodeReferences = discovery.references.filter((row) => row.processing_context === "BIKESHED_CODE").length;
    const codeLinkPositiveWitnesses = discovery.references.filter((row) => row.source_path === "css-borders-4/Overview.bs"
        && row.raw === "{{DOMPointReadOnly/x}}" && row.processing_context === "BIKESHED_CODE"
        && [58301, 58332].includes(row.start_offset));
    const terminalPunctuationUrls = discovery.references.filter((row) => row.type === "spec_url" && /[.,;:!\]}]$/.test(row.raw)).length;
    const gridLanes = discovery.references.filter((row) => row.source_path === "css-grid-3/Overview.bs" && row.raw === "''display/grid-lanes''");
    const excludedLiteralKeys = new Set([
        "web-animations-1/Overview.bs\0'finished'",
        "css-highlight-api-1/Overview.bs\0'bar'",
        "fill-stroke-3/Overview.bs\0'MathJax_AMS-Regular'",
        "web-animations-1/Overview.bs\0'-20px'",
    ]);
    const excludedRawLiteralLeaks = discovery.references.filter((row) => excludedLiteralKeys.has(`${row.source_path}\0${row.raw}`)).length;
    if (typedModifierReferences !== 343) throw new Error(`authenticated !!type reference census mismatch: ${typedModifierReferences}`);
    if (datedTrReferences !== 297) throw new Error(`authenticated dated-TR reference census mismatch: ${datedTrReferences}`);
    if (bibliographyModifierReferences !== 6) throw new Error(`authenticated bibliography-modifier census mismatch: ${bibliographyModifierReferences}`);
    if (multilineBibliographicReferences !== 6) throw new Error(`authenticated multiline bibliography census mismatch: ${multilineBibliographicReferences}`);
    if (multilineDefinitionReferences !== 22) throw new Error(`authenticated multiline definition census mismatch: ${multilineDefinitionReferences}`);
    if (bikeshedCodeReferences !== 144) throw new Error(`authenticated Bikeshed-code reference census mismatch: ${bikeshedCodeReferences}`);
    if (codeLinkPositiveWitnesses.length !== 2 || new Set(codeLinkPositiveWitnesses.map((row) => row.start_offset)).size !== 2) throw new Error("authenticated Bikeshed-code positive witnesses absent");
    if (terminalPunctuationUrls !== 0) throw new Error(`URL terminal punctuation retained: ${terminalPunctuationUrls}`);
    if (excludedRawLiteralLeaks !== 0) throw new Error(`raw/code/style literal references leaked: ${excludedRawLiteralLeaks}`);
    if (gridLanes.length !== 1 || gridLanes[0].target_carrier_ids.length !== 1) throw new Error("inherited display/grid-lanes target join mismatch");
    const headingWitness = carriers.find((row) => row.id === "occ-2014a315a54fece6a5af7c1b");
    const headingTitles = headingWitness?.context.sections.map((row) => [row[1], row[2]]) ?? [];
    const falseSecurityHeadingAncestry = headingWitness?.context.sections.filter((row) => /security/i.test(row[2])).length ?? -1;
    if (JSON.stringify(headingTitles) !== JSON.stringify([[2, "Appendix A. Changes"], [3, "Changes since the 18 August 2022 Working Draft"]]) || falseSecurityHeadingAncestry !== 0) throw new Error("authenticated mixed-heading ancestry witness mismatch");

    const consumerSet = new Set(evidence.consumers.symbols.keys());
    const compatibilityRows = evidence.exports.all.map((symbol) => {
        const consumerEvidence = (evidence.consumers.symbols.get(symbol) ?? []).map(([path, line]) => [interner.index(path), line]);
        return [interner.index(symbol), interner.index(evidence.exports.runtime.includes(symbol) ? "runtime" : "type"), evidence.exports.evidence.get(symbol), consumerSet.has(symbol), consumerEvidence, null, code(RED.COMPATIBILITY), [code(RED.COMPATIBILITY)]];
    });
    const compatibilityTable = {
        ...makeTable("compatibility", ["symbol_s", "surface_s", "primary_export_line", "keyframes_consumer", "primary_consumer_evidence", "dag_family_s", "status_c", "flags_c"], compatibilityRows),
        primary_runtime_count: evidence.exports.runtime.length,
        primary_type_count: evidence.exports.types.length,
        primary_total_count: evidence.exports.all.length,
        primary_consumer_count: consumerSet.size,
        dag_family_joined_count: 0,
    };

    const scopeRows = evidence.owner_scope_rows.map((row) => [
        interner.index(row.id),
        row.input_lines.map((line) => [line, interner.index(ownerLines[line - 1]), sha256(Buffer.from(ownerLines[line - 1], "utf8"))]),
        row.search_terms.map((term) => interner.index(term)),
        row.occurrence_carrier_ids.map((id) => carrierIndex.get(id)).filter((index) => index !== undefined).sort((a, b) => a - b),
        null,
        code(RED.OWNER_SCOPE),
        [code(RED.OWNER_SCOPE)],
    ]);
    const scopeTable = makeTable("owner_scope", ["id_s", "exact_input_lines", "rejected_search_terms_s", "discovery_carriers_i", "reviewed_normalization_s", "status_c", "flags_c"], scopeRows);

    const shards = [
        shard("codes.json", codeTable),
        shard("strings.json", stringTable),
        shard("sources.json", sourceTable),
        shard("contexts.json", contextTable),
        shard("carriers.json", carrierTable),
        shard("operations.json", operationTable),
        shard("references.json", referenceTable),
        shard("compatibility.json", compatibilityTable),
        shard("owner-scope.json", scopeTable),
    ];
    return {
        shards,
        objects: Object.fromEntries(shards.map((row) => [row.object.table, row.object])),
        counts: {
            sources: sourceRows.length,
            strings: stringValues.length,
            contexts: contextRows.length,
            carriers: carrierRows.length,
            operation_candidate_rows: candidateRows.length,
            operation_unique_intervals: intervalRows.length,
            operation_alias_groups: aliasRows.length,
            algorithm_openings: openingRows.length,
            required_operation_joins: requiredRows.length,
            references: referenceRows.length,
            typed_modifier_references: typedModifierReferences,
            dated_tr_references: datedTrReferences,
            bibliography_modifier_references: bibliographyModifierReferences,
            multiline_bibliographic_references: multilineBibliographicReferences,
            multiline_definition_references: multilineDefinitionReferences,
            bikeshed_code_references: bikeshedCodeReferences,
            code_link_positive_witnesses: codeLinkPositiveWitnesses.length,
            false_security_heading_ancestry: falseSecurityHeadingAncestry,
            multiline_heading_context_witnesses: 1,
            terminal_punctuation_urls: terminalPunctuationUrls,
            excluded_raw_literal_leaks: excludedRawLiteralLeaks,
            inherited_scope_fixture_joins: gridLanes[0].target_carrier_ids.length,
            compatibility: compatibilityRows.length,
            keyframes_consumers: consumerSet.size,
            owner_scope: scopeRows.length,
            reviewed_operations: 0,
            reviewed_owners: 0,
            owner_edges: 0,
        },
    };
}
