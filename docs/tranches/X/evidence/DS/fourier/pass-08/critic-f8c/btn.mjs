import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try { for (const [path, names] of [["/equation",["Compute"]],["/morph",["Export","Reset"]],["/w/placid-stirring-opal-viper",["Replace image"]]]) {
  const p = await b.newPage({viewport:{width:1440,height:900}}); await p.goto("http://localhost:3148"+path); await p.waitForTimeout(5000);
  for (const n of names) { const r = await p.evaluate((n)=>{ const el=[...document.querySelectorAll("button")].find(x=>x.textContent.trim().includes(n)); if(!el) return null; const cs=getComputedStyle(el); return {cls:el.className, attrs:[...el.attributes].map(a=>a.name+"="+a.value.slice(0,60)).join(" "), bs:cs.boxShadow, bg:cs.backgroundColor, bgi:cs.backgroundImage.slice(0,120), bf:cs.backdropFilter, h:el.getBoundingClientRect().height}; }, n); console.log(path,n,JSON.stringify(r)); }
  await p.close(); } } finally { await b.close(); }
