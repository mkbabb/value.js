// Probe: SelectLabel rendered class + font rung vs item/description. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
await page.locator(".controls-pane [role=combobox]").filter({ visible: true }).filter({ hasText: /ease/ }).first().click(); await page.waitForTimeout(600);
console.log(JSON.stringify(await page.evaluate(() => { const g = [...document.querySelectorAll("[role=listbox] [role=group]")].find(e => e.getBoundingClientRect().width); const l = g.firstElementChild; const c = getComputedStyle(l); return { cls: l.className, id: l.id, fs: c.fontSize, fw: c.fontWeight, color: c.color, pad: c.paddingLeft, rootVar: getComputedStyle(document.documentElement).getPropertyValue("--dropdown-text-secondary"), rootVar2: getComputedStyle(document.documentElement).getPropertyValue("--dropdown-text") }; })));
await browser.close();
