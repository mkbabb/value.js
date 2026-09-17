import { attribute, byteSort, canonicalGrammarName, canonicalName, decodeEntitiesOnce, exactSlice, legacySlug, lineForOffset, sha256, splitLines, stableId, uniqueSorted } from "./shared.mjs";
import { attributeToken, classifyBikeshed, isEscaped } from "./lexical.mjs";

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
    LEXICAL: "RED_LEXICAL_DISPOSITION_REVIEW_BOUNDARY",
    EXCLUDED: "RED_REVIEWED_LEXICAL_EXCLUSION",
});

function lexicalDispositionId(row) {
    return stableId("lexv8", [row.source_path, row.candidate_kind, row.start_offset, row.end_offset_exclusive, row.raw_sha256, row.state, row.disposition, row.reason, row.included_id ?? ""]);
}

const CONTEXT_WORDS = /\b(informative|non[- ]normative|examples?|changes?|change log|history|historical|status|references?|security|privacy)\b/ig;
const OPERATION_WORDS = /\b(algorithm|parse|parsing|tokeniz\w*|consume|component value|recover|recovery|invalid|diagnostic|serializ\w*|canonical|round[- ]?trip|source[- ]?preserv\w*)\b/i;

function firstContentCharacter(model, lines, index) {
    const match = /\S/.exec(lines[index].text);
    return match === null ? model.line_starts[index] : model.line_starts[index] + match.index;
}

function normalizedVisible(value) {
    return decodeEntitiesOnce(value).replace(/\s+/g, " ").trim();
}

