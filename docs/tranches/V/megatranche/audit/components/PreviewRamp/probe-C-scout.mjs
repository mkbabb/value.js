// challenge-C · PreviewRamp — scout: what does /#/mix actually offer?
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(2000);
out.url = page.url();
out.buttons = await page.evaluate(() =>
    [...document.querySelectorAll('button,[role="button"],[role="combobox"]')].map((b) => ({
        role: b.getAttribute("role") || b.tagName.toLowerCase(),
        name: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 70),
    })),
);
out.h = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,.section-label,label")].map((n) =>
        n.textContent.trim().slice(0, 50),
    ),
);
await page.screenshot({
    path: "docs/tranches/V/megatranche/audit/components/PreviewRamp/scout-mix.png",
    fullPage: false,
});
await browser.close();
console.log(JSON.stringify(out, null, 1));
