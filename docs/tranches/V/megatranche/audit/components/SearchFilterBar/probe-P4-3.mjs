// CHALLENGE-D pass 4 — probe 3: the Tags-are-dead reproduction + AT tree + hover geometry + RTL badge.
import { webkit } from "playwright";
import fs from "node:fs";
const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
const BASE = "http://192.168.1.166:9000";
const TAGS = ["pastel", "neon", "earth", "monochrome", "retro", "vaporwave",
    "muted", "high-contrast", "duotone", "sunset", "forest", "oceanic"].map((n, i) => ({ name: n, count: 30 - i }));
const R = {};
async function stub(page) {
    await page.route(/^https?:\/\/api\.color\.babb\.dev/, async (route) => {
        const u = route.request().url();
        const j = (b) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(b) });
        if (u.includes("/colors/tags")) return j(TAGS);
        if (u.includes("/sessions/me")) return route.fulfill({ status: 401, contentType: "application/json", body: "{}" });
        if (u.includes("/palettes")) return j({ palettes: [], hasMore: false });
        return j({});
    });
}
const browser = await webkit.launch();

// ── A. tags reproduction + AT tree + hover pill widths
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(3500);
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(800);

    const before = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        return {
            checkedStates: [...root.querySelectorAll('[role="checkbox"]')].map((c) => c.getAttribute("aria-checked")),
            checkboxOuterHTML: root.querySelector('[role="checkbox"]').outerHTML.slice(0, 420),
            badge: (() => { const t = document.querySelector('button[aria-label="Filters"]'); const s = t.querySelector("span"); return s ? s.textContent.trim() : null; })(),
        };
    });
    // three distinct ways to activate the first tag
    const first = page.locator('.scrollbar-thin label.filter-option').first();
    await first.click(); await page.waitForTimeout(300);
    const afterLabelClick = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        return { checkedStates: [...root.querySelectorAll('[role="checkbox"]')].map((c) => c.getAttribute("aria-checked")), badge: (() => { const t = document.querySelector('button[aria-label="Filters"]'); const s = t.querySelector("span"); return s ? s.textContent.trim() : null; })() };
    });
    await page.locator('[role="checkbox"]').first().click({ force: true }); await page.waitForTimeout(300);
    const afterDirectClick = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        return { checkedStates: [...root.querySelectorAll('[role="checkbox"]')].map((c) => c.getAttribute("aria-checked")), badge: (() => { const t = document.querySelector('button[aria-label="Filters"]'); const s = t.querySelector("span"); return s ? s.textContent.trim() : null; })() };
    });
    await page.locator('[role="checkbox"]').nth(1).focus();
    await page.keyboard.press("Space"); await page.waitForTimeout(300);
    const afterSpace = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        return { checkedStates: [...root.querySelectorAll('[role="checkbox"]')].map((c) => c.getAttribute("aria-checked")), badge: (() => { const t = document.querySelector('button[aria-label="Filters"]'); const s = t.querySelector("span"); return s ? s.textContent.trim() : null; })() };
    });
    R.tagsRepro = { before, afterLabelClick, afterDirectClick, afterSpace };

    // AT tree of the popover
    R.atTree = page.accessibility ? (() => { })() : "webkit: no CDP a11y tree — see probe-P4-4 (chromium)";

    // hover pill widths (the .filter-option hover background box)
    R.hoverBoxes = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        return [...root.querySelectorAll("label.filter-option")].map((l) => {
            const b = l.getBoundingClientRect();
            const parent = l.parentElement.getBoundingClientRect();
            return { text: l.textContent.trim(), w: +b.width.toFixed(2), parentW: +parent.width.toFixed(2), fillsParent: Math.abs(b.width - parent.width) < 1, display: getComputedStyle(l.parentElement).display, flexDir: getComputedStyle(l.parentElement).flexDirection, alignItems: getComputedStyle(l.parentElement).alignItems };
        });
    });
    await page.locator('label.filter-option', { hasText: "Most Popular" }).hover(); await page.waitForTimeout(350);
    const bb = await page.locator('[role="dialog"]').first().boundingBox();
    if (bb) await page.screenshot({ path: `${OUT}p4-hover-mostpopular.png`, clip: { x: bb.x - 8, y: bb.y - 8, width: bb.width + 16, height: Math.min(bb.height + 16, 1400 - bb.y) } });
    await page.locator('label.filter-option', { hasText: "All" }).hover(); await page.waitForTimeout(350);
    if (bb) await page.screenshot({ path: `${OUT}p4-hover-all.png`, clip: { x: bb.x - 8, y: bb.y - 8, width: bb.width + 16, height: Math.min(bb.height + 16, 1400 - bb.y) } });
    // full popover with everything visible (tall viewport)
    if (bb) await page.screenshot({ path: `${OUT}p4-popover-full-tall.png`, clip: { x: bb.x - 10, y: bb.y - 10, width: bb.width + 20, height: Math.min(bb.height + 20, 1400 - bb.y) } });
    await page.close();
}

// ── B. RTL badge placement + 2-digit badge
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage(); await stub(page);
    await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(3200);
    await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
    await page.waitForTimeout(400);
    await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(700);
    await page.locator('label.filter-option', { hasText: "Featured" }).click(); await page.waitForTimeout(400);
    await page.keyboard.press("Escape"); await page.waitForTimeout(500);
    R.rtlBadge = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t.querySelector("span");
        const rr = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), left: +b.left.toFixed(2), right: +b.right.toFixed(2), top: +b.top.toFixed(2) }; };
        const field = t.closest(".input-bar");
        return {
            dir: getComputedStyle(document.documentElement).direction,
            trigger: rr(t), badge: s ? rr(s) : null, field: field ? rr(field) : null,
            badgeOutsideTriggerInlineEnd: s ? (rr(s).left < rr(t).left) : null,
            badgeOverlapsFieldInterior: (s && field) ? (rr(s).right > rr(field).left && rr(s).left > rr(field).left) : null,
            triggerOverflowsFieldBlock: field ? { top: +(rr(field).top - rr(t).top).toFixed(2), bottom: +((rr(t).top + rr(t).h) - (rr(field).top + rr(field).h)).toFixed(2) } : null,
        };
    });
    const tb = await page.locator('button[aria-label="Filters"]').boundingBox();
    if (tb) await page.screenshot({ path: `${OUT}p4-rtl-badge-crop.png`, clip: { x: Math.max(0, tb.x - 60), y: tb.y - 22, width: tb.width + 120, height: tb.height + 44 } });

    // 2-digit badge: force by evaluating the count span content (visual overflow test only)
    R.badgeTwoDigit = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t.querySelector("span");
        if (!s) return null;
        const before = { w: s.getBoundingClientRect().width, h: s.getBoundingClientRect().height, scrollW: s.scrollWidth };
        s.textContent = "13";
        const two = { w: s.getBoundingClientRect().width, h: s.getBoundingClientRect().height, scrollW: s.scrollWidth };
        s.textContent = "1";
        return { oneDigit: before, twoDigit: two, overflows: two.scrollW > two.w };
    });
    await page.close();
}
await browser.close();
fs.writeFileSync(`${OUT}p4-3.json`, JSON.stringify(R, null, 2));
console.log("WROTE p4-3.json");
