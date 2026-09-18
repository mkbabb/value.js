import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const BLUEPRINT_PATH =
    "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v9-blueprint.json";
const FIXTURE_PATH =
    "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v9-fixtures.json";

const REQUIRED_IDENTITIES = Object.freeze([
    [
        "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8.json",
        24485,
        "1491335ca478a942efdbd7000f62a4e4aa57ce32b7db93af18ddeb346f5767af",
    ],
    [
        "docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v8-challenge-a.md",
        13805,
        "6d0c14190c5632994e4c2e9cbfdd5b16867d8a8689e7f7191f61dfbfc8cdd56d",
    ],
    [
        "docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v8-challenge-b.md",
        17864,
        "2c10bab979b0e2ef3c13d344e0ea2667b2950fba0fa41a0cde174024e67b018f",
    ],
    [
        "docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v8-root-gestalt.md",
        7305,
        "d27225314682318d98c5bfde5abcfd4831949fa8d2d4ee9ac777fd8ff7e94f11",
    ],
    [
        "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8-rejection.json",
        3272,
        "1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5",
    ],
    [
        "docs/tranches/V/apotheosis/pi/denominator/source-universe.json",
        75132,
        "c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7",
    ],
    [
        "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8.shards/sources.json",
        24279,
        "ff44e41c3767f3941f9dc5fe01089c8cbcdac1c50cbd0ce0751190b65d3c6373",
    ],
    [
        "docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v8.shards/compatibility.json",
        3102,
        "882687365568d26319288652c5911e7845d651efc4db0722f131805e02445aa4",
    ],
    [
        "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-v8/fixtures.mjs",
        22402,
        "3c5926b4911b0826fe86d4252aa93110083c22744bd2ffb4de5b3dd45d3ebc0a",
    ],
]);

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const fail = (message) => {
    throw new Error(message);
};
const assert = (condition, message) => {
    if (!condition) fail(message);
};

function readJson(path) {
    const bytes = readFileSync(resolve(ROOT, path));
    const value = JSON.parse(bytes.toString("utf8"));
    assert(bytes.at(-1) === 0x0a, `${path}: missing terminal LF`);
    return { bytes, value };
}

function validateRequiredIdentities() {
    return REQUIRED_IDENTITIES.map(([path, expectedBytes, expectedHash]) => {
        const bytes = readFileSync(resolve(ROOT, path));
        assert(
            bytes.length === expectedBytes,
            `${path}: expected ${expectedBytes} bytes, found ${bytes.length}`,
        );
        assert(sha256(bytes) === expectedHash, `${path}: identity drift`);
        return { path, bytes: bytes.length, sha256: expectedHash };
    });
}

function occurrences(text, raw) {
    const result = [];
    let cursor = 0;
    while (cursor <= text.length) {
        const index = text.indexOf(raw, cursor);
        if (index < 0) break;
        result.push(index);
        cursor = index + Math.max(1, raw.length);
    }
    return result;
}

function validateFixtureClosure(fixtures, analyzerStates) {
    assert(
        fixtures.schema_version === "value.pi.occurrence-owner-v9-fixture-closure/v1",
        "fixture schema_version",
    );
    assert(
        fixtures.status === "RED_PREAUTHOR_FIXTURE_CLOSURE_ZERO_CREDIT",
        "fixture status",
    );
    assert(
        fixtures.coordinate_system === "UTF8_BYTE_HALF_OPEN",
        "fixture coordinate system",
    );
    assert(
        fixtures.cases.length === 18,
        `expected 18 V9 cases, found ${fixtures.cases.length}`,
    );
    const ids = new Set();
    const operationIds = new Set();
    let bytes = 0;
    for (const fixture of fixtures.cases) {
        assert(!ids.has(fixture.id), `duplicate fixture id ${fixture.id}`);
        ids.add(fixture.id);
        assert(
            new URL(fixture.source_url).protocol === "https:",
            `${fixture.id}: source URL must be https`,
        );
        assert(fixture.invariant.length >= 16, `${fixture.id}: invariant too weak`);
        bytes += Buffer.byteLength(fixture.input, "utf8");
        for (const state of fixture.expected.states_required)
            assert(
                analyzerStates.has(state),
                `${fixture.id}: undeclared state ${state}`,
            );
        for (const raw of [
            ...fixture.expected.included_raw,
            ...fixture.expected.excluded_raw,
        ]) {
            assert(
                occurrences(fixture.input, raw).length > 0,
                `${fixture.id}: expected raw absent: ${JSON.stringify(raw)}`,
            );
        }
        for (const url of fixture.expected.resolved_urls ?? [])
            assert(
                new URL(url).protocol === "https:",
                `${fixture.id}: resolved URL invalid`,
            );
        for (const id of fixture.expected.operation_ledger_ids) operationIds.add(id);
    }
    for (const value of Object.values(fixtures.credits))
        assert(value === 0, "fixture credit must remain zero");
    return {
        case_count: ids.size,
        input_bytes: bytes,
        operation_ids: [...operationIds].sort(),
    };
}

