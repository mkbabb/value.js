import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "load" }); await p.waitForTimeout(4000);
console.log("dpr", await p.evaluate(() => devicePixelRatio));
await p.evaluate(() => { const sec = [...document.querySelectorAll(".keyframes-section")].find(s => s.offsetParent); sec.setAttribute("data-a", 1); sec.scrollIntoView({ block: "start" }); });
const pre = p.locator('[data-a] pre[contenteditable]').nth(1); await pre.click(); await p.keyboard.press("End"); await p.keyboard.type(" ");
await p.waitForTimeout(550);
const r = await p.evaluate(() => { const bar = document.querySelector("[data-a] .progress-bar"); const cs = getComputedStyle(bar);
  return { inl: bar.style.cssText, transform: cs.transform, scale: cs.scale, translate: cs.translate, rotate: cs.rotate, ow: bar.offsetWidth, bcr: bar.getBoundingClientRect().width, isConnected: bar.isConnected }; });
console.log(JSON.stringify(r));
await p.screenshot({ path: OUT + "probe5-midsweep.png", clip: { x: 60, y: 150, width: 440, height: 480 } });
// force-remove the class scale to prove the cause visually
await p.evaluate(() => { const bar = document.querySelector("[data-a] .progress-bar"); bar.style.scale = "1"; bar.style.transform = "scaleX(0.5)"; });
await p.waitForTimeout(100);
console.log(JSON.stringify(await p.evaluate(() => document.querySelector("[data-a] .progress-bar").getBoundingClientRect().toJSON())));
await p.screenshot({ path: OUT + "probe5-scale-override.png", clip: { x: 60, y: 150, width: 440, height: 480 } });
await b.close();
