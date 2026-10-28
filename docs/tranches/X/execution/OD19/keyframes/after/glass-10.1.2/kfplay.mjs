import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const origin = process.argv[2];
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440]) for (const route of ["/#/cube", "/#/"]) {
    const ctx = await browser.newContext({ viewport: { width, height: 844 } });
    try {
      const page = await ctx.newPage();
      await page.goto(origin + route); await page.waitForTimeout(3500);
      await page.mouse.move(2, 400); await page.waitForTimeout(2000);
      const res = {};
      for (const [name, sel] of [["play", 'button[aria-label$="animation"]'], ["scene", '.glass-dock .dock-layer--summary button[aria-label="Scene"]']]) {
        const btn = page.locator(sel).first();
        if (!(await btn.isVisible().catch(() => false))) { res[name] = "not visible"; continue; }
        const before = await btn.evaluate((b) => ({ label: b.getAttribute("aria-label"), x: Math.round(b.getBoundingClientRect().x), dock: b.closest(".glass-dock").className.includes("collapsed") ? "collapsed" : "expanded" }));
        await page.evaluate(() => { window.__clicks = 0; window.__x = []; document.addEventListener("click", (e) => window.__clicks++, true); });
        await btn.click({ timeout: 5000 }).catch((e) => (res[name + "Err"] = String(e).slice(0, 120)));
        await page.waitForTimeout(800);
        const after = await page.evaluate((sel) => { const b = document.querySelector(sel); return { label: b?.getAttribute("aria-label"), menuOpen: !!document.querySelector('[role="listbox"],[role="menu"]') }; }, sel);
        res[name] = { before, after };
        await page.keyboard.press("Escape"); await page.mouse.move(2, 400); await page.waitForTimeout(2500);
      }
      console.log(width, route, JSON.stringify(res));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