function validateBlueprint(blueprint, fixtureSummary) {
    assert(
        blueprint.schema_version ===
            "value.pi.full-source-occurrence-owner-formation/v9-blueprint",
        "blueprint schema_version",
    );
    assert(
        blueprint.status === "RED_PREAUTHOR_BLUEPRINT_INCOMPLETE_ZERO_CREDIT",
        "blueprint status",
    );
    assert(blueprint.authority.formation_only === true, "formation-only law");
    assert(
        blueprint.authority.may_generate_denominator_shards === false,
        "blueprint cannot generate shards",
    );
    assert(
        blueprint.authority.may_promote === false &&
            blueprint.authority.red_only === true,
        "red-only law",
    );
    assert(
        blueprint.required_analyzer_contract.architecture ===
            "ONE_SOURCE_ORDER_BYTE_POSITIONED_STREAM",
        "single-stream architecture",
    );
    assert(
        blueprint.required_analyzer_contract.coordinate_system ===
            "UTF8_BYTE_HALF_OPEN",
        "byte coordinate contract",
    );
    const states = new Set(blueprint.required_analyzer_contract.states);
    assert(
        states.size === blueprint.required_analyzer_contract.states.length,
        "duplicate analyzer state",
    );
    const consumers = new Set(
        blueprint.required_analyzer_contract.single_stream_consumers,
    );
    for (const consumer of [
        "carriers",
        "headings",
        "containers",
        "definitions",
        "operations",
        "references",
    ])
        assert(consumers.has(consumer), `missing shared-stream consumer ${consumer}`);
    assert(
        blueprint.required_analyzer_contract.laws.some((law) => law.includes("8*N+64")),
        "explicit work bound absent",
    );
    assert(
        blueprint.independent_oracle_contract.implementation_boundary.includes(
            "NO_IMPORT_FROM_ANALYZER",
        ),
        "oracle import independence absent",
    );
    assert(
        blueprint.independent_oracle_contract.mutations.length >= 15,
        "insufficient invariant-specific mutations",
    );
    assert(
        blueprint.fixture_closure.case_count === fixtureSummary.case_count,
        "fixture count mismatch",
    );
    for (const [name, identity] of Object.entries(blueprint.formation_assets)) {
        const bytes = readFileSync(resolve(ROOT, identity.path));
        assert(bytes.length === identity.bytes, `${name}: formation-asset byte drift`);
        assert(
            sha256(bytes) === identity.sha256,
            `${name}: formation-asset identity drift`,
        );
    }
    assert(
        blueprint.fixture_closure.bytes ===
            blueprint.formation_assets.fixture_closure.bytes &&
            blueprint.fixture_closure.sha256 ===
                blueprint.formation_assets.fixture_closure.sha256,
        "fixture closure identity mismatch",
    );
    const fixtureRows = blueprint.normative_operation_ledger_contract.fixture_rows;
    const ledgerIds = new Set(fixtureRows.map((row) => row.operation_id));
    assert(
        ledgerIds.size === fixtureRows.length,
        "duplicate fixture operation ledger id",
    );
    for (const id of fixtureSummary.operation_ids)
        assert(ledgerIds.has(id), `fixture operation missing ledger row ${id}`);
    assert(
        blueprint.normative_operation_ledger_contract.status ===
            "REQUIRED_NOT_YET_FULLY_MATERIALIZED",
        "operation ledger must remain unresolved",
    );
    assert(
        blueprint.known_unresolved_limitations.some((row) =>
            row.startsWith("No V9 analyzer"),
        ),
        "missing honest executable limitation",
    );
    for (const value of Object.values(blueprint.credits))
        assert(value === 0, "blueprint credit must remain zero");
    return states;
}

