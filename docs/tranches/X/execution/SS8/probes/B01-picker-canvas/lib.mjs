// SS-8 B01 shared helpers: PNG decode (no deps), WCAG contrast, safe run wrapper.
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";

export const EVID = path.resolve(
    import.meta.dirname,
    "../../evidence/B01-picker-canvas",
);
fs.mkdirSync(EVID, { recursive: true });

export function decodePng(buf) {
    let off = 8;
    let w, h, bitDepth, colorType;
    const idat = [];
    while (off < buf.length) {
        const len = buf.readUInt32BE(off);
        const type = buf.toString("ascii", off + 4, off + 8);
        const data = buf.subarray(off + 8, off + 8 + len);
        if (type === "IHDR") {
            w = data.readUInt32BE(0);
            h = data.readUInt32BE(4);
            bitDepth = data[8];
            colorType = data[9];
        } else if (type === "IDAT") idat.push(data);
        else if (type === "IEND") break;
        off += 12 + len;
    }
    if (bitDepth !== 8) throw new Error("bitDepth " + bitDepth);
    const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : null;
    if (!bpp) throw new Error("colorType " + colorType);
    const raw = zlib.inflateSync(Buffer.concat(idat));
    const stride = w * bpp;
    const out = Buffer.alloc(w * h * 4);
    let prev = Buffer.alloc(stride);
    for (let y = 0; y < h; y++) {
        const ft = raw[y * (stride + 1)];
        const line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
        for (let x = 0; x < stride; x++) {
            const a = x >= bpp ? line[x - bpp] : 0;
            const b = prev[x];
            const c = x >= bpp ? prev[x - bpp] : 0;
            let v = line[x];
            if (ft === 1) v += a;
            else if (ft === 2) v += b;
            else if (ft === 3) v += (a + b) >> 1;
            else if (ft === 4) {
                const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
                v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
            }
            line[x] = v & 255;
        }
        for (let x = 0; x < w; x++) {
            out[(y * w + x) * 4] = line[x * bpp];
            out[(y * w + x) * 4 + 1] = line[x * bpp + 1];
            out[(y * w + x) * 4 + 2] = line[x * bpp + 2];
            out[(y * w + x) * 4 + 3] = bpp === 4 ? line[x * bpp + 3] : 255;
        }
        prev = line;
    }
    return { w, h, px: (x, y) => [...out.subarray((y * w + x) * 4, (y * w + x) * 4 + 4)] };
}

const lin = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
export const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return +((x + 0.05) / (y + 0.05)).toFixed(3);
};

export function save(name, data) {
    const p = path.join(EVID, name);
    fs.writeFileSync(p, typeof data === "string" ? data : JSON.stringify(data, null, 2));
    return p;
}
