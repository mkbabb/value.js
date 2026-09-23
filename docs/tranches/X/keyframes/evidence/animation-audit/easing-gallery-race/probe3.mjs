import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const out=[];
  const walk=(list)=>{for(const r of list){ if(r.cssRules&&!r.selectorText) walk(r.cssRules); else if(r.selectorText&&/specimen-grid|specimen-tile\b|tile-stage\[/.test(r.selectorText)) out.push(r.selectorText.slice(0,140)+" {"+r.style.cssText.slice(0,120)+"}");}};
  for (const s of document.styleSheets){ try{walk(s.cssRules)}catch{} }
  const g=document.querySelector(".specimen-grid");
  const t=document.querySelector(".specimen-tile");
  return {rules: out, gridPrev: g.previousSibling?.nodeType, tileAttrs:[...t.attributes].map(a=>a.name).join(","), stageAttrs:[...t.querySelector(".tile-stage").attributes].map(a=>a.name).join(",")};
});
console.log(JSON.stringify(info,null,1));
await browser.close();
