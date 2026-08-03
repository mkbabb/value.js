// CHALLENGE-D r2 · probe 06 — (a) painted dot extent vs the ring stroke,
// (b) active-glyph contrast ON the dot, (c) the focus register's visible
// delta when it can only ever land on the already-dotted item,
// (d) the two-glyph spaces (ICtCp / Jzazbz), (e) forced-colors + focus.
// Read-only.
import { webkit, chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";
const out = {};

function lum([r, g, b]) { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +(((x + 0.05) / (y + 0.05))).toFixed(2); };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

async function grab(page, clip) {
    const buf = await page.screenshot({ clip });
    return page.evaluate(async (b64) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
        const x = c.getContext("2d"); x.drawImage(img, 0, 0);
        return { w: c.width, h: c.height, data: [...x.getImageData(0, 0, c.width, c.height).data] };
    }, buf.toString("base64"));
}
const px = (img, x, y) => [img.data[(y * img.w + x) * 4], img.data[(y * img.w + x) * 4 + 1], img.data[(y * img.w + x) * 4 + 2]];

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

// ---------- (a) painted dot extent vs the ring ---------------------------
await page.click(".channel-rail-item >> nth=3"); // alpha = the WIDEST item
await page.waitForTimeout(900);
await page.mouse.move(2, 2);
await page.waitForTimeout(500);

const geo = await page.evaluate(() => {
    const rail = document.querySelector(".channel-rail");
    const rb = rail.getBoundingClientRect();
    const el = document.querySelectorAll(".channel-rail-item")[3];
    const b = el.getBoundingClientRect();
    const seat = el.querySelector(".rail-dot-seat")?.getBoundingClientRect();
    const cs = getComputedStyle(rail);
    return {
        railX: +rb.x.toFixed(2), railW: +rb.width.toFixed(2),
        border: parseFloat(cs.borderLeftWidth), pad: parseFloat(cs.paddingLeft),
        itemX: +b.x.toFixed(2), itemW: +b.width.toFixed(2), cy: b.y + b.height / 2,
        seatX: seat ? +seat.x.toFixed(2) : null, seatW: seat ? +seat.width.toFixed(2) : null,
    };
});
const clip = { x: geo.railX - 4, y: geo.cy - 0.5, width: geo.railW + 8, height: 1 };
const img = await grab(page, clip);
const dsf = img.w / clip.width;
const toCss = (i) => +(clip.x + i / dsf).toFixed(2);
const row = []; for (let i = 0; i < img.w; i++) row.push(px(img, i, 0));

// classify: the dot is the strongly-chromatic run; the ring is the dark thin run
const chroma = (p) => Math.max(...p) - Math.min(...p);
let dotL = -1, dotR = -1;
for (let i = 0; i < row.length; i++) if (chroma(row[i]) > 70) { if (dotL < 0) dotL = i; dotR = i; }
const darkIdx = row.map((p, i) => ({ i, l: lum(p) })).sort((a, b) => a.l - b.l);
const ringLeft = darkIdx.filter((d) => toCss(d.i) < geo.railX + 6)[0];
const ringRight = darkIdx.filter((d) => toCss(d.i) > geo.railX + geo.railW - 6)[0];
out.dotVsRing = {
    railBorderBox: [geo.railX, +(geo.railX + geo.railW).toFixed(2)],
    railPaddingBox: [+(geo.railX + geo.border).toFixed(2), +(geo.railX + geo.railW - geo.border).toFixed(2)],
    railContentBox: [+(geo.railX + geo.border + geo.pad).toFixed(2), +(geo.railX + geo.railW - geo.border - geo.pad).toFixed(2)],
    seatBox: geo.seatX === null ? null : [geo.seatX, +(geo.seatX + geo.seatW).toFixed(2)],
    paintedDotSpanCss: dotL < 0 ? null : [toCss(dotL), toCss(dotR)],
    paintedDotWidthCss: dotL < 0 ? null : +(toCss(dotR) - toCss(dotL)).toFixed(2),
    ringStrokeLeftCss: ringLeft ? toCss(ringLeft.i) : null,
    ringStrokeRightCss: ringRight ? toCss(ringRight.i) : null,
    clearance_left_css: ringLeft && dotL >= 0 ? +(toCss(dotL) - toCss(ringLeft.i)).toFixed(2) : null,
    clearance_right_css: ringRight && dotR >= 0 ? +(toCss(ringRight.i) - toCss(dotR)).toFixed(2) : null,
    dsf,
};

