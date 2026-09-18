import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";
const b = await chromium.launch();
const R = {};

// ---------- A. tall image on mobile: is it painted? ----------
{
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    await page.setInputFiles("input[type=file]", `${D}/tall.png`);
    await page.waitForTimeout(2000);
    R.tallMobile = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const im = el.querySelector("img");
        const zr = el.getBoundingClientRect(), ir = im.getBoundingClientRect();
        const ics = getComputedStyle(im);
        return {
            zone: { y: +zr.y.toFixed(1), h: +zr.height.toFixed(1), w: +zr.width.toFixed(1) },
            img: { y: +ir.y.toFixed(1), h: +ir.height.toFixed(1), w: +ir.width.toFixed(1), opacity: ics.opacity, visibility: ics.visibility, display: ics.display, objectFit: ics.objectFit, height: ics.height, transform: ics.transform, cls: im.className },
            visibleFraction: +(Math.max(0, Math.min(zr.bottom, ir.bottom) - Math.max(zr.top, ir.top)) / ir.height).toFixed(3),
            parentFlex: (() => { const c = getComputedStyle(el); return { display: c.display, dir: c.flexDirection, justify: c.justifyContent, align: c.alignItems, overflow: c.overflow }; })(),
        };
    });
    await page.locator('[role="button"][aria-label]').screenshot({ path: `${D}/A-tall-mobile-zone.png` });
    await page.screenshot({ path: `${D}/A-tall-mobile-page.png` });
    await ctx.close();
}

// ---------- B. reduced motion ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    R.reducedMotion = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const cs = getComputedStyle(el);
        return { transitionDuration: cs.transitionDuration, transitionProperty: cs.transitionProperty, inlineStyle: el.getAttribute("style") };
    });
    await ctx.close();
}

// ---------- C. forced-colors ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active", colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    R.forcedColors = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const cs = getComputedStyle(el);
        const cap = el.querySelector("span");
        return { border: cs.borderTopColor, bg: cs.backgroundColor, style: cs.borderTopStyle, capColor: cap ? getComputedStyle(cap).color : null };
    });
    await page.locator('[role="button"][aria-label]').screenshot({ path: `${D}/C-forced-colors-zone.png` });
    await ctx.close();
}

// ---------- D. 200% zoom (desktop) ----------
{
    const ctx = await b.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    R.zoom200 = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const cap = el.querySelector("span");
        const cr = cap.getBoundingClientRect();
        return {
            zone: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) }, maxH: cs.maxHeight, minH: cs.minHeight,
            captionWraps: cr.height > parseFloat(getComputedStyle(cap).lineHeight) * 1.2,
            captionRect: { w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) },
            dvh40: window.innerHeight * 0.4,
            docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
    await page.screenshot({ path: `${D}/D-zoom200.png` });
    await ctx.close();
}

// ---------- E. contrast: dashed border vs plate, light ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    const rect = await page.locator('[role="button"][aria-label]').boundingBox();
    const buf = await page.screenshot({ clip: { x: Math.floor(rect.x) - 6, y: Math.floor(rect.y) - 6, width: 120, height: 24 } });
    await writeFile(`${D}/E-border-crop.png`, buf);
    R.borderCropRect = rect;
    await ctx.close();
}

// ---------- F. non-image drop: any feedback? ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    R.badDrop = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const dt = new DataTransfer();
        dt.items.add(new File(["hello"], "notes.txt", { type: "text/plain" }));
        el.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: dt }));
        el.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: dt }));
        return new Promise((res) => setTimeout(() => {
            res({
                zoneClasses: el.className.match(/border-\S+|bg-\S+/g),
                anyDestructiveText: [...document.querySelectorAll("main *")].filter((n) => /text-destructive/.test(n.className || "")).map((n) => n.textContent.trim()).slice(0, 3),
                bodyHasError: /error|unsupported|not an image/i.test(document.querySelector("main").innerText),
                stillPlaceholder: !!el.querySelector("img") === false,
            });
        }, 600));
    });
    await ctx.close();
}

// ---------- G. drag-lit state, rendered ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);
    await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        el.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(500);
    R.dragLit = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { border: cs.borderTopColor, bg: cs.backgroundColor, transform: cs.transform, w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
    });
    await page.locator('[role="button"][aria-label]').screenshot({ path: `${D}/G-drag-lit.png` });
    await ctx.close();
}

// ---------- H. type scale comparison ----------
{
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3000);
    R.typeScale = await page.evaluate(() => {
        const pick = (sel) => { const n = document.querySelector(sel); if (!n) return null; const c = getComputedStyle(n); const r = n.getBoundingClientRect(); return { text: n.textContent.trim().slice(0, 40), fs: c.fontSize, lh: c.lineHeight, ff: c.fontFamily.split(",")[0], color: c.color, w: +r.width.toFixed(1) }; };
        const all = [...document.querySelectorAll("main *")];
        const byText = (t) => { const n = all.find((x) => x.children.length === 0 && x.textContent.trim().startsWith(t)); if (!n) return null; const c = getComputedStyle(n); const r = n.getBoundingClientRect(); return { text: n.textContent.trim().slice(0, 44), fs: c.fontSize, lh: c.lineHeight, ff: c.fontFamily.split(",")[0], color: c.color, w: +r.width.toFixed(1) }; };
        return {
            paneTitle: byText("Extract"),
            paneDesc: byText("Pull palettes"),
            dropPrompt: byText("Drop an image"),
            ghostCaption: byText("· undeveloped") || byText("undeveloped"),
        };
    });
    await ctx.close();
}

console.log(JSON.stringify(R, null, 1));
await b.close();
