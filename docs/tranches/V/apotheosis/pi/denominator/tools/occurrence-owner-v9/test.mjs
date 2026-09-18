import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { analyzeSource } from "./analyzer.mjs";
import { OracleFailure, verifyAnalysis } from "./oracle.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(HERE, "../../occurrence-owner-formation-v9-fixtures.json");
const INHERITED_PATH = resolve(HERE, "../occurrence-owner-v8/fixtures.mjs");
const CONTRACT_PATH = resolve(HERE, "semantic-contract.json");
const INHERITED_IDENTITY = Object.freeze({
    bytes: 22402,
    sha256: "3c5926b4911b0826fe86d4252aa93110083c22744bd2ffb4de5b3dd45d3ebc0a",
});
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};
const sourceIdentity = (source) => sha256(Buffer.from(source, "utf8"));
const byteOffset = (source, character) => Buffer.byteLength(source.slice(0, character), "utf8");

function ledgerRow(source, sourceUrl, operationId, kind, locator, anchor = undefined, owner = null) {
    return {
        operation_id: operationId,
        kind,
        ...(anchor === undefined ? {} : { anchor }),
        source_id: sourceIdentity(source),
        source_url: sourceUrl,
        source_byte_anchor_or_reviewed_locator: locator,
        normative_family: "REPAIR3_TEST_ONLY",
        entry_conditions: [],
        outputs: [],
        owner_candidate: owner,
        citation_identity: "REPAIR3_TEST_ONLY",
        review_status: "REVIEWED_ACCEPTED",
        required: true,
    };
}

function fixtureLedger(fixture) {
    let explicitCursor = 0;
    return fixture.expected.operation_ledger_ids.map((id) => {
        if (id === "FIXTURE-PROCEDURE")
            return ledgerRow(fixture.input, fixture.source_url, id, "heading_anchor", 0, "fixture-procedure");
        if (id === "FIXTURE-CONVERT-COLOR")
            return ledgerRow(fixture.input, fixture.source_url, id, "heading_anchor", 0, "fixture-convert-color");
        const at = fixture.input.indexOf("<div algorithm>", explicitCursor);
        assert(at >= 0, `${fixture.id}: operation source`);
        explicitCursor = at + 1;
        return ledgerRow(
            fixture.input,
            fixture.source_url,
            id,
            "explicit_algorithm",
            byteOffset(fixture.input, at),
        );
    });
}

function run(source, options = {}) {
    const result = analyzeSource(source, options);
    const oracle = verifyAnalysis(source, result, options);
    return { result, oracle };
}

function dispositionMap(result) {
    return new Map(result.dispositions.map((row) => [row.candidate_id, row.disposition]));
}

function checkFixture(fixture) {
    const operationLedger = fixtureLedger(fixture);
    const { result, oracle } = run(fixture.input, {
        sourceUrl: fixture.source_url,
        operationLedger,
    });
    const states = new Set(result.ranges.map((row) => row.state));
    for (const state of fixture.expected.states_required)
        assert(states.has(state), `${fixture.id}: missing ${state}`);
    const dispositions = dispositionMap(result);
    const included = result.candidates
        .filter((row) => dispositions.get(row.id) === "INCLUDED")
        .map((row) => row.raw);
    included.push(...result.operations.map((row) => row.raw_opening.trimEnd()));
    assert(
        JSON.stringify(included.sort()) === JSON.stringify([...fixture.expected.included_raw].sort()),
        `${fixture.id}: included ${JSON.stringify(included)}`,
    );
    for (const raw of fixture.expected.excluded_raw) {
        if (raw.startsWith("<dt>")) {
            assert(result.operations.length === 0, `${fixture.id}: descriptive operation`);
            continue;
        }
        if (raw.startsWith("#") && states.has("PROCESSED_CODE")) {
            assert(!result.headings.some((row) => row.title.includes("Parse Algorithm")), `${fixture.id}: code heading`);
            continue;
        }
        const candidate = result.candidates.find((row) => row.raw === raw);
        if (candidate !== undefined)
            assert(dispositions.get(candidate.id) === "REVIEWED_EXCLUDED", `${fixture.id}: excluded candidate`);
    }
    for (const url of fixture.expected.resolved_urls ?? [])
        assert(result.candidates.some((row) => row.resolved_url === url), `${fixture.id}: URL ${url}`);
    for (const form of fixture.expected.resolved_target_forms ?? [])
        assert(result.candidates.some((row) => row.target_form === form && row.target_carrier_ids.length > 0), `${fixture.id}: target ${form}`);
    for (const form of fixture.expected.unresolved_target_forms ?? [])
        assert(result.candidates.some((row) => row.target_form === form && row.target_carrier_ids.length === 0), `${fixture.id}: unresolved ${form}`);
    assert(
        JSON.stringify(result.operations.map((row) => row.operation_id).sort()) ===
            JSON.stringify([...fixture.expected.operation_ledger_ids].sort()),
        `${fixture.id}: operation ledger`,
    );
    return {
        id: fixture.id,
        bytes: result.source.bytes,
        analyzer_work_units: result.work.total_instrumented_units,
        verifier_work_units: oracle.verifier_work.total_units,
    };
}

