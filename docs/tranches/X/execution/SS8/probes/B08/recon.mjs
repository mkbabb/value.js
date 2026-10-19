// SS-8 B08 recon: one headless Chromium, one context per cell.
import { chromium } from "playwright";
const O = "http://localhost:9000";
const browser = await chromium.launch();
try {
  for (const [h, abort] of [["#/palettes", false], ["#/browse", true]]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const page = await ctx.newPage();
      const reqs = [];
      page.on("request", (r) => { if (!r.url().startsWith(O)) reqs.push(r.url().slice(0, 90)); });
      if (abort) await page.route(/:3000|api\./, (r) => r.abort());
      await page.goto(O + "/" + h, { waitUntil: "load" });
      await page.waitForTimeout(5000);
      const r = await page.evaluate(() => ({
        roles: [...document.querySelectorAll("[role=alert],[role=status],[aria-live]")].map((a) => `${a.tagName}.${a.getAttribute("role")}|${a.getAttribute("aria-live")}|${a.textContent.trim().slice(0, 80)}`),
        chips: [...document.querySelectorAll(".api-status-chip")].map((c) => c.dataset.seat + ":" + c.textContent.trim()),
        app: !!document.querySelector("#app")?.__vue_app__,
      }));
      console.log(h, JSON.stringify(r), JSON.stringify([...new Set(reqs)].slice(0, 8)));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
