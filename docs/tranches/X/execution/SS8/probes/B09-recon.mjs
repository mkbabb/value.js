// SS-8 B09-about recon: one headless Chromium, one context per cell.
import { chromium } from "playwright";
const O = "http://localhost:9000";
const cells = process.argv.slice(2).length ? process.argv.slice(2) : ["#/", "#/about"];
const browser = await chromium.launch();
try {
  for (const h of cells) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const page = await ctx.newPage();
      const errs = [];
      page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
      await page.goto(O + "/" + h, { waitUntil: "load" });
      await page.waitForSelector(".about-card", { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(2500);
      const r = await page.evaluate(() => {
        const card = document.querySelector(".about-card");
        const port = card?.querySelector("[data-slot*='scroll'],[class*='fading'],[class*='scroll']");
        const ports = card ? [...card.querySelectorAll("*")].filter((e) => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight; }).map((e) => ({ cls: e.className.toString().slice(0, 100), sh: e.scrollHeight, ch: e.clientHeight })) : [];
        return {
          url: location.href, about: !!card, cardRect: card?.getBoundingClientRect().toJSON(),
          facts: card?.querySelector("[data-space-facts]")?.getAttribute("data-space-facts"),
          guide: card?.querySelector("[data-guide-section]")?.getAttribute("data-guide-state"),
          katex: document.querySelectorAll(".katex").length, katexDisplay: document.querySelectorAll(".katex-display").length,
          ports, alerts: [...document.querySelectorAll("[role=alert]")].map((a) => a.textContent.trim().slice(0, 120)),
          title: card?.querySelector("h1,h2")?.textContent.trim().slice(0, 80),
        };
      });
      console.log(h, JSON.stringify(r), "errors:", JSON.stringify(errs));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
