import zlib from "node:zlib";
import type { Locator, Page } from "@playwright/test";

/**
 * T.W0 W0-5 — the PIXEL-READ frame-diff fixture for the aurora render-truth
 * oracles (O-1 color-truth, O-26 aurora perceptibility).
 *
 * The S-era `webgl-appearance.ts` fixture counts WebGL2 DRAW CALLS — a robust
 * PRESENCE signal, but a PROXY for APPEARANCE (the two S failure shapes were
 * named-site-not-population and proxy-predicates; SYNTHESIS §6.1). A draw-count
 * cannot tell a vivid migrating field from an achromatic slab, nor a breathing
 * aurora from a still. O-1 and O-26 need the actual displayed pixels.
 *
 * The library depends on NO image codec (pngjs/pixelmatch absent), and the
 * aurora runtime creates its context `preserveDrawingBuffer:false` (an in-page
 * `readPixels` after composite reads a cleared buffer — the webgl-appearance
 * docstring's measured race). So the honest pixel source is Playwright's
 * `Locator.screenshot()` — it captures the COMPOSITED presentation of the canvas
 * region (the live aurora under a real GPU, or the CSS-gradient placeholder taken
 * under headless software-GL) as a PNG buffer. This fixture decodes that PNG with
 * only `node:zlib` (no dependency) and computes the perceptibility metrics.
 *
 * NON-INTERACTION note: this is read-only observation (screenshots + pixel math),
 * never `page.evaluate`-driven DOM interaction — the same carve-out the frame
 * collector + reactivity specs rely on.
 */

export interface DecodedImage {
    width: number;
    height: number;
    channels: 3 | 4;
    /** row-major RGBA (or RGB) 8-bit samples, length = width*height*channels. */
    data: Uint8Array;
}

const PNG_SIG = [137, 80, 78, 71, 13, 10, 26, 10];

function paeth(a: number, b: number, c: number): number {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
}

/**
 * Minimal PNG decoder — the subset Playwright emits (8-bit, colorType 2 [RGB] or
 * 6 [RGBA], no interlace, zlib-deflated IDAT). Un-filters the five PNG scanline
 * filters (None/Sub/Up/Average/Paeth). Throws loudly on any out-of-subset input
 * (never silently returns garbage — a corrupt decode would fake an oracle green).
 */
export function decodePng(buf: Buffer): DecodedImage {
    for (let i = 0; i < 8; i++) {
        if (buf[i] !== PNG_SIG[i]) throw new Error("frame-diff: not a PNG");
    }
    let pos = 8;
    let width = 0;
    let height = 0;
    let channels: 3 | 4 = 4;
    const idat: Buffer[] = [];
    while (pos < buf.length) {
        const len = buf.readUInt32BE(pos);
        const type = buf.toString("ascii", pos + 4, pos + 8);
        const dataStart = pos + 8;
        if (type === "IHDR") {
            width = buf.readUInt32BE(dataStart);
            height = buf.readUInt32BE(dataStart + 4);
            const bitDepth = buf[dataStart + 8];
            const colorType = buf[dataStart + 9];
            const interlace = buf[dataStart + 12];
            if (bitDepth !== 8)
                throw new Error(`frame-diff: unsupported bitDepth ${bitDepth}`);
            if (interlace !== 0)
                throw new Error("frame-diff: interlaced PNG unsupported");
            if (colorType === 6) channels = 4;
            else if (colorType === 2) channels = 3;
            else throw new Error(`frame-diff: unsupported colorType ${colorType}`);
        } else if (type === "IDAT") {
            idat.push(buf.subarray(dataStart, dataStart + len));
        } else if (type === "IEND") {
            break;
        }
        pos = dataStart + len + 4; // + CRC
    }
    if (!width || !height) throw new Error("frame-diff: missing IHDR");

    const raw = zlib.inflateSync(Buffer.concat(idat));
    const bpp = channels;
    const stride = width * bpp;
    const out = new Uint8Array(width * height * bpp);
    let ri = 0;
    for (let y = 0; y < height; y++) {
        const filter = raw[ri++];
        const rowStart = y * stride;
        for (let x = 0; x < stride; x++) {
            const rawByte = raw[ri++];
            const a = x >= bpp ? out[rowStart + x - bpp] : 0; // left
            const b = y > 0 ? out[rowStart - stride + x] : 0; // up
            const c = x >= bpp && y > 0 ? out[rowStart - stride + x - bpp] : 0; // up-left
            let val: number;
            switch (filter) {
                case 0:
                    val = rawByte;
                    break;
                case 1:
                    val = rawByte + a;
                    break;
                case 2:
                    val = rawByte + b;
                    break;
                case 3:
                    val = rawByte + ((a + b) >> 1);
                    break;
                case 4:
                    val = rawByte + paeth(a, b, c);
                    break;
                default:
                    throw new Error(`frame-diff: bad filter ${filter}`);
            }
            out[rowStart + x] = val & 0xff;
        }
    }
    return { width, height, channels, data: out };
}

