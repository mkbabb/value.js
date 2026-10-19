import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const KEY = "animation-groups-control-options-store";
const out = {};
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme:scheme });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/cube",{waitUntil:"load"}); await p.waitForTimeout(4000);
  // Keyframes tab
  await p.locator('button:visible', {hasText:/^Keyframes$/}).first().click().catch(e=>out.err1=String(e).slice(0,100)); await p.waitForTimeout(2500);
  await p.screenshot({path:`keyframes-pane-1440-${scheme}.png`});
  // Timeline with 2 keyframes, expanded
  await p.locator('button:visible', {hasText:/^Timeline$/}).first().click().catch(e=>out.err2=String(e).slice(0,100)); await p.waitForTimeout(1500);
  for (let i=0;i<2;i++){ await p.locator('button:visible',{hasText:"Snapshot"}).first().click().catch(()=>{}); await p.waitForTimeout(1300);}
  await p.screenshot({path:`timeline-2kf-docked-1440-${scheme}.png`});
  out[`tl-${scheme}`] = await p.evaluate(()=>{const c=[...document.querySelectorAll('.cartoon-surface,.pane-frame')].map(e=>({cls:e.className.toString().slice(0,80), sh:getComputedStyle(e).boxShadow.slice(0,300)})); return c;});
  await p.locator('button[aria-label="Expand timeline"]').first().click().catch(()=>{}); await p.waitForTimeout(1500);
  out[`tlx-${scheme}`] = await p.evaluate(()=>{const c=document.querySelector("#timeline-expanded-target .cartoon-surface"); return c && {sh:getComputedStyle(c).boxShadow, bf:getComputedStyle(c).backdropFilter, cls:c.className.toString()};});
  await p.screenshot({path:`timeline-2kf-expanded-1440-${scheme}.png`});
  await p.locator('button[aria-label="Collapse timeline"]').first().click().catch(()=>{});
  await p.waitForTimeout(800);
  // @mbabb menu
  await p.keyboard.press("Escape");
  await p.locator('button[aria-label="@mbabb menu"]:visible').first().click().catch(e=>out.err3=String(e).slice(0,100)); await p.waitForTimeout(1200);
  await p.screenshot({path:`mbabb-menu-1440-${scheme}.png`});
  await p.keyboard.press("Escape"); await p.waitForTimeout(500);
  await p.locator('button[aria-label="Scene facet"]:visible').first().click().catch(e=>out.err4=String(e).slice(0,100)); await p.waitForTimeout(1200);
  await p.screenshot({path:`scene-facet-1440-${scheme}.png`});
  await ctx.close();
}
console.log(JSON.stringify(out,null,1));
await b.close();
