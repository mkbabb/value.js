// U.W-VISUAL Lane D — material/veil + dark-scheme census probe (built @ :8594, dpr2).
// Rows: u-f10 (console veil material) · u-f12 (dark-scheme derived tint) ·
//       u-f19-t53 (dark caster material / BR-13 computed).
// Dark rendered via addInitScript(localStorage vueuse-color-scheme) + colorScheme ctx
// (NO manual classList toggle — it raced the vueuse effect). light-dark() tokens
// resolved through a REAL appended DOM element (detached canvas ignores color-scheme).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const PORT = 8594;
const SEED = "oklch(0.6 0.18 30)";               // chromatic terracotta seed
const BASE = `http://127.0.0.1:${PORT}/#`;
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/pi";
const FR  = "/Users/mkbabb/Programming/value.js/docs/tranches/U/audit/w-visual/frames";
mkdirSync(OUT,{recursive:true}); mkdirSync(FR,{recursive:true});

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
  let h=Math.atan2(bb,a)*180/Math.PI; if(h<0)h+=360;
  return {L:+L.toFixed(4), C:+Math.hypot(a,bb).toFixed(4), h:+h.toFixed(1)};
}
function hueSpread(hues){ let max=0; for(let i=0;i<hues.length;i++)for(let j=i+1;j<hues.length;j++){let d=Math.abs(hues[i]-hues[j])%360; if(d>180)d=360-d; if(d>max)max=d;} return +max.toFixed(1); }
function parseRGB(str){ if(!str) return null; const m=str.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(/[,\s\/]+/).map(Number); return {r:p[0],g:p[1],b:p[2],a:p[3]??1}; }
// robust: handles rgb()/rgba(), oklch(L C H[/a]), oklab(L a b[/a]) — whatever getComputedStyle returns
function oklchOf(str){
  if(!str) return null; let m;
  if((m=str.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.-]+)(?:deg)?(?:\s*\/\s*([\d.]+%?))?/))){
    let L=parseFloat(m[1]); if(m[1].includes('%'))L/=100; let h=parseFloat(m[3]); if(h<0)h+=360;
    let a=m[4]?parseFloat(m[4]):1; if(String(m[4]).includes('%'))a/=100;
    return {L:+L.toFixed(4), C:+parseFloat(m[2]).toFixed(4), h:+h.toFixed(1), a:+a.toFixed(3), src:'oklch'};
  }
  if((m=str.match(/oklab\(\s*([\d.]+%?)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*([\d.]+%?))?/))){
    let L=parseFloat(m[1]); if(m[1].includes('%'))L/=100; const a=parseFloat(m[2]),b=parseFloat(m[3]);
    let h=Math.atan2(b,a)*180/Math.PI; if(h<0)h+=360; let al=m[4]?parseFloat(m[4]):1; if(String(m[4]).includes('%'))al/=100;
    return {L:+L.toFixed(4), C:+Math.hypot(a,b).toFixed(4), h:+h.toFixed(1), a:+al.toFixed(3), src:'oklab'};
  }
  const p=parseRGB(str); return p?{...rgbToOklch(p.r,p.g,p.b), a:+(p.a).toFixed(3), rgb:`${p.r},${p.g},${p.b}`, src:'rgb'}:null;
}

// in-page helper source: resolve any css var/value to rgb via a real appended element
const RESOLVER = `
window.__resolve = function(val){
  const d=document.createElement('div');
  d.style.color=val; d.style.position='absolute'; d.style.left='-9999px';
  document.body.appendChild(d);
  const c=getComputedStyle(d).color; d.remove(); return c;
};
window.__tok = function(name){
  const raw=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return { raw, rgb: raw?window.__resolve('var('+name+')'):null };
};`;

const results={};
const browser=await chromium.launch({headless:true,args:["--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist"]});

