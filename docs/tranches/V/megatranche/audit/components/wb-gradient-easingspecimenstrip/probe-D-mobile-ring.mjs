import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/gradient";
const browser = await chromium.launch();

// mobile 390 — scroll strip into view first
{
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    const m = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        if (!s) return { err: "no strip at 390" };
        s.scrollIntoView({ block: "center" });
        const tiles = [...s.querySelectorAll(".specimen-tile")];
        return {
            scrollWidth: s.scrollWidth, clientWidth: s.clientWidth,
            hiddenPct: +((1 - s.clientWidth / s.scrollWidth) * 100).toFixed(1),
            visibleTiles: tiles.filter(t => { const r = t.getBoundingClientRect(), p = s.getBoundingClientRect(); return r.left >= p.left - 1 && r.right <= p.right + 1; }).length,
            totalTiles: tiles.length,
            hoverMedia: matchMedia("(hover: hover)").matches,
            pointerCoarse: matchMedia("(pointer: coarse)").matches,
            anyHover: matchMedia("(any-hover: hover)").matches,
            tileRect: (() => { const r = tiles[0].getBoundingClientRect(); return { w: +r.width.toFixed(2), h: +r.height.toFixed(2) }; })(),
        };
    });
    console.log("MOBILE390", JSON.stringify(m, null, 1));
    await page.waitForTimeout(500);
    const el = page.locator(".specimen-strip").first();
    const b = await el.boundingBox();
    if (b) await page.screenshot({ path: `${OUT}/p-mobile390.png`, clip: { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - 26), width: Math.min(382, b.width + 16), height: b.height + 40 }, scale: "device" });
    await ctx.close();
}

// tight ring-clip crop @1440
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    const geo = await page.evaluate(() => {
        const s = document.querySelector(".specimen-strip");
        const t = [...s.querySelectorAll(".specimen-tile")][1];
        t.focus();
        const sr = s.getBoundingClientRect(), tr = t.getBoundingClientRect();
        return { port: { top: +sr.top.toFixed(2), bottom: +sr.bottom.toFixed(2), left: +sr.left.toFixed(2) }, tile: { top: +tr.top.toFixed(2), bottom: +tr.bottom.toFixed(2), left: +tr.left.toFixed(2), right: +tr.right.toFixed(2) }, headroomBelow: +(sr.bottom - tr.bottom).toFixed(2), headroomAbove: +(tr.top - sr.top).toFixed(2) };
    });
    console.log("RINGGEO", JSON.stringify(geo));
    await page.screenshot({ path: `${OUT}/p-ringclip.png`, clip: { x: geo.tile.left - 18, y: geo.port.top - 12, width: 130, height: geo.port.bottom - geo.port.top + 28 }, scale: "device" });
    await ctx.close();
}
await browser.close();
