const RAW_ELEMENTS = new Set(["script", "style", "xmp"]);
const VOID_ELEMENTS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const RAW_PRE_LANGUAGES = new Set(["css", "html", "idl", "javascript", "js", "webidl"]);

export function isEscaped(text, index) {
    let slashes = 0;
    for (let cursor = index - 1; cursor >= 0 && text[cursor] === "\\"; cursor -= 1) slashes += 1;
    return slashes % 2 === 1;
}

function lineStarts(text) {
    const starts = [0];
    for (let index = 0; index < text.length; index += 1) if (text[index] === "\n") starts.push(index + 1);
    return starts;
}

function lineForCharacter(starts, offset) {
    let low = 0;
    let high = starts.length - 1;
    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (starts[middle] <= offset) low = middle + 1;
        else high = middle - 1;
    }
    return Math.max(1, high + 1);
}

function parseAttributes(raw, absoluteStart, nameEnd) {
    const attributes = [];
    let cursor = nameEnd;
    const terminal = raw.startsWith("</") ? raw.length - 1 : raw.length - (raw.endsWith("/>") ? 2 : 1);
    while (cursor < terminal) {
        while (cursor < terminal && /\s/.test(raw[cursor])) cursor += 1;
        if (cursor >= terminal) break;
        const nameStart = cursor;
        while (cursor < terminal && !/[\s=/>]/.test(raw[cursor])) cursor += 1;
        if (cursor === nameStart) { cursor += 1; continue; }
        const name = raw.slice(nameStart, cursor).toLowerCase();
        while (cursor < terminal && /\s/.test(raw[cursor])) cursor += 1;
        let value = null;
        let valueStart = null;
        let valueEnd = null;
        if (raw[cursor] === "=") {
            cursor += 1;
            while (cursor < terminal && /\s/.test(raw[cursor])) cursor += 1;
            const quote = raw[cursor] === "\"" || raw[cursor] === "'" ? raw[cursor++] : null;
            const start = cursor;
            if (quote === null) while (cursor < terminal && !/[\s>]/.test(raw[cursor])) cursor += 1;
            else {
                while (cursor < terminal && raw[cursor] !== quote) cursor += 1;
            }
            value = raw.slice(start, cursor);
            valueStart = absoluteStart + start;
            valueEnd = absoluteStart + cursor;
            if (quote !== null && raw[cursor] === quote) cursor += 1;
        }
        attributes.push({ name, value, start: absoluteStart + nameStart, end: absoluteStart + cursor, value_start: valueStart, value_end: valueEnd });
    }
    return attributes;
}

export function parseTagAt(text, start) {
    if (text[start] !== "<" || isEscaped(text, start) || text.startsWith("<!--", start) || text.startsWith("<{", start) || text.startsWith("<<", start)) return null;
    let cursor = start + 1;
    const closing = text[cursor] === "/";
    if (closing) cursor += 1;
    const nameStart = cursor;
    if (!/[A-Za-z]/.test(text[cursor] ?? "")) return null;
    cursor += 1;
    while (/[A-Za-z0-9:-]/.test(text[cursor] ?? "")) cursor += 1;
    const name = text.slice(nameStart, cursor).toLowerCase();
    const nameEndRelative = cursor - start;
    let quote = null;
    for (; cursor < text.length; cursor += 1) {
        const character = text[cursor];
        if (quote !== null) {
            if (character === quote) quote = null;
            continue;
        }
        if (character === "\"" || character === "'") { quote = character; continue; }
        if (character !== ">") continue;
        const end = cursor + 1;
        const raw = text.slice(start, end);
        const selfClosing = /\/\s*>$/.test(raw) || VOID_ELEMENTS.has(name);
        return { name, closing, self_closing: selfClosing, start, end, raw, attributes: closing ? [] : parseAttributes(raw, start, nameEndRelative) };
    }
    return null;
}

function attribute(tag, name) {
    return tag.attributes.find((row) => row.name === name)?.value ?? null;
}

function isRawPre(tag) {
    if (tag.name !== "pre" || tag.closing) return false;
    const highlight = (attribute(tag, "highlight") ?? "").toLowerCase();
    if (highlight !== "" && !["no", "none", "false"].includes(highlight)) return true;
    return (attribute(tag, "class") ?? "").split(/\s+/).map((name) => name.toLowerCase()).some((name) => RAW_PRE_LANGUAGES.has(name.replace(/^lang-/, "")) && name.startsWith("lang-"));
}

function rawState(tag) {
    if (RAW_ELEMENTS.has(tag.name)) return `RAW_${tag.name.toUpperCase()}`;
    if (isRawPre(tag)) return "RAW_PRE_HIGHLIGHTED";
    return null;
}

function findRawClosing(text, from, name) {
    const lower = text.toLowerCase();
    let cursor = lower.indexOf(`</${name}`, from);
    while (cursor >= 0) {
        const tag = parseTagAt(text, cursor);
        if (tag !== null && tag.closing && tag.name === name) return tag;
        cursor = lower.indexOf(`</${name}`, cursor + 2);
    }
    return null;
}

