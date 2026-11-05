// value DESIGN pass: served-app frames at 390/430/844x390/1440/1800, light+dark.
// One headless Chromium, one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = `${process.env.HOME}/.dev-logs/x-design/frames`;
const VPS = [[390,844],[430,932],[844,390],[1440,900],[1800,1000]];
const ROUTES = [["picker","/#/?space=oklch&color=efflorescence"],["palettes","/#/palettes"],["about","/#/about"]];
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const [w,h] of VPS) for (const scheme of ["light","dark"]) for (const [name,path] of ROUTES) {
    if (name !== "picker" && !(w===390 || w===1440)) continue;
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, colorScheme:scheme });
    try {
      await ctx.addInitScript((s)=>{ try{localStorage.setItem("vueuse-color-scheme",s)}catch{} }, scheme);
      const page = await ctx.newPage(); const errs=[];
      page.on("pageerror",e=>errs.push(String(e).slice(0,120)));
      await page.goto("https://color.babb.dev"+path,{waitUntil:"load",timeout:60000});
      await page.waitForTimeout(4000);
      const m = await page.evaluate(()=>{
        const q=(s)=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect(); return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)];};
        const dock=document.querySelector(".dock-run")?.closest("[class*=dock]")||document.querySelector("nav");
        const dr=dock?.getBoundingClientRect();
        return { vw:innerWidth, sw:document.documentElement.scrollWidth,
          dock: dr?[Math.round(dr.x),Math.round(dr.y),Math.round(dr.width),Math.round(dr.height)]:null,
          dockCentreOff: dr? Math.round((dr.x+dr.width/2)-innerWidth/2):null,
          spectrum:q("canvas")};
      });
      const f=`${OUT}/${name}-${w}x${h}-${scheme}.png`;
      await page.screenshot({path:f});
      rows.push({name,w,h,scheme,...m,errs:errs.length});
    } catch(e){ rows.push({name,w,h,scheme,err:String(e).slice(0,160)}); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(`${OUT}/rows.json`, JSON.stringify(rows,null,1));
console.log(rows.map(r=>JSON.stringify(r)).join("\n"));
