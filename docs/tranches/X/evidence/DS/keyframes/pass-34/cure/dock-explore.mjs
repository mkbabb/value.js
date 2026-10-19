// X-DS keyframes r6 pass 9 — explore the dock route to the Timeline surface (headless real Chrome, §0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4000);
    const info = async () => page.evaluate(() => ({
      items: [...document.querySelectorAll("[data-dock-surface-item]")].map((e) => ({ s: e.dataset.surface, sel: e.dataset.selected !== undefined, vis: e.getBoundingClientRect().width > 0, dis: e.disabled })),
      titles: [...document.querySelectorAll("[data-slot=configurator-layer-trigger] .configurator-section-label, h3.configurator-section-label")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => [e.textContent.trim(), Math.round(e.getBoundingClientRect().top)]),
      collapsed: [...document.querySelectorAll("button[aria-label=Scene]")].map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width)]; }),
    }));
    console.log(w, "start", JSON.stringify(await info()));
    const t = page.locator('[data-dock-surface-item][data-surface="timeline"]').first();
    if (!(await t.isVisible())) {
      const vis = page.locator("button[aria-label=Scene]:visible").first();
      const b = await vis.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200);
      console.log(w, "after hover", JSON.stringify(await info()));
    }
    await t.click({ timeout: 5000 }); await page.waitForTimeout(1500);
    console.log(w, "after timeline click", JSON.stringify(await info()));
    await ctx.close();
  }
} finally { await browser.close(); }
