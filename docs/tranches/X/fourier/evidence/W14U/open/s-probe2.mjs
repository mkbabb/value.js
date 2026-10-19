import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const fx = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:3100/w/', { waitUntil:'networkidle' });
await p.setInputFiles('[data-testid=image-file-input]', fx);
await p.waitForURL(/\/w\/.+/, {timeout:30000}); await p.waitForTimeout(4000);
const url=p.url(); console.log(url);
for (const w of [1440,1024,390]) {
  await p.setViewportSize({width:w,height:w==390?844:900}); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => { const vw=innerWidth; const out=[];
    for (const el of document.querySelectorAll('.viz-configurator *')) { const q=el.getBoundingClientRect(); const cs=getComputedStyle(el);
      if(q.width>180&&q.height>300&&q.width<700&&cs.position!=='absolute'){ out.push({cls:el.className.toString().slice(0,50),x:Math.round(q.x),r:Math.round(vw-q.right),y:Math.round(q.y),w:Math.round(q.width),rad:cs.borderRadius,sh:cs.boxShadow!=='none'}); } }
    return out.slice(0,3); });
  console.log(w, JSON.stringify(r));
  await p.screenshot({path:`${process.argv[3]}/s-before-${w}.png`});
}
await b.close();