function contractWitnesses(contract) {
    return contract.witnesses.map((witness) => {
        const options = witness.source_url === undefined ? {} : { sourceUrl: witness.source_url };
        const { result, oracle } = run(witness.source, options);
        assert(oracle.semantic_witness_id === witness.id, `${witness.id}: witness not applied`);
        return {
            id: witness.id,
            bytes: result.source.bytes,
            analyzer_work_units: result.work.total_instrumented_units,
            verifier_work_units: oracle.verifier_work.total_units,
        };
    });
}

function expectOracleReject(id, source, result, options, codes) {
    try {
        verifyAnalysis(source, result, options);
    } catch (error) {
        assert(error instanceof OracleFailure, `${id}: non-oracle failure`);
        assert(codes.includes(error.code), `${id}: ${error.code}`);
        return { id, code: error.code };
    }
    throw new Error(`${id}: mutation admitted`);
}

function mutationCases(contract) {
    const byId = new Map(contract.witnesses.map((row) => [row.id, row]));
    const mutateWitness = (id, change, codes) => {
        const witness = byId.get(id);
        const options = witness.source_url === undefined ? {} : { sourceUrl: witness.source_url };
        const result = structuredClone(analyzeSource(witness.source, options));
        change(result);
        return expectOracleReject(id, witness.source, result, options, codes);
    };
    const removeCandidate = (result, predicate = () => true) => {
        const removed = result.candidates.find(predicate);
        result.candidates = result.candidates.filter((row) => row !== removed);
        result.dispositions = result.dispositions.filter((row) => row.candidate_id !== removed.id);
        result.stable_ids = result.stable_ids.filter((id) => id !== removed.id);
        result.work.candidate_rows -= 1;
    };
    const rows = [
        mutateWitness("BIBLIO_AND_SLASH", (result) => {
            removeCandidate(result);
        }, ["WITNESS_INCLUDED"]),
        mutateWitness("STALE_STACK", (result) => {
            result.candidates[0].state = "VISIBLE_TEXT";
        }, ["WITNESS_STATE"]),
        mutateWitness("SETEXT_CONSUMED", (result) => {
            result.headings.push({ ...result.headings[0], id: "heading-1", title: "---" });
        }, ["WITNESS_HEADING"]),
        mutateWitness("PARSED_ATTRIBUTE_URL", (result) => {
            result.candidates[0].href_value = result.candidates[0].href_raw_value;
        }, ["WITNESS_HREF_VALUE"]),
        mutateWitness("INHERITED_DEFINITION", (result) => {
            result.carriers[0].names = ["visible"];
        }, ["WITNESS_CARRIER_NAME"]),
        mutateWitness("CONTAINER_OWNER", (result) => {
            result.operation_candidates.find((row) => row.kind === "explicit_algorithm").heading_title = "Inner";
        }, ["OPERATION_OWNER", "WITNESS_OPERATION_OWNER"]),
        mutateWitness("PRE_EXPLICIT_L", (result) => {
            result.dispositions.find((row) => row.disposition === "REVIEWED_EXCLUDED").disposition = "INCLUDED";
        }, ["WITNESS_INCLUDED", "WITNESS_EXCLUDED"]),
        mutateWitness("MANUAL_AUTOLINK", (result) => {
            removeCandidate(result);
        }, ["WITNESS_CANDIDATE_TYPE"]),
        mutateWitness("HEADING_DEFINITION", (result) => {
            result.carriers = [];
            result.stable_ids = result.stable_ids.filter((id) => !id.startsWith("carrier-"));
        }, ["CARRIER_TARGET", "WITNESS_CARRIER_NAME", "WITNESS_DEFINITION_TARGET"]),
        mutateWitness("PARSED_ATTRIBUTE_SCOPE", (result) => {
            result.carriers[0].scopes = ["wrong"];
        }, ["WITNESS_CARRIER_SCOPE"]),
        mutateWitness("ASCII_CASE_URL", (result) => {
            removeCandidate(result);
        }, ["WITNESS_INCLUDED"]),
    ];
    return rows;
}

