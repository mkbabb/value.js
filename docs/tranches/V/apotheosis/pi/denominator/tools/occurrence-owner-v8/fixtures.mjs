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

function inheritedDefinitionCase() {
    const text = [
        '<dl dfn-for="display" dfn-type="value"><dt><dfn data-lt="grid-lanes|masonry">grid-lanes</dfn></dt></dl>',
        '<section data-dfn-for="animation"><dfn data-dfn-type="value">running</dfn></section>',
        '<div for="media"><dfn dfn-type="value">screen</dfn></div>',
        "Use ''display/grid-lanes!!value'', ''display/masonry!!value'', ''animation/running!!value'', and ''media/screen!!value''.",
    ].join("\n") + "\n";
    const definitions = [
        ["grid", '<dfn data-lt="grid-lanes|masonry">grid-lanes</dfn>', ["grid-lanes"]],
        ["running", '<dfn data-dfn-type="value">running</dfn>', ["running"]],
        ["screen", '<dfn dfn-type="value">screen</dfn>', ["screen"]],
    ];
    const carriers = definitions.map(([id, raw, names]) => {
        const start = Buffer.byteLength(text.slice(0, text.indexOf(raw)), "utf8");
        return { id: `fixture-${id}`, source_path: "fixture/Overview.bs", kind: "semantic_definition", start_offset: start, end_offset_exclusive: start + Buffer.byteLength(raw), names };
    });
    const result = discoverFixture(text, carriers);
    const expected = new Map([
        ["''display/grid-lanes!!value''", "fixture-grid"], ["''display/masonry!!value''", "fixture-grid"],
        ["''animation/running!!value''", "fixture-running"], ["''media/screen!!value''", "fixture-screen"],
    ]);
    for (const [raw, id] of expected) {
        const reference = result.references.find((row) => row.raw === raw);
        assert(reference !== undefined, `inherited-definition-scope: ${raw} absent`);
        assert(reference.link_type === "value" && JSON.stringify(reference.target_carrier_ids) === JSON.stringify([id]), `inherited-definition-scope: ${raw} target join`);
    }
    return { name: "inherited-definition-scope-type-and-alternate-text", input_sha256: sha256(Buffer.from(text)), joins: [...expected] };
}

function headingContextCase() {
    const text = [
        "Security Considerations {#security}",
        "===================================",
        '<h2 id="changes">Appendix A. Changes</h2>',
        '<h3 id="changes-2022"',
        ' data-note="multiline">',
        "Changes since August 2022</h3>",
        "<div algorithm>Return.</div>",
    ].join("\n") + "\n";
    const result = discoverFixture(text);
    const candidate = result.operations.candidates.find((row) => row.kind === "bikeshed_div_algorithm_candidate");
    assert(candidate !== undefined, "mixed-heading-context: operation absent");
    const titles = candidate.context.sections.map((row) => [row[1], row[2]]);
    assert(JSON.stringify(titles) === JSON.stringify([[2, "Appendix A. Changes"], [3, "Changes since August 2022"]]), `mixed-heading-context: ${JSON.stringify(titles)}`);
    assert(!candidate.context.markers.includes("security"), "mixed-heading-context: false Security ancestry");
    return { name: "mixed-bikeshed-html-multiline-heading-ancestry", input_sha256: sha256(Buffer.from(text)), section_titles: titles };
}

function activeHrefAndQuotedTagCase() {
    const text = '<a data-note="> is quoted" href="https://drafts.csswg.org/css-values-4/#combine-integers">rounded</a>\n';
    const result = discoverFixture(text);
    assert(result.references.length === 1, "active-href-quoted-tag: reference count");
    const reference = result.references[0];
    assert(reference.raw === "https://drafts.csswg.org/css-values-4/#combine-integers" && reference.processing_context === "HTML_HREF", "active-href-quoted-tag: exact href reference");
    assert(result.source.bytes.subarray(reference.start_offset, reference.end_offset_exclusive).toString("utf8") === reference.raw, "active-href-quoted-tag: exact byte replay");
    assert(result.lexical_dispositions.some((row) => row.disposition === "INCLUDED" && row.reason === "ACTIVE_HREF_SPECIFICATION_REFERENCE"), "active-href-quoted-tag: included disposition");
    return { name: "active-specification-href-with-quoted-greater-than", input_sha256: sha256(Buffer.from(text)), raw: reference.raw, start_offset: reference.start_offset };
}

