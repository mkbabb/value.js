import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); const errs = [];
page.on("pageerror", e => errs.push(String(e).slice(0, 200)));
page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
await page.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => {
  const r = e => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const vis = e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
  return {
    buttons: [...document.querySelectorAll("button,[role=combobox],[role=slider],[role=tab]")].filter(vis).map(e => e.tagName + "|" + (e.getAttribute("role")||"") + "|" + (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 30)) + "|" + r(e).join(",")),
    card: document.querySelector(".seq-target") && r(document.querySelector(".seq-target")),
    cardRadius: document.querySelector(".seq-target") && getComputedStyle(document.querySelector(".seq-target")).borderRadius,
    stageRadius: document.querySelector(".seq-stage") && getComputedStyle(document.querySelector(".seq-stage")).borderRadius,
  };
});
console.log(JSON.stringify(info, null, 1)); console.log(errs);
await page.screenshot({ path: OUT + "probe-1440-light.png" });
await b.close();
