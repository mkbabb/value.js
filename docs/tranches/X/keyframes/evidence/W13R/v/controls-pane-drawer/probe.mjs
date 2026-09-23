import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(720, 600);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4500);
const info = await page.evaluate(() => {
  const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info");
  const w = document.querySelector(".controls-pane-wrapper"); const lay = document.querySelector(".controls-layout");
  const btns = [...document.querySelectorAll('button[aria-label]')].map(b => b.getAttribute("aria-label") + (b.getAttribute("aria-pressed")?`(${b.getAttribute("aria-pressed")})`:""));
  const tabs = [...document.querySelectorAll('[role="tab"]')].map(t => t.textContent.trim() + ":" + t.getAttribute("aria-selected"));
  return { renderer: g.getParameter(e.UNMASKED_RENDERER_WEBGL), hash: location.hash,
    wrapper: w && { cls: w.className, rect: w.getBoundingClientRect().toJSON(), op: getComputedStyle(w).opacity, tr: getComputedStyle(w).transition },
    layout: lay && { cls: lay.className, gtc: getComputedStyle(lay).gridTemplateColumns, tr: getComputedStyle(lay).transition },
    btns, tabs };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: "probe-rest.png" });
await browser.close();
