// U.W-VISUAL Lane B — dock/nav census probe (built bundle @ :8592, dpr2, 1440×900).
// Rows: u-f11 (collapsed seal seam) · u-f13-demo (Tools focus-ring box) ·
//       u-f13-band (dock-expand scene reflow) · u-f13-menuink (Login/Tools Q10 accent).
// Emits a compact JSON summary + element-clipped PNGs. Both schemes.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const PORT = 8592;
const SEED = "oklch(0.55 0.15 30)"; // chromatic brick-ish seed (accent non-neutral + collision-class)
const URL = `http://127.0.0.1:${PORT}/#/?space=oklch&color=${encodeURIComponent(SEED)}`;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi";
mkdirSync(OUT, { recursive: true });

// ---- sRGB -> OKLCh chroma (Ottosson) ----
function srgbToLinear(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function rgbToOklch(r,g,b){
  const lr=srgbToLinear(r),lg=srgbToLinear(g),lb=srgbToLinear(b);
  const l=0.4122214708*lr+0.5363325363*lg+0.0514459929*lb;
  const m=0.2119034982*lr+0.6806995451*lg+0.1073969566*lb;
  const s=0.0883024619*lr+0.2817188376*lg+0.6299787005*lb;
  const l_=Math.cbrt(l),m_=Math.cbrt(m),s_=Math.cbrt(s);
  const L=0.2104542553*l_+0.7936177850*m_-0.0040720468*s_;
  const a=1.9779984951*l_-2.4285922050*m_+0.4505937099*s_;
  const bb=0.0259040371*l_+0.7827717662*m_-0.8086757660*s_;
  return {L, C:Math.hypot(a,bb), h:Math.atan2(bb,a)*180/Math.PI};
}
function parseRGB(str){
  const m=str.match(/rgba?\(([^)]+)\)/); if(!m) return null;
  const p=m[1].split(/[,\s\/]+/).map(Number); return {r:p[0],g:p[1],b:p[2],a:p[3]??1};
}
// ---- CIELAB + dE2000 (from sRGB) ----
function rgbToXyz(r,g,b){const R=srgbToLinear(r),G=srgbToLinear(g),B=srgbToLinear(b);
  return [R*0.4124+G*0.3576+B*0.1805,R*0.2126+G*0.7152+B*0.0722,R*0.0193+G*0.1192+B*0.9505];}
function xyzToLab([x,y,z]){const xn=0.95047,yn=1,zn=1.08883;const f=t=>t>0.008856?Math.cbrt(t):7.787*t+16/116;
  const fx=f(x/xn),fy=f(y/yn),fz=f(z/zn);return [116*fy-16,500*(fx-fy),200*(fy-fz)];}
function rgbToLab(r,g,b){return xyzToLab(rgbToXyz(r,g,b));}
function dE2000(l1,l2){
  const [L1,a1,b1]=l1,[L2,a2,b2]=l2;const avgLp=(L1+L2)/2;
  const C1=Math.hypot(a1,b1),C2=Math.hypot(a2,b2),avgC=(C1+C2)/2;
  const G=0.5*(1-Math.sqrt(Math.pow(avgC,7)/(Math.pow(avgC,7)+Math.pow(25,7))));
  const a1p=a1*(1+G),a2p=a2*(1+G);const C1p=Math.hypot(a1p,b1),C2p=Math.hypot(a2p,b2),avgCp=(C1p+C2p)/2;
  let h1p=Math.atan2(b1,a1p)*180/Math.PI;if(h1p<0)h1p+=360;let h2p=Math.atan2(b2,a2p)*180/Math.PI;if(h2p<0)h2p+=360;
  let dhp;if(Math.abs(h1p-h2p)<=180)dhp=h2p-h1p;else dhp=h2p<=h1p?h2p-h1p+360:h2p-h1p-360;
  const dLp=L2-L1,dCp=C2p-C1p,dHp=2*Math.sqrt(C1p*C2p)*Math.sin(dhp*Math.PI/360);
  let avgHp;if(Math.abs(h1p-h2p)>180)avgHp=(h1p+h2p+360)/2;else avgHp=(h1p+h2p)/2;
  const T=1-0.17*Math.cos((avgHp-30)*Math.PI/180)+0.24*Math.cos((2*avgHp)*Math.PI/180)+0.32*Math.cos((3*avgHp+6)*Math.PI/180)-0.20*Math.cos((4*avgHp-63)*Math.PI/180);
  const SL=1+(0.015*Math.pow(avgLp-50,2))/Math.sqrt(20+Math.pow(avgLp-50,2)),SC=1+0.045*avgCp,SH=1+0.015*avgCp*T;
  const dTheta=30*Math.exp(-Math.pow((avgHp-275)/25,2)),RC=2*Math.sqrt(Math.pow(avgCp,7)/(Math.pow(avgCp,7)+Math.pow(25,7)));
  const RT=-RC*Math.sin(2*dTheta*Math.PI/180);
  return Math.sqrt(Math.pow(dLp/SL,2)+Math.pow(dCp/SC,2)+Math.pow(dHp/SH,2)+RT*(dCp/SC)*(dHp/SH));
}

