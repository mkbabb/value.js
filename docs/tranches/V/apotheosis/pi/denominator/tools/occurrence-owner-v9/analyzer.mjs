import { createHash } from "node:crypto";
import { decodeHTMLAttribute } from "entities";

const RAW_ELEMENTS = new Map([
    ["script", "RAW_SCRIPT"],
    ["style", "RAW_STYLE"],
    ["xmp", "RAW_XMP"],
]);
const VOID_ELEMENTS = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
const PROCESSED_ELEMENTS = new Set(["code", "samp"]);
const HEADING_NAMES = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const STRUCTURAL_CONTAINERS = new Set(["section", "article", "nav", "aside", "main", "details"]);
const DATABLOCK_CLASSES = new Set([
    "anchors",
    "biblio",
    "boilerplate",
    "issues-index",
    "link-defaults",
    "metadata",
    "railroad",
    "tests",
]);
const ACCEPTED_LEDGER_REVIEW_STATUSES = new Set(["REVIEWED_ACCEPTED"]);
const BIBLIOGRAPHIC_MODIFIERS = new Set([
    "current",
    "snapshot",
    "inline",
    "direct",
    "index",
    "obsolete",
]);
const RAW_PRE_CLASSES =
    /(?:^|\s)(?:lang-|language-)(?:css|html|idl|javascript|js|webidl)(?:\s|$)/i;
const OPAQUE_STATES = new Set([
    "HTML_COMMENT",
    "FENCED_BLOCK",
    "DATABLOCK",
    "RAW_SCRIPT",
    "RAW_STYLE",
    "RAW_XMP",
    "RAW_PRE",
    "MALFORMED_TAG_RECOVERY",
]);
const REFERENCE_STATES = new Set(["VISIBLE_TEXT", "PROCESSED_CODE"]);
const PAIRS = Object.freeze([
    ["[[", "]]", "bibliographic"],
    ["[=", "=]", "definition"],
    ["[^", "^]", "markup"],
    ["{{", "}}", "idl_or_property"],
    ["<<", ">>", "production"],
    ["<{", "}>", "element"],
    ["''", "''", "css_term_double"],
]);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const isSpace = (character) => /[\t\n\f\r ]/.test(character ?? "");
const isName = (character) => /[A-Za-z0-9:-]/.test(character ?? "");

function nextScalarEnd(text, index) {
    const code = text.charCodeAt(index);
    return code >= 0xd800 &&
        code <= 0xdbff &&
        index + 1 < text.length &&
        text.charCodeAt(index + 1) >= 0xdc00 &&
        text.charCodeAt(index + 1) <= 0xdfff
        ? index + 2
        : Math.min(text.length, index + 1);
}

function byteMap(text) {
    const map = new Uint32Array(text.length + 1);
    let bytes = 0;
    for (let index = 0; index < text.length; index = nextScalarEnd(text, index)) {
        const end = nextScalarEnd(text, index);
        const scalar = text.codePointAt(index) ?? 0;
        const width = scalar <= 0x7f ? 1 : scalar <= 0x7ff ? 2 : scalar <= 0xffff ? 3 : 4;
        for (let cursor = index; cursor < end; cursor += 1) map[cursor] = bytes;
        bytes += width;
    }
    map[text.length] = bytes;
    return map;
}

function coordinatesFor(text) {
    const charsToBytes = byteMap(text);
    const bytes = Buffer.from(text, "utf8");
    return {
        bytes,
        byte: (character) => charsToBytes[character],
        slice: (start, end) => bytes.subarray(start, end).toString("utf8"),
    };
}

function parseAttributes(text, end, nameEnd) {
    const attributes = [];
    let cursor = nameEnd;
    const terminal = /\/\s*>$/.test(text.slice(nameEnd, end)) ? end - 2 : end - 1;
    while (cursor < terminal) {
        while (cursor < terminal && isSpace(text[cursor])) cursor += 1;
        if (cursor >= terminal || text[cursor] === "/") break;
        const attributeStart = cursor;
        while (cursor < terminal && !/[\s=/>]/.test(text[cursor])) cursor += 1;
        if (cursor === attributeStart) {
            cursor += 1;
            continue;
        }
        const name = text.slice(attributeStart, cursor).toLowerCase();
        while (cursor < terminal && isSpace(text[cursor])) cursor += 1;
        let value = null;
        let rawValue = null;
        let valueStart = null;
        let valueEnd = null;
        if (text[cursor] === "=") {
            cursor += 1;
            while (cursor < terminal && isSpace(text[cursor])) cursor += 1;
            const quote = text[cursor] === '"' || text[cursor] === "'" ? text[cursor++] : null;
            valueStart = cursor;
            if (quote === null)
                while (cursor < terminal && !/[\s>]/.test(text[cursor])) cursor += 1;
            else while (cursor < terminal && text[cursor] !== quote) cursor += 1;
            valueEnd = cursor;
            rawValue = text.slice(valueStart, valueEnd);
            value = decodeHTMLAttribute(rawValue);
            if (quote !== null && text[cursor] === quote) cursor += 1;
        }
        attributes.push({
            name,
            value,
            raw_value: rawValue,
            char_start: attributeStart,
            char_end: cursor,
            value_char_start: valueStart,
            value_char_end: valueEnd,
        });
    }
    return attributes;
}

function parseTag(text, start, work) {
    if (text[start] !== "<" || text.startsWith("<!--", start)) return null;
    let cursor = start + 1;
    const closing = text[cursor] === "/";
    if (closing) cursor += 1;
    if (!/[A-Za-z]/.test(text[cursor] ?? "")) return null;
    const nameStart = cursor;
    while (isName(text[cursor])) cursor += 1;
    const name = text.slice(nameStart, cursor).toLowerCase();
    const nameEnd = cursor;
    if (closing && !isSpace(text[cursor]) && text[cursor] !== "/" && text[cursor] !== ">")
        return null;
    let quote = null;
    while (cursor < text.length) {
        work.tag_code_units += 1;
        const character = text[cursor];
        if (quote !== null) {
            if (character === quote) quote = null;
        } else if (character === '"' || character === "'") quote = character;
        else if (character === ">") {
            const end = cursor + 1;
            const syntacticSelfClosing = /\/\s*>$/.test(text.slice(nameEnd, end));
            return {
                name,
                closing,
                self_closing: VOID_ELEMENTS.has(name),
                syntactic_self_closing: syntacticSelfClosing,
                char_start: start,
                char_end: end,
                attributes: closing ? [] : parseAttributes(text, end, nameEnd),
            };
        }
        cursor += 1;
    }
    return { malformed: true, char_start: start, char_end: text.length };
}

