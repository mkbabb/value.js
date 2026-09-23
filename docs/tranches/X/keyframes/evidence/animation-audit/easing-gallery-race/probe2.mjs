import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const g = document.querySelector(".specimen-grid");
  const cs = getComputedStyle(g);
  const attrs = [...g.attributes].map(a=>a.name+"="+a.value.slice(0,80));
  // matched rules for display
  const rules=[];
  for (const s of document.styleSheets) { let rs; try{rs=s.cssRules}catch{continue}
    const walk=(list)=>{for(const r of list){ if(r.cssRules&&!r.selectorText) walk(r.cssRules); else if(r.selectorText&&g.matches(r.selectorText.split("::")[0]||"*")){ if(/display|flex|grid|background|padding|border-radius/.test(r.style.cssText)) rules.push((r.parentRule?.constructor.name||"")+" "+(r.parentRule?.name||"")+" | "+r.selectorText.slice(0,120)+" { "+r.style.cssText.slice(0,200)+" }"); } }}; 
    try{walk(rs)}catch{} }
  const tiles=[...document.querySelectorAll(".specimen-tile")].slice(0,5).map(t=>{const r=t.getBoundingClientRect(); const st=t.querySelector(".tile-stage"); return {w:r.width, x:r.x, stageW: st.clientWidth, overflow:getComputedStyle(t).overflow, cv:getComputedStyle(t).contentVisibility}});
  const drawer=document.querySelector(".specimen-drawer"); 
  const playBtns=[...document.querySelectorAll("button")].filter(b=>/play/i.test(b.getAttribute("aria-label")||b.textContent)).map(b=>({l:b.getAttribute("aria-label"),t:b.textContent.trim().slice(0,20),cls:b.className.slice(0,80)}));
  return { display: cs.display, flexDir: cs.flexDirection, gtc: cs.gridTemplateColumns, bg: cs.backgroundColor, br: cs.borderRadius, bf: cs.backdropFilter, w: g.getBoundingClientRect().width, scrollW: g.scrollWidth, attrs, rules, tiles, drawer: {w:drawer.clientWidth, sw: drawer.scrollWidth, cls: drawer.className, ov: getComputedStyle(drawer).overflow}, playBtns };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