function escapedPromiseCase() {
    const text = "Use \\[[PromiseIsHandled]] and [[CSS-SYNTAX-3]].\n";
    const result = discoverFixture(text);
    assert(result.references.length === 1 && result.references[0].raw === "[[CSS-SYNTAX-3]]", "escaped-promise: only live bibliography");
    assert(result.lexical_dispositions.some((row) => row.disposition === "REVIEWED_EXCLUDED" && row.reason === "REVIEWED_EXCLUDED_ESCAPED_SHORTHAND"), "escaped-promise: reviewed exclusion");
    return { name: "escaped-promise-internal-slot", input_sha256: sha256(Buffer.from(text)), live_references: result.references.map((row) => row.raw) };
}

function rawAndProcessedCodeCase() {
    const text = [
        "<script>f('script')</script>",
        "<style>x { value: 'style'; }</style>",
        "<xmp><<xmp>></xmp>",
        "<pre highlight=css>p { value: 'css'; }</pre>",
        "<pre class='example lang-javascript'>const state = 'running';</pre>",
        "<code>{{DOMPointReadOnly/x}}</code><samp>[=processed sample=]</samp>",
    ].join("\n") + "\n";
    const result = discoverFixture(text);
    assert(JSON.stringify(result.references.map((row) => row.raw).sort()) === JSON.stringify(["[=processed sample=]", "{{DOMPointReadOnly/x}}"].sort()), "raw-and-processed-code: only processed links live");
    assert(result.references.every((row) => row.processing_context === "BIKESHED_CODE"), "raw-and-processed-code: processed context");
    const reasons = new Set(result.lexical_dispositions.filter((row) => row.disposition === "REVIEWED_EXCLUDED").map((row) => row.reason));
    for (const reason of ["REVIEWED_EXCLUDED_RAW_SCRIPT", "REVIEWED_EXCLUDED_RAW_STYLE", "REVIEWED_EXCLUDED_RAW_XMP", "REVIEWED_EXCLUDED_RAW_PRE_HIGHLIGHTED"]) assert(reasons.has(reason), `raw-and-processed-code: ${reason}`);
    return { name: "raw-elements-highlighted-pre-and-processed-code-samp", input_sha256: sha256(Buffer.from(text)), live_references: result.references.map((row) => row.raw), excluded_reasons: [...reasons].sort() };
}

function inactiveStructureCase() {
    const text = [
        "<!-- <h2 id='commented'>Security</h2><div algorithm>False.</div><dt>Fake</dt><dd>Body</dd> -->",
        "<pre class='lang-css'>Security\n--------\n<div algorithm>False raw.</div></pre>",
        "# Parse",
        "<div algorithm>Real.</div>",
    ].join("\n") + "\n";
    const result = discoverFixture(text);
    assert(result.operations.algorithmOpenings.length === 1 && result.operations.algorithmOpenings[0].raw_opening === "<div algorithm>", "inactive-structure: only active algorithm");
    const candidate = result.operations.candidates.find((row) => row.kind === "bikeshed_div_algorithm_candidate");
    assert(candidate !== undefined && !candidate.context.markers.includes("security"), "inactive-structure: no false Security ancestry");
    assert([...result.contexts.values()][0].headings.every((row) => row.title !== "Security"), "inactive-structure: no inactive heading");
    return { name: "comments-and-highlighted-raw-structure-excluded", input_sha256: sha256(Buffer.from(text)), algorithm_openings: result.operations.algorithmOpenings.length };
}

