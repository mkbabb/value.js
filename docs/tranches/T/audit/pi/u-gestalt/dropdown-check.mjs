import { chromium } from "playwright";
const OUT="docs/tranches/T/audit/pi/u-gestalt/frames";
const b=await chromium.launch({headless:true});
const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:"light",deviceScaleFactor:2});
await ctx.addInitScript(()=>{try{localStorage.setItem("vueuse-color-scheme","light")}catch(_){}});
const p=await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient",{waitUntil:"load"});
await p.waitForTimeout(1800);
// open the SPACE dropdown (OKLCh) trigger
const opened=await p.evaluate(()=>{
  const t=[...document.querySelectorAll("button,[role=combobox],[role=button]")].find(e=>/OKLCh|Linear|Shorter/.test(e.textContent||"")&&e.getBoundingClientRect().width<260);
  if(t){t.click();return t.textContent.trim();}
  return null;
});
await p.waitForTimeout(500);
await p.screenshot({path:`${OUT}/dropdown-open.png`});
// read the font-weight of the option items
const weights=await p.evaluate(()=>{
  const opts=[...document.querySelectorAll("[role=option],[role=menuitem],li")].filter(e=>e.offsetParent!==null&&e.textContent.trim().length>0&&e.textContent.trim().length<20);
  return opts.slice(0,8).map(e=>({t:e.textContent.trim(),fw:getComputedStyle(e).fontWeight}));
});
console.log("opened="+opened);
console.log(JSON.stringify(weights));
await ctx.close();await b.close();
