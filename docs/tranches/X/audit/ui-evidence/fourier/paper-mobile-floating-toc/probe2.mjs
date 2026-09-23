// UIA-F probe 2 — result select via mouse click and via keyboard Enter at 390 (root-cause split). Read-only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
for (const mode of ["click", "enter"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelector(".paper-scroll").scrollTo({ top: 1600, behavior: "instant" }));
  await page.waitForTimeout(900);
  await page.locator(".floating-toc-search-btn").click(); await page.waitForTimeout(300);
  await page.locator(".floating-toc-bar--search .paper-search-input").pressSequentially("Hilbert", { delay: 30 });
  await page.waitForTimeout(600);
  const armed = await page.evaluate(() => document.querySelectorAll(".paper-search-results").length);
  if (mode === "click") await page.locator(".paper-search-result:visible").first().click(); else await page.keyboard.press("Enter");
  await page.waitForTimeout(1500);
  console.log(mode, "panels", armed, await page.evaluate(() => ({ st: Math.round(document.querySelector(".paper-scroll").scrollTop), bar: document.querySelector(".floating-toc-section")?.textContent.trim(), search: !!document.querySelector(".floating-toc-bar--search") })));
  await ctx.close();
}
await browser.close();
