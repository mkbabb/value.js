import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const EXPECTED = Object.freeze({
    universe: "c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7",
    v2Tool: "bb174b1c921d9ccd685a3322d2f343f06f9572327426a8d353d16503d925af97",
    v2Artifact: "3b7e1e1ee40c22594049635703b3443db213f3ed8d8291e18714dda88dc2fcc9",
    v2Payload: "6c3e1861a5584304a6c7835096722afcdae424013652cb6c15ef380f79dbe8fb",
    v2Rejection: "bc883148c63d1c5ac043d71a29a5cef1e2329130c4fda56db59b5b1ba94c3b01",
    challengeA: "015816d0bfe1c28fb76f06bc8fb7d5c34a8eb05f997a4dae950d334566d2c45d",
    challengeB: "82af2d5f33f077410beb0dda0b349e5100907a3744657af3234ea22f8b4b0542",
    gestalt: "4fd1764adf6924f7a654c454d1b541cae0de10774b4d98673d88da702b663bac",
});
const EXPECTED_PIN = Object.freeze({
    commit: "c7573530343759ace8e46438a1fa2c44515b5554",
    tree: "75bf19c016ed98126381508073de6893c9f756f5",
});
const EXPECTED_REGRESSION = Object.freeze({
    sources: 20,
    newlyMatchedBlocks: 53,
    affectedNonblankLines: 260,
    previouslyAbsentLines: 179,
    retainedQuotedBlocks: 72,
    repairedDefinitionCarrierLines: 53,
});
const NEUTRAL_ROUTE = "OCCURRENCE_OWNER_REVIEW_RED";

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const compactDigest = (value) => sha256(Buffer.from(JSON.stringify(value), "utf8"));
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));
const fact = (line) => line.trim();
const sourceLines = (source) => source.split(/\r?\n/);

function argumentsFrom(argv) {
    const result = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (!flag?.startsWith("--") || value === undefined) {
            throw new Error("usage: inventory-complement-v3.mjs --source-root <pinned-tree> --universe <json> --v2-tool <mjs> --v2-artifact <json> --v2-rejection <json> --challenge-a <md> --challenge-b <md> --gestalt <md>");
        }
        result.set(flag.slice(2), value);
    }
    return result;
}

function exactBytes(path, expected, label) {
    const bytes = readFileSync(resolve(path));
    const actual = sha256(bytes);
    if (actual !== expected) throw new Error(`${label} raw hash mismatch: ${actual}`);
    return bytes;
}

function classAttributeValue(line) {
    const opening = /<(?:pre|table|div|dl)\b[^>]*>/i.exec(line)?.[0];
    if (opening === undefined) return undefined;
    const match = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>\x60]+))/i.exec(opening);
    return match?.[1] ?? match?.[2] ?? match?.[3];
}

function hasGrammarCarrierClass(line) {
    const value = classAttributeValue(line);
    return value !== undefined && value.split(/\s+/).some((name) => /^(?:prod|grammar|railroad)$/i.test(name));
}

