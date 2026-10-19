// Pixel + colour helpers shared by B17 probes.
export async function pixels(page, png, pts) {
    return page.evaluate(async ({ b64, pts }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        return pts.map(([a, b]) => [...x.getImageData(a, b, 1, 1).data.slice(0, 3)]);
    }, { b64: png.toString("base64"), pts });
}
/** Resolve CSS colours in-page to [r,g,b,a] (a 0..1) on a transparent canvas. */
export async function rgba(page, list) {
    return page.evaluate((list) => {
        const cv = document.createElement("canvas").getContext("2d");
        return list.map((css) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = "rgba(0,0,0,0)"; cv.fillStyle = css; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return d[3] ? [Math.round(d[0] * 255 / d[3]), Math.round(d[1] * 255 / d[3]), Math.round(d[2] * 255 / d[3]), +(d[3] / 255).toFixed(3)] : [0, 0, 0, 0]; });
    }, list);
}
export const over = ([r, g, b, a], [R, G, B]) => [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)].map(Math.round);
const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
export const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
/** OKLab L (0..1) of an sRGB triple. */
export const okL = ([r, g, b]) => { const [R, G, B] = [r, g, b].map(lin); const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return +(0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s).toFixed(4); };
export const rect = "(e)=>{const b=e.getBoundingClientRect();return [b.x,b.y,b.width,b.height].map(n=>+n.toFixed(2))}";
