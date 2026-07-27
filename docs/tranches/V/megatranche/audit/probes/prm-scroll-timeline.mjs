import { webkit, chromium } from "playwright";
for (const [name,eng] of [["webkit",webkit],["chromium",chromium]]){
  const b=await eng.launch();
  for (const rm of ["reduce","no-preference"]){
    const ctx=await b.newContext({viewport:{width:1440,height:900},reducedMotion:rm});
    const p=await ctx.newPage();
    await p.goto("http://localhost:9000/#/about",{waitUntil:"networkidle",timeout:45000});
    await p.waitForTimeout(2000);
    const read=()=>p.evaluate(()=>{
      const t=document.querySelector(".pane-header-title");
      const v=document.querySelector(".pane-header");
      const sc=document.querySelector('[class*="pane"] [class*="scroll"], .pane-header')?.closest("*");
      return { titleTransform: t?getComputedStyle(t).transform:"none",
               veilOpacity: v?getComputedStyle(v,"::before").opacity:"n/a",
               supports: CSS.supports("animation-timeline","scroll()") };
    });
    const before=await read();
    // scroll the pane's scroll container past the 120px title-shrink range
    await p.evaluate(()=>{ const els=[...document.querySelectorAll("*")].filter(e=>e.scrollHeight>e.clientHeight+150&&getComputedStyle(e).overflowY!=="visible");
      els.slice(0,3).forEach(e=>e.scrollTop=200); window.scrollTo(0,200); });
    await p.waitForTimeout(900);
    const after=await read();
    console.log(`${name} rm=${rm.padEnd(13)} supports=${before.supports} titleTransform ${before.titleTransform} -> ${after.titleTransform} | veil ${before.veilOpacity} -> ${after.veilOpacity}`);
    await ctx.close();
  }
  await b.close();
}
