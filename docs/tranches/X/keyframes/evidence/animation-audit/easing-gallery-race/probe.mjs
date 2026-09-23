import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs = [];
page.on("console", m => { if (m.type()==="error"||m.type()==="warning") logs.push(m.type()+": "+m.text().slice(0,200)); });
page.on("pageerror", e => logs.push("pageerror: "+e.message.slice(0,200)));
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: OUT + "00-landing.png" });
const info = await page.evaluate(() => {
  const balls = [...document.querySelectorAll(".tile-ball")];
  const btns = [...document.querySelectorAll("button")].map(b => (b.getAttribute("aria-label")||b.textContent.trim()).slice(0,40)).filter(Boolean);
  const gpu = (()=>{ const c=document.createElement("canvas").getContext("webgl"); const d=c&&c.getExtension("WEBGL_debug_renderer_info"); return d?c.getParameter(d.UNMASKED_RENDERER_WEBGL):"?"; })();
  return { nBalls: balls.length, first: balls.slice(0,4).map(b=>({c:b.dataset.curve, t:b.style.transform, r:b.getBoundingClientRect().toJSON()})), btns, anims: document.getAnimations().length, gpu, hash: location.hash };
});
console.log(JSON.stringify(info, null, 1));
console.log(logs.join("\n"));
await browser.close();