function attribute(tag, name) {
    return tag.attributes.find((row) => row.name === name) ?? null;
}

function definitionScopeAttribute(tag) {
    return (
        attribute(tag, "data-dfn-for") ??
        attribute(tag, "dfn-for") ??
        (tag.name === "dfn" ? attribute(tag, "for") : null)
    );
}

function rawState(tag) {
    if (RAW_ELEMENTS.has(tag.name)) return RAW_ELEMENTS.get(tag.name);
    if (tag.name !== "pre") return null;
    const classes = (attribute(tag, "class")?.value ?? "").split(/\s+/).filter(Boolean);
    if (classes.some((name) => DATABLOCK_CLASSES.has(name))) return "DATABLOCK";
    const highlight = attribute(tag, "highlight");
    if (
        highlight !== null &&
        !["false", "no", "none"].includes((highlight.value ?? "").toLowerCase())
    )
        return "RAW_PRE";
    if (RAW_PRE_CLASSES.test(classes.join(" "))) return "RAW_PRE";
    return "RAW_PRE";
}

function appendRange(ranges, coordinates, charStart, charEnd, state) {
    if (charEnd <= charStart) return;
    const start = coordinates.byte(charStart);
    const end = coordinates.byte(charEnd);
    const previous = ranges.at(-1);
    if (previous?.end_offset_exclusive === start && previous.state === state)
        previous.end_offset_exclusive = end;
    else ranges.push({ start_offset: start, end_offset_exclusive: end, state });
}

function appendTagRanges(ranges, coordinates, tag) {
    if (tag.closing || tag.attributes.length === 0) {
        appendRange(ranges, coordinates, tag.char_start, tag.char_end, "TAG");
        return;
    }
    let cursor = tag.char_start;
    for (const row of tag.attributes) {
        appendRange(ranges, coordinates, cursor, row.char_start, "TAG");
        appendRange(ranges, coordinates, row.char_start, row.char_end, "TAG_ATTRIBUTE");
        cursor = row.char_end;
    }
    appendRange(ranges, coordinates, cursor, tag.char_end, "TAG");
}

function fenceAt(text, index) {
    if (index !== 0 && text[index - 1] !== "\n") return null;
    const match = /^( {0,3})(`{3,}|~{3,})[^\n]*(?:\n|$)/.exec(text.slice(index));
    return match === null
        ? null
        : {
              marker: match[2][0],
              length: match[2].length,
              opening_end: index + match[0].length,
          };
}

function findFenceEnd(text, openingEnd, marker, length, work) {
    let cursor = openingEnd;
    while (cursor < text.length) {
        const newline = text.indexOf("\n", cursor);
        const lineEnd = newline < 0 ? text.length : newline + 1;
        work.fence_lines += 1;
        const match = /^( {0,3})(`{3,}|~{3,})\s*(?:\n|$)/.exec(
            text.slice(cursor, lineEnd),
        );
        if (match !== null && match[2][0] === marker && match[2].length >= length)
            return lineEnd;
        cursor = lineEnd;
    }
    return text.length;
}

function asciiEqualAt(text, start, lowerAscii) {
    if (start + lowerAscii.length > text.length) return false;
    for (let index = 0; index < lowerAscii.length; index += 1) {
        const code = text.charCodeAt(start + index);
        const folded = code >= 65 && code <= 90 ? code + 32 : code;
        if (folded !== lowerAscii.charCodeAt(index)) return false;
    }
    return true;
}

function findRawClose(text, start, name, work) {
    const needle = `</${name}`;
    let cursor = start;
    while (cursor < text.length) {
        work.raw_searches += 1;
        const candidate = text.indexOf("<", cursor);
        if (candidate < 0) return { content_end: text.length, closing: null };
        if (!asciiEqualAt(text, candidate, needle)) {
            cursor = candidate + 1;
            continue;
        }
        const afterName = candidate + needle.length;
        const boundary = text[afterName];
        if (!isSpace(boundary) && boundary !== "/" && boundary !== ">") {
            cursor = afterName;
            continue;
        }
        let close = afterName;
        let quote = null;
        while (close < text.length) {
            work.tag_code_units += 1;
            const character = text[close];
            if (quote !== null) {
                if (character === quote) quote = null;
            } else if (character === '"' || character === "'") quote = character;
            else if (character === ">") break;
            close += 1;
        }
        if (close >= text.length) return { content_end: text.length, closing: null };
        return {
            content_end: candidate,
            closing: {
                name,
                closing: true,
                self_closing: false,
                syntactic_self_closing: /\/\s*>$/.test(text.slice(afterName, close + 1)),
                char_start: candidate,
                char_end: close + 1,
                attributes: [],
            },
        };
    }
    return { content_end: text.length, closing: null };
}

function materializeTag(tag, coordinates, id, parentId, scopeOwnerTagId) {
    return {
        id,
        parent_id: parentId,
        matching_tag_id: null,
        scope_owner_tag_id: scopeOwnerTagId,
        name: tag.name,
        closing: tag.closing,
        self_closing: tag.self_closing,
        syntactic_self_closing: tag.syntactic_self_closing,
        start_offset: coordinates.byte(tag.char_start),
        end_offset_exclusive: coordinates.byte(tag.char_end),
        attributes: tag.attributes.map((row) => ({
            name: row.name,
            value: row.value,
            raw_value: row.raw_value,
            start_offset: coordinates.byte(row.char_start),
            end_offset_exclusive: coordinates.byte(row.char_end),
            value_start_offset:
                row.value_char_start === null ? null : coordinates.byte(row.value_char_start),
            value_end_offset_exclusive:
                row.value_char_end === null ? null : coordinates.byte(row.value_char_end),
        })),
    };
}

