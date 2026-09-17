import { attribute, byteSort, canonicalGrammarName, canonicalName, classes, exactSlice, legacySlug, lineForOffset, plainText, sha256, splitLines, stableId, uniqueSorted } from "./shared.mjs";

export const RED = Object.freeze({
    UNREVIEWED: "RED_UNREVIEWED",
    V1_REJECTED: "RED_V1_SEMANTIC_AND_OWNER_DISPOSITION_REJECTED",
    OWNER: "RED_UNREVIEWED_OWNER_DISPOSITION",
    SEMANTIC: "RED_UNREVIEWED_SEMANTIC_DISPOSITION",
    CONTEXT: "RED_CONTEXT_INCOMPLETE",
    INFORMATIVE: "RED_INFORMATIVE_EXAMPLE_HISTORY_OR_CHANGE_CONTEXT",
    DUPLICATE: "RED_DUPLICATED_CARRIER_INTERVAL",
    MULTI_NAME: "RED_MULTI_NAME_DEFINITION",
    FUNCTION: "RED_FUNCTION_OWNER_REVIEW_REQUIRED",
    MULTI_DOMAIN: "RED_MULTI_DOMAIN_CANDIDATE",
    SLUG: "RED_LEGACY_SLUG_COLLISION",
    MULTI_OWNER: "RED_SAME_SYMBOL_MULTI_OWNER",
    OPERATION: "RED_UNREVIEWED_OPERATION_BOUNDARY",
    COMPLETENESS: "RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED",
    UNCLOSED: "RED_STRUCTURAL_BLOCK_UNCLOSED",
    EXTERNAL: "RED_EXTERNAL_OR_UNRESOLVED",
    AMBIGUOUS: "RED_AMBIGUOUS_TARGET_OCCURRENCES",
    TARGET: "RED_TARGET_AND_OWNER_UNREVIEWED",
    REFERENCE: "RED_UNREVIEWED_REFERENCE_DISPOSITION",
    COMPATIBILITY: "RED_PRIMARY_SYMBOL_UNJOINED_TO_DAG",
    OWNER_SCOPE: "RED_OWNER_SCOPE_JOIN_UNREVIEWED",
});

const CONTEXT_WORDS = /\b(informative|non[- ]normative|examples?|changes?|change log|history|historical|status|references?|security|privacy)\b/ig;
const OPERATION_WORDS = /\b(algorithm|parse|parsing|tokeniz\w*|consume|component value|recover|recovery|invalid|diagnostic|serializ\w*|canonical|round[- ]?trip|source[- ]?preserv\w*)\b/i;

