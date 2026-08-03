import { webkit } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const cols=[{css:"oklch(0.72 0.19 25)",position:0},{css:"oklch(0.78 0.16 80)",position:1},{css:"oklch(0.82 0.14 140)",position:2},{css:"oklch(0.62 0.17 250)",position:3},{css:"oklch(0.55 0.20 310)",position:4}];
const many=Array.from({length:12},(_,i)=>({css:`oklch(0.7 0.16 ${i*30})`,position:i}));

async function cap(name, o){
  const b=await webkit.launch();
  const ctx=await b.newContext({viewport:o.vp??{width:1440,height:900},deviceScaleFactor:2,colorScheme:o.cs??"light",reducedMotion:o.rm,forcedColors:o.fc});
  const page=await ctx.newPage();
  await page.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
  await page.waitForTimeout(3000);
  if(o.rtl) await page.evaluate(()=>document.documentElement.setAttribute("dir","rtl"));
  if(o.zoom) await page.evaluate((z)=>{document.documentElement.style.zoom=z;},o.zoom);
  const set=(result,phase)=>page.evaluate(({result,phase})=>{
    let i=(document.querySelector(".dashed-well")||document.body).__vueParentComponent;
    while(i){const ss=i.setupState; if(ss&&typeof ss.startMix==="function"&&"animationPhase" in ss){ss.mixResult=result;ss.animationPhase=phase;return true;} i=i.parent;}
    return false;},{result,phase});
  const h=()=>page.evaluate(()=>{const p=document.querySelector(".mix-plate");if(!p)return null;const b=p.getBoundingClientRect();return {h:+b.height.toFixed(1),w:+b.width.toFixed(1),cls:p.className.includes("ghost")};});
  const res={};
  // ghost timing (clean)
  await set({type:"color",css:"oklch(0.635 0.068 333)"},"mixing");
  await page.waitForTimeout(90); res.ghostH=await h();
  await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${name}-GHOST.png`}).catch(()=>{});
  await page.waitForTimeout(1500); res.afterCanvas=await h();
  await set({type:"color",css:"oklch(0.635 0.068 333)"},"done");
  await page.waitForTimeout(700); res.settledH=await h();
  await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${name}-COLOR.png`}).catch(()=>{});
  await set({type:"palette",colors:cols},"done"); await page.waitForTimeout(800); res.palH=await h();
  await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${name}-PAL5.png`}).catch(()=>{});
  await set({type:"palette",colors:many},"done"); await page.waitForTimeout(800); res.pal12H=await h();
  await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${name}-PAL12.png`}).catch(()=>{});
  res.overflowX=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  // contrast probe of the label
  res.contrast=await page.evaluate(()=>{
    const p=document.querySelector(".mix-plate"); if(!p) return null;
    const lbl=p.querySelector("span");
    const px=(s)=>{const m=s.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null;};
    const lum=(rgb)=>{const [r,g,bb]=rgb.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*bb;};
    const fg=px(getComputedStyle(lbl).color), bg=px(getComputedStyle(p).backgroundColor);
    if(!fg||!bg) return {fg:getComputedStyle(lbl).color,bg:getComputedStyle(p).backgroundColor};
    const L1=lum(fg),L2=lum(bg);
    return {fgRaw:getComputedStyle(lbl).color,bgRaw:getComputedStyle(p).backgroundColor,ratio:+(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))).toFixed(2),fontPx:getComputedStyle(lbl).fontSize};
  });
  await b.close();
  return {name,...res};
}
const jobs=[["light",{}],["dark",{cs:"dark"}],["mobile",{vp:{width:390,height:844}}],["rtl",{rtl:true}],["forced",{fc:"active"}],["zoom200",{zoom:"2"}]];
for(const [n,o] of jobs){ try{ console.log(JSON.stringify(await cap(n,o))); }catch(e){ console.log(n,"ERR",e.message.split("\n")[0]); } }
