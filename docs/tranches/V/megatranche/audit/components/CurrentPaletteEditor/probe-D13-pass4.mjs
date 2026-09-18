import { chromium } from "playwright";
const lab=(i,n)=>`lab(${(30+55*i/n).toFixed(1)}% ${(-70+150*i/n).toFixed(1)} ${(80-150*i/n).toFixed(1)})`;
const cols=Array.from({length:5},(_,i)=>lab(i,5));
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:1200},deviceScaleFactor:2});
const p=await ctx.newPage();
await p.addInitScript((s)=>{localStorage.setItem("color-picker",JSON.stringify({inputColor:s[0],savedColors:s}));
localStorage.setItem("color-palettes",JSON.stringify({version:1,palettes:[{id:"s1",slug:"same-five",name:"Same Five",colors:s.map((css,i)=>({css,position:i})),createdAt:Date.now(),isLocal:true}]}));},cols);
await p.goto("http://localhost:9000/#/palettes",{waitUntil:"load"});await p.waitForTimeout(2800);
const o=await p.evaluate(()=>{
 const mat=(e,tag)=>{if(!e)return null;const c=getComputedStyle(e),r=e.getBoundingClientRect();
  return {tag,cls:e.className.slice(0,110),w:+r.width.toFixed(1),h:+r.height.toFixed(1),
   bg:c.backgroundColor,border:`${c.borderTopWidth} ${c.borderTopStyle}`,radius:c.borderRadius,
   shadow:c.boxShadow.slice(0,160),pad:c.padding};};
 const strip=document.querySelector('[role="presentation"][aria-hidden="true"]');
 let n=strip, chain=[];
 for(let i=0;i<6&&n;i++){n=n.parentElement; if(n) chain.push(mat(n,n.tagName));}
 return {well:mat(document.querySelector(".dashed-well"),"WELL"), chain};
});
console.log(JSON.stringify(o,null,1));await b.close();
