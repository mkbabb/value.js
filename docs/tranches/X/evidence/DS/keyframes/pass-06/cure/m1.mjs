// X-DS kf pass 6 cure seat — probe the easing-edit subview's scrollers (headless real Chrome, §0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await p.evaluate(() => localStorage.clear()); await p.reload({ waitUntil: "load" });
await p.waitForTimeout(4000);
await p.locator('[aria-label="Edit easing curve"]:visible').first().click();
await p.waitForTimeout(1500);
const out = await p.evaluate(() => {
  const body = document.querySelector(".subpane-body:not([inert] *)") ?? document.querySelector(".subpane-body");
  const chain = [];
  let el = [...document.querySelectorAll("[data-subpane-body]")].find(e => e.getBoundingClientRect().height > 0);
  // descendants scrollers too
  const desc = [...el.querySelectorAll("*")].filter(e => { const s = getComputedStyle(e); return /auto|scroll/.test(s.overflowY) && e.scrollHeight > e.clientHeight; }).map(e => [e.className.toString().slice(0,80), e.clientHeight, e.scrollHeight]);
  for (let e = el; e && e !== document.body; e = e.parentElement) {
    const s = getComputedStyle(e); const r = e.getBoundingClientRect();
    chain.push([e.tagName, e.className.toString().slice(0, 90), s.overflowY, s.display, Math.round(r.y), Math.round(r.height), e.clientHeight, e.scrollHeight, s.maxHeight]);
  }
  const kids = [...el.querySelectorAll("*")].filter(e=>e.children.length>0).slice(0,25).map(e=>{const r=e.getBoundingClientRect(); const s=getComputedStyle(e); return [e.tagName,e.className.toString().slice(0,70),Math.round(r.y),Math.round(r.width),Math.round(r.height),s.overflowY,s.aspectRatio];});
  return { chain, desc, kids };
});
console.log(JSON.stringify(out, null, 1));
await p.screenshot({ path: process.argv[2] ?? "/dev/null" });
await b.close();
