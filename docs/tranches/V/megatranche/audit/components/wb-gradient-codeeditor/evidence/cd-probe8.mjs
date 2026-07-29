import { webkit } from "playwright";
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"});
const p=await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"load"});
await p.waitForTimeout(3200);
console.log(JSON.stringify(await p.evaluate(()=>{
  const ed=document.querySelector('[role="textbox"][aria-label="Gradient CSS"]');
  const code=document.querySelector('.readout-rail code');
  const f=(el)=>{const cs=getComputedStyle(el);const pc=getComputedStyle(el.parentElement);
    return {fs:cs.fontSize,parentFs:pc.fontSize,lh:cs.lineHeight,ff:cs.fontFamily.slice(0,40),cls:el.className.slice(0,120)};};
  const probe=document.createElement('div'); probe.className='text-mono-small'; document.body.appendChild(probe);
  const base=getComputedStyle(probe); const out={baseTextMonoSmall:base.fontSize, baseFF:base.fontFamily.slice(0,50)};
  document.body.removeChild(probe);
  out.editor=f(ed); out.railCode=f(code);
  out.rootMonoSmallVar=getComputedStyle(document.documentElement).getPropertyValue('--type-mono-small').trim();
  // verdict font redundancy: force an error first is not needed, just compute utility families
  const p1=document.createElement('p'); p1.className='text-mono-small'; document.body.appendChild(p1);
  const p2=document.createElement('p'); p2.className='fira-code text-mono-small'; document.body.appendChild(p2);
  out.firaCodeRedundant = getComputedStyle(p1).fontFamily === getComputedStyle(p2).fontFamily;
  out.monoSmallFamily = getComputedStyle(p1).fontFamily.slice(0,60);
  out.firaFamily = getComputedStyle(p2).fontFamily.slice(0,60);
  document.body.removeChild(p1); document.body.removeChild(p2);
  return out;
}),null,1));
await b.close();
