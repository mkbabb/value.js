// B03 · B — #/blob cells (BlobPane D-6 forced-colors limb, pixel deltas, 13-untracked wake shape,
// live magnitudes, focus visibility, 200%-zoom threshold). One chromium browser; one context per cell.
import { chromium } from "playwright";
import { BASE, EV, sha, save, decoder, meanRGB, meanAbsDelta, contrast, parseRGB } from "./lib.mjs";

const out = {};
const browser = await chromium.launch();
const BLOBPANE = ".pane-shell:has(h1:text-is('Blob')), .pane-shell:has(h2:text-is('Blob'))";

async function open(ctx, route = "#/blob") {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    return page;
}
const blobPaneThumb = (page, name) => page.locator(`[data-slot=configurator-row] [role=slider][aria-label="${name}"]`).first();

async function heroSeries(page, dec, clip, ms, step = 150) {
    const hs = []; const t0 = Date.now(); let first = null, last = null;
    while (Date.now() - t0 < ms) { const b = await page.screenshot({ clip }); const h = sha(b); hs.push([Date.now() - t0, h]); if (!first) first = b; last = b; await page.waitForTimeout(step); }
    const distinct = new Set(hs.map((x) => x[1])).size;
    let lastChange = 0; for (let i = 1; i < hs.length; i++) if (hs[i][1] !== hs[i - 1][1]) lastChange = hs[i][0];
    return { n: hs.length, distinct, lastChangeMs: lastChange, firstVsLast: meanAbsDelta(await dec(first), await dec(last)), lastBuf: last };
}
async function waitPark(page, clip, maxMs = 16000) {
    const t0 = Date.now(); let prev = null, same = 0;
    while (Date.now() - t0 < maxMs) { const h = sha(await page.screenshot({ clip })); same = h === prev ? same + 1 : 0; prev = h; if (same >= 6) return Date.now() - t0; await page.waitForTimeout(200); }
    return null;
}

async function mainCell() {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await open(ctx);
        const dec = await decoder(ctx);
        const r = {};
        r.geo = await page.evaluate(() => {
            const R = (e) => { const b = e.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
            const row = document.querySelector("[data-slot=configurator-row]");
            const pane = row.closest(".pane-shell"); const card = pane.querySelector(".pane-shell__card") ?? pane;
            const canvas = document.querySelector(".goo-blob-canvas");
            let port = row.parentElement; while (port && !/(auto|scroll)/.test(getComputedStyle(port).overflowY)) port = port.parentElement;
            const sl = row.querySelector("[data-slot=slider]"); const thumb = row.querySelector("[role=slider]");
            const kids = [...sl.querySelectorAll("*")].map((e) => ({ cls: e.className.toString().slice(0, 50), bg: getComputedStyle(e).backgroundColor, bgi: getComputedStyle(e).backgroundImage.slice(0, 40), r: R(e) }));
            const texts = [...row.querySelectorAll("*")].filter((e) => e.children.length === 0 && e.textContent.trim()).map((e) => ({ t: e.textContent.trim(), fs: getComputedStyle(e).fontSize, col: getComputedStyle(e).color, cls: e.className.toString().slice(0, 40) }));
            const title = pane.querySelector(".config-section-title");
            const well = pane.querySelector(".console-well");
            return {
                card: R(card), canvas: R(canvas), formOverPreview: +((card.getBoundingClientRect().width * card.getBoundingClientRect().height) / (canvas.getBoundingClientRect().width * canvas.getBoundingClientRect().height)).toFixed(2),
                port: port ? { sh: port.scrollHeight, ch: port.clientHeight, screens: +(port.scrollHeight / innerHeight).toFixed(2) } : null,
                docScrollH: document.documentElement.scrollHeight,
                sliderKids: kids, thumb: R(thumb), thumbBoxShadow: getComputedStyle(thumb).boxShadow.slice(0, 80),
                ladder: { sectionTitle: title && getComputedStyle(title).fontSize, row: texts },
                well: well && { bg: getComputedStyle(well).backgroundColor, border: getComputedStyle(well).borderTopColor },
                rows: document.querySelectorAll("[data-slot=configurator-row] [role=slider]").length,
            };
        });
        // --- focus visibility: keyboard modality, then focus the first Blob-pane thumb
        const thumb = blobPaneThumb(page, "Body radius");
        await thumb.scrollIntoViewIfNeeded();
        const tb = await thumb.boundingBox();
        const clip = { x: tb.x - 8, y: tb.y - 8, width: tb.width + 16, height: tb.height + 16 };
        const unf = await dec(await page.screenshot({ clip }));
        await page.keyboard.press("Shift");
        await thumb.focus();
        await page.waitForTimeout(400);
        const fBuf = await page.screenshot({ clip });
        const foc = await dec(fBuf);
        r.focusStyle = await thumb.evaluate((e) => { const cs = getComputedStyle(e); return { fv: e.matches(":focus-visible"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 160) }; });
        const ratios = [];
        for (let i = 0; i < foc.d.length; i += 4) { const a = [foc.d[i], foc.d[i + 1], foc.d[i + 2]], b = [unf.d[i], unf.d[i + 1], unf.d[i + 2]]; if (Math.max(...a.map((v, k) => Math.abs(v - b[k]))) > 12) ratios.push(contrast(a, b)); }
        ratios.sort((a, b) => a - b);
        r.focusRing = { changedPx: ratios.length, minRatio: ratios[0] ?? null, medianRatio: ratios[Math.floor(ratios.length / 2)] ?? null, p90: ratios[Math.floor(ratios.length * 0.9)] ?? null, maxRatio: ratios[ratios.length - 1] ?? null };
        await page.screenshot({ path: EV + "B-focus-thumb-light.png", clip: { x: clip.x - 40, y: clip.y - 30, width: clip.width + 200, height: clip.height + 40 } });
        await thumb.blur();
        // --- wake shape + pixel deltas on the hero canvas (the only rendered blob)
        const cb = await page.locator(".goo-blob-canvas").boundingBox();
        const hclip = { x: cb.x, y: cb.y, width: cb.width, height: cb.height };
        await page.mouse.move(1430, 890);
        r.parkMs0 = await waitPark(page, hclip);
        const wake = [];
        for (const [name, key, label] of [["Smoothness", "End", "membrane.smoothK (untracked leaf)"], ["Warp", "End", "membrane.warpAmp (untracked leaf)"], ["Hue range", "End", "color.hueRange (tracked leaf)"], ["Satellites", "Home", "geometry.satelliteCount 3→0 (tracked)"], ["Body radius", "End", "geometry.bodyRadius (tracked)"]]) {
            const parked = await waitPark(page, hclip);
            const before = await page.screenshot({ clip: hclip });
            const t = blobPaneThumb(page, name);
            const valBefore = await t.getAttribute("aria-valuenow");
            await t.focus(); await page.keyboard.press(key);
            const valAfter = await t.getAttribute("aria-valuenow");
            await t.blur(); await page.mouse.move(1430, 890);
            const s = await heroSeries(page, dec, hclip, 1500);
            const settled = await waitPark(page, hclip);
            const after = await page.screenshot({ clip: hclip });
            wake.push({ leaf: label, valBefore, valAfter, parkedBeforeMs: parked, distinctIn1500ms: s.distinct, settleMs: settled, beforeVsSettled: meanAbsDelta(await dec(before), await dec(after)), identical: sha(before) === sha(after) });
        }
        r.wake = wake;
        return r;
    } finally { await ctx.close(); }
}

