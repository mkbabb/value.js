// CHALLENGE-D r2 · probe 05 — PIXEL forensics (painted dot extent vs the ring
// stroke; rest-ink contrast sampled from the rendered composite) + the space
// arms (kelvin = 2 channels; the space-change dot wipe) + mobile + dark +
// forced-colors witnesses. Read-only.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";
const out = {};

function lum([r, g, b]) {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +(((x + 0.05) / (y + 0.05))).toFixed(2); };

// Decode a PNG buffer to an RGBA pixel array using the browser's own canvas.
async function decode(page, buf, w, h) {
    return page.evaluate(async ({ b64, w, h }) => {
        const img = new Image();
        img.src = "data:image/png;base64," + b64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        return { w: c.width, h: c.height, data: [...d] };
    }, { b64: buf.toString("base64"), w, h });
}

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

// ---- default (no dot) rest-ink contrast, pixel-sampled --------------------
async function scanRow(labelSelectorIndex, tag) {
    const geo = await page.evaluate((i) => {
        const rail = document.querySelector(".channel-rail");
        const el = document.querySelectorAll(".channel-rail-item")[i];
        const b = el.getBoundingClientRect(); const rb = rail.getBoundingClientRect();
        return { x: rb.x - 3, y: b.y + b.height / 2 - 0.5, w: rb.width + 6, itemX: b.x, itemW: b.width, railX: rb.x, railW: rb.width };
    }, labelSelectorIndex);
    const buf = await page.screenshot({ clip: { x: geo.x, y: geo.y, width: geo.w, height: 1 } });
    const img = await decode(page, buf);
    const row = [];
    for (let i = 0; i < img.w; i++) row.push([img.data[i * 4], img.data[i * 4 + 1], img.data[i * 4 + 2]]);
    return { tag, geo, dsf: +(img.w / geo.w).toFixed(2), row };
}

function analyseRow(scan) {
    const { row, geo, dsf } = scan;
    const toCss = (i) => +(geo.x + i / dsf).toFixed(2);
    // Ring stroke = the two extreme local minima in luminance near the edges.
    const L = row.map(lum);
    const n = row.length;
    const edgeWin = Math.round(10 * dsf);
    const leftIdx = L.slice(0, edgeWin).reduce((m, v, i, a) => (v < a[m] ? i : m), 0);
    const rightOff = n - edgeWin;
    const rightIdx = rightOff + L.slice(rightOff).reduce((m, v, i, a) => (v < a[m] ? i : m), 0);
    return {
        ringLeftPx: toCss(leftIdx), ringLeftRGB: row[leftIdx],
        ringRightPx: toCss(rightIdx), ringRightRGB: row[rightIdx],
        innerSpanPx: +(toCss(rightIdx) - toCss(leftIdx)).toFixed(2),
        centreRGB: row[Math.round(n / 2)],
        rowSample: row.filter((_, i) => i % Math.round(dsf) === 0).map((p) => p.join(",")),
    };
}

// default state
out.default_rowScan_L = analyseRow(await scanRow(0, "default-L"));

// select L, scan through the dot
await page.click(".channel-rail-item >> nth=0");
await page.waitForTimeout(900);
out.selected_rowScan_L = analyseRow(await scanRow(0, "selected-L"));
// select alpha (the WIDEST item) and scan
await page.click(".channel-rail-item >> nth=3");
await page.waitForTimeout(900);
out.selected_rowScan_alpha = analyseRow(await scanRow(3, "selected-alpha"));

