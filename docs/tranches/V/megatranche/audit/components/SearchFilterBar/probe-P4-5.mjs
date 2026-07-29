// CHALLENGE-D pass 4 — probe 5: radio FACE focus ring (self-correction),
// invalid-colour input truth, and pixel measurement of popover translucency.
import { webkit } from "playwright";
import fs from "node:fs";
const OUT = new URL("./evidence-p4/", import.meta.url).pathname;
const BASE = "http://192.168.1.166:9000";
const TAGS = ["pastel", "neon", "earth"].map((n, i) => ({ name: n, count: 9 - i }));
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
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage(); await stub(page);
const pageErrors = []; page.on("pageerror", (e) => pageErrors.push(String(e)));
await page.goto(`${BASE}/#/browse`, { waitUntil: "load" }); await page.waitForTimeout(4000);
await page.click('button[aria-label="Filters"]'); await page.waitForTimeout(800);

// ── 1. radio FACE focus ring (correcting probe 4's element-level read)
await page.evaluate(() => { document.querySelectorAll('[role="radio"]')[1].focus(); });
await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300);
R.radioFaceFocus = await page.evaluate(() => {
    const item = document.activeElement;
    const face = item.querySelector(".radio-group__face") || item.firstElementChild;
    const ic = getComputedStyle(item), fc = face ? getComputedStyle(face) : null;
    const fb = face ? face.getBoundingClientRect() : null;
    return {
        itemBoxShadow: ic.boxShadow, itemOutline: `${ic.outlineWidth} ${ic.outlineStyle}`,
        itemRect: (() => { const b = item.getBoundingClientRect(); return { w: +b.width.toFixed(2), h: +b.height.toFixed(2) }; })(),
        itemMargin: ic.margin,
        faceClass: face ? face.className : null,
        faceBoxShadow: fc ? fc.boxShadow.slice(0, 150) : null,
        faceRect: fb ? { w: +fb.width.toFixed(2), h: +fb.height.toFixed(2) } : null,
        faceHasRing: fc ? fc.boxShadow !== "none" : null,
        matchesFocusVisible: item.matches(":focus-visible"),
        radioGroupGap: getComputedStyle(item.closest('[role="radiogroup"]')).gap,
        radioGroupAlignItems: getComputedStyle(item.closest('[role="radiogroup"]')).alignItems,
        radioSeat: getComputedStyle(item.closest('[role="radiogroup"]')).getPropertyValue("--radio-seat"),
        radioFace: getComputedStyle(item.closest('[role="radiogroup"]')).getPropertyValue("--radio-face"),
    };
});
{
    const bb = await page.locator('[role="dialog"]').first().boundingBox();
    if (bb) await page.screenshot({ path: `${OUT}p4-radio-face-focus.png`, clip: { x: bb.x - 8, y: bb.y - 8, width: bb.width + 16, height: 300 } });
}

// ── 2. invalid / non-hex CSS colour truth
const cases = ["rebeccapurple", "hsl(200 80% 50%)", "oklch(0.72 0.14 244)", "#f00", "not-a-color", "#4488CC"];
R.colorInputTruth = [];
for (const v of cases) {
    await page.fill('input[aria-label="Search by CSS color"]', v);
    const before = await page.evaluate(() => {
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t.querySelector("span");
        return { badge: s ? s.textContent.trim() : null, cards: document.querySelectorAll("article,[data-palette-card]").length };
    });
    const errsBefore = pageErrors.length;
    await page.click('[role="dialog"] button:has-text("Search")');
    await page.waitForTimeout(500);
    const after = await page.evaluate(() => {
        const root = document.querySelector('[role="dialog"]');
        const t = document.querySelector('button[aria-label="Filters"]');
        const s = t ? t.querySelector("span") : null;
        const inp = root ? root.querySelector('input[aria-label="Search by CSS color"]') : null;
        const swatch = root ? root.querySelector('button[aria-label^="Open color picker"]') : null;
        return {
            badge: s ? s.textContent.trim() : null,
            inputValue: inp ? inp.value : null,
            inputAriaInvalid: inp ? inp.getAttribute("aria-invalid") : null,
            inputBorder: inp ? getComputedStyle(inp).borderColor : null,
            anyErrorText: root ? /invalid|not a|error|unrecogni/i.test(root.textContent) : null,
            swatchAriaLabel: swatch ? swatch.getAttribute("aria-label") : null,
            liveRegions: [...document.querySelectorAll("[aria-live]")].map((n) => ({ live: n.getAttribute("aria-live"), text: n.textContent.trim().slice(0, 60) })),
        };
    });
    R.colorInputTruth.push({ typed: v, before, after, newPageErrors: pageErrors.slice(errsBefore) });
}
R.pageErrors = pageErrors;

// ── 3. pixel measurement of popover translucency (light, over the empty/error body)
{
    const bb = await page.locator('[role="dialog"]').first().boundingBox();
    await page.screenshot({ path: `${OUT}p4-translucency.png`, clip: { x: bb.x, y: bb.y, width: bb.width, height: Math.min(bb.height, 1000 - bb.y) } });
    R.translucencyClip = bb;
}
await browser.close();
fs.writeFileSync(`${OUT}p4-5.json`, JSON.stringify(R, null, 2));
console.log(JSON.stringify(R.radioFaceFocus, null, 1));
console.log("colorInputTruth:");
for (const c of R.colorInputTruth) console.log(" ", JSON.stringify(c.typed), "->", JSON.stringify({ badge: c.after.badge, val: c.after.inputValue, invalid: c.after.inputAriaInvalid, err: c.after.anyErrorText, swatch: c.after.swatchAriaLabel, live: c.after.liveRegions, newErr: c.newPageErrors }));
console.log("WROTE p4-5.json");
