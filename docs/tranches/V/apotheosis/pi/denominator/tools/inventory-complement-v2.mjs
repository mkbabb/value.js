import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const EXPECTED_UNIVERSE_SHA256 = "c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7";
const EXPECTED_V1_SHA256 = "1ec512250bafc09f510194b48e3fb87f4427b83c84a6a543b58e81040ae18af2";
const EXPECTED_V1_REJECTION_SHA256 = "8434c40b73c12e946d5664e54ed5132884f803a8f17a398aa24f9fb2d6985479";
const EXPECTED_SEED_SHA256 = "769ceff80ecc9f25dbef30ddb3f3dbb04ecdbd2b7f704ed733f29f4ab16fbb32";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));
const compactDigest = (value) => sha256(Buffer.from(JSON.stringify(value), "utf8"));

function argumentsFrom(argv) {
    const result = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (!flag?.startsWith("--") || value === undefined) {
            throw new Error(
                "usage: inventory-complement-v2.mjs --source-root <pinned-tree> --universe <json> --seed <json> --v1 <json> --v1-rejection <json>",
            );
        }
        result.set(flag.slice(2), value);
    }
    return result;
}

function sourceLines(source) {
    return source.split(/\r?\n/);
}

function fact(line) {
    return line.trim();
}

function unique(values) {
    return [...new Set(values)].sort(byteSort);
}

function lineInventory(lines, predicate, tokenPattern) {
    const rows = [];
    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        if (!predicate(line)) continue;
        const row = { line: index + 1, fact: fact(line) };
        if (tokenPattern !== undefined) {
            row.tokens = unique([...line.matchAll(tokenPattern)].map((match) => match[1] ?? match[0]));
        }
        rows.push(row);
    }
    return rows;
}

function blockInventory(lines, markerPattern) {
    const blocks = [];
    for (let index = 0; index < lines.length; index += 1) {
        const opening = lines[index];
        if (!markerPattern.test(opening)) continue;
        markerPattern.lastIndex = 0;
        const tag = /<\s*(pre|table|div|dl)\b/i.exec(opening)?.[1]?.toLowerCase();
        let end = index;
        if (tag !== undefined && !new RegExp(`</${tag}>`, "i").test(opening)) {
            while (end + 1 < lines.length && !new RegExp(`</${tag}>`, "i").test(lines[end])) end += 1;
        }
        const evidenceLines = [];
        for (let cursor = index; cursor <= end; cursor += 1) {
            if (fact(lines[cursor]) !== "") evidenceLines.push({ line: cursor + 1, fact: fact(lines[cursor]) });
        }
        blocks.push({ start_line: index + 1, end_line: end + 1, evidence_lines: evidenceLines });
        index = end;
    }
    return blocks;
}

