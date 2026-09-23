// resume-anchor probe: pause mid up-leg, resume, read per-rAF linear-ball x across the resume; + dock play.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.evaluate(() => { window.__s=[]; const b=document.querySelector('.tile-ball[data-curve="linear"]'); const f=(t)=>{ window.__s.push([+t.toFixed(1), +(b.style.transform.match(/-?[\d.]+/)?.[0]??NaN)]); requestAnimationFrame(f);}; requestAnimationFrame(f); });
const btn = page.locator("button.btn-playback").first();
const clip = await page.evaluate(() => { const r=document.querySelector(".specimen-drawer").getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:140}; });
const cycles = [];
for (const hold of [600, 1100, 2100]) {           // pause on up-leg (600), near peak (1100), on down-leg (2100)
  await btn.click(); const t0 = await page.evaluate(()=>performance.now());
  await page.waitForTimeout(hold);
  await btn.click(); const t1 = await page.evaluate(()=>performance.now());
  await page.screenshot({ path: `${OUT}08-paused-${hold}.png`, clip });
  await page.waitForTimeout(500);
  await btn.click(); const t2 = await page.evaluate(()=>performance.now());
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${OUT}08-resumed-${hold}.png`, clip });
  await page.waitForTimeout(200);
  await btn.click(); await page.waitForTimeout(300);
  cycles.push({ hold, t0, t1, t2 });
}
// dock play (the bottom-bar transport)
const dock = page.locator('button[aria-label="Play animation"]:visible');
const dockInfo = await dock.evaluateAll(els => els.map(e => ({ r: e.getBoundingClientRect().toJSON(), cls: e.className.slice(0,60) })));
const before = await page.evaluate(() => document.querySelector('.tile-ball[data-curve="linear"]').style.transform);
await dock.first().click(); await page.waitForTimeout(800);
const after = await page.evaluate(() => ({ lin: document.querySelector('.tile-ball[data-curve="linear"]').style.transform, ribbon: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("|"), dockLabels: [...document.querySelectorAll('button[aria-label*="animation"]')].map(b=>b.getAttribute("aria-label")).join("|") }));
const s = await page.evaluate(() => window.__s);
// extract the windows around each resume
const win = cycles.map(c => ({ hold: c.hold, pausedAt: s.filter(x=>x[0]>c.t1+50 && x[0]<c.t2).slice(-1)[0], firstAfterResume: s.filter(x=>x[0]>=c.t2).slice(0,6) }));
writeFileSync(OUT + "resume.json", JSON.stringify({ cycles, win, dockInfo, before, after }, null, 1));
console.log(JSON.stringify({ win, dockInfo, before, after }));
await browser.close();
