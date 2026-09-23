import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const scrolled = () => page.evaluate(() => [...document.querySelectorAll("*")].concat([document.scrollingElement]).filter(e => e && (e.scrollTop > 0)).map(e => e.tagName + "." + [...(e.classList||[])].slice(0,3).join(".") + " st=" + e.scrollTop));
for (const [x,y] of [[270,640],[270,120],[270,850]]) { await page.mouse.move(x,y); await page.mouse.wheel(0, 700); await page.waitForTimeout(600); console.log("wheel@",x,y, await scrolled()); }
const anc = await page.evaluate(() => { const out=[]; let e=document.querySelector(".preset-grid"); while(e){ const s=getComputedStyle(e); const b=e.getBoundingClientRect(); if(/(auto|scroll|hidden)/.test(s.overflowY)||e.tagName==="HTML") out.push(e.tagName+"."+[...e.classList].slice(0,4).join(".")+" oy="+s.overflowY+" h="+Math.round(b.height)+" y="+Math.round(b.y)+" maxh="+s.maxHeight); e=e.parentElement;} return out; });
console.log(anc.join("\n"));
// thumbs
console.log(await page.evaluate(() => [...document.querySelectorAll(".labeled-field-grid [role=slider]")].map(t => { const s = getComputedStyle(t); return t.className.toString().slice(0,80) + " w=" + s.width + " op=" + s.opacity + " vis=" + s.visibility; })));
// dock play
const before = await page.evaluate(() => document.querySelector(".spring-target .readout-accent")?.textContent);
await page.getByRole("button", { name: "Play animation" }).first().click();
const samp = []; for (let i=0;i<6;i++){ await page.waitForTimeout(250); samp.push(await page.evaluate(() => [document.querySelector(".spring-target .readout-accent")?.textContent.trim(), [...document.querySelectorAll("button")].filter(b=>/(Play|Pause) animation/.test(b.getAttribute("aria-label")||"")).map(b=>b.getAttribute("aria-label")).join("|")])); }
console.log("dock play samples", before, JSON.stringify(samp));
await page.screenshot({ path: OUT + "probe4-dock-playing.png" });
await b.close();
