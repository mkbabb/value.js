import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;
const HOOK=`window.__mix=(()=>{const a=document.querySelector("#app")?.__vue_app__;if(!a)return null;
const s=new Set();const w=(v)=>{if(!v||s.has(v))return null;s.add(v);
const n=v.type&&(v.type.__name||v.type.name);if(n==="MixPane"&&v.component)return v.component;
if(v.component){const r=w(v.component.subTree);if(r)return r;}
if(Array.isArray(v.children))for(const c of v.children){const r=w(c);if(r)return r;}
if(v.suspense){const r=w(v.suspense.activeBranch);if(r)return r;}return null;};
const i=w(a._instance.subTree);return i?i.setupState:null;})();return !!window.__mix;`;
const b = await webkit.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,colorScheme:"dark"});
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
await p.evaluate(new Function(HOOK));
await p.evaluate(()=>{["#e11d48","#0ea5e9","#f59e0b"].forEach(c=>window.__mix.addColor(c,"picker"));});
await p.waitForTimeout(300);
await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1800);
await p.screenshot({path:OUT+"D-dark-result.png"});
// save twice, then read the library port to show duplicate names
const names = await p.evaluate(()=>{
  const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
  const save=[...card.querySelectorAll("button")].find(x=>(x.title||"")==="Save to palettes");
  save.click(); save.click(); save.click();
  return "clicked x3";
});
await p.waitForTimeout(800);
console.log(names, JSON.stringify(await p.evaluate(()=>{
  const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
  return { anyConfirmation: card.innerText.includes("Saved")||!!card.querySelector("[role=status]"),
           plateText: card.querySelector(".mix-plate")?.innerText.replace(/\n+/g," | ") };
})));
await p.screenshot({path:OUT+"D-dark-after-3-saves.png"});
await b.close();
