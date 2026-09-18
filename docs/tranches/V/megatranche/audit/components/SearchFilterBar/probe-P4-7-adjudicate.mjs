// CHALLENGE-D pass 4 — probe 7: adjudicate three prior-pass disputes.
//  (a) is the count badge clipped?  (b) does the radio FACE paint a focus ring
//  under a real keyboard Tab in Chromium?  (c) is `variant="ghost"` live?
import { webkit, chromium } from "playwright";
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
for (const [ename, engine] of [["webkit", webkit], ["chromium", chromium]]) {
    const browser = await engine.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 3, colorScheme: "light" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(4000);
    const E = {};

    // (c) Button variant surface
    E.trigger = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const c = getComputedStyle(t);
        return {
            outerHTML: t.outerHTML.slice(0, 300),
            attrs: [...t.attributes].map((a) => `${a.name}=${a.value}`),
            contain: c.contain, overflow: c.overflow, clipPath: c.clipPath, isolation: c.isolation,
            width: c.width, height: c.height, minHeight: c.minHeight, minWidth: c.minWidth,
        };
    });

    // (a) badge — set a tier so the badge renders, then measure paint
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700);
    await page.locator('label.filter-option', { hasText: "Featured" }).click(); await page.waitForTimeout(400);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    E.badge = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t.querySelector("span");
        if (!s) return { error: "no badge" };
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +b.top.toFixed(2), right: +b.right.toFixed(2), bottom: +b.bottom.toFixed(2), left: +b.left.toFixed(2) }; };
        const tc = getComputedStyle(t);
        // clipping: contain / overflow / clip-path anywhere up the tree
        const clip = [];
        let el = t;
        while (el && el !== document.documentElement) {
            const c = getComputedStyle(el);
            if (c.contain !== "none" || c.overflow !== "visible" || c.clipPath !== "none" || c.maskImage !== "none" || c.filter !== "none" || c.transform !== "none") {
                clip.push({ tag: el.tagName, cls: (el.className || "").toString().slice(0, 70), contain: c.contain, overflow: c.overflow, clipPath: c.clipPath.slice(0, 40), filter: c.filter.slice(0, 30), transform: c.transform.slice(0, 30), rect: rr(el) });
            }
            el = el.parentElement;
        }
        return { text: s.textContent.trim(), rect: rr(s), triggerRect: rr(t), triggerContain: tc.contain, triggerOverflow: tc.overflow, clipChain: clip.slice(0, 6) };
    });
    const tb = await page.locator('button[aria-label="Filters"]').boundingBox();
    if (tb) await page.screenshot({ path: `${OUT}p4-adj-badge-${ename}.png`, clip: { x: tb.x - 24, y: tb.y - 24, width: tb.width + 48, height: tb.height + 48 } });

    // (b) radio FACE under a real keyboard Tab
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700);
    await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    E.faceUnderTab = await page.evaluate(() => {
        const a = document.activeElement;
        const face = a.querySelector(".radio-group__face");
        const ac = getComputedStyle(a);
        const fc = face ? getComputedStyle(face) : null;
        return {
            active: { tag: a.tagName, role: a.getAttribute("role") },
            matchesFocusVisible: a.matches(":focus-visible"),
            itemBoxShadow: ac.boxShadow, itemOutline: `${ac.outlineWidth} ${ac.outlineStyle}`,
            faceFound: !!face,
            faceBoxShadow: fc ? fc.boxShadow.slice(0, 160) : null,
            faceOutline: fc ? `${fc.outlineWidth} ${fc.outlineStyle} ${fc.outlineColor}` : null,
            faceHasRing: fc ? (fc.boxShadow !== "none" || (fc.outlineStyle !== "none" && parseFloat(fc.outlineWidth) > 0)) : null,
            focusRingShadowToken: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-shadow").trim(),
        };
    });
    // also arrow-key focus (the real way a radio group is traversed)
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
    E.faceUnderArrow = await page.evaluate(() => {
        const a = document.activeElement;
        const face = a.querySelector(".radio-group__face");
        const fc = face ? getComputedStyle(face) : null;
        return { matchesFocusVisible: a.matches(":focus-visible"), faceBoxShadow: fc ? fc.boxShadow.slice(0, 160) : null, faceHasRing: fc ? fc.boxShadow !== "none" : null };
    });
    const dl = await page.locator('[role="dialog"]').first().boundingBox();
    if (dl) await page.screenshot({ path: `${OUT}p4-adj-radiofocus-${ename}.png`, clip: { x: dl.x - 8, y: dl.y - 8, width: dl.width + 16, height: 260 } });
    await browser.close();
    R[ename] = E;
}
fs.writeFileSync(`${OUT}p4-7.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1));
