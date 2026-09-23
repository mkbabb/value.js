// UIA-F probe 3 — computed type of the numeral spans + progress-bar occlusion. Read-only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(1500);
await page.evaluate(() => document.querySelector(".paper-scroll").scrollTo({ top: 1600, behavior: "instant" }));
await page.waitForTimeout(900);
await page.locator(".floating-toc-title-btn").tap(); await page.waitForTimeout(400);
console.log(JSON.stringify(await page.evaluate(() => {
  const cs = (e) => e && { fs: getComputedStyle(e).fontSize, ff: getComputedStyle(e).fontFamily.slice(0, 20), op: getComputedStyle(e).opacity };
  const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), z: getComputedStyle(e).zIndex }; };
  return {
    barNum: cs(document.querySelector(".floating-toc-section .fira-code")), barTitle: cs(document.querySelector(".floating-toc-section")),
    rowNum: cs(document.querySelector(".floating-toc-root .fira-code")), subNum: cs(document.querySelector(".floating-toc-sub .fira-code")),
    progressTrack: r(document.querySelector(".paper-progress-track")), progressBar: r(document.querySelector(".paper-progress-bar")), bar: r(document.querySelector(".floating-toc-bar")),
    rootsAriaExpanded: [...document.querySelectorAll(".floating-toc-root")].slice(0, 3).map((e) => e.getAttribute("aria-expanded")),
    renderTitleUsed: document.querySelector(".floating-toc-dropdown").innerHTML.includes("katex"),
  };
}), null, 1));
await browser.close();