// ---------- (b) active glyph ink ON the dot, pixel-sampled ---------------
out.activeGlyphContrast = await (async () => {
    const g = await page.evaluate(() => {
        const el = document.querySelectorAll(".channel-rail-item")[3];
        const b = el.querySelector(".rail-glyph").getBoundingClientRect();
        return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
    const im = await grab(page, { x: g.x, y: g.y, width: g.w, height: g.h });
    let darkest = [255, 255, 255]; const counts = new Map();
    for (let i = 0; i < im.data.length; i += 4) {
        const p = [im.data[i], im.data[i + 1], im.data[i + 2]];
        if (lum(p) < lum(darkest)) darkest = p;
        const k = p.join(","); counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    const fill = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    return { darkestGlyphPx: darkest, modalFillPx: fill, ratio: ratio(darkest, fill), note: "α glyph over the live-colour dot" };
})();

// ---------- (c) FOCUS delta on the (always) selected item ----------------
const railClip = await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 6, y: b.y - 6, width: b.width + 12, height: b.height + 12 }; });
const before = await grab(page, railClip);
await page.evaluate(() => document.activeElement?.blur?.());
await page.waitForTimeout(300);
const blurred = await grab(page, railClip);
await page.mouse.move(2, 2);
for (let i = 0; i < 30; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => document.activeElement?.classList?.contains("channel-rail-item") ?? false)) break; }
await page.waitForTimeout(500);
const focused = await grab(page, railClip);
out.focusDelta = (() => {
    let changed = 0, maxD = 0, total = blurred.w * blurred.h;
    for (let i = 0; i < blurred.data.length; i += 4) {
        const a = [blurred.data[i], blurred.data[i + 1], blurred.data[i + 2]];
        const b = [focused.data[i], focused.data[i + 1], focused.data[i + 2]];
        const d = dist(a, b); if (d > 6) changed++; if (d > maxD) maxD = d;
    }
    return { changedPx: changed, totalPx: total, changedPct: +((changed / total) * 100).toFixed(2), maxChannelDistance: +maxD.toFixed(1), focusedItem: null };
})();
out.focusDelta.focusedItem = await page.evaluate(() => ({ text: document.activeElement.textContent.trim(), selected: document.activeElement.getAttribute("aria-selected") }));
await page.screenshot({ path: join(HERE, "shot-C-focus-on-selected-item.png"), clip: railClip });

// ---------- (d) the two-glyph spaces ------------------------------------
async function pickSpace(name) {
    const combo = page.locator('[role=combobox][aria-label="Select color space"]').first();
    await combo.click(); await page.waitForTimeout(600);
    const opts = await page.locator("[role=option]").allTextContents();
    const idx = opts.findIndex((t) => t.trim().toLowerCase() === name.toLowerCase());
    if (idx < 0) { await page.keyboard.press("Escape"); return { ok: false, opts }; }
    await page.locator("[role=option]").nth(idx).click();
    await page.waitForTimeout(1500);
    return { ok: true, opts };
}
out.spaceOptions = (await pickSpace("__none__")).opts;
out.glyphArms = {};
for (const s of ["ICtCp", "Jzazbz", "LCh", "HWB", "XYZ"]) {
    const r = await pickSpace(s);
    if (!r.ok) { out.glyphArms[s] = { picked: false }; continue; }
    out.glyphArms[s] = await page.evaluate(() => {
        const rail = document.querySelector(".channel-rail");
        const rb = rail.getBoundingClientRect();
        return {
            picked: true,
            space: document.querySelector('[role=combobox][aria-label="Select color space"]')?.textContent.trim(),
            railW: +rb.width.toFixed(2), railH: +rb.height.toFixed(2),
            glyphs: [...rail.querySelectorAll(".channel-rail-item")].map((el) => ({
                t: el.textContent.trim(), w: +el.getBoundingClientRect().width.toFixed(2),
                tip: el.getAttribute("aria-label"),
            })),
            anySelected: [...rail.querySelectorAll(".channel-rail-item")].some((el) => el.getAttribute("aria-selected") === "true"),
        };
    });
    await page.screenshot({ path: join(HERE, `shot-G-${s}.png`), clip: await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 8, y: b.y - 10, width: b.width + 200, height: b.height + 20 }; }) });
}
await browser.close();

// ---------- (e) forced colors + focus witness ---------------------------
{
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, forcedColors: "active" });
    await p.goto(URL, { waitUntil: "domcontentloaded" });
    await p.waitForSelector(".channel-rail", { timeout: 60000 });
    await p.waitForTimeout(2500);
    await p.mouse.move(2, 2);
    for (let i = 0; i < 40; i++) { await p.keyboard.press("Tab"); if (await p.evaluate(() => document.activeElement?.classList?.contains("channel-rail-item") ?? false)) break; }
    await p.waitForTimeout(500);
    out.forcedColorsFocus = await p.evaluate(() => {
        const el = document.activeElement; const s = getComputedStyle(el);
        return { onRail: el.classList.contains("channel-rail-item"), text: el.textContent.trim(), focusVisible: el.matches(":focus-visible"), boxShadow: s.boxShadow, outline: `${s.outlineWidth} ${s.outlineStyle}`, bg: s.backgroundColor, color: s.color };
    });
    await p.screenshot({ path: join(HERE, "shot-F-forcedColors-FOCUSED-no-ring.png"), clip: await p.evaluate(() => { const bb = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: bb.x - 8, y: bb.y - 10, width: bb.width + 200, height: bb.height + 20 }; }) });
    await b.close();
}

writeFileSync(join(HERE, "probe-06-dot-focus-glyphs.json"), JSON.stringify(out, null, 2));
console.log("dotVsRing        :", JSON.stringify(out.dotVsRing));
console.log("activeGlyphContr :", JSON.stringify(out.activeGlyphContrast));
console.log("focusDelta       :", JSON.stringify(out.focusDelta));
console.log("spaceOptions     :", JSON.stringify(out.spaceOptions));
for (const [k, v] of Object.entries(out.glyphArms)) console.log("glyphArm", k.padEnd(8), JSON.stringify(v));
console.log("forcedColorsFocus:", JSON.stringify(out.forcedColorsFocus));
