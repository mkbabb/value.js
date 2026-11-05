// keyframes DESIGN pass: attribute stage-card overflow; frames of square/sequence at 844x390. One browser, context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const D=`${process.env.HOME}/.dev-logs/x-design/kf/frames`; const out=[]; const browser = await chromium.launch({ headless: true });
try {
  for (const [w,h,scene,sel] of [[1440,900,"spring",".spring-target"],[844,390,"spring",".spring-target"],[844,390,"square",".square-stage"],[844,390,"sequence",".seq-target"]]) {
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, colorScheme:"dark", reducedMotion:"reduce" });
    try {
      const page = await ctx.newPage();
      await page.goto("https://keyframes.babb.dev/#/"+scene,{waitUntil:"load",timeout:60000});
      await page.waitForTimeout(3000);
      out.push({w,h,scene, ...(await page.evaluate((sel)=>{
        const c=document.querySelector(sel); const cb=c.getBoundingClientRect();
        const deep=[...c.querySelectorAll("*")].map(e=>{const r=e.getBoundingClientRect();return {e,b:r.bottom,h:r.height};}).filter(x=>x.h>0).sort((a,b)=>b.b-a.b).slice(0,4)
          .map(x=>({tag:x.e.tagName.toLowerCase(),cls:(x.e.className?.baseVal??x.e.className+"").slice(0,40),pos:getComputedStyle(x.e).position,overBy:Math.round(x.b-cb.bottom)}));
        return {card:[Math.round(cb.top),Math.round(cb.bottom)],sh:c.scrollHeight,ch:c.clientHeight,deepest:deep};
      },sel))});
      await page.screenshot({path:`${D}/attr-${scene}-${w}x${h}-dark.png`});
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
for (const r of out) console.log(JSON.stringify(r));
