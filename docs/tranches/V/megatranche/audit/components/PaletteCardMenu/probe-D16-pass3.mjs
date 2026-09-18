// pass 3 · probe D16 — the 320px card row itself (menu CLOSED), and the
// arithmetic of the min-w-0 group vs its shrink-0 children.
import { chromium } from "playwright";
import fs from "node:fs";
const EV = new URL("./evidence/", import.meta.url).pathname;
const SAVED={id:"pal-1",name:"Muted Terracotta and Deep Sea Foam Study",slug:"s",isLocal:true,tier:"featured",versionCount:4,colors:[{css:"#c1663f"},{css:"#8ec9b0"},{css:"#24444d"},{css:"#e8dcc0"},{css:"#7a4a32"}]};
const b=await chromium.launch();
const out={};
for (const w of [320, 390]) {
  const ctx=await b.newContext({viewport:{width:w,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:3});
  const p=await ctx.newPage();
  await p.addInitScript(s=>localStorage.setItem("color-palettes",s),JSON.stringify({version:1,palettes:[SAVED]}));
  await p.goto("http://localhost:9000/#/palettes",{waitUntil:"load"});
  await p.waitForTimeout(3000);
  const m=await p.evaluate(()=>{
    const card=document.querySelector('[role="article"]');
    const nameSpan=[...card.querySelectorAll("span")].find(s=>s.getAttribute("title"));
    const group=nameSpan.parentElement;
    const gr=group.getBoundingClientRect();
    const kids=[...group.children].map(c=>{const r=c.getBoundingClientRect();return{tag:c.tagName,cls:(c.className||'').toString().slice(0,26),x:+r.x.toFixed(1),right:+r.right.toFixed(1),w:+r.width.toFixed(1)};});
    const trig=card.querySelector('button[aria-label="Palette menu"]').getBoundingClientRect();
    const cs=getComputedStyle(group);
    return{groupRect:{x:+gr.x.toFixed(1),right:+gr.right.toFixed(1),w:+gr.width.toFixed(1)},groupOverflow:cs.overflow,kids,
      kidsSum:+kids.reduce((a,k)=>a+k.w,0).toFixed(1),
      trigger:{x:+trig.x.toFixed(1),right:+trig.right.toFixed(1),w:+trig.width.toFixed(1)},
      lastKidRight:+Math.max(...kids.map(k=>k.right)).toFixed(1),
      cardOverflow:getComputedStyle(card).overflow};
  });
  m.overrunsGroupBy=+(m.lastKidRight-m.groupRect.right).toFixed(1);
  m.collidesWithTrigger=m.lastKidRight>m.trigger.x;
  out[w]=m;
  await p.locator('[role="article"]').first().screenshot({path:EV+`pass3-card-row-${w}.png`});
  await ctx.close();
}
fs.writeFileSync(new URL("./probe-D16-pass3-results.json",import.meta.url).pathname,JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2));
await b.close();