function headingFromLine(model, lines, index) {
    const text = lines[index].text;
    if (!model.activeStructureAt(firstContentCharacter(model, lines, index))) return null;
    const atx = /^\s*(#{1,6})\s+(.+?)\s*$/.exec(text);
    if (atx !== null) {
        const anchor = /\{#([^}]+)\}\s*$/.exec(atx[2])?.[1] ?? null;
        const prefix = /^\s*#{1,6}\s+/.exec(text)[0];
        const visible = model.visibleText(model.line_starts[index] + prefix.length, model.line_starts[index] + text.length);
        return { syntax: "BIKESHED_ATX", level: atx[1].length, title: normalizedVisible(visible.replace(/\s*\{#[^}]+\}\s*$/, "").replace(/\s+#+\s*$/, "")), anchor, start: index, end: index };
    }
    if (index + 1 < lines.length && model.stateAt(firstContentCharacter(model, lines, index + 1)) === "BIKESHED_TEXT" && /^\s*(?:=+|-+)\s*$/.test(lines[index + 1].text) && text.trim() !== "") {
        const visible = model.visibleText(model.line_starts[index], model.line_starts[index] + text.length);
        return { syntax: "BIKESHED_SETEXT", level: lines[index + 1].text.includes("=") ? 2 : 3, title: normalizedVisible(visible.replace(/\s*\{#[^}]+\}\s*$/, "")), anchor: /\{#([^}]+)\}/.exec(text)?.[1] ?? null, start: index, end: index + 1 };
    }
    return null;
}

function parseHeadings(model, lines) {
    const headings = [];
    for (let index = 0; index < lines.length; index += 1) {
        const heading = headingFromLine(model, lines, index);
        if (heading === null) continue;
        headings.push(heading);
        index = heading.end;
    }
    for (let tokenIndex = 0; tokenIndex < model.tags.length; tokenIndex += 1) {
        const opening = model.tags[tokenIndex];
        if (opening.closing || !/^h[1-6]$/.test(opening.name)) continue;
        let depth = 1;
        let closing = null;
        for (let index = tokenIndex + 1; index < model.tags.length; index += 1) {
            const tag = model.tags[index];
            if (tag.name !== opening.name) continue;
            depth += tag.closing ? -1 : 1;
            if (depth === 0) { closing = tag; break; }
        }
        const end = closing?.line ?? opening.line;
        headings.push({ syntax: "HTML_HEADING", level: Number(opening.name[1]), title: normalizedVisible(model.visibleText(opening.end, closing?.start ?? opening.end)), anchor: attributeToken(opening, "id")?.value ?? null, start: opening.line - 1, end: end - 1 });
    }
    headings.sort((left, right) => left.start - right.start || left.level - right.level || byteSort(left.syntax, right.syntax));
    for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        heading.section_end = (headings.slice(index + 1).find((candidate) => candidate.level <= heading.level)?.start ?? lines.length) - 1;
        heading.markers = uniqueSorted((`${heading.title} ${heading.anchor ?? ""}`.match(CONTEXT_WORDS) ?? []).map((item) => item.toLowerCase()));
    }
    return headings;
}

function parseContainers(model, lines) {
    const spans = [];
    const stack = [];
    const names = new Set(["div", "section", "aside", "details", "figure", "pre", "ol", "ul", "dl", "blockquote", "example"]);
    for (const token of model.tags) {
        if (!names.has(token.name)) continue;
        if (token.closing) {
            let position = stack.length - 1;
            while (position >= 0 && stack[position].tag !== token.name) position -= 1;
            if (position < 0) continue;
            const [opening] = stack.splice(position, 1);
            spans.push({ ...opening, end: token.line - 1, closed: true });
        } else if (!token.self_closing) {
            const classNames = uniqueSorted((attributeToken(token, "class")?.value ?? "").split(/\s+/).filter(Boolean).map((item) => item.toLowerCase()));
            const id = attributeToken(token, "id")?.value ?? null;
            const markers = uniqueSorted((`${classNames.join(" ")} ${id ?? ""}`.match(CONTEXT_WORDS) ?? []).map((item) => item.toLowerCase()));
            stack.push({ tag: token.name, start: token.line - 1, classes: classNames, id, markers });
        }
    }
    for (const opening of stack) spans.push({ ...opening, end: lines.length - 1, closed: false });
    return spans;
}

function buildContext(source, lexical) {
    return { headings: parseHeadings(lexical, source.lines), containers: parseContainers(lexical, source.lines) };
}

function contextAt(model, lineIndex) {
    const sections = model.headings.filter((heading) => heading.start <= lineIndex && heading.section_end >= lineIndex).sort((a, b) => a.level - b.level || a.start - b.start).map((heading) => [heading.syntax, heading.level, heading.title, heading.anchor, heading.start + 1, heading.section_end + 1, heading.markers]);
    const containers = model.containers.filter((span) => span.start <= lineIndex && span.end >= lineIndex).map((span) => [span.tag, span.classes, span.id, span.start + 1, span.end + 1, span.closed, span.markers]);
    const markers = uniqueSorted([...sections.flatMap((row) => row[6]), ...containers.flatMap((row) => row[6])]);
    return { sections, containers, markers, complete: sections.length > 0 && containers.every((row) => row[5]) };
}

function balancedTagEnd(source, lexical, characterStart, tag) {
    let depth = 0;
    for (const token of lexical.tags) {
        if (token.start < characterStart || token.name !== tag) continue;
        depth += token.closing ? -1 : 1;
        if (depth <= 0) return { end: token.line - 1, closed: true };
    }
    return { end: source.lines.length - 1, closed: false };
}

export function algorithmMarker(token) {
    return attributeToken(token, "algorithm") !== null
        || token.attributes.some((row) => row.name === "algorithm" || row.name === "data-algorithm")
        || (attributeToken(token, "class")?.value ?? "").split(/\s+/).map((item) => item.toLowerCase()).includes("algorithm");
}

export function algorithmOpeningTuples(source, lexical = classifyBikeshed(source.bytes.toString("utf8"))) {
    const text = source.bytes.toString("utf8");
    const tuples = [];
    let previousCharacter = 0;
    let previousByte = 0;
    for (const token of lexical.tags.filter((row) => !row.closing && algorithmMarker(row))) {
        const offset = previousByte + Buffer.byteLength(text.slice(previousCharacter, token.start), "utf8");
        previousCharacter = token.start;
        previousByte = offset;
        tuples.push({ source_path: source.exact_path, tag: token.name, line: token.line, offset, character_start: token.start, raw_opening: token.raw });
    }
    return tuples;
}

function bindDefinitionList(source, lexical, opening) {
    const tags = lexical.tags;
    const openingIndex = tags.indexOf(opening);
    const itemEnd = (itemStart, tag) => {
        for (let index = itemStart + 1; index < tags.length; index += 1) {
            const token = tags[index];
            if (token.name === tag && token.closing) return { end: token.line - 1, closed: true, next: index + 1 };
            if (["dt", "dd"].includes(token.name) && !token.closing || token.name === "dl" && token.closing) return { end: Math.max(opening.line - 1, token.line - 2), closed: true, next: index };
        }
        return { end: source.lines.length - 1, closed: false, next: tags.length };
    };
    const dt = itemEnd(openingIndex, "dt");
    const ddOpening = tags.slice(dt.next).find((token) => !token.closing && token.name === "dd");
    if (ddOpening === undefined) return { start: opening.line - 1, end: dt.end, complete: false };
    const dd = itemEnd(tags.indexOf(ddOpening), "dd");
    return { start: opening.line - 1, end: dd.end, complete: dt.closed && dd.closed };
}

function symbolKey(carrier, name) {
    return `${carrier.kind === "grammar_production" ? "production" : "definition"}\0${carrier.kind === "grammar_production" ? canonicalGrammarName(name) : canonicalName(name)}`;
}

function characterAtByte(source, lexical, byteOffset, lineIndex) {
    const line = source.lines[Math.max(0, Math.min(source.lines.length - 1, lineIndex))];
    return lexical.line_starts[line.line - 1] + source.bytes.subarray(line.start, byteOffset).toString("utf8").length;
}

function carrierRecords(v1Rows, sourceByPath, contexts, lexicalByPath) {
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
    const dispositions = [];
    const included = [];
    for (const carrier of v1Rows) {
        const source = sourceByPath.get(carrier.source_path);
        const raw = source.bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive);
        if (raw.length !== carrier.raw_slice_bytes || sha256(raw) !== carrier.raw_slice_sha256) throw new Error(`carrier replay failed: ${carrier.id}`);
        const lexical = lexicalByPath.get(carrier.source_path);
        const characterStart = characterAtByte(source, lexical, carrier.start_offset, carrier.start_line - 1);
        const characterEnd = characterAtByte(source, lexical, carrier.end_offset_exclusive, carrier.end_line - 1);
        const suppression = lexical.ranges.find((range) => range.start <= characterStart && range.end >= characterEnd && !["BIKESHED_TEXT", "BIKESHED_CODE", "ACTIVE_HTML_TAG"].includes(range.state));
        const disposition = suppression === undefined
            ? { disposition: "INCLUDED", reason: "ACTIVE_LEXICAL_STATE", state: lexical.stateAt(characterStart) }
            : { disposition: "REVIEWED_EXCLUDED", reason: suppression.reason, state: suppression.state };
        const dispositionRow = { source_path: carrier.source_path, candidate_kind: "carrier", start_offset: carrier.start_offset, end_offset_exclusive: carrier.end_offset_exclusive, raw_sha256: carrier.raw_slice_sha256, state: disposition.state, disposition: disposition.disposition, reason: disposition.reason, included_id: carrier.id };
        dispositions.push({ id: lexicalDispositionId(dispositionRow), ...dispositionRow });
        if (disposition.disposition !== "INCLUDED") continue;
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
        included.push({ ...carrier, context: inherited, red_flags_v8: uniqueSorted(flags) });
    }
    return { carriers: included.sort((a, b) => byteSort(a.id, b.id)), dispositions };
}

function operationRecords(evidence, contexts, lexicalByPath) {
    const candidates = [];
    const algorithmOpenings = [];
    const seen = new Set();
    const add = (source, kind, extraction, start, end, extraFlags = []) => {
        const slice = exactSlice(source.bytes, source.lines, start, end);
        const key = `${source.exact_path}\0${kind}\0${slice.start_offset}\0${slice.end_offset_exclusive}\0${slice.raw_slice_sha256}`;
        if (seen.has(key)) return;
        seen.add(key);
        candidates.push({ id: stableId("opv8c", [source.exact_path, kind, slice.start_offset, slice.end_offset_exclusive, slice.raw_slice_sha256]), source_path: source.exact_path, kind, extraction, ...slice, context: contextAt(contexts.get(source.exact_path), start), red_flags: uniqueSorted([RED.OPERATION, RED.COMPLETENESS, ...extraFlags]) });
    };
    for (const source of evidence.sources) {
        const model = contexts.get(source.exact_path);
        const lexical = lexicalByPath.get(source.exact_path);
        for (const heading of model.headings) {
            if (!OPERATION_WORDS.test(`${heading.title} ${heading.anchor ?? ""}`)) continue;
            const kind = /serializ|canonical|round[- ]?trip|source[- ]?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "serialization_section_candidate" : /recover|invalid|diagnostic/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "recovery_section_candidate" : "algorithm_section_candidate";
            add(source, kind, heading.syntax, heading.start, heading.section_end);
        }
        for (const tuple of algorithmOpeningTuples(source, lexical)) {
            const index = tuple.line - 1;
            const boundary = balancedTagEnd(source, lexical, tuple.character_start, tuple.tag);
            add(source, `bikeshed_${tuple.tag}_algorithm_candidate`, "ANY_ELEMENT_ALGORITHM_ATTRIBUTE_OR_CLASS", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
            algorithmOpenings.push(tuple);
        }
        for (const opening of lexical.tags.filter((row) => !row.closing && row.name === "ol")) {
            const index = opening.line - 1;
            if (OPERATION_WORDS.test(contextAt(model, index).sections.map((row) => `${row[2]} ${row[3] ?? ""}`).join(" "))) {
                const boundary = balancedTagEnd(source, lexical, opening.start, "ol");
                add(source, "legacy_html_operation_list_candidate", "HTML_OL_IN_OPERATION_SECTION", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
            }
        }
        for (let index = 0; index < source.lines.length; index += 1) {
            const text = source.lines[index].text;
            if (lexical.stateAt(firstContentCharacter(lexical, source.lines, index)) === "BIKESHED_TEXT" && /^\s*(?:\d+[.)]|[-*+])\s+\S/.test(text) && OPERATION_WORDS.test(contextAt(model, index).sections.map((row) => row[2]).join(" "))) {
                let end = index;
                while (end + 1 < source.lines.length && lexical.stateAt(firstContentCharacter(lexical, source.lines, end + 1)) === "BIKESHED_TEXT" && (/^\s*(?:\d+[.)]|[-*+])\s+\S/.test(source.lines[end + 1].text) || /^\s{2,}\S/.test(source.lines[end + 1].text) || /^\s*$/.test(source.lines[end + 1].text))) end += 1;
                add(source, "markdown_operation_list_candidate", "MARKDOWN_LIST_IN_OPERATION_SECTION", index, end);
                index = end;
                continue;
            }
        }
        for (const opening of lexical.tags.filter((row) => !row.closing && row.name === "dt")) {
            const boundary = bindDefinitionList(source, lexical, opening);
            add(source, boundary.complete ? "definition_term_and_body_candidate" : "definition_term_boundary_incomplete", boundary.complete ? "DT_DD_BOUNDARY" : "DT_WITHOUT_COMPLETE_DD", boundary.start, boundary.end, boundary.complete ? [] : [RED.CONTEXT]);
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

function parseScoped(body, last = false) {
    const slash = last ? body.lastIndexOf("/") : body.indexOf("/");
    return slash < 0 ? { scope: null, name: body } : { scope: body.slice(0, slash), name: body.slice(slash + 1) };
}

function splitDisplay(body) {
    const separator = body.indexOf("|");
    return separator < 0 ? { target: body, link_text: null } : { target: body.slice(0, separator), link_text: body.slice(separator + 1) };
}

function semanticText(value) {
    return value.replace(/\r\n?|\n/g, " ").replace(/\s+/g, " ").trim();
}

function splitLinkType(body) {
    const match = /^(.*)!!([A-Za-z][A-Za-z0-9-]*)$/.exec(body.trim());
    return match === null ? { target: body, link_type: null } : { target: match[1], link_type: match[2].toLowerCase() };
}

const BIBLIOGRAPHY_MODIFIERS = new Set(["current", "snapshot", "inline"]);

function splitBibliographyModifier(body) {
    const value = body.trim();
    const match = /\s+(current|snapshot|inline)(?=#|$)/i.exec(value);
    if (match === null || !BIBLIOGRAPHY_MODIFIERS.has(match[1].toLowerCase())) return { target: value, modifier: null };
    return { target: `${value.slice(0, match.index)}${value.slice(match.index + match[0].length)}`, modifier: match[1].toLowerCase() };
}

function cssTarget(body) {
    const exactScoped = /^(@?[A-Za-z_][A-Za-z0-9_-]*(?:\(\))?)\/(@?[A-Za-z_][A-Za-z0-9_-]*(?:\([^\r\n]*\))?)$/.exec(body);
    if (exactScoped !== null) return { scope: exactScoped[1], name: exactScoped[2], target_form: "SCOPED_TARGET" };
    return { scope: null, name: body, target_form: /[\s/;]/.test(body) ? "INLINE_MAYBE" : "UNSCOPED_TARGET" };
}

export function parseReference(type, raw) {
    if (type === "bibliographic") {
        const display = splitDisplay(raw.slice(2, -2));
        display.target = semanticText(display.target);
        display.link_text = display.link_text === null ? null : semanticText(display.link_text);
        const normative = display.target.startsWith("!") ? "NORMATIVE_EXPLICIT" : "UNMARKED";
        const bibliography = splitBibliographyModifier(display.target.replace(/^!/, ""));
        const hash = bibliography.target.indexOf("#");
        const name = hash < 0 ? bibliography.target : bibliography.target.slice(0, hash);
        const anchor = hash < 0 ? null : bibliography.target.slice(hash + 1);
        return { type, name, canonical: name.toLowerCase(), scope: null, anchor, link_text: display.link_text, normative, link_type: null, modifier: bibliography.modifier, target_form: "BIBLIOGRAPHY" };
    }
    if (type === "spec_url") {
        const url = new URL(raw);
        const segments = url.pathname.split("/").filter(Boolean);
        let name;
        let modifier = null;
        if (url.hostname.toLowerCase() === "www.w3.org" && segments[0]?.toLowerCase() === "tr" && /^\d{4}$/.test(segments[1] ?? "")) {
            name = segments[2] ?? segments[1];
            modifier = `DATED_TR_${segments[1]}`;
        } else name = url.hostname.toLowerCase() === "www.w3.org" ? segments[1] ?? segments[0] : segments[0];
        return { type, name, canonical: name.toLowerCase(), scope: null, anchor: url.hash === "" ? null : url.hash.slice(1), link_text: null, normative: "URL_UNMARKED", link_type: null, modifier, target_form: "SPECIFICATION_URL" };
    }
    let body;
    if (["production", "definition", "idl_or_property", "css_term_double", "element", "markup"].includes(type)) body = raw.slice(2, -2);
    else if (type === "css_shorthand_single") body = raw.slice(1, -1);
    else throw new Error(`unknown Bikeshed reference type: ${type}`);
    const display = splitDisplay(body);
    display.target = semanticText(display.target);
    display.link_text = display.link_text === null ? null : semanticText(display.link_text);
    const typed = splitLinkType(display.target);
    const scoped = ["css_term_double", "css_shorthand_single"].includes(type)
        ? cssTarget(typed.target)
        : { ...parseScoped(typed.target, type === "markup"), target_form: typed.target.includes("/") ? "SCOPED_TARGET" : "UNSCOPED_TARGET" };
    const grammar = type === "production";
    return { type, name: scoped.name, canonical: grammar ? canonicalGrammarName(scoped.name) : canonicalName(scoped.name), scope: scoped.scope, anchor: null, link_text: display.link_text, normative: null, link_type: typed.link_type, modifier: null, target_form: scoped.target_form };
}

function delimited(text, start, opening, closing, multiline = true) {
    if (!text.startsWith(opening, start)) return null;
    const end = text.indexOf(closing, start + opening.length);
    if (end < 0 || end + closing.length - start > 65536) return null;
    if (!multiline && /[\r\n]/.test(text.slice(start, end + closing.length))) return null;
    return { raw: text.slice(start, end + closing.length), end: end + closing.length };
}

function validBibliography(raw) {
    if (/\s/.test(raw[2] ?? "")) return false;
    const display = splitDisplay(raw.slice(2, -2));
    const bibliography = splitBibliographyModifier(semanticText(display.target).replace(/^!/, ""));
    const hash = bibliography.target.indexOf("#");
    const name = hash < 0 ? bibliography.target : bibliography.target.slice(0, hash);
    const anchor = hash < 0 ? null : bibliography.target.slice(hash + 1);
    return (name === "" ? anchor !== null && /^[A-Za-z0-9_.:-]+$/.test(anchor) : /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name))
        && (anchor === null || /^[A-Za-z0-9_.:-]+$/.test(anchor));
}

function scanReferenceCandidates(text, lexical) {
    const candidates = [];
    for (let cursor = 0; cursor < text.length;) {
        let match = null;
        let type = null;
        for (const [candidateType, opening, closing] of [
            ["bibliographic", "[[", "]]"], ["definition", "[=", "=]"], ["markup", "[^", "^]"],
            ["idl_or_property", "{{", "}}"], ["element", "<{", "}>"], ["production", "<<", ">>"],
            ["css_term_double", "''", "''"],
        ]) {
            // Double-quote CSS shorthand is line-local in the legacy source
            // dialect. Treating an unmatched closing pair as a multiline
            // opener swallows later, independently valid Bikeshed links.
            const candidate = delimited(text, cursor, opening, closing, candidateType !== "css_term_double");
            if (candidate !== null && candidate.raw.length > opening.length + closing.length && (candidateType !== "bibliographic" || validBibliography(candidate.raw))) { match = candidate; type = candidateType; break; }
        }
        if (match === null && text[cursor] === "'" && text[cursor - 1] !== "'") {
            const candidate = delimited(text, cursor, "'", "'");
            if (candidate !== null && /^'@?[A-Za-z0-9_-]+(?:\(\))?(?:\/@?[A-Za-z0-9_-]+(?:\(\))?)?(?:!![A-Za-z][A-Za-z0-9-]*)?'$/.test(candidate.raw) && text[candidate.end] !== "'") { match = candidate; type = "css_shorthand_single"; }
        }
        if (match === null && /^https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\//i.test(text.slice(cursor))) {
            const candidate = /^[^\s<)>'\"]+/.exec(text.slice(cursor))?.[0];
            const raw = candidate?.replace(/[.,;:!\]}]+$/g, "");
            if (raw !== undefined && raw !== "") { match = { raw, end: cursor + raw.length }; type = "spec_url"; }
        }
        if (match === null) { cursor += 1; continue; }
        const state = lexical.stateAt(cursor);
        const lexicalDisposition = lexical.dispositionAt(cursor, match.end);
        let disposition = lexicalDisposition.disposition;
        let reason = lexicalDisposition.reason;
        if (isEscaped(text, cursor)) { disposition = "REVIEWED_EXCLUDED"; reason = "REVIEWED_EXCLUDED_ESCAPED_SHORTHAND"; }
        if (state === "BIKESHED_CODE" && type === "css_shorthand_single") { disposition = "REVIEWED_EXCLUDED"; reason = "REVIEWED_EXCLUDED_CODE_LITERAL"; }
        if (state === "ACTIVE_HTML_TAG") { disposition = "REVIEWED_EXCLUDED"; reason = "REVIEWED_EXCLUDED_TAG_NON_HREF_TEXT"; }
        candidates.push({ type, raw: match.raw, character_start: cursor, character_end: match.end, processing_context: state === "BIKESHED_CODE" ? "BIKESHED_CODE" : state, disposition, reason });
        cursor = match.end;
    }
    for (const tag of lexical.tags.filter((row) => !row.closing)) {
        const href = attributeToken(tag, "href");
        if (href?.value_start === null || href?.value_start === undefined || href.value_end === null || href.value_end === undefined || href.value === null || href.value === "") continue;
        const specification = /^https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\//i.test(href.value);
        candidates.push({ type: specification ? "spec_url" : "href_non_specification", raw: href.value, character_start: href.value_start, character_end: href.value_end, processing_context: "HTML_HREF", disposition: specification ? "INCLUDED" : "REVIEWED_EXCLUDED", reason: specification ? "ACTIVE_HREF_SPECIFICATION_REFERENCE" : "REVIEWED_EXCLUDED_NON_SPECIFICATION_HREF" });
    }
    return candidates.sort((left, right) => left.character_start - right.character_start || left.character_end - right.character_end || byteSort(left.processing_context, right.processing_context));
}

export function scanBikeshedReferences(text) {
    const lexical = classifyBikeshed(text);
    return scanReferenceCandidates(text, lexical).filter((row) => row.disposition === "INCLUDED");
}

function definitionMetadata(text, lexical) {
    const stack = [];
    const definitions = [];
    const inherited = (opening, names) => {
        for (const candidate of [opening, ...stack.slice().reverse().map((row) => row.opening)]) {
            for (const name of names) {
                const value = attribute(candidate, name);
                if (value !== null) return value;
            }
        }
        return null;
    };
    for (const token of lexical.tags) {
        const tag = token.name;
        if (token.closing) {
            let index = stack.length - 1;
            while (index >= 0 && stack[index].tag !== tag) index -= 1;
            if (index >= 0) stack.splice(index);
            continue;
        }
        if (tag === "dfn") {
            const scope = inherited(token.raw, ["data-dfn-for", "dfn-for", "for"]);
            const dfnType = inherited(token.raw, ["data-dfn-type", "dfn-type"]);
            const alternate = inherited(token.raw, ["data-lt", "lt"]);
            definitions.push({
                character_start: token.start,
                scopes: uniqueSorted((scope ?? "").split(/\s*,\s*/).filter(Boolean).map(canonicalName)),
                dfn_type: dfnType?.toLowerCase() ?? null,
                alternate_names: uniqueSorted((alternate ?? "").split("|").map((row) => row.trim()).filter(Boolean)),
            });
        }
        if (!token.self_closing) stack.push({ tag, opening: token.raw });
    }
    return definitions;
}

function definitionIndex(carriers, sourceByPath, lexicalByPath) {
    const definitions = [];
    const metadataByPath = new Map();
    for (const [path, source] of sourceByPath) {
        const text = source.bytes.toString("utf8");
        metadataByPath.set(path, definitionMetadata(text, lexicalByPath.get(path)).map((row) => ({ ...row, byte_start: Buffer.byteLength(text.slice(0, row.character_start), "utf8") })));
    }
    for (const carrier of carriers) {
        const source = sourceByPath.get(carrier.source_path);
        if (source === undefined) throw new Error(`carrier source absent: ${carrier.source_path}`);
        const metadata = (metadataByPath.get(carrier.source_path) ?? []).filter((row) => row.byte_start >= carrier.start_offset && row.byte_start < carrier.end_offset_exclusive);
        const scopes = uniqueSorted(metadata.flatMap((row) => row.scopes));
        const dfnTypes = uniqueSorted(metadata.map((row) => row.dfn_type).filter(Boolean));
        const names = uniqueSorted([...carrier.names, ...metadata.flatMap((row) => row.alternate_names)]);
        for (const name of names) definitions.push({ carrier_id: carrier.id, type: carrier.kind === "grammar_production" ? "production" : "definition", canonical: carrier.kind === "grammar_production" ? canonicalGrammarName(name) : canonicalName(name), scopes, dfn_types: dfnTypes });
    }
    const maps = { production: new Map(), unscoped: new Map(), all: new Map(), scoped: new Map(), typed: new Map(), scoped_typed: new Map() };
    const add = (map, key, id) => map.set(key, [...(map.get(key) ?? []), id]);
    for (const definition of definitions) {
        if (definition.type === "production") add(maps.production, definition.canonical, definition.carrier_id);
        else {
            add(maps.all, definition.canonical, definition.carrier_id);
            if (definition.scopes.length === 0) add(maps.unscoped, definition.canonical, definition.carrier_id);
            for (const scope of definition.scopes) add(maps.scoped, `${scope}\0${definition.canonical}`, definition.carrier_id);
            for (const type of definition.dfn_types) {
                add(maps.typed, `${type}\0${definition.canonical}`, definition.carrier_id);
                for (const scope of definition.scopes) add(maps.scoped_typed, `${scope}\0${type}\0${definition.canonical}`, definition.carrier_id);
            }
        }
    }
    return maps;
}

export function targets(reference, maps) {
    if (reference.type === "production") return maps.production.get(reference.canonical) ?? [];
    if (["bibliographic", "spec_url", "element", "markup"].includes(reference.type)) return [];
    if (reference.scope !== null && reference.link_type !== null) return maps.scoped_typed.get(`${canonicalName(reference.scope)}\0${reference.link_type}\0${reference.canonical}`) ?? [];
    if (reference.link_type !== null) return maps.typed.get(`${reference.link_type}\0${reference.canonical}`) ?? [];
    if (reference.scope !== null) return maps.scoped.get(`${canonicalName(reference.scope)}\0${reference.canonical}`) ?? [];
    return maps.unscoped.get(reference.canonical) ?? [];
}

function byteOffsets(text, characterOffsets) {
    const sorted = [...new Set(characterOffsets)].sort((left, right) => left - right);
    const result = new Map();
    let previousCharacter = 0;
    let previousByte = 0;
    for (const character of sorted) {
        previousByte += Buffer.byteLength(text.slice(previousCharacter, character), "utf8");
        previousCharacter = character;
        result.set(character, previousByte);
    }
    return result;
}

function referenceRecords(evidence, carriers, lexicalByPath) {
    const sourceByPath = new Map(evidence.sources.map((source) => [source.exact_path, source]));
    const maps = definitionIndex(carriers, sourceByPath, lexicalByPath);
    const references = [];
    const dispositions = [];
    for (const source of evidence.sources) {
        const text = source.bytes.toString("utf8");
        const lexical = lexicalByPath.get(source.exact_path);
        const candidates = scanReferenceCandidates(text, lexical);
        const offsets = byteOffsets(text, candidates.flatMap((row) => [row.character_start, row.character_end]));
        for (const match of candidates) {
                const start = offsets.get(match.character_start);
                const end = offsets.get(match.character_end);
                let includedId = null;
                if (match.disposition === "INCLUDED") {
                const parsed = parseReference(match.type, match.raw);
                const targetCarrierIds = uniqueSorted(targets(parsed, maps));
                const status = ["bibliographic", "spec_url", "element", "markup"].includes(match.type) || targetCarrierIds.length === 0 ? RED.EXTERNAL : targetCarrierIds.length > 1 ? RED.AMBIGUOUS : RED.TARGET;
                const row = { id: stableId("refv8", [source.exact_path, match.type, start, end, match.raw]), source_path: source.exact_path, start_line: lineForOffset(source.lines, start), start_offset: start, end_offset_exclusive: end, raw: match.raw, ...parsed, processing_context: match.processing_context, target_carrier_ids: targetCarrierIds, status, red_flags: uniqueSorted([RED.REFERENCE, status]) };
                if (source.bytes.subarray(start, end).toString("utf8") !== row.raw) throw new Error(`reference replay failed: ${row.id}`);
                references.push(row);
                includedId = row.id;
                }
                const dispositionRow = { source_path: source.exact_path, candidate_kind: "reference", start_offset: start, end_offset_exclusive: end, raw_sha256: sha256(source.bytes.subarray(start, end)), state: match.processing_context, disposition: match.disposition, reason: match.reason, included_id: includedId };
                dispositions.push({ id: lexicalDispositionId(dispositionRow), ...dispositionRow });
        }
    }
    references.sort((a, b) => byteSort(a.id, b.id));
    if (new Set(references.map((row) => row.id)).size !== references.length) throw new Error("reference ID collision");
    return { references, dispositions };
}

function lexicalSpanDispositions(evidence, lexicalByPath) {
    const rows = [];
    const structuralNames = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "div", "section", "aside", "details", "figure", "pre", "ol", "ul", "dl", "blockquote", "example", "dfn", "dt", "dd"]);
    for (const source of evidence.sources) {
        const text = source.bytes.toString("utf8");
        const lexical = lexicalByPath.get(source.exact_path);
        const candidates = [
            ...lexical.exclusions.map((row) => ({ ...row, candidate_kind: "excluded_span", raw: text.slice(row.start, row.end), disposition: "REVIEWED_EXCLUDED", included_id: null })),
            ...lexical.tags.filter((tag) => structuralNames.has(tag.name) || algorithmMarker(tag)).map((tag) => ({ start: tag.start, end: tag.end, state: "ACTIVE_HTML_TAG", reason: "ACTIVE_STRUCTURAL_TAG", candidate_kind: "structure", raw: tag.raw, disposition: "INCLUDED", included_id: null })),
        ];
        const offsets = byteOffsets(text, candidates.flatMap((row) => [row.start, row.end]));
        for (const candidate of candidates) {
            const start = offsets.get(candidate.start);
            const end = offsets.get(candidate.end);
            const dispositionRow = { source_path: source.exact_path, candidate_kind: candidate.candidate_kind, start_offset: start, end_offset_exclusive: end, raw_sha256: sha256(source.bytes.subarray(start, end)), state: candidate.state, disposition: candidate.disposition, reason: candidate.reason, included_id: candidate.included_id };
            rows.push({ id: lexicalDispositionId(dispositionRow), ...dispositionRow });
        }
    }
    return rows;
}

export function discoverAll(evidence) {
    const sourceByPath = new Map(evidence.sources.map((source) => [source.exact_path, source]));
    const lexicalByPath = new Map(evidence.sources.map((source) => [source.exact_path, classifyBikeshed(source.bytes.toString("utf8"))]));
    const contexts = new Map(evidence.sources.map((source) => [source.exact_path, buildContext(source, lexicalByPath.get(source.exact_path))]));
    const carrierResult = carrierRecords(evidence.v1.occurrence_carriers.rows, sourceByPath, contexts, lexicalByPath);
    const operations = operationRecords(evidence, contexts, lexicalByPath);
    const referenceResult = referenceRecords(evidence, carrierResult.carriers, lexicalByPath);
    const lexicalDispositions = [...lexicalSpanDispositions(evidence, lexicalByPath), ...carrierResult.dispositions, ...referenceResult.dispositions].sort((left, right) => byteSort(left.id, right.id));
    return { contexts, carriers: carrierResult.carriers, operations, references: referenceResult.references, lexicalDispositions };
}

export function discoverFixture(text, carrierRows = []) {
    const bytes = Buffer.from(text, "utf8");
    const source = { exact_path: "fixture/Overview.bs", bytes, lines: splitLines(bytes) };
    const evidence = { sources: [source], v1: { required_algorithmic_counterexamples: [] } };
    const lexicalByPath = new Map([[source.exact_path, classifyBikeshed(text)]]);
    const contexts = new Map([[source.exact_path, buildContext(source, lexicalByPath.get(source.exact_path))]]);
    const referenceResult = referenceRecords(evidence, carrierRows, lexicalByPath);
    return { source, lexical: lexicalByPath.get(source.exact_path), contexts, operations: operationRecords(evidence, contexts, lexicalByPath), references: referenceResult.references, lexical_dispositions: referenceResult.dispositions };
}