function ledgerAuthorityCases() {
    const source = "[=term=]\n<div algorithm>x</div>";
    const sourceUrl = "https://drafts.csswg.org/ledger-test/";
    const at = byteOffset(source, source.indexOf("<div"));
    const candidateId = analyzeSource(source, { sourceUrl }).candidates[0].id;
    const collisionLedger = [
        ledgerRow(source, sourceUrl, candidateId, "explicit_algorithm", at),
    ];
    const collision = analyzeSource(source, { sourceUrl, operationLedger: collisionLedger });
    assert(collision.stable_id_collisions.some((row) => row.id === candidateId), "union collision omitted");
    const rejectedCollision = expectOracleReject(
        "UNION_STABLE_ID_COLLISION",
        source,
        collision,
        { sourceUrl, operationLedger: collisionLedger },
        ["STABLE_ID_COLLISION"],
    );
    const rejectedLedger = [
        { ...ledgerRow(source, sourceUrl, "REJECTED-ROW", "explicit_algorithm", at), review_status: "REJECTED" },
    ];
    const rejected = analyzeSource(source, { sourceUrl, operationLedger: rejectedLedger });
    assert(
        rejected.operations.length === 0 &&
            rejected.ledger_contract_errors.some((row) => row.code === "LEDGER_REVIEW_STATUS"),
        "rejected review status admitted",
    );
    const rejectedStatus = expectOracleReject(
        "REJECTED_LEDGER_STATUS",
        source,
        rejected,
        { sourceUrl, operationLedger: rejectedLedger },
        ["LEDGER_CONTRACT"],
    );
    return [rejectedCollision, rejectedStatus];
}

function hostileInputCases() {
    const throwingSource = { toString() { throw new Error("hostile source"); } };
    const throwingOptions = Object.defineProperty({}, "sourceUrl", {
        get() { throw new Error("hostile sourceUrl"); },
    });
    const hostileRow = Object.defineProperty({}, "operation_id", {
        enumerable: true,
        get() { throw new Error("hostile ledger row"); },
    });
    const cases = [
        ["x", { sourceUrl: Symbol("hostile") }],
        ["x", throwingOptions],
        ["x", { operationLedger: [hostileRow] }],
        [throwingSource, undefined],
        ["x", null],
        ["x", 7],
    ];
    const rows = cases.map(([source, options]) => analyzeSource(source, options));
    assert(rows.every((row) => Array.isArray(row.input_contract_errors)), "input errors missing");
    assert(rows.slice(0, 4).every((row) => row.input_contract_errors.length > 0), "hostile input silently accepted");
    for (const index of [0, 1, 3, 4, 5]) verifyAnalysis(cases[index][0], rows[index], cases[index][1]);
    const suppressed = structuredClone(rows[0]);
    suppressed.input_contract_errors = [];
    const mutation = expectOracleReject(
        "INPUT_CONTRACT_ERROR_SUPPRESSION",
        cases[0][0],
        suppressed,
        cases[0][1],
        ["INPUT_CONTRACT"],
    );
    return {
        rows: rows.map((row, index) => ({ index, codes: row.input_contract_errors.map((error) => error.code) })),
        mutation,
    };
}

function arbitraryByteNoThrow() {
    let state = 0x9e3779b9;
    const next = () => {
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        return state >>> 0;
    };
    const decoder = new TextDecoder("utf-8", { fatal: false });
    let inputBytes = 0;
    let decodedBytes = 0;
    for (let caseIndex = 0; caseIndex < 512; caseIndex += 1) {
        const bytes = Buffer.alloc(next() % 513);
        for (let index = 0; index < bytes.length; index += 1) bytes[index] = next() & 0xff;
        const source = decoder.decode(bytes);
        const { result } = run(source);
        inputBytes += bytes.length;
        decodedBytes += result.source.bytes;
    }
    return { cases: 512, arbitrary_input_bytes: inputBytes, decoded_utf8_bytes: decodedBytes };
}

function stateCoverage() {
    const source = [
        "visible \\😀",
        "<!-- comment -->",
        "```css\nfenced\n```",
        "<pre class=metadata>data</pre>",
        "<script>script</script><style>style</style><xmp>xmp</xmp>",
        "<pre>ordinary pre</pre><code>processed</code>",
        '<a href="../relative">tag and attribute</a>',
        '<a title="unterminated',
    ].join("\n");
    const { result } = run(source, {
        sourceUrl: "https://drafts.csswg.org/css-values-4/Overview.bs",
    });
    const states = new Set(result.ranges.map((row) => row.state));
    const expected = [
        "DATABLOCK", "ESCAPE", "FENCED_BLOCK", "HTML_COMMENT",
        "MALFORMED_TAG_RECOVERY", "PROCESSED_CODE", "RAW_PRE", "RAW_SCRIPT",
        "RAW_STYLE", "RAW_XMP", "TAG", "TAG_ATTRIBUTE", "VISIBLE_TEXT",
    ];
    for (const state of expected) assert(states.has(state), `missing state ${state}`);
    return { total: states.size, names: [...states].sort() };
}

