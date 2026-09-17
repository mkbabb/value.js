import { discoverFixture } from "./discover.mjs";
import { canonicalBytes, sha256 } from "./shared.mjs";

function assert(condition, message) {
    if (!condition) throw new Error(`counterfixture failed: ${message}`);
}

function referenceCase(name, text, expected) {
    const result = discoverFixture(text);
    assert(result.references.length === expected.length, `${name}: expected ${expected.length} references, found ${result.references.length}`);
    for (const wanted of expected) {
        const actual = result.references.find((row) => row.raw === wanted.raw);
        assert(actual !== undefined, `${name}: missing ${wanted.raw}`);
        for (const [key, value] of Object.entries(wanted)) assert(actual[key] === value, `${name}: ${key} expected ${JSON.stringify(value)}, found ${JSON.stringify(actual[key])}`);
        assert(result.source.bytes.subarray(actual.start_offset, actual.end_offset_exclusive).toString("utf8") === actual.raw, `${name}: exact byte replay`);
    }
    return { name, input_sha256: sha256(Buffer.from(text, "utf8")), references: result.references.map((row) => ({ raw: row.raw, type: row.type, name: row.name, scope: row.scope })) };
}

function operationCase(name, text, expectedOpenings) {
    const result = discoverFixture(text);
    assert(result.operations.algorithmOpenings.length === expectedOpenings.length, `${name}: expected ${expectedOpenings.length} algorithm openings`);
    for (const expectedOpening of expectedOpenings) {
        const opening = result.operations.algorithmOpenings.find((row) => row.raw_opening === expectedOpening);
        assert(opening !== undefined, `${name}: missing opening ${expectedOpening}`);
        assert(opening.candidate_ids.length > 0, `${name}: opening ${expectedOpening} has no candidate`);
        for (const id of opening.candidate_ids) assert(result.operations.candidates.some((candidate) => candidate.id === id && candidate.start_line <= opening.line && candidate.end_line >= opening.line), `${name}: opening ${expectedOpening} candidate does not enclose opening`);
    }
    return { name, input_sha256: sha256(Buffer.from(text, "utf8")), openings: result.operations.algorithmOpenings.map((row) => row.raw_opening), candidate_count: result.operations.candidates.length };
}

export function runCounterfixtures() {
    const cases = [
        referenceCase("single-quoted-css-and-element", "Use 'animation' with <{li}>.\n", [
            { raw: "'animation'", type: "css_shorthand_single", name: "animation", scope: null },
            { raw: "<{li}>", type: "element", name: "li", scope: null },
        ]),
        referenceCase("scoped-css-and-idl", "Use ''animation-timeline-range/cover'' and {{Event/target}}.\n", [
            { raw: "{{Event/target}}", type: "idl_or_property", name: "target", scope: "Event" },
            { raw: "''animation-timeline-range/cover''", type: "css_term_double", name: "cover", scope: "animation-timeline-range" },
        ]),
        referenceCase("production-definition-property-and-bibliography", "Parse <<length>> beside [=concept=], {{CSSStyleDeclaration/color}}, and [[!CSS-VALUES-4#calc-notation|calc]].\n", [
            { raw: "[[!CSS-VALUES-4#calc-notation|calc]]", type: "bibliographic", name: "CSS-VALUES-4", scope: null },
            { raw: "<<length>>", type: "production", name: "length", scope: null },
            { raw: "[=concept=]", type: "definition", name: "concept", scope: null },
            { raw: "{{CSSStyleDeclaration/color}}", type: "idl_or_property", name: "color", scope: "CSSStyleDeclaration" },
        ]),
        operationCase("boolean-and-valued-algorithm-divs", "# Parse\n<div algorithm>\n1. Return.\n</div>\n<div algorithm=\"convert\">\n1. Convert.\n</div>\n", ["<div algorithm>", "<div algorithm=\"convert\">"]),
        operationCase("class-and-data-algorithm-divs", "# Serialization\n<div class='note algorithm'>\n1. Serialize.\n</div>\n<div data-algorithm='roundtrip'>\n1. Return.\n</div>\n", ["<div class='note algorithm'>", "<div data-algorithm='roundtrip'>"]),
    ];
    const receipt = { suite: "occurrence-owner-v4-exact-counterfixtures", case_count: cases.length, cases };
    return { ...receipt, digest_sha256: sha256(canonicalBytes(receipt)) };
}
