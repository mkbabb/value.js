// Probe: where is the rendered equation clipped, and is it scrollable? Also the raw latex length vs budget.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2 });
const page = await ctx.newPage(); const log = [];
page.on("response", async (r) => { if (r.url().includes("simplif")) { try { const j = await r.json(); log.push("resp " + r.url().split("/api")[1] + " latexLen=" + (j.latex||"").length + " terms~" + ((j.latex||"").match(/[+-]/g)||[]).length + " tail=" + (j.latex||"").slice(-60)); } catch {} } });
await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.locator(".controls-dock-anchor").waitFor();
await page.waitForTimeout(1500);
await page.locator(".controls-dock-anchor .glass-dock").first().hover(); await page.waitForTimeout(700);
await page.locator("[aria-label='Equation']").first().click(); await page.locator(".eq-panel").waitFor(); await page.waitForTimeout(1500);
const probe = () => page.evaluate(() => {
  const out = []; let el = document.querySelector(".eq-katex .katex-html") || document.querySelector(".eq-katex");
  for (let e = el; e && !e.classList.contains("eq-panel"); e = e.parentElement) { const cs = getComputedStyle(e); out.push(`${e.className.toString().slice(0, 40)} sw=${e.scrollWidth} cw=${e.clientWidth} ox=${cs.overflowX} maxw=${cs.maxWidth}`); }
  return out;
});
log.push("chain@6: " + JSON.stringify(await probe()));
await page.locator(".eq-panel [role=slider]").focus(); await page.keyboard.press("End"); await page.waitForTimeout(2000);
log.push("chain@20: " + JSON.stringify(await probe()));
// can the user scroll it? wheel horizontally over the equation
const kb = await page.locator(".eq-katex").boundingBox(); await page.mouse.move(kb.x + kb.width / 2, kb.y + kb.height / 2); await page.mouse.wheel(300, 0); await page.waitForTimeout(400);
log.push("scrollLeft after wheel " + JSON.stringify(await page.evaluate(() => [...document.querySelectorAll(".eq-panel *")].filter((e) => e.scrollLeft > 0).map((e) => e.className.toString().slice(0, 30) + ":" + e.scrollLeft))));
await page.screenshot({ path: OUT + "d-light-probe-katex-wheel.png", clip: { x: 0, y: 100, width: 520, height: 300 } });
writeFileSync(OUT + "probe-katex.log", log.join("\n") + "\n"); await browser.close(); console.log(log.join("\n"));
