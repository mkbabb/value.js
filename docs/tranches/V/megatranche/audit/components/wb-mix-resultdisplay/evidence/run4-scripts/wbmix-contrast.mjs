import { webkit } from "playwright";
async function go(scheme){
const b=await webkit.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:scheme});
const page=await ctx.newPage();
await page.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
await page.waitForTimeout(3200);
await page.evaluate(()=>{let i=(document.querySelector(".dashed-well")||document.body).__vueParentComponent;
  while(i){const ss=i.setupState;if(ss&&typeof ss.startMix==="function"&&"animationPhase" in ss){ss.mixResult={type:"color",css:"oklch(0.635 0.068 333)"};ss.animationPhase="done";return;}i=i.parent;}});
await page.waitForTimeout(600);
const out=await page.evaluate(({scheme})=>{
  const c=document.createElement("canvas"); c.width=c.height=1; const g=c.getContext("2d",{willReadFrequently:true});
  const toRGB=(s)=>{g.clearRect(0,0,1,1); g.fillStyle="#000"; g.fillStyle=s; g.fillRect(0,0,1,1); const d=g.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255];};
  const lum=(rgb)=>{const [r,gg,bb]=rgb.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*gg+0.0722*bb;};
  const ratio=(a,b)=>{const L1=lum(a),L2=lum(b);return +(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))).toFixed(2);};
  const p=document.querySelector(".mix-plate");
  const lbl=p.querySelector("span");
  const val=[...p.querySelectorAll("span")].find(x=>/okl/.test(x.textContent));
  const bg=toRGB(getComputedStyle(p).backgroundColor);
  const fgL=toRGB(getComputedStyle(lbl).color);
  const fgV=toRGB(getComputedStyle(val).color);
  const comp=(f,a)=>f.slice(0,3).map((v,i)=>a*v+(1-a)*bg[i]);
  // pane void with no result
  return {scheme, bgRGB:bg.slice(0,3), labelRGB:fgL.slice(0,3), valueRGB:fgV.slice(0,3),
    labelPx:getComputedStyle(lbl).fontSize, labelWeight:getComputedStyle(lbl).fontWeight,
    labelContrast:ratio(fgL,bg), valueContrast:ratio(fgV,bg),
    labelContrastAtGhost055:ratio(comp(fgL,0.55),bg),
    valueContrastAtGhost055:ratio(comp(fgV,0.55),bg)};
},{scheme});
// void measurement (no result)
await page.evaluate(()=>{let i=(document.querySelector(".dashed-well")||document.body).__vueParentComponent;
  while(i){const ss=i.setupState;if(ss&&typeof ss.startMix==="function"){ss.mixResult=null;ss.animationPhase="idle";return;}i=i.parent;}});
await page.waitForTimeout(600);
out.void=await page.evaluate(()=>{
  const pane=[...document.querySelectorAll("main *")].find(e=>String(e.className||"").includes("pane-scroll-fade"));
  const col=pane?.querySelector(".flex.flex-col.gap-4");
  const kids=col?[...col.children]:[];
  const last=kids[kids.length-1];
  const pr=pane.getBoundingClientRect(), lr=last.getBoundingClientRect();
  return {paneH:+pr.height.toFixed(1), lastChild:last.className.slice(0,60), lastBottom:+lr.bottom.toFixed(1),
    paneBottom:+pr.bottom.toFixed(1), voidPx:+(pr.bottom-lr.bottom).toFixed(1),
    voidPct:+(((pr.bottom-lr.bottom)/pr.height)*100).toFixed(1)};
});
await b.close(); return out;
}
console.log(JSON.stringify(await go("light"),null,1));
console.log(JSON.stringify(await go("dark"),null,1));
