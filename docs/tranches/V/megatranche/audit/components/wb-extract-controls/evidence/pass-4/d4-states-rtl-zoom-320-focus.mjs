import { webkit } from "playwright";
const SP="/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const M=()=>{const q=s=>document.querySelector(s);const r=e=>e?(b=>({x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)}))(e.getBoundingClientRect()):null;
 const lab=q("label.text-mono-small.plate-ink"), rail=q('[data-o18="extract-k-rail"]'), kc=q('[data-o18="extract-kc"]');
 const th=q('.slider-thumb[aria-label="Number of colors"]');
 return {dir:document.documentElement.dir||getComputedStyle(document.documentElement).direction,
  kLabel:r(lab), kLabelAlign:lab?getComputedStyle(lab).textAlign:null, kRail:r(rail),
  labelRightEdge:lab?+ (lab.getBoundingClientRect().right).toFixed(1):null,
  railLeftEdge:rail?+(rail.getBoundingClientRect().left).toFixed(1):null,
  kcRow:r(kc), kcTrack:r(q('[data-o18="extract-kc"] .slider-track')),
  thumb:r(th),
  docScrollW:document.documentElement.scrollWidth, docClientW:document.documentElement.clientWidth,
  overflowX:document.documentElement.scrollWidth-document.documentElement.clientWidth};
};
async function go(label,opts,fn){const b=await webkit.launch();const c=await b.newContext(opts);const p=await c.newPage();
 await p.goto("http://localhost:9000/#/extract",{waitUntil:"load"});await p.waitForTimeout(3500);
 if(fn) await fn(p);
 const d=await p.evaluate(M);console.log("##### "+label+" #####");console.log(JSON.stringify(d,null,1));
 await p.screenshot({path:`${SP}/WBEC-D4-${label}.png`,fullPage:false});await b.close();}

// RTL
await go("rtl-1440", {viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light",
  extraHTTPHeaders:{}}, async p=>{ await p.evaluate(()=>{document.documentElement.dir="rtl";}); await p.waitForTimeout(600); });
// 200% zoom == half CSS viewport at same device px
await go("zoom200-720", {viewport:{width:720,height:450},deviceScaleFactor:4,colorScheme:"light"});
// 320 narrow arm
await go("narrow-320", {viewport:{width:320,height:700},deviceScaleFactor:3,isMobile:true,hasTouch:true,colorScheme:"light"});
// keyboard focus on the k thumb
await go("focus-1440", {viewport:{width:1440,height:900},deviceScaleFactor:2,colorScheme:"light"},
  async p=>{ await p.locator('.slider-thumb[aria-label="Number of colors"]').focus(); await p.waitForTimeout(400); });
