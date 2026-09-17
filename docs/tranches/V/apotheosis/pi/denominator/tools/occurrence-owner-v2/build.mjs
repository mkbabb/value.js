import { buildContext, contextSummary, discoverOperationCandidates } from "./context.mjs";
import { buildCompatibilityRows, buildOwnerScopeRows } from "./mappings.mjs";
import { formFailClosedCarriers } from "./owners.mjs";
import { discoverReferences } from "./references.mjs";
import { byteSort, sha256, uniqueSorted } from "./shared.mjs";

function sourceState(evidence) {
    const result = new Map();
    for (const source of evidence.sources) {
        const context = buildContext(source.lines);
        result.set(source.exact_path, { source, context });
    }
    return result;
}

function requiredCounterexamples(v1, carrierRows) {
    const carriers = new Map(carrierRows.map((row) => [row.id, row]));
    return v1.required_algorithmic_counterexamples.map((requirement) => {
        const row = carriers.get(requirement.carrier_id);
        if (row === undefined) throw new Error(`required counterexample absent: ${requirement.carrier_id}`);
        const carrier = row.v1_discovery_row;
        if (carrier.source_path !== requirement.source_path || carrier.start_line !== requirement.start_line || carrier.end_line !== requirement.end_line) {
            throw new Error(`required counterexample boundary mismatch: ${requirement.carrier_id}`);
        }
        return {
            ...requirement,
            raw_slice_sha256: carrier.raw_slice_sha256,
            raw_slice_bytes: carrier.raw_slice_bytes,
            exact_discovery_slice_replayed: true,
            operation_review_status: "RED_UNREVIEWED_OPERATION_BOUNDARY",
            denominator_or_parser_credit: 0,
        };
    });
}

