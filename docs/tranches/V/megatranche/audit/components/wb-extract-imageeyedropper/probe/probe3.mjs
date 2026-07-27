// CHALLENGE-D probe 3 — dark-specimen contrast, RTL, forced-colors, 200% zoom.
import { webkit, chromium } from "playwright";
const DIR = new URL(".", import.meta.url).pathname;
const out = {};

async function open(page, img) {
    await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    await page.locator("input[type=file]").first().setInputFiles(DIR + img);
    await page.waitForSelector('img[alt="Uploaded image"]');
    await page.waitForTimeout(1200);
    const b = await page.locator('div[aria-label="Image preview area, tap to sample colors"]').boundingBox();
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForSelector("canvas.eyedropper-canvas");
    await page.waitForTimeout(900);
}
const bar = () => {
    const cv = document.querySelector("canvas.eyedropper-canvas");
    const ov = cv.parentElement.parentElement;
    const sp = ov.querySelector("span.text-mono-small");
    const r = sp.getBoundingClientRect();
    return { color: getComputedStyle(sp).color, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, text: sp.textContent.trim() };
};

const wk = await webkit.launch();

// 1) DARK specimen behind the translucent bar → readout ink contrast
{
    const ctx = await wk.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await open(page, "probe-dark.png");
    out.darkSpecimenBar = await page.evaluate(bar);
    await page.screenshot({ path: DIR + "shot-desktop-light-darkspecimen.png" });
    await ctx.close();
}

// 2) RTL
{
    const ctx = await wk.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await open(page, "probe-1200.png");
    await page.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
    await page.waitForTimeout(900);
    out.rtl = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const ov = cv.parentElement.parentElement;
        const kids = [...ov.firstElementChild.children].map((e) => {
            const r = e.getBoundingClientRect();
            return { tag: e.tagName, cls: String(e.className).slice(0, 24), x: Math.round(r.x), w: Math.round(r.width) };
        });
        const sp = ov.querySelector("span.text-mono-small");
        return { dir: document.documentElement.dir, barChildrenLeftToRight: kids, readoutDir: getComputedStyle(sp).direction, readoutUnicodeBidi: getComputedStyle(sp).unicodeBidi, readoutText: sp.textContent.trim() };
    });
    await page.screenshot({ path: DIR + "shot-desktop-rtl.png" });
    await ctx.close();
}

// 3) 200% zoom (720x450 @2x — the audit's own simulation)
{
    const ctx = await wk.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await open(page, "probe-1200.png");
    out.zoom200 = await page.evaluate(() => {
        const cv = document.querySelector("canvas.eyedropper-canvas");
        const vp = cv.parentElement, ov = vp.parentElement;
        const or_ = ov.getBoundingClientRect(), vr = vp.getBoundingClientRect(), cr = cv.getBoundingClientRect();
        const sp = ov.querySelector("span.text-mono-small");
        return {
            overlay: { w: Math.round(or_.width), h: Math.round(or_.height) },
            stage: { w: Math.round(vr.width), h: Math.round(vr.height) },
            specimen: { w: Math.round(cr.width), h: Math.round(cr.height) },
            stageHeightPctOfOverlay: +((vr.height / or_.height) * 100).toFixed(1),
            readoutClientW: sp.clientWidth, readoutScrollW: sp.scrollWidth,
            docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
    const vr = out.zoom200;
    await page.mouse.click(200, 400);
    await page.waitForTimeout(400);
    await page.screenshot({ path: DIR + "shot-zoom200.png" });
    await ctx.close();
}
await wk.close();

// 4) forced-colors (chromium — webkit has no forced-colors emulation)
{
    const cr = await chromium.launch();
    const ctx = await cr.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" });
    const page = await ctx.newPage();
    await open(page, "probe-1200.png");
    const box = await page.evaluate(() => { const r = document.querySelector("canvas.eyedropper-canvas").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    await page.mouse.move(box.x + box.w * 0.3, box.y + box.h * 0.5);
    await page.waitForTimeout(100);
    await page.mouse.move(box.x + box.w * 0.3 + 1, box.y + box.h * 0.5);
    await page.waitForTimeout(250);
    const unpinned = await page.evaluate(() => { const l = document.querySelector(".loupe"); const cs = getComputedStyle(l); return { cls: l.className, borderColor: cs.borderColor, borderWidth: cs.borderWidth, boxShadow: cs.boxShadow }; });
    await page.mouse.click(box.x + box.w * 0.3, box.y + box.h * 0.5);
    await page.waitForTimeout(350);
    const pinned = await page.evaluate(() => { const l = document.querySelector(".loupe"); const cs = getComputedStyle(l); return { cls: l.className, borderColor: cs.borderColor, borderWidth: cs.borderWidth, boxShadow: cs.boxShadow }; });
    out.forcedColors = { unpinned, pinned, identical: unpinned.borderColor === pinned.borderColor && unpinned.boxShadow === pinned.boxShadow };
    await page.screenshot({ path: DIR + "shot-forced-colors.png" });
    await ctx.close();
    await cr.close();
}

console.log(JSON.stringify(out, null, 2));
