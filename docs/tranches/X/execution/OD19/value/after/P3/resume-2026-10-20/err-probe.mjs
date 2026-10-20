import { chromium } from "@playwright/test";
const base = process.argv[2];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
  for (const w of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    try {
      const page = await ctx.newPage();
      page.on("pageerror", (e) => console.log(`[${w}] pageerror`, e.message, "\n", (e.stack || "").split("\n").slice(0, 8).join("\n")));
      await page.goto(base + "/", { waitUntil: "load", timeout: 120000 });
      await page.waitForTimeout(6000);
      await page.evaluate(() => (location.hash = "#/gradient"));
      await page.waitForTimeout(3000);
      await page.evaluate(() => (location.hash = "#/mix"));
      await page.waitForTimeout(3000);
      console.log(`[${w}] done ${page.url()}`);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
