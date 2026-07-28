import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;
const HOOK = `
window.__mix=(()=>{const app=document.querySelector("#app")?.__vue_app__;if(!app)return null;
const s=new Set();const w=(v)=>{if(!v||s.has(v))return null;s.add(v);
const n=v.type&&(v.type.__name||v.type.name);if(n==="MixPane"&&v.component)return v.component;
if(v.component){const r=w(v.component.subTree);if(r)return r;}
if(Array.isArray(v.children))for(const c of v.children){const r=w(c);if(r)return r;}
if(v.suspense){const r=w(v.suspense.activeBranch);if(r)return r;}return null;};
const i=w(app._instance.subTree);return i?i.setupState:null;})();return !!window.__mix;`;

const b = await webkit.launch();

// ---------- A. row alignment / rhythm at 1440
{
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const p = await ctx.newPage(); await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  const rows = await p.evaluate(()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    const col=card.querySelector(".pane-header").nextElementSibling;
    const R=(el,label)=>{const b=el.getBoundingClientRect();return{label,left:+b.left.toFixed(1),right:+b.right.toFixed(1),w:+b.width.toFixed(1),centre:+((b.left+b.right)/2).toFixed(1)};};
    const out=[];
    out.push(R(card,"card"));
    out.push(R(card.querySelector(".pane-header"),"header-box"));
    out.push(R(card.querySelector(".pane-header h3"),"title-ink"));
    const tabs=card.querySelector("[role=tablist]")||[...card.querySelectorAll("div")].find(d=>d.textContent.trim()==="ColorsPalettes");
    if(tabs) out.push(R(tabs,"mode-tabs"));
    const well=[...card.querySelectorAll("div")].find(d=>d.textContent.trim().startsWith("Selected"));
    if(well) out.push(R(well,"selected-well"));
    const sel=card.querySelectorAll("button[aria-label='Color space'],button[aria-label='Hue method']");
    sel.forEach((s,i)=>out.push(R(s,"select-"+i)));
    const mix=[...card.querySelectorAll("button")].find(x=>x.innerText.trim()==="Mix");
    if(mix) out.push(R(mix,"mix-button"));
    return out;
  });
  console.log("### row-alignment-1440"); console.table(rows); console.log(JSON.stringify(rows));
  await ctx.close();
}

// ---------- B. zoom 200 (720x450 css)
{
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2});
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"});
  await p.evaluate(()=>{document.documentElement.style.zoom="2";});
  await p.waitForTimeout(4200);
  const z = await p.evaluate(()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    const mix=[...card.querySelectorAll("button")].find(x=>x.innerText.trim()==="Mix");
    const r=(e)=>{const b=e.getBoundingClientRect();return{y:+b.y.toFixed(1),bottom:+b.bottom.toFixed(1),h:+b.height.toFixed(1)};};
    return {vh:innerHeight, card:r(card), mixBtn:mix?r(mix):null,
      scroll:{scrollHeight:card.scrollHeight,clientHeight:card.clientHeight},
      mixBelowFold: mix ? mix.getBoundingClientRect().bottom > innerHeight : null,
      docOverflowY: document.scrollingElement.scrollHeight > innerHeight};
  });
  console.log("### zoom200"); console.log(JSON.stringify(z,null,2));
  await p.screenshot({path:OUT+"D-zoom200.png"});
  await ctx.close();
}

// ---------- C. error injection: an operand the mixer cannot handle
{
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const p = await ctx.newPage();
  const errs=[]; p.on("pageerror",e=>errs.push("PAGEERROR: "+e.message));
  p.on("console",m=>{if(m.type()==="error")errs.push("CONSOLE: "+m.text().slice(0,180));});
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  await p.evaluate(new Function(HOOK));
  errs.length=0;
  const thrown = await p.evaluate(()=>{
    window.__mix.addColor("#ff0000","picker");
    window.__mix.addColor("definitely-not-a-color","picker");
    try { window.__mix.startMix(); return {threw:false}; }
    catch(e){ return {threw:true, msg:String(e && e.message)}; }
  });
  await p.waitForTimeout(1500);
  const after = await p.evaluate(()=>{
    const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
    return { plate: !!card.querySelector(".mix-plate"),
             plateText: card.querySelector(".mix-plate")?.innerText.replace(/\n+/g," | ") ?? null,
             anyErrorSurface: !!card.querySelector("[role=alert],[aria-live=assertive],[data-error]"),
             cardText: card.innerText.replace(/\n+/g," | ").slice(0,220) };
  });
  console.log("### error-injection"); console.log(JSON.stringify({thrown, after, errs},null,2));
  await p.screenshot({path:OUT+"D-error-bad-operand.png"});
  await ctx.close();
}

// ---------- D. second mix without reset: does the plate transition?
{
  const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const p = await ctx.newPage(); await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  await p.evaluate(new Function(HOOK));
  await p.evaluate(()=>{["#e11d48","#0ea5e9"].forEach(c=>window.__mix.addColor(c,"picker"));});
  await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1600);
  const first = await p.evaluate(()=>document.querySelector(".mix-plate")?.innerText.replace(/\n+/g," "));
  // change space then re-mix
  await p.evaluate(()=>{window.__mix.colorSpace.value="srgb"; window.__mix.startMix();});
  await p.waitForTimeout(120);
  const midGhost = await p.evaluate(()=>!!document.querySelector(".mix-plate--ghost"));
  await p.waitForTimeout(1600);
  const second = await p.evaluate(()=>document.querySelector(".mix-plate")?.innerText.replace(/\n+/g," "));
  console.log("### second-mix", JSON.stringify({first, midGhost, second, differ:first!==second},null,2));
  await ctx.close();
}
await b.close();
