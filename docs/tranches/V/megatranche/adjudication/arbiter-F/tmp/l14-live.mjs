// L-14 live decider (arbiter-F): what literal does the LIVE dev server mint TODAY?
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
const bar = page.locator('[data-testid="gradient-stop-bar"]');
await bar.waitFor({ timeout: 15000 });
const box = await bar.boundingBox();
// Click near the left edge, past the 0% handle's expander (~x+40), mid-height:
await page.mouse.click(box.x + 40, box.y + box.height / 2);
await page.waitForTimeout(300);
const readout = await page.locator('[aria-label="Gradient CSS"]').textContent();
console.log("LIVE READOUT:", JSON.stringify(readout.trim()));
await browser.close();
