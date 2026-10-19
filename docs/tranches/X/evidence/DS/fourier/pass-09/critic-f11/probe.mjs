import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT=process.argv[2], BASE="http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal","--ignore-gpu-blocklist"] });
const res={};
for (const theme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, colorScheme: theme });
  await ctx.addInitScript((t)=>{try{localStorage.setItem("vueuse-color-scheme",t);localStorage.setItem("theme",t);}catch{}}, theme);
  const p = await ctx.newPage();
  await p.goto(BASE+"/paper",{waitUntil:"networkidle"}); await p.waitForTimeout(2500);
  res[`paper-${theme}`]=await p.evaluate(()=>{const el=[...document.querySelectorAll("article *")].find(e=>e.children.length===0&&/Represent a function/.test(e.textContent));
    const chain=[];let e=el;for(let i=0;i<6&&e;i++){chain.push(e.tagName+"."+[...e.classList].join(".")+" ls="+getComputedStyle(e).listStyleType+" disp="+getComputedStyle(e).display);e=e.parentElement;}return chain;});
  await p.goto(BASE+"/equation",{waitUntil:"networkidle"}); await p.waitForTimeout(5000);
  res[`eq-${theme}`]=await p.evaluate(()=>{const out=[];for(const lab of ["info","copy","Copy","Info","About"]){const bt=document.querySelector(`button[aria-label*="${lab}" i]`);if(bt){const cs=getComputedStyle(bt);out.push({lab:bt.getAttribute("aria-label"),cls:bt.className,parent:bt.parentElement.className,shadow:cs.boxShadow.slice(0,200),bf:cs.backdropFilter,r:bt.getBoundingClientRect().toJSON()});}}
    const rail=document.querySelector(".progress-rail");const rs=rail&&getComputedStyle(rail);
    return {btns:out,rail:rail&&{cls:rail.className,anim:rs.animationName,shadow:rs.boxShadow,h:rail.getBoundingClientRect().height,bg:rs.backgroundImage.slice(0,200)}};});
  await p.screenshot({path:`${OUT}/eq-top-${theme}-1440.png`,clip:{x:860,y:90,width:130,height:60}});
  const c=await p.locator("canvas").first().boundingBox();
  await p.mouse.move(c.x+c.width*0.4,c.y+c.height*0.6); await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/eq-hover-${theme}-1440.png`});
  await p.goto(BASE+"/v/plush-evening-olive-squid",{waitUntil:"networkidle"}); await p.waitForTimeout(4000);
  res[`v-${theme}`]=await p.evaluate(()=>{const tb=[...document.querySelectorAll("button")].filter(b=>b.getBoundingClientRect().top<160&&b.getBoundingClientRect().left>850&&b.getBoundingClientRect().left<990).map(b=>({lab:b.getAttribute("aria-label"),cls:b.className,parent:b.parentElement.className}));
    const t=[...document.querySelectorAll("*")].find(e=>e.children.length===0&&e.textContent.trim()==="×"&&e.getBoundingClientRect().top>800);const n=t&&t.getBoundingClientRect();
    return {tb, times:t&&{cls:t.className,parent:t.parentElement.className,r:n.toJSON()}};});
  await ctx.close();
}
writeFileSync(`${OUT}/probe.json`,JSON.stringify(res,null,1)); console.log(JSON.stringify(res,null,1));
await b.close();
