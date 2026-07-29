// CHALLENGE-D pass 4 — probe 6: the mini-picker clobbers typed input; the
// mini-picker's keyboard/AT surface; the swatch under forced colors (pixel).
import { webkit } from "playwright";
import fs from "node:fs";
const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
const BASE = "http://192.168.1.166:9000";
const R = {};
async function stub(page) {
    await page.route(/^https?:\/\/api\.color\.babb\.dev/, async (route) => {
        const u = route.request().url();
        const j = (b) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(b) });
        if (u.includes("/colors/tags")) return j([]);
        if (u.includes("/sessions/me")) return route.fulfill({ status: 401, contentType: "application/json", body: "{}" });
        if (u.includes("/palettes")) return j({ palettes: [], hasMore: false });
        return j({});
    });
}
const browser = await webkit.launch();

// ── 1. typed text clobbered by opening the picker + picker AT surface
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(3800);
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700);
    await page.fill('input[aria-label="Search by CSS color"]', "oklch(0.72 0.14 244)");
    const typed = await page.inputValue('input[aria-label="Search by CSS color"]');
    await page.click('button[aria-label^="Open color picker"]');
    await page.waitForTimeout(700);
    const afterOpen = await page.inputValue('input[aria-label="Search by CSS color"]');
    // drag the hue strip a little
    const hue = page.locator('[role="dialog"] div[style*="linear-gradient(to right, #f00"]').first();
    let afterHue = afterOpen;
    if (await hue.count()) {
        const b = await hue.boundingBox();
        await page.mouse.move(b.x + b.width * 0.75, b.y + b.height / 2);
        await page.mouse.down(); await page.mouse.up();
        await page.waitForTimeout(400);
        afterHue = await page.inputValue('input[aria-label="Search by CSS color"]');
    }
    R.clobber = { typed, afterOpen, afterHue, clobberedOnOpen: typed !== afterOpen, clobberedOnHue: typed !== afterHue };

    R.miniPickerAT = await page.evaluate(() => {
        const dialogs = [...document.querySelectorAll('[role="dialog"]')];
        const inner = dialogs[dialogs.length - 1];
        if (!inner) return { error: "no mini picker" };
        const sv = inner.querySelector(".sv-canvas");
        const hueEl = [...inner.querySelectorAll("div")].find((d) => (d.getAttribute("style") || "").includes("linear-gradient(to right, #f00"));
        const desc = (el) => el ? { tag: el.tagName, role: el.getAttribute("role"), tabIndex: el.tabIndex, ariaLabel: el.getAttribute("aria-label"), ariaValueNow: el.getAttribute("aria-valuenow"), ariaValueText: el.getAttribute("aria-valuetext"), w: +el.getBoundingClientRect().width.toFixed(1), h: +el.getBoundingClientRect().height.toFixed(1) } : null;
        return {
            dialogCount: dialogs.length,
            svCanvas: desc(sv), hueStrip: desc(hueEl),
            focusables: [...inner.querySelectorAll('button,input,[tabindex]:not([tabindex="-1"]),[role="slider"]')].map((e) => ({ tag: e.TagName || e.tagName, name: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24) || "(none)", w: +e.getBoundingClientRect().width.toFixed(1), h: +e.getBoundingClientRect().height.toFixed(1) })),
            innerRect: (() => { const b = inner.getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) }; })(),
            outerRect: (() => { const b = dialogs[0].getBoundingClientRect(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), bottom: +b.bottom.toFixed(1) }; })(),
            nested: !!inner.closest('[role="dialog"]:not(:scope)') || dialogs.length > 1,
        };
    });
    const bb = await page.locator('[role="dialog"]').last().boundingBox();
    if (bb) await page.screenshot({ path: `${OUT}p4-minipicker.png`, clip: { x: Math.max(0, bb.x - 20), y: Math.max(0, bb.y - 20), width: bb.width + 40, height: bb.height + 40 } });
    await page.close();
}

// ── 2. swatch under forced colors — pixel read
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: "light", forcedColors: "active" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(3800);
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(800);
    const sw = await page.locator('button[aria-label^="Open color picker"]').boundingBox();
    if (sw) await page.screenshot({ path: `${OUT}p4-swatch-forced.png`, clip: { x: sw.x - 4, y: sw.y - 4, width: sw.width + 8, height: sw.height + 8 } });
    R.forcedSwatchBox = sw;
    const bb = await page.locator('[role="dialog"]').first().boundingBox();
    if (bb) await page.screenshot({ path: `${OUT}p4-forced-open-crop.png`, clip: { x: bb.x - 8, y: Math.max(0, bb.y - 8), width: bb.width + 16, height: Math.min(bb.height + 16, 1000 - Math.max(0, bb.y - 8)) } });
    await page.close();
}
await browser.close();
fs.writeFileSync(`${OUT}p4-6.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1));
