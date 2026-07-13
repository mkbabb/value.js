// Lane B focused re-probe: u-f13-menuink (oklch-aware computed accent predicate)
// + u-f13-demo (Tools focus-ring box vs dock-layer clip box, pseudo-aware).
import { chromium } from "@playwright/test";
const PORT = 8592;
const SEED = "oklch(0.55 0.15 30)";
const URL = `http://127.0.0.1:${PORT}/#/?space=oklch&color=${encodeURIComponent(SEED)}`;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi";

const browser = await chromium.launch({ headless:true, args:["--use-gl=angle","--use-angle=swiftshader"] });
const results={};
for (const scheme of ["light","dark"]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:scheme });
  const page = await ctx.newPage();
  await page.addInitScript((s)=>{ try{localStorage.setItem("vueuse-color-scheme",s);}catch{} }, scheme);
  await page.goto(URL,{waitUntil:"networkidle"});
  await page.waitForTimeout(1400);
  await page.evaluate((s)=>{document.documentElement.classList.toggle("dark",s==="dark");document.documentElement.style.colorScheme=s;},scheme);
  await page.waitForTimeout(300);

  const r={scheme};
  // ---------- menuink: oklch/oklab-aware chroma ----------
  r.menuink = await page.evaluate(()=>{
    // parse any CSS color computed string -> {L,C} in OKLCh.
    function toOklch(str){
      if(!str) return null;
      let m=str.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/);
      if(m){let L=parseFloat(m[1]); if(m[1].includes("%"))L/=100; return {L:+L.toFixed(4),C:+parseFloat(m[2]).toFixed(4),h:+parseFloat(m[3]).toFixed(1),src:"oklch"};}
      m=str.match(/oklab\(\s*([\d.]+%?)\s+(-?[\d.]+)\s+(-?[\d.]+)/);
      if(m){let L=parseFloat(m[1]); if(m[1].includes("%"))L/=100; const a=parseFloat(m[2]),b=parseFloat(m[3]); return {L:+L.toFixed(4),C:+Math.hypot(a,b).toFixed(4),h:+((Math.atan2(b,a)*180/Math.PI+360)%360).toFixed(1),src:"oklab"};}
      m=str.match(/rgba?\(([^)]+)\)/);
      if(m){const p=m[1].split(/[,\s\/]+/).map(Number);const[R,G,B]=p;function lin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
        const lr=lin(R),lg=lin(G),lb=lin(B);const l=0.4122214708*lr+0.5363325363*lg+0.0514459929*lb,mm=0.2119034982*lr+0.6806995451*lg+0.1073969566*lb,s=0.0883024619*lr+0.2817188376*lg+0.6299787005*lb;
        const l_=Math.cbrt(l),m_=Math.cbrt(mm),s_=Math.cbrt(s);const L=0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,A=1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,Bb=0.0259040371*l_+0.7827717662*m_-0.8086757660*s_;
        return {L:+L.toFixed(4),C:+Math.hypot(A,Bb).toFixed(4),h:+((Math.atan2(Bb,A)*180/Math.PI+360)%360).toFixed(1),src:"rgb",rgb:`${R},${G},${B}`,alpha:p[3]??1};}
      return {raw:str.slice(0,40)};
    }
    const out={};
    const btns=[...document.querySelectorAll("button")];
    const login=btns.find(b=>/(^|\s)Login(\s|$)/.test(b.textContent.trim()));
    if(login){const cs=getComputedStyle(login);
      out.login={found:true, textColor:toOklch(cs.color), borderColor:toOklch(cs.borderTopColor),
        borderTopWidth:cs.borderTopWidth, opacity:cs.opacity,
        // the LucideIcon inside inherits color; sample it
        iconColor: login.querySelector("svg")?toOklch(getComputedStyle(login.querySelector("svg")).color):null };
    } else out.login={found:false};
    const tools=document.querySelector(".dock-tools-btn");
    if(tools){const label=tools.querySelector("span"),svg=tools.querySelector("svg"),cs=getComputedStyle(tools);
      out.tools={found:true, buttonBorderTopWidth:cs.borderTopWidth,
        labelColor: label?toOklch(getComputedStyle(label).color):null,
        iconColor: svg?toOklch(getComputedStyle(svg).color):null };
    } else out.tools={found:false};
    return out;
  });

  // ---------- demo: Tools focus-ring box vs dock-layer clip box ----------
  // structure + clip rects (direct selectors, not an overflow walk)
  r.demo = await page.evaluate(()=>{
    const tools=document.querySelector(".dock-tools-btn");
    if(!tools) return {found:false};
    const tb=tools.getBoundingClientRect();
    const cs=getComputedStyle(tools);
    const layerFull=document.querySelector(".dock-layer--full")||document.querySelector(".dock-layer");
    const layers=document.querySelector(".dock-layers");
    const rectOf=e=>{if(!e)return null;const b=e.getBoundingClientRect();return{l:+b.left.toFixed(1),r:+b.right.toFixed(1),w:+b.width.toFixed(1)};};
    return { found:true, tag:tools.tagName, cls:(tools.className||"").toString(),
      toolsRect:{l:+tb.left.toFixed(1),r:+tb.right.toFixed(1),w:+tb.width.toFixed(1),h:+tb.height.toFixed(1)},
      marginInline:cs.marginLeft+"/"+cs.marginRight,
      restBoxShadow:cs.boxShadow.slice(0,120),
      afterBoxShadow:getComputedStyle(tools,"::after").boxShadow.slice(0,120),
      beforeBoxShadow:getComputedStyle(tools,"::before").boxShadow.slice(0,120),
      layerFullRect:rectOf(layerFull), layerFullOverflow:layerFull?getComputedStyle(layerFull).overflowX:null,
      layerFullMask: layerFull?getComputedStyle(layerFull).maskImage.slice(0,40):null,
      layersRect:rectOf(layers), layersOverflow:layers?getComputedStyle(layers).overflowX:null };
  });

  // keyboard focus Tools: Tab from page start (no prior click), stop at .dock-tools-btn
  let kf=false, tabs=0;
  for(let i=0;i<50 && !kf;i++){ await page.keyboard.press("Tab"); tabs++;
    kf=await page.evaluate(()=>{const a=document.activeElement; return !!(a&&(a.closest?.(".dock-tools-btn"))); }); }
  r.demo.keyboardFocused=kf; r.demo.tabsToReach=tabs;
  if(kf){
    r.demo.onFocus=await page.evaluate(()=>{
      const a=document.activeElement; const el=a.closest(".dock-tools-btn")||a;
      const cs=getComputedStyle(el);
      const rb=el.getBoundingClientRect();
      // ring can be on the button, or its ::after/::before, or a producer inner. gather all shadows.
      const shadows={self:cs.boxShadow.slice(0,160), outline:`${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`.slice(0,80),
        after:getComputedStyle(el,"::after").boxShadow.slice(0,160), before:getComputedStyle(el,"::before").boxShadow.slice(0,160)};
      const layerFull=document.querySelector(".dock-layer--full")||document.querySelector(".dock-layer");
      const lb=layerFull?layerFull.getBoundingClientRect():null;
      // focus-ring outer extent estimate: 2px ring + 8px glow ~= 10px beyond box (per T-52 forensic)
      const ringPad=10;
      return { focusedRect:{l:+rb.left.toFixed(1),r:+rb.right.toFixed(1)}, shadows,
        layerFullRect: lb?{l:+lb.left.toFixed(1),r:+lb.right.toFixed(1)}:null,
        ringLeftEst:+(rb.left-ringPad).toFixed(1), ringRightEst:+(rb.right+ringPad).toFixed(1),
        clipLeft: lb?+lb.left.toFixed(1):null, clipRight: lb?+lb.right.toFixed(1):null };
    });
    const tbx=await page.locator(".dock-tools-btn").first().boundingBox();
    if(tbx) await page.screenshot({path:`${OUT}/lane-b-${scheme}-tools-focus.png`, clip:{x:Math.max(0,tbx.x-18),y:Math.max(0,tbx.y-18),width:tbx.width+36,height:tbx.height+36}});
  }
  results[scheme]=r;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results,null,2));
