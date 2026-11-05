import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const VPS=[[390,844],[430,932],[844,390],[1024,768],[1440,900],[1800,1000],[2560,1440]];
const b=await chromium.launch({headless:true});
try{ for(const [w,h] of VPS){ const c=await b.newContext({viewport:{width:w,height:h}}); try{ const p=await c.newPage();
 await p.goto("https://color.babb.dev/#/?space=oklch&color=efflorescence",{waitUntil:"load",timeout:60000}); await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>{const e=document.querySelector(".spectrum-picker").getBoundingClientRect();return [Math.round(e.width*10)/10,Math.round(e.height*10)/10,Math.round(e.width/e.height*1000)/1000]});
 console.log(JSON.stringify({w,h,spectrum:r})); } finally{await c.close();} } } finally{await b.close();}
