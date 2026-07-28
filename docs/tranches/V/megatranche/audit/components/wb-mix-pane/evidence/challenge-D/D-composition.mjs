import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;
const HOOK = `
window.__mix = (() => {
  const app = document.querySelector("#app")?.__vue_app__; if (!app) return null;
  const seen=new Set(); const walk=(vn)=>{ if(!vn||seen.has(vn))return null; seen.add(vn);
    const n=vn.type&&(vn.type.__name||vn.type.name); if(n==="MixPane"&&vn.component)return vn.component;
    if(vn.component){const r=walk(vn.component.subTree); if(r)return r;}
    if(Array.isArray(vn.children))for(const c of vn.children){const r=walk(c); if(r)return r;}
    if(vn.suspense){const r=walk(vn.suspense.activeBranch); if(r)return r;} return null; };
  const i=walk(app._instance.subTree); return i?i.setupState:null; })();
return !!window.__mix;`;

const split = () => {
  const r = (el)=>{ if(!el) return null; const b=el.getBoundingClientRect();
    return {x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)};};
  const main = document.querySelector("main");
  // direct pane wrappers under main
  const wrappers = [...main.querySelectorAll("[class*='pane-wrapper']")].map(e=>({cls:e.className.slice(0,40), ...r(e)}));
  const cols = [...main.children].map(e=>({tag:e.tagName, cls:(e.className||"").slice(0,50), ...r(e)}));
  const mixCard=[...main.querySelectorAll("*")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade")&&e.textContent.trim().startsWith("Mix"));
  const grid = mixCard ? getComputedStyle(mixCard.closest("[class*='grid'],[class*='flex']")||main) : null;
  return { main:r(main), cols, wrappers,
    mixCard:r(mixCard),
    mixShareOfMain: mixCard ? +((mixCard.getBoundingClientRect().width/main.getBoundingClientRect().width)*100).toFixed(3) : null,
    liveRegions: [...(mixCard?.querySelectorAll("[aria-live],[role=status],[role=alert]")??[])].map(e=>e.tagName+"/"+e.getAttribute("aria-live")+"/"+e.getAttribute("role")),
    headings: [...(mixCard?.querySelectorAll("h1,h2,h3,h4,h5,h6")??[])].map(e=>e.tagName+": "+e.textContent.trim()),
    focusables: [...(mixCard?.querySelectorAll("button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])")??[])]
       .map(e=>({tag:e.tagName, name:(e.getAttribute("aria-label")||e.title||e.innerText||"").trim().slice(0,28), disabled:e.disabled===true||e.getAttribute("aria-disabled")==="true"})),
    dockActions: [...document.querySelectorAll("header button, [class*=dock] button")].map(e=>({name:(e.getAttribute("aria-label")||e.title||e.innerText||"").trim().slice(0,24), disabled:e.disabled===true})).filter(a=>a.name),
  };
};

const b = await webkit.launch();
for (const [label, vp] of [["1440",{width:1440,height:900}],["390",{width:390,height:844}]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor:1, isMobile: label==="390", hasTouch: label==="390" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  await p.evaluate(new Function(HOOK));
  console.log(`### split-${label}-empty`); console.log(JSON.stringify(await p.evaluate(split), null, 2));
  await p.evaluate(()=>{ ["#e11d48","#0ea5e9"].forEach(c=>window.__mix.addColor(c,"picker")); });
  await p.waitForTimeout(300); await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1800);
  console.log(`### split-${label}-result`); console.log(JSON.stringify(await p.evaluate(split), null, 2));
  await p.screenshot({ path: OUT+`D-${label}-result.png`, fullPage: label==="390" });
  await ctx.close();
}
// forced colors + PRM
for (const [label, opts] of [["forced-colors",{forcedColors:"active"}],["prm",{reducedMotion:"reduce"}]]) {
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1, ...opts });
  const p = await ctx.newPage();
  await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
  await p.evaluate(new Function(HOOK));
  await p.evaluate(()=>{ ["#e11d48","#0ea5e9"].forEach(c=>window.__mix.addColor(c,"picker")); });
  await p.waitForTimeout(300);
  const t0 = Date.now();
  await p.evaluate(()=>window.__mix.startMix());
  await p.waitForFunction(()=>!!document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, {timeout:5000}).catch(()=>{});
  console.log(`### ${label}: settle ms =`, Date.now()-t0);
  await p.waitForTimeout(600);
  await p.screenshot({ path: OUT+`D-${label}-result.png` });
  await ctx.close();
}
await b.close();
