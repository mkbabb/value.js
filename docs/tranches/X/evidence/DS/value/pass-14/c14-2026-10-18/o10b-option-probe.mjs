import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const BASE = "http://localhost:9372";
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/#/?space=lab&color=${encodeURIComponent("lab(38% 32 24)")}`, { timeout: 120000 });
  await page.locator(".readout").first().waitFor({ timeout: 120000 });
  await page.waitForTimeout(4000);
  const trigger = page.locator(".picker-header .space-trigger").first();
  console.log("trigger:", await trigger.getAttribute("aria-label"));
  for (let i = 0; i < 4; i++) {
    await trigger.click();
    const opt = page.locator('[role="option"]').nth(i);
    await opt.waitFor();
    const samples = await opt.evaluate(async (el) => {
      const out = [];
      for (let k = 0; k < 12; k++) { await new Promise((r) => requestAnimationFrame(r)); const r = el.getBoundingClientRect(); out.push(`${r.x.toFixed(1)},${r.y.toFixed(1)},${r.width.toFixed(1)}x${r.height.toFixed(1)}`); }
      const lb = el.closest('[role="listbox"]'); const s = lb ? getComputedStyle(lb) : null;
      return { uniq: [...new Set(out)], lbAnim: s && s.animationName, lbTrans: s && s.transform, scrollTop: lb && lb.scrollTop };
    });
    const name = (await opt.locator("span").first().textContent())?.trim();
    console.log(i, name, JSON.stringify(samples));
    await opt.click({ timeout: 15000 }).catch((e) => console.log("CLICK FAIL", String(e).slice(0, 200)));
    await page.waitForTimeout(1500);
    const lines = await page.locator(".readout").first().evaluate((el) => { const tops = []; for (const c of el.querySelectorAll(".readout-cell")) { const y = c.getBoundingClientRect().top; if (!tops.some((t) => Math.abs(t - y) < 8)) tops.push(y); } return { lines: tops.length, text: el.textContent.replace(/\s+/g, " ").trim() }; });
    console.log("   readout", JSON.stringify(lines));
  }
} finally { await browser.close(); }
