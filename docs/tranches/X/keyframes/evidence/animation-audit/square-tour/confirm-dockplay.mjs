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
const dockPlay = async () => { const plays = page.locator('button[aria-label="Play animation"]:visible'); let d=null; for (let i=0;i<await plays.count();i++){const b=await plays.nth(i).boundingBox(); if(b&&b.y>700) d={b};} return d; };
// A: edit, then human-style hover -> settle -> click at the post-settle position
const dur = page.locator("input:visible").first();
await dur.click({ clickCount: 3 }); await dur.fill("1s"); await dur.press("Enter");
await page.waitForTimeout(1600);
let d = await dockPlay(); R.before = d?.b;
await page.mouse.move(d.b.x + d.b.width/2, d.b.y + d.b.height/2); await page.waitForTimeout(900);
d = await dockPlay(); R.afterHover = d?.b;
await page.mouse.move(d.b.x + d.b.width/2, d.b.y + d.b.height/2); await page.waitForTimeout(100);
await page.mouse.down(); await page.waitForTimeout(60); await page.mouse.up(); await page.waitForTimeout(200);
R.humanClickAfterEdit = await st();
await page.screenshot({ path: OUT + "confirm-dockplay.png", clip: { x: 520, y: 740, width: 400, height: 100 } });
fs.writeFileSync(OUT + "confirm-dockplay.json", JSON.stringify(R, null, 1));
await browser.close();