function geometricObservations() {
    const families = [
        ["NESTED_TAGS", (n) => `${"<section>".repeat(n)}x${"</section>".repeat(n)}`],
        ["REFERENCES", (n) => "[=x=] ".repeat(n)],
        ["HEADINGS", (n) => "# H {#h}\n".repeat(n)],
        ["CARRIERS", (n) => '<div dfn-for="s"><dfn>x</dfn></div>'.repeat(n)],
    ];
    const rows = [];
    for (const [family, sourceFor] of families) {
        let priorAnalyzer = -1;
        let priorVerifier = -1;
        for (const size of [32, 64, 128, 256, 512]) {
            const source = sourceFor(size);
            const { result, oracle } = run(source);
            assert(result.work.total_instrumented_units > priorAnalyzer, `${family}: analyzer work`);
            assert(oracle.verifier_work.total_units > priorVerifier, `${family}: verifier work`);
            priorAnalyzer = result.work.total_instrumented_units;
            priorVerifier = oracle.verifier_work.total_units;
            rows.push({
                family,
                size,
                bytes: result.source.bytes,
                analyzer_work_units: result.work.total_instrumented_units,
                verifier_work_units: oracle.verifier_work.total_units,
                verifier_indexed_lookups: oracle.verifier_work.indexed_lookups,
                formal_bound_credit: false,
            });
        }
    }
    return rows;
}

const fixtureBytes = readFileSync(FIXTURE_PATH);
const fixtures = JSON.parse(fixtureBytes);
const fixtureRows = fixtures.cases.map(checkFixture);
const inheritedBytes = readFileSync(INHERITED_PATH);
assert(
    inheritedBytes.length === INHERITED_IDENTITY.bytes && sha256(inheritedBytes) === INHERITED_IDENTITY.sha256,
    "inherited V8 fixture identity drift",
);
const inherited = await import(pathToFileURL(INHERITED_PATH));
const inheritedResult = inherited.runCounterfixtures();
assert(inheritedResult.cases.length === fixtures.inherited_suite.case_count, "inherited V8 count");
const contractBytes = readFileSync(CONTRACT_PATH);
const contract = JSON.parse(contractBytes);
const witnessRows = contractWitnesses(contract);
const mutations = mutationCases(contract);
const ledgerAuthority = ledgerAuthorityCases();
const hostileOptions = hostileInputCases();
const arbitrary = arbitraryByteNoThrow();
const states = stateCoverage();
const geometric = geometricObservations();

process.stdout.write(`${JSON.stringify({
    status: "GREEN_V9_REPAIR3_RESEARCH_ONLY_ZERO_DENOMINATOR_CREDIT",
    fixtures: { bytes: fixtureBytes.length, sha256: sha256(fixtureBytes), cases: fixtureRows.length, rows: fixtureRows },
    inherited_v8: {
        bytes: inheritedBytes.length,
        sha256: sha256(inheritedBytes),
        cases: inheritedResult.cases.length,
        digest_sha256: inheritedResult.digest_sha256,
        credit: 0,
    },
    semantic_contract: {
        bytes: contractBytes.length,
        sha256: sha256(contractBytes),
        rules: contract.rules.length,
        witnesses: witnessRows.length,
        rows: witnessRows,
    },
    rejected_mutations: { total: mutations.length + ledgerAuthority.length, rows: [...mutations, ...ledgerAuthority] },
    hostile_option_boundary: { total: hostileOptions.rows.length, ...hostileOptions },
    arbitrary_byte_no_throw: arbitrary,
    state_coverage: states,
    geometric_observations: {
        rows: geometric,
        classification: "SEPARATE_INSTRUMENTED_OBSERVATIONS_ONLY_NOT_A_BOUND_OR_BENCHMARK",
    },
    claims: {
        full_source_denominator: false,
        normative_operation_ledger: false,
        formal_complexity_bound: false,
        authenticated_launcher: false,
        publisher: false,
        parser: false,
        production: false,
    },
    credits: { denominator: 0, operation: 0, semantic: 0, parser: 0, production: 0 },
    remaining_red: [
        "168-source execution not performed",
        "normative operation ledger and full denominator absent",
        "authenticated launcher/runtime/resource closure absent",
        "formal resource bound and benchmark absent",
        "two fresh exact-byte hostile reviews and root adjudication pending"
    ]
}, null, 2)}\n`);
