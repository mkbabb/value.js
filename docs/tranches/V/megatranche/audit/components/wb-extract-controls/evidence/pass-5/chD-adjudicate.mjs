import { webkit } from "playwright";
import zlib from "node:zlib";

function decodePNG(buf) {
    let p = 8, w = 0, h = 0, ct = 0; const idat = [];
    while (p < buf.length) {
        const len = buf.readUInt32BE(p), type = buf.toString("ascii", p + 4, p + 8);
        const data = buf.subarray(p + 8, p + 8 + len);
        if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); ct = data[9]; }
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
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });

await page.waitForTimeout(3400);

// ---------- A. reservation, ground truth via Range over the live text node ----------
const rangeInk = async () => await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    const row = rail.parentElement.parentElement;
    const kLabel = row.querySelector("label");
    const kc = document.querySelector('[data-o18="extract-kc"]');
    const kcOut = kc.querySelector("span.tabular-nums");
    const ink = (el) => {
        const r = document.createRange();
        r.selectNodeContents(el);
        const b = r.getBoundingClientRect();
        const box = el.getBoundingClientRect();
        return {
            text: el.textContent.trim(),
            inkW: +b.width.toFixed(3),
            boxW: +box.width.toFixed(3),
            inkL: +b.left.toFixed(2), inkR: +b.right.toFixed(2),
            boxL: +box.left.toFixed(2), boxR: +box.right.toFixed(2),
            overflowPx: +(b.width - box.width).toFixed(3),
            font: getComputedStyle(el).fontFamily.split(",")[0],
            size: getComputedStyle(el).fontSize,
            scrollW: el.scrollWidth, clientW: el.clientWidth,
        };
    };
    return { k: ink(kLabel), kc: ink(kcOut) };
});
out.reservation_at_k5 = await rangeInk();

// drive k to max by keyboard
await page.evaluate(() => document.querySelector('[role="slider"][aria-label="Number of colors"]').focus());
for (let i = 0; i < 20; i++) { await page.keyboard.press("ArrowRight"); }
await page.waitForTimeout(500);
out.reservation_at_kmax = await rangeInk();

// drive kC to max
await page.evaluate(() => document.querySelector('[role="slider"][aria-label="Chroma weight"]').focus());
await page.keyboard.press("End");
await page.waitForTimeout(400);
out.reservation_kc_at_max = (await rangeInk()).kc;

// ---------- B. focus causality: measure ring on the shipped track, then on a neutral track ----------
const focusRing = async (tag) => {
    await page.evaluate(() => document.activeElement?.blur());
    await page.waitForTimeout(250);
    const before = decodePNG(await page.screenshot({ type: "png" }));
    await page.evaluate(() => document.querySelector('[role="slider"][aria-label="Number of colors"]').focus());
    await page.waitForTimeout(400);
    const after = decodePNG(await page.screenshot({ type: "png" }));
    const g = await page.evaluate(() => {
        const t = document.querySelector('[role="slider"][aria-label="Number of colors"]').getBoundingClientRect();
        return { l: t.left, t: t.top, w: t.width, h: t.height };
    });
    const midY = Math.round(g.t + g.h / 2);
    const ring = at(after, Math.round(g.l - 2), midY);
    const adj = at(after, Math.round(g.l - 12), midY);
    let changed = 0, total = 0, maxDelta = 0;
    for (let y = midY - 14; y <= midY + 14; y++)
        for (let x = Math.round(g.l) - 8; x <= Math.round(g.l + g.w) + 8; x++) {
            total++;
            const a = at(before, x, y), b = at(after, x, y);
            const d = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
            if (d > 6) changed++;
            if (d > maxDelta) maxDelta = d;
        }
    return { tag, ring, adjacentTrack: adj, contrast_ringVsAdjacent: contrast(ring, adj), changedPx: changed, scanned: total, maxChannelDelta: maxDelta };
};

out.focus_shippedTrack = await focusRing("shipped: accent-painted rail behind a transparent track");

// Neutralise the consumer's two track decisions ONLY (read-only, in-page; no source edit):
await page.evaluate(() => {
    const rail = document.querySelector('[data-o18="extract-k-rail"]');
    rail.style.display = "none";                       // remove the hand-rolled accent rail
    const sl = rail.parentElement.querySelector(".glass-slider");
    sl.style.setProperty("--slider-track-bg", "");     // release the transparent override -> producer default
});
await page.waitForTimeout(400);
out.focus_producerDefaultTrack = await focusRing("counterfactual: producer default neutral track");

await browser.close();
console.log(JSON.stringify(out, null, 2));
