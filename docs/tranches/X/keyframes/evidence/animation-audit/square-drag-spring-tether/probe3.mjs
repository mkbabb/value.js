// Probe 3 — where does the box's fill change after drag→release→Home? (reads --subject-fill + data-palette-sweep per step)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/square"); await p.waitForSelector(".demo-box"); await p.waitForTimeout(2500);
await p.evaluate(() => { const bx = document.querySelector(".demo-box"); window.__log = [];
  new MutationObserver(ms => ms.forEach(m => window.__log.push({ t: Math.round(performance.now()), attr: m.attributeName, fill: bx.style.getPropertyValue("--subject-fill"), sweep: bx.hasAttribute("data-palette-sweep"), mode: bx.dataset.squareMode, tf: bx.style.transform.slice(0, 60) }))).observe(bx, { attributes: true, attributeFilter: ["style", "data-palette-sweep", "data-square-mode"] });
  window.__ev = []; for (const t of ["pointerdown", "pointerup", "keydown"]) bx.addEventListener(t, e => window.__ev.push({ t: Math.round(performance.now()), type: t, key: e.key }));
});
const st = (label) => p.evaluate((label) => { const bx = document.querySelector(".demo-box"); return { label, fill: bx.style.getPropertyValue("--subject-fill"), bg: getComputedStyle(bx).backgroundColor, sweep: bx.hasAttribute("data-palette-sweep"), mode: bx.dataset.squareMode, tf: bx.style.transform }; }, label);
const C = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const out = [await st("rest")];
await p.mouse.move(C.x, C.y); await p.mouse.down();
for (let i = 1; i <= 10; i++) { await p.mouse.move(C.x + 4 * i, C.y); await p.waitForTimeout(16); }
await p.waitForTimeout(900); out.push(await st("held40"));
await p.mouse.up(); await p.waitForTimeout(1200); out.push(await st("released"));
await p.keyboard.press("Home"); await p.waitForTimeout(1500); out.push(await st("afterHome"));
await p.screenshot({ path: OUT + "probe3-afterHome.png", clip: { x: 698, y: 227, width: 520, height: 446 } });
const log = await p.evaluate(() => ({ log: window.__log.filter(l => l.attr !== "style" || l.fill).slice(0, 40), ev: window.__ev }));
fs.writeFileSync(OUT + "probe3.json", JSON.stringify({ out, ...log }, null, 1));
console.log(JSON.stringify(out, null, 1)); console.log(JSON.stringify(log.ev)); console.log(JSON.stringify(log.log.slice(0, 12)));
await b.close();