function classify(text, coordinates, work) {
    const ranges = [];
    const tags = [];
    const stack = [];
    const openingsByName = new Map();
    const stackPositions = new Map();
    const contentStates = new Map();
    let processedDepth = 0;
    let cursor = 0;
    let visibleStart = 0;
    const currentTextState = () => {
        let explicitLink = false;
        for (let index = stack.length - 1; index >= 0; index -= 1) {
            const row = stack[index];
            if (row.name === "l") explicitLink = true;
            const state = contentStates.get(row);
            if (state !== undefined)
                return explicitLink && state === "RAW_PRE" ? "VISIBLE_TEXT" : state;
        }
        return processedDepth > 0 ? "PROCESSED_CODE" : "VISIBLE_TEXT";
    };
    const flush = (end) => appendRange(ranges, coordinates, visibleStart, end, currentTextState());
    const consume = (end) => {
        cursor = end;
        visibleStart = end;
    };
    const pair = (opening, closing) => {
        opening.matching_tag_id = closing.id;
        closing.matching_tag_id = opening.id;
    };
    while (cursor < text.length) {
        const fence = fenceAt(text, cursor);
        if (fence !== null && currentTextState() === "VISIBLE_TEXT") {
            flush(cursor);
            const end = findFenceEnd(text, fence.opening_end, fence.marker, fence.length, work);
            appendRange(ranges, coordinates, cursor, end, "FENCED_BLOCK");
            consume(end);
            continue;
        }
        if (text.startsWith("<!--", cursor)) {
            flush(cursor);
            const close = text.indexOf("-->", cursor + 4);
            const end = close < 0 ? text.length : close + 3;
            appendRange(ranges, coordinates, cursor, end, "HTML_COMMENT");
            consume(end);
            continue;
        }
        if (text[cursor] === "\\") {
            flush(cursor);
            const delimiter = PAIRS.find(([open]) => text.startsWith(open, cursor + 1));
            const end =
                delimiter === undefined
                    ? nextScalarEnd(text, Math.min(text.length, cursor + 1))
                    : Math.min(text.length, cursor + 1 + delimiter[0].length);
            appendRange(ranges, coordinates, cursor, Math.max(cursor + 1, end), "ESCAPE");
            consume(Math.max(cursor + 1, end));
            continue;
        }
        if (text[cursor] !== "<") {
            cursor = nextScalarEnd(text, cursor);
            continue;
        }
        const tag = parseTag(text, cursor, work);
        if (tag === null) {
            cursor += 1;
            continue;
        }
        flush(cursor);
        if (tag.malformed) {
            appendRange(ranges, coordinates, cursor, text.length, "MALFORMED_TAG_RECOVERY");
            consume(text.length);
            break;
        }
        const parent = stack.at(-1)?.id ?? null;
        const inheritedScope = stack.at(-1)?.scope_owner_tag_id ?? null;
        const token = materializeTag(
            tag,
            coordinates,
            `tag-${tags.length}`,
            parent,
            inheritedScope,
        );
        if (!tag.closing) {
            const ownsScope = definitionScopeAttribute(tag) !== null;
            if (ownsScope) token.scope_owner_tag_id = token.id;
        }
        tags.push(token);
        appendTagRanges(ranges, coordinates, tag);
        const raw = tag.closing ? null : rawState(tag);
        if (!tag.closing && raw !== null && tag.name !== "pre") {
            const found = findRawClose(text, tag.char_end, tag.name, work);
            appendRange(ranges, coordinates, tag.char_end, found.content_end, raw);
            if (found.closing !== null) {
                const closingToken = materializeTag(
                    found.closing,
                    coordinates,
                    `tag-${tags.length}`,
                    parent,
                    inheritedScope,
                );
                tags.push(closingToken);
                pair(token, closingToken);
                appendTagRanges(ranges, coordinates, found.closing);
                consume(found.closing.char_end);
            } else consume(text.length);
            continue;
        }
        if (tag.closing) {
            const named = openingsByName.get(tag.name);
            const opening = named?.at(-1) ?? null;
            if (opening !== null) {
                const index = stackPositions.get(opening);
                token.parent_id = opening.parent_id;
                pair(opening, token);
                const removed = stack.splice(index);
                for (let removedIndex = removed.length - 1; removedIndex >= 0; removedIndex -= 1) {
                    const row = removed[removedIndex];
                    stackPositions.delete(row);
                    const rows = openingsByName.get(row.name);
                    while (rows?.at(-1) === row) rows.pop();
                    if (rows?.length === 0) openingsByName.delete(row.name);
                    if (PROCESSED_ELEMENTS.has(row.name)) processedDepth -= 1;
                    contentStates.delete(row);
                }
            }
        } else if (!tag.self_closing) {
            stackPositions.set(token, stack.length);
            stack.push(token);
            const named = openingsByName.get(token.name) ?? [];
            named.push(token);
            openingsByName.set(token.name, named);
            if (PROCESSED_ELEMENTS.has(token.name)) processedDepth += 1;
            if (raw !== null) contentStates.set(token, raw);
        }
        consume(tag.char_end);
    }
    flush(text.length);
    work.classified_code_units = text.length;
    work.range_rows = ranges.length;
    work.tag_rows = tags.length;
    return { ranges, tags };
}

function rangeRaw(bytes, range) {
    return bytes.subarray(range.start_offset, range.end_offset_exclusive).toString("utf8");
}

function closeIndexes(raw) {
    const result = new Map();
    for (const [, close] of PAIRS) {
        if (result.has(close)) continue;
        const indexes = [];
        let cursor = 0;
        while (cursor <= raw.length - close.length) {
            const found = raw.indexOf(close, cursor);
            if (found < 0) break;
            indexes.push(found);
            cursor = found + Math.max(1, close.length);
        }
        result.set(close, indexes);
    }
    return result;
}

function firstAtOrAfter(indexes, minimum, positions, key) {
    let position = positions.get(key) ?? 0;
    while (position < indexes.length && indexes[position] < minimum) position += 1;
    positions.set(key, position);
    return indexes[position] ?? -1;
}

function candidateIdentity(sourceSha, start, end, type, raw) {
    const preimage = `${sourceSha}\0${start}\0${end}\0${type}\0${raw}`;
    return { id: `candidate-${sha256(Buffer.from(preimage))}`, preimage };
}

const CSS_SINGLE_SHORTHAND = /^'@?[A-Za-z0-9_-]+(?:\(\))?(?:\/@?[A-Za-z0-9_-]+(?:\(\))?)?(?:!![A-Za-z][A-Za-z0-9-]*)?'$/;

