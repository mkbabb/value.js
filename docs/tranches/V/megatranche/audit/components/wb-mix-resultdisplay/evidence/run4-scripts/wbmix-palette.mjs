import { webkit } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const label = process.argv[2] ?? "pal-light";
const opts = JSON.parse(process.argv[3] ?? "{}");
const b = await webkit.launch();
const ctx = await b.newContext({ viewport: opts.viewport ?? {width:1440,height:900}, deviceScaleFactor:2,
  colorScheme: opts.colorScheme ?? "light", reducedMotion: opts.reducedMotion });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/mix", { waitUntil:"load" });
await page.waitForTimeout(3000);
if (opts.rtl) await page.evaluate(()=>document.documentElement.setAttribute("dir","rtl"));

const setState = (result, phase) => page.evaluate(({result,phase}) => {
  let inst = (document.querySelector(".dashed-well")||document.body).__vueParentComponent;
  while (inst) {
    const ss = inst.setupState;
    if (ss && typeof ss.startMix === "function" && "animationPhase" in ss) {
      ss.mixResult = result; ss.animationPhase = phase; return true;
    }
    inst = inst.parent;
  }
  return false;
}, {result, phase});

const measure = (tag) => page.evaluate((tag) => {
  const plate = document.querySelector(".mix-plate");
  const r = el => { if(!el) return null; const b=el.getBoundingClientRect(); return {x:+b.x.toFixed(1),y:+b.y.toFixed(1),w:+b.width.toFixed(1),h:+b.height.toFixed(1)}; };
  const strip = plate ? [...plate.querySelectorAll("div")].find(d=>d.getAttribute("role")==="presentation") : null;
  return { tag, plateRect:r(plate),
    opacity: plate?getComputedStyle(plate).opacity:null,
    dots: plate ? [...plate.querySelectorAll(".watercolor-swatch")].map(d=>({rect:r(d), title:d.getAttribute("title"), ariaHidden:d.getAttribute("aria-hidden"), tag:d.tagName, variant:d.getAttribute("data-variant"), pe:getComputedStyle(d).pointerEvents})) : null,
    strip: strip?{rect:r(strip), bg:getComputedStyle(strip).backgroundImage.slice(0,500), radius:getComputedStyle(strip).borderRadius}:null,
    a11yText: plate ? plate.innerText.replace(/\n+/g,"|") : null,
    liveRegions: plate?plate.querySelectorAll("[aria-live],[role=status],[role=alert]").length:null,
    interactive: plate?[...plate.querySelectorAll('a[href],button,input,[tabindex]:not([tabindex="-1"])')].length:null,
    html: plate?plate.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,"<svg/>").slice(0,1800):null };
}, tag);

const colors = [
 {css:"oklch(0.72 0.19 25)", position:0},{css:"oklch(0.78 0.16 80)",position:1},
 {css:"oklch(0.82 0.14 140)",position:2},{css:"oklch(0.62 0.17 250)",position:3},
 {css:"oklch(0.55 0.20 310)",position:4}];

const out = {};
// GHOST palette
console.log("set ghost:", await setState({type:"palette",colors},"mixing"));
await page.waitForTimeout(700);
out.paletteGhost = await measure("palette-ghost");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-palghost.png`}).catch(()=>{});
// SETTLED palette
await setState({type:"palette",colors},"done");
await page.waitForTimeout(900);
out.paletteSettled = await measure("palette-settled");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-palsettled.png`}).catch(()=>{});
// EMPTY palette (zero colors)
await setState({type:"palette",colors:[]},"done");
await page.waitForTimeout(500);
out.paletteEmpty = await measure("palette-empty");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-palempty.png`}).catch(()=>{});
// color result with NO css (the un-designed arm)
await setState({type:"color"},"done");
await page.waitForTimeout(400);
out.colorNoCss = await measure("color-no-css");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-nocss.png`}).catch(()=>{});
// 12-color overflow
const many = Array.from({length:12},(_,i)=>({css:`oklch(0.7 0.16 ${i*30})`,position:i}));
await setState({type:"palette",colors:many},"done");
await page.waitForTimeout(600);
out.palette12 = await measure("palette-12");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-pal12.png`}).catch(()=>{});
// color GHOST vs SETTLED height jump
await setState({type:"color",css:"oklch(0.635 0.068 333)"},"mixing");
await page.waitForTimeout(700);
out.colorGhost = await measure("color-ghost");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-colghost.png`}).catch(()=>{});
await setState({type:"color",css:"oklch(0.635 0.068 333)"},"done");
await page.waitForTimeout(900);
out.colorSettled = await measure("color-settled");
await page.locator(".mix-plate").screenshot({path:`${OUT}/wbmix-${label}-colsettled.png`}).catch(()=>{});
console.log(JSON.stringify(out,null,1));
await b.close();
