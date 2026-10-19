import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try { for (const path of ["/paper","/morph"]) { const p = await b.newPage(); const e=[]; p.on("pageerror",x=>e.push("PE "+(x.stack||"").slice(0,900))); p.on("console",m=>{if(m.type()==="error")e.push("CE "+m.text().slice(0,200))});
 await p.goto("http://localhost:3148"+path,{waitUntil:"domcontentloaded"}); await p.waitForTimeout(12000); console.log(path, e.slice(0,6), (await p.evaluate(()=>document.body.innerText.length))); await p.close(); } } finally { await b.close(); }
