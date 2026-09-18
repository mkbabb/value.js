import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, openSync, closeSync, fsyncSync, readFileSync, renameSync, rmdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
export const byteSort = (left, right) => Buffer.from(String(left)).compare(Buffer.from(String(right)));
export const uniqueSorted = (values) => [...new Set(values)].sort(byteSort);
export const canonicalBytes = (value) => Buffer.from(`${JSON.stringify(value)}\n`, "utf8");

export function gitBlobOid(bytes) {
    return createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

export function decodeEntitiesOnce(value) {
    return value
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, "\"")
        .replace(/&#39;|&apos;/gi, "'");
}

export function plainText(value) {
    return decodeEntitiesOnce(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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
    return plainText(value).toLowerCase().replace(/[^a-z0-9@+.-]+/g, "-").replace(/^-+|-+$/g, "") || "unnamed";
}

export function stableId(prefix, fields, length = 24) {
    return `${prefix}-${sha256(Buffer.from(fields.join("\0"), "utf8")).slice(0, length)}`;
}

export function splitLines(bytes) {
    const lines = [];
    let start = 0;
    for (let cursor = 0; cursor < bytes.length; cursor += 1) {
        if (bytes[cursor] !== 0x0a) continue;
        const contentEnd = cursor > start && bytes[cursor - 1] === 0x0d ? cursor - 1 : cursor;
        lines.push({ line: lines.length + 1, start, content_end: contentEnd, end: cursor + 1, text: bytes.subarray(start, contentEnd).toString("utf8") });
        start = cursor + 1;
    }
    if (start < bytes.length || bytes.length === 0) lines.push({ line: lines.length + 1, start, content_end: bytes.length, end: bytes.length, text: bytes.subarray(start).toString("utf8") });
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
    return { start_line: startIndex + 1, end_line: endIndex + 1, start_offset: start, end_offset_exclusive: end, raw_slice_bytes: raw.length, raw_slice_sha256: sha256(raw) };
}

export class StringInterner {
    #values = new Set();
    #indexes = null;
    add(value) {
        if (value !== null && value !== undefined) this.#values.add(String(value));
        return value;
    }
    freeze() {
        const values = [...this.#values].sort(byteSort);
        this.#indexes = new Map(values.map((value, index) => [value, index]));
        return values;
    }
    index(value) {
        if (value === null || value === undefined) return null;
        if (this.#indexes === null || !this.#indexes.has(String(value))) throw new Error(`string not interned: ${value}`);
        return this.#indexes.get(String(value));
    }
}

export function durableWriteBundle(manifestPath, shardDirectoryPath, manifestBytes, shardBytesByName) {
    const absoluteManifest = resolve(manifestPath);
    const absoluteShardDirectory = resolve(shardDirectoryPath);
    const parent = dirname(absoluteManifest);
    if (dirname(absoluteShardDirectory) !== parent) throw new Error("manifest and shard directory must share a parent for durable staged publication");
    mkdirSync(parent, { recursive: true });
    const temporaryRoot = mkdtempSync(join(parent, ".occurrence-owner-v6.tmp-"));
    const temporaryShardDirectory = join(temporaryRoot, "shards");
    mkdirSync(temporaryShardDirectory);
    const syncPath = (path) => {
        const descriptor = openSync(path, "r");
        try { fsyncSync(descriptor); } finally { closeSync(descriptor); }
    };
    for (const [name, bytes] of shardBytesByName) {
        const path = join(temporaryShardDirectory, name);
        writeFileSync(path, bytes, { flag: "wx" });
        syncPath(path);
    }
    const temporaryManifest = join(temporaryRoot, "manifest.json");
    writeFileSync(temporaryManifest, manifestBytes, { flag: "wx" });
    syncPath(temporaryManifest);
    syncPath(temporaryShardDirectory);
    syncPath(temporaryRoot);
    renameSync(temporaryShardDirectory, absoluteShardDirectory);
    syncPath(parent);
    renameSync(temporaryManifest, absoluteManifest);
    syncPath(parent);
    rmdirSync(temporaryRoot);
    syncPath(parent);
}

export function exactIdentity(path, repoRoot = process.cwd()) {
    const bytes = readFileSync(resolve(repoRoot, path));
    return { repo_relative_path: path, bytes: bytes.length, sha256: sha256(bytes) };
}