/**
 * Mean absolute 8-bit difference over the RGB channels of two same-size images
 * (alpha ignored). The O-26 metric: 0 = pixel-identical (a still); higher = more
 * visible migration. Range 0–255.
 */
export function meanAbsDiff(a: DecodedImage, b: DecodedImage): number {
    if (a.width !== b.width || a.height !== b.height) {
        throw new Error(
            `frame-diff: size mismatch ${a.width}x${a.height} vs ${b.width}x${b.height}`,
        );
    }
    let sum = 0;
    const n = a.width * a.height;
    for (let p = 0; p < n; p++) {
        const ai = p * a.channels;
        const bi = p * b.channels;
        sum += Math.abs(a.data[ai] - b.data[bi]);
        sum += Math.abs(a.data[ai + 1] - b.data[bi + 1]);
        sum += Math.abs(a.data[ai + 2] - b.data[bi + 2]);
    }
    return sum / (n * 3);
}

/** The mean RGB (0–255) of a decoded image — the O-1 central-sample colour. */
export function meanRgb(img: DecodedImage): [number, number, number] {
    let r = 0;
    let g = 0;
    let bl = 0;
    const n = img.width * img.height;
    for (let p = 0; p < n; p++) {
        const i = p * img.channels;
        r += img.data[i];
        g += img.data[i + 1];
        bl += img.data[i + 2];
    }
    return [r / n, g / n, bl / n];
}

/**
 * sRGB (0–255) → OKLCh {L (0–1), C, h (deg)} — the Ottosson linear-sRGB → LMS →
 * OKLab → OKLCh path (the same maths the library ships; inlined here so the e2e
 * fixture carries no runtime `@src` import). Used by O-1 to assert "never an
 * achromatic slab, L in the active scheme's band".
 */
export function srgbToOklch(
    r255: number,
    g255: number,
    b255: number,
): { L: number; C: number; h: number } {
    const lin = (c: number) => {
        const cs = c / 255;
        return cs <= 0.04045 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
    };
    const r = lin(r255);
    const g = lin(g255);
    const b = lin(b255);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    const C = Math.hypot(a, bb);
    const h = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
    return { L, C, h };
}

/**
 * Normalize a CSS color read to lowercase `#rrggbb`. W2-2 registered the
 * `--saved-bg*` tokens as `@property syntax:"<color>"`, so `getComputedStyle`
 * returns the COMPUTED form (`rgb(r, g, b)`) rather than the raw specified
 * hex — every spec comparing the token against a persisted hex must
 * normalize both sides. Accepts `#rrggbb` and `rgb(r, g, b)`; null otherwise.
 */
export function cssColorToHex(s: string): string | null {
    const t = s.trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(t)) return t;
    const m = t.match(/^rgb\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)\s*\)$/);
    if (!m) return null;
    const hex = (v: string) =>
        Math.max(0, Math.min(255, parseInt(v, 10))).toString(16).padStart(2, "0");
    return `#${hex(m[1]!)}${hex(m[2]!)}${hex(m[3]!)}`;
}

/** A fractional sub-rectangle of a region's bounding box (all values 0–1). */
export interface FracRect {
    xFrac: number;
    yFrac: number;
    wFrac: number;
    hFrac: number;
}

/**
 * The default aurora sample window — a horizontal band across the TOP of the
 * field (y 3%→15%, central 70% width). The full-bleed atmosphere canvas is
 * occluded by the centered pane cards; this band sits ABOVE the pane container
 * where the field is unoccluded, so the read is the aurora itself, never a
 * static card surface. "Under the bar" (T-25) is the field this catches.
 */
export const AURORA_TOP_BAND: FracRect = {
    xFrac: 0.15,
    yFrac: 0.03,
    wFrac: 0.7,
    hFrac: 0.12,
};

/**
 * Screenshot a fractional sub-region of a locator's box as a decoded image.
 * Reads the COMPOSITED presentation, honest to both the live-aurora and
 * CSS-placeholder render-mode paths.
 */
export async function sampleRegion(
    page: Page,
    locator: Locator,
    rect: FracRect = AURORA_TOP_BAND,
): Promise<DecodedImage> {
    const box = await locator.boundingBox();
    if (!box) throw new Error("frame-diff: region has no layout box");
    const clip = {
        x: Math.round(box.x + box.width * rect.xFrac),
        y: Math.round(box.y + box.height * rect.yFrac),
        width: Math.max(1, Math.round(box.width * rect.wFrac)),
        height: Math.max(1, Math.round(box.height * rect.hFrac)),
    };
    const png = await page.screenshot({ clip });
    return decodePng(png);
}
