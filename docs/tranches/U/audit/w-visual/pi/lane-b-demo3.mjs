import { chromium } from "@playwright/test";
const URL="http://127.0.0.1:8592/#/?space=oklch&color="+encodeURIComponent("oklch(0.55 0.15 30)");
const b=await chromium.launch({headless:true,args:["--use-gl=angle","--use-angle=swiftshader"]});
const o={};
for(const scheme of ["light","dark"]){
  const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:scheme});
  const p=await ctx.newPage();
  await p.addInitScript(s=>{try{localStorage.setItem("vueuse-color-scheme",s);}catch{}},scheme);
  await p.goto(URL,{waitUntil:"networkidle"}); await p.waitForTimeout(1400);
  await p.evaluate(s=>{document.documentElement.classList.toggle("dark",s==="dark");document.documentElement.style.colorScheme=s;},scheme);
  await p.waitForTimeout(300);
  o[scheme]=await p.evaluate(()=>{
    const tools=document.querySelector(".dock-tools-btn");
    const layer=tools?.closest(".dock-layer");
    const R=e=>{if(!e)return null;const b=e.getBoundingClientRect();return{l:+b.left.toFixed(1),r:+b.right.toFixed(1),w:+b.width.toFixed(1)};};
    // rightmost dock control to the right of tools (Login / @mbabb)
    const btns=[...document.querySelectorAll(".dock-band button")];
    const tr=tools.getBoundingClientRect();
    const rightOf=btns.filter(x=>x.getBoundingClientRect().left>tr.right-1).map(x=>({t:x.textContent.trim().slice(0,10),l:+x.getBoundingClientRect().left.toFixed(0)}));
    const leftOf=btns.filter(x=>x.getBoundingClientRect().right<tr.left+1).map(x=>({t:x.textContent.trim().slice(0,10),r:+x.getBoundingClientRect().right.toFixed(0)}));
    const cs=layer?getComputedStyle(layer):null;
    return { toolsRect:R(tools), activeLayerRect:R(layer), layerCls:(layer?.className||"").toString().slice(0,60),
      layerOverflowX: cs?.overflowX, layerMask: cs?getComputedStyle(layer).maskImage.slice(0,30):null,
      controlsRightOfTools:rightOf, controlsLeftOfTools:leftOf,
      // ring envelope (2px ring + 8px glow ~10px) vs active-layer content box
      ringL:+(tr.left-10).toFixed(1), ringR:+(tr.right+10).toFixed(1) };
  });
}
await b.close();
console.log(JSON.stringify(o,null,1));
