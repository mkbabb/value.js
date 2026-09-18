import { chromium } from "playwright";
const OUT = "docs/tranches/T/audit/pi/u-gestalt/frames";
const browser = await chromium.launch({ headless: true });
for (const scheme of ["light","dark"]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, colorScheme:scheme, deviceScaleFactor:2 });
  await ctx.addInitScript((s)=>{try{localStorage.setItem("vueuse-color-scheme",s)}catch(_){}}, scheme);
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/generate",{waitUntil:"load"});
  await page.waitForTimeout(1800);
  // locate the two top-level panes by their large rounded card
  const box = await page.evaluate(()=>{
    const all=[...document.querySelectorAll("*")].map(e=>({e,r:e.getBoundingClientRect(),br:parseFloat(getComputedStyle(e).borderTopLeftRadius)||0}))
      .filter(o=>o.r.width>300&&o.r.width<760&&o.r.height>350&&o.r.y>60&&o.r.y<300&&o.br>8);
    all.sort((a,b)=>a.r.x-b.r.x);
    const c=all[0]; if(!c) return null;
    return {x:c.r.x,y:c.r.y,w:c.r.width,radius:c.br,tag:c.e.className.slice(0,40)};
  });
  console.log(scheme, JSON.stringify(box));
  if(box){
    await page.screenshot({path:`${OUT}/cardtl-${scheme}.png`, clip:{x:Math.max(0,box.x-6),y:Math.max(0,box.y-6),width:200,height:130}});
    await page.screenshot({path:`${OUT}/cardtr-${scheme}.png`, clip:{x:box.x+box.w-194,y:Math.max(0,box.y-6),width:200,height:130}});
  }
  await ctx.close();
}
await browser.close();
