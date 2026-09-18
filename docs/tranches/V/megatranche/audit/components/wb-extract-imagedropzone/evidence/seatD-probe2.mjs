import { chromium } from "playwright";
const D = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/idz-seatD";

const b = await chromium.launch();

async function run(label, opts, img, shotName) {
    const ctx = await b.newContext(opts);
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
    await page.goto("http://localhost:9000/#/extract");
    await page.waitForTimeout(3500);

    const before = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const r = el.getBoundingClientRect();
        return { h: +r.height.toFixed(1), w: +r.width.toFixed(1), tabIndex: el.tabIndex, label: el.getAttribute("aria-label") };
    });

    await page.setInputFiles("input[type=file]", `${D}/${img}`);
    await page.waitForTimeout(2500);

    const after = await page.evaluate(() => {
        const el = document.querySelector('[role="button"][aria-label]');
        const r = el.getBoundingClientRect();
        const im = el.querySelector("img");
        const ir = im ? im.getBoundingClientRect() : null;
        const ics = im ? getComputedStyle(im) : null;
        const tag = el.querySelector("span[aria-hidden]");
        const tcs = tag ? getComputedStyle(tag) : null;
        const cs = getComputedStyle(el);
        return {
            zone: { h: +r.height.toFixed(1), w: +r.width.toFixed(1) },
            tabIndex: el.tabIndex, label: el.getAttribute("aria-label"), cursor: cs.cursor,
            border: cs.borderTopColor, borderStyle: cs.borderTopStyle, bg: cs.backgroundColor, radius: cs.borderTopLeftRadius,
            img: ir ? { w: +ir.width.toFixed(1), h: +ir.height.toFixed(1), x: +ir.x.toFixed(1), y: +ir.y.toFixed(1), radius: ics.borderTopLeftRadius, objectFit: ics.objectFit, alt: im.alt, natural: `${im.naturalWidth}x${im.naturalHeight}` } : null,
            cornerTag: tag ? { text: tag.textContent.trim(), opacity: tcs.opacity, bottom: tcs.bottom, right: tcs.right, left: tcs.left, fs: tcs.fontSize, bg: tcs.backgroundColor, color: tcs.color, w: +tag.getBoundingClientRect().width.toFixed(1), h: +tag.getBoundingClientRect().height.toFixed(1) } : null,
            // is it reachable by keyboard?
            focusableCount: document.querySelectorAll('main [tabindex="0"], main a[href], main button:not([disabled]), main input:not([type=hidden]):not([disabled]), main select, main textarea, main [role="slider"]').length,
        };
    });

    // keyboard reachability: tab through and see if the zone is ever focused
    await page.evaluate(() => document.body.focus());
    let reached = false, seq = [];
    for (let i = 0; i < 45; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
            const a = document.activeElement;
            return { tag: a.tagName, label: (a.getAttribute && (a.getAttribute("aria-label") || a.textContent?.trim().slice(0, 22))) || "", isZone: a.matches && a.matches('[role="button"][aria-label*="preview"], [role="button"][aria-label*="Replace"], [role="button"][aria-label*="Upload"]') };
        });
        seq.push(`${info.tag}:${info.label.slice(0, 20)}`);
        if (info.isZone) { reached = true; break; }
    }

    // hover the zone -> does the corner tag appear
    await page.hover('[role="button"][aria-label]');
    await page.waitForTimeout(400);
    const hovered = await page.evaluate(() => {
        const t = document.querySelector('[role="button"][aria-label] span[aria-hidden]');
        return t ? { opacity: getComputedStyle(t).opacity } : null;
    });

    await page.screenshot({ path: `${D}/${shotName}`, fullPage: false });
    const el = await page.locator('[role="button"][aria-label]').screenshot({ path: `${D}/zone-${shotName}` });

    await ctx.close();
    return { label, before, after, keyboardReachedZone: reached, tabSeq: seq, hovered, errs };
}

const r1 = await run("desktop-light-wide", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" }, "wide.png", "populated-desktop-light.png");
console.log(JSON.stringify(r1, null, 1));
const r2 = await run("mobile-dark-tall", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, colorScheme: "dark", isMobile: true, hasTouch: true }, "tall.png", "populated-mobile-dark.png");
console.log(JSON.stringify(r2, null, 1));
await b.close();
