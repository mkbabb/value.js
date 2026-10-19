// SERVED MODEL: claude-opus-5-5 · SS-8 B15-palettes shared seed (local only; no server writes).
export const ROUTE = "http://localhost:9000/#/palettes";
const NOW = "2026-10-19T00:00:00.000Z";
export const hue = (n, t = 0) => Array.from({ length: n }, (_, i) => `oklch(0.72 0.16 ${Math.round(((i * 360) / n + t) * 10) / 10})`);
export const pal = (id, name, n) => ({ id, name, slug: id, colors: hue(n).map((css, position) => ({ css, position })),
    createdAt: NOW, updatedAt: NOW, isLocal: true, published: false, visibility: "private", tags: [] });
export const SAVED12 = Array.from({ length: 12 }, (_, i) => pal(`p${i}`, i === 0 ? "Sunset Ridge" : `Saved ${i}`, i === 2 ? 50 : 5));
/** seed: { theme, saved: Palette[]|null, current: string[]|null } */
export async function seed(ctx, { theme = "light", saved = SAVED12, current = null } = {}) {
    await ctx.addInitScript(([t, s, c]) => {
        try {
            localStorage.setItem("vueuse-color-scheme", t);
            if (s) localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: s }));
            if (c) localStorage.setItem("color-picker", JSON.stringify({ inputColor: c[c.length - 1], savedColors: c }));
        } catch { /* private window */ }
    }, [theme, saved, current]);
}
export async function open(b, opts = {}, ctxOpts = {}) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: opts.theme ?? "light", ...ctxOpts });
    await seed(ctx, opts);
    const p = await ctx.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
    p.on("console", (m) => m.type() === "error" && errors.push("CONSOLE " + m.text().slice(0, 200)));
    await p.goto(opts.route ?? ROUTE, { timeout: 150000, waitUntil: "domcontentloaded" });
    await p.locator(".dashed-well").first().waitFor({ timeout: 120000 });
    await p.waitForTimeout(1500);
    return { ctx, p, errors };
}

/** Decode a PNG buffer in a throwaway context and read exact pixels at {name:{x,y}} (CSS px × dpr). */
export async function samplePng(b, buf, points, dpr = 1) {
    const ctx = await b.newContext();
    try {
        const p = await ctx.newPage();
        return await p.evaluate(async ([url, pts, d]) => {
            const img = new Image(); img.src = url; await img.decode();
            const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
            const g = c.getContext("2d"); g.drawImage(img, 0, 0);
            const out = {};
            for (const [k, { x, y }] of Object.entries(pts)) { const px = g.getImageData(Math.round(x * d), Math.round(y * d), 1, 1).data; out[k] = [px[0], px[1], px[2]]; }
            return out;
        }, ["data:image/png;base64," + buf.toString("base64"), points, dpr]);
    } finally { await ctx.close(); }
}
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export const lum = ([r, g, bl]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
export const contrast = (a, b2) => { const [x, y] = [lum(a), lum(b2)].sort((m, n) => n - m); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100; };
/** sRGB 0-255 → OKLab L (4 dp). */
export const okL = ([r, g, bl]) => {
    const [R, G, B] = [lin(r), lin(g), lin(bl)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return Math.round((0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s) * 1e4) / 1e4;
};
