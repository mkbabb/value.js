import { webkit } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const b = await webkit.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"});
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
await page.waitForTimeout(3000);
const set = (result,phase)=>page.evaluate(({result,phase})=>{
  let i=(document.querySelector(".dashed-well")||document.body).__vueParentComponent;
  while(i){const ss=i.setupState; if(ss&&typeof ss.startMix==="function"&&"animationPhase" in ss){ss.mixResult=result;ss.animationPhase=phase;return true;} i=i.parent;}
  return false;},{result,phase});
const m=(tag)=>page.evaluate((tag)=>{
  const p=document.querySelector(".mix-plate");
  const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return{w:+b.width.toFixed(1),h:+b.height.toFixed(1),y:+b.y.toFixed(1)};};
  return {tag,rect:r(p),cls:p?.className,op:p?getComputedStyle(p).opacity:null,
    txt:p?p.innerText.replace(/\n+/g,"|"):null,
    dots:p?[...p.querySelectorAll(".watercolor-swatch")].map(d=>({r:r(d),v:d.getAttribute("data-variant"),t:d.getAttribute("title")})):null,
    strip:(()=>{const s=p?[...p.querySelectorAll("div")].find(d=>d.getAttribute("role")==="presentation"):null;return s?{r:r(s),bg:getComputedStyle(s).backgroundImage.slice(0,220)}:null;})(),
    inter:p?p.querySelectorAll("button").length:null,
    html:p?p.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,"<svg/>").replace(/style="[^"]*"/g,'style="…"').slice(0,900):null};
},tag);
const cols=[{css:"oklch(0.72 0.19 25)",position:0},{css:"oklch(0.78 0.16 80)",position:1},{css:"oklch(0.82 0.14 140)",position:2},{css:"oklch(0.62 0.17 250)",position:3},{css:"oklch(0.55 0.20 310)",position:4}];
const out={};
await set({type:"palette",colors:cols},"mixing"); await page.waitForTimeout(70); out.palGhost=await m("palette-GHOST");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-palGHOST.png`}).catch(()=>{});
await set({type:"color",css:"oklch(0.635 0.068 333)"},"mixing"); await page.waitForTimeout(70); out.colGhost=await m("color-GHOST");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-colGHOST.png`}).catch(()=>{});
await set({type:"palette",colors:[]},"done"); await page.waitForTimeout(400); out.palEmpty=await m("palette-EMPTY");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-palEMPTY.png`}).catch(()=>{});
await set({type:"color"},"done"); await page.waitForTimeout(400); out.colNoCss=await m("color-NOCSS");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-colNOCSS.png`}).catch(()=>{});
await set({type:"color",css:"oklch(0.635 0.068 333)"},"done"); await page.waitForTimeout(500); out.colSettled=await m("color-SETTLED");
console.log(JSON.stringify(out,null,1));
await b.close();
