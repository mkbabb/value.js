import { webkit } from "playwright";
const b=await webkit.launch();
// (A) does the WebGL rAF loop respect prefers-reduced-motion? getAnimations() cannot see rAF.
for (const rm of ["reduce","no-preference"]){
  const ctx=await b.newContext({viewport:{width:1440,height:900},reducedMotion:rm});
  const p=await ctx.newPage();
  await p.addInitScript(()=>{ window.__raf=0; const o=requestAnimationFrame;
    window.requestAnimationFrame=function(cb){ window.__raf++; return o.call(window,cb); }; });
  await p.goto("http://localhost:9000/#/blob",{waitUntil:"networkidle",timeout:45000});
  await p.waitForTimeout(3000);
  const a=await p.evaluate(()=>window.__raf); await p.waitForTimeout(3000);
  const c=await p.evaluate(()=>({raf:window.__raf, prm:matchMedia("(prefers-reduced-motion: reduce)").matches}));
  console.log(`blob rm=${rm.padEnd(13)} rafCallbacks_first3s=${a} next3s=${c.raf-a} prmMatches=${c.prm}`);
  await ctx.close();
}
// (B) is the zoom-200 text drop actually ZOOM, or just the 720px responsive breakpoint?
for (const [label,vw,scale] of [["1440-noZoom",1440,1],["720-noZoom",720,1],["1440-at-200%",720,2],["390-mobile",390,1]]){
  const ctx=await b.newContext({viewport:{width:vw,height:Math.round(900/ (scale>1?2:1))||450},deviceScaleFactor:scale});
  const p=await ctx.newPage();
  await p.goto("http://localhost:9000/#/",{waitUntil:"networkidle",timeout:45000});
  await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>({text:(document.body.innerText||"").replace(/\s+/g," ").trim().length,
    panes:document.querySelectorAll('[class*="pane"],[data-pane]').length,
    overflowX:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
  console.log(`picker ${label.padEnd(13)} text=${String(r.text).padStart(4)} panes=${r.panes} overflowX=${r.overflowX}`);
  await ctx.close();
}
await b.close();
