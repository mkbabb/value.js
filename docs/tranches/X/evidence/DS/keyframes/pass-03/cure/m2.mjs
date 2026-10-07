import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w,h] of [[1440,900],[390,844]]) {
const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/spring",{waitUntil:"load"}); await p.waitForTimeout(5000);
const r = await p.evaluate(()=>{
  const R=(e)=>{if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height),Math.round(b.bottom)]};
  const sc=document.querySelector('.stage-cell'); const c=getComputedStyle(sc);
  const v=(n)=>getComputedStyle(document.documentElement).getPropertyValue(n);
  return {cell:R(sc), pad:[c.paddingTop,c.paddingBottom], host:R(document.querySelector('.scene-host')), plate:R(document.querySelector('.spring-target')),
   docks:[...document.querySelectorAll('.glass-dock')].map(R), sheet:[...document.querySelectorAll('[data-slot=sheet-content], .sheet, .controls-pane-wrapper')].map(e=>[e.className.slice(0,50),R(e)]),
   vars:['--dock-band-reserve','--dock-icon-height','--dock-margin','--dock-bottom-anchor','--menubar-measured-h','--dock-menubar-reserve','--dock-top-band-reserve-stable'].map(n=>[n,v(n).trim().slice(0,80)])};
});
console.log(w, JSON.stringify(r));
await ctx.close();
}
await b.close();
