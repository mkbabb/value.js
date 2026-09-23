// CONFIRM seat probe (read-only): does the HIDDEN sidebar PaperSearch instance also kill in-field taps (caret tap, Expand) on mobile?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
const state = () => page.evaluate(() => ({ st: Math.round(document.querySelector(".paper-scroll").scrollTop), searchBar: !!document.querySelector(".floating-toc-bar--search"), q: document.querySelector(".floating-toc-bar--search .paper-search-input")?.value ?? null, modal: !!document.querySelector(".paper-search-modal, [role=dialog]"), panels: document.querySelectorAll(".paper-search-results").length }));
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector(".paper-scroll").scrollTo({ top: 1600, behavior: "instant" }));
await page.waitForTimeout(900);
async function openAndType(q) {
  if (!(await state()).searchBar) { await page.locator(".floating-toc-search-btn").tap(); await page.waitForTimeout(400); }
  await page.locator(".floating-toc-bar--search .paper-search-input").pressSequentially(q, { delay: 30 });
  await page.waitForTimeout(600);
}
// P1: tap inside the field (caret reposition) with results open
await openAndType("wave");
console.log("P1 before field tap", JSON.stringify(await state()));
await page.locator(".floating-toc-bar--search .paper-search-input").tap({ position: { x: 20, y: 10 } });
await page.waitForTimeout(600);
console.log("P1 after field tap", JSON.stringify(await state()));
await page.screenshot({ path: OUT + "confirm-P1-after-field-tap.png" });
// P2: tap Expand (Maximize) with results open
await openAndType("wave");
console.log("P2 before expand", JSON.stringify(await state()));
const exp = page.locator(".floating-toc-bar--search .paper-search-action-btn").first();
console.log("P2 expand label", await exp.getAttribute("aria-label"));
await exp.tap();
await page.waitForTimeout(800);
console.log("P2 after expand tap", JSON.stringify(await state()));
await page.screenshot({ path: OUT + "confirm-P2-after-expand-tap.png" });
await browser.close();
