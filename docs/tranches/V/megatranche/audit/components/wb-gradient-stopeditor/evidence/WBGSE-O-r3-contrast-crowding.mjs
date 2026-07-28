// worker-O re-derivation probe 2 — D2-04 contrast, D2-17 forced-colors harness, D2-15 crowding, D2-03 drag ordering
import { chromium, webkit } from "playwright";
const URL = "http://localhost:9000/#/gradient";

// ---------- D2-17 harness: does WebKit honour forcedColors? ----------
for (const [name, engine] of [["webkit", webkit], ["chromium", chromium]]) {
    const b = await engine.launch();
    let out;
    try {
        const c = await b.newContext({ viewport: { width: 900, height: 700 }, forcedColors: "active" });
        const p = await c.newPage();
        await p.setContent("<div id=x>hi</div>");
        out = await p.evaluate(() => ({
            forcedActive: matchMedia("(forced-colors: active)").matches,
            forcedNone: matchMedia("(forced-colors: none)").matches,
        }));
        await c.close();
    } catch (e) {
        out = { threw: String(e).slice(0, 160) };
    }
    console.log(`D2-17 engine ${name}:`, JSON.stringify(out));
    await b.close();
}

// ---------- the rest on chromium against the live route ----------
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2200);

// ---------- D2-04: ring:fill contrast over a ten-hue ramp ----------
const contrast = await page.evaluate(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const g = cv.getContext("2d", { willReadFrequently: true });
    const toRGB = (css) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
    const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const L = (rgb) => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
    const ratio = (a, b) => { const la = L(a), lb = L(b); return +((Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)).toFixed(2); };
    const over = (fg, a, bg) => fg.map((c, i) => Math.round(a * c + (1 - a) * bg[i]));
    const hues = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
    const rows = hues.map((h) => {
        const fill = toRGB(`oklch(0.7 0.2 ${h})`);
        const ring = over([255, 255, 255], 0.8, fill); // border-white/80 over the fill
        return { h, fill, ringFill: ratio(ring, fill) };
    });
    // the white-ramp case
    const white = toRGB("#ffffff"), near = toRGB("#fafafa");
    const ringW = over([255, 255, 255], 0.8, white);
    return { rows, whiteRamp: { ringVsFill: ratio(ringW, white), fillVsRamp: ratio(white, near) } };
});
console.log("D2-04 contrast:", JSON.stringify(contrast));

// ---------- D2-03: drag past neighbour -> model order + emitted CSS ----------
const bar = await page.evaluate(() => { const r = document.querySelector('[data-testid="gradient-stop-bar"]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
await page.mouse.click(bar.x + bar.w * 0.5, bar.y + bar.h / 2); // add at 50%
await page.waitForTimeout(300);
const h0 = await page.evaluate(() => { const h = document.querySelector("[data-stop-id]"); const b = h.getBoundingClientRect(); return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 }; });
await page.mouse.move(h0.cx, h0.cy);
await page.mouse.down();
for (let i = 1; i <= 10; i++) await page.mouse.move(h0.cx + (bar.w * 0.35 * i) / 10, h0.cy);
await page.mouse.up();
await page.waitForTimeout(500);
const ordering = await page.evaluate(() => ({
    labels: [...document.querySelectorAll("[data-stop-id]")].map((h) => h.getAttribute("aria-label")),
    css: (document.querySelector('[contenteditable="true"]')?.innerText || "").replace(/\s+/g, " ").slice(0, 200),
    railHead: getComputedStyle(document.querySelector('[data-testid="gradient-stop-bar"]')).backgroundImage.slice(0, 220),
    verdict: document.querySelector('[data-testid="gradient-parse-verdict"]')?.textContent?.trim() ?? null,
}));
console.log("D2-03 ordering:", JSON.stringify(ordering));

// ---------- D2-15: crowding on a 10-stop model ----------
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1800);
const editor = page.locator('[contenteditable="true"]').first();
await editor.click();
await page.keyboard.press("ControlOrMeta+a");
const tenStop = "linear-gradient(90deg, " + [0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((h, i) => `oklch(0.7 0.2 ${h}) ${Math.round((i / 9) * 100)}%`).join(", ") + ")";
await page.keyboard.type(tenStop, { delay: 4 });
await page.waitForTimeout(1500);
const crowd = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("[data-stop-id]")].map((h) => { const b = h.getBoundingClientRect(); return +(b.x + b.width / 2).toFixed(1); });
    const gaps = hs.slice(1).map((v, i) => +(v - hs[i]).toFixed(1));
    return { n: hs.length, gaps };
});
console.log("D2-15 crowding desktop:", JSON.stringify(crowd));
await ctx.close();

// mobile cell
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
const mp = await m.newPage();
await mp.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await mp.waitForTimeout(2200);
const mgeo = await mp.evaluate(() => {
    const bar = document.querySelector('[data-testid="gradient-stop-bar"]');
    if (!bar) return { noBar: true };
    const r = bar.getBoundingClientRect();
    const h = document.querySelector("[data-stop-id]");
    const cs = getComputedStyle(h, "::before");
    return { railW: +r.width.toFixed(1), pseudo: cs.width + "x" + cs.height, coarse: matchMedia("(pointer: coarse)").matches };
});
console.log("D2-15/D2-05 mobile:", JSON.stringify(mgeo));
await browser.close();