function quotedBlendHeadingCase() {
    const text = '<h4 id="blendingnormal"><dfn dfn-type="value" dfn-for="<blend-mode>">normal</dfn> blend mode</h4>\n<div algorithm>Blend.</div>\n';
    const result = discoverFixture(text);
    const heading = [...result.contexts.values()][0].headings[0];
    const operation = result.operations.candidates.find((row) => row.kind === "bikeshed_div_algorithm_candidate");
    assert(heading.title === "normal blend mode", `quoted-blend-heading: ${heading.title}`);
    assert(operation?.context.sections.some((row) => row[2] === "normal blend mode"), "quoted-blend-heading: operation ancestry");
    return { name: "quote-aware-compositing-normal-blend-heading", input_sha256: sha256(Buffer.from(text)), title: heading.title };
}

function markdownInlineQuotedHeadingCase() {
    const text = [
        '## <span data-note="> remains quoted">Quoted</span> heading {#quoted-atx}',
        '<div algorithm>Run.</div>',
        '<span data-note="> remains quoted">Setext</span> heading {#quoted-setext}',
        '--------',
        '<div algorithm>Run again.</div>',
    ].join("\n") + "\n";
    const result = discoverFixture(text);
    const headings = [...result.contexts.values()][0].headings.map((row) => [row.syntax, row.title, row.anchor]);
    assert(headings.some((row) => JSON.stringify(row) === JSON.stringify(["BIKESHED_ATX", "Quoted heading", "quoted-atx"])), `markdown-inline-quoted-heading: ATX ${JSON.stringify(headings)}`);
    assert(headings.some((row) => JSON.stringify(row) === JSON.stringify(["BIKESHED_SETEXT", "Setext heading", "quoted-setext"])), `markdown-inline-quoted-heading: setext ${JSON.stringify(headings)}`);
    return { name: "markdown-headings-inline-tag-quoted-greater-than", input_sha256: sha256(Buffer.from(text)), headings };
}

function unrelatedQuotedAlgorithmCase() {
    const text = '<div data-note="algorithm > is only prose">Not an algorithm.</div>\n<div class="algorithmic > example">Still not.</div>\n';
    const result = discoverFixture(text);
    assert(result.operations.algorithmOpenings.length === 0, "unrelated-quoted-algorithm: false operation");
    return { name: "unrelated-quoted-algorithm-text-is-not-marker", input_sha256: sha256(Buffer.from(text)), algorithm_openings: 0 };
}

