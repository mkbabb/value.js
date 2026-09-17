import { createHash } from "node:crypto";

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export const gitBlobOid = (bytes) => createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");

export const byteSort = (left, right) => Buffer.from(String(left)).compare(Buffer.from(String(right)));

export const uniqueSorted = (values) => [...new Set(values)].sort(byteSort);

export function decodeEntitiesOnce(value) {
    return value
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, "\"")
        .replace(/&#39;|&apos;/gi, "'");
}

export function plainText(value) {
    return decodeEntitiesOnce(value)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function canonicalName(value) {
    return decodeEntitiesOnce(value).replace(/\s+/g, " ").trim().toLowerCase();
}

export function canonicalGrammarName(value) {
    let result = decodeEntitiesOnce(value).replace(/\s+/g, " ").trim();
    if (result.startsWith("<<") && result.endsWith(">>")) result = result.slice(2, -2);
    if (result.startsWith("<") && result.endsWith(">")) result = result.slice(1, -1);
    return result.trim().toLowerCase();
}

export function legacySlug(value) {
    return plainText(value)
        .toLowerCase()
        .replace(/[^a-z0-9@+.-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "unnamed";
}

export function splitLines(bytes) {
    const lines = [];
    let start = 0;
    for (let cursor = 0; cursor < bytes.length; cursor += 1) {
        if (bytes[cursor] !== 0x0a) continue;
        const contentEnd = cursor > start && bytes[cursor - 1] === 0x0d ? cursor - 1 : cursor;
        lines.push({
            line: lines.length + 1,
            start,
            content_end: contentEnd,
            end: cursor + 1,
            text: bytes.subarray(start, contentEnd).toString("utf8"),
        });
        start = cursor + 1;
    }
    if (start < bytes.length || bytes.length === 0) {
        lines.push({
            line: lines.length + 1,
            start,
            content_end: bytes.length,
            end: bytes.length,
            text: bytes.subarray(start).toString("utf8"),
        });
    }
    return lines;
}

export function lineForOffset(lines, offset) {
    let low = 0;
    let high = lines.length - 1;
    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (offset < lines[middle].start) high = middle - 1;
        else if (offset >= lines[middle].end && middle + 1 < lines.length) low = middle + 1;
        else return lines[middle].line;
    }
    return Math.max(1, Math.min(lines.length, low + 1));
}

export function attribute(opening, name) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp(`\\b${escaped}\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))`, "i").exec(opening);
    return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

export function classes(opening) {
    return uniqueSorted((attribute(opening, "class") ?? "").split(/\s+/).filter(Boolean).map((item) => item.toLowerCase()));
}

export function exactSlice(bytes, lines, startIndex, endIndex) {
    const start = lines[startIndex].start;
    const end = lines[endIndex].end;
    const raw = bytes.subarray(start, end);
    return {
        start_line: startIndex + 1,
        end_line: endIndex + 1,
        start_offset: start,
        end_offset_exclusive: end,
        raw_slice_bytes: raw.length,
        raw_slice_sha256: sha256(raw),
    };
}

export function stableId(prefix, fields, length = 24) {
    return `${prefix}-${sha256(Buffer.from(fields.join("\0"), "utf8")).slice(0, length)}`;
}
