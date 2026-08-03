import { webkit } from "playwright";
import zlib from "node:zlib";

function decodePNG(buf) {
    let p = 8, w = 0, h = 0, ct = 0, bd = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p), type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
        else if (type === "IDAT") idat.push(data); else if (type === "IEND") break;
        p += 12 + len;
    }
    const ch = { 0: 1, 2: 3, 4: 2, 6: 4 }[ct];
    const raw = zlib.inflateSync(Buffer.concat(idat)); const stride = w * ch;
    const px = Buffer.alloc(h * stride); let rp = 0;
    for (let y = 0; y < h; y++) {
        const f = raw[rp++]; const line = raw.subarray(rp, rp + stride); rp += stride;
        const cur = px.subarray(y * stride, (y + 1) * stride);
        const prev = y ? px.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
        for (let i = 0; i < stride; i++) {
            const a = i >= ch ? cur[i - ch] : 0, b = prev[i], c = i >= ch ? prev[i - ch] : 0;
            let v = line[i];
            if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
            else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
            cur[i] = v & 255;
        }
    }
    return { w, h, ch, px };
}
const at = (img, x, y) => { const i = y * img.w * img.ch + x * img.ch; return [img.px[i], img.px[i + 1], img.px[i + 2]]; };
const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(3); };

const browser = await webkit.launch();
const out = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(3200);

    const before = decodePNG(await page.screenshot({ type: "png" }));
    await page.evaluate(() => document.querySelector('[role="slider"][aria-label="Number of colors"]')?.focus());
    await page.waitForTimeout(400);
    const after = decodePNG(await page.screenshot({ type: "png" }));

    const g = await page.evaluate(() => {
        const t = document.querySelector('[role="slider"][aria-label="Number of colors"]').getBoundingClientRect();
        const r = document.querySelector('[data-o18="extract-k-rail"]').getBoundingClientRect();
        return { t: { l: t.left, t: t.top, w: t.width, h: t.height }, r: { l: r.left, t: r.top, w: r.width, h: r.height } };
    });

    const midY = Math.round(g.t.t + g.t.h / 2);
    // ring band sits ~2px outside the thumb, horizontally -> lands on the rail
    const ringL = at(after, Math.round(g.t.l - 2), midY);
    const railRefL = at(after, Math.round(g.t.l - 12), midY);
    const ringR = at(after, Math.round(g.t.l + g.t.w + 2), midY);
    const railRefR = at(after, Math.round(g.t.l + g.t.w + 12), midY);
    // ring band above the rail -> lands on the plate ground
    const ringAbove = at(after, Math.round(g.t.l + g.t.w / 2), Math.round(g.r.t - 2));
    const plateRef = at(after, Math.round(g.t.l + g.t.w / 2), Math.round(g.r.t - 10));

    // count changed pixels between focused/unfocused in the thumb neighbourhood
    let changed = 0, total = 0;
    for (let y = Math.round(g.r.t - 8); y < Math.round(g.r.t + g.r.h + 8); y++)
        for (let x = Math.round(g.t.l - 8); x < Math.round(g.t.l + g.t.w + 8); x++) {
            total++;
            const a = at(before, x, y), b = at(after, x, y);
            if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) > 6) changed++;
        }

    out[scheme] = {
        thumb: g.t, rail: g.r,
        ringOnRail_left: ringL, railRef_left: railRefL, contrast_ringVsRail_left: contrast(ringL, railRefL),
        ringOnRail_right: ringR, railRef_right: railRefR, contrast_ringVsRail_right: contrast(ringR, railRefR),
        ringAbovePlate: ringAbove, plateRef, contrast_ringVsPlate: contrast(ringAbove, plateRef),
        changedPx: changed, scannedPx: total, changedPct: +((changed / total) * 100).toFixed(2),
    };
    await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
