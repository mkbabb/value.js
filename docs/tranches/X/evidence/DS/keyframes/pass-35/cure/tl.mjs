import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto("http://localhost:5173/#/cube"); await page.reload(); await page.waitForTimeout(3500);
  const item = page.locator('[data-dock-surface-item][data-surface="timeline"]').first();
  if (!(await item.isVisible())) { const b = await page.locator("button[aria-label=Scene]:visible").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200); }
  await item.click(); await page.waitForTimeout(1500);
  console.log(await page.evaluate(() => { const t = [...document.querySelectorAll(".timeline-track")].find((e) => e.getBoundingClientRect().width > 0);
    const out = []; for (let e = t; e && out.length < 4; e = e.parentElement) { out.push({ tag: e.tagName, cls: (e.getAttribute("class") || "").slice(0, 60), b: Math.round(e.getBoundingClientRect().bottom), mb: getComputedStyle(e).marginBottom, pb: getComputedStyle(e).paddingBottom, sibs: [...(e.parentElement?.children || [])].map((c) => c.tagName + ":" + Math.round(c.getBoundingClientRect().top) + "-" + Math.round(c.getBoundingClientRect().bottom)).join(" ") }); }
    return JSON.stringify(out, null, 1); }));
} finally { await browser.close(); }
