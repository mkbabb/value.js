import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";
const b = await chromium.launch();
const sampler = await (await b.newContext()).newPage();

async function px(buf) {
    return sampler.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const rows = [];
        for (let y = 0; y < c.height; y++) {
            let best = null;
            for (let x = 0; x < c.width; x++) { const i = (y * c.width + x) * 4; const L = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; if (!best || L < best.L) best = { L, rgb: [d[i], d[i + 1], d[i + 2]], x }; }
            rows.push({ y, darkest: best.rgb, L: +best.L.toFixed(1), x: best.x });
        }
        return { size: `${c.width}x${c.height}`, rows };
    }, buf.toString("base64"));
}
const lum = ([r, g, bl]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bl); };
const cr = (a, c) => { const [x, y] = [lum(a), lum(c)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(2); };

const R = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    const r = await page.locator('[role="button"][aria-label]').boundingBox();
    // strip covering: 3px above border, the 2px border, 6px of plate inside
    const strip = await page.screenshot({ clip: { x: Math.round(r.x) + 60, y: Math.round(r.y) - 3, width: 140, height: 14 } });
    await writeFile(`${D}/F-strip-${scheme}.png`, strip);
    const s = await px(strip);
    // plate pixel: sample well inside the zone, away from the caption
    const plateBuf = await page.screenshot({ clip: { x: Math.round(r.x) + 20, y: Math.round(r.y) + 20, width: 6, height: 6 } });
    const plate = (await px(plateBuf)).rows[2].darkest;
    // the border dash: the darkest row in the strip (rows 3-5 are the border band)
    const borderRows = s.rows.slice(2, 6);
    const dash = borderRows.reduce((a, c) => (c.L < a.L ? c : a), borderRows[0]);
    // caption ink
    const cap = await page.locator("text=Drop an image or click to browse").boundingBox();
    const capBuf = await page.screenshot({ clip: { x: Math.round(cap.x), y: Math.round(cap.y), width: Math.round(cap.width), height: Math.round(cap.height) } });
    const capPx = await px(capBuf);
    const capInk = capPx.rows.reduce((a, c) => (c.L < a.L ? c : a), capPx.rows[0]).darkest;

    R[scheme] = {
        plate, dashDarkest: dash.darkest, dashL: dash.L,
        borderVsPlate_contrast: cr(dash.darkest, plate),
        captionInk: capInk, captionVsPlate_contrast: cr(capInk, plate),
        wcag_nonText_3to1_PASS: cr(dash.darkest, plate) >= 3,
        wcag_text_4p5_PASS: cr(capInk, plate) >= 4.5,
    };
    await ctx.close();
}
console.log(JSON.stringify(R, null, 1));
await b.close();
