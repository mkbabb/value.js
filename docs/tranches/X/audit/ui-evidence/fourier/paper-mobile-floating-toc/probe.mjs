// UIA-F paper-mobile-floating-toc — behaviour probe (result select / close search / leaf-root tap). Read-only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
const st = () => page.evaluate(() => Math.round(document.querySelector(".paper-scroll").scrollTop));
const state = () => page.evaluate(() => ({ st: Math.round(document.querySelector(".paper-scroll").scrollTop), searchBar: !!document.querySelector(".floating-toc-bar--search"), bar: document.querySelector(".floating-toc-section")?.textContent.trim(), dd: !!document.querySelector(".floating-toc-dropdown"), hash: location.hash, overflow: document.querySelector(".paper-scroll").style.overflow }));
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector(".paper-scroll").scrollTo({ top: 1600, behavior: "instant" }));
await page.waitForTimeout(900);
console.log("start", await state());
// A: result select
await page.locator(".floating-toc-search-btn").tap();
await page.waitForTimeout(400);
const inp = page.locator(".floating-toc-bar--search .paper-search-input");
await inp.pressSequentially("Hilbert", { delay: 30 });
await page.waitForTimeout(600);
const rows = page.locator(".paper-search-result:visible");
console.log("rows", await rows.count(), (await rows.nth(0).textContent()).trim().replace(/\s+/g, " "));
await rows.nth(0).tap();
await page.waitForTimeout(1500);
console.log("after result tap", await state());
await page.screenshot({ path: OUT + "probe-A-after-result-tap.png" });
// B: close search
await page.locator(".floating-toc-search-btn").tap();
await page.waitForTimeout(400);
console.log("reopen", await state(), "focused:", await page.evaluate(() => document.activeElement?.className));
await page.locator(".floating-toc-bar--search .paper-search-input").pressSequentially("wave", { delay: 30 });
await page.waitForTimeout(400);
console.log("typed value:", await page.locator(".floating-toc-bar--search .paper-search-input").inputValue());
await page.locator(".floating-toc-search-close").tap();
await page.waitForTimeout(600);
console.log("after close tap", await state());
await page.screenshot({ path: OUT + "probe-B-after-close-tap.png" });
// B2: close via click (mouse) if still open
if ((await state()).searchBar) { await page.locator(".floating-toc-search-close").click(); await page.waitForTimeout(600); console.log("after close CLICK", await state()); }
// B3: close with empty query
if (!(await state()).searchBar) { await page.locator(".floating-toc-search-btn").tap(); await page.waitForTimeout(400); }
await page.locator(".floating-toc-search-close").tap(); await page.waitForTimeout(600);
console.log("close with empty query", await state());
await page.screenshot({ path: OUT + "probe-B3-close-empty.png" });
// C: leaf root tap
if ((await state()).searchBar) { await page.keyboard.press("Escape"); await page.waitForTimeout(400); console.log("after Esc in search", await state()); }
if (!(await state()).searchBar) {
  await page.locator(".floating-toc-title-btn").tap(); await page.waitForTimeout(400);
  const leaves = await page.evaluate(() => [...document.querySelectorAll(".floating-toc-root")].map((e, i) => [i, e.textContent.trim().replace(/\s+/g, " "), !!e.querySelector(".floating-toc-collapse-icon")]));
  console.log("roots", JSON.stringify(leaves));
  const idx = leaves.find((l) => !l[2] && !/Introduction/.test(l[1]))?.[0];
  const r = page.locator(".floating-toc-root").nth(idx); await r.scrollIntoViewIfNeeded(); await r.tap(); await page.waitForTimeout(1000);
  console.log("after leaf root tap", leaves[idx][1], await state());
  await page.screenshot({ path: OUT + "probe-C-after-leaf-root-tap.png" });
  // tap the 'Scroll to top'
  await page.evaluate(() => { const d = document.querySelector(".floating-toc-dropdown"); if (d) d.scrollTop = 0; });
  if (await page.locator(".floating-toc-top").count()) { await page.locator(".floating-toc-top").tap(); await page.waitForTimeout(1200); console.log("after scroll-to-top", await state()); }
}
await browser.close();
