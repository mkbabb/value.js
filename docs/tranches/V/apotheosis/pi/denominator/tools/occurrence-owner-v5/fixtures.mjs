import { discoverFixture } from "./discover.mjs";
import { extractOwnerScope } from "./evidence.mjs";
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
        operationCase("all-algorithm-bearing-element-forms", '<h2 id="convert" algorithm="convert a color">Convert</h2>\n<h3 algorithm>Match</h3>\n<dfn algorithm for="PreferenceObject">Get preference</dfn>\n<ol class="algorithm"><li>Run.</li></ol>\n', [
            '<h2 id="convert" algorithm="convert a color">', "<h3 algorithm>", '<dfn algorithm for="PreferenceObject">', '<ol class="algorithm">',
        ]),
        referenceCase("markup-and-compound-css", "Use [^input/type/submit^] with ''trigger-scope: all''.\n", [
            { raw: "[^input/type/submit^]", type: "markup", name: "submit", scope: "input/type" },
            { raw: "''trigger-scope: all''", type: "css_term_double", name: "trigger-scope: all", scope: null },
        ]),
        referenceCase("definition-idl-element-display-text", "Use [=main axis|main=], {{CSS/supports(conditionText)|CSS.supports()}}, and <{input/type|type attribute}>.\n", [
            { raw: "[=main axis|main=]", type: "definition", name: "main axis", scope: null, link_text: "main" },
            { raw: "{{CSS/supports(conditionText)|CSS.supports()}}", type: "idl_or_property", name: "supports(conditionText)", scope: "CSS", link_text: "CSS.supports()" },
            { raw: "<{input/type|type attribute}>", type: "element", name: "type", scope: "input", link_text: "type attribute" },
        ]),
        referenceCase("bibliography-fragment-display", "See [[css2/visuren#visual-model-intro|Visual formatting model]].\n", [
            { raw: "[[css2/visuren#visual-model-intro|Visual formatting model]]", type: "bibliographic", name: "css2/visuren", anchor: "visual-model-intro", link_text: "Visual formatting model" },
        ]),
        referenceCase("html-attribute-values-excluded", "<h3 id='parse-selector' algorithm>Use [=visible|text=].</h3>\n", [
            { raw: "[=visible|text=]", type: "definition", name: "visible", scope: null, link_text: "text" },
        ]),
    ];
    const ownerIds = [
        "owner-color-growth", "owner-easing-spring", "owner-filter-url-shape-shadow", "owner-calc-math", "owner-gradients-image",
        "owner-keyframes-timeline-trigger", "owner-media-container-supports", "owner-typed-declarations", "owner-typed-selectors",
        "owner-at-rule-recovery", "owner-css-syntax", "owner-transform-motion", "owner-unit-algebra", "owner-substitution",
    ];
    const ownerBytes = Buffer.from([
        "relative-color color-mix light-dark contrast-color", "spring() easing-L4", "filter functions url() shapes shadow",
        "calc/math min/max/clamp", "gradients image union", "keyframes/timeline/trigger depth", "media/container/supports conditions",
        "typed declarations value matcher", "typed selectors", "at-rule recovery", "CSS-Syntax-L3 tokenizer",
        "full transform motion path", "unit algebra typed unit classes", "substitution var/env/attr typed",
    ].join("\n") + "\n", "utf8");
    const owner = extractOwnerScope(ownerBytes, ownerIds.map((id) => ({ id, search_terms: [] })));
    assert(owner.every((row, index) => row.input_lines[0] === index + 1), "owner provenance line extraction");
    const ownerCase = { name: "owner-scope-exact-line-provenance", input_sha256: sha256(ownerBytes), rows: owner.map((row) => ({ id: row.id, input_lines: row.input_lines })) };
    const receipt = { suite: "occurrence-owner-v5-exact-counterfixtures", case_count: cases.length + 1, cases: [...cases, ownerCase] };
    return { ...receipt, digest_sha256: sha256(canonicalBytes(receipt)) };
}
