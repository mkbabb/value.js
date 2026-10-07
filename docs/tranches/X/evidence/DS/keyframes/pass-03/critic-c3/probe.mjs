import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.cwd();
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
const box = (s) => `(()=>{const e=document.querySelector(${JSON.stringify(s)});if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]})()`;
for (const scheme of ["light"]) for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, colorScheme: scheme });
  const p = await ctx.newPage();
  for (const r of ["square","spring","easing","sequence","cube"]) {
    await p.goto(`http://localhost:5173/#/${r}`, {waitUntil:"load"}); await p.waitForTimeout(4500);
    res[`${r}-${w}`] = await p.evaluate(() => {
      const bx = (e)=>{ if(!e) return null; const r=e.getBoundingClientRect(); return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]};
      const plate = document.querySelector(".square-stage,.spring-target,.easing-target,.seq-target");
      const docks = [...document.querySelectorAll(".glass-dock")].map(bx);
      const out = { plate: bx(plate), docks, sheet: bx(document.querySelector(".controls-drawer-content")) };
      const pos = [...document.querySelectorAll("*")].find(e=>e.children.length===0 && /^0\.000$/.test(e.textContent.trim()));
      if (pos) { const cs=getComputedStyle(pos); out.position={font:cs.fontFamily.slice(0,40),size:cs.fontSize,weight:cs.fontWeight,cls:pos.className}; }
      const vel = [...document.querySelectorAll("*")].find(e=>e.children.length===0 && /velocity/.test(e.textContent));
      if (vel) { const cs=getComputedStyle(vel); out.velocity={font:cs.fontFamily.slice(0,40),size:cs.fontSize,cls:vel.className}; }
      const title = plate?.querySelector("h2,h1"); if (title) { const cs=getComputedStyle(title); out.title={font:cs.fontFamily.slice(0,30),size:cs.fontSize}; }
      const rail = document.querySelector(".spring-rail, .progress-rail"); out.rail = bx(rail);
      out.balls = [...document.querySelectorAll(".spring-target .progress-ball, .spring-target .spring-ball, .spring-target [class*=ball]")].map(e=>[e.className.toString().slice(0,60), bx(e), getComputedStyle(e).opacity, getComputedStyle(e).visibility]);
      const leg = [...document.querySelectorAll("*")].find(e=>e.children.length===0 && /overshoot · set by/.test(e.textContent));
      if (leg) { const cs=getComputedStyle(leg); let n=leg, bg="rgba(0, 0, 0, 0)"; out.legend={color:cs.color, opacity:cs.opacity, cls:leg.className, parentOpacity:getComputedStyle(leg.parentElement).opacity}; }
      return out;
    });
    if (r==="spring" && w===1440) await p.screenshot({path:`${OUT}/spring-rail.png`, clip:{x:560,y:240,width:800,height:100}});
  }
  await ctx.close();
}
console.log(JSON.stringify(res,null,1));
await b.close();
