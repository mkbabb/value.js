import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [w,h] of [[1440,900],[390,844]]) for (const r of ["square","easing","spring","sequence","cube"]) {
const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme:"light" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/"+r,{waitUntil:"load"}); await p.waitForTimeout(3500);
const o = await p.evaluate(()=>{
  const R=(e)=>e?[Math.round(e.getBoundingClientRect().top),Math.round(e.getBoundingClientRect().bottom)]:null;
  const docks=[...document.querySelectorAll('.glass-dock')].map(R);
  return {plate:R(document.querySelector('.square-stage,.easing-target,.spring-target,.sequence-target,.scene-host')), bottomDock:docks[docks.length-1], sheet:R(document.querySelector('[data-slot=sheet-content]'))};
});
console.log(w, r, JSON.stringify(o));
await ctx.close();
}
await b.close();
