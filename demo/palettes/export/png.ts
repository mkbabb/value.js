// V.W51 (F5) — the SOLE authored PNG encoder. Byte authority: Appendix W51 §7.
//
// PNG is deterministic client-side rasterization, NOT browser canvas
// serialization. The immutable Value4 `/color` `toRgba8({gamut:"clip"})` (W8) is
// the sole matrix/transfer/clipping/ties-even/alpha authority; this file owns
// ONLY raster layout and the frozen PNG/DEFLATE/chunk/checksum framing. There is
// no CSS-string reparse, copied coefficient, trig/table program, canvas/platform
// converter, alternate helper or fallback. Changing colour tuples reopens W8;
// changing framing regenerates the PNG goldens as a contract change.

import { oklch, toRgba8 } from "@mkbabb/value.js/color";
import { concatBytes, utf8 } from "./bytes";
import type { CanonicalNamedColor, ExportSnapshot } from "./types";

const WIDTH = 1200;
const HEIGHT = 240;
const ROW_BYTES = WIDTH * 4; // 4800
const RAW_LEN = HEIGHT * (1 + ROW_BYTES); // 1,152,240

export type PngResult =
    | { readonly ok: true; readonly bytes: Uint8Array }
    | { readonly ok: false; readonly failureCode: "serializer_contract" };

const PNG_SIGNATURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// ── W8-owned colour conversion ────────────────────────────────────────────────

/**
 * Appendix §7: construct the typed `oklch(l/100000, c/1000000, h/1000,
 * a/1000000)` value and invoke exactly one packed `toRgba8(...,{gamut:"clip"})`.
 * A typed `ColorIssue` becomes the terminal `serializer_contract` failure.
 */
function atomToRgba8(
    atom: CanonicalNamedColor,
): readonly [number, number, number, number] | null {
    const color = oklch(atom.l / 100000, atom.c / 1000000, atom.h / 1000, atom.a / 1000000);
    if (!color.ok) return null;
    const rgba = toRgba8(color.value, { gamut: "clip" });
    if (!rgba.ok) return null;
    return rgba.value;
}

// ── raster ────────────────────────────────────────────────────────────────────

/**
 * One 4800-byte RGBA8 row: colour `i` among `N` fills the half-open span
 * `[floor(i·1200/N), floor((i+1)·1200/N))`; the final span ends at 1200.
 */
function rasterRow(
    rgbaByColor: readonly (readonly [number, number, number, number])[],
): Uint8Array {
    const n = rgbaByColor.length;
    const row = new Uint8Array(ROW_BYTES);
    for (let i = 0; i < n; i++) {
        const start = Math.floor((i * WIDTH) / n);
        const end = Math.floor(((i + 1) * WIDTH) / n);
        const [r, g, b, a] = rgbaByColor[i]!;
        for (let x = start; x < end; x++) {
            const o = x * 4;
            row[o] = r;
            row[o + 1] = g;
            row[o + 2] = b;
            row[o + 3] = a;
        }
    }
    return row;
}

/** 240 repetitions of filter byte 0x00 (None) followed by the row. */
function rawPayload(row: Uint8Array): Uint8Array {
    const payload = new Uint8Array(RAW_LEN);
    for (let y = 0; y < HEIGHT; y++) {
        const o = y * (1 + ROW_BYTES);
        payload[o] = 0x00; // filter type: None
        payload.set(row, o + 1);
    }
    return payload;
}

// ── checksums ──────────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        table[n] = c >>> 0;
    }
    return table;
})();

/** CRC-32, IEEE 802.3, over type+data. */
function crc32(data: Uint8Array): number {
    let c = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        c = CRC_TABLE[(c ^ data[i]!) & 0xff]! ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
}

/** Adler-32 of the raw payload. */
function adler32(data: Uint8Array): number {
    const MOD = 65521;
    let a = 1;
    let b = 0;
    for (let i = 0; i < data.length; i++) {
        a = (a + data[i]!) % MOD;
        b = (b + a) % MOD;
    }
    return (((b << 16) | a) >>> 0);
}

