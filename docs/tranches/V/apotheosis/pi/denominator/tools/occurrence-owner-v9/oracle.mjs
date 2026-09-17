import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decodeHTMLAttribute } from "entities";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTRACT_PATH = resolve(HERE, "semantic-contract.json");
const CONTRACT_BYTES = readFileSync(CONTRACT_PATH);
const CONTRACT = JSON.parse(CONTRACT_BYTES);
const CONTRACT_WITNESSES = new Map(
    CONTRACT.witnesses.map((row) => [
        `${row.source_url ?? "https://invalid.example/Overview.bs"}\0${row.source}`,
        row,
    ]),
);
if (
    CONTRACT.schema !== "value.pi.occurrence-owner-v9-repair3-semantic-contract/v1" ||
    CONTRACT_WITNESSES.size !== CONTRACT.witnesses.length
)
    throw new Error("invalid or duplicate repair3 semantic contract");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const stableJson = (value) => JSON.stringify(value);

export class OracleFailure extends Error {
    constructor(code, detail) {
        super(`${code}: ${detail}`);
        this.name = "OracleFailure";
        this.code = code;
    }
}

const reject = (code, detail) => {
    throw new OracleFailure(code, detail);
};
const requireTruth = (condition, code, detail) => {
    if (!condition) reject(code, detail);
};
const same = (actual, expected, code) =>
    requireTruth(stableJson(actual) === stableJson(expected), code, stableJson({ actual, expected }));

function normalizeInput(source, options) {
    let text = "";
    const errors = [];
    try {
        text = String(source);
    } catch {
        errors.push({ code: "SOURCE_COERCION_REJECTED" });
    }
    let sourceUrl = "https://invalid.example/Overview.bs";
    let operationLedger = [];
    if (options !== undefined && (options === null || (typeof options !== "object" && typeof options !== "function")))
        errors.push({ code: "OPTIONS_OBJECT_REQUIRED" });
    else if (options !== undefined) {
        try {
            const value = options.sourceUrl;
            if (value !== undefined) {
                if (typeof value === "string") sourceUrl = value;
                else errors.push({ code: "SOURCE_URL_STRING_REQUIRED" });
            }
        } catch {
            errors.push({ code: "SOURCE_URL_ACCESS_REJECTED" });
        }
        try {
            const value = options.operationLedger;
            if (value !== undefined) {
                if (Array.isArray(value)) operationLedger = value;
                else errors.push({ code: "LEDGER_ARRAY_REQUIRED" });
            }
        } catch {
            errors.push({ code: "LEDGER_ACCESS_REJECTED" });
        }
    }
    return { text, sourceUrl, operationLedger, errors };
}

function byteSlice(bytes, start, end) {
    return bytes.subarray(start, end).toString("utf8");
}

function candidateIdentity(sourceId, row) {
    const preimage = `${sourceId}\0${row.start_offset}\0${row.end_offset_exclusive}\0${row.type}\0${row.raw}`;
    return {
        id: `candidate-${sha256(Buffer.from(preimage))}`,
        preimage_sha256: sha256(Buffer.from(preimage)),
    };
}

function verifyPartition(bytes, ranges, work) {
    let offset = 0;
    for (const range of ranges) {
        work.rows += 1;
        requireTruth(range.start_offset === offset, "STATE_PARTITION", String(offset));
        requireTruth(
            Number.isInteger(range.end_offset_exclusive) &&
                range.end_offset_exclusive > offset &&
                range.end_offset_exclusive <= bytes.length,
            "STATE_PARTITION",
            stableJson(range),
        );
        offset = range.end_offset_exclusive;
    }
    requireTruth(offset === bytes.length, "STATE_PARTITION", `${offset}/${bytes.length}`);
}

