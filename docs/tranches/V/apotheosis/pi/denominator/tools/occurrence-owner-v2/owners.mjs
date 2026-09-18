import { bindDefinitionList, contextAt } from "./context.mjs";
import { byteSort, canonicalGrammarName, canonicalName, legacySlug, sha256, uniqueSorted } from "./shared.mjs";

function symbolKey(carrier, name) {
    const type = carrier.kind === "grammar_production" ? "production" : "definition";
    const canonical = type === "production" ? canonicalGrammarName(name) : canonicalName(name);
    return `${type}\0${canonical}`;
}

export function formFailClosedCarriers(v1Carriers, sourceState) {
    const duplicateIntervals = new Map();
    const legacySlugs = new Map();
    const symbolOwners = new Map();
    for (const carrier of v1Carriers) {
        const intervalKey = `${carrier.source_path}\0${carrier.start_offset}\0${carrier.end_offset_exclusive}\0${carrier.raw_slice_sha256}`;
        const intervals = duplicateIntervals.get(intervalKey) ?? [];
        intervals.push(carrier.id);
        duplicateIntervals.set(intervalKey, intervals);
        for (const name of carrier.names) {
            const slug = legacySlug(name);
            const names = legacySlugs.get(slug) ?? new Map();
            names.set(name, [...(names.get(name) ?? []), carrier.id]);
            legacySlugs.set(slug, names);
            if (carrier.owner_join?.owner !== null && carrier.owner_join?.owner !== undefined) {
                const key = symbolKey(carrier, name);
                const owners = symbolOwners.get(key) ?? new Map();
                owners.set(carrier.owner_join.owner, [...(owners.get(carrier.owner_join.owner) ?? []), carrier.id]);
                symbolOwners.set(key, owners);
            }
        }
    }

    const rows = v1Carriers.map((carrier) => {
        const state = sourceState.get(carrier.source_path);
        if (state === undefined) throw new Error(`carrier source state absent: ${carrier.id}`);
        const slice = state.source.bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive);
        if (slice.length !== carrier.raw_slice_bytes || sha256(slice) !== carrier.raw_slice_sha256) throw new Error(`v1 carrier slice replay mismatch: ${carrier.id}`);
        const lineStart = state.source.lines[carrier.start_line - 1]?.start;
        const lineEnd = state.source.lines[carrier.end_line - 1]?.end;
        if (lineStart !== carrier.start_offset || lineEnd !== carrier.end_offset_exclusive) throw new Error(`v1 carrier line/offset replay mismatch: ${carrier.id}`);
        const inherited = contextAt(state.context, carrier.start_line - 1);
        const flags = [
            "RED_V1_SEMANTIC_AND_OWNER_DISPOSITION_REJECTED",
            "RED_UNREVIEWED_SEMANTIC_DISPOSITION",
            "RED_UNREVIEWED_OWNER_DISPOSITION",
            ...inherited.red_flags,
        ];
        const intervalKey = `${carrier.source_path}\0${carrier.start_offset}\0${carrier.end_offset_exclusive}\0${carrier.raw_slice_sha256}`;
        const duplicates = duplicateIntervals.get(intervalKey) ?? [];
        if (duplicates.length > 1) flags.push("RED_DUPLICATED_CARRIER_INTERVAL");
        if (carrier.names.length > 1) flags.push("RED_MULTI_NAME_DEFINITION");
        if (carrier.kind === "function_definition") flags.push("RED_FUNCTION_OWNER_REVIEW_REQUIRED");
        if ((carrier.owner_join?.candidates?.length ?? 0) > 1) flags.push("RED_MULTI_DOMAIN_CANDIDATE");
        for (const name of carrier.names) {
            const slugNames = legacySlugs.get(legacySlug(name));
            if ((slugNames?.size ?? 0) > 1) flags.push("RED_LEGACY_SLUG_COLLISION");
            const owners = symbolOwners.get(symbolKey(carrier, name));
            if ((owners?.size ?? 0) > 1) flags.push("RED_SAME_SYMBOL_MULTI_OWNER");
        }
        if (/algorithm|invalidity_recovery|serialization|required_algorithm/.test(carrier.kind)) {
            flags.push("RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED");
        }
        const raw = slice.toString("utf8");
        const definitionBoundary = /<dt\b/i.test(raw) ? bindDefinitionList(state.source.bytes, state.source.lines, carrier.start_line) : null;
        if (definitionBoundary?.status.includes("INCOMPLETE")) flags.push("RED_DEFINITION_BOUNDARY_INCOMPLETE");
        if (definitionBoundary?.status === "RED_UNREVIEWED_DT_DD_BOUNDARY") flags.push("RED_DT_DD_BOUNDARY_UNREVIEWED");
        return {
            id: carrier.id,
            discovery_authority: "REJECTED_V1_CONTENT_ADDRESSED_DISCOVERY_ONLY",
            v1_discovery_row: carrier,
            inherited_context: inherited,
            definition_list_boundary: definitionBoundary,
            duplicated_exact_interval_carrier_ids: duplicates.length > 1 ? duplicates.sort(byteSort) : [],
            semantic_disposition: "RED_UNREVIEWED",
            owner_disposition: "RED_UNREVIEWED",
            reviewed_operation_boundary_id: null,
            reviewed_owner: null,
            eligible_for_owner_edge: false,
            eligible_for_cost_lattice: false,
            red_flags: uniqueSorted(flags),
        };
    }).sort((left, right) => byteSort(left.id, right.id));

    return {
        rows,
        diagnostics: {
            duplicate_interval_groups: [...duplicateIntervals.values()].filter((ids) => ids.length > 1).length,
            duplicate_interval_carriers: rows.filter((row) => row.red_flags.includes("RED_DUPLICATED_CARRIER_INTERVAL")).length,
            multi_name_carriers: rows.filter((row) => row.red_flags.includes("RED_MULTI_NAME_DEFINITION")).length,
            function_carriers: rows.filter((row) => row.red_flags.includes("RED_FUNCTION_OWNER_REVIEW_REQUIRED")).length,
            multi_domain_carriers: rows.filter((row) => row.red_flags.includes("RED_MULTI_DOMAIN_CANDIDATE")).length,
            legacy_slug_collision_carriers: rows.filter((row) => row.red_flags.includes("RED_LEGACY_SLUG_COLLISION")).length,
            same_symbol_multi_owner_carriers: rows.filter((row) => row.red_flags.includes("RED_SAME_SYMBOL_MULTI_OWNER")).length,
            context_incomplete_carriers: rows.filter((row) => row.red_flags.includes("RED_SECTION_CONTEXT_INCOMPLETE") || row.red_flags.includes("RED_CONTAINER_CONTEXT_INCOMPLETE")).length,
            algorithm_or_serialization_incomplete_carriers: rows.filter((row) => row.red_flags.includes("RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED")).length,
            carriers_with_red: rows.filter((row) => row.red_flags.length > 0).length,
        },
    };
}

export function carrierFixtureFlags(carrier) {
    const flags = [];
    if (carrier.names.length > 1) flags.push("RED_MULTI_NAME_DEFINITION");
    if (carrier.kind === "function_definition") flags.push("RED_FUNCTION_OWNER_REVIEW_REQUIRED");
    if ((carrier.owner_join?.candidates?.length ?? 0) > 1) flags.push("RED_MULTI_DOMAIN_CANDIDATE");
    return uniqueSorted(flags);
}