for(const scheme of ["dark","light"]){
  const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:scheme});
  const page=await ctx.newPage();
  await page.addInitScript((s)=>{ try{ localStorage.setItem("vueuse-color-scheme", s);}catch{} }, scheme);
  const consoleErrors=[]; page.on("console",m=>{ if(m.type()==="error") consoleErrors.push(m.text().slice(0,110)); });
  await page.goto(`${BASE}/?space=oklch&color=${encodeURIComponent(SEED)}`,{waitUntil:"networkidle"});
  await page.waitForTimeout(1500);
  await page.addScriptTag({content:RESOLVER});
  const r={scheme};

  // sanity: confirm the rendered scheme
  r.schemeCheck = await page.evaluate(()=>({ hasDark:document.documentElement.classList.contains("dark"),
    fg: window.__resolve('var(--foreground)') }));

  // ===== token snapshot (GPU-independent computed reads, real-DOM resolved) =====
  const names=["--shadow-color","--foreground","--card","--background","--popover",
    "--accent-live","--accent-view","--card-edge","--border","--muted"];
  const tok = await page.evaluate((ns)=>{ const o={}; for(const n of ns) o[n]=window.__tok(n); return o; }, names);
  r.tokens={}; for(const [k,v] of Object.entries(tok)) r.tokens[k]={raw:v.raw, oklch:oklchOf(v.rgb)};

  // ===== [u-f19-t53] BR-13 : computed shadow-color vs foreground + cartoon effective alpha =====
  if(scheme==="dark"){
    r.caster = await page.evaluate(()=>{
      const cs=getComputedStyle(document.documentElement);
      const scRaw=cs.getPropertyValue("--shadow-color").trim();
      const fgRaw=cs.getPropertyValue("--foreground").trim();
      const cartRaw=cs.getPropertyValue("--shadow-cartoon").trim();
      const scRGB=window.__resolve("var(--shadow-color)");
      const fgRGB=window.__resolve("var(--foreground)");
      // effective caster alpha: resolve the color-mix used in --shadow-cartoon
      const mixA=window.__resolve("color-mix(in srgb, var(--shadow-color) 50%, transparent)");
      const mixAH=window.__resolve("color-mix(in srgb, var(--shadow-color) 55%, transparent)");
      // a real cartoon-caster consumer's resolved box-shadow
      const cand=[...document.querySelectorAll("*")].find(el=>{const b=getComputedStyle(el).boxShadow;return b&&b!=="none"&&/8px 8px|10px 10px/.test(b);});
      let consumer=null; if(cand){consumer={sel:(cand.className?.toString?.()||"").split(" ").slice(0,3).join("."), boxShadow:getComputedStyle(cand).boxShadow.slice(0,150)};}
      return { shadowColorRaw:scRaw, foregroundRaw:fgRaw, cartoonRaw:cartRaw,
        shadowColorRGB:scRGB, foregroundRGB:fgRGB, cartoonMix50:mixA, cartoonMix55:mixAH, consumer };
    });
  }

  // ===== [u-f10] console veil (picker pane) : alpha + backdrop-filter + what is behind =====
  await page.evaluate(()=>{ location.hash="#/"; }); await page.waitForTimeout(800);
  const veil = await page.evaluate(()=>{
    const el=document.querySelector(".sliders-console"); if(!el) return {found:false};
    const cs=getComputedStyle(el); const b=el.getBoundingClientRect();
    let bg=null,node=el.parentElement;
    while(node&&node!==document.body){const c=getComputedStyle(node).backgroundColor; if(c&&c!=="rgba(0, 0, 0, 0)"){bg={sel:(node.className?.toString?.()||"").split(" ").slice(0,2).join("."),color:c};break;} node=node.parentElement;}
    return { found:true, backgroundColor:cs.backgroundColor,
      backdropFilter:(cs.backdropFilter&&cs.backdropFilter!=="none")?cs.backdropFilter:(cs.webkitBackdropFilter||"none"),
      rect:{x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)}, behind:bg };
  });
  r.veil={ found:veil.found, backgroundColor:veil.backgroundColor, backgroundOklch:oklchOf(veil.backgroundColor),
    backdropFilter:veil.backdropFilter, behind:veil.behind?{sel:veil.behind.sel, color:veil.behind.color, oklch:oklchOf(veil.behind.color)}:null };
  if(veil.found&&veil.rect.w>0){
    const b=veil.rect; const clip={x:Math.max(0,b.x-8),y:Math.max(0,b.y-8),width:Math.min(1440-Math.max(0,b.x-8),b.w+16),height:Math.min(900-Math.max(0,b.y-8),b.h+16)};
    await page.screenshot({path:`${FR}/console-veil-${scheme}.png`, clip});
  }

  // ===== [u-f12] dark tint : per-pane card GROUND + accent across >=4 views =====
  const views=[["picker","/"],["mix","/mix"],["gradient","/gradient"],["atmosphere","/atmosphere"]];
  r.panes={};
  for(const [id,hash] of views){
    await page.evaluate((h)=>{ location.hash="#"+h; }, hash); await page.waitForTimeout(750);
    const p=await page.evaluate(()=>{
      const accentView=window.__resolve("var(--accent-view)");
      const cardToken=window.__resolve("var(--card)");
      // representative card GROUND: the resting card surface (veil sits ON this)
      const cardEl=document.querySelector(".rounded-card, [class*='rounded-card'], [data-slot='card']");
      const cardElBg=cardEl?getComputedStyle(cardEl).backgroundColor:null;
      return { accentView, cardToken, cardElBg, cardSel: cardEl?(cardEl.className?.toString?.()||"").split(" ").slice(0,2).join("."):null };
    });
    r.panes[id]={ accentView:oklchOf(p.accentView), cardToken:oklchOf(p.cardToken),
      cardElBg:oklchOf(p.cardElBg), cardSel:p.cardSel };
    await page.screenshot({path:`${FR}/pane-${id}-${scheme}-1440.png`});
  }
  const accHues=Object.values(r.panes).map(p=>p.accentView?.h).filter(h=>h!=null);
  const accChr=Object.values(r.panes).map(p=>p.accentView?.C).filter(c=>c!=null);
  const gndHues=Object.values(r.panes).map(p=>p.cardToken?.h).filter(h=>h!=null);
  const gndChr=Object.values(r.panes).map(p=>p.cardToken?.C).filter(c=>c!=null);
  r.spread={
    accentLane:{hueSpread:hueSpread(accHues),chromaMin:+Math.min(...accChr).toFixed(4),chromaMax:+Math.max(...accChr).toFixed(4),hues:accHues},
    groundLane:{hueSpread:hueSpread(gndHues),chromaMin:+Math.min(...gndChr).toFixed(4),chromaMax:+Math.max(...gndChr).toFixed(4),hues:gndHues} };

  r.consoleErrors=consoleErrors.slice(0,4);
  results[scheme]=r;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results,null,2));
