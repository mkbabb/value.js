import { attribute, byteSort, canonicalGrammarName, canonicalName, decodeEntitiesOnce, lineForOffset, stableId, uniqueSorted } from "./shared.mjs";

function typedDefinitions(carriers, sourceBytesByPath) {
    const definitions = [];
    for (const carrier of carriers) {
        const bytes = sourceBytesByPath.get(carrier.source_path);
        const raw = bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive).toString("utf8");
        const openings = [...raw.matchAll(/<dfn\b[^>]*>/gi)].map((match) => match[0]);
        const scopes = uniqueSorted(openings.flatMap((opening) => (attribute(opening, "data-dfn-for") ?? "").split(/\s*,\s*/)).filter(Boolean).map(canonicalName));
        const dfnTypes = uniqueSorted(openings.map((opening) => attribute(opening, "data-dfn-type")).filter(Boolean).map((item) => item.toLowerCase()));
        for (const name of carrier.names) {
            definitions.push({
                carrier_id: carrier.id,
                source_path: carrier.source_path,
                carrier_kind: carrier.kind,
                raw_name: name,
                definition_type: carrier.kind === "grammar_production" ? "production" : dfnTypes[0] ?? "definition",
                canonical_name: carrier.kind === "grammar_production" ? canonicalGrammarName(name) : canonicalName(name),
                scopes,
                dfn_types: dfnTypes,
            });
        }
    }
    return definitions;
}

function definitionIndexes(definitions) {
    const result = { production: new Map(), unscoped: new Map(), allDefinitions: new Map(), scoped: new Map() };
    const add = (map, key, id) => map.set(key, [...(map.get(key) ?? []), id]);
    for (const definition of definitions) {
        if (definition.definition_type === "production") {
            add(result.production, definition.canonical_name, definition.carrier_id);
            continue;
        }
        add(result.allDefinitions, definition.canonical_name, definition.carrier_id);
        if (definition.scopes.length === 0) add(result.unscoped, definition.canonical_name, definition.carrier_id);
        for (const scope of definition.scopes) add(result.scoped, `${scope}\0${definition.canonical_name}`, definition.carrier_id);
    }
    return result;
}

function targetIds(reference, indexes) {
    const name = reference.typed_identity.canonical_name;
    if (reference.reference_type === "production") return indexes.production.get(name) ?? [];
    if (reference.reference_type === "definition") {
        const scope = reference.typed_identity.scope;
        return scope === null ? indexes.unscoped.get(name) ?? [] : indexes.scoped.get(`${canonicalName(scope)}\0${name}`) ?? [];
    }
    if (reference.reference_type === "css_term" || reference.reference_type === "idl_or_property") return indexes.allDefinitions.get(name) ?? [];
    return [];
}

function findEnclosingCarrierIds(carriers, start, end) {
    return carriers
        .filter((carrier) => carrier.start_offset <= start && carrier.end_offset_exclusive >= end)
        .map((carrier) => carrier.id)
        .sort(byteSort);
}

