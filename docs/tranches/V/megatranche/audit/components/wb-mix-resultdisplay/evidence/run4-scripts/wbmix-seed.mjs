import { webkit } from "playwright";
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
await page.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
await page.waitForTimeout(3200);
const set=(r,p)=>page.evaluate(({r,p})=>{let i=(document.querySelector(".dashed-well")||document.body).__vueParentComponent;
  while(i){const ss=i.setupState;if(ss&&typeof ss.startMix==="function"&&"animationPhase" in ss){ss.mixResult=r;ss.animationPhase=p;return true;}i=i.parent;}return false;},{r,p});
const snap=(t)=>page.evaluate((t)=>{const pl=document.querySelector(".mix-plate");
  return {t, mixTargets:document.querySelectorAll("[data-mix-target]").length,
    mixSources:document.querySelectorAll("[data-mix-source]").length,
    dots:pl?[...pl.querySelectorAll(".watercolor-swatch")].map(d=>({v:d.getAttribute("data-variant"),title:d.getAttribute("title"),r:d.style.borderRadius,mt:d.hasAttribute("data-mix-target")})):null};},t);
await set({type:"color",css:"oklch(0.635 0.068 333)"},"mixing"); await page.waitForTimeout(80);
console.log(JSON.stringify(await snap("GHOST"),null,1));
await page.waitForTimeout(2000);
console.log(JSON.stringify(await snap("SETTLED"),null,1));
await b.close();
