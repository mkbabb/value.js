// keyframes DESIGN pass: served-app frames at 390/430/844x390/1440/1800, light+dark.
// One headless Chromium, one context per cell, every context and the browser closed in finally.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = `${process.env.HOME}/.dev-logs/x-design/kf/frames`;
const VPS = [[390,844],[430,932],[844,390],[1440,900],[1800,1000]];
const SCENES = ["home","cube","easing","sequence","spring"];
const rows = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const [w,h] of VPS) for (const scheme of ["light","dark"]) for (const scene of SCENES) {
    // home+cube everywhere; easing/sequence/spring at the phone + 1440 cells only
    if (!["home","cube"].includes(scene) && !(w===390 || w===1440 || (w===844 && scene==="spring"))) continue;
    if (scheme==="light" && ["sequence","spring"].includes(scene)) continue;
    const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1, colorScheme:scheme });
    try {
      const page = await ctx.newPage(); const errs=[];
      page.on("pageerror",e=>errs.push(String(e).slice(0,140)));
      await page.goto("https://keyframes.babb.dev/#/"+(scene==="home"?"":scene),{waitUntil:"load",timeout:60000});
      await page.waitForTimeout(4500);
      const m = await page.evaluate(()=>{
        const R=(e)=>{ if(!e) return null; const r=e.getBoundingClientRect(); return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]; };
        const groups=[...document.querySelectorAll(".dock-vt-group")].map(R);
        const sheet=document.querySelector(".controls-drawer-content");
        const stage=document.querySelector(".stage-glide");
        const titles=[...document.querySelectorAll(".configurator-section-label")].filter(e=>e.offsetParent && e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.trim().slice(0,30));
        return { vw:innerWidth, sw:document.documentElement.scrollWidth,
          docks: groups, dockCentreOff: groups.map(g=>g? Math.round(g[0]+g[2]/2-innerWidth/2):null),
          sheet:R(sheet), stage:R(stage), truncTitles:titles,
          tooltips: document.querySelectorAll('[role=tooltip]').length };
      });
      await page.screenshot({path:`${OUT}/${scene}-${w}x${h}-${scheme}.png`});
      rows.push({scene,w,h,scheme,...m,errs});
    } catch(e){ rows.push({scene,w,h,scheme,err:String(e).slice(0,160)}); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(`${OUT}/rows.json`, JSON.stringify(rows,null,1));
console.log(rows.map(r=>JSON.stringify(r)).join("\n"));
