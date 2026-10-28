import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT=process.argv[2]; const b = await chromium.launch({ channel: "chrome", headless: true });
const res={};
try {
 for (const [w,h] of [[1440,900],[390,844]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:2, colorScheme:"light", ...(w<1024?{isMobile:true,hasTouch:true}:{}) });
  try {
   const p = await ctx.newPage(); await p.goto("http://localhost:3100/paper",{waitUntil:"domcontentloaded",timeout:90000});
   await p.waitForTimeout(5000);
   for (const f of [0.1,0.2,0.25,0.3]) { await p.evaluate(f=>{const e=document.querySelector(".paper-scroll"); e.scrollTop=(e.scrollHeight-e.clientHeight)*f;},f); await p.waitForTimeout(900); }
   for (let i=0;i<12;i++){ const ok=await p.evaluate(()=>{const t=[...document.querySelectorAll(".paper-article .theorem-block")].find(x=>/Hermite Orthogonality/.test(x.textContent)); if(t){t.scrollIntoView({block:"start"}); document.querySelector(".paper-scroll").scrollTop-=120; return true;} return false;}); if(ok)break; await p.evaluate(()=>{document.querySelector(".paper-scroll").scrollTop+=1500}); await p.waitForTimeout(800);}
   await p.waitForTimeout(2500);
   res[w]=await p.evaluate(()=>{
     const R=v=>Math.round(v*10)/10; const art=document.querySelector(".paper-article .section-body")||document.querySelector(".paper-article");
     const nums=[...document.querySelectorAll(".paper-article .math-block__number")].filter(n=>{const r=n.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight;}).map(n=>{const r=n.getBoundingClientRect(); const inBlk=!!n.closest(".theorem-block,.paper-proof-block"); return {t:n.textContent.trim(), right:R(r.right), left:R(r.left), inBlock:inBlk};});
     const disp=[...document.querySelectorAll(".paper-article .katex-display")].filter(n=>{const r=n.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight;}).map(d=>{const k=d.querySelector(".katex-html").getBoundingClientRect(); const r=d.getBoundingClientRect(); return {ctx:d.closest(".theorem-block")?"theorem":d.closest(".paper-proof-block")?"proof":"prose", boxLeft:R(r.left), boxRight:R(r.right), inkLeft:R(k.left), sw:d.scrollWidth, cw:d.clientWidth};});
     const ps=[...document.querySelectorAll(".paper-article .section-body > p")].filter(n=>{const r=n.getBoundingClientRect(); return r.bottom>0&&r.top<innerHeight;}).map(n=>R(n.getBoundingClientRect().right));
     const nav=document.querySelector(".sidebar-nav"); let navInfo=null;
     if(nav&&nav.offsetParent){ const head=nav.querySelector(".sidebar-head").getBoundingClientRect(); const rows=[...nav.querySelectorAll("a,button")].filter(a=>{const r=a.getBoundingClientRect(); return r.top<head.bottom&&r.bottom>head.bottom;}).map(a=>({t:a.textContent.trim().slice(0,30),top:R(a.getBoundingClientRect().top),bottom:R(a.getBoundingClientRect().bottom)}));
       const hs=getComputedStyle(nav.querySelector(".sidebar-head")); navInfo={scrollTop:nav.scrollTop, headBottom:R(head.bottom), cutRows:rows, headBorder:hs.borderBottom, headShadow:hs.boxShadow, mask:getComputedStyle(nav).maskImage};}
     return {nums,disp,proseRight:ps,navInfo};
   });
   await p.screenshot({path:`${OUT}/f14c-light-${w}.png`});
  } finally { await ctx.close(); }
 }
} finally { await b.close(); }
console.log(JSON.stringify(res,null,1));
