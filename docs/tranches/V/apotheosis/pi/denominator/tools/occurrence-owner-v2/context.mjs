import { attribute, byteSort, classes, exactSlice, plainText, sha256, stableId, uniqueSorted } from "./shared.mjs";

const CONTEXT_WORDS = /\b(informative|non[- ]normative|examples?|changes?|change log|history|historical|status|references?|security|privacy)\b/i;
const OPERATION_WORDS = /\b(algorithm|parse|parsing|tokeniz\w*|consume|component value|recover|recovery|invalid|diagnostic|serializ\w*|canonical|round[- ]?trip|source[- ]?preserv\w*)\b/i;

function headingFromLine(lines, index) {
    const text = lines[index].text;
    const atx = /^\s*(#{1,6})\s+(.+?)\s*$/.exec(text);
    if (atx !== null) {
        const anchor = /\{#([^}]+)\}\s*$/.exec(atx[2])?.[1] ?? null;
        const title = plainText(atx[2].replace(/\s*\{#[^}]+\}\s*$/, "").replace(/\s+#+\s*$/, ""));
        return { syntax: "BIKESHED_ATX", level: atx[1].length, title, anchor, start: index, end: index };
    }
    const html = /<h([1-6])\b([^>]*)>([\s\S]*)/i.exec(text);
    if (html !== null) {
        let end = index;
        let body = html[3];
        while (!new RegExp(`</h${html[1]}>`, "i").test(body) && end + 1 < lines.length && end < index + 16) {
            end += 1;
            body += `\n${lines[end].text}`;
        }
        return {
            syntax: "HTML_HEADING",
            level: Number(html[1]),
            title: plainText(body.replace(new RegExp(`</h${html[1]}>[\\s\\S]*$`, "i"), "")),
            anchor: attribute(html[2], "id"),
            start: index,
            end,
        };
    }
    if (index + 1 < lines.length && /^\s*(?:=+|-+)\s*$/.test(lines[index + 1].text) && text.trim() !== "") {
        return {
            syntax: "BIKESHED_SETEXT",
            level: lines[index + 1].text.includes("=") ? 1 : 2,
            title: plainText(text.replace(/\s*\{#[^}]+\}\s*$/, "")),
            anchor: /\{#([^}]+)\}/.exec(text)?.[1] ?? null,
            start: index,
            end: index + 1,
        };
    }
    return null;
}

export function parseHeadings(lines) {
    const headings = [];
    for (let index = 0; index < lines.length; index += 1) {
        const heading = headingFromLine(lines, index);
        if (heading === null) continue;
        headings.push(heading);
        index = heading.end;
    }
    for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index];
        const next = headings.slice(index + 1).find((candidate) => candidate.level <= heading.level);
        heading.section_end = (next?.start ?? lines.length) - 1;
        heading.context_markers = uniqueSorted((`${heading.title} ${heading.anchor ?? ""}`.match(new RegExp(CONTEXT_WORDS, "ig")) ?? []).map((item) => item.toLowerCase()));
    }
    return headings;
}

export function parseContainers(lines) {
    const spans = [];
    const stack = [];
    const token = /<\/?(div|section|aside|details|figure|pre|ol|ul|dl|blockquote|example)\b[^>]*>/ig;
    for (let index = 0; index < lines.length; index += 1) {
        token.lastIndex = 0;
        for (const match of lines[index].text.matchAll(token)) {
            const raw = match[0];
            const tag = match[1].toLowerCase();
            if (/^<\//.test(raw)) {
                let stackIndex = stack.length - 1;
                while (stackIndex >= 0 && stack[stackIndex].tag !== tag) stackIndex -= 1;
                if (stackIndex < 0) {
                    spans.push({ tag, start: index, end: index, classes: [], id: null, markers: [], closed: false, defect: "UNMATCHED_CLOSE" });
                    continue;
                }
                const [opening] = stack.splice(stackIndex, 1);
                spans.push({ ...opening, end: index, closed: true });
                continue;
            }
            const classNames = classes(raw);
            const id = attribute(raw, "id");
            const markerText = `${classNames.join(" ")} ${id ?? ""} ${attribute(raw, "data-fill-with") ?? ""}`;
            stack.push({
                tag,
                start: index,
                classes: classNames,
                id,
                markers: uniqueSorted((markerText.match(new RegExp(CONTEXT_WORDS, "ig")) ?? []).map((item) => item.toLowerCase())),
            });
        }
    }
    for (const opening of stack) spans.push({ ...opening, end: lines.length - 1, closed: false, defect: "UNCLOSED_CONTAINER" });
    return spans.sort((left, right) => left.start - right.start || right.end - left.end || byteSort(left.tag, right.tag));
}

export function buildContext(lines) {
    return { headings: parseHeadings(lines), containers: parseContainers(lines) };
}

export function contextAt(model, lineIndex) {
    const sections = model.headings
        .filter((heading) => heading.start <= lineIndex && heading.section_end >= lineIndex)
        .sort((left, right) => left.level - right.level || left.start - right.start)
        .map((heading) => ({
            syntax: heading.syntax,
            level: heading.level,
            title: heading.title,
            anchor: heading.anchor,
            start_line: heading.start + 1,
            end_line: heading.section_end + 1,
            context_markers: heading.context_markers,
        }));
    const containers = model.containers
        .filter((span) => span.start <= lineIndex && span.end >= lineIndex)
        .map((span) => ({
            tag: span.tag,
            classes: span.classes,
            id: span.id,
            start_line: span.start + 1,
            end_line: span.end + 1,
            closed: span.closed,
            context_markers: span.markers,
            defect: span.defect ?? null,
        }));
    const markers = uniqueSorted([
        ...sections.flatMap((section) => section.context_markers),
        ...containers.flatMap((container) => container.context_markers),
    ]);
    const redFlags = [];
    if (sections.length === 0) redFlags.push("RED_SECTION_CONTEXT_INCOMPLETE");
    if (containers.some((container) => !container.closed)) redFlags.push("RED_CONTAINER_CONTEXT_INCOMPLETE");
    if (markers.length > 0) redFlags.push("RED_INFORMATIVE_EXAMPLE_HISTORY_OR_CHANGE_CONTEXT");
    return { sections, containers, inherited_markers: markers, red_flags: uniqueSorted(redFlags) };
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

export function bindDefinitionList(bytes, lines, startLine) {
    let dtStart = Math.max(0, startLine - 1);
    while (dtStart > 0 && dtStart >= startLine - 3 && !/<dt\b/i.test(lines[dtStart].text)) dtStart -= 1;
    if (!/<dt\b/i.test(lines[dtStart]?.text ?? "")) return null;
    const definitionItemEnd = (start, tag) => {
        for (let index = start; index < lines.length; index += 1) {
            if (new RegExp(`</${tag}>`, "i").test(lines[index].text)) return { end: index, closed: true, closure: "EXPLICIT_END_TAG" };
            if (index > start && /<(?:dt|dd)\b|<\/dl>/i.test(lines[index].text)) return { end: index - 1, closed: true, closure: "HTML_IMPLIED_END_TAG" };
        }
        return { end: lines.length - 1, closed: false, closure: "EOF_UNCLOSED" };
    };
    const dt = definitionItemEnd(dtStart, "dt");
    let ddStart = dt.end + 1;
    while (ddStart < lines.length && /^\s*$/.test(lines[ddStart].text)) ddStart += 1;
    if (ddStart >= lines.length || !/<dd\b/i.test(lines[ddStart].text)) {
        return { status: "RED_BOUNDARY_INCOMPLETE_NO_ADJACENT_DD", dt: { ...exactSlice(bytes, lines, dtStart, dt.end), closure: dt.closure }, dd: null };
    }
    const dd = definitionItemEnd(ddStart, "dd");
    return {
        status: dt.closed && dd.closed ? "RED_UNREVIEWED_DT_DD_BOUNDARY" : "RED_BOUNDARY_INCOMPLETE_UNCLOSED_DT_OR_DD",
        dt: { ...exactSlice(bytes, lines, dtStart, dt.end), closure: dt.closure },
        dd: { ...exactSlice(bytes, lines, ddStart, dd.end), closure: dd.closure },
        combined: exactSlice(bytes, lines, dtStart, dd.end),
    };
}

function operationCandidate(sourcePath, bytes, lines, kind, extraction, start, end, context, flags = []) {
    const slice = exactSlice(bytes, lines, start, end);
    return {
        id: stableId("opv2", [sourcePath, kind, slice.start_offset, slice.end_offset_exclusive, slice.raw_slice_sha256]),
        source_path: sourcePath,
        kind,
        extraction,
        ...slice,
        context: contextAt(context, start),
        review_status: "RED_UNREVIEWED_OPERATION_BOUNDARY",
        reviewed_owner: null,
        red_flags: uniqueSorted(["RED_UNREVIEWED_OPERATION_BOUNDARY", ...flags]),
    };
}

export function discoverOperationCandidates(sourcePath, bytes, lines, context) {
    const result = [];
    const seen = new Set();
    const add = (kind, extraction, start, end, flags = []) => {
        const candidate = operationCandidate(sourcePath, bytes, lines, kind, extraction, start, end, context, flags);
        if (seen.has(candidate.id)) return;
        seen.add(candidate.id);
        result.push(candidate);
    };

    for (const heading of context.headings) {
        if (!OPERATION_WORDS.test(`${heading.title} ${heading.anchor ?? ""}`)) continue;
        const kind = /serializ|canonical|round[- ]?trip|source[- ]?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`)
            ? "serialization_section_candidate"
            : /recover|invalid|diagnostic/i.test(`${heading.title} ${heading.anchor ?? ""}`)
                ? "recovery_section_candidate"
                : "algorithm_section_candidate";
        add(kind, heading.syntax, heading.start, heading.section_end, ["RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"]);
    }

    for (let index = 0; index < lines.length; index += 1) {
        const text = lines[index].text;
        const block = /<(div|pre|ol|dl)\b[^>]*(?:class\s*=\s*(?:"[^"]*algorithm|[^\s>]*algorithm)|data-algorithm)[^>]*>/i.exec(text);
        if (block !== null) {
            const boundary = balancedTagEnd(lines, index, block[1].toLowerCase());
            add("markup_algorithm_candidate", "BIKESHED_OR_LEGACY_MARKUP", index, boundary.end,
                boundary.closed ? ["RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"] : ["RED_STRUCTURAL_BLOCK_UNCLOSED", "RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"]);
        }
        const legacyList = /<ol\b[^>]*>/i.exec(text);
        if (legacyList !== null) {
            const inherited = contextAt(context, index);
            if (OPERATION_WORDS.test(inherited.sections.map((section) => `${section.title} ${section.anchor ?? ""}`).join(" "))) {
                const boundary = balancedTagEnd(lines, index, "ol");
                add("legacy_html_algorithm_or_serialization_list_candidate", "HTML_OL_IN_OPERATION_SECTION", index, boundary.end,
                    boundary.closed ? ["RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"] : ["RED_STRUCTURAL_BLOCK_UNCLOSED", "RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"]);
            }
        }
        if (/^\s*(?:\d+[.)]|[-*+])\s+\S/.test(text)) {
            const inherited = contextAt(context, index);
            if (!OPERATION_WORDS.test(inherited.sections.map((section) => section.title).join(" "))) continue;
            let end = index;
            while (end + 1 < lines.length && (/^\s*(?:\d+[.)]|[-*+])\s+\S/.test(lines[end + 1].text) || /^\s{2,}\S/.test(lines[end + 1].text) || /^\s*$/.test(lines[end + 1].text))) end += 1;
            add("markdown_algorithm_or_recovery_candidate", "MARKDOWN_LIST_IN_OPERATION_SECTION", index, end, ["RED_ALGORITHM_OR_SERIALIZATION_COMPLETENESS_UNREVIEWED"]);
            index = end;
            continue;
        }
        if (/<dt\b/i.test(text)) {
            const bound = bindDefinitionList(bytes, lines, index + 1);
            if (bound?.combined !== undefined) {
                add("definition_term_and_body_candidate", "DT_DD_BOUNDARY", bound.combined.start_line - 1, bound.combined.end_line - 1,
                    bound.status.includes("INCOMPLETE") ? ["RED_DEFINITION_BOUNDARY_INCOMPLETE"] : ["RED_DT_DD_BOUNDARY_UNREVIEWED"]);
            } else if (bound !== null) {
                add("definition_term_boundary_incomplete", "DT_WITHOUT_ADJACENT_DD", bound.dt.start_line - 1, bound.dt.end_line - 1, ["RED_DEFINITION_BOUNDARY_INCOMPLETE"]);
            }
        }
    }
    return result.sort((left, right) => byteSort(left.id, right.id));
}

export function contextSummary(model) {
    return {
        headings: model.headings.length,
        atx_headings: model.headings.filter((heading) => heading.syntax === "BIKESHED_ATX").length,
        containers: model.containers.length,
        unclosed_containers: model.containers.filter((container) => !container.closed).length,
        contextual_regions: model.headings.filter((heading) => heading.context_markers.length > 0).length
            + model.containers.filter((container) => container.markers.length > 0).length,
        model_digest_sha256: sha256(Buffer.from(JSON.stringify(model), "utf8")),
    };
}
