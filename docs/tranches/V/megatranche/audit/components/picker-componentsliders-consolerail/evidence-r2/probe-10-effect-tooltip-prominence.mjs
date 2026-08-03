// CHALLENGE-D r2 · probe 10 — (a) what a rail selection actually DOES to the
// instrument (scroll delta / focus move / any pixel change outside the rail),
// (b) tooltip caption contrast, (c) hover-pill vs selected-dot prominence,
// (d) dark + reduced-motion witnesses. Read-only.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const URL = process.env.PROBE_URL ?? "http://localhost:9000/";
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
const delta = (a, b, thr = 6) => { let n = 0, m = 0; for (let i = 0; i < a.data.length; i += 4) { const d = dist([a.data[i], a.data[i + 1], a.data[i + 2]], [b.data[i], b.data[i + 1], b.data[i + 2]]); if (d > thr) n++; if (d > m) m = d; } return { changedPx: n, pct: +((n / (a.w * a.h)) * 100).toFixed(2), max: +m.toFixed(1) }; };

const out = {};
const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
await page.waitForSelector(".channel-rail", { timeout: 60000 });
await page.waitForTimeout(2500);

// ---- (a) what does a rail selection DO? ---------------------------------
const consoleClip = await page.evaluate(() => { const b = document.querySelector(".sliders-console").getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });
const railClip = await page.evaluate(() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: b.x - 4, y: b.y - 4, width: b.width + 8, height: b.height + 8 }; });
const rowsClip = await page.evaluate(() => { const b = document.querySelector(".channel-rows").getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height }; });

const before = { console: await grab(page, consoleClip), rows: await grab(page, rowsClip) };
out.beforeSelect = await page.evaluate(() => ({
    scrollY: window.scrollY,
    consoleScrollTop: document.querySelector(".sliders-console")?.scrollTop,
    rowsScrollTop: document.querySelector(".channel-rows")?.scrollTop,
    activeEl: document.activeElement?.tagName + "." + (document.activeElement?.className?.toString?.().slice(0, 40) ?? ""),
    railRect: (() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2) }; })(),
}));
await page.click(".channel-rail-item >> nth=2");   // 'b'
await page.waitForTimeout(1000);
await page.mouse.move(2, 2);
await page.waitForTimeout(600);
out.afterSelect = await page.evaluate(() => ({
    scrollY: window.scrollY,
    consoleScrollTop: document.querySelector(".sliders-console")?.scrollTop,
    rowsScrollTop: document.querySelector(".channel-rows")?.scrollTop,
    activeEl: document.activeElement?.tagName + "." + (document.activeElement?.className?.toString?.().slice(0, 40) ?? ""),
    activeIsSlider: document.activeElement?.getAttribute("role") === "slider",
    railRect: (() => { const b = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2) }; })(),
}));
const after = { console: await grab(page, consoleClip), rows: await grab(page, rowsClip) };
out.selectionEffect = {
    consoleDelta: delta(before.console, after.console),
    rowsDelta_theSlidersThemselves: delta(before.rows, after.rows),
    note: "rowsDelta measures whether ANYTHING in the slider column responds to a rail selection",
};

// ---- (b) tooltip caption contrast ---------------------------------------
await page.hover(".channel-rail-item >> nth=1");
await page.waitForTimeout(1200);
out.tooltip = await page.evaluate(() => {
    const tips = [...document.querySelectorAll("[role=tooltip]")];
    const vis = tips.find((t) => t.getBoundingClientRect().width > 0);
    if (!vis) return null;
    const b = vis.getBoundingClientRect();
    const caption = vis.querySelector(".fira-code");
    const cs = caption ? getComputedStyle(caption) : null;
    const cb = caption?.getBoundingClientRect();
    return {
        box: { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2) },
        text: vis.textContent.trim().slice(0, 80),
        captionOpacity: cs?.opacity, captionColor: cs?.color, captionFontSize: cs?.fontSize,
        captionBox: cb ? { x: +cb.x.toFixed(2), y: +cb.y.toFixed(2), w: +cb.width.toFixed(2), h: +cb.height.toFixed(2) } : null,
        maxWidthClass: vis.className.toString().includes("max-w-56"),
    };
});
if (out.tooltip?.captionBox) {
    const im = await grab(page, { x: out.tooltip.captionBox.x, y: out.tooltip.captionBox.y, width: out.tooltip.captionBox.w, height: out.tooltip.captionBox.h });
    let darkest = [255, 255, 255]; const counts = new Map();
    for (let i = 0; i < im.data.length; i += 4) { const p = [im.data[i], im.data[i + 1], im.data[i + 2]]; if (lum(p) < lum(darkest)) darkest = p; const k = p.join(","); counts.set(k, (counts.get(k) ?? 0) + 1); }
    const ground = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    out.tooltipCaptionContrast = { darkestPx: darkest, groundPx: ground, ratio: ratio(darkest, ground) };
}
await page.screenshot({ path: join(HERE, "shot-T-tooltip.png"), clip: await page.evaluate(() => { const t = [...document.querySelectorAll("[role=tooltip]")].find((x) => x.getBoundingClientRect().width > 0); const b = t.getBoundingClientRect(); return { x: Math.max(0, b.x - 10), y: Math.max(0, b.y - 10), width: b.width + 120, height: b.height + 20 }; }) });
await page.mouse.move(2, 2); await page.waitForTimeout(600);

// ---- (c) hover pill vs selected dot prominence --------------------------
const rest = await grab(page, railClip);
await page.hover(".channel-rail-item >> nth=0");   // unselected item ('L' -- 'b' is selected)
await page.waitForTimeout(700);
const hovered = await grab(page, railClip);
out.prominence = {
    hoverVsRest: delta(rest, hovered),
    note: "selected-dot delta measured earlier in probe-06 focusDelta; both quoted in the report",
};
await page.screenshot({ path: join(HERE, "shot-P-hover-pill-vs-dot.png"), clip: railClip });
await browser.close();

// ---- (d) dark + reduced-motion witnesses --------------------------------
for (const [tag, opts] of [["dark", { colorScheme: "dark" }], ["reducedMotion", { reducedMotion: "reduce" }]]) {
    const b = await webkit.launch();
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3, ...opts });
    await p.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
    await p.waitForSelector(".channel-rail", { timeout: 60000 });
    await p.waitForTimeout(2500);
    await p.click(".channel-rail-item >> nth=0");
    await p.waitForTimeout(900);
    if (tag === "reducedMotion") {
        const el = await p.$(".channel-rail-item >> nth=2");
        const bb = await el.boundingBox();
        await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2);
        await p.mouse.down(); await p.waitForTimeout(250);
        await p.screenshot({ path: join(HERE, "shot-PRM-press-scale-VISIBLE.png"), clip: await p.evaluate(() => { const bb2 = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: bb2.x - 6, y: bb2.y - 6, width: bb2.width + 12, height: bb2.height + 12 }; }) });
        out.prmPress = await p.evaluate(() => ({ transform: getComputedStyle(document.querySelectorAll(".channel-rail-item")[2]).transform }));
        await p.mouse.up();
    } else {
        await p.mouse.move(2, 2); await p.waitForTimeout(600);
        await p.screenshot({ path: join(HERE, "shot-D-dark.png"), clip: await p.evaluate(() => { const bb2 = document.querySelector(".channel-rail").getBoundingClientRect(); return { x: bb2.x - 8, y: bb2.y - 10, width: bb2.width + 230, height: bb2.height + 20 }; }) });
    }
    await b.close();
}

writeFileSync(join(HERE, "probe-10-effect-tooltip-prominence.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