function validDelimitedReference(raw, open, close, type) {
    const body = raw.slice(open.length, -close.length).trim();
    if (body.length === 0) return false;
    if (type === "definition") {
        if (/\s\/|\/\s/.test(body)) return false;
        const parts = body.split("/");
        return parts.length <= 2 && parts.every((row) => row.trim().length > 0);
    }
    if (type === "bibliographic") {
        const parts = body.split(/\s+/);
        const target = parts.shift()?.replace(/^!/, "") ?? "";
        if (!/^(?:[A-Za-z0-9][A-Za-z0-9._/-]*|#[A-Za-z0-9_.:-]+)$/.test(target))
            return false;
        return parts.every((modifier) => BIBLIOGRAPHIC_MODIFIERS.has(modifier.toLowerCase()));
    }
    return true;
}

function markupShorthandSettings(coordinates, ranges) {
    const settings = { css: true };
    for (const range of ranges) {
        if (range.state !== "DATABLOCK") continue;
        const text = coordinates.slice(range.start_offset, range.end_offset_exclusive);
        for (const match of text.matchAll(/^\s*Markup Shorthands\s*:\s*([^\r\n]*)/gim)) {
            const fields = match[1].trim().split(/\s+/);
            for (let index = 0; index + 1 < fields.length; index += 2) {
                if (fields[index].toLowerCase() !== "css") continue;
                settings.css = !["no", "none", "false", "off"].includes(fields[index + 1].toLowerCase());
            }
        }
    }
    return settings;
}

function specificationUrl(value, base) {
    try {
        const url = new URL(value, base);
        if (url.protocol !== "http:" && url.protocol !== "https:") return null;
        const csswg = url.hostname === "drafts.csswg.org";
        const w3c = url.hostname === "www.w3.org" && url.pathname.startsWith("/TR/");
        return csswg || w3c ? url.href : null;
    } catch {
        return null;
    }
}

function scanReferences(coordinates, ranges, tags, sourceSha, sourceUrl, settings, work) {
    const candidates = [];
    const dispositions = [];
    const omissions = [];
    const intervalKeys = new Set();
    const ids = new Map();
    const collisions = [];
    const add = (start, end, type, disposition, state, extra = {}, reason = null) => {
        if (end <= start) return;
        const raw = coordinates.slice(start, end);
        const intervalKey = `${start}:${end}:${type}`;
        if (intervalKeys.has(intervalKey)) return;
        intervalKeys.add(intervalKey);
        const identity = candidateIdentity(sourceSha, start, end, type, raw);
        const previous = ids.get(identity.id);
        if (previous !== undefined && previous !== identity.preimage)
            collisions.push({ id: identity.id, first_preimage: previous, second_preimage: identity.preimage });
        ids.set(identity.id, identity.preimage);
        const candidate = {
            id: identity.id,
            id_preimage_sha256: sha256(Buffer.from(identity.preimage)),
            type,
            raw,
            start_offset: start,
            end_offset_exclusive: end,
            state,
            ...extra,
        };
        candidates.push(candidate);
        dispositions.push({
            candidate_id: identity.id,
            start_offset: start,
            end_offset_exclusive: end,
            disposition,
            reason: reason ?? (disposition === "INCLUDED" ? "ELIGIBLE_STATE" : `OPAQUE_${state}`),
        });
    };
    for (const range of ranges) {
        const eligible = REFERENCE_STATES.has(range.state);
        if (!eligible && !OPAQUE_STATES.has(range.state) && range.state !== "ESCAPE") continue;
        const raw = rangeRaw(coordinates.bytes, range);
        work.reference_code_units += raw.length;
        if (range.state === "ESCAPE") {
            const pair = PAIRS.find(([open]) => raw.startsWith(`\\${open}`));
            if (pair !== undefined)
                add(
                    range.start_offset,
                    range.end_offset_exclusive,
                    pair[2],
                    "REVIEWED_EXCLUDED",
                    range.state,
                );
            continue;
        }
        const bytes = byteMap(raw);
        const indexes = closeIndexes(raw);
        const positions = new Map();
        let local = 0;
        while (local < raw.length) {
            let paired = false;
            for (const [open, close, type] of PAIRS) {
                if (!raw.startsWith(open, local)) continue;
                const closeAt = firstAtOrAfter(
                    indexes.get(close),
                    local + open.length,
                    positions,
                    close,
                );
                const end = closeAt < 0 ? raw.length : closeAt + close.length;
                const completeRaw = raw.slice(local, end);
                if (closeAt >= 0 && !validDelimitedReference(completeRaw, open, close, type)) {
                    local = Math.max(local + 1, end);
                    paired = true;
                    break;
                }
                add(
                    range.start_offset + bytes[local],
                    range.start_offset + bytes[end],
                    closeAt < 0 ? "unterminated_reference" : type,
                    closeAt < 0 ? "REVIEWED_EXCLUDED" : eligible ? "INCLUDED" : "REVIEWED_EXCLUDED",
                    range.state,
                );
                local = Math.max(local + 1, end);
                paired = true;
                break;
            }
            if (paired) continue;
            const scheme = /^(?:https?):\/\//i.exec(raw.slice(local));
            if (scheme !== null) {
                const schemeEnd = local + scheme[0].length;
                let end = schemeEnd;
                while (end < raw.length && !/[\s<>"']/.test(raw[end])) end += 1;
                while (end > schemeEnd && /[),.;:!\]}]/.test(raw[end - 1])) end -= 1;
                const value = raw.slice(local, end);
                if (specificationUrl(value, "https://invalid.example/") !== null)
                    add(
                        range.start_offset + bytes[local],
                        range.start_offset + bytes[end],
                        "spec_url",
                        eligible ? "INCLUDED" : "REVIEWED_EXCLUDED",
                        range.state,
                    );
                local = Math.max(local + 1, end);
                continue;
            }
            if (settings.css && raw[local] === "'" && raw[local - 1] !== "'" && raw[local + 1] !== "'") {
                const endQuote = raw.indexOf("'", local + 1);
                if (
                    endQuote > local + 1 &&
                    raw[endQuote + 1] !== "'" &&
                    CSS_SINGLE_SHORTHAND.test(raw.slice(local, endQuote + 1))
                ) {
                    add(
                        range.start_offset + bytes[local],
                        range.start_offset + bytes[endQuote + 1],
                        "css_shorthand_single",
                        eligible ? "INCLUDED" : "REVIEWED_EXCLUDED",
                        range.state,
                    );
                    local = endQuote + 1;
                    continue;
                }
            }
            local = nextScalarEnd(raw, local);
        }
    }
    for (const tag of tags.filter((row) => !row.closing && row.name === "a")) {
        const href = tag.attributes.find((row) => row.name === "href" && row.value !== null);
        if (href === undefined) {
            const target = tag.attributes.find((row) => row.name === "lt" || row.name === "data-lt");
            const type = tag.attributes.find(
                (row) => row.name === "dfn" || row.name === "data-link-type",
            );
            if (target !== undefined || type !== undefined) {
                add(
                    tag.start_offset,
                    tag.end_offset_exclusive,
                    "manual_autolink",
                    "INCLUDED",
                    "TAG",
                    {
                        target_value: target?.value ?? null,
                        link_type: type?.value ?? (type?.name === "dfn" ? "dfn" : null),
                    },
                    "ACTIVE_MANUAL_AUTOLINK",
                );
            }
            continue;
        }
        if (href.value.length === 0) {
            omissions.push({
                type: "href",
                policy: "OMIT_EMPTY_VALUE",
                insertion_offset: href.value_start_offset,
                tag_id: tag.id,
            });
            continue;
        }
        const resolved = specificationUrl(href.value, sourceUrl);
        add(
            href.value_start_offset,
            href.value_end_offset_exclusive,
            resolved === null ? "href_non_specification" : "href",
            resolved === null ? "REVIEWED_EXCLUDED" : "INCLUDED",
            "TAG_ATTRIBUTE",
            { href_value: href.value, href_raw_value: href.raw_value },
            resolved === null
                ? "REVIEWED_EXCLUDED_NON_SPECIFICATION_HREF"
                : "ACTIVE_HREF_SPECIFICATION_REFERENCE",
        );
    }
    candidates.sort(
        (left, right) =>
            left.start_offset - right.start_offset ||
            left.end_offset_exclusive - right.end_offset_exclusive ||
            left.type.localeCompare(right.type),
    );
    dispositions.sort(
        (left, right) =>
            left.start_offset - right.start_offset ||
            left.end_offset_exclusive - right.end_offset_exclusive ||
            left.candidate_id.localeCompare(right.candidate_id),
    );
    work.candidate_rows = candidates.length;
    return { candidates, dispositions, omissions, collisions };
}

function resolveHrefs(candidates, sourceUrl) {
    for (const row of candidates) {
        if (row.type !== "href" && row.type !== "href_non_specification") continue;
        row.resolved_url = specificationUrl(row.href_value, sourceUrl);
    }
}

function tagAttribute(tag, name) {
    return tag.attributes.find((row) => row.name === name)?.value ?? null;
}

function firstRangeEndingAfter(ranges, offset) {
    let low = 0;
    let high = ranges.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (ranges[middle].end_offset_exclusive <= offset) low = middle + 1;
        else high = middle;
    }
    return low;
}