export function buildPayload({ evidence, toolIdentity, schemaIdentity, fixtureReceipt }) {
    const state = sourceState(evidence);
    const v1Carriers = evidence.v1.occurrence_carriers.rows;
    const carrierFormation = formFailClosedCarriers(v1Carriers, state);
    const operationCandidates = [...state.values()]
        .flatMap(({ source, context }) => discoverOperationCandidates(source.exact_path, source.bytes, source.lines, context))
        .sort((left, right) => byteSort(left.id, right.id));
    if (new Set(operationCandidates.map((row) => row.id)).size !== operationCandidates.length) throw new Error("v2 operation candidate ID collision");
    const referenceFormation = discoverReferences(evidence.sources, v1Carriers);
    const compatibilityRows = buildCompatibilityRows(evidence.coverageCensuses, evidence.piLineEvidence);
    const ownerScopeRows = buildOwnerScopeRows(evidence.v1, evidence.derived.addenda01.raw);
    const sourceRows = evidence.v1.source_closure.sources.map((v1Source) => {
        const current = state.get(v1Source.exact_path);
        if (current === undefined) throw new Error(`v1 source missing from authenticated v2 closure: ${v1Source.exact_path}`);
        return {
            exact_path: v1Source.exact_path,
            authentication: {
                sha256_raw_source: v1Source.sha256_raw_source,
                git_blob_oid_sha1: v1Source.git_blob_oid_sha1,
                raw_source_bytes: v1Source.raw_source_bytes,
                full_bytes_read_and_hash_verified: true,
            },
            membership: {
                root_seed_membership: v1Source.root_seed_membership,
                route: v1Source.root_seed_membership ? "AUTHENTICATED_SEED_DISCOVERY_ONLY" : "AUTHENTICATED_COMPLEMENT_DISCOVERY_RED",
                terminal_exclusion_authorized: false,
            },
            source_format: v1Source.source_format,
            rejected_v1_source_row: v1Source,
            v2_context_discovery: contextSummary(current.context),
            semantic_disposition: "RED_UNREVIEWED",
        };
    });
    const carrierRows = carrierFormation.rows;
    const referenceRows = referenceFormation.references;
    const allReferenceRed = referenceRows.filter((row) => row.red_flags.length > 0).length;
    const redFlagCounts = {};
    for (const row of carrierRows) for (const flag of row.red_flags) redFlagCounts[flag] = (redFlagCounts[flag] ?? 0) + 1;
    const referenceFlagCounts = {};
    for (const row of referenceRows) for (const flag of row.red_flags) referenceFlagCounts[flag] = (referenceFlagCounts[flag] ?? 0) + 1;
    const operationFlagCounts = {};
    for (const row of operationCandidates) for (const flag of row.red_flags) operationFlagCounts[flag] = (operationFlagCounts[flag] ?? 0) + 1;
    const required = requiredCounterexamples(evidence.v1, carrierRows);

    return {
        schema_version: "value.pi.full-source-occurrence-owner-formation/v2",
        status: "PROVISIONAL_AWAITING_TWO_CHALLENGES_AND_GESTALT",
        date: "2026-07-22",
        authority: {
            denominator_credit: 0,
            parser_credit: 0,
            owner_graph_credit: 0,
            cost_lattice_credit: 0,
            compatibility_credit: 0,
            conformance_credit: 0,
            production_authorized: false,
            terminal_source_exclusions_authorized: 0,
            governing_rule: "Authentication is byte evidence only. Every unreviewed semantic boundary, reference resolution, compatibility disposition, and owner disposition defaults RED.",
        },
        rejected_v1_input: {
            authority: "REJECTED_AUTHENTICATED_DISCOVERY_INPUT_ONLY",
            identities: evidence.identities.pinned,
            v1_payload_digest_sha256: evidence.v1.content_digest_sha256,
            retained_facts_only: {
                authenticated_sources: 168,
                authenticated_source_bytes: 14609103,
                exact_discovery_carriers: 17079,
                required_slices: 10,
            },
            semantic_statuses_carried_forward: 0,
            owner_edges_carried_forward: 0,
            lattice_rows_carried_forward: 0,
        },
        generator_and_schema_identity: {
            schema: schemaIdentity,
            generator_files: toolIdentity.files,
            generator_identity_method: toolIdentity.method,
            generator_identity_sha256: toolIdentity.sha256,
        },
        authenticated_evidence: {
            verified_commit: evidence.v1.verified_commit,
            verified_commit_tree: evidence.v1.verified_commit_tree,
            pinned_input_identities: evidence.identities.derived_inputs,
            complement_membership: evidence.membership,
            exact_dag_subject: {
                repo_relative_path: evidence.derived.moduleDag.repo_relative_path,
                sha256: evidence.derived.moduleDag.sha256,
                bytes: evidence.derived.moduleDag.bytes,
                parsed_node_count: evidence.dag.nodes.length,
                parsed_edge_count: evidence.dag.edges.length,
                parsed_nodes: evidence.dag.nodes,
                parsed_edges: evidence.dag.edges,
                acyclic: evidence.dag.acyclic,
                stylesheet_root_reachable_nodes: evidence.dag.stylesheet_root_reachable_nodes,
            },
            evidence_derived_compatibility_censuses: {
                source_path: evidence.derived.coverage.repo_relative_path,
                source_sha256: evidence.derived.coverage.sha256,
                runtime_exports: evidence.coverageCensuses.runtime,
                type_exports: evidence.coverageCensuses.types,
                runtime_count: evidence.coverageCensuses.runtime.length,
                type_count: evidence.coverageCensuses.types.length,
                exact_export_identity: "19 + 33 = 52",
                keyframes_consumer_symbols: evidence.coverageCensuses.consumers,
                keyframes_consumer_count: evidence.coverageCensuses.consumers.length,
                exact_consumer_identity: "37",
                counts_derived_from_pinned_coverage_evidence_not_generator_constants: true,
            },
        },
        authenticated_source_closure: {
            count: sourceRows.length,
            exact_raw_source_bytes_read: evidence.sourceBytes,
            every_source_byte_read_and_hash_verified: true,
            no_source_silently_excluded: true,
            rows: sourceRows,
        },
        discovery_carrier_substrate: {
            authority: "EXACT_REJECTED_V1_DISCOVERY_ROWS_WITH_NEW_FAIL_CLOSED_DISPOSITIONS",
            count: carrierRows.length,
            exact_v1_carrier_ids_preserved: carrierRows.length === 17079,
            exact_slices_replayed: true,
            every_row_red: carrierFormation.diagnostics.carriers_with_red === carrierRows.length,
            diagnostics: carrierFormation.diagnostics,
            red_flag_counts: Object.fromEntries(Object.entries(redFlagCounts).sort(([left], [right]) => byteSort(left, right))),
            rows: carrierRows,
        },
        operation_boundary_formation: {
            separation_rule: "Candidates are mechanically discovered with inherited section/container context. Only independently reviewed, content-addressed boundaries may enter reviewed_operation_boundaries.",
            candidate_count: operationCandidates.length,
            reviewed_count: 0,
            every_candidate_red: operationCandidates.every((row) => row.review_status.startsWith("RED_")),
            candidate_kinds: Object.fromEntries(uniqueSorted(operationCandidates.map((row) => row.kind)).map((kind) => [kind, operationCandidates.filter((row) => row.kind === kind).length])),
            red_flag_counts: Object.fromEntries(Object.entries(operationFlagCounts).sort(([left], [right]) => byteSort(left, right))),
            reviewed_operation_boundaries: [],
            candidates: operationCandidates,
        },
        typed_scoped_reference_discovery: {
            discovery_scope: "FULL_AUTHENTICATED_SOURCE_BYTES",
            count: referenceRows.length,
            every_occurrence_preserves_raw_spelling_type_scope_marker_and_anchor: true,
            exact_target_carrier_ids_serialized: true,
            multiple_target_occurrences_ambiguous_regardless_of_rejected_owner_string: true,
            owner_edges_emitted: 0,
            every_reference_red: allReferenceRed === referenceRows.length,
            red_flag_counts: Object.fromEntries(Object.entries(referenceFlagCounts).sort(([left], [right]) => byteSort(left, right))),
            rows: referenceRows,
        },
        required_algorithmic_counterexamples: {
            count: required.length,
            all_ten_exact_v1_slices_preserved_and_replayed: required.length === 10,
            all_remain_red_pending_operation_review: true,
            rows: required,
        },
        owner_scope_inputs: {
            count: ownerScopeRows.length,
            exact_input_line_or_reviewed_normalization_required: true,
            reviewed_normalizations: 0,
            every_row_red: ownerScopeRows.every((row) => row.status.startsWith("RED_")),
            rows: ownerScopeRows,
        },
        compatibility_obligations: {
            mapping_method: "EXPLICIT_CONTENT_ADDRESSED_TABLE_ONLY; NO SYMBOL-NAME REGEX",
            total_export_count: compatibilityRows.length,
            keyframes_consumer_count: compatibilityRows.filter((row) => row.keyframes_consumer_seam).length,
            timing_functions_candidate_family: "easing",
            parse_issue_and_result_boundary: "RED_PENDING_NON_TOKEN_RESULT_DIAGNOSTICS_BOUNDARY",
            rows: compatibilityRows,
            status: "RED_NO_COMPATIBILITY_CREDIT",
        },
        owner_formation: {
            reviewed_carriers_eligible: 0,
            semantic_owner_edges: [],
            owner_cost_lattice_emitted: false,
            reason: "Every carrier and operation candidate is unreviewed; duplicated intervals and ambiguous identities are ineligible. No heuristic v1 owner is consumed.",
            status: "RED_NO_OWNER_GRAPH_OR_COST_LATTICE",
        },
        adversarial_fixture_receipt: fixtureReceipt,
        validation: {
            exact_168_sources: sourceRows.length === 168,
            exact_76_seed_plus_92_complement_from_pinned_sets: evidence.membership.seed_count === 76 && evidence.membership.complement_count === 92,
            exact_17079_rejected_discovery_carriers_preserved: carrierRows.length === 17079,
            exact_ten_required_slices_preserved: required.length === 10,
            exact_dag_subject_parsed_not_redeclared: evidence.dag.nodes.length === 16 && evidence.dag.edges.length === 46,
            exact_52_identity_from_pinned_evidence: compatibilityRows.length === 52,
            exact_37_identity_from_pinned_evidence: compatibilityRows.filter((row) => row.keyframes_consumer_seam).length === 37,
            zero_non_red_carriers: carrierRows.filter((row) => row.red_flags.length === 0).length === 0,
            zero_non_red_references: referenceRows.filter((row) => row.red_flags.length === 0).length === 0,
            zero_non_red_operation_candidates: operationCandidates.filter((row) => row.red_flags.length === 0).length === 0,
            zero_owner_edges: true,
            zero_cost_lattice: true,
            fixture_suite_green: fixtureReceipt.failed === 0,
        },
        red_mass: {
            source_semantic_rows_red: sourceRows.length,
            discovery_carriers_red: carrierFormation.diagnostics.carriers_with_red,
            operation_candidates_red: operationCandidates.length,
            typed_scoped_references_red: allReferenceRed,
            owner_scope_rows_red: ownerScopeRows.length,
            compatibility_rows_red: compatibilityRows.length,
            reviewed_operation_boundaries: 0,
            reviewed_owner_dispositions: 0,
            semantic_owner_edges: 0,
        },
        blockers: [
            "Two independent hostile challenges and a fresh root gestalt have not adjudicated this exact v2 artifact hash.",
            "All mechanically discovered semantic and operation boundaries remain RED pending content-addressed human review.",
            "All typed/scoped reference resolutions remain RED; external targets and multiple target carrier occurrences are not owner edges.",
            "All compatibility candidates remain RED; ParseIssue and ParseResult require a non-token result/diagnostics boundary.",
            "No carrier is eligible for semantic ownership or cost while unreviewed, duplicated, ambiguous, or context-incomplete.",
            "No denominator, parser, conformance, compatibility, wave, cost, or production credit is granted.",
        ],
    };
}

export function payloadDigest(payload) {
    return sha256(Buffer.from(JSON.stringify(payload), "utf8"));
}
