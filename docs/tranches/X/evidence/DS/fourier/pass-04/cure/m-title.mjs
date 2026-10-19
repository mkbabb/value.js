import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/w/", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
console.log(await p.evaluate(() => { const h0 = document.querySelector(".drop-target-title"); const sp = document.createElement("span"); sp.textContent = "Draw any outline"; sp.style.whiteSpace = "nowrap"; h0.appendChild(sp); const W = sp.getBoundingClientRect().width; sp.remove(); console.log(W); window.__W = W; const h = document.querySelector(".drop-target-title"); const z = h.closest(".drop-zone"); const cs = getComputedStyle(h); const zs=getComputedStyle(z); return { W: window.__W, tw: cs.textWrap, twst: cs.textWrapStyle, zone: z.getBoundingClientRect().width, zpad: zs.padding, pw: z.parentElement.getBoundingClientRect().width, ppad: getComputedStyle(z.parentElement).padding, pcls: z.parentElement.className }; }));
await p.screenshot({ path: process.argv[2] });
await b.close();
