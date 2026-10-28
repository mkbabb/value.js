// SS-8 B23 cure probe — where do <main>, h1#route-title and .add-slot-ghost sit on /#/mix?
import { chromium } from "@playwright/test";
const origin = process.argv[2] ?? "http://localhost:9123";
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        await page.goto(`${origin}/#/mix`, { timeout: 120000 });
        await page.waitForSelector(".add-slot-ghost", { timeout: 60000 });
        const out = await page.evaluate(() => {
            const path = (el) => { const p = []; for (let e = el; e && e !== document.body; e = e.parentElement) p.push(e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (e.getAttribute("aria-labelledby") ? `[labelledby=${e.getAttribute("aria-labelledby")}]` : "")); return p.reverse().join(" > "); };
            return {
                mains: [...document.querySelectorAll("main")].map((m) => ({ labelledby: m.getAttribute("aria-labelledby"), cls: m.className, path: path(m) })),
                h1s: [...document.querySelectorAll("h1")].map((h) => ({ id: h.id, text: h.textContent.trim(), path: path(h) })),
                routeTitleCount: document.querySelectorAll("#route-title").length,
                addSlot: [...document.querySelectorAll(".add-slot-ghost")].map(path),
                mainPaneMatch: document.querySelectorAll('main[aria-labelledby="route-title"]:has(h1#route-title)').length,
            };
        });
        console.log(JSON.stringify(out, null, 1));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
