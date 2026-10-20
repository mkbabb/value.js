import { launch, cell, save, go, openSelect, measureChips, EVID } from "./lib.mjs";
const browser = await launch();
let out;
try {
    out = await cell(browser, {}, async (page) => {
        await go(page, "gradient");
        await page.waitForTimeout(5000);
        const labels = await page.evaluate(() => [...document.querySelectorAll("[role=combobox]")].map((c) => { const id = c.getAttribute("aria-labelledby"); return id ? document.getElementById(id)?.textContent?.trim() : "?" + c.textContent.trim(); }));
        await page.screenshot({ path: `${EVID}/recon-gradient-rest.png` });
        const panes = await page.evaluate(() => [...document.querySelectorAll("[data-pane]")].map((p) => p.getAttribute("data-pane")));
        return { labels, panes };
    });
} finally { await browser.close(); }
console.log(JSON.stringify(out));
