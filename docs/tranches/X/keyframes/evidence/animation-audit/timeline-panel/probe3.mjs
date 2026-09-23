// timeline-panel — probe3: how many KeyframeTimeline instances mount, and which one is visible.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(5000);
await page.mouse.move(720, 70); await page.waitForTimeout(700);
await page.locator('[aria-label="Controls tab"]').click({ force: true }); await page.waitForTimeout(500);
await page.locator('[role=option]', { hasText: /timeline/i }).first().click(); await page.waitForTimeout(1500);
const res = await page.evaluate(() => [...document.querySelectorAll(".timeline-track")].map((t) => {
  const r = t.getBoundingClientRect(); let p = t, chain = [];
  while (p && p !== document.body) { const c = getComputedStyle(p); if (c.contentVisibility !== "visible" || c.display === "none" || c.visibility !== "visible") chain.push(`${p.tagName}.${String(p.className).slice(0, 40)}:${c.contentVisibility}/${c.display}/${c.visibility}`); p = p.parentElement; }
  const st = t.closest(".flex.flex-col.gap-3")?.parentElement?.querySelector(".timeline-preview-stage");
  return { r: [r.x, r.y, r.width, r.height].map(Math.round), vis: t.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true, opacityProperty: true }), chain, subjCls: document.querySelectorAll("[data-timeline-preview-subject]").length, chan: t.closest("[data-channel],[data-animation-name]")?.outerHTML.slice(0, 120) };
}));
console.log(JSON.stringify(res, null, 1));
await browser.close();
