// Minimal PNG reader (RGBA/RGB, 8-bit, non-interlaced) + contrast maths.
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

export function readPng(path) {
    const buf = readFileSync(path);
    let off = 8, w = 0, h = 0, ct = 0, idat = [];
    while (off < buf.length) {
        const len = buf.readUInt32BE(off);
        const type = buf.toString("ascii", off + 4, off + 8);
        const data = buf.subarray(off + 8, off + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); ct = data[9]; }
        if (type === "IDAT") idat.push(data);
        off += 12 + len;
    }
    const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 0 ? 1 : 4;
    const raw = inflateSync(Buffer.concat(idat));
    const stride = w * bpp;
    const px = Buffer.alloc(h * stride);
    let p = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[p++];
        const line = raw.subarray(p, p + stride); p += stride;
        const cur = px.subarray(y * stride, (y + 1) * stride);
        const prev = y ? px.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
        for (let x = 0; x < stride; x++) {
            const a = x >= bpp ? cur[x - bpp] : 0, b = prev[x], c = x >= bpp ? prev[x - bpp] : 0;
            let v = line[x];
            if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
            else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); }
            cur[x] = v & 255;
        }
    }
    return { w, h, bpp, px, at(x, y) { const i = y * stride + x * bpp; return [px[i], px[i + 1], px[i + 2]]; } };
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const contrast = (a, b) => { const l1 = L(a), l2 = L(b); const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]; return +((hi + 0.05) / (lo + 0.05)).toFixed(2); };