function parseReference(type, raw) {
    if (type === "bibliographic") {
        const match = /^\[\[(!?)([A-Za-z0-9_.-]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]$/.exec(raw);
        return {
            reference_type: type,
            typed_identity: {
                name: match[2],
                canonical_name: match[2].toLowerCase(),
                scope: null,
                anchor: match[3] ?? null,
                link_text: match[4] ?? null,
                normative_marker: match[1] === "!" ? "NORMATIVE_EXPLICIT" : "UNMARKED",
            },
        };
    }
    if (type === "spec_url") {
        const match = /^https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\/([^\s/?#]+)(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#([^\s)>'\"]+))?/i.exec(raw);
        return {
            reference_type: type,
            typed_identity: {
                name: match?.[1] ?? raw,
                canonical_name: (match?.[1] ?? raw).toLowerCase(),
                scope: null,
                anchor: match?.[2] ?? null,
                link_text: null,
                normative_marker: "URL_UNMARKED",
            },
        };
    }
    if (type === "production") {
        const name = raw.slice(2, -2);
        return { reference_type: type, typed_identity: { name, canonical_name: canonicalGrammarName(name), scope: null, anchor: null, link_text: null, normative_marker: null } };
    }
    if (type === "definition") {
        const body = raw.slice(2, -2);
        const slash = body.indexOf("/");
        const scope = slash >= 0 ? body.slice(0, slash) : null;
        const name = slash >= 0 ? body.slice(slash + 1) : body;
        return { reference_type: type, typed_identity: { name: decodeEntitiesOnce(name), canonical_name: canonicalName(name), scope: scope === null ? null : decodeEntitiesOnce(scope), anchor: null, link_text: null, normative_marker: null } };
    }
    if (type === "idl_or_property") {
        const name = raw.slice(2, -2);
        return { reference_type: type, typed_identity: { name, canonical_name: canonicalName(name), scope: null, anchor: null, link_text: null, normative_marker: null } };
    }
    const name = raw.slice(2, -2);
    return { reference_type: "css_term", typed_identity: { name, canonical_name: canonicalName(name), scope: null, anchor: null, link_text: null, normative_marker: null } };
}

const REFERENCE_PATTERNS = Object.freeze([
    ["bibliographic", /\[\[!?[A-Za-z0-9_.-]+(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g],
    ["spec_url", /https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\/[^\s<)>'\"]+/gi],
    ["production", /<<[^>\n]+>>/g],
    ["definition", /\[=[^\]\n]+=\]/g],
    ["idl_or_property", /\{\{[^}\n]+\}\}/g],
    ["css_term", /''@?[A-Za-z0-9_-]+(?:\(\))?''/g],
]);

export function discoverReferences(sources, carriers) {
    const sourceBytesByPath = new Map(sources.map((source) => [source.exact_path, source.bytes]));
    const definitions = typedDefinitions(carriers, sourceBytesByPath);
    const indexes = definitionIndexes(definitions);
    const bySource = new Map();
    for (const carrier of carriers) {
        const rows = bySource.get(carrier.source_path) ?? [];
        rows.push(carrier);
        bySource.set(carrier.source_path, rows);
    }
    const references = [];
    for (const source of sources) {
        const text = source.bytes.toString("utf8");
        const sourceCarriers = bySource.get(source.exact_path) ?? [];
        for (const [type, pattern] of REFERENCE_PATTERNS) {
            pattern.lastIndex = 0;
            let previousCharacterOffset = 0;
            let previousByteOffset = 0;
            for (const match of text.matchAll(pattern)) {
                const start = previousByteOffset + Buffer.byteLength(text.slice(previousCharacterOffset, match.index), "utf8");
                const rawBytes = Buffer.from(match[0], "utf8");
                const end = start + rawBytes.length;
                previousCharacterOffset = match.index + match[0].length;
                previousByteOffset = end;
                const parsed = parseReference(type, match[0]);
                const targetCarrierIds = ["bibliographic", "spec_url"].includes(type)
                    ? []
                    : targetIds(parsed, indexes).sort(byteSort);
                let status;
                const redFlags = ["RED_UNREVIEWED_REFERENCE_DISPOSITION"];
                if (["bibliographic", "spec_url"].includes(type)) {
                    status = "RED_EXTERNAL_OR_UNRESOLVED";
                    redFlags.push("RED_EXTERNAL_OR_UNRESOLVED");
                } else if (targetCarrierIds.length === 0) {
                    status = "RED_EXTERNAL_OR_UNRESOLVED";
                    redFlags.push("RED_EXTERNAL_OR_UNRESOLVED");
                } else if (targetCarrierIds.length > 1) {
                    status = "RED_AMBIGUOUS_TARGET_OCCURRENCES";
                    redFlags.push("RED_AMBIGUOUS_TARGET_OCCURRENCES");
                } else {
                    status = "RED_SINGLE_TARGET_UNREVIEWED";
                    redFlags.push("RED_TARGET_AND_OWNER_UNREVIEWED");
                }
                const id = stableId("refv2", [source.exact_path, type, start, end, match[0]], 24);
                references.push({
                    id,
                    source_path: source.exact_path,
                    start_line: lineForOffset(source.lines, start),
                    start_offset: start,
                    end_offset_exclusive: end,
                    raw_spelling: match[0],
                    ...parsed,
                    enclosing_discovery_carrier_ids: findEnclosingCarrierIds(sourceCarriers, start, end),
                    target_carrier_ids: uniqueSorted(targetCarrierIds),
                    target_occurrence_count: new Set(targetCarrierIds).size,
                    resolution_status: status,
                    owner_edge_emitted: false,
                    red_flags: uniqueSorted(redFlags),
                });
            }
        }
    }
    references.sort((left, right) => byteSort(left.id, right.id));
    if (new Set(references.map((row) => row.id)).size !== references.length) throw new Error("v2 reference ID collision");
    const carrierIds = new Set(carriers.map((carrier) => carrier.id));
    for (const reference of references) {
        const sourceBytes = sourceBytesByPath.get(reference.source_path);
        const replay = sourceBytes.subarray(reference.start_offset, reference.end_offset_exclusive).toString("utf8");
        if (replay !== reference.raw_spelling) throw new Error(`reference raw-spelling replay failed: ${reference.id}`);
        if (reference.target_carrier_ids.some((id) => !carrierIds.has(id))) throw new Error(`reference target carrier absent: ${reference.id}`);
        if (reference.target_carrier_ids.length > 1 && reference.resolution_status !== "RED_AMBIGUOUS_TARGET_OCCURRENCES") {
            throw new Error(`multiple target occurrences were not RED ambiguous: ${reference.id}`);
        }
    }
    return { references, definitions };
}

export function referenceFixture(text, definitions = []) {
    const source = { exact_path: "fixture/Overview.bs", bytes: Buffer.from(text), lines: [] };
    let offset = 0;
    source.lines = text.split(/(?<=\n)/).map((part, index) => {
        const start = offset;
        offset += Buffer.byteLength(part);
        return { line: index + 1, start, end: offset, text: part.replace(/\r?\n$/, "") };
    });
    if (source.lines.length === 0) source.lines.push({ line: 1, start: 0, end: 0, text: "" });
    return discoverReferences([source], definitions).references;
}
