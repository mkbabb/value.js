// easing-scene-specimens DOM probe — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, colorScheme: "light" });
  const page = await ctx.newPage(); const errs = [];
  page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + " " + m.text().slice(0, 160)); });
  await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  const r = await page.evaluate(() => {
    const vis = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
    return {
      buttons: [...document.querySelectorAll("button,[role=combobox]")].filter(vis).map(e => (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24)) + "|" + e.getAttribute("role")).slice(0, 80),
      drawer: [...document.querySelectorAll(".glass-drawer,[data-glass-drawer-snap-points]")].map(e => [e.className.slice(0, 80), JSON.stringify(e.getBoundingClientRect())]),
      tiles: document.querySelectorAll(".specimen-tile").length,
      tileRadius: getComputedStyle(document.querySelector(".specimen-tile")).borderRadius,
      tileRect: JSON.stringify(document.querySelector(".specimen-tile").getBoundingClientRect()),
      filterRadius: getComputedStyle(document.querySelector(".family-row .toggle-group__item, .family-row button")).borderRadius,
      trackRadius: getComputedStyle(document.querySelector(".family-row .toggle-group")).borderRadius,
      cardRadius: getComputedStyle(document.querySelector(".easing-target")).borderRadius,
    };
  });
  console.log(vp.width, JSON.stringify(r, null, 1), errs);
  await page.screenshot({ path: new URL(`probe-${vp.width}.png`, import.meta.url).pathname });
  await ctx.close();
}
await browser.close();