function negativeControls(blueprint, fixtures) {
    const controls = [];
    const expectReject = (id, mutate, validate) => {
        const candidate = structuredClone(
            mutate === "blueprint" ? blueprint : fixtures,
        );
        try {
            validate(candidate);
            fail(`negative control admitted: ${id}`);
        } catch (error) {
            if (String(error.message).startsWith("negative control admitted"))
                throw error;
            controls.push({ id, result: "REJECTED", reason: error.message });
        }
    };
    expectReject("NC-CREDIT", "blueprint", (candidate) => {
        candidate.credits.denominator = 1;
        validateBlueprint(candidate, {
            case_count: fixtures.cases.length,
            operation_ids: [
                "EXPLICIT-ALGORITHM-A",
                "EXPLICIT-ALGORITHM-B",
                "FIXTURE-CONVERT-COLOR",
                "FIXTURE-PROCEDURE",
            ],
        });
    });
    expectReject("NC-GENERATE", "blueprint", (candidate) => {
        candidate.authority.may_generate_denominator_shards = true;
        validateBlueprint(candidate, {
            case_count: fixtures.cases.length,
            operation_ids: [
                "EXPLICIT-ALGORITHM-A",
                "EXPLICIT-ALGORITHM-B",
                "FIXTURE-CONVERT-COLOR",
                "FIXTURE-PROCEDURE",
            ],
        });
    });
    expectReject("NC-LEDGER", "blueprint", (candidate) => {
        candidate.normative_operation_ledger_contract.fixture_rows.pop();
        validateBlueprint(candidate, {
            case_count: fixtures.cases.length,
            operation_ids: [
                "EXPLICIT-ALGORITHM-A",
                "EXPLICIT-ALGORITHM-B",
                "FIXTURE-CONVERT-COLOR",
                "FIXTURE-PROCEDURE",
            ],
        });
    });
    expectReject("NC-DUPLICATE-FIXTURE", "fixtures", (candidate) => {
        candidate.cases[1].id = candidate.cases[0].id;
        validateFixtureClosure(
            candidate,
            new Set(blueprint.required_analyzer_contract.states),
        );
    });
    expectReject("NC-UNDECLARED-STATE", "fixtures", (candidate) => {
        candidate.cases[0].expected.states_required.push("SECOND_SCANNER");
        validateFixtureClosure(
            candidate,
            new Set(blueprint.required_analyzer_contract.states),
        );
    });
    return controls;
}

const identities = validateRequiredIdentities();
const blueprintRecord = readJson(BLUEPRINT_PATH);
const fixtureRecord = readJson(FIXTURE_PATH);
const provisionalStates = new Set(
    blueprintRecord.value.required_analyzer_contract.states,
);
const fixtureSummary = validateFixtureClosure(fixtureRecord.value, provisionalStates);
validateBlueprint(blueprintRecord.value, fixtureSummary);
const controls = process.argv.includes("--negative-controls")
    ? negativeControls(blueprintRecord.value, fixtureRecord.value)
    : [];

process.stdout.write(
    `${JSON.stringify(
        {
            status: "GREEN_BLUEPRINT_INTERNAL_ONLY_ZERO_DENOMINATOR_CREDIT",
            blueprint: {
                path: BLUEPRINT_PATH,
                bytes: blueprintRecord.bytes.length,
                sha256: sha256(blueprintRecord.bytes),
            },
            fixtures: {
                path: FIXTURE_PATH,
                bytes: fixtureRecord.bytes.length,
                sha256: sha256(fixtureRecord.bytes),
                ...fixtureSummary,
            },
            frozen_precursors: identities.length,
            negative_controls: controls,
            limitations: blueprintRecord.value.known_unresolved_limitations,
        },
        null,
        2,
    )}\n`,
);
