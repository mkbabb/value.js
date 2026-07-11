/**
 * Shared pixel-probe helpers for the Lane-G gradient oracles (O-19 / O-21).
 *
 * The probes judge COMPOSITED pixels (element screenshot → decoded IN PAGE
 * via an own-origin canvas — a data-URL image never taints), not canvas
 * buffers: the netting delta is a claim about what the eye receives over
 * the host ground, and the rail's terminal colors are a claim about the
 * painted border-box, hairline and all.
 */
import type { Locator, Page } from "@playwright/test";

export interface DecodedPNG {
    w: number;
    h: number;
    /** RGBA bytes, row-major. */
    data: number[];
}

/** Screenshot a locator and decode its PNG to raw RGBA in-page. */
export async function screenshotPixels(
    page: Page,
    target: Locator,
): Promise<DecodedPNG> {
    const buf = await target.screenshot();
    return await page.evaluate(async (b64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height);
        return { w: c.width, h: c.height, data: Array.from(d.data) };
    }, buf.toString("base64"));
}

/**
 * Robust luma spread (p97 − p3 of BT.709 luma) over a fractional window —
 * the hatch-line-vs-paper delta of a netting region: the window holds both
 * stroke cores and paper ground; percentiles reject AA tails and the
 * paper-grain dither.
 */
export function lumaDelta(
    png: DecodedPNG,
    x0f: number,
    x1f: number,
    y0f: number,
    y1f: number,
): number {
    const { w, h, data } = png;
    const lumas: number[] = [];
    for (let y = Math.round(h * y0f); y < h * y1f; y++) {
        for (let x = Math.round(w * x0f); x < w * x1f; x++) {
            const i = 4 * (y * w + x);
            lumas.push(
                0.2126 * data[i]! + 0.7152 * data[i + 1]! + 0.0722 * data[i + 2]!,
            );
        }
    }
    lumas.sort((a, b) => a - b);
    const p = (q: number) =>
        lumas[Math.min(lumas.length - 1, Math.floor(q * lumas.length))]!;
    return p(0.97) - p(0.03);
}

/** Mean RGB over an absolute-x / fractional-y window. */
export function meanRGB(
    png: DecodedPNG,
    x0: number,
    x1: number,
    y0f: number,
    y1f: number,
): [number, number, number] {
    const { w, h, data } = png;
    let r = 0,
        g = 0,
        b = 0,
        n = 0;
    for (let y = Math.round(h * y0f); y < h * y1f; y++) {
        for (let x = x0; x < x1; x++) {
            const i = 4 * (y * w + x);
            r += data[i]!;
            g += data[i + 1]!;
            b += data[i + 2]!;
            n++;
        }
    }
    return [r / n, g / n, b / n];
}

export function rgbDistance(
    a: readonly [number, number, number],
    b: readonly [number, number, number],
): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
