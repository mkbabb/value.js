import { chromium } from "playwright";
const SAVED={id:"pal-1",name:"Muted Terracotta and Deep Sea Foam Study",slug:"s",isLocal:true,tier:"featured",versionCount:4,colors:[{css:"#c1663f"},{css:"#8ec9b0"}]};
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:1000}});
const p=await ctx.newPage();
await p.addInitScript(s=>localStorage.setItem("color-palettes",s),JSON.stringify({version:1,palettes:[SAVED]}));
await p.goto("http://localhost:9000/#/palettes",{waitUntil:"load"});
await p.waitForTimeout(3000);
const snap=()=>p.evaluate(()=>{
  const card=document.querySelector('[role="article"]');
  const chain=[]; let n=card;
  while(n&&n!==document.documentElement){chain.push({tag:n.tagName,cls:(n.className||'').toString().slice(0,40),ariaHidden:n.getAttribute('aria-hidden'),dataAriaHidden:n.getAttribute('data-aria-hidden')});n=n.parentElement;}
  return {chain,totalAriaHiddenTrue:document.querySelectorAll('[aria-hidden="true"]').length};
});
const before=await snap();
await p.getByRole("button",{name:"Palette menu"}).first().click();
await p.waitForTimeout(600);
const after=await snap();
const fmt=s=>s.chain.filter(c=>c.ariaHidden!==null||c.dataAriaHidden!==null).map(c=>`${c.tag}.${c.cls} aria-hidden=${c.ariaHidden} data-aria-hidden=${c.dataAriaHidden}`);
console.log("BEFORE totalAriaHiddenTrue:",before.totalAriaHiddenTrue);
console.log("  chain hidden:",JSON.stringify(fmt(before),null,1));
console.log("AFTER  totalAriaHiddenTrue:",after.totalAriaHiddenTrue);
console.log("  chain hidden:",JSON.stringify(fmt(after),null,1));
await b.close();