function verifyTags(bytes, tags, work) {
    const byId = new Map();
    for (const tag of tags) {
        work.rows += 1;
        requireTruth(!byId.has(tag.id), "TAG_ID", tag.id);
        byId.set(tag.id, tag);
        requireTruth(
            Number.isInteger(tag.start_offset) &&
                Number.isInteger(tag.end_offset_exclusive) &&
                tag.start_offset >= 0 &&
                tag.end_offset_exclusive <= bytes.length &&
                tag.end_offset_exclusive > tag.start_offset,
            "TAG_INTERVAL",
            tag.id,
        );
        for (const attribute of tag.attributes) {
            work.rows += 1;
            if (attribute.value_start_offset === null) {
                requireTruth(attribute.value === null && attribute.raw_value === null, "ATTRIBUTE_VALUE", tag.id);
                continue;
            }
            const raw = byteSlice(
                bytes,
                attribute.value_start_offset,
                attribute.value_end_offset_exclusive,
            );
            requireTruth(raw === attribute.raw_value, "ATTRIBUTE_PROVENANCE", attribute.name);
            requireTruth(
                decodeHTMLAttribute(raw) === attribute.value,
                "ATTRIBUTE_SEMANTICS",
                attribute.name,
            );
        }
    }
    for (const tag of tags) {
        if (tag.matching_tag_id === null) continue;
        work.indexed_lookups += 1;
        const peer = byId.get(tag.matching_tag_id);
        requireTruth(peer?.matching_tag_id === tag.id, "TAG_PAIR", tag.id);
    }
    return byId;
}

function verifyCandidates(bytes, sourceId, result, work) {
    const dispositionById = new Map();
    for (const row of result.dispositions) {
        work.rows += 1;
        requireTruth(!dispositionById.has(row.candidate_id), "DISPOSITION_BIJECTION", row.candidate_id);
        requireTruth(
            row.disposition === "INCLUDED" || row.disposition === "REVIEWED_EXCLUDED",
            "DISPOSITION_ENUM",
            row.disposition,
        );
        dispositionById.set(row.candidate_id, row);
    }
    for (const candidate of result.candidates) {
        work.rows += 1;
        const identity = candidateIdentity(sourceId, candidate);
        requireTruth(byteSlice(bytes, candidate.start_offset, candidate.end_offset_exclusive) === candidate.raw, "CANDIDATE_PROVENANCE", candidate.id);
        requireTruth(candidate.id === identity.id, "CANDIDATE_ID", candidate.id);
        requireTruth(candidate.id_preimage_sha256 === identity.preimage_sha256, "CANDIDATE_ID", candidate.id);
        work.indexed_lookups += 1;
        const disposition = dispositionById.get(candidate.id);
        requireTruth(
            disposition?.start_offset === candidate.start_offset &&
                disposition.end_offset_exclusive === candidate.end_offset_exclusive,
            "DISPOSITION_BIJECTION",
            candidate.id,
        );
    }
    requireTruth(dispositionById.size === result.candidates.length, "DISPOSITION_BIJECTION", "extra row");
}

function verifyRelations(result, tagById, work) {
    const headingById = new Map();
    let previous = -1;
    for (const heading of result.headings) {
        work.rows += 1;
        requireTruth(heading.start_offset >= previous, "HEADING_ORDER", heading.id);
        previous = heading.start_offset;
        requireTruth(!headingById.has(heading.id), "HEADING_ID", heading.id);
        requireTruth(Array.isArray(heading.container_path), "CONTAINER_PATH", heading.id);
        for (const id of heading.container_path) {
            work.indexed_lookups += 1;
            requireTruth(tagById.has(id), "CONTAINER_PATH", id);
        }
        headingById.set(heading.id, heading);
    }
    for (const operation of result.operation_candidates) {
        work.rows += 1;
        requireTruth(Array.isArray(operation.container_path), "CONTAINER_PATH", "operation");
        if (operation.owner_candidate !== null) {
            work.indexed_lookups += 1;
            const heading = headingById.get(operation.owner_candidate);
            requireTruth(heading !== undefined, "OPERATION_OWNER", operation.owner_candidate);
            requireTruth(heading.title === operation.heading_title, "OPERATION_OWNER", operation.heading_title);
            const prefix = heading.container_path.every(
                (id, index) => operation.container_path[index] === id,
            );
            requireTruth(prefix, "OPERATION_CONTAINER_OWNER", operation.owner_candidate);
        }
    }
    const carrierIds = new Set(result.carriers.map((row) => row.id));
    for (const candidate of result.candidates) {
        if (!Array.isArray(candidate.target_carrier_ids)) continue;
        for (const id of candidate.target_carrier_ids) {
            work.indexed_lookups += 1;
            requireTruth(carrierIds.has(id), "CARRIER_TARGET", id);
        }
    }
}

