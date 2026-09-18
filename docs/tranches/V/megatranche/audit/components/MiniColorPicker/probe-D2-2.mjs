// CHALLENGE-D pass 2 — probe 2. Marker legibility by pixel scanline + forced-colors.
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-2.mjs
import { webkit, chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const HERE = import.meta.dirname;
const SHOTS = resolve(HERE, "shots-p2");
mkdirSync(SHOTS, { recursive: true });
const ORIGIN = "http://localhost:9000";
const out = {};

async function openChain(page) {
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForSelector('button[aria-label="Filters"]', { timeout: 30000 });
    await page.waitForTimeout(2200);
    for (let a = 0; a < 3; a++) {
        await page.click('button[aria-label="Filters"]');
        await page.waitForTimeout(700);
        if (await page.locator('button[aria-label^="Open color picker"]').count()) break;
    }
    await page.locator('button[aria-label^="Open color picker"]').first().click({ force: true, timeout: 15000 });
    await page.waitForSelector(".sv-canvas", { timeout: 15000 });
    await page.waitForTimeout(500);
}

const SCAN = async (page, b64) =>
    page.evaluate(async (dataB64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + dataB64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const g = c.getContext("2d");
        g.drawImage(img, 0, 0);
        const dpr = window.devicePixelRatio || 1;
        const sv = document.querySelector(".sv-canvas");
        const dlg = sv.closest('[role="dialog"]');
        const dr = dlg.getBoundingClientRect();
        const px = (x, y) => {
            const d = g.getImageData(Math.round((x - dr.left) * dpr), Math.round((y - dr.top) * dpr), 1, 1).data;
            return [d[0], d[1], d[2]];
        };
        const lum = ([r, gg, b]) => {
            const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
            return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(b);
        };
        const K = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return +((l1 + 0.05) / (l2 + 0.05)).toFixed(3); };

        // --- hue rail handle: horizontal scanline through its vertical centre
        const rail = dlg.querySelectorAll(":scope > div")[1];
        const rb = rail.getBoundingClientRect();
        const h = rail.querySelector("div").getBoundingClientRect();
        const cy = rb.top + rb.height / 2;
        const cx = h.left + h.width / 2;
        const railScan = [];
        for (let dx = -14; dx <= 14; dx++) railScan.push({ dx, px: px(cx + dx, cy) });
        const ringPx = px(h.left + 1, cy);          // 1px inside the 2px ring, left arc
        const fillPx = px(cx, cy);                   // dead centre of the handle
        const trackPx = px(cx + 13, cy);             // just outside the 12px handle

        // --- SV thumb: horizontal scanline through its centre
        const thumb = sv.querySelector("div").getBoundingClientRect();
        const tx = thumb.left + thumb.width / 2, ty = thumb.top + thumb.height / 2;
        const svScan = [];
        for (let dx = -16; dx <= 16; dx++) svScan.push({ dx, px: px(tx + dx, ty) });
        const tRing = px(thumb.left + 1, ty);
        const tFill = px(tx, ty);
        const tField = px(tx + 11, ty);

        const hexSpan = [...dlg.querySelectorAll("span")].find((s) => /^#[0-9a-f]{6}$/i.test(s.textContent.trim()));
        return {
            dpr, imgW: img.naturalWidth, dialogW: +dr.width.toFixed(1),
            hex: hexSpan ? hexSpan.textContent.trim() : null,
            rail: { ringPx, fillPx, trackPx, ringVsTrack: K(ringPx, trackPx), fillVsTrack: K(fillPx, trackPx), scan: railScan },
            sv: { ringPx: tRing, fillPx: tFill, fieldPx: tField, ringVsField: K(tRing, tField), fillVsField: K(tFill, tField), scan: svScan },
        };
    }, b64);

// ---------------- WebKit: scanlines at 3 hues + the white corner -------------
{
    const browser = await webkit.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await openChain(page);
    const dlg = await page.$('.sv-canvas >> xpath=ancestor::*[@role="dialog"][1]');
    const rail = await page.$('.sv-canvas >> xpath=following-sibling::div[1]');
    const rb = await rail.boundingBox();
    const sv = await page.$(".sv-canvas");
    const sb = await sv.boundingBox();

    out.webkit = {};
    for (const [name, frac] of [["hue-000-red", 0.004], ["hue-060-yellow", 1 / 6], ["hue-180-cyan", 0.5], ["hue-210-blue", 210 / 360]]) {
        await page.mouse.click(rb.x + rb.width * frac, rb.y + rb.height / 2);
        await page.waitForTimeout(200);
        // keep the SV thumb mid-field so it is not clipped
        await page.mouse.click(sb.x + sb.width * 0.55, sb.y + sb.height * 0.45);
        await page.waitForTimeout(200);
        const shot = await dlg.screenshot();
        writeFileSync(resolve(SHOTS, `scan-${name}.png`), shot);
        out.webkit[name] = await SCAN(page, shot.toString("base64"));
    }
    // white corner: sat->0, val->1
    await page.mouse.click(sb.x + 1, sb.y + 1);
    await page.waitForTimeout(250);
    const shot = await dlg.screenshot();
    writeFileSync(resolve(SHOTS, "scan-white-corner.png"), shot);
    out.webkit["white-corner"] = await SCAN(page, shot.toString("base64"));
    await ctx.close();
    await browser.close();
}

// ---------------- Chromium: forced-colors ACTIVE (measured, not reasoned) ----
{
    const browser = await chromium.launch();
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        forcedColors: "active",
    });
    const page = await ctx.newPage();
    await openChain(page);
    const dlg = await page.$('.sv-canvas >> xpath=ancestor::*[@role="dialog"][1]');
    const shot = await dlg.screenshot();
    writeFileSync(resolve(SHOTS, "forced-colors-mini.png"), shot);
    out.forcedColors = await page.evaluate(() => {
        const sv = document.querySelector(".sv-canvas");
        const dlg = sv.closest('[role="dialog"]');
        const rail = dlg.querySelectorAll(":scope > div")[1];
        const thumb = sv.querySelector("div");
        const handle = rail.querySelector("div");
        const g = (el) => {
            const s = getComputedStyle(el);
            return {
                backgroundImage: s.backgroundImage.slice(0, 160),
                backgroundColor: s.backgroundColor,
                borderColor: s.borderColor,
                forcedColorAdjust: s.forcedColorAdjust,
                color: s.color,
            };
        };
        return {
            mediaMatches: window.matchMedia("(forced-colors: active)").matches,
            svCanvas: g(sv),
            rail: g(rail),
            thumb: g(thumb),
            handle: g(handle),
            readout: (() => {
                const s = [...dlg.querySelectorAll("span")].find((e) => /^#[0-9a-f]{6}$/i.test(e.textContent.trim()));
                return s ? g(s) : null;
            })(),
            outputDot: (() => {
                const s = [...dlg.querySelectorAll("span")].find((e) => e.style.backgroundColor);
                return s ? { ...g(s), inlineBg: s.style.backgroundColor } : null;
            })(),
        };
    });
    // pixel proof: do the two instruments still paint colour under forced colors?
    out.forcedColorsPixels = await page.evaluate(async (dataB64) => {
        const img = new Image();
        img.src = "data:image/png;base64," + dataB64;
        await img.decode();
        const c = document.createElement("canvas");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const sv = document.querySelector(".sv-canvas");
        const dlg = sv.closest('[role="dialog"]');
        const dr = dlg.getBoundingClientRect();
        const px = (x, y) => { const d = g.getImageData(Math.round(x - dr.left), Math.round(y - dr.top), 1, 1).data; return [d[0], d[1], d[2]]; };
        const svb = sv.getBoundingClientRect();
        const rail = dlg.querySelectorAll(":scope > div")[1].getBoundingClientRect();
        const uniq = new Set();
        const svSamples = [];
        for (let i = 1; i <= 5; i++) for (let j = 1; j <= 3; j++) {
            const p = px(svb.left + (svb.width * i) / 6, svb.top + (svb.height * j) / 4);
            svSamples.push(p); uniq.add(p.join(","));
        }
        const railSamples = [];
        const ru = new Set();
        for (let i = 1; i <= 6; i++) { const p = px(rail.left + (rail.width * i) / 7, rail.top + rail.height / 2); railSamples.push(p); ru.add(p.join(",")); }
        return { svSamples, svDistinct: uniq.size, railSamples, railDistinct: ru.size };
    }, shot.toString("base64"));
    await ctx.close();
    await browser.close();
}

writeFileSync(resolve(HERE, "probe-D2-2.json"), JSON.stringify(out, null, 1));
const brief = {};
for (const [k, v] of Object.entries(out.webkit || {}))
    brief[k] = { hex: v.hex, railRingVsTrack: v.rail.ringVsTrack, railFillVsTrack: v.rail.fillVsTrack, railRing: v.rail.ringPx, railFill: v.rail.fillPx, railTrack: v.rail.trackPx, svRingVsField: v.sv.ringVsField, svFillVsField: v.sv.fillVsField, svRing: v.sv.ringPx, svFill: v.sv.fillPx, svField: v.sv.fieldPx };
console.log(JSON.stringify({ brief, forcedColors: out.forcedColors, forcedColorsPixels: out.forcedColorsPixels }, null, 1));
