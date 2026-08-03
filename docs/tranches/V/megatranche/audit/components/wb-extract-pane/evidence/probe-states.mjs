import { webkit } from "playwright";
const OUT="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const measure = () => {
  const r=(el)=>{if(!el)return null;const b=el.getBoundingClientRect();
    return {x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1),bottom:+b.bottom.toFixed(1)};};
  const fades=[...document.querySelectorAll(".pane-scroll-fade")];
  const ex=fades.find(el=>{const t=el.querySelector(".pane-header-title");return t&&t.textContent.trim()==="Extract";});
  const cap=[...document.querySelectorAll("p")].find(p=>/undeveloped plate/i.test(p.textContent));
  const ghost=[...document.querySelectorAll('[aria-hidden="true"]')].filter(e=>String(e.className||"").includes("rounded-card"))[0];
  return { vw:innerWidth, vh:innerHeight,
    paneRect:r(ex), paneScrollH: ex&&ex.scrollHeight, paneClientH: ex&&ex.clientHeight,
    paneScrollable: ex? ex.scrollHeight>ex.clientHeight+1 : null,
    capRect:r(cap), capVisible: cap? r(cap).bottom<=innerHeight : null,
    ghostRect:r(ghost),
    docScrollable: document.documentElement.scrollHeight>innerHeight+1,
    kValue: (()=>{const s=[...document.querySelectorAll('[role="slider"]')].find(s=>/Number of colors/i.test(s.getAttribute("aria-label")||""));
      return s? s.getAttribute("aria-valuenow"):null;})(),
    pulses: document.querySelectorAll(".animate-pulse").length,
    pulseAnim: (()=>{const p=document.querySelector(".animate-pulse"); if(!p) return null;
      const cs=getComputedStyle(p); return {name:cs.animationName,dur:cs.animationDuration,iter:cs.animationIterationCount};})(),
  };
};
const setK = async (page,val) => {
  const h = page.locator('[role="slider"][aria-label="Number of colors"]').first();
  await h.focus();
  for (let i=0;i<24;i++) await page.keyboard.press("End");
  await page.waitForTimeout(600);
};
const run = async (w,h,opts,tag,doK) => {
  const b=await webkit.launch();
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,...opts});
  const p=await ctx.newPage();
  await p.goto("http://localhost:9000/#/extract",{waitUntil:"load"});
  await p.waitForTimeout(3500);
  if(doK) await setK(p);
  console.log("### "+tag);
  console.log(JSON.stringify(await p.evaluate(measure),null,1));
  await p.screenshot({path:`${OUT}/xD2-${tag}.png`});
  await b.close();
};
await run(390,664,{},"m390x664-k5",false);
await run(390,664,{},"m390x664-kMAX",true);
await run(1440,900,{},"d1440-kMAX",true);
await run(1440,900,{reducedMotion:"reduce"},"d1440-PRM",false);
await run(1440,900,{forcedColors:"active"},"d1440-forcedcolors",false);
