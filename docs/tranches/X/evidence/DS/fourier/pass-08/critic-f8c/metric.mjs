import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try { for (const w of [1440,390]) { const ctx = await b.newContext({viewport:{width:w,height:844}, ...(w<500?{isMobile:true,hasTouch:true}:{})}); const p = await ctx.newPage(); await p.goto("http://localhost:3148/morph"); await p.waitForTimeout(5000);
 console.log(w, JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll(".demo-info *")].filter(e=>e.children.length===0 && e.textContent.trim()).map(e=>{const cs=getComputedStyle(e);return [e.className.toString().slice(0,50), e.textContent.trim(), cs.fontSize, cs.fontWeight, cs.fontFamily.slice(0,20), cs.fontVariantCaps, cs.textTransform]}))));
 await ctx.close(); } } finally { await b.close(); }
