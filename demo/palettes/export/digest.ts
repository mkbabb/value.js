// V.W51 (F5) — domain-separated digests + canonical snapshot bytes.
// Byte authority: Appendix W51 §1. SHA-256 comes from WebCrypto, which is
// byte-identical in Node 20+ and every browser engine (V8/SpiderMonkey/JSC),
// so the digests are cross-engine stable by construction.

import { concatBytes, toHex, uint32be, uint64be, utf8 } from "./bytes";
import { canonicalizeJson } from "./rfc8785";
import type { CanonicalNamedColor, ExportSnapshot } from "./types";

async function sha256(bytes: Uint8Array): Promise<Uint8Array> {
    // Copy into a fresh ArrayBuffer-backed view so the argument is a concrete
    // `BufferSource` (not `Uint8Array<ArrayBufferLike>`, which may be shared).
    const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
    return new Uint8Array(digest);
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
    return toHex(await sha256(bytes));
}

/**
 * Appendix §1: the Domain's exact canonical content bytes for the ordered
 * colours — `UTF8(RFC8785({colors:[{a,c,h,l,name},...],schema:"value.palette-colors/v1"}))`.
 * (RFC 8785 sorts keys, so the literal `{a,c,h,l,name}` order is informative.)
 */
export function contentBytes(colors: readonly CanonicalNamedColor[]): Uint8Array {
    const value = {
        colors: colors.map((color) => ({
            a: color.a,
            c: color.c,
            h: color.h,
            l: color.l,
            name: color.name,
        })),
        schema: "value.palette-colors/v1",
    };
    return utf8(canonicalizeJson(value));
}

/**
 * Appendix §1: `contentDigest = lowerhex(SHA-256("value.js/palette-content/v1"
 * || 0x00 || uint32be(len) || contentBytes))`, computed from the ordered
 * colours (never trusted from a stored object).
 */
export async function computeContentDigest(
    colors: readonly CanonicalNamedColor[],
): Promise<string> {
    const cb = contentBytes(colors);
    return sha256Hex(
        concatBytes([
            utf8("value.js/palette-content/v1"),
            new Uint8Array([0x00]),
            uint32be(cb.length),
            cb,
        ]),
    );
}

/** Appendix §1: `snapshotBytes = UTF8(RFC8785(ExportSnapshot))` — no BOM/ws/LF. */
export function snapshotBytes(snapshot: ExportSnapshot): Uint8Array {
    return utf8(canonicalizeJson(snapshot));
}

/**
 * Appendix §1: `snapshotDigest = lowerhex(SHA-256("value.js/export-snapshot/v1"
 * || 0x00 || uint64be(byteLength(snapshotBytes)) || snapshotBytes))`.
 */
export async function computeSnapshotDigest(bytes: Uint8Array): Promise<string> {
    return sha256Hex(
        concatBytes([
            utf8("value.js/export-snapshot/v1"),
            new Uint8Array([0x00]),
            uint64be(bytes.length),
            bytes,
        ]),
    );
}
