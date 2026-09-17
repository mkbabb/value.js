import { sha256, uniqueSorted } from "./shared.mjs";

// This is an explicit table, not a symbol-pattern classifier. Candidate families
// are review routing only and never become owner edges in this provisional v2.
const EXPLICIT_COMPATIBILITY_CANDIDATES = Object.freeze({
    parseCssColor: "color",
    parseCssScalar: "values",
    parseCssValue: "values",
    parseCssValues: "values",
    parseKeyframeSelector: "keyframes",
    parseTimingFunction: "easing",
    serializeCssColor: "color",
    coerceToSyntax: "values",
    parseAnimationRange: "timeline-range",
    parseAnimationTimeline: "keyframes",
    serializeTimelineOptions: "keyframes",
    collectAnimationOptions: "stylesheet",
    collectCustomFunctions: "stylesheet",
    collectDeclarations: "stylesheet",
    collectKeyframes: "keyframes",
    collectPropertyDescriptors: "properties",
    collectStyleRules: "stylesheet",
    collectTimelineOptions: "keyframes",
    parseStylesheet: "stylesheet",
    CssColorSpace: "color",
    CssColor: "color",
    CssLinearStop: "easing",
    CssTimingFunction: "easing",
    Declaration: "properties",
    KeyframeSelector: "keyframes",
    KeyframeRule: "keyframes",
    CSSPropertyDescriptor: "properties",
    PropertyRule: "properties",
    CustomFunctionParameter: "func-body",
    CustomFunctionDescriptor: "func-body",
    CustomFunctionRule: "stylesheet",
    CSSAnimationOptions: "stylesheet",
    AnimationTimelineValue: "keyframes",
    ScrollerKeyword: "keyframes",
    TimelineAxis: "keyframes",
    ViewInset: "keyframes",
    RangePhase: "timeline-range",
    RangeBoundary: "timeline-range",
    AnimationRangeValue: "timeline-range",
    TimelineScopeValue: "keyframes",
    TriggerType: "keyframes",
    AnimationTriggerValue: "keyframes",
    CSSTimelineOptions: "keyframes",
    ScrollTimelineDescriptor: "keyframes",
    ViewTimelineDescriptor: "keyframes",
    StyleRule: "stylesheet",
    KeyframesBlock: "keyframes",
    StylesheetItem: "stylesheet",
    Stylesheet: "stylesheet",
    CollectedRule: "stylesheet",
    ParseIssue: null,
    ParseResult: null,
});

export function buildCompatibilityRows(censuses, piLineEvidence) {
    const evidenceSymbols = uniqueSorted(censuses.exports);
    const mappedSymbols = uniqueSorted(Object.keys(EXPLICIT_COMPATIBILITY_CANDIDATES));
    if (JSON.stringify(evidenceSymbols) !== JSON.stringify(mappedSymbols)) throw new Error("explicit compatibility mapping is not exactly the independently extracted 52-export census");
    const consumerSymbols = new Set(censuses.consumers);
    return censuses.exports.map((symbol) => {
        const candidate = EXPLICIT_COMPATIBILITY_CANDIDATES[symbol];
        const diagnosticBoundaryBlocked = symbol === "ParseIssue" || symbol === "ParseResult";
        const evidence = piLineEvidence[symbol];
        const mappingDigest = sha256(Buffer.from(JSON.stringify({ symbol, candidate, evidence }), "utf8"));
        return {
            symbol,
            surface: censuses.runtime.includes(symbol) ? "LEGACY_RUNTIME_EXPORT" : "LEGACY_TYPE_EXPORT",
            keyframes_consumer_seam: consumerSymbols.has(symbol),
            explicit_candidate_family: candidate,
            mapping_evidence: {
                source_path: "docs/tranches/V/apotheosis/pi/PI.md",
                exact_occurrence_lines: evidence,
                content_addressed_mapping_sha256: mappingDigest,
            },
            status: diagnosticBoundaryBlocked
                ? "RED_PENDING_NON_TOKEN_RESULT_DIAGNOSTICS_BOUNDARY"
                : "RED_EXPLICIT_MAPPING_PENDING_FORMATION_REVIEW",
            owner_edge_emitted: false,
            red_flags: diagnosticBoundaryBlocked
                ? ["RED_COMPATIBILITY_UNREVIEWED", "RED_NON_TOKEN_RESULT_DIAGNOSTICS_BOUNDARY_REQUIRED"]
                : ["RED_COMPATIBILITY_UNREVIEWED"],
        };
    });
}

export function buildOwnerScopeRows(v1, addendaBytes) {
    const lines = addendaBytes.toString("utf8").split(/\r?\n/);
    return v1.owner_scope_inputs.addenda_01_scope_rows.map((row) => {
        const exactInputLines = row.input_lines.map((line) => {
            const exact = lines[line - 1];
            if (exact === undefined) throw new Error(`${row.id}: owner input line out of range`);
            return { line, exact_line: exact, exact_line_sha256: sha256(Buffer.from(exact, "utf8")) };
        });
        const flags = ["RED_OWNER_SCOPE_JOIN_UNREVIEWED"];
        if (exactInputLines.length === 0) flags.push("RED_MISSING_EXACT_OWNER_INPUT_LINE");
        if (row.occurrence_carrier_ids.length === 0) flags.push("RED_NO_EXACT_DISCOVERY_CARRIER");
        return {
            id: row.id,
            input_source: "docs/tranches/V/apotheosis/pi/ADDENDA-01.md",
            input_source_sha256: v1.owner_scope_inputs.addenda_01_scope_rows[0].input_source_sha256,
            exact_input_lines: exactInputLines,
            reviewed_normalization: null,
            rejected_v1_search_terms_retained_as_discovery_only: row.search_terms,
            rejected_v1_discovery_carrier_ids: row.occurrence_carrier_ids,
            status: "RED_UNREVIEWED_OWNER_SCOPE_DISPOSITION",
            owner_edge_emitted: false,
            red_flags: uniqueSorted(flags),
        };
    });
}
