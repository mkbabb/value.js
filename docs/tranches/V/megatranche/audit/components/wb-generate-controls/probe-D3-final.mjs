import { webkit } from "playwright";
const b = await webkit.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/generate", { waitUntil:"networkidle" });
await p.waitForSelector("[data-generate-plate]",{timeout:20000}); await p.waitForTimeout(1500);

const r = await p.evaluate(()=>{
  const R=(el)=>{if(!el)return null;const q=el.getBoundingClientRect();return {w:+q.width.toFixed(1),h:+q.height.toFixed(1),area:+(q.width*q.height).toFixed(0)};};
  const plate=document.querySelector("[data-generate-plate]");
  const card=plate.closest('[class*="card"],[data-slot="card"]')||plate.parentElement.parentElement.parentElement;
  const strip=plate.firstElementChild;
  const regen=[...plate.querySelectorAll("button")].find(b=>/Regenerate/.test(b.textContent));
  const save=plate.querySelector('[aria-label="Save palette"]');
  const copy=plate.querySelector('[aria-label="Copy all colors"]');
  const dots=[...plate.querySelectorAll(".generate-swatch")];
  const secLabel=document.querySelector(".section-label");
  const seedP=plate.querySelector("p");
  // select the seed paragraph via user-select:all semantics
  const range=document.createRange(); range.selectNodeContents(seedP);
  const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  const selText=sel.toString();
  const cs=(e,k)=>e?getComputedStyle(e)[k]:null;
  return {
    plate:R(plate), card:R(card), strip:R(strip), regen:R(regen), save:R(save), copy:R(copy),
    dotsArea: dots.reduce((s,d)=>s+d.getBoundingClientRect().width*d.getBoundingClientRect().height,0)|0,
    verbArea:(R(regen).area+R(save).area+R(copy).area),
    cardShadow: cs(card,"boxShadow"), cardTag: card.tagName+"."+(card.className||"").slice(0,60),
    plateShadow: cs(plate,"boxShadow"),
    secLabelFont: cs(secLabel,"fontFamily"), secLabelSize: cs(secLabel,"fontSize"), secLabelText: secLabel?.textContent,
    seedSelection: selText,
    nameFont: cs(plate.querySelector("input"),"fontFamily"), nameSize: cs(plate.querySelector("input"),"fontSize"),
    nameTextOverflow: cs(plate.querySelector("input"),"textOverflow"),
  };
});
console.log("BASE", JSON.stringify(r,null,1));

// open the preset dropdown, measure the popover material + what lies beneath
await p.click('[aria-label="Generation preset"]'); await p.waitForTimeout(800);
const pop = await p.evaluate(()=>{
  const items=[...document.querySelectorAll('[role="option"]')];
  const content=items[0].closest('[role="listbox"]');
  const cs=getComputedStyle(content);
  const q=content.getBoundingClientRect();
  const plate=document.querySelector("[data-generate-plate]");
  const pr=plate.getBoundingClientRect();
  const overlapW=Math.max(0,Math.min(q.right,pr.right)-Math.max(q.left,pr.left));
  const overlapH=Math.max(0,Math.min(q.bottom,pr.bottom)-Math.max(q.top,pr.top));
  const lbl=document.getElementById(items[0].getAttribute("aria-labelledby"));
  // sample what is behind row index 2 (Warm)
  const row=items[2].getBoundingClientRect();
  const behind=document.elementsFromPoint(row.x+row.width-30,row.y+row.height/2).map(e=>e.tagName+"."+(typeof e.className==="string"?e.className.slice(0,30):"")).slice(0,6);
  return {
    contentBg: cs.backgroundColor, contentBackdrop: cs.backdropFilter || cs.webkitBackdropFilter,
    contentOpacityish: cs.backgroundColor,
    rect:{w:+q.width.toFixed(1),h:+q.height.toFixed(1),top:+q.top.toFixed(1),bottom:+q.bottom.toFixed(1)},
    plateRect:{w:+pr.width.toFixed(1),top:+pr.top.toFixed(1),bottom:+pr.bottom.toFixed(1)},
    overlapPctOfPlate:+((overlapW*overlapH)/(pr.width*pr.height)*100).toFixed(1),
    visibleItems: items.filter(i=>{const b=i.getBoundingClientRect();return b.top>=q.top&&b.bottom<=q.bottom;}).length,
    totalItems: items.length,
    scrollH: content.scrollHeight, clientH: content.clientHeight,
    accNameNode: lbl?lbl.textContent.replace(/\s+/g," ").trim():null,
    behindRow2: behind,
  };
});
console.log("POPOVER", JSON.stringify(pop,null,1));
await b.close();
