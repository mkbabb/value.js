// keyframes DESIGN pass: which stage cards clip their own content at 844x390 / 390x844. One browser, context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const out=[]; const browser = await chromium.launch({ headless: true });
try {
  for (const [w,h] of [[844,390],[390,844],[1440,900]]) for (const scene of ["spring","square","easing","sequence","amiga","cube"]) {
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, colorScheme:"dark", reducedMotion:"reduce" });
    try {
      const page = await ctx.newPage();
      await page.goto("https://keyframes.babb.dev/#/"+scene,{waitUntil:"load",timeout:60000});
      await page.waitForTimeout(3000);
      out.push({w,h,scene, ...(await page.evaluate(()=>{
        const stage=document.querySelector(".stage-glide"); if(!stage) return {none:true};
        const sb=stage.getBoundingClientRect();
        const clipped=[];
        for (const e of stage.querySelectorAll("*")) { const cs=getComputedStyle(e); if(cs.overflowY==="visible") continue;
          if (e.scrollHeight>e.clientHeight+2 && e.clientHeight>40) clipped.push({cls:(e.className+"").slice(0,48),ch:e.clientHeight,sh:e.scrollHeight,ov:cs.overflowY}); }
        const txt=[...stage.querySelectorAll("p")].map(p=>{const r=p.getBoundingClientRect();return {t:p.textContent.trim().slice(0,24),top:Math.round(r.top),bot:Math.round(r.bottom)};});
        return {stage:[Math.round(sb.top),Math.round(sb.bottom)], clipped:clipped.slice(0,4), p:txt.slice(0,3)};
      }))});
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
for (const r of out) console.log(JSON.stringify(r));