function quotedContainerAttributesCase() {
    const text = '<section class="note > example" id="container>quoted">\n# Parse\n<div algorithm>Run.</div>\n</section>\n';
    const result = discoverFixture(text);
    const operation = result.operations.candidates.find((row) => row.kind === "bikeshed_div_algorithm_candidate");
    const container = operation?.context.containers.find((row) => row[0] === "section");
    assert(container !== undefined, "quoted-container-attributes: section ancestry");
    assert(JSON.stringify(container[1]) === JSON.stringify([">", "example", "note"]) && container[2] === "container>quoted", `quoted-container-attributes: ${JSON.stringify(container)}`);
    return { name: "parsed-container-class-id-with-quoted-greater-than", input_sha256: sha256(Buffer.from(text)), classes: container[1], id: container[2] };
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
        operationCase("boolean-data-algorithm", "# Parse\n<section data-algorithm>\n1. Consume.\n</section>\n", ["<section data-algorithm>"]),
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
        referenceCase("type-modified-css-shorthands", "Use 'font-family!!property' and ''font-kerning/auto!!value''.\n", [
            { raw: "'font-family!!property'", type: "css_shorthand_single", name: "font-family", link_type: "property", target_form: "UNSCOPED_TARGET" },
            { raw: "''font-kerning/auto!!value''", type: "css_term_double", name: "auto", scope: "font-kerning", link_type: "value", target_form: "SCOPED_TARGET" },
        ]),
        referenceCase("bibliography-modifier-semantics", "See [[css-multicol-1 inline]], [[L2-22-080R snapshot|proposal]], and [[css-values-4 inline#calc-notation|calc]].\n", [
            { raw: "[[css-multicol-1 inline]]", type: "bibliographic", name: "css-multicol-1", modifier: "inline" },
            { raw: "[[L2-22-080R snapshot|proposal]]", type: "bibliographic", name: "L2-22-080R", modifier: "snapshot", link_text: "proposal" },
            { raw: "[[css-values-4 inline#calc-notation|calc]]", type: "bibliographic", name: "css-values-4", modifier: "inline", anchor: "calc-notation", link_text: "calc" },
        ]),
        referenceCase("raw-code-style-literals-and-bikeshed-code-links", "<pre highlight=javascript>alert('finished'); left: '-20px'</pre><style>local('MathJax_AMS-Regular')</style><xmp><script>f('bar')</script></xmp><code>{{DOMPointReadOnly/x}} 'literal'</code>\nUse 'animation'.\n", [
            { raw: "{{DOMPointReadOnly/x}}", type: "idl_or_property", name: "x", scope: "DOMPointReadOnly", processing_context: "BIKESHED_CODE" },
            { raw: "'animation'", type: "css_shorthand_single", name: "animation", processing_context: "BIKESHED_TEXT" },
        ]),
        referenceCase("dated-undated-and-draft-url-boundaries", "https://www.w3.org/TR/2023/WD-css-images-4-20230217/; https://www.w3.org/TR/css-syntax-3/#tokenization, https://drafts.csswg.org/selectors-4/#subject.\n", [
            { raw: "https://www.w3.org/TR/2023/WD-css-images-4-20230217/", type: "spec_url", name: "WD-css-images-4-20230217", modifier: "DATED_TR_2023" },
            { raw: "https://www.w3.org/TR/css-syntax-3/#tokenization", type: "spec_url", name: "css-syntax-3", anchor: "tokenization" },
            { raw: "https://drafts.csswg.org/selectors-4/#subject", type: "spec_url", name: "selectors-4", anchor: "subject" },
        ]),
        referenceCase("slash-bearing-inline-css-maybe", "Use ''atan(-1 / 1)'', ''--ar: (16 / 9);'', and ''0 / 0''.\n", [
            { raw: "''atan(-1 / 1)''", type: "css_term_double", name: "atan(-1 / 1)", scope: null, target_form: "INLINE_MAYBE" },
            { raw: "''--ar: (16 / 9);''", type: "css_term_double", name: "--ar: (16 / 9);", scope: null, target_form: "INLINE_MAYBE" },
            { raw: "''0 / 0''", type: "css_term_double", name: "0 / 0", scope: null, target_form: "INLINE_MAYBE" },
        ]),
        referenceCase("multiline-lf-bibliography-and-definition", "See [[css2/about#property-defs|CSS property\ndefinition conventions]] and [=input progress\nvalue=].\n", [
            { raw: "[[css2/about#property-defs|CSS property\ndefinition conventions]]", type: "bibliographic", name: "css2/about", anchor: "property-defs", link_text: "CSS property definition conventions", processing_context: "BIKESHED_TEXT" },
            { raw: "[=input progress\nvalue=]", type: "definition", name: "input progress value", processing_context: "BIKESHED_TEXT" },
        ]),
        referenceCase("multiline-crlf-exact-source-preservation", "See [[css-backgrounds-3#shadow-layers|Layering,\r\n Layout]] and [=output progress\r\nvalue=].\r\n", [
            { raw: "[[css-backgrounds-3#shadow-layers|Layering,\r\n Layout]]", type: "bibliographic", name: "css-backgrounds-3", anchor: "shadow-layers", link_text: "Layering, Layout", processing_context: "BIKESHED_TEXT" },
            { raw: "[=output progress\r\nvalue=]", type: "definition", name: "output progress value", processing_context: "BIKESHED_TEXT" },
        ]),
        inheritedDefinitionCase(),
        headingContextCase(),
        activeHrefAndQuotedTagCase(),
        escapedPromiseCase(),
        rawAndProcessedCodeCase(),
        inactiveStructureCase(),
        quotedBlendHeadingCase(),
        markdownInlineQuotedHeadingCase(),
        unrelatedQuotedAlgorithmCase(),
        quotedContainerAttributesCase(),
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
    const receipt = { suite: "occurrence-owner-v8-exact-counterfixtures", case_count: cases.length + 1, cases: [...cases, ownerCase] };
    return { ...receipt, digest_sha256: sha256(canonicalBytes(receipt)) };
}