// ---- rest-ink contrast, pixel-sampled: glyph core vs adjacent ground -----
out.restInkContrast = await (async () => {
    const geo = await page.evaluate(() => {
        const el = document.querySelectorAll(".channel-rail-item")[1]; // 'a', unselected
        const g = el.querySelector(".rail-glyph").getBoundingClientRect();
        return { x: g.x, y: g.y, w: g.width, h: g.height };
    });
    const buf = await page.screenshot({ clip: { x: geo.x - 2, y: geo.y, width: geo.w + 4, height: geo.h } });
    const img = await decode(page, buf);
    let darkest = [255, 255, 255], lightest = [0, 0, 0];
    const px = [];
    for (let i = 0; i < img.data.length; i += 4) {
        const p = [img.data[i], img.data[i + 1], img.data[i + 2]];
        px.push(p);
        if (lum(p) < lum(darkest)) darkest = p;
        if (lum(p) > lum(lightest)) lightest = p;
    }
    // ground = modal (most common) colour in the crop
    const counts = new Map();
    for (const p of px) { const k = p.join(","); counts.set(k, (counts.get(k) ?? 0) + 1); }
    const ground = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    return { darkestGlyphPx: darkest, groundModalPx: ground, ratio_darkest_vs_ground: ratio(darkest, ground), lightest };
})();

// ---- SPACE ARMS ----------------------------------------------------------
async function pickSpace(name) {
    const combo = page.locator('[role=combobox][aria-label="Select color space"]').first();
    await combo.click();
    await page.waitForTimeout(500);
    const opt = page.locator(`[role=option]:has-text("${name}")`).first();
    await opt.click();
    await page.waitForTimeout(1400);
}

async function railState(tag) {
    return page.evaluate((tag) => {
        const rail = document.querySelector(".channel-rail");
        const rb = rail.getBoundingClientRect();
        const items = [...rail.querySelectorAll(".channel-rail-item")].map((el) => {
            const b = el.getBoundingClientRect();
            return { text: el.textContent.trim(), selected: el.getAttribute("aria-selected") === "true", hasDot: !!el.querySelector(".rail-dot-seat"), cy: +(b.y + b.height / 2).toFixed(2), h: +b.height.toFixed(2), w: +b.width.toFixed(2) };
        });
        const rows = [...document.querySelectorAll(".channel-strip")].map((el) => { const b = el.getBoundingClientRect(); return { cy: +(b.y + b.height / 2).toFixed(2), h: +b.height.toFixed(2) }; });
        return {
            tag, railH: +rb.height.toFixed(2), railW: +rb.width.toFixed(2), n: items.length,
            items, rows, drift: items.map((it, i) => (rows[i] ? +(it.cy - rows[i].cy).toFixed(2) : null)),
            anySelected: items.some((i) => i.selected),
        };
    }, tag);
}

out.arms = {};
out.arms.lab_beforeChange = await railState("lab (alpha selected)");
await pickSpace("Kelvin");
out.arms.kelvin = await railState("kelvin");
await page.screenshot({ path: join(HERE, "shot-S-kelvin-2-channel.png"), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 8, y: b.y - 12, width: b.width + 260, height: b.height + 24 }; }) });

await pickSpace("OKLCh");
out.arms.oklch = await railState("oklch (after space change — dot wiped?)");
await page.screenshot({ path: join(HERE, "shot-S-oklch-after-space-change-NO-DOT.png"), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 8, y: b.y - 12, width: b.width + 260, height: b.height + 24 }; }) });

await pickSpace("ICtCp");
out.arms.ictcp = await railState("ictcp (two-glyph channels)");
await page.screenshot({ path: join(HERE, "shot-S-ictcp-two-glyph.png"), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 8, y: b.y - 12, width: b.width + 260, height: b.height + 24 }; }) });

await browser.close();

