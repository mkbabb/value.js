// After a panel duration edit: does transport Play still drive the tour? which Play surface works?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" });
await page.waitForSelector(".demo-box"); await page.waitForTimeout(2000);
const st = () => page.evaluate(async () => {
  const box = document.querySelector(".demo-box"); let inst = box.__vueParentComponent;
  while (inst && !(inst.setupState && inst.setupState.animationGroup)) inst = inst.parent;
  const s = inst.setupState; const t1 = s.anim.t; await new Promise(r => setTimeout(r, 300));
  return { dur: s.anim.options.duration, playing: s.animationGroup.playing?.(), isPlaying: s.isPlaying, t1, t2: s.anim.t, mode: box.dataset.squareMode, tr: box.style.transform.slice(0, 50),
    dockBtns: [...document.querySelectorAll("button[aria-label]")].filter(b => b.offsetParent && b.getBoundingClientRect().y > 700).map(b => b.getAttribute("aria-label") + "@" + Math.round(b.getBoundingClientRect().x)) };
});
const R = {};
const dur = page.locator("input:visible").first();
await dur.click({ clickCount: 3 }); await dur.fill("1s"); await dur.press("Enter");
await page.waitForTimeout(100); await page.screenshot({ path: OUT + "probe2-after-enter-100ms.png", clip: { x: 520, y: 740, width: 400, height: 100 } });
R.afterEnter = await st();
await page.waitForTimeout(1500); await page.screenshot({ path: OUT + "probe2-after-enter-1.6s.png", clip: { x: 520, y: 740, width: 400, height: 100 } });
R.afterSettle = await st();
const plays = page.locator('button[aria-label="Play animation"]:visible');
let dock = null; for (let i = 0; i < await plays.count(); i++) { const b = await plays.nth(i).boundingBox(); if (b && b.y > 700) dock = plays.nth(i); }
if (dock) { await dock.click(); await page.waitForTimeout(200); R.afterDockPlay = await st(); }
if (!R.afterDockPlay?.playing) { await page.getByRole("button", { name: /^Play/ }).filter({ hasText: "Play" }).first().click(); await page.waitForTimeout(200); R.afterPanelPlay = await st(); }
fs.writeFileSync(OUT + "panel-probe2.json", JSON.stringify(R, null, 1)); console.log(JSON.stringify(R, null, 1));
await browser.close();
