// keyframes DESIGN pass: what actually clips the phone PEEK sheet? One browser, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const out=[]; const browser = await chromium.launch({ headless: true });
try {
  for (const [w,h] of [[390,844],[844,390]]) for (const scene of ["cube","spring"]) {
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, colorScheme:"dark", reducedMotion:"reduce" });
    try {
      const page = await ctx.newPage();
      await page.goto("https://keyframes.babb.dev/#/"+scene,{waitUntil:"load",timeout:60000});
      await page.waitForTimeout(3500);
      out.push({w,h,scene, ...(await page.evaluate(()=>{
        const sheet=document.querySelector(".controls-drawer-content"); const sb=sheet.getBoundingClientRect();
        const fs=sheet.querySelector(".fading-scroll"); const fb=fs?.getBoundingClientRect();
        const chain=[]; for(let e=fs;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e); if(cs.overflow!=="visible"||cs.clipPath!=="none"||cs.maskImage!=="none"||cs.contain.includes("paint")) chain.push({cls:(e.className+"").slice(0,50),ov:cs.overflow,mask:cs.maskImage.slice(0,60),bottom:Math.round(e.getBoundingClientRect().bottom)});}
        const rows=[...sheet.querySelectorAll('[data-slot="labeled-field"],[data-slot="configurator-layer-trigger"]')].map(e=>{const r=e.getBoundingClientRect();return [e.textContent.trim().slice(0,14),Math.round(r.top),Math.round(r.bottom)];});
        return {sheet:[Math.round(sb.top),Math.round(sb.bottom)], fading:fb?[Math.round(fb.top),Math.round(fb.bottom)]:null, clipChain:chain, rows:rows.slice(0,5)};
      }))});
      await page.screenshot({path:`${process.env.HOME}/.dev-logs/x-design/kf/frames/peekfoot-${scene}-${w}x${h}.png`});
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
console.log(JSON.stringify(out,null,1));