function stateAt(ranges, offset) {
    const range = ranges[firstRangeEndingAfter(ranges, offset)];
    return range?.start_offset <= offset ? range.state : undefined;
}

function projectedText(bytes, ranges, start, end) {
    const chunks = [];
    for (let index = firstRangeEndingAfter(ranges, start); index < ranges.length; index += 1) {
        const range = ranges[index];
        if (range.start_offset >= end) break;
        if (range.end_offset_exclusive <= start) continue;
        if (!REFERENCE_STATES.has(range.state)) continue;
        chunks.push(
            bytes
                .subarray(
                    Math.max(start, range.start_offset),
                    Math.min(end, range.end_offset_exclusive),
                )
                .toString("utf8"),
        );
    }
    return chunks.join("").replace(/\s+/g, " ").trim();
}

function sourceLines(text, coordinates) {
    const lines = [];
    let start = 0;
    while (start < text.length) {
        const newline = text.indexOf("\n", start);
        const end = newline < 0 ? text.length : newline + 1;
        lines.push({
            char_start: start,
            char_end: end,
            start_offset: coordinates.byte(start),
            end_offset_exclusive: coordinates.byte(end),
            raw: text.slice(start, end),
        });
        start = end;
    }
    if (text.length === 0) return [];
    return lines;
}