function occurrenceInventory(source) {
    const lines = sourceLines(source);
    const propertyDescriptorBlocks = blockInventory(
        lines,
        /<(?:pre|table|div|dl)\b[^>]*\b(?:propdef|descdef)\b/i,
    );
    const grammarBlocks = blockInventory(
        lines,
        /<(?:pre|table|div|dl)\b[^>]*class\s*=\s*["'][^"']*\b(?:prod|grammar|railroad)\b/i,
    );
    const definitionCarriers = lineInventory(
        lines,
        (line) =>
            /<dfn\b|\b(?:propdef|descdef)\b|class\s*=\s*["'][^"']*\b(?:prod|grammar|railroad)\b|<syntax\b|\btypedef\b/i.test(
                line,
            ),
    );
    const atRules = lineInventory(
        lines,
        (line) => /(^|[^\w-])@[a-z][a-z0-9-]*/i.test(line),
        /(?:^|[^\w-])@([a-z][a-z0-9-]*)/gi,
    );
    const functions = lineInventory(
        lines,
        (line) => /\b[a-z][a-z0-9-]*\s*\(/i.test(line),
        /\b([a-z][a-z0-9-]*)\s*\(/gi,
    );
    const selectors = lineInventory(
        lines,
        (line) =>
            /\b(?:selector|pseudo(?:-element|-class)?|combinator)s?\b/i.test(line) ||
            /(^|[\s(>,+~|])::?[a-z][a-z0-9-]*(?:\(|\b)/i.test(line),
        /(::?[a-z][a-z0-9-]*(?:\()?)\b/gi,
    );
    const recoverySerializationAlgorithms = lineInventory(
        lines,
        (line) =>
            /\b(?:serializ(?:e|es|ed|ing|ation)|recover(?:y|s|ed|ing)?|parse error|reconsume|consume(?:s|d|ing)?\s+(?:a|an|the|next)|discard(?:s|ed|ing)?\s+(?:a|an|the|next)|invalid\s+(?:rule|declaration|selector|value|token)|canonical\s+(?:order|serialization))\b/i.test(
                line,
            ),
    );
    const inventory = {
        grammar_definition_carrier_blocks: grammarBlocks,
        grammar_definition_carrier_lines: definitionCarriers,
        property_descriptor_definition_blocks: propertyDescriptorBlocks,
        at_rule_lines: atRules,
        function_lines: functions,
        selector_lines: selectors,
        recovery_serialization_algorithm_lines: recoverySerializationAlgorithms,
    };
    const lineSets = Object.fromEntries(
        Object.entries(inventory).map(([key, rows]) => [
            key,
            new Set(
                key.endsWith("_blocks")
                    ? rows.flatMap((row) => row.evidence_lines.map((entry) => entry.line))
                    : rows.map((row) => row.line),
            ),
        ]),
    );
    const allLines = new Set(Object.values(lineSets).flatMap((set) => [...set]));
    return {
        discovery_status: "HEURISTIC_LINE_INVENTORY_NON_NORMATIVE_NON_EXHAUSTIVE_RED",
        category_line_counts: Object.fromEntries(
            Object.entries(lineSets).map(([key, set]) => [key, set.size]),
        ),
        distinct_parser_facing_lines: allLines.size,
        inventory_sha256: compactDigest(inventory),
        inventory,
    };
}

function metadata(source) {
    const lines = sourceLines(source);
    const keys = ["Title", "Shortname", "Level", "Status", "Work Status"];
    const result = {};
    for (const key of keys) {
        const matcher = new RegExp(`^${key.replace(" ", "\\s+")}:\\s*(.*)$`, "i");
        const lineIndex = lines.findIndex((line) => matcher.test(line));
        if (lineIndex < 0) continue;
        result[key.toLowerCase().replace(" ", "_")] = {
            value: matcher.exec(lines[lineIndex])[1].trim() || "none",
            line: lineIndex + 1,
        };
    }
    if (result.title === undefined) {
        const titleLine = lines.findIndex((line) => /<title>[^<]+<\/title>/i.test(line));
        if (titleLine >= 0) {
            result.title = {
                value: /<title>([^<]+)<\/title>/i.exec(lines[titleLine])[1].trim(),
                line: titleLine + 1,
            };
        }
    }
    return result;
}

function evidenceLines(source, pattern, kind) {
    return lineInventory(sourceLines(source), (line) => pattern.test(line)).map((row) => ({ kind, ...row }));
}

const experimentalOverrides = new Set([
    "css-mobile",
    "css-module",
    "css-page-template-1",
    "css-preslev-1",
    "css-print",
    "css-tv",
    "matrix",
    "selectors-nonelement-1",
]);
const unresolvedSuccessorOverrides = new Set([
    "css-color-3",
    "css-scoping-1",
    "css-shaders-1",
    "css-shadow-parts-1",
    "css-template-1",
]);
const redirectReviewOverrides = new Map([
    ["css-scoping-1", "css-shadow-1"],
    ["css-shadow-parts-1", "css-shadow-1"],
]);

function routeFor(v1Entry) {
    if (v1Entry.classification === "HISTORICAL_SNAPSHOT_OR_META_INDEX") {
        return "HISTORICAL_META_DISCOVERY_OCCURRENCE_DIFF_RED";
    }
    if (unresolvedSuccessorOverrides.has(v1Entry.directory)) {
        return "UNRESOLVED_SUCCESSOR_OCCURRENCE_DIFF_RED";
    }
    if (experimentalOverrides.has(v1Entry.directory)) {
        return "EXPERIMENTAL_OR_NONLANGUAGE_OCCURRENCE_REVIEW";
    }
    if (v1Entry.classification === "NORMATIVE_DEPENDENCY_CANDIDATE") {
        return "DEPENDENCY_OCCURRENCE_REVIEW";
    }
    if (v1Entry.classification === "LATER_LEVEL_OR_EXPERIMENTAL_LANGUAGE_CANDIDATE") {
        return "EXPERIMENTAL_OR_NONLANGUAGE_OCCURRENCE_REVIEW";
    }
    if (v1Entry.classification === "GENUINELY_UNRESOLVED_RED") {
        return "UNRESOLVED_IDENTITY_OR_MIGRATION_RED";
    }
    throw new Error(`v2 route absent: ${v1Entry.directory}`);
}

function routeReason(route, directory, title) {
    if (route === "HISTORICAL_META_DISCOVERY_OCCURRENCE_DIFF_RED") {
        return `${title} remains RED until every discovered parser-facing occurrence is shown non-unique or is routed to an exact owner. Snapshot/meta status is not exclusion evidence.`;
    }
    if (route === "DEPENDENCY_OCCURRENCE_REVIEW") {
        if (redirectReviewOverrides.has(directory)) {
            return `${title} points to ${redirectReviewOverrides.get(directory)}, but no terminal exclusion is granted until the source occurrence inventory is joined to exact target occurrences.`;
        }
        return `${title} has a pinned citation/import/delegation edge. That edge prioritizes dependency-occurrence review but proves neither normativity nor a consuming operation.`;
    }
    if (route === "EXPERIMENTAL_OR_NONLANGUAGE_OCCURRENCE_REVIEW") {
        return `${title} remains in occurrence review. Maturity, obsolescence, experimental status, or non-language scope may inform later routing but cannot delete syntax before inventory and ownership review.`;
    }
    if (route === "UNRESOLVED_SUCCESSOR_OCCURRENCE_DIFF_RED") {
        if (redirectReviewOverrides.has(directory)) {
            return `${title} redirects to ${redirectReviewOverrides.get(directory)}, but the redirect is not terminal exclusion evidence until every discovered parser-facing occurrence is joined to an exact target occurrence.`;
        }
        return `${title} has an asserted or plausible successor, but every discovered parser-facing occurrence still lacks an exact content-addressed successor mapping.`;
    }
    return `${title} retains an identity, level, or migration conflict that requires occurrence-level resolution.`;
}

function levelFromDirectory(directory) {
    const match = /-(\d+)$/.exec(directory);
    return match === null ? undefined : Number(match[1]);
}

function siblingStem(directory) {
    return directory.replace(/-\d+$/, "");
}

function secondaryFlags(entry, source, meta, inventory, siblingDirectories) {
    const flags = [];
    const statusEvidence = evidenceLines(
        source,
        /\b(?:obsolete|abandon(?:ed|ment)|not being actively maintained|no further work|not expected to become|not envis(?:age|aged)|should not be considered|not intended to be used in CSS)\b/i,
        "MATURITY_OR_SCOPE_STATUS",
    );
    const migrationEvidence = evidenceLines(
        source,
        /\b(?:moved to|merged into|incorporat(?:e|ed|ion)|migrat(?:e|ed|ion)|may move|routes? .* to|part of .*effects)\b/i,
        "MIGRATION_OR_SUCCESSOR_SIGNAL",
    );
    const directoryLevel = levelFromDirectory(entry.directory);
    const metadataLevel = /^\d+$/.test(meta.level?.value ?? "") ? Number(meta.level.value) : undefined;
    if (inventory.distinct_parser_facing_lines === 0) {
        flags.push({
            code: "ZERO_HEURISTIC_OCCURRENCES_NOT_PROOF_OF_ABSENCE",
            evidence: [],
        });
    } else {
        flags.push({
            code: "PARSER_FACING_OCCURRENCES_DISCOVERED_NON_CREDIT",
            evidence: [],
        });
    }
    if (statusEvidence.length !== 0) {
        flags.push({
            code:
                inventory.distinct_parser_facing_lines === 0
                    ? "MATURITY_OR_SCOPE_STATUS_REQUIRES_REVIEW"
                    : "MATURITY_OR_SCOPE_STATUS_COEXISTS_WITH_PARSER_SURFACE",
            evidence: statusEvidence,
        });
    }
    if (migrationEvidence.length !== 0) {
        flags.push({
            code: "MIGRATION_OR_SUCCESSOR_OCCURRENCE_DIFF_REQUIRED",
            evidence: migrationEvidence,
        });
    }
    if (directoryLevel !== undefined && metadataLevel !== undefined && directoryLevel !== metadataLevel) {
        flags.push({
            code: "DIRECTORY_METADATA_LEVEL_CONFLICT",
            evidence: [{
                kind: "PINNED_LEVEL_METADATA",
                line: meta.level.line,
                fact: `directory level ${directoryLevel}; metadata level ${metadataLevel}`,
            }],
        });
    }
    if (siblingDirectories.length > 1) {
        flags.push({
            code: "MULTI_LEVEL_SIBLING_OCCURRENCE_OWNERSHIP_REVIEW",
            evidence: [{ kind: "SOURCE_UNIVERSE_SIBLINGS", line: 0, fact: siblingDirectories.join(", ") }],
        });
    }
    if (entry.route === "HISTORICAL_META_DISCOVERY_OCCURRENCE_DIFF_RED") {
        flags.push({ code: "HISTORICAL_META_NON_UNIQUENESS_UNPROVEN", evidence: [] });
    }
    if (entry.route === "DEPENDENCY_OCCURRENCE_REVIEW") {
        flags.push({ code: "DEPENDENCY_EDGE_NORMATIVITY_AND_CONSUMPTION_UNPROVEN", evidence: [] });
    }
    if (entry.route.startsWith("UNRESOLVED_")) {
        flags.push({ code: "PRIMARY_ROUTE_RED", evidence: [] });
    }
    return flags.sort((left, right) => byteSort(left.code, right.code));
}

function verifyLegacyEvidence(v1, sourceByPath) {
    for (const entry of v1.entries) {
        for (const evidence of entry.evidence) {
            const source = sourceByPath.get(evidence.exact_path);
            if (source === undefined) throw new Error(`legacy evidence path absent: ${evidence.exact_path}`);
            if (source.entry.sha256_raw_source !== evidence.sha256_raw_source) {
                throw new Error(`legacy evidence source identity mismatch: ${evidence.exact_path}`);
            }
            const line = sourceLines(source.text)[evidence.line - 1];
            if (line === undefined || !line.includes(evidence.fact)) {
                throw new Error(`legacy evidence line mismatch: ${entry.directory}: ${evidence.line}`);
            }
        }
    }
}

const args = argumentsFrom(process.argv.slice(2));
const sourceRoot = resolve(args.get("source-root") ?? "");
const universeFile = resolve(args.get("universe") ?? "");
const seedFile = resolve(args.get("seed") ?? "");
const v1File = resolve(args.get("v1") ?? "");
const rejectionFile = resolve(args.get("v1-rejection") ?? "");
if (![sourceRoot, universeFile, seedFile, v1File, rejectionFile].every(Boolean)) {
    throw new Error("all arguments are required");
}

const universeBytes = readFileSync(universeFile);
const seedBytes = readFileSync(seedFile);
const v1Bytes = readFileSync(v1File);
const rejectionBytes = readFileSync(rejectionFile);
if (sha256(universeBytes) !== EXPECTED_UNIVERSE_SHA256) throw new Error("source universe raw hash mismatch");
if (sha256(seedBytes) !== EXPECTED_SEED_SHA256) throw new Error("seed raw hash mismatch");
if (sha256(v1Bytes) !== EXPECTED_V1_SHA256) throw new Error("v1 raw hash mismatch");
if (sha256(rejectionBytes) !== EXPECTED_V1_REJECTION_SHA256) throw new Error("v1 rejection raw hash mismatch");

const universe = JSON.parse(universeBytes.toString("utf8"));
const seed = JSON.parse(seedBytes.toString("utf8"));
const v1 = JSON.parse(v1Bytes.toString("utf8"));
const rejection = JSON.parse(rejectionBytes.toString("utf8"));
if (universe.verified_commit !== seed.verified_commit || universe.verified_commit_tree !== seed.verified_commit_tree) {
    throw new Error("pinned commit/tree mismatch");
}
if (universe.seed_manifest_sha256 !== EXPECTED_SEED_SHA256) throw new Error("universe seed identity mismatch");
if (rejection.subject.sha256 !== EXPECTED_V1_SHA256 || rejection.semantic_disposition !== "REJECT") {
    throw new Error("v1 rejection does not bind the expected subject");
}

const sourceByDirectory = new Map();
const sourceByPath = new Map();
const failures = [];
for (const sourceEntry of universe.sources) {
    const path = resolve(sourceRoot, sourceEntry.exact_path);
    const bytes = readFileSync(path);
    const actual = { sha256: sha256(bytes), bytes: statSync(path).size };
    if (actual.sha256 !== sourceEntry.sha256_raw_source || actual.bytes !== sourceEntry.raw_source_bytes) {
        failures.push({ directory: sourceEntry.directory, ...actual });
    }
    const source = { entry: sourceEntry, text: bytes.toString("utf8") };
    sourceByDirectory.set(sourceEntry.directory, source);
    sourceByPath.set(sourceEntry.exact_path, source);
}
if (failures.length !== 0) throw new Error(`pinned source mismatch: ${JSON.stringify(failures)}`);
verifyLegacyEvidence(v1, sourceByPath);

const complement = universe.sources.filter((entry) => !entry.root_seed_membership);
const complementDirectories = new Set(complement.map((entry) => entry.directory));
const v1ByDirectory = new Map(v1.entries.map((entry) => [entry.directory, entry]));
if (v1ByDirectory.size !== 92 || complement.length !== 92) throw new Error("92-entry complement prerequisite failed");
const missing = complement.filter((entry) => !v1ByDirectory.has(entry.directory));
const extra = v1.entries.filter((entry) => !complementDirectories.has(entry.directory));
if (missing.length !== 0 || extra.length !== 0) throw new Error(`v1/complement bijection failed: ${JSON.stringify({ missing, extra })}`);

const siblingsByStem = new Map();
for (const entry of universe.sources) {
    const stem = siblingStem(entry.directory);
    const siblings = siblingsByStem.get(stem) ?? [];
    siblings.push(entry.directory);
    siblingsByStem.set(stem, siblings);
}
for (const siblings of siblingsByStem.values()) siblings.sort(byteSort);

const entries = complement
    .map((sourceEntry) => {
        const source = sourceByDirectory.get(sourceEntry.directory).text;
        const v1Entry = v1ByDirectory.get(sourceEntry.directory);
        const meta = metadata(source);
        const inventory = occurrenceInventory(source);
        const route = routeFor(v1Entry);
        const title = meta.title?.value ?? sourceEntry.directory;
        const entry = {
            directory: sourceEntry.directory,
            exact_path: sourceEntry.exact_path,
            source_format: sourceEntry.source_format,
            git_blob_oid_sha1: sourceEntry.git_blob_oid_sha1,
            sha256_raw_source: sourceEntry.sha256_raw_source,
            raw_source_bytes: sourceEntry.raw_source_bytes,
            metadata: meta,
            occurrence_inventory_precedes_routing: inventory,
            route,
            route_reason: routeReason(route, sourceEntry.directory, title),
            legacy_v1_classification_rejected_non_credit: v1Entry.classification,
            dependency_or_status_evidence_non_credit: v1Entry.evidence,
            terminal_exclusion_authorized: false,
        };
        entry.secondary_conflict_flags = secondaryFlags(
            entry,
            source,
            meta,
            inventory,
            siblingsByStem.get(siblingStem(sourceEntry.directory)),
        );
        return entry;
    })
    .sort((left, right) => byteSort(left.directory, right.directory));

const routeCounts = {};
const flagCounts = {};
for (const entry of entries) {
    routeCounts[entry.route] = (routeCounts[entry.route] ?? 0) + 1;
    for (const flag of entry.secondary_conflict_flags) {
        flagCounts[flag.code] = (flagCounts[flag.code] ?? 0) + 1;
    }
}
const sortedRouteCounts = Object.fromEntries(Object.entries(routeCounts).sort(([left], [right]) => byteSort(left, right)));
const sortedFlagCounts = Object.fromEntries(Object.entries(flagCounts).sort(([left], [right]) => byteSort(left, right)));
const redEntries = entries.filter(
    (entry) => entry.route.endsWith("_RED") || entry.route.includes("_RED_"),
);

const payload = {
    schema_version: "value.pi.css-source-complement-occurrence-routing/v2",
    authority_status: "OCCURRENCE_FIRST_ROUTING_INVENTORY_RED_NOT_AN_OPERATION_DENOMINATOR",
    verified_commit: universe.verified_commit,
    verified_commit_tree: universe.verified_commit_tree,
    source_universe_sha256: sha256(universeBytes),
    source_universe_content_digest_sha256: universe.content_digest_sha256,
    seed_manifest_sha256: sha256(seedBytes),
    seed_manifest_content_digest: seed.manifest_content_digest,
    rejected_v1: {
        classification_sha256: sha256(v1Bytes),
        rejection_sha256: sha256(rejectionBytes),
        semantic_disposition: rejection.semantic_disposition,
    },
    method: {
        ordering: [
            "verify all 168 exact pinned sources",
            "inventory parser-facing line occurrences in every one of the 92 complement sources",
            "attach source-status, dependency, historical, migration, and conflict flags only after inventory",
            "retain every source for dependency, experimental/non-language, historical occurrence-diff, or unresolved review",
        ],
        inventory_categories: [
            "grammar/definition carriers",
            "property/descriptor definition blocks",
            "at-rules",
            "functions",
            "selectors/pseudos/combinators",
            "discoverable recovery/serialization algorithms",
        ],
        inventory_limit: "Heuristic line-addressed discovery evidence only. It is intentionally inclusive, may contain prose/host-language false positives, and cannot prove absence, normativity, ownership, or operation completeness.",
        dependency_label: "DEPENDENCY_OCCURRENCE_REVIEW never means normative dependency without an exact consuming normative occurrence.",
        supersession_law: "No maturity, obsolescence, redirect, migration, or higher-level status deletes syntax. Every discovered occurrence needs an exact successor/owner join or remains experimental/unresolved.",
        conflict_scan: "Systematic secondary flags cover level mismatches, status-with-syntax, migration language, multi-level siblings, dependency non-proof, historical non-uniqueness, and zero-signal uncertainty. Flags are explicitly non-exhaustive and do not close conflicts.",
        caveat: "This v2 artifact is a RED routing/inventory stage. It is not the operation denominator and grants no source inclusion/exclusion, parser, conformance, movement, or production credit.",
    },
    counts: {
        source_universe: universe.sources.length,
        seed_members: universe.sources.length - complement.length,
        complement_entries: entries.length,
        by_route: sortedRouteCounts,
        entries_on_red_primary_routes: redEntries.length,
        entries_with_secondary_flags: entries.filter((entry) => entry.secondary_conflict_flags.length !== 0).length,
        by_secondary_flag: sortedFlagCounts,
        discovered_distinct_parser_facing_lines: entries.reduce(
            (sum, entry) => sum + entry.occurrence_inventory_precedes_routing.distinct_parser_facing_lines,
            0,
        ),
    },
    verification: {
        all_168_pinned_sources_hash_and_byte_verified: true,
        v1_rejection_identity_verified: true,
        complement_bijection_exactly_once: entries.length === 92 && new Set(entries.map((entry) => entry.directory)).size === 92,
        every_entry_inventory_before_route_in_serialized_shape: entries.every(
            (entry) => Object.keys(entry).indexOf("occurrence_inventory_precedes_routing") < Object.keys(entry).indexOf("route"),
        ),
        every_entry_line_addressed_inventory_present: entries.every(
            (entry) => Object.values(entry.occurrence_inventory_precedes_routing.inventory).every(Array.isArray),
        ),
        every_entry_terminal_exclusion_false: entries.every((entry) => entry.terminal_exclusion_authorized === false),
        hash_or_byte_failures: failures.length,
        canonical_order: "directory sorted by raw UTF-8 bytes",
    },
    conflict_scan: {
        completeness: "SYSTEMATIC_HEURISTIC_NON_EXHAUSTIVE_RED",
        known_v1_conflicts_retested_not_claimed_exhaustive: [
            "css-cascade-3",
            "css-text-5",
            "web-animations-css-integration",
        ],
        rows_with_flags: entries
            .filter((entry) => entry.secondary_conflict_flags.length !== 0)
            .map((entry) => ({
                directory: entry.directory,
                route: entry.route,
                flags: entry.secondary_conflict_flags.map((flag) => flag.code),
            })),
    },
    red_routes: redEntries.map((entry) => ({
        directory: entry.directory,
        exact_path: entry.exact_path,
        route: entry.route,
        reason: entry.route_reason,
    })),
    entries,
};
const contentDigest = compactDigest(payload);
process.stdout.write(`${JSON.stringify({
    ...payload,
    content_digest_sha256: contentDigest,
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before these two digest fields are appended",
}, null, 2)}\n`);
