import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport:{width:1440,height:900}, colorScheme:"light" })).newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil:"networkidle" });
await p.waitForTimeout(3600);
await p.evaluate(()=>[...document.querySelectorAll("button")].find(x=>x.getAttribute("aria-label")==="Author a custom curve")?.click());
await p.waitForTimeout(1600);
console.log(JSON.stringify(await p.evaluate(()=>{
  const host=document.querySelector(".easing-authoring"); const out=[];
  const walk=(el)=>{ if([...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())){ const cs=getComputedStyle(el);
    out.push({text:el.textContent.trim().slice(0,20),px:cs.fontSize,w:cs.fontWeight,fam:cs.fontFamily.split(",")[0].replace(/["']/g,""),tt:cs.textTransform,ls:cs.letterSpacing}); }
    for(const k of el.children) walk(k); };
  walk(host); return out;
}),null,1));
await b.close();
