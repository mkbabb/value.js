import { webkit } from "playwright";
const OUT = new URL("../../frames/", import.meta.url).pathname;
const HOOK = `
window.__mix=(()=>{const app=document.querySelector("#app")?.__vue_app__;if(!app)return null;
const s=new Set();const w=(v)=>{if(!v||s.has(v))return null;s.add(v);
const n=v.type&&(v.type.__name||v.type.name);if(n==="MixPane"&&v.component)return v.component;
if(v.component){const r=w(v.component.subTree);if(r)return r;}
if(Array.isArray(v.children))for(const c of v.children){const r=w(c);if(r)return r;}
if(v.suspense){const r=w(v.suspense.activeBranch);if(r)return r;}return null;};
const i=w(app._instance.subTree);return i?i.setupState:null;})();
return { ok: !!window.__mix, space: window.__mix.colorSpace, phase: window.__mix.animationPhase };`;

const plate = () => {
  const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
  const p=card.querySelector(".mix-plate");
  return { text: p?.innerText.replace(/\n+/g," | ") ?? null,
           ghost: !!card.querySelector(".mix-plate--ghost"),
           mixDisabled: [...card.querySelectorAll("button")].find(x=>x.innerText.trim()==="Mix")?.disabled ?? null,
           spaceTrigger: card.querySelector("button[aria-label='Color space']")?.innerText.trim() ?? null,
           hueTrigger: card.querySelector("button[aria-label='Hue method']")?.innerText.trim() ?? null,
           chips: card.querySelectorAll("[data-mix-source]").length };
};

const b = await webkit.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/mix",{waitUntil:"load"}); await p.waitForTimeout(4200);
console.log("hook:", JSON.stringify(await p.evaluate(new Function(HOOK))));

await p.evaluate(()=>{["#e11d48","#0ea5e9"].forEach(c=>window.__mix.addColor(c,"picker"));});
await p.waitForTimeout(250);
await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1700);
console.log("### after first mix (oklab):", JSON.stringify(await p.evaluate(plate)));

// proxyRefs write-through: assign the UNWRAPPED property, not .value
await p.evaluate(()=>{ window.__mix.colorSpace = "oklch"; window.__mix.hueMethod = "longer"; });
await p.waitForTimeout(600);
console.log("### space/hue now:", await p.evaluate(()=>[window.__mix.colorSpace, window.__mix.hueMethod]));
console.log("### plate AFTER config change (no re-mix):", JSON.stringify(await p.evaluate(plate)));
await p.screenshot({path:OUT+"D-stale-config-changed.png"});

// re-mix to prove the config DID change the math
await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1700);
console.log("### plate AFTER re-mix in oklch/longer:", JSON.stringify(await p.evaluate(plate)));

// remove an operand while a result is on screen
await p.evaluate(()=>window.__mix.removeColor(0)); await p.waitForTimeout(500);
console.log("### plate AFTER removeColor(0):", JSON.stringify(await p.evaluate(plate)));
await p.screenshot({path:OUT+"D-stale-operand-removed.png"});

// clear the whole selection while a result is on screen
await p.evaluate(()=>window.__mix.clearSelection()); await p.waitForTimeout(500);
console.log("### plate AFTER clearSelection():", JSON.stringify(await p.evaluate(plate)));

// mode switch with a live result
await p.evaluate(()=>{["#e11d48","#0ea5e9"].forEach(c=>window.__mix.addColor(c,"picker")); });
await p.waitForTimeout(200);
await p.evaluate(()=>window.__mix.startMix()); await p.waitForTimeout(1700);
await p.evaluate(()=>{ window.__mix.mode = "palettes"; }); await p.waitForTimeout(500);
console.log("### plate AFTER mode -> palettes:", JSON.stringify(await p.evaluate(plate)));
await p.screenshot({path:OUT+"D-stale-mode-switched.png"});

// mode-tab pill ink measurement
console.log("### tab ink:", JSON.stringify(await p.evaluate(()=>{
  const card=[...document.querySelectorAll("main *")].find(e=>typeof e.className==="string"&&e.className.includes("pane-scroll-fade"));
  const btns=[...card.querySelectorAll("button")].filter(x=>["Colors","Palettes"].includes(x.innerText.trim()));
  const R=(e)=>{const b=e.getBoundingClientRect();return{l:+b.left.toFixed(1),r:+b.right.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)};};
  const group = btns[0].parentElement;
  return { group:R(group), colors:R(btns[0]), palettes:R(btns[1]) };
})));
await b.close();