// ── DEFLATE (stored blocks) + zlib framing ─────────────────────────────────────

/**
 * A zlib stream (CMF/FLG 0x78 0x01) whose DEFLATE body is greedy maximal
 * stored-block partitioning of the raw payload: seventeen 65,535-byte blocks and
 * one 38,145-byte remainder (eighteen blocks). Non-final headers are 0x00 with
 * LEN=`ff ff`/NLEN=`00 00`; the final header is 0x01 with LEN=`01 95`/NLEN=`fe 6a`.
 * Adler-32 of the whole raw payload follows in network byte order.
 */
function zlibStored(raw: Uint8Array): Uint8Array {
    const MAX = 65535;
    const blockCount = Math.ceil(raw.length / MAX);
    // 2 zlib header + per block (1 header + 2 LEN + 2 NLEN + len data) + 4 adler.
    const total = 2 + blockCount * 5 + raw.length + 4;
    const out = new Uint8Array(total);
    let p = 0;
    out[p++] = 0x78; // CMF
    out[p++] = 0x01; // FLG

    let offset = 0;
    while (offset < raw.length) {
        const len = Math.min(MAX, raw.length - offset);
        const isFinal = offset + len >= raw.length;
        out[p++] = isFinal ? 0x01 : 0x00; // BFINAL + BTYPE(stored), byte-aligned
        out[p++] = len & 0xff; // LEN low
        out[p++] = (len >>> 8) & 0xff; // LEN high
        const nlen = ~len & 0xffff;
        out[p++] = nlen & 0xff; // NLEN low
        out[p++] = (nlen >>> 8) & 0xff; // NLEN high
        out.set(raw.subarray(offset, offset + len), p);
        p += len;
        offset += len;
    }

    const adler = adler32(raw);
    out[p++] = (adler >>> 24) & 0xff;
    out[p++] = (adler >>> 16) & 0xff;
    out[p++] = (adler >>> 8) & 0xff;
    out[p] = adler & 0xff;
    return out;
}

// ── chunk framing ───────────────────────────────────────────────────────────────

function chunk(type: string, data: Uint8Array): Uint8Array {
    const typeBytes = utf8(type); // ASCII 4-byte chunk type
    const out = new Uint8Array(4 + 4 + data.length + 4);
    const dv = new DataView(out.buffer);
    dv.setUint32(0, data.length, false);
    out.set(typeBytes, 4);
    out.set(data, 8);
    dv.setUint32(8 + data.length, crc32(concatBytes([typeBytes, data])), false);
    return out;
}

function ihdr(): Uint8Array {
    const data = new Uint8Array(13);
    const dv = new DataView(data.buffer);
    dv.setUint32(0, WIDTH, false);
    dv.setUint32(4, HEIGHT, false);
    data[8] = 8; // bit depth
    data[9] = 6; // colour type: RGBA
    data[10] = 0; // compression
    data[11] = 0; // filter
    data[12] = 0; // interlace
    return data;
}

const SRGB_DATA = new Uint8Array([0x00]); // rendering intent 0

function gamaData(): Uint8Array {
    const data = new Uint8Array(4);
    new DataView(data.buffer).setUint32(0, 45455, false);
    return data;
}

// ── entry ────────────────────────────────────────────────────────────────────

export function serializePng(snapshot: ExportSnapshot): PngResult {
    const rgbaByColor: [number, number, number, number][] = [];
    for (const atom of snapshot.orderedNamedColors) {
        const rgba = atomToRgba8(atom);
        if (rgba === null) return { ok: false, failureCode: "serializer_contract" };
        rgbaByColor.push([rgba[0], rgba[1], rgba[2], rgba[3]]);
    }

    const raw = rawPayload(rasterRow(rgbaByColor));
    const idat = zlibStored(raw);

    const bytes = concatBytes([
        PNG_SIGNATURE,
        chunk("IHDR", ihdr()),
        chunk("sRGB", SRGB_DATA),
        chunk("gAMA", gamaData()),
        chunk("IDAT", idat),
        chunk("IEND", new Uint8Array(0)),
    ]);
    return { ok: true, bytes };
}