function headingFromLine(lines, index) {
    const text = lines[index].text;
    const atx = /^\s*(#{1,6})\s+(.+?)\s*$/.exec(text);
    if (atx !== null) {
        const anchor = /\{#([^}]+)\}\s*$/.exec(atx[2])?.[1] ?? null;
        return { syntax: "BIKESHED_ATX", level: atx[1].length, title: plainText(atx[2].replace(/\s*\{#[^}]+\}\s*$/, "").replace(/\s+#+\s*$/, "")), anchor, start: index, end: index };
    }
    const html = /<h([1-6])\b([^>]*)>([\s\S]*)/i.exec(text);
    if (html !== null) {
        let end = index;
        let body = html[3];
        while (!new RegExp(`</h${html[1]}>`, "i").test(body) && end + 1 < lines.length && end < index + 16) body += `\n${lines[++end].text}`;
        return { syntax: "HTML_HEADING", level: Number(html[1]), title: plainText(body.replace(new RegExp(`</h${html[1]}>[\\s\\S]*$`, "i"), "")), anchor: attribute(html[2], "id"), start: index, end };
    }
    if (index + 1 < lines.length && /^\s*(?:=+|-+)\s*$/.test(lines[index + 1].text) && text.trim() !== "") {
        return { syntax: "BIKESHED_SETEXT", level: lines[index + 1].text.includes("=") ? 1 : 2, title: plainText(text.replace(/\s*\{#[^}]+\}\s*$/, "")), anchor: /\{#([^}]+)\}/.exec(text)?.[1] ?? null, start: index, end: index + 1 };
    }
    return null;
}

function parseHeadings(lines) {
    const headings = [];
    for (let index = 0; index < lines.length; index += 1) {
        const heading = headingFromLine(lines, index);
        if (heading === null) continue;
        headings.push(heading);
        index = heading.end;
    }
    for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        heading.section_end = (headings.slice(index + 1).find((candidate) => candidate.level <= heading.level)?.start ?? lines.length) - 1;
        heading.markers = uniqueSorted((`${heading.title} ${heading.anchor ?? ""}`.match(CONTEXT_WORDS) ?? []).map((item) => item.toLowerCase()));
    }
    return headings;
}

function parseContainers(lines) {
    const spans = [];
    const stack = [];
    const token = /<\/?(div|section|aside|details|figure|pre|ol|ul|dl|blockquote|example)\b[^>]*>/ig;
    for (let index = 0; index < lines.length; index += 1) {
        for (const match of lines[index].text.matchAll(token)) {
            const raw = match[0];
            const tag = match[1].toLowerCase();
            if (/^<\//.test(raw)) {
                let position = stack.length - 1;
                while (position >= 0 && stack[position].tag !== tag) position -= 1;
                if (position < 0) continue;
                const [opening] = stack.splice(position, 1);
                spans.push({ ...opening, end: index, closed: true });
            } else {
                const classNames = classes(raw);
                const id = attribute(raw, "id");
                const markers = uniqueSorted((`${classNames.join(" ")} ${id ?? ""}`.match(CONTEXT_WORDS) ?? []).map((item) => item.toLowerCase()));
                stack.push({ tag, start: index, classes: classNames, id, markers });
            }
        }
    }
    for (const opening of stack) spans.push({ ...opening, end: lines.length - 1, closed: false });
    return spans;
}

function buildContext(lines) {
    return { headings: parseHeadings(lines), containers: parseContainers(lines) };
}

function contextAt(model, lineIndex) {
    const sections = model.headings.filter((heading) => heading.start <= lineIndex && heading.section_end >= lineIndex).sort((a, b) => a.level - b.level || a.start - b.start).map((heading) => [heading.syntax, heading.level, heading.title, heading.anchor, heading.start + 1, heading.section_end + 1, heading.markers]);
    const containers = model.containers.filter((span) => span.start <= lineIndex && span.end >= lineIndex).map((span) => [span.tag, span.classes, span.id, span.start + 1, span.end + 1, span.closed, span.markers]);
    const markers = uniqueSorted([...sections.flatMap((row) => row[6]), ...containers.flatMap((row) => row[6])]);
    return { sections, containers, markers, complete: sections.length > 0 && containers.every((row) => row[5]) };
}

function balancedTagEnd(lines, startIndex, tag) {
    let depth = 0;
    const opening = new RegExp(`<${tag}\\b`, "ig");
    const closing = new RegExp(`</${tag}>`, "ig");
    for (let index = startIndex; index < lines.length; index += 1) {
        depth += [...lines[index].text.matchAll(opening)].length;
        depth -= [...lines[index].text.matchAll(closing)].length;
        if (depth <= 0) return { end: index, closed: true };
    }
    return { end: lines.length - 1, closed: false };
}

function bindDefinitionList(bytes, lines, start) {
    const itemEnd = (itemStart, tag) => {
        for (let index = itemStart; index < lines.length; index += 1) {
            if (new RegExp(`</${tag}>`, "i").test(lines[index].text)) return { end: index, closed: true };
            if (index > itemStart && /<(?:dt|dd)\b|<\/dl>/i.test(lines[index].text)) return { end: index - 1, closed: true };
        }
        return { end: lines.length - 1, closed: false };
    };
    const dt = itemEnd(start, "dt");
    let ddStart = dt.end + 1;
    while (ddStart < lines.length && /^\s*$/.test(lines[ddStart].text)) ddStart += 1;
    if (ddStart >= lines.length || !/<dd\b/i.test(lines[ddStart].text)) return { start, end: dt.end, complete: false };
    const dd = itemEnd(ddStart, "dd");
    return { start, end: dd.end, complete: dt.closed && dd.closed };
}

function symbolKey(carrier, name) {
    return `${carrier.kind === "grammar_production" ? "production" : "definition"}\0${carrier.kind === "grammar_production" ? canonicalGrammarName(name) : canonicalName(name)}`;
}

function carrierRecords(v1Rows, sourceByPath, contexts) {
    const duplicateIntervals = new Map();
    const slugNames = new Map();
    const symbolOwners = new Map();
    for (const carrier of v1Rows) {
        const interval = `${carrier.source_path}\0${carrier.start_offset}\0${carrier.end_offset_exclusive}\0${carrier.raw_slice_sha256}`;
        duplicateIntervals.set(interval, [...(duplicateIntervals.get(interval) ?? []), carrier.id]);
        for (const name of carrier.names) {
            const slug = legacySlug(name);
            const names = slugNames.get(slug) ?? new Set();
            names.add(name);
            slugNames.set(slug, names);
            if (carrier.owner_join?.owner) {
                const key = symbolKey(carrier, name);
                const owners = symbolOwners.get(key) ?? new Set();
                owners.add(carrier.owner_join.owner);
                symbolOwners.set(key, owners);
            }
        }
    }
    return v1Rows.map((carrier) => {
        const source = sourceByPath.get(carrier.source_path);
        const raw = source.bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive);
        if (raw.length !== carrier.raw_slice_bytes || sha256(raw) !== carrier.raw_slice_sha256) throw new Error(`carrier replay failed: ${carrier.id}`);
        const inherited = contextAt(contexts.get(carrier.source_path), carrier.start_line - 1);
        const flags = [RED.V1_REJECTED, RED.OWNER, RED.SEMANTIC];
        if (!inherited.complete) flags.push(RED.CONTEXT);
        if (inherited.markers.length > 0) flags.push(RED.INFORMATIVE);
        const intervalKey = `${carrier.source_path}\0${carrier.start_offset}\0${carrier.end_offset_exclusive}\0${carrier.raw_slice_sha256}`;
        if ((duplicateIntervals.get(intervalKey)?.length ?? 0) > 1) flags.push(RED.DUPLICATE);
        if (carrier.names.length > 1) flags.push(RED.MULTI_NAME);
        if (carrier.kind === "function_definition") flags.push(RED.FUNCTION);
        if ((carrier.owner_join?.candidates?.length ?? 0) > 1) flags.push(RED.MULTI_DOMAIN);
        for (const name of carrier.names) {
            if ((slugNames.get(legacySlug(name))?.size ?? 0) > 1) flags.push(RED.SLUG);
            if ((symbolOwners.get(symbolKey(carrier, name))?.size ?? 0) > 1) flags.push(RED.MULTI_OWNER);
        }
        if (/algorithm|invalidity_recovery|serialization|required_algorithm/.test(carrier.kind)) flags.push(RED.COMPLETENESS);
        return { ...carrier, context: inherited, red_flags_v4: uniqueSorted(flags) };
    }).sort((a, b) => byteSort(a.id, b.id));
}

function operationRecords(evidence, contexts) {
    const candidates = [];
    const algorithmOpenings = [];
    const seen = new Set();
    const add = (source, kind, extraction, start, end, extraFlags = []) => {
        const slice = exactSlice(source.bytes, source.lines, start, end);
        const key = `${source.exact_path}\0${kind}\0${slice.start_offset}\0${slice.end_offset_exclusive}\0${slice.raw_slice_sha256}`;
        if (seen.has(key)) return;
        seen.add(key);
        candidates.push({ id: stableId("opv4c", [source.exact_path, kind, slice.start_offset, slice.end_offset_exclusive, slice.raw_slice_sha256]), source_path: source.exact_path, kind, extraction, ...slice, context: contextAt(contexts.get(source.exact_path), start), red_flags: uniqueSorted([RED.OPERATION, RED.COMPLETENESS, ...extraFlags]) });
    };
    for (const source of evidence.sources) {
        const model = contexts.get(source.exact_path);
        for (const heading of model.headings) {
            if (!OPERATION_WORDS.test(`${heading.title} ${heading.anchor ?? ""}`)) continue;
            const kind = /serializ|canonical|round[- ]?trip|source[- ]?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "serialization_section_candidate" : /recover|invalid|diagnostic/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "recovery_section_candidate" : "algorithm_section_candidate";
            add(source, kind, heading.syntax, heading.start, heading.section_end);
        }
        for (let index = 0; index < source.lines.length; index += 1) {
            const text = source.lines[index].text;
            for (const openingMatch of text.matchAll(/<div\b[^>]*>/ig)) {
                const opening = openingMatch[0];
                const algorithm = /\salgorithm(?:\s*=|\s|>)/i.test(opening) || classes(opening).includes("algorithm") || attribute(opening, "data-algorithm") !== null;
                if (!algorithm) continue;
                const boundary = balancedTagEnd(source.lines, index, "div");
                add(source, "bikeshed_div_algorithm_candidate", "DIV_ALGORITHM_ATTRIBUTE_OR_CLASS", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
                algorithmOpenings.push({ source_path: source.exact_path, line: index + 1, offset: source.lines[index].start + Buffer.byteLength(text.slice(0, openingMatch.index), "utf8"), raw_opening: opening });
            }
            for (const openingMatch of text.matchAll(/<ol\b[^>]*>/ig)) {
                const opening = openingMatch[0];
                const algorithm = /\salgorithm(?:\s*=|\s|>)/i.test(opening) || classes(opening).includes("algorithm") || attribute(opening, "data-algorithm") !== null;
                if (!algorithm) continue;
                const boundary = balancedTagEnd(source.lines, index, "ol");
                add(source, "markup_algorithm_candidate", "OL_ALGORITHM_ATTRIBUTE_OR_CLASS", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
            }
            if (/<ol\b/i.test(text) && OPERATION_WORDS.test(contextAt(model, index).sections.map((row) => `${row[2]} ${row[3] ?? ""}`).join(" "))) {
                const boundary = balancedTagEnd(source.lines, index, "ol");
                add(source, "legacy_html_operation_list_candidate", "HTML_OL_IN_OPERATION_SECTION", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
            }
            if (/^\s*(?:\d+[.)]|[-*+])\s+\S/.test(text) && OPERATION_WORDS.test(contextAt(model, index).sections.map((row) => row[2]).join(" "))) {
                let end = index;
                while (end + 1 < source.lines.length && (/^\s*(?:\d+[.)]|[-*+])\s+\S/.test(source.lines[end + 1].text) || /^\s{2,}\S/.test(source.lines[end + 1].text) || /^\s*$/.test(source.lines[end + 1].text))) end += 1;
                add(source, "markdown_operation_list_candidate", "MARKDOWN_LIST_IN_OPERATION_SECTION", index, end);
                index = end;
                continue;
            }
            if (/<dt\b/i.test(text)) {
                const boundary = bindDefinitionList(source.bytes, source.lines, index);
                add(source, boundary.complete ? "definition_term_and_body_candidate" : "definition_term_boundary_incomplete", boundary.complete ? "DT_DD_BOUNDARY" : "DT_WITHOUT_COMPLETE_DD", boundary.start, boundary.end, boundary.complete ? [] : [RED.CONTEXT]);
            }
        }
    }
    for (const requirement of evidence.v1.required_algorithmic_counterexamples) {
        const source = evidence.sources.find((row) => row.exact_path === requirement.source_path);
        add(source, "required_slice_operation_candidate", "EXACT_GOVERNED_REQUIRED_SLICE", requirement.start_line - 1, requirement.end_line - 1);
    }
    candidates.sort((a, b) => byteSort(a.id, b.id));
    for (const opening of algorithmOpenings) {
        const covered = candidates.filter((candidate) => candidate.source_path === opening.source_path && candidate.start_line <= opening.line && candidate.end_line >= opening.line);
        if (covered.length === 0) throw new Error(`algorithm opening uncovered: ${opening.source_path}:${opening.line}`);
        opening.candidate_ids = covered.map((row) => row.id).sort(byteSort);
        opening.status = RED.OPERATION;
    }
    return { candidates, algorithmOpenings: algorithmOpenings.sort((a, b) => byteSort(`${a.source_path}:${a.offset}`, `${b.source_path}:${b.offset}`)) };
}

function parseScoped(body) {
    const slash = body.indexOf("/");
    return slash < 0 ? { scope: null, name: body } : { scope: body.slice(0, slash), name: body.slice(slash + 1) };
}

function parseReference(type, raw) {
    if (type === "bibliographic") {
        const match = /^\[\[(!?)([A-Za-z0-9_.-]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]$/.exec(raw);
        return { type, name: match[2], canonical: match[2].toLowerCase(), scope: null, anchor: match[3] ?? null, link_text: match[4] ?? null, normative: match[1] === "!" ? "NORMATIVE_EXPLICIT" : "UNMARKED" };
    }
    if (type === "spec_url") {
        const match = /^https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\/([^\s/?#]+)(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#([^\s)>'\"]+))?/i.exec(raw);
        return { type, name: match?.[1] ?? raw, canonical: (match?.[1] ?? raw).toLowerCase(), scope: null, anchor: match?.[2] ?? null, link_text: null, normative: "URL_UNMARKED" };
    }
    let body;
    if (type === "production") body = raw.slice(2, -2);
    else if (type === "definition") body = raw.slice(2, -2);
    else if (type === "idl_or_property") body = raw.slice(2, -2);
    else if (type === "css_term_double") body = raw.slice(2, -2);
    else if (type === "css_shorthand_single") body = raw.slice(1, -1);
    else if (type === "element") body = raw.slice(2, -2);
    const scoped = parseScoped(body);
    const grammar = type === "production";
    return { type, name: scoped.name, canonical: grammar ? canonicalGrammarName(scoped.name) : canonicalName(scoped.name), scope: scoped.scope, anchor: null, link_text: null, normative: null };
}

const REFERENCE_PATTERNS = Object.freeze([
    ["bibliographic", /\[\[!?[A-Za-z0-9_.-]+(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g],
    ["spec_url", /https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\/[^\s<)>'\"]+/gi],
    ["production", /<<[^>\n]+>>/g],
    ["definition", /\[=[^\]\n]+=\]/g],
    ["idl_or_property", /\{\{[^}\n]+\}\}/g],
    ["css_term_double", /''@?[A-Za-z0-9_-]+(?:\(\))?(?:\/@?[A-Za-z0-9_-]+(?:\(\))?)?''/g],
    ["css_shorthand_single", /(?<!')'@?[A-Za-z0-9_-]+(?:\(\))?(?:\/@?[A-Za-z0-9_-]+(?:\(\))?)?'(?!')/g],
    ["element", /<\{[^}\n]+\}>/g],
]);

function definitionIndex(carriers, sourceByPath) {
    const definitions = [];
    for (const carrier of carriers) {
        const source = sourceByPath.get(carrier.source_path);
        const raw = source.bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive).toString("utf8");
        const openings = [...raw.matchAll(/<dfn\b[^>]*>/gi)].map((match) => match[0]);
        const scopes = uniqueSorted(openings.flatMap((opening) => (attribute(opening, "data-dfn-for") ?? "").split(/\s*,\s*/)).filter(Boolean).map(canonicalName));
        for (const name of carrier.names) definitions.push({ carrier_id: carrier.id, type: carrier.kind === "grammar_production" ? "production" : "definition", canonical: carrier.kind === "grammar_production" ? canonicalGrammarName(name) : canonicalName(name), scopes });
    }
    const maps = { production: new Map(), unscoped: new Map(), all: new Map(), scoped: new Map() };
    const add = (map, key, id) => map.set(key, [...(map.get(key) ?? []), id]);
    for (const definition of definitions) {
        if (definition.type === "production") add(maps.production, definition.canonical, definition.carrier_id);
        else {
            add(maps.all, definition.canonical, definition.carrier_id);
            if (definition.scopes.length === 0) add(maps.unscoped, definition.canonical, definition.carrier_id);
            for (const scope of definition.scopes) add(maps.scoped, `${scope}\0${definition.canonical}`, definition.carrier_id);
        }
    }
    return maps;
}

function targets(reference, maps) {
    if (reference.type === "production") return maps.production.get(reference.canonical) ?? [];
    if (["bibliographic", "spec_url", "element"].includes(reference.type)) return [];
    if (reference.scope !== null) return maps.scoped.get(`${canonicalName(reference.scope)}\0${reference.canonical}`) ?? [];
    return maps.unscoped.get(reference.canonical) ?? [];
}

function referenceRecords(evidence, carriers) {
    const sourceByPath = new Map(evidence.sources.map((source) => [source.exact_path, source]));
    const maps = definitionIndex(carriers, sourceByPath);
    const references = [];
    for (const source of evidence.sources) {
        const text = source.bytes.toString("utf8");
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
                const targetCarrierIds = uniqueSorted(targets(parsed, maps));
                const status = ["bibliographic", "spec_url", "element"].includes(type) || targetCarrierIds.length === 0 ? RED.EXTERNAL : targetCarrierIds.length > 1 ? RED.AMBIGUOUS : RED.TARGET;
                const row = { id: stableId("refv4", [source.exact_path, type, start, end, match[0]]), source_path: source.exact_path, start_line: lineForOffset(source.lines, start), start_offset: start, end_offset_exclusive: end, raw: match[0], ...parsed, target_carrier_ids: targetCarrierIds, status, red_flags: uniqueSorted([RED.REFERENCE, status]) };
                if (source.bytes.subarray(start, end).toString("utf8") !== row.raw) throw new Error(`reference replay failed: ${row.id}`);
                references.push(row);
            }
        }
    }
    references.sort((a, b) => byteSort(a.id, b.id));
    if (new Set(references.map((row) => row.id)).size !== references.length) throw new Error("reference ID collision");
    return references;
}

export function discoverAll(evidence) {
    const sourceByPath = new Map(evidence.sources.map((source) => [source.exact_path, source]));
    const contexts = new Map(evidence.sources.map((source) => [source.exact_path, buildContext(source.lines)]));
    const carriers = carrierRecords(evidence.v1.occurrence_carriers.rows, sourceByPath, contexts);
    const operations = operationRecords(evidence, contexts);
    const references = referenceRecords(evidence, carriers);
    return { contexts, carriers, operations, references };
}

export function discoverFixture(text, carrierRows = []) {
    const bytes = Buffer.from(text, "utf8");
    const source = { exact_path: "fixture/Overview.bs", bytes, lines: splitLines(bytes) };
    const evidence = { sources: [source], v1: { required_algorithmic_counterexamples: [] } };
    const contexts = new Map([[source.exact_path, buildContext(source.lines)]]);
    return { source, contexts, operations: operationRecords(evidence, contexts), references: referenceRecords(evidence, carrierRows) };
}