function verifyLedger(result, ledger, sourceId, sourceUrl, work) {
    if (result.ledger_contract_errors.length > 0)
        reject("LEDGER_CONTRACT", stableJson(result.ledger_contract_errors));
    const byId = new Map();
    for (const row of ledger) {
        work.rows += 1;
        if (row === null || typeof row !== "object") continue;
        try {
            byId.set(row.operation_id, row);
        } catch {}
    }
    for (const operation of result.operations) {
        work.indexed_lookups += 1;
        const row = byId.get(operation.operation_id);
        requireTruth(row !== undefined, "OPERATION_JOIN", operation.operation_id);
        requireTruth(row.review_status === "REVIEWED_ACCEPTED", "LEDGER_REVIEW_STATUS", String(row.review_status));
        requireTruth(
            row.source_id === sourceId &&
                row.source_url === sourceUrl &&
                row.source_byte_anchor_or_reviewed_locator === operation.start_offset,
            "OPERATION_JOIN",
            operation.operation_id,
        );
    }
    requireTruth(result.ledger_conflicts.length === 0, "LEDGER_OCCURRENCE_CONFLICT", stableJson(result.ledger_conflicts));
    requireTruth(result.ledger_unmatched_ids.length === 0, "REVIEWED_OPERATION_OMISSION", result.ledger_unmatched_ids.join(","));
}

function verifyStableIds(result, work) {
    const expected = [
        ...result.candidates.map((row) => row.id),
        ...result.operations.map((row) => row.operation_id),
        ...result.carriers.map((row) => row.id),
    ];
    same(result.stable_ids, expected, "STABLE_ID_SET");
    const seen = new Map();
    const collisions = [];
    for (const id of expected) {
        work.rows += 1;
        if (seen.has(id)) collisions.push(id);
        else seen.set(id, true);
    }
    same(
        [...new Set(result.stable_id_collisions.map((row) => row.id))].sort(),
        [...new Set(collisions)].sort(),
        "STABLE_ID_COLLISION_REPORT",
    );
    requireTruth(collisions.length === 0, "STABLE_ID_COLLISION", collisions.join(","));
}

function includedRaw(result) {
    const included = new Set(
        result.dispositions
            .filter((row) => row.disposition === "INCLUDED")
            .map((row) => row.candidate_id),
    );
    return result.candidates.filter((row) => included.has(row.id)).map((row) => row.raw).sort();
}

function excludedRaw(result) {
    const excluded = new Set(
        result.dispositions
            .filter((row) => row.disposition === "REVIEWED_EXCLUDED")
            .map((row) => row.candidate_id),
    );
    return result.candidates.filter((row) => excluded.has(row.id)).map((row) => row.raw).sort();
}

function verifyWitness(source, sourceUrl, result, work) {
    const witness = CONTRACT_WITNESSES.get(`${sourceUrl}\0${source}`);
    if (witness === undefined) return null;
    work.indexed_lookups += 1;
    const expected = witness.expect;
    if (expected.included_raw !== undefined)
        same(includedRaw(result), [...expected.included_raw].sort(), "WITNESS_INCLUDED");
    if (expected.excluded_raw !== undefined)
        same(excludedRaw(result), [...expected.excluded_raw].sort(), "WITNESS_EXCLUDED");
    for (const raw of expected.candidate_absent_raw ?? [])
        requireTruth(!result.candidates.some((row) => row.raw === raw), "WITNESS_ABSENT", raw);
    for (const [raw, state] of Object.entries(expected.candidate_states ?? {}))
        requireTruth(result.candidates.find((row) => row.raw === raw)?.state === state, "WITNESS_STATE", raw);
    if (expected.heading_titles !== undefined)
        same(result.headings.map((row) => row.title), expected.heading_titles, "WITNESS_HEADING");
    if (expected.candidate_types !== undefined)
        same(result.candidates.map((row) => row.type).sort(), [...expected.candidate_types].sort(), "WITNESS_CANDIDATE_TYPE");
    if (expected.carrier_names !== undefined)
        same(result.carriers.map((row) => [...row.names].sort()), expected.carrier_names.map((row) => [...row].sort()), "WITNESS_CARRIER_NAME");
    if (expected.carrier_scopes !== undefined)
        same(result.carriers.map((row) => row.scopes), expected.carrier_scopes, "WITNESS_CARRIER_SCOPE");
    if (expected.resolved_definition_count !== undefined)
        requireTruth(
            result.candidates.filter((row) => row.type === "definition" && row.target_carrier_ids?.length > 0).length === expected.resolved_definition_count,
            "WITNESS_DEFINITION_TARGET",
            witness.id,
        );
    if (expected.href_values !== undefined)
        same(result.candidates.filter((row) => row.href_value !== undefined).map((row) => row.href_value), expected.href_values, "WITNESS_HREF_VALUE");
    if (expected.resolved_urls !== undefined)
        same(result.candidates.filter((row) => row.resolved_url !== undefined).map((row) => row.resolved_url), expected.resolved_urls, "WITNESS_RESOLVED_URL");
    if (expected.operation_owner_titles !== undefined)
        same(
            result.operation_candidates
                .filter((row) => row.kind === "explicit_algorithm")
                .map((row) => row.heading_title),
            expected.operation_owner_titles,
            "WITNESS_OPERATION_OWNER",
        );
    return witness.id;
}

