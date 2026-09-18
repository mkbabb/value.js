// V.W51 (F5) — byte primitives shared by every export serializer.
// Byte authority: docs/tranches/V/PALETTE-CONTRACT.md Appendix W51.

/** UTF-8 encode with no BOM (Appendix §2: all text files are UTF-8 without BOM). */
export function utf8(text: string): Uint8Array {
    return new TextEncoder().encode(text);
}

export function concatBytes(parts: readonly Uint8Array[]): Uint8Array {
    let total = 0;
    for (const p of parts) total += p.length;
    const out = new Uint8Array(total);
    let offset = 0;
    for (const p of parts) {
        out.set(p, offset);
        offset += p.length;
    }
    return out;
}

/** Appendix §2: text files "end in exactly one LF"; append a single 0x0A. */
export function withTrailingLf(bytes: Uint8Array): Uint8Array {
    const out = new Uint8Array(bytes.length + 1);
    out.set(bytes, 0);
    out[bytes.length] = 0x0a;
    return out;
}

export function toHex(bytes: Uint8Array): string {
    let out = "";
    for (const b of bytes) out += b.toString(16).padStart(2, "0");
    return out;
}

export function uint32be(value: number): Uint8Array {
    const b = new Uint8Array(4);
    new DataView(b.buffer).setUint32(0, value, false);
    return b;
}

export function uint64be(value: number): Uint8Array {
    const b = new Uint8Array(8);
    new DataView(b.buffer).setBigUint64(0, BigInt(value), false);
    return b;
}
