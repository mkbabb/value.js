// ribbon-visualizer vs specimen-tile agreement under steps/linear — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const read = () => page.evaluate(() => {
  const sl = document.querySelector("[aria-label='Scrub animation timeline'] [role=slider], [role=slider][aria-label='Scrub animation timeline']");
  const vis = document.querySelector(".animation-visualizer, [class*=visualizer]");
  const balls = vis ? [...vis.querySelectorAll("*")].filter(e => { const b = e.getBoundingClientRect(); return b.width > 30 && b.width < 60 && Math.abs(b.width - b.height) < 2; }).map(e => [String(e.className).slice(0, 40), Math.round(e.getBoundingClientRect().x), getComputedStyle(e).transform.slice(0, 40)]) : null;
  const tile = (n) => { const t = [...document.querySelectorAll(".specimen-tile")].find(x => x.textContent.trim() === n); if (!t) return null; const st = t.querySelector(".tile-stage"); return { stageW: Math.round(st.clientWidth), ball: t.querySelector(".tile-ball").style.transform }; };
  return { now: sl?.getAttribute("aria-valuenow"), max: sl?.getAttribute("aria-valuemax"), balls, steps: tile("steps"), linear: tile("linear"), stepEnd: tile("step-end") };
});
const out = {};
for (const nm of (process.argv[2]||"linear,steps").split(",")) {
  await page.locator(`.specimen-tile:has-text("${nm}")`).first().click(); await page.waitForTimeout(600);
  const tr = await page.locator("[aria-label='Scrub animation timeline']").first().boundingBox();
  await page.mouse.click(tr.x + tr.width * 0.6, tr.y + tr.height / 2); await page.waitForTimeout(600);
  out[nm] = await read();
  await page.screenshot({ path: OUT + `11-scrub60-${nm}-1440-light.png` });
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