function appendRange(ranges, start, end, state, reason = null) {
    if (end <= start) return;
    const previous = ranges[ranges.length - 1];
    if (previous !== undefined && previous.end === start && previous.state === state && previous.reason === reason) previous.end = end;
    else ranges.push({ start, end, state, reason });
}

export function classifyBikeshed(text) {
    const ranges = [];
    const tags = [];
    const exclusions = [];
    const starts = lineStarts(text);
    let cursor = 0;
    let textStart = 0;
    let codeDepth = 0;
    const flushText = (end) => {
        appendRange(ranges, textStart, end, codeDepth > 0 ? "BIKESHED_CODE" : "BIKESHED_TEXT");
    };
    while (cursor < text.length) {
        if (text.startsWith("<!--", cursor) && !isEscaped(text, cursor)) {
            flushText(cursor);
            const close = text.indexOf("-->", cursor + 4);
            const end = close < 0 ? text.length : close + 3;
            appendRange(ranges, cursor, end, "HTML_COMMENT", "REVIEWED_EXCLUDED_COMMENT");
            exclusions.push({ start: cursor, end, state: "HTML_COMMENT", reason: "REVIEWED_EXCLUDED_COMMENT", closed: close >= 0 });
            cursor = end;
            textStart = end;
            continue;
        }
        if (text[cursor] !== "<") { cursor += 1; continue; }
        const tag = parseTagAt(text, cursor);
        if (tag === null) { cursor += 1; continue; }
        flushText(cursor);
        tag.line = lineForCharacter(starts, tag.start);
        tag.processing_context = codeDepth > 0 ? "BIKESHED_CODE_TAG" : "ACTIVE_HTML_TAG";
        tags.push(tag);
        appendRange(ranges, tag.start, tag.end, "ACTIVE_HTML_TAG");
        const state = rawState(tag);
        if (!tag.closing && !tag.self_closing && state !== null) {
            const closing = findRawClosing(text, tag.end, tag.name);
            const contentEnd = closing?.start ?? text.length;
            appendRange(ranges, tag.end, contentEnd, state, `REVIEWED_EXCLUDED_${state}`);
            if (contentEnd > tag.end) exclusions.push({ start: tag.end, end: contentEnd, state, reason: `REVIEWED_EXCLUDED_${state}`, closed: closing !== null });
            if (closing !== null) {
                closing.line = lineForCharacter(starts, closing.start);
                closing.processing_context = "ACTIVE_HTML_TAG";
                tags.push(closing);
                appendRange(ranges, closing.start, closing.end, "ACTIVE_HTML_TAG");
                cursor = closing.end;
                textStart = closing.end;
            } else {
                cursor = text.length;
                textStart = text.length;
            }
            continue;
        }
        if (tag.name === "code" || tag.name === "samp") {
            if (tag.closing) codeDepth = Math.max(0, codeDepth - 1);
            else if (!tag.self_closing) codeDepth += 1;
        }
        cursor = tag.end;
        textStart = tag.end;
    }
    flushText(text.length);
    const rangeAt = (offset) => {
        let low = 0;
        let high = ranges.length - 1;
        while (low <= high) {
            const middle = Math.floor((low + high) / 2);
            const range = ranges[middle];
            if (offset < range.start) high = middle - 1;
            else if (offset >= range.end) low = middle + 1;
            else return range;
        }
        return null;
    };
    const overlapsState = (start, end, predicate) => ranges.some((range) => range.start < end && range.end > start && predicate(range));
    const stateAt = (offset) => rangeAt(offset)?.state ?? "BIKESHED_TEXT";
    const activeTextAt = (offset) => ["BIKESHED_TEXT", "BIKESHED_CODE"].includes(stateAt(offset));
    const activeStructureAt = (offset) => ["BIKESHED_TEXT", "BIKESHED_CODE", "ACTIVE_HTML_TAG"].includes(stateAt(offset));
    const dispositionAt = (start, end) => {
        const suppressed = ranges.find((range) => range.start < end && range.end > start && !["BIKESHED_TEXT", "BIKESHED_CODE", "ACTIVE_HTML_TAG"].includes(range.state));
        if (suppressed !== undefined) return { disposition: "REVIEWED_EXCLUDED", reason: suppressed.reason, state: suppressed.state };
        return { disposition: "INCLUDED", reason: "ACTIVE_LEXICAL_STATE", state: stateAt(start) };
    };
    const visibleText = (start, end) => ranges
        .filter((range) => range.start < end && range.end > start && ["BIKESHED_TEXT", "BIKESHED_CODE"].includes(range.state))
        .map((range) => text.slice(Math.max(start, range.start), Math.min(end, range.end)))
        .join(" ");
    return { text, ranges, tags, exclusions, line_starts: starts, lineForCharacter: (offset) => lineForCharacter(starts, offset), rangeAt, stateAt, activeTextAt, activeStructureAt, overlapsState, dispositionAt, visibleText };
}

export function attributeToken(tag, name) {
    return tag.attributes.find((row) => row.name === name.toLowerCase()) ?? null;
}
