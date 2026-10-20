// P1 AFTER frames: collapsed + expanded transport dock, Speed + Easing menus. Headless; one browser; context per cell; closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:3100";
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
    const H = w === 390 ? 844 : 900; const cell = `${scheme}-${w}`;
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + "/v/hazy-etching-cream-elk", { waitUntil: "load" });
      if (w === 390) { await page.waitForTimeout(2500); await page.getByText("Canvas", { exact: true }).first().click(); }
      const dock = page.locator(".animation-dock");
      await dock.waitFor({ timeout: 15000 }); await page.mouse.move(2, H / 2); await page.waitForTimeout(3000);
      const crop = async (name, pad = 28) => { const b = await dock.boundingBox(); const x = Math.max(0, b.x - pad), y = Math.max(0, b.y - pad); await page.screenshot({ path: `${OUT}${cell}-${name}.png`, clip: { x, y, width: Math.min(w - x, b.width + 2 * pad), height: Math.min(H - y, b.height + 2 * pad) } }); };
      await crop("F1-collapsed");
      const b = await dock.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1500);
      await crop("F1-expanded");
      await dock.getByRole("button", { name: "Playback speed" }).click(); await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}${cell}-F3-speed-menu.png` });
      await page.mouse.move(4, H - 4); await page.waitForTimeout(4800);
      console.log(cell, JSON.stringify(await page.evaluate(() => ({ dock: document.querySelector(".animation-dock").className, menuOpen: !!document.querySelector('[role="menu"]') }))));
      await page.screenshot({ path: `${OUT}${cell}-F4-after-leave.png` });
      await page.keyboard.press("Escape"); await page.waitForTimeout(300);
      const b2 = await dock.boundingBox(); await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2); await page.waitForTimeout(1200);
      await dock.getByRole("button", { name: "Easing" }).click(); await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}${cell}-F3-easing-menu.png` });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