function headingText(projected, atx = false) {
    const withoutMarker = atx
        ? projected.replace(/^ {0,3}#{1,6}(?:[\t ]+|$)/, "")
        : projected;
    const anchor = /\s*\{#([^}]+)\}\s*$/.exec(withoutMarker);
    let title = (anchor === null ? withoutMarker : withoutMarker.slice(0, anchor.index)).trim();
    if (atx) title = title.replace(/[\t ]+#+[\t ]*$/, "").trim();
    return {
        title,
        anchor: anchor?.[1] ?? null,
    };
}

const LEDGER_FIELDS = Object.freeze([
    "operation_id",
    "kind",
    "source_id",
    "source_url",
    "source_byte_anchor_or_reviewed_locator",
    "normative_family",
    "entry_conditions",
    "outputs",
    "owner_candidate",
    "citation_identity",
    "review_status",
    "required",
]);

function ledgerIntervalKey(row) {
    return `${row.source_id}\0${row.source_url}\0${row.source_byte_anchor_or_reviewed_locator}`;
}

function ledgerJoinKey(row) {
    return `${ledgerIntervalKey(row)}\0${row.kind}\0${row.anchor ?? ""}`;
}

function validateLedger(rows) {
    const errors = [];
    const rejected = new Set();
    const ids = new Map();
    const intervals = new Map();
    const fail = (index, code, detail) => {
        errors.push({ row_index: index, code, detail });
        rejected.add(index);
    };
    for (let index = 0; index < rows.length; index += 1) {
        const row = rows[index];
        if (row === null || typeof row !== "object" || Array.isArray(row)) {
            fail(index, "LEDGER_ROW", "row must be an object");
            continue;
        }
        for (const field of LEDGER_FIELDS)
            if (!Object.hasOwn(row, field)) fail(index, "LEDGER_FIELD", field);
        if (typeof row.operation_id !== "string" || row.operation_id.length === 0)
            fail(index, "LEDGER_ID", "nonempty string required");
        if (!/^[0-9a-f]{64}$/.test(row.source_id ?? ""))
            fail(index, "LEDGER_SOURCE", "source_id must be SHA-256");
        if (typeof row.source_url !== "string") fail(index, "LEDGER_SOURCE_URL", "string required");
        if (!Number.isInteger(row.source_byte_anchor_or_reviewed_locator) || row.source_byte_anchor_or_reviewed_locator < 0)
            fail(index, "LEDGER_LOCATOR", "nonnegative integer required");
        if (!['explicit_algorithm', 'heading_anchor'].includes(row.kind))
            fail(index, "LEDGER_KIND", "unsupported operation kind");
        if (row.kind === "heading_anchor" && (typeof row.anchor !== "string" || row.anchor.length === 0))
            fail(index, "LEDGER_ANCHOR", "heading anchor required");
        if (typeof row.normative_family !== "string" || row.normative_family.length === 0)
            fail(index, "LEDGER_NORMATIVE_FAMILY", "nonempty string required");
        if (!Array.isArray(row.entry_conditions)) fail(index, "LEDGER_ENTRY_CONDITIONS", "array required");
        if (!Array.isArray(row.outputs)) fail(index, "LEDGER_OUTPUTS", "array required");
        if (row.owner_candidate !== null && (typeof row.owner_candidate !== "string" || row.owner_candidate.length === 0))
            fail(index, "LEDGER_OWNER", "null or nonempty source-derived owner id required");
        if (typeof row.citation_identity !== "string" || row.citation_identity.length === 0)
            fail(index, "LEDGER_CITATION", "nonempty string required");
        if (!ACCEPTED_LEDGER_REVIEW_STATUSES.has(row.review_status))
            fail(
                index,
                "LEDGER_REVIEW_STATUS",
                `expected one of ${[...ACCEPTED_LEDGER_REVIEW_STATUSES].join(",")}`,
            );
        if (typeof row.required !== "boolean") fail(index, "LEDGER_REQUIRED", "boolean required");
        if (ids.has(row.operation_id)) {
            fail(index, "LEDGER_ID_DUPLICATE", row.operation_id);
            fail(ids.get(row.operation_id), "LEDGER_ID_DUPLICATE", row.operation_id);
        } else ids.set(row.operation_id, index);
        if (typeof row.source_id === "string" && typeof row.source_url === "string" && Number.isInteger(row.source_byte_anchor_or_reviewed_locator)) {
            const key = ledgerIntervalKey(row);
            if (intervals.has(key)) {
                fail(index, "LEDGER_SOURCE_INTERVAL_DUPLICATE", key);
                fail(intervals.get(key), "LEDGER_SOURCE_INTERVAL_DUPLICATE", key);
            } else intervals.set(key, index);
        }
    }
    errors.sort((left, right) => left.row_index - right.row_index || left.code.localeCompare(right.code));
    return { errors, valid: rows.filter((_, index) => !rejected.has(index)) };
}

function assignContainerPaths(tags, rows, sourceEnd) {
    const byId = new Map(tags.map((row) => [row.id, row]));
    const events = [];
    for (const tag of tags) {
        if (tag.closing || !STRUCTURAL_CONTAINERS.has(tag.name)) continue;
        const close = byId.get(tag.matching_tag_id);
        events.push({ offset: tag.end_offset_exclusive, order: 1, id: tag.id, opening: tag.start_offset });
        events.push({ offset: close?.start_offset ?? sourceEnd, order: 0, id: tag.id, opening: tag.start_offset });
    }
    for (const row of rows) events.push({ offset: row.start_offset, order: 2, row });
    events.sort((left, right) => left.offset - right.offset || left.order - right.order);
    const active = new Map();
    for (const event of events) {
        if (event.order === 0) active.delete(event.id);
        else if (event.order === 1) active.set(event.id, event.opening);
        else
            event.row.container_path = [...active]
                .sort((left, right) => left[1] - right[1])
                .map(([id]) => id);
    }
}

function assignHeadingOwners(headings, candidates) {
    const events = [
        ...headings.map((row) => ({ row, heading: true })),
        ...candidates.map((row) => ({ row, heading: false })),
    ].sort(
        (left, right) =>
            left.row.start_offset - right.row.start_offset ||
            Number(left.heading) - Number(right.heading),
    );
    const lastByPath = new Map();
    for (const event of events) {
        const path = event.row.container_path ?? [];
        if (event.heading) {
            lastByPath.set(path.join("\0"), event.row);
            continue;
        }
        let owner = null;
        for (let length = path.length; length >= 0; length -= 1) {
            owner = lastByPath.get(path.slice(0, length).join("\0")) ?? null;
            if (owner !== null) break;
        }
        event.row.heading_id = owner?.id ?? null;
        event.row.heading_title = owner?.title ?? null;
        event.row.owner_candidate = owner?.id ?? null;
    }
}

function normalizeDefinitionName(value) {
    return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function nearestTagAttribute(tag, byId, names) {
    let current = tag;
    while (current !== null) {
        for (const name of names) {
            const found = current.attributes.find((row) => row.name === name);
            if (found !== undefined) return { tag: current, attribute: found };
        }
        current = current.parent_id === null ? null : byId.get(current.parent_id) ?? null;
    }
    return null;
}

function nearestDefinitionScope(tag, byId) {
    let current = tag;
    while (current !== null) {
        for (const name of ["data-dfn-for", "dfn-for"]) {
            const found = current.attributes.find((row) => row.name === name);
            if (found !== undefined) return { tag: current, attribute: found };
        }
        if (current === tag && current.name === "dfn") {
            const found = current.attributes.find((row) => row.name === "for");
            if (found !== undefined) return { tag: current, attribute: found };
        }
        current = current.parent_id === null ? null : byId.get(current.parent_id) ?? null;
    }
    return null;
}

function structureFor(text, coordinates, ranges, tags, operationLedger, sourceId, sourceUrl, work) {
    const byId = new Map(tags.map((row) => [row.id, row]));
    const headings = [];
    for (const tag of tags.filter((row) => !row.closing && HEADING_NAMES.has(row.name))) {
        const close = byId.get(tag.matching_tag_id) ?? null;
        const end = close?.end_offset_exclusive ?? tag.end_offset_exclusive;
        headings.push({
            id: null,
            level: Number(tag.name.slice(1)),
            start_offset: tag.start_offset,
            end_offset_exclusive: end,
            title: projectedText(
                coordinates.bytes,
                ranges,
                tag.end_offset_exclusive,
                close?.start_offset ?? tag.end_offset_exclusive,
            ),
            anchor: tagAttribute(tag, "id"),
            syntax: "HTML",
        });
    }
    const lines = sourceLines(text, coordinates);
    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        const atx = /^( {0,3})(#{1,6})(?:[\t ]+|$)/.exec(line.raw);
        if (atx !== null) {
            const state = stateAt(ranges, line.start_offset);
            if (state === "VISIBLE_TEXT") {
                const projected = projectedText(
                    coordinates.bytes,
                    ranges,
                    line.start_offset,
                    line.end_offset_exclusive,
                );
                const textRow = headingText(projected, true);
                headings.push({
                    id: null,
                    level: atx[2].length,
                    start_offset: line.start_offset,
                    end_offset_exclusive: line.end_offset_exclusive,
                    ...textRow,
                    syntax: "BIKESHED_ATX",
                });
            }
        }
        if (atx !== null) continue;
        const next = lines[index + 1];
        if (next === undefined || !/^ {0,3}(?:=+|-+)\s*(?:\n|$)/.test(next.raw)) continue;
        const state = stateAt(ranges, line.start_offset);
        const underlineState = stateAt(ranges, next.start_offset);
        if (state !== "VISIBLE_TEXT" || underlineState !== "VISIBLE_TEXT") continue;
        const projected = projectedText(
            coordinates.bytes,
            ranges,
            line.start_offset,
            line.end_offset_exclusive,
        );
        const textRow = headingText(projected);
        if (textRow.title.length === 0) continue;
        headings.push({
            id: null,
            level: /^ {0,3}=/.test(next.raw) ? 1 : 2,
            start_offset: line.start_offset,
            end_offset_exclusive: next.end_offset_exclusive,
            ...textRow,
            syntax: "BIKESHED_SETEXT",
        });
        index += 1;
    }
    headings.sort(
        (left, right) =>
            left.start_offset - right.start_offset || left.end_offset_exclusive - right.end_offset_exclusive,
    );
    for (let index = 0; index < headings.length; index += 1) headings[index].id = `heading-${index}`;
    assignContainerPaths(tags, headings, coordinates.bytes.length);

    const operationCandidates = [];
    for (const tag of tags.filter((row) => !row.closing)) {
        const classes = (tagAttribute(tag, "class") ?? "").split(/\s+/);
        const marked =
            tag.attributes.some((row) => row.name === "algorithm" || row.name === "data-algorithm") ||
            classes.includes("algorithm");
        if (!marked) continue;
        const close = byId.get(tag.matching_tag_id) ?? null;
        operationCandidates.push({
            kind: "explicit_algorithm",
            start_offset: tag.start_offset,
            end_offset_exclusive: close?.end_offset_exclusive ?? tag.end_offset_exclusive,
            raw_opening: coordinates.slice(tag.start_offset, tag.end_offset_exclusive),
            heading_id: null,
            heading_title: null,
            owner_candidate: null,
            container_path: [],
        });
    }
    assignContainerPaths(tags, operationCandidates, coordinates.bytes.length);
    assignHeadingOwners(headings, operationCandidates);
    for (const heading of headings.filter((row) => row.anchor !== null))
        operationCandidates.push({
            kind: "heading_anchor",
            anchor: heading.anchor,
            start_offset: heading.start_offset,
            end_offset_exclusive: heading.end_offset_exclusive,
            raw_opening: coordinates.slice(heading.start_offset, heading.end_offset_exclusive),
            heading_id: heading.id,
            heading_title: heading.title,
            owner_candidate: heading.id,
            container_path: heading.container_path,
        });
    const operations = [];
    const ledgerConflicts = [];
    const used = new Set();
    const ledgerValidation = validateLedger(operationLedger);
    const ledgerByJoin = new Map();
    for (const row of ledgerValidation.valid) {
        const key = ledgerJoinKey(row);
        const rows = ledgerByJoin.get(key) ?? [];
        rows.push(row);
        ledgerByJoin.set(key, rows);
    }
    const claimedRows = new Set();
    for (const candidate of operationCandidates) {
        const key = ledgerJoinKey({
            kind: candidate.kind,
            source_id: sourceId,
            source_url: sourceUrl,
            source_byte_anchor_or_reviewed_locator: candidate.start_offset,
            anchor: candidate.anchor,
        });
        const matches = (ledgerByJoin.get(key) ?? []).filter(
            (row) => row.owner_candidate === null || row.owner_candidate === candidate.owner_candidate,
        );
        if (matches.length > 1) {
            ledgerConflicts.push({
                start_offset: candidate.start_offset,
                operation_ids: matches.map((row) => row.operation_id).sort(),
            });
            continue;
        }
        if (matches.length !== 1) continue;
        const ledger = matches[0];
        if (claimedRows.has(ledger)) {
            ledgerConflicts.push({
                start_offset: candidate.start_offset,
                operation_ids: [ledger.operation_id],
                reason: "LEDGER_ROW_REUSED",
            });
            continue;
        }
        claimedRows.add(ledger);
        used.add(ledger.operation_id);
        operations.push({
            operation_id: ledger.operation_id,
            source: "NORMATIVE_LEDGER_EXACT_LOCATOR",
            owner_resolution:
                ledger.owner_candidate === null ? "REVIEWED_UNRESOLVED" : "SOURCE_MATCHED",
            ledger_evidence: {
                normative_family: ledger.normative_family,
                entry_conditions: ledger.entry_conditions,
                outputs: ledger.outputs,
                owner_candidate: ledger.owner_candidate,
                citation_identity: ledger.citation_identity,
                review_status: ledger.review_status,
                required: ledger.required,
            },
            ...candidate,
        });
    }

    const carriers = [];
    for (const tag of tags.filter(
        (row) =>
            !row.closing &&
            (row.name === "dfn" ||
                (HEADING_NAMES.has(row.name) &&
                    row.attributes.some((attribute) =>
                        ["data-dfn-type", "dfn-type"].includes(attribute.name),
                    ))),
    )) {
        const close = byId.get(tag.matching_tag_id) ?? null;
        const scope = nearestDefinitionScope(tag, byId);
        const scopeTag = scope?.tag ?? null;
        const scopeAttribute = scope?.attribute ?? null;
        const scopes = [...new Set((scopeAttribute?.value ?? "")
            .split(",")
            .map(normalizeDefinitionName)
            .filter(Boolean))].sort();
        const nameAttribute = nearestTagAttribute(tag, byId, ["data-lt", "lt"]);
        const alternates = (nameAttribute?.attribute.value ?? "")
            .split("|")
            .map((row) => row.trim())
            .filter(Boolean);
        const textName = projectedText(
            coordinates.bytes,
            ranges,
            tag.end_offset_exclusive,
            close?.start_offset ?? tag.end_offset_exclusive,
        );
        carriers.push({
            id: `carrier-${sha256(Buffer.from(`${sourceId}\0${tag.start_offset}\0${tag.end_offset_exclusive}`))}`,
            start_offset: tag.start_offset,
            end_offset_exclusive: close?.end_offset_exclusive ?? tag.end_offset_exclusive,
            scopes,
            scope_attribute:
                scopeAttribute === null
                    ? null
                    : {
                          tag_id: scopeTag.id,
                          tag_name: scopeTag.name,
                          name: scopeAttribute.name,
                          value: scopeAttribute.value,
                          raw_value: scopeAttribute.raw_value,
                          normalized_scopes: scopes,
                          value_start_offset: scopeAttribute.value_start_offset,
                          value_end_offset_exclusive: scopeAttribute.value_end_offset_exclusive,
                      },
            names: [...new Set([...alternates, textName].filter(Boolean))],
        });
    }
    work.relation_rows = headings.length + operationCandidates.length + operations.length + carriers.length;
    return {
        headings,
        operations,
        operation_candidates: operationCandidates,
        carriers,
        ledger_contract_errors: ledgerValidation.errors,
        ledger_conflicts: ledgerConflicts,
        ledger_unmatched_ids: ledgerValidation.valid
            .filter((row) => row.required !== false && !used.has(row.operation_id))
            .map((row) => row.operation_id)
            .sort(),
    };
}

function joinDefinitionTargets(candidates, dispositions, carriers) {
    const disposition = new Map(dispositions.map((row) => [row.candidate_id, row.disposition]));
    const carrierIndex = new Map();
    for (const carrier of carriers) {
        const scopes = carrier.scopes.length === 0 ? [null] : carrier.scopes;
        for (const scope of scopes)
            for (const name of carrier.names) {
                const key = `${scope ?? ""}\0${normalizeDefinitionName(name)}`;
                const rows = carrierIndex.get(key) ?? [];
                rows.push(carrier.id);
                carrierIndex.set(key, rows);
            }
    }
    for (const reference of candidates.filter(
        (row) => row.type === "definition" && disposition.get(row.id) === "INCLUDED",
    )) {
        const body = reference.raw.slice(2, -2).trim();
        const slash = body.indexOf("/");
        const scope = slash < 0 ? null : normalizeDefinitionName(body.slice(0, slash));
        const name = normalizeDefinitionName(slash < 0 ? body : body.slice(slash + 1));
        reference.target_form = scope === null ? name : `${scope}/${name}`;
        reference.target_carrier_ids = [...(carrierIndex.get(`${scope ?? ""}\0${name}`) ?? [])].sort();
    }
}

function finalizeWork(work, sourceBytes) {
    const fields = [
        "classified_code_units",
        "raw_searches",
        "tag_code_units",
        "fence_lines",
        "reference_code_units",
        "range_rows",
        "tag_rows",
        "candidate_rows",
        "relation_rows",
    ];
    work.source_utf8_bytes = sourceBytes;
    work.total_instrumented_units = fields.reduce((sum, field) => sum + work[field], 0);
    work.model = "INSTRUMENTED_LOWER_BOUND_NOT_FORMAL_COMPLEXITY_PROOF";
    work.formal_upper_bound_claimed = false;
    return work;
}

function safeInput(text, options) {
    const errors = [];
    let safeText = "";
    try {
        safeText = String(text);
    } catch {
        errors.push({ code: "SOURCE_COERCION_REJECTED" });
    }
    let sourceUrl = "https://invalid.example/Overview.bs";
    let ledgerInput = [];
    if (options !== undefined) {
        if (options === null || (typeof options !== "object" && typeof options !== "function"))
            errors.push({ code: "OPTIONS_OBJECT_REQUIRED" });
        else {
            try {
                if (options.sourceUrl !== undefined) {
                    if (typeof options.sourceUrl === "string") sourceUrl = options.sourceUrl;
                    else errors.push({ code: "SOURCE_URL_STRING_REQUIRED" });
                }
            } catch {
                errors.push({ code: "SOURCE_URL_ACCESS_REJECTED" });
            }
            try {
                if (options.operationLedger !== undefined) ledgerInput = options.operationLedger;
            } catch {
                errors.push({ code: "LEDGER_ACCESS_REJECTED" });
            }
        }
    }
    const operationLedger = [];
    if (!Array.isArray(ledgerInput)) errors.push({ code: "LEDGER_ARRAY_REQUIRED" });
    else {
        let length = 0;
        try {
            length = ledgerInput.length;
        } catch {
            errors.push({ code: "LEDGER_LENGTH_ACCESS_REJECTED" });
        }
        for (let index = 0; index < length; index += 1) {
            try {
                const row = ledgerInput[index];
                if (row === null || typeof row !== "object" || Array.isArray(row)) {
                    operationLedger.push(row);
                    continue;
                }
                const copy = {};
                for (const field of [...LEDGER_FIELDS, "anchor"]) {
                    if (Object.hasOwn(row, field)) copy[field] = row[field];
                }
                operationLedger.push(copy);
            } catch {
                errors.push({ code: "LEDGER_ROW_ACCESS_REJECTED", row_index: index });
                operationLedger.push(null);
            }
        }
    }
    return { safeText, sourceUrl, operationLedger, errors };
}

function stableIdUnion(candidates, operations, carriers, candidateCollisions) {
    const rows = [
        ...candidates.map((row) => ({ id: row.id, namespace: "candidate" })),
        ...operations.map((row) => ({ id: row.operation_id, namespace: "operation" })),
        ...carriers.map((row) => ({ id: row.id, namespace: "carrier" })),
    ];
    const first = new Map();
    const collisions = [...candidateCollisions];
    for (const row of rows) {
        const previous = first.get(row.id);
        if (previous !== undefined)
            collisions.push({ id: row.id, first_namespace: previous, second_namespace: row.namespace });
        else first.set(row.id, row.namespace);
    }
    return { ids: rows.map((row) => row.id), collisions };
}

export function analyzeSource(text, options) {
    const input = safeInput(text, options);
    const safeText = input.safeText;
    const safeSourceUrl = input.sourceUrl;
    const safeLedger = input.operationLedger;
    const coordinates = coordinatesFor(safeText);
    const sourceId = sha256(coordinates.bytes);
    const work = {
        classified_code_units: 0,
        tag_code_units: 0,
        fence_lines: 0,
        raw_searches: 0,
        reference_code_units: 0,
        range_rows: 0,
        tag_rows: 0,
        candidate_rows: 0,
        relation_rows: 0,
    };
    const lexical = classify(safeText, coordinates, work);
    const settings = markupShorthandSettings(coordinates, lexical.ranges);
    const referenceData = scanReferences(
        coordinates,
        lexical.ranges,
        lexical.tags,
        sourceId,
        safeSourceUrl,
        settings,
        work,
    );
    resolveHrefs(referenceData.candidates, safeSourceUrl);
    const structure = structureFor(
        safeText,
        coordinates,
        lexical.ranges,
        lexical.tags,
        safeLedger,
        sourceId,
        safeSourceUrl,
        work,
    );
    joinDefinitionTargets(referenceData.candidates, referenceData.dispositions, structure.carriers);
    const stable = stableIdUnion(
        referenceData.candidates,
        structure.operations,
        structure.carriers,
        referenceData.collisions,
    );
    return {
        schema_version: "value.pi.occurrence-owner-v9-repair3-analysis/v1",
        status: "RED_RESEARCH_REPAIR3_ZERO_CREDIT",
        source: {
            bytes: coordinates.bytes.length,
            sha256: sourceId,
            source_url: safeSourceUrl,
        },
        ranges: lexical.ranges,
        tags: lexical.tags,
        candidates: referenceData.candidates,
        dispositions: referenceData.dispositions,
        omissions: referenceData.omissions,
        headings: structure.headings,
        operations: structure.operations,
        operation_candidates: structure.operation_candidates,
        carriers: structure.carriers,
        ledger_contract_errors: structure.ledger_contract_errors,
        ledger_conflicts: structure.ledger_conflicts,
        ledger_unmatched_ids: structure.ledger_unmatched_ids,
        input_contract_errors: input.errors,
        stable_id_collisions: stable.collisions,
        stable_ids: stable.ids,
        work: finalizeWork(work, coordinates.bytes.length),
        claims: {
            full_source_denominator: false,
            normative_operation_ledger: false,
            formal_complexity_bound: false,
            authenticated_launcher: false,
            publisher: false,
            parser: false,
            production: false,
        },
        credits: {
            denominator: 0,
            semantic: 0,
            operation: 0,
            owner: 0,
            parser: 0,
            production: 0,
        },
    };
}