const results = {};

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist"],
});

for (const scheme of ["light","dark"]) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme,
  });
  const page = await ctx.newPage();
  await page.addInitScript((s) => {
    try { localStorage.setItem("vueuse-color-scheme", s); } catch {}
  }, scheme);
  const consoleErrors = [];
  page.on("console", m => { if (m.type()==="error") consoleErrors.push(m.text().slice(0,120)); });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  // ensure dark class matches
  await page.evaluate((s)=>{ document.documentElement.classList.toggle("dark", s==="dark"); document.documentElement.style.colorScheme=s; }, scheme);
  await page.waitForTimeout(400);

  const r = { scheme };

  // ================= u-f13-menuink : COMPUTED accent predicate =================
  r.menuink = await page.evaluate(() => {
    function chroma(str){
      const m=str.match(/rgba?\(([^)]+)\)/); if(!m) return null;
      const p=m[1].split(/[,\s\/]+/).map(Number); const [r,g,b]=p;
      function lin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
      const lr=lin(r),lg=lin(g),lb=lin(b);
      const l=0.4122214708*lr+0.5363325363*lg+0.0514459929*lb,m2=0.2119034982*lr+0.6806995451*lg+0.1073969566*lb,s=0.0883024619*lr+0.2817188376*lg+0.6299787005*lb;
      const l_=Math.cbrt(l),m_=Math.cbrt(m2),s_=Math.cbrt(s);
      const La=0.2104542553*l_+0.7936177850*m_-0.0040720468*s_;
      const A=1.9779984951*l_-2.4285922050*m_+0.4505937099*s_;
      const B=0.0259040371*l_+0.7827717662*m_-0.8086757660*s_;
      return { L:+La.toFixed(4), C:+Math.hypot(A,B).toFixed(4), rgb:`${r},${g},${b}`, a:p[3]??1 };
    }
    const out = {};
    // Login (logged-out) button: text "Login"
    const btns=[...document.querySelectorAll("button")];
    const login=btns.find(b=>/(^|\s)Login(\s|$)/.test(b.textContent.trim()));
    if(login){const cs=getComputedStyle(login);
      out.login={ found:true, color:chroma(cs.color), borderTopWidth:cs.borderTopWidth, borderColor:cs.borderTopColor, opacity:cs.opacity };
    } else out.login={found:false};
    // Tools trigger: .dock-tools-btn ; accent on inner svg + label span
    const tools=document.querySelector(".dock-tools-btn");
    if(tools){
      const label=tools.querySelector("span");
      const svg=tools.querySelector("svg");
      const csB=getComputedStyle(tools);
      out.tools={ found:true, tabindex:tools.getAttribute("tabindex"),
        buttonBorderTopWidth:csB.borderTopWidth,
        labelColor: label?chroma(getComputedStyle(label).color):null,
        iconColor: svg?chroma(getComputedStyle(svg).color):null };
    } else out.tools={found:false};
    return out;
  });

  // ================= u-f13-demo : Tools focus-ring box within clip box =========
  // keyboard-Tab to the Tools button so :focus-visible paints; measure geometry.
  r.demo = await page.evaluate(async () => {
    const tools=document.querySelector(".dock-tools-btn");
    if(!tools) return {found:false};
    // find the clip ancestor (dock layer / layers scroller)
    let clip=null,node=tools;
    while(node&&node!==document.body){const cs=getComputedStyle(node);
      if(/(auto|hidden|clip|scroll)/.test(cs.overflowX)||cs.maskImage!=="none"){clip=node;break;}node=node.parentElement;}
    const tb=tools.getBoundingClientRect();
    const cb=clip?clip.getBoundingClientRect():null;
    const csT=getComputedStyle(tools);
    return {found:true,
      toolsRect:{l:+tb.left.toFixed(1),r:+tb.right.toFixed(1),w:+tb.width.toFixed(1),h:+tb.height.toFixed(1)},
      clipTag: clip?`${clip.tagName}.${(clip.className||"").toString().split(" ").slice(0,2).join(".")}`:null,
      clipRect: cb?{l:+cb.left.toFixed(1),r:+cb.right.toFixed(1)}:null,
      marginInline: csT.marginLeft+"/"+csT.marginRight,
      // ring spec at rest (focus paints outer ring; read what's set now + on focus below)
    };
  });
  // keyboard focus for the ring paint + box-shadow read
  await page.mouse.click(720, 450); // focus into page (neutral)
  let focused=false;
  for(let i=0;i<45 && !focused;i++){
    await page.keyboard.press("Tab");
    focused = await page.evaluate(()=>!!(document.activeElement&&document.activeElement.closest(".dock-tools-btn")));
  }
  r.demo.keyboardFocused=focused;
  if(focused){
    r.demo.focus = await page.evaluate(()=>{
      const el=document.activeElement.closest(".dock-tools-btn")||document.activeElement;
      const cs=getComputedStyle(el);
      const rb=el.getBoundingClientRect();
      // parse box-shadow extents (rough): find max spread px
      return { boxShadow: cs.boxShadow.slice(0,180), outline: cs.outlineWidth+" "+cs.outlineStyle+" "+cs.outlineColor,
        rect:{l:+rb.left.toFixed(1),r:+rb.right.toFixed(1)} };
    });
    const tb=await page.locator(".dock-tools-btn").first().boundingBox();
    if(tb){await page.screenshot({path:`${OUT}/lane-b-${scheme}-tools-focus.png`,
      clip:{x:Math.max(0,tb.x-16),y:Math.max(0,tb.y-16),width:tb.width+32,height:tb.height+32}});}
  }

  // ================= band + seal need COLLAPSED dock =================
  // EXPANDED measurement first
  const expanded = await page.evaluate(()=>{
    const band=document.querySelector(".dock-band");
    const scene=document.querySelector(".pane-container")||document.querySelector(".pane-main");
    const gd=document.querySelector('[class*="dock"] .glass-dock, .glass-dock')||null;
    const bb=band?band.getBoundingClientRect():null;
    const sb=scene?scene.getBoundingClientRect():null;
    return { bandH: bb?+bb.height.toFixed(2):null, sceneTop: sb?+sb.top.toFixed(2):null,
      sceneSel: scene?scene.className.toString().split(" ")[0]:null };
  });
  // trigger collapse: hover dock, then move away, wait > collapse-delay(5000)
  const bandBox = await page.locator(".dock-band").first().boundingBox();
  if(bandBox){ await page.mouse.move(bandBox.x+bandBox.width/2, bandBox.y+bandBox.height/2); await page.waitForTimeout(300); }
  await page.mouse.move(1420, 880); // far corner, leave dock
  await page.waitForTimeout(6200);  // collapse timer
  const collapsedState = await page.evaluate(()=>{
    const seal=document.querySelector(".dock-seal-wax")||document.querySelector(".dock-seal");
    const band=document.querySelector(".dock-band");
    const scene=document.querySelector(".pane-container")||document.querySelector(".pane-main");
    const bb=band?band.getBoundingClientRect():null;
    const sb=scene?scene.getBoundingClientRect():null;
    const wb=seal?seal.getBoundingClientRect():null;
    return { collapsed: !!document.querySelector(".dock-seal, .dock-seal-wax"),
      bandH: bb?+bb.height.toFixed(2):null, sceneTop: sb?+sb.top.toFixed(2):null,
      sealRect: wb?{x:+wb.x.toFixed(1),y:+wb.y.toFixed(1),w:+wb.width.toFixed(1),h:+wb.height.toFixed(1)}:null };
  });

  // ---- u-f11 seal ΔE : sample wax vs adjacent field (COMPOSITED screenshot px) ----
  let sealSample=null;
  if(collapsedState.sealRect){
    const sr=collapsedState.sealRect;
    const pad=40;
    const clip={x:Math.max(0,sr.x-pad),y:Math.max(0,sr.y-pad),width:sr.w+2*pad,height:sr.h+2*pad};
    await page.screenshot({path:`${OUT}/lane-b-${scheme}-seal.png`,clip});
    const buf = await page.screenshot({clip});
    const b64 = buf.toString("base64");
    // did the atmosphere WebGL render? (independent signal — readPixels may be cleared,
    // so we ALSO judge by whether the composited field is non-uniform below)
    const glSignal = await page.evaluate(()=>{
      const canv=document.querySelector("canvas"); if(!canv) return {canvasCount:0};
      let content=false;
      try{ const gl=canv.getContext("webgl2")||canv.getContext("webgl");
        if(gl){ const b=new Uint8Array(4); gl.readPixels(Math.round(canv.width*0.5),Math.round(canv.height*0.5),1,1,gl.RGBA,gl.UNSIGNED_BYTE,b); content=(b[0]+b[1]+b[2])>0; } }catch{}
      return {canvasCount:document.querySelectorAll("canvas").length, canvasSize:`${canv.width}x${canv.height}`, glReadNonZero:content};
    });
    // decode composited screenshot in a blank page, sample wax-center vs field-corners
    const decoder = await ctx.newPage();
    await decoder.setContent("<canvas id=c></canvas>");
    sealSample = await decoder.evaluate(async ({b64, sr, pad, dpr})=>{
      const img=new Image(); img.src="data:image/png;base64,"+b64; await img.decode();
      const cv=document.getElementById("c"); cv.width=img.width; cv.height=img.height;
      const g=cv.getContext("2d"); g.drawImage(img,0,0);
      const W=img.width,H=img.height;
      const px=(x,y)=>{const d=g.getImageData(Math.max(0,Math.min(W-1,Math.round(x))),Math.max(0,Math.min(H-1,Math.round(y))),1,1).data;return {r:d[0],g:d[1],b:d[2],a:d[3]};};
      // seal center in screenshot space (dpr scaled; region was cropped at (sr.x-pad, sr.y-pad))
      const cx=(pad+sr.w/2)*dpr, cy=(pad+sr.h/2)*dpr;
      const rad=Math.min(sr.w,sr.h)/2*dpr;
      const wax=px(cx,cy);
      // adjacent ground: just OUTSIDE the seal silhouette (ring at radius*1.35), 8 angles avg + corner field
      const ring=[]; for(let a=0;a<8;a++){const th=a*Math.PI/4; ring.push(px(cx+Math.cos(th)*rad*1.45, cy+Math.sin(th)*rad*1.45));}
      const corners=[px(4,4),px(W-4,4),px(4,H-4),px(W-4,H-4)];
      const avg=arr=>({r:Math.round(arr.reduce((s,p)=>s+p.r,0)/arr.length),g:Math.round(arr.reduce((s,p)=>s+p.g,0)/arr.length),b:Math.round(arr.reduce((s,p)=>s+p.b,0)/arr.length)});
      // field uniformity signal: stddev of corner luminance (WebGL gradient => spread)
      const lum=p=>0.2126*p.r+0.7152*p.g+0.0722*p.b;
      const cl=corners.map(lum); const cmean=cl.reduce((s,x)=>s+x,0)/cl.length;
      const cstd=Math.sqrt(cl.reduce((s,x)=>s+(x-cmean)**2,0)/cl.length);
      return { wax, ringAvg:avg(ring), cornerAvg:avg(corners), ring, corners, cornerLumStd:+cstd.toFixed(2), imgSize:`${W}x${H}` };
    }, {b64, sr, pad, dpr:2});
    await decoder.close();
    sealSample.glSignal = glSignal;
  }
  r.band = { expanded, collapsedState,
    sceneShift: (expanded.sceneTop!=null&&collapsedState.sceneTop!=null)?+(collapsedState.sceneTop-expanded.sceneTop).toFixed(2):null,
    bandDelta: (expanded.bandH!=null&&collapsedState.bandH!=null)?+(collapsedState.bandH-expanded.bandH).toFixed(2):null };
  r.seal = { sample: sealSample };
  if(sealSample && sealSample.wax){
    const w=sealSample.wax, rg=sealSample.ringAvg, cn=sealSample.cornerAvg;
    const labW=rgbToLab(w.r,w.g,w.b);
    r.seal.dE_wax_vs_ringGround = +dE2000(labW, rgbToLab(rg.r,rg.g,rg.b)).toFixed(2);
    r.seal.dE_wax_vs_cornerField = +dE2000(labW, rgbToLab(cn.r,cn.g,cn.b)).toFixed(2);
    r.seal.waxOklch = rgbToOklch(w.r,w.g,w.b);
    r.seal.ringOklch = rgbToOklch(rg.r,rg.g,rg.b);
  }

  // re-expand: hover dock again, measure band/scene return
  if(bandBox){ await page.mouse.move(bandBox.x+bandBox.width/2, bandBox.y+bandBox.height/2); await page.waitForTimeout(900); }
  r.band.reexpanded = await page.evaluate(()=>{
    const band=document.querySelector(".dock-band");
    const scene=document.querySelector(".pane-container")||document.querySelector(".pane-main");
    const bb=band?band.getBoundingClientRect():null, sb=scene?scene.getBoundingClientRect():null;
    return { bandH: bb?+bb.height.toFixed(2):null, sceneTop: sb?+sb.top.toFixed(2):null };
  });

  r.consoleErrors = consoleErrors.slice(0,6);
  results[scheme]=r;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results,null,2));
