// Follow-up probe: toggle all four switches OFF, Save PNG, keep the file — do the options reach the export?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const slug = process.env.SEED || "smoky-nesting-ruby-cat";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1, acceptDownloads: true });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("fourier_visualizer_view_state", JSON.stringify({ editing: false, overlay: false, equation: false })); } catch {} });
const page = await ctx.newPage();
await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.locator(".controls-overlay [aria-label='Expand dock']").first().click(); await page.waitForTimeout(700);
await page.locator("[aria-label='More options']").first().click(); await page.waitForTimeout(400);
await page.getByRole("menuitem", { name: /Export/ }).first().click();
const sw = page.locator("[role=dialog] [role=switch]"); for (let i = 0; i < await sw.count(); i++) await sw.nth(i).click();
const dl = page.waitForEvent("download", { timeout: 6000 }).catch(() => null);
await page.getByRole("button", { name: /Save PNG/ }).click();
const d = await dl; if (d) await d.saveAs(OUT + "d-light-export-all-off.png");
console.log("download", d ? d.suggestedFilename() : "NONE");
await browser.close();
