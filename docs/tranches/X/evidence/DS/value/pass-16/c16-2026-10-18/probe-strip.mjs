// X-DS · value · pass 16 — measure the specimen strip's families (V16C-02). Real Chrome, new headless (§0ei).
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9391";
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const width of [1440, 1024, 768, 390]) {
    const page = await newPage(browser, width, "light");
    try {
      await bootRoute(page, BASE + "/#/gradient");
      const head = page.locator("button.interval-head").first();
      if ((await head.getAttribute("aria-expanded")) !== "true") await head.click();
      await page.waitForTimeout(1000);
      console.log(width, JSON.stringify(await page.evaluate(() => {
        const row = [...document.querySelectorAll(".easing-panel .strip-row")].find((r) => r.getBoundingClientRect().height > 0);
        const port = row.closest(".fading-scroll");
        const pr = port.getBoundingClientRect();
        const fams = [...row.querySelectorAll(".strip-family")].map((f) => { const r = f.getBoundingClientRect(); const h = f.querySelector(".family-eyebrow").getBoundingClientRect(); return [f.querySelector(".family-eyebrow").textContent, Math.round(r.left - pr.left), Math.round(r.top - pr.top), Math.round(r.width), Math.round(h.left - pr.left)]; });
        return { portW: Math.round(pr.width), stripH: Math.round(row.getBoundingClientRect().height), display: getComputedStyle(row).display, cols: getComputedStyle(row).gridTemplateColumns, fams };
      })));
    } finally { await page.context().close(); }
  }
} finally { await browser.close(); }
