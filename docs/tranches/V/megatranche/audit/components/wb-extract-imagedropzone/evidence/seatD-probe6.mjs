import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";
const b = await chromium.launch();
const sampler = await (await b.newContext()).newPage();
const lum = ([r, g, bl]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl); };
const cr = (a, c) => { const [x, y] = [lum(a), lum(c)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

async function stats(buf) {
    return sampler.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const arr = [];
        for (let i = 0; i < d.length; i += 4) arr.push([d[i], d[i + 1], d[i + 2]]);
        const L = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
        const sorted = [...arr].sort((a, b) => L(a) - L(b));
        return { n: arr.length, p02: sorted[Math.floor(arr.length * 0.02)], p50: sorted[Math.floor(arr.length * 0.5)], p98: sorted[Math.floor(arr.length * 0.98)] };
    }, buf.toString("base64"));
}

const R = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    const cap = await page.locator("text=Drop an image or click to browse").boundingBox();
    const capBuf = await page.screenshot({ clip: { x: Math.round(cap.x) - 2, y: Math.round(cap.y), width: Math.round(cap.width) + 4, height: Math.round(cap.height) } });
    await writeFile(`${D}/G-cap-${scheme}.png`, capBuf);
    const s = await stats(capBuf);
    // ink = extreme away from median; plate = median
    const inkDark = cr(s.p02, s.p50), inkLight = cr(s.p98, s.p50);
    const icon = await page.locator('[role="button"][aria-label] svg').boundingBox();
    const iconBuf = await page.screenshot({ clip: { x: Math.round(icon.x), y: Math.round(icon.y), width: Math.round(icon.width), height: Math.round(icon.height) } });
    const si = await stats(iconBuf);
    R[scheme] = {
        captionCrop: s, captionContrast: Math.max(inkDark, inkLight), captionFontPx: 16.4, wcagAA_text_4p5: Math.max(inkDark, inkLight) >= 4.5,
        iconCrop: si, iconContrast: Math.max(cr(si.p02, si.p50), cr(si.p98, si.p50)), wcag_nonText_3: Math.max(cr(si.p02, si.p50), cr(si.p98, si.p50)) >= 3,
    };
    await ctx.close();
}
console.log(JSON.stringify(R, null, 1));
await b.close();
