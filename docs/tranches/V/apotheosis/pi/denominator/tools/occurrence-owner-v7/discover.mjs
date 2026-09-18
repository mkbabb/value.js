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
    let htmlText = text;
    let htmlEnd = index;
    const htmlStart = /<h([1-6])\b/i.exec(text);
    while (htmlStart !== null && !/<h[1-6]\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/i.test(htmlText) && htmlEnd + 1 < lines.length && htmlEnd < index + 64) htmlText += `\n${lines[++htmlEnd].text}`;
    const html = /<h([1-6])\b([^>]*)>([\s\S]*)/i.exec(htmlText);
    if (html !== null) {
        let end = htmlEnd;
        let body = html[3];
        while (!new RegExp(`</h${html[1]}>`, "i").test(body) && end + 1 < lines.length && end < index + 80) body += `\n${lines[++end].text}`;
        return { syntax: "HTML_HEADING", level: Number(html[1]), title: plainText(body.replace(new RegExp(`</h${html[1]}>[\\s\\S]*$`, "i"), "")), anchor: attribute(html[2], "id"), start: index, end };
    }
    if (index + 1 < lines.length && /^\s*(?:=+|-+)\s*$/.test(lines[index + 1].text) && text.trim() !== "") {
        return { syntax: "BIKESHED_SETEXT", level: lines[index + 1].text.includes("=") ? 2 : 3, title: plainText(text.replace(/\s*\{#[^}]+\}\s*$/, "")), anchor: /\{#([^}]+)\}/.exec(text)?.[1] ?? null, start: index, end: index + 1 };
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

const OPENING_TAG = /<([A-Za-z][A-Za-z0-9:-]*)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g;

export function algorithmMarker(opening) {
    return /\salgorithm(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|>)/i.test(opening)
        || classes(opening).includes("algorithm")
        || /\sdata-algorithm(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|>)/i.test(opening);
}

export function algorithmOpeningTuples(source) {
    const text = source.bytes.toString("utf8");
    const tuples = [];
    for (const match of text.matchAll(OPENING_TAG)) {
        if (!algorithmMarker(match[0])) continue;
        const offset = Buffer.byteLength(text.slice(0, match.index), "utf8");
        tuples.push({ source_path: source.exact_path, tag: match[1].toLowerCase(), line: lineForOffset(source.lines, offset), offset, raw_opening: match[0] });
    }
    return tuples;
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
        return { ...carrier, context: inherited, red_flags_v7: uniqueSorted(flags) };
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
        candidates.push({ id: stableId("opv7c", [source.exact_path, kind, slice.start_offset, slice.end_offset_exclusive, slice.raw_slice_sha256]), source_path: source.exact_path, kind, extraction, ...slice, context: contextAt(contexts.get(source.exact_path), start), red_flags: uniqueSorted([RED.OPERATION, RED.COMPLETENESS, ...extraFlags]) });
    };
    for (const source of evidence.sources) {
        const model = contexts.get(source.exact_path);
        for (const heading of model.headings) {
            if (!OPERATION_WORDS.test(`${heading.title} ${heading.anchor ?? ""}`)) continue;
            const kind = /serializ|canonical|round[- ]?trip|source[- ]?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "serialization_section_candidate" : /recover|invalid|diagnostic/i.test(`${heading.title} ${heading.anchor ?? ""}`) ? "recovery_section_candidate" : "algorithm_section_candidate";
            add(source, kind, heading.syntax, heading.start, heading.section_end);
        }
        for (const tuple of algorithmOpeningTuples(source)) {
            const index = tuple.line - 1;
            const boundary = balancedTagEnd(source.lines, index, tuple.tag);
            add(source, `bikeshed_${tuple.tag}_algorithm_candidate`, "ANY_ELEMENT_ALGORITHM_ATTRIBUTE_OR_CLASS", index, boundary.end, boundary.closed ? [] : [RED.UNCLOSED]);
            algorithmOpenings.push(tuple);
        }
        for (let index = 0; index < source.lines.length; index += 1) {
            const text = source.lines[index].text;
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

function referenceIntervals(text) {
    const excluded = [];
    const code = [];
    const rawStack = [];
    const tokens = /<!--[\s\S]*?-->|<\/?([A-Za-z][A-Za-z0-9:-]*)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi;
    for (const match of text.matchAll(tokens)) {
        excluded.push([match.index, match.index + match[0].length, "HTML_TAG_OR_COMMENT"]);
        if (match[1] === undefined) continue;
        const tag = match[1].toLowerCase();
        if (/^<\//.test(match[0])) {
            let index = rawStack.length - 1;
            while (index >= 0 && rawStack[index].tag !== tag) index -= 1;
            if (index >= 0) {
                const [opening] = rawStack.splice(index, 1);
                (opening.opaque ? excluded : code).push([opening.end, match.index, opening.context]);
            }
            continue;
        }
        const highlight = (attribute(match[0], "highlight") ?? "").toLowerCase();
        const opaque = ["script", "style", "xmp"].includes(tag)
            || (tag === "pre" && /^(?:javascript|js|css|html|webidl|idl)$/.test(highlight));
        if (opaque || ["code", "samp"].includes(tag)) rawStack.push({ tag, end: match.index + match[0].length, context: opaque ? `RAW_${tag.toUpperCase()}` : "BIKESHED_CODE", opaque });
    }
    excluded.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    code.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    return { excluded, code };
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

export function scanBikeshedReferences(text) {
    const intervals = referenceIntervals(text);
    const excluded = intervals.excluded;
    const found = [];
    let excludedIndex = 0;
    let codeIndex = 0;
    for (let cursor = 0; cursor < text.length;) {
        while (excludedIndex < excluded.length && excluded[excludedIndex][1] <= cursor) excludedIndex += 1;
        if (excludedIndex < excluded.length && excluded[excludedIndex][0] <= cursor) { cursor = excluded[excludedIndex][1]; continue; }
        while (codeIndex < intervals.code.length && intervals.code[codeIndex][1] <= cursor) codeIndex += 1;
        const inCode = codeIndex < intervals.code.length && intervals.code[codeIndex][0] <= cursor && intervals.code[codeIndex][1] > cursor;
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
        if (match === null && !inCode && text[cursor] === "'" && text[cursor - 1] !== "'") {
            const candidate = delimited(text, cursor, "'", "'");
            if (candidate !== null && /^'@?[A-Za-z0-9_-]+(?:\(\))?(?:\/@?[A-Za-z0-9_-]+(?:\(\))?)?(?:!![A-Za-z][A-Za-z0-9-]*)?'$/.test(candidate.raw) && text[candidate.end] !== "'") { match = candidate; type = "css_shorthand_single"; }
        }
        if (match === null && /^https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\//i.test(text.slice(cursor))) {
            const candidate = /^[^\s<)>'\"]+/.exec(text.slice(cursor))?.[0];
            const raw = candidate?.replace(/[.,;:!\]}]+$/g, "");
            if (raw !== undefined && raw !== "") { match = { raw, end: cursor + raw.length }; type = "spec_url"; }
        }
        if (match === null) { cursor += 1; continue; }
        found.push({ type, raw: match.raw, character_start: cursor, character_end: match.end, processing_context: inCode ? "BIKESHED_CODE" : "BIKESHED_TEXT" });
        cursor = match.end;
    }
    return found;
}

function definitionMetadata(text) {
    const stack = [];
    const definitions = [];
    const tags = /<\/?([A-Za-z][A-Za-z0-9:-]*)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g;
    const inherited = (opening, names) => {
        for (const candidate of [opening, ...stack.slice().reverse().map((row) => row.opening)]) {
            for (const name of names) {
                const value = attribute(candidate, name);
                if (value !== null) return value;
            }
        }
        return null;
    };
    for (const match of text.matchAll(tags)) {
        const tag = match[1].toLowerCase();
        if (/^<\//.test(match[0])) {
            let index = stack.length - 1;
            while (index >= 0 && stack[index].tag !== tag) index -= 1;
            if (index >= 0) stack.splice(index);
            continue;
        }
        if (tag === "dfn") {
            const scope = inherited(match[0], ["data-dfn-for", "dfn-for", "for"]);
            const dfnType = inherited(match[0], ["data-dfn-type", "dfn-type"]);
            const alternate = inherited(match[0], ["data-lt", "lt"]);
            definitions.push({
                character_start: match.index,
                scopes: uniqueSorted((scope ?? "").split(/\s*,\s*/).filter(Boolean).map(canonicalName)),
                dfn_type: dfnType?.toLowerCase() ?? null,
                alternate_names: uniqueSorted((alternate ?? "").split("|").map((row) => row.trim()).filter(Boolean)),
            });
        }
        if (!/\/>$/.test(match[0]) && !["br", "hr", "img", "input", "meta", "link"].includes(tag)) stack.push({ tag, opening: match[0] });
    }
    return definitions;
}

function definitionIndex(carriers, sourceByPath) {
    const definitions = [];
    const metadataByPath = new Map();
    for (const [path, source] of sourceByPath) {
        const text = source.bytes.toString("utf8");
        metadataByPath.set(path, definitionMetadata(text).map((row) => ({ ...row, byte_start: Buffer.byteLength(text.slice(0, row.character_start), "utf8") })));
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

function referenceRecords(evidence, carriers) {
    const sourceByPath = new Map(evidence.sources.map((source) => [source.exact_path, source]));
    const maps = definitionIndex(carriers, sourceByPath);
    const references = [];
    for (const source of evidence.sources) {
        const text = source.bytes.toString("utf8");
        let previousCharacterOffset = 0;
        let previousByteOffset = 0;
        for (const match of scanBikeshedReferences(text)) {
                const start = previousByteOffset + Buffer.byteLength(text.slice(previousCharacterOffset, match.character_start), "utf8");
                const rawBytes = Buffer.from(match.raw, "utf8");
                const end = start + rawBytes.length;
                previousCharacterOffset = match.character_end;
                previousByteOffset = end;
                const parsed = parseReference(match.type, match.raw);
                const targetCarrierIds = uniqueSorted(targets(parsed, maps));
                const status = ["bibliographic", "spec_url", "element", "markup"].includes(match.type) || targetCarrierIds.length === 0 ? RED.EXTERNAL : targetCarrierIds.length > 1 ? RED.AMBIGUOUS : RED.TARGET;
                const row = { id: stableId("refv7", [source.exact_path, match.type, start, end, match.raw]), source_path: source.exact_path, start_line: lineForOffset(source.lines, start), start_offset: start, end_offset_exclusive: end, raw: match.raw, ...parsed, processing_context: match.processing_context, target_carrier_ids: targetCarrierIds, status, red_flags: uniqueSorted([RED.REFERENCE, status]) };
                if (source.bytes.subarray(start, end).toString("utf8") !== row.raw) throw new Error(`reference replay failed: ${row.id}`);
                references.push(row);
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
