import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;

const srgb = (c) => { c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); };
const lum = ([r,g,b]) => 0.2126*srgb(r)+0.7152*srgb(g)+0.0722*srgb(b);
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p); return +((x+0.05)/(y+0.05)).toFixed(2); };

const b = await webkit.launch();
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,colorScheme:scheme});
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  // tab through the pane and record the focus ring
  const walk = await p.evaluate(async ()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    const fs=[...card.querySelectorAll("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])")];
    return fs.map(e=>{ e.focus();
      const s=getComputedStyle(e);
      return { name:(e.getAttribute("aria-label")||e.title||e.innerText||"").trim().slice(0,24),
               focused: document.activeElement===e,
               outline: s.outlineStyle+" "+s.outlineWidth+" "+s.outlineColor,
               boxShadow: s.boxShadow.slice(0,80), disabled: e.disabled };
    });
  });
  const ink = await p.evaluate(()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    const mix=[...card.querySelectorAll("button")].find(x=>x.innerText.trim()==="Mix");
    const well=[...card.querySelectorAll("div")].find(d=>d.textContent.trim().startsWith("Selected"));
    const lbl=[...card.querySelectorAll("label")][0];
    const desc=card.querySelector(".pane-header-desc");
    const g=(e,pr)=>e?getComputedStyle(e).getPropertyValue(pr):null;
    return { mixColor:g(mix,"color"), mixBg:g(mix,"background-color"), mixOpacity:g(mix,"opacity"),
             mixBorder:g(mix,"border-color"),
             wellBg:g(well,"background-color"), wellBorder:g(well,"border"),
             labelColor:g(lbl,"color"), descColor:g(desc,"color"),
             cardBg:g(card,"background-color"),
             // composite sample from the painted pixel is done separately
             mixRect:(()=>{const r=mix.getBoundingClientRect();return{x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})() };
  });
  // sample real painted pixels: label ink vs its own plate
  const shot = await p.screenshot({ path: OUT+`D-${scheme}-focus-walk.png` });
  console.log(`### ${scheme} focus walk`); console.table(walk);
  console.log(`### ${scheme} ink`, JSON.stringify(ink,null,2));
  await ctx.close();
}
await b.close();
