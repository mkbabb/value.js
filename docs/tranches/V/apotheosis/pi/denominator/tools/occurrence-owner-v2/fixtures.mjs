import { buildContext, bindDefinitionList, contextAt, discoverOperationCandidates, parseContainers, parseHeadings } from "./context.mjs";
import { carrierFixtureFlags } from "./owners.mjs";
import { discoverReferences } from "./references.mjs";
import { sha256, splitLines } from "./shared.mjs";

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function fixtureSource(text) {
    const bytes = Buffer.from(text, "utf8");
    return { exact_path: "fixture/Overview.bs", bytes, lines: splitLines(bytes) };
}

function carrier(source, { id = "occ-fixture", kind = "semantic_definition", names = [], start = 0, end = source.bytes.length, ownerCandidates = [] } = {}) {
    const raw = source.bytes.subarray(start, end);
    return {
        id,
        source_path: source.exact_path,
        kind,
        names,
        start_offset: start,
        end_offset_exclusive: end,
        raw_slice_bytes: raw.length,
        raw_slice_sha256: sha256(raw),
        owner_join: { candidates: ownerCandidates },
    };
}

const FIXTURES = [
    ["scoped-set-remove-does-not-join-unscoped-remove", () => {
        const source = fixtureSource("<p><dfn>remove</dfn></p>\n<p>[=set/Remove=]</p>\n");
        const rows = discoverReferences([source], [carrier(source, { names: ["remove"] })]).references;
        const ref = rows.find((row) => row.reference_type === "definition");
        assert(ref.raw_spelling === "[=set/Remove=]", "original scoped spelling lost");
        assert(ref.typed_identity.scope === "set", "scope lost");
        assert(ref.target_carrier_ids.length === 0 && ref.resolution_status === "RED_EXTERNAL_OR_UNRESOLVED", "scoped reference falsely joined");
    }],
    ["multi-domain-gradient-color-function-red", () => {
        const flags = carrierFixtureFlags({ kind: "function_definition", names: ["gradient functions"], owner_join: { candidates: ["color", "gradients"] } });
        assert(flags.includes("RED_FUNCTION_OWNER_REVIEW_REQUIRED") && flags.includes("RED_MULTI_DOMAIN_CANDIDATE"), "multi-domain function did not stay RED");
    }],
    ["encoded-image-src-retains-typed-production-identity", () => {
        const source = fixtureSource("<pre><dfn>&lt;image-src></dfn></pre>\n<p><<image-src>></p>\n");
        const definitionEnd = source.lines[0].end;
        const rows = discoverReferences([source], [carrier(source, { kind: "grammar_production", names: ["&lt;image-src>"], end: definitionEnd })]).references;
        const ref = rows.find((row) => row.reference_type === "production");
        assert(ref.typed_identity.canonical_name === "image-src", "grammar identity was double-normalized");
        assert(ref.target_carrier_ids.length === 1, "typed production target carrier ID absent");
    }],
    ["mixed-normative-markers-are-distinct-occurrences", () => {
        const source = fixtureSource("[[FOO]] and [[!FOO#bar|Bar]]\n");
        const rows = discoverReferences([source], []).references.filter((row) => row.reference_type === "bibliographic");
        assert(rows.length === 2, "mixed markers collapsed");
        assert(rows.some((row) => row.typed_identity.normative_marker === "UNMARKED"), "unmarked occurrence absent");
        assert(rows.some((row) => row.typed_identity.normative_marker === "NORMATIVE_EXPLICIT" && row.typed_identity.anchor === "bar"), "normative marker or anchor absent");
    }],
    ["atx-serialization-section-and-markdown-list-discovered", () => {
        const source = fixtureSource("## Serializing CSS Values ## {#serializing-css-values}\n\n1. Take a value.\n2. Return text.\n");
        const model = buildContext(source.lines);
        const candidates = discoverOperationCandidates(source.exact_path, source.bytes, source.lines, model);
        assert(model.headings[0].syntax === "BIKESHED_ATX" && model.headings[0].anchor === "serializing-css-values", "ATX heading or anchor absent");
        assert(candidates.some((row) => row.kind === "serialization_section_candidate"), "ATX serialization section absent");
        assert(candidates.some((row) => row.kind === "markdown_algorithm_or_recovery_candidate"), "Markdown operation list absent");
    }],
    ["definition-term-binds-adjacent-definition-body", () => {
        const source = fixtureSource("<dl>\n<dt><dfn>term</dfn>\n<dd>Defining body.\n</dl>\n");
        const boundary = bindDefinitionList(source.bytes, source.lines, 2);
        assert(boundary?.combined !== undefined, "dt/dd combined boundary absent");
        assert(boundary.status === "RED_UNREVIEWED_DT_DD_BOUNDARY", "dt/dd boundary should remain unreviewed RED");
        assert(boundary.combined.start_line === 2 && boundary.combined.end_line === 3, "dt/dd exact boundary wrong");
    }],
    ["history-context-propagates", () => {
        const source = fixtureSource("# Main\n\n## Changes Since CR\n\nInvalid values changed.\n");
        const model = buildContext(source.lines);
        const inherited = contextAt(model, 4);
        assert(inherited.inherited_markers.some((marker) => /change/i.test(marker)), "history/change context did not propagate");
        assert(inherited.red_flags.includes("RED_INFORMATIVE_EXAMPLE_HISTORY_OR_CHANGE_CONTEXT"), "history context did not RED the row");
    }],
    ["multi-name-definition-red", () => {
        const flags = carrierFixtureFlags({ kind: "property_definition", names: ["orphans", "widows"], owner_join: { candidates: [] } });
        assert(flags.includes("RED_MULTI_NAME_DEFINITION"), "multi-name definition was not RED");
    }],
    ["unclosed-algorithm-block-red", () => {
        const source = fixtureSource("# Parsing\n\n<div class=algorithm>\n1. Consume input.\n");
        const containers = parseContainers(source.lines);
        assert(containers.some((row) => !row.closed), "unclosed container was silently closed");
        const candidates = discoverOperationCandidates(source.exact_path, source.bytes, source.lines, { headings: parseHeadings(source.lines), containers });
        assert(candidates.some((row) => row.red_flags.includes("RED_STRUCTURAL_BLOCK_UNCLOSED")), "unclosed algorithm block did not stay structural RED");
    }],
];

export function runFixtures() {
    const results = [];
    for (const [name, fixture] of FIXTURES) {
        try {
            fixture();
            results.push({ name, status: "PASS" });
        } catch (error) {
            results.push({ name, status: "FAIL", message: error.message });
        }
    }
    const failed = results.filter((row) => row.status === "FAIL").length;
    return {
        fixture_count: results.length,
        passed: results.length - failed,
        failed,
        required_fixture_topics: ["set/Remove", "multi-domain gradient/color", "&lt;image-src>", "mixed normative markers", "ATX serialization", "dt/dd", "history context", "multi-name definitions", "unclosed blocks"],
        results,
    };
}