// ---- MOBILE 390 arm ------------------------------------------------------
{
    const b2 = await webkit.launch();
    const p2 = await b2.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await p2.goto(URL, { waitUntil: "domcontentloaded" });
    await p2.waitForSelector(".channel-rail", { timeout: 60000 });
    await p2.waitForTimeout(2500);
    out.mobile390 = await p2.evaluate(() => {
        const rail = document.querySelector(".channel-rail");
        const rb = rail.getBoundingClientRect();
        const items = [...rail.querySelectorAll(".channel-rail-item")].map((el) => {
            const b = el.getBoundingClientRect(); const s = getComputedStyle(el);
            return { text: el.textContent.trim(), w: +b.width.toFixed(2), h: +b.height.toFixed(2), cy: +(b.y + b.height / 2).toFixed(2), minH: s.minHeight, minW: s.minWidth, selected: el.getAttribute("aria-selected") === "true" };
        });
        const rows = [...document.querySelectorAll(".channel-strip")].map((el) => { const b = el.getBoundingClientRect(); return { cy: +(b.y + b.height / 2).toFixed(2), h: +b.height.toFixed(2) }; });
        return { railW: +rb.width.toFixed(2), railH: +rb.height.toFixed(2), items, rows, drift: items.map((it, i) => rows[i] ? +(it.cy - rows[i].cy).toFixed(2) : null) };
    });
    await p2.screenshot({ path: join(HERE, "shot-M-mobile390.png"), clip: await p2.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: Math.max(0, b.x - 8), y: b.y - 12, width: Math.min(374, b.width + 250), height: b.height + 24 }; }) });
    await b2.close();
}

// ---- FORCED COLORS + DARK witnesses --------------------------------------
for (const [tag, opts] of [["forcedColors", { forcedColors: "active" }], ["dark", { colorScheme: "dark" }]]) {
    const b3 = await chromium.launch();
    const p3 = await b3.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
    await p3.goto(URL, { waitUntil: "domcontentloaded" });
    await p3.waitForSelector(".channel-rail", { timeout: 60000 });
    await p3.waitForTimeout(2500);
    await p3.click(".channel-rail-item >> nth=0");
    await p3.waitForTimeout(900);
    out[tag] = await p3.evaluate(() => {
        const rail = document.querySelector(".channel-rail");
        const rs = getComputedStyle(rail);
        return {
            railBorderColor: rs.borderColor, railBg: rs.backgroundColor,
            items: [...rail.querySelectorAll(".channel-rail-item")].map((el) => {
                const s = getComputedStyle(el);
                const dot = el.querySelector(".rail-dot");
                return { text: el.textContent.trim(), selected: el.getAttribute("aria-selected") === "true", color: s.color, bg: s.backgroundColor, inlineColor: el.style.color || null, dotBg: dot ? getComputedStyle(dot).backgroundColor : null, dotFilter: dot ? getComputedStyle(dot).filter : null, dotOpacity: dot ? getComputedStyle(dot).opacity : null, forcedAdjust: s.forcedColorAdjust };
            }),
        };
    });
    await p3.screenshot({ path: join(HERE, `shot-F-${tag}.png`), clip: await p3.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 8, y: b.y - 12, width: b.width + 260, height: b.height + 24 }; }) });
    await b3.close();
}

writeFileSync(join(HERE, "probe-05-pixels-spaces-arms.json"), JSON.stringify(out, null, 2));
console.log("default L ring/inner :", JSON.stringify({ ...out.default_rowScan_L, rowSample: undefined }));
console.log("selected L ring/inner:", JSON.stringify({ ...out.selected_rowScan_L, rowSample: undefined }));
console.log("selected α ring/inner:", JSON.stringify({ ...out.selected_rowScan_alpha, rowSample: undefined }));
console.log("restInkContrast      :", JSON.stringify(out.restInkContrast));
for (const [k, v] of Object.entries(out.arms)) console.log("arm", k.padEnd(8), "n=" + v.n, "railH=" + v.railH, "railW=" + v.railW, "anySelected=" + v.anySelected, "glyphs=" + v.items.map((i) => i.text).join("|"), "drift=" + JSON.stringify(v.drift));
console.log("mobile390            :", JSON.stringify(out.mobile390));
console.log("forcedColors         :", JSON.stringify(out.forcedColors));
console.log("dark                 :", JSON.stringify(out.dark));
