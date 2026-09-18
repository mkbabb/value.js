import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.locator('button[aria-label="Menu"]').tap();
await page.waitForTimeout(600);

const dom = await page.evaluate(() => {
    const menu = document.querySelector('[role="menu"]');
    const items = [...menu.querySelectorAll('[role="menuitem"]')];
    return items.map((el) => {
        const a = el.querySelector("a");
        return {
            tag: el.tagName,
            txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 20),
            attrs: [...el.attributes].map((x) => x.name + (x.value ? "=" + x.value.slice(0, 30) : "")),
            display: getComputedStyle(el).display,
            containsAnchor: !!a,
            anchorDisplay: a ? getComputedStyle(a).display : null,
            anchorTabIndex: a ? a.tabIndex : null,
            h: +el.getBoundingClientRect().height.toFixed(1),
        };
    });
});

// keyboard: does Enter on the GitHub menuitem navigate?
await page.keyboard.press("ArrowDown");
const focusWalk = [];
for (let i = 0; i < 6; i++) {
    focusWalk.push(await page.evaluate(() => {
        const a = document.activeElement;
        return a ? a.tagName + "|" + (a.getAttribute("role") || "") + "|" + (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 14) : "none";
    }));
    await page.keyboard.press("ArrowDown");
}

console.log(JSON.stringify({ items: dom, focusWalk }, null, 2));
await browser.close();
