import { webkit } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const run = async () => {
    const browser = await webkit.launch();
    for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2, colorScheme: scheme });
        const page = await ctx.newPage();
        await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
        await page.waitForSelector(".interval-head", { timeout: 20000 });
        await page.waitForTimeout(1000);
        const rail = await page.$(".gradient-rail"); const rb = await rail.boundingBox();
        for (const f of [0.25, 0.5, 0.75]) { await page.mouse.move(rb.x + rb.width * f, rb.y + rb.height / 2); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(300); }
        // collapse row 0 so all four heads sit in one run
        await page.evaluate(() => document.querySelectorAll(".interval-head")[0].click());
        await page.waitForTimeout(500);
        const t = await page.evaluate(() => [...document.querySelectorAll(".interval-head")].map((h) => {
            const spans = [...h.querySelectorAll("span")];
            const n = spans[spans.length - 1];
            const rg = document.createRange(); rg.selectNodeContents(n);
            const tr = rg.getBoundingClientRect();
            const hr = h.getBoundingClientRect();
            return { name: n.textContent, textRect: { x: tr.x, y: tr.y, w: tr.width, h: tr.height },
                groundRect: { x: tr.right + 20, y: hr.y + 6, w: 40, h: hr.height - 12 } };
        }));
        await page.screenshot({ path: `${OUT}/heads-${scheme}.png`, fullPage: false });
        fs.writeFileSync(`${OUT}/t-${scheme}.json`, JSON.stringify(t, null, 2));
        await ctx.close();
    }
    await browser.close();
};
run();
