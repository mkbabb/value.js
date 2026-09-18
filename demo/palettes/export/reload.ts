// V.W51 (F5) — the PURE reload-identity core. Byte authority: Appendix W51 §1/§8.
//
// This is the byte-level half of the reload contract and is buildable/provable
// pre-mount under L8: given the stored `snapshotBytes` it rejects duplicate keys,
// validates the closed atom/source union, recomputes the content digest from
// `orderedNamedColors`, REQUIRES canonical reserialization to equal the stored
// bytes, then verifies the domain-separated snapshot digest — any mismatch is
// terminal `snapshot_corrupt`. The routed seat half (the IndexedDB
// ExportOperation record + Prepare→Download activation + Blob/URL/anchor lease)
// is W50/W44-gated and is NOT implemented here.

import { snapshotBytes, computeContentDigest, computeSnapshotDigest } from "./digest";
import type { CanonicalNamedColor, ExportSnapshot, ExportTag, SnapshotSource } from "./types";

export type ReloadResult =
    | { readonly ok: true; readonly snapshot: ExportSnapshot; readonly snapshotDigest: string }
    | { readonly ok: false; readonly failureCode: "snapshot_corrupt"; readonly reason: string };

function fail(reason: string): ReloadResult {
    return { ok: false, failureCode: "snapshot_corrupt", reason };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(obj: Record<string, unknown>, keys: readonly string[]): boolean {
    const actual = Object.keys(obj);
    if (actual.length !== keys.length) return false;
    for (const k of keys) if (!Object.prototype.hasOwnProperty.call(obj, k)) return false;
    return true;
}

function isUint(value: unknown, max: number): value is number {
    return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 && value <= max;
}

function utf8ByteLength(text: string): number {
    return new TextEncoder().encode(text).length;
}

function validateSource(value: unknown): SnapshotSource | null {
    if (!isPlainObject(value)) return null;
    const kind = value.sourceKind;
    if (kind === "device-draft") {
        if (!hasExactKeys(value, ["sourceKind", "deviceDraftId", "deviceDraftRevision"])) return null;
        if (typeof value.deviceDraftId !== "string") return null;
        if (!isUint(value.deviceDraftRevision, 9007199254740991) || value.deviceDraftRevision < 1) {
            return null;
        }
        return {
            sourceKind: "device-draft",
            deviceDraftId: value.deviceDraftId,
            deviceDraftRevision: value.deviceDraftRevision,
        };
    }
    if (kind === "workspace") {
        const withBase = hasExactKeys(value, [
            "sourceKind",
            "paletteId",
            "slug",
            "workspaceId",
            "workspaceRevision",
            "basedOnReleaseId",
        ]);
        const withoutBase = hasExactKeys(value, [
            "sourceKind",
            "paletteId",
            "slug",
            "workspaceId",
            "workspaceRevision",
        ]);
        if (!withBase && !withoutBase) return null;
        if (typeof value.paletteId !== "string") return null;
        if (typeof value.slug !== "string") return null;
        if (typeof value.workspaceId !== "string") return null;
        if (!isUint(value.workspaceRevision, 9007199254740991) || value.workspaceRevision < 1) {
            return null;
        }
        if (withBase && typeof value.basedOnReleaseId !== "string") return null;
        const source: SnapshotSource = {
            sourceKind: "workspace",
            paletteId: value.paletteId,
            slug: value.slug,
            workspaceId: value.workspaceId,
            workspaceRevision: value.workspaceRevision,
            ...(withBase ? { basedOnReleaseId: value.basedOnReleaseId as string } : {}),
        };
        return source;
    }
    if (kind === "release") {
        if (!hasExactKeys(value, ["sourceKind", "paletteId", "slug", "releaseId", "releaseNo"])) {
            return null;
        }
        if (typeof value.paletteId !== "string") return null;
        if (typeof value.slug !== "string") return null;
        if (typeof value.releaseId !== "string") return null;
        if (!isUint(value.releaseNo, 2147483647) || value.releaseNo < 1) return null;
        return {
            sourceKind: "release",
            paletteId: value.paletteId,
            slug: value.slug,
            releaseId: value.releaseId,
            releaseNo: value.releaseNo,
        };
    }
    return null;
}

function validateColor(value: unknown): CanonicalNamedColor | null {
    if (!isPlainObject(value)) return null;
    if (!hasExactKeys(value, ["name", "l", "c", "h", "a"])) return null;
    if (value.name !== null && typeof value.name !== "string") return null;
    if (!isUint(value.l, 100000)) return null; // lightness: 0..100%
    if (!isUint(value.c, 1000000)) return null; // chroma (generous cap)
    if (!isUint(value.h, 360000)) return null; // hue: 0..360°
    if (!isUint(value.a, 1000000)) return null; // alpha: 0..1
    return { name: value.name, l: value.l, c: value.c, h: value.h, a: value.a };
}

function validateTags(value: unknown): ExportTag[] | null {
    if (!Array.isArray(value)) return null;
    if (value.length > 10) return null;
    const tags: ExportTag[] = [];
    let previousId: string | null = null;
    const seen = new Set<string>();
    for (const entry of value) {
        if (!isPlainObject(entry)) return null;
        if (!hasExactKeys(entry, ["tagId", "label"])) return null;
        if (typeof entry.tagId !== "string" || typeof entry.label !== "string") return null;
        if (seen.has(entry.tagId)) return null; // unique
        if (previousId !== null && entry.tagId <= previousId) return null; // ascending ASCII
        seen.add(entry.tagId);
        previousId = entry.tagId;
        tags.push({ tagId: entry.tagId, label: entry.label });
    }
    return tags;
}

/**
 * Validate + verify stored snapshot bytes. `expectedSnapshotDigest`, when
 * supplied by the operation key, is verified for equality; the computed digest
 * is always returned.
 */
export async function reloadSnapshot(
    stored: Uint8Array,
    expectedSnapshotDigest?: string,
): Promise<ReloadResult> {
    let text: string;
    try {
        text = new TextDecoder("utf-8", { fatal: true }).decode(stored);
    } catch {
        return fail("stored bytes are not valid UTF-8");
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        return fail("stored bytes are not JSON");
    }
    if (!isPlainObject(parsed)) return fail("snapshot is not a JSON object");
    if (
        !hasExactKeys(parsed, [
            "schema",
            "source",
            "displayName",
            "orderedNamedColors",
            "canonicalTags",
            "contentDigest",
        ])
    ) {
        return fail("snapshot has unknown/missing top-level keys");
    }
    if (parsed.schema !== "value.export-snapshot/v1") return fail("wrong snapshot schema");

    const source = validateSource(parsed.source);
    if (source === null) return fail("invalid source union");

    if (typeof parsed.displayName !== "string") return fail("displayName is not a string");
    const displayScalars = [...parsed.displayName].length;
    if (
        displayScalars < 1 ||
        displayScalars > 100 ||
        utf8ByteLength(parsed.displayName) > 400
    ) {
        return fail("displayName out of Domain bounds");
    }

    if (!Array.isArray(parsed.orderedNamedColors)) return fail("orderedNamedColors is not an array");
    if (parsed.orderedNamedColors.length < 1 || parsed.orderedNamedColors.length > 50) {
        return fail("orderedNamedColors count out of 1..50");
    }
    const colors: CanonicalNamedColor[] = [];
    for (const raw of parsed.orderedNamedColors) {
        const color = validateColor(raw);
        if (color === null) return fail("invalid CanonicalNamedColor atom");
        colors.push(color);
    }

    const tags = validateTags(parsed.canonicalTags);
    if (tags === null) return fail("invalid canonicalTags");

    if (typeof parsed.contentDigest !== "string" || !/^[0-9a-f]{64}$/.test(parsed.contentDigest)) {
        return fail("contentDigest is not 64 lowercase hex");
    }

    // Recompute content digest from the ordered colours (never trusted).
    const contentDigest = await computeContentDigest(colors);
    if (contentDigest !== parsed.contentDigest) return fail("contentDigest mismatch");

    const snapshot: ExportSnapshot = {
        schema: "value.export-snapshot/v1",
        source,
        displayName: parsed.displayName,
        orderedNamedColors: colors,
        canonicalTags: tags,
        contentDigest: parsed.contentDigest,
    };

    // Require canonical reserialization to equal the stored bytes. This subsumes
    // duplicate-key / key-reorder / whitespace / noncanonical-number rejection.
    const reserialized = snapshotBytes(snapshot);
    if (reserialized.length !== stored.length) return fail("reserialization length mismatch");
    for (let i = 0; i < reserialized.length; i++) {
        if (reserialized[i] !== stored[i]) return fail("reserialization byte mismatch");
    }

    const snapshotDigest = await computeSnapshotDigest(stored);
    if (expectedSnapshotDigest !== undefined && expectedSnapshotDigest !== snapshotDigest) {
        return fail("snapshot digest mismatch");
    }

    return { ok: true, snapshot, snapshotDigest };
}