function hasQuotedGrammarCarrierClass(line) {
    return /<(?:pre|table|div|dl)\b[^>]*\bclass\s*=\s*["'][^"']*\b(?:prod|grammar|railroad)\b/i.test(line);
}

function blockInventory(lines, predicate) {
    const blocks = [];
    for (let index = 0; index < lines.length; index += 1) {
        const opening = lines[index];
        if (!predicate(opening)) continue;
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

function v2InventoryLines(inventory) {
    const lines = new Set();
    for (const [name, rows] of Object.entries(inventory)) {
        if (name.endsWith("_blocks")) {
            for (const row of rows) for (const evidence of row.evidence_lines) lines.add(evidence.line);
        } else {
            for (const row of rows) lines.add(row.line);
        }
    }
    return lines;
}

function verifyLineFact(lines, row, label) {
    const observed = lines[row.line - 1];
    if (observed === undefined || fact(observed) !== row.fact) {
        throw new Error(`${label} line-addressed evidence mismatch at ${row.line}`);
    }
}

function verifyV2Inventory(lines, inventory, label) {
    for (const [name, rows] of Object.entries(inventory)) {
        if (name.endsWith("_blocks")) {
            for (const block of rows) {
                if (block.start_line < 1 || block.end_line < block.start_line || block.end_line > lines.length) {
                    throw new Error(`${label} invalid ${name} boundary`);
                }
                for (const row of block.evidence_lines) verifyLineFact(lines, row, `${label}:${name}`);
            }
        } else {
            for (const row of rows) verifyLineFact(lines, row, `${label}:${name}`);
        }
    }
}

function regressionDelta(lines, v2Inventory, directory, sourceEntry) {
    const oldBlocks = blockInventory(lines, hasQuotedGrammarCarrierClass);
    const newBlocks = blockInventory(lines, hasGrammarCarrierClass);
    const oldKeys = new Set(oldBlocks.map((block) => `${block.start_line}:${block.end_line}`));
    const newKeys = new Set(newBlocks.map((block) => `${block.start_line}:${block.end_line}`));
    for (const oldBlock of v2Inventory.grammar_definition_carrier_blocks) {
        const key = `${oldBlock.start_line}:${oldBlock.end_line}`;
        if (!newKeys.has(key)) throw new Error(`${directory} quoted grammar block lost at ${key}`);
    }
    if (oldBlocks.length !== v2Inventory.grammar_definition_carrier_blocks.length) {
        throw new Error(`${directory} quoted grammar replay count mismatch`);
    }
    const previousUnion = v2InventoryLines(v2Inventory);
    const newBlocksOnly = newBlocks.filter((block) => !oldKeys.has(`${block.start_line}:${block.end_line}`));
    if (newBlocksOnly.length === 0) return undefined;
    const affected = new Set(newBlocksOnly.flatMap((block) => block.evidence_lines.map((row) => row.line)));
    const previouslyAbsent = [...affected].filter((line) => !previousUnion.has(line)).sort((a, b) => a - b);
    const allNewInventoryLines = new Set(newBlocks.flatMap((block) => block.evidence_lines.map((row) => row.line)));
    if (![...affected].every((line) => allNewInventoryLines.has(line))) {
        throw new Error(`${directory} affected grammar lines not present after repair`);
    }
    return {
        directory,
        exact_path: sourceEntry.exact_path,
        sha256_raw_source: sourceEntry.sha256_raw_source,
        newly_matched_blocks: newBlocksOnly,
        repaired_definition_carrier_opening_lines: newBlocksOnly.map((block) => ({
            line: block.start_line,
            fact: fact(lines[block.start_line - 1]),
        })),
        affected_nonblank_line_count: affected.size,
        previously_absent_from_all_v2_categories_lines: previouslyAbsent,
        every_affected_nonblank_line_in_v3_grammar_inventory: true,
    };
}

const args = argumentsFrom(process.argv.slice(2));
const sourceRoot = resolve(args.get("source-root") ?? "");
const universeBytes = exactBytes(args.get("universe") ?? "", EXPECTED.universe, "source universe");
exactBytes(args.get("v2-tool") ?? "", EXPECTED.v2Tool, "v2 tool");
const v2Bytes = exactBytes(args.get("v2-artifact") ?? "", EXPECTED.v2Artifact, "v2 artifact");
const rejectionBytes = exactBytes(args.get("v2-rejection") ?? "", EXPECTED.v2Rejection, "v2 rejection");
exactBytes(args.get("challenge-a") ?? "", EXPECTED.challengeA, "challenge A");
exactBytes(args.get("challenge-b") ?? "", EXPECTED.challengeB, "challenge B");
exactBytes(args.get("gestalt") ?? "", EXPECTED.gestalt, "root gestalt");

const universe = JSON.parse(universeBytes.toString("utf8"));
const v2 = JSON.parse(v2Bytes.toString("utf8"));
const rejection = JSON.parse(rejectionBytes.toString("utf8"));
if (universe.verified_commit !== EXPECTED_PIN.commit || universe.verified_commit_tree !== EXPECTED_PIN.tree) {
    throw new Error("source universe commit/tree identity mismatch");
}
const v2Payload = { ...v2 };
delete v2Payload.content_digest_sha256;
delete v2Payload.content_digest_method;
if (compactDigest(v2Payload) !== EXPECTED.v2Payload || v2.content_digest_sha256 !== EXPECTED.v2Payload) {
    throw new Error("v2 payload digest mismatch");
}
if (rejection.subject.tool_sha256 !== EXPECTED.v2Tool || rejection.subject.artifact_sha256 !== EXPECTED.v2Artifact) {
    throw new Error("v2 rejection does not bind the expected subject");
}
if (rejection.challenges?.[0]?.sha256 !== EXPECTED.challengeA || rejection.challenges?.[1]?.sha256 !== EXPECTED.challengeB) {
    throw new Error("v2 rejection challenge identities mismatch");
}

const sourceByDirectory = new Map();
for (const sourceEntry of universe.sources) {
    const path = resolve(sourceRoot, sourceEntry.exact_path);
    const bytes = readFileSync(path);
    const actualBytes = statSync(path).size;
    const actualSha = sha256(bytes);
    if (actualSha !== sourceEntry.sha256_raw_source || actualBytes !== sourceEntry.raw_source_bytes) {
        throw new Error(`pinned source mismatch: ${sourceEntry.directory}`);
    }
    sourceByDirectory.set(sourceEntry.directory, { entry: sourceEntry, lines: sourceLines(bytes.toString("utf8")) });
}
if (sourceByDirectory.size !== 168) throw new Error("exact 168-source identity verification failed");

const complement = universe.sources.filter((entry) => !entry.root_seed_membership).sort((a, b) => byteSort(a.directory, b.directory));
const v2ByDirectory = new Map(v2.entries.map((entry, index) => [entry.directory, { entry, index }]));
if (complement.length !== 92 || v2ByDirectory.size !== 92) throw new Error("exact 92-entry complement prerequisite failed");

const regressionSources = [];
let retainedQuotedBlocks = 0;
const entries = complement.map((sourceEntry) => {
    const prior = v2ByDirectory.get(sourceEntry.directory);
    if (prior === undefined) throw new Error(`v2 complement row absent: ${sourceEntry.directory}`);
    if (prior.entry.sha256_raw_source !== sourceEntry.sha256_raw_source || prior.entry.terminal_exclusion_authorized !== false) {
        throw new Error(`v2 source identity or exclusion invariant mismatch: ${sourceEntry.directory}`);
    }
    const source = sourceByDirectory.get(sourceEntry.directory);
    const inventory = prior.entry.occurrence_inventory_precedes_routing.inventory;
    verifyV2Inventory(source.lines, inventory, sourceEntry.directory);
    retainedQuotedBlocks += inventory.grammar_definition_carrier_blocks.length;
    const regression = regressionDelta(source.lines, inventory, sourceEntry.directory, sourceEntry);
    if (regression !== undefined) regressionSources.push(regression);
    return {
        directory: sourceEntry.directory,
        exact_path: sourceEntry.exact_path,
        git_blob_oid_sha1: sourceEntry.git_blob_oid_sha1,
        sha256_raw_source: sourceEntry.sha256_raw_source,
        raw_source_bytes: sourceEntry.raw_source_bytes,
        route: NEUTRAL_ROUTE,
        route_reason: "Neutral RED queue pending a full-source occurrence-to-owner/fixed-point pass; no rejected v1 or v2 semantic classification drives this route.",
        prior_v2_evidence_reference_non_credit: {
            artifact_sha256: EXPECTED.v2Artifact,
            entry_index: prior.index,
            rejected_v1_classification: prior.entry.legacy_v1_classification_rejected_non_credit,
            rejected_v2_route: prior.entry.route,
            secondary_status_dependency_history_migration_sibling_flag_codes: prior.entry.secondary_conflict_flags.map((flag) => flag.code),
            line_addressed_evidence_retained_by_exact_reference: true,
        },
        terminal_exclusion_authorized: false,
    };
});

const affectedBlocks = regressionSources.reduce((sum, row) => sum + row.newly_matched_blocks.length, 0);
const affectedLines = regressionSources.reduce((sum, row) => sum + row.affected_nonblank_line_count, 0);
const repairedDefinitionCarrierLines = regressionSources.reduce(
    (sum, row) => sum + row.repaired_definition_carrier_opening_lines.length,
    0,
);
const previouslyAbsentLines = regressionSources.reduce(
    (sum, row) => sum + row.previously_absent_from_all_v2_categories_lines.length,
    0,
);
const observedRegression = {
    sources: regressionSources.length,
    newlyMatchedBlocks: affectedBlocks,
    affectedNonblankLines: affectedLines,
    previouslyAbsentLines,
    retainedQuotedBlocks,
    repairedDefinitionCarrierLines,
};
for (const [key, expected] of Object.entries(EXPECTED_REGRESSION)) {
    if (observedRegression[key] !== expected) {
        throw new Error(`grammar-carrier regression count mismatch for ${key}: ${observedRegression[key]} !== ${expected}`);
    }
}

const v2DependencyRows = v2.entries.filter((entry) => entry.route === "DEPENDENCY_OCCURRENCE_REVIEW");
const v2DependencyFlagCount = v2.entries.reduce(
    (sum, entry) => sum + entry.secondary_conflict_flags.filter((flag) => flag.code === "DEPENDENCY_EDGE_NORMATIVITY_AND_CONSUMPTION_UNPROVEN").length,
    0,
);
const v2DependencyEvidenceRecords = v2DependencyRows.reduce(
    (sum, entry) => sum + entry.dependency_or_status_evidence_non_credit.length,
    0,
);
if (v2DependencyRows.length !== 26 || v2DependencyFlagCount !== 26 || v2DependencyEvidenceRecords !== 27) {
    throw new Error("explicit v2 dependency accounting regression");
}

const payload = {
    schema_version: "value.pi.css-source-complement-occurrence-routing/v3",
    authority_status: "NEUTRAL_ALL_92_OWNER_REVIEW_RED_NOT_AN_OPERATION_DENOMINATOR",
    verified_commit: universe.verified_commit,
    verified_commit_tree: universe.verified_commit_tree,
    source_universe_sha256: EXPECTED.universe,
    rejected_v2: {
        tool_sha256: EXPECTED.v2Tool,
        artifact_sha256: EXPECTED.v2Artifact,
        payload_sha256: EXPECTED.v2Payload,
        rejection_sha256: EXPECTED.v2Rejection,
        challenge_a_sha256: EXPECTED.challengeA,
        challenge_b_sha256: EXPECTED.challengeB,
        root_gestalt_sha256: EXPECTED.gestalt,
        semantic_disposition: "REJECT",
    },
    method: {
        route_law: `All 92 complement entries receive exactly one ${NEUTRAL_ROUTE} route. Rejected v1/v2 status, dependency, history, migration, sibling, and classification data is retained only as explicitly non-credit evidence and never drives route selection.`,
        evidence_compaction: "The exact v2 artifact remains the content-addressed base for its verified line-addressed assay. V3 carries only exact entry pointers and the newly recovered grammar blocks; it does not copy the rejected 3.2 MB payload forward.",
        carrier_repair: "One shared grammar-carrier predicate now drives both grammar-block and definition-carrier-line evidence. It accepts quoted and unquoted class attributes for prod, grammar, and railroad class tokens without weakening the pre/table/div/dl opening-tag boundary.",
        inventory_limit: "The v2 heuristic arrays plus this repaired grammar-carrier delta are inclusive discovery evidence only. They prove no absence, normativity, ownership, or operation completeness.",
        mandatory_next_pass: "The next occurrence-owner/fixed-point pass MUST read the full pinned source bytes, including parser algorithms, token/component-value behavior, recovery, and serialization beyond heuristic arrays. It may cite this assay but MUST NOT derive completeness or absence from it.",
        caveat: "V3 grants no terminal exclusion, source inclusion, operation denominator, parser, conformance, movement, package, release, or production credit.",
    },
    counts: {
        source_universe: universe.sources.length,
        seed_members: universe.sources.length - complement.length,
        complement_entries: entries.length,
        by_route: { [NEUTRAL_ROUTE]: entries.length },
        terminal_exclusions: entries.filter((entry) => entry.terminal_exclusion_authorized).length,
        grammar_carrier_regression: {
            previously_missed_unquoted_blocks_now_inventoried: affectedBlocks,
            affected_sources: regressionSources.length,
            affected_nonblank_lines_now_inventoried: affectedLines,
            affected_lines_previously_absent_from_every_v2_category: previouslyAbsentLines,
            previously_captured_quoted_blocks_retained: retainedQuotedBlocks,
            previously_missed_unquoted_definition_carrier_opening_lines_now_inventoried: repairedDefinitionCarrierLines,
        },
        v2_dependency_accounting_non_credit_explicit_denominators: {
            source_rows_previously_labeled_dependency_review: v2DependencyRows.length,
            dependency_secondary_flags: v2DependencyFlagCount,
            attached_dependency_evidence_records_on_those_rows: v2DependencyEvidenceRecords,
        },
    },
    verification: {
        all_168_pinned_sources_hash_and_byte_verified: true,
        exact_92_entry_complement_bijection: entries.length === 92 && new Set(entries.map((entry) => entry.directory)).size === 92,
        all_92_have_exactly_one_neutral_route: entries.every((entry) => entry.route === NEUTRAL_ROUTE),
        route_selection_consumes_no_v1_or_v2_semantic_classification: true,
        every_entry_terminal_exclusion_false: entries.every((entry) => entry.terminal_exclusion_authorized === false),
        all_v2_line_addressed_inventory_facts_reverified_against_pinned_sources: true,
        all_53_previously_missed_blocks_line_addressed_below: affectedBlocks === 53,
        every_affected_nonblank_line_now_in_grammar_inventory: regressionSources.every((row) => row.every_affected_nonblank_line_in_v3_grammar_inventory),
        all_72_previously_captured_quoted_blocks_retained: retainedQuotedBlocks === 72,
        all_53_unquoted_openings_now_in_definition_carrier_line_inventory: repairedDefinitionCarrierLines === 53,
        canonical_order: "directory sorted by raw UTF-8 bytes",
    },
    grammar_carrier_regression_evidence: regressionSources,
    entries,
};
const contentDigest = compactDigest(payload);
process.stdout.write(`${JSON.stringify({
    ...payload,
    content_digest_sha256: contentDigest,
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before these two digest fields are appended",
}, null, 2)}\n`);
