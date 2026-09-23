// copy-feedback timing probe — READ-ONLY; headed Chromium. Crops the header at 4 instants after the click.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light", permissions: ["clipboard-read", "clipboard-write"] });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const btn = page.getByRole("button", { name: "Copy easing literal" }).first(); const b = await btn.boundingBox();
const clip = { x: b.x - 420, y: b.y - 50, width: 520, height: 110 };
await btn.hover(); await page.waitForTimeout(900); await page.screenshot({ path: OUT + "07e-copy-hover-tooltip-1440-light.png", clip });
await btn.click(); const out = [];
for (const t of [80, 400, 900, 1800]) { await page.waitForTimeout(t - (out.at(-1)?.t ?? 0)); const s = await page.evaluate(() => { const bs = [...document.querySelectorAll(".clipboard-stack")].map(st => [...st.children].map(c => getComputedStyle(c).opacity + "/" + getComputedStyle(c).transform.slice(0, 30))); return bs; }); out.push({ t, s }); await page.screenshot({ path: OUT + `07f-copy-t${t}-1440-light.png`, clip }); }
out.push({ clip: await page.evaluate(() => navigator.clipboard.readText()) });
console.log(JSON.stringify(out));
await browser.close();
