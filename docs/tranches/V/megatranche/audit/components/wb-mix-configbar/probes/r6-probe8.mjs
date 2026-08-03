import { chromium } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/img";
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
await page.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
await page.waitForTimeout(2500);
const t=await page.evaluate(()=>{const t=[...document.querySelectorAll('button[role="combobox"]')].find(b=>b.getAttribute('aria-label')==='Color space');const r=t.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height};});
const clip={x:t.x-6,y:t.y-6,width:t.w+12,height:t.h+12};
await page.mouse.move(5,5); await page.waitForTimeout(300);
await page.screenshot({path:`${OUT}/t-rest.png`,clip});
await page.mouse.move(t.x+t.w/2,t.y+t.h/2); await page.waitForTimeout(600);
const th=await page.evaluate(()=>{const t=[...document.querySelectorAll('button[role="combobox"]')].find(b=>b.getAttribute('aria-label')==='Color space');const c=getComputedStyle(t);return {hover:t.matches(':hover'),bg:c.backgroundColor,bc:c.borderColor,scale:c.scale};});
await page.screenshot({path:`${OUT}/t-hover.png`,clip});
// keyboard focus walk under forced colors
await page.mouse.move(5,5);
await page.emulateMedia({forcedColors:"active"});
await page.waitForTimeout(300);
let found=null;
await page.evaluate(()=>document.body.focus());
for (let i=0;i<45;i++){
  await page.keyboard.press("Tab");
  const st=await page.evaluate(()=>{const a=document.activeElement;if(!a)return null;const lab=a.getAttribute&&a.getAttribute('aria-label');const txt=(a.textContent||'').trim().slice(0,14);
    return {tag:a.tagName,lab,txt,fv:a.matches(':focus-visible'),outline:getComputedStyle(a).outline,off:getComputedStyle(a).outlineOffset,shadow:getComputedStyle(a).boxShadow.slice(0,60)};});
  if(st && (st.lab==='Color space' || st.txt==='Mix')){ found={i,...st}; if(st.txt==='Mix') break; }
}
console.log(JSON.stringify({th,found},null,1));
await b.close();
