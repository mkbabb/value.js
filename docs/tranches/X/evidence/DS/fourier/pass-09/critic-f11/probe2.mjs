import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT=process.argv[2], BASE="http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res={};
for (const theme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme: theme });
  await ctx.addInitScript((t)=>{try{localStorage.setItem("vueuse-color-scheme",t);localStorage.setItem("theme",t);}catch{}}, theme);
  const p = await ctx.newPage();
  await p.goto(BASE+"/morph",{waitUntil:"networkidle"}); await p.waitForTimeout(2000);
  const m=p.locator(".morph-button").first(); const bb=await m.boundingBox();
  const rest=await m.evaluate(e=>({t:getComputedStyle(e).transform,bs:getComputedStyle(e).boxShadow.slice(0,160),w:e.getBoundingClientRect().width}));
  await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2); await p.waitForTimeout(600);
  const hov=await m.evaluate(e=>({t:getComputedStyle(e).transform,w:e.getBoundingClientRect().width,bc:getComputedStyle(e).borderColor}));
  await p.screenshot({path:`${OUT}/morph-platehover-${theme}-1440.png`,clip:{x:140,y:170,width:460,height:470}});
  res[`morph-${theme}`]={rest,hov};
  await p.goto(BASE+"/equation",{waitUntil:"networkidle"}); await p.waitForTimeout(3000);
  res[`eq-${theme}`]=await p.evaluate(()=>[...document.querySelectorAll("button.button")].filter(b=>b.offsetParent).map(b=>({lab:(b.getAttribute("aria-label")||b.textContent.trim()).slice(0,40),primary:/primary/.test(b.className)||b.dataset.emphasis, cls:b.className.slice(0,120), bg:getComputedStyle(b).backgroundColor})).filter(x=>/specular|deep|primary/.test(x.cls)));
  await ctx.close();
}
writeFileSync(`${OUT}/probe2.json`,JSON.stringify(res,null,1)); console.log(JSON.stringify(res,null,1));
await b.close();
