import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await p.waitForTimeout(4000);
await p.mouse.move(720,72); await p.waitForTimeout(900); await p.screenshot({path: OUT+"probe-dock-hover.png"}); await p.locator('[aria-label="Controls tab"]').first().click({timeout:5000});
await p.waitForTimeout(800);
const items = await p.$$eval('[role=menuitem],[role=menuitemradio],[role=option]', els => els.map(e => e.textContent.trim()));
console.log(JSON.stringify(items));
await p.screenshot({ path: OUT + "probe-menu.png" });
const kf = p.locator('[role=option]').filter({ hasText: "Keyframes" }).first();
await kf.click(); await p.waitForTimeout(2500);
const st = await p.evaluate(() => ({ cards: document.querySelectorAll(".progress-bar").length, cm: document.querySelectorAll(".cm-editor").length,
  kfCards: document.querySelectorAll("[data-keyframe-card], .keyframe-card").length,
  pane: [...document.querySelectorAll(".monaco-pane")].map(e=>e.dataset.state+":"+e.getBoundingClientRect().height|0) }));
console.log(JSON.stringify(st));
await p.screenshot({ path: OUT + "probe-cube-keyframes-tab.png" });
await b.close();
