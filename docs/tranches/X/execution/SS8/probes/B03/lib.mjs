// B03 shared helpers — pixel decode in a blank page of the SAME context, WCAG math, hashing.
import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync } from "node:fs";

export const BASE = process.env.B03_BASE ?? "http://localhost:9000/";
export const EV = new URL("../../evidence/B03-hero-atmosphere/", import.meta.url).pathname;
mkdirSync(EV, { recursive: true });

export const sha = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 16);
export const save = (name, obj) => writeFileSync(EV + name, JSON.stringify(obj, null, 1));

/** Decode PNG buffers into RGBA arrays using a blank page's canvas (no deps). */
export async function decoder(ctx) {
    const dp = await ctx.newPage();
    await dp.goto("about:blank");
    return async (buf) =>
        dp.evaluate(async (b64) => {
            const img = new Image();
            img.src = "data:image/png;base64," + b64;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width; c.height = img.height;
            const g = c.getContext("2d");
            g.drawImage(img, 0, 0);
            return { w: img.width, h: img.height, d: Array.from(g.getImageData(0, 0, img.width, img.height).data) };
        }, buf.toString("base64"));
}

export function meanRGB(px) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < px.d.length; i += 4) { r += px.d[i]; g += px.d[i + 1]; b += px.d[i + 2]; n++; }
    return [r / n, g / n, b / n];
}
export function meanAbsDelta(a, b) {
    let s = 0, n = 0, mx = 0;
    for (let i = 0; i < a.d.length; i += 4) for (let k = 0; k < 3; k++) { const d = Math.abs(a.d[i + k] - b.d[i + k]); s += d; n++; if (d > mx) mx = d; }
    return { mean: +(s / n).toFixed(3), max: mx };
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(3); };
export function parseRGB(s) {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
}
/** sRGB 8-bit -> OKLab (for ΔEok and chroma). */
export function oklab([r, g, b]) {
    const [R, G, B] = [lin(r), lin(g), lin(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