function verifyAnalyzerWork(source, bytes, result) {
    const work = result.work;
    requireTruth(work.model === "INSTRUMENTED_LOWER_BOUND_NOT_FORMAL_COMPLEXITY_PROOF", "WORK_CLAIM", work.model);
    requireTruth(work.formal_upper_bound_claimed === false && result.claims.formal_complexity_bound === false, "WORK_CLAIM", "formal claim");
    requireTruth(work.classified_code_units === source.length, "WORK_SUPPRESSION", "classified_code_units");
    requireTruth(work.source_utf8_bytes === bytes.length, "WORK_SUPPRESSION", "source_utf8_bytes");
    requireTruth(work.range_rows === result.ranges.length, "WORK_SUPPRESSION", "range_rows");
    requireTruth(work.tag_rows === result.tags.length, "WORK_SUPPRESSION", "tag_rows");
    requireTruth(work.candidate_rows === result.candidates.length, "WORK_SUPPRESSION", "candidate_rows");
}

export function verifyAnalysis(source, result, options) {
    const input = normalizeInput(source, options);
    const bytes = Buffer.from(input.text, "utf8");
    const sourceId = sha256(bytes);
    const verifierWork = { rows: 0, indexed_lookups: 0, source_utf8_bytes: bytes.length };
    requireTruth(result.schema_version === "value.pi.occurrence-owner-v9-repair3-analysis/v1", "ANALYSIS_SCHEMA", String(result.schema_version));
    requireTruth(result.status === "RED_RESEARCH_REPAIR3_ZERO_CREDIT", "ANALYSIS_STATUS", String(result.status));
    requireTruth(
        result.source.bytes === bytes.length &&
            result.source.sha256 === sourceId &&
            result.source.source_url === input.sourceUrl,
        "SOURCE_IDENTITY",
        "bytes, hash, or base",
    );
    for (const error of input.errors)
        requireTruth(
            result.input_contract_errors.some((row) => row.code === error.code),
            "INPUT_CONTRACT",
            error.code,
        );
    verifyPartition(bytes, result.ranges, verifierWork);
    const tags = verifyTags(bytes, result.tags, verifierWork);
    verifyCandidates(bytes, sourceId, result, verifierWork);
    verifyRelations(result, tags, verifierWork);
    verifyLedger(result, input.operationLedger, sourceId, input.sourceUrl, verifierWork);
    verifyStableIds(result, verifierWork);
    const witness = verifyWitness(input.text, input.sourceUrl, result, verifierWork);
    verifyAnalyzerWork(input.text, bytes, result);
    for (const value of Object.values(result.credits)) requireTruth(value === 0, "CREDIT_ESCALATION", String(value));
    for (const value of Object.values(result.claims)) requireTruth(value === false, "CLAIM_ESCALATION", String(value));
    verifierWork.total_units = verifierWork.rows + verifierWork.indexed_lookups + bytes.length;
    return {
        status: "GREEN_DECLARATIVE_WITNESS_ORACLE_REPAIR3_RED_ONLY",
        semantic_witness_id: witness,
        semantic_contract: {
            path: CONTRACT_PATH,
            bytes: CONTRACT_BYTES.length,
            sha256: sha256(CONTRACT_BYTES),
        },
        analyzer_work_units: result.work.total_instrumented_units,
        verifier_work: verifierWork,
        formal_complexity_bound: false,
    };
}