async function forcedCell() {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    try {
        const page = await open(ctx);
        const read = () => page.evaluate(() => {
            const row = document.querySelector("[data-slot=configurator-row]");
            const sl = row.querySelector("[data-slot=slider]"); const pane = row.closest(".pane-shell");
            const btn = [...pane.querySelectorAll("button")].find((b) => /reset|copy/i.test(b.textContent));
            const cs = (e) => e && { bg: getComputedStyle(e).backgroundColor, bc: getComputedStyle(e).borderTopColor, bs: getComputedStyle(e).boxShadow.slice(0, 80), fca: getComputedStyle(e).forcedColorAdjust };
            return { mm: matchMedia("(forced-colors: active)").matches, slider: cs(sl), parts: [...sl.querySelectorAll("*")].map((e) => ({ cls: e.className.toString().slice(0, 40), ...cs(e) })), well: cs(pane.querySelector(".console-well")), control: btn && { t: btn.textContent.trim(), ...cs(btn) } };
        });
        const a = await read(); await page.waitForTimeout(1200); const b = await read();
        const pane = await page.locator("[data-slot=configurator-row]").first().evaluate((e) => { const b = e.closest(".pane-shell").getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: Math.min(b.height, 500) }; });
        await page.screenshot({ path: EV + "B-forced-colors-blob-1440.png", clip: pane });
        return { first: a, settled: b, stable: JSON.stringify(a) === JSON.stringify(b) };
    } finally { await ctx.close(); }
}

async function widthSweep() {
    const res = [];
    for (const w of [1440, 1280, 1100, 1024, 960, 800, 720, 390]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        try {
            const page = await open(ctx);
            res.push({ w, ...(await page.evaluate(() => {
                const vis = (e) => { if (!e) return false; const b = e.getBoundingClientRect(); return b.width > 0 && b.right > 0 && b.left < innerWidth && getComputedStyle(e).visibility !== "hidden"; };
                const panes = [...document.querySelectorAll(".pane-shell")].filter((p) => !p.parentElement.closest(".pane-shell"));
                return { panes: panes.map((p) => ({ title: (p.querySelector("h1,h2,[data-slot=pane-title]")?.textContent ?? "").trim().slice(0, 16) || (p.querySelector(".channel-strip") ? "Picker" : "?"), visible: vis(p), x: Math.round(p.getBoundingClientRect().x) })), blobSliderVisible: vis(document.querySelector("[data-slot=configurator-row] [role=slider]")) };
            })) });
        } finally { await ctx.close(); }
    }
    return res;
}

try {
    out.main = await mainCell();
    out.forced = await forcedCell();
    out.widths = await widthSweep();
} finally { await browser.close(); }
save("B-blob.json", out);
console.log(JSON.stringify(out, (k, v) => (k === "sliderKids" || k === "parts" ? v.slice(0, 5) : v)).slice(0, 7000));
