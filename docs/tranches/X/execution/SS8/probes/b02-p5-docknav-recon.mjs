// SS-8 B02 recon: the dock's view-switch trigger + its menu items (for U-3). Headless, one browser, closed in finally.
import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:9000/";
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/?debug=1", { waitUntil: "load", timeout: 120000 });
        await page.waitForSelector(".debug-overlay", { timeout: 90000 }); await page.waitForTimeout(1500);
        const r = await page.evaluate(() => [...document.querySelectorAll("button,[role=button],[aria-haspopup]")].filter((e) => { const b = e.getBoundingClientRect(); return b.top < 90 && b.width > 0; }).map((e) => ({ tag: e.tagName, text: e.textContent.trim().slice(0, 30), label: e.getAttribute("aria-label"), pop: e.getAttribute("aria-haspopup"), cls: e.className.toString().slice(0, 60) })));
        console.log(JSON.stringify(r.filter((x) => x.pop || x.text)));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
